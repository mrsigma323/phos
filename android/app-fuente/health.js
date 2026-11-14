// ---------- Aviso de salud: sale cada vez que se abre la sección Salud ----------
const HNOTE={
es:["Un recordatorio con cariño","Lo que encuentras aquí quiere inspirarte y acompañarte, pero no sustituye el consejo de tu médico ni de tu nutricionista. Tanto si estás sano como si tienes alguna afección de salud o de alimentación, consulta siempre con un profesional antes de cambiar tu dieta, tu ejercicio o tu tratamiento.","Entendido","Cerrar aviso"],
en:["A gentle reminder","What you find here is meant to inspire and accompany you, but it does not replace the advice of your doctor or dietitian. Whether you are healthy or living with a health or nutritional condition, always speak with a professional before changing your diet, exercise or treatment.","Got it","Close notice"],
pt:["Um lembrete com carinho","O que encontra aqui pretende inspirá-lo e acompanhá-lo, mas não substitui o conselho do seu médico nem do seu nutricionista. Quer esteja saudável, quer tenha alguma condição de saúde ou alimentar, consulte sempre um profissional antes de mudar a sua alimentação, o seu exercício ou o seu tratamento.","Entendido","Fechar aviso"],
fr:["Un rappel en toute bienveillance","Ce que vous trouvez ici veut vous inspirer et vous accompagner, mais ne remplace pas les conseils de votre médecin ou de votre diététicien. Que vous soyez en bonne santé ou que vous viviez avec un problème de santé ou de nutrition, consultez toujours un professionnel avant de modifier votre alimentation, votre activité physique ou votre traitement.","J’ai compris","Fermer l’avis"],
it:["Un promemoria affettuoso","Ciò che trovi qui vuole ispirarti e accompagnarti, ma non sostituisce il consiglio del tuo medico o del tuo nutrizionista. Che tu sia in salute o che tu abbia un problema di salute o di alimentazione, consulta sempre un professionista prima di cambiare la tua dieta, l’attività fisica o la tua terapia.","Ho capito","Chiudi avviso"],
de:["Ein herzlicher Hinweis","Was du hier findest, soll dich inspirieren und begleiten, ersetzt aber nicht den Rat deiner Ärztin oder deines Arztes oder deiner Ernährungsberatung. Ob du gesund bist oder eine gesundheitliche oder ernährungsbedingte Erkrankung hast: Sprich immer mit Fachleuten, bevor du deine Ernährung, deine Bewegung oder deine Behandlung änderst.","Verstanden","Hinweis schließen"],
el:["Μια φιλική υπενθύμιση","Όσα βρίσκετε εδώ θέλουν να σας εμπνεύσουν και να σας συντροφεύσουν, αλλά δεν αντικαθιστούν τη συμβουλή του γιατρού ή του διατροφολόγου σας. Είτε είστε υγιής είτε έχετε κάποιο πρόβλημα υγείας ή διατροφής, συμβουλευτείτε πάντα έναν επαγγελματία πριν αλλάξετε τη διατροφή, την άσκηση ή τη θεραπεία σας.","Κατάλαβα","Κλείσιμο ειδοποίησης"],
ru:["Бережное напоминание","Материалы этого раздела призваны вдохновлять и поддерживать вас, но не заменяют совета вашего врача или диетолога. Здоровы ли вы или у вас есть проблемы со здоровьем или питанием, всегда советуйтесь со специалистом, прежде чем менять питание, физическую нагрузку или лечение.","Понятно","Закрыть уведомление"],
ro:["O amintire cu drag","Ceea ce găsești aici vrea să te inspire și să te însoțească, dar nu înlocuiește sfatul medicului sau al nutriționistului tău. Fie că ești sănătos, fie că ai o afecțiune de sănătate sau de nutriție, consultă întotdeauna un specialist înainte de a-ți schimba alimentația, mișcarea sau tratamentul.","Am înțeles","Închide mesajul"]
};
function phosHNote(){
 if(document.getElementById('hnote'))return;
 const h=HNOTE[LANG]||HNOTE.en;
 const d=document.createElement('aside');d.id='hnote';d.className='hnote';d.setAttribute('role','note');
 d.innerHTML=`<button class="hnx" aria-label="${esc(h[3])}">✕</button><p class="hnt"><span aria-hidden="true">🤍</span> ${esc(h[0])}</p><p class="hnb">${esc(h[1])}</p><button class="hnok">${esc(h[2])}</button>`;
 const close=()=>{d.classList.add('out');setTimeout(()=>d.remove(),250)};
 d.querySelector('.hnx').onclick=close;d.querySelector('.hnok').onclick=close;
 view.prepend(d);
}
window.phosHNote=phosHNote;
const _renderArticlesH=renderArticles;
renderArticles=async function(sec){
 const r=await _renderArticlesH(sec);
 if(sec==='health')phosHNote();
 return r};
