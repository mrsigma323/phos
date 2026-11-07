<?php
// Borra la cuenta y todos sus datos (derecho de supresión)
require __DIR__ . '/_lib/boot.php';
require_same_origin();
$u = require_user();
$in = body_json();
if (($in['confirmo'] ?? '') !== 'BORRAR') fail('Confirma el borrado.');
$pdo = db();
$pdo->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$u['id']]);
$pdo->prepare('DELETE FROM login_tokens WHERE email = ?')->execute([$u['email']]);
$pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$u['id']]);
cookie_set('phos_s', '', 0, true);
cookie_set('phos_in', '', 0, false);
out(['ok' => true]);
