const VIVLOS = __VIVLOS__;
const NT=new Set(CODES.slice(CODES.indexOf('MAT')));
const DEUTERO=new Set(['TOB','JDT','ESG','WIS','SIR','BAR','EPJ','PRA','SUS','BEL','1MA','2MA','3MA','1ES']);
const ONLYORTHO=new Set(['1ES','3MA']);
const BRANCHES=[
 {id:'ortodoxa',main:true,eds:[{id:'ortodoxa-griega',k:'og',lang:'el'}]},
 {id:'catolica',eds:[{id:'vulgata-clementina',k:'vc',lang:'la'}]},
 {id:'protestante',eds:[{id:'reina-valera-1909',k:'rv',lang:'es',isTr:true},{id:'original-hebreo-griego',k:'or',lang:'el'}]},
 {id:'etiope',eds:[],soon:true}
];
const ED={};BRANCHES.forEach(b=>b.eds.forEach(e=>{e.branch=b;ED[e.id]=e}));
const TRLANG={'en-ortho':'en','en-dra':'en','en-kjv':'en','es-blm':'es','pt-bsl':'pt','fr-sbl':'fr','fr-lsg':'fr','it-1927':'it','de-1912':'de','ru-syn':'ru','ro-bl':'ro','reina-valera-1909':'es','ortodoxa-griega':'el'};
const store={get(k,d){try{const v=localStorage.getItem('phos:'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('phos:'+k,JSON.stringify(v))}catch(e){}}};

// ---------- Datos: trozos, caché en memoria y en el dispositivo (IndexedDB) ----------
const MEM={};
let DB=null;
function idb(){if(DB)return DB;DB=new Promise(res=>{try{const r=indexedDB.open('phos',1);r.onupgradeneeded=()=>r.result.createObjectStore('chunks');r.onsuccess=()=>res(r.result);r.onerror=()=>res(null)}catch(e){res(null)}});return DB}
async function idbGet(k){const db=await idb();if(!db)return null;return new Promise(res=>{try{const q=db.transaction('chunks').objectStore('chunks').get(k);q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null)}catch(e){res(null)}})}
async function idbPut(k,v){const db=await idb();if(!db)return;try{db.transaction('chunks','readwrite').objectStore('chunks').put(v,k)}catch(e){}}
async function getChunk(id,n){
 const k=id+'/'+n;if(MEM[k])return MEM[k];
 let d=await idbGet(k);
 if(!d){const r=await fetch('data/'+k+'.json');if(!r.ok)throw new Error('load');d=await r.json();idbPut(k,d)}
 return MEM[k]=d;
}
const metaCache={};
function bookMeta(id){
 if(metaCache[id])return metaCache[id];
 const m=MANIFEST[id];const books=m.b.map(([c,k,f])=>({c,f,chs:typeof k==='number'?Array.from({length:k},(_,i)=>String(i+1)):k.split(',')}));
 const map={};books.forEach(b=>map[b.c]=b);
 return metaCache[id]={books,map,scheme:m.s,n:m.n};
}
async function getBook(id,c){const m=bookMeta(id).map[c];if(!m)return null;const ch=await getChunk(id,m.f);return ch[c]?{c,ch:ch[c],chs:m.chs}:null}
async function loadAll(id,onp){const n=MANIFEST[id].n;for(let i=0;i<n;i++){if(onp)onp(i,n);await getChunk(id,i)}}
const ALIAS={'4ES':['EZR','4ES'],ESG:['ESG','EST'],DNG:['DNG','DAN'],EST:['EST','ESG'],DAN:['DAN','DNG'],EZR:['EZR','4ES']};
async function getBookAlias(id,c){for(const x of (ALIAS[c]||[c])){const b=await getBook(id,x);if(b)return b}return null}

// ---------- Numeración de los Salmos (Septuaginta/Vulgata ↔ hebrea) ----------
function lxx2heb(c,v){c=+c;if(c<=8)return[c,v];if(c===9)return v<=21?[9,v]:[10,v-21];if(c<=112)return[c+1,v];if(c===113)return v<=8?[114,v]:[115,v-8];if(c===114)return[116,v];if(c===115)return[116,v+9];if(c<=145)return[c+1,v];if(c===146)return[147,v];if(c===147)return[147,v+11];return[c,v]}
function heb2lxx(c,v){c=+c;if(c<=9)return[c,v];if(c===10)return[9,v+21];if(c<=113)return[c-1,v];if(c===114)return[113,v];if(c===115)return[113,v+8];if(c===116)return v<=9?[114,v]:[115,v-9];if(c<=146)return[c-1,v];if(c===147)return v<=11?[146,v]:[147,v-11];return[c,v]}
function mapRef(fromId,toId,book,c,v){
 const a=bookMeta(fromId).scheme,b=bookMeta(toId).scheme;
 if(book!=='PSA'||a===b)return[String(c),v];
 const r=a==='lxx'?lxx2heb(c,v):heb2lxx(c,v);return[String(r[0]),r[1]];
}

// ---------- Idioma ----------
function detectLang(){
 const list=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']);
 for(const l of list){const c=String(l).toLowerCase().split('-')[0];if(T[c])return c}
 return 'en';
}
let LANG='en',BN={};
function applyLang(){
 const pick=store.get('lang','auto');
 LANG=pick!=='auto'&&T[pick]?pick:detectLang();
 const arr=BOOKNAMES[LANG].split('|');BN={};CODES.forEach((c,i)=>BN[c]=arr[i]);
 document.documentElement.lang=LANG;
 $('#back').setAttribute('aria-label',t('back'));
 $('#searchBtn').setAttribute('aria-label',t('searchBtn'));
 $('#infoBtn').setAttribute('aria-label',t('infoBtn'));
 $('#langBtn').setAttribute('aria-label',t('language'));
 document.title='Phos · '+t('app');
 drawTabs();
}
const t=k=>(T[LANG]&&T[LANG][k])||T.en[k]||k;
const edName=id=>ED[id]?t('ed_'+ED[id].k):TRNAME[id]||id, edInfo=id=>t('in_'+ED[id].k), brName=b=>t('br_'+b.id);
function trFor(edId){
 const e=ED[edId];if(!e)return null;
 const tr=TRMAP[e.branch.id]&&TRMAP[e.branch.id][LANG];
 if(e.isTr){return tr&&tr!==edId&&TRLANG[tr]!==TRLANG[edId]?tr:null}
 return tr||null;
}
const SECS=['bible','learn','health','sport','more'];
function drawTabs(){
 const n=NAV[LANG]||NAV.en;
 $('#tabs').innerHTML=SECS.map((s,i)=>`<button data-sec="${s}" ${S.sec===s?'aria-current="page"':''}>${esc(n[i])}</button>`).join('');
 $('#tabs').querySelectorAll('[data-sec]').forEach(x=>x.onclick=()=>{const s=x.dataset.sec;LS=null;if(s==='bible')go(S.ed?'books':'home',{sec:s});else go(s,{sec:s})});
}

let S={sec:'bible',course:'ortodoxa',view:'home',ed:null,book:null,ch:null,tab:'AT',cmp:null,hl:null};
const $=s=>document.querySelector(s);
const view=$('#view');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.documentElement.style.setProperty('--fs',store.get('fs',20)+'px');
const bname=c=>BN[c]||c;
const isHe=(edId,book)=>edId==='original-hebreo-griego'&&!NT.has(book);
function setHeader(){
 drawTabs();
 $('#back').style.visibility=(S.view==='home'||(S.sec!=='bible'&&S.view!=='lesson'))?'hidden':'visible';
 $('#searchBtn').style.visibility=S.sec==='bible'&&S.ed?'visible':'hidden';
 $('#sub').textContent=S.ed&&S.sec==='bible'?edName(S.ed):t('app');
}
function go(v,patch){Object.assign(S,patch||{});S.view=v;render();window.scrollTo(0,0)}
$('#back').onclick=()=>{
 if(S.sec!=='bible'){LS=null;return go(S.sec==='learn'?'learn':S.sec)}
 if(S.view==='read')go('chapters');
 else if(S.view==='chapters')go('books');
 else if(S.view==='search'||S.view==='marks')go(S.book?'read':'books');
 else go('home',{ed:null,book:null,ch:null});
};
$('#searchBtn').onclick=()=>go('search');
$('#infoBtn').onclick=()=>{
 $('#infoTitle').textContent=t('sources');$('#infoClose').textContent=t('close');
 $('#infoBody').innerHTML=`<p class="note">${esc(t('src1'))}</p>
 <p class="note">Septuaginta · Patriarchal Text 1904 · Vulgata Clementina · Reina-Valera 1909 · Codex Leningradensis · Textus Receptus · ${Object.values(TRNAME).filter(x=>x!=='Reina-Valera 1909').map(esc).join(' · ')}</p>
 <p class="note">${esc(t('src2'))}</p><div class="vivlos">${esc(VIVLOS)}</div>`;
 $('#info').showModal();
};
$('#infoClose').onclick=()=>$('#info').close();
$('#langBtn').onclick=()=>{
 const cur=store.get('lang','auto');
 $('#langTitle').textContent=t('language');$('#langNote').textContent=t('langNote');$('#langClose').textContent=t('close');
 const opts=[['auto',t('auto')]].concat(Object.entries(LANGS));
 $('#langList').innerHTML=opts.map(([c,n])=>`<button class="book" data-l="${c}" aria-pressed="${cur===c}" ${c!=='auto'?`lang="${c}"`:''}>${esc(n)}${cur===c?'<span class="pill">✓</span>':''}</button>`).join('');
 $('#langList').querySelectorAll('[data-l]').forEach(x=>x.onclick=()=>{store.set('lang',x.dataset.l);applyLang();$('#lang').close();render()});
 $('#lang').showModal();
};
$('#langClose').onclick=()=>$('#lang').close();

async function render(){
 setHeader();
 if(S.sec==='learn'){if(S.view==='lesson'&&LS)return drawLesson();return renderLearn()}
 if(S.sec!=='bible')return renderArticles(S.sec);
 if(S.view==='home')return renderHome();
 if(S.view==='books')return renderBooks();
 if(S.view==='chapters')return renderChapters();
 if(S.view==='marks')return renderMarks();
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 try{if(S.view==='read')await renderRead();else if(S.view==='search')renderSearch()}
 catch(e){view.innerHTML=`<p class="lead">${esc(t('loadErr'))}</p>`}
}

function renderHome(){
 const last=store.get('last',null);
 let h=`<h1>${esc(t('choose'))}</h1><p class="lead">${esc(t('lead'))}</p>`;
 h+=typeof homeExtras==='function'?homeExtras():'';
 if(last&&ED[last.ed])h+=`<button class="card" id="cont"><div class="t">${esc(t('cont'))}<span class="pill soft">${esc(brName(ED[last.ed].branch))}</span></div><div class="s">${esc(bname(last.book))} ${esc(last.ch)} · ${esc(edName(last.ed))}</div></button>`;
 BRANCHES.forEach(b=>{
  if(b.soon){h+=`<div class="card off"><div class="t">${esc(brName(b))}<span class="pill soft">${esc(t('soon'))}</span></div><div class="s">${esc(t('cn_'+b.id))}</div><div class="s">${esc(t('soonNote'))}</div></div>`;return}
  h+=`<div class="card ${b.main?'main':''}"><div class="t">${esc(brName(b))}${b.main?`<span class="pill">${esc(t('main'))}</span>`:''}</div><div class="s">${esc(t('cn_'+b.id))}</div><div class="edlist">${b.eds.map(e=>{const tr=trFor(e.id);return `<button class="ed" data-ed="${e.id}"><b>${esc(edName(e.id))}</b><span>${esc(edInfo(e.id))}</span>${tr?`<span>${esc(t('mTrans'))}: ${esc(TRNAME[tr])}</span>`:''}</button>`}).join('')}</div></div>`;
 });
 h+=`<p class="note">${esc(t('offline'))}</p>`;
 view.innerHTML=h;
 view.querySelectorAll('[data-ed]').forEach(x=>x.onclick=()=>go('books',{ed:x.dataset.ed,book:null,ch:null,tab:'AT',cmp:null}));
 const c=$('#cont');if(c)c.onclick=()=>go('read',{ed:last.ed,book:last.book,ch:last.ch});
 if(typeof bindHomeExtras==='function')bindHomeExtras();
}

function renderBooks(){
 const d=bookMeta(S.ed);
 const list=d.books.filter(b=>S.tab==='NT'?NT.has(b.c):!NT.has(b.c));
 const ortho=S.ed==='ortodoxa-griega',cat=S.ed==='vulgata-clementina';
 view.innerHTML=`<h1>${esc(edName(S.ed))}</h1><p class="lead">${esc(edInfo(S.ed))}</p>
 <div class="seg" role="group" aria-label="${esc(t('testament'))}"><button aria-pressed="${S.tab==='AT'}" data-tab="AT">${esc(t('ot'))}</button><button aria-pressed="${S.tab==='NT'}" data-tab="NT">${esc(t('nt'))}</button></div>
 <div class="booklist">${list.map(b=>{let tag='';
  if(ortho&&ONLYORTHO.has(b.c))tag=`<span class="pill soft">${esc(t('onlyOrtho'))}</span>`;
  else if((ortho||cat)&&DEUTERO.has(b.c))tag=`<span class="pill soft">${esc(t('deutero'))}</span>`;
  return `<button class="book" data-b="${b.c}">${esc(bname(b.c))}${tag||`<small>${b.chs.length} ${esc(t('chAbbr'))}</small>`}</button>`}).join('')}</div>
 ${ortho&&S.tab==='AT'?`<p class="note" style="margin-top:14px">${esc(t('psNote'))}</p>`:''}`;
 view.querySelectorAll('[data-tab]').forEach(x=>x.onclick=()=>{S.tab=x.dataset.tab;renderBooks()});
 view.querySelectorAll('[data-b]').forEach(x=>x.onclick=()=>{const b=d.map[x.dataset.b];if(b.chs.length===1)go('read',{book:b.c,ch:b.chs[0],hl:null});else go('chapters',{book:b.c})});
}

function renderChapters(){
 const b=bookMeta(S.ed).map[S.book];
 view.innerHTML=`<h1>${esc(bname(S.book))}</h1><p class="lead">${esc(t('pickCh'))}</p><div class="grid">${b.chs.map(c=>`<button data-c="${c}" aria-label="${esc(t('chapter'))} ${c}">${c}</button>`).join('')}</div>`;
 view.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>go('read',{ch:x.dataset.c,hl:null}));
}

function txtLang(edId,book){if(isHe(edId,book))return 'he';return ED[edId]?ED[edId].lang:TRLANG[edId]||'en'}
function vClass(edId,book,v){return (S.hl==v?'hl ':'')+(typeof markClass==='function'?markClass(edId,book,S.ch,v):'')}
function chapterHTML(edId,b,ch){
 if(!b||!b.ch[ch])return `<p class="note">${esc(t('noCh'))}</p>`;
 const he=isHe(edId,b.c);
 return `<div class="txt ${he?'he':''}" lang="${txtLang(edId,b.c)}">${b.ch[ch].map(([v,x])=>`<p id="v${v}" data-v="${v}" class="${vClass(edId,b.c,v)}"><sup>${v}</sup>${esc(x)}</p>`).join('')}</div>`;
}
function bilingualHTML(edId,b,ch,trId,tb){
 const he=isHe(edId,b.c);
 return `<div class="bil">${b.ch[ch].map(([v,x])=>{
  let tx='';if(tb){const [tc,tv]=mapRef(edId,trId,b.c,ch,v);const row=tb.ch[tc]&&tb.ch[tc].find(r=>r[0]===tv);tx=row?row[1]:''}
  return `<div id="v${v}" data-v="${v}" class="pair ${vClass(edId,b.c,v)}"><p class="txt ${he?'he':''}" lang="${txtLang(edId,b.c)}"><sup>${v}</sup>${esc(x)}</p>${tx?`<p class="tr" lang="${TRLANG[trId]}">${esc(tx)}</p>`:''}</div>`}).join('')}</div>`;
}

async function renderRead(){
 const m=bookMeta(S.ed).map[S.book];const i=m.chs.indexOf(S.ch);
 const b=await getBook(S.ed,S.book);
 store.set('last',{ed:S.ed,book:S.book,ch:S.ch});
 let trId=trFor(S.ed),tb=null,fb=false;
 if(trId){tb=await getBookAlias(trId,S.book).catch(()=>null);
  if(!tb&&TRFALL[ED[S.ed].branch.id]&&TRFALL[ED[S.ed].branch.id]!==trId){trId=TRFALL[ED[S.ed].branch.id];tb=await getBookAlias(trId,S.book).catch(()=>null);fb=!!tb}
  if(!tb)trId=null}
 let mode=trId?store.get('mode','both'):'orig';
 const others=Object.keys(ED).concat(Object.keys(TRNAME)).filter((x,k,a)=>a.indexOf(x)===k&&x!==S.ed);
 let cmpHTML='';
 if(S.cmp){
  try{const b2=await getBookAlias(S.cmp,S.book);const [c2]=mapRef(S.ed,S.cmp,S.book,S.ch,1);
   cmpHTML=`<section class="reader"><h2 style="margin-top:0">${esc(edName(S.cmp))}${c2!==S.ch?` · ${esc(t('chapter'))} ${c2}`:''}</h2>${b2?chapterHTML(S.cmp,b2,c2):`<p class="note">${esc(t('noCh'))}</p>`}</section>`}
  catch(e){cmpHTML=`<p class="note">${esc(t('cmpErr'))}</p>`}
 }
 let main;
 if(mode==='both'&&tb)main=bilingualHTML(S.ed,b,S.ch,trId,tb);
 else if(mode==='trans'&&tb){const [tc]=mapRef(S.ed,trId,S.book,S.ch,1);main=chapterHTML(trId,tb,tc)}
 else main=chapterHTML(S.ed,b,S.ch);
 const psN=S.book==='PSA'&&bookMeta(S.ed).scheme==='lxx'?lxx2heb(S.ch,1)[0]:null;
 view.innerHTML=`<div class="crumb"><button id="cb">${esc(bname(S.book))}</button><span aria-hidden="true">›</span><span>${esc(t('chapter'))} ${esc(S.ch)}</span></div>
 ${trId?`<div class="seg" role="group" aria-label="${esc(t('mTrans'))}">${['orig','both','trans'].map(k=>`<button data-mode="${k}" aria-pressed="${mode===k}">${esc(t(k==='orig'?'mOrig':k==='both'?'mBoth':'mTrans'))}</button>`).join('')}</div>`:''}
 <div class="tools">
  <button id="fsm" aria-label="${esc(t('smaller'))}">A−</button><button id="fsp" aria-label="${esc(t('larger'))}">A+</button>
  ${typeof toolsExtra==='function'?toolsExtra():''}
  <label for="cmp">${esc(t('compare'))}</label><select id="cmp"><option value="">${esc(t('compare'))}</option>${others.map(e=>`<option value="${e}" ${S.cmp===e?'selected':''}>${ED[e]?esc(brName(ED[e].branch))+' · ':''}${esc(edName(e))}</option>`).join('')}</select>
 </div>
 <div class="par ${S.cmp?'two':''}"><section class="reader"><h1 style="margin-top:0">${esc(bname(S.book))} ${esc(S.ch)}</h1>
 ${psN&&psN!=+S.ch?`<p class="note" style="margin-top:-6px">${esc(t('psMap').replace('{n}',psN))}</p>`:''}
 ${trId&&mode!=='orig'?`<p class="note">${esc(t('mTrans'))}: ${esc(TRNAME[trId])}${fb?' · '+esc(t('fbEn')):''}</p>`:''}
 ${main}</section>${cmpHTML}</div>
 <div class="nav"><button id="prev" ${i<=0?'disabled':''}>${esc(t('prev'))}</button><button id="next" ${i>=m.chs.length-1?'disabled':''}>${esc(t('next'))}</button></div>`;
 $('#cb').onclick=()=>go('chapters');
 $('#prev').onclick=()=>go('read',{ch:m.chs[i-1],hl:null});
 $('#next').onclick=()=>go('read',{ch:m.chs[i+1],hl:null});
 view.querySelectorAll('[data-mode]').forEach(x=>x.onclick=()=>{store.set('mode',x.dataset.mode);renderRead()});
 const fs=n=>{let v=Math.min(30,Math.max(15,store.get('fs',20)+n));store.set('fs',v);document.documentElement.style.setProperty('--fs',v+'px')};
 $('#fsm').onclick=()=>fs(-2);$('#fsp').onclick=()=>fs(2);
 $('#cmp').onchange=e=>{S.cmp=e.target.value||null;renderRead()};
 if(typeof bindVerses==='function')bindVerses(b,trId,tb);
 if(S.hl){const el=document.getElementById('v'+S.hl);if(el)el.scrollIntoView({block:'center'})}
}

const norm=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
function renderSearch(){
 const ph={'reina-valera-1909':'pastor','vulgata-clementina':'pastor, lux','ortodoxa-griega':'ποιμαίνει, φῶς','original-hebreo-griego':'φῶς'}[S.ed];
 view.innerHTML=`<h1>${esc(t('search'))}</h1><p class="lead">${esc(t('searchIn'))} ${esc(edName(S.ed))}</p>
 <form id="sf" role="search"><label for="q" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${esc(t('searchLabel'))}</label><input id="q" type="search" placeholder="${esc(t('ex'))} ${esc(ph)}"></form><div id="out" style="margin-top:14px"></div>`;
 const q=$('#q');q.focus();
 $('#sf').onsubmit=async e=>{e.preventDefault();const s=norm(q.value.trim());const out=$('#out');if(s.length<2){out.innerHTML=`<p class="note">${esc(t('min2'))}</p>`;return}
  try{await loadAll(S.ed,(i,n)=>{out.innerHTML=`<div class="pbar small" style="height:10px"><i style="width:${Math.round(i/n*100)}%"></i></div><p class="note">${esc(t('loading'))}</p>`})}catch(err){out.innerHTML=`<p class="note">${esc(t('loadErr'))}</p>`;return}
  const meta=bookMeta(S.ed);const res=[];
  outer:for(const bm of meta.books){const b=(await getChunk(S.ed,bm.f))[bm.c];for(const c of bm.chs){for(const [v,x] of b[c]||[]){if(norm(x).includes(s)){res.push([bm.c,c,v,x]);if(res.length>=150)break outer}}}}
  out.innerHTML=res.length?`<p class="note">${res.length>=150?esc(t('first150')):res.length+' '+esc(t('results'))}</p>`+res.map(r=>`<button class="res" data-r="${r[0]}|${r[1]}|${r[2]}"><b>${esc(bname(r[0]))} ${r[1]}, ${r[2]}</b><span>${esc(r[3])}</span></button>`).join(''):`<p class="note">${esc(t('none'))}</p>`;
  out.querySelectorAll('[data-r]').forEach(x=>x.onclick=()=>{const [bk,c,v]=x.dataset.r.split('|');go('read',{book:bk,ch:c,hl:+v})});
 };
}
