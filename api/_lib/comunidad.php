<?php
// Phos · comunidad: seudónimos, mensajes, «Amén», «Rezo por ti» y denuncias
declare(strict_types=1);

// Moderación previa: los mensajes se publican cuando un moderador los aprueba.
// Se puede cambiar en phos-config.php con 'premod' => false (entonces se publican al momento y se revisan si alguien los denuncia).
function premod(): bool { $c = phos_config() ?? []; return !array_key_exists('premod', $c) || (bool)$c['premod']; }

const COM_KINDS = ['comentario' => 1000, 'oracion' => 600];
const COM_IP_DAYS = 180; // la conexión de cada mensaje se guarda 6 meses y luego se borra
const COM_REASONS = ['ofensivo' => 'Ofensivo o irrespetuoso', 'odio' => 'Discurso de odio o discriminación', 'publicidad' => 'Publicidad o spam', 'datos' => 'Publica datos personales de alguien', 'ilegal' => 'Contenido ilegal', 'otro' => 'Otro motivo'];

// Dónde se puede escribir o reaccionar
function valid_target(string $t): bool {
    return (bool)preg_match('/^(muro|lect:\d{4}-\d\d-\d\d|art:[a-z0-9-]{1,60}|post:\d{1,12})$/', $t);
}

// Quién reacciona: la cuenta si hay sesión; si no, un identificador anónimo del navegador
function reactor(?array $u, string $anon): ?string {
    if ($u) return h('u:' . $u['id']);
    if (preg_match('/^[A-Za-z0-9_-]{16,64}$/', $anon)) return h('a:' . $anon);
    return null;
}

function clean_text(string $s, int $max): string {
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]/u', '', $s) ?? '';
    $s = preg_replace("/\n{3,}/", "\n\n", $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

// Seudónimo: 3 a 24 caracteres, letras, números, espacios y . _ -
function check_alias(string $a, bool $admin = false): string {
    $a = trim(preg_replace('/\s+/u', ' ', $a) ?? '');
    if (mb_strlen($a) < 3 || mb_strlen($a) > 24) fail('El seudónimo debe tener entre 3 y 24 caracteres.');
    if (!preg_match('/^[\p{L}\p{N}][\p{L}\p{N} ._-]*$/u', $a)) fail('Usa solo letras, números, espacios, puntos, guiones o guiones bajos.');
    if (str_contains($a, '@') || preg_match('/\d{6,}/', $a)) fail('No pongas correos ni números de teléfono en el seudónimo.');
    $lc = alias_key($a);
    if (!$admin && preg_match('/(phos|admin|moderador|modera|equipo|oficial|soporte)/', $lc)) fail('Ese seudónimo está reservado. Elige otro.');
    return $a;
}
function alias_key(string $a): string {
    $x = mb_strtolower($a);
    $x = strtr($x, ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ü'=>'u','à'=>'a','è'=>'e','ò'=>'o','ï'=>'i','ç'=>'c','ñ'=>'n']);
    return preg_replace('/[\s._-]+/u', '', $x) ?? $x;
}

// Borra la conexión (IP) de los mensajes y denuncias antiguos
function purge_ips(): void {
    $lim = now(-COM_IP_DAYS * 86400);
    db()->prepare('UPDATE posts SET ip = NULL WHERE ip IS NOT NULL AND created_at < ?')->execute([$lim]);
    db()->prepare('UPDATE reports SET ip = NULL WHERE ip IS NOT NULL AND created_at < ?')->execute([$lim]);
    // Los mensajes no publicados o retirados se borran a los 6 meses
    db()->prepare("DELETE FROM posts WHERE status IN ('rechazado', 'retirado') AND created_at < ?")->execute([$lim]);
}

function modlog(string $admin, string $action, ?int $post, ?int $user, string $note = ''): void {
    db()->prepare('INSERT INTO modlog (admin, action, post_id, user_id, note, at) VALUES (?, ?, ?, ?, ?, ?)')
        ->execute([$admin, $action, $post, $user, mb_substr($note, 0, 300), now()]);
}

function public_post(array $p, ?array $me, ?string $who): array {
    return [
        'id' => (int)$p['id'],
        'alias' => $p['alias'] ?? 'Anónimo',
        'staff' => !empty($p['email']) && is_admin(['email' => $p['email']]),
        'body' => $p['body'],
        'at' => str_replace(' ', 'T', (string)$p['created_at']) . 'Z',
        'kind' => $p['kind'],
        'pending' => $p['status'] === 'pendiente',
        'mine' => $me && (int)$p['user_id'] === (int)$me['id'],
        'rezo' => (int)($p['rezo'] ?? 0),
        'mineRezo' => !empty($p['mine_rezo']),
    ];
}
