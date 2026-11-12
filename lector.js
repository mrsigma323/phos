// Lector de la Biblia de Phos (página biblias.html).
// Ediciones, libros, capítulos, comparar con otra Biblia, buscar, subrayados, marcadores, notas y plan de un año.
// Lo personal (subrayados, notas, plan) se guarda solo en este navegador.
(function(){
const box=document.getElementById('lector');if(!box||typeof LX==='undefined')return;
const $=(s,r=box)=>r.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ST={get(k,d){try{const v=localStorage.getItem('phos.lector.'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('phos.lector.'+k,JSON.stringify(v))}catch(e){}}};
const ED={};LX.eds.forEach(([g,id,n,i])=>ED[id]={g,id,n,i});
const NT=new Set(LX.codes.slice(LX.codes.indexOf('MAT')));
const DEUT=new Set(['TOB','JDT','ESG','WIS','SIR','BAR','EPJ','PRA','SUS','BEL','1MA','2MA','3MA','1ES','4ES','DNG']);
const bname=c=>LX.names[LX.codes.indexOf(c)]||c;
const MEM={};
async function chunk(ed,n){const k=ed+'/'+n;if(!MEM[k])MEM[k]=fetch('data/biblia/'+k+'.json').then(r=>{if(!r.ok)throw 0;return r.json()});return MEM[k]}
function meta(ed){const m=LX.man[ed];if(m._b)return m;m._b=m.b.map(([c,k,f])=>({c,f,chs:typeof k==='number'?Array.from({length:k},(_,i)=>String(i+1)):k.split(',')}));m._m={};m._b.forEach(b=>m._m[b.c]=b);return m}
const ALIAS={'4ES':['EZR'],ESG:['EST'],DNG:['DAN'],EST:['ESG'],DAN:['DNG'],EZR:['4ES']};
function findBook(ed,c){const m=meta(ed);for(const x of [c].concat(ALIAS[c]||[]))if(m._m[x])return m._m[x];return null}
async function chapter(ed,c,ch){const b=findBook(ed,c);if(!b)return null;const d=await chunk(ed,b.f);return (d[b.c]||{})[ch]||null}
function psMap(from,to,c,v){const a=LX.man[from].s,b=LX.man[to].s;if(a===b)return[+c,v];return a==='lxx'?lxx2heb(c,v):heb2lxx(c,v)}
let S=Object.assign({view:'home',ed:'es-blm',book:null,ch:null,cmp:'',tab:'AT',hl:null,q:''},ST.get('pos',{}));
if(!ED[S.ed])S.ed='es-blm';
function go(o){Object.assign(S,o);ST.set('pos',{ed:S.ed,book:S.book,ch:S.ch,cmp:S.cmp});const h=S.view==='read'?`#leer/${S.ed}/${S.book}/${S.ch}`:S.view==='home'?'#lector':'#'+S.view;if(location.hash!==h)history.replaceState(null,'',h);render();box.scrollIntoView({block:'start'})}
const marks=()=>ST.get('marks',{}),saveMarks=m=>ST.set('marks',m),mk=(b,c,v)=>S.ed+'|'+b+'|'+c+'|'+v;
const bar=(title,back)=>`<div class="lx-bar">${back?`<button class="lx-back" data-go="${back}">← Volver</button>`:''}<h3>${title}</h3><div class="lx-tools"><button data-go="search" title="Buscar">🔍 Buscar</button><button data-go="marks" title="Marcadores y notas">🔖 Mis notas</button><button data-go="plan" title="Plan de lectura">📅 Plan</button><button data-night title="Modo noche">${ST.get('night',false)?'☀️':'🌙'}</button></div></div>`;
function edSelect(id,cur,none){let h=`<select id="${id}" class="lx-sel">`+(none?'<option value="">— Sin comparar —</option>':'');let g='';LX.eds.forEach(([gr,e,n])=>{if(gr!==g){h+=(g?'</optgroup>':'')+`<optgroup label="${esc(gr)}">`;g=gr}h+=`<option value="${e}"${e===cur?' selected':''}>${esc(n)}</option>`});return h+'</optgroup></select>'}
function render(){box.classList.toggle('night',ST.get('night',false));({home,books,chapters,read,search,marksV,plan})[S.view==='marks'?'marksV':S.view in {home:1,books:1,chapters:1,read:1,search:1,plan:1}?S.view:'home']();bind()}
function home(){
 const last=ST.get('pos',null);
 let h=bar('Leer la Biblia')+`<p class="lx-lead">Elige una Biblia. Cada Iglesia lee la suya: la ortodoxa usa el Antiguo Testamento griego (Septuaginta), la católica la Vulgata y la protestante el canon hebreo.</p>`;
 if(last&&last.book)h+=`<button class="lx-cont" data-cont>📖 Seguir leyendo: <b>${esc(bname(last.book))} ${esc(last.ch)}</b> · ${esc(ED[last.ed].n)}</button>`;
 let g='';LX.eds.forEach(([gr,e,n,i])=>{if(gr!==g){h+=(g?'</div>':'')+`<h4 class="lx-g">${esc(gr)}</h4><div class="lx-eds">`;g=gr}h+=`<button class="lx-ed" data-ed="${e}"><b>${esc(n)}</b><span>${esc(i)}</span></button>`});
 box.innerHTML=h+'</div>';
}
function books(){
 const m=meta(S.ed),at=m._b.filter(b=>!NT.has(b.c)),nt=m._b.filter(b=>NT.has(b.c)),l=S.tab==='NT'?nt:at;
 box.innerHTML=bar(esc(ED[S.ed].n),'home')+`<div class="lx-tabs"><button data-tab="AT" aria-pressed="${S.tab!=='NT'}">Antiguo Testamento <small>${at.length}</small></button><button data-tab="NT" aria-pressed="${S.tab==='NT'}">Nuevo Testamento <small>${nt.length}</small></button></div>`+
 (l.length?`<div class="lx-books">${l.map(b=>`<button data-b="${b.c}"${DEUT.has(b.c)?' class="deut" title="Deuterocanónico"':''}>${esc(bname(b.c))}</button>`).join('')}</div>`:'<p class="lx-lead">Esta edición no incluye esta parte.</p>')+(l.some(b=>DEUT.has(b.c))?'<p class="lx-small">En dorado, los libros deuterocanónicos (no están en la Biblia protestante).</p>':'');
}
function chapters(){const b=meta(S.ed)._m[S.book];box.innerHTML=bar(esc(bname(S.book)),'books')+`<div class="lx-chs">${b.chs.map(c=>`<button data-c="${c}">${c}</button>`).join('')}</div>`}
async function read(){
 const b=meta(S.ed)._m[S.book];if(!b){go({view:'books'});return}
 box.innerHTML=bar(`${esc(bname(S.book))} ${esc(S.ch)}`,'chapters')+`<div class="lx-cmp"><label>Biblia ${edSelect('lxEd',S.ed)}</label><label>Comparar con ${edSelect('lxCmp',S.cmp,1)}</label></div><div class="lx-text" aria-live="polite">Cargando…</div>`+nav(b);
 bindBar();
 $('#lxEd').onchange=e=>{const ed=e.target.value,nb=findBook(ed,S.book);if(!nb){alert('Esta Biblia no incluye '+bname(S.book)+'.');e.target.value=S.ed;return}const[c]=S.book==='PSA'?psMap(S.ed,ed,S.ch,1):[S.ch];go({ed,book:nb.c,ch:String(Math.min(+c,nb.chs.length)||c)})};
 $('#lxCmp').onchange=e=>go({cmp:e.target.value});
 try{
  const v=await chapter(S.ed,S.book,S.ch);let cm=null;
  if(S.cmp&&S.cmp!==S.ed){const c2=S.book==='PSA'?String(psMap(S.ed,S.cmp,S.ch,1)[0]):S.ch;const raw=await chapter(S.cmp,S.book,c2).catch(()=>null);if(raw){cm={};raw.forEach(([n,t])=>cm[n]=t)}}
  const M=marks();
  $('.lx-text').innerHTML=(v||[]).map(([n,t])=>{const m=M[mk(S.book,S.ch,n)]||{};return `<p class="lx-v${m.c?' hl-'+m.c:''}${S.hl==n?' flash':''}" data-v="${n}" tabindex="0"><sup>${n}</sup>${esc(t)}${m.b?' <span class="lx-ico">🔖</span>':''}${m.n?' <span class="lx-ico" title="'+esc(m.n)+'">📝</span>':''}${cm&&cm[n]?`<span class="lx-par">${esc(cm[n])}</span>`:''}</p>`}).join('')+(S.cmp&&!cm?'<p class="lx-small">La Biblia elegida para comparar no tiene este capítulo.</p>':'')+(v?'':'<p>No se encontró el capítulo.</p>');
  box.querySelectorAll('.lx-v').forEach(p=>{p.onclick=()=>sheet(+p.dataset.v,p);p.onkeydown=e=>{if(e.key==='Enter')sheet(+p.dataset.v,p)}});
  const f=$('.flash');if(f)f.scrollIntoView({block:'center'});
 }catch(e){$('.lx-text').textContent='No se pudo cargar el texto. Revisa tu conexión y vuelve a intentarlo.'}
}
function nav(b){const m=meta(S.ed)._b,i=b.chs.indexOf(S.ch),bi=m.indexOf(b);
 const prev=i>0?[b.c,b.chs[i-1]]:bi>0?[m[bi-1].c,m[bi-1].chs.slice(-1)[0]]:null,next=i<b.chs.length-1?[b.c,b.chs[i+1]]:bi<m.length-1?[m[bi+1].c,m[bi+1].chs[0]]:null;
 return `<div class="lx-nav">${prev?`<button data-to="${prev.join('|')}">← ${esc(bname(prev[0]))} ${prev[1]}</button>`:'<span></span>'}${next?`<button data-to="${next.join('|')}">${esc(bname(next[0]))} ${next[1]} →</button>`:''}</div>`}
function sheet(n,p){
 const k=mk(S.book,S.ch,n),M=marks(),m=M[k]||{},ref=`${bname(S.book)} ${S.ch}, ${n}`;
 const old=document.getElementById('lxSheet');if(old)old.remove();
 const d=document.createElement('div');d.id='lxSheet';d.className='lx-sheet';
 d.innerHTML=`<b>${esc(ref)}</b><div class="lx-sw">${['gold','blue','green'].map(c=>`<button class="sw-${c}" data-col="${c}" aria-pressed="${m.c===c}" aria-label="Subrayar ${c==='gold'?'dorado':c==='blue'?'azul':'verde'}"></button>`).join('')}<button data-col="" aria-label="Quitar subrayado">✕</button></div><div class="lx-sw"><button data-bm>${m.b?'Quitar marcador':'🔖 Marcador'}</button><button data-cp>📋 Copiar</button></div><textarea placeholder="Escribe una nota…" rows="2">${esc(m.n||'')}</textarea><div class="lx-sw"><button data-sv class="pri">Guardar</button><button data-x>Cerrar</button></div>`;
 p.after(d);d.querySelector('textarea').focus({preventScroll:true});
 const save=o=>{const M2=marks(),v=Object.assign({},M2[k]||{},o,{t:Date.now()});if(!v.c&&!v.b&&!v.n)delete M2[k];else M2[k]=v;saveMarks(M2)};
 d.querySelectorAll('[data-col]').forEach(x=>x.onclick=()=>{save({c:x.dataset.col});render()});
 d.querySelector('[data-bm]').onclick=()=>{save({b:!m.b});render()};
 d.querySelector('[data-cp]').onclick=e=>{const t=p.childNodes[1].textContent;navigator.clipboard&&navigator.clipboard.writeText(`«${t}» (${ref}, ${ED[S.ed].n})`).then(()=>e.target.textContent='✓ Copiado')};
 d.querySelector('[data-sv]').onclick=()=>{save({n:d.querySelector('textarea').value.trim()});render()};
 d.querySelector('[data-x]').onclick=()=>d.remove();
}
async function search(){
 box.innerHTML=bar('Buscar en '+esc(ED[S.ed].n),'home')+`<form class="lx-srch"><input type="search" placeholder="Palabra o frase (mín. 3 letras)" value="${esc(S.q)}" aria-label="Buscar en la Biblia"><button class="pri">Buscar</button></form><div class="lx-res"></div>`;bindBar();
 const f=$('.lx-srch');f.onsubmit=e=>{e.preventDefault();S.q=f.querySelector('input').value.trim();doSearch()};if(S.q)doSearch();
}
async function doSearch(){
 const q=S.q,r=$('.lx-res');if(q.length<3){r.innerHTML='<p class="lx-small">Escribe al menos 3 letras.</p>';return}
 const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(),nq=norm(q),out=[];const n=LX.man[S.ed].n;
 r.innerHTML='<p class="lx-small">Buscando…</p>';
 try{for(let i=0;i<n&&out.length<200;i++){const d=await chunk(S.ed,i);for(const b of meta(S.ed)._b.filter(x=>x.f===i))for(const ch of b.chs)for(const[v,t]of(d[b.c]||{})[ch]||[])if(norm(t).includes(nq)&&out.length<200)out.push([b.c,ch,v,t])}}catch(e){r.textContent='No se pudo completar la búsqueda.';return}
 r.innerHTML=`<p class="lx-small">${out.length===200?'Más de 200 resultados; se muestran los 200 primeros.':out.length+' resultados.'}</p>`+out.map(([b,c,v,t])=>`<button class="lx-hit" data-to="${b}|${c}|${v}"><b>${esc(bname(b))} ${c}, ${v}</b> ${esc(t)}</button>`).join('');
 r.querySelectorAll('[data-to]').forEach(x=>x.onclick=()=>{const[b,c,v]=x.dataset.to.split('|');go({view:'read',book:b,ch:c,hl:+v})});
}
function marksV(){
 const M=marks(),a=Object.entries(M).sort((x,y)=>y[1].t-x[1].t);
 box.innerHTML=bar('Marcadores, subrayados y notas','home')+(a.length?a.map(([k,m])=>{const[ed,b,c,v]=k.split('|');return `<button class="lx-hit${m.c?' hl-'+m.c:''}" data-mk="${esc(k)}"><b>${esc(bname(b))} ${c}, ${v}</b> <small>${esc((ED[ed]||{}).n||'')}</small>${m.b?' 🔖':''}${m.n?`<span class="lx-note">📝 ${esc(m.n)}</span>`:''}</button>`}).join(''):'<p class="lx-lead">Aún no tienes marcadores, subrayados ni notas. Abre un capítulo y toca un versículo para añadirlos.</p>')+'<p class="lx-small">Se guardan solo en este navegador.</p>';
 bindBar();box.querySelectorAll('[data-mk]').forEach(x=>x.onclick=()=>{const[ed,b,c,v]=x.dataset.mk.split('|');go({view:'read',ed,book:b,ch:c,hl:+v})});
}
function planDays(ed){const out=[];meta(ed)._b.forEach(b=>b.chs.forEach(c=>out.push([b.c,c])));const per=Math.ceil(out.length/365),d=[];for(let i=0;i<365;i++)d.push(out.slice(i*per,(i+1)*per));return d.filter(x=>x.length)}
const rng=d=>{const a=d[0],z=d[d.length-1];return a[0]===z[0]?`${bname(a[0])} ${a[1]}${z[1]!==a[1]?'–'+z[1]:''}`:`${bname(a[0])} ${a[1]} – ${bname(z[0])} ${z[1]}`};
function plan(){
 const P=ST.get('plan',null);let h=bar('Plan de lectura: la Biblia en un año','home');
 if(!P){h+=`<p class="lx-lead">Unos pocos capítulos al día y en un año habrás leído la Biblia entera. Elige con qué Biblia quieres hacerlo:</p><div class="lx-cmp"><label>Biblia ${edSelect('lxPlanEd',S.ed)}</label></div><button class="lx-cont pri" data-pstart>Empezar el plan</button>`;box.innerHTML=h;bindBar();$('[data-pstart]').onclick=()=>{ST.set('plan',{ed:$('#lxPlanEd').value,day:0,done:[]});plan()};return}
 const D=planDays(P.ed),day=Math.min(P.day,D.length-1),done=new Set(P.done);
 h+=`<p class="lx-lead">Biblia: <b>${esc(ED[P.ed].n)}</b> · Día <b>${day+1}</b> de ${D.length} · ${done.size} días hechos</p><div class="lx-prog"><i style="width:${(done.size/D.length*100).toFixed(1)}%"></i></div>`;
 h+=`<div class="lx-today"><b>Hoy: ${esc(rng(D[day]))}</b><div class="lx-sw">${D[day].map(([b,c])=>`<button data-to="${b}|${c}">${esc(bname(b))} ${c}</button>`).join('')}</div><div class="lx-sw"><button class="pri" data-pdone>${done.has(day)?'✓ Hecho':'Marcar como hecho'}</button>${day>0?'<button data-pmove="-1">← Día anterior</button>':''}${day<D.length-1?'<button data-pmove="1">Día siguiente →</button>':''}</div></div>`;
 h+=`<details class="lx-all"><summary>Ver los ${D.length} días</summary><ol>${D.map((d,i)=>`<li${done.has(i)?' class="done"':''}><button data-pday="${i}">${esc(rng(d))}</button></li>`).join('')}</ol></details><button class="lx-link" data-preset>Reiniciar o cambiar de Biblia</button>`;
 box.innerHTML=h;bindBar();
 const save=o=>{ST.set('plan',Object.assign(ST.get('plan'),o));plan()};
 $('[data-pdone]').onclick=()=>{done.has(day)?done.delete(day):done.add(day);save({done:[...done],day:done.has(day)&&day<D.length-1?day+1:day})};
 box.querySelectorAll('[data-pmove]').forEach(x=>x.onclick=()=>save({day:day+ +x.dataset.pmove}));
 box.querySelectorAll('[data-pday]').forEach(x=>x.onclick=()=>save({day:+x.dataset.pday}));
 box.querySelectorAll('.lx-today [data-to]').forEach(x=>x.onclick=()=>{const[b,c]=x.dataset.to.split('|');go({view:'read',ed:P.ed,book:b,ch:c,hl:null})});
 $('[data-preset]').onclick=()=>{if(confirm('¿Reiniciar el plan? Perderás el progreso.')){ST.set('plan',null);plan()}};
}
function bindBar(){
 box.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>go({view:x.dataset.go}));
 const n=$('[data-night]');if(n)n.onclick=()=>{ST.set('night',!ST.get('night',false));render()};
}
function bind(){
 bindBar();
 box.querySelectorAll('[data-ed]').forEach(x=>x.onclick=()=>go({view:'books',ed:x.dataset.ed,tab:'AT'}));
 box.querySelectorAll('[data-tab]').forEach(x=>x.onclick=()=>{S.tab=x.dataset.tab;render()});
 box.querySelectorAll('[data-b]').forEach(x=>x.onclick=()=>{const b=meta(S.ed)._m[x.dataset.b];b.chs.length===1?go({view:'read',book:b.c,ch:b.chs[0],hl:null}):go({view:'chapters',book:b.c})});
 box.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>go({view:'read',ch:x.dataset.c,hl:null}));
 box.querySelectorAll('.lx-nav [data-to]').forEach(x=>x.onclick=()=>{const[b,c]=x.dataset.to.split('|');go({view:'read',book:b,ch:c,hl:null})});
 const ct=$('[data-cont]');if(ct)ct.onclick=()=>{const l=ST.get('pos');go({view:'read',ed:l.ed,book:l.book,ch:l.ch,hl:null})};
}
// Enlaces directos: biblias.html#leer/es-blm/JOH/3 , #plan , #search , #marks
function fromHash(){const h=location.hash.slice(1).split('/');
 if(h[0]==='leer'&&ED[h[1]]&&meta(h[1])._m[h[2]]){S.view='read';S.ed=h[1];S.book=h[2];S.ch=h[3]||'1'}
 else if(['plan','search','marks'].includes(h[0]))S.view=h[0];else S.view='home';render()}
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#leer')||['#plan','#search','#marks','#lector'].includes(location.hash))fromHash()});
fromHash();
})();
