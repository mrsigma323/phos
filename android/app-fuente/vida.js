// ---------- Regla de vida: entrenamiento de fe, cuerpo y hábitos ----------
// Aviso: es orientativo y NO sustituye a médico, sacerdote/pastor, entrenador personal ni nutricionista.
// Textos en español e inglés (los demás idiomas muestran el inglés hasta revisar su traducción).
const TERMS_VERSION='1.0 · 2026-11-13';
const VX={
es:{vida:"Regla de vida",vidaLead:"Tu entrenamiento diario de fe, cuerpo y hábitos: oración, Biblia, ejercicio, descanso, ayuno y silencio.",
disc:"Phos no es un servicio médico, de nutrición, de entrenamiento deportivo ni de dirección espiritual profesional. Sus propuestas son orientativas y NO sustituyen en ningún caso a un médico, a un sacerdote o pastor, a un entrenador personal ni a un nutricionista. Ante cualquier duda, te recomendamos encarecidamente que consultes con tu especialista.",
discHealth:"Si tienes alguna enfermedad, estás embarazada, tomas medicación o has tenido problemas con la alimentación, consulta con tu médico antes de ayunar o de cambiar tu actividad física.",
discShort:"Orientativo. No sustituye a tu médico, sacerdote o pastor, entrenador personal ni nutricionista. Ante cualquier duda, consulta con tu especialista.",
accDisc:"He leído y entiendo este aviso.",adult:"Soy mayor de 18 años.",minorNote:"Si eres menor de edad, los retos de ayuno y el nivel exigente no están disponibles. Habla con tus padres antes de cambiar tus hábitos.",
setup:"Crea tu regla",name:"Tu nombre (opcional)",goals:"Elige de 3 a 5 metas",level:"Nivel",hour:"¿A qué hora quieres el mensaje de la mañana?",save:"Guardar mi regla",need3:"Elige al menos 3 metas.",
g_pray:"Oración",g_read:"Lectura de la Biblia",g_move:"Ejercicio",g_rest:"Descanso",g_fast:"Ayuno",g_screen:"Menos pantallas",g_silence:"Silencio y meditación",
l_soft:"Suave",l_steady:"Constante",l_hard:"Exigente",coach:"Tu entrenador hoy",todayTasks:"Retos de hoy",week:"Tu semana",weekLead:"Días cumplidos en los últimos 7 días.",
programs:"Programas guiados",progDay:"Día {n} de {t}",progStart:"Empezar programa",progActive:"En curso",ficha:"Mi ficha",fichaLead:"Tu regla de vida y lo que has aceptado. Puedes guardarla o compartirla cuando quieras.",
edit:"Cambiar mi regla",shareFicha:"Guardar o enviar mi ficha",copyConsent:"Quiero que Phos guarde una copia de mi ficha y de mis aceptaciones, por si la necesito más adelante.",copyNote:"La copia no incluye datos de salud: Phos no te pregunta por enfermedades ni medicación.",
clientId:"Código de cliente",started:"Inicio",accepted:"Aceptaciones",termsT:"Condiciones de Phos Premium",readTerms:"Leer las condiciones",
pay1:"He leído y acepto las Condiciones de Phos Premium, incluido el aviso de que Phos no sustituye a ningún profesional.",
pay2:"Pido que el servicio empiece ahora mismo y entiendo que, una vez empezado, pierdo el derecho de desistimiento de 14 días, sin perjuicio de las devoluciones que permita Google Play.",
payNeed:"Para continuar, marca las dos casillas.",
p_disc:"40 días de disciplina",p_discL:"Oración, Biblia, ejercicio y descanso cada día, a ritmo constante.",p_body:"El cuerpo, templo del Espíritu",p_bodyL:"21 días de ejercicio suave y buen descanso, con un versículo cada día.",
p_fast:"Ayuno con sentido",p_fastL:"40 días siguiendo el ayuno de tu Iglesia, con oración y limosna. Solo para mayores de edad.",p_sil:"Silencio y oración",p_silL:"30 días de silencio y oración, empezando por 3 minutos.",
onlyEsEn:"Esta sección está en español y en inglés.",f_name:"Nombre",f_acct:"Cuenta",f_adult:"Mayor de edad",f_yes:"sí",f_no:"no",f_goals:"Metas",f_hour:"Mensaje de la mañana",f_prog:"Programa",f_ver:"Versión de las condiciones",done:"Hecho",allDone:"¡Regla cumplida hoy! 🙏",fastToday:"Hoy toca ayuno en tu Iglesia: {f}",noTask:"Hoy descansa de este reto."},
en:{vida:"Rule of life",vidaLead:"Your daily training in faith, body and habits: prayer, Bible, exercise, rest, fasting and silence.",
disc:"Phos is not a medical, nutrition, sports training or professional spiritual direction service. Its suggestions are for guidance only and in NO case replace a doctor, a priest or pastor, a personal trainer or a nutritionist. If in any doubt, we strongly recommend that you consult your specialist.",
discHealth:"If you have an illness, are pregnant, take medication or have had eating problems, talk to your doctor before fasting or changing your physical activity.",
discShort:"For guidance only. It does not replace your doctor, priest or pastor, personal trainer or nutritionist. If in doubt, consult your specialist.",
accDisc:"I have read and understand this notice.",adult:"I am over 18.",minorNote:"If you are under 18, fasting challenges and the demanding level are not available. Talk to your parents before changing your habits.",
setup:"Create your rule",name:"Your name (optional)",goals:"Choose 3 to 5 goals",level:"Level",hour:"What time would you like your morning message?",save:"Save my rule",need3:"Choose at least 3 goals.",
g_pray:"Prayer",g_read:"Bible reading",g_move:"Exercise",g_rest:"Rest",g_fast:"Fasting",g_screen:"Less screen time",g_silence:"Silence and meditation",
l_soft:"Gentle",l_steady:"Steady",l_hard:"Demanding",coach:"Your coach today",todayTasks:"Today's challenges",week:"Your week",weekLead:"Days completed in the last 7 days.",
programs:"Guided programmes",progDay:"Day {n} of {t}",progStart:"Start programme",progActive:"In progress",ficha:"My profile",fichaLead:"Your rule of life and what you have accepted. You can save or share it whenever you like.",
edit:"Change my rule",shareFicha:"Save or send my profile",copyConsent:"I want Phos to keep a copy of my profile and my acceptances, in case I need it later.",copyNote:"The copy contains no health data: Phos does not ask about illnesses or medication.",
clientId:"Customer code",started:"Started",accepted:"Acceptances",termsT:"Phos Premium terms",readTerms:"Read the terms",
pay1:"I have read and accept the Phos Premium terms, including the notice that Phos does not replace any professional.",
pay2:"I ask for the service to start right away and understand that, once started, I lose the 14-day right of withdrawal, without prejudice to any refunds allowed by Google Play.",
payNeed:"To continue, tick both boxes.",
p_disc:"40 days of discipline",p_discL:"Prayer, Bible, exercise and rest every day, at a steady pace.",p_body:"The body, temple of the Spirit",p_bodyL:"21 days of gentle exercise and good rest, with a verse each day.",
p_fast:"Fasting with meaning",p_fastL:"40 days following your Church's fast, with prayer and almsgiving. Adults only.",p_sil:"Silence and prayer",p_silL:"30 days of silence and prayer, starting with 3 minutes.",
onlyEsEn:"This section is available in Spanish and English.",f_name:"Name",f_acct:"Account",f_adult:"Adult",f_yes:"yes",f_no:"no",f_goals:"Goals",f_hour:"Morning message",f_prog:"Programme",f_ver:"Terms version",done:"Done",allDone:"Rule completed today! 🙏",fastToday:"Today is a fasting day in your Church: {f}",noTask:"Rest from this challenge today."}};
const vt=(k,o)=>{let s=(VX[LANG]&&VX[LANG][k])||VX.en[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
const GOALS=['pray','read','move','rest','fast','screen','silence'],GICO={pray:'🙏',read:'📖',move:'🚶',rest:'🌙',fast:'🍞',screen:'📵',silence:'🕯️'};
// Retos por meta y nivel [suave, constante, exigente]
const TASKS={
es:{pray:["5 minutos de oración al despertar","10 minutos por la mañana y 5 por la noche","Tu regla de oración completa, mañana y noche"],
 read:["Lee un capítulo de la Biblia","Lee dos capítulos y subraya un versículo","La lectura de tu plan y medita un versículo"],
 move:["Paseo de 15 minutos, a tu ritmo","30 minutos de actividad moderada (caminar, bici, nadar)","40 minutos de ejercicio, adaptado a tu forma física"],
 rest:["Acuéstate a una hora razonable","Duerme 7–8 horas y deja la pantalla 30 minutos antes","Misma hora de acostarte y de levantarte toda la semana"],
 fast:["Un pequeño sacrificio hoy: sin picar entre horas","Sin dulces ni caprichos hoy, y ofrécelo en oración","Sigue con fidelidad el ayuno de tu Iglesia y ofrece una limosna"],
 screen:["30 minutos sin móvil antes de dormir","Una hora sin redes sociales","Una tarde sin redes; dedica ese tiempo a alguien"],
 silence:["3 minutos de silencio","10 minutos de silencio con una oración breve","20 minutos de oración en silencio"]},
en:{pray:["5 minutes of prayer when you wake up","10 minutes in the morning and 5 at night","Your full prayer rule, morning and evening"],
 read:["Read one chapter of the Bible","Read two chapters and underline a verse","Your plan's reading, and meditate on one verse"],
 move:["A 15-minute walk, at your own pace","30 minutes of moderate activity (walking, cycling, swimming)","40 minutes of exercise, adapted to your fitness"],
 rest:["Go to bed at a sensible time","Sleep 7–8 hours and put your screen away 30 minutes before","Same bedtime and wake-up time all week"],
 fast:["A small sacrifice today: no snacking between meals","No sweets or treats today, and offer it in prayer","Faithfully keep your Church's fast and give alms"],
 screen:["30 minutes without your phone before bed","One hour without social media","An evening without social media; give that time to someone"],
 silence:["3 minutes of silence","10 minutes of silence with a short prayer","20 minutes of silent prayer"]}};
// Mensajes del entrenador (originales de Phos) con su versículo
const COACH=[["1CO 9:24","Hoy no se trata de ser perfecto, sino de dar el siguiente paso.","Today isn't about being perfect, but about taking the next step."],
["1TI 4:8","Cuida el cuerpo, pero sobre todo entrena el corazón.","Look after your body, but above all train your heart."],
["PHI 4:13","Lo que hoy te cuesta, mañana será costumbre.","What is hard today will be a habit tomorrow."],
["HEB 12:1","Corre tu carrera, no la de otro. A tu ritmo, pero sin parar.","Run your own race, not someone else's. At your pace, but keep going."],
["ISA 40:31","Si estás cansado, empieza por lo pequeño. Dios renueva las fuerzas.","If you are tired, start small. God renews strength."],
["1CO 6:19","Tu cuerpo es templo: descansar también es obediencia.","Your body is a temple: resting is obedience too."],
["PSA 46:10","Antes de correr, detente. Un minuto de silencio cambia el día.","Before you rush, stop. One minute of silence changes the day."],
["MAT 6:6","La oración más importante es la que nadie ve.","The most important prayer is the one nobody sees."],
["2TI 1:7","La disciplina no es dureza: es amor que se mantiene.","Discipline is not harshness: it is love that keeps going."],
["GAL 6:9","Si ayer fallaste, hoy vuelves a empezar. Eso también es fidelidad.","If you failed yesterday, start again today. That is faithfulness too."],
["COL 3:23","Haz lo de hoy como si fuera para el Señor, aunque sea pequeño.","Do today's task as for the Lord, even if it is small."],
["ROM 12:2","Cambiar un hábito es dejar que Dios renueve tu mente.","Changing a habit is letting God renew your mind."],
["PRO 16:3","Ofrece tu día antes de empezarlo.","Offer your day before you start it."],
["PSA 127:2","Dormir bien también es confiar.","Sleeping well is also trusting."],
["MAT 11:28","No cargues con todo a la vez: hoy, solo lo de hoy.","Don't carry everything at once: today, just today's part."],
["JOS 1:9","Ánimo: no entrenas solo.","Take heart: you are not training alone."],
["LAM 3:22","Cada mañana es nueva. También la tuya.","Every morning is new. Yours too."],
["ECC 3:1","Hay un tiempo para cada cosa: busca el tuyo para orar.","There is a time for everything: find yours for prayer."]];
const PROGS={disc:{days:40,goals:['pray','read','move','rest'],level:1},body:{days:21,goals:['move','rest','pray'],level:0},
 fast:{days:40,goals:['fast','pray','read'],level:1,adult:true},sil:{days:30,goals:['silence','pray','screen'],level:0}};

const vida=()=>store.get('vida',null);
const cid=()=>{let c=store.get('cid',null);if(!c){c='PH-'+Math.random().toString(36).slice(2,6).toUpperCase()+'-'+Date.now().toString(36).slice(-4).toUpperCase();store.set('cid',c)}return c};
const vlog=()=>store.get('vidaLog',{});
const tasksL=()=>TASKS[LANG]||TASKS.en;
function goalTask(g,lv,v){
 if(g==='fast'){try{const now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),info=dayInfo(tdBr(),td);
   if(FASTDAYS.has(info.f))return vt('fastToday',{f:ftText(info.f)})}catch(e){}}
 const lvl=(!v||!v.adult)&&g!=='fast'?Math.min(lv,1):lv;return tasksL()[g][lvl]}
function activeGoals(v){const p=v.prog&&PROGS[v.prog.id];return (p?p.goals:v.goals).filter(g=>g!=='fast'||v.adult)}
function activeLevel(v){const p=v.prog&&PROGS[v.prog.id];return Math.min(p?p.level:v.level,v.adult?2:1)}
function discBox(full){return `<div class="disc" role="note"><b>⚠️ ${esc(full?vt('disc'):vt('discShort'))}</b>${full?`<p>${esc(vt('discHealth'))}</p>`:''}</div>`}

// ---- Pantallas ----
function renderVida(){
 const v=vida();
 if(!v||S.view==='v_setup')return drawVidaSetup();
 if(S.view==='v_ficha')return drawFicha();
 if(S.view==='v_terms')return drawTerms();
 if(S.view==='v_progs')return prem2()?drawProgs():paywallCard();
 const k=todayKey(),L=vlog(),dl=L[k]||{},G=activeGoals(v),lv=activeLevel(v);
 const c=COACH[dayIdx()%COACH.length];
 const allDone=G.every(g=>dl[g]);
 let h=`${!VX[LANG]?`<p class="note">${esc(vt('onlyEsEn'))}</p>`:''}
 <h1>⛰️ ${esc(vt('vida'))}</h1>
 <section class="coach"><div class="cl">${esc(vt('coach'))}${v.name?' · '+esc(v.name):''}</div><p class="cmsg">${esc(coachTxt(c,COACH.indexOf(c)))}</p>
  <blockquote class="cverse"><span id="cVerse">…</span><cite id="cRef"></cite></blockquote></section>
 ${v.prog?`<p class="note">🏁 ${esc(vt('p_'+v.prog.id))} · ${esc(vt('progDay',{n:Math.min(Object.keys(L).filter(d=>d>=v.prog.start&&isFull(L[d],PROGS[v.prog.id].goals,v)).length+1,PROGS[v.prog.id].days),t:PROGS[v.prog.id].days}))}</p>`:''}
 <h2>${esc(vt('todayTasks'))}</h2><div class="vtasks">${G.map(g=>`<button class="vtask ${dl[g]?'on':''}" data-g="${g}" aria-pressed="${!!dl[g]}"><span class="vico">${dl[g]?'✅':GICO[g]}</span><span><b>${esc(vt('g_'+g))}</b><small>${esc(goalTask(g,lv,v))}</small></span></button>`).join('')}</div>
 ${allDone?`<p class="vall">${esc(vt('allDone'))}</p>`:''}
 <h2>${esc(vt('week'))}</h2>${prem2()?weekChart(G,v):`<button class="card rcard" data-p="premium"><div class="t">📊 ${esc(vt('week'))}<span class="pill">👑 Premium</span></div><div class="s">${esc(vt('weekLead'))}</div></button>`}
 <button class="card rcard" data-v="v_progs"><div class="t"><span class="rico">🏁</span>${esc(vt('programs'))}${!prem2()?'<span class="pill">👑 Premium</span>':''}</div><div class="s">${esc(vt('p_discL'))}</div></button>
 <button class="card rcard" data-v="v_ficha"><div class="t"><span class="rico">🗂️</span>${esc(vt('ficha'))}</div><div class="s">${esc(vt('fichaLead'))}</div></button>
 ${discBox(false)}`;
 view.innerHTML=h;
 view.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const L2=vlog(),d=L2[k]||{};d[b.dataset.g]=!d[b.dataset.g];L2[k]=d;
  const keys=Object.keys(L2).sort();while(keys.length>120)delete L2[keys.shift()];store.set('vidaLog',L2);renderVida()});
 view.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>go(b.dataset.v));
 view.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>openP(b.dataset.p));
 vText(c[0]).then(r=>{const a=$('#cVerse'),b=$('#cRef');if(a&&r){a.textContent=r.txt;a.lang=r.lang;b.textContent=r.ref}});
}
const isFull=(d,G,v)=>!!d&&G.filter(g=>g!=='fast'||v.adult).every(g=>d[g]);
function weekChart(G,v){const L=vlog();let bars='';
 for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const n=G.filter(g=>L[k]&&L[k][g]).length,p=Math.round(n/G.length*100);
  let wd='';try{wd=new Intl.DateTimeFormat(LANG,{weekday:'narrow'}).format(d)}catch(e){}
  bars+=`<div class="wb" title="${n}/${G.length}"><i style="height:${Math.max(p,4)}%" class="${p===100?'full':''}"></i><span>${esc(wd)}</span></div>`}
 return `<div class="wchart" role="img" aria-label="${esc(vt('weekLead'))}">${bars}</div><p class="note">${esc(vt('weekLead'))}</p>`}
function drawVidaSetup(){
 const v=vida()||{goals:['pray','read','move'],level:0,hour:'08:00',name:'',adult:false};
 view.innerHTML=`<h1>⛰️ ${esc(vt('vida'))}</h1><p class="lead">${esc(vt('vidaLead'))}</p>${discBox(true)}
 <label class="nrow"><input type="checkbox" id="vAcc" ${v.acc&&v.acc.disc?'checked':''}><span>${esc(vt('accDisc'))}</span></label>
 <label class="nrow"><input type="checkbox" id="vAdult" ${v.adult?'checked':''}><span>${esc(vt('adult'))}</span></label>
 <p class="note" id="vMinor" ${v.adult?'hidden':''}>${esc(vt('minorNote'))}</p>
 <h2>${esc(vt('setup'))}</h2><input id="vName" class="vin" maxlength="40" placeholder="${esc(vt('name'))}" value="${esc(v.name||'')}">
 <p class="note">${esc(vt('goals'))}</p><div class="chips">${GOALS.map(g=>`<button class="chip${v.goals.includes(g)?' on':''}" data-goal="${g}" aria-pressed="${v.goals.includes(g)}">${GICO[g]} ${esc(vt('g_'+g))}</button>`).join('')}</div>
 <p class="note" style="margin-top:14px">${esc(vt('level'))}</p><div class="seg" role="group">${['soft','steady','hard'].map((l,i)=>`<button data-lv="${i}" aria-pressed="${v.level===i}">${esc(vt('l_'+l))}</button>`).join('')}</div>
 <p class="note" style="margin-top:14px">${esc(vt('hour'))}</p><input type="time" id="vHour" class="vin" value="${esc(v.hour)}">
 <p class="note perr" id="vErr"></p><button class="btn" id="vSave" style="width:100%">${esc(vt('save'))}</button>`;
 const st={goals:v.goals.slice(),level:v.level};
 const syncAdult=()=>{const a=$('#vAdult').checked;$('#vMinor').hidden=a;
  view.querySelector('[data-goal="fast"]').disabled=!a;view.querySelector('[data-lv="2"]').disabled=!a;
  if(!a){st.goals=st.goals.filter(g=>g!=='fast');if(st.level>1)st.level=1;view.querySelector('[data-goal="fast"]').classList.remove('on');view.querySelectorAll('[data-lv]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.lv===st.level))}};
 $('#vAdult').onchange=syncAdult;syncAdult();
 view.querySelectorAll('[data-goal]').forEach(b=>b.onclick=()=>{const g=b.dataset.goal,i=st.goals.indexOf(g);if(i>=0)st.goals.splice(i,1);else if(st.goals.length<5)st.goals.push(g);
  b.classList.toggle('on',st.goals.includes(g));b.setAttribute('aria-pressed',st.goals.includes(g))});
 view.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{st.level=+b.dataset.lv;view.querySelectorAll('[data-lv]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
 $('#vSave').onclick=()=>{
  if(!$('#vAcc').checked){$('#vErr').textContent=vt('accDisc');return}
  if(st.goals.length<3){$('#vErr').textContent=vt('need3');return}
  const old=vida()||{};const acc=Object.assign({},old.acc||{});if(!acc.disc)acc.disc=new Date().toISOString();
  store.set('vida',Object.assign(old,{name:$('#vName').value.trim().slice(0,40),adult:$('#vAdult').checked,goals:st.goals,level:st.level,hour:$('#vHour').value||'08:00',acc,started:old.started||todayKey(),cid:cid()}));
  if(typeof scheduleReminders==='function')scheduleReminders();sendFicha();go('vida')};
}
function drawProgs(){const v=vida();
 view.innerHTML=`<h1>🏁 ${esc(vt('programs'))}</h1>${Object.keys(PROGS).map(id=>{const p=PROGS[id],on=v.prog&&v.prog.id===id,off=p.adult&&!v.adult;
  return `<div class="card ${on?'main':''}"><div class="t">${esc(vt('p_'+id))}${on?`<span class="pill">${esc(vt('progActive'))}</span>`:''}</div><div class="s">${esc(vt('p_'+id+'L'))} · ${p.days} ${esc(vt('days'))}</div>
  ${off?`<p class="note">${esc(vt('minorNote'))}</p>`:on?'':`<button class="btn ghost" data-prog="${id}" style="width:100%;margin-top:10px">${esc(vt('progStart'))}</button>`}</div>`}).join('')}${discBox(true)}`;
 view.querySelectorAll('[data-prog]').forEach(b=>b.onclick=()=>{const v2=vida();v2.prog={id:b.dataset.prog,start:todayKey()};store.set('vida',v2);sendFicha();go('vida')});
}

// ---- Ficha personal y condiciones ----
function fichaText(){
 const v=vida()||{},a=store.get('acct',null),acc=v.acc||{};const F=k=>vt('f_'+k);
 const fd=x=>{try{return new Date(x).toLocaleString(LANG,{dateStyle:'short',timeStyle:'medium'})+' ('+x+')'}catch(e){return x}};
 const L=[`PHOS · ${vt('ficha').toUpperCase()}`,`${vt('clientId')}: ${cid()}`];
 if(v.name&&(typeof docName!=='function'||docName(v.name)))L.push(`${F('name')}: ${v.name}`);if(a&&a.email)L.push(`${F('acct')}: ${a.email}`);
 L.push(`${vt('started')}: ${v.started||'—'}`,`${F('adult')}: ${v.adult?F('yes'):F('no')}`,
  `${F('goals')}: ${(v.goals||[]).map(g=>vt('g_'+g)).join(', ')}`,`${vt('level')}: ${vt('l_'+['soft','steady','hard'][v.level||0])}`,
  `${F('hour')}: ${v.hour||'—'}`);
 if(v.prog)L.push(`${F('prog')}: ${vt('p_'+v.prog.id)} (${v.prog.start})`);
 L.push('',`${vt('accepted')}:`);
 if(acc.disc)L.push(`· ${vt('accDisc')} — ${fd(acc.disc)}`);
 if(acc.pay1)L.push(`· ${vt('pay1')} — ${fd(acc.pay1)}`);if(acc.pay2)L.push(`· ${vt('pay2')} — ${fd(acc.pay2)}`);
 if(acc.order)L.push(`· Google Play: ${acc.product||''} ${acc.order}`);
 L.push(`· ${F('ver')}: ${TERMS_VERSION}`,'',vt('discShort'),'phosbiblias.com');
 return L.join('\n');
}
function drawFicha(){
 const v=vida()||{};
 view.innerHTML=`<h1>🗂️ ${esc(vt('ficha'))}</h1><p class="lead">${esc(vt('fichaLead'))}</p><pre class="ficha">${esc(fichaText())}</pre>
 <button class="btn" id="fShare" style="width:100%">${esc(vt('shareFicha'))}</button>
 <label class="nrow" style="margin-top:14px"><input type="checkbox" id="fCopy" ${v.copy?'checked':''}><span class="small">${esc(vt('copyConsent'))}</span></label><p class="note">${esc(vt('copyNote'))}</p>
 <button class="btn ghost" id="fTerms" style="width:100%;margin-top:10px">${esc(vt('readTerms'))}</button>
 <button class="btn ghost" id="fEdit" style="width:100%;margin-top:10px">${esc(vt('edit'))}</button>`;
 $('#fShare').onclick=()=>shareText(fichaText());
 $('#fCopy').onchange=e=>{const x=vida();if(!x)return;x.copy=e.target.checked;store.set('vida',x);sendFicha(true)};
 $('#fTerms').onclick=()=>go('v_terms');$('#fEdit').onclick=()=>go('v_setup');
}
// Condiciones con los datos de cada cliente rellenados automáticamente (versión en español e inglés)
function termsHTML(){
 const v=vida()||{},a=store.get('acct',null),acc=v.acc||{},es=LANG==='es';const who=(typeof docName==='function'?docName(v.name):v.name)||(a&&a.email)||cid();
 const TT=trGet('TERMS');const S1=TT?TT.map(([h,p])=>[h,p.replace('{who}',who).replace('{cid}',cid()).replace('{acct}',a&&a.email?trGet('termsAcct').replace('{e}',a.email):'').replace('{ver}',TERMS_VERSION).replace('{disc}',vt('disc')+' '+vt('discHealth'))]):es?[
  ['1. Partes',`Estas condiciones se aceptan entre el titular de Phos (sus datos de contacto figuran en phosbiblias.com › Aviso legal y en la ficha de la app en Google Play) y ${who}, con código de cliente ${cid()}${a&&a.email?' y cuenta '+a.email:''}.`],
  ['2. Qué es Phos Premium',`Una suscripción de la app de Phos para Android, gestionada y cobrada por Google Play, que da acceso a recordatorios personalizados, aprendizaje completo, Retos bíblicos, Regla de vida y otras funciones descritas en la app. Phos es y seguirá siendo gratis en phosbiblias.com.`],
  ['3. Aviso importante',vt('disc')+' '+vt('discHealth')],
  ['4. Uso responsable',`Las propuestas de oración, lectura, ejercicio, descanso, ayuno y hábitos son orientativas. Cada persona decide si las sigue y cómo, según su salud y su situación, y es responsable de consultar con su especialista. Phos no responde de los daños derivados de seguirlas sin la debida consulta profesional.`],
  ['5. Pago, renovación y cancelación',`El precio y la moneda son los que muestra Google Play antes de pagar. La suscripción se renueva automáticamente hasta que la canceles en Google Play › Pagos y suscripciones. Las devoluciones se rigen por las normas de Google Play.`],
  ['6. Inicio inmediato y desistimiento',`Al marcar la segunda casilla pides que el servicio empiece ya y reconoces que, una vez empezado, pierdes el derecho de desistimiento de 14 días (artículo 103 m del texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios), sin perjuicio de las devoluciones que permita Google Play.`],
  ['7. Tus datos',`Tu ficha se guarda en tu móvil. Solo si lo marcas, Phos guarda una copia junto con el registro de tus aceptaciones (fecha, hora, versión de estas condiciones y número de pedido de Google Play), para atender tus consultas o reclamaciones. No se recogen datos de salud. Más información en phosbiblias.com/privacidad.`],
  ['8. Cambios',`Si estas condiciones cambian, la app te pedirá aceptarlas de nuevo. Versión: ${TERMS_VERSION}.`]]:[
  ['1. Parties',`These terms are accepted between the owner of Phos (contact details at phosbiblias.com › Legal notice and on the app's Google Play listing) and ${who}, customer code ${cid()}${a&&a.email?', account '+a.email:''}.`],
  ['2. What Phos Premium is',`A subscription for the Phos app for Android, managed and charged by Google Play, giving access to personal reminders, full learning, Bible challenges, Rule of life and other features described in the app. Phos is and will remain free at phosbiblias.com.`],
  ['3. Important notice',vt('disc')+' '+vt('discHealth')],
  ['4. Responsible use',`The suggestions on prayer, reading, exercise, rest, fasting and habits are for guidance only. Each person decides whether and how to follow them, according to their health and situation, and is responsible for consulting their specialist. Phos is not liable for harm arising from following them without proper professional advice.`],
  ['5. Payment, renewal and cancellation',`The price and currency are those shown by Google Play before payment. The subscription renews automatically until you cancel it in Google Play › Payments & subscriptions. Refunds follow Google Play's rules.`],
  ['6. Immediate start and withdrawal',`By ticking the second box you ask for the service to start straight away and acknowledge that, once started, you lose the 14-day right of withdrawal, without prejudice to any refunds allowed by Google Play.`],
  ['7. Your data',`Your profile is stored on your phone. Only if you tick the box does Phos keep a copy together with the record of your acceptances (date, time, version of these terms and Google Play order number), to handle your questions or complaints. No health data is collected. More at phosbiblias.com/privacidad.`],
  ['8. Changes',`If these terms change, the app will ask you to accept them again. Version: ${TERMS_VERSION}. In case of discrepancy, the Spanish version prevails.`]];
 const rec=[acc.pay1&&('✓ '+vt('pay1')+' — '+acc.pay1),acc.pay2&&('✓ '+vt('pay2')+' — '+acc.pay2),acc.order&&('Google Play: '+acc.order)].filter(Boolean);
 return `<h1>📜 ${esc(vt('termsT'))}</h1>${S1.map(([h,p])=>`<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('')}
  ${rec.length?`<div class="disc">${rec.map(r=>`<p>${esc(r)}</p>`).join('')}</div>`:''}`;
}
function drawTerms(){view.innerHTML=`<div class="art">${termsHTML()}</div><button class="btn ghost" id="tShare" style="width:100%;margin-top:12px">${esc(vt('shareFicha'))}</button>`;
 $('#tShare').onclick=()=>shareText(view.querySelector('.art').innerText)}

// ---- Doble aceptación antes de pagar ----
function payConsentHTML(){const a=(vida()||{}).acc||{};
 return `<div class="paycons"><label class="nrow"><input type="checkbox" id="pc1" ${a.pay1v===TERMS_VERSION?'checked':''}><span class="small">${esc(vt('pay1'))} <button class="linkbtn" id="pcTerms">${esc(vt('readTerms'))}</button></span></label>
 <label class="nrow"><input type="checkbox" id="pc2"><span class="small">${esc(vt('pay2'))}</span></label><p class="note perr" id="pcErr"></p></div>`}
function payConsentOK(){const a=$('#pc1'),b=$('#pc2');if(a&&b&&a.checked&&b.checked){
  const v=vida()||{goals:[],level:0,hour:'08:00',adult:false};v.acc=v.acc||{};const now=new Date().toISOString();v.acc.pay1=now;v.acc.pay1v=TERMS_VERSION;v.acc.pay2=now;v.cid=cid();store.set('vida',v);return true}
 const e=$('#pcErr');if(e)e.textContent=vt('payNeed');return false}
function wirePayConsent(){const t=$('#pcTerms');if(t)t.onclick=e=>{e.preventDefault();openTermsP()}}
function openTermsP(){P_BACK=P_BACK||{sec:S.sec,view:S.view};S.view='terms';render();window.scrollTo(0,0)}
PVIEWS.terms=()=>{view.innerHTML=`<div class="art">${termsHTML()}</div>`};
// Registro en el servidor (solo con consentimiento para la ficha; las aceptaciones de pago siempre, ligadas al pedido)
async function sendFicha(force,purchase){
 const v=vida();if(!v)return;if(!v.copy&&!purchase&&!force)return;
 const body={cid:cid(),termsVersion:TERMS_VERSION,lang:LANG,app:IN_APP&&PhosApp.appVersion?PhosApp.appVersion():'web',acc:v.acc||{},copy:!!v.copy,
  ficha:v.copy?{name:v.name||'',adult:!!v.adult,goals:v.goals,level:v.level,hour:v.hour,prog:v.prog||null,started:v.started}:null,purchase:purchase||null};
 try{await api('app-registro.php',body)}catch(e){}
}
window.vidaPurchase=p=>{const v=vida()||{goals:[],level:0,hour:'08:00'};v.acc=v.acc||{};v.acc.order=p.order||'';v.acc.product=(p.products||[]).join(',');store.set('vida',v);sendFicha(true,{order:p.order||'',products:p.products||[]})};

// ---- Aviso de la mañana (lo programa premium.js) ----
window.vidaReminder=(y,m,dd)=>{const v=vida();if(!v)return null;const [hh,mi]=(v.hour||'08:00').split(':').map(Number);
 const c=COACH[(Math.floor((new Date(y,m-1,dd)-new Date(y,0,0))/864e5))%COACH.length];
 return {id:'vida-'+y+m+dd,at:new Date(y,m-1,dd,hh||8,mi||0).getTime(),title:'⛰️ '+vt('vida'),body:coachTxt(c,COACH.indexOf(c)),open:'vida'}};

// ---- Navegación ----
(function(){const at=SECS.indexOf('retos')+1;SECS.splice(at,0,'vida');
 for(const l in NAV)NAV[l].splice(at,0,(VX[l]||VX.en).vida);MENU_ICO.vida='⛰️'})();
const _renderArticlesV=renderArticles;
renderArticles=async function(sec){if(sec==='vida')return renderVida();return _renderArticlesV(sec)};
const _setHeaderV=setHeader;
setHeader=function(){_setHeaderV();if(S.sec==='vida'&&S.view!=='vida')$('#back').style.visibility='visible'};
const _phosBackV=window.phosBack;
window.phosBack=()=>{if(S.sec==='vida'&&S.view!=='vida'&&!PVIEWS[S.view]){go('vida');return true}return _phosBackV()};
(function(){const st=document.createElement('style');st.textContent=`
.disc{background:#FFF6E0;border:1px solid #E2C27A;border-radius:14px;padding:12px 14px;margin:14px 0;color:#4A1416;font-size:15px}.disc p{margin:6px 0 0}
.coach{background:linear-gradient(150deg,#2A0B0C,#7A2A2C);color:#FBF6EA;border-radius:20px;padding:18px;margin:8px 0 12px}.coach .cl{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#E2C27A}
.cmsg{font-family:'Cormorant Garamond',serif;font-size:26px;line-height:1.2;margin:8px 0}.cverse{margin:10px 0 0;padding:0;border:0;font-family:'Noto Serif',serif;font-size:17px;line-height:1.5;opacity:.95}
.cverse cite{display:block;margin-top:6px;font-style:normal;font-weight:700;font-size:13px;color:#E2C27A}
.vtasks{display:grid;gap:8px}.vtask{display:flex;gap:12px;align-items:center;text-align:left;width:100%;border:2px solid var(--line);border-radius:14px;background:#fff;padding:12px;font:inherit;color:var(--ink)}
.vtask b{display:block}.vtask small{display:block;color:var(--muted);font-size:14px;margin-top:2px}.vtask.on{border-color:#2E7D32;background:#EEF7EE}.vico{font-size:24px}
.vall{text-align:center;font-weight:700;color:#1B5E20;margin:12px 0}
.wchart{display:flex;gap:8px;align-items:flex-end;height:110px;padding:8px;background:var(--paper);border-radius:14px}.wb{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end}
.wb i{display:block;width:100%;background:#C9B48A;border-radius:6px 6px 2px 2px}.wb i.full{background:var(--wine)}.wb span{font-size:12px;color:var(--muted);margin-top:4px}
.vin{width:100%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:#fff}
.chip[disabled],.seg button[disabled]{opacity:.4}#view .chips .chip{border:1.5px solid var(--line);background:#fff;color:var(--ink);border-radius:999px;padding:9px 14px;font:inherit;font-weight:600;font-size:15px;min-height:44px;cursor:pointer}#view .chips .chip.on{background:var(--wine);border-color:var(--wine);color:#FBF3E2}[data-theme=dark] #view .chips .chip{background:var(--paper);color:var(--ink);border-color:var(--line)}[data-theme=dark] #view .chips .chip.on{background:#B5574C;border-color:#B5574C;color:#fff}[data-theme=dark] .btn:not(.ghost){color:#FBF3E2}
.ficha{white-space:pre-wrap;font:14px/1.5 ui-monospace,Menlo,monospace;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:12px}
.paycons{margin:12px 0}.paycons .nrow{align-items:flex-start;margin-bottom:8px}
[data-theme=dark] .disc{background:#3A2C17;color:#F1DDA9}[data-theme=dark] .vtask{background:#241B18}[data-theme=dark] .vtask.on{background:#1E3A24}`;document.head.appendChild(st)})();
