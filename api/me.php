<?php
require __DIR__ . '/_lib/boot.php';
$u = current_user();
if (!$u) { cookie_set('phos_in', '', 0, false); out(['ok' => true, 'user' => null]); }
out(['ok' => true, 'user' => public_user($u)]);
