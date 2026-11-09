<?php
// «Amén» en lecturas y artículos, «Rezo por ti» en el muro de oración (se pone y se quita)
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require_same_origin();
$in = body_json();
$t = (string)($in['t'] ?? '');
$k = (string)($in['k'] ?? '');
if (!valid_target($t)) fail('Tema no válido.');
if (!(($k === 'amen' && !str_starts_with($t, 'post:') && $t !== 'muro') || ($k === 'rezo' && str_starts_with($t, 'post:')))) fail('Reacción no válida.');
$me = current_user();
$who = reactor($me, (string)($in['a'] ?? ''));
if (!$who) fail('No se ha podido guardar.');
if (!rate_ok('reac:' . client_ip(), 120, 3600)) fail('Demasiados clics seguidos. Espera un momento.', 429);
$pdo = db();
if ($k === 'rezo') {
    $st = $pdo->prepare("SELECT 1 FROM posts WHERE id = ? AND status = 'publicado'");
    $st->execute([(int)substr($t, 5)]);
    if (!$st->fetchColumn()) fail('Ese mensaje ya no está.', 404);
}
$st = $pdo->prepare('SELECT id FROM reactions WHERE target = ? AND kind = ? AND who = ?');
$st->execute([$t, $k, $who]);
$id = $st->fetchColumn();
if ($id) $pdo->prepare('DELETE FROM reactions WHERE id = ?')->execute([$id]);
else $pdo->prepare('INSERT INTO reactions (target, kind, who, created_at) VALUES (?, ?, ?, ?)')->execute([$t, $k, $who, now()]);
$st = $pdo->prepare('SELECT COUNT(*) FROM reactions WHERE target = ? AND kind = ?');
$st->execute([$t, $k]);
out(['ok' => true, 'n' => (int)$st->fetchColumn(), 'mine' => !$id]);
