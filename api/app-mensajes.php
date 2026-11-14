<?php
// App de Android: «Mensajes de Phos». Generales (para todos) y personales (solo con sesión).
// Para enviar uno: insertar una fila en app_messages (phpMyAdmin de SiteGround):
//   general → user_id NULL (y lang NULL para todos los idiomas, o 'es', 'en'...)
//   personal → user_id = id de la cuenta en la tabla users
require __DIR__ . '/_lib/app.php';
app_cors();
$in = app_body(2000);
if (!rate_ok('msg:' . client_ip(), 120, 3600)) fail('Demasiadas peticiones.', 429);
$pdo = db();
$my = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
$pdo->exec('CREATE TABLE IF NOT EXISTS app_messages (id ' . ($my ? 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT')
    . ', user_id BIGINT NULL, lang VARCHAR(8) NULL, title VARCHAR(160) NOT NULL, body TEXT NOT NULL, link VARCHAR(255) NULL, created_at DATETIME NOT NULL)'
    . ($my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : ''));
$lang = preg_match('/^[a-z]{2}$/', (string)($in['lang'] ?? '')) ? $in['lang'] : 'es';
$uid = 0;
if (app_token() !== '') {
    $st = $pdo->prepare('SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?');
    $st->execute([h(app_token()), now()]);
    $uid = (int)$st->fetchColumn();
}
$st = $pdo->prepare('SELECT id, user_id, title, body, link, created_at FROM app_messages
    WHERE ((user_id IS NULL AND (lang IS NULL OR lang = ?)) OR (user_id = ? AND ? > 0)) ORDER BY created_at DESC LIMIT 30');
$st->execute([$lang, $uid, $uid]);
$out = [];
foreach ($st->fetchAll() as $m) {
    $out[] = ['id' => 'm' . $m['id'], 'title' => $m['title'], 'body' => $m['body'], 'link' => $m['link'],
        'ts' => strtotime($m['created_at'] . ' UTC') * 1000, 'personal' => $m['user_id'] !== null];
}
out(['ok' => true, 'messages' => $out]);
