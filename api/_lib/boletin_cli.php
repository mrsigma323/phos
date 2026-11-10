<?php
// Phos · envío del correo semanal. Solo se ejecuta desde la línea de órdenes del servidor (nunca desde la web).
// Uso: php api/_lib/boletin_cli.php semana.json [--prueba]
//   --prueba  envía solo a los correos de moderación (PHOS_ADMINS), estén o no apuntados
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__ . '/boot.php';
require __DIR__ . '/mail.php';

$file = $argv[1] ?? '';
$prueba = in_array('--prueba', $argv, true);
$W = json_decode((string)@file_get_contents($file), true);
if (!$W || empty($W['dias'])) { fwrite(STDERR, "No se ha podido leer el contenido de la semana.\n"); exit(1); }

$e = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
$BR = ['ortodoxa' => '☦️ Ortodoxa', 'catolica' => '⛪ Católica', 'protestante' => '📖 Protestante'];

// Contenido según la Iglesia de la persona (si nos dio su consentimiento para guardarla); si no, las tres
function semana_html(array $W, ?string $br, callable $e, array $BR): array {
    $brs = $br && isset($BR[$br]) ? [$br] : array_keys($BR);
    $h = ''; $t = '';
    foreach ($W['dias'] as $d) {
        $lines = []; $tl = [];
        foreach ($brs as $b) {
            $ig = $d['iglesias'][$b];
            $bits = [];
            foreach ($ig['fiestas'] as $f) $bits[] = '<b>' . $e($f) . '</b>';
            if ($ig['ayuno'] !== '') $bits[] = '🍽️ ' . $e(explode(':', $ig['ayuno'])[0]);
            // Santos del día, sin repetir los que ya salen como fiesta
            $sl = $b === 'catolica' ? $d['santos']['catolica'] : ($b === 'ortodoxa' ? $d['santos']['ortodoxa'] : []);
            $fz = mb_strtolower(implode(' ', $ig['fiestas']));
            $sl = array_values(array_filter($sl, function ($n) use ($fz) {
                $w = preg_split('/[\s,]+/u', mb_strtolower(preg_replace('/^(San|Santa|Santo|Santos|Santas|Beato|Beata)\s+/u', '', $n) ?? $n));
                return $fz === '' || !str_contains($fz, $w[0] ?? '');
            }));
            if ($sl) $bits[] = '😇 ' . $e(implode(' · ', array_slice($sl, 0, 2)));
            if (!$bits) continue;
            $pre = count($brs) > 1 ? '<span style="color:#7A5A1C">' . $BR[$b] . ':</span> ' : '';
            $lines[] = '<div style="margin:4px 0">' . $pre . implode(' — ', array_unique($bits)) . '</div>';
            $tl[] = (count($brs) > 1 ? strip_tags($BR[$b]) . ': ' : '') . html_entity_decode(strip_tags(implode(' — ', array_unique($bits))), ENT_QUOTES, 'UTF-8');
        }
        if (!$lines) continue;
        $h .= '<tr><td style="padding:12px 0;border-top:1px solid #E9E1D3;vertical-align:top;width:105px;font-weight:bold;color:#4A1416;text-transform:capitalize">' . $e($d['fecha']) . '</td><td style="padding:12px 0;border-top:1px solid #E9E1D3;font-size:15px;line-height:1.5">' . implode('', $lines) . '</td></tr>';
        $t .= "\n" . ucfirst($d['fecha']) . ":\n  " . implode("\n  ", $tl) . "\n";
    }
    $tiempo = [];
    foreach ($brs as $b) $tiempo[] = (count($brs) > 1 ? strip_tags($BR[$b]) . ': ' : '') . $W['dias'][0]['iglesias'][$b]['tiempo'];
    return [$h, $t, $tiempo];
}

$pdo = db();
if ($prueba) {
    $in = implode(',', array_fill(0, count(PHOS_ADMINS), '?'));
    $st = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) IN ($in)");
    $st->execute(array_map('strtolower', PHOS_ADMINS));
} else {
    $st = $pdo->query('SELECT * FROM users WHERE news_at IS NOT NULL ORDER BY id');
}
$users = $st->fetchAll();
$week = (string)$W['lunes'];
$sent = 0; $skip = 0;
foreach ($users as $u) {
    if (!$prueba) {
        $chk = $pdo->prepare('SELECT 1 FROM news_log WHERE week = ? AND user_id = ?');
        $chk->execute([$week, $u['id']]);
        if ($chk->fetchColumn()) { $skip++; continue; }
    }
    $tok = (string)($u['news_token'] ?? '');
    if (!preg_match('/^[a-f0-9]{32}$/', $tok)) {
        $tok = bin2hex(random_bytes(16));
        $pdo->prepare('UPDATE users SET news_token = ? WHERE id = ?')->execute([$tok, $u['id']]);
    }
    $p = prefs_of($u);
    $br = !empty($p['br']) ? (string)$p['br'] : null;
    [$rows, $txt, $tiempo] = semana_html($W, $br, $e, $BR);
    $baja = base_url() . '/api/boletin.php?baja=' . $tok;
    $hola = trim((string)($u['name'] ?? '')) !== '' ? 'Hola, ' . trim((string)$u['name']) : 'Hola';
    $v = $W['versiculo'];
    $subject = 'Phos · Tu semana con Cristo (' . $W['semana'] . ')';
    $text = "$hola:\n\nEsta es tu semana en Phos, del {$W['semana']}.\n\nVERSÍCULO DE LA SEMANA\n«{$v['texto']}» ({$v['ref']})\n\n"
          . "TIEMPO LITÚRGICO\n" . implode("\n", $tiempo) . "\n\nFIESTAS, SANTOS Y AYUNOS" . ($txt !== '' ? $txt : "\nUna semana tranquila, sin fiestas ni ayunos especiales.\n")
          . "\nCada día tienes las lecturas, el santo y la oración en " . base_url() . "\n\nQue la luz de Cristo te acompañe.\nPhos\n\n—\nRecibes este correo porque te apuntaste en Mi Phos. Para darte de baja: $baja\n";
    $html = '<!doctype html><html lang="es"><body style="margin:0;background:#F5EFE4;font-family:Arial,Helvetica,sans-serif;color:#2B1B17">'
          . '<div style="max-width:600px;margin:0 auto;padding:28px 20px">'
          . '<div style="background:#4A1416;border-radius:18px 18px 0 0;padding:26px 28px;color:#F5EBD8"><div style="font-family:Georgia,serif;font-size:30px;color:#E2C27A">☦ Phos</div><div style="font-size:15px;margin-top:4px">Tu semana con Cristo · ' . $e($W['semana']) . '</div></div>'
          . '<div style="background:#fff;border-radius:0 0 18px 18px;padding:26px 28px">'
          . '<p style="font-size:17px;margin:0 0 18px">' . $e($hola) . ':</p>'
          . '<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#7A5A1C;margin:0 0 6px">Versículo de la semana</p>'
          . '<p style="font-family:Georgia,serif;font-size:21px;line-height:1.45;color:#4A1416;margin:0">«' . $e($v['texto']) . '»</p><p style="color:#6B5E57;margin:6px 0 22px">' . $e($v['ref']) . '</p>'
          . '<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#7A5A1C;margin:0 0 6px">Tiempo litúrgico</p><p style="margin:0 0 22px;line-height:1.5">' . implode('<br>', array_map($e, $tiempo)) . '</p>'
          . '<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#7A5A1C;margin:0 0 4px">Fiestas, santos y ayunos</p>'
          . ($rows !== '' ? '<table role="presentation" style="width:100%;border-collapse:collapse">' . $rows . '</table>' : '<p>Una semana tranquila, sin fiestas ni ayunos especiales.</p>')
          . '<p style="margin:26px 0 8px;text-align:center"><a href="' . $e(base_url()) . '/lecturas.html" style="background:#4A1416;color:#F5EFE4;text-decoration:none;font-weight:bold;padding:13px 24px;border-radius:999px;display:inline-block">Lecturas de hoy</a></p>'
          . '<p style="text-align:center;margin:0"><a href="' . $e(base_url()) . '/santo-de-hoy" style="color:#4A1416">Santo de hoy</a> · <a href="' . $e(base_url()) . '/muro-oracion.html" style="color:#4A1416">Muro de oración</a></p>'
          . '</div><p style="font-size:12px;color:#6B5E57;line-height:1.5;text-align:center;margin:18px 10px">Recibes este correo porque te apuntaste al correo semanal en Mi Phos. <a href="' . $e($baja) . '" style="color:#6B5E57">Darme de baja</a></p></div></body></html>';
    if (getenv('PHOS_DUMP_HTML')) file_put_contents((string)getenv('PHOS_DUMP_HTML'), $html);
    $ok = phos_mail((string)$u['email'], $subject, $text, $html, '', [
        'List-Unsubscribe' => '<' . $baja . '>',
        'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
    ]);
    if ($ok) {
        $sent++;
        if (!$prueba) $pdo->prepare('INSERT INTO news_log (week, user_id, sent_at) VALUES (?, ?, ?)')->execute([$week, $u['id'], now()]);
    }
    usleep(300000); // sin prisas, para no parecer correo masivo
}
echo "Correo semanal ($week): enviados $sent" . ($skip ? ", ya enviados antes $skip" : '') . ($prueba ? ' (prueba)' : '') . ".\n";
