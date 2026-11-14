// ---------- Pronunciación ----------
function say(text,lang){try{const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.8;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-say]');if(b){e.preventDefault();say(b.dataset.say,b.dataset.lang)}});
const sayBtn=(txt,lang)=>`<button class="btn ghost" data-say="${esc(txt)}" data-lang="${lang}" style="flex:0;padding:0 16px;margin-top:10px">🔊 ${esc(t('listen'))}</button>`;

// ---------- Fallos guardados ----------
function recWeak(it,ok){if(!it||!it.wk)return;const k=(it.wbr||LS.br)+'|'+it.wk;const w=store.get('weak',{});if(ok){if(w[k]){w[k]--;if(w[k]<=0)delete w[k]}}else w[k]=(w[k]||0)+1;store.set('weak',w)}

// ---------- Cursos de idiomas ----------
const LNAME={he:'lHe',el:'lEl',la:'lLa'};
const gloss=(lc,i)=>(lc==='he'?GLB:GLA)[LANG]?.split('|')[i]||(lc==='he'?GLB:GLA).en.split('|')[i];
const phMean=(lc,i)=>{const a=(GPH[LANG]||GPH.en).split('|');if(LANGC[lc].phIdx)return a[LANGC[lc].phIdx[i]];const off={la:0,he:8,el:16}[lc];return a[off+i]};
function langUnits(lc){
 const L=LANGC[lc];const u=[];
 if(L.letters)for(let k=0;k*6<L.letters.length;k++)u.push({id:'alpha:'+k,title:t('alpha')+' '+(k+1)});
 for(let k=0;k*6<L.words.length;k++)u.push({id:'vocab:'+k,title:t('vocab')+' '+(k+1)});
 for(let k=0;k*4<L.phrases.length;k++)u.push({id:'phr:'+k,title:t('phrases')+' '+(k+1)});
 if(L.ed)u.push({id:'read:0',title:t('reading')+' 1'},{id:'read:1',title:t('reading')+' 2'});
 return u;
}
const langPct=lc=>{const u=langUnits(lc),p=prog('lang-'+lc);return u.filter(x=>p.done[x.id]).length/u.length};
const anyPct=br=>br==='chars'?Object.keys(prog('chars').done).length/4:br==='feasts'?Object.keys(prog('feasts').done).length/FEASTS.length:br.startsWith('lang-')?langPct(br.slice(5)):pct(br);
const tlang=lc=>lc==='he'?'he':lc==='el'?'el':lc==='cu'?'cu':'la';
function lq(lc,kind,i){
 const L=LANGC[lc],tl=tlang(lc),wk='L:'+lc+':'+kind+':'+i,wbr='lang-'+lc;let q;
 if(kind==='L'){const x=L.letters[i];const others=L.letters.filter((_,k)=>k!==i);
  q=rnd(2)?mcq(t('qLetter'),x[1],pickN(others.map(o=>o[1]),3,[x[1]]),x[0]):mcq(t('qSound'),x[2],pickN(others.map(o=>o[2]),3,[x[2]]),x[0]);q.xlang=tl}
 else if(kind==='W'){const w=L.words[i];const g=gloss(lc,i);const og=L.words.map((_,k)=>gloss(lc,k)).filter((_,k)=>k!==i);
  if(rnd(2)){q=mcq(t('qWord'),g,pickN(og,3,[g]),w[0]+'  ·  '+w[1]);q.xlang=tl}
  else q=mcq(t('qWordRev').replace('{w}',g),w[0],pickN(L.words.filter((_,k)=>k!==i).map(o=>o[0]),3,[w[0]]));
  q.say=[w[0],L.tts]}
 else if(kind==='P'){const p=L.phrases[i];const m=phMean(lc,i);const om=L.phrases.map((_,k)=>phMean(lc,k)).filter((_,k)=>k!==i);
  q=mcq(t('qPhrase'),m,pickN(om,3,[m]),p[0]+'  ·  '+p[1]);q.xlang=tl;q.say=[p[0],L.tts]}
 q.wk=wk;q.wbr=wbr;return q;
}
async function readingQs(lc,n){
 const L=LANGC[lc],ed=L.ed,out=[];
 const verses=[];for(const b of L.books){try{const bk=await getBook(ed,b);if(bk)for(const c of Object.keys(bk.ch))for(const [v,x] of bk.ch[c])verses.push([b,c,v,x])}catch(e){}}
 const cand=shuffle(L.words.map((w,i)=>[w,i]).filter(([w])=>w[2]));
 for(const [w,i] of cand){if(out.length>=n)break;const st=norm(w[2]);const he=lc==='he';const hp=x=>x.normalize('NFC').replace(/[\u0591-\u05AF\u05BD]/g,'');const hl=hp(w[0]);const okTok=tok=>he?false:(tok.startsWith(st)&&tok.length<=st.length+(st.length<=4?3:2));const hits=verses.filter(v=>v[3].length<260&&(he?hp(v[3]).split(/[\s\u05BE\u05C3׀]+/).some(tok=>tok.includes(hl)&&tok.length<=hl.length+4):norm(v[3]).split(/[^\p{L}]+/u).some(okTok)));if(!hits.length)continue;
  const h=hits[rnd(hits.length)];const g=gloss(lc,i);const og=L.words.map((_,k)=>gloss(lc,k)).filter((_,k)=>k!==i);
  const q=mcq(t('qInVerse').replace('{w}',w[0]),g,pickN(og,3,[g]),h[3]+'  —  '+bname(h[0])+' '+h[1]+', '+h[2]);q.xlang=tlang(lc);q.wk='L:'+lc+':W:'+i;q.wbr='lang-'+lc;out.push(q)}
 return out;
}
function lcardHTML(lc,big,sub,mean){const L=LANGC[lc];return `<div class="lcard"><span class="pill soft">${esc(t(LNAME[lc]))}</span><div class="bigglyph" lang="${tlang(lc)}" dir="${lc==='he'?'rtl':'ltr'}">${esc(big)}</div><p class="lead" style="font-size:19px;margin:6px 0">${esc(sub)}</p>${mean?`<p class="note" style="font-size:17px">${esc(mean)}</p>`:''}${sayBtn(big.split(' ')[0]==big?big:big,L.tts)}</div>`}
async function buildLangLesson(lc,id){
 const L=LANGC[lc];const [kind,k]=id.split(':');const n=+k;const items=[];
 if(kind==='alpha'){const idx=[...Array(6).keys()].map(x=>n*6+x).filter(i=>i<L.letters.length);
  idx.forEach(i=>{const x=L.letters[i];items.push({type:'lcard',html:lcardHTML(lc,x[0],x[1]+' · '+x[2],'')})});
  shuffle(idx.concat(idx)).forEach(i=>items.push(lq(lc,'L',i)))}
 else if(kind==='vocab'){const idx=[...Array(6).keys()].map(x=>n*6+x).filter(i=>i<L.words.length);
  idx.forEach(i=>{const w=L.words[i];items.push({type:'lcard',html:lcardHTML(lc,w[0],w[1],gloss(lc,i))})});
  shuffle(idx.concat(idx)).forEach(i=>items.push(lq(lc,'W',i)))}
 else if(kind==='phr'){const idx=[...Array(4).keys()].map(x=>n*4+x).filter(i=>i<L.phrases.length);
  idx.forEach(i=>{const p=L.phrases[i];items.push({type:'lcard',html:lcardHTML(lc,p[0],p[1]+(p[2]?' · '+bname(p[2].split(' ')[0])+' '+p[2].split(' ')[1]:''),phMean(lc,i))})});
  shuffle(idx.concat(idx)).forEach(i=>items.push(lq(lc,'P',i)))}
 else if(kind==='read'){(await readingQs(lc,6)).forEach(q=>items.push(q))}
 return items;
}
async function startLangLesson(lc,id){
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 const items=await buildLangLesson(lc,id);
 if(!items.length){S.view='learn';return renderLearn()}
 LS={br:'lang-'+lc,id,items,i:0,hearts:3,right:0,total:items.filter(x=>x.type!=='lcard'&&x.type!=='card').length,sel:null,checked:false};
 S.view='lesson';setHeader();drawLesson();
}
function restartLesson(br,id){if(br.startsWith('lang-'))startLangLesson(br.slice(5),id);else if(id.startsWith('prac'))startPractice(id.slice(5));else startLesson(br,id)}

function renderLangCourse(){
 const lc=S.lc||'el';S.lc=lc;const L=LANGC[lc];const p=prog('lang-'+lc);const u=langUnits(lc);const nxt=u.findIndex(x=>!p.done[x.id]);const per=Math.round(langPct(lc)*100);
 let h=`<p class="lead">${esc(t('langLead'))}</p><div class="seg" role="group" aria-label="${esc(t('tabLangs'))}">${LCS.map(c=>`<button aria-pressed="${c===lc}" data-lc="${c}">${esc(t(LNAME[c]))}</button>`).join('')}</div>
 <div class="pbar" role="progressbar" aria-valuenow="${per}" aria-valuemin="0" aria-valuemax="100" aria-label="${per}%"><i style="width:${per}%"></i></div><p class="note">${per}% ${esc(ct('progress'))}</p><div class="path">`;
 u.forEach((x,i)=>{const done=!!p.done[x.id],cur=i===nxt,locked=!done&&!cur;const off=[0,40,70,40,0,-40,-70,-40][i%8];
  const icon=x.id.startsWith('alpha')?(lc==='he'?'א':lc==='cu'?'Ѣ':'α'):x.id.startsWith('vocab')?'Aa':x.id.startsWith('phr')?'❝':'📖';
  h+=`<div class="node-wrap" style="transform:translateX(${off}px)"><button class="node ${done?'done':cur?'cur':'locked'}" data-lid="${x.id}" ${locked?'disabled':''} aria-label="${esc(x.title)}">${done?'✓':icon}</button><span class="nlabel">${esc(x.title)}</span></div>`});
 h+=`</div>`;
 return h;
}
function bindLangCourse(){
 view.querySelectorAll('[data-lc]').forEach(x=>x.onclick=()=>{S.lc=x.dataset.lc;renderLearn()});
 view.querySelectorAll('[data-lid]:not([disabled])').forEach(x=>x.onclick=()=>startLangLesson(S.lc,x.dataset.lid));
}

// ---------- Práctica ----------
function renderPracticeHTML(){
 const br=S.course||'ortodoxa';const w=Object.keys(store.get('weak',{})).length;
 return `<p class="lead">${esc(t('practiceLead'))}</p>
 <div class="seg" role="group" aria-label="${esc(ct('course'))}">${['ortodoxa','catolica','protestante'].map(b=>`<button aria-pressed="${b===br}" data-course="${b}">${esc(t('br_'+b))}</button>`).join('')}</div>
 <button class="card main" data-pr="random"><div class="t">${esc(t('pRandom'))}</div><div class="s">${esc(t('pNote'))}</div></button>
 <button class="card" data-pr="weak"><div class="t">${esc(t('pWeak'))}${w?`<span class="pill soft">${w}</span>`:''}</div><div class="s">${esc(t('pNote'))}</div></button>
 <h2>${esc(t('pTopics'))}</h2><div class="booklist">${Object.keys(GROUP).map(g=>`<button class="book" data-pr="g:${g}">${esc(ct('g_'+g))}</button>`).join('')}
 ${LCS.map(c=>`<button class="book" data-pr="l:${c}">${esc(t(LNAME[c]))}</button>`).join('')}</div><div id="prMsg"></div>`;
}
function bindPractice(){
 view.querySelectorAll('[data-course]').forEach(x=>x.onclick=()=>{S.course=x.dataset.course;renderLearn()});
 view.querySelectorAll('[data-pr]').forEach(x=>x.onclick=()=>startPractice(x.dataset.pr));
}
async function startPractice(kind){
 const br=S.course||'ortodoxa';const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);let items=[];
 const msg=m=>{const el=$('#prMsg');if(el)el.innerHTML=`<p class="note" style="margin-top:12px">${esc(m)}</p>`;else alertless(m)};
 const fromBooks=async bs=>{await needVerses(br,bs.slice(0,40));const out=[];for(let k=0;k<80&&out.length<10;k++){const c=bs[rnd(bs.length)];const g=qGen(br,c);const q=g[rnd(g.length)]();if(q)out.push(q)}return out};
 const langAll=lc=>{const L=LANGC[lc];const pool=[];if(L.letters)L.letters.forEach((_,i)=>pool.push(['L',i]));L.words.forEach((_,i)=>pool.push(['W',i]));L.phrases.forEach((_,i)=>pool.push(['P',i]));return pool};
 if(kind.startsWith('g:')){items=await fromBooks(books.filter(c=>GOF[c]===kind.slice(2)))}
 else if(kind.startsWith('l:')){const lc=kind.slice(2);items=shuffle(langAll(lc)).slice(0,10).map(([k,i])=>lq(lc,k,i))}
 else if(kind==='random'){const p=prog(br);const done=books.filter(c=>p.done[c]);const lp=[];
  LCS.forEach(lc=>{const pp=prog('lang-'+lc);langUnits(lc).forEach(u=>{if(!pp.done[u.id])return;const [k,n]=u.id.split(':');const m={alpha:['L',6],vocab:['W',6],phr:['P',4]}[k];if(!m)return;for(let i=+n*m[1];i<(+n+1)*m[1];i++)lp.push([lc,m[0],i])})});
  if(!done.length&&!lp.length)return msg(t('pEmpty'));
  const fromB=done.length?await fromBooks(done):[];const fromL=shuffle(lp).slice(0,10).filter(([lc,k,i])=>k!=='L'||LANGC[lc].letters&&LANGC[lc].letters[i]).map(([lc,k,i])=>lq(lc,k,i));
  items=shuffle(fromB.slice(0,lp.length?6:10).concat(fromL.slice(0,done.length?4:10)))}
 else if(kind==='weak'){const w=Object.entries(store.get('weak',{})).sort((a,b)=>b[1]-a[1]).slice(0,10);if(!w.length)return msg(t('pEmptyWeak'));
  for(const [k] of w){const [wbr,wk]=k.split('|');
   if(wk.startsWith('L:')){const [,lc,kd,i]=wk.split(':');if(LANGC[lc])items.push(lq(lc,kd,+i))}
   else if(COURSE_META[wbr]){await needVerses(wbr,[wk]);const g=qGen(wbr,wk);const q=g[rnd(g.length)]();if(q)items.push(q)}}}
 items=items.filter(Boolean);if(!items.length)return msg(t('pEmpty'));
 LS={br:'prac',id:'prac:'+kind,items,i:0,hearts:Infinity,right:0,total:items.length,sel:null,checked:false};
 S.view='lesson';setHeader();drawLesson();
}
function alertless(){}

// ---------- Pantalla Aprender con tres pestañas ----------
const _renderBibleLearn=renderLearn;
renderLearn=function(){
 const m=S.lmode||'courses';
 const tabs=`<div class="seg" role="tablist" style="margin-bottom:14px">${[['courses','tabCourses'],['langs','tabLangs'],['feasts','tabFeasts'],['chars','tabChars'],['practice','tabPractice']].map(([k,l])=>`<button role="tab" aria-selected="${m===k}" aria-pressed="${m===k}" data-lm="${k}">${esc(t(l))}</button>`).join('')}</div>`;
 if(m==='courses'){_renderBibleLearn();view.insertAdjacentHTML('afterbegin',tabs)}
 else{view.innerHTML=`<h1>${esc(ct('learnTitle'))}</h1>`+tabs+(m==='langs'?renderLangCourse():m==='feasts'?renderFeasts():m==='chars'?renderChars():renderPracticeHTML());m==='langs'?bindLangCourse():m==='feasts'?bindFeasts():m==='chars'?bindChars():bindPractice()}
 view.querySelectorAll('[data-lm]').forEach(x=>x.onclick=()=>{S.lmode=x.dataset.lm;renderLearn()});
};
