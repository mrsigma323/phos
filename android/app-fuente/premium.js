// ---------- Phos Premium (solo en la app de Android de Google Play) ----------
// Pagos: Google Play Billing a través del puente PhosApp (MainActivity.java / Billing.java).
// Productos: suscripción «phos_premium» (planes base «mensual» y «anual»)
//            y aportaciones consumibles «apoyo_2», «apoyo_5», «apoyo_10».
const IN_APP=!!(window.PhosApp&&PhosApp.billingAvailable);
const TIPS=['apoyo_2','apoyo_5','apoyo_10'];
const PAY={products:null,err:null,busy:false};
// En la APK de prueba (compilación de depuración) Premium está desbloqueado; en la de Google Play, nunca.
const TEST_BUILD=!!(window.PhosApp&&PhosApp.isTestBuild&&PhosApp.isTestBuild());
const isPremium=()=>TEST_BUILD||!!store.get('premium',{on:false}).on;
const LEGAL_URL='https://phosbiblias.com/condiciones-aportaciones.html',PRIV_URL='https://phosbiblias.com/privacidad.html';
const CROWN='<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></svg>';

window.PhosPay={
 onProducts(list){PAY.products=list||[];PAY.err=null;if(['premium','apoyo'].includes(S.view))render()},
 onEntitlement(e){const was=isPremium();store.set('premium',{on:!!(e&&e.premium),ts:Date.now()});
  if(was!==isPremium()){scheduleReminders();render()}},
 onPurchase(p){PAY.busy=false;const tip=p&&p.tip;if(typeof vidaPurchase==='function')vidaPurchase(p||{});
  if(!tip){store.set('premium',{on:true,ts:Date.now()});scheduleReminders()}
  toast(pt(tip?'thanksTip':'thanksSub'));render()},
 onError(code,msg){PAY.busy=false;if(code===1)return render();/* 1 = el usuario canceló */
  PAY.err=pt('payErr')+(msg?' · '+msg:'');render()}
};
window.PhosNotif={onPermission(ok){if(ok)scheduleReminders();render()}};

function toast(msg){let el=$('#phosToast');if(!el){el=document.createElement('div');el.id='phosToast';el.className='ptoast';el.setAttribute('role','status');document.body.appendChild(el)}
 el.textContent=msg;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),3200)}

// ---------- Pantallas ----------
const prod=id=>(PAY.products||[]).find(p=>p.id===id);
const per=p=>/Y$/.test(p||'')?pt('perYear'):pt('perMonth');
function drawPremium(){
 const on=isPremium(),sub=prod('phos_premium');
 let h=`<h1>${CROWN.replace('22','30').replace('22','30')} ${esc(pt('prem'))}</h1><p class="lead">${esc(pt('premLead'))}</p>
 <ul class="plist"><li>🔔 ${esc(pt('f1'))}</li><li>📖 ${esc(pt('f2'))}</li><li>🧩 ${esc(typeof qt==='function'?qt('retos'):'')} · ⛰️ ${esc(typeof vt==='function'?vt('vida'):'')} · 🔊 ${esc(typeof qt==='function'?qt('listen'):'')}</li><li>🕯️ ${esc(pt('f3'))}</li></ul>`;
 if(!IN_APP)h+=`<div class="card"><div class="s">${esc(pt('notApp'))}</div></div>`;
 else if(on)h+=`<div class="card main"><div class="t">✓ ${esc(pt('active'))}</div><button class="btn ghost" id="pManage" style="margin-top:12px;width:100%">${esc(pt('manage'))}</button></div>
  <button class="card" id="pNotif"><div class="t">🔔 ${esc(pt('reminders'))}</div><div class="s">${esc(pt('remLead'))}</div></button>`;
 else if(!sub)h+=`<div class="loading">${esc(pt('loading'))}</div>`;
 else h+=(typeof payConsentHTML==='function'?payConsentHTML():'')+`<div class="plans">${(sub.plans||[]).sort((a,b)=>a.basePlan==='anual'?-1:1).map(p=>`<button class="card plan ${p.basePlan==='anual'?'main':''}" data-plan="${esc(p.basePlan)}" ${PAY.busy?'disabled':''}>
   <div class="t">${esc(pt(p.basePlan==='anual'?'yearly':'monthly'))}${p.trial?`<span class="pill">${esc(pt('trial'))}</span>`:''}</div>
   <div class="pprice"><b>${esc(p.price)}</b> ${esc(per(p.period))}</div></button>`).join('')}</div>`;
 if(PAY.err)h+=`<p class="note perr">${esc(PAY.err)}</p>`;
 h+=`<p class="note">${esc(pt('legal'))}</p>
 <p class="note plinks">${IN_APP?`<button class="linkbtn" id="pRestore">${esc(pt('restore'))}</button> · `:''}<button class="linkbtn" id="pTermsIn">${esc(pt('terms'))}</button> · <a href="${PRIV_URL}" target="_blank" rel="noopener">${esc(pt('privacy'))}</a></p>
 <button class="card" id="pTip"><div class="t">🙏 ${esc(pt('support'))}</div><div class="s">${esc(pt('supportLead'))}</div></button>`;
 view.innerHTML=h;
 if(typeof wirePayConsent==='function')wirePayConsent();
 view.querySelectorAll('[data-plan]').forEach(x=>x.onclick=()=>{if(typeof payConsentOK==='function'&&!payConsentOK())return;PAY.busy=true;PAY.err=null;PhosApp.billingBuy('phos_premium',x.dataset.plan);drawPremium()});
 const b=(id,f)=>{const e=$('#'+id);if(e)e.onclick=f};
 b('pManage',()=>PhosApp.billingManage());b('pRestore',()=>{PhosApp.billingRefresh();toast(pt('loading'))});
 b('pNotif',()=>openP('notif'));b('pTermsIn',()=>typeof openTermsP==='function'?openTermsP():window.open(LEGAL_URL));b('pTip',()=>openP('apoyo'));
}
function drawApoyo(){
 const names={apoyo_2:pt('tip1'),apoyo_5:pt('tip2'),apoyo_10:pt('tip3')};
 let h=`<h1>🙏 ${esc(pt('support'))}</h1><p class="lead">${esc(pt('supportLead'))}</p>`;
 if(!IN_APP)h+=`<div class="card"><div class="s">${esc(pt('notApp'))}</div></div>`;
 else if(!PAY.products)h+=`<div class="loading">${esc(pt('loading'))}</div>`;
 else h+=(typeof payConsentHTML==='function'?payConsentHTML():'')+`<div class="plans">${TIPS.map(id=>{const p=prod(id);return p?`<button class="card plan" data-tip="${id}" ${PAY.busy?'disabled':''}><div class="t">${esc(names[id])}</div><div class="pprice"><b>${esc(p.price)}</b></div></button>`:''}).join('')}</div>`;
 if(PAY.err)h+=`<p class="note perr">${esc(PAY.err)}</p>`;
 h+=`<p class="note">${esc(pt('supportNote'))} <a href="${LEGAL_URL}" target="_blank" rel="noopener">${esc(pt('terms'))}</a></p>`;
 view.innerHTML=h;
 if(typeof wirePayConsent==='function')wirePayConsent();
 view.querySelectorAll('[data-tip]').forEach(x=>x.onclick=()=>{if(typeof payConsentOK==='function'&&!payConsentOK())return;PAY.busy=true;PAY.err=null;PhosApp.billingBuy(x.dataset.tip,'');drawApoyo()});
}

// ---------- Recordatorios ----------
const NDEF={fast:[1,'07:00'],feast:[1,'08:00'],morning:[1,'07:30'],evening:[1,'21:30'],saint:[0,'08:00'],plan:[0,'20:00']};
const NLAB={morning:'rMorning',evening:'rEvening',fast:'rFast',saint:'rSaint',plan:'rPlan'};
// Gratis para todos: aviso de ayuno y de fiesta mayor. El resto, con Phos Premium.
const NFREE=new Set(['fast','feast']);
const nlab=k=>k==='feast'?mx('rFeast'):pt(NLAB[k]);
const majSet=br=>br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ;
const nset=()=>Object.assign({},Object.fromEntries(Object.entries(NDEF).map(([k,v])=>[k,{on:!!v[0],at:v[1]}])),store.get('notif',{}));
const FASTDAYS=new Set(['o_strict','o_wo','o_fish','o_dairy','o_holyfri','c_fastabst','c_abst','p_goodfri']);
function drawNotif(){
 const s=nset(),allowed=IN_APP&&PhosApp.notificationsAllowed();
 let h=`<h1>🔔 ${esc(pt('reminders'))}</h1><p class="lead">${esc(pt('remLead'))}</p>`;
 if(!IN_APP)h+=`<div class="card"><div class="s">${esc(pt('notApp'))}</div></div>`;
 if(IN_APP&&!allowed)h+=`<div class="card"><div class="s">${esc(pt('permNeeded'))}</div><button class="btn" id="nAsk" style="margin-top:10px;width:100%">${esc(pt('allow'))}</button></div>`;
 const pr=isPremium(),lock=k=>!pr&&!NFREE.has(k);
 h+=`${!pr?`<p class="note">${esc(mx('remFree'))}</p>`:''}<div class="nlist">${Object.keys(NDEF).map(k=>`<label class="nrow${lock(k)?' nlock':''}"><input type="checkbox" data-k="${k}" ${s[k].on&&!lock(k)?'checked':''} ${lock(k)?'disabled':''}><span>${esc(nlab(k))}${lock(k)?' <span class="pill">👑 Premium</span>':''}</span><input type="time" data-t="${k}" value="${esc(s[k].at)}" ${lock(k)?'disabled':''}></label>`).join('')}</div>
 ${!pr?`<button class="card rcard" id="nPrem"><div class="t"><span class="rico">👑</span>${esc(pt('prem'))}</div><div class="s">${esc(mx('remPrem'))}</div></button>`:''}
 <button class="btn" id="nSave" style="width:100%;margin-top:14px" ${IN_APP?'':'disabled'}>${esc(pt('save'))}</button>`;
 view.innerHTML=h;
 const a=$('#nAsk');if(a)a.onclick=()=>PhosApp.notificationsAsk();const np=$('#nPrem');if(np)np.onclick=()=>openP('premium');
 $('#nSave').onclick=()=>{const o={};Object.keys(NDEF).forEach(k=>o[k]={on:lock(k)?s[k].on:view.querySelector(`[data-k="${k}"]`).checked,at:view.querySelector(`[data-t="${k}"]`).value||NDEF[k][1]});
  store.set('notif',o);scheduleReminders();toast(pt('saved'));if(!PhosApp.notificationsAllowed())PhosApp.notificationsAsk()};
}
function scheduleReminders(){
 if(!IN_APP)return;
 const s=nset(),br=tdBr(),now=Date.now(),out=[],pr=isPremium();
 const nm=k=>{try{return prName(k)||''}catch(e){return ''}};
 for(let i=0;i<14;i++){
  const d=new Date();d.setDate(d.getDate()+i);
  const y=d.getFullYear(),m=d.getMonth()+1,dd=d.getDate(),td=utc(y,m,dd);
  const at=k=>{const [hh,mi]=(s[k].at||NDEF[k][1]).split(':').map(Number);return new Date(y,m-1,dd,hh||0,mi||0).getTime()};
  const add=(k,title,body,open)=>{const ts=at(k);if(s[k].on&&(pr||NFREE.has(k))&&ts>now+30e3)out.push({id:k+'-'+y+m+dd,at:ts,title,body,open})};
  let info=null;try{info=dayInfo(br,td)}catch(e){}
  try{const p=prayerFor(br,7);add('morning',pt('rMorning'),(nm(p.k)||pt('rMorning'))+' · '+pt('nOpen'),'hoy')}catch(e){}
  try{const p=prayerFor(br,20);add('evening',pt('rEvening'),(nm(p.k)||pt('rEvening'))+' · '+pt('nOpen'),'hoy')}catch(e){}
  if(info&&FASTDAYS.has(info.f))try{add('fast',pt('nFast'),ftText(info.f),'hoy')}catch(e){}
  try{const mj=info?info.cel.filter(c=>majSet(br).has(c)).map(celName).filter(Boolean):[];if(mj.length)add('feast',mx('nFeast'),mj.join(' · '),'hoy')}catch(e){}
  if(typeof offerReminders==='function'){const r=offerReminders(y,m,dd);if(r&&r.at>now+30e3)out.push(r)}
  if(!pr)continue;
  try{const c=(typeof celebsOn==='function'?celebsOn(br,td).map(celName).filter(Boolean):[]).concat(LANG==='es'?daySaints(br,td):[]);
   if(c.length)add('saint',pt('nSaint'),c.slice(0,2).join(' · '),'hoy')}catch(e){}
  if(typeof vidaReminder==='function'){const r=vidaReminder(y,m,dd);if(r&&r.at>now+30e3)out.push(r)}
  add('plan',pt('rPlan'),(typeof planTodayText==='function'&&planTodayText())||pt('nPlan'),'plan');
 }
 try{PhosApp.remindersSet(JSON.stringify(out.slice(0,60)))}catch(e){}
}

// ---------- Bloqueo de Aprende ----------
function paywallCard(kind){
 const les=kind==='lesson';
 view.innerHTML=`<div class="lcard"><div style="font-size:44px">👑</div><h1>${esc(pt(les?'locked':'premOnly'))}</h1><p class="lead">${esc(pt(les?'lockedLead':'premLead'))}</p><p class="note">${esc(pt('notApp'))}</p>
 <button class="btn" id="pwGo" style="width:100%;background:var(--gold);color:var(--wine)">${esc(pt('seePlans'))}</button></div>`;
 $('#pwGo').onclick=()=>openP('premium');
 S.view='paywall';setHeader();$('#back').style.visibility='visible';
}
// Gratis: la introducción y la primera mitad de cada curso, solo en nivel Fácil. Normal y Difícil: Phos Premium.
const freeLesson=(br,id)=>{if(id.startsWith('intro'))return true;if(id==='exam'||(typeof lv==='function'&&lv()!=='easy'))return false;
 const u=courseUnits(br),half=Math.ceil(u.length/2),i=/^(rev|ex):/.test(id)?+id.split(':')[1]:u.findIndex(x=>x.lessons.includes(id));return i>=0&&i<half};
if(IN_APP){
 const _sl=startLesson;startLesson=function(br,id){return isPremium()||freeLesson(br,id)?_sl(br,id):paywallCard('lesson')};
 const _sll=startLangLesson;startLangLesson=function(lc,id){return isPremium()?_sll(lc,id):paywallCard('lesson')};
 const _sp=startPractice;startPractice=function(k){return isPremium()?_sp(k):paywallCard('lesson')};
 const _sm=startMemo;startMemo=function(){return isPremium()?_sm():paywallCard('lesson')};
 const _sf=startFeast;startFeast=function(i){return isPremium()||i<3?_sf(i):paywallCard('lesson')};
 const _rl=renderLearn;renderLearn=function(){const r=_rl.apply(this,arguments);
  if(!isPremium()&&S.view!=='lesson'){const c=document.createElement('button');c.className='card pbanner';c.innerHTML=`<div class="t">👑 ${esc(pt('prem'))}</div><div class="s">${esc(pt('f2'))}</div>`;c.onclick=()=>openP('premium');view.insertBefore(c,view.firstChild)}
  return r};
}

// ---------- Navegación ----------
const PVIEWS={premium:drawPremium,apoyo:drawApoyo,notif:drawNotif};
let P_BACK=null;
function openP(v){if(!PVIEWS[S.view]&&S.view!=='paywall')P_BACK={sec:S.sec,view:S.view};S.view=v;if(IN_APP&&v!=='notif'&&!PAY.products)PhosApp.billingRefresh();render();window.scrollTo(0,0)}
function closeP(){const b=P_BACK||{sec:S.sec,view:S.sec==='bible'?'home':S.sec};P_BACK=null;PAY.err=null;
 S.sec=b.sec;S.view=(b.view==='lesson'||b.view==='paywall')?(b.sec==='learn'?'learn':b.sec):b.view;render();window.scrollTo(0,0)}
const _render=render;
render=function(){
 if(PVIEWS[S.view]){setHeader();$('#back').style.visibility='visible';$('#searchBtn').style.visibility='hidden';return PVIEWS[S.view]()}
 return _render.apply(this,arguments)};
const _back=$('#back').onclick;
$('#back').onclick=()=>{if(PVIEWS[S.view]||S.view==='paywall')return closeP();return _back()};
window.phosBack=()=>{if(PVIEWS[S.view]||S.view==='paywall'){closeP();return true}return false};
window.phosOpen=k=>{P_BACK=null;if(k==='premium'||k==='apoyo'||k==='notif')return openP(k);
 if(k==='plan'&&SECS.includes('mine'))return go('m_plan',{sec:'mine'});
 if(k==='vida'&&SECS.includes('vida'))return go('vida',{sec:'vida'});
 if(k==='retos'&&SECS.includes('retos'))return go('retos',{sec:'retos'});
 if(k==='biblia'){S.sec='bible';return go('home',{ed:null,book:null,ch:null})}
 go('today',{sec:'today'})};

// Botón con corona en la cabecera (a la izquierda del idioma)
(function(){const lb=$('#langBtn');if(!lb)return;const b=document.createElement('button');b.className='iconbtn';b.id='premBtn';
 b.setAttribute('aria-label','Phos Premium');b.innerHTML=CROWN;b.onclick=()=>openP('premium');lb.parentNode.insertBefore(b,lb)})();
(function(){const st=document.createElement('style');st.textContent=`
.plist{list-style:none;padding:0;margin:14px 0}.plist li{padding:8px 0;border-bottom:1px solid var(--line);font-size:17px}
.plans{display:grid;gap:10px;margin:12px 0}.card.plan{text-align:left;width:100%}.pprice{margin-top:6px;font-size:18px}.pprice b{font-size:24px;color:var(--wine)}
.perr{color:#B3261E}.plinks a,.linkbtn{color:var(--wine);background:none;border:0;padding:0;font:inherit;text-decoration:underline;cursor:pointer}
.nlist{display:grid;gap:8px;margin-top:10px}.nrow{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--paper)}
.nrow span{flex:1}.nrow.nlock{opacity:.6}.nrow input[type=checkbox]{width:22px;height:22px;accent-color:var(--wine)}.nrow input[type=time]{font:inherit;padding:6px;border:1px solid var(--line);border-radius:8px;background:#fff}
header.top{gap:4px;padding-left:8px;padding-right:8px}header.top .iconbtn{width:38px;flex:0 0 38px}#searchBtn[style*="hidden"]{display:none}
.brand>div{min-width:0}.brand small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card.main .pprice b{color:var(--gold)}.card.main .pprice{color:var(--ground)}.card.main .btn.ghost{border-color:var(--gold);color:var(--gold)}
#premBtn{color:var(--gold)}
.card.pbanner{width:100%;text-align:left;border-color:var(--gold)}
.ptoast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,40px);opacity:0;transition:.25s;background:var(--wine);color:var(--ground);padding:12px 18px;border-radius:18px;z-index:50;max-width:90vw;text-align:center}
.ptoast.on{opacity:1;transform:translate(-50%,0)}`;document.head.appendChild(st)})();
if(TEST_BUILD)setTimeout(()=>toast('🧪 Versión de prueba · Premium desbloqueado'),2200);
if(IN_APP){try{PhosApp.billingRefresh()}catch(e){}setTimeout(scheduleReminders,1500)}
if(location.hash&&/^#(premium|apoyo|notif|plan|retos|hoy|vida)$/.test(location.hash))setTimeout(()=>phosOpen(location.hash.slice(1)),0);
