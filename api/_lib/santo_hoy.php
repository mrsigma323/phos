<?php
// Phos · «Santo de hoy»: se genera en el servidor cada día para que Google lo lea sin JavaScript
declare(strict_types=1);
date_default_timezone_set('Europe/Madrid');
$SH_DATA = json_decode((string)@file_get_contents(__DIR__ . '/santos.json'), true) ?: ['c' => [], 'o' => []];
$SH_MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
$SH_DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
function sh_key(DateTimeImmutable $d): string { return $d->format('n') . '-' . $d->format('j'); }
function sh_fecha(DateTimeImmutable $d, bool $dia = false): string {
    global $SH_MESES, $SH_DIAS;
    return ($dia ? $SH_DIAS[(int)$d->format('w')] . ', ' : '') . $d->format('j') . ' de ' . $SH_MESES[(int)$d->format('n') - 1];
}
function sh_clean(string $n): string { $n = preg_replace('/^En (la|el) /u', '', $n) ?? $n; return mb_strtoupper(mb_substr($n, 0, 1)) . mb_substr($n, 1); }
function sh_cat(DateTimeImmutable $d): array { global $SH_DATA; return array_map('sh_clean', $SH_DATA['c'][sh_key($d)] ?? []); }
function sh_ort(DateTimeImmutable $d): array { global $SH_DATA; return $SH_DATA['o'][sh_key($d)] ?? []; }
// Calendario juliano: hoy en el civil es 13 días antes en el juliano
function sh_jul(DateTimeImmutable $d): array { return sh_ort($d->modify('-13 days')); }
$SH_HOY = new DateTimeImmutable('today');
$c = sh_cat($SH_HOY); $o = sh_ort($SH_HOY);
$todos = array_merge($c, $o);
$santos = array_values(array_filter($todos, fn($n) => preg_match('/^(San|Santa|Santo|Santos|Santas|Beat)/u', $n)));
$prin = $santos[0] ?? ($todos[0] ?? '');
$SH_TITLE = 'Santo de hoy, ' . sh_fecha($SH_HOY) . ($prin !== '' ? ': ' . $prin : '') . ' · Phos';
$names = array_slice(array_values(array_unique(array_merge($c, $o))), 0, 4);
$SH_DESC = 'Santoral del ' . sh_fecha($SH_HOY, true) . ($names ? ': ' . implode(', ', $names) : '') . '. Santos del día en la Iglesia católica y en la ortodoxa (calendario nuevo y juliano).';
if (mb_strlen($SH_DESC) > 300) $SH_DESC = mb_substr($SH_DESC, 0, 297) . '…';
header('Cache-Control: public, max-age=900');
