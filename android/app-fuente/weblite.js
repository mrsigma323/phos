// ---------- Versión web (lite): sin cursos, sin audio, sin modo noche, con aviso de que es la versión web ----------
(function(){
 // 1) Fuera la sección de cursos (y con ella el audio de pronunciación)
 const i=SECS.indexOf('learn');
 if(i>=0){SECS.splice(i,1);for(const l in NAV)if(Array.isArray(NAV[l])&&NAV[l].length>SECS.length)NAV[l].splice(i,1)}
 {const j=SECS.indexOf('today');if(j>=0){SECS.splice(j,1);for(const l in NAV)if(Array.isArray(NAV[l]))NAV[l].splice(j,1)}}
 if(S.sec==='learn'||S.sec==='today'){S.sec=SECS[0];S.view='home'}
 try{say=function(){}}catch(e){}
 // 2) Siempre en modo claro, sin botón de modo noche
 applyTheme=function(){document.documentElement.dataset.theme='light'};
 applyTheme();
 const tb=$('#themeBtn');if(tb)tb.remove();
 // 3) Franja fija: avisa de que esto es la versión web, no de que el proyecto esté sin terminar
 const TX={
  es:['📱 Estás en la versión web','La app para móviles añadirá los cursos, el audio y más funciones.'],
  en:['📱 You are using the web version','The mobile app will add courses, audio and more features.'],
  pt:['📱 Você está na versão web','O app para celular acrescentará os cursos, o áudio e mais funções.'],
  fr:['📱 Vous utilisez la version web','L’application mobile ajoutera les cours, l’audio et d’autres fonctions.'],
  it:['📱 Stai usando la versione web','L’app per dispositivi mobili aggiungerà i corsi, l’audio e altre funzioni.'],
  de:['📱 Du nutzt die Webversion','Die mobile App ergänzt Kurse, Audio und weitere Funktionen.'],
  el:['📱 Χρησιμοποιείτε την έκδοση web','Η εφαρμογή για κινητά θα προσθέσει μαθήματα, ήχο και άλλες λειτουργίες.'],
  ru:['📱 Вы пользуетесь веб-версией','Мобильное приложение добавит курсы, аудио и другие функции.'],
  ro:['📱 Folosești versiunea web','Aplicația pentru mobil va adăuga cursurile, audio și alte funcții.']};
 const bar=document.createElement('div');bar.id='appBar';bar.setAttribute('role','note');
 const h=document.querySelector('header.top');h.after(bar);
 const fill=()=>{const x=TX[LANG]||TX.en;bar.innerHTML=`<b>${esc(x[0])}</b><span>${esc(x[1])}</span>`};
 const pos=()=>{bar.style.top=h.offsetHeight+'px'};
 fill();pos();addEventListener('resize',pos);
 const _al=applyLang;applyLang=function(){_al();fill();pos()};
 const st=document.createElement('style');
 st.textContent='#appBar{position:sticky;z-index:4;background:#E2C27A;color:#4A1416;padding:8px 16px;display:flex;flex-wrap:wrap;gap:2px 10px;align-items:baseline;font-size:14px;line-height:1.35;box-shadow:0 1px 3px rgba(0,0,0,.12)}#appBar b{font-size:15px}';
 document.head.append(st);
 // 5) Menú: un solo enlace a la web de Phos (inicio, lecturas, oraciones, cantos…).
 // Todo eso ya está en la web, que se adapta sola al teléfono; aquí solo queda lo que no está allí.
 const addHome=()=>{const l=$('#menuList');if(!l||l.querySelector('.mdon'))return;
  const a=document.createElement('a');a.className='mitem mdon';a.setAttribute('role','menuitem');a.href='../index.html';
  a.innerHTML='<span class="mico" aria-hidden="true">🏠</span><span>Inicio de Phos</span>';l.prepend(a)};
 const _dtH=drawTabs;drawTabs=function(){_dtH();addHome()};addHome();
 st.textContent+='.mdon{text-decoration:none;color:inherit;border-bottom:1px solid rgba(0,0,0,.08);margin-bottom:4px}';
 // 5b) Enlaces desde la web a una sección concreta: biblia/#salud, #habitos, #mas
 const HS={salud:'health',habitos:'sport',mas:'more'};
 const h0=(location.hash||'').replace('#','');
 if(HS[h0]){S.sec=HS[h0];S.view=HS[h0]}
 // 6) Idiomas de la web: de momento solo español (se irán abriendo uno a uno)
 const WEB_LANGS=['es'];
 if(!WEB_LANGS.includes(store.get('lang','auto')))store.set('lang',WEB_LANGS[0]);
 try{detectLang=function(){return WEB_LANGS[0]}}catch(e){}
 if(WEB_LANGS.length<2){const lb=$('#langBtn');if(lb){lb.hidden=true;lb.style.display='none'}}
})();

// Recuento de visitas de la Biblia (sin cookies ni datos personales)
try{if(navigator.sendBeacon&&!/bot|crawl|spider/i.test(navigator.userAgent))navigator.sendBeacon('/api/visita.php',new Blob([JSON.stringify({p:'/biblia/',r:document.referrer})],{type:'application/json'}))}catch(e){}
