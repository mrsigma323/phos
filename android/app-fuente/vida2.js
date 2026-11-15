// ---------- Regla de vida ampliada ----------
// Nuevas metas (gratitud, misericordia, examen de la noche, rezar por otros), «por qué» e idea del día de cada meta,
// rutinas guiadas (paseo con un salmo, estiramientos con oración), diario de la regla con resumen semanal,
// medallas, compañeros de camino, plantillas por momento de vida, revisión del mes y widget de la regla.
// Textos en V2X[idioma]; los de pt, fr, it, de, el, ru y ro están en vida2_tr.js.
const V2X={
es:{g:{thanks:"Gratitud",mercy:"Obras de misericordia",examen:"Examen de la noche",others:"Rezar por otros"},
 tasks:{thanks:["Da gracias por tres cosas de hoy","Escribe tres gracias concretas y una persona a la que agradecer","Agradece en persona a alguien y escribe tres gracias del día"],
  mercy:["Un gesto amable sin que nadie te lo pida","Ayuda a alguien concreto: un recado, una visita, un rato de escucha","Una obra de misericordia con tiempo: visita, acompaña o comparte lo tuyo"],
  examen:["Antes de dormir, repasa el día un minuto con Dios","5 minutos: gracias, perdón y un propósito para mañana","Examen completo de 10 minutos y una intención para mañana"],
  others:["Reza por una persona con nombre","Reza por tus compañeros de camino y escribe a uno","Reza por quien te cuesta, por tus compañeros y por un enfermo"]},
 why:{pray:"La oración es respirar con Dios: los Padres decían que es la vida del alma.",read:"La Palabra leída cada día va cambiando el corazón poco a poco, sin ruido.",move:"Cuidar el cuerpo es agradecer el regalo de la vida y tener fuerzas para servir.",rest:"El descanso también viene de Dios: él mismo bendijo el día de reposo.",fast:"El ayuno libera el corazón para Dios y para los demás, siempre con oración y limosna.",screen:"Menos pantallas deja sitio al silencio, a las personas y a Dios.",silence:"En el silencio Dios habla sin prisas: Elías lo oyó en una brisa suave.",thanks:"La gratitud abre los ojos a los regalos de cada día y aleja la queja.",mercy:"Las obras de misericordia son el amor hecho manos: «a mí me lo hicisteis», dijo Jesús.",examen:"Mirar el día con Dios antes de dormir ayuda a dar gracias, pedir perdón y empezar de nuevo.",others:"Rezar por otros nos une a ellos y nos saca de nosotros mismos."},
 ideas:{pray:["Reza despacio el Padrenuestro, parándote en cada frase.","Repite durante el día una oración breve: «Señor Jesucristo, ten piedad de mí».","Reza también con el cuerpo: de pie, con las manos abiertas, al empezar y al acabar."],
  read:["Lee en voz alta: la Palabra también entra por el oído.","Antes de leer, pide luz; al acabar, quédate con una sola frase.","Lee el mismo pasaje dos veces: la segunda, preguntando qué te dice hoy."],
  move:["Sal a caminar sin auriculares y da gracias por lo que ves.","Sube por las escaleras y ofrécelo por alguien.","Haz la rutina de estiramientos con oración de Phos."],
  rest:["Prepara la habitación: luz baja, el móvil fuera y una oración corta.","Si puedes, una siesta breve también es descanso.","Deja listas esta noche las cosas de mañana y descansa en paz."],
  fast:["Ofrece lo que dejas por alguien que lo necesite.","Lo que ahorres hoy, dalo como limosna.","Acompaña el ayuno con un rato más de oración."],
  screen:["Quita las notificaciones que no sean necesarias.","Deja el móvil en otra habitación mientras comes.","Cambia un rato de pantalla por una llamada a alguien."],
  silence:["Siéntate cómodo, respira despacio y di solo: «Señor».","Apaga la radio en el coche y quédate en silencio con Dios.","Contempla algo hermoso unos minutos sin decir nada."],
  thanks:["Agradece algo pequeño que normalmente pasa desapercibido.","Da gracias por una persona difícil: también te enseña algo.","Antes de comer, da gracias de verdad, aunque estés fuera de casa."],
  mercy:["Escucha a alguien sin mirar el móvil ni interrumpir.","Visita o llama a un enfermo o a una persona mayor.","Dona ropa, comida o tiempo a quien lo necesite."],
  examen:["Pregúntate: ¿dónde he sentido hoy la paz?","Pide perdón por un momento concreto y deja el resto en manos de Dios.","Termina con un propósito sencillo para mañana."],
  others:["Reza por quien te ha hecho daño: es el camino de la paz.","Escribe a alguien que esté solo: «He rezado por ti».","Pon cada nombre en las manos de Dios con una frase."]},
 ui:{more:"Por qué e idea de hoy",why:"Por qué",idea:"Idea de hoy",routines:"Rutinas guiadas",routinesL:"Oración con el cuerpo: un paseo con un salmo o estiramientos suaves con una oración en cada paso.",
  walk:"Paseo con un salmo",walkL:"Camina despacio mientras escuchas o lees un salmo. Al final, quédate con una frase.",walkSteps:"1. Empieza a caminar a tu ritmo.|2. Abre el salmo y escúchalo o léelo.|3. Repite por dentro la frase que más te toque.|4. Al volver, da gracias.",openPs:"Abrir el Salmo {n}",
  stretch:"Estiramientos con oración",stretchL:"6 pasos de 45 segundos, suaves y sin dolor. Si algo molesta, para.",start:"Empezar",next:"Siguiente",finish:"Terminar",stepOf:"Paso {n} de {t}",stretchDone:"¡Hecho! Cuerpo y alma un poco más despiertos 🙏",
  diary:"Diario del camino",diaryL:"Una frase al día basta.",save:"Guardar",saved:"Guardado ✓",week:"Resumen de la semana",wkDays:"Días con todas las metas cumplidas: {n} de 7",wkBest:"La meta que más has cuidado: {g}",wkNone:"Esta semana todavía no has escrito nada.",seeWeek:"Ver el resumen de la semana",
  badges:"Medallas del camino",friends:"Compañeros de camino",friendsL:"Personas por las que rezas. Se guardan solo en tu móvil.",add:"Añadir",namePh:"Nombre",cheer:"Enviar ánimo",cheerMsg:"Hoy he rezado por ti, {n} 🙏 Que Dios te bendiga. (Enviado con Phos · phosbiblias.com)",invite:"Invitar a recorrer el camino juntos",inviteMsg:"Estoy recorriendo el Camino de la Verdad con Phos: oración, descanso, gratitud… ¿Te animas a recorrerlo conmigo? phosbiblias.com",prayFor:"Hoy rezo por: {n}",remove:"Quitar",
  tpls:"Empezar con una plantilla",tplOk:"Plantilla aplicada: puedes cambiar lo que quieras.",
  review:"Revisión del mes",reviewL:"En los últimos 28 días has cumplido el {p} % de tus retos.",up:"¡Muy bien! ¿Subes un nivel?",down:"Quizá ahora es demasiado. ¿Bajas un nivel o quitas una meta?",keep:"Vas a buen ritmo: sigue así.",doUp:"Subir de nivel",doDown:"Bajar de nivel",doKeep:"Seguir igual",reviewed:"Hecho. La próxima revisión será dentro de un mes.",
  widget:"Widget del camino",widgetL:"Añade el widget «Camino de la Verdad» a la pantalla de inicio: verás las metas de hoy y podrás marcarlas sin abrir Phos.",gift:"Semana completa: +1 vida de gracia en Aprender 🎁",back:"Volver"},
 stretch:[["De pie, respira hondo tres veces","«Señor, aquí estoy, ante ti.»"],["Sube los brazos despacio hacia el cielo y bájalos","«Todo lo que soy te lo ofrezco.»"],["Gira suavemente el cuello hacia un lado y hacia el otro","«Quita de mí el peso que no es tuyo.»"],["Haz círculos con los hombros hacia atrás","«Dame fuerza para servir hoy.»"],["Inclínate un poco hacia delante, sin forzar","«Me inclino ante ti, Dios mío.»"],["Quédate de pie, quieto, con las manos juntas","«Gracias por este cuerpo y por este día. Amén.»"]],
 diary:["¿Qué me ha costado hoy?","¿Dónde he visto a Dios hoy?","¿Por qué doy gracias hoy?","¿A quién he ayudado, o quién me ha ayudado?","¿Qué quiero ofrecer mañana?","¿Qué me ha dado paz hoy?","¿De qué pido perdón hoy?"],
 badges:{first:["Primer paso","Cumplir todas las metas un día entero."],week:["Siete días fieles","Cumplir todas las metas 7 días seguidos (+1 vida de gracia)."],forty:["Cuarenta días","Cumplir todas las metas 40 días en total."],diary7:["Corazón que escribe","Escribir en el diario 7 días."],back:["Volver a empezar","Volver al camino después de una semana sin marcarlo."]},
 tpl:{stud:["Estudiantes","En época de exámenes, ofrece cada rato de estudio y protege el sueño: descansar también es estudiar bien."],par:["Madres y padres","Con niños pequeños, la oración cabe en un minuto: bendice a tus hijos al acostarlos."],old:["Mayores","Tu oración sostiene a muchos: ofrece tus días por tu familia y por la Iglesia."],shift:["Trabajo a turnos","Adapta el camino a tu turno: lo importante es la constancia, no la hora."]}},
en:{g:{thanks:"Gratitude",mercy:"Works of mercy",examen:"Evening examen",others:"Praying for others"},
 tasks:{thanks:["Give thanks for three things today","Write down three specific thanks and one person to thank","Thank someone in person and write three thanks for the day"],
  mercy:["One kind gesture nobody asked for","Help someone specific: an errand, a visit, a listening ear","A work of mercy that takes time: visit, accompany or share what is yours"],
  examen:["Before sleeping, go over the day for one minute with God","5 minutes: thanks, forgiveness and a resolution for tomorrow","A full 10-minute examen and an intention for tomorrow"],
  others:["Pray for one person by name","Pray for your companions on the way and write to one","Pray for someone you find hard, for your companions and for someone sick"]},
 why:{pray:"Prayer is breathing with God: the Fathers called it the life of the soul.",read:"The Word read each day changes the heart little by little, quietly.",move:"Caring for the body is thanking God for the gift of life and having strength to serve.",rest:"Rest also comes from God: he himself blessed the day of rest.",fast:"Fasting frees the heart for God and for others, always with prayer and almsgiving.",screen:"Less screen time makes room for silence, for people and for God.",silence:"In silence God speaks unhurriedly: Elijah heard him in a gentle breeze.",thanks:"Gratitude opens our eyes to each day's gifts and keeps complaint away.",mercy:"The works of mercy are love with hands: “you did it to me”, said Jesus.",examen:"Looking at the day with God before sleeping helps us give thanks, ask forgiveness and begin again.",others:"Praying for others unites us with them and takes us out of ourselves."},
 ideas:{pray:["Pray the Our Father slowly, pausing at each phrase.","Repeat a short prayer during the day: “Lord Jesus Christ, have mercy on me.”","Pray with your body too: standing, hands open, at the start and at the end."],
  read:["Read aloud: the Word also enters through the ear.","Before reading, ask for light; at the end, keep just one phrase.","Read the same passage twice: the second time, ask what it says to you today."],
  move:["Go for a walk without earphones and give thanks for what you see.","Take the stairs and offer it for someone.","Do Phos' stretching routine with prayer."],
  rest:["Prepare the room: low light, phone away and a short prayer.","If you can, a short nap is rest too.","Get tomorrow's things ready tonight and rest in peace."],
  fast:["Offer what you give up for someone in need.","Whatever you save today, give it as alms.","Add a little extra prayer to your fast."],
  screen:["Turn off notifications you don't need.","Leave your phone in another room while you eat.","Swap some screen time for a call to someone."],
  silence:["Sit comfortably, breathe slowly and simply say: “Lord.”","Turn off the radio in the car and stay in silence with God.","Contemplate something beautiful for a few minutes without words."],
  thanks:["Give thanks for something small that usually goes unnoticed.","Give thanks for a difficult person: they teach you something too.","Before eating, really give thanks, even when you are out."],
  mercy:["Listen to someone without looking at your phone or interrupting.","Visit or call someone who is sick or elderly.","Give clothes, food or time to someone in need."],
  examen:["Ask yourself: where did I feel peace today?","Ask forgiveness for one specific moment and leave the rest in God's hands.","End with one simple resolution for tomorrow."],
  others:["Pray for someone who has hurt you: it is the way to peace.","Write to someone who is lonely: “I prayed for you.”","Place each name in God's hands with one sentence."]},
 ui:{more:"Why, and today's idea",why:"Why",idea:"Today's idea",routines:"Guided routines",routinesL:"Prayer with the body: a walk with a psalm, or gentle stretches with a prayer at each step.",
  walk:"A walk with a psalm",walkL:"Walk slowly while you listen to or read a psalm. At the end, keep one phrase.",walkSteps:"1. Start walking at your own pace.|2. Open the psalm and listen to it or read it.|3. Repeat inwardly the phrase that touches you most.|4. When you get back, give thanks.",openPs:"Open Psalm {n}",
  stretch:"Stretches with prayer",stretchL:"6 steps of 45 seconds, gentle and pain-free. If anything hurts, stop.",start:"Start",next:"Next",finish:"Finish",stepOf:"Step {n} of {t}",stretchDone:"Done! Body and soul a little more awake 🙏",
  diary:"Journal of the way",diaryL:"One sentence a day is enough.",save:"Save",saved:"Saved ✓",week:"Week summary",wkDays:"Days with every goal completed: {n} of 7",wkBest:"The goal you looked after most: {g}",wkNone:"You haven't written anything this week yet.",seeWeek:"See the week summary",
  badges:"Medals of the way",friends:"Companions on the way",friendsL:"People you pray for. They are only stored on your phone.",add:"Add",namePh:"Name",cheer:"Send encouragement",cheerMsg:"I prayed for you today, {n} 🙏 God bless you. (Sent with Phos · phosbiblias.com)",invite:"Invite someone to walk the way with you",inviteMsg:"I'm walking the Way of Truth with Phos: prayer, rest, gratitude… Would you like to walk it with me? phosbiblias.com",prayFor:"Today I pray for: {n}",remove:"Remove",
  tpls:"Start with a template",tplOk:"Template applied: you can change anything you like.",
  review:"Monthly review",reviewL:"Over the last 28 days you completed {p}% of your challenges.",up:"Well done! Move up a level?",down:"Maybe it's too much right now. Go down a level or remove a goal?",keep:"You're at a good pace: keep going.",doUp:"Move up a level",doDown:"Go down a level",doKeep:"Keep it as it is",reviewed:"Done. The next review will be in a month.",
  widget:"Way widget",widgetL:"Add the “Way of Truth” widget to your home screen: you'll see today's goals and can tick them without opening Phos.",gift:"Full week: +1 grace life in Learn 🎁",back:"Back"},
 stretch:[["Standing, breathe deeply three times","“Lord, here I am before you.”"],["Slowly raise your arms towards the sky and lower them","“All that I am I offer to you.”"],["Gently turn your neck to one side and then the other","“Take from me the weight that is not yours.”"],["Roll your shoulders backwards","“Give me strength to serve today.”"],["Bend forward a little, without forcing","“I bow before you, my God.”"],["Stand still with your hands joined","“Thank you for this body and for this day. Amen.”"]],
 diary:["What was hard for me today?","Where did I see God today?","What am I grateful for today?","Whom did I help, or who helped me?","What do I want to offer tomorrow?","What gave me peace today?","What do I ask forgiveness for today?"],
 badges:{first:["First step","Complete every goal for a whole day."],week:["Seven faithful days","Complete every goal 7 days in a row (+1 grace life)."],forty:["Forty days","Complete every goal on 40 days in total."],diary7:["A writing heart","Write in the journal on 7 days."],back:["Starting again","Come back to the way after a week without ticking it."]},
 tpl:{stud:["Students","At exam time, offer each study session and protect your sleep: resting well is studying well."],par:["Mums and dads","With small children, prayer fits into a minute: bless your children as you put them to bed."],old:["Older people","Your prayer holds up many: offer your days for your family and for the Church."],shift:["Shift work","Fit the way to your shift: what matters is constancy, not the time."]}}};
const v2=()=>V2X[LANG]||V2X.en;
const v2t=(k,o)=>{let s=v2().ui[k]||V2X.en.ui[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
const NEWG=['thanks','mercy','examen','others'];
GOALS.push(...NEWG);Object.assign(GICO,{thanks:'🙌',mercy:'🤝',examen:'🔍',others:'💌'});
function v2Inject(){for(const l in V2X){const X=V2X[l];if(VX[l])for(const g of NEWG)VX[l]['g_'+g]=X.g[g];if(TASKS[l])Object.assign(TASKS[l],X.tasks)}}v2Inject();
const TPL={stud:{goals:['pray','read','rest','screen'],level:0,hour:'07:30'},par:{goals:['pray','thanks','rest','others'],level:0,hour:'06:45'},old:{goals:['pray','move','silence','others'],level:0,hour:'09:30'},shift:{goals:['pray','rest','silence','examen'],level:0}};
const v2k=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const daysAgo=n=>{const d=new Date();d.setDate(d.getDate()-n);return v2k(d)};
const friends=()=>store.get('vidaFriends',[]);
const vdiary=()=>store.get('vidaDiary',{});
// Medallas
const V2B=['first','week','forty','diary7','back'];
function v2Badges(){const v=vida();if(!v)return;const L=vlog(),G=activeGoals(v),B=store.get('vidaBadges',{}),D=vdiary();
 const full=Object.keys(L).filter(k=>isFull(L[k],G,v)).sort();let streak=0;for(let i=0;i<60;i++){if(L[daysAgo(i)]&&isFull(L[daysAgo(i)],G,v))streak++;else if(i>0)break}
 const give=(id,extra)=>{if(B[id])return;B[id]=Date.now();store.set('vidaBadges',B);setTimeout(()=>toast('🏅 '+v2().badges[id][0]+(extra?' · '+extra:'')),700)};
 if(full.length>=1)give('first');if(full.length>=40)give('forty');if(Object.keys(D).length>=7)give('diary7');
 if(streak>=7){const wk=store.get('vidaWeekGift','');const id=daysAgo(0).slice(0,8)+Math.floor(full.length/7);if(wk!==id){store.set('vidaWeekGift',id);if(typeof lives==='function'){const s=lives();s.grace++;saveLives(s)}setTimeout(()=>toast(v2t('gift')),1400)}give('week')}
 const marks=Object.keys(L).filter(k=>Object.values(L[k]).some(Boolean)).sort();if(marks.length>=2){const a=new Date(marks[marks.length-2]),b=new Date(marks[marks.length-1]);if((b-a)/864e5>=7)give('back')}}
// Revisión del mes
function reviewDue(v){const last=v.review||v.started;if(!last)return null;if((Date.now()-new Date(last))/864e5<28)return null;
 const L=vlog(),G=activeGoals(v);let tot=0,ok=0;for(let i=1;i<=28;i++){const d=L[daysAgo(i)]||{};tot+=G.length;ok+=G.filter(g=>d[g]).length}return Math.round(ok/Math.max(1,tot)*100)}
// Widget de la regla (Android)
function ruleWidgetMerge(){try{const r=JSON.parse(PhosApp.ruleWidgetGet()||'{}');if(!r.w||r.d!==todayKey()||!r.items)return false;const L=vlog(),d=L[r.d]||{};r.items.forEach(it=>{d[it.g]=!!it.done});L[r.d]=d;store.set('vidaLog',L);return true}catch(e){return false}}
function ruleWidgetPush(){if(!(window.PhosApp&&PhosApp.ruleWidgetSet))return;if(PhosApp.ruleWidgetGet)ruleWidgetMerge();const v=vida();
 const out={d:todayKey(),t:'⛰️ '+vt('vida'),items:[]};if(v){const dl=vlog()[todayKey()]||{};out.items=activeGoals(v).map(g=>({g,l:vt('g_'+g),i:GICO[g],done:!!dl[g]}))}
 try{PhosApp.ruleWidgetSet(JSON.stringify(out))}catch(e){}}
window.PhosRule={sync(){try{if(!(window.PhosApp&&PhosApp.ruleWidgetGet))return;if(ruleWidgetMerge()&&S.sec==='vida'&&(S.view==='vida'||!S.view))renderVida();else ruleWidgetPush()}catch(e){}}};
// ---- Pantallas nuevas ----
function drawStretch(){const X=v2();let i=-1,left=45,tm=null;
 const draw=()=>{clearInterval(tm);if(i<0){view.innerHTML=`<h1>🧘 ${esc(v2t('stretch'))}</h1><p class="lead">${esc(v2t('stretchL'))}</p>${discBox(false)}<ol class="v2list">${X.stretch.map(s=>`<li>${esc(s[0])}</li>`).join('')}</ol><button class="btn" id="sGo" style="width:100%">${esc(v2t('start'))}</button>`;$('#sGo').onclick=()=>{i=0;left=45;draw()};return}
  if(i>=X.stretch.length){view.innerHTML=`<div class="v2done"><div style="font-size:52px">🙏</div><h2>${esc(v2t('stretchDone'))}</h2><button class="btn" id="sBack">${esc(v2t('back'))}</button></div>`;
   const L=vlog(),k=todayKey(),d=L[k]||{};if(activeGoals(vida()).includes('move')){d.move=true;L[k]=d;store.set('vidaLog',L)}$('#sBack').onclick=()=>go('vida');return}
  const s=X.stretch[i];view.innerHTML=`<p class="note">${esc(v2t('stepOf',{n:i+1,t:X.stretch.length}))}</p><div class="v2step"><div class="v2t" id="sT">${left}</div><p class="v2st">${esc(s[0])}</p><p class="v2pr">${esc(s[1])}</p></div>
   <button class="btn" id="sNx" style="width:100%">${esc(i===X.stretch.length-1?v2t('finish'):v2t('next'))}</button>`;
  $('#sNx').onclick=()=>{i++;left=45;draw()};
  tm=setInterval(()=>{if(!$('#sT')){clearInterval(tm);return}left--;$('#sT').textContent=Math.max(0,left);if(left<=0){clearInterval(tm);try{PhosApp.vibrate()}catch(e){}}},1000)};draw()}
function drawWalk(){const ps=[23,121,139,103,27,91][dayIdx()%6],br=tdBr(),ed=planEd(),lxx=bookMeta(ed).scheme==='lxx',ch=lxx?String(heb2lxx(ps,1)[0]):String(ps);
 view.innerHTML=`<h1>🚶 ${esc(v2t('walk'))}</h1><p class="lead">${esc(v2t('walkL'))}</p><ol class="v2list">${v2t('walkSteps').split('|').map(s=>`<li>${esc(s.replace(/^\d+\.\s*/,''))}</li>`).join('')}</ol>
 <button class="btn" id="wPs" style="width:100%">📖 ${esc(v2t('openPs',{n:lxx?ch:ps}))}</button>${discBox(false)}`;
 $('#wPs').onclick=()=>{const L=vlog(),k=todayKey(),d=L[k]||{};if(activeGoals(vida()).includes('move')){d.move=true;L[k]=d;store.set('vidaLog',L)}go('read',{sec:'bible',ed,book:'PSA',ch,hl:null})}}
function drawWeek(){const v=vida(),L=vlog(),D=vdiary(),G=activeGoals(v);let full=0;const cnt={};
 const rows=[];for(let i=6;i>=0;i--){const k=daysAgo(i),d=L[k]||{};if(isFull(d,G,v))full++;G.forEach(g=>{if(d[g])cnt[g]=(cnt[g]||0)+1});
  let wd='';try{wd=new Intl.DateTimeFormat(LANG,{weekday:'long',day:'numeric'}).format(new Date(k))}catch(e){wd=k}if(D[k])rows.push(`<li><b>${esc(wd)}</b> · <i>${esc(D[k].q)}</i><br>${esc(D[k].a)}</li>`)}
 const best=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];
 view.innerHTML=`<h1>📔 ${esc(v2t('week'))}</h1><p class="lead">${esc(v2t('wkDays',{n:full}))}${best?' · '+esc(v2t('wkBest',{g:vt('g_'+best)})):''}</p>${prem2()?weekChart(G,v):''}<ul class="v2diary">${rows.join('')||`<li>${esc(v2t('wkNone'))}</li>`}</ul>`}
function drawFriends(){const F=friends();
 view.innerHTML=`<h1>💌 ${esc(v2t('friends'))}</h1><p class="lead">${esc(v2t('friendsL'))}</p>
 <div class="v2add"><input id="fN" class="vin" maxlength="30" placeholder="${esc(v2t('namePh'))}"><button class="btn" id="fA">${esc(v2t('add'))}</button></div>
 <div class="v2fr">${F.map((n,i)=>`<div class="card"><div class="t">🙏 ${esc(n)}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" data-ch="${i}" style="flex:1">${esc(v2t('cheer'))}</button><button class="btn ghost" data-rm="${i}">${esc(v2t('remove'))}</button></div></div>`).join('')}</div>
 <button class="btn ghost" id="fI" style="width:100%;margin-top:12px">${esc(v2t('invite'))}</button>`;
 $('#fA').onclick=()=>{const n=(typeof docName==='function'?docName($('#fN').value):$('#fN').value.trim());if(!n){$('#fN').focus();$('#fN').classList.add('shake');setTimeout(()=>$('#fN')&&$('#fN').classList.remove('shake'),400);return}if(F.length>=8)return;F.push(n);store.set('vidaFriends',F);drawFriends()};
 view.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const L=vlog(),k=todayKey(),d=L[k]||{};if(activeGoals(vida()).includes('others')){d.others=true;L[k]=d;store.set('vidaLog',L)}shareText(v2t('cheerMsg',{n:F[+b.dataset.ch]}))});
 view.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{F.splice(+b.dataset.rm,1);store.set('vidaFriends',F);drawFriends()});
 $('#fI').onclick=()=>shareText(v2t('inviteMsg'))}
// ---- Pantalla principal: se añade lo nuevo ----
const _renderVida2=renderVida;
renderVida=function(){const sv=S.view;
 if(sv==='v_stretch')return drawStretch();if(sv==='v_walk')return drawWalk();if(sv==='v_week')return drawWeek();if(sv==='v_friends')return drawFriends();
 _renderVida2.apply(this,arguments);const v=vida();if(!v||sv!=='vida'&&sv)return;if(!view.querySelector('.vtasks'))return;
 const X=v2(),di=dayIdx();
 // «Por qué» e idea de hoy en cada meta
 view.querySelectorAll('.vtask[data-g]').forEach((b,n)=>{const g=b.dataset.g;const m=document.createElement('button');m.className='vmore';m.textContent='ℹ️ '+v2t('more');
  const det=document.createElement('div');det.className='vdet';det.hidden=true;const ideas=(X.ideas[g]||V2X.en.ideas[g]||[]);
  det.innerHTML=`<p><b>${esc(v2t('why'))}:</b> ${esc((X.why[g]||V2X.en.why[g]||''))}</p>${ideas.length?`<p><b>💡 ${esc(v2t('idea'))}:</b> ${esc(ideas[(di+n)%ideas.length])}</p>`:''}`;
  m.onclick=()=>{det.hidden=!det.hidden};const w=document.createElement('div');w.className='vwrap';b.before(w);w.append(b,m,det)});
 // Plantilla: consejo propio
 const coach=view.querySelector('.coach');if(coach&&v.tpl&&X.tpl[v.tpl])coach.insertAdjacentHTML('afterend',`<p class="note v2tip">💡 ${esc(X.tpl[v.tpl][1])}</p>`);
 // Revisión del mes
 const p=reviewDue(v);if(p!==null&&coach){const kind=p>=85&&v.level<2?'up':p<=40&&v.level>0?'down':'keep';
  coach.insertAdjacentHTML('afterend',`<section class="card v2rev"><div class="t">🗓️ ${esc(v2t('review'))}</div><p>${esc(v2t('reviewL',{p}))} ${esc(v2t(kind))}</p><div style="display:flex;gap:8px;flex-wrap:wrap">${kind!=='keep'?`<button class="btn" data-rv="${kind}">${esc(v2t(kind==='up'?'doUp':'doDown'))}</button>`:''}<button class="btn ghost" data-rv="keep">${esc(v2t('doKeep'))}</button></div></section>`);
  view.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>{const x=vida();if(b.dataset.rv==='up')x.level=Math.min(x.adult?2:1,x.level+1);if(b.dataset.rv==='down')x.level=Math.max(0,x.level-1);x.review=todayKey();store.set('vida',x);toast(v2t('reviewed'));renderVida()})}
 // Hoy rezo por…
 const F=friends();const pf=F.length&&activeGoals(v).includes('others')?`<p class="note">💌 ${esc(v2t('prayFor',{n:F.join(', ')}))}</p>`:'';v2Badges();
 // Diario, rutinas, compañeros, medallas y widget
 const D=vdiary(),k=todayKey(),q=X.diary[di%X.diary.length],cur=D[k]&&D[k].a||'';
 const after=view.querySelector('.vall')||view.querySelector('.vtasks');
 const B=store.get('vidaBadges',{});
 const html=pf+`<section class="card v2card"><div class="t">📔 ${esc(v2t('diary'))}</div><p class="s">${esc(q)} · ${esc(v2t('diaryL'))}</p>
  <textarea id="v2D" class="vin" rows="2" maxlength="280">${esc(cur)}</textarea><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" id="v2S" style="flex:1">${esc(v2t('save'))}</button><button class="btn ghost" id="v2W" style="flex:1">${esc(v2t('seeWeek'))}</button></div></section>
 <h2>🙌 ${esc(v2t('routines'))}</h2><p class="note">${esc(v2t('routinesL'))}</p>
 <div class="v2two"><button class="card rcard" data-v2="v_walk"><div class="t">🚶 ${esc(v2t('walk'))}</div><div class="s">${esc(v2t('walkL'))}</div></button><button class="card rcard" data-v2="v_stretch"><div class="t">🧘 ${esc(v2t('stretch'))}</div><div class="s">${esc(v2t('stretchL'))}</div></button></div>
 <button class="card rcard" data-v2="v_friends"><div class="t"><span class="rico">💌</span>${esc(v2t('friends'))}${F.length?`<span class="pill">${F.length}</span>`:''}</div><div class="s">${esc(v2t('friendsL'))}</div></button>
 <h2>🏅 ${esc(v2t('badges'))}</h2><div class="lgrid">${V2B.map(id=>`<div class="lgo ${B[id]?'on':''}"><span class="lgi">${B[id]?'🏅':'○'}</span><b>${esc(X.badges[id][0])}</b><small>${esc(X.badges[id][1])}</small></div>`).join('')}</div>
 ${window.PhosApp&&PhosApp.ruleWidgetSet?`<div class="card"><div class="t">📱 ${esc(v2t('widget'))}</div><div class="s">${esc(v2t('widgetL'))}</div></div>`:''}`;
 after.insertAdjacentHTML('afterend',html);
 $('#v2S').onclick=()=>{const D2=vdiary(),a=$('#v2D').value.trim();if(a)D2[k]={q,a};else delete D2[k];const ks=Object.keys(D2).sort();while(ks.length>90)delete D2[ks.shift()];store.set('vidaDiary',D2);toast(v2t('saved'));v2Badges()};
 $('#v2W').onclick=()=>go('v_week');view.querySelectorAll('[data-v2]').forEach(b=>b.onclick=()=>go(b.dataset.v2));
 // Al marcar una meta: medallas y widget
 view.querySelectorAll('.vtask[data-g]').forEach(b=>{const o=b.onclick;b.onclick=e=>{o&&o.call(b,e);v2Badges();ruleWidgetPush()}});
 ruleWidgetPush();
};
// Plantillas en la pantalla de crear la regla
const _drawVidaSetup2=drawVidaSetup;
drawVidaSetup=function(){_drawVidaSetup2.apply(this,arguments);const X=v2();let picked=(vida()||{}).tpl||null;
 const nm=$('#vName');if(!nm)return;nm.previousElementSibling.insertAdjacentHTML('afterend',`<p class="note">${esc(v2t('tpls'))}</p><div class="chips v2tpl">${Object.keys(TPL).map(t=>`<button class="chip${picked===t?' on':''}" data-tpl="${t}">${esc(X.tpl[t][0])}</button>`).join('')}</div>`);
 view.querySelectorAll('[data-tpl]').forEach(b=>b.onclick=()=>{const T=TPL[b.dataset.tpl];picked=b.dataset.tpl;view.querySelectorAll('[data-tpl]').forEach(x=>x.classList.toggle('on',x===b));
  const cs=[...view.querySelectorAll('[data-goal]')];cs.forEach(c=>{if(c.classList.contains('on')&&!T.goals.includes(c.dataset.goal))c.click()});cs.forEach(c=>{if(!c.classList.contains('on')&&T.goals.includes(c.dataset.goal)&&!c.disabled)c.click()});
  const lb=view.querySelector(`[data-lv="${T.level}"]`);if(lb)lb.click();if(T.hour&&$('#vHour'))$('#vHour').value=T.hour;toast(v2t('tplOk'))});
 const sv=$('#vSave');if(sv)sv.addEventListener('click',()=>{const x=vida();if(x&&picked){x.tpl=picked;store.set('vida',x)}ruleWidgetPush()})};
setTimeout(()=>{try{PhosRule.sync()}catch(e){}},1500);
(function(){const st=document.createElement('style');st.textContent=`.vwrap{display:flex;flex-direction:column;gap:2px}.vmore{align-self:flex-start;border:0;background:none;color:var(--wine);font:inherit;font-size:14px;font-weight:600;padding:4px 6px;cursor:pointer}
.vdet{background:var(--paper);border-radius:12px;padding:8px 12px;font-size:15px;margin-bottom:6px}.vdet p{margin:4px 0}.v2tip{background:rgba(184,145,63,.12);padding:10px 12px;border-radius:12px}
.v2card textarea{margin-top:6px;resize:vertical}.v2two{display:grid;gap:8px}.v2list{padding-left:22px;line-height:1.6}.v2step{text-align:center;padding:24px 8px}.v2t{font:700 64px Inter,sans-serif;color:var(--wine)}
.v2st{font-size:22px;font-weight:700;margin:14px 0 4px;color:var(--ink)}.v2pr{font-family:'Cormorant Garamond',serif;font-size:26px;margin:12px 0}.v2done{text-align:center;padding:40px 10px}.v2diary{padding-left:18px;line-height:1.5}.v2diary li{margin-bottom:10px}.v2add{display:flex;gap:8px;margin-bottom:12px}.v2add .btn{flex:0 0 auto}.v2rev p{margin:6px 0 10px}
[data-theme=dark] .vmore{color:#E2A79F}[data-theme=dark] .v2t{color:#E2A79F}`;document.head.appendChild(st)})();
