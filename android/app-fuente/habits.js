// ---------- Sección «Hábitos cristianos» (antes «Deporte») ----------
(function(){const i=SECS.indexOf('sport');for(const l in NAV){const h=HBX[l]||HBX.en;if(i>=0)NAV[l][i]=h.sec[0]}})();
MENU_ICO.sport='🌱';
function renderHabits(){
 const h=hbx(),X=CX[CL()]?CX[CL()].artx:ARTX[CL()];
 view.innerHTML=`<h1>${esc(h.sec[0])}</h1><p class="lead">${esc(h.sec[1])}</p><div class="tpcards">${HBK.map(tpCardHTML).join('')}</div><p class="note">${esc(X.disc)}</p>`;
 view.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>go('topic',{topic:b.dataset.tp}));
}
const _renderArticlesH2=renderArticles;
renderArticles=async function(sec){if(sec==='sport'&&S.view!=='topic')return renderHabits();return _renderArticlesH2(sec)};
