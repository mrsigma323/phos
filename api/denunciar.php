<?php
// Cualquiera puede avisar de un mensaje que incumple las normas
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require __DIR__ . '/_lib/mail.php';
require_same_origin();
$in = body_json();
$id = (int)($in['id'] ?? 0);
$why = (string)($in['motivo'] ?? '');
if (!isset(COM_REASONS[$why])) fail('Elige un motivo.');
$extra = clean_text((string)($in['detalle'] ?? ''), 250);
$me = current_user();
$who = reactor($me, (string)($in['a'] ?? ''));
if (!$who) fail('No se ha podido enviar.');
if (!rate_ok('rep:' . client_ip(), 10, 3600)) fail('Has enviado muchos avisos. Espera un rato.', 429);
$pdo = db();
$st = $pdo->prepare("SELECT id FROM posts WHERE id = ? AND status = 'publicado'");
$st->execute([$id]);
if (!$st->fetchColumn()) fail('Ese mensaje ya no está.', 404);
$st = $pdo->prepare("SELECT 1 FROM reports WHERE post_id = ? AND who = ?");
$st->execute([$id, $who]);
if (!$st->fetchColumn()) {
    $pdo->prepare('INSERT INTO reports (post_id, who, reason, ip, created_at) VALUES (?, ?, ?, ?, ?)')
        ->execute([$id, $who, COM_REASONS[$why] . ($extra !== '' ? ': ' . $extra : ''), client_ip(), now()]);
    if (rate_ok('aviso-denuncia', 1, 900)) phos_mail(PHOS_ADMINS[0], 'Phos: nueva denuncia en la comunidad', "Alguien ha denunciado un mensaje.\n\nPanel de moderación: " . base_url() . "/api/moderar.php\n");
}
out(['ok' => true]);
