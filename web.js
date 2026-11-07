(function(){
'use strict';
const $=id=>document.getElementById(id);
const BR='ortodoxa';
const now=new Date();
const TD=utc(now.getFullYear(),now.getMonth()+1,now.getDate());
const DOY=Math.floor((TD-utc(now.getFullYear(),1,1))/DAY);
const FSHORT={o_free:'Sin ayuno',o_strict:'Ayuno estricto',o_wo:'Ayuno con aceite y vino',o_fish:'Se permite pescado',o_dairy:'Semana de los lácteos',o_holyfri:'Viernes Santo'};
const MONTHS=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

// ---- Texto bíblico (Reina-Valera 1909) ----
const chunkCache={};
function chunkOf(b){const e=RV.b.find(x=>x[0]===b);return e?e[2]:null}
function loadChunk(n){if(!chunkCache[n])chunkCache[n]=fetch('biblia/data/reina-valera-1909/'+n+'.json').then(r=>{if(!r.ok)throw 0;return r.json()});return chunkCache[n]}
async function verses(b,c,v1,v2){
 const n=chunkOf(b);if(n==null)return '';
 const d=await loadChunk(n);const ch=(d[b]||{})[c]||[];
 return ch.filter(x=>x[0]>=v1&&x[0]<=v2).map(x=>x[1]).join(' ').replace(/\s+/g,' ').trim();
}
const cite=(b,c,v1,v2)=>`${BN[b]||b} ${c}${v1?','+v1+(v2&&v2!==v1?'-'+v2:''):''}`;
function parseRef(s){const m=/^(\w+) (\d+):(\d+)(?:-(\d+))?$/.exec(s);return m?[m[1],+m[2],+m[3],+(m[4]||m[3])]:null}
function setTxt(id,t){const el=$(id);if(el)el.textContent=t}
const fail=id=>setTxt(id,'No se ha podido cargar el texto. Ábrelo en la app.');

// ---- Hoy ----
function renderToday(){
 const info=dayInfo(BR,TD);
 setTxt('hDate',fmtLong(new Date(TD)));
 setTxt('hFast',(FASTICO[info.f]?FASTICO[info.f]+' ':'')+FSHORT[info.f]);
 setTxt('lSeason',snName(info.s));
 setTxt('cFast',ftText(info.f));
 setTxt('cSeason',snName(info.s));
 const up=upcoming(BR,TD,1)[0];
 if(up){const d=Math.round((up[1]-TD)/DAY);setTxt('cNext',`${evIco(up[0])} ${celName(up[0])} · ${fmtD(new Date(up[1]))} (${d===1?'mañana':'dentro de '+d+' días'})`)}
 setTxt('cHint',snNote(info.s)||tdL().ui[10]);
 // Santoral
 const cel=info.cel.filter(c=>celName(c));
 if(cel.length){setTxt('sIco',evIco(cel[0]));setTxt('sName',celName(cel[0]));
  setTxt('sMore',cel.length>1?'También: '+cel.slice(1).map(celName).join(' · '):snNote(info.s)||'');}
 else{setTxt('sIco','☦️');setTxt('sName',snName(info.s));setTxt('sMore',tdL().ui[3]+(up?' La próxima: '+celName(up[0])+', '+fmtD(new Date(up[1]))+'.':''));}
 document.querySelectorAll('[data-cal]').forEach(b=>{const on=(b.dataset.cal==='1')===tdOld();b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 return info;
}

// ---- Lecturas ----
async function renderReadings(info){
 const ref=parseRef(VOTD[DOY%VOTD.length]);
 if(ref){setTxt('vRef',cite(...ref));try{setTxt('vTxt',await verses(...ref))}catch(e){fail('vTxt')}}
 $('gospelBox').hidden=true;
 const f=FEASTS.find(x=>x[3]&&info.cel.includes(x[0]));
 if(f){const g=f[3];$('gospelBox').hidden=false;setTxt('gRef','Evangelio de la fiesta · '+cite(...g));try{setTxt('gTxt',await verses(...g))}catch(e){fail('gTxt')}}
}

// ---- Reflexión ----
let reflText='';
async function renderReflection(){
 const all=[];for(const k of Object.keys(REFL.tx))REFL.tx[k].forEach((x,i)=>all.push([k,i]));
 const [k,i]=all[DOY%all.length];const [title,body]=REFL.tx[k][i];const refs=REFL.ref[k][i];
 setTxt('rTitle',title);setTxt('rText',body);
 setTxt('rRef',REFL.names[k]+' · '+refs.map(r=>cite(...r)).join('; '));
 reflText=title+'. '+body;
}
function bindReflection(){
 const L=$('rListen'),S=$('rShare');
 if(!('speechSynthesis' in window))L.hidden=true;
 L.onclick=()=>{const ss=speechSynthesis;if(ss.speaking){ss.cancel();L.textContent='Escuchar en audio';return}
  const u=new SpeechSynthesisUtterance(reflText);u.lang='es-ES';u.rate=.95;u.onend=u.onerror=()=>L.textContent='Escuchar en audio';ss.speak(u);L.textContent='Detener';};
 S.onclick=async()=>{const t=reflText+' — '+$('rRef').textContent;
  if(navigator.share){try{await navigator.share({title:'Phos · Reflexión del día',text:t,url:location.href})}catch(e){}return}
  try{await navigator.clipboard.writeText(t+'\n'+location.href);S.textContent='¡Copiado!';setTimeout(()=>S.textContent='Compartir',1800)}catch(e){}};
}

// ---- Oración para este momento ----
async function renderPrayer(){
 const p=prayerFor(BR,now.getHours());
 setTxt('pName',prName(p.k)+' · '+tdL().ui[['tdMorning','tdMidday','tdAfternoon','tdEvening','tdNight'].indexOf(p.per)+12]);
 if(p.ref){try{setTxt('pTxt',await verses(...p.ref))}catch(e){fail('pTxt')}}else setTxt('pTxt',prText(p.k));
}

// ---- Salmo del día ----
async function renderPsalm(){
 const n=DOY%150+1;setTxt('psTitle','Salmo '+n);
 try{const n2=chunkOf('PSA'),d=await loadChunk(n2),ch=d.PSA[n]||[];setTxt('psTxt',ch.slice(0,4).map(x=>x[1]).join(' ')+(ch.length>4?' …':''))}catch(e){fail('psTxt')}
}

// ---- Calendario del mes ----
let cy=now.getFullYear(),cm=now.getMonth(),sel=TD;
function drawCal(){
 const box=$('cal');const first=utc(cy,cm+1,1),days=new Date(Date.UTC(cy,cm+1,0)).getUTCDate();
 const off=(new Date(first).getUTCDay()+6)%7;let h=`<div class="calnav"><button type="button" data-m="-1" aria-label="Mes anterior">‹</button><span class="calm">${capF(MONTHS[cm])} ${cy}</span><button type="button" data-m="1" aria-label="Mes siguiente">›</button></div>`;
 h+='<div class="calgrid wk">'+['lun','mar','mié','jue','vie','sáb','dom'].map(x=>`<span>${x}</span>`).join('')+'</div><div class="calgrid">';
 for(let i=0;i<off;i++)h+='<span class="cd empty"></span>';
 for(let d=1;d<=days;d++){const t=utc(cy,cm+1,d),inf=dayInfo(BR,t),wd=new Date(t).getUTCDay();
  const maj=inf.cel.some(c=>O_MAJ.has(c)),ico=inf.cel.length?evIco(inf.cel.find(c=>O_MAJ.has(c))||inf.cel[0]):(FASTICO[inf.f]||'');
  const cls=['cd','fz-'+inf.f,wd===0?'sun':'',maj?'maj':'',t===TD?'today':'',t===sel?'sel':''].join(' ');
  h+=`<button type="button" class="${cls}" data-d="${t}" aria-label="${d} de ${MONTHS[cm]}: ${FSHORT[inf.f]}${inf.cel.length?', '+inf.cel.map(celName).filter(Boolean).join(', '):''}"><b>${d}</b><i>${ico}</i></button>`}
 h+='</div><div class="calleg">'+[['o_strict','Ayuno estricto'],['o_wo','Aceite y vino'],['o_fish','Pescado'],['o_dairy','Lácteos'],['o_free','Sin ayuno']].map(([k,l])=>`<span><i class="fz-${k}">${FASTICO[k]||''}</i>${l}</span>`).join('')+'<span><i style="border:2px solid #E2C27A"></i>Gran fiesta</span></div>';
 const inf=dayInfo(BR,sel);
 h+=`<div class="calday"><h3>${fmtLong(new Date(sel))}</h3>${inf.cel.length?'<ul>'+inf.cel.map(c=>celName(c)?`<li>${evIco(c)} ${celName(c)}</li>`:'').join('')+'</ul>':''}<p class="small" style="margin:0">${snName(inf.s)}</p><p class="fast">${FASTICO[inf.f]?FASTICO[inf.f]+' ':''}${ftText(inf.f)}</p></div>`;
 box.innerHTML=h;
 box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{cm+=+b.dataset.m;if(cm<0){cm=11;cy--}if(cm>11){cm=0;cy++}sel=utc(cy,cm+1,1);if(cy===now.getFullYear()&&cm===now.getMonth())sel=TD;drawCal()});
 box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{sel=+b.dataset.d;drawCal()});
}

// ---- Oraciones ----
const PRS=[['jesus','La oración del corazón, para repetir en silencio.'],['trisagion','El himno tres veces santo.'],['heavenly','Invocación al Espíritu Santo, al empezar el día.'],['phos','El himno más antiguo de la tarde.'],['ephrem','La oración de la Gran Cuaresma.'],['ourf','La oración que enseñó el Señor (Mt 6, 9-13).'],['nunc','El cántico de Simeón, para la noche (Lc 2, 29-32).'],['subtuum','La plegaria más antigua a la Madre de Dios.']];
function renderPrayers(){
 const box=$('prList');
 box.innerHTML=PRS.map(([k,d])=>`<details class="pr" data-k="${k}"><summary><b>${prName(k)}</b><span>${d}</span></summary><div class="ptx">${PR_BIB[k]?'…':prText(k)}</div></details>`).join('');
 box.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',async()=>{const k=el.dataset.k,r=PR_BIB[k];if(!el.open||!r||el.dataset.done)return;
  const tx=el.querySelector('.ptx');try{let v=await verses(...r);if(k==='ourf')v=v.replace(/^.*?(Padre nuestro)/,'$1');tx.textContent=v;const c=document.createElement('cite');c.textContent=cite(...r);tx.append(c);el.dataset.done=1}catch(e){tx.textContent='No se ha podido cargar el texto.'}}));
}

function all(){const info=renderToday();renderReadings(info);renderPrayer();drawCal()}
document.querySelectorAll('[data-cal]').forEach(b=>b.onclick=()=>{store.set('oldCal',b.dataset.cal==='1');all()});
all();renderReflection();bindReflection();renderPsalm();renderPrayers();
})();
