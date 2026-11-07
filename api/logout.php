<?php
require __DIR__ . '/_lib/boot.php';
require_same_origin();
end_session();
out(['ok' => true]);
