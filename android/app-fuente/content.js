const NAV={en:["Bible","Learn","Health","Sport","More"],es:["Biblia","Aprender","Salud","Deporte","Más"],pt:["Bíblia","Aprender","Saúde","Esporte","Mais"],fr:["Bible","Apprendre","Santé","Sport","Plus"],it:["Bibbia","Impara","Salute","Sport","Altro"],de:["Bibel","Lernen","Gesundheit","Sport","Mehr"],el:["Γραφή","Μάθηση","Υγεία","Άθληση","Περισσότερα"],ru:["Библия","Учёба","Здоровье","Спорт","Ещё"],ro:["Biblia","Învață","Sănătate","Sport","Mai mult"]};

// Resúmenes de cada libro (es|en)
const SUM={
GEN:["Creación, caída, diluvio y los patriarcas Abraham, Isaac, Jacob y José.","Creation, the fall, the flood and the patriarchs Abraham, Isaac, Jacob and Joseph."],
EXO:["Moisés saca a Israel de Egipto y Dios entrega la Ley en el Sinaí.","Moses leads Israel out of Egypt and God gives the Law at Sinai."],
LEV:["Leyes sobre los sacrificios, el sacerdocio y la santidad.","Laws on sacrifice, priesthood and holiness."],
NUM:["El censo del pueblo y los cuarenta años por el desierto.","The census of the people and forty years in the wilderness."],
DEU:["Discursos de despedida de Moisés antes de entrar en la Tierra Prometida.","Moses’ farewell speeches before entering the Promised Land."],
JOS:["Josué conquista y reparte la tierra de Canaán.","Joshua conquers and divides the land of Canaan."],
JDG:["Ciclos de infidelidad y liberación con jueces como Débora, Gedeón y Sansón.","Cycles of unfaithfulness and rescue under judges like Deborah, Gideon and Samson."],
RUT:["Rut la moabita, fiel a su suegra Noemí, bisabuela del rey David.","Ruth the Moabite, loyal to Naomi, great-grandmother of King David."],
"1SA":["Samuel, el rey Saúl y el joven David frente a Goliat.","Samuel, King Saul and young David against Goliath."],
"2SA":["El reinado de David en Jerusalén.","The reign of David in Jerusalem."],
"1KI":["Salomón construye el Templo, el reino se divide y aparece el profeta Elías.","Solomon builds the Temple, the kingdom splits and the prophet Elijah appears."],
"2KI":["Eliseo y los reyes de Israel y Judá hasta el destierro a Babilonia.","Elisha and the kings of Israel and Judah up to the exile to Babylon."],
"1CH":["Genealogías y el reinado de David contados de nuevo.","Genealogies and David’s reign retold."],
"2CH":["Historia de Judá desde Salomón hasta el destierro.","History of Judah from Solomon to the exile."],
EZR:["Regreso del destierro y reconstrucción del Templo.","Return from exile and rebuilding of the Temple."],
NEH:["Nehemías reconstruye las murallas de Jerusalén.","Nehemiah rebuilds the walls of Jerusalem."],
EST:["La reina Ester salva a su pueblo en Persia.","Queen Esther saves her people in Persia."],
JOB:["Job, un justo que sufre, discute con sus amigos y se encuentra con Dios.","Job, a righteous man who suffers, argues with his friends and meets God."],
PSA:["Cantos y oraciones de Israel: 150 salmos, o 151 en la tradición ortodoxa.","Songs and prayers of Israel: 150 psalms, or 151 in the Orthodox tradition."],
PRO:["Refranes de sabiduría para la vida diaria.","Sayings of wisdom for daily life."],
ECC:["Reflexión sobre el sentido de la vida: «vanidad de vanidades».","A reflection on life’s meaning: “vanity of vanities”."],
SOL:["Poema de amor entre el amado y la amada.","A love poem between the beloved and the lover."],
ISA:["Profecías de juicio, de consuelo y sobre el Mesías.","Prophecies of judgement, comfort and the Messiah."],
JER:["Jeremías anuncia la caída de Jerusalén y una nueva alianza.","Jeremiah foretells Jerusalem’s fall and a new covenant."],
LAM:["Lamentos por la destrucción de Jerusalén.","Laments over the destruction of Jerusalem."],
EZE:["Visiones del profeta en el destierro, como el valle de los huesos secos.","Visions of the prophet in exile, like the valley of dry bones."],
DAN:["Daniel en Babilonia: el foso de los leones y visiones del futuro.","Daniel in Babylon: the lions’ den and visions of the future."],
HOS:["El amor fiel de Dios a un pueblo infiel, como el de un esposo.","God’s faithful love for an unfaithful people, like a husband’s."],
JOE:["Una plaga de langostas y la promesa del Espíritu.","A plague of locusts and the promise of the Spirit."],
AMO:["Un pastor denuncia la injusticia social.","A shepherd denounces social injustice."],
OBA:["Profecía contra Edom; el libro más corto del Antiguo Testamento.","A prophecy against Edom; the shortest book of the Old Testament."],
JON:["Jonás huye de Dios, es tragado por un gran pez y predica en Nínive.","Jonah flees God, is swallowed by a great fish and preaches in Nineveh."],
MIC:["Justicia, misericordia y Belén como cuna del gobernante.","Justice, mercy and Bethlehem as the birthplace of the ruler."],
NAH:["Anuncio de la caída de Nínive.","The fall of Nineveh announced."],
HAB:["El profeta pregunta a Dios por el mal: «el justo por su fe vivirá».","The prophet questions God about evil: “the just shall live by faith”."],
ZEP:["El día del Señor y la esperanza para un resto humilde.","The day of the Lord and hope for a humble remnant."],
HAG:["Llamada a reconstruir el Templo.","A call to rebuild the Temple."],
ZEC:["Visiones de restauración y del rey humilde montado en un asno.","Visions of restoration and of the humble king riding a donkey."],
MAL:["El último profeta: anuncia al mensajero que prepara el camino.","The last prophet: he announces the messenger who prepares the way."],
TOB:["Tobías viaja guiado por el ángel Rafael y cura a su padre Tobit.","Tobias travels guided by the angel Raphael and heals his father Tobit."],
JDT:["Judit, una viuda valiente, salva a su ciudad de Holofernes.","Judith, a brave widow, saves her city from Holofernes."],
ESG:["El libro de Ester con oraciones y pasajes que solo están en griego.","The book of Esther with prayers and passages found only in Greek."],
WIS:["Elogio de la Sabiduría, atribuido a Salomón.","A praise of Wisdom, attributed to Solomon."],
SIR:["Enseñanzas de Jesús, hijo de Sirac, sobre la vida recta.","Teachings of Jesus son of Sirach on upright living."],
BAR:["Baruc, secretario de Jeremías, escribe a los desterrados.","Baruch, Jeremiah’s scribe, writes to the exiles."],
EPJ:["Carta contra los ídolos dirigida a los desterrados.","A letter against idols addressed to the exiles."],
PRA:["Oración y cántico de los tres jóvenes en el horno de fuego.","Prayer and song of the three youths in the fiery furnace."],
SUS:["Daniel defiende a Susana, acusada falsamente.","Daniel defends Susanna, who was falsely accused."],
BEL:["Daniel desenmascara al ídolo Bel y vence a un dragón.","Daniel unmasks the idol Bel and defeats a dragon."],
"1MA":["Los Macabeos se levantan contra la persecución griega.","The Maccabees rise up against Greek persecution."],
"2MA":["Mártires y victorias de la rebelión de los Macabeos.","Martyrs and victories of the Maccabean revolt."],
"3MA":["Los judíos de Egipto, salvados de la persecución de Ptolomeo.","The Jews of Egypt saved from Ptolemy’s persecution."],
"1ES":["Relato griego del regreso del destierro, con la historia de los tres guardias.","A Greek account of the return from exile, with the tale of the three guards."],
"4ES":["El libro de Esdras en su versión griega (Esdras B).","The book of Ezra in its Greek version (Esdras B)."],
DNG:["Daniel en la versión griega de la Septuaginta.","Daniel in the Greek Septuagint version."],
MAT:["La vida de Jesús, el Mesías prometido, con el Sermón del Monte.","The life of Jesus the promised Messiah, with the Sermon on the Mount."],
MAR:["El evangelio más breve: Jesús en acción.","The shortest gospel: Jesus in action."],
LUK:["Jesús salva a pobres y pecadores; parábolas como la del hijo pródigo.","Jesus saves the poor and sinners; parables like the prodigal son."],
JOH:["Jesús, el Verbo hecho carne, y sus signos.","Jesus, the Word made flesh, and his signs."],
ACT:["Los apóstoles extienden la Iglesia después de Pentecostés.","The apostles spread the Church after Pentecost."],
ROM:["Pablo explica la salvación por la fe en Cristo.","Paul explains salvation through faith in Christ."],
"1CO":["Los problemas de la comunidad de Corinto y el himno al amor.","Problems in the Corinthian church and the hymn to love."],
"2CO":["Pablo defiende su ministerio: la fuerza en la debilidad.","Paul defends his ministry: strength in weakness."],
GAL:["La libertad cristiana frente a la Ley.","Christian freedom and the Law."],
EPH:["La Iglesia como cuerpo de Cristo.","The Church as the body of Christ."],
PHI:["Una carta de alegría escrita desde la prisión.","A letter of joy written from prison."],
COL:["Cristo, cabeza de toda la creación.","Christ, head of all creation."],
"1TH":["La venida del Señor y la vida santa.","The coming of the Lord and holy living."],
"2TH":["Aclaraciones sobre el día del Señor.","Clarifications about the day of the Lord."],
"1TI":["Consejos a Timoteo para guiar la Iglesia.","Advice to Timothy on leading the Church."],
"2TI":["Las últimas palabras de Pablo: «he guardado la fe».","Paul’s last words: “I have kept the faith”."],
TIT:["Instrucciones para la Iglesia de Creta.","Instructions for the church in Crete."],
PHM:["Pablo intercede por Onésimo, un esclavo fugitivo.","Paul pleads for Onesimus, a runaway slave."],
HEB:["Cristo, sumo sacerdote de la nueva alianza.","Christ, high priest of the new covenant."],
JAM:["La fe se demuestra con obras.","Faith is shown by works."],
"1PE":["Esperanza para los cristianos que sufren.","Hope for Christians who suffer."],
"2PE":["Advertencia contra los falsos maestros.","A warning against false teachers."],
"1JO":["Dios es amor: amaos unos a otros.","God is love: love one another."],
"2JO":["Breve carta sobre la verdad y el amor.","A short letter on truth and love."],
"3JO":["Carta a Gayo sobre la hospitalidad.","A letter to Gaius on hospitality."],
JUD:["Llamada a defender la fe.","A call to contend for the faith."],
REV:["Visiones de Juan sobre el fin de los tiempos y la nueva Jerusalén.","John’s visions of the end times and the new Jerusalem."]
};

const GROUP={law:"GEN EXO LEV NUM DEU",history:"JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST TOB JDT ESG 1MA 2MA 3MA 1ES 4ES",wisdom:"JOB PSA PRO ECC SOL WIS SIR",prophets:"ISA JER LAM BAR EPJ EZE DAN DNG SUS BEL PRA HOS JOE AMO OBA JON MIC NAH HAB ZEP HAG ZEC MAL",gospels:"MAT MAR LUK JOH ACT",letters:"ROM 1CO 2CO GAL EPH PHI COL 1TH 2TH 1TI 2TI TIT PHM HEB JAM 1PE 2PE 1JO 2JO 3JO JUD",apoc:"REV"};
const GOF={};for(const g in GROUP)GROUP[g].split(" ").forEach(c=>GOF[c]=g);

// Preguntas de introducción escritas a mano: [pregunta, correcta, mal1, mal2, mal3]
const INTRO={
ortodoxa:{es:[
 ["¿Qué texto del Antiguo Testamento usa la Iglesia ortodoxa?","La Septuaginta, en griego","El texto masorético hebreo","La Vulgata latina","La Reina-Valera"],
 ["¿Cuántos libros tiene, aproximadamente, la Biblia ortodoxa?","Unos 76","66","73","81"],
 ["¿Qué salmo de más incluye la Biblia ortodoxa?","El Salmo 151","El Salmo 119","El Salmo 1","El Salmo 23"],
 ["¿Cómo llama la tradición ortodoxa a los libros que no están en el canon hebreo?","Anagignóskomena, «los que se leen»","Evangelios apócrifos","Targumim","Epístolas católicas"],
 ["¿En qué idioma está el texto patriarcal del Nuevo Testamento de 1904?","Griego","Latín","Hebreo","Eslavo eclesiástico"],
 ["¿Cuál de estos libros está en la Biblia ortodoxa pero no en la católica?","3 Macabeos","Tobías","Judit","Sabiduría"]],
 en:[
 ["Which Old Testament text does the Orthodox Church use?","The Septuagint, in Greek","The Hebrew Masoretic text","The Latin Vulgate","The Reina-Valera"],
 ["Roughly how many books does the Orthodox Bible have?","About 76","66","73","81"],
 ["Which extra psalm does the Orthodox Bible include?","Psalm 151","Psalm 119","Psalm 1","Psalm 23"],
 ["What does Orthodox tradition call the books outside the Hebrew canon?","Anagignoskomena, “those that are read”","Apocryphal gospels","Targumim","Catholic epistles"],
 ["In which language is the 1904 Patriarchal Text of the New Testament?","Greek","Latin","Hebrew","Church Slavonic"],
 ["Which of these books is in the Orthodox Bible but not in the Catholic one?","3 Maccabees","Tobit","Judith","Wisdom"]]},
catolica:{es:[
 ["¿Cuántos libros tiene la Biblia católica?","73","66","76","81"],
 ["¿Qué concilio fijó de forma solemne el canon católico en 1546?","El Concilio de Trento","El Concilio de Nicea","El Concilio Vaticano II","El Concilio de Calcedonia"],
 ["¿Quién tradujo la Biblia al latín en la versión llamada Vulgata?","San Jerónimo","San Agustín","Erasmo de Rotterdam","Martín Lutero"],
 ["¿Cómo llama la Iglesia católica a libros como Tobías, Judit o Sabiduría?","Deuterocanónicos","Apócrifos gnósticos","Pseudoepígrafos","Evangelios menores"],
 ["¿Qué papa da nombre a la Vulgata Clementina?","Clemente VIII","Clemente I","León XIII","Gregorio Magno"],
 ["¿Cuántos libros tiene el Nuevo Testamento católico?","27","22","30","39"]],
 en:[
 ["How many books does the Catholic Bible have?","73","66","76","81"],
 ["Which council solemnly defined the Catholic canon in 1546?","The Council of Trent","The Council of Nicaea","The Second Vatican Council","The Council of Chalcedon"],
 ["Who translated the Bible into Latin in the version called the Vulgate?","Saint Jerome","Saint Augustine","Erasmus","Martin Luther"],
 ["What does the Catholic Church call books like Tobit, Judith or Wisdom?","Deuterocanonical","Gnostic apocrypha","Pseudepigrapha","Minor gospels"],
 ["Which pope gives his name to the Clementine Vulgate?","Clement VIII","Clement I","Leo XIII","Gregory the Great"],
 ["How many books are in the Catholic New Testament?","27","22","30","39"]]},
protestante:{es:[
 ["¿Cuántos libros tiene la Biblia protestante?","66","73","76","81"],
 ["¿Qué canon sigue su Antiguo Testamento?","El canon hebreo","El de la Septuaginta","El de la Vulgata","El canon etíope"],
 ["¿Quién publicó la primera edición de la Reina-Valera, en 1569?","Casiodoro de Reina","Cipriano de Valera","Martín Lutero","Félix Torres Amat"],
 ["¿Con qué nombre se conoce la edición de 1569?","La Biblia del Oso","La Biblia del Cántaro","La Biblia de Ferrara","La Biblia de Jerusalén"],
 ["¿Qué movimiento del siglo XVI dio origen a las Biblias protestantes?","La Reforma","El Cisma de Oriente","La Contrarreforma","La Ilustración"],
 ["¿Qué principio protestante pone la Escritura como autoridad final?","Sola Scriptura","Ora et labora","Lex orandi","Ad fontes"]],
 en:[
 ["How many books does the Protestant Bible have?","66","73","76","81"],
 ["Which canon does its Old Testament follow?","The Hebrew canon","The Septuagint’s","The Vulgate’s","The Ethiopian canon"],
 ["Who published the first edition of the Reina-Valera, in 1569?","Casiodoro de Reina","Cipriano de Valera","Martin Luther","Félix Torres Amat"],
 ["What is the 1569 edition known as?","The Bear Bible","The Pitcher Bible","The Ferrara Bible","The Jerusalem Bible"],
 ["Which 16th-century movement gave rise to Protestant Bibles?","The Reformation","The East–West Schism","The Counter-Reformation","The Enlightenment"],
 ["Which Protestant principle makes Scripture the final authority?","Sola Scriptura","Ora et labora","Lex orandi","Ad fontes"]]}
};

const CT={
es:{learnTitle:"Aprende la Biblia",learnLead:"Un curso por cada Biblia, libro a libro. Llega al 85 % para conseguir el dominio.",course:"Curso",xp:"XP",streak:"días seguidos",hearts:"vidas",intro:"Conoce esta Biblia",start:"Empezar",check:"Comprobar",cont:"Continuar",right:"¡Correcto!",wrong:"No es correcto",answerWas:"Respuesta correcta:",done:"¡Lección completada!",gained:"Has ganado",retry:"Repetir",out:"Te has quedado sin vidas",outNote:"Repasa y vuelve a intentarlo.",back:"Volver al curso",progress:"completado",mastery:"Dominio conseguido",masteryNote:"Completa el 85 % de las lecciones para desbloquear el examen final.",exam:"Examen final",examNote:"20 preguntas. Necesitas un 85 % para aprobar.",pass:"¡Aprobado! Dominas esta Biblia.",fail:"Te ha faltado poco. Necesitas un 85 %.",score:"Tu nota",newBook:"Nuevo libro",chapters:"capítulos",read:"Leer este libro",review:"Repaso",
 g_law:"Ley (Pentateuco)",g_history:"Libros históricos",g_wisdom:"Libros sapienciales",g_prophets:"Profetas",g_gospels:"Evangelios y Hechos",g_letters:"Cartas",g_apoc:"Apocalipsis",
 qSum:"¿Qué libro es este?",qCh:"¿Cuántos capítulos tiene {b}?",qNext:"¿Qué libro va justo después de {b} en esta Biblia?",qFill:"Completa el versículo ({r})",qVerse:"¿De qué libro es este versículo?",qCanon:"¿Está {b} en la Biblia protestante?",qGroup:"¿A qué parte de la Biblia pertenece {b}?",yes:"Sí",no:"No",locked:"Bloqueado",onlyEsEn:""},
en:{learnTitle:"Learn the Bible",learnLead:"One course per Bible, book by book. Reach 85% to earn mastery.",course:"Course",xp:"XP",streak:"day streak",hearts:"lives",intro:"Meet this Bible",start:"Start",check:"Check",cont:"Continue",right:"Correct!",wrong:"Not quite",answerWas:"Correct answer:",done:"Lesson complete!",gained:"You earned",retry:"Try again",out:"You ran out of lives",outNote:"Review and try again.",back:"Back to the course",progress:"complete",mastery:"Mastery earned",masteryNote:"Complete 85% of the lessons to unlock the final exam.",exam:"Final exam",examNote:"20 questions. You need 85% to pass.",pass:"Passed! You have mastered this Bible.",fail:"Close! You need 85%.",score:"Your score",newBook:"New book",chapters:"chapters",read:"Read this book",review:"Review",
 g_law:"Law (Pentateuch)",g_history:"Historical books",g_wisdom:"Wisdom books",g_prophets:"Prophets",g_gospels:"Gospels and Acts",g_letters:"Letters",g_apoc:"Revelation",
 qSum:"Which book is this?",qCh:"How many chapters does {b} have?",qNext:"Which book comes right after {b} in this Bible?",qFill:"Complete the verse ({r})",qVerse:"Which book is this verse from?",qCanon:"Is {b} in the Protestant Bible?",qGroup:"Which part of the Bible does {b} belong to?",yes:"Yes",no:"No",locked:"Locked",onlyEsEn:"This section is available in Spanish and English."}
};

// Artículos de Salud, Deporte y Más. Cada cita se muestra con el texto de la Reina-Valera 1909 en español.
const ART={
health:[
 {t:["Ayuno y alimentación","Fasting and food"],r:["MAT 6:17-18"],b:[
  ["La tradición ortodoxa ayuna los miércoles y los viernes y en cuatro periodos del año, como la Gran Cuaresma antes de Pascua. Se dejan la carne, los lácteos y a veces el aceite y el vino, y se come de forma sencilla.","Orthodox tradition fasts on Wednesdays and Fridays and in four seasons of the year, such as Great Lent before Easter. Meat, dairy and sometimes oil and wine are set aside, and meals are kept simple."],
  ["El ayuno no es una dieta: busca dominar el apetito, orar más y compartir con quien lo necesita. Legumbres, verduras, cereales, fruta y frutos secos son la base de la mesa de ayuno.","Fasting is not a diet: it aims to master appetite, pray more and share with those in need. Pulses, vegetables, grains, fruit and nuts are the base of the fasting table."],
  ["Si estás embarazada, tienes una enfermedad o tomas medicación, consulta a tu médico y a tu sacerdote antes de ayunar: la Iglesia adapta el ayuno a cada persona.","If you are pregnant, ill or on medication, talk to your doctor and your priest before fasting: the Church adapts the fast to each person."]]},
 {t:["Descanso y sueño","Rest and sleep"],r:["MAR 6:31","PSA 4:8"],b:[
  ["Jesús invitó a sus discípulos a apartarse y descansar. El descanso también es cuidar el cuerpo que Dios nos ha dado.","Jesus invited his disciples to come away and rest. Rest is also a way of caring for the body God has given us."],
  ["Intenta acostarte a una hora parecida cada día, deja las pantallas un rato antes de dormir y termina el día con una oración breve.","Try to go to bed at a similar time every day, put screens away a while before sleeping and end the day with a short prayer."]]},
 {t:["Calma y oración","Calm and prayer"],r:["PHI 4:6-7","MAT 11:28"],b:[
  ["La Oración de Jesús («Señor Jesucristo, Hijo de Dios, ten piedad de mí») se reza despacio, al ritmo tranquilo de la respiración.","The Jesus Prayer (“Lord Jesus Christ, Son of God, have mercy on me”) is prayed slowly, at the calm pace of breathing."],
  ["Prueba cinco minutos al día: siéntate, respira hondo y repite la oración sin prisa. Si la ansiedad no se va, pide ayuda a un profesional.","Try five minutes a day: sit down, breathe deeply and repeat the prayer unhurriedly. If anxiety does not ease, ask a professional for help."]]}
],
sport:[
 {t:["El atleta de la fe","The athlete of faith"],r:["1CO 9:24-25","HEB 12:1"],b:[
  ["San Pablo compara la vida cristiana con una carrera: constancia, entrenamiento y la mirada puesta en la meta.","Saint Paul compares the Christian life to a race: perseverance, training and eyes fixed on the goal."],
  ["Hacer deporte con disciplina y humildad puede ser una escuela de virtudes: paciencia, esfuerzo y trabajo en equipo.","Playing sport with discipline and humility can be a school of virtue: patience, effort and teamwork."]]},
 {t:["Caminar y peregrinar","Walking and pilgrimage"],r:["ISA 40:31"],b:[
  ["Caminar es el ejercicio más sencillo y una antigua forma de oración. Muchos fieles peregrinan a pie a monasterios e iglesias.","Walking is the simplest exercise and an ancient form of prayer. Many faithful walk on pilgrimage to monasteries and churches."],
  ["Empieza con 20 o 30 minutos al día a paso cómodo. Puedes rezar o escuchar los Salmos mientras caminas.","Start with 20 to 30 minutes a day at a comfortable pace. You can pray or listen to the Psalms as you walk."]]},
 {t:["Cuerpo y alma","Body and soul"],r:["1TI 4:8","1CO 6:19-20"],b:[
  ["La Biblia valora el cuerpo como templo del Espíritu, pero pone la vida espiritual por delante del ejercicio físico.","The Bible values the body as a temple of the Spirit, but puts the spiritual life ahead of physical exercise."],
  ["Un buen equilibrio: moverse cada día, comer con moderación, descansar y dedicar tiempo a la oración.","A good balance: move every day, eat in moderation, rest and make time for prayer."]]}
],
more:[
 {t:["Familia y hogar","Family and home"],r:["ECC 4:9-10"],b:[
  ["En muchas casas ortodoxas hay un rincón de iconos con una lamparilla, donde la familia reza junta por la mañana o por la noche.","Many Orthodox homes have an icon corner with a small lamp, where the family prays together in the morning or evening."],
  ["Bendecir la mesa y leer juntos un pasaje corto son costumbres sencillas que unen a la familia.","Blessing the table and reading a short passage together are simple customs that bring a family closer."]]},
 {t:["Servir a los demás","Serving others"],r:["MAT 25:40"],b:[
  ["La fe se vive en la caridad: visitar a un enfermo, ayudar a un vecino o colaborar con tu parroquia.","Faith is lived in charity: visiting someone sick, helping a neighbour or volunteering with your parish."]]},
 {t:["Gratitud diaria","Daily gratitude"],r:["1TH 5:16-18","PRO 17:22"],b:[
  ["Antes de dormir, piensa en tres cosas por las que dar gracias hoy. San Juan Crisóstomo murió diciendo: «Gloria a Dios por todo».","Before sleeping, think of three things to give thanks for today. Saint John Chrysostom died saying: “Glory to God for all things”."]]}
]};
const ARTX={es:{verse:"Reina-Valera 1909",disc:"Contenido orientativo. No sustituye el consejo de un médico ni de un profesional de la salud.",health:"Salud y bienestar",sport:"Deporte y vida activa",more:"Familia, comunidad y más",lead_health:"Cuidar el cuerpo, templo del Espíritu, según la Biblia y la tradición.",lead_sport:"Moverse con disciplina, constancia y alegría.",lead_more:"Fe para el día a día."},
 en:{verse:"Reina-Valera 1909 (Spanish)",disc:"General guidance only. It does not replace advice from a doctor or health professional.",health:"Health and wellbeing",sport:"Sport and active life",more:"Family, community and more",lead_health:"Caring for the body, temple of the Spirit, according to the Bible and tradition.",lead_sport:"Moving with discipline, perseverance and joy.",lead_more:"Faith for everyday life."}};
