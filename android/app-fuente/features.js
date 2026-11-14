// ---------- Textos de las funciones nuevas (9 idiomas) ----------
const T3K=['votd','plan','planDay','planStart','planDone','readBtn','marks','noMarks','hlt','bm','note','save','copy','copied','remove','dark','light'];
const T3={
en:["Verse of the day","Reading plan: the Bible in a year","Day {n} of 365","Start the plan","Done","Read","Bookmarks and notes","You have no bookmarks, highlights or notes yet. Tap a verse to add one.","Highlight","Bookmark","Note","Save","Copy","Copied","Remove","Night mode","Day mode"],
es:["Versículo del día","Plan de lectura: la Biblia en un año","Día {n} de 365","Empezar el plan","Hecho","Leer","Marcadores y notas","Aún no tienes marcadores, subrayados ni notas. Toca un versículo para añadirlos.","Subrayar","Marcador","Nota","Guardar","Copiar","Copiado","Quitar","Modo noche","Modo día"],
pt:["Versículo do dia","Plano de leitura: a Bíblia em um ano","Dia {n} de 365","Começar o plano","Feito","Ler","Marcadores e notas","Você ainda não tem marcadores, destaques nem notas. Toque num versículo para adicionar.","Destacar","Marcador","Nota","Salvar","Copiar","Copiado","Remover","Modo noturno","Modo diurno"],
fr:["Verset du jour","Plan de lecture : la Bible en un an","Jour {n} sur 365","Commencer le plan","Fait","Lire","Signets et notes","Vous n’avez encore ni signets, ni surlignages, ni notes. Touchez un verset pour en ajouter.","Surligner","Signet","Note","Enregistrer","Copier","Copié","Retirer","Mode nuit","Mode jour"],
it:["Versetto del giorno","Piano di lettura: la Bibbia in un anno","Giorno {n} di 365","Inizia il piano","Fatto","Leggi","Segnalibri e note","Non hai ancora segnalibri, evidenziazioni o note. Tocca un versetto per aggiungerne.","Evidenzia","Segnalibro","Nota","Salva","Copia","Copiato","Rimuovi","Modalità notte","Modalità giorno"],
de:["Vers des Tages","Leseplan: die Bibel in einem Jahr","Tag {n} von 365","Plan beginnen","Erledigt","Lesen","Lesezeichen und Notizen","Du hast noch keine Lesezeichen, Markierungen oder Notizen. Tippe auf einen Vers, um eine hinzuzufügen.","Markieren","Lesezeichen","Notiz","Speichern","Kopieren","Kopiert","Entfernen","Nachtmodus","Tagmodus"],
el:["Στίχος της ημέρας","Πρόγραμμα ανάγνωσης: η Γραφή σε ένα έτος","Ημέρα {n} από 365","Έναρξη προγράμματος","Έγινε","Ανάγνωση","Σελιδοδείκτες και σημειώσεις","Δεν έχετε ακόμη σελιδοδείκτες, επισημάνσεις ή σημειώσεις. Πατήστε έναν στίχο για να προσθέσετε.","Επισήμανση","Σελιδοδείκτης","Σημείωση","Αποθήκευση","Αντιγραφή","Αντιγράφηκε","Αφαίρεση","Νυχτερινή λειτουργία","Ημερήσια λειτουργία"],
ru:["Стих дня","План чтения: Библия за год","День {n} из 365","Начать план","Готово","Читать","Закладки и заметки","У вас пока нет закладок, выделений и заметок. Нажмите на стих, чтобы добавить.","Выделить","Закладка","Заметка","Сохранить","Копировать","Скопировано","Убрать","Ночной режим","Дневной режим"],
ro:["Versetul zilei","Plan de lectură: Biblia într-un an","Ziua {n} din 365","Începe planul","Gata","Citește","Semne de carte și note","Încă nu ai semne de carte, evidențieri sau note. Atinge un verset pentru a adăuga.","Evidențiază","Semn de carte","Notă","Salvează","Copiază","Copiat","Elimină","Modul de noapte","Modul de zi"]};
for(const l in T3)T3K.forEach((k,i)=>T[l][k]=T3[l][i]);

// ---------- Modo noche ----------
function applyTheme(){const m=store.get('theme','auto');document.documentElement.dataset.theme=m==='auto'?(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m}
(function(){const b=document.createElement('button');b.className='iconbtn';b.id='themeBtn';
 b.innerHTML='<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>';
 const lb=$('#langBtn');lb.parentNode.insertBefore(b,lb);
 b.onclick=()=>{const dark=document.documentElement.dataset.theme==='dark';store.set('theme',dark?'light':'dark');applyTheme();b.setAttribute('aria-label',t(dark?'dark':'light'))};
 applyTheme();
 try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme)}catch(e){}
})();
const _applyLang=applyLang;
applyLang=function(){_applyLang();const b=$('#themeBtn');if(b)b.setAttribute('aria-label',t(document.documentElement.dataset.theme==='dark'?'light':'dark'))};

// ---------- Marcadores, subrayados y notas ----------
const mk=()=>store.get('marks',{});
const mkey=(ed,b,c,v)=>ed+'|'+b+'|'+c+'|'+v;
function markClass(ed,b,c,v){const m=mk()[mkey(ed,b,c,v)];if(!m)return '';return (m.color?'mk-'+m.color+' ':'')+(m.note?'has-note ':'')+(m.bm?'has-bm':'')}
function toolsExtra(){return `<button id="marksBtn">${esc(t('marks'))}</button>`}
function bindVerses(b,trId,tb){
 const mb=$('#marksBtn');if(mb)mb.onclick=()=>go('marks');
 view.querySelectorAll('[data-v]').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');
  const open=()=>verseSheet(b,+el.dataset.v,el);el.onclick=open;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});
}
function verseSheet(b,v,el){
 const k=mkey(S.ed,S.book,S.ch,v);const all=mk();const m=all[k]||{};
 let dlg=$('#vs');if(!dlg){dlg=document.createElement('dialog');dlg.id='vs';document.body.appendChild(dlg)}
 const text=(el.innerText||'').replace(/^\d+\s*/,'').trim();
 const ref=`${bname(S.book)} ${S.ch}, ${v}`;
 dlg.innerHTML=`<h1 style="font-size:24px">${esc(ref)}</h1>
 <p class="note">${esc(t('hlt'))}</p><div class="tools">${['gold','blue','green'].map(c=>`<button class="sw sw-${c}" data-c="${c}" aria-pressed="${m.color===c}" aria-label="${esc(t('hlt'))} ${c}"></button>`).join('')}<button data-c="">${esc(t('remove'))}</button></div>
 <div class="tools"><button id="bmB" aria-pressed="${!!m.bm}">${m.bm?'★':'☆'} ${esc(t('bm'))}</button><button id="cpB">${esc(t('copy'))}</button></div>
 <label for="noteT" class="note" style="display:block;margin:6px 0">${esc(t('note'))}</label><textarea id="noteT" rows="3" style="width:100%;box-sizing:border-box;border:1px solid #C9BDA8;border-radius:10px;padding:10px;font:inherit">${esc(m.note||'')}</textarea>
 <div class="nav"><button id="svB">${esc(t('save'))}</button><button id="clB" class="btn ghost">${esc(t('close'))}</button></div>`;
 const save=patch=>{const a=mk();const n=Object.assign({},a[k]||{},patch,{t:Date.now(),ref:{ed:S.ed,book:S.book,ch:S.ch,v},txt:text.slice(0,240)});if(!n.color&&!n.bm&&!n.note)delete a[k];else a[k]=n;store.set('marks',a);el.className=el.className.replace(/\b(mk-\w+|has-note|has-bm)\b/g,'').trim()+' '+markClass(S.ed,S.book,S.ch,v)};
 dlg.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{save({color:x.dataset.c||null});dlg.querySelectorAll('[data-c]').forEach(y=>y.setAttribute('aria-pressed',y===x&&!!x.dataset.c))});
 $('#bmB').onclick=()=>{const on=!((mk()[k]||{}).bm);save({bm:on});$('#bmB').innerHTML=(on?'★':'☆')+' '+esc(t('bm'));$('#bmB').setAttribute('aria-pressed',on)};
 $('#cpB').onclick=async()=>{const s=`${text}\n— ${ref}`;try{await navigator.clipboard.writeText(s);$('#cpB').textContent=t('copied')}catch(e){const ta=$('#noteT');const old=ta.value;ta.value=s;ta.select();try{document.execCommand('copy');$('#cpB').textContent=t('copied')}catch(_){}ta.value=old}};
 $('#svB').onclick=()=>{save({note:$('#noteT').value.trim()||null});dlg.close()};
 $('#clB').onclick=()=>dlg.close();
 dlg.showModal();
}
function renderMarks(){
 const a=Object.values(mk()).sort((x,y)=>y.t-x.t);
 view.innerHTML=`<h1>${esc(t('marks'))}</h1>${a.length?a.map((m,i)=>`<button class="res ${m.color?'mk-'+m.color:''}" data-i="${i}"><b>${m.bm?'★ ':''}${esc(bname(m.ref.book))} ${esc(m.ref.ch)}, ${m.ref.v} · ${esc(edName(m.ref.ed))}</b><span>${esc(m.txt||'')}</span>${m.note?`<span class="note" style="display:block;margin-top:6px">✎ ${esc(m.note)}</span>`:''}</button>`).join(''):`<p class="lead">${esc(t('noMarks'))}</p>`}`;
 view.querySelectorAll('[data-i]').forEach(x=>x.onclick=()=>{const r=a[+x.dataset.i].ref;go('read',{ed:r.ed,book:r.book,ch:r.ch,hl:r.v})});
}

// ---------- Versículo del día y plan de lectura ----------
const VOTD="JOH 3:16|PSA 23:1|PHI 4:13|ROM 8:28|PRO 3:5|ISA 41:10|MAT 11:28|JER 29:11|1CO 13:4|PSA 46:1|MAT 5:9|JOH 14:6|ROM 12:12|GAL 5:22|HEB 11:1|1JO 4:8|PSA 119:105|MAT 6:33|ISA 40:31|JOS 1:9|PSA 27:1|JOH 1:1|MAT 5:3|LUK 6:31|2TI 1:7|JAM 1:5|PSA 34:8|ROM 5:8|EPH 2:8|COL 3:23|1PE 5:7|PSA 37:4|PRO 16:3|MIC 6:8|MAT 22:37|JOH 15:13|ROM 15:13|PSA 121:1|LAM 3:22|2CO 5:17".split('|');
const dayIdx=()=>Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
function planChunks(ed){const out=[];bookMeta(ed).books.forEach(b=>b.chs.forEach(c=>out.push([b.c,c])));const per=Math.ceil(out.length/365);const days=[];for(let i=0;i<365;i++)days.push(out.slice(i*per,(i+1)*per));return days.filter(d=>d.length)}
function planRange(d){if(!d.length)return '';const a=d[0],z=d[d.length-1];return a[0]===z[0]?`${bname(a[0])} ${a[1]}–${z[1]}`:`${bname(a[0])} ${a[1]} – ${bname(z[0])} ${z[1]}`}
// ---------- Elegir la Biblia del plan de lectura ----------
// Antes "Empezar el plan" arrancaba solo, con la ultima Biblia abierta o, si no
// habia ninguna, con la ortodoxa griega. El usuario no elegia nada y acababa
// leyendo en un idioma que no habia pedido.
const PLANX={
 es:["Elige la Biblia para el plan","Cambiar Biblia","Cada Biblia tiene libros distintos, así que las lecturas de cada día cambiarán. Seguirás en el día {n}.","Cancelar"],
 en:["Choose the Bible for the plan","Change Bible","Each Bible has different books, so the daily readings will change. You will stay on day {n}.","Cancel"],
 pt:["Escolha a Bíblia do plano","Trocar de Bíblia","Cada Bíblia tem livros diferentes, por isso as leituras diárias vão mudar. Você continuará no dia {n}.","Cancelar"],
 fr:["Choisissez la Bible du plan","Changer de Bible","Chaque Bible a des livres différents, les lectures quotidiennes vont donc changer. Vous resterez au jour {n}.","Annuler"],
 it:["Scegli la Bibbia del piano","Cambia Bibbia","Ogni Bibbia ha libri diversi, quindi le letture quotidiane cambieranno. Resterai al giorno {n}.","Annulla"],
 de:["Wähle die Bibel für den Plan","Bibel wechseln","Jede Bibel hat andere Bücher, daher ändern sich die Tageslesungen. Du bleibst bei Tag {n}.","Abbrechen"],
 el:["Επίλεξε τη Βίβλο για το πρόγραμμα","Αλλαγή Βίβλου","Κάθε Βίβλος έχει διαφορετικά βιβλία, γι΄αυτό τα καθημερινά αναγνώσματα θα αλλάξουν. Θα παραμείνεις στην ημέρα {n}.","Άκυρο"],
 ru:["Выберите Библию для плана","Сменить Библию","В каждой Библии разный состав книг, поэтому ежедневные чтения изменятся. Вы останетесь на дне {n}.","Отмена"],
 ro:["Alege Biblia pentru plan","Schimbă Biblia","Fiecare Biblie are cărți diferite, așa că lecturile zilnice se vor schimba. Vei rămâne în ziua {n}.","Anulează"]};
const px=i=>(PLANX[LANG]||PLANX.en)[i];
let planPick=false;
function planOptions(){const out=[];BRANCHES.forEach(b=>b.eds.forEach(e=>{if(MANIFEST[e.id])out.push([b,e])}));return out}
function planChooser(){
 const p=store.get('plan',null),n=p?Math.min(p.done||0,364)+1:1;
 return `<div class="card"><div class="t">${esc(px(0))}</div>`
  +(p?`<p class="note" style="margin:10px 0 0">${esc(px(2).replace('{n}',n))}</p>`:'')
  +`<div class="planops">`+planOptions().map(([b,e])=>
    `<button type="button" class="planop${p&&p.ed===e.id?' on':''}" data-ped="${e.id}">`
    +`<b>${esc(edName(e.id))}</b><span>${esc(brName(b))} · ${esc(edInfo(e.id))}</span></button>`).join('')
  +`</div><button class="btn ghost" id="plCancel" style="width:100%;margin-top:12px">${esc(px(3))}</button></div>`;
}
function homeExtras(){
 const ref=VOTD[dayIdx()%VOTD.length];const [b,cv]=ref.split(' ');const [c,v]=cv.split(':');
 const p=store.get('plan',null);let plan='';
 if(planPick){plan=planChooser()}
 else if(p&&MANIFEST[p.ed]){const days=planChunks(p.ed);const n=Math.min(p.done||0,days.length-1);
  plan=`<div class="card"><div class="t">${esc(t('plan'))}<span class="pill soft">${esc(t('planDay').replace('{n}',n+1))}</span></div><div class="s">${esc(planRange(days[n]))} · ${esc(edName(p.ed))}</div><div class="pbar small" style="height:8px;margin-top:10px"><i style="width:${Math.round(n/days.length*100)}%"></i></div><div class="nav" style="margin-top:12px"><button id="plR">${esc(t('readBtn'))}</button><button id="plD" class="btn ghost">${esc(t('planDone'))}</button></div><button type="button" class="planchg" id="plC">${esc(px(1))}</button></div>`}
 else plan=`<div class="card"><div class="t">${esc(t('plan'))}</div><button class="btn" id="plS" style="width:100%;margin-top:10px">${esc(t('planStart'))}</button></div>`;
 return `<div class="card main" id="votd"><div class="t">${esc(t('votd'))}</div><div class="s" id="votdTxt" style="font-family:'Noto Serif',serif;font-size:18px;line-height:1.6;color:#F6F1E7;margin-top:8px">…</div><div class="s" style="margin-top:6px;color:#E2C27A;font-weight:700">${esc(bname(b))} ${c}, ${v}</div></div>`+plan;
}
async function bindHomeExtras(){
 const ref=VOTD[dayIdx()%VOTD.length];const [b,cv]=ref.split(' ');const [c,v]=cv.split(':');
 const src=LANG==='el'?'ortodoxa-griega':TRMAP.protestante[LANG]||'en-kjv';
 try{const bk=await getBook(src,b);const [mc,mv]=mapRef('reina-valera-1909',src,b,c,+v);const row=bk&&bk.ch[mc]&&bk.ch[mc].find(r=>r[0]===mv);const el=$('#votdTxt');if(el&&row){el.textContent=row[1];el.lang=TRLANG[src]}}catch(e){}
 const vd=$('#votd');if(vd){vd.style.cursor='pointer';vd.onclick=()=>{const [oc,ov]=mapRef('reina-valera-1909','ortodoxa-griega',b,c,+v);const ed=bookMeta('ortodoxa-griega').map[b]?'ortodoxa-griega':'reina-valera-1909';go('read',{ed,book:b,ch:ed==='ortodoxa-griega'?oc:c,hl:ed==='ortodoxa-griega'?ov:+v})}}
 const ps=$('#plS');if(ps)ps.onclick=()=>{planPick=true;renderHome()};
 const pcg=$('#plC');if(pcg)pcg.onclick=()=>{planPick=true;renderHome()};
 const pcl=$('#plCancel');if(pcl)pcl.onclick=()=>{planPick=false;renderHome()};
 document.querySelectorAll('[data-ped]').forEach(bt=>bt.onclick=()=>{
  const ed=bt.dataset.ped,pp=store.get('plan',null);
  store.set('plan',{ed,done:pp?(pp.done||0):0,start:pp?pp.start:today()});
  planPick=false;renderHome()});
 const p=store.get('plan',null);
 const pr=$('#plR');if(pr)pr.onclick=()=>{const d=planChunks(p.ed)[Math.min(p.done||0,364)];go('read',{ed:p.ed,book:d[0][0],ch:d[0][1],hl:null})};
 const pd=$('#plD');if(pd)pd.onclick=()=>{p.done=(p.done||0)+1;store.set('plan',p);addXP(5);renderHome()};
}
