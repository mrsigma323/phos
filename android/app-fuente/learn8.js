// ---------- Pronunciación de letras: nombre una vez + sonido ----------
// Cada entrada: [nombre leído por la voz, sílaba de ejemplo que suena como la letra]
const SPK={
el:[["άλφα","αν"],["βήτα","βα"],["γάμμα","γα"],["δέλτα","δα"],["έψιλον","εν"],["ζήτα","ζα"],["ήτα","ην"],["θήτα","θα"],["γιώτα","ιν"],["κάππα","κα"],["λάμδα","λα"],["μι","μα"],["νι","να"],["ξι","ξα"],["όμικρον","ον"],["πι","πα"],["ρο","ρα"],["σίγμα","σα"],["ταυ","τα"],["ύψιλον","υν"],["φι","φα"],["χι","χα"],["ψι","ψα"],["ωμέγα","ων"]],
he:[["אָלֶף","אַ"],["בֵּית","בַּ"],["גִּימֶל","גַּ"],["דָּלֶת","דַּ"],["הֵא","הַ"],["וָו","וַ"],["זַיִן","זַ"],["חֵית","חַ"],["טֵית","טַ"],["יוֹד","יַ"],["כַּף","כַּ"],["לָמֶד","לַ"],["מֵם","מַ"],["נוּן","נַ"],["סָמֶךְ","סַ"],["עַיִן","עַ"],["פֵּא","פַּ"],["צָדִי","צַ"],["קוֹף","קַ"],["רֵישׁ","רַ"],["שִׁין","שַׁ"],["תָּו","תַּ"]],
cu:[["аз","а"],["буки","ба"],["веди","ва"],["глаголь","га"],["добро","да"],["есть","е"],["живете","жа"],["зело","дза"],["земля","за"],["иже","и"],["и десятеричное","и"],["како","ка"],["люди","ла"],["мыслете","ма"],["наш","на"],["он","о"],["покой","па"],["рцы","ра"],["слово","са"],["твердо","та"],["ук","у"],["ферт","фа"],["хер","ха"],["омега","о"],["цы","ца"],["червь","ча"],["ша","ша"],["шта","ща"],["ер",""],["еры","ы"],["ерь",""],["ять","е"],["ю","ю"],["юс","я"],["кси","кса"],["пси","пса"],["фита","фа"],["ижица","и"]]
};
// La voz rusa no conoce las letras antiguas: se leen con su equivalente moderno
const CU_MOD={'ѣ':'е','Ѣ':'Е','і':'и','І':'И','ѳ':'ф','Ѳ':'Ф','ѵ':'и','Ѵ':'И','ѡ':'о','Ѡ':'О','ѕ':'з','Ѕ':'З','ѯ':'кс','Ѯ':'Кс','ѱ':'пс','Ѱ':'Пс','ѧ':'я','Ѧ':'Я','ꙋ':'у','Ꙋ':'У','ѹ':'у','ꙗ':'я','ѫ':'у','Ѫ':'У','ѿ':'от','҃':'','̀':'','́':'','̑':''};
function cuSpeak(s){return String(s).replace(/[̀-ͯ҃-҉]/g,'').replace(/./g,c=>CU_MOD[c]!==undefined?CU_MOD[c]:c)}
// say() admite varias partes separadas por "|" que suenan seguidas con una pausa
say=function(text,lang){
 let parts=String(text).split('|').filter(Boolean);
 if(lang&&lang.startsWith('ru'))parts=parts.map(cuSpeak);
 if(window.PhosApp){try{PhosApp.speak(parts.join('|'),String(lang||''))}catch(e){}return}
 try{speechSynthesis.cancel();parts.forEach((p,i)=>{if(i){const g=new SpeechSynthesisUtterance(' ');g.volume=0;g.lang=lang;speechSynthesis.speak(g)}
  const u=new SpeechSynthesisUtterance(p);u.lang=lang;u.rate=i?.6:.8;speechSynthesis.speak(u)})}catch(e){}
};
// Tarjeta de letra: el botón dice el nombre y luego el sonido
lcardHTML=(function(orig){return function(lc,big,sub,mean,sayTxt){let h=orig(lc,big,sub,mean);
 if(sayTxt){h=h.replace(/data-say="[^"]*"/,'data-say="'+esc(sayTxt)+'"')}return h}})(lcardHTML);
const letterSay=(lc,i)=>{const s=SPK[lc]&&SPK[lc][i];if(!s)return '';return s[1]?s[0]+'|'+s[1]:s[0]};
const _buildLangLesson8=buildLangLesson;
buildLangLesson=async function(lc,id){const r=await _buildLangLesson8(lc,id);
 if(String(id).startsWith('alpha:')&&LANGC[lc].letters){const n=+String(id).split(':')[1];
  const list=Array.isArray(r)?r:(r&&r.items)||[];let k=0;
  list.forEach(it=>{if(it.type==='lcard'){const i=n*6+k;k++;const s=letterSay(lc,i);if(s)it.html=it.html.replace(/data-say="[^"]*"/,'data-say="'+esc(s)+'"')}})}
 return r};
