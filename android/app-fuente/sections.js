// ---------- Utilidades ----------
const CL=()=>(LANG==='es'||LANG==='en'||CX[LANG])?LANG:'en';
const ct=k=>CX[CL()]?CX[CL()].ct[k]:CT[CL()][k];
// ---------- Examen de unidad y estrellas ----------
const TUX={
es:["Examen de la unidad","10 preguntas de esta unidad. Necesitas un 80 % para aprobar.","¡Unidad superada!","Casi. Necesitas un 80 %.","Examen"],
en:["Unit test","10 questions from this unit. You need 80% to pass.","Unit passed!","Almost. You need 80%.","Test"],
pt:["Exame da unidade","10 perguntas desta unidade. Precisa de 80% para passar.","Unidade concluída!","Quase. Precisa de 80%.","Exame"],
fr:["Examen de l’unité","10 questions de cette unité. Il faut 80 % pour réussir.","Unité réussie !","Presque. Il faut 80 %.","Examen"],
it:["Esame dell’unità","10 domande di questa unità. Serve l’80% per superarlo.","Unità superata!","Quasi. Serve l’80%.","Esame"],
de:["Einheitstest","10 Fragen aus dieser Einheit. 80 % zum Bestehen.","Einheit bestanden!","Knapp. Du brauchst 80 %.","Test"],
el:["Εξέταση ενότητας","10 ερωτήσεις από αυτή την ενότητα. Χρειάζεσαι 80% για να περάσεις.","Η ενότητα ολοκληρώθηκε!","Παραλίγο. Χρειάζεσαι 80%.","Εξέταση"],
ru:["Экзамен по разделу","10 вопросов из этого раздела. Для сдачи нужно 80 %.","Раздел пройден!","Почти. Нужно 80 %.","Экзамен"],
ro:["Examenul unității","10 întrebări din această unitate. Ai nevoie de 80% ca să treci.","Unitate promovată!","Aproape. Ai nevoie de 80%.","Examen"]};
for(const l in TUX){const o=(l==="es"||l==="en")?CT[l]:(CX[l]&&CX[l].ct);if(o)[o.uExam,o.uExamNote,o.uPass,o.uFail,o.uExamShort]=TUX[l]}
const SUMI={};
function sumOf(c){const L=CL();if(CX[L]){if(!SUMI[L])SUMI[L]=CX[L].sum.split('|');return SUMI[L][CODES.indexOf(c)]}return SUM[c][L==='es'?0:1]}
const fmt=(s,o)=>s.replace(/\{(\w)\}/g,(_,k)=>o[k]);
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const pickN=(arr,n,ex)=>shuffle(arr.filter(x=>!ex.includes(x))).slice(0,n);
const today=()=>new Date().toISOString().slice(0,10);
const COURSE_ED={ortodoxa:'ortodoxa-griega',catolica:'vulgata-clementina',protestante:'reina-valera-1909'};
const VSRC={es:{ortodoxa:'es-blm',catolica:'es-blm',protestante:'reina-valera-1909'},en:{ortodoxa:'en-ortho',catolica:'en-dra',protestante:'en-kjv'}};
const VB={};
const vsrc=br=>(VSRC[CL()]&&VSRC[CL()][br])||(LANG==='el'&&br==='ortodoxa'?'ortodoxa-griega':null)||TRMAP[br][LANG]||TRFALL[br];
const hasV=(br,c)=>!!VB[vsrc(br)+':'+c];
async function needVerses(br,codes){const src=vsrc(br);for(const c of codes){const k=src+':'+c;if(k in VB)continue;try{const b=await getBookAlias(src,c);VB[k]=b?{ch:b.ch,chs:Object.keys(b.ch)}:null}catch(e){VB[k]=null}}}
const NOTPROT=new Set('TOB JDT WIS SIR BAR EPJ PRA SUS BEL 1MA 2MA 3MA 1ES'.split(' '));

// ---------- Estructura del curso ----------
function courseUnits(br){
 const books=COURSE_META[br].books.map(b=>b[0]).filter(c=>SUM[c]);
 const basic=CL()==='es'&&typeof BASIC!=='undefined';
 const units=[{id:'intro',title:basic?BASIC.unit:ct('intro'),lessons:basic?['intro:org','intro:aut','intro']:['intro']}];
 let cur=null;
 books.forEach(c=>{
  const g=GOF[c]||'history';
  if(!cur||cur.g!==g||cur.books.length>=6){cur={g,books:[]};units.push(cur)}
  cur.books.push(c);
 });
 units.forEach((u,i)=>{if(i===0)return;u.id='u'+i;u.title=ct('g_'+u.g);u.lessons=u.books.concat(['rev:'+i,'ex:'+i])});
 return units;
}
const allLessons=br=>courseUnits(br).flatMap(u=>u.lessons);
const prog=br=>store.get('course:'+br,{done:{},exam:0});
const saveProg=(br,p)=>store.set('course:'+br,p);
const pct=br=>{const L=allLessons(br),p=prog(br);return L.filter(l=>p.done[l]).length/L.length};
function stats(){return store.get('stats',{xp:0,streak:0,last:null})}
function addXP(n){const s=stats();s.xp+=n;const t=today();
 if(s.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);s.streak=s.last===y?s.streak+1:1;s.last=t}
 store.set('stats',s)}

// ---------- Generadores de preguntas ----------
const T4={es:["¿Qué versículo viene después?","Ordena los versículos","Toca los versículos en el orden correcto"],en:["Which verse comes next?","Put the verses in order","Tap the verses in the right order"],pt:["Que versículo vem a seguir?","Ordene os versículos","Toque nos versículos pela ordem certa"],fr:["Quel verset vient ensuite ?","Remettez les versets dans l’ordre","Touchez les versets dans le bon ordre"],it:["Quale versetto viene dopo?","Metti in ordine i versetti","Tocca i versetti nell’ordine giusto"],de:["Welcher Vers kommt als Nächstes?","Bring die Verse in die richtige Reihenfolge","Tippe die Verse in der richtigen Reihenfolge an"],el:["Ποιος στίχος ακολουθεί;","Βάλτε τους στίχους σε σειρά","Πατήστε τους στίχους με τη σωστή σειρά"],ru:["Какой стих идёт дальше?","Расставьте стихи по порядку","Нажимайте на стихи в правильном порядке"],ro:["Ce verset urmează?","Pune versetele în ordine","Atinge versetele în ordinea corectă"]};
for(const l in T4){const o=l==='es'||l==='en'?CT[l]:CX[l].ct;[o.qNextV,o.qOrder,o.tapOrder]=T4[l]}
// Pasajes clave (capítulos) para los ejercicios de relato
const KEY={GEN:[1,2,3,6,7,12,22,37,45],EXO:[3,12,14,20],NUM:[13,14],DEU:[6,34],JOS:[6],JDG:[7,16],RUT:[1],"1SA":[3,16,17],"2SA":[7],"1KI":[3,18,19],"2KI":[2,5],NEH:[2],EST:[4],JOB:[1,42],PSA:[1,23,51,91,121,139],PRO:[3],ECC:[3],ISA:[6,9,40,53],JER:[1,31],EZE:[37],DAN:[3,6],JON:[1,2,3],MIC:[5],MAT:[2,5,6,14,26,27,28],MAR:[1,4,16],LUK:[1,2,10,15,24],JOH:[1,3,6,11,20,21],ACT:[2,9,27],ROM:[8,12],"1CO":[13,15],GAL:[5],EPH:[6],PHI:[2,4],HEB:[11],JAM:[2],"1JO":[4],REV:[1,21,22],TOB:[5],JDT:[13],"1MA":[2]};

function chOf(br,c){const b=COURSE_META[br].books.find(x=>x[0]===c);return b?b[1]:0}
function mcq(prompt,correct,wrongs,extra,why){return{type:'mcq',prompt,extra,why,options:shuffle([correct].concat(wrongs)),answer:correct}}
// Tarjeta para aprender (primeros pasos)
const bcard=(ic,ti,tx,n,of)=>({type:'lcard',html:`<div class="lcard bcard"><span class="pill soft">${esc(BASIC.unit)}${of>1?' · '+n+'/'+of:''}</span><div class="bic" aria-hidden="true">${ic}</div><h1>${esc(ti)}</h1><p class="lead" style="font-size:19px;line-height:1.55">${tx}</p></div>`});
function basicLesson(br,id){
 const isBr=id==='intro';
 const cards=isBr?[BASIC.brcard[br]]:BASIC.cards[id].map(c=>[c[0],c[1],c[2].replace('{AT}',BASIC.at[br])]);
 const pool=isBr?INTRO[br].es.concat(BASIC.extra[br]):BASIC.q[id];
 const qs=shuffle(pool).slice(0,7).map(q=>mcq(q[0],q[1],q.slice(2,5),undefined,q[5]));
 return cards.map((c,k)=>bcard(c[0],c[1],c[2],k+1,cards.length)).concat(qs);
}
function qGen(br,c){
 const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
 const same=books.filter(x=>GOF[x]===GOF[c]);
 const L=CL()==='es'?0:1;
 const gens=[];
 gens.push(()=>{const w=pickN(same.length>3?same:books,3,[c]);return mcq(ct('qSum'),bname(c),w.map(bname),sumOf(c))});
 gens.push(()=>{const n=chOf(br,c);const s=new Set();while(s.size<3){const d=n+(rnd(2)?1:-1)*(1+rnd(Math.max(3,Math.round(n*.3))));if(d>0&&d!==n)s.add(d)}return mcq(fmt(ct('qCh'),{b:bname(c)}),String(n),[...s].map(String))});
 const i=books.indexOf(c);
 if(i<books.length-1)gens.push(()=>{const nx=books[i+1];return mcq(fmt(ct('qNext'),{b:bname(c)}),bname(nx),pickN(books,3,[nx,c]).map(bname))});
 gens.push(()=>{const g=GOF[c];const others=shuffle(Object.keys(GROUP).filter(x=>x!==g)).slice(0,3);return mcq(fmt(ct('qGroup'),{b:bname(c)}),ct('g_'+g),others.map(x=>ct('g_'+x)))});
 if(br!=='protestante'&&NOTPROT.has(c))gens.push(()=>mcq(fmt(ct('qCanon'),{b:bname(c)}),ct('no'),[ct('yes')]));
 if(hasV(br,c)){
  const verse=()=>{const b=VB[vsrc(br)+':'+c];const chs=b.chs;for(let k=0;k<20;k++){const ch=chs[rnd(chs.length)];const vv=b.ch[ch];const v=vv[rnd(vv.length)];if(v[1].length>40&&v[1].length<260)return[ch,v]}return null};
  gens.push(()=>{const r=verse();if(!r)return null;const [ch,[vn,tx]]=r;const words=tx.split(/\s+/);const cand=words.map((w,k)=>[w.replace(/[^\p{L}]/gu,''),k]).filter(([w])=>w.length>=5);if(!cand.length)return null;const [w,k]=cand[rnd(cand.length)];
   const pool=[];for(let z=0;z<40&&pool.length<3;z++){const o=verse();if(!o)continue;o[1][1].split(/\s+/).map(x=>x.replace(/[^\p{L}]/gu,'')).filter(x=>x.length>=5&&x.toLowerCase()!==w.toLowerCase()&&!pool.includes(x)).slice(0,1).forEach(x=>pool.push(x))}
   if(pool.length<3)return null;const shown=words.map((x,j)=>j===k?x.replace(w,'_____'):x).join(' ');
   return mcq(fmt(ct('qFill'),{r:bname(c)+' '+ch+', '+vn}),w,pool,shown)});
  const keyCh=()=>{const b=VB[vsrc(br)+':'+c];const lxx=bookMeta(vsrc(br)).scheme==='lxx';const ks=(KEY[c]||[]).map(x=>c==='PSA'&&lxx?String(heb2lxx(x,1)[0]):String(x)).filter(x=>b.ch[x]);return ks.length?ks[rnd(ks.length)]:b.chs[rnd(b.chs.length)]};
  const clean=x=>x.length>220?x.slice(0,217)+'…':x;
  gens.push(()=>{const b=VB[vsrc(br)+':'+c];const ch=keyCh();const vv=b.ch[ch];if(!vv||vv.length<6)return null;const i=rnd(vv.length-1);const nx=vv[i+1][1];const others=pickN(vv.filter((_,k)=>k!==i&&k!==i+1).map(x=>x[1]),3,[nx]);if(others.length<3)return null;
   const q=mcq(ct('qNextV')+' ('+bname(c)+' '+ch+')',clean(nx),others.map(clean),clean(vv[i][1]));return q});
  gens.push(()=>{const b=VB[vsrc(br)+':'+c];const ch=keyCh();const vv=(b.ch[ch]||[]).filter(x=>x[1].length<200);if(vv.length<4)return null;const i=rnd(vv.length-2);const seq=b.ch[ch].slice(b.ch[ch].indexOf(vv[i]),b.ch[ch].indexOf(vv[i])+3);if(seq.length<3||seq.some(x=>x[1].length>200))return null;
   return {type:'order',prompt:ct('qOrder')+' ('+bname(c)+' '+ch+')',items:seq.map(x=>x[1]),answer:seq.map(x=>x[1])}});
  gens.push(()=>{const r=verse();if(!r)return null;const okb=same.filter(x=>hasV(br,x));const w=pickN(okb.length>3?okb:books,3,[c]);return mcq(ct('qVerse'),bname(c),w.map(bname),'«'+r[1][1]+'»')});
 }
 return gens.map(g=>()=>{const q=g();if(q){q.wk=c;q.wbr=br}return q});
}
// ---------- Variedad: no repetir las mismas preguntas ----------
const qSig=q=>((q.prompt||'')+'|'+(q.answer||(q.items?q.items.join('\u00b7'):''))).slice(0,140);
function genPool(br,c,rounds){const out=[];for(let r=0;r<(rounds||3);r++)qGen(br,c).forEach(g=>{try{const q=g();if(q)out.push(q)}catch(e){}});return out}
function pickFresh(br,id,pool,n){
 const seen=store.get('seen:'+br,{}),prev=seen[id]||[];
 const sig=new Set(),uniq=[];
 shuffle(pool).forEach(q=>{const s=qSig(q);if(!sig.has(s)){sig.add(s);uniq.push(q)}});
 const fresh=uniq.filter(q=>prev.indexOf(qSig(q))<0),rest=uniq.filter(q=>prev.indexOf(qSig(q))>=0);
 const out=shuffle(fresh).concat(shuffle(rest)).slice(0,n);
 seen[id]=out.map(qSig).concat(prev).slice(0,30);store.set('seen:'+br,seen);
 return out;
}
function buildLesson(br,id){
 if(id.startsWith('intro')&&CL()==='es'&&typeof BASIC!=='undefined')return basicLesson(br,id);
 if(id==='intro'){const L=CX[CL()]?CX[CL()].intro[br]:INTRO[br][CL()];return shuffle(L).map(q=>mcq(q[0],q[1],q.slice(2)))}
 if(id.startsWith('rev:')){const u=courseUnits(br)[+id.slice(4)];return pickFresh(br,id,u.books.flatMap(c=>genPool(br,c,2)),8)}
 if(id.startsWith('ex:')){const u=courseUnits(br)[+id.slice(3)];return pickFresh(br,id,u.books.flatMap(c=>genPool(br,c,3)),10)}
 if(id==='exam'){const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);const out=[];for(let k=0;k<60&&out.length<20;k++){const c=books[rnd(books.length)];const g=qGen(br,c);const q=g[rnd(g.length)]();if(q)out.push(q)}return out}
 let pool=genPool(br,id,3);
 if(CL()==='es'&&typeof BASIC!=='undefined'&&BASIC.books[id])pool=pool.concat(BASIC.books[id].map(q=>mcq(q[0],q[1],q.slice(2,5),undefined,q[5])));
 return [{type:'card',book:id}].concat(pickFresh(br,id,pool,6));
}

// ---------- Pantalla del curso ----------
function renderLearn(){
 const br=S.course||'ortodoxa';S.course=br;
 const st=stats(),p=prog(br),units=courseUnits(br),L=allLessons(br);
 const nextIdx=L.findIndex(l=>!p.done[l]);
 const per=Math.round(pct(br)*100);
 let h=`${CL()!==LANG&&ct('onlyEsEn')?`<p class="note">${esc(ct('onlyEsEn'))}</p>`:''}
 <h1>${esc(ct('learnTitle'))}</h1><p class="lead">${esc(ct('learnLead'))}</p>
 <div class="stats"><span class="stat"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 4 4 0-3 0-5 0-7z"/></svg><b>${st.streak}</b> ${esc(ct('streak'))}</span><span class="stat"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2l3 7 7 .6-5.3 4.6 1.6 7.1L12 17.6 5.7 21.3l1.6-7.1L2 9.6 9 9z"/></svg><b>${st.xp}</b> ${esc(ct('xp'))}</span></div>
 <div class="seg" role="group" aria-label="${esc(ct('course'))}">${['ortodoxa','catolica','protestante'].map(b=>`<button aria-pressed="${b===br}" data-course="${b}">${esc(t('br_'+b))}</button>`).join('')}</div>
 <div class="pbar" role="progressbar" aria-valuenow="${per}" aria-valuemin="0" aria-valuemax="100" aria-label="${per}% ${esc(ct('progress'))}"><i style="width:${per}%"></i><span class="mark" style="left:85%"></span></div>
 <p class="note">${per}% ${esc(ct('progress'))} · ${per>=85?`<b>${esc(ct('mastery'))}</b>`:esc(ct('masteryNote'))}</p>`;
 let idx=0;
 units.forEach(u=>{
  h+=`<h2>${esc(u.title)}</h2><div class="path">`;
  u.lessons.forEach((l,k)=>{
   const i=idx++;const done=!!p.done[l],cur=i===nextIdx,locked=!done&&!cur;
   const label=(CL()==='es'&&typeof BASIC!=='undefined'&&BASIC.labels[l])?BASIC.labels[l]:l==='intro'?ct('intro'):l.startsWith('rev:')?ct('review'):l.startsWith('ex:')?ct('uExamShort'):bname(l);
   const stars=(p.stars&&p.stars[l])||0;
   const off=[0,40,70,40,0,-40,-70,-40][k%8];
   h+=`<div class="node-wrap" style="transform:translateX(${off}px)"><button class="node ${done?'done':cur?'cur':'locked'} ${(l.startsWith('rev:')||l.startsWith('ex:'))?'rev':''}" data-l="${l}" ${locked?'disabled':''} aria-label="${esc(label)}${locked?' · '+esc(ct('locked')):''}">${done?'✓':l.startsWith('ex:')?'✪':l.startsWith('rev:')?'★':(CL()==='es'&&typeof BASIC!=='undefined'&&BASIC.icons[l])?BASIC.icons[l]:l==='intro'?'i':esc(bname(l).replace(/^(\d) /,'$1').slice(0,3))}</button><span class="nlabel">${esc(label)}${stars?'<br><span class="stars">'+'★'.repeat(stars)+'</span>':''}</span></div>`;
  });
  h+=`</div>`;
 });
 h+=`<h2>${esc(ct('exam'))}</h2><div class="card ${per>=85?'main':'off'}"><div class="t">${esc(ct('exam'))}${p.exam?`<span class="pill">${p.exam}%</span>`:''}</div><div class="s">${esc(ct('examNote'))}</div>${per>=85?`<button class="btn" id="examBtn" style="margin-top:12px;width:100%;background:var(--gold);color:var(--wine)">${esc(ct('start'))}</button>`:`<div class="s">${esc(ct('masteryNote'))}</div>`}</div>`;
 view.innerHTML=h;
 view.querySelectorAll('[data-course]').forEach(x=>x.onclick=()=>{S.course=x.dataset.course;renderLearn()});
 view.querySelectorAll('.node:not([disabled])').forEach(x=>x.onclick=()=>startLesson(br,x.dataset.l));
 const eb=$('#examBtn');if(eb)eb.onclick=()=>startLesson(br,'exam');
 const c=view.querySelector('.node.cur');if(c)c.scrollIntoView({block:'center'});
}

// ---------- Lección ----------
let LS=null;
async function startLesson(br,id){
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
 const need=id.startsWith('intro')?[]:id==='exam'?books:id.startsWith('rev:')?courseUnits(br)[+id.slice(4)].books:id.startsWith('ex:')?courseUnits(br)[+id.slice(3)].books:[id];
 try{await needVerses(br,need)}catch(e){}
 const items=buildLesson(br,id);
 LS={br,id,items,i:0,hearts:(id==='exam'||id.startsWith('ex:'))?Infinity:3,right:0,total:items.filter(x=>x.type!=='card'&&x.type!=='lcard').length,sel:null,checked:false};
 S.view='lesson';setHeader();drawLesson();
}
function drawLesson(){
 const it=LS.items[LS.i];const per=Math.round(LS.i/LS.items.length*100);
 let body='';
 if(it.type==='lcard'){body=it.html}
 else if(it.type==='card'){
  body=`<div class="lcard"><span class="pill soft">${esc(ct('newBook'))}</span><h1>${esc(bname(it.book))}</h1><p class="lead" style="font-size:19px">${esc(sumOf(it.book))}</p><p class="note">${chOf(LS.br,it.book)} ${esc(ct('chapters'))} · ${esc(ct('g_'+(GOF[it.book]||'history')))}</p><button class="btn ghost" id="readB" style="margin-top:8px">${esc(ct('read'))}</button></div>`;
 }else if(it.type==='order'){
  if(!LS.pick)LS.pick=[];if(!it.shown)it.shown=shuffle(it.items);
  body=`<h1 class="qp">${esc(it.prompt)}</h1><p class="note">${esc(ct('tapOrder'))}</p><ol class="picked">${LS.pick.map(k=>`<li><button class="opt" data-un="${k}">${esc(it.shown[k])}</button></li>`).join('')}</ol><div class="opts">${it.shown.map((o,k)=>LS.pick.includes(k)?'':`<button class="opt" data-pk="${k}">${esc(o)}</button>`).join('')}</div>`;
 }else{
  body=`<h1 class="qp">${esc(it.prompt)}</h1>${it.extra?`<p class="qx" ${it.xlang?`lang="${it.xlang}" dir="${it.xlang==='he'?'rtl':'auto'}"`:''}>${esc(it.extra)}</p>`:''}${it.say?`<button class="btn ghost" data-say="${esc(it.say[0])}" data-lang="${it.say[1]}" style="flex:0;margin:0 0 12px">🔊 ${esc(t('listen'))}</button>`:''}<div class="opts">${it.options.map((o,k)=>`<button class="opt" dir="auto" data-o="${k}" aria-pressed="${LS.sel===k}">${esc(o)}</button>`).join('')}</div>`;
 }
 view.innerHTML=`<div class="lhead"><button class="iconbtn x" id="quit" aria-label="${esc(ct('back'))}"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="pbar small"><i style="width:${per}%"></i></div>${LS.hearts!==Infinity?`<span class="hearts" aria-label="${LS.hearts} ${esc(ct('hearts'))}"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="#C0392B"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>${LS.hearts}</span>`:''}</div>
 <div class="lbody">${body}</div><div class="lfoot" id="foot"><button class="btn" id="act" ${(it.type==='mcq'&&LS.sel===null)||(it.type==='order'&&(LS.pick||[]).length<it.items.length)?'disabled':''}>${esc(it.type==='card'||it.type==='lcard'?ct('cont'):ct('check'))}</button></div>`;
 $('#quit').onclick=()=>{LS=null;go('learn')};
 const rb=$('#readB');if(rb)rb.onclick=()=>{const b=it.book;LS=null;go('chapters',{sec:'bible',ed:COURSE_ED[S.course],book:b})};
 view.querySelectorAll('.opt').forEach(x=>x.onclick=()=>{if(LS.checked)return;LS.sel=+x.dataset.o;view.querySelectorAll('.opt').forEach(y=>y.setAttribute('aria-pressed',y===x));$('#act').disabled=false});
 view.querySelectorAll('[data-pk]').forEach(x=>x.onclick=()=>{if(LS.checked)return;LS.pick.push(+x.dataset.pk);drawLesson()});
 view.querySelectorAll('[data-un]').forEach(x=>x.onclick=()=>{if(LS.checked)return;LS.pick=LS.pick.filter(k=>k!==+x.dataset.un);drawLesson()});
 $('#act').onclick=()=>{
  if(it.type==='card'||it.type==='lcard'){LS.i++;return next()}
  if(it.type==='order'&&!LS.checked){
   LS.checked=true;const got=LS.pick.map(k=>it.shown[k]);const ok=got.every((x,k)=>x===it.answer[k]);
   view.querySelectorAll('[data-un]').forEach((y,k)=>y.classList.add(got[k]===it.answer[k]?'ok':'bad'));
   recWeak(it,ok);if(ok)LS.right++;else{if(LS.hearts!==Infinity)LS.hearts--;if(LS.id!=='exam')LS.items.push({type:'order',prompt:it.prompt,items:it.items,answer:it.answer})}
   $('#foot').className='lfoot '+(ok?'good':'nogood');
   $('#foot').insertAdjacentHTML('afterbegin',`<div class="fb" role="status"><b>${esc(ok?ct('right'):ct('wrong'))}</b>${ok?'':`<span>${esc(ct('answerWas'))} ${it.answer.map((x,k)=>(k+1)+'. '+x).map(esc).join(' ')}</span>`}</div>`);
   $('#act').textContent=ct('cont');$('#act').disabled=false;return;
  }
  if(!LS.checked){
   LS.checked=true;const ok=it.options[LS.sel]===it.answer;
   view.querySelectorAll('.opt').forEach((y,k)=>{if(it.options[k]===it.answer)y.classList.add('ok');else if(k===LS.sel)y.classList.add('bad')});
   recWeak(it,ok);if(ok)LS.right++;else{if(LS.hearts!==Infinity)LS.hearts--;if(LS.id!=='exam')LS.items.push(Object.assign({},it,{options:shuffle(it.options)}))}
   $('#foot').className='lfoot '+(ok?'good':'nogood');
   $('#foot').insertAdjacentHTML('afterbegin',`<div class="fb" role="status"><b>${esc(ok?ct('right'):ct('wrong'))}</b>${ok?'':`<span>${esc(ct('answerWas'))} ${esc(it.answer)}</span>`}${it.why?`<span class="why">💡 ${esc(it.why)}</span>`:''}</div>`);
   $('#act').textContent=ct('cont');return;
  }
  LS.i++;LS.sel=null;LS.pick=null;LS.checked=false;next();
 };
}
function next(){
 if(LS.hearts<=0)return endLesson(false);
 if(LS.i>=LS.items.length)return endLesson(true);
 drawLesson();window.scrollTo(0,0);
}
function endLesson(ok){
 const {br,id}=LS;let h='';
 if(id==='exam'){
  const sc=Math.round(LS.right/LS.total*100);const p=prog(br);p.exam=Math.max(p.exam||0,sc);saveProg(br,p);const pass=sc>=85;if(pass)addXP(50);
  h=`<div class="endc"><div class="big">${sc}%</div><h1>${esc(pass?ct('pass'):ct('fail'))}</h1><p class="lead">${esc(ct('score'))}: ${LS.right}/${LS.total}</p></div>`;
 }else if(id.startsWith('ex:')){
  const sc=LS.total?Math.round(LS.right/LS.total*100):0;const p=prog(br);
  p.ux=p.ux||{};p.ux[id]=Math.max(p.ux[id]||0,sc);
  const pass=sc>=80;if(pass){p.done[id]=true;addXP(25)}
  saveProg(br,p);
  h=`<div class="endc"><div class="big">${sc}%</div><h1>${esc(pass?ct('uPass'):ct('uFail'))}</h1><p class="lead">${esc(ct('score'))}: ${LS.right}/${LS.total}${pass?' · +25 '+esc(ct('xp')):''}</p></div>`;
  if(!pass)h+=`<button class="btn ghost" id="again" style="width:100%;margin-bottom:10px">${esc(ct('retry'))}</button>`;
 }else if(id.startsWith('prac')){
  addXP(5);const sc=LS.total?Math.round(LS.right/LS.total*100):0;
  h=`<div class="endc"><div class="big">${sc}%</div><h1>${esc(ct('done'))}</h1><p class="lead">${esc(ct('score'))}: ${LS.right}/${LS.total} · +5 ${esc(ct('xp'))}</p></div>`;
 }else if(ok){
  const p=prog(br);p.done[id]=true;
  const hl=LS.hearts===Infinity?3:LS.hearts;const st3=Math.max(1,Math.min(3,hl));
  p.stars=p.stars||{};p.stars[id]=Math.max(p.stars[id]||0,st3);
  saveProg(br,p);addXP(10);
  h=`<div class="endc"><div class="big" style="color:var(--gold);letter-spacing:4px">${'★'.repeat(st3)}${'☆'.repeat(3-st3)}</div><h1>${esc(ct('done'))}</h1><p class="lead">+10 ${esc(ct('xp'))} · ${Math.round(anyPct(br)*100)}% ${esc(ct('progress'))}</p></div>`;
 }else{
  h=`<div class="endc"><div class="big" style="color:#C0392B">0 ♥</div><h1>${esc(ct('out'))}</h1><p class="lead">${esc(ct('outNote'))}</p><button class="btn ghost" id="again" style="width:100%;margin-bottom:10px">${esc(ct('retry'))}</button></div>`;
 }
 view.innerHTML=h+`<button class="btn" id="toCourse" style="width:100%">${esc(ct('back'))}</button>`;
 const a=$('#again');if(a)a.onclick=()=>restartLesson(br,id);
 $('#toCourse').onclick=()=>{LS=null;go('learn')};
}

// ---------- Salud, Deporte, Más ----------
async function renderArticles(sec){
 const X=CX[CL()]?CX[CL()].artx:ARTX[CL()],L=CL()==='es'?0:1,AL=CX[CL()]?CX[CL()].art[sec]:null;
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 const src=TRMAP.protestante[LANG]||'en-kjv';const refs=ART[sec].flatMap(a=>a.r);const BK={};
 for(const r of refs){const b=r.split(' ')[0];if(!(b in BK)){try{BK[b]=await getBook(src,b)}catch(e){BK[b]=null}}}
 const verse=ref=>{const [b,r]=ref.split(' ');const [c0,vs]=r.split(':');const [a,z]=vs.split('-').map(Number);
  const [c]=mapRef('reina-valera-1909',src,b,c0,a);const bk=BK[b];
  const txt=bk&&bk.ch[c]?bk.ch[c].filter(v=>v[0]>=a&&v[0]<=(z||a)).map(v=>v[1]).join(' '):'';
  return `<blockquote class="vq" lang="${TRLANG[src]}">${txt?`<span>${esc(txt)}</span>`:''}<cite>${esc(bname(b))} ${c0}, ${vs}${txt?' · '+esc(TRNAME[src]):''}</cite></blockquote>`};
 view.innerHTML=`${CL()!==LANG&&ct('onlyEsEn')?`<p class="note">${esc(ct('onlyEsEn'))}</p>`:''}<h1>${esc(X[sec])}</h1><p class="lead">${esc(X['lead_'+sec])}</p>
 ${ART[sec].map((a,i)=>`<article class="art"><h2 class="ah">${esc(AL?AL[i][0]:a.t[L])}</h2>${a.b.map((p,j)=>`<p>${esc(AL?AL[i][j+1]:p[L])}</p>`).join('')}${a.r.map(verse).join('')}</article>`).join('')}
 ${sec!=='more'?`<p class="note">${esc(X.disc)}</p>`:''}`;
}
