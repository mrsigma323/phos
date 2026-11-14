// ---------- Página principal «Hoy»: versículo, fiesta, ayuno y oración según el día y la Iglesia ----------
const CNK=['publican','prodigal','meatfare','forgiveness','cleanmon','orthodoxy','palamas','crossSun','climacus','maryEgypt','lazarus','holyThu','holyFri','holySat','thomas','myrrh','midPent','spiritMon','allSaintsO','circBasil','theophEve','synJohn','anthony','hierarchs','george','mark','cyrilMeth','constHelen','johnBapNat','peterPaul','elijah','magdalene','beheading','newYear','johnTheo','protection','thomasAp','luke','demetrius','archangelsO','chrysostom','matthew','catherine','andrew','barbara','nicholas','spyridon','synTheotokos','stephen','innocents','ashWed','easter','mercy','trinity','corpus','sacredHeart','advent1','christKing','holyFamily','baptism','maryMother','epiphany','convPaul','aquinas','presentation','chairPeter','patrick','joseph','visitation','benedict','james','ignatius','assumption','augustine','martyrJohn','nativMary','archangelsC','francis','teresa','allSaints','allSouls','martin','immaculate','guadalupe','johnAp','bartholomew','reformation'];
const SNK=['o_triodion','o_lent','holyweek','o_pascha','o_pent','o_apostles','o_dormition','o_nativityfast','o_christmastide','o_ordinary','advent','christmas','c_ordinary','c_lent','triduum','easter','epiphany','afterpent'];
const FTK=['o_free','o_strict','o_wo','o_fish','o_dairy','o_holyfri','c_fastabst','c_abst','c_fri','c_sol','c_none','p_none','p_lent','p_goodfri'];
const PRK=['heavenly','trisagion','jesus','phos','ephrem','ave','angelus','subtuum','nunc','magn','ourf','psalm'];
const T14K=['tdTitle','tdSeason','tdCeleb','tdNone','tdFast','tdPrayer','tdNext','tdIn','tdTomorrow','tdNote','tdFastHint','tdColor','tdMorning','tdMidday','tdAfternoon','tdEvening','tdNight','tdLentPr','tdCalNew','tdCalOld','tdCalNote','tdEuch','tdViolet','tdWhite','tdGreen','tdRed','tdNav'];
for(const l in TDL){if(T[l])T14K.forEach((k,i)=>T[l][k]=TDL[l].ui[i])}
const tdL=()=>TDL[LANG]||TDL.en;
const FIDX={};FEASTS.forEach((f,i)=>FIDX[f[0]]=i);
const celName=id=>FIDX[id]!=null?fName(FIDX[id]):tdL().cn[CNK.indexOf(id)];
const snName=k=>tdL().sn[SNK.indexOf(k)], snNote=k=>tdL().snote[SNK.indexOf(k)], ftText=k=>tdL().ft[FTK.indexOf(k)];
const prName=k=>tdL().prn[PRK.indexOf(k)], prText=k=>tdL().prt[PRK.indexOf(k)];

// --- Calendario ---
const DAY=864e5, utc=(y,m,d)=>Date.UTC(y,m-1,d), wday=x=>new Date(x).getUTCDay();
function gEaster(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return utc(y,mo,da)}
const oPascha=y=>paschaDate(y).getTime();
function advent1(y){const x=utc(y,12,25),w=wday(x);return x-(w===0?7:w)*DAY-21*DAY}
function holyFamily(y){for(let d=26;d<=31;d++){const x=utc(y,12,d);if(wday(x)===0)return x}return utc(y,12,30)}
function baptismDay(y){let x=utc(y,1,7);while(wday(x)!==0)x+=DAY;return x}
const O_MOV=[['publican',-70],['prodigal',-63],['meatfare',-56],['forgiveness',-49],['cleanmon',-48],['orthodoxy',-42],['palamas',-35],['crossSun',-28],['climacus',-21],['maryEgypt',-14],['lazarus',-8],['palm',-7],['holyThu',-3],['holyFri',-2],['holySat',-1],['pascha',0],['thomas',7],['myrrh',14],['midPent',24],['ascension',39],['pentecost',49],['spiritMon',50],['allSaintsO',56]];
const O_FIX=[['circBasil',1,1],['theophEve',1,5],['theophany',1,6],['synJohn',1,7],['anthony',1,17],['hierarchs',1,30],['meeting',2,2],['annunciation',3,25],['george',4,23],['mark',4,25],['cyrilMeth',5,11],['constHelen',5,21],['johnBapNat',6,24],['peterPaul',6,29],['elijah',7,20],['magdalene',7,22],['transfiguration',8,6],['dormition',8,15],['beheading',8,29],['newYear',9,1],['nativTheotokos',9,8],['exaltation',9,14],['johnTheo',9,26],['protection',10,1],['thomasAp',10,6],['luke',10,18],['demetrius',10,26],['archangelsO',11,8],['chrysostom',11,13],['matthew',11,16],['entry',11,21],['catherine',11,25],['andrew',11,30],['barbara',12,4],['nicholas',12,6],['spyridon',12,12],['nativity',12,25],['synTheotokos',12,26],['stephen',12,27],['innocents',12,29]];
const O_MAJ=new Set(['nativTheotokos','exaltation','entry','nativity','theophany','meeting','annunciation','palm','pascha','ascension','pentecost','transfiguration','dormition','cleanmon','peterPaul']);
const O_GREAT=new Set(['nativTheotokos','exaltation','entry','nativity','theophany','meeting','annunciation','transfiguration','dormition']);
const C_MOV=[['ashWed',-46],['palm',-7],['holyThu',-3],['holyFri',-2],['holySat',-1],['easter',0],['mercy',7],['ascension',39],['pentecost',49],['trinity',56],['corpus',60],['sacredHeart',68]];
const C_FIX=[['maryMother',1,1],['epiphany',1,6],['anthony',1,17],['convPaul',1,25],['aquinas',1,28],['presentation',2,2],['cyrilMeth',2,14],['chairPeter',2,22],['patrick',3,17],['joseph',3,19],['annunciation',3,25],['george',4,23],['mark',4,25],['visitation',5,31],['johnBapNat',6,24],['peterPaul',6,29],['benedict',7,11],['magdalene',7,22],['james',7,25],['ignatius',7,31],['transfiguration',8,6],['assumption',8,15],['bartholomew',8,24],['augustine',8,28],['martyrJohn',8,29],['nativMary',9,8],['exaltation',9,14],['matthew',9,21],['archangelsC',9,29],['francis',10,4],['teresa',10,15],['luke',10,18],['allSaints',11,1],['allSouls',11,2],['martin',11,11],['catherine',11,25],['andrew',11,30],['nicholas',12,6],['immaculate',12,8],['guadalupe',12,12],['nativity',12,25],['stephen',12,26],['johnAp',12,27],['innocents',12,28]];
const C_MAJ=new Set(['maryMother','epiphany','presentation','joseph','annunciation','ashWed','palm','holyThu','holyFri','easter','ascension','pentecost','trinity','corpus','sacredHeart','johnBapNat','peterPaul','assumption','allSaints','christKing','advent1','immaculate','nativity']);
const C_SOL=new Set(['maryMother','epiphany','joseph','annunciation','johnBapNat','peterPaul','assumption','allSaints','immaculate','nativity','sacredHeart']);
const P_MOV=[['ashWed',-46],['palm',-7],['holyThu',-3],['holyFri',-2],['easter',0],['ascension',39],['pentecost',49],['trinity',56]];
const P_FIX=[['epiphany',1,6],['convPaul',1,25],['presentation',2,2],['annunciation',3,25],['mark',4,25],['johnBapNat',6,24],['peterPaul',6,29],['james',7,25],['bartholomew',8,24],['matthew',9,21],['luke',10,18],['reformation',10,31],['allSaints',11,1],['andrew',11,30],['nativity',12,25],['stephen',12,26],['johnAp',12,27]];
const P_MAJ=new Set(['epiphany','ashWed','palm','holyFri','easter','ascension','pentecost','trinity','reformation','allSaints','advent1','nativity']);
const tdBr=()=>{const b=store.get('todayBr',null);return ['ortodoxa','catolica','protestante'].includes(b)?b:'ortodoxa'};
const tdOld=()=>{const v=store.get('oldCal',null);return v===null?LANG==='ru':!!v};
// Todas las celebraciones de un año (fechas civiles), para una Iglesia
function yearEvents(br,y){
 const out=[],old=tdOld();
 if(br==='ortodoxa'){const P=oPascha(y);O_MOV.forEach(([id,o])=>out.push([id,P+o*DAY]));O_FIX.forEach(([id,m,d])=>out.push([id,utc(y,m,d)+(old?13*DAY:0)]))}
 else{const E=gEaster(y);(br==='catolica'?C_MOV:P_MOV).forEach(([id,o])=>out.push([id,E+o*DAY]));(br==='catolica'?C_FIX:P_FIX).forEach(([id,m,d])=>out.push([id,utc(y,m,d)]));
  // Traslados litúrgicos (católicos y protestantes): la Anunciación en Semana Santa u Octava de Pascua pasa al lunes tras el 2.º domingo de Pascua; en domingo de Cuaresma, al lunes. San José en Semana Santa pasa al sábado anterior al Domingo de Ramos; en domingo de Cuaresma, al lunes.
  for(const e of out){const dE=Math.round((e[1]-E)/DAY),sun=new Date(e[1]).getUTCDay()===0;
   if(e[0]==='annunciation'){if(dE>=-7&&dE<=7)e[1]=E+8*DAY;else if(sun&&dE>=-46&&dE<0)e[1]+=DAY}
   if(e[0]==='joseph'){if(dE>=-7&&dE<=-1)e[1]=E-8*DAY;else if(sun&&dE>=-46&&dE<0)e[1]+=DAY}}
  const A=advent1(y);out.push(['advent1',A]);if(br==='catolica'){out.push(['christKing',A-7*DAY]);out.push(['holyFamily',holyFamily(y)]);out.push(['baptism',baptismDay(y)])}}
 return out;
}
function celebsOn(br,td){const y=new Date(td).getUTCFullYear();return [y-1,y].flatMap(Y=>yearEvents(br,Y)).filter(e=>e[1]===td).map(e=>e[0])}
function upcoming(br,td,n){const y=new Date(td).getUTCFullYear(),maj=br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ;
 return [y-1,y,y+1].flatMap(Y=>yearEvents(br,Y)).filter(e=>maj.has(e[0])&&e[1]>td).sort((a,b)=>a[1]-b[1]).slice(0,n)}
function dayInfo(br,td){
 const y=new Date(td).getUTCFullYear(),wd=wday(td),cel=celebsOn(br,td);
 if(br==='ortodoxa'){
  const old=tdOld(),P=oPascha(y),dP=Math.round((td-P)/DAY),cd=new Date(td-(old?13*DAY:0)),cm=cd.getUTCMonth()+1,cdd=cd.getUTCDate(),v=cm*100+cdd;
  const inC=(a,b)=>v>=a&&v<=b;let s,f;
  if(dP>=-70&&dP<=-49)s='o_triodion';else if(dP>=-48&&dP<=-8)s='o_lent';else if(dP>=-7&&dP<=-1)s='holyweek';else if(dP>=0&&dP<=38)s='o_pascha';else if(dP>=39&&dP<=56)s='o_pent';
  else if(dP>=57&&td<=utc(y,6,28)+(old?13*DAY:0))s='o_apostles';else if(inC(801,814))s='o_dormition';else if(inC(1115,1224))s='o_nativityfast';else if(inC(1225,1231)||inC(101,104))s='o_christmastide';else s='o_ordinary';
  const great=cel.some(c=>O_GREAT.has(c));
  if((dP>=1&&dP<=6)||(dP>=50&&dP<=55)||(dP>=-69&&dP<=-64)||s==='o_christmastide')f='o_free';
  else if(dP>=-55&&dP<=-49)f='o_dairy';
  else if(dP===-2)f='o_holyfri';
  else if(s==='o_lent'||s==='holyweek')f=(v===325||dP===-7)?'o_fish':(wd===0||wd===6)?'o_wo':'o_strict';
  else if(s==='o_dormition')f=v===806?'o_fish':(wd===0||wd===6)?'o_wo':'o_strict';
  else if(s==='o_apostles'||s==='o_nativityfast'){if(v===1224)f='o_strict';else if(s==='o_nativityfast'&&inC(1220,1223))f=[1,3,5].includes(wd)?'o_strict':'o_wo';else f=(wd===3||wd===5)&&!great?'o_strict':'o_fish'}
  else if(v===105||v===829||v===914)f='o_wo';
  else if(wd===3||wd===5)f=great?'o_fish':'o_strict';
  else f='o_free';
  return {s,f,cel,color:null,lent:s==='o_lent'&&wd>=1&&wd<=5};
 }
 const E=gEaster(y),dE=Math.round((td-E)/DAY),A=advent1(y),xmas=utc(y,12,25);let s,f,color;
 if(br==='catolica'){
  if(td>=A&&td<xmas)s='advent';else if(td>=xmas||td<=baptismDay(y))s='christmas';else if(dE>=-46&&dE<=-8)s='c_lent';else if(dE>=-7&&dE<=-4)s='holyweek';else if(dE>=-3&&dE<=-1)s='triduum';else if(dE>=0&&dE<=49)s='easter';else s='c_ordinary';
  color={advent:'tdViolet',christmas:'tdWhite',c_lent:'tdViolet',holyweek:'tdViolet',triduum:'tdWhite',easter:'tdWhite',c_ordinary:'tdGreen'}[s];
  if(cel.some(c=>C_SOL.has(c)))color='tdWhite';
  if(dE===-7||dE===-2||dE===49)color='tdRed';
  if(dE===-46||dE===-2)f='c_fastabst';
  else if(wd===5){if(cel.some(c=>C_SOL.has(c))||(dE>=1&&dE<=6))f='c_sol';else if(dE>=-46&&dE<=-3)f='c_abst';else f='c_fri'}
  else f='c_none';
 }else{
  if(td>=A&&td<xmas)s='advent';else if(td>=xmas||td<utc(y,1,6))s='christmas';else if(dE<-46)s='epiphany';else if(dE<=-8)s='c_lent';else if(dE<=-1)s='holyweek';else if(dE<=49)s='easter';else s='afterpent';
  f=dE===-2?'p_goodfri':(s==='c_lent'||s==='holyweek')?'p_lent':'p_none';
 }
 return {s,f,cel,color,lent:false};
}
const PR_BIB={nunc:['LUK',2,29,32],magn:['LUK',1,46,55],ourf:['MAT',6,9,13]};
function prayerFor(br,h){
 const per=h>=5&&h<11?'tdMorning':h>=11&&h<14?'tdMidday':h>=14&&h<18?'tdAfternoon':h>=18&&h<22?'tdEvening':'tdNight';
 const M={ortodoxa:{tdMorning:'heavenly',tdMidday:'trisagion',tdAfternoon:'jesus',tdEvening:'phos',tdNight:'nunc'},
  catolica:{tdMorning:'ave',tdMidday:'angelus',tdAfternoon:'ourf',tdEvening:'magn',tdNight:'subtuum'},
  protestante:{tdMorning:['psalm','PSA',143,8,8],tdMidday:'ourf',tdAfternoon:['psalm','PSA',121,1,2],tdEvening:['psalm','PSA',141,2,2],tdNight:['psalm','PSA',4,8,8]}};
 const p=M[br][per];
 if(Array.isArray(p))return {per,k:p[0],ref:p.slice(1)};
 if(p==='ourf'&&br!=='protestante'&&typeof OURF!=='undefined')return {per,k:p,ref:null};
 return {per,k:p,ref:PR_BIB[p]||null};
}
const capF=x=>x?x.charAt(0).toUpperCase()+x.slice(1):x;
const fmtLong=d=>{try{return capF(new Intl.DateTimeFormat(LANG,{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(d))}catch(e){return d.toISOString().slice(0,10)}};
const COLHEX={tdViolet:'#6B3FA0',tdWhite:'#F4EFE3',tdGreen:'#3F7A3A',tdRed:'#B3261E'};


// ---- Personalización por Iglesia: santo del día, personaje bíblico, Biblia y palabra del día ----
const _nk=x=>String(x).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const _keyw=x=>_nk(x).split(/[^a-z]+/).filter(w=>w.length>3&&!['santa','santo','santos','bienaventurada','virgen','senor','fiesta','iglesia','obispo','martir','presbitero','doctor'].includes(w));
function daySaints(br,td){
 const d=new Date(br==='ortodoxa'&&tdOld()?td-13*DAY:td),m=d.getUTCMonth()+1,dd=d.getUTCDate();
 let L=[];
 if(br==='catolica'&&typeof SANTOS!=='undefined')L=SANTOS.filter(x=>x[0]===m&&x[1]===dd&&x[3]<6).map(x=>x[2]);
 else if(br==='ortodoxa'&&typeof SANTOS_O!=='undefined')L=SANTOS_O.filter(x=>x[0]===m&&x[1]===dd).map(x=>x[2]);
 const used=new Set(celebsOn(br,td).map(celName).filter(Boolean).flatMap(_keyw));
 return L.filter(n=>!_keyw(n).some(w=>used.has(w)));
}
const BIBFIG=[['Abraham','Padre de la fe: dejó su tierra confiando en la promesa de Dios.','GEN 12:1'],['Sara','Rio al oír la promesa y fue madre en su vejez.','HEB 11:11'],['Isaac','El hijo de la promesa, padre de Jacob y Esaú.','GEN 26:24'],['Jacob','Luchó con Dios y recibió el nombre de Israel.','GEN 32:28'],['José','Vendido por sus hermanos, los perdonó y salvó a su familia.','GEN 50:20'],['Moisés','Sacó al pueblo de Egipto y recibió la Ley en el Sinaí.','EXO 3:10'],['Miriam','Profetisa que cantó la liberación junto al mar.','EXO 15:21'],['Josué','Guio al pueblo a la tierra prometida.','JOS 1:9'],['Débora','Jueza y profetisa que animó a Israel.','JDG 4:4'],['Gedeón','Venció con pocos hombres confiando en Dios.','JDG 6:12'],['Rut','Fiel a su suegra y bisabuela del rey David.','RUT 1:16'],['Ana','Oró con lágrimas y fue madre de Samuel.','1SA 1:27'],['Samuel','Escuchó la voz de Dios desde niño.','1SA 3:10'],['David','Pastor, rey y salmista según el corazón de Dios.','1SA 16:7'],['Salomón','Pidió sabiduría para gobernar al pueblo.','1KI 3:9'],['Elías','Profeta que oyó a Dios en el susurro de una brisa.','1KI 19:12'],['Eliseo','Recibió el manto y el espíritu de Elías.','2KI 2:9'],['Josías','Rey joven que volvió a la Palabra de Dios.','2KI 23:25'],['Nehemías','Reconstruyó los muros de Jerusalén orando y trabajando.','NEH 2:4'],['Ester','Arriesgó su vida por su pueblo.','EST 4:14'],['Job','Mantuvo su fe en medio del sufrimiento.','JOB 19:25'],['Isaías','Dijo «Heme aquí, envíame a mí».','ISA 6:8'],['Jeremías','Profeta llamado desde antes de nacer.','JER 1:5'],['Daniel','Fiel en la oración aun en el foso de los leones.','DAN 6:10'],['Jonás','Huyó de Dios y aprendió su misericordia.','JON 4:2'],['Miqueas','Resumió lo que Dios pide: justicia, misericordia y humildad.','MIC 6:8'],['María','La madre de Jesús, que creyó la palabra del ángel.','LUK 1:38'],['Juan el Bautista','Preparó el camino del Señor.','JOH 1:29'],['Pedro','Pescador llamado por Jesús, roca de la primera Iglesia.','MAT 16:16'],['Andrés','Llevó a su hermano Pedro hasta Jesús.','JOH 1:41'],['Juan','El discípulo amado, que escribió «Dios es amor».','1JO 4:16'],['Santiago','Enseñó que la fe se ve en las obras.','JAM 2:17'],['Mateo','Recaudador de impuestos que dejó todo para seguir a Jesús.','MAT 9:9'],['Tomás','Dudó y luego confesó: «¡Señor mío y Dios mío!».','JOH 20:28'],['María Magdalena','Primera testigo de la Resurrección.','JOH 20:18'],['Marta y María','Amigas de Jesús que lo recibieron en su casa.','LUK 10:42'],['Lázaro','Jesús lo resucitó y dijo: «Yo soy la resurrección».','JOH 11:25'],['Zaqueo','Bajó del árbol y cambió su vida al encontrarse con Jesús.','LUK 19:9'],['Nicodemo','Buscó a Jesús de noche y oyó hablar del nuevo nacimiento.','JOH 3:16'],['Esteban','Primer mártir, que perdonó a quienes lo mataban.','ACT 7:60'],['Felipe','Explicó las Escrituras al etíope en el camino.','ACT 8:35'],['Pablo','Perseguidor convertido en apóstol de las naciones.','ACT 9:15'],['Bernabé','«Hijo de consolación», animaba a los demás.','ACT 11:23'],['Lidia','Comerciante que abrió su casa a la primera iglesia de Europa.','ACT 16:14'],['Priscila y Aquila','Matrimonio que enseñaba la fe y acogía iglesias en su casa.','ROM 16:3'],['Timoteo','Joven pastor animado por Pablo a ser ejemplo.','1TI 4:12'],['Silas','Cantaba himnos en la cárcel junto a Pablo.','ACT 16:25'],['Onésimo','Esclavo que se convirtió en hermano amado.','PHM 1:16']];
const figToday=()=>BIBFIG[dayIdx()%BIBFIG.length];
const bibleEd=br=>(br==='protestante'||LANG!=='es')?'reina-valera-1909':'es-blm';
const bibleName=br=>bibleEd(br)==='es-blm'?'Santa Biblia libre para el mundo (nombre divino como en la liturgia: «el Señor»)':'Reina-Valera 1909';
const WGK=[['φῶς','phōs','luz','JOH 8:12'],['ἀγάπη','agápē','amor','1CO 13:13'],['χάρις','cháris','gracia','EPH 2:8'],['εἰρήνη','eirḗnē','paz','JOH 14:27'],['πίστις','pístis','fe','HEB 11:1'],['ἐλπίς','elpís','esperanza','ROM 5:5'],['λόγος','lógos','palabra, Verbo','JOH 1:1'],['ζωή','zōḗ','vida','JOH 14:6'],['ἀλήθεια','alḗtheia','verdad','JOH 8:32'],['σωτηρία','sōtēría','salvación','ACT 4:12'],['χαρά','chará','alegría','JOH 15:11'],['ἔλεος','éleos','misericordia','LUK 1:50'],['μετάνοια','metánoia','conversión, cambio de corazón','MAT 3:8'],['εὐχαριστία','eucharistía','acción de gracias','PHP 4:6'],['δόξα','dóxa','gloria','LUK 2:14'],['πνεῦμα','pneûma','espíritu, aliento','JOH 4:24'],['ἐκκλησία','ekklēsía','Iglesia, asamblea','MAT 16:18'],['κύριος','kýrios','Señor','PHP 2:11'],['Χριστός','Christós','Cristo, el Ungido','MAT 16:16'],['Ἰησοῦς','Iēsoûs','Jesús, «Dios salva»','MAT 1:21'],['εὐαγγέλιον','euangélion','evangelio, buena noticia','MAR 1:1'],['ἀνάστασις','anástasis','resurrección','JOH 11:25'],['βασιλεία','basileía','reino','MAT 6:33'],['ἄρτος','ártos','pan','JOH 6:35'],['ποιμήν','poimḗn','pastor','JOH 10:11'],['ἄμπελος','ámpelos','vid','JOH 15:5'],['ὕδωρ','hýdōr','agua','JOH 4:14'],['θεός','theós','Dios','JOH 1:1'],['πατήρ','patḗr','padre','MAT 6:9'],['υἱός','huiós','hijo','JOH 3:16'],['ἅγιος','hágios','santo','REV 4:8'],['προσευχή','proseuchḗ','oración','ACT 2:42'],['νηστεία','nēsteía','ayuno','MAT 17:21'],['ταπεινοφροσύνη','tapeinophrosýnē','humildad','PHP 2:3'],['ὑπομονή','hypomonḗ','paciencia, constancia','ROM 5:3-4'],['κοινωνία','koinōnía','comunión','ACT 2:42'],['μακάριος','makários','bienaventurado, dichoso','MAT 5:3'],['σταυρός','staurós','cruz','LUK 9:23'],['ἀμήν','amḗn','amén, así sea','REV 22:21']];
const WLAT=[['Lux','lux','luz','JOH 8:12'],['Caritas','cáritas','amor, caridad','1CO 13:13'],['Gratia','gratia','gracia','EPH 2:8'],['Pax','pax','paz','JOH 14:27'],['Fides','fides','fe','HEB 11:1'],['Spes','spes','esperanza','ROM 5:5'],['Verbum','verbum','Palabra, Verbo','JOH 1:1'],['Vita','vita','vida','JOH 14:6'],['Veritas','véritas','verdad','JOH 8:32'],['Misericordia','misericordia','misericordia','LUK 6:36'],['Gaudium','gáudium','alegría','PHI 4:4'],['Panis','panis','pan','JOH 6:35'],['Crux','crux','cruz','1CO 1:18'],['Resurrectio','resurréctio','resurrección','JOH 11:25'],['Ecclesia','ecclésia','Iglesia','MAT 16:18'],['Oratio','orátio','oración','PHI 4:6'],['Sanctus','sanctus','santo','ISA 6:3'],['Gloria','glória','gloria','LUK 2:14'],['Alleluia','allelúia','alabad al Señor','PSA 150:6'],['Salus','salus','salvación','ACT 4:12'],['Benedictus','benedíctus','bendito','LUK 1:68'],['Humilitas','humílitas','humildad','PHI 2:3'],['Pastor','pastor','pastor','JOH 10:11'],['Agnus Dei','agnus Dei','Cordero de Dios','JOH 1:29'],['Spiritus','spíritus','espíritu','JOH 4:24'],['Regnum','regnum','reino','MAT 6:33'],['Fiat','fiat','hágase','LUK 1:38'],['Magnificat','magníficat','engrandece','LUK 1:46'],['Amen','amen','así sea','2CO 1:20'],['Communio','commúnio','comunión','1CO 10:16']];
const WHEB=[['שָׁלוֹם','shalom','paz','NUM 6:26'],['חֶסֶד','jésed','misericordia fiel','PSA 136:1'],['אָמֵן','amén','así sea','PSA 41:13'],['הַלְלוּיָהּ','haleluyá','alabad al Señor','PSA 150:6'],['אֱמוּנָה','emuná','fe, fidelidad','HAB 2:4'],['תּוֹרָה','torá','enseñanza, ley','PSA 119:105'],['רוּחַ','rúaj','espíritu, aliento','GEN 1:2'],['אוֹר','or','luz','PSA 27:1'],['בְּרָכָה','berajá','bendición','GEN 12:2'],['קָדוֹשׁ','kadosh','santo','ISA 6:3'],['יְשׁוּעָה','yeshuá','salvación','PSA 62:1'],['לֵב','lev','corazón','PRO 4:23'],['דָּבָר','davar','palabra','ISA 40:8'],['עִמָּנוּאֵל','Immanuel','Dios con nosotros','ISA 7:14'],['מָשִׁיחַ','mashíaj','ungido, Mesías','PSA 2:2']];
// Palabra del día según la Iglesia: católica = latín; protestante = griego y hebreo alternos; ortodoxa = griego
function wordOfDay(br){const d=dayIdx();if(br==='catolica')return ['latina',WLAT[d%WLAT.length]];if(br==='protestante'&&d%2)return ['hebrea',WHEB[d%WHEB.length]];return ['griega',WGK[d%WGK.length]]}
function renderToday(){
 const now=new Date(),td=utc(now.getFullYear(),now.getMonth()+1,now.getDate()),br=tdBr(),info=dayInfo(br,td),pr=prayerFor(br,now.getHours());
 const ref=VOTD[dayIdx()%VOTD.length];const [vb,cv]=ref.split(' ');const [vc,vv]=cv.split(':');
 const up=upcoming(br,td,4);
 const days=x=>{const n=Math.round((x-td)/DAY);return n===1?t('tdTomorrow'):t('tdIn').replace('{n}',n)};
 view.innerHTML=`<div class="tdhead"><h1>${esc(t('tdTitle'))}</h1><p class="tddate">${esc(fmtLong(new Date(td)))}</p></div>
 <div class="tdchips" role="group">${['ortodoxa','catolica','protestante'].map(b=>`<button class="chip${b===br?' on':''}" data-br="${b}" aria-pressed="${b===br}">${esc(t('br_'+b))}</button>`).join('')}</div>
 ${br==='ortodoxa'?`<div class="tdchips small" role="group"><button class="chip${!tdOld()?' on':''}" data-cal="0" aria-pressed="${!tdOld()}">${esc(t('tdCalNew'))}</button><button class="chip${tdOld()?' on':''}" data-cal="1" aria-pressed="${tdOld()}">${esc(t('tdCalOld'))}</button></div>`:''}
 <div class="card main" id="votd"><div class="t">${esc(t('votd'))}</div><div class="s" id="votdTxt" style="font-family:'Noto Serif',serif;font-size:18px;line-height:1.6;color:#F6F1E7;margin-top:8px">…</div><div class="s" style="margin-top:6px;color:#E2C27A;font-weight:700">${esc(bname(vb))} ${vc}, ${vv}</div></div>
 <section class="art tdcard"><h2 class="tdh">✝️ ${esc(t('tdCeleb'))}</h2>
  ${(()=>{const sts=daySaints(br,td);return (info.cel.length||sts.length)?`<ul class="tdcel">${info.cel.map(c=>`<li${(br==='ortodoxa'?O_MAJ:br==='catolica'?C_MAJ:P_MAJ).has(c)?' class="maj"':''}>${esc(celName(c))}</li>`).join('')}${sts.map(n=>`<li>${br==='ortodoxa'?'☦️':'😇'} ${esc(n)}</li>`).join('')}</ul>`:(br==='protestante'?'':`<p class="note">${esc(t('tdNone'))}</p>`)})()}
  ${br==='protestante'?(()=>{const f=figToday(),[fb,fcv]=f[2].split(' '),[fc,fv]=fcv.split(':');return `<div class="tdfig"><p class="tdper">📜 Personaje bíblico del día · <b>${esc(f[0])}</b></p><p>${esc(f[1])} <span class="note">(${esc(bname(fb))} ${fc}, ${fv})</span></p></div>`})():''}
  <p class="tdseason"><span class="pill soft">${esc(snName(info.s))}</span>${info.color?`<span class="tdcolor"><i style="background:${COLHEX[info.color]}"></i>${esc(t('tdColor'))}: ${esc(t(info.color))}</span>`:''}</p></section>
 ${LANG==='es'?(()=>{const [lg,[w,tr,m,r]]=wordOfDay(br),[wb,wcv]=r.split(' '),[wc,wv]=wcv.split(':');return `<section class="art tdcard"><h2 class="tdh">✍️ Palabra ${lg} del día</h2><p class="tdword"><b lang="${lg==='latina'?'la':lg==='hebrea'?'he':'grc'}" style="font-family:'Noto Serif',serif;font-size:24px">${esc(w)}</b> <i>${esc(tr)}</i> · ${esc(m)}</p><p class="note">${esc(bname(wb))} ${wc}, ${wv}</p></section>`})():''}
 <section class="art tdcard"><h2 class="tdh">🍞 ${esc(t('tdFast'))}</h2><p class="tdfast f-${info.f}">${esc(ftText(info.f))}</p>
  ${br==='catolica'?`<p class="note">${esc(t('tdEuch'))}</p>`:''}${br!=='protestante'?`<p class="note">${esc(t('tdFastHint'))}</p>`:''}</section>
 <section class="art tdcard"><h2 class="tdh">🙏 ${esc(t('tdPrayer'))}</h2><p class="tdper">${esc(t(pr.per))} · <b>${esc(prName(pr.k))}</b></p>
  <div id="tdPr">${pr.ref?'<blockquote class="vq"><cite>…</cite></blockquote>':`<blockquote class="vq tdprayer"><span>${esc(pr.k==='ourf'&&typeof OURF!=='undefined'?(OURF[LANG]||OURF.en):prText(pr.k))}</span></blockquote>`}</div>
  ${info.lent?`<p class="tdper" style="margin-top:14px">${esc(t('tdLentPr'))} <b>${esc(prName('ephrem'))}</b></p><blockquote class="vq tdprayer"><span>${esc(prText('ephrem'))}</span></blockquote>`:''}</section>
 <section class="art tdcard"><h2 class="tdh">💡 ${esc(t('tdNote'))}</h2><p>${esc(snNote(info.s))}</p>${br==='ortodoxa'&&tdOld()?`<p class="note">${esc(t('tdCalNote'))}</p>`:''}</section>
 <section class="art tdcard"><h2 class="tdh">⏳ ${esc(t('tdNext'))}</h2><ul class="tdnext">${up.map(([id,x])=>`<li><b>${esc(celName(id))}</b><span>${esc(fmtD(new Date(x)))} · ${esc(days(x))}</span></li>`).join('')}</ul></section>`;
 view.querySelectorAll('[data-br]').forEach(b=>b.onclick=()=>{store.set('todayBr',b.dataset.br);renderToday()});
 view.querySelectorAll('[data-cal]').forEach(b=>b.onclick=()=>{store.set('oldCal',b.dataset.cal==='1');renderToday()});
 // versículo del día
 (async()=>{const src=(TRMAP[br]&&TRMAP[br][LANG])||TRMAP.protestante[LANG]||'en-kjv';
  try{const bk=await getBook(src,vb);const [mc,mv]=mapRef('reina-valera-1909',src,vb,vc,+vv);const row=bk&&bk.ch[mc]&&bk.ch[mc].find(r=>r[0]===mv);const el=$('#votdTxt');if(el&&row){el.textContent=row[1];el.lang=TRLANG[src]}}catch(e){}
  const vd=$('#votd');if(vd){vd.style.cursor='pointer';vd.onclick=()=>{const [oc,ov]=mapRef('reina-valera-1909','ortodoxa-griega',vb,vc,+vv);go('read',{sec:'bible',ed:'ortodoxa-griega',book:vb,ch:oc,hl:ov})}}})();
 // oración bíblica en el idioma del usuario
 if(pr.ref){const [b,c,a,z]=pr.ref;fVerses([b,[[c,a,z]]]).then(r=>{const box=$('#tdPr');if(!box||!r)return;const lg=TRLANG[r.id]||(r.id==='ortodoxa-griega'?'el':'en');
  box.innerHTML=r.segs.map(s=>`<blockquote class="vq tdprayer" lang="${lg}"><span>${esc(s.txt)}</span><cite>${esc(bname(b))} ${s.c}, ${s.a}–${s.z} · ${esc(TRNAME[r.id]||edName(r.id))}</cite></blockquote>`).join('')})}
}
// Navegación: «Hoy» es la primera sección y la que se abre al empezar
SECS.unshift('today');
for(const l in NAV){NAV[l].unshift(((TDL[l]||TDL.en).ui)[26])}
MENU_ICO.today='🏠';
const _renderArticlesD=renderArticles;
renderArticles=async function(sec){if(sec==='today')return renderToday();return _renderArticlesD(sec)};
// El versículo del día ya no aparece en la zona de Biblias
const _homeExtrasD=homeExtras;
homeExtras=function(){return _homeExtrasD().replace(/<div class="card main" id="votd">[\s\S]*?<\/div><\/div>/,'')};
S.sec='today';S.view='today';
