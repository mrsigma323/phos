// ---------- Menú desplegable desde la cruz (sustituye la barra de secciones) ----------
const MENU_T={es:'Menú',en:'Menu',pt:'Menu',fr:'Menu',it:'Menu',de:'Menü',el:'Μενού',ru:'Меню',ro:'Meniu'};
const MENU_ICO={bible:'📖',learn:'🎓',health:'🌿',sport:'🏃',more:'✨'};
function menuOpen(on){const m=$('#menu'),sh=$('#menuShade'),b=$('#menuBtn');if(!m)return;
 if(on){const h=document.querySelector('header.top');if(h&&h.getBoundingClientRect)m.style.top=(h.getBoundingClientRect().bottom+6)+'px'}
 m.hidden=!on;sh.hidden=!on;b.setAttribute('aria-expanded',on?'true':'false');b.classList.toggle('on',on);
 if(on){const f=m.querySelector('[aria-current]')||m.querySelector('button');if(f)f.focus()}}
window.phosMenuOpen=()=>!$('#menu').hidden;
window.phosMenuClose=()=>menuOpen(false);
function drawMenu(){
 const list=$('#menuList');if(!list)return;
 const tabs=[...document.querySelectorAll('#tabs [data-sec]')];
 list.innerHTML=tabs.map(x=>`<button role="menuitem" class="mitem" data-sec="${x.dataset.sec}" ${x.getAttribute('aria-current')?'aria-current="page"':''}><span class="mico" aria-hidden="true">${MENU_ICO[x.dataset.sec]||'•'}</span><span>${esc(x.textContent)}</span></button>`).join('');
 list.querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>{menuOpen(false);const tb=document.querySelector(`#tabs [data-sec="${b.dataset.sec}"]`);if(tb)tb.click()});
 const mb=$('#menuBtn');if(mb)mb.setAttribute('aria-label',MENU_T[LANG]||MENU_T.en);const ml=$('#menuLbl');if(ml)ml.textContent=MENU_T[LANG]||MENU_T.en;
}
const _drawTabsM=drawTabs;
drawTabs=function(){_drawTabsM();drawMenu()};
$('#menuBtn').onclick=e=>{e.stopPropagation();menuOpen($('#menu').hidden)};
$('#menuShade').onclick=()=>menuOpen(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#menu').hidden){menuOpen(false);$('#menuBtn').focus()}});
