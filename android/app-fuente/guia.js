// ---------- Guía paso a paso, «Pon a punto tu Phos» y avisos dentro del menú ----------
// La guía sale después de la bienvenida y no desaparece hasta que se completa o se pulsa «Omitir».
const GX={
es:{next:"Siguiente",skip:"Omitir",done:"Terminar",step:"Paso {n} de {t}",
 m1:"Aquí está el menú: Biblia, Aprende, Retos bíblicos, Camino de la Verdad, Mi Phos y todo lo demás. El número rojo te avisa de lo que tienes pendiente.",
 m2:"Cada día, el tiempo litúrgico, la fiesta o el santo y un versículo. Con «Compartir» lo envías como imagen.",
 m3:"Phos Premium: lo activas y lo gestionas con Google Play.",m3p:"Tu Phos Premium está activo. Desde aquí lo gestionas en Google Play.",
 m4:"Cambia el idioma de la app cuando quieras.",
 m5:"Por último, pon a punto tu Phos: recordatorios, tu Camino de la Verdad y tu plan de lectura. Lo tienes todo en Mi Phos.",goMine:"Ir a Mi Phos",
 setupT:"Pon a punto tu Phos",setupLead:"{n} de {t} pasos hechos",sNotif:"Elige tus recordatorios",sVida:"Traza tu Camino de la Verdad",sPlan:"Empieza un plan de lectura",sAcct:"Inicia sesión (opcional)",hide:"Ocultar",
 pend:"{n} pendiente(s)",msgNew:"{n} mensaje(s) nuevo(s)"},
en:{next:"Next",skip:"Skip",done:"Finish",step:"Step {n} of {t}",
 m1:"Here is the menu: Bible, Learn, Bible challenges, Way of Truth, My Phos and everything else. The red number tells you what is waiting for you.",
 m2:"Every day: the liturgical season, the feast or saint and a verse. Tap «Share» to send it as an image.",
 m3:"Phos Premium: you activate and manage it with Google Play.",m3p:"Your Phos Premium is active. Manage it on Google Play from here.",
 m4:"Change the app language whenever you like.",
 m5:"Finally, set up your Phos: reminders, your Way of Truth and your reading plan. It's all in My Phos.",goMine:"Go to My Phos",
 setupT:"Set up your Phos",setupLead:"{n} of {t} steps done",sNotif:"Choose your reminders",sVida:"Map out your Way of Truth",sPlan:"Start a reading plan",sAcct:"Sign in (optional)",hide:"Hide",
 pend:"{n} pending",msgNew:"{n} new message(s)"},
pt:{next:"Seguinte",skip:"Saltar",done:"Terminar",step:"Passo {n} de {t}",
 m1:"Aqui está o menu: Bíblia, Aprender, Desafios bíblicos, Caminho da Verdade, Meu Phos e tudo o resto. O número vermelho avisa do que tem pendente.",
 m2:"Todos os dias: o tempo litúrgico, a festa ou o santo e um versículo. Com «Partilhar» envia-o como imagem.",
 m3:"Phos Premium: ativa-o e gere-o com o Google Play.",m3p:"O seu Phos Premium está ativo. Daqui gere-o no Google Play.",
 m4:"Mude o idioma da app quando quiser.",
 m5:"Por fim, prepare o seu Phos: lembretes, o seu Caminho da Verdade e o seu plano de leitura. Está tudo em Meu Phos.",goMine:"Ir para Meu Phos",
 setupT:"Prepare o seu Phos",setupLead:"{n} de {t} passos feitos",sNotif:"Escolha os seus lembretes",sVida:"Trace o seu Caminho da Verdade",sPlan:"Comece um plano de leitura",sAcct:"Entrar (opcional)",hide:"Ocultar",
 pend:"{n} pendente(s)",msgNew:"{n} mensagem(ns) nova(s)"},
fr:{next:"Suivant",skip:"Passer",done:"Terminer",step:"Étape {n} sur {t}",
 m1:"Voici le menu : Bible, Apprendre, Défis bibliques, Chemin de Vérité, Mon Phos et tout le reste. Le chiffre rouge vous signale ce qui vous attend.",
 m2:"Chaque jour : le temps liturgique, la fête ou le saint et un verset. Avec « Partager », envoyez-le en image.",
 m3:"Phos Premium : vous l’activez et le gérez avec Google Play.",m3p:"Votre Phos Premium est actif. Gérez-le ici sur Google Play.",
 m4:"Changez la langue de l’application quand vous voulez.",
 m5:"Enfin, préparez votre Phos : rappels, Chemin de Vérité et plan de lecture. Tout est dans Mon Phos.",goMine:"Aller à Mon Phos",
 setupT:"Préparez votre Phos",setupLead:"{n} étape(s) sur {t} faite(s)",sNotif:"Choisissez vos rappels",sVida:"Tracez votre Chemin de Vérité",sPlan:"Commencez un plan de lecture",sAcct:"Connectez-vous (facultatif)",hide:"Masquer",
 pend:"{n} en attente",msgNew:"{n} nouveau(x) message(s)"},
it:{next:"Avanti",skip:"Salta",done:"Fine",step:"Passo {n} di {t}",
 m1:"Ecco il menu: Bibbia, Impara, Sfide bibliche, Cammino della Verità, Il mio Phos e tutto il resto. Il numero rosso ti avvisa di ciò che hai in sospeso.",
 m2:"Ogni giorno: il tempo liturgico, la festa o il santo e un versetto. Con «Condividi» lo invii come immagine.",
 m3:"Phos Premium: lo attivi e lo gestisci con Google Play.",m3p:"Il tuo Phos Premium è attivo. Da qui lo gestisci su Google Play.",
 m4:"Cambia la lingua dell’app quando vuoi.",
 m5:"Infine, prepara il tuo Phos: promemoria, Cammino della Verità e piano di lettura. È tutto in Il mio Phos.",goMine:"Vai a Il mio Phos",
 setupT:"Prepara il tuo Phos",setupLead:"{n} di {t} passi fatti",sNotif:"Scegli i promemoria",sVida:"Traccia il tuo Cammino della Verità",sPlan:"Inizia un piano di lettura",sAcct:"Accedi (facoltativo)",hide:"Nascondi",
 pend:"{n} in sospeso",msgNew:"{n} nuovo/i messaggio/i"},
de:{next:"Weiter",skip:"Überspringen",done:"Fertig",step:"Schritt {n} von {t}",
 m1:"Hier ist das Menü: Bibel, Lernen, Bibelrätsel, Weg der Wahrheit, Mein Phos und alles andere. Die rote Zahl zeigt dir, was noch offen ist.",
 m2:"Jeden Tag: Kirchenjahreszeit, Fest oder Heiliger und ein Vers. Mit «Teilen» schickst du ihn als Bild.",
 m3:"Phos Premium: Du aktivierst und verwaltest es über Google Play.",m3p:"Dein Phos Premium ist aktiv. Von hier aus verwaltest du es bei Google Play.",
 m4:"Ändere die Sprache der App, wann immer du willst.",
 m5:"Zum Schluss: Richte dein Phos ein – Erinnerungen, Weg der Wahrheit und Leseplan. Alles findest du unter Mein Phos.",goMine:"Zu Mein Phos",
 setupT:"Richte dein Phos ein",setupLead:"{n} von {t} Schritten erledigt",sNotif:"Erinnerungen wählen",sVida:"Deinen Weg der Wahrheit festlegen",sPlan:"Leseplan beginnen",sAcct:"Anmelden (optional)",hide:"Ausblenden",
 pend:"{n} offen",msgNew:"{n} neue Nachricht(en)"},
el:{next:"Επόμενο",skip:"Παράλειψη",done:"Τέλος",step:"Βήμα {n} από {t}",
 m1:"Εδώ είναι το μενού: Αγία Γραφή, Μάθηση, Βιβλικές προκλήσεις, Οδός της Αληθείας, Το Phos μου και όλα τα άλλα. Ο κόκκινος αριθμός σου δείχνει τι σε περιμένει.",
 m2:"Κάθε μέρα: η λειτουργική περίοδος, η εορτή ή ο άγιος και ένας στίχος. Με «Κοινοποίηση» τον στέλνεις ως εικόνα.",
 m3:"Phos Premium: το ενεργοποιείς και το διαχειρίζεσαι με το Google Play.",m3p:"Το Phos Premium σου είναι ενεργό. Από εδώ το διαχειρίζεσαι στο Google Play.",
 m4:"Άλλαξε τη γλώσσα της εφαρμογής όποτε θέλεις.",
 m5:"Τέλος, ρύθμισε το Phos σου: υπενθυμίσεις, Οδό της Αληθείας και πρόγραμμα ανάγνωσης. Όλα είναι στο Το Phos μου.",goMine:"Στο Το Phos μου",
 setupT:"Ρύθμισε το Phos σου",setupLead:"{n} από {t} βήματα",sNotif:"Διάλεξε υπενθυμίσεις",sVida:"Χάραξε την Οδό της Αληθείας σου",sPlan:"Ξεκίνα πρόγραμμα ανάγνωσης",sAcct:"Σύνδεση (προαιρετικά)",hide:"Απόκρυψη",
 pend:"{n} εκκρεμούν",msgNew:"{n} νέα μηνύματα"},
ru:{next:"Далее",skip:"Пропустить",done:"Готово",step:"Шаг {n} из {t}",
 m1:"Вот меню: Библия, Обучение, Библейские задания, Путь истины, Мой Phos и всё остальное. Красная цифра подскажет, что вас ждёт.",
 m2:"Каждый день: литургический период, праздник или святой и стих. Кнопкой «Поделиться» отправьте его картинкой.",
 m3:"Phos Premium: подключается и управляется через Google Play.",m3p:"Ваш Phos Premium активен. Отсюда им можно управлять в Google Play.",
 m4:"Меняйте язык приложения когда угодно.",
 m5:"Напоследок настройте Phos: напоминания, Путь истины и план чтения. Всё это в разделе «Мой Phos».",goMine:"В «Мой Phos»",
 setupT:"Настройте свой Phos",setupLead:"Выполнено шагов: {n} из {t}",sNotif:"Выберите напоминания",sVida:"Проложите свой Путь истины",sPlan:"Начните план чтения",sAcct:"Войдите (необязательно)",hide:"Скрыть",
 pend:"Ожидает: {n}",msgNew:"Новых сообщений: {n}"},
ro:{next:"Următorul",skip:"Omite",done:"Gata",step:"Pasul {n} din {t}",
 m1:"Aici este meniul: Biblia, Învață, Provocări biblice, Calea Adevărului, Phos-ul meu și tot restul. Numărul roșu îți arată ce te așteaptă.",
 m2:"În fiecare zi: perioada liturgică, praznicul sau sfântul și un verset. Cu «Distribuie» îl trimiți ca imagine.",
 m3:"Phos Premium: îl activezi și îl gestionezi prin Google Play.",m3p:"Phos Premium este activ. De aici îl gestionezi în Google Play.",
 m4:"Schimbă limba aplicației oricând vrei.",
 m5:"La final, pregătește-ți Phos-ul: mementouri, Calea Adevărului și planul de lectură. Totul este în Phos-ul meu.",goMine:"Mergi la Phos-ul meu",
 setupT:"Pregătește-ți Phos-ul",setupLead:"{n} din {t} pași făcuți",sNotif:"Alege mementourile",sVida:"Trasează-ți Calea Adevărului",sPlan:"Începe un plan de lectură",sAcct:"Conectează-te (opțional)",hide:"Ascunde",
 pend:"{n} în așteptare",msgNew:"{n} mesaj(e) nou(i)"}};
const gt=(k,o)=>{let s=(GX[LANG]&&GX[LANG][k])||GX.en[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};

// ===== «Pon a punto tu Phos» (tarjeta en Hoy) =====
const googleOK=()=>!!(window.PhosApp&&PhosApp.googleSignIn&&(!PhosApp.googleReady||PhosApp.googleReady()));
function setupSteps(){
 const L=[{k:'sNotif',ok:!!store.get('notif',null),go:()=>openP('notif')},
  {k:'sVida',ok:!!store.get('vida',null),go:()=>go('vida',{sec:'vida'})},
  {k:'sPlan',ok:!!store.get('planActive',null),go:()=>{go('mine',{sec:'mine'});go('m_plans')}}];
 if(googleOK())L.push({k:'sAcct',opt:true,ok:!!store.get('acct',null),go:()=>{go('mine',{sec:'mine'});go('m_account')}});
 return L}
const setupPending=()=>store.get('setupHide',null)?0:setupSteps().filter(s=>!s.ok&&!s.opt).length;
function drawSetupCard(){
 if(S.sec!=='today'||store.get('setupHide',null))return;const L=setupSteps(),n=L.filter(s=>s.ok).length;if(L.every(s=>s.ok||s.opt))return;
 const hero=$('#votd');if(!hero||$('#setupCard'))return;
 const c=document.createElement('section');c.className='card setupc';c.id='setupCard';
 c.innerHTML=`<div class="t">✨ ${esc(gt('setupT'))}<button class="linkbtn" id="setupHide">${esc(gt('hide'))}</button></div>
 <div class="pbar"><i style="width:${Math.round(n/L.length*100)}%"></i></div><p class="note">${esc(gt('setupLead',{n,t:L.length}))}</p>
 ${L.map((s,i)=>`<button class="sstep ${s.ok?'ok':''}" data-st="${i}" ${s.ok?'disabled':''}><span>${s.ok?'✅':'⬜'}</span>${esc(gt(s.k))}${s.ok?'':'<b>›</b>'}</button>`).join('')}`;
 hero.after(c);
 c.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>L[+b.dataset.st].go());
 $('#setupHide').onclick=()=>{store.set('setupHide',Date.now());c.remove();paintMenuBadges();paintBadge()};
}
const _renderTodayG=renderToday;
renderToday=function(){_renderTodayG.apply(this,arguments);drawSetupCard()};

// ===== Avisos dentro del menú: qué apartado tiene algo pendiente =====
function paintMenuBadges(){
 const list=$('#menuList');if(!list)return;list.querySelectorAll('.mbadge2,.mhint').forEach(x=>x.remove());
 const msgs=typeof unread==='function'?unread():0,pend=setupPending();
 const add=(sec,n,hint)=>{const it=list.querySelector(`[data-sec="${sec}"]`);if(!it||!n)return;
  const b=document.createElement('span');b.className='mbadge2';b.textContent=n>9?'9+':n;it.appendChild(b);
  const h=document.createElement('small');h.className='mhint';h.textContent=hint;it.querySelector('span:not(.mico)').appendChild(h)};
 add('mine',msgs,gt('msgNew',{n:msgs}));
 add('today',pend,gt('pend',{n:pend})+' · '+gt('setupT'));
}
// El número rojo del botón Menú suma mensajes sin leer y pasos pendientes
const _paintBadgeG=paintBadge;
paintBadge=function(){_paintBadgeG();const b=$('#msgBadge');if(!b)return;const n=(typeof unread==='function'?unread():0)+setupPending();b.textContent=n>9?'9+':n;b.hidden=!n};
$('#menuBtn').addEventListener('click',()=>setTimeout(paintMenuBadges,0));
const _drawTabsG=drawTabs;drawTabs=function(){_drawTabsG();paintMenuBadges()};
// Al marcar algo como hecho, se actualizan los avisos
const _storeSetG=store.set;store.set=function(k,v){_storeSetG.call(store,k,v);if(['notif','vida','planActive','acct','msgRead','msgs'].includes(k))setTimeout(()=>{paintBadge();if(S.sec==='today'){const c=$('#setupCard');if(c){c.remove();drawSetupCard()}}},0)};

// ===== Guía paso a paso =====
function tourSteps(){return [
 {sel:'#menuBtn',k:'m1'},{sel:'#votd',k:'m2'},{sel:'#premBtn',k:isPremium()?'m3p':'m3'},{sel:'#langBtn',k:'m4'},{sel:null,k:'m5',mine:true}].filter(s=>!s.sel||document.querySelector(s.sel))}
function tour(i){
 const T=tourSteps();if(i>=T.length)return endTour(false);const s=T[i];
 let ov=$('#tour');if(!ov){ov=document.createElement('div');ov.id='tour';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov)}
 const el=s.sel&&document.querySelector(s.sel);let ring='',pos='center';
 if(el){el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect(),p=8;
  ring=`<div class="tring" style="left:${r.left-p}px;top:${r.top-p}px;width:${r.width+p*2}px;height:${r.height+p*2}px"></div>`;
  pos=r.top+r.height/2<innerHeight/2?`top:${Math.min(r.bottom+18,innerHeight-240)}px`:`bottom:${Math.min(innerHeight-r.top+18,innerHeight-240)}px`}
 ov.innerHTML=`${ring||'<div class="tshade"></div>'}<div class="tbox" style="${pos==='center'?'top:50%;transform:translate(-50%,-50%)':pos}">
  <div class="note">${esc(gt('step',{n:i+1,t:T.length}))}</div><p>${esc(gt(s.k))}</p>
  <div class="tbtns"><button class="linkbtn" id="tSkip">${esc(gt('skip'))}</button>
  ${s.mine?`<button class="btn ghost" id="tDone">${esc(gt('done'))}</button><button class="btn" id="tMine">${esc(gt('goMine'))}</button>`:`<button class="btn" id="tNext">${esc(gt('next'))}</button>`}</div></div>`;
 $('#tSkip').onclick=()=>endTour(false);
 const n=$('#tNext');if(n)n.onclick=()=>tour(i+1);const d=$('#tDone');if(d)d.onclick=()=>endTour(false);const m=$('#tMine');if(m)m.onclick=()=>endTour(true);
}
function endTour(mine){store.set('tourDone',Date.now());const ov=$('#tour');if(ov)ov.remove();window.scrollTo(0,0);if(mine)go('mine',{sec:'mine'})}
function maybeTour(){if(store.get('tourDone',null)||$('#welcome')||$('#tour'))return;if(S.sec!=='today')go('today',{sec:'today'});setTimeout(()=>tour(0),500)}
const _closeWelcomeG=closeWelcome;
closeWelcome=function(){_closeWelcomeG();setTimeout(maybeTour,700)};
// Si se cerró la app a mitad de la guía, vuelve a salir al abrirla
if(store.get('welcomed',null))setTimeout(maybeTour,2300);
window.addEventListener('resize',()=>{const ov=$('#tour');if(ov){const T=tourSteps(),i=+((ov.querySelector('.note')||{}).textContent||'1').match(/\d+/)[0]-1;tour(Math.max(0,Math.min(i,T.length-1)))}});

(function(){const st=document.createElement('style');st.textContent=`
#tour{position:fixed;inset:0;z-index:95}
#tour .tring{position:fixed;border-radius:16px;box-shadow:0 0 0 3px #E2C27A,0 0 0 9999px rgba(20,6,7,.72);pointer-events:none;transition:all .25s}
#tour .tshade{position:fixed;inset:0;background:rgba(20,6,7,.72)}
#tour .tbox{position:fixed;left:50%;transform:translateX(-50%);width:min(92vw,420px);background:#FBF6EA;color:#2A1B10;border-radius:18px;padding:16px 18px;box-shadow:0 12px 34px rgba(0,0,0,.35);box-sizing:border-box}
#tour .tbox p{font-size:17px;line-height:1.45;margin:6px 0 14px}
#tour .tbtns{display:flex;gap:10px;align-items:center;justify-content:flex-end}#tour .tbtns .linkbtn{margin-right:auto}#tour .btn{padding:10px 16px}
.setupc .t{display:flex;align-items:center;gap:8px}.setupc .t .linkbtn{margin-left:auto;font-size:14px}
.sstep{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;border-top:1px solid var(--line);background:none;padding:12px 2px;font:inherit;color:var(--ink)}
.sstep b{margin-left:auto;color:var(--wine);font-size:20px}.sstep.ok{color:var(--muted);text-decoration:line-through}
.mitem{position:relative}.mbadge2{margin-left:auto;min-width:22px;height:22px;border-radius:11px;background:#C62828;color:#fff;font:700 12px/22px Inter,sans-serif;text-align:center;padding:0 6px}
.mhint{display:block;font-size:12px;color:#C62828;font-weight:600;margin-top:2px}`;document.head.appendChild(st)})();
