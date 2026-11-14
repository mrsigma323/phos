// Primeros pasos del curso (solo en español por ahora): cómo se organiza la Biblia, quién la escribió
// y qué tiene de propio la Biblia de cada Iglesia. Cada lección empieza con tarjetas para aprender
// y sigue con preguntas elegidas al azar entre muchas, en orden distinto cada vez.
// Formato de pregunta: [pregunta, correcta, mal1, mal2, mal3, explicación]
const BASIC={
 labels:{'intro:org':'Cómo es la Biblia','intro:aut':'Quién la escribió',intro:'Tu Biblia'},
 icons:{'intro:org':'📚','intro:aut':'✍️',intro:'i'},
 unit:'Primeros pasos',
 cards:{
  'intro:org':[
   ['📚','La Biblia es una biblioteca','La palabra «Biblia» viene del griego y significa «los libros». No es un solo libro, sino muchos, escritos a lo largo de más de mil años y reunidos por la Iglesia.'],
   ['📜','Dos grandes partes','El <b>Antiguo Testamento</b> cuenta la creación, la historia del pueblo de Israel y las promesas de Dios antes de Cristo. El <b>Nuevo Testamento</b> cuenta la vida de Jesús y de los primeros cristianos. {AT}'],
   ['🗂️','Grupos de libros','En el Antiguo Testamento: la <b>Ley</b> o Pentateuco (los 5 primeros libros), los <b>libros históricos</b>, los <b>sapienciales</b> (como los Salmos y los Proverbios) y los <b>profetas</b>.<br><br>En el Nuevo Testamento: los <b>4 Evangelios</b>, los <b>Hechos de los Apóstoles</b>, las <b>cartas</b> y el <b>Apocalipsis</b>.']],
  'intro:aut':[
   ['🕊️','Muchos autores, un mismo Espíritu','La Biblia la escribieron reyes, pastores, profetas, pescadores y hasta un médico. La Iglesia cree que todos escribieron inspirados por Dios.'],
   ['✍️','Los nombres que más vas a oír','Según la tradición:<br>• <b>Moisés</b>: los 5 primeros libros.<br>• <b>David</b>: muchos de los Salmos.<br>• <b>Salomón</b>: los Proverbios.<br>• <b>Mateo, Marcos, Lucas y Juan</b>: los cuatro Evangelios.<br>• <b>Lucas</b>: también los Hechos.<br>• <b>Pablo</b>: la mayoría de las cartas.<br>• <b>Juan</b>: el Apocalipsis.']]
 },
 at:{ortodoxa:'En la Biblia ortodoxa, el Antiguo Testamento tiene unos 49 libros y el Nuevo, 27.',catolica:'En la Biblia católica, el Antiguo Testamento tiene 46 libros y el Nuevo, 27: en total, 73.',protestante:'En la Biblia protestante, el Antiguo Testamento tiene 39 libros y el Nuevo, 27: en total, 66.'},
 brcard:{
  ortodoxa:['☦️','La Biblia de la Iglesia ortodoxa','Su Antiguo Testamento es la <b>Septuaginta</b>, la traducción griega que ya usaban los apóstoles. Incluye los libros «que se leen» (anagignóskomena), como Tobías, Judit, los Macabeos y el Salmo 151. El Nuevo Testamento se lee en griego, en el <b>texto patriarcal de 1904</b>.'],
  catolica:['⛪','La Biblia de la Iglesia católica','Tiene <b>73 libros</b>: 46 del Antiguo Testamento y 27 del Nuevo. Incluye los libros <b>deuterocanónicos</b>, como Tobías, Judit o Sabiduría. Su traducción latina clásica es la <b>Vulgata</b> de san Jerónimo, y el Concilio de Trento fijó su lista de libros en 1546.'],
  protestante:['📖','La Biblia de las Iglesias protestantes','Tiene <b>66 libros</b>: 39 del Antiguo Testamento, que sigue el canon hebreo, y 27 del Nuevo. Nació con la <b>Reforma</b> del siglo XVI. En español, la más conocida es la <b>Reina-Valera</b>: Casiodoro de Reina la publicó en 1569 y Cipriano de Valera la revisó en 1602.']
 },
 q:{
  'intro:org':[
   ["¿Qué significa la palabra «Biblia»?","«Los libros»","«La ley»","«La luz»","«El pueblo»","Viene del griego «ta biblía»: la Biblia es una biblioteca de muchos libros."],
   ["¿En cuántas grandes partes se divide la Biblia?","Dos: Antiguo y Nuevo Testamento","Tres","Cuatro","Siete","El Antiguo Testamento es anterior a Cristo; el Nuevo, sobre Jesús y la primera Iglesia."],
   ["¿Cuántos libros tiene el Nuevo Testamento?","27","39","12","46","Son 27 en las Biblias ortodoxa, católica y protestante."],
   ["¿Cuántos libros forman la Ley o Pentateuco?","5","4","7","10","Génesis, Éxodo, Levítico, Números y Deuteronomio. «Pentateuco» significa «cinco rollos»."],
   ["¿Cuál es el primer libro de la Biblia?","Génesis","Éxodo","Mateo","Salmos","Empieza con «En el principio creó Dios los cielos y la tierra»."],
   ["¿Cuál es el último libro de la Biblia?","Apocalipsis","Hechos","Malaquías","Judas","El Apocalipsis cierra la Biblia con la visión de la nueva Jerusalén."],
   ["¿Cuántos Evangelios hay en la Biblia?","4","3","5","12","Mateo, Marcos, Lucas y Juan."],
   ["¿Qué significa «Evangelio»?","Buena noticia","Libro sagrado","Ley de Dios","Profecía","Del griego «euangélion»: la buena noticia de Jesucristo."],
   ["¿Qué libro cuenta cómo vivió la primera Iglesia después de la Ascensión?","Hechos de los Apóstoles","Romanos","Apocalipsis","Génesis","Los Hechos narran Pentecostés y los viajes de los apóstoles, sobre todo de Pedro y Pablo."],
   ["¿A qué grupo de libros pertenecen los Salmos?","Sapienciales (poéticos)","La Ley","Los profetas","Los Evangelios","Junto con Job, Proverbios o Eclesiastés, son libros de oración y sabiduría."],
   ["¿En qué idiomas se escribió originalmente la Biblia?","Hebreo, arameo y griego","Latín","Árabe y sirio","Español","El Antiguo Testamento, sobre todo en hebreo (con partes en arameo y en griego); el Nuevo, en griego."],
   ["¿Qué cuenta sobre todo el Antiguo Testamento?","La creación, Israel y las promesas de Dios antes de Cristo","La vida de Jesús","Los viajes de san Pablo","El fin del mundo","El Nuevo Testamento es el que cuenta la vida de Jesús."],
   ["¿Qué viene en la Biblia justo después de los cuatro Evangelios?","Los Hechos de los Apóstoles","El Apocalipsis","Los Salmos","Génesis","Después vienen las cartas y, al final, el Apocalipsis."],
   ["¿Cuál de estos libros es un Evangelio?","Juan","Romanos","Isaías","Hebreos","Romanos y Hebreos son cartas; Isaías es un profeta."],
   ["¿Cuál de estos libros pertenece a los profetas?","Isaías","Levítico","Lucas","Proverbios","Isaías, Jeremías, Ezequiel y Daniel son los llamados profetas mayores."]],
  'intro:aut':[
   ["¿A quién atribuye la tradición los cinco primeros libros de la Biblia?","Moisés","Abraham","David","San Pablo","Por eso al Pentateuco también se le llama «los libros de Moisés»."],
   ["¿Qué rey compuso muchos de los Salmos?","David","Salomón","Saúl","Herodes","David era pastor, músico y rey de Israel. Otros salmos son de Asaf o de los hijos de Coré."],
   ["¿A qué rey sabio atribuye la tradición los Proverbios?","Salomón","David","Saúl","Josías","Salomón, hijo de David, pidió a Dios sabiduría para gobernar."],
   ["¿Quién escribió la mayoría de las cartas del Nuevo Testamento?","San Pablo","San Pedro","Santiago","San Juan","Pablo escribió a las Iglesias de Roma, Corinto, Éfeso y muchas más."],
   ["¿Qué evangelista era médico y escribió también los Hechos?","Lucas","Mateo","Marcos","Juan","San Pablo le llama «Lucas, el médico amado» (Colosenses 4, 14)."],
   ["¿Qué evangelista era recaudador de impuestos antes de seguir a Jesús?","Mateo","Lucas","Marcos","Juan","Jesús lo llamó cuando estaba sentado en su mesa de cobro (Mateo 9, 9)."],
   ["Según la tradición, Marcos escribió su Evangelio a partir de la predicación de…","San Pedro","San Juan","Santiago","San Andrés","Marcos acompañó a Pedro en Roma y puso por escrito lo que él predicaba."],
   ["¿Quién escribió el Apocalipsis, según la tradición?","San Juan, en la isla de Patmos","San Pablo, en Roma","San Pedro, en Jerusalén","San Lucas, en Antioquía","Juan cuenta que recibió la visión desterrado en Patmos (Apocalipsis 1, 9)."],
   ["¿Cuál de los cuatro evangelistas es «el discípulo amado»?","Juan","Mateo","Marcos","Lucas","Así se le llama en su propio Evangelio; estuvo al pie de la cruz con la Virgen María."],
   ["¿Durante cuánto tiempo, aproximadamente, se fue escribiendo la Biblia?","Más de mil años","Un año","Unos cien años","Diez años","Desde los tiempos antiguos de Israel hasta el final del siglo I después de Cristo."],
   ["¿Qué oficio tenían Pedro y Juan antes de seguir a Jesús?","Pescadores","Carpinteros","Médicos","Soldados","Jesús les dijo: «Os haré pescadores de hombres»."],
   ["¿Qué profeta anunció que una virgen daría a luz un hijo llamado Emmanuel?","Isaías","Jeremías","Jonás","Daniel","Está en Isaías 7, 14, y el Evangelio de Mateo lo aplica al nacimiento de Jesús."],
   ["¿A quién atribuye la tradición el libro de las Lamentaciones?","Jeremías","Isaías","David","Ezequiel","Lloran la destrucción de Jerusalén, que Jeremías vio con sus ojos."],
   ["¿Qué apóstol escribió dos cartas que llevan su nombre y fue el primero de los Doce?","San Pedro","San Mateo","San Felipe","San Tomás","Las cartas 1 Pedro y 2 Pedro están en el Nuevo Testamento."],
   ["¿Quién escribió la carta de Santiago?","Santiago, llamado «hermano del Señor»","Santiago el Mayor, hermano de Juan","San Pablo","San Lucas","La tradición la atribuye a Santiago, que guiaba la Iglesia de Jerusalén."]]
 },
 extra:{
  ortodoxa:[
   ["¿Qué significa «Septuaginta»?","«Setenta», por sus traductores según la tradición","«Siete libros»","«Palabra de Dios»","«Libro griego»","Según la tradición, unos setenta sabios judíos la tradujeron al griego."],
   ["¿En qué ciudad se tradujo la Septuaginta, según la tradición?","Alejandría","Roma","Atenas","Jerusalén","Alejandría, en Egipto, tenía una gran comunidad judía que hablaba griego."],
   ["¿Qué libro de la Biblia se reza más en los oficios ortodoxos?","Los Salmos","Levítico","Números","Ester","El Salterio se reza completo cada semana en los monasterios."],
   ["¿En qué idioma se escribió el Nuevo Testamento?","Griego","Latín","Hebreo","Eslavo eclesiástico","Por eso la Iglesia ortodoxa griega lo sigue leyendo en su lengua original."]],
  catolica:[
   ["¿Cuántos libros tiene el Antiguo Testamento católico?","46","39","27","50","Con los 27 del Nuevo, suman 73."],
   ["¿Hacia qué año tradujo san Jerónimo la Biblia al latín?","Hacia el año 400","Hacia el año 1200","En 1546","Hacia el año 50","Trabajó a finales del siglo IV y principios del V."],
   ["¿En qué ciudad vivió san Jerónimo mientras traducía gran parte de la Biblia?","Belén","Roma","Milán","Cartago","Vivió muchos años en Belén, junto al lugar donde nació Jesús."],
   ["¿Qué significa «Vulgata»?","«Divulgada», de uso común","«Verdadera»","«Antigua»","«Sagrada»","Era la traducción latina que leía todo el pueblo."]],
  protestante:[
   ["¿Cuántos libros tiene el Antiguo Testamento protestante?","39","46","27","49","Sigue el canon hebreo; con los 27 del Nuevo, suman 66."],
   ["¿Quién revisó en 1602 la Biblia de Casiodoro de Reina?","Cipriano de Valera","Martín Lutero","Juan Calvino","Erasmo de Rotterdam","Por eso se llama Reina-Valera."],
   ["¿A qué idioma tradujo Martín Lutero la Biblia?","Alemán","Inglés","Español","Latín","Su traducción ayudó a fijar el alemán moderno."],
   ["¿Por qué se llama «del Oso» la Biblia de 1569?","Por el grabado de un oso en su portada","Porque se imprimió en Osuna","Por su autor","Porque era muy pesada","En la portada aparece un oso comiendo miel de un panal."]]
 } ,
 // Preguntas sencillas para la primera unidad de libros (la Ley o Pentateuco), mezcladas con las demás
 books:{
  GEN:[["¿Con qué palabras empieza la Biblia?","«En el principio creó Dios los cielos y la tierra»","«Escucha, Israel»","«El Señor es mi pastor»","«En el principio era el Verbo»","Es Génesis 1, 1. «En el principio era el Verbo» es el comienzo del Evangelio de Juan."],
   ["¿Quién construyó el arca para salvarse del diluvio?","Noé","Abraham","Moisés","Adán","Dios le mandó construirla para su familia y para los animales (Génesis 6)."],
   ["¿A quién prometió Dios una descendencia tan numerosa como las estrellas?","Abraham","Noé","José","Jacob","Por eso Abraham es llamado «padre de los creyentes» (Génesis 15)."],
   ["¿Qué significa «Génesis»?","Origen, principio","Salida","Ley","Números","Cuenta el origen del mundo, de la humanidad y del pueblo de Israel."]],
  EXO:[["¿Quién guio al pueblo de Israel en la salida de Egipto?","Moisés","Abraham","Josué","David","«Éxodo» significa precisamente «salida»."],
   ["¿En qué monte recibió Moisés los Diez Mandamientos?","El monte Sinaí","El monte Carmelo","El monte de los Olivos","El monte Tabor","También se le llama monte Horeb (Éxodo 19 y 20)."],
   ["¿Qué mar se abrió para que pasara el pueblo de Israel?","El mar Rojo","El mar Muerto","El mar de Galilea","El mar Mediterráneo","Es uno de los grandes milagros de la salida de Egipto (Éxodo 14)."],
   ["¿Qué alimento envió Dios al pueblo en el desierto?","El maná","Pan de cebada","Higos","Peces","Caía cada mañana como un rocío blanco (Éxodo 16)."]],
  LEV:[["¿De qué trata sobre todo el Levítico?","Del culto, los sacrificios y la santidad","De la creación del mundo","De la vida de Jesús","De los viajes de san Pablo","Contiene las normas para los sacerdotes y para vivir como pueblo santo."],
   ["¿De qué tribu de Israel eran los sacerdotes y los levitas?","Leví","Judá","Benjamín","Efraín","De ahí viene el nombre del libro: Levítico."],
   ["¿Qué famoso mandamiento recoge el Levítico y repite Jesús?","«Amarás a tu prójimo como a ti mismo»","«No matarás»","«Honra a tu padre y a tu madre»","«Bienaventurados los pobres»","Está en Levítico 19, 18, y Jesús lo une al amor a Dios."]],
  NUM:[["¿Por qué se llama «Números» este libro?","Por los censos del pueblo que contiene","Porque enseña aritmética","Por sus muchos capítulos","Por las fechas de las fiestas","Empieza contando a las tribus de Israel en el desierto."],
   ["¿Cuántos años anduvo el pueblo de Israel por el desierto?","40","7","12","100","Números cuenta buena parte de ese largo camino hacia la tierra prometida."],
   ["¿Qué bendición, rezada todavía hoy, aparece en Números?","«El Señor te bendiga y te guarde»","«Padre nuestro que estás en el cielo»","«Dios te salve, María»","«Gloria a Dios en el cielo»","Es la bendición de Aarón (Números 6, 24-26)."]],
  DEU:[["¿Qué significa «Deuteronomio»?","Segunda ley","Libro de los reyes","Nuevo comienzo","Palabras de sabiduría","Moisés repite y explica la Ley antes de entrar en la tierra prometida."],
   ["¿Con qué palabras empieza la gran oración de Israel que recoge el Deuteronomio?","«Escucha, Israel»","«Alabad al Señor»","«Señor, ten piedad»","«Bendito el que viene»","«Escucha, Israel: el Señor es nuestro Dios, el Señor es uno» (Deuteronomio 6, 4)."],
   ["¿Cómo termina el Deuteronomio?","Con la muerte de Moisés, que ve de lejos la tierra prometida","Con la entrada en Jerusalén","Con el nacimiento de Jesús","Con el diluvio","Moisés murió en el monte Nebo; después guiaría al pueblo Josué."]]
 }
};
