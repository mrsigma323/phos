<?php
// Cuenta una visita: página, día y de dónde viene (Google, Facebook, Instagram…). No guarda cookies, IP ni nada personal.
require __DIR__ . '/_lib/boot.php';
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fail('Método no permitido.', 405);
$ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? '');
if ($ua === '' || preg_match('/bot|crawl|spider|slurp|preview|lighthouse|headless|monitor|curl|wget|python|facebookexternalhit/i', $ua)) out(['ok' => true]);
$in = json_decode((string)file_get_contents('php://input'), true) ?: [];
$path = (string)($in['p'] ?? '');
$path = preg_replace('/[?#].*$/', '', $path) ?? '';
if ($path === '' || $path === '/index.html') $path = '/';
if (!preg_match('~^/[a-z0-9\-./]{0,78}$~', $path)) out(['ok' => true]);
$ref = strtolower((string)($in['r'] ?? ''));
$host = (string)(parse_url($ref, PHP_URL_HOST) ?? '');
$src = $host === '' ? 'directo'
    : (str_contains($host, 'phosbiblias') ? 'interno'
    : (str_contains($host, 'google') ? 'google'
    : (str_contains($host, 'bing') || str_contains($host, 'duckduckgo') || str_contains($host, 'ecosia') || str_contains($host, 'yahoo') ? 'otros buscadores'
    : (str_contains($host, 'facebook') || $host === 'fb.me' || str_contains($host, 'fb.com') ? 'facebook'
    : (str_contains($host, 'instagram') ? 'instagram'
    : (str_contains($host, 'whatsapp') ? 'whatsapp' : 'otras webs'))))));
// Evita que recargar la página muchas veces infle el recuento (el límite caduca solo y no se guarda la IP en claro)
if (!rate_ok('v:' . h(client_ip() . '|' . $path . '|' . date('Y-m-d')), 1, 1800)) out(['ok' => true]);
$pdo = db();
$day = (new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid')))->format('Y-m-d');
$up = $pdo->prepare('UPDATE visits SET n = n + 1 WHERE day = ? AND path = ? AND src = ?');
$up->execute([$day, $path, $src]);
if ($up->rowCount() === 0) {
    try { $pdo->prepare('INSERT INTO visits (day, path, src, n) VALUES (?, ?, ?, 1)')->execute([$day, $path, $src]); }
    catch (PDOException $e) { $up->execute([$day, $path, $src]); }
}
out(['ok' => true]);
