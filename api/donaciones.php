<?php
// Resumen mensual de los donativos del usuario (últimos 12 meses), solo para el gráfico informativo
require __DIR__ . '/_lib/boot.php';
$u = require_user();
$months = [];
$y = (int)gmdate('Y'); $m = (int)gmdate('n');
for ($i = 11; $i >= 0; $i--) {
    $mm = $m - $i; $yy = $y;
    while ($mm < 1) { $mm += 12; $yy--; }
    $months[sprintf('%04d-%02d', $yy, $mm)] = ['mensual' => 0, 'puntual' => 0];
}
$from = array_key_first($months) . '-01 00:00:00';
$st = db()->prepare("SELECT kind, amount, at FROM donations WHERE user_id = ? AND at >= ? AND currency = 'eur'");
$st->execute([$u['id'], $from]);
foreach ($st as $r) {
    $k = substr((string)$r['at'], 0, 7);
    if (isset($months[$k]) && isset($months[$k][$r['kind']])) $months[$k][$r['kind']] += (int)$r['amount'];
}
$out = [];
foreach ($months as $k => $v) $out[] = ['m' => $k] + $v;
out(['ok' => true, 'months' => $out]);
