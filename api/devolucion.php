<?php
// Solicitud de devolución de una aportación (formulario de «Condiciones de las aportaciones»)
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/mail.php';
require_same_origin();
$in = body_json();
$clean = fn($v, $max) => mb_substr(trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>]/u', '', (string)$v) ?? ''), 0, $max);
$email = strtolower($clean($in['email'] ?? '', 190));
$date = (string)($in['fecha'] ?? '');
$amountRaw = str_replace(',', '.', $clean($in['importe'] ?? '', 12));
$receipt = $clean($in['recibo'] ?? '', 60);
$reason = $clean($in['motivo'] ?? '', 1000);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Escribe el correo con el que hiciste la aportación.');
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || strtotime($date) === false) fail('Indica la fecha de la aportación.');
if (strtotime($date) > time() + 86400) fail('La fecha no puede ser posterior a hoy.');
if (!is_numeric($amountRaw) || (float)$amountRaw <= 0 || (float)$amountRaw > 100000) fail('Indica el importe de la aportación.');
if (mb_strlen($reason) < 5) fail('Cuéntanos brevemente el motivo.');
if (empty($in['acepto'])) fail('Marca la casilla de la política de privacidad para continuar.');
if (!rate_ok('rf-ip:' . client_ip(), 5, 3600) || !rate_ok('rf-mail:' . $email, 3, 86400)) {
    fail('Ya hemos recibido varias solicitudes. Si necesitas algo más, escríbenos a ' . phos_from() . '.', 429);
}
$amount = (int)round((float)$amountRaw * 100);
$late = (time() - strtotime($date)) > 14 * 86400;

db()->prepare('INSERT INTO refund_requests (email, paid_on, amount, receipt, reason, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    ->execute([$email, $date, $amount, $receipt !== '' ? $receipt : null, $reason, now()]);
$id = db()->lastInsertId();

// Contar solicitudes anteriores de este correo en 12 meses (orientativo para quien gestiona)
$st = db()->prepare('SELECT COUNT(*) FROM refund_requests WHERE email = ? AND created_at > ?');
$st->execute([$email, now(-365 * 86400)]);
$prev = (int)$st->fetchColumn() - 1;

$eur = number_format($amount / 100, 2, ',', '.') . ' €';
$fecha = date('d/m/Y', strtotime($date));

// Aviso para Phos
$txt = "Nueva solicitud de devolución nº $id\n\nCorreo: $email\nFecha de la aportación: $fecha\nImporte: $eur\nRecibo: " . ($receipt ?: '—') . "\n\nMotivo:\n$reason\n\n"
     . ($late ? "⚠ Fuera del plazo de 14 días naturales.\n" : "Dentro del plazo de 14 días naturales.\n")
     . ($prev > 0 ? "⚠ Este correo ya ha pedido $prev devolución(es) en los últimos 12 meses.\n" : "Primera solicitud de este correo en 12 meses.\n")
     . "\nComprueba el pago en Stripe (Pagos → busca el correo) y, si procede, pulsa «Reembolsar».\nRecuerda: plazo máximo para devolver, 14 días desde que aceptes la solicitud.\n";
phos_mail(phos_from(), "Solicitud de devolución nº $id · $eur", $txt, '', $email);

// Acuse de recibo para quien la pide
$ack = "Hola:\n\nHemos recibido tu solicitud de devolución (nº $id) de la aportación de $eur del $fecha.\n\n"
     . "La revisaremos y te responderemos a este correo lo antes posible. Si la aceptamos, te devolveremos el importe en un máximo de 14 días, a la misma tarjeta con la que pagaste.\n\n"
     . "Gracias por tu paciencia.\n\nPhos · La luz de Cristo\n" . base_url() . "\n";
phos_mail($email, "Hemos recibido tu solicitud de devolución", $ack);

out(['ok' => true, 'id' => (int)$id]);
