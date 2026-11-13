<?php
// App de Android: sincroniza subrayados, notas, progreso, planes y diario con la cuenta.
// Son datos que pueden revelar creencias religiosas: solo se guardan con consentimiento expreso.
require __DIR__ . '/_lib/app.php';
app_cors();
$u = app_user();
$in = app_body();
$pdo = db();
app_sync_table($pdo);
if (empty($in['consent'])) {
    // Retira el consentimiento: se borra lo sincronizado y la tradición guardada
    $pdo->prepare('DELETE FROM app_sync WHERE user_id = ?')->execute([$u['id']]);
    $pdo->prepare('UPDATE users SET relig_consent = 0, relig_consent_at = NULL WHERE id = ?')->execute([$u['id']]);
    out(['ok' => true, 'data' => new stdClass()]);
}
if (!(int)$u['relig_consent']) $pdo->prepare('UPDATE users SET relig_consent = 1, relig_consent_at = ? WHERE id = ?')->execute([now(), $u['id']]);
$st = $pdo->prepare('SELECT data FROM app_sync WHERE user_id = ?');
$st->execute([$u['id']]);
$old = json_decode((string)$st->fetchColumn(), true);
$old = is_array($old) ? $old : [];
foreach ((array)($in['data'] ?? []) as $k => $x) {
    $k = (string)$k;
    if (!preg_match('/^[A-Za-z0-9_.:\-]{1,80}$/', $k) || !is_array($x) || !is_string($x['v'] ?? null)) continue;
    $ts = (int)($x['ts'] ?? 0);
    if (!isset($old[$k]) || $ts > (int)$old[$k]['ts']) $old[$k] = ['v' => $x['v'], 'ts' => $ts];
}
$json = json_encode($old, JSON_UNESCAPED_UNICODE);
if (strlen($json) > 2000000) fail('Has llegado al límite de datos sincronizados.', 413);
$my = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
$pdo->prepare($my ? 'INSERT INTO app_sync (user_id, data, updated_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = VALUES(updated_at)'
                  : 'INSERT OR REPLACE INTO app_sync (user_id, data, updated_at) VALUES (?, ?, ?)')->execute([$u['id'], $json, now()]);
out(['ok' => true, 'data' => $old ?: new stdClass()]);
