// ---------- Visor oculto del registro interno ----------
// Info (ⓘ) → tocar 7 veces el título «Fuentes». Muestra los últimos fallos con copiar, enviar y vaciar.
(function(){let n=0,t0=0;
 const open=()=>{const L=phosLogRead().slice().reverse();const ver=(window.PhosApp&&PhosApp.appVersion?PhosApp.appVersion():'web');
  const txt=`Phos ${ver} · ${navigator.userAgent}\n`+L.map(e=>`${e.t} [${e.type}] ${e.where||''} ${e.lang||''}\n  ${e.msg}${e.x?'\n  '+e.x:''}`).join('\n');
  $('#infoTitle').textContent='🛠 Registro interno ('+L.length+')';
  $('#infoBody').innerHTML=`<p class="note">Solo se guarda en este móvil. Versión: ${esc(ver)}</p><pre class="ficha" style="max-height:50vh;overflow:auto;font-size:12px;white-space:pre-wrap">${esc(txt||'—')}</pre>
   <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="elShare" style="flex:1">Enviar</button><button class="btn ghost" id="elClear" style="flex:1">Vaciar</button></div>`;
  $('#elShare').onclick=()=>shareText(txt);$('#elClear').onclick=()=>{phosLogClear();open()}};
 document.addEventListener('click',e=>{if(!(e.target&&e.target.id==='infoTitle'))return;const now=Date.now();if(now-t0>1500)n=0;t0=now;if(++n>=7){n=0;open()}});
 // Errores de Google Play
 if(window.PhosPay&&PhosPay.onError){const o=PhosPay.onError;PhosPay.onError=function(code,msg){if(code!==1)phosLog('google-play','Código '+code+(msg?' · '+msg:''));return o.apply(this,arguments)}}
})();
