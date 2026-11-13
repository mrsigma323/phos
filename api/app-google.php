<?php
// App de Android: «Entrar con Google». Comprueba el token de Google y abre una sesión de Phos.
// En phos-config.php: 'google_client_ids' => ['<ID de cliente web>.apps.googleusercontent.com']
require __DIR__ . '/_lib/app.php';
app_cors();
$in = app_body(20000);
$idt = (string)($in['idToken'] ?? '');
if ($idt === '' || strlen($idt) > 4096) fail('Falta el token de Google.');
if (!rate_ok('gin:' . client_ip(), 20, 3600)) fail('Demasiados intentos. Espera un rato.', 429);
$cfg = phos_config() ?: [];
$aud = (array)($cfg['google_client_ids'] ?? []);
if (!$aud) fail('Entrar con Google aún no está activado.', 503);
// Google comprueba la firma y la caducidad del token
$ctx = stream_context_create(['http' => ['timeout' => 8, 'ignore_errors' => true]]);
$raw = @file_get_contents('https://oauth2.googleapis.com/tokeninfo?id_token=' . rawurlencode($idt), false, $ctx);
$g = json_decode((string)$raw, true);
if (!is_array($g) || empty($g['email'])) fail('Google no ha validado el acceso.', 401);
if (!in_array($g['aud'] ?? '', $aud, true)) fail('Token no destinado a Phos.', 401);
if (!in_array($g['iss'] ?? '', ['accounts.google.com', 'https://accounts.google.com'], true)) fail('Emisor no válido.', 401);
if ((string)($g['email_verified'] ?? '') !== 'true') fail('Tu correo de Google no está verificado.', 401);
if ((int)($g['exp'] ?? 0) < time()) fail('El acceso ha caducado. Inténtalo de nuevo.', 401);
$email = strtolower(trim((string)$g['email']));
$pdo = db();
$st = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$st->execute([$email]);
$u = $st->fetch();
if (!$u) {
    $pdo->prepare('INSERT INTO users (email, created_at) VALUES (?, ?)')->execute([$email, now()]);
    $st->execute([$email]);
    $u = $st->fetch();
}
$tok = app_session((int)$u['id']);
out(['ok' => true, 'token' => $tok, 'user' => public_user($u)]);
