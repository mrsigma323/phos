<?php
// Descarga de los datos de la cuenta (derecho de acceso y portabilidad)
require __DIR__ . '/_lib/boot.php';
$u = require_user();
header('Content-Type: application/json; charset=utf-8');
header('Content-Disposition: attachment; filename="mis-datos-phos.json"');
header('Cache-Control: no-store');
echo json_encode([
    'correo' => $u['email'],
    'nombre' => $u['name'],
    'cuenta_creada' => $u['created_at'] . ' UTC',
    'ultimo_acceso' => $u['last_login'] ? $u['last_login'] . ' UTC' : null,
    'consentimiento_tradicion' => (bool)(int)$u['relig_consent'],
    'consentimiento_fecha' => $u['relig_consent_at'],
    'preferencias' => prefs_of($u),
    'correo_semanal_desde' => $u['news_at'] ?? null,
    'seudonimo' => $u['alias'] ?? null,
    'consentimiento_comunidad' => $u['com_consent_at'] ?? null,
    'mensajes_comunidad' => (function () use ($u) {
        $st = db()->prepare('SELECT target AS tema, kind AS tipo, body AS texto, status AS estado, created_at AS fecha_utc, decided_note AS nota_moderacion FROM posts WHERE user_id = ? ORDER BY id');
        $st->execute([$u['id']]);
        return $st->fetchAll();
    })(),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
