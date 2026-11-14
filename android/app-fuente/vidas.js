// ---------- Vidas, paquetes, ritmo diario, preguntas trampa y logros (Aprender) ----------
// Vidas propias: 5 (iguales en los tres niveles); vuelve 1 cada 4 h (3 h con Phos Premium).
// Extras: de gracia (Premium y regalos, 30 % de no gastarse), de ánimo (anuncio, 15 %), de ofrenda (compradas, 30 %).
// Las extras solo se gastan cuando se acaban las propias. Ninguna desbloquea contenido: el ritmo lo marca «una unidad nueva al día».
const LX={
es:{own:"Vidas propias",grace:"Vidas de gracia",ad:"Vidas de ánimo",offer:"Vidas de ofrenda",next:"Próxima vida en",full:"Vidas completas",
 ownD:"Las tuyas. Vuelve una cada {h} horas.",graceD:"Phos Premium (2 cada día) y regalos. {p} % de probabilidad de no gastarse al fallar.",
 adD:"Al ver un anuncio (máx. {n} al día). {p} % de probabilidad de no gastarse.",offerD:"Compradas en Google Play. {p} % de probabilidad de no gastarse.",
 order:"Primero se gastan las propias; después, las de ánimo, las de gracia y las de ofrenda.",outT:"Te has quedado sin vidas",outL:"Espera a que vuelva una, haz Phos Premium o consigue vidas extra.",
 watch:"Ver un anuncio · +1 vida de ánimo",adsLeft:"Te quedan {n} anuncios hoy",noAds:"Hoy ya has visto los 3 anuncios.",packs:"Paquetes de vidas (Google Play)",
 p2:"Puñado",p4:"Cesta",p10:"Granero",best:"La más elegida",feast:"🎉 Hoy es fiesta: los paquetes traen vidas de regalo",reserveFull:"Ya tienes vidas de sobra 🙏 (máx. {n} guardadas).",
 premPitch:"Phos Premium: 2 vidas de gracia cada día, recarga cada 3 horas, sin anuncios y todos los cursos.",saved:"¡Salvada! ✨ Tu vida {t} no se ha gastado.",gotLives:"+{n} vidas de ofrenda 🙏",
 offers:"Avisarme de los regalos en días de fiesta",paceT:"La siguiente unidad se abre mañana",paceL:"Para aprender con calma, cada día se abre una unidad nueva. Mientras tanto puedes repasar todo lo ya abierto.",
 trap:"Pregunta trampa 🦅",trapOk:"¡Ojo de águila! +1 vida de gracia",logros:"Logros",logrosL:"Medallas por tu camino en Aprender. Las ocultas se descubren al conseguirlas.",hidden:"Logro oculto",
 got:"¡Logro conseguido!",streak7:"7 días seguidos: +1 vida de gracia 🔥",streak30:"¡Un mes seguido! +5 vidas de ofrenda de regalo 🎁",onlyEasy:"Gratis: la primera mitad de los cursos en nivel Fácil. Normal y Difícil son de Phos Premium (Google Play).",freeTag:"Gratis",
 notifOfferT:"🎉 ¡Feliz fiesta!",notifOfferB:"Hoy, en Aprender, los paquetes de vidas traen vidas de regalo."},
en:{own:"Your lives",grace:"Grace lives",ad:"Encouragement lives",offer:"Offering lives",next:"Next life in",full:"Lives full",
 ownD:"Your own. One comes back every {h} hours.",graceD:"Phos Premium (2 every day) and gifts. {p}% chance of not being used when you fail.",
 adD:"From watching an ad (max. {n} a day). {p}% chance of not being used.",offerD:"Bought on Google Play. {p}% chance of not being used.",
 order:"Your own lives are used first; then encouragement, grace and offering lives.",outT:"You're out of lives",outL:"Wait for one to come back, go Phos Premium or get extra lives.",
 watch:"Watch an ad · +1 encouragement life",adsLeft:"{n} ads left today",noAds:"You've watched today's 3 ads.",packs:"Life packs (Google Play)",
 p2:"Handful",p4:"Basket",p10:"Granary",best:"Most popular",feast:"🎉 It's a feast day: packs include gift lives",reserveFull:"You have plenty of lives 🙏 (max. {n} stored).",
 premPitch:"Phos Premium: 2 grace lives every day, refill every 3 hours, no ads and every course.",saved:"Saved! ✨ Your {t} life wasn't used.",gotLives:"+{n} offering lives 🙏",
 offers:"Tell me about gifts on feast days",paceT:"The next unit opens tomorrow",paceL:"To learn calmly, one new unit opens each day. Meanwhile you can review everything already open.",
 trap:"Trick question 🦅",trapOk:"Eagle eye! +1 grace life",logros:"Achievements",logrosL:"Medals for your journey in Learn. Hidden ones are revealed when you earn them.",hidden:"Hidden achievement",
 got:"Achievement unlocked!",streak7:"7 days in a row: +1 grace life 🔥",streak30:"A whole month in a row! +5 offering lives as a gift 🎁",onlyEasy:"Free: the first half of each course on Easy. Normal and Hard are part of Phos Premium (Google Play).",freeTag:"Free",
 notifOfferT:"🎉 Happy feast!",notifOfferB:"Today, in Learn, life packs come with gift lives."}};
const lt=(k,o)=>{let s=(LX[LANG]&&LX[LANG][k])||LX.en[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
const LV={max:5,regen:4*36e5,regenP:3*36e5,graceDaily:2,pGrace:.30,pAd:.15,pOffer:.30,adsDay:3,reserve:30,packs:{vidas_2:2,vidas_4:4,vidas_10:10},bonus:{vidas_2:1,vidas_4:3,vidas_10:5}};

// ===== Estado =====
function lives(){
 const s=store.get('lives',null)||{own:LV.max,t:Date.now(),grace:0,ad:0,offer:0,gday:'',ads:{d:'',n:0}};
 const per=isPremium()?LV.regenP:LV.regen,now=Date.now();
 if(s.own>=LV.max)s.t=now;else{const k=Math.floor((now-s.t)/per);if(k>0){s.own=Math.min(LV.max,s.own+k);s.t=s.own>=LV.max?now:s.t+k*per}}
 if(isPremium()&&s.gday!==todayKey()){s.grace=Math.max(s.grace,LV.graceDaily);s.gday=todayKey()}
 return s}
const saveLives=s=>store.set('lives',s);
const totalLives=s=>(s=s||lives(),s.own+s.grace+s.ad+s.offer);
const nextIn=s=>{s=s||lives();if(s.own>=LV.max)return 0;return Math.max(0,s.t+(isPremium()?LV.regenP:LV.regen)-Date.now())};
const fmtT=ms=>{const t=Math.ceil(ms/1000),h=Math.floor(t/3600),m=Math.floor(t%3600/60),x=t%60;return h+':'+String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')};
const lstat=()=>store.get('lvStats',{lost:0,outs:0,sg:0,so:0,sStreak:0,adTot:0,offUsed:0,fails:{}});
function loseLife(){
 const s=lives(),st=lstat();st.lost++;let saved=null;
 if(s.own>0){if(s.own===LV.max)s.t=Date.now();s.own--}
 else{const order=[['ad',LV.pAd],['grace',LV.pGrace],['offer',LV.pOffer]];
  for(const [k,p] of order)if(s[k]>0){if(Math.random()<p){saved=k}else{s[k]--;if(k==='offer')st.offUsed++}break}}
 if(saved){st.sStreak=(st.sStreak||0)+1;if(saved==='grace')st.sg++;if(saved==='offer')st.so++;
  setTimeout(()=>toast(lt('saved',{t:{grace:'🟡',ad:'🔵',offer:'🟣'}[saved]})),50)}else st.sStreak=0;
 if(totalLives(s)<=0)st.outs++;
 saveLives(s);store.set('lvStats',st);checkLogros();paintBubble();
}

// ===== Burbuja de vidas =====
function bubbleHTML(){const s=lives(),n=nextIn(s);
 return `<button class="lbub" id="lBub" aria-label="${esc(lt('own'))}"><span class="lo">❤️ ${s.own}/${LV.max}</span>${s.grace?`<span class="lg">🟡 ${s.grace}</span>`:''}${s.ad?`<span class="la">🔵 ${s.ad}</span>`:''}${s.offer?`<span class="lf">🟣 ${s.offer}</span>`:''}${n?`<span class="lt">⏳ <b id="lTime">${fmtT(n)}</b></span>`:''}</button>`}
let _bubT=null;
function paintBubble(){
 const h=view.querySelector('.lhead .hearts');if(h&&LS&&LS._lv){h.outerHTML=bubbleHTML()}else{const b=$('#lBub');if(b)b.outerHTML=bubbleHTML()}
 const b=$('#lBub');if(b)b.onclick=()=>livesSheet();
 clearInterval(_bubT);_bubT=setInterval(()=>{const e=$('#lTime');if(!e){clearInterval(_bubT);return}const n=nextIn();if(!n){paintBubble()}else e.textContent=fmtT(n)},1000);
}
function livesSheet(){
 const s=lives();let sh=$('#lSheet');if(sh)sh.remove();sh=document.createElement('div');sh.id='lSheet';sh.className='lsheet';sh.setAttribute('role','dialog');
 const row=(ico,k,n,d)=>`<div class="lrow"><span class="lico">${ico}</span><div><b>${esc(lt(k))} · ${n}</b><small>${esc(d)}</small></div></div>`;
 sh.innerHTML=`<div class="lbox"><button class="iconbtn lx" id="lClose" aria-label="×">✕</button><h2>${esc(lt('own'))}</h2>
 ${row('❤️','own',s.own+'/'+LV.max,lt('ownD',{h:isPremium()?3:4}))}${row('🟡','grace',s.grace,lt('graceD',{p:30}))}${row('🔵','ad',s.ad,lt('adD',{n:LV.adsDay,p:15}))}${row('🟣','offer',s.offer,lt('offerD',{p:30}))}
 <p class="note">${esc(lt('order'))}</p>${nextIn(s)?`<p class="note">⏳ ${esc(lt('next'))} <b>${fmtT(nextIn(s))}</b></p>`:`<p class="note">✓ ${esc(lt('full'))}</p>`}
 ${refillHTML(s)}<label class="nrow"><input type="checkbox" id="lOff" ${store.get('notifOffers',true)?'checked':''}><span class="small">${esc(lt('offers'))}</span></label></div>`;
 document.body.appendChild(sh);$('#lClose').onclick=()=>sh.remove();sh.onclick=e=>{if(e.target===sh)sh.remove()};
 $('#lOff').onchange=e=>{store.set('notifOffers',e.target.checked);if(typeof scheduleReminders==='function')scheduleReminders()};wireRefill(()=>{sh.remove();livesSheet()});
}
// Opciones para recuperar vidas: anuncio, paquetes y Premium
const adsToday=s=>s.ads&&s.ads.d===todayKey()?s.ads.n:0;
function refillHTML(s){
 const left=LV.adsDay-adsToday(s),adsOn=!!(window.PhosApp&&PhosApp.adsReady&&PhosApp.adsReady())&&!isPremium();
 const fb=feastBonus(),prods=(typeof PAY!=='undefined'&&PAY.products)||[];
 const pk=id=>{const p=prods.find(x=>x.id===id);const n=LV.packs[id],b=fb?LV.bonus[id]:0;const full=s.offer+n+b>LV.reserve;
  return `<button class="card plan lpack ${id==='vidas_4'?'main':''}" data-pack="${id}" ${full||!IN_APP?'disabled':''}><div class="t">${esc(lt({vidas_2:'p2',vidas_4:'p4',vidas_10:'p10'}[id]))} · 🟣 ${n}${b?` <b class="lbonus">+${b} 🎁</b>`:''}${id==='vidas_4'?`<span class="pill">${esc(lt('best'))}</span>`:''}</div><div class="pprice"><b>${esc(p?p.price:'—')}</b></div></button>`};
 return `${adsOn?(left>0?`<button class="btn ghost" id="lAd" style="width:100%">📺 ${esc(lt('watch'))}</button><p class="note">${esc(lt('adsLeft',{n:left}))}</p>`:`<p class="note">${esc(lt('noAds'))}</p>`):''}
 <h3>${esc(lt('packs'))}</h3>${fb?`<p class="lfeast">${esc(lt('feast'))}</p>`:''}${s.offer>=LV.reserve?`<p class="note">${esc(lt('reserveFull',{n:LV.reserve}))}</p>`:''}
 <div class="plans">${Object.keys(LV.packs).map(pk).join('')}</div>${isPremium()?'':`<button class="card main" id="lPrem" style="width:100%;text-align:left"><div class="t">👑 Phos Premium</div><div class="s">${esc(lt('premPitch'))}</div></button>`}`}
function wireRefill(after){
 const a=$('#lAd');if(a)a.onclick=()=>{try{PhosApp.showRewardedAd()}catch(e){}};
 document.querySelectorAll('[data-pack]').forEach(b=>b.onclick=()=>{if(typeof payConsentOK==='function'&&$('#pc1')&&!payConsentOK())return;PAY.busy=true;PhosApp.billingBuy(b.dataset.pack,'')});
 const p=$('#lPrem');if(p)p.onclick=()=>{const sh=$('#lSheet');if(sh)sh.remove();openP('premium')};
 if(IN_APP&&typeof PAY!=='undefined'&&!PAY.products)try{PhosApp.billingRefresh()}catch(e){}
 window._refillAfter=after;
}
// Respuesta del anuncio con recompensa (cuando se active AdMob)
window.PhosAds={onReward(){const s=lives();if(adsToday(s)>=LV.adsDay)return;s.ads={d:todayKey(),n:adsToday(s)+1};s.ad++;saveLives(s);const st=lstat();st.adTot++;st.adDay=s.ads.n;store.set('lvStats',st);checkLogros();paintBubble();toast('+1 🔵');if(window._refillAfter)window._refillAfter()}};
// Compra de un paquete: vidas de ofrenda (+ regalo si hoy es una gran fiesta de su Iglesia)
window.livesPurchased=p=>{const id=(p.products||[]).find(x=>LV.packs[x]);if(!id)return;const s=lives();const n=LV.packs[id]+(feastBonus()?LV.bonus[id]:0);
 s.offer=Math.min(LV.reserve,s.offer+n);saveLives(s);paintBubble();toast(lt('gotLives',{n}));checkLogros();if(window._refillAfter)window._refillAfter()};
function feastBonus(){try{const now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),br=tdBr(),info=dayInfo(br,td);
 if(['o_strict','o_holyfri','p_goodfri'].includes(info.f))return false;const M=br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ;
 const c=celebsOn(br,td);if(c.some(x=>/holyFri|holySat/.test(x)))return false;return c.some(x=>M.has(x))}catch(e){return false}}
// Aviso de regalo en las grandes fiestas (canal «Ofertas», se puede desactivar)
window.offerReminders=(y,m,dd)=>{if(!store.get('notifOffers',true))return null;const td=utc(y,m,dd),br=tdBr();
 try{const M=br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ,c=celebsOn(br,td),info=dayInfo(br,td);
  if(!c.some(x=>M.has(x))||c.some(x=>/holyFri|holySat/.test(x))||['o_strict','o_holyfri','p_goodfri'].includes(info.f))return null}catch(e){return null}
 return {id:'oferta-'+y+m+dd,at:new Date(y,m-1,dd,11,0).getTime(),title:lt('notifOfferT'),body:lt('notifOfferB'),open:'learn',ch:'ofertas'}};

// ===== Lecciones: vidas comunes, sin vidas y ritmo diario =====
// Sin Premium, el nivel por defecto es Fácil (el único con parte gratuita)
if(!isPremium()&&localStorage.getItem('phos:level')===null)store.set('level','easy');
const _drawLessonV=drawLesson;
drawLesson=function(){
 if(LS&&!LS._lv&&LS.hearts!==Infinity){LS._lv=true;Object.defineProperty(LS,'hearts',{configurable:true,get:()=>totalLives(),set:v=>{const c=totalLives();if(c-v===1)loseLife()}});maybeTrap()}
 _drawLessonV.apply(this,arguments);if(LS&&LS._lv)paintBubble()};
const _endLessonV=endLesson;
endLesson=function(ok){if(LS&&LS._lv&&!ok&&totalLives()<=0){const {br,id}=LS;LS=null;return outScreen(br,id)}return _endLessonV.apply(this,arguments)};
function outScreen(br,id){
 view.innerHTML=`<div class="endc"><div class="big" style="color:#C0392B">0 ♥</div><h1>${esc(lt('outT'))}</h1><p class="lead">${esc(lt('outL'))}</p>${bubbleHTML()}</div>${refillHTML(lives())}
 <button class="btn ghost" id="toCourse" style="width:100%;margin-top:12px">${esc(ct('back'))}</button>`;
 paintBubble();wireRefill(()=>{if(totalLives()>0&&br)restartLesson(br,id);else outScreen(br,id)});
 $('#toCourse').onclick=()=>go('learn');
}
// Unidad de un curso a la que pertenece una lección
function unitOf(br,id){if(!/^(ortodoxa|catolica|protestante)$/.test(br)||typeof courseUnits!=='function')return -1;
 if(/^(rev|ex):/.test(id))return +id.split(':')[1];const U=courseUnits(br);return U.findIndex(u=>u.lessons.includes(id))}
function paceOK(br,id){const u=unitOf(br,id);if(u<0)return true;const P=store.get('unitPace',{}),p=P[br]||{max:1,d:''};
 if(u<=p.max)return true;if(u===p.max+1&&p.d!==todayKey()){p.max=u;p.d=todayKey();P[br]=p;store.set('unitPace',P);return true}return false}
function paceScreen(){view.innerHTML=`<div class="lcard" style="text-align:center"><div style="font-size:46px">🌅</div><h1>${esc(lt('paceT'))}</h1><p class="lead">${esc(lt('paceL'))}</p><button class="btn" id="toCourse" style="width:100%">${esc(ct('back'))}</button></div>`;$('#toCourse').onclick=()=>go('learn')}
const _startLessonV=startLesson;
startLesson=function(br,id){
 const life=!(id==='exam'||/^ex:/.test(id));
 if(!paceOK(br,id))return paceScreen();
 if(life&&totalLives()<=0)return outScreen(br,id);
 return _startLessonV.apply(this,arguments)};
['startFeast','startChars','startLangLesson'].forEach(f=>{if(typeof window[f]!=='function')return;const o=window[f];window[f]=function(){if(totalLives()<=0)return outScreen();return o.apply(this,arguments)}});

// ===== Preguntas trampa (1–2 por curso, solo en nivel Fácil) =====
const TRAPS=[
 {es:["¿Cuántos animales de cada especie metió Moisés en el arca?",["Dos","Siete","Ninguno","Uno"],"Ninguno","¡No fue Moisés, fue Noé! (Génesis 6–7)"],en:["How many animals of each kind did Moses take into the ark?",["Two","Seven","None","One"],"None","It wasn't Moses, it was Noah! (Genesis 6–7)"]},
 {es:["¿Qué fruta comieron Adán y Eva en el Edén?",["Una manzana","Un higo","La Biblia no dice cuál","Una granada"],"La Biblia no dice cuál","Génesis 3 habla solo del «fruto del árbol»; la manzana es una tradición del arte."],en:["Which fruit did Adam and Eve eat in Eden?",["An apple","A fig","The Bible doesn't say","A pomegranate"],"The Bible doesn't say","Genesis 3 only says «the fruit of the tree»; the apple comes from art."]},
 {es:["¿Cuántos Magos dice el Evangelio que fueron a Belén?",["Tres","Doce","No dice cuántos","Dos"],"No dice cuántos","Mateo 2 no da el número; «tres» se deduce de los tres regalos."],en:["How many Magi does the Gospel say came to Bethlehem?",["Three","Twelve","It doesn't say","Two"],"It doesn't say","Matthew 2 gives no number; «three» comes from the three gifts."]},
 {es:["Según el libro de Jonás, ¿qué se tragó a Jonás?",["Una ballena","Un gran pez","Un tiburón","Un cocodrilo"],"Un gran pez","Jonás 1,17 dice «un gran pez»."],en:["According to the book of Jonah, what swallowed Jonah?",["A whale","A great fish","A shark","A crocodile"],"A great fish","Jonah 1:17 says «a great fish»."]},
 {es:["¿Qué día de la creación hizo Dios el sol?",["El primero","El cuarto","El séptimo","El segundo"],"El cuarto","La luz es del primer día; el sol y la luna, del cuarto (Génesis 1,14-19)."],en:["On which day of creation did God make the sun?",["The first","The fourth","The seventh","The second"],"The fourth","Light is on day one; sun and moon on day four (Genesis 1:14-19)."]},
 {es:["¿Cuántas hijas de Jacob nombra la Biblia?",["Ninguna","Una","Doce","Dos"],"Una","Dina (Génesis 30,21; 34)."],en:["How many daughters of Jacob does the Bible name?",["None","One","Twelve","Two"],"One","Dinah (Genesis 30:21; 34)."]},
 {es:["¿En qué libro de la Biblia está «Ayúdate y Dios te ayudará»?",["Proverbios","Eclesiastés","En ninguno","Salmos"],"En ninguno","Es un refrán popular, no un versículo."],en:["Which book of the Bible says «God helps those who help themselves»?",["Proverbs","Ecclesiastes","None","Psalms"],"None","It's a popular saying, not a verse."]},
 {es:["¿Cuántas personas se salvaron en el arca de Noé?",["Dos","Seis","Ocho","Doce"],"Ocho","Noé, su mujer, sus tres hijos y sus mujeres (1 Pedro 3,20)."],en:["How many people were saved in Noah's ark?",["Two","Six","Eight","Twelve"],"Eight","Noah, his wife, his three sons and their wives (1 Peter 3:20)."]}];
function maybeTrap(){
 if(!/^(ortodoxa|catolica|protestante)$/.test(LS.br)||lv()!=='easy'||/^(exam|ex:|rev:|intro)/.test(LS.id))return;
 const U=courseUnits(LS.br),all=U.flatMap(u=>u.lessons).filter(x=>!/^(intro|rev:|ex:|exam)/.test(x)),pos=all.indexOf(LS.id);if(pos!==1&&pos!==5)return;
 const T=store.get('traps',{}),key=LS.br+':'+pos;if(T[key])return;
 const T0=TRAPS[(LS.br.length*7+pos)%TRAPS.length],tr=(T0[LANG]||T0.en).map(x=>Array.isArray(x)?x.map(trB):trB(x));
 const at=Math.min(LS.items.length,3+Math.floor(Math.random()*3));
 LS.items.splice(at,0,{type:'mcq',prompt:lt('trap')+' · '+tr[0],options:shuffle(tr[1]),answer:tr[2],why:tr[3],trap:key});
}
const _recWeakV=recWeak;
recWeak=function(it,ok){_recWeakV.apply(this,arguments);
 if(it&&it.trap){const T=store.get('traps',{});if(!T[it.trap]){T[it.trap]=ok?'ok':'ko';store.set('traps',T)}if(ok){const s=lives();s.grace++;saveLives(s);giveLogro('eagle');setTimeout(()=>toast(lt('trapOk')),300)}}
 if(it&&!ok){const st=lstat(),k=(it.prompt||'').slice(0,60);st.fails[k]=(st.fails[k]||0)+1;if(Object.keys(st.fails).length>300)st.fails={};store.set('lvStats',st);if(st.fails[k]>=3)giveLogro('thomas')}};

// ===== Logros =====
const LOGROS=[
 ['lazarus','❤️',"«Lázaro, sal fuera»","Quedarte sin vidas y volver cuando se recarguen.","“Lazarus, come out”","Run out of lives and come back when they refill."],
 ['seven','❤️',"«Siete veces siete»","Perder 49 vidas y seguir adelante.","“Seven times seven”","Lose 49 lives and keep going."],
 ['prodigal','❤️',"«El hijo pródigo»","Volver a Phos después de 7 días sin entrar.","“The prodigal son”","Come back to Phos after 7 days away."],
 ['manna','🟡',"«Maná del cielo»","Que se salve tu primera vida de gracia.","“Manna from heaven”","Your first grace life is saved."],
 ['cup','🟡',"«Copa rebosante»","Que se salven dos vidas seguidas.","“My cup overflows”","Two lives saved in a row."],
 ['baskets','🟡',"«Doce cestos sobrantes»","Salvar 12 vidas de gracia.","“Twelve baskets left over”","Save 12 grace lives."],
 ['job','🔵',"«Paciencia de Job»","Ver tu primer anuncio.","“The patience of Job”","Watch your first ad."],
 ['servant','🔵',"«Siervo fiel»","Ver los 3 anuncios de un día.","“Faithful servant”","Watch all 3 ads in one day."],
 ['talents','🔵',"«Talentos multiplicados»","Reunir 30 vidas de ánimo en total.","“Talents multiplied”","Collect 30 encouragement lives in total."],
 ['widow','🟣',"«El óbolo de la viuda»","Usar tu primera vida de ofrenda.","“The widow's mite”","Use your first offering life."],
 ['joseph','🟣',"«Los graneros de José»","Tener 10 vidas de ofrenda guardadas.","“Joseph's granaries”","Keep 10 offering lives in store."],
 ['goodsoil','🟣',"«Trigo en tierra buena»","Que se salven 5 vidas de ofrenda.","“Wheat in good soil”","5 offering lives saved."],
 ['eagle','🦅',"«Ojo de águila»","Acertar una pregunta trampa.","“Eagle eye”","Answer a trick question correctly."],
 ['week','🔥',"«Siete días de luz»","7 días seguidos en Phos (+1 vida de gracia).","“Seven days of light”","7 days in a row on Phos (+1 grace life)."],
 ['month','🎁',"«Treinta días de luz»","Un mes seguido en Phos (+5 vidas de ofrenda).","“Thirty days of light”","A month in a row on Phos (+5 offering lives)."],
 ['sheep','🐑',"«La oveja perdida»","Volver a Phos después de un mes sin entrar.","“The lost sheep”","Come back to Phos after a month away.",1],
 ['thomas','🔒',"«Tomás el incrédulo»","Fallar tres veces la misma pregunta.","“Doubting Thomas”","Fail the same question three times.",1],
 ['jonah','🔒',"«Jonás en la ballena»","Quedarte sin vidas 10 veces.","“Jonah in the fish”","Run out of lives 10 times.",1],
 ['saul','🔒',"«Saulo camino de Damasco»","Perder 100 vidas: caíste muchas veces… y te levantaste todas. ✨","“Saul on the road to Damascus”","Lose 100 lives: you fell many times… and got up every time. ✨",1]];
function giveLogro(id){const L=store.get('logros',{});if(L[id])return;L[id]=Date.now();store.set('logros',L);const g=LOGROS.find(x=>x[0]===id);if(g)setTimeout(()=>toast('🏅 '+lt('got')+' '+logroN(g)),900)}
function checkLogros(){const st=lstat(),s=lives(),L=store.get('logros',{});
 if(st.outs>=1&&totalLives(s)>0)giveLogro('lazarus');if(st.lost>=49)giveLogro('seven');if(st.sg>=1)giveLogro('manna');if((st.sStreak||0)>=2)giveLogro('cup');if(st.sg>=12)giveLogro('baskets');
 if(st.adTot>=1)giveLogro('job');if((st.adDay||0)>=3)giveLogro('servant');if(st.adTot>=30)giveLogro('talents');if(st.offUsed>=1)giveLogro('widow');if(s.offer>=10)giveLogro('joseph');if(st.so>=5)giveLogro('goodsoil');
 if(st.outs>=10)giveLogro('jonah');if(st.lost>=100)giveLogro('saul')}
function drawLogros(){const L=store.get('logros',{}),es=LANG==='es';
 view.innerHTML=`<h1>🏅 ${esc(lt('logros'))}</h1><p class="lead">${esc(lt('logrosL'))}</p>${bubbleHTML()}<div class="lgrid">${LOGROS.map(g=>{const on=!!L[g[0]],hid=g[6]&&!on;
  return `<div class="lgo ${on?'on':''}"><span class="lgi">${hid?'🔒':g[1]}</span><b>${esc(hid?lt('hidden'):logroN(g))}</b><small>${esc(hid?'???':logroD(g))}</small></div>`}).join('')}</div>`;paintBubble()}
PVIEWS.logros=drawLogros;

// ===== Racha: regalos y logros de vuelta =====
(function(){const v=store.get('visits',null);if(!v)return;const R=store.get('streakGift',{});
 if(v.gap>=30)giveLogro('sheep');else if(v.gap>=7)giveLogro('prodigal');
 if(v.streak>=7&&v.streak%7===0&&R.w!==v.last){const s=lives();s.grace++;saveLives(s);R.w=v.last;giveLogro('week');setTimeout(()=>toast(lt('streak7')),2600)}
 if(v.streak>=30&&v.streak%30===0&&R.m!==v.last){const s=lives();s.offer=Math.min(LV.reserve,s.offer+5);saveLives(s);R.m=v.last;giveLogro('month');setTimeout(()=>toast(lt('streak30')),3800)}
 store.set('streakGift',R)})();

// ===== Aprender: burbuja, logros y aviso de lo gratuito =====
// Texto de los niveles: ahora las vidas son las mismas en los tres
(function(){if(typeof T==='undefined')return;const N={es:"Fácil: lo esencial de cada libro. Normal: quién lo dijo, ordenar hechos, verdadero o falso y versículos. Difícil: datos concretos, capítulos y números. Las vidas son las mismas en los tres niveles.",
 en:"Easy: the essentials of each book. Normal: who said it, putting events in order, true or false and verses. Hard: precise facts, chapters and numbers. Lives are the same on all three levels.",
 pt:"Fácil: o essencial de cada livro. Normal: quem disse, ordenar fatos, verdadeiro ou falso e versículos. Difícil: dados concretos, capítulos e números. As vidas são as mesmas nos três níveis.",
 fr:"Facile : l’essentiel de chaque livre. Normal : qui l’a dit, remettre les faits dans l’ordre, vrai ou faux et versets. Difficile : faits précis, chapitres et nombres. Les vies sont les mêmes aux trois niveaux.",
 it:"Facile: l’essenziale di ogni libro. Normale: chi l’ha detto, mettere in ordine i fatti, vero o falso e versetti. Difficile: dati precisi, capitoli e numeri. Le vite sono le stesse nei tre livelli.",
 de:"Leicht: das Wichtigste aus jedem Buch. Normal: Wer hat das gesagt?, Ereignisse ordnen, richtig oder falsch und Verse. Schwer: genaue Fakten, Kapitel und Zahlen. Die Leben sind auf allen drei Stufen gleich.",
 el:"Εύκολο: τα βασικά κάθε βιβλίου. Κανονικό: ποιος το είπε, σειρά γεγονότων, σωστό ή λάθος και στίχοι. Δύσκολο: ακριβή στοιχεία, κεφάλαια και αριθμοί. Οι ζωές είναι ίδιες και στα τρία επίπεδα.",
 ru:"Лёгкий: главное о каждой книге. Обычный: кто это сказал, порядок событий, верно или неверно и стихи. Сложный: точные факты, главы и числа. Жизни одинаковы на всех трёх уровнях.",
 ro:"Ușor: esențialul fiecărei cărți. Normal: cine a spus, ordinea faptelor, adevărat sau fals și versete. Dificil: date precise, capitole și numere. Viețile sunt aceleași la toate cele trei niveluri."};
 for(const l in T){if(N[l])T[l].lvNote=N[l];else if(T[l])delete T[l].lvNote}})();
const _renderLearnV=renderLearn;
renderLearn=function(){const r=_renderLearnV.apply(this,arguments);
 if(S.view!=='lesson'){const top=document.createElement('div');top.className='ltop';top.innerHTML=`${bubbleHTML()}<button class="btn ghost" id="lLog">🏅 ${esc(lt('logros'))}</button>`;view.insertBefore(top,view.firstChild);
  $('#lLog').onclick=()=>openP('logros');paintBubble();
  if(!isPremium()){const n=document.createElement('p');n.className='note';n.textContent=lt('onlyEasy');top.after(n);view.querySelectorAll('[data-lv="normal"],[data-lv="hard"]').forEach(b=>{if(!/👑/.test(b.textContent))b.textContent+=' 👑'})}}
 return r};
(function(){const st=document.createElement('style');st.textContent=`
.lbub{display:inline-flex;align-items:center;gap:8px;border:1.5px solid #E2C27A;background:#FFF8E8;border-radius:999px;padding:6px 12px;font:700 14px Inter,sans-serif;color:#4A1416;flex-wrap:wrap}
.lbub .lt{font-weight:600;color:#7A5A1C}.lhead .lbub{margin-left:auto}
.ltop{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:4px 0 10px;flex-wrap:wrap}.ltop .btn{padding:8px 14px}
.lsheet{position:fixed;inset:0;z-index:80;background:rgba(20,6,7,.55);display:flex;align-items:flex-end;justify-content:center}
.lbox{background:var(--ground,#F6F1E7);width:100%;max-width:520px;max-height:88vh;overflow:auto;border-radius:22px 22px 0 0;padding:18px 18px 26px;box-sizing:border-box;position:relative}
.lbox .lx{position:absolute;right:10px;top:10px}.lrow{display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line)}.lrow small{display:block;color:var(--muted)}.lico{font-size:22px}
.lpack{width:100%;text-align:left}.lbonus{color:#2E7D32}.lfeast{background:#EEF7EE;border-radius:12px;padding:8px 12px;font-weight:600;color:#1B5E20}
.lgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.lgo{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;text-align:center;opacity:.55;filter:grayscale(1)}
.lgo.on{opacity:1;filter:none;border-color:#E2C27A;box-shadow:0 4px 12px rgba(226,194,122,.35)}.lgi{font-size:30px;display:block}.lgo b{display:block;font-size:14px;margin:4px 0}.lgo small{color:var(--muted);font-size:12px}
[data-theme=dark] .lbub{background:#2A2012;color:#F1DDA9}[data-theme=dark] .lgo{background:#241B18}`;document.head.appendChild(st)})();
