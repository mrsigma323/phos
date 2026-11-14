// ---------- Traducciones de las secciones nuevas (pt, fr, it, de, el, ru, ro) ----------
// Cada tr_xx.js rellena TRX.xx; aquí se reparte en los diccionarios de cada sección.
// {GEN}, {MAT}… se sustituyen por el nombre del libro en el idioma de la app.
const trB=s=>typeof s==='string'?s.replace(/\{([1-3]?[A-Z]{2,3})\}/g,(m,c)=>BN[c]||m):s;
const trHas=()=>!!TRX[LANG];
(function(){
 for(const l in TRX){const X=TRX[l];
  if(X.LX)LX[l]=X.LX;if(X.FX)FX[l]=X.FX;if(X.EZT)EZT[l]=X.EZT;if(X.NMT)NMT[l]=X.NMT;if(X.VX)VX[l]=X.VX;if(X.TASKS)TASKS[l]=X.TASKS;
  if(X.NTRAPS)NTRAPS[l]=X.NTRAPS;if(X.HTRAPS)HTRAPS[l]=X.HTRAPS;
  if(X.TRAPS)X.TRAPS.forEach((t,i)=>{if(TRAPS[i])TRAPS[i][l]=t});
 }
 VX.es.days='días';VX.en.days='days';
})();
const trGet=k=>TRX[LANG]&&TRX[LANG][k];
// Textos con referencias bíblicas: se rellenan al usarlos, cuando ya se conocen los nombres de los libros
const _ltT=lt;
const coachTxt=(c,i)=>{const C=trGet('COACH');return LANG==='es'?c[1]:(C&&C[i])||c[2]};
const logroN=g=>{const L=trGet('LOGROS'),i=LOGROS.indexOf(g);return LANG==='es'?g[2]:(L&&L[i]?L[i][0]:g[4])};
const logroD=g=>{const L=trGet('LOGROS'),i=LOGROS.indexOf(g);return LANG==='es'?g[3]:(L&&L[i]?L[i][1]:g[5])};
const figOK=()=>LANG==='es'||LANG==='en'||!!trGet('FIG');
const tlevL=k=>{const T=trGet('TLEV');return LANG==='es'?TLEV[k][0]:(T&&T[k])||TLEV[k][1]};
const jourT=j=>{const J=trGet('JOUR'),i=JOURNEYS.indexOf(j);return LANG==='es'?j.es:(J&&J[i]?J[i][0]:j.en)};
const jourP=(j,k)=>{const J=trGet('JOUR'),i=JOURNEYS.indexOf(j);return LANG==='es'?j.pts[k][0]:(J&&J[i]&&J[i][1][k])||j.pts[k][1]};
const rtx=(k,o)=>{const R=trGet('R')||{};const D={es:{clue1:'Apareces en el libro de {b}',clue3:'Tu nombre empieza por «{c}»',places:'lugares'},en:{clue1:'You appear in the book of {b}',clue3:'Your name begins with “{c}”',places:'places'}};
 let s=R[k]||(D[LANG]||D.en)[k];if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
