// ---------- Calendario mensual con fiestas, ayunos e iconos ----------
const TDC={
es:{f:["Sin ayuno","Ayuno estricto","Aceite y vino","Pescado","Lácteos","Ayuno estricto","Ayuno y abstinencia","Abstinencia","Día penitencial","Solemnidad","Sin ayuno","Sin ayuno obligatorio","Ayuno voluntario","Ayuno voluntario"],u:["Calendario","Leyenda","Mes anterior","Mes siguiente","Fiestas y días señalados del mes","Toca un día para ver su detalle."]},
en:{f:["No fast","Strict fast","Wine & oil","Fish","Dairy","Strict fast","Fast & abstinence","Abstinence","Day of penance","Solemnity","No fast","No obligatory fast","Voluntary fast","Voluntary fast"],u:["Calendar","Legend","Previous month","Next month","Feasts and notable days this month","Tap a day to see its details."]},
pt:{f:["Sem jejum","Jejum estrito","Azeite e vinho","Peixe","Lacticínios","Jejum estrito","Jejum e abstinência","Abstinência","Dia penitencial","Solenidade","Sem jejum","Sem jejum obrigatório","Jejum voluntário","Jejum voluntário"],u:["Calendário","Legenda","Mês anterior","Mês seguinte","Festas e dias assinalados do mês","Toque num dia para ver o detalhe."]},
fr:{f:["Pas de jeûne","Jeûne strict","Huile et vin","Poisson","Laitages","Jeûne strict","Jeûne et abstinence","Abstinence","Jour de pénitence","Solennité","Pas de jeûne","Pas de jeûne obligatoire","Jeûne volontaire","Jeûne volontaire"],u:["Calendrier","Légende","Mois précédent","Mois suivant","Fêtes et jours marquants du mois","Touchez un jour pour voir le détail."]},
it:{f:["Nessun digiuno","Digiuno stretto","Olio e vino","Pesce","Latticini","Digiuno stretto","Digiuno e astinenza","Astinenza","Giorno penitenziale","Solennità","Nessun digiuno","Nessun digiuno obbligatorio","Digiuno volontario","Digiuno volontario"],u:["Calendario","Legenda","Mese precedente","Mese successivo","Feste e giorni importanti del mese","Tocca un giorno per vederne i dettagli."]},
de:{f:["Kein Fasten","Strenges Fasten","Öl und Wein","Fisch","Milchprodukte","Strenges Fasten","Fasten und Abstinenz","Abstinenz","Bußtag","Hochfest","Kein Fasten","Kein Pflichtfasten","Freiwilliges Fasten","Freiwilliges Fasten"],u:["Kalender","Legende","Vorheriger Monat","Nächster Monat","Feste und besondere Tage des Monats","Tippe auf einen Tag, um Details zu sehen."]},
el:{f:["Κατάλυση εις πάντα","Αυστηρή νηστεία","Λάδι και κρασί","Ψάρι","Γαλακτοκομικά","Αυστηρή νηστεία","Νηστεία και αποχή","Αποχή","Ημέρα μετάνοιας","Επίσημη εορτή","Χωρίς νηστεία","Χωρίς υποχρεωτική νηστεία","Εθελοντική νηστεία","Εθελοντική νηστεία"],u:["Ημερολόγιο","Υπόμνημα","Προηγούμενος μήνας","Επόμενος μήνας","Εορτές και σημαντικές ημέρες του μήνα","Πατήστε μια ημέρα για λεπτομέρειες."]},
ru:{f:["Поста нет","Строгий пост","Масло и вино","Рыба","Молочное","Строгий пост","Пост и воздержание","Воздержание","Покаянный день","Торжество","Поста нет","Нет обязательного поста","Добровольный пост","Добровольный пост"],u:["Календарь","Обозначения","Предыдущий месяц","Следующий месяц","Праздники и памятные дни месяца","Нажмите на день, чтобы увидеть подробности."]},
ro:{f:["Fără post","Post aspru","Ulei și vin","Pește","Lactate","Post aspru","Post și abstinență","Abstinență","Zi de pocăință","Solemnitate","Fără post","Fără post obligatoriu","Post de bunăvoie","Post de bunăvoie"],u:["Calendar","Legendă","Luna anterioară","Luna următoare","Sărbători și zile însemnate ale lunii","Atinge o zi ca să vezi detaliile."]}};
const tdc=()=>TDC[LANG]||TDC.en;
const fShort=k=>tdc().f[FTK.indexOf(k)];
// Pequeña imagen (icono) de cada celebración
const EVICO={nativity:'⭐',theophany:'💧',theophEve:'💧',baptism:'💧',meeting:'🕊️',presentation:'🕊️',annunciation:'👼',palm:'🌿',pascha:'🔆',easter:'🔆',ascension:'☁️',pentecost:'🔥',spiritMon:'🔥',transfiguration:'⛰️',exaltation:'✝️',crossSun:'✝️',holyThu:'🍞',holyFri:'✝️',holySat:'🕯️',cleanmon:'🕯️',ashWed:'⚱️',circBasil:'📜',epiphany:'⭐',trinity:'🔺',corpus:'🍞',sacredHeart:'❤️',mercy:'❤️',christKing:'👑',advent1:'🕯️',holyFamily:'🏠',
 nativTheotokos:'🌸',entry:'🌸',synTheotokos:'🌸',maryMother:'🌸',visitation:'🌸',nativMary:'🌸',immaculate:'🌸',dormition:'🌹',assumption:'🌹',protection:'🌹',guadalupe:'🌹',
 george:'🐉',nicholas:'🎁',archangelsO:'👼',archangelsC:'👼',johnBapNat:'💧',synJohn:'💧',beheading:'💧',martyrJohn:'💧',peterPaul:'🔑',chairPeter:'🔑',andrew:'✖️',thomas:'✋',thomasAp:'✋',myrrh:'🏺',magdalene:'🏺',lazarus:'🌅',mark:'📖',luke:'📖',matthew:'📖',johnTheo:'📖',johnAp:'📖',elijah:'🔥',
 publican:'📖',prodigal:'📖',meatfare:'📖',forgiveness:'🤝',orthodoxy:'🖼️',palamas:'📖',climacus:'🪜',maryEgypt:'📖',midPent:'💧',allSaintsO:'✨',allSaints:'✨',allSouls:'🕯️',newYear:'🗓️',reformation:'📜',francis:'🕊️',patrick:'☘️',joseph:'🔨',stephen:'🌿',innocents:'🌿',catherine:'🌿',barbara:'🌿',demetrius:'🛡️',hierarchs:'📜',chrysostom:'📜',aquinas:'📜',augustine:'📜',teresa:'📜',cyrilMeth:'📜',benedict:'⛪',martin:'🧥',constHelen:'✝️',anthony:'🏜️',james:'🐚',convPaul:'⚡'};
const evIco=id=>EVICO[id]||'✨';
const FASTICO={o_fish:'🐟',o_wo:'🫒',o_dairy:'🧀',o_strict:'⛔',o_holyfri:'✝️',c_fastabst:'⚱️',c_abst:'🐟',c_fri:'🙏',p_lent:'🙏',p_goodfri:'✝️'};
const FAST_LEG={ortodoxa:['o_free','o_dairy','o_fish','o_wo','o_strict'],catolica:['c_none','c_fri','c_abst','c_fastabst'],protestante:['p_none','p_lent']};
let tdCalYM=null,tdSel=null;
function drawCal(){
 const box=document.getElementById('tdCal');if(!box)return;
 const now=new Date(),today=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),br=tdBr();
 if(!tdCalYM)tdCalYM=[now.getFullYear(),now.getMonth()+1];if(tdSel==null)tdSel=today;
 const [Y,M]=tdCalYM,first=utc(Y,M,1),nd=new Date(Date.UTC(Y,M,0)).getUTCDate(),off=(wday(first)+6)%7;
 const maj=br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ;
 let mname='';try{mname=capF(new Intl.DateTimeFormat(LANG,{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(first)))}catch(e){mname=Y+'-'+M}
 let wk=[];try{const f=new Intl.DateTimeFormat(LANG,{weekday:'narrow',timeZone:'UTC'});for(let i=0;i<7;i++)wk.push(f.format(new Date(utc(2024,1,1+i))))}catch(e){wk='LMXJVSD'.split('')}
 const cells=[],evs=[];
 for(let i=0;i<off;i++)cells.push('<span class="cd empty"></span>');
 for(let d=1;d<=nd;d++){const x=utc(Y,M,d),inf=dayInfo(br,x),top=inf.cel.find(c=>maj.has(c))||inf.cel[0],isMaj=inf.cel.some(c=>maj.has(c));
  inf.cel.forEach(c=>evs.push([x,c,maj.has(c)]));
  cells.push(`<button class="cd fz-${inf.f}${x===today?' today':''}${x===tdSel?' sel':''}${wday(x)===0?' sun':''}${isMaj?' maj':''}" data-x="${x}" aria-label="${esc(fmtD(new Date(x))+' · '+fShort(inf.f)+(inf.cel.length?' · '+inf.cel.map(celName).join(', '):''))}"><b>${d}</b><i>${top?evIco(top):(FASTICO[inf.f]||'')}</i>${info_color(inf)}</button>`)}
 const sel=dayInfo(br,tdSel);
 box.innerHTML=`<h2 class="tdh">📅 ${esc(tdc().u[0])}</h2>
 <div class="calnav"><button class="iconbtn calp" aria-label="${esc(tdc().u[2])}">‹</button><b class="calm">${esc(mname)}</b><button class="iconbtn caln" aria-label="${esc(tdc().u[3])}">›</button></div>
 <div class="calgrid wk">${wk.map(w=>`<span>${esc(w)}</span>`).join('')}</div>
 <div class="calgrid">${cells.join('')}</div>
 <div class="calleg">${FAST_LEG[br].map(k=>`<span><i class="sw fz-${k}">${FASTICO[k]||'✓'}</i>${esc(fShort(k))}</span>`).join('')}</div>
 <div class="calday"><p class="caldate">${esc(fmtLong(new Date(tdSel)))}</p>
  ${sel.cel.length?`<ul class="tdcel">${sel.cel.map(c=>`<li${maj.has(c)?' class="maj"':''}><span class="evi">${evIco(c)}</span>${esc(celName(c))}</li>`).join('')}</ul>`:''}
  <p class="tdseason"><span class="pill soft">${esc(snName(sel.s))}</span>${sel.color?`<span class="tdcolor"><i style="background:${COLHEX[sel.color]}"></i>${esc(t(sel.color))}</span>`:''}</p>
  <p class="tdfast f-${sel.f}"><span class="evi">${FASTICO[sel.f]||'✅'}</span>${esc(ftText(sel.f))}</p></div>
 <h3 class="calh">${esc(tdc().u[4])}</h3>
 <ul class="calev">${evs.map(([x,c,m])=>`<li${m?' class="maj"':''}><button data-x="${x}"><span class="evd">${new Date(x).getUTCDate()}</span><span class="evi">${evIco(c)}</span><span>${esc(celName(c))}</span></button></li>`).join('')}</ul>
 <p class="note">${esc(tdc().u[5])}</p>`;
 box.querySelector('.calp').onclick=()=>{let [y,m]=tdCalYM;m--;if(m<1){m=12;y--}tdCalYM=[y,m];tdSel=utc(y,m,1);drawCal()};
 box.querySelector('.caln').onclick=()=>{let [y,m]=tdCalYM;m++;if(m>12){m=1;y++}tdCalYM=[y,m];tdSel=utc(y,m,1);drawCal()};
 box.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{tdSel=+b.dataset.x;drawCal();const d=box.querySelector('.calday');if(d&&b.closest('.calev'))d.scrollIntoView({behavior:'smooth',block:'center'})});
}
function info_color(inf){return inf.color?`<em style="background:${COLHEX[inf.color]}"></em>`:''}
const _renderTodayC=renderToday;
renderToday=function(){
 _renderTodayC();
 // iconos en las listas de hoy y de próximas fiestas
 const br=tdBr(),now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate());
 const cel=dayInfo(br,td).cel;view.querySelectorAll('.tdcel li').forEach((li,i)=>{if(cel[i])li.insertAdjacentHTML('afterbegin',`<span class="evi">${evIco(cel[i])}</span>`)});
 const up=upcoming(br,td,4);view.querySelectorAll('.tdnext li').forEach((li,i)=>{if(up[i])li.insertAdjacentHTML('afterbegin',`<span class="evi big">${evIco(up[i][0])}</span>`)});
 const f=dayInfo(br,td).f,fp=view.querySelector('.tdfast');if(fp)fp.insertAdjacentHTML('afterbegin',`<span class="evi">${FASTICO[f]||'✅'}</span>`);
 const last=view.querySelector('.tdnext');const sec=last&&last.closest?last.closest('section'):null;
 const c=document.createElement('section');c.className='art tdcard';c.id='tdCal';
 if(sec)sec.after(c);else view.appendChild(c);
 tdCalYM=null;tdSel=null;drawCal();
};
