<?php
// Correo semanal: apuntarse o darse de baja (con sesión), y baja con un clic desde el propio correo
require __DIR__ . '/_lib/boot.php';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$baja = (string)($_GET['baja'] ?? '');
if ($baja !== '') {
    header('X-Robots-Tag: noindex, nofollow');
    header('Content-Type: text/html; charset=utf-8');
    $valid = (bool)preg_match('/^[a-f0-9]{32}$/', $baja);
    $done = false;
    // La baja se hace con POST: el botón de esta página o la baja de un clic del gestor de correo.
    // Un simple GET no da de baja (los antivirus abren los enlaces de los correos por su cuenta).
    if ($method === 'POST' && $valid) {
        db()->prepare('UPDATE users SET news_at = NULL WHERE news_token = ?')->execute([$baja]);
        $done = true;
    }
    $e = fn($x) => htmlspecialchars($x, ENT_QUOTES);
    echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Correo semanal · Phos</title><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/web.css"></head><body><main class="wrap narrow" style="padding:72px 24px;text-align:center"><p class="kicker">Phos · Correo semanal</p>';
    if (!$valid) echo '<h1>Enlace no válido</h1><p class="lead">Puedes darte de baja desde <a href="/mi-phos.html">Mi Phos</a>.</p>';
    elseif ($done) echo '<h1>Te has dado de baja</h1><p class="lead">Ya no recibirás el correo semanal de Phos. Si cambias de idea, puedes volver a apuntarte cuando quieras desde <a href="/mi-phos.html">Mi Phos</a>.</p><p><a class="btn" href="/">Ir a Phos</a></p>';
    else echo '<h1>¿Darte de baja del correo semanal?</h1><p class="lead">Dejarás de recibir cada domingo el versículo, los santos y los ayunos de la semana. Tu cuenta sigue igual.</p><form method="post" action="?baja=' . $e($baja) . '"><button class="btn" type="submit">Sí, darme de baja</button></form><p class="small" style="margin-top:18px"><a href="/">No, volver a Phos</a></p>';
    echo '</main></body></html>';
    exit;
}
require_same_origin();
$u = require_user();
$in = body_json();
if (!empty($in['on'])) {
    $tok = $u['news_token'] ?? '';
    if (!preg_match('/^[a-f0-9]{32}$/', (string)$tok)) $tok = bin2hex(random_bytes(16));
    db()->prepare('UPDATE users SET news_at = COALESCE(news_at, ?), news_token = ? WHERE id = ?')->execute([now(), $tok, $u['id']]);
    out(['ok' => true, 'boletin' => true]);
}
db()->prepare('UPDATE users SET news_at = NULL WHERE id = ?')->execute([$u['id']]);
out(['ok' => true, 'boletin' => false]);
