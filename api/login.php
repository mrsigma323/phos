<?php
// Pide el enlace de acceso por correo. Sirve tanto para registrarse como para entrar.
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/mail.php';
require_same_origin();
$in = body_json();
$email = strtolower(trim((string)($in['email'] ?? '')));
// Campo trampa: está escondido en la página, así que una persona nunca lo rellena.
// Si viene con algo, es un programa. Se responde que todo ha ido bien y no se envía
// nada: si le dijéramos que ha fallado, quien lo programó corregiría la trampa.
if (trim((string)($in['hp'] ?? '')) !== '') out(['ok' => true]);

// Tiempo desde que se pintó el formulario. Una persona tarda en escribir su correo
// y marcar la casilla; un programa lo envía al instante.
$dt = $in['dt'] ?? null;
if (is_numeric($dt) && (int)$dt < 1500) out(['ok' => true]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) fail('Escribe un correo electrónico válido.');
if (empty($in['acepto'])) fail('Para crear tu cuenta tienes que aceptar la política de privacidad.');
if (!rate_ok('ip:' . client_ip(), 6, 3600) || !rate_ok('mail:' . $email, 3, 3600)) {
    fail('Has pedido demasiados enlaces. Espera un rato y vuelve a intentarlo.', 429);
}
// Tope general: aunque vengan de muchas direcciones distintas, Phos no manda más
// de 120 enlaces por hora. Protege la reputación del correo del dominio.
if (!rate_ok('mail:global', 120, 3600)) {
    fail('Ahora mismo no se pueden enviar más enlaces. Inténtalo dentro de un rato.', 429);
}
$tok = rnd();
db()->prepare('INSERT INTO login_tokens (email, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)')
    ->execute([$email, h($tok), now(PHOS_TOKEN_MINUTES * 60), now()]);
db()->prepare('DELETE FROM login_tokens WHERE expires_at < ?')->execute([now(-86400)]);
$ok = send_login_mail($email, base_url() . '/api/entrar.php?t=' . $tok);
if (!$ok) fail('No se ha podido enviar el correo. Inténtalo de nuevo más tarde.', 500);
out(['ok' => true]);
