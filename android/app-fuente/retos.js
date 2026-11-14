// ---------- Retos bíblicos ----------
// Reto del día: gratis para todos. Resto: Phos Premium (en la app de Google Play).
const prem=()=>typeof isPremium!=='function'||!IN_APP||isPremium();
function seeded(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}
 return function(){h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);h^=h>>>16;return (h>>>0)/4294967296}}
const rpick=(r,a)=>a[Math.floor(r()*a.length)];
const rshuf=(r,a)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const todayKey=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const cleanW=w=>w.replace(/[^\p{L}\p{M}'’\-]/gu,'');
async function vText(ref){
 const [b,cv]=ref.split(' '),[c,v]=cv.split(':');const br=tdBr();
 const src=LANG==='el'?'ortodoxa-griega':((TRMAP[br]&&TRMAP[br][LANG])||TRMAP.protestante[LANG]||'en-kjv');
 try{const bk=await getBook(src,b);const [mc,mv]=mapRef('reina-valera-1909',src,b,c,+v);const row=bk&&bk.ch[mc]&&bk.ch[mc].find(r=>r[0]===mv);
  return row?{txt:String(row[1]).replace(/\s+/g,' ').trim(),lang:TRLANG[src]||(src==='ortodoxa-griega'?'el':'en'),ref:bname(b)+' '+c+', '+v}:null}catch(e){return null}}
const fmtDM=([m,d])=>{try{return new Intl.DateTimeFormat(LANG,{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2025,m-1,d)))}catch(e){return d+'/'+m}};

// ---- Generadores de preguntas ----
function qBookSum(r){const codes=Object.keys(SUM).filter(c=>bname(c)!==c);const c=rpick(r,codes);
 const opts=rshuf(r,[c].concat(rshuf(r,codes.filter(x=>x!==c)).slice(0,3)));
 return {prompt:qt('qBook'),extra:sumOf(c),options:opts.map(bname),answer:opts.indexOf(c),ref:c}}
function branchFeasts(){
 // Fiestas de fecha fija de la tradición elegida (mismo día este año y el próximo), con su nombre traducido
 const br=tdBr(),y=new Date().getFullYear(),md=td=>{const d=new Date(td);return [d.getUTCMonth()+1,d.getUTCDate()]};
 const B=new Map(yearEvents(br,y+1).map(e=>[e[0],md(e[1])]));const seen=new Set(),out=[];
 for(const [k,td] of yearEvents(br,y)){const v=md(td),w=B.get(k);if(!w||w[0]!==v[0]||w[1]!==v[1])continue;const n=celName(k);const key=v.join('-');if(!n||seen.has(key))continue;seen.add(key);out.push({n,m:v})}
 return out}
function qFeastDay(r){const F=branchFeasts();if(F.length<4)return qBookSum(r);const f=rpick(r,F);
 const opts=rshuf(r,[f].concat(rshuf(r,F.filter(x=>x!==f)).slice(0,3)));
 return {prompt:qt('qFeast'),extra:f.n,options:opts.map(x=>fmtDM(x.m)),answer:opts.indexOf(f)}}
function qWho(r){const i=rpick(r,FIG_SOLO);const [n,d]=figL(i);
 const opts=rshuf(r,[i].concat(rshuf(r,FIG_SOLO.filter(x=>x!==i)).slice(0,3)));
 return {prompt:qt('who'),extra:d,options:opts.map(k=>figL(k)[0]),answer:opts.indexOf(i)}}
async function qWord(r){
 const refs=rshuf(r,VOTD).slice(0,3);const [a,b2,c2]=await Promise.all(refs.map(vText));if(!a)return null;
 const ws=a.txt.split(' ');const cand=ws.map((w,k)=>[cleanW(w),k]).filter(([w])=>w.length>4);if(!cand.length)return null;
 const [w,k]=rpick(r,cand);
 const pool=[b2,c2].filter(Boolean).flatMap(x=>x.txt.split(' ').map(cleanW)).filter(x=>x.length>4&&x.toLowerCase()!==w.toLowerCase());
 const dis=[...new Set(rshuf(r,pool))].slice(0,3);if(dis.length<3)return null;
 const opts=rshuf(r,[w].concat(dis));const shown=ws.map((x,j)=>j===k?x.replace(w,'_____'):x).join(' ');
 return {prompt:qt('qWord'),extra:shown+' — '+a.ref,xlang:a.lang,options:opts,answer:opts.indexOf(w)}}
async function dailyQs(){
 const r=seeded('phos-reto-'+todayKey()+'-'+LANG);const es=LANG==='es'||LANG==='en';
 const q=[qBookSum(r),qFeastDay(r),await qWord(r),es?qWho(r):qBookSum(r),qBookSum(r)];
 return q.map(x=>x||qBookSum(r));
}

// ---- Motor de preguntas tipo test ----
let RQ=null;
function drawQuiz(){
 const it=RQ.qs[RQ.i];const per=Math.round(RQ.i/RQ.qs.length*100);
 view.innerHTML=`<div class="pbar"><i style="width:${per}%"></i></div><p class="note">${esc(qt('qn',{n:RQ.i+1,t:RQ.qs.length}))}</p>
 <h1 class="qp">${esc(it.prompt)}</h1><p class="qx" ${it.xlang?`lang="${it.xlang}" dir="auto"`:''}>${esc(it.extra)}</p>
 <div class="opts">${it.options.map((o,k)=>`<button class="opt" data-o="${k}">${esc(o)}</button>`).join('')}</div><div id="rfoot" style="margin-top:14px"></div>`;
 view.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
  if(RQ.answered)return;RQ.answered=true;const k=+b.dataset.o,ok=k===it.answer;
  view.querySelectorAll('[data-o]').forEach((x,j)=>{if(j===it.answer)x.classList.add('ok');else if(j===k)x.classList.add('bad');x.disabled=true});
  RQ.marks.push(ok);if(ok)RQ.score++;
  $('#rfoot').innerHTML=`<div class="fb ${ok?'good':'badfb'}" role="status"><b>${esc(ok?qt('right'):qt('wrong',{a:it.options[it.answer]}))}</b></div><button class="btn" id="rnext" style="width:100%">${esc(qt('cont'))}</button>`;
  $('#rnext').onclick=()=>{RQ.i++;RQ.answered=false;if(RQ.i>=RQ.qs.length)return RQ.done();drawQuiz();window.scrollTo(0,0)};
 });
}
function resultCard(title,n,t,marks,extra){
 const txt=`Phos · ${title} ${todayKey().split('-').reverse().slice(0,2).join('/')}: ${marks.map(m=>m?'✅':'❌').join('')} ${n}/${t}\nphosbiblias.com`;
 view.innerHTML=`<div class="lcard" style="text-align:center"><div style="font-size:48px">${n===t?'🏆':n>=t/2?'🌟':'🙏'}</div><h1>${esc(qt('result',{n,t}))}</h1>
 <p style="font-size:30px;letter-spacing:4px">${marks.map(m=>m?'✅':'❌').join('')}</p>${extra||''}
 <div style="display:flex;gap:10px;margin-top:14px"><button class="btn ghost" id="rBack" style="flex:1">${esc(qt('retos'))}</button><button class="btn" id="rShare" style="flex:1">${esc(qt('shareRes'))}</button></div></div>`;
 $('#rBack').onclick=()=>go('retos',{sec:'retos'});
 $('#rShare').onclick=()=>shareText(txt);
}
async function startDaily(){
 const st=store.get('retoDaily',{});
 if(st.d===todayKey())return resultCard(qt('daily'),st.n,st.t,st.m,`<p class="note">${esc(qt('doneToday'))}</p>`);
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 RQ={qs:await dailyQs(),i:0,score:0,marks:[],answered:false,done(){
  store.set('retoDaily',{d:todayKey(),n:RQ.score,t:RQ.qs.length,m:RQ.marks});addRetoPts(RQ.score*10);
  resultCard(qt('daily'),RQ.score,RQ.qs.length,RQ.marks,`<p class="note">${esc(qt('doneToday'))}</p>`)}};
 drawQuiz();
}
const addRetoPts=n=>{const s=store.get('retoPts',0);store.set('retoPts',s+n)};

// ---- ¿Quién soy? (pistas que se van destapando) ----
function startWho(){
 const r=Math.random;const i=rpick(r,FIG_SOLO);const [n,d]=figL(i);const ref=BIBFIG[i][2].split(' ')[0];
 const clues=[rtx('clue1',{b:bname(ref)}),d,rtx('clue3',{c:n.charAt(0)})];
 const opts=rshuf(r,[i].concat(rshuf(r,FIG_SOLO.filter(x=>x!==i)).slice(0,5)));
 let shown=1,answered=false;
 const draw=()=>{view.innerHTML=`${!figOK()?`<p class="note">${esc(qt('onlyEsEn'))}</p>`:''}<h1 class="qp">${esc(qt('who'))}</h1>
  ${clues.slice(0,shown).map((c,k)=>`<p class="qx"><b>${esc(qt('clue',{n:k+1}))}:</b> ${esc(c)}</p>`).join('')}
  ${shown<clues.length&&!answered?`<button class="btn ghost" id="wMore" style="width:100%;margin-bottom:12px">${esc(qt('moreClue'))}</button>`:''}
  <div class="opts">${opts.map(k=>`<button class="opt" data-w="${k}">${esc(figL(k)[0])}</button>`).join('')}</div><div id="rfoot" style="margin-top:14px"></div>`;
  const m=$('#wMore');if(m)m.onclick=()=>{shown++;draw()};
  view.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{if(answered)return;answered=true;const ok=+b.dataset.w===i;const pts=ok?(4-shown)*10:0;if(ok)addRetoPts(pts);
   view.querySelectorAll('[data-w]').forEach(x=>{if(+x.dataset.w===i)x.classList.add('ok');else if(x===b)x.classList.add('bad');x.disabled=true});
   const mm=$('#wMore');if(mm)mm.remove();
   $('#rfoot').innerHTML=`<div class="fb" role="status"><b>${esc(ok?qt('right')+' · '+qt('points',{n:pts}):qt('wrong',{a:n}))}</b><span>${esc(d)}</span></div><button class="btn" id="rAgain" style="width:100%">${esc(qt('again'))}</button>`;
   $('#rAgain').onclick=startWho});
 };draw();
}

// ---- Versículo desordenado ----
async function startScramble(){
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 let v=null;for(let k=0;k<6&&!v;k++){const x=await vText(rpick(Math.random,VOTD));if(x&&x.txt.split(' ').length<=18)v=x}
 if(!v)v=await vText('JOH 11:35')||{txt:'…',ref:'',lang:LANG};
 const words=v.txt.split(' ');const order=rshuf(Math.random,words.map((w,k)=>k));let pick=[],done=false;
 const draw=()=>{view.innerHTML=`<h1 class="qp">${esc(qt('scr'))}</h1><p class="note">${esc(qt('tapOrder'))} · ${esc(v.ref)}</p>
  <p class="qx scrline" lang="${v.lang}" dir="auto">${pick.map(k=>esc(words[k])).join(' ')||'&nbsp;'}</p>
  <div class="chips">${order.map(k=>pick.includes(k)?'':`<button class="opt chipw" data-k="${k}">${esc(words[k])}</button>`).join('')}</div>
  <div style="display:flex;gap:10px;margin-top:14px">${!done&&pick.length?`<button class="btn ghost" id="sUndo" style="flex:1">${esc(qt('undo'))}</button>`:''}</div><div id="rfoot" style="margin-top:14px"></div>`;
  const u=$('#sUndo');if(u)u.onclick=()=>{pick.pop();draw()};
  view.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(done)return;pick.push(+b.dataset.k);
   if(pick.length===words.length){done=true;const ok=pick.map(k=>words[k]).join(' ')===v.txt;if(ok)addRetoPts(20);draw();
    $('#rfoot').innerHTML=`<div class="fb" role="status"><b>${esc(ok?qt('right')+' · '+qt('points',{n:20}):qt('wrong',{a:''}))}</b><span lang="${v.lang}">${esc(v.txt)}</span></div><button class="btn" id="rAgain" style="width:100%">${esc(qt('again'))}</button>`;
    $('#rAgain').onclick=startScramble}else draw()});
 };draw();
}

// ---- Línea del tiempo ----
function startTimeline(){
 const idx=rshuf(Math.random,TLEV.map((e,k)=>k)).slice(0,5);const shown=rshuf(Math.random,idx);let pick=[],done=false;
 const lab=k=>tlevL(k);
 const draw=()=>{view.innerHTML=`${!figOK()?`<p class="note">${esc(qt('onlyEsEn'))}</p>`:''}<h1 class="qp">${esc(qt('tl'))}</h1><p class="note">${esc(qt('oldFirst'))}</p>
  <ol class="tlpicked">${pick.map((k,j)=>`<li class="${done?(k===[...idx].sort((a,b)=>a-b)[j]?'ok':'bad'):''}">${esc(lab(k))}${done?` <span class="note">(${esc(bname(TLEV[k][2].split(' ')[0]))})</span>`:''}</li>`).join('')}</ol>
  <div class="opts">${shown.map(k=>pick.includes(k)?'':`<button class="opt" data-k="${k}">${esc(lab(k))}</button>`).join('')}</div>
  ${!done&&pick.length?`<button class="btn ghost" id="sUndo" style="width:100%;margin-top:12px">${esc(qt('undo'))}</button>`:''}<div id="rfoot" style="margin-top:14px"></div>`;
  const u=$('#sUndo');if(u)u.onclick=()=>{pick.pop();draw()};
  view.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{pick.push(+b.dataset.k);if(pick.length===idx.length){done=true;draw();
   const right=[...idx].sort((a,b)=>a-b);const n=pick.filter((k,j)=>k===right[j]).length;addRetoPts(n*5);
   $('#rfoot').innerHTML=`<div class="fb" role="status"><b>${esc(qt('result',{n,t:idx.length}))}</b>${n<idx.length?`<span>${right.map(lab).map(esc).join(' → ')}</span>`:''}</div><button class="btn" id="rAgain" style="width:100%">${esc(qt('again'))}</button>`;
   $('#rAgain').onclick=startTimeline}else draw()});
 };draw();
}

// ---- Los viajes de la Biblia (mapa esquemático) ----
function startMap(ji){
 if(ji==null){
  view.innerHTML=`<h1>🧭 ${esc(qt('map'))}</h1><p class="lead">${esc(qt('mapLead'))}</p>${JOURNEYS.map((j,k)=>`<button class="card" data-j="${k}" style="width:100%;text-align:left"><div class="t">${esc(jourT(j))}</div><div class="s">${esc(bname(j.ref.split(' ')[0]))} · ${j.pts.length} ${esc(rtx('places'))}</div></button>`).join('')}`;
  view.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>startMap(+b.dataset.j));return}
 const J=JOURNEYS[ji],P=J.pts,nm=p=>jourP(J,P.indexOf(p));
 const lats=P.map(p=>p[2]),lons=P.map(p=>p[3]);const pad=1.2;
 let x0=Math.min(...lons)-pad,x1=Math.max(...lons)+pad,y0=Math.min(...lats)-pad,y1=Math.max(...lats)+pad;
 const W=360,H=Math.max(260,Math.min(420,W*(y1-y0)/(x1-x0)*1.25));
 const X=lon=>14+(lon-x0)/(x1-x0)*(W-28),Y=lat=>14+(y1-lat)/(y1-y0)*(H-28);
 let step=1,miss=0;
 const draw=()=>{
  const route=P.slice(0,step).map(p=>`${X(p[3]).toFixed(1)},${Y(p[2]).toFixed(1)}`).join(' ');
  let grid='';for(let g=Math.ceil(x0);g<=x1;g++)grid+=`<line x1="${X(g)}" y1="0" x2="${X(g)}" y2="${H}"/>`;for(let g=Math.ceil(y0);g<=y1;g++)grid+=`<line x1="0" y1="${Y(g)}" x2="${W}" y2="${Y(g)}"/>`;
  view.innerHTML=`<h1 class="qp">${esc(jourT(J))}</h1><p class="note">${esc(qt('tapCity'))} · ${esc(bname(J.ref.split(' ')[0]))} ${J.ref.split(' ')[1].replace(':',', ')}</p>
  <svg class="bmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(qt('map'))}"><g class="grid">${grid}</g>
   <polyline points="${route}" class="route"/>
   ${P.map((p,k)=>{const vis=k<step;return `<g class="city ${vis?'on':''} ${k===0?'start':''}" data-c="${k}" tabindex="0" role="button" aria-label="${esc(nm(p))}"><circle cx="${X(p[3])}" cy="${Y(p[2])}" r="${vis?7:9}"/><circle class="hit" cx="${X(p[3])}" cy="${Y(p[2])}" r="20"/>${vis?`<text x="${X(p[3])>W-90?X(p[3])-10:X(p[3])+10}" text-anchor="${X(p[3])>W-90?'end':'start'}" y="${Y(p[2])-8}">${k+1}. ${esc(nm(p))}</text>`:''}</g>`}).join('')}
  </svg>
  <div class="chips" style="margin-top:10px">${rshuf(seeded(J.id),P.map((p,k)=>k)).filter(k=>k>=step).map(k=>`<span class="pill soft">${esc(nm(P[k]))}</span>`).join(' ')}</div>
  <div id="rfoot" style="margin-top:14px"></div>`;
  view.querySelectorAll('.city').forEach(g=>g.onclick=()=>{const k=+g.dataset.c;if(k<step||step>=P.length)return;
   if(k===step){step++;draw();if(step>=P.length){const pts=Math.max(0,P.length*5-miss*3);addRetoPts(pts);
    $('#rfoot').innerHTML=`<div class="fb" role="status"><b>${esc(qt('right')+' · '+qt('points',{n:pts}))}</b></div><div style="display:flex;gap:10px"><button class="btn ghost" id="mList" style="flex:1">${esc(qt('map'))}</button><button class="btn" id="rAgain" style="flex:1">${esc(qt('again'))}</button></div>`;
    $('#rAgain').onclick=()=>startMap(ji);$('#mList').onclick=()=>startMap()}}
   else{miss++;g.classList.add('shake');setTimeout(()=>g.classList.remove('shake'),400);
    const nx=P[step];$('#rfoot').innerHTML=`<p class="note">➡️ ${esc(nm(nx))}?</p>`}});
 };draw();
}

// ---- Pantalla principal de Retos ----
function renderRetos(){
 const v=S.view;
 if(v==='r_daily')return startDaily();
 const gate=f=>prem()?f():paywallCard();
 if(v==='r_who')return gate(startWho);if(v==='r_scr')return gate(startScramble);if(v==='r_tl')return gate(startTimeline);if(v==='r_map')return gate(()=>startMap());
 const st=store.get('retoDaily',{}),doneD=st.d===todayKey(),pts=store.get('retoPts',0);
 const item=(id,ico,k,lead,lock)=>`<button class="card rcard" data-r="${id}"><div class="t"><span class="rico">${ico}</span>${esc(qt(k))}${lock&&!prem()?`<span class="pill">👑 Premium</span>`:''}</div><div class="s">${esc(qt(lead))}</div></button>`;
 view.innerHTML=`<h1>${esc(qt('retos'))}</h1><p class="lead">${esc(qt('retosLead'))}</p>
 ${pts?`<p class="note">⭐ ${esc(qt('points',{n:pts}))}</p>`:''}
 <button class="card main rcard" data-r="r_daily"><div class="t"><span class="rico">📅</span>${esc(qt('daily'))}${doneD?`<span class="pill">${st.n}/${st.t}</span>`:''}</div><div class="s">${esc(doneD?qt('doneToday'):qt('dailyLead'))}</div></button>
 ${item('r_who','🕵️','who','whoLead',1)}${item('r_scr','🧩','scr','scrLead',1)}${item('r_tl','⏳','tl','tlLead',1)}${item('r_map','🧭','map','mapLead',1)}
 <div class="card off rcard"><div class="t"><span class="rico">👥</span>${esc(qt('group'))}<span class="pill soft">${esc(qt('soon'))}</span></div><div class="s">${esc(qt('groupLead'))}</div></div>`;
 view.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>go(b.dataset.r));
}
