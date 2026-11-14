// ---------- Contenido propio de cada dificultad: nivel FÁCIL ----------
// Fácil = lo esencial de cada libro: preguntas sencillas, distractores claros y una explicación al final.
// Normal y Difícil siguen con el banco actual (detalles, capítulos, versículos) hasta que se escriba su contenido propio.
const EZT={es:{test:"¿En qué parte de la Biblia está «{b}»?",ot:"Antiguo Testamento",nt:"Nuevo Testamento",
 famous:"Este versículo es muy conocido. ¿De qué libro es?",who:"¿Qué personaje aparece en «{b}»?",sum:"Lee el resumen: ¿de qué libro se trata?",
 whyBook:"«{b}»: {s}",whyTest:"«{b}» forma parte del {t}.",langsT:"En desarrollo",langsL:"Las lenguas bíblicas (griego, hebreo y latín) llegarán próximamente, con un curso pensado para empezar desde cero.",soon:"Próximamente"},
 en:{test:"In which part of the Bible is «{b}»?",ot:"Old Testament",nt:"New Testament",
 famous:"This verse is very well known. Which book is it from?",who:"Which character appears in «{b}»?",sum:"Read the summary: which book is it?",
 whyBook:"«{b}»: {s}",whyTest:"«{b}» is part of the {t}.",langsT:"In development",langsL:"The biblical languages (Greek, Hebrew and Latin) are coming soon, with a course designed to start from scratch.",soon:"Coming soon"}};
const ezt=(k,o)=>{let s=(EZT[CL()]||EZT.en)[k]||k;if(o)for(const x in o)s=s.replace('{'+x+'}',o[x]);return s};
const NT_G=new Set(['gospels','letters','apoc']);
const isNT=c=>NT_G.has(GOF[c]);

// Preguntas escritas a mano: [pregunta, correcta, incorrecta×3, explicación]
const EASY={
es:{
GEN:[["¿Qué hizo Dios el séptimo día de la creación?","Descansó","Creó al hombre","Separó las aguas","Hizo el sol","Génesis 2, 2: Dios descansó el séptimo día."],["¿Quién construyó el arca para salvarse del diluvio?","Noé","Abraham","Moisés","Jacob","Génesis 6–7."],["¿A quién llamó Dios a salir de su tierra hacia una tierra nueva?","Abraham","Isaac","José","Lot","Génesis 12, 1."]],
EXO:[["¿Quién sacó al pueblo de Israel de Egipto?","Moisés","Abraham","David","Josué","Éxodo 3–14."],["¿Desde dónde habló Dios a Moisés por primera vez?","Desde una zarza ardiente","Desde una nube","Desde un pozo","Desde el Templo","Éxodo 3, 2."],["¿Qué recibió Moisés en el monte Sinaí?","Los diez mandamientos","Una corona","El arca de Noé","Doce panes","Éxodo 20."]],
LEV:[["¿De qué trata sobre todo el Levítico?","De leyes sobre el culto y la santidad","De batallas","De la vida de Jesús","De viajes por el mar","Levítico reúne normas para el culto y para vivir santamente."],["«Amarás a tu prójimo como a ti mismo» aparece por primera vez en…","Levítico","Apocalipsis","Rut","Ester","Levítico 19, 18; Jesús lo recuerda en los Evangelios."]],
NUM:[["¿Por qué este libro se llama «Números»?","Porque empieza con un censo del pueblo","Porque habla de matemáticas","Porque cuenta las estrellas","Porque tiene muchos capítulos","Números 1: Moisés cuenta al pueblo."],["¿Cuántos años anduvo Israel por el desierto?","Cuarenta","Siete","Doce","Cien","Números 14, 33."]],
DEU:[["¿Dónde murió Moisés, según el final del Deuteronomio?","En el monte Nebo, mirando la tierra prometida","En Egipto","En Jerusalén","En el Sinaí","Deuteronomio 34."],["¿Con qué palabra empieza la gran oración «… Israel: el Señor es uno»?","Escucha","Canta","Mira","Levántate","Deuteronomio 6, 4: «Escucha, Israel»."]],
JOS:[["¿Qué ciudad cayó cuando sonaron las trompetas?","Jericó","Babilonia","Nínive","Roma","Josué 6."],["¿Quién guió al pueblo después de Moisés?","Josué","Aarón","Saúl","Elías","Josué 1."]],
JDG:[["¿Quién tenía una fuerza enorme ligada a su cabello?","Sansón","Gedeón","David","Goliat","Jueces 16."],["¿Qué mujer fue jueza y profetisa en Israel?","Débora","Rut","Ester","Sara","Jueces 4."]],
RUT:[["¿Qué le dijo Rut a su suegra Noemí?","«Tu pueblo será mi pueblo, y tu Dios mi Dios»","«Vuelvo a mi tierra»","«Quiero ser reina»","«No te conozco»","Rut 1, 16."],["¿De qué famoso rey fue bisabuela Rut?","David","Salomón","Saúl","Herodes","Rut 4, 17."]],
"1SA":[["¿Qué niño oyó a Dios llamarle de noche en el santuario?","Samuel","David","José","Isaac","1 Samuel 3."],["¿Con qué venció David a Goliat?","Con una honda y una piedra","Con una espada","Con un arco","Con una lanza","1 Samuel 17."]],
"2SA":[["¿Qué ciudad hizo David su capital?","Jerusalén","Belén","Nazaret","Jericó","2 Samuel 5."]],
"1KI":[["¿Qué le pidió Salomón a Dios?","Sabiduría","Riquezas","Una vida larga","Ganar batallas","1 Reyes 3."],["¿Qué construyó Salomón en Jerusalén?","El Templo","El arca","La torre de Babel","Las murallas de Jericó","1 Reyes 6."],["¿Qué profeta venció a los profetas de Baal en el monte Carmelo?","Elías","Eliseo","Jonás","Isaías","1 Reyes 18."]],
"2KI":[["¿Cómo subió Elías al cielo?","En un carro de fuego","En una nube","Por una escalera","En una barca","2 Reyes 2, 11."],["¿Qué profeta recibió el manto de Elías?","Eliseo","Jeremías","Samuel","Natán","2 Reyes 2."]],
EST:[["¿Qué reina salvó a su pueblo arriesgando su vida?","Ester","Rut","Jezabel","Sara","Ester 4–8."]],
JOB:[["¿Qué cuenta el libro de Job?","La historia de un justo que sufre y mantiene su fe","La conquista de Jericó","La vida del rey David","El viaje de Pablo a Roma","Job 1–2 y 42."],["¿Qué pasa con Job al final?","Dios le devuelve el doble de lo que tenía","Se queda solo","Se hace rey","Se va a Egipto","Job 42, 10."]],
PSA:[["¿Qué es el libro de los Salmos?","Oraciones y cantos","Leyes","Cartas","Historias de reyes","Los Salmos son el libro de oración de Israel y de la Iglesia."],["Completa: «El Señor es mi pastor…»","nada me faltará","y mi luz","en el cielo","y mi rey","Salmo 23 (22 en la numeración griega y latina)."],["¿A qué rey se atribuyen muchos salmos?","David","Salomón","Saúl","Herodes","Muchos salmos llevan el título «De David»."]],
PRO:[["¿De qué trata sobre todo Proverbios?","De la sabiduría para la vida diaria","De las guerras de Israel","De la vida de Jesús","Del fin del mundo","Proverbios 1, 1-7."],["¿A qué rey se atribuyen muchos proverbios?","Salomón","David","Saúl","Ciro","Proverbios 1, 1."]],
ECC:[["¿Qué libro dice «Hay un tiempo para cada cosa bajo el cielo»?","Eclesiastés","Génesis","Apocalipsis","Rut","Eclesiastés 3, 1."]],
WIS:[["¿En qué Biblias está el libro de la Sabiduría?","En la católica y la ortodoxa","Solo en la protestante","En ninguna","Solo en la hebrea","Es un libro deuterocanónico."]],
SIR:[["¿Quién escribió el Eclesiástico (Sirácida)?","Jesús, hijo de Sirá","Salomón","Moisés","Pablo","Eclesiástico 50, 27."]],
TOB:[["¿Qué ángel acompañó a Tobías en su viaje?","Rafael","Gabriel","Miguel","Uriel","Tobías 5 y 12."]],
JDT:[["¿Qué mujer valiente salvó a la ciudad de Betulia?","Judit","Ester","Débora","Rut","Judit 13."]],
"1MA":[["¿Qué familia guió la revuelta del pueblo judío contra los reyes griegos?","Los Macabeos","Los Herodes","Los levitas","Los fariseos","1 Macabeos 2–4."],["¿Qué fiesta recuerda la nueva consagración del Templo?","La Dedicación (Janucá)","La Pascua","Pentecostés","Purim","1 Macabeos 4, 59."]],
ISA:[["¿Qué significa «Emmanuel»?","Dios con nosotros","Rey de paz","Hijo de David","Luz del mundo","Isaías 7, 14 y Mateo 1, 23."],["¿Qué profeta respondió a Dios: «Aquí estoy, envíame»?","Isaías","Jonás","Amós","Elías","Isaías 6, 8."]],
JER:[["¿Qué profeta fue llamado siendo muy joven y lloró por Jerusalén?","Jeremías","Daniel","Amós","Jonás","Jeremías 1, 6."]],
DAN:[["¿Adónde echaron a Daniel por rezar a Dios?","Al foso de los leones","Al mar","A un pozo","A una cárcel romana","Daniel 6."],["¿Quiénes salieron sin quemarse del horno de fuego?","Tres jóvenes compañeros de Daniel","Los doce apóstoles","Moisés y Aarón","Los Magos","Daniel 3."]],
JON:[["¿A qué ciudad envió Dios a Jonás?","Nínive","Babilonia","Jerusalén","Roma","Jonás 1, 2."],["¿Cuántos días estuvo Jonás dentro del gran pez?","Tres","Siete","Cuarenta","Uno","Jonás 1, 17 (2, 1 en algunas Biblias)."]],
MIC:[["¿Qué ciudad anunció Miqueas como lugar de origen del que gobernaría Israel?","Belén","Nazaret","Jerusalén","Cafarnaún","Miqueas 5, 2."]],
MAT:[["¿Qué gran discurso de Jesús recoge Mateo en los capítulos 5 a 7?","El sermón de la montaña","La última cena","La parábola del sembrador","El discurso de Pentecostés","Mateo 5–7."],["¿Qué oración enseñó Jesús a sus discípulos?","El Padrenuestro","El Avemaría","El Credo","El Magníficat","Mateo 6, 9-13."],["¿Quiénes llegaron siguiendo una estrella para adorar a Jesús niño?","Unos Magos de Oriente","Los pastores","Los apóstoles","Los soldados romanos","Mateo 2 (los pastores aparecen en Lucas)."]],
MAR:[["¿Cuál es el evangelio más corto?","Marcos","Mateo","Lucas","Juan","Marcos tiene 16 capítulos."],["¿Quién bautizó a Jesús en el Jordán?","Juan el Bautista","Pedro","Pablo","Santiago","Marcos 1, 9."]],
LUK:[["¿Dónde acostó María a Jesús al nacer?","En un pesebre","En una cuna de oro","En el Templo","En una barca","Lucas 2, 7."],["¿Qué parábola habla de un padre que perdona a su hijo que vuelve?","El hijo pródigo","El sembrador","Los talentos","La oveja perdida","Lucas 15, 11-32."],["En la parábola, ¿quién ayudó al herido del camino?","Un samaritano","Un sacerdote","Un levita","Un soldado","Lucas 10, 30-37."]],
JOH:[["¿Con qué palabras empieza el Evangelio de Juan?","«En el principio era el Verbo»","«En el principio creó Dios»","«Libro del origen de Jesucristo»","«Escucha, Israel»","Juan 1, 1."],["¿Cuál fue el primer milagro de Jesús según Juan?","Convertir el agua en vino en Caná","Caminar sobre el agua","Multiplicar los panes","Resucitar a Lázaro","Juan 2, 1-11."],["¿A quién resucitó Jesús en Betania?","A Lázaro","A Pedro","A Zaqueo","A Nicodemo","Juan 11."]],
ACT:[["¿Qué pasó el día de Pentecostés?","El Espíritu Santo bajó sobre los apóstoles","Jesús nació","Jesús fue bautizado","Pablo llegó a Roma","Hechos 2."],["¿Cómo se llamaba Pablo antes de su conversión?","Saulo","Simón","Esteban","Bernabé","Hechos 9 y 13, 9."]],
ROM:[["¿A los cristianos de qué ciudad escribió Pablo esta carta?","Roma","Corinto","Éfeso","Atenas","Romanos 1, 7."]],
"1CO":[["Según el capítulo 13, ¿cuál es la mayor de las virtudes?","El amor","La fe","La esperanza","La sabiduría","1 Corintios 13, 13."],["«El amor es paciente, es servicial…»: ¿a qué comunidad lo escribió Pablo?","A los corintios","A los romanos","A los gálatas","A los hebreos","1 Corintios 13, 4."]],
GAL:[["¿Qué es el «fruto del Espíritu» según Gálatas?","Amor, alegría, paz, paciencia…","Oro, incienso y mirra","Pan y vino","Fe, poder y gloria","Gálatas 5, 22-23."]],
EPH:[["¿Qué nos pide ponernos Efesios 6 para la lucha espiritual?","La armadura de Dios","Una túnica nueva","Una corona","Sandalias de oro","Efesios 6, 11."]],
PHI:[["¿Desde dónde escribió Pablo la carta a los Filipenses?","Desde la cárcel","Desde el Templo","Desde un barco","Desde su casa en Tarso","Filipenses 1, 13."]],
HEB:[["¿De qué habla sobre todo Hebreos 11?","De la fe de los grandes personajes del Antiguo Testamento","De la creación","De las plagas de Egipto","Del fin del mundo","Hebreos 11: «Por la fe…»."]],
JAM:[["Según Santiago, la fe sin obras…","está muerta","es suficiente","es más fuerte","no importa","Santiago 2, 17."]],
"1PE":[["¿Quién escribe esta carta, según su comienzo?","Pedro, apóstol de Jesucristo","Pablo","Juan","Santiago","1 Pedro 1, 1."]],
"1JO":[["¿Cómo resume la primera carta de Juan quién es Dios?","«Dios es amor»","«Dios es fuego»","«Dios es juez»","«Dios es silencio»","1 Juan 4, 8."]],
REV:[["¿Cuál es el último libro de la Biblia?","Apocalipsis","Malaquías","Judas","Hechos","El Apocalipsis cierra la Biblia."],["¿En qué isla recibió Juan sus visiones?","Patmos","Creta","Malta","Chipre","Apocalipsis 1, 9."],["«Yo soy el Alfa y la Omega»: ¿qué quiere decir?","El principio y el fin","El rey y el siervo","La luz y la vida","El pan y el vino","Apocalipsis 1, 8 y 22, 13."]]},
en:{
GEN:[["What did God do on the seventh day of creation?","He rested","He created man","He separated the waters","He made the sun","Genesis 2:2."],["Who built the ark to survive the flood?","Noah","Abraham","Moses","Jacob","Genesis 6–7."],["Whom did God call to leave his land for a new land?","Abraham","Isaac","Joseph","Lot","Genesis 12:1."]],
EXO:[["Who led the people of Israel out of Egypt?","Moses","Abraham","David","Joshua","Exodus 3–14."],["From where did God first speak to Moses?","From a burning bush","From a cloud","From a well","From the Temple","Exodus 3:2."],["What did Moses receive on Mount Sinai?","The Ten Commandments","A crown","Noah's ark","Twelve loaves","Exodus 20."]],
LEV:[["What is Leviticus mainly about?","Laws about worship and holiness","Battles","The life of Jesus","Sea voyages","Leviticus gathers rules for worship and holy living."],["«Love your neighbour as yourself» first appears in…","Leviticus","Revelation","Ruth","Esther","Leviticus 19:18; Jesus recalls it in the Gospels."]],
NUM:[["Why is this book called «Numbers»?","Because it begins with a census of the people","Because it is about maths","Because it counts the stars","Because it has many chapters","Numbers 1: Moses counts the people."],["How many years did Israel wander in the desert?","Forty","Seven","Twelve","A hundred","Numbers 14:33."]],
DEU:[["Where did Moses die, according to the end of Deuteronomy?","On Mount Nebo, looking at the promised land","In Egypt","In Jerusalem","On Sinai","Deuteronomy 34."],["Which word begins the great prayer «… O Israel: the Lord is one»?","Hear","Sing","Look","Arise","Deuteronomy 6:4: «Hear, O Israel»."]],
JOS:[["Which city fell when the trumpets sounded?","Jericho","Babylon","Nineveh","Rome","Joshua 6."],["Who led the people after Moses?","Joshua","Aaron","Saul","Elijah","Joshua 1."]],
JDG:[["Who had great strength linked to his hair?","Samson","Gideon","David","Goliath","Judges 16."],["Which woman was a judge and prophetess in Israel?","Deborah","Ruth","Esther","Sarah","Judges 4."]],
RUT:[["What did Ruth say to her mother-in-law Naomi?","«Your people shall be my people, and your God my God»","«I am going back home»","«I want to be queen»","«I don't know you»","Ruth 1:16."],["Ruth was the great-grandmother of which famous king?","David","Solomon","Saul","Herod","Ruth 4:17."]],
"1SA":[["Which boy heard God calling him at night in the sanctuary?","Samuel","David","Joseph","Isaac","1 Samuel 3."],["What did David use to defeat Goliath?","A sling and a stone","A sword","A bow","A spear","1 Samuel 17."]],
"2SA":[["Which city did David make his capital?","Jerusalem","Bethlehem","Nazareth","Jericho","2 Samuel 5."]],
"1KI":[["What did Solomon ask God for?","Wisdom","Riches","A long life","Victory in battle","1 Kings 3."],["What did Solomon build in Jerusalem?","The Temple","The ark","The tower of Babel","The walls of Jericho","1 Kings 6."],["Which prophet defeated the prophets of Baal on Mount Carmel?","Elijah","Elisha","Jonah","Isaiah","1 Kings 18."]],
"2KI":[["How did Elijah go up to heaven?","In a chariot of fire","In a cloud","Up a ladder","In a boat","2 Kings 2:11."],["Which prophet received Elijah's cloak?","Elisha","Jeremiah","Samuel","Nathan","2 Kings 2."]],
EST:[["Which queen saved her people by risking her life?","Esther","Ruth","Jezebel","Sarah","Esther 4–8."]],
JOB:[["What does the book of Job tell?","The story of a righteous man who suffers and keeps his faith","The conquest of Jericho","The life of King David","Paul's journey to Rome","Job 1–2 and 42."],["What happens to Job at the end?","God gives him back twice as much","He is left alone","He becomes king","He goes to Egypt","Job 42:10."]],
PSA:[["What is the book of Psalms?","Prayers and songs","Laws","Letters","Stories of kings","The Psalms are the prayer book of Israel and the Church."],["Complete: «The Lord is my shepherd…»","I shall not want","and my light","in heaven","and my king","Psalm 23 (22 in Greek and Latin numbering)."],["Which king is credited with many psalms?","David","Solomon","Saul","Herod","Many psalms are titled «Of David»."]],
PRO:[["What is Proverbs mainly about?","Wisdom for everyday life","Israel's wars","The life of Jesus","The end of the world","Proverbs 1:1-7."],["Which king is credited with many proverbs?","Solomon","David","Saul","Cyrus","Proverbs 1:1."]],
ECC:[["Which book says «For everything there is a season»?","Ecclesiastes","Genesis","Revelation","Ruth","Ecclesiastes 3:1."]],
WIS:[["In which Bibles is the book of Wisdom found?","Catholic and Orthodox","Only Protestant","None","Only the Hebrew Bible","It is a deuterocanonical book."]],
SIR:[["Who wrote Sirach (Ecclesiasticus)?","Jesus, son of Sirach","Solomon","Moses","Paul","Sirach 50:27."]],
TOB:[["Which angel went with Tobias on his journey?","Raphael","Gabriel","Michael","Uriel","Tobit 5 and 12."]],
JDT:[["Which brave woman saved the city of Bethulia?","Judith","Esther","Deborah","Ruth","Judith 13."]],
"1MA":[["Which family led the Jewish revolt against the Greek kings?","The Maccabees","The Herods","The Levites","The Pharisees","1 Maccabees 2–4."],["Which feast recalls the rededication of the Temple?","Dedication (Hanukkah)","Passover","Pentecost","Purim","1 Maccabees 4:59."]],
ISA:[["What does «Emmanuel» mean?","God with us","King of peace","Son of David","Light of the world","Isaiah 7:14 and Matthew 1:23."],["Which prophet answered God: «Here am I, send me»?","Isaiah","Jonah","Amos","Elijah","Isaiah 6:8."]],
JER:[["Which prophet was called when very young and wept for Jerusalem?","Jeremiah","Daniel","Amos","Jonah","Jeremiah 1:6."]],
DAN:[["Where was Daniel thrown for praying to God?","Into the lions' den","Into the sea","Into a well","Into a Roman prison","Daniel 6."],["Who came out of the fiery furnace unburned?","Three young friends of Daniel","The twelve apostles","Moses and Aaron","The Magi","Daniel 3."]],
JON:[["To which city did God send Jonah?","Nineveh","Babylon","Jerusalem","Rome","Jonah 1:2."],["How many days was Jonah inside the great fish?","Three","Seven","Forty","One","Jonah 1:17 (2:1 in some Bibles)."]],
MIC:[["Which town did Micah announce as the origin of Israel's future ruler?","Bethlehem","Nazareth","Jerusalem","Capernaum","Micah 5:2."]],
MAT:[["Which great discourse of Jesus does Matthew give in chapters 5 to 7?","The Sermon on the Mount","The Last Supper","The parable of the sower","The Pentecost speech","Matthew 5–7."],["Which prayer did Jesus teach his disciples?","The Our Father","The Hail Mary","The Creed","The Magnificat","Matthew 6:9-13."],["Who came following a star to worship the child Jesus?","Magi from the East","The shepherds","The apostles","Roman soldiers","Matthew 2 (the shepherds are in Luke)."]],
MAR:[["Which is the shortest Gospel?","Mark","Matthew","Luke","John","Mark has 16 chapters."],["Who baptized Jesus in the Jordan?","John the Baptist","Peter","Paul","James","Mark 1:9."]],
LUK:[["Where did Mary lay Jesus when he was born?","In a manger","In a golden cradle","In the Temple","In a boat","Luke 2:7."],["Which parable tells of a father who forgives his returning son?","The prodigal son","The sower","The talents","The lost sheep","Luke 15:11-32."],["In the parable, who helped the wounded man on the road?","A Samaritan","A priest","A Levite","A soldier","Luke 10:30-37."]],
JOH:[["With which words does John's Gospel begin?","«In the beginning was the Word»","«In the beginning God created»","«The book of the genealogy of Jesus Christ»","«Hear, O Israel»","John 1:1."],["What was Jesus' first miracle according to John?","Turning water into wine at Cana","Walking on water","Feeding the five thousand","Raising Lazarus","John 2:1-11."],["Whom did Jesus raise from the dead in Bethany?","Lazarus","Peter","Zacchaeus","Nicodemus","John 11."]],
ACT:[["What happened on the day of Pentecost?","The Holy Spirit came down on the apostles","Jesus was born","Jesus was baptized","Paul reached Rome","Acts 2."],["What was Paul's name before his conversion?","Saul","Simon","Stephen","Barnabas","Acts 9 and 13:9."]],
ROM:[["To the Christians of which city did Paul write this letter?","Rome","Corinth","Ephesus","Athens","Romans 1:7."]],
"1CO":[["According to chapter 13, which is the greatest virtue?","Love","Faith","Hope","Wisdom","1 Corinthians 13:13."],["«Love is patient, love is kind…»: to which community did Paul write this?","The Corinthians","The Romans","The Galatians","The Hebrews","1 Corinthians 13:4."]],
GAL:[["What is the «fruit of the Spirit» in Galatians?","Love, joy, peace, patience…","Gold, frankincense and myrrh","Bread and wine","Faith, power and glory","Galatians 5:22-23."]],
EPH:[["What does Ephesians 6 tell us to put on for the spiritual battle?","The armour of God","A new tunic","A crown","Golden sandals","Ephesians 6:11."]],
PHI:[["From where did Paul write to the Philippians?","From prison","From the Temple","From a ship","From his home in Tarsus","Philippians 1:13."]],
HEB:[["What is Hebrews 11 mainly about?","The faith of the great figures of the Old Testament","Creation","The plagues of Egypt","The end of the world","Hebrews 11: «By faith…»."]],
JAM:[["According to James, faith without works…","is dead","is enough","is stronger","doesn't matter","James 2:17."]],
"1PE":[["Who writes this letter, according to its opening?","Peter, an apostle of Jesus Christ","Paul","John","James","1 Peter 1:1."]],
"1JO":[["How does the first letter of John sum up who God is?","«God is love»","«God is fire»","«God is judge»","«God is silence»","1 John 4:8."]],
REV:[["Which is the last book of the Bible?","Revelation","Malachi","Jude","Acts","Revelation closes the Bible."],["On which island did John receive his visions?","Patmos","Crete","Malta","Cyprus","Revelation 1:9."],["«I am the Alpha and the Omega»: what does it mean?","The beginning and the end","The king and the servant","The light and the life","The bread and the wine","Revelation 1:8 and 22:13."]]}};

// Preguntas fáciles generadas a partir de los datos de cada libro
function easyPool(br,c){
 const L=CL(),out=[],books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
 const far=books.filter(x=>GOF[x]!==GOF[c]);const tag=q=>{if(q){q.wk=c;q.wbr=br;q.lvl='easy'}return q};
 // 1. Escritas a mano
 ((EASY[L]||EASY.en)[c]||[]).forEach(q=>out.push(tag(mcq(q[0],q[1],q.slice(2,5),undefined,q[5]))));
 if(L==='es'&&typeof BASIC!=='undefined'&&BASIC.books[c])BASIC.books[c].forEach(q=>out.push(tag(mcq(q[0],q[1],q.slice(2,5),undefined,q[5]))));
 // 2. Resumen → libro (las opciones son de otras partes de la Biblia: más fácil)
 out.push(tag(mcq(ezt('sum'),bname(c),pickN(far.length>3?far:books,3,[c]).map(bname),sumOf(c),ezt('whyBook',{b:bname(c),s:sumOf(c)}))));
 // 3. Antiguo o Nuevo Testamento
 const tt=isNT(c)?ezt('nt'):ezt('ot');out.push(tag(mcq(ezt('test',{b:bname(c)}),tt,[isNT(c)?ezt('ot'):ezt('nt')],undefined,ezt('whyTest',{b:bname(c),t:tt}))));
 // 4. Parte de la Biblia (Ley, Historia, Sabiduría…)
 const g=GOF[c];out.push(tag(mcq(fmt(ct('qGroup'),{b:bname(c)}),ct('g_'+g),shuffle(Object.keys(GROUP).filter(x=>x!==g)).slice(0,3).map(x=>ct('g_'+x)),undefined,ezt('whyBook',{b:bname(c),s:sumOf(c)}))));
 // 5. Versículo famoso de un capítulo clave → libro
 if(hasV(br,c)&&KEY[c]){try{const b=VB[vsrc(br)+':'+c],lxx=bookMeta(vsrc(br)).scheme==='lxx';
  const ks=KEY[c].map(x=>c==='PSA'&&lxx?String(heb2lxx(x,1)[0]):String(x)).filter(x=>b.ch[x]);
  for(let k=0;k<2&&ks.length;k++){const ch=ks[rnd(ks.length)],vv=b.ch[ch].filter(x=>x[1].length>30&&x[1].length<180);if(!vv.length)continue;const v=vv[rnd(Math.min(vv.length,6))];
   out.push(tag(mcq(ezt('famous'),bname(c),pickN(far.length>3?far:books,3,[c]).map(bname),'«'+v[1]+'»',bname(c)+' '+ch+', '+v[0])))}}catch(e){}}
 // 6. Personajes de este libro (los distractores son del otro Testamento)
 if(typeof BIBFIG!=='undefined'){const mine=BIBFIG.map((f,i)=>i).filter(i=>BIBFIG[i][2].split(' ')[0]===c&&!/ y | and /.test(BIBFIG[i][0]));
  const other=BIBFIG.map((f,i)=>i).filter(i=>isNT(BIBFIG[i][2].split(' ')[0])!==isNT(c)&&!/ y | and /.test(BIBFIG[i][0]));
  const nm=i=>L==='es'?BIBFIG[i][0]:(typeof BIBFIG_EN!=='undefined'?BIBFIG_EN[i][0]:BIBFIG[i][0]),ds=i=>L==='es'?BIBFIG[i][1]:(typeof BIBFIG_EN!=='undefined'?BIBFIG_EN[i][1]:BIBFIG[i][1]);
  shuffle(mine).slice(0,1).forEach(i=>{if(other.length>=3)out.push(tag(mcq(ezt('who',{b:bname(c)}),nm(i),pickN(other,3,[i]).map(nm),undefined,ds(i))))})}
 return out.filter(Boolean);
}
// Sin repetir la misma respuesta dentro de una lección
const pickEasy=(br,key,pool,n)=>{const seen=new Set(),out=[],rest=[];for(const q of pickFresh(br,key,pool,n*2)){const a=String(q.answer);if(seen.has(a)){rest.push(q);continue}seen.add(a);out.push(q);if(out.length>=n)break}
 return out.concat(rest).slice(0,Math.min(n,Math.max(5,out.length)))};
const _buildLessonN=buildLesson;
buildLesson=function(br,id){
 if(id.startsWith('intro'))return _buildLessonN.apply(this,arguments);
 // Normal y Difícil no repiten las preguntas de iniciación del nivel Fácil
 if(lv()!=='easy'){const B=typeof BASIC!=='undefined'?BASIC.books:null;if(B)BASIC.books={};try{return _buildLessonN.apply(this,arguments)}finally{if(B)BASIC.books=B}}
 const books=COURSE_META[br].books.map(b=>b[0]).filter(x=>SUM[x]);
 if(id.startsWith('rev:')){const u=courseUnits(br)[+id.slice(4)];return pickEasy(br,'e:'+id,u.books.flatMap(c=>easyPool(br,c)),8)}
 if(id.startsWith('ex:')){const u=courseUnits(br)[+id.slice(3)];return pickEasy(br,'e:'+id,u.books.flatMap(c=>easyPool(br,c)),10)}
 if(id==='exam')return pickEasy(br,'e:exam',shuffle(books).slice(0,20).flatMap(c=>easyPool(br,c)),20);
 return [{type:'card',book:id}].concat(pickEasy(br,'e:'+id,easyPool(br,id),6));
};

// Lenguas bíblicas: en desarrollo (bloqueadas)
renderLangCourse=function(){return `<div class="lcard" style="text-align:center"><div style="font-size:46px">🛠️</div><span class="pill soft">${esc(ezt('soon'))}</span><h1>${esc(ezt('langsT'))}</h1><p class="lead">${esc(ezt('langsL'))}</p></div>`};
bindLangCourse=function(){};
