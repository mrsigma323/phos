// ---------- Contenido propio del nivel NORMAL ----------
// Tipos: ¿Quién lo dijo?, ordenar los hechos del libro, verdadero o falso, emparejar, completar versículo,
// versículo siguiente y de qué libro es (con opciones parecidas). Alguna pregunta trampa suave.
const NMT={es:{who:"¿Quién lo dijo?",ord:"Ordena estos hechos de «{b}» tal como ocurren",tf:"¿Verdadero o falso?",T:"Verdadero",F:"Falso",
 mB:"Empareja cada libro con su parte de la Biblia",mC:"Empareja cada personaje con lo que hizo",mHow:"Toca las respuestas en el mismo orden que la lista:",evHow:"Toca los hechos en el orden en que ocurren"},
 en:{who:"Who said it?",ord:"Put these events of «{b}» in order",tf:"True or false?",T:"True",F:"False",
 mB:"Match each book with its part of the Bible",mC:"Match each character with what they did",mHow:"Tap the answers in the same order as the list:",evHow:"Tap the events in the order they happen"}};
const nmt=(k,o)=>{let s=(NMT[CL()]||NMT.en)[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
// Por libro: q = [cita, quién, incorrecta×3, referencia]; o = [[hechos en orden], referencia]; v = [afirmación, verdadera?, explicación]
const NORMAL={
es:{
GEN:{q:["«¿Acaso soy yo el guardián de mi hermano?»","Caín","Abel","Adán","Set","Génesis 4, 9."],o:[["La creación del mundo","El diluvio","La torre de Babel","La llamada de Abraham"],"Génesis 1–12."],v:["Noé metió en el arca una sola pareja de cada animal puro.",false,"Falso: de los animales puros metió siete parejas (Génesis 7, 2)."]},
EXO:{q:["«Deja ir a mi pueblo»","Moisés, de parte de Dios","Aarón, por su cuenta","El faraón","Josué","Éxodo 5, 1."],o:[["La zarza ardiente","Las diez plagas","El paso del mar Rojo","Los diez mandamientos"],"Éxodo 3–20."],v:["El maná caía del cielo solo los sábados.",false,"Falso: caía seis días; el sexto, ración doble, y el sábado no caía (Éxodo 16)."]},
LEV:{v:["El Día de la Expiación (Yom Kipur) se describe en Levítico 16.",true,"Verdadero: Levítico 16."]},
NUM:{q:["«¿No he de decir lo que el Señor pone en mi boca?»","Balaán","Moisés","Aarón","Balac","Números 22, 38."],v:["Los exploradores volvieron de Canaán con un racimo tan grande que lo llevaban entre dos.",true,"Verdadero: Números 13, 23."]},
DEU:{q:["«Escucha, Israel: el Señor nuestro Dios es el único Señor»","Moisés","Josué","David","Elías","Deuteronomio 6, 4."],v:["Moisés entró en la tierra prometida al final de su vida.",false,"Falso: la vio desde el monte Nebo, pero no entró (Deuteronomio 34, 4)."]},
JOS:{q:["«Yo y mi casa serviremos al Señor»","Josué","Moisés","David","Caleb","Josué 24, 15."],o:[["El paso del Jordán","La caída de Jericó","El reparto de la tierra entre las tribus"],"Josué 3–21."],v:["Rajab escondió a los exploradores de Israel en Jericó.",true,"Verdadero: Josué 2."]},
JDG:{o:[["Débora y Barac vencen a Sísara","Gedeón vence con 300 hombres","Sansón derriba el templo de los filisteos"],"Jueces 4–16."],v:["Sansón perdió su fuerza cuando le cortaron el cabello.",true,"Verdadero: Jueces 16, 19."]},
RUT:{q:["«Adonde tú vayas, iré yo»","Rut","Noemí","Orfá","Booz","Rut 1, 16."],o:[["Mueren el marido y los hijos de Noemí","Rut acompaña a Noemí a Belén","Rut recoge espigas en el campo de Booz","Booz se casa con Rut"],"Rut 1–4."],v:["Rut era moabita.",true,"Verdadero: Rut 1, 4."]},
"1SA":{q:["«Habla, Señor, que tu siervo escucha»","Samuel","Elí","Saúl","David","1 Samuel 3, 10."],o:[["Ana pide un hijo en Siló","Samuel unge a Saúl","Samuel unge a David","David vence a Goliat"],"1 Samuel 1–17."],v:["Saúl fue el primer rey de Israel.",true,"Verdadero: 1 Samuel 10."]},
"2SA":{q:["«Tú eres ese hombre»","Natán","Samuel","Elías","Gad","2 Samuel 12, 7."],v:["El profeta Natán reprendió a David por lo que hizo con Betsabé y Urías.",true,"Verdadero: 2 Samuel 12."]},
"1KI":{q:["«Partid en dos al niño vivo»","Salomón","David","Elías","Roboán","1 Reyes 3, 25."],o:[["Salomón pide sabiduría","Se construye el Templo","Visita la reina de Sabá","El reino se divide"],"1 Reyes 3–12."],v:["Elías fue alimentado por cuervos junto a un torrente.",true,"Verdadero: 1 Reyes 17, 6."]},
"2KI":{o:[["Elías sube al cielo","Eliseo cura a Naamán","Jerusalén cae y el pueblo va desterrado a Babilonia"],"2 Reyes 2–25."],v:["Naamán se curó de la lepra bañándose siete veces en el Jordán.",true,"Verdadero: 2 Reyes 5, 14."]},
NEH:{v:["Nehemías reconstruyó las murallas de Jerusalén.",true,"Verdadero: Nehemías 6, 15."]},
EST:{q:["«¿Quién sabe si no has llegado al trono precisamente para un momento como este?»","Mardoqueo","Amán","Asuero","Ester","Ester 4, 14."],v:["Amán quería exterminar a los judíos.",true,"Verdadero: Ester 3."]},
JOB:{q:["«El Señor me lo dio, el Señor me lo quitó: bendito sea el nombre del Señor»","Job","Elifaz","La mujer de Job","Bildad","Job 1, 21."],v:["Los amigos de Job le consolaron diciéndole que era inocente.",false,"Falso: le insistían en que su sufrimiento era castigo por algún pecado."]},
PSA:{v:["El salmo «Ten piedad de mí, oh Dios» (51, o 50 en la numeración griega y latina) es un salmo de arrepentimiento.",true,"Verdadero: es el Miserere, atribuido a David tras su pecado."]},
PRO:{v:["Proverbios dice que el principio de la sabiduría es el temor del Señor.",true,"Verdadero: Proverbios 1, 7."]},
ECC:{q:["«Vanidad de vanidades, todo es vanidad»","Qohélet, el Predicador","Job","Jeremías","Pablo","Eclesiastés 1, 2."]},
WIS:{v:["El libro de la Sabiduría dice que las almas de los justos están en las manos de Dios.",true,"Verdadero: Sabiduría 3, 1."]},
SIR:{v:["El Eclesiástico lo tradujo al griego el nieto de su autor.",true,"Verdadero: lo cuenta el prólogo del libro."]},
TOB:{v:["Tobías curó la ceguera de su padre con la hiel de un pez.",true,"Verdadero: Tobías 11."]},
JDT:{v:["Judit venció a Holofernes, general del ejército asirio.",true,"Verdadero: Judit 13."]},
"1MA":{o:[["Antíoco profana el Templo","Matatías se rebela","Judas Macabeo purifica el Templo"],"1 Macabeos 1–4."]},
"2MA":{v:["2 Macabeos cuenta el martirio de una madre y sus siete hijos.",true,"Verdadero: 2 Macabeos 7."]},
ISA:{v:["Isaías 53 habla del Siervo que sufre por los pecados de otros.",true,"Verdadero: Isaías 52, 13 – 53, 12."]},
JER:{v:["A Jeremías lo echaron a una cisterna llena de barro.",true,"Verdadero: Jeremías 38, 6."]},
EZE:{v:["Ezequiel vio un valle de huesos secos que volvían a la vida.",true,"Verdadero: Ezequiel 37."]},
DAN:{q:["«Mené, Tequel, Parsín» apareció escrito en la pared en el banquete del rey…","Baltasar","Nabucodonosor","Darío","Ciro","Daniel 5."],o:[["Daniel no quiere comer los manjares del rey","Los tres jóvenes en el horno","La escritura en la pared","Daniel en el foso de los leones"],"Daniel 1–6."],v:["Daniel interpretó el sueño de la gran estatua de Nabucodonosor.",true,"Verdadero: Daniel 2."]},
JON:{o:[["Jonás huye en un barco","Un gran pez se lo traga","Jonás predica en Nínive","Jonás se enfada bajo la planta de ricino"],"Jonás 1–4."],v:["Los ninivitas se convirtieron con la predicación de Jonás.",true,"Verdadero: Jonás 3."]},
MAT:{q:["«Tú eres el Mesías, el Hijo de Dios vivo»","Pedro","Juan","Andrés","Tomás","Mateo 16, 16."],o:[["La visita de los Magos","El bautismo en el Jordán","El sermón de la montaña","La Transfiguración"],"Mateo 2–17."],v:["Mateo era recaudador de impuestos antes de seguir a Jesús.",true,"Verdadero: Mateo 9, 9."]},
MAR:{q:["«Talitá kum» («Niña, levántate»)","Jesús, a la hija de Jairo","Pedro, a Tabita","Pablo, a Eutico","Elías, a la viuda","Marcos 5, 41."],v:["El Evangelio de Marcos empieza con el nacimiento de Jesús en Belén.",false,"Falso: empieza con la predicación de Juan el Bautista."]},
LUK:{q:["«Hágase en mí según tu palabra»","María","Isabel","Ana","Marta","Lucas 1, 38."],o:[["La Anunciación","El nacimiento en Belén","El Niño perdido y hallado en el Templo","El bautismo de Jesús"],"Lucas 1–3."],v:["Zaqueo se subió a un sicómoro para ver a Jesús.",true,"Verdadero: Lucas 19, 4."]},
JOH:{q:["«Señor mío y Dios mío»","Tomás","Pedro","Juan","Felipe","Juan 20, 28."],o:[["Las bodas de Caná","La samaritana en el pozo","La resurrección de Lázaro","El lavatorio de los pies"],"Juan 2–13."],v:["Nicodemo fue a ver a Jesús de noche.",true,"Verdadero: Juan 3, 2."]},
ACT:{q:["«No tengo plata ni oro, pero lo que tengo te doy»","Pedro","Pablo","Juan","Esteban","Hechos 3, 6."],o:[["La Ascensión","Pentecostés","El martirio de Esteban","La conversión de Saulo"],"Hechos 1–9."],v:["Matías fue elegido para ocupar el lugar de Judas.",true,"Verdadero: Hechos 1, 26."]},
ROM:{v:["Romanos dice que todos pecaron y están privados de la gloria de Dios.",true,"Verdadero: Romanos 3, 23."]},
"1CO":{v:["Pablo compara la Iglesia con un cuerpo de muchos miembros.",true,"Verdadero: 1 Corintios 12."]},
"2CO":{v:["Pablo habla de una «espina clavada en la carne».",true,"Verdadero: 2 Corintios 12, 7."]},
GAL:{v:["En Gálatas, Pablo cuenta que se enfrentó a Pedro en Antioquía.",true,"Verdadero: Gálatas 2, 11."]},
EPH:{v:["Efesios dice que somos salvados por gracia, mediante la fe.",true,"Verdadero: Efesios 2, 8."]},
PHI:{q:["«Todo lo puedo en aquel que me fortalece»","Pablo","Pedro","Juan","Timoteo","Filipenses 4, 13."]},
"1TH":{v:["En 1 Tesalonicenses, Pablo anima a orar sin cesar.",true,"Verdadero: 1 Tesalonicenses 5, 17."]},
"2TI":{q:["«He combatido el buen combate, he terminado la carrera, he guardado la fe»","Pablo","Pedro","Timoteo","Esteban","2 Timoteo 4, 7."]},
HEB:{v:["Hebreos llama a Jesús sumo sacerdote.",true,"Verdadero: Hebreos 4, 14."]},
JAM:{v:["Santiago compara la lengua con una chispa que incendia un gran bosque.",true,"Verdadero: Santiago 3, 5."]},
"1PE":{v:["Pedro llama a los cristianos «piedras vivas».",true,"Verdadero: 1 Pedro 2, 5."]},
"1JO":{v:["La primera carta de Juan dice que quien no ama no conoce a Dios.",true,"Verdadero: 1 Juan 4, 8."]},
REV:{o:[["Las cartas a las siete iglesias","Los siete sellos","La nueva Jerusalén"],"Apocalipsis 2–21."],v:["El Apocalipsis menciona siete iglesias de Asia.",true,"Verdadero: Apocalipsis 1, 11."]}},
en:{
GEN:{q:["«Am I my brother's keeper?»","Cain","Abel","Adam","Seth","Genesis 4:9."],o:[["The creation of the world","The flood","The tower of Babel","The call of Abraham"],"Genesis 1–12."],v:["Noah took only one pair of every clean animal into the ark.",false,"False: of the clean animals he took seven pairs (Genesis 7:2)."]},
EXO:{q:["«Let my people go»","Moses, on God's behalf","Aaron, on his own","Pharaoh","Joshua","Exodus 5:1."],o:[["The burning bush","The ten plagues","The crossing of the Red Sea","The Ten Commandments"],"Exodus 3–20."],v:["Manna fell from heaven only on the Sabbath.",false,"False: it fell six days; double on the sixth, none on the Sabbath (Exodus 16)."]},
LEV:{v:["The Day of Atonement (Yom Kippur) is described in Leviticus 16.",true,"True: Leviticus 16."]},
NUM:{q:["«Must I not speak what the Lord puts in my mouth?»","Balaam","Moses","Aaron","Balak","Numbers 22:38."],v:["The spies came back from Canaan with a cluster of grapes so big it was carried by two men.",true,"True: Numbers 13:23."]},
DEU:{q:["«Hear, O Israel: the Lord our God, the Lord is one»","Moses","Joshua","David","Elijah","Deuteronomy 6:4."],v:["Moses entered the promised land at the end of his life.",false,"False: he saw it from Mount Nebo but did not enter (Deuteronomy 34:4)."]},
JOS:{q:["«As for me and my house, we will serve the Lord»","Joshua","Moses","David","Caleb","Joshua 24:15."],o:[["Crossing the Jordan","The fall of Jericho","Dividing the land among the tribes"],"Joshua 3–21."],v:["Rahab hid Israel's spies in Jericho.",true,"True: Joshua 2."]},
JDG:{o:[["Deborah and Barak defeat Sisera","Gideon wins with 300 men","Samson pulls down the Philistine temple"],"Judges 4–16."],v:["Samson lost his strength when his hair was cut.",true,"True: Judges 16:19."]},
RUT:{q:["«Where you go I will go»","Ruth","Naomi","Orpah","Boaz","Ruth 1:16."],o:[["Naomi's husband and sons die","Ruth goes with Naomi to Bethlehem","Ruth gleans in Boaz's field","Boaz marries Ruth"],"Ruth 1–4."],v:["Ruth was a Moabite.",true,"True: Ruth 1:4."]},
"1SA":{q:["«Speak, Lord, for your servant is listening»","Samuel","Eli","Saul","David","1 Samuel 3:10."],o:[["Hannah prays for a son at Shiloh","Samuel anoints Saul","Samuel anoints David","David defeats Goliath"],"1 Samuel 1–17."],v:["Saul was the first king of Israel.",true,"True: 1 Samuel 10."]},
"2SA":{q:["«You are the man!»","Nathan","Samuel","Elijah","Gad","2 Samuel 12:7."],v:["The prophet Nathan rebuked David for what he did to Bathsheba and Uriah.",true,"True: 2 Samuel 12."]},
"1KI":{q:["«Divide the living child in two»","Solomon","David","Elijah","Rehoboam","1 Kings 3:25."],o:[["Solomon asks for wisdom","The Temple is built","The queen of Sheba visits","The kingdom divides"],"1 Kings 3–12."],v:["Elijah was fed by ravens beside a brook.",true,"True: 1 Kings 17:6."]},
"2KI":{o:[["Elijah goes up to heaven","Elisha heals Naaman","Jerusalem falls and the people go into exile in Babylon"],"2 Kings 2–25."],v:["Naaman was healed of leprosy by washing seven times in the Jordan.",true,"True: 2 Kings 5:14."]},
NEH:{v:["Nehemiah rebuilt the walls of Jerusalem.",true,"True: Nehemiah 6:15."]},
EST:{q:["«Who knows whether you have not come to the kingdom for such a time as this?»","Mordecai","Haman","Ahasuerus","Esther","Esther 4:14."],v:["Haman wanted to destroy the Jews.",true,"True: Esther 3."]},
JOB:{q:["«The Lord gave, and the Lord has taken away; blessed be the name of the Lord»","Job","Eliphaz","Job's wife","Bildad","Job 1:21."],v:["Job's friends comforted him by saying he was innocent.",false,"False: they kept saying his suffering was punishment for some sin."]},
PSA:{v:["The psalm «Have mercy on me, O God» (51, or 50 in Greek and Latin numbering) is a psalm of repentance.",true,"True: it is the Miserere, attributed to David after his sin."]},
PRO:{v:["Proverbs says the beginning of wisdom is the fear of the Lord.",true,"True: Proverbs 1:7."]},
ECC:{q:["«Vanity of vanities, all is vanity»","Qoheleth, the Preacher","Job","Jeremiah","Paul","Ecclesiastes 1:2."]},
WIS:{v:["The book of Wisdom says the souls of the righteous are in the hand of God.",true,"True: Wisdom 3:1."]},
SIR:{v:["Sirach was translated into Greek by the author's grandson.",true,"True: the book's prologue says so."]},
TOB:{v:["Tobias healed his father's blindness with the gall of a fish.",true,"True: Tobit 11."]},
JDT:{v:["Judith defeated Holofernes, general of the Assyrian army.",true,"True: Judith 13."]},
"1MA":{o:[["Antiochus profanes the Temple","Mattathias rebels","Judas Maccabeus purifies the Temple"],"1 Maccabees 1–4."]},
"2MA":{v:["2 Maccabees tells of the martyrdom of a mother and her seven sons.",true,"True: 2 Maccabees 7."]},
ISA:{v:["Isaiah 53 speaks of the Servant who suffers for the sins of others.",true,"True: Isaiah 52:13 – 53:12."]},
JER:{v:["Jeremiah was thrown into a muddy cistern.",true,"True: Jeremiah 38:6."]},
EZE:{v:["Ezekiel saw a valley of dry bones coming back to life.",true,"True: Ezekiel 37."]},
DAN:{q:["«Mene, Mene, Tekel, Parsin» appeared on the wall at the feast of king…","Belshazzar","Nebuchadnezzar","Darius","Cyrus","Daniel 5."],o:[["Daniel refuses the king's food","The three young men in the furnace","The writing on the wall","Daniel in the lions' den"],"Daniel 1–6."],v:["Daniel interpreted Nebuchadnezzar's dream of the great statue.",true,"True: Daniel 2."]},
JON:{o:[["Jonah flees on a ship","A great fish swallows him","Jonah preaches in Nineveh","Jonah sulks under the plant"],"Jonah 1–4."],v:["The people of Nineveh repented at Jonah's preaching.",true,"True: Jonah 3."]},
MAT:{q:["«You are the Christ, the Son of the living God»","Peter","John","Andrew","Thomas","Matthew 16:16."],o:[["The visit of the Magi","The baptism in the Jordan","The Sermon on the Mount","The Transfiguration"],"Matthew 2–17."],v:["Matthew was a tax collector before following Jesus.",true,"True: Matthew 9:9."]},
MAR:{q:["«Talitha koum» («Little girl, arise»)","Jesus, to Jairus' daughter","Peter, to Tabitha","Paul, to Eutychus","Elijah, to the widow","Mark 5:41."],v:["Mark's Gospel begins with Jesus' birth in Bethlehem.",false,"False: it begins with the preaching of John the Baptist."]},
LUK:{q:["«Let it be to me according to your word»","Mary","Elizabeth","Anna","Martha","Luke 1:38."],o:[["The Annunciation","The birth in Bethlehem","The boy Jesus found in the Temple","The baptism of Jesus"],"Luke 1–3."],v:["Zacchaeus climbed a sycamore tree to see Jesus.",true,"True: Luke 19:4."]},
JOH:{q:["«My Lord and my God!»","Thomas","Peter","John","Philip","John 20:28."],o:[["The wedding at Cana","The Samaritan woman at the well","The raising of Lazarus","The washing of the feet"],"John 2–13."],v:["Nicodemus came to Jesus by night.",true,"True: John 3:2."]},
ACT:{q:["«I have no silver and gold, but what I have I give you»","Peter","Paul","John","Stephen","Acts 3:6."],o:[["The Ascension","Pentecost","The martyrdom of Stephen","The conversion of Saul"],"Acts 1–9."],v:["Matthias was chosen to take Judas' place.",true,"True: Acts 1:26."]},
ROM:{v:["Romans says all have sinned and fall short of the glory of God.",true,"True: Romans 3:23."]},
"1CO":{v:["Paul compares the Church to a body with many members.",true,"True: 1 Corinthians 12."]},
"2CO":{v:["Paul speaks of a «thorn in the flesh».",true,"True: 2 Corinthians 12:7."]},
GAL:{v:["In Galatians, Paul says he opposed Peter at Antioch.",true,"True: Galatians 2:11."]},
EPH:{v:["Ephesians says we are saved by grace through faith.",true,"True: Ephesians 2:8."]},
PHI:{q:["«I can do all things through him who strengthens me»","Paul","Peter","John","Timothy","Philippians 4:13."]},
"1TH":{v:["In 1 Thessalonians, Paul urges us to pray without ceasing.",true,"True: 1 Thessalonians 5:17."]},
"2TI":{q:["«I have fought the good fight, I have finished the race, I have kept the faith»","Paul","Peter","Timothy","Stephen","2 Timothy 4:7."]},
HEB:{v:["Hebrews calls Jesus our high priest.",true,"True: Hebrews 4:14."]},
JAM:{v:["James compares the tongue to a small fire that sets a great forest ablaze.",true,"True: James 3:5."]},
"1PE":{v:["Peter calls Christians «living stones».",true,"True: 1 Peter 2:5."]},
"1JO":{v:["The first letter of John says whoever does not love does not know God.",true,"True: 1 John 4:8."]},
REV:{o:[["The letters to the seven churches","The seven seals","The new Jerusalem"],"Revelation 2–21."],v:["Revelation mentions seven churches in Asia.",true,"True: Revelation 1:11."]}}};
// Preguntas trampa suaves del nivel Normal
const NTRAPS={es:[["¿Cuál es el versículo más corto de los Evangelios en la mayoría de Biblias?","«Jesús lloró»",["«Orad sin cesar»","«Estad siempre alegres»","«Yo soy»"],"Juan 11, 35. «Orad sin cesar» es de 1 Tesalonicenses, no de un Evangelio."],["¿Cuántos libros tiene el Nuevo Testamento?","27",["26","66","73"],"Son 27 en todas las Iglesias; lo que cambia de una a otra es el Antiguo Testamento."],["¿Quién fue el primer mártir cristiano?","Esteban",["Pedro","Santiago","Pablo"],"Hechos 7."]],
 en:[["Which is the shortest verse of the Gospels in most Bibles?","«Jesus wept»",["«Pray without ceasing»","«Rejoice always»","«I am»"],"John 11:35. «Pray without ceasing» is from 1 Thessalonians, not a Gospel."],["How many books are in the New Testament?","27",["26","66","73"],"27 in every Church; only the Old Testament differs."],["Who was the first Christian martyr?","Stephen",["Peter","James","Paul"],"Acts 7."]]};

const MATCH=new Map();// prompt → lista de la izquierda (para pintarla también al repetir)
function normalHand(br,c){
 const L=CL(),N=((NORMAL[L]||{})[c])||{},out=[];
 if(N.q)out.push(mcq(nmt('who'),N.q[1],N.q.slice(2,5),N.q[0],N.q[5]));
 if(N.o){const p=nmt('ord',{b:bname(c)});out.push({type:'order',prompt:p,items:N.o[0].slice(),answer:N.o[0].slice(),lvl:'normal'})}
 if(N.v)out.push(mcq(nmt('tf'),N.v[1]?nmt('T'):nmt('F'),[N.v[1]?nmt('F'):nmt('T')],N.v[0],N.v[2]));
 return out.map(q=>{q.wk=c;q.wbr=br;q.lvl='normal';return q});
}
function matchItem(br,c){
 const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
 if(Math.random()<.5&&typeof BIBFIG!=='undefined'&&figOK())return matchChars(br,c);

 return matchBooks(br,c,books)}
function matchChars(br,c){
  const L=CL(),ids=shuffle(BIBFIG.map((f,i)=>i).filter(i=>!/ y | and /.test(BIBFIG[i][0]))).slice(0,3);
  const nm=i=>figL(i)[0],ds=i=>figL(i)[1];
  const p=nmt('mC')+' ('+ids.map(nm).join(', ')+')';MATCH.set(p,ids.map(nm));
  return {type:'order',prompt:p,items:ids.map(ds),answer:ids.map(ds),wk:c,wbr:br}}
function matchBooks(br,c,books){
 if(GOF[c]==='apoc')return figOK()?matchChars(br,c):null;
 const pick=[c];for(const x of shuffle(books.filter(b=>GOF[b]!=='apoc')))if(pick.length<3&&!pick.some(y=>GOF[y]===GOF[x]))pick.push(x);if(pick.length<3)return null;
 const p=nmt('mB')+' ('+pick.map(bname).join(', ')+')';MATCH.set(p,pick.map(bname));
 return {type:'order',prompt:p,items:pick.map(x=>ct('g_'+GOF[x])),answer:pick.map(x=>ct('g_'+GOF[x])),wk:c,wbr:br};
}
function normalLesson(br,c,n){
 const hand=shuffle(normalHand(br,c)),gen=[];for(const g of shuffle(qGen(br,c)))try{const q=g();if(q)gen.push(q)}catch(e){}
 const m=matchItem(br,c);
 const picked=pickFresh(br,'n:'+c,hand.concat(gen),n+4);
 const out=[];const sig=new Set();const add=q=>{const s=qSig(q);if(!sig.has(s)&&out.length<n){sig.add(s);out.push(q)}};
 hand.slice(0,3).forEach(add);if(m)add(m);picked.forEach(add);
 return shuffle(out);
}
const _buildLessonN2=buildLesson;
buildLesson=function(br,id){
 if(lv()!=='normal'||id.startsWith('intro'))return _buildLessonN2.apply(this,arguments);
 const B=typeof BASIC!=='undefined'?BASIC.books:null;if(B)BASIC.books={};
 try{
  const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
  if(id.startsWith('rev:')){const u=courseUnits(br)[+id.slice(4)];return pickFresh(br,'n:'+id,u.books.flatMap(c=>normalHand(br,c).concat(genPool(br,c,1))),8)}
  if(id.startsWith('ex:')){const u=courseUnits(br)[+id.slice(3)];return pickFresh(br,'n:'+id,u.books.flatMap(c=>normalHand(br,c).concat(genPool(br,c,2))),10)}
  if(id==='exam')return _buildLessonN2.apply(this,arguments);
  return [{type:'card',book:id}].concat(normalLesson(br,id,7));
 }finally{if(B)BASIC.books=B}
};
// Emparejar: muestra la lista de la izquierda numerada encima de las respuestas
const _drawLessonM=drawLesson;
drawLesson=function(){_drawLessonM.apply(this,arguments);const it=LS&&LS.items[LS.i];if(!it||it.type!=='order')return;
 const q=view.querySelector('.qp');if(!q)return;const nt=q.nextElementSibling;
 if(!MATCH.has(it.prompt)){if((it.lvl==='normal'||it.lvl==='hard')&&nt&&nt.classList.contains('note'))nt.textContent=nmt('evHow');return}
 if(nt&&nt.classList.contains('note'))nt.remove();if(view.querySelector('.mlist'))return;
 q.textContent=it.prompt.replace(/\s*\(.*\)$/,'');
 q.insertAdjacentHTML('afterend',`<p class="note">${esc(nmt('mHow'))}</p><ol class="mlist">${MATCH.get(it.prompt).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`)};
// Trampas suaves en Normal: 1 o 2 por curso
const _maybeTrapN=maybeTrap;
maybeTrap=function(){
 if(lv()==='easy')return _maybeTrapN();
 if(lv()!=='normal'||!/^(ortodoxa|catolica|protestante)$/.test(LS.br)||/^(exam|ex:|rev:|intro)/.test(LS.id))return;
 const all=courseUnits(LS.br).flatMap(u=>u.lessons).filter(x=>!/^(intro|rev:|ex:|exam)/.test(x)),pos=all.indexOf(LS.id);if(pos!==3&&pos!==9)return;
 const T=store.get('traps',{}),key='n:'+LS.br+':'+pos;if(T[key])return;
 const tr=(NTRAPS[LANG]||NTRAPS.en)[(LS.br.length+pos)%3];
 LS.items.splice(Math.min(LS.items.length,3),0,{type:'mcq',prompt:lt('trap')+' · '+trB(tr[0]),options:shuffle([trB(tr[1])].concat(tr[2].map(trB))),answer:trB(tr[1]),why:trB(tr[3]),trap:key});
};
(function(){const st=document.createElement('style');st.textContent=`.mlist{margin:4px 0 10px;padding-left:24px;font-weight:700;color:var(--wine);font-size:17px}.mlist li{padding:3px 0}`;document.head.appendChild(st)})();
