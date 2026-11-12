<?php
// Phos · núcleo del servidor de cuentas
declare(strict_types=1);
ini_set("display_errors", "0");

const PHOS_SESSION_DAYS = 180;
const PHOS_TOKEN_MINUTES = 30;
const PHOS_BRANCHES = ['ortodoxa', 'catolica', 'protestante'];

function phos_config(): ?array {
    static $cfg = false;
    if ($cfg !== false) return $cfg;
    $path = getenv('PHOS_CONFIG') ?: dirname($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) . '/phos-config.php';
    $cfg = is_file($path) ? require $path : null;
    return $cfg;
}

function out(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(string $msg, int $code = 400): void { out(['ok' => false, 'error' => $msg], $code); }

function db(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;
    $c = phos_config();
    if (!$c || empty($c['dsn'])) fail('Las cuentas aún no están activadas.', 503);
    $pdo = new PDO($c['dsn'], $c['user'] ?? null, $c['pass'] ?? null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    migrate($pdo);
    return $pdo;
}

function migrate(PDO $pdo): void {
    $my = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
    $id = $my ? 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $tail = $my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : '';
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id $id,
        email VARCHAR(190) NOT NULL UNIQUE,
        name VARCHAR(80) NULL,
        prefs TEXT NULL,
        relig_consent TINYINT NOT NULL DEFAULT 0,
        relig_consent_at DATETIME NULL,
        stripe_customer VARCHAR(64) NULL,
        created_at DATETIME NOT NULL,
        last_login DATETIME NULL
    )$tail");
    $pdo->exec("CREATE TABLE IF NOT EXISTS login_tokens (
        id $id,
        email VARCHAR(190) NOT NULL,
        token_hash CHAR(64) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        used_at DATETIME NULL,
        created_at DATETIME NOT NULL
    )$tail");
    $pdo->exec("CREATE TABLE IF NOT EXISTS sessions (
        id $id,
        user_id BIGINT NOT NULL,
        token_hash CHAR(64) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL
    )$tail");
    // Donativo mensual (lo actualizará Stripe cuando esté activo)
    try { $pdo->query('SELECT sub_status FROM users LIMIT 1'); }
    catch (PDOException $e) {
        $pdo->exec('ALTER TABLE users ADD COLUMN sub_id VARCHAR(64) NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN sub_status VARCHAR(32) NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN sub_amount INT NULL');
    }
    // Historial de donativos de cada usuario (lo rellenará Stripe; solo para el gráfico de Mi Phos)
    $pdo->exec("CREATE TABLE IF NOT EXISTS donations (
        id $id,
        user_id BIGINT NULL,
        kind VARCHAR(10) NOT NULL,
        amount INT NOT NULL,
        currency CHAR(3) NOT NULL DEFAULT 'eur',
        stripe_ref VARCHAR(80) NOT NULL UNIQUE,
        at DATETIME NOT NULL
    )$tail");
    // Solicitudes de devolución de aportaciones
    $pdo->exec("CREATE TABLE IF NOT EXISTS refund_requests (
        id $id,
        email VARCHAR(190) NOT NULL,
        paid_on DATE NOT NULL,
        amount INT NOT NULL,
        receipt VARCHAR(60) NULL,
        reason TEXT NOT NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'pendiente',
        created_at DATETIME NOT NULL
    )$tail");
    // ---- Comunidad: seudónimos, mensajes, reacciones, denuncias y registro de moderación ----
    try { $pdo->query('SELECT alias FROM users LIMIT 1'); }
    catch (PDOException $e) {
        $pdo->exec('ALTER TABLE users ADD COLUMN alias VARCHAR(30) NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN alias_lc VARCHAR(30) NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN alias_at DATETIME NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN com_consent_at DATETIME NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN banned_at DATETIME NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN ban_reason VARCHAR(300) NULL');
        try { $pdo->exec('CREATE UNIQUE INDEX users_alias_lc ON users (alias_lc)'); } catch (PDOException $e2) {}
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS posts (
        id $id,
        user_id BIGINT NOT NULL,
        target VARCHAR(120) NOT NULL,
        kind VARCHAR(12) NOT NULL,
        body TEXT NOT NULL,
        status VARCHAR(12) NOT NULL DEFAULT 'pendiente',
        ip VARCHAR(64) NULL,
        created_at DATETIME NOT NULL,
        decided_at DATETIME NULL,
        decided_note VARCHAR(300) NULL
    )$tail");
    $pdo->exec("CREATE TABLE IF NOT EXISTS reactions (
        id $id,
        target VARCHAR(120) NOT NULL,
        kind VARCHAR(8) NOT NULL,
        who CHAR(64) NOT NULL,
        created_at DATETIME NOT NULL
    )$tail");
    try { $pdo->exec('CREATE UNIQUE INDEX reactions_one ON reactions (target, kind, who)'); } catch (PDOException $e) {}
    $pdo->exec("CREATE TABLE IF NOT EXISTS reports (
        id $id,
        post_id BIGINT NOT NULL,
        who CHAR(64) NOT NULL,
        reason VARCHAR(300) NOT NULL,
        ip VARCHAR(64) NULL,
        status VARCHAR(12) NOT NULL DEFAULT 'abierta',
        created_at DATETIME NOT NULL
    )$tail");
    $pdo->exec("CREATE TABLE IF NOT EXISTS modlog (
        id $id,
        admin VARCHAR(190) NOT NULL,
        action VARCHAR(30) NOT NULL,
        post_id BIGINT NULL,
        user_id BIGINT NULL,
        note VARCHAR(300) NULL,
        at DATETIME NOT NULL
    )$tail");
    // ---- Visitas: solo un recuento por día, página y procedencia (sin cookies ni datos personales) ----
    $pdo->exec("CREATE TABLE IF NOT EXISTS visits (
        id $id,
        day DATE NOT NULL,
        path VARCHAR(80) NOT NULL,
        src VARCHAR(20) NOT NULL,
        n INT NOT NULL DEFAULT 0
    )$tail");
    try { $pdo->exec('CREATE UNIQUE INDEX visits_one ON visits (day, path, src)'); } catch (PDOException $e) {}
    // ---- Correo semanal: suscripción voluntaria y registro de envíos ----
    try { $pdo->query('SELECT news_at FROM users LIMIT 1'); }
    catch (PDOException $e) {
        $pdo->exec('ALTER TABLE users ADD COLUMN news_at DATETIME NULL');
        $pdo->exec('ALTER TABLE users ADD COLUMN news_token CHAR(32) NULL');
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS news_log (
        id $id,
        week CHAR(10) NOT NULL,
        user_id BIGINT NOT NULL,
        sent_at DATETIME NOT NULL
    )$tail");
    try { $pdo->exec('CREATE UNIQUE INDEX news_log_one ON news_log (week, user_id)'); } catch (PDOException $e) {}
    $pdo->exec("CREATE TABLE IF NOT EXISTS rate_hits (
        id $id,
        k VARCHAR(200) NOT NULL,
        at DATETIME NOT NULL
    )$tail");
}

function now(int $plusSeconds = 0): string { return gmdate('Y-m-d H:i:s', time() + $plusSeconds); }
function h(string $s): string { return hash('sha256', $s); }
function rnd(): string { return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='); }

function base_url(): string {
    $c = phos_config();
    if (!empty($c['base'])) return rtrim($c['base'], '/');
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return $https . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
}

function client_ip(): string { return substr($_SERVER['REMOTE_ADDR'] ?? '0', 0, 64); }

// Limita peticiones: máximo $max en $seconds para la clave dada
function rate_ok(string $key, int $max, int $seconds): bool {
    $pdo = db();
    $pdo->prepare('DELETE FROM rate_hits WHERE at < ?')->execute([now(-86400)]);
    $st = $pdo->prepare('SELECT COUNT(*) FROM rate_hits WHERE k = ? AND at > ?');
    $st->execute([$key, now(-$seconds)]);
    if ((int)$st->fetchColumn() >= $max) return false;
    $pdo->prepare('INSERT INTO rate_hits (k, at) VALUES (?, ?)')->execute([$key, now()]);
    return true;
}

// Las peticiones que cambian datos deben venir de nuestra propia web
function require_same_origin(bool $needHeader = true): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fail('Método no permitido.', 405);
    if ($needHeader && ($_SERVER['HTTP_X_PHOS'] ?? '') !== '1') fail('Petición no válida.', 403);
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== parse_url(base_url(), PHP_URL_HOST)) fail('Origen no permitido.', 403);
}

function body_json(): array {
    $raw = file_get_contents('php://input') ?: '';
    if (strlen($raw) > 20000) fail('Petición demasiado grande.', 413);
    $d = json_decode($raw, true);
    return is_array($d) ? $d : [];
}

function cookie_set(string $name, string $value, int $days, bool $httpOnly): void {
    $secure = str_starts_with(base_url(), 'https://');
    setcookie($name, $value, [
        'expires' => $days > 0 ? time() + $days * 86400 : time() - 3600,
        'path' => '/', 'secure' => $secure, 'httponly' => $httpOnly, 'samesite' => 'Lax',
    ]);
}

function start_session(int $userId): void {
    $tok = rnd();
    db()->prepare('DELETE FROM sessions WHERE expires_at < ?')->execute([now()]);
    db()->prepare('INSERT INTO sessions (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)')
        ->execute([$userId, h($tok), now(PHOS_SESSION_DAYS * 86400), now()]);
    db()->prepare('UPDATE users SET last_login = ? WHERE id = ?')->execute([now(), $userId]);
    cookie_set('phos_s', $tok, PHOS_SESSION_DAYS, true);
    cookie_set('phos_in', '1', PHOS_SESSION_DAYS, false); // solo indica a la web que hay sesión
}

function end_session(): void {
    $tok = $_COOKIE['phos_s'] ?? '';
    if ($tok !== '') db()->prepare('DELETE FROM sessions WHERE token_hash = ?')->execute([h($tok)]);
    cookie_set('phos_s', '', 0, true);
    cookie_set('phos_in', '', 0, false);
}

function current_user(): ?array {
    $tok = $_COOKIE['phos_s'] ?? '';
    if ($tok === '' || strlen($tok) > 100) return null;
    $st = db()->prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?');
    $st->execute([h($tok), now()]);
    $u = $st->fetch();
    return $u ?: null;
}

function require_user(): array {
    $u = current_user();
    if (!$u) { cookie_set('phos_in', '', 0, false); fail('Tienes que entrar en tu cuenta.', 401); }
    return $u;
}

function prefs_of(array $u): array {
    $p = json_decode($u['prefs'] ?? '', true);
    $p = is_array($p) ? $p : [];
    if (!(int)$u['relig_consent']) unset($p['br']);
    return $p;
}

// Solo se guardan estas preferencias, con límites de tamaño
function clean_prefs(array $in, bool $religConsent): array {
    $p = [];
    if ($religConsent && isset($in['br']) && in_array($in['br'], PHOS_BRANCHES, true)) $p['br'] = $in['br'];
    if (isset($in['oldCal'])) $p['oldCal'] = (bool)$in['oldCal'];
    foreach (['santo' => 60, 'lastPage' => 120, 'lastTitle' => 120, 'lastRead' => 200, 'food' => 120] as $k => $max) {
        if (isset($in[$k]) && is_string($in[$k])) {
            $v = trim(preg_replace('/[\x00-\x1F\x7F<>]/u', '', $in[$k]) ?? '');
            if ($v !== '') $p[$k] = mb_substr($v, 0, $max);
        }
    }
    if (isset($p['lastPage']) && !preg_match('#^/[a-z0-9/_\-.]*$#i', $p['lastPage'])) unset($p['lastPage']);
    if (isset($in['lastAt']) && is_string($in['lastAt']) && preg_match('/^\d{4}-\d\d-\d\d/', $in['lastAt'])) $p['lastAt'] = substr($in['lastAt'], 0, 25);
    return $p;
}

// Estados de Stripe en los que el donativo mensual sigue vivo (o puede volver a cobrarse)
const PHOS_SUB_LIVE = ['active', 'trialing', 'past_due', 'unpaid', 'incomplete', 'paused'];
function has_live_monthly(array $u): bool {
    return !empty($u['sub_status']) && in_array($u['sub_status'], PHOS_SUB_LIVE, true);
}

function public_user(array $u): array {
    return [
        'email' => $u['email'],
        'name' => $u['name'],
        'religConsent' => (bool)(int)$u['relig_consent'],
        'prefs' => prefs_of($u),
        'since' => substr((string)$u['created_at'], 0, 10),
        'ref' => 'u' . $u['id'],
        'alias' => $u['alias'] ?? null,
        'boletin' => !empty($u['news_at']),
        'admin' => is_admin($u),
        'monthly' => has_live_monthly($u) ? ['active' => true, 'amount' => isset($u['sub_amount']) ? (int)$u['sub_amount'] : null] : ['active' => false],
    ];
}

// ---- Moderación: quién puede ver el panel ----
// Correos con permiso de moderación.
//
// Solo la dirección del dominio. La de gmail se quitó a propósito: es pública
// por las redes sociales, y como se entra con un enlace enviado al correo,
// quien controlase ese buzón entraría aquí con permisos de moderación.
//
// Para volver a dar permiso a alguien no hace falta tocar este archivo ni
// publicar nada: basta con añadir su correo a la clave 'admins' de
// phos-config.php, en el servidor.
const PHOS_ADMINS = ['bienvenid@phosbiblias.com'];
function is_admin(?array $u): bool {
    if (!$u) return false;
    $c = phos_config() ?? [];
    $list = array_map('strtolower', array_merge(PHOS_ADMINS, (array)($c['admins'] ?? [])));
    return in_array(strtolower((string)$u['email']), $list, true);
}
