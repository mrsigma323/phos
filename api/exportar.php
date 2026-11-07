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
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
