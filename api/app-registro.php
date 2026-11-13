<?php
// App de Android: registro de aceptaciones (aviso, condiciones e inicio inmediato) y, solo si la persona
// lo marca, copia de su ficha de «Regla de vida». No se reciben datos de salud.
require __DIR__ . '/_lib/app.php';
app_cors();
$in = app_body(20000);
if (!rate_ok('reg:' . client_ip(), 30, 3600)) fail('Demasiadas peticiones.', 429);
$cid = (string)($in['cid'] ?? '');
if (!preg_match('/^PH-[A-Z0-9]{2,8}-[A-Z0-9]{2,8}$/', $cid)) fail('Código de cliente no válido.');
$pdo = db();
$my = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
$pdo->exec('CREATE TABLE IF NOT EXISTS app_records (id ' . ($my ? 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT')
    . ', cid VARCHAR(24) NOT NULL, user_id BIGINT NULL, terms_version VARCHAR(40) NOT NULL, acceptances TEXT NOT NULL, ficha TEXT NULL,'
    . ' order_id VARCHAR(80) NULL, products VARCHAR(160) NULL, lang VARCHAR(8) NULL, app VARCHAR(16) NULL, ip_hash CHAR(64) NULL, created_at DATETIME NOT NULL)'
    . ($my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : ''));
// Si hay sesión de la app, se vincula a la cuenta
$uid = null;
if (app_token() !== '') {
    $st = $pdo->prepare('SELECT s.user_id FROM sessions s WHERE s.token_hash = ? AND s.expires_at > ?');
    $st->execute([h(app_token()), now()]);
    $uid = $st->fetchColumn() ?: null;
}
$clean = function ($v, int $n) { return mb_substr(preg_replace('/[\x00-\x1F\x7F<>]/u', '', (string)$v) ?? '', 0, $n); };
$acc = [];
foreach ((array)($in['acc'] ?? []) as $k => $v) if (in_array($k, ['disc', 'pay1', 'pay1v', 'pay2', 'order', 'product'], true)) $acc[$k] = $clean($v, 80);
$copy = !empty($in['copy']);
$ficha = null;
if ($copy && is_array($in['ficha'] ?? null)) {
    $f = $in['ficha'];
    $goals = array_values(array_intersect((array)($f['goals'] ?? []), ['pray', 'read', 'move', 'rest', 'fast', 'screen', 'silence']));
    $ficha = json_encode(['name' => $clean($f['name'] ?? '', 40), 'adult' => !empty($f['adult']), 'goals' => $goals, 'level' => (int)($f['level'] ?? 0),
        'hour' => $clean($f['hour'] ?? '', 5), 'prog' => is_array($f['prog'] ?? null) ? ['id' => $clean($f['prog']['id'] ?? '', 8), 'start' => $clean($f['prog']['start'] ?? '', 10)] : null,
        'started' => $clean($f['started'] ?? '', 10)], JSON_UNESCAPED_UNICODE);
}
if (!$copy) $pdo->prepare('UPDATE app_records SET ficha = NULL WHERE cid = ?')->execute([$cid]); // retirada del consentimiento
$p = is_array($in['purchase'] ?? null) ? $in['purchase'] : null;
if (!$ficha && !$p) out(['ok' => true]);
$pdo->prepare('INSERT INTO app_records (cid, user_id, terms_version, acceptances, ficha, order_id, products, lang, app, ip_hash, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
    ->execute([$cid, $uid, $clean($in['termsVersion'] ?? '', 40), json_encode($acc, JSON_UNESCAPED_UNICODE), $ficha,
        $p ? $clean($p['order'] ?? '', 80) : null, $p ? $clean(implode(',', (array)($p['products'] ?? [])), 160) : null,
        $clean($in['lang'] ?? '', 8), $clean($in['app'] ?? '', 16), h(client_ip() . date('Y-m')), now()]);
out(['ok' => true]);
