<?php
// Phos · contenido del día ya escrito desde el servidor (lecturas, Evangelio y reflexión)
// Los datos se preparan al publicar la web; aquí solo se elige el día de hoy.
declare(strict_types=1);
date_default_timezone_set('Europe/Madrid');
$DIA_ALL = json_decode((string)@file_get_contents(__DIR__ . '/dia.json'), true) ?: ['dias' => [], 'fuente' => ''];
$DIA_HOY = $DIA_ALL['dias'][date('Y-m-d')] ?? null;
if ($DIA_HOY === null && $DIA_ALL['dias']) $DIA_HOY = reset($DIA_ALL['dias']); // por si los datos se quedan atrás
function dia_txt(?array $d, string $a, string $b, string $def = ''): string {
    $v = $b === '' ? ($d[$a] ?? '') : ($d[$a][$b] ?? '');
    return htmlspecialchars($v !== '' ? (string)$v : $def, ENT_QUOTES, 'UTF-8');
}
