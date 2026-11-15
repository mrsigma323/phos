// ---------- Registro interno de errores (invisible para el usuario) ----------
// Guarda en el móvil, sin enviarlo a ningún sitio, los fallos de la app: errores de código, promesas rotas,
// cargas que fallan, errores de Google Play y avisos internos. Máximo 300 entradas; las más antiguas se borran.
// Para verlo: Info (ⓘ) y tocar 7 veces el título «Fuentes». Desde ahí se puede copiar, enviar o vaciar.
(function(){
 const KEY='phos:errlog',MAX=300;
 const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
 let last='',lastT=0;
 window.phosLog=function(type,msg,extra){try{
  msg=String(msg||'').slice(0,400);const now=Date.now();
  if(msg===last&&now-lastT<2000)return;last=msg;lastT=now; // sin repetir el mismo error en ráfaga
  const L=load();let where='';try{where=(window.S&&S.sec?S.sec:'')+(window.S&&S.view?'/'+S.view:'')}catch(e){}
  L.push({t:new Date().toISOString(),type,msg,where,x:extra?String(extra).slice(0,600):undefined,lang:window.LANG||''});
  while(L.length>MAX)L.shift();localStorage.setItem(KEY,JSON.stringify(L));
 }catch(e){}};
 window.addEventListener('error',e=>{if(e.target&&e.target!==window){const s=e.target.src||e.target.currentSrc||e.target.href||'';if(s)phosLog('carga','No se pudo cargar: '+String(s).split('?')[0].replace(/^.*\/\/[^/]+/,''));return}
  phosLog('error',e.message,(e.filename?'línea '+e.lineno+':'+e.colno:'')+(e.error&&e.error.stack?' · '+e.error.stack.split('\n').slice(0,4).join(' | '):''))},true);
 window.addEventListener('unhandledrejection',e=>{const r=e.reason;phosLog('promesa',r&&r.message||String(r),r&&r.stack?r.stack.split('\n').slice(0,4).join(' | '):'')});
 const ce=console.error.bind(console);console.error=function(){try{phosLog('consola',[...arguments].map(a=>a&&a.message||String(a)).join(' '))}catch(e){}ce(...arguments)};
 // Peticiones que fallan (sin guardar parámetros, por privacidad)
 if(window.fetch){const f0=window.fetch.bind(window);window.fetch=function(u,o){const url=String(u&&u.url||u).split('?')[0].replace(/^.*\/\/[^/]+/,'');
  return f0(u,o).then(r=>{if(!r.ok&&r.status!==304)phosLog('red','HTTP '+r.status+' '+url);return r},err=>{phosLog('red','Sin conexión o bloqueado: '+url,err&&err.message);throw err})}}
 window.phosLogRead=load;window.phosLogClear=()=>localStorage.removeItem(KEY);
})();
