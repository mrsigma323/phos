// Phos · comunidad: «Amén», comentarios, muro de oración y seudónimo.
// Leer es libre; para escribir hace falta la cuenta de Mi Phos (sin contraseña) y un seudónimo.
(function(){
'use strict';
const API='/api/';
const LS={get(k,d){try{const v=localStorage.getItem('phos:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('phos:'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
// Identificador anónimo de este navegador: solo sirve para no contar dos veces el mismo «Amén»
function anon(){let a=LS.get('anon',null);if(!a||!/^[A-Za-z0-9_-]{16,64}$/.test(a)){const b=new Uint8Array(16);(crypto||window.msCrypto).getRandomValues(b);a=Array.from(b,x=>('0'+x.toString(36)).slice(-2)).join('').replace(/[^A-Za-z0-9]/g,'x');LS.set('anon',a)}return a}
async function call(path,data){
 const o={credentials:'same-origin',headers:{'X-Phos':'1'}};
 if(data!==undefined){o.method='POST';o.headers['Content-Type']='application/json';o.body=JSON.stringify(Object.assign({a:anon()},data))}
 try{const r=await fetch(API+path,o);const j=await r.json().catch(()=>({}));j.status=r.status;if(!r.ok&&!j.error)j.error='Ha ocurrido un error. Inténtalo de nuevo.';return j}
 catch(e){return {ok:false,error:'No hay conexión. Inténtalo de nuevo.',status:0}}
}
const get=t=>call('comunidad.php?t='+encodeURIComponent(t)+'&a='+anon());
const off=j=>!j.ok&&(j.status===404||j.status===503||j.status===0);
function when(iso){const d=new Date(iso),s=(Date.now()-d)/1e3;
 if(s<90)return 'ahora mismo';if(s<3600)return 'hace '+Math.round(s/60)+' min';if(s<86400)return 'hace '+Math.round(s/3600)+' h';
 return d.toLocaleDateString('es-ES',{day:'numeric',month:'long'})}
const goLogin=()=>{LS.set('volver',location.pathname+location.hash);location.href='/mi-phos.html'};

// ---------- «Amén» ----------
function amen(el){
 const t=el.dataset.t==='lect'?'lect:'+today():el.dataset.t;el.dataset.t=t;
 const draw=(n,mine)=>{el.innerHTML=`<button type="button" class="phx-amenb${mine?' on':''}" aria-pressed="${mine}">🙏 Amén</button><span class="phx-amenn">${n?(n===1?'1 persona':n+' personas'):'Sé el primero'}</span>`;
  el.querySelector('button').onclick=async e=>{e.currentTarget.disabled=true;const j=await call('reaccion.php',{t,k:'amen'});if(j.ok)draw(j.n,j.mine);else e.currentTarget.disabled=false}};
 get(t).then(j=>{if(off(j)){el.hidden=true;return}if(j.ok)draw(j.amen.n,j.amen.mine)});
}

// ---------- Seudónimo ----------
function aliasForm(box,cur,done){
 box.innerHTML=`<form class="phx-alias" novalidate>
  <label for="phxA">${cur?'Cambiar tu seudónimo':'Elige tu seudónimo'}</label>
  <input id="phxA" maxlength="24" value="${esc(cur||'')}" placeholder="Por ejemplo: Peregrino de Emaús" autocomplete="off">
  <p class="small">Es el único nombre que verán los demás. Tu correo nunca se muestra. No uses tu nombre completo si prefieres no ser reconocido.</p>
  ${cur?'':`<label class="chk"><input type="checkbox" id="phxN"> <span>He leído y acepto las <a href="/normas-comunidad.html" target="_blank">normas de la comunidad</a>.</span></label>
  <label class="chk"><input type="checkbox" id="phxC"> <span>Doy mi <b>consentimiento explícito</b> para que Phos publique con mi seudónimo los mensajes que yo escriba, aunque puedan mostrar mis creencias religiosas. Puedo borrar mis mensajes o retirar este consentimiento cuando quiera desde Mi Phos.</span></label>`}
  <button class="btn" type="submit">${cur?'Guardar seudónimo':'Empezar a participar'}</button><p class="acmsg" role="status"></p></form>`;
 const f=box.querySelector('form'),m=f.querySelector('.acmsg');
 f.onsubmit=async e=>{e.preventDefault();
  if(!cur&&(!f.querySelector('#phxN').checked||!f.querySelector('#phxC').checked)){m.className='acmsg err';m.textContent='Marca las dos casillas para continuar.';return}
  const b=f.querySelector('button');b.disabled=true;m.className='acmsg';m.textContent='Guardando…';
  const j=await call('seudonimo.php',{alias:f.querySelector('#phxA').value,normas:true,consiento:true});b.disabled=false;
  if(j.ok){m.className='acmsg okk';m.textContent='✅ Listo. Ya eres «'+j.alias+'».';setTimeout(()=>done&&done(j.alias),700)}else{m.className='acmsg err';m.textContent=j.error}};
}

// ---------- Comentarios y muro de oración ----------
const REASONS=[['ofensivo','Ofensivo o irrespetuoso'],['odio','Odio o discriminación'],['publicidad','Publicidad o spam'],['datos','Datos personales de alguien'],['ilegal','Contenido ilegal'],['otro','Otro motivo']];
function thread(el){
 const t=el.dataset.t==='lect'?'lect:'+today():el.dataset.t;const kind=el.dataset.kind||'comentario';const muro=kind==='oracion';
 const max=muro?600:1000;
 const title=el.dataset.title||(muro?'Intenciones de oración':'Comentarios');
 async function load(msg){
  const j=await get(t);
  if(off(j)){el.hidden=true;return}
  if(!j.ok){el.innerHTML='<p class="small">'+esc(j.error)+'</p>';return}
  const me=j.me;let form='';
  if(!me)form=`<div class="phx-cta"><p>${muro?'Para pedir oración':'Para escribir'} entra con tu cuenta gratuita de Mi Phos. <b>No hace falta contraseña.</b> Leer es libre para todos.</p><button type="button" class="btn" data-login>Entrar para ${muro?'pedir oración':'escribir'}</button></div>`;
  else if(me.banned)form='<p class="phx-note">Tu cuenta no puede escribir en la comunidad. Si crees que es un error, escríbenos.</p>';
  else if(!me.alias)form='<div class="phx-aliasbox"><p><b>Un paso más:</b> elige el seudónimo con el que aparecerás.</p><div data-alias></div></div>';
  else form=`<form class="phx-form" novalidate><label for="phxT-${esc(t)}" class="sr">${muro?'Tu intención de oración':'Tu comentario'}</label>
   <textarea id="phxT-${esc(t)}" maxlength="${max}" rows="${muro?3:4}" placeholder="${muro?'¿Por quién o por qué quieres que recemos? No pongas apellidos ni datos que identifiquen a nadie.':'Comparte lo que te ha dicho la Palabra de hoy, con respeto hacia todos.'}"></textarea>
   <div class="phx-fbar"><span class="small">Escribes como <b>${esc(me.alias)}</b> · <a href="/mi-phos.html#phxMine">cambiar</a></span><span class="small phx-cnt">0/${max}</span></div>
   <button class="btn" type="submit">${muro?'Pedir oración':'Publicar'}</button>
   ${j.premod?'<p class="small">Para cuidar la comunidad, los mensajes se publican después de revisarlos (normalmente en menos de 24 horas).</p>':''}
   <p class="acmsg" role="status">${msg?esc(msg):''}</p></form>`;
  const posts=j.posts||[];
  el.innerHTML=`<h2 class="h3">${muro?'🕯️':'💬'} ${esc(title)}</h2>${el.dataset.lead?`<p class="small">${esc(el.dataset.lead)}</p>`:''}${form}
   <ul class="phx-list">${posts.length?posts.map(p=>`<li class="phx-p${p.pending?' pend':''}" data-id="${p.id}">
    <div class="phx-h"><b>${esc(p.alias)}</b>${p.staff?'<span class="phx-staff">Equipo Phos</span>':''}<span class="small">${esc(when(p.at))}</span>${p.pending?'<span class="phx-pend">Pendiente de revisión · solo lo ves tú</span>':''}</div>
    <p class="phx-b">${esc(p.body)}</p>
    <div class="phx-acts">${muro&&!p.pending?`<button type="button" class="phx-rezo${p.mineRezo?' on':''}" data-rezo aria-pressed="${p.mineRezo}">🙏 Rezo por ti${p.rezo?' · '+p.rezo:''}</button>`:''}
     ${p.mine?'<button type="button" class="phx-link" data-del>Borrar</button>':(!p.pending?'<button type="button" class="phx-link" data-rep>Denunciar</button>':'')}</div></li>`).join(''):`<li class="phx-empty">${muro?'Aún no hay intenciones. Puedes ser el primero en pedir oración.':'Aún no hay comentarios. ¿Te animas a escribir el primero?'}</li>`}</ul>
   <p class="small phx-foot">Participar es gratis. Respeta las <a href="/normas-comunidad.html">normas de la comunidad</a>. Si ves algo que no debería estar aquí, pulsa «Denunciar».</p>`;
  bind(me);
 }
 function bind(me){
  const lg=el.querySelector('[data-login]');if(lg)lg.onclick=goLogin;
  const ab=el.querySelector('[data-alias]');if(ab)aliasForm(ab,null,()=>load());
  const f=el.querySelector('.phx-form');
  if(f){const ta=f.querySelector('textarea'),cn=f.querySelector('.phx-cnt'),m=f.querySelector('.acmsg');
   ta.oninput=()=>{cn.textContent=ta.value.length+'/'+max};
   f.onsubmit=async e=>{e.preventDefault();const body=ta.value.trim();if(body.length<3){m.className='acmsg err';m.textContent='Escribe un poco más.';return}
    const b=f.querySelector('button');b.disabled=true;m.className='acmsg';m.textContent='Enviando…';
    const j=await call('publicar.php',{t,kind,body});b.disabled=false;
    if(j.ok)load(j.pending?'✅ Recibido. Lo verás publicado cuando lo revisemos.':'✅ Publicado.');else{m.className='acmsg err';m.textContent=j.error}}}
  el.querySelectorAll('[data-rezo]').forEach(b=>b.onclick=async()=>{const li=b.closest('li');b.disabled=true;const j=await call('reaccion.php',{t:'post:'+li.dataset.id,k:'rezo'});b.disabled=false;
   if(j.ok){b.classList.toggle('on',j.mine);b.setAttribute('aria-pressed',j.mine);b.textContent='🙏 Rezo por ti'+(j.n?' · '+j.n:'')}});
  el.querySelectorAll('[data-del]').forEach(b=>{let armed=false;b.onclick=async()=>{if(!armed){armed=true;b.textContent='¿Seguro? Pulsa otra vez para borrar';return}
   b.disabled=true;const j=await call('mi-mensaje.php',{id:+b.closest('li').dataset.id});if(j.ok)load();else{b.disabled=false;b.textContent=j.error}}});
  el.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{const li=b.closest('li');if(li.querySelector('.phx-repf'))return;
   const d=document.createElement('form');d.className='phx-repf';
   d.innerHTML=`<label>¿Por qué lo denuncias?</label><select>${REASONS.map(r=>`<option value="${r[0]}">${r[1]}</option>`).join('')}</select><input maxlength="250" placeholder="Detalle (opcional)"><button class="btn small" type="submit">Enviar aviso</button><button class="phx-link" type="button" data-x>Cancelar</button><p class="acmsg" role="status"></p>`;
   li.append(d);d.querySelector('[data-x]').onclick=()=>d.remove();
   d.onsubmit=async e=>{e.preventDefault();const m=d.querySelector('.acmsg');const j=await call('denunciar.php',{id:+li.dataset.id,motivo:d.querySelector('select').value,detalle:d.querySelector('input').value});
    if(j.ok){d.innerHTML='<p class="acmsg okk">Gracias. Lo revisaremos lo antes posible.</p>'}else{m.className='acmsg err';m.textContent=j.error}}});
 }
 el.innerHTML='<p class="small">Cargando…</p>';load();
}

// ---------- Mi Phos: tarjeta del seudónimo ----------
document.addEventListener('phos:acct',e=>{
 const box=document.getElementById('phxMine');if(!box)return;const me=e.detail||{};
 const show=alias=>{box.innerHTML=`<h2 class="h3">Tu seudónimo en la comunidad</h2>${alias?`<p>Apareces como <b>${esc(alias)}</b> en los comentarios y en el <a href="/muro-oracion.html">muro de oración</a>. Tu correo nunca se muestra.</p><div data-alias></div><p class="small" style="margin-top:18px">¿Quieres dejar la comunidad? Se borrarán tu seudónimo y todos tus mensajes, y se retira tu consentimiento. Tu cuenta sigue igual.</p><button type="button" class="btn ghost" data-out>Dejar la comunidad</button><p class="acmsg" role="status" data-outm></p>`:`<p>Para comentar las lecturas y los artículos, o para pedir oración en el <a href="/muro-oracion.html">muro de oración</a>, elige un seudónimo. Es opcional.</p><div data-alias></div>`}`;
  aliasForm(box.querySelector('[data-alias]'),alias,a=>show(a));
  const o=box.querySelector('[data-out]');if(o){let armed=false;o.onclick=async()=>{const m=box.querySelector('[data-outm]');
   if(!armed){armed=true;o.textContent='Sí, borrar mi seudónimo y mis mensajes';m.className='acmsg err';m.textContent='¿Seguro? Pulsa otra vez para confirmar.';return}
   o.disabled=true;const j=await call('seudonimo.php',{salir:true});if(j.ok)show(null);else{o.disabled=false;m.textContent=j.error}}}};
 show(me.alias||null);
});

function init(){
 document.querySelectorAll('.phx-amen').forEach(amen);
 document.querySelectorAll('.phx-com').forEach(thread);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
// ---- Recuento de visitas sin cookies: solo la página y de dónde se llega ----
try{if(navigator.sendBeacon&&!/bot|crawl|spider/i.test(navigator.userAgent))navigator.sendBeacon('/api/visita.php',new Blob([JSON.stringify({p:location.pathname,r:document.referrer})],{type:'application/json'}))}catch(e){}
