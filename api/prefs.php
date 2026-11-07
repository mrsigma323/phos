<?php
// Guarda las preferencias (se fusionan con las que ya había)
require __DIR__ . '/_lib/boot.php';
require_same_origin();
$u = require_user();
$in = body_json();
$pdo = db();
$consent = (int)$u['relig_consent'];
if (array_key_exists('religConsent', $in)) {
    $new = $in['religConsent'] ? 1 : 0;
    if ($new !== $consent) {
        $pdo->prepare('UPDATE users SET relig_consent = ?, relig_consent_at = ? WHERE id = ?')->execute([$new, $new ? now() : null, $u['id']]);
        $consent = $new;
    }
}
if (array_key_exists('name', $in)) {
    $name = mb_substr(trim(preg_replace('/[\x00-\x1F\x7F<>]/u', '', (string)$in['name']) ?? ''), 0, 80);
    $pdo->prepare('UPDATE users SET name = ? WHERE id = ?')->execute([$name !== '' ? $name : null, $u['id']]);
}
$old = json_decode($u['prefs'] ?? '', true);
$old = is_array($old) ? $old : [];
$merged = array_merge($old, clean_prefs(is_array($in['prefs'] ?? null) ? $in['prefs'] : [], (bool)$consent));
foreach ((array)($in['clear'] ?? []) as $k) unset($merged[(string)$k]);
if (!$consent) unset($merged['br']); // sin consentimiento no se guarda la tradición
$pdo->prepare('UPDATE users SET prefs = ? WHERE id = ?')->execute([json_encode($merged, JSON_UNESCAPED_UNICODE), $u['id']]);
$st = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$st->execute([$u['id']]);
out(['ok' => true, 'user' => public_user($st->fetch())]);
