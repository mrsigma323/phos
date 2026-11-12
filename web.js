(function(){
'use strict';
const $=id=>document.getElementById(id);
let BR=tdBr();
const BRN={ortodoxa:'ortodoxa',catolica:'católica',protestante:'protestante'};
const MAJ=()=>BR==='ortodoxa'?O_MAJ:BR==='catolica'?C_MAJ:P_MAJ;
const LEG={ortodoxa:[['o_strict','Ayuno estricto'],['o_wo','Aceite y vino'],['o_fish','Pescado'],['o_dairy','Lácteos'],['o_free','Sin ayuno']],catolica:[['c_fastabst','Ayuno y abstinencia'],['c_abst','Abstinencia'],['c_fri','Viernes penitencial'],['c_none','Día ordinario']],protestante:[['p_lent','Cuaresma'],['p_goodfri','Viernes Santo'],['p_none','Día ordinario']]};
const JESUS=['JOH 14:6','JOH 8:12','MAT 11:28-30','JOH 3:16','MAT 22:37-39','JOH 15:12','MAT 5:14-16','JOH 10:11','JOH 11:25-26','MAT 6:33','MAT 7:7-8','JOH 6:35','JOH 14:27','MAT 28:20','LUK 6:36-37','MAT 5:43-45','JOH 13:34-35','MAT 18:20','JOH 15:5','MAT 7:12','JOH 16:33','LUK 9:23','JOH 4:13-14','MAT 5:3-9','JOH 10:10','LUK 15:7','MAT 25:40','JOH 14:1-3','MAT 6:25-26','LUK 12:32','JOH 20:29','MAT 9:12-13'];
const now=new Date();
const TD=utc(now.getFullYear(),now.getMonth()+1,now.getDate());
const DOY=Math.floor((TD-utc(now.getFullYear(),1,1))/DAY)+1; // igual que dayIdx() de la versión móvil
const FSHORT={c_fastabst:'Ayuno y abstinencia',c_abst:'Abstinencia de carne',c_fri:'Viernes penitencial',c_sol:'Solemnidad: sin abstinencia',c_none:'Sin ayuno',p_none:'Día ordinario',p_lent:'Tiempo de Cuaresma',p_goodfri:'Viernes Santo',o_free:'Sin ayuno',o_strict:'Ayuno estricto',o_wo:'Ayuno con aceite y vino',o_fish:'Se permite pescado',o_dairy:'Semana de los lácteos',o_holyfri:'Viernes Santo'};
const MONTHS=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

// ---- Texto bíblico (Reina-Valera 1909) ----
const chunkCache={};
// Ortodoxos y católicos leen la Biblia libre adaptada («el Señor»); protestantes, la Reina-Valera 1909 (igual que en la versión móvil)
const ED=()=>bibleEd(BR),EDM=()=>ED()==='es-blm'?BLM:RV;
function chunkOf(b){const e=EDM().b.find(x=>x[0]===b);return e?e[2]:null}
function loadChunk(n){const k=ED()+'/'+n;if(!chunkCache[k])chunkCache[k]=fetch('biblia/data/'+k+'.json').then(r=>{if(!r.ok)throw 0;return r.json()});return chunkCache[k]}
window.dayIdx=()=>DOY;
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
 // Santo del día (ortodoxos y católicos) o personaje bíblico (protestantes)
 const cel=info.cel.filter(c=>celName(c)),sts=daySaints(BR,TD),fig=figToday();
 const sk=document.querySelector('#santoral .kicker');
 if(BR==='protestante'){
  if(sk)sk.textContent=cel.length?'Hoy se celebra':'Personaje bíblico del día';
  const [fb,fcv]=fig[2].split(' '),[fc,fv]=fcv.split(':');
  if(cel.length){setTxt('sIco',evIco(cel[0]));setTxt('sName',celName(cel[0]));setTxt('sMore','Personaje bíblico del día: '+fig[0]+'. '+fig[1]);}
  else{setTxt('sIco','📜');setTxt('sName',fig[0]);setTxt('sMore',fig[1]+' ('+cite(fb,+fc,+fv)+')');}
 }else{
  if(sk)sk.textContent='Hoy se celebra';
  const names=[...cel.map(celName),...sts];
  if(names.length){setTxt('sIco',cel.length?evIco(cel[0]):(BR==='ortodoxa'?'☦️':'😇'));setTxt('sName',names[0]);
   setTxt('sMore',names.length>1?'También: '+names.slice(1).join(' · '):snNote(info.s)||'');}
  else{setTxt('sIco',BR==='ortodoxa'?'☦️':'✝️');setTxt('sName',snName(info.s));setTxt('sMore',tdL().ui[3]+(up?' La próxima: '+celName(up[0])+', '+fmtD(new Date(up[1]))+'.':''));}
 }
 // Textos que cambian según la Iglesia
 document.querySelectorAll('.bibsrc').forEach(e=>e.textContent='Texto: '+bibleName(BR)+'.');
 document.querySelectorAll('a.zone[href="recetas.html"] b').forEach(e=>e.textContent=BR==='protestante'?'Recetas sencillas':'Recetas de ayuno');
 document.querySelectorAll('a.zone[href="santoral.html"] span:not(.zi)').forEach(e=>e.textContent=BR==='protestante'?'Testigos de la fe':'El santo de hoy');
 document.querySelectorAll('[data-br]').forEach(b=>{const on=b.dataset.br===BR;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 document.querySelectorAll('[data-cal]').forEach(b=>b.parentNode.hidden=BR!=='ortodoxa');
 const cb=$('calBr');if(cb)cb.textContent={ortodoxa:'Calendario ortodoxo',catolica:'Calendario católico',protestante:'Calendario protestante'}[BR];
 if(info.color&&$('cSeason'))setTxt('cSeason',snName(info.s)+' · color '+tdL().ui[['tdViolet','tdWhite','tdGreen','tdRed'].indexOf(info.color)+22]);
 document.querySelectorAll('[data-cal]').forEach(b=>{const on=(b.dataset.cal==='1')===tdOld();b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 return info;
}

// ---- Lecturas ----
async function renderReadings(info){
 if(!$('vRef'))return;
 const ref=parseRef(VOTD[DOY%VOTD.length]);
 if(ref){setTxt('vRef',cite(...ref));try{setTxt('vTxt',await verses(...ref))}catch(e){fail('vTxt')}}
 const f=FEASTS.find(x=>x[3]&&info.cel.includes(x[0]));
 const g=f?f[3]:parseRef(JESUS[DOY%JESUS.length]);
 $('gospelBox').hidden=false;setTxt('gRef',(f?'Evangelio de la fiesta · ':'Palabras de Jesús · ')+cite(...g));
 try{setTxt('gTxt',await verses(...g))}catch(e){fail('gTxt')}
}

// ---- Reflexión ----
let reflText='';
async function renderReflection(){
 if(!$('rTitle'))return;
 const all=[];for(const k of Object.keys(REFL.tx))REFL.tx[k].forEach((x,i)=>all.push([k,i]));
 const [k,i]=all[DOY%all.length];const [title,body]=REFL.tx[k][i];const refs=REFL.ref[k][i];
 setTxt('rTitle',title);setTxt('rText',body);
 setTxt('rRef',REFL.names[k]+' · '+refs.map(r=>cite(...r)).join('; '));
 reflText=title+'. '+body;
}
function bindReflection(){
 const L=$('rListen'),S=$('rShare');if(!L)return;
 if(!('speechSynthesis' in window))L.hidden=true;
 L.dataset.lbl='Escuchar en audio';L.onclick=()=>speak(L,reflText);
 S.onclick=async()=>{const t=reflText+' — '+$('rRef').textContent;
  if(navigator.share){try{await navigator.share({title:'Phos · Reflexión del día',text:t,url:location.href})}catch(e){}return}
  try{await navigator.clipboard.writeText(t+'\n'+location.href);S.textContent='¡Copiado!';setTimeout(()=>S.textContent='Compartir',1800)}catch(e){}};
}

// ---- Oración para este momento ----
async function renderPrayer(){
 if(!$('pTxt'))return;
 const p=prayerFor(BR,now.getHours());
 setTxt('pName',prName(p.k)+' · '+tdL().ui[['tdMorning','tdMidday','tdAfternoon','tdEvening','tdNight'].indexOf(p.per)+12]);
 if(p.ref){try{setTxt('pTxt',await verses(...p.ref))}catch(e){fail('pTxt')}}else setTxt('pTxt',prText(p.k));
}

// ---- Salmo del día ----
async function renderPsalm(){
 if(!$('psTxt'))return;
 const n=DOY%150+1;setTxt('psTitle','Salmo '+n);
 try{const n2=chunkOf('PSA'),d=await loadChunk(n2),ch=d.PSA[n]||[];setTxt('psTxt',ch.slice(0,4).map(x=>x[1]).join(' ')+(ch.length>4?' …':''))}catch(e){fail('psTxt')}
}

// ---- Calendario del mes ----
let cy=now.getFullYear(),cm=now.getMonth(),sel=TD;
function drawCal(){
 const box=$('cal');if(!box)return;const first=utc(cy,cm+1,1),days=new Date(Date.UTC(cy,cm+1,0)).getUTCDate();
 const off=(new Date(first).getUTCDay()+6)%7;let h=`<div class="calnav"><button type="button" data-m="-1" aria-label="Mes anterior">‹</button><span class="calm">${capF(MONTHS[cm])} ${cy}</span><button type="button" data-m="1" aria-label="Mes siguiente">›</button></div>`;
 h+='<div class="calgrid wk">'+['lun','mar','mié','jue','vie','sáb','dom'].map(x=>`<span>${x}</span>`).join('')+'</div><div class="calgrid">';
 for(let i=0;i<off;i++)h+='<span class="cd empty"></span>';
 for(let d=1;d<=days;d++){const t=utc(cy,cm+1,d),inf=dayInfo(BR,t),wd=new Date(t).getUTCDay();
  const maj=inf.cel.some(c=>MAJ().has(c)),ico=inf.cel.length?evIco(inf.cel.find(c=>MAJ().has(c))||inf.cel[0]):(FASTICO[inf.f]||'');
  const cls=['cd','fz-'+inf.f,wd===0?'sun':'',maj?'maj':'',t===TD?'today':'',t===sel?'sel':''].join(' ');
  h+=`<button type="button" class="${cls}" data-d="${t}" aria-label="${d} de ${MONTHS[cm]}: ${FSHORT[inf.f]}${inf.cel.length?', '+inf.cel.map(celName).filter(Boolean).join(', '):''}"><b>${d}</b><i>${ico}</i></button>`}
 h+='</div><div class="calleg">'+LEG[BR].map(([k,l])=>`<span><i class="fz-${k}">${FASTICO[k]||''}</i>${l}</span>`).join('')+'<span><i style="border:2px solid #E2C27A"></i>Gran fiesta</span></div>';
 const inf=dayInfo(BR,sel);
 h+=`<div class="calday"><h3>${fmtLong(new Date(sel))}</h3>${inf.cel.length?'<ul>'+inf.cel.map(c=>celName(c)?`<li>${evIco(c)} ${celName(c)}</li>`:'').join('')+'</ul>':''}<p class="small" style="margin:0">${snName(inf.s)}</p><p class="fast">${FASTICO[inf.f]?FASTICO[inf.f]+' ':''}${ftText(inf.f)}</p></div>`;
 box.innerHTML=h;
 box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{cm+=+b.dataset.m;if(cm<0){cm=11;cy--}if(cm>11){cm=0;cy++}sel=utc(cy,cm+1,1);if(cy===now.getFullYear()&&cm===now.getMonth())sel=TD;drawCal()});
 box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{sel=+b.dataset.d;drawCal()});
}

// ---- Oraciones ----

// ---- Oraciones por apartados (una lista propia para cada Iglesia) ----
const ORX={"ortodoxa":[["trinidad","✝️","A la Santísima Trinidad","El Dios único en tres Personas: lo primero que se reza al empezar.",[["Trisagio","El himno tres veces santo, con el que empieza toda oración.","Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros. (tres veces)",null,null],["Gloria al Padre","La doxología breve, que cierra cada oración.","Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre y por los siglos de los siglos. Amén.",null,null],["Rey celestial","Invocación al Espíritu Santo, al empezar el día.",null,null,"heavenly"],["Oración de Jesús","La oración del corazón, para repetir en silencio.",null,null,"jesus"]],null],["madre","🌿","A la Madre de Dios","La Theotokos, la primera entre los santos y la más cercana a Cristo.",[["Digno es (Axion estin)","El himno a la Madre de Dios de la Divina Liturgia.","Es digno en verdad bendecirte, oh Madre de Dios, siempre bienaventurada y toda inmaculada, Madre de nuestro Dios. A ti, más venerable que los querubines y más gloriosa sin comparación que los serafines, que diste a luz virginalmente al Verbo de Dios, a ti, verdadera Madre de Dios, te magnificamos.",null,null],["Alégrate, Virgen Madre de Dios","El saludo del ángel, en su forma oriental.","Alégrate, Virgen Madre de Dios, María llena de gracia, el Señor es contigo. Bendita tú entre las mujeres y bendito el fruto de tu vientre, porque has dado a luz al Salvador de nuestras almas.",null,null],["Bajo tu amparo","La plegaria más antigua a la Madre de Dios, del siglo III.",null,null,"subtuum"]],null],["angeles","😇","A los ángeles y arcángeles","Siete arcángeles por su nombre, y el ángel que acompaña a cada uno.",[["Tropario de los Arcángeles","El himno de la Sínaxis del 8 de noviembre (tono 4).","Jefes de las milicias celestiales, nosotros, aunque indignos, os suplicamos: rodeadnos con vuestras oraciones y guardadnos bajo las alas de vuestra gloria inmaterial. Velad sobre nosotros, que nos postramos y clamamos con fervor: libradnos de todo peligro, pues sois los jefes de las Potestades de lo alto.",null,null],["Kontakio de los Arcángeles","El segundo himno de la fiesta (tono 2).","Jefes de los ejércitos de Dios y servidores de la gloria divina, príncipes de los ángeles incorpóreos y guías de los hombres: pedid para nosotros lo que nos conviene y gran misericordia, pues sois los supremos jefes de las Potestades Incorpóreas.",null,null],["Al ángel custodio","De las oraciones de la noche: se reza antes de dormir.","Ángel de Cristo, santo custodio y protector de mi alma y de mi cuerpo, perdóname todo aquello en que he pecado el día de hoy, y líbrame de toda astucia del enemigo que me acecha, para que en ningún pecado irrite yo a mi Dios. Ruega por mí, siervo pecador e indigno, para que me presentes digno de la bondad y la misericordia de la Santísima Trinidad, de la Madre de mi Señor Jesucristo y de todos los santos. Amén.",null,null]],"La Ortodoxia nombra a siete arcángeles: Miguel, Gabriel, Rafael, Uriel, Salafiel, Jegudiel y Baraquiel, y algunas listas añaden un octavo, Jeremiel. Se les recuerda juntos el 8 de noviembre."],["santos","🕯️","A los santos más venerados","Unos pocos troparios de los santos que todo el mundo conoce.",[["Tropario de San Nicolás","El santo más querido de Oriente; se celebra el 6 de diciembre.","Regla de fe e imagen de mansedumbre, maestro de templanza te mostraste a tu rebaño por la verdad de las cosas. Por eso alcanzaste con tu humildad lo excelso, y con tu pobreza la riqueza. Padre y pontífice Nicolás, intercede ante Cristo Dios para que salve nuestras almas.",null,null],["Tropario de San Jorge","El gran mártir, patrón de muchos pueblos; 23 de abril.","Como libertador de los cautivos y defensor de los pobres, médico de los enfermos y campeón de los reyes, victorioso gran mártir Jorge, intercede ante Cristo Dios para que salve nuestras almas.",null,null],["Oración de San Efrén","La oración propia de la Gran Cuaresma.",null,null,"ephrem"]],null]],"catolica":[["trinidad","✝️","A la Santísima Trinidad","Las oraciones con las que empieza y acaba el día del cristiano.",[["Padrenuestro","La oración que enseñó el Señor (Mt 6, 9-13).",null,null,"ourf"],["Gloria al Padre","La doxología breve, que cierra cada decena del rosario.","Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",null,null],["Ven, Espíritu Santo","La invocación antes de empezar cualquier trabajo.","Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor. Envía tu Espíritu y todo será creado, y renovarás la faz de la tierra. Amén.",null,null]],null],["madre","🌿","A la Virgen María","Las oraciones marianas de siempre, las que se saben de memoria.",[["Ave María","El saludo del ángel a María.",null,null,"ave"],["Salve","La antífona mariana con la que se cierra el día.","Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti clamamos los desterrados hijos de Eva; a ti suspiramos gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clemente, oh piadosa, oh dulce Virgen María! Amén.",null,null],["Ángelus","La oración del mediodía.",null,null,"angelus"],["Magníficat","El cántico de María (Lc 1, 46-55).",null,null,"magn"]],null],["angeles","😇","A los ángeles y arcángeles","Tres arcángeles por su nombre, y el ángel de la guarda.",[["A San Miguel Arcángel","La oración que escribió el papa León XIII en 1886.","San Miguel Arcángel, defiéndenos en la batalla. Sé nuestro amparo contra la perversidad y acechanzas del demonio. Reprímale Dios, pedimos suplicantes, y tú, príncipe de la milicia celestial, arroja al infierno con el divino poder a Satanás y a los otros espíritus malignos que vagan por el mundo para la perdición de las almas. Amén.",null,null],["Ángel del Señor","La oración al ángel custodio que recoge el Compendio del Catecismo.","Ángel del Señor, que eres mi custodio: puesto que la Providencia soberana me encomendó a ti, ilumíname, guárdame, rígeme y gobiérname en este día. Amén.",null,null],["Ángel de mi guarda","La versión popular, la que se enseña a los niños.","Ángel de mi guarda, dulce compañía, no me desampares ni de noche ni de día. No me dejes solo, que me perdería. Amén.",null,null]],"La Iglesia católica solo reconoce los tres nombres que aparecen en la Escritura: Miguel, Gabriel y Rafael. El Directorio sobre la piedad popular y la liturgia (2002) pide rechazar la costumbre de dar nombres propios a los demás ángeles, incluido el de la guarda. Su fiesta conjunta es el 29 de septiembre, y la de los Santos Ángeles Custodios el 2 de octubre."],["santos","🕯️","A los santos más conocidos","Oraciones breves de santos que han pasado a la lengua de todos.",[["Nada te turbe","Los versos que Santa Teresa de Jesús dejó escritos en su breviario.","Nada te turbe, nada te espante, todo se pasa, Dios no se muda; la paciencia todo lo alcanza. Quien a Dios tiene nada le falta: solo Dios basta.",null,null],["Hazme un instrumento de tu paz","Atribuida a San Francisco de Asís, aunque su forma actual aparece en Francia a comienzos del siglo XX.","Señor, hazme un instrumento de tu paz: donde haya odio, que yo lleve el amor; donde haya ofensa, que yo lleve el perdón; donde haya discordia, que yo lleve la unión; donde haya duda, que yo lleve la fe; donde haya error, que yo lleve la verdad; donde haya desesperación, que yo lleve la esperanza; donde haya tristeza, que yo lleve la alegría; donde haya tinieblas, que yo lleve la luz. Oh Maestro, que yo no busque tanto ser consolado como consolar, ser comprendido como comprender, ser amado como amar. Porque es dando como se recibe, perdonando como se es perdonado, y muriendo como se nace a la vida eterna.",null,null]],null]],"protestante":[["trinidad","✝️","A Dios Padre, Hijo y Espíritu Santo","La oración se dirige a Dios: es el centro de todo lo demás.",[["Padrenuestro","La oración que enseñó el Señor (Mt 6, 9-13).",null,null,"ourf"],["Gloria al Padre","La doxología que se canta en casi todas las iglesias.","Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",null,null],["Oración de Jesús","Una oración breve para repetir en silencio, tomada del evangelio.",null,null,"jesus"]],null],["madre","🌿","Cánticos de la Escritura","Las oraciones de la Biblia, incluida la de María: se rezan con ella, no a ella.",[["Magníficat","El cántico de María, su propia oración (Lc 1, 46-55).",null,null,"magn"],["Cántico de Simeón","La oración de la noche, tomada del evangelio (Lc 2, 29-32).",null,null,"nunc"],["Salmo 23","El salmo del pastor, el más rezado de todos.",null,["PSA",23,1,6],null]],null],["angeles","😇","Los ángeles en la oración","Se da gracias a Dios por ellos, y se le pide a él su protección.",[["Salmo 91","El salmo del amparo: Dios encarga a sus ángeles que te guarden.",null,["PSA",91,9,12],null],["Oración de la mañana de Lutero","Del Catecismo Menor (1529): se reza a Dios, y se le pide el ángel.","Te doy gracias, Padre celestial, por Jesucristo, tu amado Hijo, porque me has guardado esta noche de todo daño y peligro. Te ruego que me perdones todos mis pecados, donde haya hecho mal, y que me guardes en este día de todo pecado y de todo mal, para que todas mis obras y mi vida te agraden. Pues en tus manos me encomiendo: mi cuerpo y mi alma y todas las cosas. Que tu santo ángel esté conmigo, para que el enemigo maligno no tenga poder sobre mí. Amén.",null,null],["Oración de la noche de Lutero","La misma oración, para el final del día.","Te doy gracias, Padre celestial, por Jesucristo, tu amado Hijo, porque me has guardado en este día. Te ruego que me perdones todos mis pecados, donde haya hecho mal, y que me guardes esta noche. Pues en tus manos me encomiendo: mi cuerpo y mi alma y todas las cosas. Que tu santo ángel esté conmigo, para que el enemigo maligno no tenga poder sobre mí. Amén.",null,null]],"En la Escritura solo Miguel recibe el título de arcángel (Judas 9 y 1 Tesalonicenses 4, 16). Las iglesias protestantes no dirigen oraciones a los ángeles, porque la oración se dirige solo a Dios (1 Timoteo 2, 5): se le da gracias por ellos y se le pide su protección. Luteranos y anglicanos celebran San Miguel y Todos los Ángeles el 29 de septiembre."],["santos","🕯️","Oraciones de la Reforma","Oraciones escritas por creyentes, para rezarlas uno mismo.",[["Oración de la mañana de Lutero","La oración diaria del Catecismo Menor.","Te doy gracias, Padre celestial, por Jesucristo, tu amado Hijo, porque me has guardado esta noche de todo daño y peligro. Te ruego que me perdones todos mis pecados, donde haya hecho mal, y que me guardes en este día de todo pecado y de todo mal, para que todas mis obras y mi vida te agraden. Pues en tus manos me encomiendo: mi cuerpo y mi alma y todas las cosas. Que tu santo ángel esté conmigo, para que el enemigo maligno no tenga poder sobre mí. Amén.",null,null],["Oración de la noche de Lutero","Para encomendarse a Dios antes de dormir.","Te doy gracias, Padre celestial, por Jesucristo, tu amado Hijo, porque me has guardado en este día. Te ruego que me perdones todos mis pecados, donde haya hecho mal, y que me guardes esta noche. Pues en tus manos me encomiendo: mi cuerpo y mi alma y todas las cosas. Que tu santo ángel esté conmigo, para que el enemigo maligno no tenga poder sobre mí. Amén.",null,null]],"Las iglesias protestantes no rezan a los santos, sino que recuerdan a los creyentes que fueron por delante y rezan como ellos rezaron. Por eso este apartado recoge oraciones escritas por ellos, no dirigidas a ellos."]]};
const ORLAB={trinidad:'Trinidad',madre:'María',angeles:'Ángeles',santos:'Santos'};
// Qué apartado sugiere el calendario de hoy
function orToday(){
 try{
  const inf=dayInfo(BR,TD),n=norm(inf.cel.map(c=>celName(c)).filter(Boolean).join(' '));
  let c='';
  if(/arcangel|angeles|incorporeas|custodio/.test(n))c='angeles';
  else if(/magdalena|egipciaca/.test(n))c='santos';
  else if(/maria|madre de dios|virgen|anunciacion|asuncion|dormicion|inmaculada|guadalupe|visitacion|presentacion de la|proteccion/.test(n))c='madre';
  else if(/^san(to|ta)?\s|\bsan\b|\bsantos\b|martir|apostol|profeta|jerarca/.test(n))c='santos';
  if(BR==='protestante'&&c==='santos')c='';
  return c;
 }catch(e){return ''}
}
function prBody(p){
 const [pn,pd,ptx,pref,pkey]=p;
 const fijo=ptx||(pkey&&!PR_BIB[pkey]?prText(pkey):null);
 const ref=pref||(pkey&&PR_BIB[pkey]?PR_BIB[pkey]:null);
 return `<details class="pr" data-ref="${ref?ref.join('|'):''}" data-key="${pkey||''}"><summary><b>${esc(pn)}</b><span>${esc(pd)}</span></summary><div class="ptx">${fijo?esc(fijo):'…'}</div></details>`;
}
function renderPrayers(){
 const box=$('prList');if(!box)return;
 const cats=ORX[BR]||ORX.ortodoxa, hoy=orToday();
 box.className='orgrid';
 box.innerHTML=cats.map(([id,ico,name,desc,list,note])=>{
  const es=id===hoy;
  return `<details class="orcat${es?' orhoy':''}" data-c="${id}"${es?' open':''}>`
   +`<summary><span class="ori" aria-hidden="true">${ico}</span><b>${esc(name)}</b><span class="ord">${esc(desc)}</span>`
   +(es?'<span class="orbadge">Hoy toca</span>':'')+`</summary>`
   +`<div class="orbody">${note?`<p class="ornote">${esc(note)}</p>`:''}<div class="orlist">${list.map(prBody).join('')}</div></div></details>`;
 }).join('');
 box.querySelectorAll('details.pr').forEach(el=>el.addEventListener('toggle',async()=>{
  if(!el.open||el.dataset.done)return;
  const rr=el.dataset.ref;if(!rr)return;
  const r=rr.split('|').map((x,i)=>i?+x:x),k=el.dataset.key,tx=el.querySelector('.ptx');
  try{let v=await verses(...r);if(k==='ourf')v=v.replace(/^.*?(Padre nuestro)/,'$1');
   tx.textContent=v;const c=document.createElement('cite');c.textContent=cite(...r)+' · '+bibleName(BR);tx.append(c);el.dataset.done=1}
  catch(e){tx.textContent='No se ha podido cargar el texto.'}
 }));
 renderOrDest(hoy);
}
// Destacado: la oración que pide el día de hoy, debajo de las casillas
function renderOrDest(hoy){
 const d=$('orDest');if(!d)return;
 const cats=ORX[BR]||ORX.ortodoxa;
 let inf={cel:[]};try{inf=dayInfo(BR,TD)}catch(e){}
 const fiesta=inf.cel.map(c=>celName(c)).filter(Boolean)[0]||'';
 const cat=cats.find(c=>c[0]===(hoy||'trinidad'))||cats[0];
 const p=cat[4][0];
 const [pn,pd,ptx,pref,pkey]=p;
 const fijo=ptx||(pkey&&!PR_BIB[pkey]?prText(pkey):null);
 const ref=pref||(pkey&&PR_BIB[pkey]?PR_BIB[pkey]:null);
 d.innerHTML=`<p class="kicker">${fiesta?'Hoy se celebra: '+esc(fiesta):'La oración de hoy'}</p>`
  +`<h3>${esc(pn)}</h3><p class="small">${esc(cat[2])} · ${esc(pd)}</p>`
  +`<p class="prayer" id="orDestTx">${fijo?esc(fijo):'…'}</p>`
  +`<a class="more" href="calendario.html">Ver el calendario del mes →</a>`;
 if(ref)verses(...ref).then(v=>{const e=$('orDestTx');if(e)e.textContent=(pkey==='ourf'?v.replace(/^.*?(Padre nuestro)/,'$1'):v)}).catch(()=>{});
}

// ---- utilidades ----
const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=x=>String(x).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const fmtDY=t=>fmtD(new Date(t))+' de '+new Date(t).getUTCFullYear();

// ---- Palabra griega del día ----
const wordToday=()=>wordOfDay(BR);
async function renderGreek(){
 if(!$('gkW'))return;const [lg,[w,t,m,r]]=wordToday();setTxt('gkW',w);setTxt('gkT',t);setTxt('gkM',m);
 const lab='Palabra '+lg+' del día';document.querySelectorAll('.gkline').forEach(e=>{if(e.firstChild&&e.firstChild.nodeType===3)e.firstChild.nodeValue=lab+': '});document.querySelectorAll('.greek .kicker').forEach(e=>e.textContent=lab);
 $('gkW').lang=lg==='latina'?'la':lg==='hebrea'?'he':'grc';
 if($('gkV')){const ref=parseRef(r);setTxt('gkR',cite(...ref)+' · '+bibleName(BR));try{setTxt('gkV',await verses(...ref))}catch(e){fail('gkV')}}
}


// ---- Hoy en la cocina ----
const FOOD={o_strict:['Ayuno estricto','Sin carne, lácteos, huevos, pescado ni aceite. Prueba unas lentejas estofadas o una ensalada de garbanzos con limón.','#estricto'],
 o_holyfri:['Viernes Santo','El ayuno más estricto del año: muchos fieles no comen hasta la tarde. Si comes, que sea algo muy sencillo y sin aceite.','#estricto'],
 o_wo:['Ayuno con aceite y vino','Sin carne, lácteos, huevos ni pescado. Una fasolada griega o un pisto son perfectos.','#aceite'],
 o_fish:['Día de pescado','Se permiten pescado, aceite y vino. ¿Qué tal un bacalao al horno?','#pescado'],
 o_dairy:['Semana de los lácteos','Sin carne, pero con lácteos, huevos y pescado.','#pescado'],
 o_free:['Hoy no hay ayuno','Se puede comer de todo. Las recetas de ayuno te esperan para el próximo miércoles o viernes.','#estricto'],
 c_fastabst:['Ayuno y abstinencia','Una comida principal y dos más ligeras, sin carne. Lo tradicional es un potaje de vigilia.','#vigilia'],
 c_abst:['Abstinencia de carne','Viernes de Cuaresma: pescado, huevos o legumbres.','#vigilia'],
 c_fri:['Viernes penitencial','Abstinencia de carne u otra penitencia. Un plato de pescado o de legumbres es buena opción.','#vigilia'],
 c_sol:['Solemnidad','Hoy no hay abstinencia aunque sea viernes: es día de fiesta.','#vigilia'],
 c_none:['Día ordinario','Hoy no hay ayuno ni abstinencia. Si te apetece, prueba alguna receta de Cuaresma.','#vigilia'],
 p_none:['Sin norma de ayuno','Las Iglesias protestantes no fijan días de ayuno: cada persona decide. Aquí tienes ideas sencillas.','#aceite'],
 p_lent:['Tiempo de Cuaresma','Muchos cristianos protestantes ayunan o renuncian a algo en Cuaresma, de forma libre.','#aceite'],
 p_goodfri:['Viernes Santo','Muchos recuerdan la Pasión con ayuno o con una comida muy sencilla.','#estricto']};
function renderFood(info){
 if(!$('ftTitle'))return;const x=FOOD[info.f]||FOOD.o_free;
 setTxt('ftTitle',(FASTICO[info.f]?FASTICO[info.f]+' ':'')+x[0]);setTxt('ftText',x[1]);
 const a=$('ftLink');if(a)a.href='recetas.html'+x[2];
 const fasting=!['o_free','c_none','p_none','c_sol'].includes(info.f);document.querySelectorAll('.recs h2').forEach(h=>h.classList.toggle('hl',fasting&&'#'+h.id===x[2]));
}

// ---- Santoral y onomásticas ----
let sd=TD;
const CMOVK=new Set(C_MOV.map(x=>x[0])),OMOVK=new Set(O_MOV.map(x=>x[0]));
function cathOn(t){const d=new Date(t),m=d.getUTCMonth()+1,dd=d.getUTCDate();
 return celebsOn('catolica',t).filter(k=>CMOVK.has(k)||k==='christKing'||k==='holyFamily'||k==='baptism'||k==='advent1').map(celName).filter(Boolean).concat(SANTOS.filter(x=>x[0]===m&&x[1]===dd).map(x=>x[2]))}
function orthOn(t){const cd=new Date(t-(tdOld()?13*DAY:0)),m=cd.getUTCMonth()+1,dd=cd.getUTCDate();return (typeof SANTOS_O!=='undefined'?SANTOS_O:[]).filter(x=>x[0]===m&&x[1]===dd).map(x=>x[2])}
function drawSaints(){
 if(!$('sdO'))return;setTxt('sdDate',fmtLong(new Date(sd)));
 const o=celebsOn('ortodoxa',sd).filter(c=>celName(c));const so=orthOn(sd);
 $('sdO').innerHTML=(o.length||so.length)?o.map(c=>`<li>${evIco(c)} ${esc(celName(c))}</li>`).join('')+so.map(n=>`<li>☦️ ${esc(n)}</li>`).join(''):'<li class="muted">Ninguna gran fiesta ni santo principal este día.</li>';
 const c=[...new Set(cathOn(sd))];
 $('sdC').innerHTML=c.length?c.map(n=>`<li>✝️ ${esc(n)}</li>`).join(''):'<li class="muted">Feria: ningún santo en el calendario general este día.</li>';
}
let NIDX=null;
function nameIndex(){
 if(NIDX)return NIDX;const y=now.getFullYear();NIDX=SANTOS.map(([m,d,n])=>[m,d,n,'Católica']);
 yearEvents('ortodoxa',y).filter(e=>!OMOVK.has(e[0])).forEach(e=>{const n=celName(e[0]);if(!n)return;const dt=new Date(e[1]);NIDX.push([dt.getUTCMonth()+1,dt.getUTCDate(),n,'Ortodoxa'])});
 (typeof SANTOS_O!=='undefined'?SANTOS_O:[]).forEach(([m,d,n])=>{const dt=new Date(utc(y,m,d)+(tdOld()?13*DAY:0));NIDX.push([dt.getUTCMonth()+1,dt.getUTCDate(),n,'Ortodoxa'])});
 return NIDX}
const MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function searchName(q){
 const box=$('nameR');if(!box)return;q=norm(q.trim());if(q.length<3){box.innerHTML='';return}
 const re=new RegExp('(^|[^a-z])'+q.replace(/[^a-z ]/g,''));
 const r=nameIndex().filter(x=>re.test(norm(x[2]))).sort((a,b)=>a[0]-b[0]||a[1]-b[1]).slice(0,40);
 box.innerHTML=r.length?r.map(x=>`<li><b>${x[1]} de ${MES[x[0]-1]}</b> · ${esc(x[2])} <span class="tag">${x[3]}</span></li>`).join(''):'<li class="muted">No hemos encontrado ese nombre en estos calendarios. Prueba con otra forma del nombre (por ejemplo, «Juan» en lugar de «Juanjo»).</li>';
}
function bindSaints(){
 if(!$('sdO'))return;
 $('sdPrev').onclick=()=>{sd-=DAY;drawSaints()};$('sdNext').onclick=()=>{sd+=DAY;drawSaints()};
 const q=$('nameQ');q.addEventListener('input',()=>searchName(q.value));
}

// ---- Una fiesta, tres Iglesias ----
function drawFests(){
 const els=document.querySelectorAll('[data-fd]');if(!els.length)return;const y=now.getFullYear(),ev={};
 for(const b of ['ortodoxa','catolica','protestante'])for(const Y of [y,y+1])yearEvents(b,Y).forEach(e=>{(ev[b+'|'+e[0]]=ev[b+'|'+e[0]]||[]).push(e[1])});
 const next=k=>(ev[k]||[]).filter(t=>t>=TD).sort((a,b)=>a-b)[0];
 els.forEach(el=>{const [k,b]=el.dataset.fd.split('|'),t=next(b+'|'+k);el.textContent=t?'📅 '+fmtDY(t):''});
 const op=next('ortodoxa|pascha'),cp=next('catolica|easter');
 if($('paschaNote')&&op&&cp)setTxt('paschaNote',op===cp?'La próxima Pascua coincide en Oriente y Occidente: '+fmtDY(op)+'.':'La próxima Pascua ortodoxa es el '+fmtDY(op)+' y la católica y protestante el '+fmtDY(cp)+': '+Math.round(Math.abs(op-cp)/DAY/7)+' semanas de diferencia.');
}

// ---- Compartir versículo como imagen ----
async function shareImg(text,ref,noq){
 const c=document.createElement('canvas');c.width=1080;c.height=1080;const x=c.getContext('2d');
 try{await document.fonts.load('600 60px "Cormorant Garamond"');await document.fonts.load('700 30px "Source Sans 3"')}catch(e){}
 const g=x.createLinearGradient(0,0,0,1080);g.addColorStop(0,'#5C1A1B');g.addColorStop(1,'#3A0F11');x.fillStyle=g;x.fillRect(0,0,1080,1080);
 x.strokeStyle='#E2C27A';x.lineWidth=3;x.strokeRect(48,48,984,984);
 x.textAlign='center';x.fillStyle='#E2C27A';x.font='700 30px "Source Sans 3",sans-serif';x.fillText('Φ Ω Σ   Χ Ρ Ι Σ Τ Ο Υ',540,140);
 x.fillRect(500,170,80,2);
 let fs=66,lines;const wrap=(t,w)=>{const ws=t.split(/\s+/),out=[];let l='';for(const w2 of ws){const tr=l?l+' '+w2:w2;if(x.measureText(tr).width>w&&l){out.push(l);l=w2}else l=tr}if(l)out.push(l);return out};
 do{x.font=`600 ${fs}px "Cormorant Garamond",Georgia,serif`;lines=wrap(noq?text.trim():'«'+text.trim()+'»',860);fs-=4}while(lines.length*fs*1.3>620&&fs>30);
 const lh=(fs+4)*1.3,top=540-lines.length*lh/2+lh*.35;x.fillStyle='#FFF8EC';lines.forEach((l,i)=>x.fillText(l,540,top+i*lh));
 x.fillStyle='#E2C27A';x.font='700 38px "Source Sans 3",sans-serif';x.fillText(ref,540,top+lines.length*lh+40);
 x.fillStyle='#EBDCD6';x.font='600 32px "Source Sans 3",sans-serif';x.fillText('phosbiblias.com',540,980);
 const blob=await new Promise(r=>c.toBlob(r,'image/png'));const f=new File([blob],'phos-versiculo.png',{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:ref+' · phosbiblias.com'})}catch(e){}return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='phos-versiculo.png';document.body.append(a);a.click();a.remove();
}
document.querySelectorAll('[data-img]').forEach(b=>b.onclick=()=>{const v=b.dataset.img==='v';shareImg($(v?'vTxt':'gTxt').textContent,(v?$('vRef'):$('gRef')).textContent.replace(/^.*· /,''))});

function all(){const info=renderToday();renderReadings(info);renderGreek();renderPrayer();drawCal();renderFood(info);drawSaints();drawFests();NIDX=null;if($('nameQ'))searchName($('nameQ').value)}
const said=(k,v)=>document.dispatchEvent(new CustomEvent('phos:set',{detail:{k,v}}));
document.querySelectorAll('[data-cal]').forEach(b=>b.onclick=()=>{store.set('oldCal',b.dataset.cal==='1');said('oldCal',b.dataset.cal==='1');all()});
document.querySelectorAll('[data-br]').forEach(b=>b.onclick=()=>{BR=b.dataset.br;store.set('todayBr',BR);said('todayBr',BR);all();renderPrayers()});
document.addEventListener('phos:prefs',()=>{BR=tdBr();all();renderPrayers()});
window.PHOS={nameIndex:()=>nameIndex(),MES,norm};
bindSaints();renderGreek();all();renderReflection();bindReflection();renderPsalm();renderPrayers();

// ---- Escuchar en voz alta y compartir por WhatsApp ----
let speakBtn=null;
const NICEV=/natural|online|neural|google|premium|enhanced|mejorada|siri/i;
const esVoice=()=>{try{const vs=speechSynthesis.getVoices().filter(v=>/^es/i.test(v.lang)),n=store.get('voice','');
 return (n&&vs.find(v=>v.name===n))||vs.find(v=>NICEV.test(v.name)&&v.lang==='es-ES')||vs.find(v=>NICEV.test(v.name))||vs.find(v=>v.lang==='es-ES')||vs[0]||null}catch(e){return null}};
const vRate=()=>Math.min(1.3,Math.max(0.7,+store.get('rate',0.95)||0.95));
function speak(btn,text){const ss=window.speechSynthesis;if(!ss)return;
 if(speakBtn===btn&&ss.speaking){ss.cancel();btn.textContent=btn.dataset.lbl;speakBtn=null;return}
 ss.cancel();if(speakBtn)speakBtn.textContent=speakBtn.dataset.lbl;
 const parts=String(text).replace(/\s+/g,' ').match(/[^.!?;:]+[.!?;:]*\s*/g)||[String(text)],chunks=[];let cur='';
 parts.forEach(p=>{if((cur+p).length>220&&cur){chunks.push(cur);cur=p}else cur+=p});if(cur.trim())chunks.push(cur);
 speakBtn=btn;btn.textContent='⏹ Detener';
 chunks.forEach((c,i)=>{const u=new SpeechSynthesisUtterance(c);u.lang='es-ES';u.rate=vRate();const v=esVoice();if(v)u.voice=v;
  if(i===chunks.length-1)u.onend=u.onerror=()=>{if(speakBtn===btn){btn.textContent=btn.dataset.lbl;speakBtn=null}};ss.speak(u)});
}
const wa=t=>window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank','noopener');
function mkBtn(lbl,cls){const b=document.createElement('button');b.type='button';b.className=cls||'sharebtn';b.textContent=lbl;b.dataset.lbl=lbl;return b}
document.querySelectorAll('[data-listen]').forEach(b=>{if(!window.speechSynthesis||store.get('listenOff',false)){b.hidden=true;return}b.dataset.lbl=b.textContent;b.onclick=()=>{const t=document.querySelector(b.dataset.listen);if(t)speak(b,t.innerText)}});
document.querySelectorAll('[data-wa]').forEach(b=>b.onclick=()=>{const v=b.dataset.wa==='v',tx=$(v?'vTxt':'gTxt').textContent.trim(),rf=(v?$('vRef'):$('gRef')).textContent.replace(/^.*· /,'');
 wa('«'+tx+'» ('+rf+')\n\n'+(v?'Versículo del día':'La Palabra de hoy')+' en Phos: https://phosbiblias.com/lecturas.html')});
{const rs=$('rShare');if(rs){const b=mkBtn('💬 WhatsApp','obtn');b.onclick=()=>wa(reflText+' — '+$('rRef').textContent+'\n\nReflexión del día en Phos: https://phosbiblias.com/lecturas.html');rs.after(b)}}
const listenOff=!!store.get('listenOff',false);
if(window.speechSynthesis&&!listenOff){
 const p=$('pTxt');if(p){const b=mkBtn('🔊 Escuchar la oración');b.style.marginTop='10px';b.onclick=()=>speak(b,p.innerText);p.after(b)}
 const art=document.querySelector('article.art');if(art){const b=mkBtn('🔊 Escuchar el artículo');b.style.margin='4px 0 18px';b.onclick=()=>speak(b,[...art.querySelectorAll('h1,h2,h3,p,li')].filter(e=>!e.closest('.btns')).map(e=>e.innerText).join('\n'));(art.querySelector('.alead')||art.querySelector('h1')).after(b)}
}
document.querySelectorAll('.phx-share').forEach(box=>{const ti=box.dataset.title||'',tx=box.dataset.text||'';box.classList.add('sharerow');
 const w=mkBtn('💬 Compartir por WhatsApp');w.onclick=()=>wa(ti+(tx?': '+tx:'')+'\n\nhttps://phosbiblias.com/santo-de-hoy');
 const i=mkBtn('🖼️ Compartir como imagen');i.onclick=()=>shareImg(tx||ti,ti,true);box.append(w,i)});
if(listenOff&&$('rListen'))$('rListen').hidden=true;
window.addEventListener('pagehide',()=>{try{speechSynthesis.cancel()}catch(e){}});
})();
(function(){document.querySelectorAll(".dx").forEach(function(e){try{var v=decodeURIComponent(escape(atob(e.dataset.x)));e.textContent=v;if(e.dataset.mail)e.href="mailto:"+v}catch(_){}})})();

/* Cantos: el reproductor de YouTube solo se carga cuando el visitante lo pide */
document.addEventListener('click',function(e){
 var b=e.target.closest&&e.target.closest('.ytfacade');if(!b)return;
 var box=b.closest('.ytbox'),id=box&&box.dataset.yt;if(!id)return;
 var f=document.createElement('iframe');
 f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';
 f.title=box.dataset.title||'Canto';
 f.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
 f.referrerPolicy='strict-origin-when-cross-origin';
 f.setAttribute('allowfullscreen','');
 box.innerHTML='';box.appendChild(f);
});
