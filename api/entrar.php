<?php
// El enlace del correo abre esta página. Se pide pulsar un botón para que los
// filtros antispam que «abren» los enlaces no gasten el acceso.
require __DIR__ . '/_lib/boot.php';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$tok = (string)($method === 'POST' ? ($_POST['t'] ?? '') : ($_GET['t'] ?? ''));
function page(string $title, string $inner): void {
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'");
    echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>' . $title . ' · Phos</title><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/web.css"></head><body><main class="wrap narrow" style="padding:72px 24px;text-align:center"><p class="kicker">Phos</p>' . $inner . '</main></body></html>';
    exit;
}
if ($tok === '' || strlen($tok) > 100) page('Enlace no válido', '<h1>Enlace no válido</h1><p class="lead">Pide un enlace nuevo desde <a href="/mi-phos.html">Mi Phos</a>.</p>');
if ($method !== 'POST') {
    $t = htmlspecialchars($tok, ENT_QUOTES);
    page('Entrar', '<h1>Entrar en Phos</h1><p class="lead">Pulsa el botón para terminar de entrar en tu cuenta.</p><form method="post" style="margin-top:28px"><input type="hidden" name="t" value="' . $t . '"><button class="btn big" type="submit">Entrar en Phos</button></form>');
}
require_same_origin(false);
$pdo = db();
$st = $pdo->prepare('SELECT * FROM login_tokens WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?');
$st->execute([h($tok), now()]);
$row = $st->fetch();
if (!$row) page('Enlace caducado', '<h1>Este enlace ya no sirve</h1><p class="lead">Ha caducado o ya se usó. Pide uno nuevo desde <a href="/mi-phos.html">Mi Phos</a>.</p>');
$pdo->prepare('UPDATE login_tokens SET used_at = ? WHERE id = ?')->execute([now(), $row['id']]);
$st = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$st->execute([$row['email']]);
$uid = $st->fetchColumn();
if (!$uid) {
    $pdo->prepare('INSERT INTO users (email, created_at) VALUES (?, ?)')->execute([$row['email'], now()]);
    $uid = $pdo->lastInsertId();
}
start_session((int)$uid);
header('Location: /mi-phos.html?bienvenida=1', true, 303);
exit;
