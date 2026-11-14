// ---------- Apartados de Salud: Descanso y sueño, Ayuno, Oración y meditación ----------
for(const l in T12){const a=T12[l].split('|');if(T[l])T12K.forEach((k,i)=>T[l][k]=a[i])}
const TPK=['rest','fast','pray'];
const TPICO={rest:'🌙',fast:'🕯️',pray:'🙏',exer:'🏃',work:'🔨',give:'🤝',speech:'💬',joy:'☀️'};
const HBK=['exer','work','give','speech','joy'];
const hbx=()=>(typeof HBX!=='undefined'&&(HBX[LANG]||HBX.en))||null;
const tpName=k=>TPNAME[k]?t(TPNAME[k]):hbx().names[k];
const TPART={fast:0,rest:1,pray:2}; // artículo original de Salud que sirve de introducción
const TPNAME={rest:'tpRest',fast:'tpFast',pray:'tpPray'};
const tpTx=()=>TPTX[LANG]||TPTX.en;
const tpRead=()=>store.get('tpread',{});
const tpIsRead=(k,i)=>(tpRead()[k]||[]).includes(i);
function tpToggle(k,i){const r=tpRead();const s=new Set(r[k]||[]);s.has(i)?s.delete(i):s.add(i);r[k]=[...s].sort((a,b)=>a-b);store.set('tpread',r);return s.has(i)}
const tpCount=k=>(tpRead()[k]||[]).filter(i=>i<TPREF[k].length).length;
const tpProg=k=>t('tpProg').replace('{r}',tpCount(k)).replace('{n}',TPREF[k].length);
// agrupa las citas por libro, respetando el orden
function tpGroups(refs){const g=[];refs.forEach(([b,c,a,z])=>{const last=g[g.length-1];if(last&&last[0]===b)last[1].push([c,a,z]);else g.push([b,[[c,a,z]]])});return g}
const tpBooks=refs=>[...new Set(refs.map(r=>r[0]))].map(bname).join(' · ');
// El Eclesiástico no se numera igual en todas las ediciones
const TP_SIR={'en-ortho':{31:[34,0],35:[32,0]},'en-dra':{31:[31,4],35:[35,4]}};
async function tpVerses(p){
 const o=TP_SIR;
 for(const id of fEds()){
  if(!fHas(id,p[0]))continue;
  const segs=[];
  for(const [c,a,z] of p[1]){
   let [c1,a1]=mapRef('reina-valera-1909',id,p[0],c,a),[,z1]=mapRef('reina-valera-1909',id,p[0],c,z);
   if(p[0]==='SIR'&&o[id]&&o[id][c]){const [nc,off]=o[id][c];c1=String(nc);a1+=off;z1+=off}
   const bk=await fBook(id,p[0]);
   const vs=bk&&bk.ch[c1]?bk.ch[c1].filter(v=>v[0]>=a1&&v[0]<=z1):[];
   if(vs.length)segs.push({c,a,z,txt:vs.map(v=>v[1]).join(' ')});
  }
  if(segs.length)return {id,segs};
 }
 return null;
}
function tpIntro(k){
 if(HBK.includes(k))return `<p>${esc(hbx().intro[k])}</p>`;
 const i=TPART[k],AL=CX[CL()]?CX[CL()].art.health:null,L=CL()==='es'?0:1,a=ART.health[i];
 return a.b.map((p,j)=>`<p>${esc(AL?AL[i][j+1]:p[L])}</p>`).join('');
}
function tpCardHTML(k){const n=TPREF[k].length,r=tpCount(k);
 return `<button class="card tpcard${r===n?' all':''}" data-tp="${k}"><span class="tpci" aria-hidden="true">${TPICO[k]}</span><span class="tpct"><b>${esc(tpName(k))}</b><small>${esc(t('tpSub').replace('{n}',n))} · ${esc(tpProg(k))}</small><span class="tpbar"><i style="width:${r/n*100}%"></i></span></span><span class="fdgo" aria-hidden="true">›</span></button>`}
function tpItemHTML(k,i){
 const refs=TPREF[k][i],[ti,re]=tpTx()[k][i],done=tpIsRead(k,i),deut=refs.some(r=>F_DEUT.has(r[0]));
 return `<details class="tch${done?' done':''}" data-i="${i}"><summary><span class="tpn">${done?'✓':i+1}</span><span class="tps"><b>${esc(ti)}</b><small>${esc(tpBooks(refs))}${deut?' · '+esc(t('fOC')):''}</small></span><span class="tpchev" aria-hidden="true">›</span></summary>
 <div class="tpbody"><div class="tpv">${tpGroups(refs).map(g=>`<blockquote class="vq"><cite>${esc(fCite([g[0],g[1].map(([c,a,z])=>[c,a,z])]))}</cite></blockquote>`).join('')}</div>
 <div class="tprefl"><b>✦ ${esc(t('tpRefl'))}</b><p>${esc(re)}</p></div>
 <div class="tpact"><button class="btn tpmark${done?' ghost':''}">${done?'✓ '+esc(t('tpDone'))+' · '+esc(t('tpUndo')):esc(t('tpRead'))}</button><button class="btn ghost tpbib">📖 ${esc(t('fRead'))}</button></div></div></details>`;
}
function renderTopic(k){
 if(!TPK.includes(k)&&!HBK.includes(k))return go(S.sec);
 const n=TPREF[k].length;
 view.innerHTML=`<h1><span aria-hidden="true">${TPICO[k]}</span> ${esc(tpName(k))}</h1><div class="lead tpintro">${tpIntro(k)}</div>
 ${k==='fast'?`<aside class="hnote tpnote"><p class="hnb">🤍 ${esc(t('tpFastNote'))}</p></aside>`:''}
 <div class="tphead"><span class="tpbar big"><i style="width:${tpCount(k)/n*100}%"></i></span><span class="tpprog">${esc(tpProg(k))}</span></div>
 <p class="note">${esc(t('tpTap'))}</p>
 <div class="tplist">${TPREF[k].map((_,i)=>tpItemHTML(k,i)).join('')}</div>`;
 const upd=()=>{const r=tpCount(k);view.querySelectorAll('.tphead .tpbar i').forEach(x=>x.style.width=(r/n*100)+'%');view.querySelectorAll('.tpprog').forEach(x=>x.textContent=tpProg(k))};
 view.querySelectorAll('details.tch').forEach(d=>{
  const i=+d.dataset.i,refs=TPREF[k][i];let loaded=false;
  d.addEventListener('toggle',()=>{if(!d.open||loaded)return;loaded=true;
   const box=d.querySelector('.tpv');
   Promise.all(tpGroups(refs).map(g=>tpVerses(g).then(r=>[g,r]))).then(res=>{if(!box.isConnected)return;
    box.innerHTML=res.map(([g,r])=>{if(!r)return `<blockquote class="vq"><cite>${esc(fCite(g))}</cite></blockquote>`;
     const lg=TRLANG[r.id]||(r.id==='ortodoxa-griega'?'el':'en');
     return r.segs.map(s=>`<blockquote class="vq" lang="${lg}"><span>${esc(s.txt)}</span><cite>${esc(bname(g[0]))} ${s.c}, ${s.a===s.z?s.a:s.a+'–'+s.z} · ${esc(TRNAME[r.id]||edName(r.id))}</cite></blockquote>`).join('')}).join('')});
  });
  d.querySelector('.tpmark').onclick=()=>{const on=tpToggle(k,i);
   d.classList.toggle('done',on);d.querySelector('.tpn').textContent=on?'✓':i+1;
   const b=d.querySelector('.tpmark');b.classList.toggle('ghost',on);b.textContent=on?'✓ '+t('tpDone')+' · '+t('tpUndo'):t('tpRead');
   upd();if(on){d.open=false;d.scrollIntoView({block:'nearest',behavior:'smooth'})}};
  d.querySelector('.tpbib').onclick=()=>{const g=tpGroups(refs)[0];fOpenBible([g[0],g[1]])};
 });
 if(S.sec==='health')phosHNote();
 if(k==='exer'){const X=CX[CL()]?CX[CL()].artx:ARTX[CL()];view.insertAdjacentHTML('beforeend',`<p class="note">${esc(X.disc)}</p>`)}
}
const _renderArticlesT=renderArticles;
renderArticles=async function(sec){
 if((sec==='health'||sec==='sport')&&S.view==='topic')return renderTopic(S.topic);
 const r=await _renderArticlesT(sec);
 if(sec==='health'&&S.view==='health'&&!view.querySelector('.tpcard')){
  view.querySelectorAll('article.art').forEach(a=>a.remove());
  const w=document.createElement('div');w.className='tpcards';w.innerHTML=TPK.map(tpCardHTML).join('');
  const anchor=document.getElementById('fdentry')||view.querySelector('.lead');
  if(anchor)anchor.after(w);else view.appendChild(w);
  w.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>go('topic',{topic:b.dataset.tp}));
 }
 return r};
const _setHeaderT=setHeader;
setHeader=function(){_setHeaderT();if((S.sec==='health'||S.sec==='sport')&&S.view==='topic')$('#back').style.visibility='visible'};
const _backT=$('#back').onclick;
$('#back').onclick=()=>{if(S.view==='topic')return go(S.sec);return _backT()};
