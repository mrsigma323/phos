// ---------- Símbolo de cada Iglesia en la cabecera, la pantalla de carga y la bienvenida ----------
// Ortodoxa: cruz de tres travesaños. Católica: cruz latina con las llaves de san Pedro. Protestante: cruz sobre la Biblia abierta (sola Scriptura).
// «Todas»: el símbolo cambia al azar cada vez que se cambia de sección.
const SYM={
 ortodoxa:'<path d="M15 3v34M10 8h10M5 16h20M9 29l12-5"/>',
 catolica:'<path d="M15 3v19M8 10h14"/><g stroke-width="2"><circle cx="7.5" cy="25" r="2.6"/><circle cx="22.5" cy="25" r="2.6"/><path d="M9.5 27l12 11M20.5 27l-12 11M18.5 35.5l-2 2M11.5 35.5l2 2"/></g>',
 protestante:'<path d="M15 3v20M9 9h12"/><path d="M3 28c4-2 8-2 12 0c4-2 8-2 12 0v8c-4-2-8-2-12 0c-4-2-8-2-12 0z" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 28v8" stroke-width="2.2"/>'};
const SYM_ALL={es:"Todas",en:"All of them",pt:"Todas",fr:"Toutes",it:"Tutte",de:"Alle",el:"Όλες",ru:"Все",ro:"Toate"};
const SYM_ALLD={es:"Me interesan las tres tradiciones",en:"I'm interested in all three traditions",pt:"Interessam-me as três tradições",fr:"Les trois traditions m’intéressent",it:"Mi interessano tutte e tre le tradizioni",de:"Mich interessieren alle drei Traditionen",el:"Με ενδιαφέρουν και οι τρεις παραδόσεις",ru:"Мне интересны все три традиции",ro:"Mă interesează toate cele trei tradiții"};
let symCur=null;
const symMine=()=>store.get('symAll',false)?'all':tdBr();
function symPick(){const m=symMine();if(m!=='all')return m;const k=Object.keys(SYM).filter(x=>x!==symCur);return k[Math.floor(Math.random()*k.length)]}
function symPaint(k){symCur=k||symPick();
 document.querySelectorAll('.brandx,#splash svg,.wlogo').forEach(s=>{s.innerHTML=SYM[symCur];s.setAttribute('data-sym',symCur)})}
try{symPaint()}catch(e){}
// Al cambiar de sección
const _goSym=go;go=function(v,o){const before=S.sec;const r=_goSym.apply(this,arguments);if(symMine()==='all'&&S.sec!==before)symPaint();return r};
// Bienvenida: cada Iglesia con su símbolo, y la opción «Todas»
const _showWelcomeS=showWelcome;
showWelcome=function(step){_showWelcomeS.apply(this,arguments);symPaint(symMine()==='all'?symCur:undefined);
 const box=document.querySelector('#welcome .wchurch');if(!box)return;
 const L=LANG,all=store.get('symAll',false),br=store.get('todayBr',null);
 const ic=k=>`<svg viewBox="0 0 30 40" fill="none" stroke="#E2C27A" stroke-width="2.6" stroke-linecap="round" aria-hidden="true">${SYM[k]}</svg>`;
 box.innerHTML=[['ortodoxa','ort'],['catolica','cat'],['protestante','prot']].map(([k,l])=>`<button class="wc${!all&&br===k?' on':''}" data-b="${k}"><span>${ic(k)}</span>${esc(wt(l))}</button>`).join('')
  +`<button class="wc${all?' on':''}" data-b="all"><span class="wall">${ic('ortodoxa')}${ic('catolica')}${ic('protestante')}</span><div>${esc(SYM_ALL[L]||SYM_ALL.en)}<small>${esc(SYM_ALLD[L]||SYM_ALLD.en)}</small></div></button>`;
 box.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const k=b.dataset.b;
  if(k==='all'){store.set('symAll',true);if(!store.get('todayBr',null))store.set('todayBr','ortodoxa')}else{store.set('symAll',false);store.set('todayBr',k)}
  box.querySelectorAll('[data-b]').forEach(x=>x.classList.toggle('on',x===b));symPaint(k==='all'?undefined:k)})};
(function(){const st=document.createElement('style');st.textContent=`.wc span svg{width:26px;height:34px;display:block;margin:auto}.wc span.wall{display:flex;width:auto;gap:2px}.wc span.wall svg{width:16px;height:22px}.wc div small{display:block;font-size:13px;opacity:.75;margin-top:2px}.brandx{transition:opacity .25s}.wc.on svg{stroke:#4A1416}[data-theme=dark] header.top{color:#FBF3E2}.city:focus{outline:none}.city:focus-visible circle:first-child{stroke:#B5574C;stroke-width:3}`;document.head.appendChild(st)})();
