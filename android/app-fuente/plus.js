// ---------- Phos «plus»: portada Hoy, racha, compartir, Mi Phos, voz alta y cuenta ----------
const API_BASE='https://phosbiblias.com/api/';
const prem2=()=>typeof isPremium!=='function'||!IN_APP||isPremium();

// ===== Navegación: «Retos bíblicos» después de Aprender y «Mi Phos» al final =====
(function(){const at=SECS.indexOf('learn')+1;SECS.splice(at,0,'retos');SECS.push('mine');
 for(const l in NAV){const q=QX[l]||QX.en;NAV[l].splice(at,0,q.retos);NAV[l].push(q.mine)}
 MENU_ICO.retos='🧩';MENU_ICO.mine='👤'})();
const _renderArticlesP=renderArticles;
renderArticles=async function(sec){if(sec==='retos')return renderRetos();if(sec==='mine')return renderMine();return _renderArticlesP(sec)};
const _setHeaderP=setHeader;
const fitBrand=()=>{const d=document.querySelector('.brand>div');if(!d)return;d.style.display='';const b=d.querySelector('b');if(b&&b.scrollWidth>b.clientWidth+1)d.style.display='none'};
addEventListener('resize',fitBrand);
setHeader=function(){_setHeaderP();setTimeout(fitBrand,0);if((S.sec==='retos'||S.sec==='mine')&&S.view!==S.sec)$('#back').style.visibility='visible'};
const _phosBackP=window.phosBack;
window.phosBack=()=>{if(_phosBackP&&_phosBackP())return true;
 if((S.sec==='retos'||S.sec==='mine')&&S.view!==S.sec){go(S.sec);return true}
 if(S.sec!=='today'){$('#back').style.visibility==='visible'?$('#back').click():go('today',{sec:'today'});return true}return false};

// ===== Racha diaria =====
(function(){const k=todayKey(),v=store.get('visits',{last:null,streak:0,best:0});if(v.last===k)return;
 const y=new Date();y.setDate(y.getDate()-1);const yk=y.getFullYear()+'-'+String(y.getMonth()+1).padStart(2,'0')+'-'+String(y.getDate()).padStart(2,'0');
 v.gap=v.last?Math.round((new Date(k)-new Date(v.last))/864e5):0;v.streak=v.last===yk?v.streak+1:1;v.best=Math.max(v.best||0,v.streak);v.last=k;store.set('visits',v);
 if([7,30,50,100,200,365,500,1000].includes(v.streak))setTimeout(()=>toast(qt('mile',{n:v.streak})),1200)})();
const streakN=()=>store.get('visits',{streak:1}).streak||1;

// ===== Compartir =====
function shareText(txt){
 if(window.PhosApp&&PhosApp.shareText){try{return PhosApp.shareText(txt)}catch(e){}}
 if(navigator.share)return navigator.share({text:txt}).catch(()=>{});
 try{navigator.clipboard.writeText(txt);toast('✓')}catch(e){}
}
async function shareImage(dataUrl,txt,name){
 if(window.PhosApp&&PhosApp.shareImage){try{return PhosApp.shareImage(dataUrl.split(',')[1],txt||'')}catch(e){}}
 try{const blob=await (await fetch(dataUrl)).blob();const f=new File([blob],(name||'phos')+'.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]}))return await navigator.share({files:[f],text:txt||''})}catch(e){}
 const a=document.createElement('a');a.href=dataUrl;a.download=(name||'phos')+'.png';document.body.appendChild(a);a.click();a.remove();
}
// Colores por tiempo litúrgico
const LITCOL={tdViolet:['#2E1745','#6B3FA0','#E9DDF7'],tdWhite:['#4A1416','#B8913F','#FFF6E0'],tdGreen:['#16341A','#3F7A3A','#E3F2DC'],tdRed:['#4C0D0B','#B3261E','#FCE3DE'],wine:['#2A0B0C','#7A2A2C','#F6F1E7'],night:['#0E1530','#2C3E7A','#E6EBFF'],gold:['#5A3E10','#E2C27A','#2A1B06']};
function wrapLines(ctx,txt,maxW){const out=[];let line='';for(const w of txt.split(' ')){const tr=line?line+' '+w:w;if(ctx.measureText(tr).width>maxW&&line){out.push(line);line=w}else line=tr}if(line)out.push(line);return out}
async function cardImage({w=1080,h=1350,col='wine',top='',verse='',ref='',date=''}){
 try{await Promise.all([document.fonts.load('600 60px "Cormorant Garamond"'),document.fonts.load('500 30px Inter')])}catch(e){}
 const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');const [c0,c1,ink]=LITCOL[col]||LITCOL.wine;
 const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,c0);g.addColorStop(1,c1);x.fillStyle=g;x.fillRect(0,0,w,h);
 // halo de luz y cruz suave
 const rg=x.createRadialGradient(w*.5,h*.28,10,w*.5,h*.28,w*.7);rg.addColorStop(0,'rgba(255,240,200,.28)');rg.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=rg;x.fillRect(0,0,w,h);
 x.strokeStyle='rgba(226,194,122,.18)';x.lineWidth=w*.012;x.lineCap='round';const cx=w*.5,cy=h*.2,s=h*.07;
 x.beginPath();x.moveTo(cx,cy-s*1.6);x.lineTo(cx,cy+s*1.6);x.moveTo(cx-s*.5,cy-s*1.05);x.lineTo(cx+s*.5,cy-s*1.05);x.moveTo(cx-s,cy-s*.45);x.lineTo(cx+s,cy-s*.45);x.moveTo(cx-s*.6,cy+s*.75);x.lineTo(cx+s*.6,cy+s*.35);x.stroke();
 x.textAlign='center';x.fillStyle=ink;const serif='"Cormorant Garamond", "Noto Serif", Georgia, serif',sans='Inter, "Noto Sans", Arial, sans-serif';
 x.font=`600 ${Math.round(w*.03)}px ${sans}`;x.globalAlpha=.85;x.fillText(date.toUpperCase(),w/2,h*.36);if(top){x.font=`600 ${Math.round(w*.036)}px ${sans}`;x.fillText(top,w/2,h*.36+w*.055)}x.globalAlpha=1;
 let fs=Math.round(w*(h/w>1.6?.085:.07));x.font=`600 ${fs}px ${serif}`;let lines=wrapLines(x,'«'+verse+'»',w*.8);
 while(lines.length*fs*1.25>h*.38&&fs>w*.035){fs-=2;x.font=`600 ${fs}px ${serif}`;lines=wrapLines(x,'«'+verse+'»',w*.8)}
 let y=h*.5-((lines.length-1)*fs*1.25)/2+fs*.3;if(y<h*.45)y=h*.45;lines.forEach(l=>{x.fillText(l,w/2,y);y+=fs*1.25});
 x.font=`700 ${Math.round(w*.034)}px ${sans}`;x.fillStyle=LITCOL.gold[1];x.fillText(ref,w/2,y+fs*.5);
 x.fillStyle=ink;x.globalAlpha=.8;x.font=`600 ${Math.round(w*.05)}px ${serif}`;x.fillText('Phos',w/2,h-h*.075);x.font=`500 ${Math.round(w*.024)}px ${sans}`;x.fillText('phosbiblias.com',w/2,h-h*.045);x.globalAlpha=1;
 return c.toDataURL('image/png');
}
async function todayCardData(){
 const now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),br=tdBr(),info=dayInfo(br,td);
 const ref=VOTD[dayIdx()%VOTD.length];const v=await vText(ref);
 const cel=info.cel.map(celName).filter(Boolean),sts=LANG==='es'?daySaints(br,td):[];
 return {col:info.color||'wine',top:cel[0]||sts[0]||snName(info.s),verse:v?v.txt:'',ref:v?v.ref:ref,date:fmtLong(new Date(td))};
}

// ===== Portada «Hoy» =====
const _renderTodayP=renderToday;
renderToday=function(){
 _renderTodayP();
 const now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),br=tdBr(),info=dayInfo(br,td);
 const ref=VOTD[dayIdx()%VOTD.length];const [vb,cv]=ref.split(' ');const [vc,vv]=cv.split(':');
 const cel=info.cel.map(celName).filter(Boolean),sts=LANG==='es'?daySaints(br,td):[],top=cel[0]||sts[0]||'';
 const [c0,c1]=LITCOL[info.color]||LITCOL.wine;
 const old=$('#votd');if(!old)return;
 const hero=document.createElement('section');hero.className='hero';hero.id='votd';hero.style.background=`radial-gradient(120% 80% at 50% 0%,rgba(255,236,190,.25),transparent 60%),linear-gradient(160deg,${c0},${c1})`;
 hero.innerHTML=`<div class="hdate">${esc(fmtLong(new Date(td)))}</div>
  <div class="hseason"><span class="hdot" style="background:${COLHEX[info.color]||'#E2C27A'}"></span>${esc(snName(info.s))}</div>
  ${top?`<div class="htop">${esc(top)}</div>`:''}
  <blockquote class="hverse"><span id="votdTxt">…</span><cite>${esc(bname(vb))} ${vc}, ${vv}</cite></blockquote>
  <div class="hfoot"><span class="hstreak">${streakN()>1?'🔥 '+esc(qt('streak',{n:streakN()})):''}</span>
  <span class="hbtns"><button class="hbtn" id="hShare" aria-label="${esc(qt('share'))}">↗ ${esc(qt('share'))}</button></span></div>`;
 old.replaceWith(hero);
 const head=view.querySelector('.tdhead');if(head){head.classList.add('compact');const dd=head.querySelector('.tddate');if(dd)dd.remove()}
 $('#hShare').onclick=async e=>{e.stopPropagation();const d=await todayCardData();shareImage(await cardImage(d),qt('shareText')+' · phosbiblias.com','phos-hoy')};
};

// ===== Voz alta: escuchar el capítulo (Phos Premium) =====
const AUD={on:false,auto:false,rows:[],timer:null,until:0};
window.PhosTTS={onVerse(i){const r=AUD.rows[i];view.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));if(r){r.classList.add('speaking');r.scrollIntoView({block:'center',behavior:'smooth'})}},
 onEnd(){if(!AUD.on)return;const nx=$('#next');if(nx&&!nx.disabled&&(!AUD.until||Date.now()<AUD.until)){AUD.auto=true;nx.click()}else audStop()}};
function audRows(){const box=view.querySelector('.reader')||view;return [...box.querySelectorAll('[data-v]')].filter(r=>!r.closest('.reader+.reader'))}
function audStart(){
 if(!prem2())return paywallCard();
 AUD.rows=audRows();const parts=AUD.rows.map(r=>{const el=r.querySelector('.tr')||r;const cl=el.cloneNode(true);cl.querySelectorAll('sup').forEach(s=>s.remove());return cl.textContent.trim()});
 const lang=(AUD.rows[0]&&((AUD.rows[0].querySelector('.tr')||AUD.rows[0]).closest('[lang]')||{}).lang)||LANG;
 AUD.on=true;drawListen();
 if(window.PhosApp&&PhosApp.speakSeq){PhosApp.speakSeq(JSON.stringify(parts),lang);return}
 if(window.speechSynthesis){speechSynthesis.cancel();parts.forEach((p,i)=>{const u=new SpeechSynthesisUtterance(p);u.lang=lang;u.rate=.95;u.onstart=()=>PhosTTS.onVerse(i);if(i===parts.length-1)u.onend=()=>PhosTTS.onEnd();speechSynthesis.speak(u)})}
}
function audStop(){AUD.on=false;AUD.auto=false;AUD.until=0;clearTimeout(AUD.timer);try{if(window.PhosApp)PhosApp.stop();if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}
 view.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));drawListen()}
function drawListen(){
 let bar=$('#listenBar');if(S.view!=='read'||S.sec!=='bible'){if(bar)bar.remove();return}
 if(!bar){bar=document.createElement('div');bar.id='listenBar';bar.className='listenbar';document.body.appendChild(bar)}
 bar.innerHTML=AUD.on?`<button class="lbtn on" id="lStop">⏹ ${esc(qt('stop'))}</button><select id="lSleep" aria-label="${esc(qt('sleep'))}"><option value="0">${esc(qt('noSleep'))}</option>${[15,30,60].map(m=>`<option value="${m}" ${AUD.until&&Math.round((AUD.until-Date.now())/6e4)<=m&&Math.round((AUD.until-Date.now())/6e4)>m-15?'selected':''}>${esc(qt('sleep'))} ${esc(qt('min',{n:m}))}</option>`).join('')}</select>`
  :`<button class="lbtn" id="lPlay">🔊 ${esc(qt('listen'))}${!prem2()?' · 👑':''}</button>`;
 const p=$('#lPlay');if(p)p.onclick=audStart;const s=$('#lStop');if(s)s.onclick=audStop;
 const sl=$('#lSleep');if(sl)sl.onchange=()=>{const m=+sl.value;clearTimeout(AUD.timer);AUD.until=m?Date.now()+m*6e4:0;if(m)AUD.timer=setTimeout(audStop,m*6e4)};
}

// ===== Mi Phos =====
function renderMine(){
 const v=S.view;const gate=f=>prem2()?f():paywallCard();
 if(v==='m_plans')return gate(drawPlans);if(v==='m_plan')return gate(drawPlan);if(v==='m_rule')return gate(drawRule);
 if(v==='m_diary')return gate(drawDiary);if(v==='m_walls')return gate(drawWalls);if(v==='m_account')return drawAccount();
 const a=store.get('acct',null),vs=store.get('visits',{streak:1,best:1});
 const item=(id,ico,k,lead,lock)=>`<button class="card rcard" data-m="${id}"><div class="t"><span class="rico">${ico}</span>${esc(qt(k))}${lock&&!prem2()?'<span class="pill">👑 Premium</span>':''}</div><div class="s">${esc(lead)}</div></button>`;
 view.innerHTML=`<h1>${esc(qt('mine'))}</h1><p class="lead">${esc(qt('mineLead'))}</p>
 <div class="streakbox"><div class="sbig">🔥 ${vs.streak}</div><div><b>${vs.streak>1?esc(qt('streak',{n:vs.streak})):esc(qt('mine'))}</b>${(vs.best||0)>1?`<div class="note">${esc(qt('best',{n:vs.best}))}</div>`:''}</div></div>
 ${item('m_account','👤','account',a?qt('signed',{e:a.email}):qt('googleLead'),0)}
 ${item('m_plans','📖','plans',qt('plansLead'),1)}${item('m_rule','🕯️','rule',qt('ruleLead'),1)}${item('m_diary','✍️','diary',qt('diaryLead'),1)}
 ${item('m_walls','🖼️','walls',qt('wallsLead'),1)}
 <button class="card rcard" data-p="notif"><div class="t"><span class="rico">🔔</span>${esc(pt('reminders'))}<span class="pill">${esc(prem2()?'✓':mx('freeTag'))}</span></div><div class="s">${esc(prem2()?pt('remLead'):mx('remFree'))}</div></button>
 <div class="card rcard"><div class="t"><span class="rico">📱</span>${esc(qt('widget'))}<span class="pill">${esc(mx('freeTag'))}</span></div><div class="s">${esc(mx('widgetLead'))}</div></div>
 <button class="card main rcard" data-p="premium"><div class="t"><span class="rico">👑</span>${esc(pt('prem'))}</div><div class="s">${esc(isPremium&&IN_APP&&isPremium()?pt('active'):pt('premLead'))}</div></button>
 <button class="card rcard" data-p="apoyo"><div class="t"><span class="rico">🙏</span>${esc(pt('support'))}</div><div class="s">${esc(pt('supportLead'))}</div></button>`;
 view.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>go(b.dataset.m));
 view.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>openP(b.dataset.p));
}

// ---- Planes de lectura ----
const planEd=()=>({ortodoxa:'ortodoxa-griega',catolica:'vulgata-clementina',protestante:'reina-valera-1909'})[tdBr()];
const PLANS=['year','gospels','psalms','advent','lent'],PLAN_K={year:'pYear',gospels:'pGospels',psalms:'pPsalms',advent:'pAdvent',lent:'pLent'};
const planName=id=>{const n=qt(PLAN_K[id]);return id==='advent'&&tdBr()==='ortodoxa'?n.split(/:\s*/).pop():n};
function chsOf(ed,c){const m=bookMeta(ed).map[c];return m?m.chs.map(String):[]}
function psa(ed,n){try{return String(mapRef('reina-valera-1909',ed,'PSA',String(n),1)[0])}catch(e){return String(n)}}
function split(list,n){const out=[];for(let d=0;d<n;d++)out.push(list.slice(Math.floor(d*list.length/n),Math.floor((d+1)*list.length/n)));return out.filter(x=>x.length)}
function planDays(id){
 const ed=planEd();const all=c=>chsOf(ed,c).map(ch=>[c,ch]);
 if(id==='year')return split(bookMeta(ed).books.flatMap(b=>all(b.c)),365);
 if(id==='gospels')return split(['MAT','MRK','LUK','JOH'].flatMap(all),40);
 if(id==='psalms')return split(all('PSA'),30);
 if(id==='advent')return [...Array(20)].map((_,k)=>[['ISA',String(40+k)]]).concat([[['MAT','1']],[['LUK','1']],[['JOH','1']],[['LUK','2']]]);
 if(id==='lent')return [[['PSA',psa(ed,51)]]].concat(all('MRK').map(x=>[x]),[15,16,17,18,19,20,21].map(n=>[['LUK',String(n)]]),[6,32,38,102,130,143].map(n=>[['PSA',psa(ed,n)]]),[12,13,14,15,16,17,18,19,20,21].map(n=>[['JOH',String(n)]]));
 return [];
}
const planSt=()=>store.get('plans',{});
const dayLabel=d=>{const g=[];d.forEach(([c,ch])=>{const l=g[g.length-1];if(l&&l.c===c)l.z=ch;else g.push({c,a:ch,z:ch})});return g.map(x=>bname(x.c)+' '+x.a+(x.z!==x.a?'–'+x.z:'')).join(' · ')};
function planToday(id){const days=planDays(id),st=planSt()[id]||{done:[]};const i=days.findIndex((d,k)=>!st.done.includes(k));return {days,i,st}}
window.planTodayText=()=>{const a=store.get('planActive',null);if(!a)return '';const {days,i}=planToday(a);return i>=0?qt('todayRead')+': '+dayLabel(days[i]):''};
function drawPlans(){
 const st=planSt();
 view.innerHTML=`<h1>📖 ${esc(qt('plans'))}</h1><p class="lead">${esc(qt('plansLead'))}</p>${PLANS.map(id=>{const n=planDays(id).length,d=(st[id]&&st[id].done.length)||0,p=Math.round(d/n*100);
  return `<button class="card rcard" data-plan="${id}"><div class="t">${esc(planName(id))}${d?`<span class="pill">${p}%</span>`:''}</div><div class="s">${esc(qt('day',{n:Math.min(d+1,n),t:n})+' · '+dayLabel(planDays(id)[Math.min(d,n-1)]))}</div>${d?`<div class="pbar" style="margin-top:8px"><i style="width:${p}%"></i></div>`:''}</button>`}).join('')}`;
 view.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{S.plan=b.dataset.plan;go('m_plan')});
}
function drawPlan(){
 const id=S.plan||store.get('planActive','gospels');const {days,i,st}=planToday(id);const ed=planEd();
 if(i<0){view.innerHTML=`<div class="lcard" style="text-align:center"><div style="font-size:48px">🎉</div><h1>${esc(qt('finished'))}</h1><p class="lead">${esc(qt(PLAN_K[id]))}</p><button class="btn" id="pRe" style="width:100%">${esc(qt('restart'))}</button></div>`;
  $('#pRe').onclick=()=>{const s=planSt();s[id]={done:[]};store.set('plans',s);drawPlan()};return}
 view.innerHTML=`<h1>${esc(planName(id))}</h1><p class="note">${esc(qt('day',{n:i+1,t:days.length}))}</p>
 <div class="pbar"><i style="width:${Math.round(st.done.length/days.length*100)}%"></i></div>
 <div class="card main"><div class="t">${esc(qt('todayRead'))}</div><div class="edlist">${days[i].map(([c,ch])=>`<button class="ed" data-c="${c}" data-ch="${ch}"><b>${esc(bname(c))} ${esc(ch)}</b></button>`).join('')}</div>
 <button class="btn" id="pDone" style="width:100%;margin-top:12px;background:var(--gold);color:var(--wine)">✓ ${esc(qt('done'))}</button></div>
 <h2>${esc(qt('next'))}</h2><ul class="tdnext">${days.slice(i+1,i+6).map((d,k)=>`<li><b>${esc(qt('day',{n:i+2+k,t:days.length}))}</b><span>${esc(dayLabel(d))}</span></li>`).join('')}</ul>`;
 view.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>go('read',{sec:'bible',ed,book:b.dataset.c,ch:b.dataset.ch,hl:null}));
 $('#pDone').onclick=()=>{const s=planSt();s[id]=s[id]||{done:[]};s[id].done.push(i);store.set('plans',s);store.set('planActive',id);
  if(typeof scheduleReminders==='function')scheduleReminders();drawPlan();window.scrollTo(0,0)};
 store.set('planActive',id);
}

// ---- Regla de oración ----
// Padrenuestro: texto litúrgico tradicional (dominio público) para ortodoxos y católicos
const OURF={es:"Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.",
en:"Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
pt:"Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
fr:"Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd’hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
it:"Padre nostro, che sei nei cieli, sia santificato il tuo nome, venga il tuo regno, sia fatta la tua volontà, come in cielo così in terra. Dacci oggi il nostro pane quotidiano, e rimetti a noi i nostri debiti come anche noi li rimettiamo ai nostri debitori, e non abbandonarci alla tentazione, ma liberaci dal male. Amen.",
de:"Vater unser im Himmel, geheiligt werde dein Name. Dein Reich komme. Dein Wille geschehe, wie im Himmel, so auf Erden. Unser tägliches Brot gib uns heute. Und vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern. Und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Amen.",
el:"Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου, ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς. Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον· καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν· καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.",
ru:"Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго.",
ro:"Tatăl nostru, Care eşti în ceruri, sfinţească-Se numele Tău, vie împărăţia Ta, facă-se voia Ta, precum în cer aşa şi pe pământ. Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi şi ne iartă nouă greşelile noastre, precum şi noi iertăm greşiţilor noştri. Şi nu ne duce pe noi în ispită, ci ne izbăveşte de cel rău."};
const RULE={ortodoxa:{m:['heavenly','trisagion','ourf','jesus'],e:['phos','trisagion','ourf','nunc','jesus']},
 catolica:{m:['ourf','ave','angelus'],e:['magn','ourf','ave','subtuum']},
 protestante:{m:[['PSA',143,8,8],'ourf'],e:[['PSA',4,8,8],['PSA',141,2,2],'ourf']}};
function drawRule(){
 const br=tdBr(),h=new Date().getHours();S.rt=S.rt||(h>=4&&h<14?'m':'e');S.ri=S.ri||0;
 const list=RULE[br][S.rt],k=list[S.ri],last=S.ri>=list.length-1;
 const title=Array.isArray(k)?bname(k[0])+' '+k[1]:prName(k);
 view.innerHTML=`<h1>🕯️ ${esc(qt('rule'))}</h1>
 <div class="seg" role="group">${['m','e'].map(x=>`<button data-rt="${x}" aria-pressed="${S.rt===x}">${esc(qt(x==='m'?'morning':'evening'))}</button>`).join('')}</div>
 <div class="rdots">${list.map((x,j)=>`<i class="${j<=S.ri?'on':''}"></i>`).join('')}</div>
 <div class="lcard"><h2 style="margin-top:0">${esc(title)}</h2><div id="rTxt"><blockquote class="vq tdprayer"><span>…</span></blockquote></div>
 <button class="btn" id="rNext" style="width:100%;margin-top:14px">${esc(last?qt('amen'):qt('next'))}</button></div>`;
 view.querySelectorAll('[data-rt]').forEach(b=>b.onclick=()=>{S.rt=b.dataset.rt;S.ri=0;drawRule()});
 $('#rNext').onclick=()=>{if(last){S.ri=0;toast('🙏 '+qt('amen'));go('mine')}else{S.ri++;drawRule();window.scrollTo(0,0)}};
 // Ortodoxos y católicos rezan el texto tradicional de la oración; los protestantes, el texto bíblico
 let trad='';try{trad=Array.isArray(k)?'':(k==='ourf'?(OURF[LANG]||OURF.en):(prText(k)||''))}catch(e){}
 const ref=Array.isArray(k)?k:(br!=='protestante'&&trad?null:(PR_BIB[k]||null));
 if(!ref){$('#rTxt').innerHTML=`<blockquote class="vq tdprayer"><span>${esc(trad)}</span></blockquote>`;return}
 const [b,c,a,z]=ref;fVerses([b,[[c,a,z]]]).then(r=>{const box=$('#rTxt');if(!box)return;if(!r){box.innerHTML=`<blockquote class="vq tdprayer"><span>${esc(prText(k)||'')}</span></blockquote>`;return}
  box.innerHTML=r.segs.map(s=>`<blockquote class="vq tdprayer"><span>${esc(s.txt)}</span><cite>${esc(bname(b))} ${s.c}, ${s.a}${s.z!==s.a?'–'+s.z:''}</cite></blockquote>`).join('')});
}

// ---- Diario espiritual ----
function drawDiary(){
 const L=store.get('diary',[]);S.dk=S.dk||'kIntent';
 const fmt=ts=>{try{return new Intl.DateTimeFormat(LANG,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(ts))}catch(e){return ''}};
 const ico={kIntent:'🙏',kGrace:'✨',kNote:'📖'};
 view.innerHTML=`<h1>✍️ ${esc(qt('diary'))}</h1><p class="lead">${esc(qt('diaryLead'))}</p>
 <div class="tdchips">${['kIntent','kGrace','kNote'].map(k=>`<button class="chip${S.dk===k?' on':''}" data-dk="${k}">${ico[k]} ${esc(qt(k))}</button>`).join('')}</div>
 <textarea id="dTxt" class="dtxt" rows="4" placeholder="${esc(qt('write'))}"></textarea><button class="btn" id="dAdd" style="width:100%;margin-top:8px">${esc(qt('add'))}</button>
 <div class="dlist">${L.length?L.slice().reverse().map(e=>`<div class="dent"><div class="note">${ico[e.k]||'•'} ${esc(qt(e.k))} · ${esc(fmt(e.ts))}</div><p>${esc(e.txt)}</p><button class="linkbtn" data-del="${e.id}">${esc(qt('del'))}</button></div>`).join(''):`<p class="note">${esc(qt('empty'))}</p>`}</div>`;
 view.querySelectorAll('[data-dk]').forEach(b=>b.onclick=()=>{S.dk=b.dataset.dk;view.querySelectorAll('[data-dk]').forEach(x=>x.classList.toggle('on',x===b))});
 $('#dAdd').onclick=()=>{const v=$('#dTxt').value.trim();if(!v)return;const L2=store.get('diary',[]);L2.push({id:Date.now().toString(36),ts:Date.now(),k:S.dk,txt:v.slice(0,4000)});store.set('diary',L2);drawDiary()};
 view.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(b.dataset.sure){store.set('diary',store.get('diary',[]).filter(e=>e.id!==b.dataset.del));drawDiary()}else{b.dataset.sure='1';b.textContent='✓ '+qt('del')+'?'}});
}

// ---- Fondos de pantalla ----
async function drawWalls(){
 view.innerHTML=`<h1>🖼️ ${esc(qt('walls'))}</h1><p class="lead">${esc(qt('wallsLead'))}</p><div class="loading">${esc(t('loading'))}</div>`;
 const d=await todayCardData();const cols=[d.col,'wine','night','gold'].filter((x,k,a)=>a.indexOf(x)===k);
 const imgs=await Promise.all(cols.map(col=>cardImage(Object.assign({},d,{col,w:540,h:1170}))));
 view.innerHTML=`<h1>🖼️ ${esc(qt('walls'))}</h1><p class="lead">${esc(qt('wallsLead'))}</p><div class="walls">${imgs.map((src,k)=>`<figure><img src="${src}" alt="${esc(qt('walls'))} ${k+1}"><figcaption>
  ${window.PhosApp&&PhosApp.setWallpaper?`<button class="btn" data-set="${k}">📱</button>`:''}<button class="btn ghost" data-sh="${k}">↗</button></figcaption></figure>`).join('')}</div>`;
 const full=k=>cardImage(Object.assign({},d,{col:cols[k],w:1080,h:2340}));
 view.querySelectorAll('[data-sh]').forEach(b=>b.onclick=async()=>shareImage(await full(+b.dataset.sh),'phosbiblias.com','phos-fondo'));
 view.querySelectorAll('[data-set]').forEach(b=>b.onclick=async()=>{const u=await full(+b.dataset.set);try{PhosApp.setWallpaper(u.split(',')[1]);toast('✓')}catch(e){}});
}

// ---- Widget: se le pasan los próximos 14 días ----
async function feedWidget(){
 if(!(window.PhosApp&&PhosApp.widgetSet))return;
 const out=[],br=tdBr();
 for(let i=0;i<14;i++){const d=new Date();d.setDate(d.getDate()+i);const td=utc(d.getFullYear(),d.getMonth()+1,d.getDate());
  let top='';try{const info=dayInfo(br,td);top=info.cel.map(celName).filter(Boolean)[0]||(LANG==='es'?daySaints(br,td)[0]:'')||snName(info.s)}catch(e){}
  const di=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);const v=await vText(VOTD[di%VOTD.length]);
  out.push({d:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),t:top,b:v?'«'+v.txt+'» — '+v.ref:''})}
 try{PhosApp.widgetSet(JSON.stringify(out))}catch(e){}
}

// ===== Cuenta: entrar con Google y sincronizar =====
const SYNC_SKIP=new Set(['_ts','acct','premium','lang']);
const _storeSet=store.set.bind(store);
store.set=function(k,v){_storeSet(k,v);if(k==='_ts'||SYNC_SKIP.has(k))return;try{const ts=JSON.parse(localStorage.getItem('phos:_ts')||'{}');ts[k]=Date.now();localStorage.setItem('phos:_ts',JSON.stringify(ts))}catch(e){}SYNC_DIRTY()};
let _syncT=null;const SYNC_DIRTY=()=>{const a=store.get('acct',null);if(!a||!a.consent)return;clearTimeout(_syncT);_syncT=setTimeout(()=>syncNow(true),8000)};
async function api(path,body){const a=store.get('acct',null);
 const r=await fetch(API_BASE+path,{method:'POST',headers:Object.assign({'Content-Type':'application/json','X-Phos':'1'},a&&a.token?{Authorization:'Bearer '+a.token}:{}),body:JSON.stringify(body||{})});
 const j=await r.json().catch(()=>({ok:false,error:'HTTP '+r.status}));if(r.status===401){store.set('acct',null)}return j}
async function syncNow(quiet){
 const a=store.get('acct',null);if(!a)return;if(!a.consent){if(!quiet)toast(qt('consentNeed'));return}
 const ts=JSON.parse(localStorage.getItem('phos:_ts')||'{}'),data={};
 for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k.startsWith('phos:'))continue;const kk=k.slice(5);if(SYNC_SKIP.has(kk))continue;data[kk]={v:localStorage.getItem(k),ts:ts[kk]||0}}
 try{const j=await api('app-sync.php',{consent:true,data});if(!j.ok)throw new Error(j.error);
  const nts=JSON.parse(localStorage.getItem('phos:_ts')||'{}');
  for(const k in j.data){const x=j.data[k];if(!data[k]||x.ts>(data[k].ts||0)){localStorage.setItem('phos:'+k,x.v);nts[k]=x.ts}}
  localStorage.setItem('phos:_ts',JSON.stringify(nts));const a2=store.get('acct',null);if(a2){a2.last=Date.now();_storeSet('acct',a2)}
  if(!quiet){toast(qt('synced'));render()}}catch(e){if(!quiet)toast(qt('authErr')+(e&&e.message?' · '+e.message:''))}
}
window.PhosAuth={async onGoogle(idToken){
  try{const j=await api('app-google.php',{idToken});if(!j.ok)throw new Error(j.error);store.set('acct',{token:j.token,email:j.user.email,consent:!!j.user.religConsent});
   if(j.user.religConsent)await syncNow(true);if(S.view==='m_account')drawAccount()}catch(e){toast(qt('authErr')+(e&&e.message?' · '+e.message:''))}},
 onError(msg){if(msg)toast(qt('authErr')+' · '+msg)}};
function drawAccount(){
 const a=store.get('acct',null);
 let h=`<h1>👤 ${esc(qt('account'))}</h1>`;
 if(!a){h+=`<p class="lead">${esc(qt('googleLead'))}</p>${window.PhosApp&&PhosApp.googleSignIn&&(!PhosApp.googleReady||PhosApp.googleReady())?`<button class="gbtn" id="gIn"><svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>${esc(qt('google'))}</button>`:`<div class="card"><div class="s">${esc(qt('googleSoon'))}</div></div>`}
  <p class="note">${esc(pt('privacy'))}: <a href="${PRIV_URL}" target="_blank" rel="noopener">phosbiblias.com/privacidad</a></p>`}
 else{h+=`<div class="card main"><div class="t">✓ ${esc(qt('signed',{e:a.email}))}</div>${a.last?`<div class="s">${esc(qt('synced'))} · ${esc(new Date(a.last).toLocaleString(LANG))}</div>`:''}</div>
  <label class="nrow"><input type="checkbox" id="aCons" ${a.consent?'checked':''}><span class="small">${esc(qt('consent'))}</span></label>
  <button class="btn" id="aSync" style="width:100%;margin-top:12px">${esc(qt('syncNow'))}</button>
  <button class="btn ghost" id="aOut" style="width:100%;margin-top:10px">${esc(qt('out'))}</button>
  <button class="linkbtn danger" id="aDel" style="margin-top:22px">${esc(qt('delAcc'))}</button><div id="aDelBox"></div>`}
 view.innerHTML=h;
 const g=$('#gIn');if(g)g.onclick=()=>{try{PhosApp.googleSignIn()}catch(e){toast(qt('authErr'))}};
 if(!a)return;
 $('#aCons').onchange=e=>{const x=store.get('acct',null);x.consent=e.target.checked;_storeSet('acct',x);if(!x.consent)api('app-sync.php',{consent:false}).catch(()=>{})};
 $('#aSync').onclick=()=>syncNow(false);
 $('#aOut').onclick=()=>{api('app-salir.php').catch(()=>{});_storeSet('acct',null);drawAccount()};
 $('#aDel').onclick=()=>{$('#aDelBox').innerHTML=`<p class="note">${esc(qt('delSure'))}</p><button class="btn danger" id="aDelOk" style="width:100%">${esc(qt('delAcc'))}</button>`;
  $('#aDelOk').onclick=async()=>{const j=await api('app-borrar.php',{confirmo:'BORRAR'});if(j.ok){_storeSet('acct',null);toast(qt('deleted'));drawAccount()}else toast(j.error||qt('authErr'))}};
}

// ===== Arranque =====
const _renderPlus=render;
render=function(){
 if(AUD.on&&!(S.view==='read'&&S.sec==='bible'))audStop();
 const p=_renderPlus.apply(this,arguments);
 Promise.resolve(p).then(()=>{drawListen();if(AUD.auto&&S.view==='read'){AUD.auto=false;setTimeout(audStart,400)}});
 return p};
(function(){const st=document.createElement('style');st.textContent=`
.hero{position:relative;border-radius:22px;padding:22px 20px 18px;margin:6px 0 16px;color:#FBF6EA;box-shadow:0 10px 30px rgba(42,11,12,.25);overflow:hidden;cursor:pointer}
.hero:before{content:"";position:absolute;right:-30px;top:-20px;width:170px;height:230px;opacity:.07;background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 40' fill='none' stroke='%23E2C27A' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M15 3v34M10 8h10M5 16h20M9 29l12-5'/%3E%3C/svg%3E")}
.hdate{font-size:13px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85}
.hseason{display:flex;align-items:center;gap:8px;margin-top:6px;font-weight:600;color:#F1DDA9}.hdot{width:12px;height:12px;border-radius:50%;border:2px solid rgba(255,255,255,.6)}
.htop{font-family:'Cormorant Garamond',serif;font-size:26px;line-height:1.15;margin-top:10px;color:#fff}
.hverse{margin:16px 0 0;padding:0;border:0;font-family:'Noto Serif',serif;font-size:21px;line-height:1.55;color:#fff}
.hverse cite{display:block;margin-top:8px;font-style:normal;font-family:Inter,sans-serif;font-size:14px;font-weight:700;color:#E2C27A}
.hfoot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:18px;flex-wrap:wrap}.hstreak{font-size:14px;font-weight:600}
.hbtn{border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.12);color:#fff;border-radius:999px;padding:9px 16px;font:inherit;font-weight:600}
.tdhead.compact h1{font-size:24px}
.rcard{width:100%;text-align:left;display:block}.rcard .t{display:flex;align-items:center;gap:10px;justify-content:flex-start}.rcard .pill{margin-left:auto}.rico{font-size:24px}
.streakbox{display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,#FFF3D6,#F6E3B4);border-radius:18px;padding:16px;margin:8px 0 14px;color:#4A1416}.sbig{font-size:34px;font-weight:800;font-family:'Cormorant Garamond',serif;white-space:nowrap}
.chips{display:flex;flex-wrap:wrap;gap:8px}.opt.chipw{width:auto;min-height:44px;padding:8px 14px}.scrline{min-height:56px}
.tlpicked{padding-left:22px}.tlpicked li{padding:6px 0}.tlpicked li.ok{color:#1B5E20}.tlpicked li.bad{color:#A12A1E}
.bmap{width:100%;height:auto;background:radial-gradient(circle at 30% 20%,#FBF3DF,#EFE1BE);border-radius:16px;border:1px solid var(--line)}
.bmap .grid line{stroke:rgba(122,90,28,.15);stroke-width:1}.bmap .route{fill:none;stroke:#7A2A2C;stroke-width:3;stroke-dasharray:6 5;stroke-linecap:round}
.bmap .city circle{fill:#fff;stroke:#7A5A1C;stroke-width:2.5}.bmap .city .hit{fill:transparent;stroke:none}.bmap .city.on circle:first-child{fill:#7A2A2C;stroke:#E2C27A}
.bmap .city.start circle:first-child{fill:#E2C27A}.bmap text{font:600 12px Inter,sans-serif;fill:#4A1416;paint-order:stroke;stroke:#FBF3DF;stroke-width:3px}
.bmap .city.shake circle:first-child{fill:#C0392B;transition:fill .1s}
.listenbar{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:20;display:flex;gap:8px;align-items:center;background:var(--wine);padding:6px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.25)}
.lbtn{white-space:nowrap;border:0;background:transparent;color:#F6F1E7;font:inherit;font-weight:700;padding:10px 16px;border-radius:999px}.lbtn.on{background:#E2C27A;color:#4A1416}
.listenbar select{font:inherit;border-radius:999px;border:0;padding:8px 10px;background:#F6F1E7;color:#4A1416}
.speaking{background:#FFF3D6!important;border-radius:8px;box-shadow:0 0 0 4px #FFF3D6}
.rdots{display:flex;gap:6px;justify-content:center;margin:12px 0}.rdots i{width:9px;height:9px;border-radius:50%;background:var(--line)}.rdots i.on{background:var(--wine)}
.dtxt{width:100%;font:inherit;padding:12px;border:1px solid var(--line);border-radius:12px;margin-top:12px;background:#fff;box-sizing:border-box}
.dlist{margin-top:16px}.dent{border-bottom:1px solid var(--line);padding:10px 0}.dent p{margin:4px 0;white-space:pre-wrap}
.walls{display:grid;grid-template-columns:1fr 1fr;gap:12px}.walls figure{margin:0}.walls img{width:100%;border-radius:14px;display:block;box-shadow:0 4px 12px rgba(0,0,0,.15)}
.walls figcaption{display:flex;gap:8px;margin-top:6px}.walls figcaption .btn{flex:1;padding:8px}
.gbtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;border:1px solid #DADCE0;background:#fff;color:#3C4043;font:600 16px Inter,sans-serif;padding:13px;border-radius:999px;margin:10px 0}
.linkbtn.danger,.btn.danger{color:#A12A1E}.btn.danger{background:#A12A1E;color:#fff}.small{font-size:14px}
[data-theme=dark] .streakbox{background:linear-gradient(135deg,#3A2C17,#2A2012);color:#F1DDA9}[data-theme=dark] .bmap{filter:brightness(.85)}`;document.head.appendChild(st)})();
if(IN_APP){setTimeout(feedWidget,2500);const a=store.get('acct',null);if(a&&a.consent)setTimeout(()=>syncNow(true),4000);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){const a=store.get('acct',null);if(a&&a.consent)syncNow(true)}})}
