<?php
// Elige o cambia el seudónimo con el que apareces en la comunidad
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require_same_origin();
$u = require_user();
$in = body_json();
// Retirar el consentimiento: se borran el seudónimo y todos sus mensajes
if (!empty($in['salir'])) {
    $pdo = db();
    $ids = $pdo->prepare('SELECT id FROM posts WHERE user_id = ?'); $ids->execute([$u['id']]);
    foreach ($ids->fetchAll(PDO::FETCH_COLUMN) as $pid) {
        $pdo->prepare('DELETE FROM reactions WHERE target = ?')->execute(['post:' . $pid]);
        $pdo->prepare('DELETE FROM reports WHERE post_id = ?')->execute([$pid]);
    }
    $pdo->prepare('DELETE FROM posts WHERE user_id = ?')->execute([$u['id']]);
    $pdo->prepare('UPDATE users SET alias = NULL, alias_lc = NULL, com_consent_at = NULL WHERE id = ?')->execute([$u['id']]);
    out(['ok' => true, 'alias' => null]);
}
if (!empty($u['banned_at'])) fail('Tu cuenta no puede participar en la comunidad.', 403);
if (empty($in['normas']) || empty($in['consiento'])) fail('Para participar tienes que aceptar las normas y dar tu consentimiento.');
$alias = check_alias((string)($in['alias'] ?? ''), is_admin($u));
$key = alias_key($alias);
$pdo = db();
if (!empty($u['alias']) && alias_key((string)$u['alias']) !== $key && !empty($u['alias_at']) && strtotime($u['alias_at'] . ' UTC') > time() - 30 * 86400 && !is_admin($u)) {
    fail('Solo puedes cambiar el seudónimo una vez al mes.');
}
$st = $pdo->prepare('SELECT id FROM users WHERE alias_lc = ? AND id <> ?');
$st->execute([$key, $u['id']]);
if ($st->fetchColumn()) fail('Ese seudónimo ya lo usa otra persona. Prueba con otro.');
$pdo->prepare('UPDATE users SET alias = ?, alias_lc = ?, alias_at = ?, com_consent_at = COALESCE(com_consent_at, ?) WHERE id = ?')
    ->execute([$alias, $key, now(), now(), $u['id']]);
out(['ok' => true, 'alias' => $alias]);
