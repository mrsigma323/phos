<?php
// Phos · panel de moderación (solo para los correos de PHOS_ADMINS)
require __DIR__ . '/_lib/boot.php';
require __DIR__ . '/_lib/comunidad.php';
require __DIR__ . '/_lib/mail.php';
header('X-Robots-Tag: noindex, nofollow');
header("Content-Security-Policy: frame-ancestors 'none'");
$u = current_user();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$isApi = $method === 'POST' || isset($_GET['d']) || isset($_GET['q']);

if (!is_admin($u)) {
    if ($isApi) fail('Solo para moderadores.', 403);
    header('Content-Type: text/html; charset=utf-8');
    http_response_code(403);
    echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Moderación · Phos</title><link rel="stylesheet" href="/web.css"></head><body><main class="wrap narrow" style="padding:72px 24px;text-align:center"><p class="kicker">Phos</p><h1>Solo para moderadores</h1><p class="lead">Entra en <a href="/mi-phos.html">Mi Phos</a> con el correo de moderación y vuelve a abrir esta página.</p></main></body></html>';
    exit;
}
$pdo = db();
$sqlite = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) !== 'mysql';
$me = (string)$u['email'];

function post_row(array $p): array {
    return ['id' => (int)$p['id'], 'uid' => (int)$p['user_id'], 'alias' => $p['alias'], 'email' => $p['email'], 'target' => $p['target'], 'kind' => $p['kind'],
        'body' => $p['body'], 'status' => $p['status'], 'ip' => $p['ip'], 'at' => $p['created_at'], 'nota' => $p['decided_note'], 'reports' => $p['reports'] ?? null];
}
function author_mail(array $p, string $what, string $nota): void {
    if (empty($p['email'])) return;
    $txt = "Hola, " . ($p['alias'] ?: '') . ":\n\n"
         . "Te escribimos desde Phos porque tu mensaje en la comunidad $what.\n\n"
         . "Motivo: " . ($nota !== '' ? $nota : 'no cumple las normas de la comunidad') . "\n\n"
         . "Tu mensaje decía:\n«" . $p['body'] . "»\n\n"
         . "La decisión la ha tomado una persona del equipo de Phos, no un sistema automático, según las normas de la comunidad: " . base_url() . "/normas-comunidad.html\n\n"
         . "Si crees que es un error, responde a este correo y lo revisaremos de nuevo. También puedes acudir a los tribunales o a otros medios de resolución de conflictos.\n\nPhos · La luz de Cristo\n";
    phos_mail((string)$p['email'], 'Phos: sobre tu mensaje en la comunidad', $txt, '', PHOS_ADMINS[0]);
}
function get_post(int $id): array {
    $st = db()->prepare('SELECT p.*, u.alias, u.email FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?');
    $st->execute([$id]);
    $p = $st->fetch();
    if (!$p) fail('Ese mensaje ya no existe.', 404);
    return $p;
}

if ($method === 'POST') {
    require_same_origin();
    $in = body_json();
    $a = (string)($in['accion'] ?? '');
    $id = (int)($in['id'] ?? 0);
    $nota = clean_text((string)($in['nota'] ?? ''), 300);
    switch ($a) {
        case 'aprobar':
            $p = get_post($id);
            $pdo->prepare("UPDATE posts SET status = 'publicado', decided_at = ?, decided_note = NULL WHERE id = ?")->execute([now(), $id]);
            modlog($me, 'aprobar', $id, (int)$p['user_id']);
            break;
        case 'rechazar':
        case 'retirar':
            $p = get_post($id);
            $pdo->prepare("UPDATE posts SET status = ?, decided_at = ?, decided_note = ? WHERE id = ?")->execute([$a === 'rechazar' ? 'rechazado' : 'retirado', now(), $nota, $id]);
            $pdo->prepare("UPDATE reports SET status = 'resuelta' WHERE post_id = ?")->execute([$id]);
            $pdo->prepare('DELETE FROM reactions WHERE target = ?')->execute(['post:' . $id]);
            modlog($me, $a, $id, (int)$p['user_id'], $nota);
            if (!empty($in['avisar'])) author_mail($p, $a === 'rechazar' ? 'no se ha publicado' : 'se ha retirado', $nota);
            break;
        case 'mantener':
            $p = get_post($id);
            $pdo->prepare("UPDATE reports SET status = 'descartada' WHERE post_id = ?")->execute([$id]);
            modlog($me, 'mantener', $id, (int)$p['user_id'], $nota);
            break;
        case 'bloquear':
            if ($nota === '') fail('Escribe el motivo del bloqueo.');
            $pdo->prepare('UPDATE users SET banned_at = ?, ban_reason = ? WHERE id = ?')->execute([now(), $nota, $id]);
            $pdo->prepare("UPDATE posts SET status = 'rechazado', decided_at = ?, decided_note = ? WHERE user_id = ? AND status = 'pendiente'")->execute([now(), 'Cuenta bloqueada', $id]);
            modlog($me, 'bloquear', null, $id, $nota);
            if (!empty($in['avisar'])) {
                $st = $pdo->prepare('SELECT email, alias FROM users WHERE id = ?'); $st->execute([$id]); $x = $st->fetch();
                if ($x) phos_mail((string)$x['email'], 'Phos: tu participación en la comunidad', "Hola, " . ($x['alias'] ?: '') . ":\n\nTu cuenta ya no puede escribir en la comunidad de Phos.\n\nMotivo: $nota\n\nLo ha decidido una persona del equipo de Phos según las normas de la comunidad: " . base_url() . "/normas-comunidad.html\nPuedes seguir usando el resto de la web con normalidad.\n\nSi crees que es un error, responde a este correo.\n\nPhos · La luz de Cristo\n", '', PHOS_ADMINS[0]);
            }
            break;
        case 'desbloquear':
            $pdo->prepare('UPDATE users SET banned_at = NULL, ban_reason = NULL WHERE id = ?')->execute([$id]);
            modlog($me, 'desbloquear', null, $id, $nota);
            break;
        case 'renombrar':
            $alias = check_alias((string)($in['alias'] ?? ''), true);
            $key = alias_key($alias);
            $st = $pdo->prepare('SELECT id FROM users WHERE alias_lc = ? AND id <> ?'); $st->execute([$key, $id]);
            if ($st->fetchColumn()) fail('Ese seudónimo ya existe.');
            $pdo->prepare('UPDATE users SET alias = ?, alias_lc = ? WHERE id = ?')->execute([$alias, $key, $id]);
            modlog($me, 'renombrar', null, $id, $alias);
            break;
        default:
            fail('Acción no válida.');
    }
    out(['ok' => true]);
}

if (isset($_GET['q'])) {
    $q = trim((string)$_GET['q']);
    if (mb_strlen($q) < 2) fail('Escribe al menos 2 letras.');
    $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], mb_strtolower($q)) . '%';
    $st = $pdo->prepare('SELECT id, email, alias, created_at, last_login, banned_at, ban_reason, com_consent_at FROM users WHERE LOWER(alias) LIKE ? OR LOWER(email) LIKE ? ORDER BY id DESC LIMIT 20');
    $st->execute([$like, $like]);
    $users = [];
    foreach ($st->fetchAll() as $x) {
        $s2 = $pdo->prepare('SELECT p.*, u.alias, u.email FROM posts p JOIN users u ON u.id = p.user_id WHERE p.user_id = ? ORDER BY p.id DESC LIMIT 30');
        $s2->execute([$x['id']]);
        $posts = array_map('post_row', $s2->fetchAll());
        $ips = array_values(array_unique(array_filter(array_column($posts, 'ip'))));
        $users[] = ['id' => (int)$x['id'], 'email' => $x['email'], 'alias' => $x['alias'], 'since' => $x['created_at'], 'last' => $x['last_login'],
            'banned' => $x['banned_at'], 'ban_reason' => $x['ban_reason'], 'consent' => $x['com_consent_at'], 'ips' => $ips, 'posts' => $posts];
    }
    out(['ok' => true, 'users' => $users]);
}

if (isset($_GET['d'])) {
    purge_ips();
    $base = 'SELECT p.*, u.alias, u.email FROM posts p JOIN users u ON u.id = p.user_id';
    $pend = array_map('post_row', $pdo->query("$base WHERE p.status = 'pendiente' ORDER BY p.id ASC LIMIT 100")->fetchAll());
    $rep = $pdo->query("SELECT p.*, u.alias, u.email, (SELECT " . ($sqlite ? "GROUP_CONCAT(r.reason, ' · ')" : "GROUP_CONCAT(r.reason SEPARATOR ' · ')") . " FROM reports r WHERE r.post_id = p.id AND r.status = 'abierta') AS reports
        FROM posts p JOIN users u ON u.id = p.user_id WHERE p.status = 'publicado' AND EXISTS (SELECT 1 FROM reports r WHERE r.post_id = p.id AND r.status = 'abierta') ORDER BY p.id DESC LIMIT 100")->fetchAll();
    $pub = array_map('post_row', $pdo->query("$base WHERE p.status = 'publicado' ORDER BY p.id DESC LIMIT 40")->fetchAll());
    $log = $pdo->query('SELECT m.*, u.alias FROM modlog m LEFT JOIN users u ON u.id = m.user_id ORDER BY m.id DESC LIMIT 40')->fetchAll();
    out(['ok' => true, 'premod' => premod(), 'pending' => $pend, 'reported' => array_map('post_row', $rep), 'recent' => $pub, 'log' => $log]);
}

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
?><!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>Moderación · Phos</title><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/web.css">
<style>
body{background:#F5EFE4}.mw{max-width:960px;margin:0 auto;padding:28px 18px 80px}.mw h1{font-size:34px;margin:4px 0 6px}.mw h2{font-size:24px;margin:34px 0 10px}
.mp{background:#fff;border-radius:16px;padding:16px 18px;margin:10px 0;box-shadow:0 1px 3px rgba(0,0,0,.06)}.mp .who{font-size:14px;color:#6B5E57}.mp .who b{color:#4A1416}
.mp .txt{white-space:pre-wrap;margin:8px 0;font-size:17px;line-height:1.5}.mp .rep{background:#FBEAEA;color:#7A1F1F;border-radius:10px;padding:6px 10px;font-size:14px;margin:6px 0}
.mb{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}.mb button{border:0;border-radius:999px;padding:8px 14px;font-weight:700;cursor:pointer;font-size:14px}
.ok{background:#2F5D4E;color:#fff}.no{background:#7A1F1F;color:#fff}.nn{background:#E9E1D3;color:#2B1B17}.mb input[type=text]{flex:1;min-width:200px;padding:8px 10px;border:1px solid #D9CDBA;border-radius:10px;font-size:14px}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}.tabs a{background:#fff;padding:8px 14px;border-radius:999px;text-decoration:none;color:#4A1416;font-weight:700}
.cnt{background:#4A1416;color:#fff;border-radius:999px;padding:1px 8px;font-size:13px;margin-left:4px}.empty{color:#6B5E57;font-style:italic}.small{font-size:13px;color:#6B5E57}
table{width:100%;border-collapse:collapse;font-size:14px}td{padding:6px 4px;border-bottom:1px solid #E9E1D3;vertical-align:top}.srch{display:flex;gap:8px}.srch input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid #D9CDBA;font-size:16px}
.tag{background:#E9E1D3;border-radius:999px;padding:1px 8px;font-size:12px;margin-left:6px}
</style></head><body><main class="mw">
<p class="kicker">Phos · solo moderadores</p><h1>Panel de moderación</h1>
<p class="small">Has entrado como <?= htmlspecialchars($me) ?>. Lo que ves aquí (correos y conexiones) es privado: no lo compartas. Las conexiones se borran solas a los <?= COM_IP_DAYS ?> días.</p>
<nav class="tabs"><a href="#pend">Pendientes <span class="cnt" id="cP">0</span></a><a href="#rep">Denuncias <span class="cnt" id="cR">0</span></a><a href="#pub">Publicados</a><a href="#buscar">Buscar persona</a><a href="#log">Registro</a><a href="/">Volver a la web</a></nav>
<h2 id="pend">Esperando revisión</h2><div id="lP"></div>
<h2 id="rep">Denunciados</h2><div id="lR"></div>
<h2 id="pub">Últimos publicados</h2><div id="lU"></div>
<h2 id="buscar">Buscar persona (seudónimo o correo)</h2>
<form class="srch" id="fS"><input id="q" placeholder="Seudónimo o correo"><button class="ok" style="border:0;border-radius:999px;padding:0 18px;font-weight:700">Buscar</button></form><div id="lS"></div>
<h2 id="log">Registro de decisiones</h2><div id="lL"></div>
</main>
<script>
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const where=t=>t==='muro'?'Muro de oración':t.startsWith('lect:')?'Lectura del '+t.slice(5):t.startsWith('art:')?'Artículo «'+t.slice(4)+'»':t;
const fecha=s=>s?new Date(s.replace(' ','T')+'Z').toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'';
async function post(d){const r=await fetch('moderar.php',{method:'POST',credentials:'same-origin',headers:{'X-Phos':'1','Content-Type':'application/json'},body:JSON.stringify(d)});const j=await r.json().catch(()=>({}));if(!j.ok)alertBox(j.error||'Error');return j}
function alertBox(m){const d=document.createElement('p');d.className='rep';d.textContent=m;document.querySelector('.mw').prepend(d);setTimeout(()=>d.remove(),5000)}
function card(p,mode){
 const who=`<b>${esc(p.alias||'(sin seudónimo)')}</b> · ${esc(p.email)} · ${fecha(p.at)} · ${esc(where(p.target))}${p.ip?' · conexión '+esc(p.ip):''}<span class="tag">${esc(p.status)}</span>`;
 let btn='';
 if(mode==='P')btn=`<button class="ok" data-a="aprobar">Aprobar</button><input type="text" placeholder="Motivo si no lo publicas (se envía al autor)"><button class="no" data-a="rechazar">No publicar</button>`;
 if(mode==='R')btn=`<button class="ok" data-a="mantener">Está bien, mantener</button><input type="text" placeholder="Motivo de la retirada (se envía al autor)"><button class="no" data-a="retirar">Retirar</button>`;
 if(mode==='U')btn=`<input type="text" placeholder="Motivo de la retirada (se envía al autor)"><button class="no" data-a="retirar">Retirar</button>`;
 return `<div class="mp" data-id="${p.id}" data-uid="${p.uid}"><div class="who">${who}</div>${p.reports?`<div class="rep">⚠️ ${esc(p.reports)}</div>`:''}<div class="txt">${esc(p.body)}</div>${p.nota?`<div class="small">Nota: ${esc(p.nota)}</div>`:''}<div class="mb">${btn}<button class="nn" data-who="${esc(p.email)}">Ver persona</button></div></div>`;
}
function list(el,arr,mode,empty){$(el).innerHTML=arr.length?arr.map(p=>card(p,mode)).join(''):`<p class="empty">${empty}</p>`}
async function load(){
 const j=await fetch('moderar.php?d=1',{credentials:'same-origin'}).then(r=>r.json());if(!j.ok)return;
 $('cP').textContent=j.pending.length;$('cR').textContent=j.reported.length;
 list('lP',j.pending,'P','No hay nada pendiente. 🙏');list('lR',j.reported,'R','No hay denuncias abiertas.');list('lU',j.recent,'U','Aún no hay mensajes publicados.');
 $('lL').innerHTML=j.log.length?'<table>'+j.log.map(x=>`<tr><td>${fecha(x.at)}</td><td>${esc(x.action)}</td><td>${esc(x.alias||'')}${x.post_id?' · mensaje '+x.post_id:''}</td><td>${esc(x.note||'')}</td><td class="small">${esc(x.admin)}</td></tr>`).join('')+'</table>':'<p class="empty">Todavía no hay decisiones.</p>';
}
document.addEventListener('click',async e=>{
 const b=e.target.closest('button[data-a]');
 if(b){const box=b.closest('.mp,.us');const inp=box.querySelector('.mb input[type=text]');const a=b.dataset.a;const nota=inp?inp.value.trim():'';
  if((a==='bloquear')&&!nota){alertBox('Escribe el motivo del bloqueo.');return}
  if(a==='renombrar'){const v=inp.value.trim();if(!v){alertBox('Escribe el nuevo seudónimo.');return}b.disabled=true;const j=await post({accion:a,id:+box.dataset.uid,alias:v});b.disabled=false;if(j.ok)search();return}
  b.disabled=true;const id=a==='bloquear'||a==='desbloquear'?+box.dataset.uid:+box.dataset.id;
  const j=await post({accion:a,id,nota,avisar:true});b.disabled=false;if(j.ok){load();if($('lS').innerHTML)search()}return}
 const w=e.target.closest('button[data-who]');if(w){$('q').value=w.dataset.who;search();location.hash='buscar'}
});
async function search(){const q=$('q').value.trim();if(q.length<2)return;const j=await fetch('moderar.php?q='+encodeURIComponent(q),{credentials:'same-origin'}).then(r=>r.json());
 if(!j.ok){$('lS').innerHTML='<p class="empty">'+esc(j.error)+'</p>';return}
 $('lS').innerHTML=j.users.length?j.users.map(u=>`<div class="mp us" data-uid="${u.id}"><div class="who"><b>${esc(u.alias||'(sin seudónimo)')}</b> · ${esc(u.email)} · cuenta desde ${fecha(u.since)} · último acceso ${fecha(u.last)}${u.banned?' · <b style="color:#7A1F1F">BLOQUEADA</b> ('+esc(u.ban_reason)+')':''}</div>
 <div class="small">Consentimiento de la comunidad: ${u.consent?fecha(u.consent):'no'} · Conexiones recientes: ${u.ips.length?u.ips.map(esc).join(', '):'ninguna guardada'}</div>
 <div class="mb"><input type="text" placeholder="${u.banned?'Nota (opcional)':'Motivo del bloqueo o nuevo seudónimo'}">${u.banned?'<button class="ok" data-a="desbloquear">Desbloquear</button>':'<button class="no" data-a="bloquear">Bloquear</button>'}<button class="nn" data-a="renombrar">Cambiar seudónimo</button></div>
 ${u.posts.length?'<table style="margin-top:10px">'+u.posts.map(p=>`<tr><td>${fecha(p.at)}</td><td><span class="tag">${esc(p.status)}</span></td><td>${esc(where(p.target))}</td><td>${esc(p.body.slice(0,160))}</td><td class="small">${esc(p.ip||'')}</td></tr>`).join('')+'</table>':'<p class="small">Sin mensajes.</p>'}</div>`).join(''):'<p class="empty">No hay nadie con ese seudónimo o correo.</p>';
}
$('fS').onsubmit=e=>{e.preventDefault();search()};
load();setInterval(load,60000);
})();
</script></body></html>
