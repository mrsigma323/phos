// Genera el contenido del correo semanal de Phos (lunes a domingo de la semana siguiente)
// Uso: node .github/boletin/gen.js [AAAA-MM-DD del lunes]  → escribe JSON en la salida
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','..');
global.window=global;global.localStorage={getItem(){return null},setItem(){}};
eval(fs.readFileSync(path.join(ROOT,'phos-web-core.js'),'utf8')+';global.X={dayInfo,celName,TDL,FTK,SNK,VOTD,BN,BLM}');
const santos=JSON.parse(fs.readFileSync(path.join(ROOT,'api/_lib/santos.json'),'utf8'));
const L=X.TDL.es;
const MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DIA=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
// Lunes de la semana siguiente (hora de Madrid), o el indicado
let mon;
if(process.argv[2]){const [y,m,d]=process.argv[2].split('-').map(Number);mon=Date.UTC(y,m-1,d)}
else{const n=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Madrid'}));const t=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate());const wd=new Date(t).getUTCDay();mon=t+((8-wd)%7||7)*864e5}
const DAY=864e5;
const fmt=t=>{const d=new Date(t);return d.getUTCDate()+' de '+MES[d.getUTCMonth()]};
// Versículo de la semana: el del lunes, como en la web
const doy=t=>{const d=new Date(t);return Math.round((t-Date.UTC(d.getUTCFullYear(),0,1))/DAY)+1};
const [b,c,v]=(()=>{const m=/^(\w+) (\d+):(\d+)/.exec(X.VOTD[doy(mon)%X.VOTD.length]);return [m[1],m[2],+m[3]]})();
const ent=X.BLM.b.find(x=>x[0]===b);
const chunk=JSON.parse(fs.readFileSync(path.join(ROOT,'data/biblia/es-blm/'+ent[2]+'.json'),'utf8'));
const vt=(chunk[b][c]||[]).find(x=>x[0]===v);
const out={semana:fmt(mon)+' al '+fmt(mon+6*DAY),lunes:new Date(mon).toISOString().slice(0,10),
 versiculo:{ref:X.BN[b]+' '+c+', '+v,texto:vt?vt[1]:''},dias:[]};
const clean=n=>{n=n.replace(/^En (la|el) /,'');return n.charAt(0).toUpperCase()+n.slice(1)};
for(let i=0;i<7;i++){
 const t=mon+i*DAY,d=new Date(t),key=(d.getUTCMonth()+1)+'-'+d.getUTCDate();
 const jul=new Date(t-13*DAY),keyJ=(jul.getUTCMonth()+1)+'-'+jul.getUTCDate();
 const dia={fecha:DIA[d.getUTCDay()]+' '+d.getUTCDate(),santos:{catolica:(santos.c[key]||[]).map(clean),ortodoxa:santos.o[key]||[],juliano:santos.o[keyJ]||[]},iglesias:{}};
 for(const br of ['ortodoxa','catolica','protestante']){
  const inf=X.dayInfo(br,t);
  dia.iglesias[br]={tiempo:L.sn[X.SNK.indexOf(inf.s)]||'',fiestas:inf.cel.map(k=>X.celName(k)).filter(Boolean),
   ayuno:['o_free','c_none','p_none'].includes(inf.f)?'':(L.ft[X.FTK.indexOf(inf.f)]||'')};
 }
 out.dias.push(dia);
}
process.stdout.write(JSON.stringify(out,null,1));
