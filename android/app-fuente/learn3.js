// ---------- Textos: traducción visible y memorizar ----------
const T6K=['showTr','hideTr','trHint','memo','memoNote','gotIt','memComplete'];
const T6={
en:"Show translation|Hide translation|Tip: tap “Show translation” at any time to see the meaning in your language. It is only hidden in memorisation exercises.|Memorise a verse|Learn today’s verse by heart, step by step.|Got it|Complete the verse",
es:"Ver traducción|Ocultar traducción|Consejo: toca «Ver traducción» cuando quieras para ver el significado en tu idioma. Solo se oculta en los ejercicios de memorizar.|Memorizar un versículo|Aprende de memoria el versículo del día, paso a paso.|Entendido|Completa el versículo",
pt:"Ver tradução|Ocultar tradução|Dica: toque em «Ver tradução» quando quiser para ver o significado no seu idioma. Só fica oculta nos exercícios de memorização.|Memorizar um versículo|Aprenda de cor o versículo do dia, passo a passo.|Entendi|Complete o versículo",
fr:"Voir la traduction|Masquer la traduction|Astuce : touchez « Voir la traduction » à tout moment pour voir le sens dans votre langue. Elle n’est masquée que dans les exercices de mémorisation.|Mémoriser un verset|Apprenez par cœur le verset du jour, pas à pas.|Compris|Complétez le verset",
it:"Mostra traduzione|Nascondi traduzione|Suggerimento: tocca «Mostra traduzione» quando vuoi per vedere il significato nella tua lingua. È nascosta solo negli esercizi di memoria.|Memorizza un versetto|Impara a memoria il versetto del giorno, passo dopo passo.|Ho capito|Completa il versetto",
de:"Übersetzung zeigen|Übersetzung ausblenden|Tipp: Tippe jederzeit auf „Übersetzung zeigen“, um die Bedeutung in deiner Sprache zu sehen. Nur bei Auswendiglern-Übungen ist sie ausgeblendet.|Einen Vers auswendig lernen|Lerne den Vers des Tages Schritt für Schritt auswendig.|Verstanden|Ergänze den Vers",
el:"Εμφάνιση μετάφρασης|Απόκρυψη μετάφρασης|Συμβουλή: πατήστε «Εμφάνιση μετάφρασης» όποτε θέλετε για να δείτε τη σημασία στη γλώσσα σας. Κρύβεται μόνο στις ασκήσεις απομνημόνευσης.|Απομνημόνευση στίχου|Μάθετε απέξω τον στίχο της ημέρας, βήμα βήμα.|Εντάξει|Συμπληρώστε τον στίχο",
ru:"Показать перевод|Скрыть перевод|Совет: нажмите «Показать перевод» в любой момент, чтобы увидеть смысл на вашем языке. Он скрыт только в упражнениях на запоминание.|Выучить стих наизусть|Выучите стих дня наизусть, шаг за шагом.|Понятно|Дополните стих",
ro:"Arată traducerea|Ascunde traducerea|Sfat: atinge „Arată traducerea” oricând pentru a vedea sensul în limba ta. Este ascunsă doar în exercițiile de memorare.|Memorează un verset|Învață pe de rost versetul zilei, pas cu pas.|Am înțeles|Completează versetul"};
for(const l in T6){const a=T6[l].split('|');T6K.forEach((k,i)=>T[l][k]=a[i])}

// ---------- Botón «Ver traducción» ----------
function trBlock(it){return it&&it.tr?`<button class="trbtn" id="trB" aria-expanded="false" aria-controls="trP">👁 ${esc(t('showTr'))}</button><p class="qtr" id="trP" hidden lang="${it.trl||LANG}">${esc(it.tr)}</p>`:''}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#trB');if(!b)return;const p=$('#trP');if(!p)return;p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden));b.textContent='👁 '+t(p.hidden?'showTr':'hideTr')});
const _recWeak=recWeak;
recWeak=function(it,ok){_recWeak(it,ok);const p=$('#trP'),b=$('#trB');if(p&&p.hidden){p.hidden=false;if(b){b.setAttribute('aria-expanded','true');b.textContent='👁 '+t('hideTr')}}};
const EDBR={'original-hebreo-griego':'protestante','ortodoxa-griega':'ortodoxa','vulgata-clementina':'catolica'};
async function trVerse(ed,b,c,v){
 const br=EDBR[ed];if(!br)return null;let tr=TRMAP[br][LANG];if(tr===null)return null;tr=tr||TRFALL[br];
 try{const bk=await getBookAlias(tr,b);if(!bk)return null;const [tc,tv]=mapRef(ed,tr,b,c,+v);const row=bk.ch[tc]&&bk.ch[tc].find(r=>r[0]===tv);return row?{t:row[1],l:TRLANG[tr]}:null}catch(e){return null}
}
// la lectura real añade la traducción del versículo
const _readingQs=readingQs;
readingQs=async function(lc,n){
 const qs=await _readingQs(lc,n);const L=LANGC[lc];
 for(const q of qs){const m=q.extra.match(/—\s*(.+?)\s(\d+),\s(\d+)$/);if(!m)continue;
  const code=Object.keys(BN).find(k=>BN[k]===m[1]);if(!code)continue;
  const r=await trVerse(L.ed,code,m[2],m[3]);if(r){q.tr=r.t;q.trl=r.l}}
 return qs;
};
// las preguntas del curso bíblico con texto original (lector griego en la Biblia ortodoxa) también llevan traducción si existe
const _drawLesson=drawLesson;
drawLesson=function(){
 _drawLesson();
 const it=LS&&LS.items[LS.i];if(!it||!it.tr)return;
 const anchor=view.querySelector('.qx')||view.querySelector('.qp');if(anchor&&!$('#trB'))anchor.insertAdjacentHTML('afterend',trBlock(it));
};

// ---------- Consejo de bienvenida en Aprender ----------
const _renderLearn3=renderLearn;
renderLearn=function(){
 _renderLearn3();
 if(store.get('trHintSeen',false))return;
 const h1=view.querySelector('h1');if(!h1)return;
 h1.insertAdjacentHTML('afterend',`<div class="card" id="trHint"><div class="s" style="color:var(--ink);font-size:15px">💡 ${esc(t('trHint'))}</div><button class="btn ghost" id="trHintOk" style="margin-top:10px;width:100%">${esc(t('gotIt'))}</button></div>`);
 $('#trHintOk').onclick=()=>{store.set('trHintSeen',true);const c=$('#trHint');if(c)c.remove()};
};

// ---------- Memorizar un versículo (sin traducción visible) ----------
async function memoItems(){
 const ref=VOTD[dayIdx()%VOTD.length];const [b,cv]=ref.split(' ');const [c,v]=cv.split(':');
 const src=TRMAP.protestante[LANG]||'en-kjv';
 const bk=await getBook(src,b);const [mc,mv]=mapRef('reina-valera-1909',src,b,c,+v);const row=bk&&bk.ch[mc]&&bk.ch[mc].find(r=>r[0]===mv);if(!row)return[];
 const text=row[1],refTxt=`${bname(b)} ${c}, ${v}`,words=text.split(/\s+/);
 const items=[{type:'lcard',html:`<div class="lcard"><span class="pill soft">${esc(t('memo'))}</span><h1 style="font-size:24px">${esc(refTxt)}</h1><p class="qx" lang="${TRLANG[src]}" style="font-size:20px">${esc(text)}</p>${sayBtn(text,TRLANG[src])}</div>`}];
 const cand=words.map((w,k)=>[w.replace(/[^\p{L}]/gu,''),k]).filter(([w])=>w.length>=4);
 const pool=[...new Set(cand.map(x=>x[0]))];
 const extra=['Dios','Señor','amor','vida','luz','God','Lord','love','life','light'];
 shuffle(cand).slice(0,4).forEach(([w,k])=>{const others=pickN(pool.length>3?pool:pool.concat(extra),3,[w]);if(others.length<3)return;
  const shown=words.map((x,j)=>j===k?x.replace(w,'_____'):x).join(' ');
  items.push(Object.assign(mcq(t('memComplete')+' ('+refTxt+')',w,others,shown),{xlang:TRLANG[src]}))});
 if(words.length>=8){const n=4,size=Math.ceil(words.length/n);const parts=[];for(let i=0;i<words.length;i+=size)parts.push(words.slice(i,i+size).join(' '));
  items.push({type:'order',prompt:ct('qOrder')+' ('+refTxt+')',items:parts,answer:parts})}
 return items;
}
async function startMemo(){
 view.innerHTML=`<div class="loading">${esc(t('loading'))}</div>`;
 const items=await memoItems();if(!items.length){renderLearn();return}
 LS={br:'prac',id:'prac:memo',items,i:0,hearts:Infinity,right:0,total:items.filter(x=>x.type!=='lcard').length,sel:null,checked:false};
 S.view='lesson';setHeader();drawLesson();
}
const _renderPracticeHTML=renderPracticeHTML;
renderPracticeHTML=function(){return _renderPracticeHTML().replace('<button class="card main" data-pr="random">',`<button class="card main" data-memo="1"><div class="t">${esc(t('memo'))}</div><div class="s">${esc(t('memoNote'))}</div></button><button class="card" data-pr="random">`)};
const _bindPractice=bindPractice;
bindPractice=function(){_bindPractice();const m=view.querySelector('[data-memo]');if(m)m.onclick=startMemo};
const _restart=restartLesson;
restartLesson=function(br,id){if(id==='prac:memo')return startMemo();_restart(br,id)};

// ---------- Nivel de dificultad ----------
const T7K=['level','lvEasy','lvNormal','lvHard','lvNote'];
const T7={
en:"Level|Easy|Normal|Hard|Easy: translation always visible and 5 lives. Normal: “Show translation” button and 3 lives. Hard: translation only after answering, no transliteration, 2 lives.",
es:"Nivel|Fácil|Normal|Difícil|Fácil: traducción siempre visible y 5 vidas. Normal: botón «Ver traducción» y 3 vidas. Difícil: traducción solo al responder, sin transcripción y 2 vidas.",
pt:"Nível|Fácil|Normal|Difícil|Fácil: tradução sempre visível e 5 vidas. Normal: botão «Ver tradução» e 3 vidas. Difícil: tradução só depois de responder, sem transliteração e 2 vidas.",
fr:"Niveau|Facile|Normal|Difficile|Facile : traduction toujours visible et 5 vies. Normal : bouton « Voir la traduction » et 3 vies. Difficile : traduction seulement après la réponse, sans translittération et 2 vies.",
it:"Livello|Facile|Normale|Difficile|Facile: traduzione sempre visibile e 5 vite. Normale: pulsante «Mostra traduzione» e 3 vite. Difficile: traduzione solo dopo la risposta, senza traslitterazione e 2 vite.",
de:"Niveau|Leicht|Normal|Schwer|Leicht: Übersetzung immer sichtbar und 5 Leben. Normal: Schaltfläche „Übersetzung zeigen“ und 3 Leben. Schwer: Übersetzung erst nach der Antwort, ohne Umschrift und 2 Leben.",
el:"Επίπεδο|Εύκολο|Κανονικό|Δύσκολο|Εύκολο: η μετάφραση φαίνεται πάντα και 5 ζωές. Κανονικό: κουμπί «Εμφάνιση μετάφρασης» και 3 ζωές. Δύσκολο: μετάφραση μόνο μετά την απάντηση, χωρίς μεταγραφή και 2 ζωές.",
ru:"Уровень|Лёгкий|Обычный|Сложный|Лёгкий: перевод всегда виден, 5 жизней. Обычный: кнопка «Показать перевод», 3 жизни. Сложный: перевод только после ответа, без транслитерации, 2 жизни.",
ro:"Nivel|Ușor|Normal|Dificil|Ușor: traducerea mereu vizibilă și 5 vieți. Normal: butonul „Arată traducerea” și 3 vieți. Dificil: traducerea doar după răspuns, fără transliterare și 2 vieți."};
for(const l in T7){const a=T7[l].split('|');T7K.forEach((k,i)=>T[l][k]=a[i])}
const lv=()=>store.get('level','normal');
const HEARTS={easy:5,normal:3,hard:2};
// la traducción según el nivel
const _drawLesson2=drawLesson;
drawLesson=function(){
 const it=LS&&LS.items[LS.i];
 if(it&&lv()==='hard'&&it.xlang&&it.extra&&!it._h&&it.extra.includes('  ·  ')){it.extra=it.extra.split('  ·  ')[0];it._h=1}
 _drawLesson2();
 if(!it||!it.tr)return;
 const b=$('#trB'),p=$('#trP');if(!b||!p)return;
 if(lv()==='easy'){p.hidden=false;b.setAttribute('aria-expanded','true');b.textContent='👁 '+t('hideTr')}
 else if(lv()==='hard'&&!LS.checked){b.hidden=true}
};
const _recWeak2=recWeak;
recWeak=function(it,ok){_recWeak2(it,ok);const b=$('#trB');if(b)b.hidden=false};
// vidas según el nivel
const setHearts=()=>{if(LS&&LS.hearts!==Infinity){LS.hearts=HEARTS[lv()]||3;drawLesson()}};
const _startLesson=startLesson;startLesson=async function(br,id){await _startLesson(br,id);setHearts()};
const _startLangLesson=startLangLesson;startLangLesson=async function(lc,id){await _startLangLesson(lc,id);setHearts()};
// selector de nivel en Aprender
const _renderLearn4=renderLearn;
renderLearn=function(){
 _renderLearn4();
 const tabs=view.querySelector('.seg[role=tablist]');if(!tabs)return;
 const L=lv();
 tabs.insertAdjacentHTML('afterend',`<div class="lvbox"><div class="seg" role="group" aria-label="${esc(t('level'))}">${[['easy','lvEasy'],['normal','lvNormal'],['hard','lvHard']].map(([k,l])=>`<button aria-pressed="${L===k}" data-lv="${k}">${esc(t(l))}</button>`).join('')}</div><p class="note" style="margin:-4px 0 12px">${esc(t('lvNote'))}</p></div>`);
 view.querySelectorAll('[data-lv]').forEach(x=>x.onclick=()=>{store.set('level',x.dataset.lv);renderLearn()});
};
