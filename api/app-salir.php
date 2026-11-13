<?php
// App de Android: cierra la sesión de este móvil
require __DIR__ . '/_lib/app.php';
app_cors();
$tok = app_token();
if ($tok !== '') db()->prepare('DELETE FROM sessions WHERE token_hash = ?')->execute([h($tok)]);
out(['ok' => true]);
