<?php
// El autor puede borrar su propio mensaje en cualquier momento
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require_same_origin();
$u = require_user();
$in = body_json();
$id = (int)($in['id'] ?? 0);
$pdo = db();
$st = $pdo->prepare('SELECT id FROM posts WHERE id = ? AND user_id = ?');
$st->execute([$id, $u['id']]);
if (!$st->fetchColumn()) fail('No encontramos ese mensaje.', 404);
$pdo->prepare('DELETE FROM reactions WHERE target = ?')->execute(['post:' . $id]);
$pdo->prepare('DELETE FROM reports WHERE post_id = ?')->execute([$id]);
$pdo->prepare('DELETE FROM posts WHERE id = ?')->execute([$id]);
out(['ok' => true]);
