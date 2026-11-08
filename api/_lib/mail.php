<?php
declare(strict_types=1);

// Envía el correo con el enlace de acceso (texto + HTML sencillo)
function send_login_mail(string $to, string $link): bool {
    $c = phos_config() ?? [];
    $from = $c['mail_from'] ?? ('hola@' . parse_url(base_url(), PHP_URL_HOST));
    $subject = 'Tu enlace para entrar en Phos';
    $text = "Hola:\n\nPulsa este enlace para entrar en Phos (caduca en " . PHOS_TOKEN_MINUTES . " minutos):\n\n$link\n\n"
          . "Si no has pedido entrar en Phos, ignora este correo: no se creará ninguna cuenta.\n\nPhos · La luz de Cristo\n" . base_url() . "\n";
    $safe = htmlspecialchars($link, ENT_QUOTES);
    $html = '<!doctype html><html><body style="margin:0;background:#F5EFE4;font-family:Arial,sans-serif;color:#2B1B17">'
          . '<div style="max-width:520px;margin:0 auto;padding:32px 24px">'
          . '<p style="font-family:Georgia,serif;font-size:28px;color:#4A1416;margin:0 0 16px">Phos</p>'
          . '<p style="font-size:17px;line-height:1.5">Pulsa el botón para entrar en tu cuenta. El enlace caduca en ' . PHOS_TOKEN_MINUTES . ' minutos.</p>'
          . '<p style="margin:28px 0"><a href="' . $safe . '" style="background:#4A1416;color:#F5EFE4;text-decoration:none;font-weight:bold;padding:14px 26px;border-radius:999px;display:inline-block">Entrar en Phos</a></p>'
          . '<p style="font-size:14px;color:#6B5E57;line-height:1.5">Si no has pedido entrar en Phos, ignora este correo: no se creará ninguna cuenta.</p>'
          . '</div></body></html>';

    return phos_mail($to, $subject, $text, $html);
}

function phos_from(): string {
    $c = phos_config() ?? [];
    return $c['mail_from'] ?? ('hola@' . parse_url(base_url(), PHP_URL_HOST));
}

// Envío genérico (texto + HTML). En local se guarda en un archivo de pruebas.
function phos_mail(string $to, string $subject, string $text, string $html = '', string $replyTo = ''): bool {
    $c = phos_config() ?? [];
    $from = phos_from();
    if ($html === '') $html = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#2B1B17;white-space:pre-wrap">' . htmlspecialchars($text, ENT_QUOTES) . '</body></html>';
    if (!empty($c['mail_log'])) {
        return (bool)file_put_contents($c['mail_log'], "TO: $to\nSUBJECT: $subject\n$text\n----\n", FILE_APPEND);
    }
    $b = 'phos' . bin2hex(random_bytes(8));
    $headers = [
        'From' => 'Phos <' . $from . '>',
        'Reply-To' => $replyTo !== '' ? $replyTo : $from,
        'MIME-Version' => '1.0',
        'Content-Type' => 'multipart/alternative; boundary="' . $b . '"',
    ];
    $body = "--$b\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$text\r\n"
          . "--$b\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$html\r\n--$b--\r\n";
    $enc = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return mail($to, $enc, $body, $headers, '-f' . $from);
}
