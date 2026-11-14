// ---------- Textos: repaso espaciado, metas e insignias ----------
const T8K=['goalT','goalDone','goalPick','badges','due','dueNote','dueNone','notYet'];
const BADGES=['first','streak3','streak7','streak30','xp100','xp1000','goal7','mastery','exam','alpha','polyglot','memo7'];
const T8={
en:"Today's goal|Goal reached!|Daily goal|Achievements|Today's review|{n} questions to review today. What you get right comes back after a longer gap.|Nothing to review today.|Not yet|First step|Three in a row|Faithful week|Month of light|100 XP|1,000 XP|Steady goal|Mastery|Exam passed|Two alphabets|Polyglot|Verses by heart|Complete your first lesson|Keep a 3-day streak|Keep a 7-day streak|Keep a 30-day streak|Earn 100 XP|Earn 1,000 XP|Reach your daily goal on 7 days|Reach 85% in a Bible course|Pass a final exam|Finish the Greek and Hebrew alphabets|Start all three biblical languages|Memorise 7 verses",
es:"Meta de hoy|¡Meta cumplida!|Meta diaria|Logros|Repaso de hoy|{n} preguntas para repasar hoy. Lo que aciertas vuelve más adelante.|Hoy no tienes nada pendiente de repaso.|Aún no|Primer paso|Tres seguidos|Semana fiel|Mes de luz|100 XP|1000 XP|Meta constante|Dominio|Examen aprobado|Dos alfabetos|Políglota|Versículos de memoria|Completa tu primera lección|Mantén una racha de 3 días|Mantén una racha de 7 días|Mantén una racha de 30 días|Consigue 100 XP|Consigue 1000 XP|Cumple tu meta diaria 7 días|Llega al 85 % en un curso de la Biblia|Aprueba un examen final|Termina los alfabetos griego y hebreo|Empieza los tres idiomas bíblicos|Memoriza 7 versículos",
pt:"Meta de hoje|Meta cumprida!|Meta diária|Conquistas|Revisão de hoje|{n} perguntas para revisar hoje. O que acertar volta mais adiante.|Hoje não tem nada para revisar.|Ainda não|Primeiro passo|Três seguidos|Semana fiel|Mês de luz|100 XP|1000 XP|Meta constante|Domínio|Exame aprovado|Dois alfabetos|Poliglota|Versículos de cor|Conclua a sua primeira lição|Mantenha uma sequência de 3 dias|Mantenha uma sequência de 7 dias|Mantenha uma sequência de 30 dias|Ganhe 100 XP|Ganhe 1000 XP|Cumpra a meta diária em 7 dias|Chegue a 85% num curso da Bíblia|Passe num exame final|Termine os alfabetos grego e hebraico|Comece as três línguas bíblicas|Memorize 7 versículos",
fr:"Objectif du jour|Objectif atteint !|Objectif quotidien|Succès|Révision du jour|{n} questions à réviser aujourd’hui. Ce que vous réussissez revient plus tard.|Rien à réviser aujourd’hui.|Pas encore|Premier pas|Trois d’affilée|Semaine fidèle|Mois de lumière|100 XP|1000 XP|Objectif régulier|Maîtrise|Examen réussi|Deux alphabets|Polyglotte|Versets par cœur|Terminez votre première leçon|Gardez une série de 3 jours|Gardez une série de 7 jours|Gardez une série de 30 jours|Gagnez 100 XP|Gagnez 1000 XP|Atteignez votre objectif 7 jours|Atteignez 85 % dans un cours biblique|Réussissez un examen final|Terminez les alphabets grec et hébreu|Commencez les trois langues bibliques|Mémorisez 7 versets",
it:"Obiettivo di oggi|Obiettivo raggiunto!|Obiettivo giornaliero|Traguardi|Ripasso di oggi|{n} domande da ripassare oggi. Ciò che indovini torna più avanti.|Oggi non hai nulla da ripassare.|Non ancora|Primo passo|Tre di fila|Settimana fedele|Mese di luce|100 XP|1000 XP|Obiettivo costante|Padronanza|Esame superato|Due alfabeti|Poliglotta|Versetti a memoria|Completa la tua prima lezione|Mantieni una serie di 3 giorni|Mantieni una serie di 7 giorni|Mantieni una serie di 30 giorni|Guadagna 100 XP|Guadagna 1000 XP|Raggiungi l’obiettivo per 7 giorni|Arriva all’85% in un corso biblico|Supera un esame finale|Completa gli alfabeti greco ed ebraico|Inizia le tre lingue bibliche|Memorizza 7 versetti",
de:"Tagesziel|Ziel erreicht!|Tägliches Ziel|Erfolge|Heutige Wiederholung|{n} Fragen zum Wiederholen. Was du richtig hast, kommt später wieder.|Heute gibt es nichts zu wiederholen.|Noch nicht|Erster Schritt|Drei in Folge|Treue Woche|Monat des Lichts|100 XP|1000 XP|Beständiges Ziel|Meisterschaft|Prüfung bestanden|Zwei Alphabete|Polyglott|Verse auswendig|Schließe deine erste Lektion ab|Halte eine Serie von 3 Tagen|Halte eine Serie von 7 Tagen|Halte eine Serie von 30 Tagen|Sammle 100 XP|Sammle 1000 XP|Erreiche dein Tagesziel an 7 Tagen|Erreiche 85 % in einem Bibelkurs|Bestehe eine Abschlussprüfung|Schließe das griechische und hebräische Alphabet ab|Beginne alle drei biblischen Sprachen|Lerne 7 Verse auswendig",
el:"Στόχος σήμερα|Ο στόχος επιτεύχθηκε!|Ημερήσιος στόχος|Επιτεύγματα|Σημερινή επανάληψη|{n} ερωτήσεις για επανάληψη σήμερα. Όσα απαντάτε σωστά επιστρέφουν αργότερα.|Δεν έχετε τίποτα για επανάληψη σήμερα.|Όχι ακόμη|Πρώτο βήμα|Τρεις στη σειρά|Πιστή εβδομάδα|Μήνας φωτός|100 XP|1000 XP|Σταθερός στόχος|Κατάκτηση|Εξέταση επιτυχής|Δύο αλφάβητα|Πολύγλωσσος|Στίχοι απέξω|Ολοκληρώστε το πρώτο σας μάθημα|Κρατήστε σειρά 3 ημερών|Κρατήστε σειρά 7 ημερών|Κρατήστε σειρά 30 ημερών|Κερδίστε 100 XP|Κερδίστε 1000 XP|Πετύχετε τον ημερήσιο στόχο 7 ημέρες|Φτάστε στο 85% σε ένα μάθημα Γραφής|Περάστε μια τελική εξέταση|Ολοκληρώστε το ελληνικό και το εβραϊκό αλφάβητο|Ξεκινήστε και τις τρεις βιβλικές γλώσσες|Απομνημονεύστε 7 στίχους",
ru:"Цель на сегодня|Цель достигнута!|Ежедневная цель|Достижения|Повторение на сегодня|{n} вопросов на повторение сегодня. То, что вы ответили верно, вернётся позже.|Сегодня повторять нечего.|Пока нет|Первый шаг|Три дня подряд|Верная неделя|Месяц света|100 XP|1000 XP|Постоянство|Мастерство|Экзамен сдан|Два алфавита|Полиглот|Стихи наизусть|Пройдите первый урок|Занимайтесь 3 дня подряд|Занимайтесь 7 дней подряд|Занимайтесь 30 дней подряд|Наберите 100 XP|Наберите 1000 XP|Выполните дневную цель 7 дней|Наберите 85 % в курсе Библии|Сдайте итоговый экзамен|Пройдите греческий и еврейский алфавиты|Начните все три библейских языка|Выучите 7 стихов наизусть",
ro:"Ținta de azi|Țintă atinsă!|Țintă zilnică|Realizări|Recapitularea de azi|{n} întrebări de recapitulat azi. Ce răspunzi corect revine mai târziu.|Azi nu ai nimic de recapitulat.|Încă nu|Primul pas|Trei la rând|Săptămână credincioasă|Lună de lumină|100 XP|1000 XP|Țintă constantă|Stăpânire|Examen promovat|Două alfabete|Poliglot|Versete pe de rost|Termină prima lecție|Păstrează o serie de 3 zile|Păstrează o serie de 7 zile|Păstrează o serie de 30 de zile|Câștigă 100 XP|Câștigă 1000 XP|Atinge ținta zilnică 7 zile|Ajunge la 85% într-un curs biblic|Promovează un examen final|Termină alfabetele grecesc și ebraic|Începe toate cele trei limbi biblice|Memorează 7 versete"};
for(const l in T8){const a=T8[l].split('|');T8K.forEach((k,i)=>T[l][k]=a[i]);BADGES.forEach((b,i)=>{T[l]['bn_'+b]=a[8+i];T[l]['bd_'+b]=a[20+i]})}

// ---------- Repaso espaciado (cajas de Leitner) ----------
const SRS_DAYS=[1,3,7,16,30];
const addDays=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);
const _recWeakS=recWeak;
recWeak=function(it,ok){
 _recWeakS(it,ok);
 if(!it||!it.wk)return;const k=(it.wbr||LS.br)+'|'+it.wk;const s=store.get('srs',{});const e=s[k];
 if(ok){const b=e?Math.min(e.b+1,SRS_DAYS.length-1):0;s[k]={b,d:addDays(SRS_DAYS[b])}}
 else s[k]={b:0,d:addDays(1)};
 store.set('srs',s);
};
const dueKeys=()=>{const s=store.get('srs',{}),td=today();return Object.keys(s).filter(k=>s[k].d<=td)};
async function itemsFromKeys(keys){
 const items=[];
 for(const k of keys){const i=k.indexOf('|');const wbr=k.slice(0,i),wk=k.slice(i+1);
  try{if(wk.startsWith('L:')){const [,lc,kd,n]=wk.split(':');if(LANGC[lc]&&(kd!=='L'||LANGC[lc].letters))items.push(lq(lc,kd,+n))}
   else if(COURSE_META[wbr]){await needVerses(wbr,[wk]);const g=qGen(wbr,wk);const q=g[rnd(g.length)]();if(q)items.push(q)}}catch(e){}}
 return items.filter(Boolean);
}
const _startPractice=startPractice;
startPractice=async function(kind){
 if(kind!=='due')return _startPractice(kind);
 const keys=shuffle(dueKeys()).slice(0,15);
 if(!keys.length){const el=$('#prMsg');if(el)el.innerHTML=`<p class="note" style="margin-top:12px">${esc(t('dueNone'))}</p>`;return}
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 const items=await itemsFromKeys(keys);
 if(!items.length){renderLearn();return}
 LS={br:'prac',id:'prac:due',items,i:0,hearts:Infinity,right:0,total:items.length,sel:null,checked:false};
 S.view='lesson';setHeader();drawLesson();
};

// ---------- Meta diaria ----------
const _addXP=addXP;
addXP=function(n){
 _addXP(n);
 const d=store.get('xpday',{d:today(),xp:0});if(d.d!==today()){d.d=today();d.xp=0}
 const before=d.xp;d.xp+=n;store.set('xpday',d);
 const goal=store.get('goal',30);if(before<goal&&d.xp>=goal)store.set('goalDays',store.get('goalDays',0)+1);
 const s=stats();if(s.streak>store.get('bestStreak',0))store.set('bestStreak',s.streak);
};
const _endLesson=endLesson;
endLesson=function(ok){if(LS&&LS.id==='prac:memo')store.set('memoCount',store.get('memoCount',0)+1);_endLesson(ok)};
function goalHTML(){
 const goal=store.get('goal',30);const d=store.get('xpday',{d:today(),xp:0});const xp=d.d===today()?d.xp:0;const per=Math.min(100,Math.round(xp/goal*100));
 return `<div class="card goalc"><div class="t" style="font-size:20px">${esc(t('goalT'))}<span class="pill ${xp>=goal?'':'soft'}">${xp>=goal?esc(t('goalDone')):xp+' / '+goal+' XP'}</span></div>
 <div class="pbar small" style="height:10px;margin:10px 0"><i style="width:${per}%"></i></div>
 <div class="seg" role="group" aria-label="${esc(t('goalPick'))}" style="margin:0">${[10,30,50,100].map(g=>`<button aria-pressed="${g===goal}" data-goal="${g}">${g} XP</button>`).join('')}</div></div>`;
}

// ---------- Insignias ----------
function badgeState(){
 const st=stats(),best=Math.max(store.get('bestStreak',0),st.streak);
 const courses=['ortodoxa','catolica','protestante'];
 const anyDone=courses.some(b=>Object.keys(prog(b).done).length)||['el','he','la'].some(l=>Object.keys(prog('lang-'+l).done).length);
 const alphaDone=lc=>langUnits(lc).filter(u=>u.id.startsWith('alpha')).every(u=>prog('lang-'+lc).done[u.id]);
 return {first:anyDone,streak3:best>=3,streak7:best>=7,streak30:best>=30,xp100:st.xp>=100,xp1000:st.xp>=1000,goal7:store.get('goalDays',0)>=7,
  mastery:courses.some(b=>pct(b)>=.85),exam:courses.some(b=>(prog(b).exam||0)>=85),alpha:alphaDone('el')&&alphaDone('he'),
  polyglot:['el','he','la'].every(l=>Object.keys(prog('lang-'+l).done).length>0),memo7:store.get('memoCount',0)>=7};
}
const BICON={first:'1',streak3:'3',streak7:'7',streak30:'30',xp100:'100',xp1000:'1K',goal7:'◎',mastery:'85%',exam:'✓',alpha:'αא',polyglot:'3',memo7:'❝'};
function badgesHTML(){
 const s=badgeState();const n=BADGES.filter(b=>s[b]).length;
 return `<h2>${esc(t('badges'))} · ${n}/${BADGES.length}</h2><div class="badges">${BADGES.map(b=>`<div class="badge ${s[b]?'on':''}"><span class="bico" aria-hidden="true">${BICON[b]}</span><b>${esc(t('bn_'+b))}</b><span>${esc(s[b]?t('bd_'+b):t('notYet')+' · '+t('bd_'+b))}</span></div>`).join('')}</div>`;
}

// ---------- Integración en Aprender ----------
const _renderPracticeHTML2=renderPracticeHTML;
renderPracticeHTML=function(){
 const n=dueKeys().length;
 return `<button class="card main" data-pr="due"><div class="t">${esc(t('due'))}${n?`<span class="pill">${n}</span>`:''}</div><div class="s">${esc(n?t('dueNote').replace('{n}',n):t('dueNone'))}</div></button>`+_renderPracticeHTML2().replace('class="card main" data-memo','class="card" data-memo').replace('class="card main" data-pr="random"','class="card" data-pr="random"')+badgesHTML();
};
const _renderLearn5=renderLearn;
renderLearn=function(){
 _renderLearn5();
 const anchor=view.querySelector('.lvbox');if(!anchor)return;
 anchor.insertAdjacentHTML('afterend',goalHTML());
 view.querySelectorAll('[data-goal]').forEach(x=>x.onclick=()=>{store.set('goal',+x.dataset.goal);renderLearn()});
};
