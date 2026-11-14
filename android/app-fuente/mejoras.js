// ---------- Mejoras de la tarea 3: lecturas de hoy, Rosario y komboskini, retos de temporada ----------
// (El aviso gratuito de ayuno y fiesta está en premium.js y el widget gratuito en plus.js.)
// Gratis: lo del día. Phos Premium (Google Play): otros días, historial y escuchar en voz alta.
// Cada Iglesia ve solo lo suyo: Rosario para católicos, komboskini para ortodoxos, y cada reto con las fechas de su calendario.
const MJ_VIEWS=new Set(['rosario','kombo','temporada']);
const tdNow=()=>{const n=new Date();return utc(n.getFullYear(),n.getMonth()+1,n.getDate())};
const refTxt=p=>bname(p[0])+' '+p[1][0][0]+', '+p[1][0][1]+(p[1][0][2]!==p[1][0][1]?'–'+p[1][0][2]:'');
const mjSpeak=txt=>{try{if(window.PhosApp&&PhosApp.speakSeq)return PhosApp.speakSeq(JSON.stringify([txt]),LANG);if(window.speechSynthesis){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang=LANG;u.rate=.95;speechSynthesis.speak(u)}}catch(e){}};
const mjBack=()=>{$('#back').style.visibility='visible'};

// ===== 1) Lecturas de hoy =====
// Evangelio de la fiesta (según la Iglesia elegida) o lectura continua de los cuatro Evangelios, y un Salmo.
const GOSP=[['MAT',28],['MAR',16],['LUK',24],['JOH',21]];
function rdFor(br,td){
 const k=Math.floor(td/DAY),out=[];let info=null;try{info=dayInfo(br,td)}catch(e){}
 const f=info&&FEASTS.find(x=>x[3]&&info.cel.includes(x[0]));
 if(f)out.push({h:mx('rdFeast')+' · '+celName(f[0]),p:[f[3][0],[[f[3][1],f[3][2],f[3][3]]]]});
 else{let n=k%89;for(const [b,c] of GOSP){if(n<c){out.push({h:mx('rdGospel'),p:[b,[[n+1,1,5]]],more:true});break}n-=c}}
 const ps=k%150+1;out.push({h:mx('rdPsalm'),p:['PSA',[[ps,1,6]]],more:true});
 return out}
let RD_OFF=0;
async function drawReadings(box){
 const br=tdBr(),td=tdNow()+RD_OFF*DAY,L=rdFor(br,td),pr=prem2();
 box.innerHTML=`<h2 class="tdh">📖 ${esc(mx('rdTitle'))}${RD_OFF?` · <span class="note">${esc(fmtD(new Date(td)))}</span>`:''}</h2>
 ${L.map((r,i)=>`<div class="rdit"><p class="tdper"><b>${esc(r.h)}</b> · ${esc(refTxt(r.p))}</p><blockquote class="vq" id="rdT${i}"><span>…</span></blockquote>
  <button class="btn ghost rdopen" data-i="${i}">${esc(mx('rdOpen'))}</button></div>`).join('')}
 <div class="rdnav"><button class="chip" id="rdPrev">${esc(mx('rdPrev'))}${pr?'':' 👑'}</button>${RD_OFF?`<button class="chip" id="rdNow">${esc(mx('rdToday'))}</button>`:''}<button class="chip" id="rdNext">${esc(mx('rdNext'))}${pr?'':' 👑'}</button></div>
 ${pr?'':`<p class="note">${esc(mx('rdOther'))}</p>`}<p class="note">${esc(mx('rdNote'))}</p>`;
 const mv=d=>{if(!prem2())return openP('premium');RD_OFF+=d;drawReadings(box)};
 box.querySelector('#rdPrev').onclick=()=>mv(-1);box.querySelector('#rdNext').onclick=()=>mv(1);
 const nw=box.querySelector('#rdNow');if(nw)nw.onclick=()=>{RD_OFF=0;drawReadings(box)};
 box.querySelectorAll('.rdopen').forEach(b=>b.onclick=()=>fOpenBible(L[+b.dataset.i].p));
 L.forEach((r,i)=>fVerses(r.p).then(x=>{const el=box.querySelector('#rdT'+i);if(!el)return;
  if(!x){el.innerHTML='<span>—</span>';return}const lg=TRLANG[x.id]||(x.id==='ortodoxa-griega'?'el':'en');el.lang=lg;
  el.innerHTML=`<span>${esc(x.segs.map(s=>s.txt).join(' '))}${r.more?' …':''}</span><cite>${esc(TRNAME[x.id]||edName(x.id))}</cite>`}).catch(()=>{}));
}

// ===== 2) Santo Rosario (católicos) y komboskini (ortodoxos) =====
const RO_DAY=[3,0,2,3,1,2,0];// domingo..sábado → gozosos 0, luminosos 1, dolorosos 2, gloriosos 3
const RO={set:null,i:0};
const ourfC=()=>OURF_C[LANG]||OURF[LANG]||OURF.en;
function roSteps(){const s=[{p:'ourf',m:-1},{p:'ave',m:-1,n:1},{p:'ave',m:-1,n:2},{p:'ave',m:-1,n:3},{p:'glory',m:-1}];
 for(let m=0;m<5;m++){s.push({p:'ourf',m});for(let n=1;n<=10;n++)s.push({p:'ave',m,n});s.push({p:'glory',m})}return s}
const roTxt=p=>p==='ourf'?ourfC():p==='ave'?prText('ave'):mx('gloria');
const roLab=p=>mx(p==='ourf'?'roOurF':p==='ave'?'roHail':'roGlory');
const roLog=()=>store.get('rosaryLog',[]);
function drawRosario(){
 mjBack();if(RO.set===null)RO.set=RO_DAY[new Date().getDay()];
 const S2=roSteps(),st=S2[Math.min(RO.i,S2.length-1)],done=RO.i>=S2.length,sets=mx('roSets').split('|'),M=mx('roM').split('|'),pr=prem2();
 const myst=st.m<0?mx('roStart'):mx('roMyst',{n:st.m+1})+': '+M[RO.set*5+st.m];
 const beads=st.m<0?[1,2,3]:[1,2,3,4,5,6,7,8,9,10];
 const L=roLog(),wk=L.filter(d=>Date.now()-new Date(d).getTime()<7*DAY).length;
 view.innerHTML=`<h1>📿 ${esc(mx('roTitle'))}</h1><p class="lead">${esc(mx('roLead'))}</p>
 <div class="tdchips" role="group">${sets.map((n,i)=>`<button class="chip${i===RO.set?' on':''}" data-set="${i}" aria-pressed="${i===RO.set}">${esc(n)}</button>`).join('')}</div>
 ${done?`<div class="lcard"><div style="font-size:44px">🙏</div><h2>${esc(mx('roDone'))}</h2><button class="btn" id="roAgain" style="width:100%">${esc(mx('roAgain'))}</button></div>`:
 `<div class="lcard"><p class="tdper"><b>${esc(myst)}</b></p>
  <div class="rdots robeads">${beads.map(b=>`<i class="${st.p==='ave'&&b<=st.n?'on':''}${st.p!=='ave'&&st.p==='glory'?' on':''}"></i>`).join('')}</div>
  <h2 style="margin:8px 0">${esc(roLab(st.p))}${st.p==='ave'?' · '+st.n+'/'+beads.length:''}</h2>
  <blockquote class="vq tdprayer"><span>${esc(roTxt(st.p))}</span></blockquote>
  <button class="robig" id="roTap" aria-label="${esc(mx('roTap'))}">${esc(mx('roTap'))}</button>
  <div class="rdnav"><button class="chip" id="roListen">🔊 ${esc(mx('roListen'))}${pr?'':' 👑'}</button></div>
  <p class="note">${esc(mx('roStep',{a:sets[RO.set],n:RO.i+1,t:S2.length}))}</p></div>`}
 <p class="note">${pr?esc(mx('roHist',{n:L.length,w:wk})):esc(mx('roHistLock'))}</p>`;
 view.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{RO.set=+b.dataset.set;RO.i=0;drawRosario()});
 const tap=$('#roTap');if(tap)tap.onclick=()=>{try{navigator.vibrate&&navigator.vibrate(20)}catch(e){}RO.i++;
  if(RO.i>=S2.length){const l=roLog();l.push(new Date().toISOString());store.set('rosaryLog',l.slice(-500))}drawRosario()};
 const ls=$('#roListen');if(ls)ls.onclick=()=>pr?mjSpeak(roTxt(st.p)):openP('premium');
 const ag=$('#roAgain');if(ag)ag.onclick=()=>{RO.i=0;drawRosario()};
}
const KO={n:0};
function drawKombo(){
 mjBack();const tot=store.get('koKnots',33),done=KO.n>=tot;
 view.innerHTML=`<h1>☦️ ${esc(mx('koTitle'))}</h1><p class="lead">${esc(mx('koLead'))}</p>
 <div class="tdchips" role="group">${[33,50,100].map(n=>`<button class="chip${n===tot?' on':''}" data-kn="${n}" aria-pressed="${n===tot}">${esc(mx('koKnots',{n}))}</button>`).join('')}</div>
 <div class="lcard"><blockquote class="vq tdprayer"><span>${esc(prText('jesus'))}</span></blockquote>
 ${done?`<h2>${esc(mx('koDone'))}</h2><button class="btn" id="koAgain" style="width:100%">${esc(mx('roAgain'))}</button>`:
 `<button class="robig koring" id="koTap" style="--p:${Math.round(KO.n/tot*360)}deg"><b>${KO.n}</b><small>${esc(mx('koCount',{n:KO.n,t:tot}))}</small></button>`}</div>`;
 view.querySelectorAll('[data-kn]').forEach(b=>b.onclick=()=>{store.set('koKnots',+b.dataset.kn);KO.n=0;drawKombo()});
 const tp=$('#koTap');if(tp)tp.onclick=()=>{try{navigator.vibrate&&navigator.vibrate(KO.n+1>=tot?[40,60,40]:15)}catch(e){}KO.n++;drawKombo()};
 const ag=$('#koAgain');if(ag)ag.onclick=()=>{KO.n=0;drawKombo()};
}

// ===== 3) Retos de temporada =====
// Ortodoxos: Ayuno de Navidad (15 nov–24 dic; 28 nov–6 ene con el calendario juliano) y Gran Cuaresma (Lunes Puro, 40 días).
// Católicos y protestantes: Adviento (1.er domingo de Adviento–24 dic) y Cuaresma (Miércoles de Ceniza–Sábado Santo, 40 días sin contar los domingos).
const SE_LENT=[['JOE',2,12,18],['MAT',6,1,6],['MAT',6,16,21],['PSA',51,1,12],['ISA',58,6,11],['LUK',9,22,25],['MAT',4,1,11],['MAT',25,31,46],['ISA',55,6,11],['MAT',6,7,15],['JON',3,1,10],['MAT',7,7,12],['EZE',18,21,28],['MAT',5,20,26],['MAT',5,43,48],['LUK',6,36,38],['MAT',23,1,12],['JER',17,5,10],['LUK',16,19,31],['MAT',21,33,43],['LUK',15,11,32],['JOH',4,5,26],['LUK',4,24,30],['MAT',18,21,35],['MAT',5,17,19],['LUK',11,14,23],['MAR',12,28,34],['LUK',18,9,14],['JOH',9,1,12],['JOH',4,46,54],['JOH',5,1,16],['ISA',49,8,15],['JOH',5,31,47],['JOH',7,25,30],['JOH',11,17,44],['JOH',8,1,11],['JOH',8,21,30],['JOH',8,31,42],['JOH',10,31,42],['JOH',11,45,56]];
const SE_NAT=[['ISA',2,1,5],['ISA',11,1,10],['ISA',40,1,11],['ISA',7,10,14],['ISA',9,2,7],['ISA',35,1,10],['ISA',40,25,31],['ISA',41,13,20],['ISA',45,6,8],['ISA',54,1,10],['ISA',61,1,3],['JER',23,5,8],['JER',33,14,16],['MIC',5,2,5],['ZEP',3,14,18],['MAL',3,1,4],['GEN',3,9,15],['GEN',12,1,4],['GEN',22,15,18],['2SA',7,8,16],['NUM',24,15,17],['PSA',72,1,11],['PSA',80,1,7],['PSA',85,8,13],['PSA',24,1,6],['MAT',1,1,17],['MAT',3,1,12],['MAT',11,2,11],['MAR',1,1,8],['ROM',13,11,14],['PHI',4,4,7],['JAM',5,7,10],['HEB',10,5,10],['LUK',3,1,6],['JOH',1,19,28],['LUK',1,5,25],['LUK',1,26,38],['LUK',1,39,45],['LUK',1,46,56],['LUK',1,57,66],['LUK',1,67,79],['MAT',1,18,25]];
function seWindows(br,y){
 if(br==='ortodoxa'){const sh=tdOld()?13*DAY:0;return [{id:'natO'+y,k:'seNatO',a:utc(y,11,15)+sh,t:40,R:SE_NAT},{id:'lentO'+y,k:'seLentO',a:oPascha(y)-48*DAY,t:40,R:SE_LENT}]}
 const ad=advent1(y);return [{id:'adv'+y,k:'seAdv',a:ad,t:Math.round((utc(y,12,24)-ad)/DAY)+1,R:SE_NAT,adv:1},{id:'lent'+y,k:'seLent',a:gEaster(y)-46*DAY,t:40,R:SE_LENT,lent:1}]}
function seDayN(w,td){// número del día dentro del reto (0 = domingo de Cuaresma, que no cuenta)
 if(!w.lent)return Math.round((td-w.a)/DAY)+1;if(wday(td)===0)return 0;
 let n=0;for(let x=w.a;x<=td;x+=DAY)if(wday(x)!==0)n++;return n}
function seEnd(w){if(!w.lent)return w.a+(w.t-1)*DAY;return w.a+45*DAY}// Cuaresma: hasta el Sábado Santo
function season(br,td){
 const y=new Date(td).getUTCFullYear(),W=seWindows(br,y-1).concat(seWindows(br,y),seWindows(br,y+1));
 const cur=W.find(w=>td>=w.a&&td<=seEnd(w));if(cur)return Object.assign({n:seDayN(cur,td)},cur);
 const nx=W.filter(w=>w.a>td).sort((a,b)=>a.a-b.a)[0];return nx?Object.assign({next:Math.round((nx.a-td)/DAY)},nx):null}
const sePractice=(br,n)=>{const L=mx('sePr').split('|').concat(mx(br==='ortodoxa'?'sePrO':br==='catolica'?'sePrC':'sePrP'));return L[(n-1)%L.length]};
const seRef=(w,n)=>{const r=w.R[(n-1)%w.R.length];return [r[0],[[r[1],r[2],r[3]]]]};
const seLog=()=>store.get('seasonLog',{});
function seDayHTML(br,w,n,big){
 if(n===0)return `<p>${esc(mx('seSunday'))}</p>`;
 const p=seRef(w,n),done=(seLog()[w.id]||[]).includes(n);
 return `<p class="tdper">📖 <b>${esc(mx('seRead'))}</b> · ${esc(refTxt(p))}</p>${big?`<blockquote class="vq" data-se="${n}"><span>…</span></blockquote>`:''}
 <p class="tdper">🕯️ <b>${esc(mx('sePractice'))}</b></p><p>${esc(sePractice(br,n))}</p>
 <div class="rdnav"><button class="btn ghost" data-seopen="${n}">${esc(mx('rdOpen'))}</button><button class="btn${done?' ghost':''}" data-semark="${n}" ${done?'disabled':''}>${esc(mx(done?'seMarked':'seMark'))}</button></div>`}
function seWire(box,br,w,again){
 box.querySelectorAll('[data-seopen]').forEach(b=>b.onclick=()=>fOpenBible(seRef(w,+b.dataset.seopen)));
 box.querySelectorAll('[data-semark]').forEach(b=>b.onclick=()=>{const l=seLog();l[w.id]=[...new Set((l[w.id]||[]).concat(+b.dataset.semark))];store.set('seasonLog',l);
  try{navigator.vibrate&&navigator.vibrate(20)}catch(e){}toast('🙏 '+mx('seMarked'));again()});
 box.querySelectorAll('[data-se]').forEach(el=>fVerses(seRef(w,+el.dataset.se)).then(x=>{if(x){el.lang=TRLANG[x.id]||(x.id==='ortodoxa-griega'?'el':'en');el.innerHTML=`<span>${esc(x.segs.map(s=>s.txt).join(' '))}</span>`}}).catch(()=>{}));
}
function drawSeasonCard(box){
 const br=tdBr(),w=season(br,tdNow());if(!w){box.remove();return}
 if(w.next!=null){box.innerHTML=`<h2 class="tdh">🕯️ ${esc(mx('seTitle'))}</h2><p>${esc(mx('seNext',{s:mx(w.k),n:w.next}))}</p>`;return}
 const ndone=(seLog()[w.id]||[]).length;
 box.innerHTML=`<h2 class="tdh">🕯️ ${esc(mx('seTitle'))} · ${esc(mx(w.k))}</h2>
 <p class="tdseason"><span class="pill soft">${esc(w.n?mx('seDay',{n:w.n,t:w.t}):mx(w.k))}</span><span class="note">${esc(mx('seProg',{n:ndone}))}</span></p>
 ${seDayHTML(br,w,w.n,true)}
 <button class="card rcard" id="seAll"><div class="t"><span class="rico">🗓️</span>${esc(mx('seAll'))}${prem2()?'':'<span class="pill">👑 Premium</span>'}</div>${prem2()?'':`<div class="s">${esc(mx('seAllLock'))}</div>`}</button>
 <p class="note">${esc(mx('seHealth'))}</p>`;
 seWire(box,br,w,()=>drawSeasonCard(box));
 box.querySelector('#seAll').onclick=()=>prem2()?go('temporada'):openP('premium');
}
function drawSeasonAll(){
 mjBack();if(!prem2())return paywallCard();
 const br=tdBr(),td=tdNow(),w=season(br,td);if(!w)return go('today');
 const cur=w.next!=null?0:w.n;
 // Durante el reto: los días ya pasados y el de hoy (para ponerse al día). Antes de empezar: vista previa del reto completo.
 const upto=w.next!=null?w.t:(cur||seDayN(w,td-DAY)),N=[];for(let n=1;n<=upto;n++)N.push(n);
 view.innerHTML=`<h1>🕯️ ${esc(mx(w.k))}</h1><p class="lead">${esc(w.next!=null?mx('seNext',{s:mx(w.k),n:w.next}):mx('seDay',{n:cur||'—',t:w.t}))}</p><p class="note">${esc(mx('seHealth'))}</p>
 ${N.reverse().map(n=>`<section class="art tdcard"><h2 class="tdh">${esc(mx('seDay',{n,t:w.t}))}</h2>${seDayHTML(br,w,n,false)}</section>`).join('')}`;
 seWire(view,br,w,drawSeasonAll);
}

// ===== Tarjetas en «Hoy» y navegación =====
const _renderTodayMJ=renderToday;
renderToday=function(){
 _renderTodayMJ();
 const br=tdBr(),hero=$('#votd');if(!hero)return;let at=hero;
 const add=(id,fn)=>{const c=document.createElement('section');c.className='art tdcard';c.id=id;at.after(c);at=c;fn(c)};
 add('tdSeason',drawSeasonCard);
 add('tdRead',drawReadings);
 if(br!=='protestante')add('tdBeads',c=>{const ro=br==='catolica';
  c.innerHTML=`<button class="card rcard" id="beadGo" style="margin:0"><div class="t"><span class="rico">${ro?'📿':'☦️'}</span>${esc(mx(ro?'prayRo':'prayKo'))}<span class="pill">${esc(mx('freeTag'))}</span></div><div class="s">${esc(ro?mx('roSets').split('|')[RO_DAY[new Date().getDay()]]:prName('jesus'))}</div></button>`;
  c.querySelector('#beadGo').onclick=()=>{if(ro){RO.set=null;RO.i=0;go('rosario')}else{KO.n=0;go('kombo')}}});
};
const _renderArticlesMJ=renderArticles;
renderArticles=async function(sec){
 if(sec==='today'&&S.view==='rosario')return drawRosario();
 if(sec==='today'&&S.view==='kombo')return drawKombo();
 if(sec==='today'&&S.view==='temporada')return drawSeasonAll();
 if(sec==='today')RD_OFF=0;
 return _renderArticlesMJ(sec)};
const _phosBackMJ=window.phosBack;
window.phosBack=()=>{if(_phosBackMJ&&_phosBackMJ())return true;if(S.sec==='today'&&MJ_VIEWS.has(S.view)){go('today');return true}return false};
(function(){const st=document.createElement('style');st.textContent=`
.rdit{margin-bottom:12px}.rdit .btn.ghost{padding:8px 14px}.rdnav .chip{border:1px solid var(--line);background:var(--paper);color:inherit;border-radius:999px;padding:9px 14px;font:inherit;font-weight:600;min-height:44px}.rdnav{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.rdnav .btn{flex:1}
.robig{display:block;width:100%;min-height:76px;margin:14px 0 6px;border:0;border-radius:22px;background:var(--wine);color:#FBF6EA;font:700 19px Inter,sans-serif;box-shadow:0 6px 18px rgba(74,20,22,.3)}
.robig:active{transform:scale(.98)}.robeads i{width:14px;height:14px}
.koring{width:200px;height:200px;margin:18px auto;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
 background:radial-gradient(closest-side,var(--wine) 78%,transparent 80%),conic-gradient(#E2C27A var(--p),rgba(226,194,122,.2) 0)}
.koring b{font:600 54px 'Cormorant Garamond',serif}.koring small{font-size:14px;opacity:.85}`;document.head.appendChild(st)})();
