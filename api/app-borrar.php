<?php
// App de Android: borra la cuenta y todos sus datos (exigido por Google Play si la app permite crear cuentas)
require __DIR__ . '/_lib/app.php';
require __DIR__ . '/_lib/borrar_usuario.php';
app_cors();
$u = app_user();
$in = app_body(2000);
if (($in['confirmo'] ?? '') !== 'BORRAR') fail('Confirma el borrado.');
if (has_live_monthly($u)) fail('Tienes un donativo mensual activo. Cancélalo primero en phosbiblias.com › Mi Phos y después podrás borrar tu cuenta.', 409);
borrar_usuario(db(), $u);
out(['ok' => true]);
