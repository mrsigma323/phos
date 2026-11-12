<?php
// Datos del titular del sitio (los que exige la LSSI en el aviso legal).
//
// No se escriben en el HTML. Antes iban dentro de la propia página codificados
// en base64, que no es cifrado: cualquiera que mirase el código fuente los
// obtenía, y cualquier rastreador que ejecute JavaScript los leía igual que una
// persona. Ahora viven en la configuración del servidor, fuera de la carpeta
// web, y solo salen de ahí cuando alguien pulsa el botón de la página.
//
// Quien rastrea no pulsa botones ni envía peticiones POST, así que la página
// puede estar abierta a todos los buscadores sin exponer nada.
require __DIR__ . '/_lib/boot.php';
require_same_origin();
if (!rate_ok('titular:' . client_ip(), 20, 3600)) {
    fail('Se han pedido estos datos demasiadas veces desde aquí. Espera un rato.', 429);
}
$c = phos_config();
$t = (is_array($c) && is_array($c['titular'] ?? null)) ? $c['titular'] : null;
if (!$t || empty($t['nombre'])) {
    fail('Los datos del titular todavía no están configurados en el servidor.', 503);
}
out(['ok' => true, 'titular' => [
    'nombre'    => (string)($t['nombre'] ?? ''),
    'nif'       => (string)($t['nif'] ?? ''),
    'domicilio' => (string)($t['domicilio'] ?? ''),
    'email'     => (string)($t['email'] ?? ''),
]]);
