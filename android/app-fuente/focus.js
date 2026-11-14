// ---------- Modo lectura (Phos Premium): temporizador, «No molestar» con permiso y ánimo ----------
// Leer la Biblia sigue siendo gratis y completo; Premium añade el acompañamiento.
const FX={
es:{t:"Modo lectura",lead:"Un rato para la Palabra, sin distracciones: tú eliges cuánto tiempo y cómo.",dur:"¿Cuánto tiempo?",min:"{n} min",
 dnd:"Activar «No molestar» mientras dura",dndNote:"Android pedirá tu permiso una vez. Las alarmas y tus contactos favoritos seguirán sonando. Al terminar, el móvil vuelve como estaba.",dndAsk:"Dar permiso en Android",
 cheer:"Frases de ánimo durante la lectura",buzz:"Vibrar al terminar",start:"Empezar",pause:"Pausa",resume:"Seguir",stop:"Terminar",
 doneT:"¡{n} minutos con la Palabra! 🙏",doneT1:"¡Un minuto con la Palabra! 🙏",today:"Hoy: {n} min",week:"Esta semana: {n} min",days:"Días seguidos leyendo: {n}",close:"Cerrar",readNow:"Ir a leer",
 c1:"Respira y lee despacio: no hay prisa.",c2:"Vas por la mitad. Quédate con una frase que te toque.",c3:"Quedan dos minutos: ¿qué te ha dicho hoy la lectura?",
 c4:"«Lámpara es a mis pies tu palabra» (Salmo 119).",c5:"Cada minuto con la Palabra cuenta.",prem:"El Modo lectura es de Phos Premium (Google Play). Leer la Biblia siempre es gratis."},
en:{t:"Reading mode",lead:"Time for the Word, without distractions: you choose how long and how.",dur:"How long?",min:"{n} min",
 dnd:"Turn on «Do not disturb» while it lasts",dndNote:"Android will ask for your permission once. Alarms and your starred contacts still ring. When it ends, your phone goes back to how it was.",dndAsk:"Grant permission in Android",
 cheer:"Encouraging phrases while reading",buzz:"Vibrate when it ends",start:"Start",pause:"Pause",resume:"Resume",stop:"Finish",
 doneT:"{n} minutes with the Word! 🙏",doneT1:"One minute with the Word! 🙏",today:"Today: {n} min",week:"This week: {n} min",days:"Days in a row reading: {n}",close:"Close",readNow:"Go and read",
 c1:"Breathe and read slowly: there's no hurry.",c2:"Halfway there. Keep one phrase that touches you.",c3:"Two minutes left: what has the reading told you today?",
 c4:"«Your word is a lamp to my feet» (Psalm 119).",c5:"Every minute with the Word counts.",prem:"Reading mode is part of Phos Premium (Google Play). Reading the Bible is always free."}};
const ft=(k,o)=>{let s=(FX[LANG]&&FX[LANG][k])||FX.en[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
const fset=()=>Object.assign({min:15,dnd:false,cheer:true,buzz:true},store.get('focusSet',{}));
const frun=()=>store.get('focusRun',null);
let _fT=null;

function focusSheet(){
 if(IN_APP&&!isPremium()){toast(ft('prem'));return openP('premium')}
 const s=fset(),can=!!(window.PhosApp&&PhosApp.dndAllowed),ok=can&&PhosApp.dndAllowed();
 let sh=$('#fSheet');if(sh)sh.remove();sh=document.createElement('div');sh.id='fSheet';sh.className='lsheet';sh.setAttribute('role','dialog');
 sh.innerHTML=`<div class="lbox"><button class="iconbtn lx" id="fX" aria-label="×">✕</button><h2>⏱️ ${esc(ft('t'))}</h2><p class="note">${esc(ft('lead'))}</p>
 <p class="note"><b>${esc(ft('dur'))}</b></p><div class="chips">${[5,10,15,20,30,45,60].map(n=>`<button class="chip${s.min===n?' on':''}" data-fm="${n}">${esc(ft('min',{n}))}</button>`).join('')}</div>
 ${can?`<label class="nrow" style="margin-top:12px"><input type="checkbox" id="fDnd" ${s.dnd&&ok?'checked':''} ${ok?'':'disabled'}><span class="small">🔕 ${esc(ft('dnd'))}</span></label>
  <p class="note">${esc(ft('dndNote'))}</p>${ok?'':`<button class="btn ghost" id="fAsk" style="width:100%">${esc(ft('dndAsk'))}</button>`}`:''}
 <label class="nrow"><input type="checkbox" id="fCheer" ${s.cheer?'checked':''}><span class="small">💬 ${esc(ft('cheer'))}</span></label>
 <label class="nrow"><input type="checkbox" id="fBuzz" ${s.buzz?'checked':''}><span class="small">📳 ${esc(ft('buzz'))}</span></label>
 <button class="btn" id="fGo" style="width:100%;margin-top:14px">${esc(ft('start'))}</button></div>`;
 document.body.appendChild(sh);
 const save=()=>{const o=fset();const d=$('#fDnd');o.dnd=!!(d&&d.checked);o.cheer=$('#fCheer').checked;o.buzz=$('#fBuzz').checked;store.set('focusSet',o);return o};
 $('#fX').onclick=()=>sh.remove();sh.onclick=e=>{if(e.target===sh)sh.remove()};
 sh.querySelectorAll('[data-fm]').forEach(b=>b.onclick=()=>{const o=save();o.min=+b.dataset.fm;store.set('focusSet',o);sh.querySelectorAll('[data-fm]').forEach(x=>x.classList.toggle('on',x===b))});
 const a=$('#fAsk');if(a)a.onclick=()=>{save();PhosApp.dndAsk()};
 $('#fGo').onclick=()=>{const o=save();sh.remove();focusStart(o)};
}
function focusStart(o){
 const now=Date.now(),run={start:now,end:now+o.min*6e4,min:o.min,dnd:false,cheer:o.cheer,buzz:o.buzz,said:[]};
 if(o.dnd&&window.PhosApp&&PhosApp.dndOn){try{run.dnd=!!PhosApp.dndOn(o.min)}catch(e){}}
 store.set('focusRun',run);focusPill();
 if(!(S.view==='read'&&S.sec==='bible')){const pa=store.get('planActive',null);if(pa&&typeof planToday==='function'){go('mine',{sec:'mine'});S.plan=pa;go('m_plan')}else go('home',{sec:'bible',ed:null,book:null,ch:null})}
}
function focusPill(){
 const r=frun();let p=$('#fPill');if(!r){if(p)p.remove();clearInterval(_fT);return}
 if(!p){p=document.createElement('div');p.id='fPill';p.className='fpill';document.body.appendChild(p)}
 const tick=()=>{const r2=frun();if(!r2)return focusPill();const left=r2.paused?r2.left:r2.end-Date.now();
  if(left<=0&&!r2.paused)return focusEnd(true);
  const t=Math.ceil(left/1000),m=Math.floor(t/60),s=t%60,el=$('#fTime');if(el)el.textContent=m+':'+String(s).padStart(2,'0');
  if(r2.cheer&&!r2.paused){const tot=r2.min*6e4,done=tot-left;
   const say=(k,cond)=>{if(cond&&!r2.said.includes(k)){r2.said.push(k);store.set('focusRun',r2);toast(ft(k))}};
   say('c1',done>20e3);say('c2',done>=tot/2);say('c3',left<=12e4&&tot>3e5);}};
 p.innerHTML=`<span>⏱️ <b id="fTime">--:--</b>${r.dnd?' · 🔕':''}</span><button id="fP">${esc(r.paused?ft('resume'):ft('pause'))}</button><button id="fS">${esc(ft('stop'))}</button>`;
 $('#fP').onclick=()=>{const r2=frun();if(r2.paused){r2.end=Date.now()+r2.left;r2.paused=false}else{r2.left=r2.end-Date.now();r2.paused=true}store.set('focusRun',r2);focusPill()};
 $('#fS').onclick=()=>focusEnd(false);
 clearInterval(_fT);_fT=setInterval(tick,1000);tick();
}
function focusEnd(full){
 const r=frun();if(!r)return;clearInterval(_fT);store.set('focusRun',null);const p=$('#fPill');if(p)p.remove();
 try{if(r.dnd&&window.PhosApp)PhosApp.dndOff()}catch(e){}
 if(full&&r.buzz)try{window.PhosApp&&PhosApp.vibrate?PhosApp.vibrate():navigator.vibrate&&navigator.vibrate([120,120,120])}catch(e){}
 const mins=Math.max(1,Math.round(((r.paused?r.end-r.left:Math.min(Date.now(),r.end))-r.start)/6e4));
 const L=store.get('focusLog',{}),k=todayKey();L[k]=(L[k]||0)+mins;const ks=Object.keys(L).sort();while(ks.length>400)delete L[ks.shift()];store.set('focusLog',L);
 let wk=0,days=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);wk+=L[d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')]||0}
 for(let i=0;i<400;i++){const d=new Date();d.setDate(d.getDate()-i);if(L[d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')])days++;else break}
 let sh=document.createElement('div');sh.id='fDone';sh.className='lsheet';
 sh.innerHTML=`<div class="lbox" style="text-align:center"><div style="font-size:46px">📖✨</div><h3 class="fdone">${esc(ft(mins===1?'doneT1':'doneT',{n:mins}))}</h3>
 <p class="note">${esc(ft('today',{n:L[k]}))} · ${esc(ft('week',{n:wk}))} · ${esc(ft('days',{n:days}))}</p><blockquote class="vq"><span id="fV">${esc(ft('c4'))}</span><cite id="fR"></cite></blockquote>
 <button class="btn" id="fC" style="width:100%">${esc(ft('close'))}</button></div>`;
 document.body.appendChild(sh);$('#fC').onclick=()=>sh.remove();
 try{vText(VOTD[(dayIdx()+3)%VOTD.length]).then(v=>{if(v&&$('#fV')){$('#fV').textContent=v.txt;$('#fR').textContent=v.ref}})}catch(e){}
}
window.PhosFocus={onResume(){const r=frun();if(r){if(!r.paused&&Date.now()>=r.end)focusEnd(true);else focusPill()}}};

// Puntos de entrada: lector de la Biblia, Mi Phos y planes
const _drawListenF=drawListen;
drawListen=function(){_drawListenF.apply(this,arguments);const bar=$('#listenBar');if(!bar||frun()||$('#lFocus'))return;
 const b=document.createElement('button');b.className='lbtn';b.id='lFocus';b.textContent='⏱️'+(isPremium()?'':' 👑');b.setAttribute('aria-label',ft('t'));b.onclick=focusSheet;bar.appendChild(b)};
const _renderMineF=renderMine;
renderMine=function(){_renderMineF.apply(this,arguments);if(S.view!=='mine')return;
 const c=document.createElement('button');c.className='card rcard';c.innerHTML=`<div class="t"><span class="rico">⏱️</span>${esc(ft('t'))}${!isPremium()&&IN_APP?'<span class="pill">👑 Premium</span>':''}</div><div class="s">${esc(ft('lead'))}</div>`;
 c.onclick=focusSheet;const ref=view.querySelector('[data-m="m_plans"]');if(ref)ref.before(c);else view.appendChild(c)};
const _drawPlanF=drawPlan;
drawPlan=function(){_drawPlanF.apply(this,arguments);const d=$('#pDone');if(!d||$('#pFocus'))return;
 const b=document.createElement('button');b.className='btn ghost';b.id='pFocus';b.style.cssText='width:100%;margin-top:10px';b.textContent='⏱️ '+ft('t')+(isPremium()?'':' 👑');b.onclick=focusSheet;d.after(b)};
(function(){const st=document.createElement('style');st.textContent=`
.fpill{position:fixed;top:calc(env(safe-area-inset-top) + 64px);left:50%;transform:translateX(-50%);z-index:70;display:flex;gap:6px;align-items:center;background:#4A1416;color:#FBF6EA;border:1.5px solid #E2C27A;border-radius:999px;padding:6px 6px 6px 14px;box-shadow:0 6px 18px rgba(0,0,0,.3);font:600 15px Inter,sans-serif}
.fpill{white-space:nowrap}.fpill b{font-variant-numeric:tabular-nums}
#fSheet .chip{border:1.5px solid var(--line);background:#fff;border-radius:999px;padding:8px 14px;font:600 15px Inter,sans-serif;color:var(--ink)}#fSheet .chip.on{background:var(--wine);color:#fff;border-color:var(--wine)}
.fdone{font:600 28px 'Cormorant Garamond',serif;color:var(--wine);margin:6px 0;text-transform:none;letter-spacing:0}.fpill button{border:0;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font:600 13px Inter,sans-serif;padding:7px 11px}
.fpill button#fS{background:#E2C27A;color:#4A1416}`;document.head.appendChild(st)})();
setTimeout(()=>PhosFocus.onResume(),1500);
