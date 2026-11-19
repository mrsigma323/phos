// Sección «Oraciones»: colección por Iglesia, con buscador, origen, cómo orar y oración personal
const ORAX2={
es:{search:'Buscar por nombre, santo o palabra…',sort:'Ordenar',sRel:'Relevancia',sName:'Nombre',sFeast:'Próxima fiesta',church:'Iglesia',allCh:'Todas',none:'No hay oraciones con ese nombre. Prueba con otra palabra o cambia de Iglesia.',
 how:'Cómo orar',howL:'Qué necesitas y cómo empezar, según tu Iglesia',mine:'Mi oración personal',mineL:'Tus palabras y tus intenciones, solo en tu móvil',
 mineLead:'Escribe aquí con tus palabras lo que quieras decirle a Dios, o las personas e intenciones por las que rezas. Se guarda solo en tu móvil.',minePh:'Señor, hoy quiero pedirte… darte gracias por…',mineSave:'Guardar',saved:'Guardado',
 inDays:'en {n} días',tomorrow:'mañana',todayW:'hoy',need:'Lo que puedes tener a mano (opcional)',steps:'Cómo empezar',forAll:'Para todos'},
en:{search:'Search by name, saint or word…',sort:'Sort',sRel:'Relevance',sName:'Name',sFeast:'Next feast',church:'Church',allCh:'All',none:'No prayers match. Try another word or change Church.',
 how:'How to pray',howL:'What you need and how to begin, by Church',mine:'My personal prayer',mineL:'Your own words and intentions, only on your phone',
 mineLead:'Write here in your own words what you want to say to God, or the people and intentions you pray for. It is saved only on your phone.',minePh:'Lord, today I want to ask you… to thank you for…',mineSave:'Save',saved:'Saved',
 inDays:'in {n} days',tomorrow:'tomorrow',todayW:'today',need:'What you may have at hand (optional)',steps:'How to begin',forAll:'For everyone'},
pt:{search:'Procurar por nome, santo ou palavra…',sort:'Ordenar',sRel:'Relevância',sName:'Nome',sFeast:'Próxima festa',church:'Igreja',allCh:'Todas',none:'Nenhuma oração encontrada. Tente outra palavra ou mude de Igreja.',
 how:'Como rezar',howL:'O que precisa e como começar, segundo a sua Igreja',mine:'A minha oração pessoal',mineL:'As suas palavras e intenções, só no seu telemóvel',
 mineLead:'Escreva aqui, com as suas palavras, o que quer dizer a Deus, ou as pessoas e intenções por quem reza. Fica guardado só no seu telemóvel.',minePh:'Senhor, hoje quero pedir-te… agradecer-te…',mineSave:'Guardar',saved:'Guardado',
 inDays:'daqui a {n} dias',tomorrow:'amanhã',todayW:'hoje',need:'O que pode ter à mão (opcional)',steps:'Como começar',forAll:'Para todos'},
fr:{search:'Chercher par nom, saint ou mot…',sort:'Trier',sRel:'Pertinence',sName:'Nom',sFeast:'Prochaine fête',church:'Église',allCh:'Toutes',none:'Aucune prière trouvée. Essayez un autre mot ou changez d’Église.',
 how:'Comment prier',howL:'Ce qu’il vous faut et comment commencer, selon votre Église',mine:'Ma prière personnelle',mineL:'Vos mots et vos intentions, seulement sur votre téléphone',
 mineLead:'Écrivez ici, avec vos mots, ce que vous voulez dire à Dieu, ou les personnes et intentions pour lesquelles vous priez. Tout reste sur votre téléphone.',minePh:'Seigneur, aujourd’hui je veux te demander… te remercier pour…',mineSave:'Enregistrer',saved:'Enregistré',
 inDays:'dans {n} jours',tomorrow:'demain',todayW:'aujourd’hui',need:'Ce que vous pouvez avoir sous la main (facultatif)',steps:'Comment commencer',forAll:'Pour tous'},
it:{search:'Cerca per nome, santo o parola…',sort:'Ordina',sRel:'Rilevanza',sName:'Nome',sFeast:'Prossima festa',church:'Chiesa',allCh:'Tutte',none:'Nessuna preghiera trovata. Prova un’altra parola o cambia Chiesa.',
 how:'Come pregare',howL:'Cosa ti serve e come iniziare, secondo la tua Chiesa',mine:'La mia preghiera personale',mineL:'Le tue parole e intenzioni, solo sul tuo telefono',
 mineLead:'Scrivi qui, con parole tue, ciò che vuoi dire a Dio, o le persone e le intenzioni per cui preghi. Resta solo sul tuo telefono.',minePh:'Signore, oggi voglio chiederti… ringraziarti per…',mineSave:'Salva',saved:'Salvato',
 inDays:'tra {n} giorni',tomorrow:'domani',todayW:'oggi',need:'Cosa puoi avere a portata di mano (facoltativo)',steps:'Come iniziare',forAll:'Per tutti'},
de:{search:'Nach Name, Heiligem oder Wort suchen…',sort:'Sortieren',sRel:'Relevanz',sName:'Name',sFeast:'Nächstes Fest',church:'Kirche',allCh:'Alle',none:'Kein Gebet gefunden. Versuche ein anderes Wort oder wechsle die Kirche.',
 how:'Wie man betet',howL:'Was du brauchst und wie du beginnst, je nach Kirche',mine:'Mein persönliches Gebet',mineL:'Deine Worte und Anliegen, nur auf deinem Handy',
 mineLead:'Schreibe hier mit eigenen Worten, was du Gott sagen möchtest, oder die Menschen und Anliegen, für die du betest. Es bleibt nur auf deinem Handy.',minePh:'Herr, heute möchte ich dich bitten… dir danken für…',mineSave:'Speichern',saved:'Gespeichert',
 inDays:'in {n} Tagen',tomorrow:'morgen',todayW:'heute',need:'Was du zur Hand haben kannst (freiwillig)',steps:'Wie du beginnst',forAll:'Für alle'},
el:{search:'Αναζήτηση με όνομα, άγιο ή λέξη…',sort:'Ταξινόμηση',sRel:'Συνάφεια',sName:'Όνομα',sFeast:'Επόμενη εορτή',church:'Εκκλησία',allCh:'Όλες',none:'Δεν βρέθηκε προσευχή. Δοκίμασε άλλη λέξη ή άλλαξε Εκκλησία.',
 how:'Πώς να προσευχηθείς',howL:'Τι χρειάζεσαι και πώς να αρχίσεις, κατά την Εκκλησία σου',mine:'Η προσωπική μου προσευχή',mineL:'Τα δικά σου λόγια και αιτήματα, μόνο στο κινητό σου',
 mineLead:'Γράψε εδώ με δικά σου λόγια ό,τι θέλεις να πεις στον Θεό, ή τα πρόσωπα και τα αιτήματα για τα οποία προσεύχεσαι. Μένει μόνο στο κινητό σου.',minePh:'Κύριε, σήμερα θέλω να σου ζητήσω… να σε ευχαριστήσω για…',mineSave:'Αποθήκευση',saved:'Αποθηκεύτηκε',
 inDays:'σε {n} ημέρες',tomorrow:'αύριο',todayW:'σήμερα',need:'Τι μπορείς να έχεις κοντά σου (προαιρετικά)',steps:'Πώς να αρχίσεις',forAll:'Για όλους'},
ru:{search:'Поиск по названию, святому или слову…',sort:'Сортировка',sRel:'По значимости',sName:'По названию',sFeast:'Ближайший праздник',church:'Церковь',allCh:'Все',none:'Молитвы не найдены. Попробуйте другое слово или смените Церковь.',
 how:'Как молиться',howL:'Что нужно и с чего начать — по вашей Церкви',mine:'Моя личная молитва',mineL:'Ваши слова и прошения — только на вашем телефоне',
 mineLead:'Напишите здесь своими словами то, что хотите сказать Богу, или имена и нужды, о которых молитесь. Всё хранится только на вашем телефоне.',minePh:'Господи, сегодня я хочу попросить Тебя… поблагодарить за…',mineSave:'Сохранить',saved:'Сохранено',
 inDays:'через {n} дн.',tomorrow:'завтра',todayW:'сегодня',need:'Что можно иметь под рукой (по желанию)',steps:'С чего начать',forAll:'Для всех'},
ro:{search:'Caută după nume, sfânt sau cuvânt…',sort:'Ordonează',sRel:'Relevanță',sName:'Nume',sFeast:'Următoarea sărbătoare',church:'Biserică',allCh:'Toate',none:'Nicio rugăciune găsită. Încearcă alt cuvânt sau schimbă Biserica.',
 how:'Cum să te rogi',howL:'Ce îți trebuie și cum să începi, după Biserica ta',mine:'Rugăciunea mea personală',mineL:'Cuvintele și intențiile tale, doar pe telefonul tău',
 mineLead:'Scrie aici, cu vorbele tale, ce vrei să-I spui lui Dumnezeu sau persoanele și intențiile pentru care te rogi. Rămâne doar pe telefonul tău.',minePh:'Doamne, azi vreau să-Ți cer… să-Ți mulțumesc pentru…',mineSave:'Salvează',saved:'Salvat',
 inDays:'peste {n} zile',tomorrow:'mâine',todayW:'azi',need:'Ce poți avea la îndemână (opțional)',steps:'Cum să începi',forAll:'Pentru toți'}
};
// Cómo orar, por Iglesia (es y en; el resto de idiomas usa el inglés mientras llega la traducción)
const ORAHOW={
es:{all:['No hace falta nada especial: Dios escucha en cualquier lugar. Si no tienes nada a mano, basta con recogerte un momento, con humildad, y hablarle con el corazón.','Busca un rato tranquilo, aunque sean dos minutos. Guarda silencio antes de empezar.','Puedes rezar con las palabras de siempre o con las tuyas. En «Mi oración personal» puedes escribirlas.'],
 o:{need:['Un icono de Cristo, de la Madre de Dios o de tu santo; si no lo tienes, una imagen sencilla o ninguna.','Una vela o una lamparilla encendida.','Un cordón de oración (komboskini) para la Oración de Jesús.'],
    steps:['Ponte de pie ante el icono, mirando si puedes hacia oriente.','Haz la señal de la cruz con tres dedos unidos, de derecha a izquierda, e inclínate.','Empieza con «Rey celestial» y el Trisagio, y sigue con la oración que elijas.','Termina con la señal de la cruz. La oración a los santos pide su intercesión: la adoración es solo para Dios.']},
 c:{need:['Un crucifijo o una imagen del Señor, de la Virgen, de un ángel o de un santo; si no la tienes, reza igual, con humildad.','Una vela encendida.','Un rosario, si vas a rezarlo.'],
    steps:['Siéntate o arrodíllate ante la imagen, o simplemente donde estés.','Haz la señal de la cruz: «En el nombre del Padre, y del Hijo, y del Espíritu Santo».','Reza despacio la oración elegida, pensando en lo que dices.','Termina con un Gloria y la señal de la cruz. A los santos se les pide que rueguen por nosotros; se adora solo a Dios.']},
 p:{need:['Tu Biblia, abierta por un salmo o un pasaje.','Un lugar tranquilo; no hace falta ninguna imagen.','Un cuaderno, si te ayuda anotar por quién oras.'],
    steps:['Guarda un momento de silencio y recuerda que Dios está presente.','Lee despacio unos versículos y deja que te hablen.','Ora con tus palabras: alabanza, perdón, gratitud y peticiones. La oración se dirige a Dios, por medio de Jesucristo.','Termina con el Padre nuestro.']}},
en:{all:['You need nothing special: God hears you anywhere. If you have nothing at hand, it is enough to be still for a moment, humbly, and speak to him from the heart.','Find a quiet moment, even two minutes. Keep silence before you begin.','You may pray with the timeless words or with your own. You can write them in “My personal prayer.”'],
 o:{need:['An icon of Christ, the Mother of God or your saint; if you have none, a simple image or nothing at all.','A lit candle or oil lamp.','A prayer rope (komboskini) for the Jesus Prayer.'],
    steps:['Stand before the icon, facing east if you can.','Make the sign of the cross with three fingers joined, from right to left, and bow.','Begin with “O Heavenly King” and the Trisagion, then continue with the prayer you choose.','End with the sign of the cross. Prayer to the saints asks for their intercession: worship belongs to God alone.']},
 c:{need:['A crucifix or an image of the Lord, the Virgin, an angel or a saint; if you have none, pray all the same, humbly.','A lit candle.','A rosary, if you are going to pray it.'],
    steps:['Sit or kneel before the image, or simply where you are.','Make the sign of the cross: “In the name of the Father, and of the Son, and of the Holy Spirit.”','Pray the chosen prayer slowly, thinking about what you say.','End with a Glory Be and the sign of the cross. We ask the saints to pray for us; God alone is adored.']},
 p:{need:['Your Bible, open at a psalm or a passage.','A quiet place; no image is needed.','A notebook, if it helps to write down whom you pray for.'],
    steps:['Keep a moment of silence and remember that God is present.','Read a few verses slowly and let them speak to you.','Pray in your own words: praise, confession, thanks and requests. Prayer is addressed to God, through Jesus Christ.','End with the Lord’s Prayer.']}}
};
const ox=k=>{const a=ORAX2[LANG]&&ORAX2[LANG][k]!=null?ORAX2[LANG][k]:null;if(a!=null)return a;const b=(ORAX[LANG]||ORAX.en)[k];return b!=null?b:(ORAX2.en[k]!=null?ORAX2.en[k]:ORAX.en[k])};
const ORA_BK={ortodoxa:'o',catolica:'c',protestante:'p'};
const oraBr=()=>{const v=store.get('oraBr',null);return ['o','c','p','all'].includes(v)?v:(ORA_BK[tdBr()]||'o')};
const oraFav=()=>store.get('oraFav',[]);
const oraL=o=>o&&(o[LANG]||o.en||o.es)||'';
const oraFb=p=>!p.k&&!(p.x&&p.x[LANG])&&LANG!=='es'&&LANG!=='en';
function oraTitle(p){if(p.t[LANG])return p.t[LANG];if(p.k){try{const n=p.k==='ourf'?null:prName(p.k);if(n)return n}catch(e){}}return p.t.en}
function oraText(p){if(p.k){try{return p.k==='ourf'?(OURF[LANG]||OURF.en):(prText(p.k)||'')}catch(e){return ''}}return oraL(p.x)}
const oraNorm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
// Días que faltan para la fiesta (según la Iglesia; con calendario juliano, 13 días después)
function oraFeastIn(p,b){if(!p.f)return null;const k=b==='all'?(ORA_BK[tdBr()]||'o'):b;const f=p.f[k]||(b==='all'?(p.f.c||p.f.o||p.f.p):null);if(!f)return null;
 const [m,d]=f.split('-').map(Number),now=new Date(),t0=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());
 const sh=(k==='o'&&typeof tdOld==='function'&&tdOld())?13:0;
 let t=Date.UTC(now.getFullYear(),m-1,d+sh);if(t<t0)t=Date.UTC(now.getFullYear()+1,m-1,d+sh);
 return {n:Math.round((t-t0)/864e5),date:new Date(t)}}
const oraWhen=n=>n===0?ox('todayW'):n===1?ox('tomorrow'):ox('inDays').replace('{n}',n);
function oraToday(b){return ORA.filter(p=>p.ch.includes(b)&&p.f&&p.f[b]).filter(p=>{const x=oraFeastIn(p,b);return x&&x.n===0})}

function oraList(){
 const b=oraBr(),cat=S.ocat||'todas',q=oraNorm(S.oq||''),sort=S.osort||'rel',fav=oraFav();
 let L=ORA.map((p,i)=>({p,i})).filter(({p})=>b==='all'||p.ch.includes(b));
 if(cat==='fav')L=L.filter(({p})=>fav.includes(p.id));else if(cat!=='todas')L=L.filter(({p})=>p.c===cat);
 if(q){L=L.map(o=>{const t=oraNorm(oraTitle(o.p)),body=oraNorm(oraText(o.p)+' '+oraL(o.p.o));
   o.sc=t.startsWith(q)?3:t.includes(q)?2:body.includes(q)?1:0;return o}).filter(o=>o.sc>0)}
 if(sort==='name')L.sort((a,c)=>oraTitle(a.p).localeCompare(oraTitle(c.p),LANG));
 else if(sort==='feast')L.sort((a,c)=>{const x=oraFeastIn(a.p,b),y=oraFeastIn(c.p,b);return (x?x.n:999)-(y?y.n:999)||a.i-c.i});
 else L.sort((a,c)=>(c.sc||0)-(a.sc||0)||a.i-c.i);
 return L.map(o=>o.p)}
function oraCards(){
 const b=oraBr(),L=oraList(),fav=oraFav(),box=$('#oraL');if(!box)return;
 if(!L.length){box.innerHTML=`<p class="note">${esc((S.ocat==='fav'&&!S.oq)?ox('noFav'):ox('none'))}</p>`;return}
 const ICO={dios:'✝️',maria:'🌹',angeles:'🕊️',santos:'🕯️',vida:'🍞'};
 box.innerHTML=L.map(p=>{const f=oraFeastIn(p,b);const pills=(f&&f.n<=30?`<span class="pill soft">${esc(ox('feast'))}: ${esc(oraWhen(f.n))}</span>`:'')+(b==='all'?`<span class="pill soft">${p.ch.split('').map(c=>esc(ox(c))).join(' · ')}</span>`:'');
  return `<button class="card rcard orac" data-o="${p.id}"><div class="t"><span class="rico">${ICO[p.c]||'🙏'}</span>${esc(oraTitle(p))}${fav.includes(p.id)?' <span aria-hidden="true">♥</span>':''}</div><div class="s">${esc(oraText(p).replace(/\s+/g,' ').slice(0,84))}…</div>${pills?`<div class="orap">${pills}</div>`:''}</button>`}).join('');
 box.querySelectorAll('[data-o]').forEach(x=>x.onclick=()=>go('pray_one',{oid:x.dataset.o}))}
function renderPray(){
 if(S.view==='pray_one')return drawPrayOne();if(S.view==='pray_how')return drawPrayHow();if(S.view==='pray_mine')return drawPrayMine();
 const b=oraBr(),cat=S.ocat||'todas',sort=S.osort||'rel',C=ox('cats');
 const chip=(k,l,on,a)=>`<button class="chip" ${a}="${k}" aria-pressed="${on}">${esc(l)}</button>`;
 view.innerHTML=`<h1>🙏 ${esc(ox('h'))}</h1><p class="lead">${esc(ox('lead'))}</p>
 <div class="orarow">${['o','c','p','all'].map(k=>chip(k,k==='all'?ox('allCh'):ox(k),b===k,'data-ob')).join('')}</div>
 <input type="search" id="oraQ" class="oraq" placeholder="${esc(ox('search'))}" value="${esc(S.oq||'')}" autocomplete="off" aria-label="${esc(ox('search'))}">
 <div class="orarow">${['todas','dios','maria','angeles','santos','vida','fav'].filter(k=>b!=='p'||(k!=='maria'&&k!=='angeles')).map(k=>chip(k,(k==='fav'?'♥ ':'')+C[k],cat===k,'data-oc')).join('')}</div>
 <label class="orasort"><span>${esc(ox('sort'))}</span><select id="oraS">${[['rel','sRel'],['name','sName'],['feast','sFeast']].map(([k,l])=>`<option value="${k}" ${sort===k?'selected':''}>${esc(ox(l))}</option>`).join('')}</select></label>
 <div id="oraL"></div>
 <button class="card rcard" id="oraHow"><div class="t"><span class="rico">🕯️</span>${esc(ox('how'))}</div><div class="s">${esc(ox('howL'))}</div></button>
 <button class="card rcard" id="oraMine"><div class="t"><span class="rico">✍️</span>${esc(ox('mine'))}</div><div class="s">${esc(ox('mineL'))}</div></button>
 <p class="note">${esc(ox('more'))}</p>`;
 view.querySelectorAll('[data-ob]').forEach(x=>x.onclick=()=>{store.set('oraBr',x.dataset.ob);if(x.dataset.ob==='p'&&(S.ocat==='maria'||S.ocat==='angeles'))S.ocat='todas';renderPray()});
 view.querySelectorAll('[data-oc]').forEach(x=>x.onclick=()=>{S.ocat=x.dataset.oc;renderPray()});
 $('#oraQ').oninput=e=>{S.oq=e.target.value;oraCards()};$('#oraS').onchange=e=>{S.osort=e.target.value;oraCards()};
 $('#oraHow').onclick=()=>go('pray_how');$('#oraMine').onclick=()=>go('pray_mine');
 oraCards()}
function drawPrayOne(){
 const p=ORA.find(x=>x.id===S.oid);if(!p)return go('pray');const b=oraBr(),fav=oraFav(),on=fav.includes(p.id),f=oraFeastIn(p,b),note=oraFb(p)?ox('note'):'';
 const fd=f?f.date.toLocaleDateString(LANG,{day:'numeric',month:'long',timeZone:'UTC'}):'';
 view.innerHTML=`<h1>${esc(oraTitle(p))}</h1>${note?`<p class="note">${esc(note)}</p>`:''}
 <blockquote class="vq tdprayer oratxt"><span>${esc(oraText(p)).replace(/\n/g,'<br>')}</span></blockquote>
 <div class="orarow"><button class="btn" id="oFav">${on?'♥ '+esc(ox('unfav')):'♡ '+esc(ox('fav'))}</button><button class="btn ghost" id="oSh">${esc(ox('share'))}</button></div>
 <div class="card"><div class="t">📜 ${esc(ox('origin'))}</div><p class="orao">${esc(oraL(p.o))}</p>${p.own?`<span class="pill soft">${esc(ox('own'))}</span>`:''}</div>
 ${p.m?`<div class="card oram ${p.m[0]}"><div class="t"><span class="pill ${p.m[0]==='rec'?'':'soft'}">${esc(ox(p.m[0]))}</span></div><p class="orao">${esc(oraL(p.m[1]))}</p></div>`:''}
 <div class="card"><div class="t">⛪ ${esc(ox('who'))}</div><p class="orao">${p.ch.split('').map(c=>esc(ox(c))).join(' · ')}${fd?`<br>${esc(ox('feast'))}: ${esc(fd)} (${esc(oraWhen(f.n))})`:''}</p></div>`;
 $('#oFav').onclick=()=>{const a=oraFav();store.set('oraFav',a.includes(p.id)?a.filter(x=>x!==p.id):a.concat(p.id));drawPrayOne()};
 $('#oSh').onclick=()=>shareText(oraTitle(p)+'\n\n'+oraText(p)+'\n\n— Phos · phosbiblias.com');
 window.scrollTo(0,0)}
function drawPrayHow(){
 const H=ORAHOW[LANG]||ORAHOW.en,b=oraBr()==='all'?(ORA_BK[tdBr()]||'o'):oraBr(),X=H[b],note=!ORAHOW[LANG]?ox('note'):'';
 const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join('');
 view.innerHTML=`<h1>🕯️ ${esc(ox('how'))}</h1>${note?`<p class="note">${esc(note)}</p>`:''}
 <div class="orarow">${['o','c','p'].map(k=>`<button class="chip" data-ob="${k}" aria-pressed="${b===k}">${esc(ox(k))}</button>`).join('')}</div>
 <div class="card"><div class="t">${esc(ox('forAll'))}</div><ul class="lgl orao">${li(H.all)}</ul></div>
 <div class="card"><div class="t">${esc(ox('need'))}</div><ul class="lgl orao">${li(X.need)}</ul></div>
 <div class="card"><div class="t">${esc(ox('steps'))}</div><ol class="lgl orao">${li(X.steps)}</ol></div>
 <button class="card rcard" id="oraMine"><div class="t"><span class="rico">✍️</span>${esc(ox('mine'))}</div><div class="s">${esc(ox('mineL'))}</div></button>`;
 view.querySelectorAll('[data-ob]').forEach(x=>x.onclick=()=>{store.set('oraBr',x.dataset.ob);drawPrayHow()});
 $('#oraMine').onclick=()=>go('pray_mine')}
function drawPrayMine(){
 view.innerHTML=`<h1>✍️ ${esc(ox('mine'))}</h1><p class="lead">${esc(ox('mineLead'))}</p>
 <textarea id="oraT" class="orata" rows="10" placeholder="${esc(ox('minePh'))}">${esc(store.get('oraMine',''))}</textarea>
 <button class="btn" id="oraSv" style="width:100%;margin-top:12px">${esc(ox('mineSave'))}</button>`;
 $('#oraSv').onclick=()=>{store.set('oraMine',$('#oraT').value);toast('✓ '+ox('saved'))}}

// Alta de la sección en pestañas y menú, justo después de «Hoy» (o al principio)
(function(){const at=SECS.includes('today')?SECS.indexOf('today')+1:0;SECS.splice(at,0,'pray');
 for(const l in NAV)NAV[l].splice(at,0,(ORAX[l]||ORAX.en).sec);MENU_ICO.pray='🙏'})();
const _renderArticlesO=renderArticles;
renderArticles=async function(sec){if(sec==='pray')return renderPray();return _renderArticlesO(sec)};
const _setHeaderO=setHeader;
setHeader=function(){_setHeaderO();if(S.sec==='pray'&&S.view!=='pray')$('#back').style.visibility='visible'};
const _phosBackO=window.phosBack;
window.phosBack=()=>{if(S.sec==='pray'&&S.view!=='pray'&&!PVIEWS[S.view]){go(S.view==='pray_mine'&&S.oFrom==='how'?'pray_how':'pray');return true}return _phosBackO?_phosBackO():false};
const _phosOpenO=window.phosOpen;
window.phosOpen=k=>{if(k&&k.indexOf('ora')===0){const id=k.split(':')[1];return id&&ORA.some(p=>p.id===id)?go('pray_one',{sec:'pray',oid:id}):go('pray',{sec:'pray'})}return _phosOpenO&&_phosOpenO(k)};

// «Hoy»: oración del santo del día. Premium la muestra; sin Premium, se anuncia.
const _renderTodayO=renderToday;
renderToday=function(){const r=_renderTodayO.apply(this,arguments);try{
 if(S.view!=='today'&&S.sec!=='today')return r;const b=ORA_BK[tdBr()]||'o',L=oraToday(b);if(!L.length||$('#oraToday'))return r;
 const ok=typeof prem2==='function'?prem2():true,p=L[0],c=document.createElement('button');c.className='card rcard';c.id='oraToday';
 c.innerHTML=ok?`<div class="t"><span class="rico">🙏</span>${esc(ox('today'))}: ${esc(oraTitle(p))}</div><div class="s">${esc(ox('todayL'))} ${esc(oraText(p).replace(/\s+/g,' ').slice(0,70))}…</div>`
  :`<div class="t"><span class="rico">🙏</span>${esc(ox('today'))}<span class="pill">👑 Premium</span></div><div class="s">${esc(ox('premL'))}</div>`;
 c.onclick=()=>ok?go('pray_one',{sec:'pray',oid:p.id}):openP('premium');
 const first=view.querySelector('.card');if(first&&first.parentNode===view)first.insertAdjacentElement('afterend',c);else view.appendChild(c)}catch(e){}return r};

// Aviso Premium en la fiesta de cada santo (lo llama scheduleReminders)
function prayerReminder(y,m,dd,br){const b=ORA_BK[br]||'o',sh=(b==='o'&&typeof tdOld==='function'&&tdOld())?13:0;
 const d=new Date(Date.UTC(y,m-1,dd-sh)),key=String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');
 const p=ORA.find(x=>x.ch.includes(b)&&x.f&&x.f[b]===key);if(!p)return null;
 return {id:'ora-'+p.id+'-'+y+m+dd,at:new Date(y,m-1,dd,9,30).getTime(),title:ox('nT'),body:oraTitle(p),open:'ora:'+p.id}}
