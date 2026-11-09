<?php
// Publica un comentario o una intención de oración (pasa por moderación)
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require __DIR__ . '/_lib/mail.php';
require_same_origin();
$u = require_user();
$in = body_json();
if (!empty($u['banned_at'])) fail('Tu cuenta no puede participar en la comunidad.', 403);
if (empty($u['alias']) || empty($u['com_consent_at'])) fail('Primero elige tu seudónimo.', 409);
$t = (string)($in['t'] ?? '');
$kind = (string)($in['kind'] ?? '');
if (!valid_target($t) || str_starts_with($t, 'post:') || !isset(COM_KINDS[$kind])) fail('Tema no válido.');
if (($t === 'muro') !== ($kind === 'oracion')) fail('Tema no válido.');
$body = clean_text((string)($in['body'] ?? ''), COM_KINDS[$kind]);
if (mb_strlen($body) < 3) fail('Escribe un poco más.');
if (preg_match('~(https?://|www\.|\b[a-z0-9-]+\.(com|es|net|org|info|ru|xyz|io)\b)~i', $body)) fail('Por seguridad no se permiten enlaces en los mensajes.');
if (preg_match('/[^@\s]+@[^@\s]+\.[a-z]{2,}/i', $body) || preg_match('/(\+?\d[\d \-]{8,}\d)/', $body)) fail('No compartas correos ni teléfonos: protegen tu privacidad.');
if (!rate_ok('post:' . $u['id'], 5, 3600) || !rate_ok('postd:' . $u['id'], 20, 86400) || !rate_ok('postip:' . client_ip(), 30, 86400)) {
    fail('Has escrito muchos mensajes seguidos. Espera un rato, por favor.', 429);
}
$status = premod() ? 'pendiente' : 'publicado';
$pdo = db();
$pdo->prepare('INSERT INTO posts (user_id, target, kind, body, status, ip, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    ->execute([$u['id'], $t, $kind, $body, $status, client_ip(), now()]);
purge_ips();
// Aviso al moderador (como mucho uno cada 15 minutos)
if ($status === 'pendiente' && rate_ok('aviso-moderacion', 1, 900)) {
    $n = (int)$pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'pendiente'")->fetchColumn();
    phos_mail(PHOS_ADMINS[0], "Phos: $n mensaje(s) esperando revisión",
        "Hay $n mensaje(s) de la comunidad esperando revisión.\n\nPanel de moderación: " . base_url() . "/api/moderar.php\n");
}
out(['ok' => true, 'pending' => $status === 'pendiente']);
