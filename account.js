// Phos · cuentas de usuario (opcionales). Los invitados usan la web igual que siempre.
(function(){
'use strict';
const $=id=>document.getElementById(id);
const API='/api/';
const LS={get(k,d){try{const v=localStorage.getItem('phos:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('phos:'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const loggedHint=()=>/(?:^|;\s*)phos_in=1/.test(document.cookie);
let ME=null;

async function call(path,data){
 const o={credentials:'same-origin',headers:{'X-Phos':'1'}};
 if(data!==undefined){o.method='POST';o.headers['Content-Type']='application/json';o.body=JSON.stringify(data)}
 let r,j={};
 try{r=await fetch(API+path,o);j=await r.json().catch(()=>({}))}catch(e){return {ok:false,error:'No hay conexión. Inténtalo de nuevo.',status:0}}
 j.status=r.status;if(!r.ok&&!j.error)j.error=r.status===404||r.status===503?'Las cuentas estarán disponibles muy pronto.':'Ha ocurrido un error. Inténtalo de nuevo.';
 return j;
}

// ---- Guardado de preferencias (agrupado para no enviar a cada clic) ----
let pend={},timer=null;
function push(prefs){if(!ME)return;Object.assign(pend,prefs);clearTimeout(timer);timer=setTimeout(flush,800)}
async function flush(){if(!ME||!Object.keys(pend).length)return;const p=pend;pend={};const j=await call('prefs.php',{prefs:p});if(j.ok&&j.user)ME=j.user}
// Envía lo pendiente al salir de la página
addEventListener('pagehide',()=>{if(!ME||!Object.keys(pend).length)return;try{fetch(API+'prefs.php',{method:'POST',keepalive:true,credentials:'same-origin',headers:{'X-Phos':'1','Content-Type':'application/json'},body:JSON.stringify({prefs:pend})})}catch(e){}pend={}});

// web.js avisa cuando cambian la Iglesia o el calendario
document.addEventListener('phos:set',e=>{const {k,v}=e.detail||{};
 if(k==='oldCal')push({oldCal:!!v});
 if(k==='todayBr'&&ME&&ME.religConsent)push({br:v});
});

// Al entrar: lo guardado en la cuenta manda; lo que solo estaba en el dispositivo se sube
function syncFromServer(){
 const p=ME.prefs||{},up={};let changed=false;
 if(typeof p.oldCal==='boolean'){if(LS.get('oldCal',null)!==p.oldCal){LS.set('oldCal',p.oldCal);changed=true}}
 else if(LS.get('oldCal',null)!==null)up.oldCal=!!LS.get('oldCal',false);
 if(ME.religConsent){
  if(p.br){if(LS.get('todayBr',null)!==p.br){LS.set('todayBr',p.br);changed=true}}
  else if(LS.get('todayBr',null))up.br=LS.get('todayBr',null);
 }
 if(Object.keys(up).length)push(up);
 if(changed)document.dispatchEvent(new CustomEvent('phos:prefs'));
}

// Recordar la última página, lectura y sección de recetas
function track(){
 const path=location.pathname.replace(/\/index\.html$/,'/');
 if(/mi-phos|apoya|aviso-legal|privacidad|cookies|404/.test(path))return;
 const title=(document.querySelector('h1')||{}).textContent||document.title;
 const rec={lastPage:path==='/'?'/':path,lastTitle:title.trim().slice(0,120),lastAt:new Date().toISOString()};
 push(rec);
 const ref=$('gRef')||$('vRef');
 if(ref&&/lecturas/.test(path))setTimeout(()=>{const t=(ref.textContent||'').replace(/^.*· /,'').trim();if(t&&t!=='…')push({lastRead:t})},1500);
 if(/recetas/.test(path)&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const h=x.target;push({food:'#'+h.id+'|'+h.textContent.trim().slice(0,90)})}}),{rootMargin:'0px 0px -60% 0px'});
  document.querySelectorAll('.recs h2[id], h2[id]').forEach(h=>io.observe(h));
 }
}

function headerLink(){
 const a=$('acctLink');if(!a)return;
 a.textContent=ME?'👤 Mi Phos':'👤 Entrar';a.title=ME?'Tu cuenta':'Entra o crea tu cuenta (opcional)';
}

// ---- Página «Mi Phos» ----
const BRN={ortodoxa:'Ortodoxa',catolica:'Católica',protestante:'Protestante'};
function onomastica(name){
 const P=window.PHOS;if(!P||!name||name.length<3)return '';
 const q=P.norm(name.trim());const re=new RegExp('(^|[^a-z])'+q.replace(/[^a-z ]/g,'')+'([^a-z]|$)');
 const r=P.nameIndex().filter(x=>re.test(P.norm(x[2])));if(!r.length)return '<p class="small">No encontramos ese nombre en los calendarios. Prueba con otra forma (por ejemplo, «Juan» en vez de «Juanjo»).</p>';
 const n=new Date(),today=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate());
 const next=r.map(x=>{let t=Date.UTC(n.getFullYear(),x[0]-1,x[1]);if(t<today)t=Date.UTC(n.getFullYear()+1,x[0]-1,x[1]);return [t,x]}).sort((a,b)=>a[0]-b[0]);
 const days=Math.round((next[0][0]-today)/864e5),x=next[0][1];
 const when=days===0?'<b>¡Es hoy! Feliz santo.</b>':days===1?'<b>Mañana</b>':`dentro de <b>${days} días</b>`;
 return `<p class="small">Tu próxima onomástica: <b>${x[1]} de ${P.MES[x[0]-1]}</b> (${when}) · ${esc(x[2])} <span class="tag">${x[3]}</span>${r.length>1?` · y ${r.length-1} fecha${r.length>2?'s':''} más en el año`:''}</p>`;
}
function fmtAgo(iso){try{const d=new Date(iso);return d.toLocaleDateString('es-ES',{day:'numeric',month:'long'})}catch(e){return ''}}

function renderOut(msg){
 const box=$('acBox');if(!box)return;
 box.innerHTML=`<div class="card pad40 acform">
  <h2 class="h3">Entra o crea tu cuenta</h2>
  <p>No hace falta contraseña: te enviamos un enlace a tu correo y entras con un clic. Si es la primera vez, la cuenta se crea sola.</p>
  <form id="acLogin" novalidate>
   <label for="acEmail">Tu correo electrónico</label>
   <input type="email" id="acEmail" autocomplete="email" required placeholder="nombre@correo.com">
   <label class="chk"><input type="checkbox" id="acOk"> <span>He leído y acepto la <a href="privacidad.html" target="_blank">política de privacidad</a>.</span></label>
   <button class="btn" type="submit">Enviarme el enlace</button>
   <p class="acmsg" id="acMsg" role="status">${msg?esc(msg):''}</p>
  </form>
 </div>
 <div class="card pad28 acwhy"><h2 class="h3">¿Para qué sirve una cuenta?</h2><ul class="alist">
  <li>Tus preferencias (Iglesia, calendario) en el ordenador y en el móvil.</li>
  <li>Tu santo: te recordamos cuándo es tu onomástica.</li>
  <li>Continuar donde lo dejaste: tu última página, lectura y recetas.</li>
  <li>Hacer y gestionar un donativo mensual, si lo deseas.</li></ul>
  <p class="small">La cuenta es opcional y gratuita. Toda la web se puede usar igual sin registrarse.</p></div>`;
 $('acLogin').onsubmit=async e=>{e.preventDefault();const m=$('acMsg'),btn=e.target.querySelector('button');
  const email=$('acEmail').value.trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){m.textContent='Escribe un correo electrónico válido.';m.className='acmsg err';return}
  if(!$('acOk').checked){m.textContent='Marca la casilla de la política de privacidad para continuar.';m.className='acmsg err';return}
  btn.disabled=true;m.className='acmsg';m.textContent='Enviando…';
  const j=await call('login.php',{email,acepto:true});btn.disabled=false;
  if(j.ok){m.className='acmsg okk';m.innerHTML='📬 Te hemos enviado un enlace a <b>'+esc(email)+'</b>. Ábrelo desde este mismo dispositivo o desde cualquier otro. Si no lo ves, mira en la carpeta de spam.'}
  else{m.className='acmsg err';m.textContent=j.error||'No se ha podido enviar.'}
 };
}

function renderIn(){
 const box=$('acBox');if(!box||!ME)return;const p=ME.prefs||{};
 const welcome=/bienvenida=1/.test(location.search);
 const br=LS.get('todayBr','ortodoxa'),old=!!LS.get('oldCal',false);
 const food=(p.food||'').split('|');const live=!!(ME.monthly&&ME.monthly.active);
 box.innerHTML=`${welcome?'<p class="acok">✅ Has entrado en tu cuenta.</p>':''}
 <div class="card pad40">
  <p class="kicker">Mi Phos</p><h2 class="h3">Hola${ME.name?', '+esc(ME.name):''}</h2>
  <p class="small" style="margin-top:4px">${esc(ME.email)} · cuenta desde el ${esc(fmtAgo(ME.since))}</p>
  ${p.lastPage?`<p style="margin-top:20px"><a class="btn" href="${esc(p.lastPage)}">Continuar donde lo dejaste: ${esc(p.lastTitle||'última página')}</a></p>`:''}
  <ul class="acrecent">${p.lastRead?`<li>📜 Última lectura: <a href="lecturas.html">${esc(p.lastRead)}</a></li>`:''}${food[0]?`<li>🥣 Recetas: <a href="recetas.html${esc(food[0])}">${esc(food[1]||'ver recetas')}</a></li>`:''}</ul>
 </div>
 <form class="card pad40 acprefs" id="acPrefs">
  <h2 class="h3">Tus preferencias</h2>
  <label for="pName">Cómo quieres que te llamemos (opcional)</label>
  <input id="pName" maxlength="80" value="${esc(ME.name||'')}" autocomplete="given-name">
  <label for="pSanto">Tu santo: el nombre para tu onomástica (opcional)</label>
  <input id="pSanto" maxlength="60" value="${esc(p.santo||'')}" placeholder="Por ejemplo: Andrés, María, Jorge">
  <div id="pSantoR">${onomastica(p.santo||'')}</div>
  <fieldset><legend>Calendario</legend>
   <label class="chk"><input type="radio" name="pCal" value="0" ${old?'':'checked'}> <span>Calendario nuevo</span></label>
   <label class="chk"><input type="radio" name="pCal" value="1" ${old?'checked':''}> <span>Calendario juliano</span></label></fieldset>
  <fieldset><legend>Tu Iglesia</legend>
   ${Object.keys(BRN).map(k=>`<label class="chk"><input type="radio" name="pBr" value="${k}" ${br===k?'checked':''}> <span>${BRN[k]}</span></label>`).join('')}
   <label class="chk consent"><input type="checkbox" id="pConsent" ${ME.religConsent?'checked':''}> <span>Doy mi <b>consentimiento explícito</b> para que Phos guarde mi tradición cristiana en mi cuenta y así la recuerde en todos mis dispositivos. Puedo retirarlo cuando quiera desmarcando esta casilla.</span></label>
   <p class="small">Si no marcas la casilla, tu Iglesia se recuerda solo en este dispositivo y no se guarda en nuestro servidor.</p></fieldset>
  <button class="btn" type="submit">Guardar preferencias</button>
  <p class="acmsg" id="pMsg" role="status"></p>
 </form>
 <div class="card pad40" id="donativo">
  <h2 class="h3">🌿 Donativo mensual</h2>
  <p>Muy pronto podrás hacer aquí un donativo mensual de la cantidad que elijas, y cambiarlo o cancelarlo cuando quieras. Es totalmente voluntario: Phos es y seguirá siendo gratuito.</p>
  <p><a href="apoya.html" class="more">Más sobre los donativos →</a></p>
 </div>
 <div class="card pad40">
  <h2 class="h3">Tu cuenta y tus datos</h2>
  <div class="acbtns"><a class="btn ghost" href="${API}exportar.php">Descargar mis datos</a><button class="btn ghost" type="button" id="acOutBtn">Cerrar sesión</button></div>
 </div>
 <div class="card pad40 acdel" id="eliminar">
  <h2 class="h3">Eliminar mi cuenta</h2>
  <p>Se borrarán para siempre tu cuenta y todo lo que hayas guardado en ella: tu nombre, tu santo, tus preferencias y tu historial de lecturas. Esto no se puede deshacer.</p>
  ${live?`<p class="acwarn">🔒 Tienes un <b>donativo mensual activo</b>${ME.monthly.amount?` de <b>${(ME.monthly.amount/100).toLocaleString('es-ES',{style:'currency',currency:'EUR'})}</b>`:''}. Para que no quede ningún cobro sin control, primero tienes que <a href="#donativo">cancelarlo</a>. Después podrás eliminar tu cuenta.</p>`:'<p class="small">Si tienes un donativo mensual, cancélalo antes: no se puede eliminar una cuenta con un donativo mensual activo.</p>'}
  <div class="acbtns"><button class="btn danger" type="button" id="acDel" ${live?'disabled aria-disabled="true"':''}>Eliminar mi cuenta</button></div>
  <p class="acmsg" id="dMsg" role="status"></p>
 </div>`;
 $('pSanto').addEventListener('input',e=>{$('pSantoR').innerHTML=onomastica(e.target.value)});
 $('acPrefs').onsubmit=async e=>{e.preventDefault();const m=$('pMsg');m.className='acmsg';m.textContent='Guardando…';
  const nb=(document.querySelector('[name=pBr]:checked')||{}).value||'ortodoxa',oc=(document.querySelector('[name=pCal]:checked')||{}).value==='1',consent=$('pConsent').checked;
  LS.set('todayBr',nb);LS.set('oldCal',oc);
  const prefs={oldCal:oc},clear=[];if(consent)prefs.br=nb;
  const s=$('pSanto').value.trim();if(s)prefs.santo=s;else clear.push('santo');
  const j=await call('prefs.php',{name:$('pName').value,religConsent:consent,prefs,clear});
  if(j.ok){ME=j.user;m.className='acmsg okk';m.textContent='✅ Guardado.';document.dispatchEvent(new CustomEvent('phos:prefs'));renderSantoCard()}else{m.className='acmsg err';m.textContent=j.error}
 };
 $('acOutBtn').onclick=async()=>{await call('logout.php',{});ME=null;headerLink();renderOut('Has cerrado la sesión.')};
 let armed=false;
 $('acDel').onclick=async()=>{const m=$('dMsg');if(live)return;
  if(!armed){armed=true;$('acDel').textContent='Sí, eliminar mi cuenta para siempre';m.className='acmsg err';m.textContent='¿Seguro? Pulsa otra vez para confirmar. Esto no se puede deshacer.';return}
  $('acDel').disabled=true;const j=await call('borrar.php',{confirmo:'BORRAR'});
  if(j.ok){ME=null;headerLink();renderOut('Tu cuenta y tus datos se han eliminado.')}else{$('acDel').disabled=false;m.className='acmsg err';m.textContent=j.error}
 };
}

// Tarjeta «Tu santo» en la portada para quien tiene cuenta
function renderSantoCard(){
 const box=$('mySanto');if(!box)return;const s=ME&&ME.prefs&&ME.prefs.santo;
 if(!s){box.hidden=true;return}
 box.hidden=false;box.innerHTML=`<p class="kicker">Tu santo</p><h3>${esc(s)}</h3>${onomastica(s)}<a href="mi-phos.html" class="more">Mi Phos →</a>`;
}

async function init(){
 const onPage=!!$('acBox');
 if(loggedHint()||onPage){
  const j=await call('me.php');
  if(j.ok&&j.user){ME=j.user;syncFromServer();track()}
  else if(onPage&&j.status&&j.status>=500){headerLink();renderOut(j.error);return}
 }
 headerLink();renderSantoCard();
 if(onPage){if(ME)renderIn();else renderOut('')}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
