<?php
// Borra la cuenta y todos sus datos (derecho de supresión)
require __DIR__ . '/_lib/boot.php';
require_same_origin();
$u = require_user();
$in = body_json();
if (($in['confirmo'] ?? '') !== 'BORRAR') fail('Confirma el borrado.');
// No se puede borrar la cuenta con un donativo mensual vivo: así nunca quedan cobros sin una cuenta desde la que cancelarlos
if (has_live_monthly($u)) fail('Tienes un donativo mensual activo. Cancélalo primero desde «Donativo mensual» y después podrás borrar tu cuenta.', 409);
require __DIR__ . '/_lib/borrar_usuario.php';
borrar_usuario(db(), $u);
cookie_set('phos_s', '', 0, true);
cookie_set('phos_in', '', 0, false);
out(['ok' => true]);
