<?php
// Lista los mensajes publicados de un tema y las reacciones («Amén»)
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
$t = (string)($_GET['t'] ?? '');
if (!valid_target($t) || str_starts_with($t, 'post:')) fail('Tema no válido.');
$me = current_user();
$who = reactor($me, (string)($_GET['a'] ?? ''));
$pdo = db();
$res = ['ok' => true, 'premod' => premod(), 'me' => $me ? [
    'alias' => $me['alias'] ?? null,
    'banned' => !empty($me['banned_at']),
    'admin' => is_admin($me),
] : null];
// «Amén» del tema
$st = $pdo->prepare("SELECT COUNT(*) FROM reactions WHERE target = ? AND kind = 'amen'");
$st->execute([$t]);
$mine = false;
if ($who) { $s2 = $pdo->prepare("SELECT 1 FROM reactions WHERE target = ? AND kind = 'amen' AND who = ?"); $s2->execute([$t, $who]); $mine = (bool)$s2->fetchColumn(); }
$res['amen'] = ['n' => (int)$st->fetchColumn(), 'mine' => $mine];
// Mensajes: los publicados y, para su autor, los suyos pendientes
$sql = "SELECT p.*, u.alias, u.email,
          (SELECT COUNT(*) FROM reactions r WHERE r.target = CONCAT('post:', p.id) AND r.kind = 'rezo') AS rezo,
          (SELECT COUNT(*) FROM reactions r WHERE r.target = CONCAT('post:', p.id) AND r.kind = 'rezo' AND r.who = ?) AS mine_rezo
        FROM posts p JOIN users u ON u.id = p.user_id
        WHERE p.target = ? AND (p.status = 'publicado' OR (p.status = 'pendiente' AND p.user_id = ?))
        ORDER BY p.created_at DESC, p.id DESC LIMIT 60";
if ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) !== 'mysql') $sql = str_replace("CONCAT('post:', p.id)", "('post:' || p.id)", $sql);
$st = $pdo->prepare($sql);
$st->execute([$who ?? '-', $t, $me ? (int)$me['id'] : 0]);
$res['posts'] = array_map(fn($p) => public_post($p, $me, $who), $st->fetchAll());
out($res);
