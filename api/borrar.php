<?php
// Borra la cuenta y todos sus datos (derecho de supresión)
require __DIR__ . '/_lib/boot.php';
require_same_origin();
$u = require_user();
$in = body_json();
if (($in['confirmo'] ?? '') !== 'BORRAR') fail('Confirma el borrado.');
// No se puede borrar la cuenta con un donativo mensual vivo: así nunca quedan cobros sin una cuenta desde la que cancelarlos
if (has_live_monthly($u)) fail('Tienes un donativo mensual activo. Cancélalo primero desde «Donativo mensual» y después podrás borrar tu cuenta.', 409);
$pdo = db();
$pdo->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$u['id']]);
$pdo->prepare('DELETE FROM login_tokens WHERE email = ?')->execute([$u['email']]);
// Los donativos quedan registrados en Stripe a efectos fiscales; aquí se desvinculan de la persona
$pdo->prepare('UPDATE donations SET user_id = NULL WHERE user_id = ?')->execute([$u['id']]);
// Comunidad: se borran sus mensajes, sus reacciones y sus denuncias
$ids = $pdo->prepare('SELECT id FROM posts WHERE user_id = ?'); $ids->execute([$u['id']]);
foreach ($ids->fetchAll(PDO::FETCH_COLUMN) as $pid) {
    $pdo->prepare('DELETE FROM reactions WHERE target = ?')->execute(['post:' . $pid]);
    $pdo->prepare('DELETE FROM reports WHERE post_id = ?')->execute([$pid]);
}
$pdo->prepare('DELETE FROM posts WHERE user_id = ?')->execute([$u['id']]);
$pdo->prepare('DELETE FROM reactions WHERE who = ?')->execute([h('u:' . $u['id'])]);
$pdo->prepare('DELETE FROM reports WHERE who = ?')->execute([h('u:' . $u['id'])]);
$pdo->prepare('DELETE FROM news_log WHERE user_id = ?')->execute([$u['id']]);
$pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$u['id']]);
cookie_set('phos_s', '', 0, true);
cookie_set('phos_in', '', 0, false);
out(['ok' => true]);
