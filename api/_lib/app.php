<?php
// Phos · puntos de entrada para la app de Android (Google Play).
// La app no usa cookies: envía «Authorization: Bearer <token>» desde https://appassets.androidplatform.net
require_once __DIR__ . '/boot.php';
const PHOS_APP_ORIGIN = 'https://appassets.androidplatform.net';

function app_cors(): void {
    if (($_SERVER['HTTP_ORIGIN'] ?? '') === PHOS_APP_ORIGIN) {
        header('Access-Control-Allow-Origin: ' . PHOS_APP_ORIGIN);
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Phos');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Max-Age: 86400');
        header('Vary: Origin');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fail('Método no permitido.', 405);
}

function app_body(int $max = 900000): array {
    $raw = file_get_contents('php://input') ?: '';
    if (strlen($raw) > $max) fail('Petición demasiado grande.', 413);
    $d = json_decode($raw, true);
    return is_array($d) ? $d : [];
}

function app_token(): string {
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    return preg_match('/^Bearer\s+([A-Za-z0-9_\-]{20,100})$/', trim($h), $m) ? $m[1] : '';
}

function app_user(): array {
    $tok = app_token();
    if ($tok === '') fail('Tienes que entrar en tu cuenta.', 401);
    $st = db()->prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?');
    $st->execute([h($tok), now()]);
    $u = $st->fetch();
    if (!$u) fail('Tienes que entrar en tu cuenta.', 401);
    return $u;
}

/** Crea una sesión para la app y devuelve el token (no se guarda en claro). */
function app_session(int $userId): string {
    $tok = rnd();
    db()->prepare('DELETE FROM sessions WHERE expires_at < ?')->execute([now()]);
    db()->prepare('INSERT INTO sessions (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)')
        ->execute([$userId, h($tok), now(PHOS_SESSION_DAYS * 86400), now()]);
    db()->prepare('UPDATE users SET last_login = ? WHERE id = ?')->execute([now(), $userId]);
    return $tok;
}

function app_sync_table(PDO $pdo): void {
    $my = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
    $pdo->exec('CREATE TABLE IF NOT EXISTS app_sync (user_id BIGINT NOT NULL PRIMARY KEY, data ' . ($my ? 'MEDIUMTEXT' : 'TEXT')
        . ' NOT NULL, updated_at DATETIME NOT NULL)' . ($my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : ''));
}
