// ---------- Contenido propio del nivel DIFÍCIL ----------
// Datos concretos y comprobados (números, nombres, capítulos), hechos más largos para ordenar y alguna trampa suave.
// Solo en español e inglés: en los demás idiomas se usan las preguntas generadas, ya traducidas.
// Por libro: h = [[pregunta, correcta, incorrecta×3, explicación]…]; o = [[hechos en orden], referencia]
const HARD={
es:{
GEN:{h:[["¿Cuántos años vivió Matusalén?","969","930","777","950","Génesis 5, 27: es la vida más larga de la Biblia."],["¿En qué capítulo del Génesis se cuenta la torre de Babel?","11","9","12","15","Génesis 11, 1-9."],["¿Cuántos hijos varones tuvo Jacob?","12","10","7","13","Génesis 35, 22-26: los padres de las doce tribus."]],o:[["La llamada de Abraham","El sacrificio de Isaac","Jacob y Esaú","José es vendido por sus hermanos","Jacob baja a Egipto"],"Génesis 12–46."]},
EXO:{h:[["¿Cuántos años vivieron los israelitas en Egipto, según Éxodo 12, 40?","430","400","40","215","Éxodo 12, 40."],["¿En qué capítulo del Éxodo están los diez mandamientos?","20","10","12","32","Éxodo 20 (y también Deuteronomio 5)."],["¿Cómo se llamaba el suegro de Moisés que le aconsejó nombrar jueces?","Jetró","Labán","Aarón","Jur","Éxodo 18."]],o:[["Moisés es salvado de las aguas del Nilo","La zarza ardiente","La primera Pascua","El paso del mar Rojo","El becerro de oro"],"Éxodo 2–32."]},
LEV:{h:[["¿Cada cuántos años se celebraba el año jubilar?","50","7","40","70","Levítico 25, 10."],["¿En qué capítulo del Levítico aparece «Amarás a tu prójimo como a ti mismo»?","19","16","23","26","Levítico 19, 18."]]},
NUM:{h:[["¿Qué animal le habló a Balaán?","Su asna","Una serpiente","Un cuervo","Un camello","Números 22, 28."],["¿Cuántos exploradores envió Moisés a Canaán?","12","2","7","40","Números 13: uno por cada tribu."],["¿Qué dos exploradores animaron al pueblo a entrar en la tierra?","Josué y Caleb","Aarón y Jur","Moisés y Aarón","Datán y Abirón","Números 14, 6-9."]]},
DEU:{h:[["¿Desde qué monte vio Moisés la tierra prometida?","El Nebo","El Sinaí","El Carmelo","El Tabor","Deuteronomio 34, 1."],["¿Cuántos años tenía Moisés al morir?","120","100","80","150","Deuteronomio 34, 7."]]},
JOS:{h:[["¿Cuántas vueltas dieron a Jericó el séptimo día?","7","1","3","12","Josué 6, 15: los seis días anteriores, una vuelta cada día."],["¿De qué color era el cordón que Rajab ató a la ventana?","Escarlata","Azul","Blanco","Dorado","Josué 2, 18."]]},
JDG:{h:[["¿Con cuántos hombres venció Gedeón a los madianitas?","300","3000","12","10 000","Jueces 7, 7."],["¿Quién mató a Sísara, el general de Jabín?","Yael","Débora","Barac","Dalila","Jueces 4, 21."]]},
RUT:{h:[["¿Cómo se llamaba el hijo de Rut y Booz?","Obed","Majlón","Elimélec","Salmón","Rut 4, 17: Obed fue el abuelo de David."]]},
"1SA":{h:[["¿Cuántas piedras cogió David del arroyo antes de enfrentarse a Goliat?","Cinco","Una","Tres","Siete","1 Samuel 17, 40."],["¿Con qué sacerdote creció Samuel en Siló?","Elí","Natán","Sadoc","Abiatar","1 Samuel 1–3."]],o:[["Nace Samuel","Saúl es ungido rey","David es ungido por Samuel","David vence a Goliat","Saúl muere en el monte Guilboa"],"1 Samuel 1–31."]},
"2SA":{h:[["¿Qué profeta reprendió a David por lo sucedido con Betsabé?","Natán","Elías","Samuel","Isaías","2 Samuel 12."],["¿Qué hijo de David se rebeló contra él?","Absalón","Salomón","Jonatán","Natán","2 Samuel 15."]]},
"1KI":{h:[["¿Cuántos profetas de Baal se enfrentaron a Elías en el Carmelo?","450","12","40","1000","1 Reyes 18, 22."],["¿Qué aves alimentaron a Elías junto al torrente de Querit?","Cuervos","Palomas","Águilas","Gorriones","1 Reyes 17, 6."]],o:[["Salomón pide sabiduría","Salomón construye el Templo","La reina de Saba visita a Salomón","El reino se divide","Elías en el monte Carmelo"],"1 Reyes 3–18."]},
"2KI":{h:[["¿Qué general sirio se curó de la lepra bañándose en el Jordán?","Naamán","Ben-Hadad","Jazael","Senaquerib","2 Reyes 5."],["¿Cuántas veces se bañó Naamán en el Jordán?","Siete","Una","Tres","Doce","2 Reyes 5, 14."]]},
EZR:{h:[["¿Qué rey persa permitió a los judíos volver a Jerusalén?","Ciro","Nabucodonosor","Asuero","Senaquerib","Esdras 1, 1-4."]]},
NEH:{h:[["¿En cuántos días se terminó la muralla de Jerusalén?","52","40","7","70","Nehemías 6, 15."]]},
EST:{h:[["¿Cómo se llamaba el primo que crio a Ester?","Mardoqueo","Amán","Asuero","Nehemías","Ester 2, 7."],["¿Qué fiesta judía recuerda la salvación del pueblo en tiempos de Ester?","Purim","Pascua","Pentecostés","Tabernáculos","Ester 9, 26."]]},
JOB:{h:[["¿Cuántos amigos fueron al principio a consolar a Job?","Tres","Dos","Siete","Doce","Job 2, 11: Elifaz, Bildad y Sofar."]]},
PSA:{h:[["¿Cómo está organizado el salmo más largo de la Biblia?","Por las letras del alfabeto hebreo","Por los días de la semana","Por las doce tribus","Por los meses del año","Salmo 119 (118 en la numeración griega): 22 estrofas, una por letra."]]},
PRO:{h:[["Según Proverbios, ¿cuál es el principio de la sabiduría?","El temor del Señor","La riqueza","La edad","El estudio","Proverbios 9, 10 (y 1, 7)."]]},
ECC:{h:[["¿Cómo se presenta el autor del Eclesiastés?","Hijo de David, rey en Jerusalén","Profeta de Israel","Sacerdote del Templo","Escriba en Babilonia","Eclesiastés 1, 1."]]},
ISA:{h:[["¿Con qué tocó el serafín los labios de Isaías?","Con una brasa","Con aceite","Con agua","Con una espada","Isaías 6, 6-7."],["¿Qué nombre se da al niño anunciado en Isaías 7, 14?","Emmanuel","Samuel","Ezequías","Jesé","Isaías 7, 14: «Dios con nosotros»."]]},
JER:{h:[["¿Dónde metieron a Jeremías para que muriera?","En una cisterna con barro","En el foso de los leones","En un horno","En una isla","Jeremías 38, 6."]]},
EZE:{h:[["¿Qué vio Ezequiel en el valle, que volvía a la vida?","Huesos secos","Árboles secos","Piedras","Estatuas","Ezequiel 37."]]},
DAN:{h:[["¿En el banquete de qué rey apareció la mano que escribía en la pared?","Baltasar","Nabucodonosor","Darío","Ciro","Daniel 5."],["¿Cuántos jóvenes fueron echados al horno de fuego?","Tres","Uno","Cuatro","Siete","Daniel 3: Sadrac, Mesac y Abed-nego."]],o:[["Daniel y sus amigos rechazan la comida del rey","Los tres jóvenes en el horno de fuego","La escritura en la pared","Daniel en el foso de los leones"],"Daniel 1–6."]},
HOS:{h:[["¿Con quién se casó Oseas por mandato de Dios?","Gómer","Rut","Mical","Jezabel","Oseas 1, 3."]]},
AMO:{h:[["¿A qué se dedicaba Amós antes de profetizar?","Era pastor y cultivaba higos","Era sacerdote","Era rey","Era escriba","Amós 7, 14."]]},
JON:{h:[["¿A qué ciudad envió Dios a Jonás?","Nínive","Tarsis","Babilonia","Jerusalén","Jonás 1, 2. A Tarsis es adonde intentó huir."],["¿Cuánto tiempo estuvo Jonás en el vientre del pez?","Tres días y tres noches","Siete días","Cuarenta días","Un día","Jonás 1, 17 (2, 1 en algunas Biblias)."]]},
MIC:{h:[["¿Qué ciudad anuncia Miqueas como lugar de nacimiento del Mesías?","Belén","Nazaret","Jerusalén","Hebrón","Miqueas 5, 2 (5, 1 en algunas Biblias)."]]},
MAL:{h:[["¿Qué profeta anuncia Malaquías que vendrá antes del día del Señor?","Elías","Moisés","Isaías","Samuel","Malaquías 4, 5 (3, 23 en algunas Biblias)."]]},
MAT:{h:[["¿Por cuántas monedas de plata entregó Judas a Jesús?","30","20","40","12","Mateo 26, 15."],["¿Cuántas generaciones cuenta Mateo desde Abraham hasta Cristo?","42 (tres veces catorce)","12","40","70","Mateo 1, 17."]],o:[["El bautismo en el Jordán","Las tentaciones en el desierto","El sermón de la montaña","La Transfiguración","La entrada en Jerusalén"],"Mateo 3–21."]},
MAR:{h:[["¿Cómo se llamaba el ciego de Jericó al que curó Jesús?","Bartimeo","Lázaro","Zaqueo","Jairo","Marcos 10, 46."]]},
LUK:{h:[["¿A quién dedica Lucas su Evangelio?","A Teófilo","A Timoteo","A Tito","A Filemón","Lucas 1, 3."],["¿Cómo se llamaba el padre de Juan el Bautista?","Zacarías","José","Simeón","Elí","Lucas 1, 5-13."]]},
JOH:{h:[["¿Cuántos peces sacaron en la pesca después de la resurrección?","153","100","144","12","Juan 21, 11."],["¿Cuál fue el primer signo de Jesús según Juan?","Convertir el agua en vino en Caná","Caminar sobre el agua","Resucitar a Lázaro","Multiplicar los panes","Juan 2, 11."]],o:[["Las bodas de Caná","Nicodemo visita a Jesús de noche","La resurrección de Lázaro","El lavatorio de los pies","La pesca en el lago después de la resurrección"],"Juan 2–21."]},
ACT:{h:[["¿En qué ciudad se llamó «cristianos» a los discípulos por primera vez?","Antioquía","Jerusalén","Roma","Éfeso","Hechos 11, 26."],["¿Quién sustituyó a Judas entre los Doce?","Matías","Bernabé","Esteban","Pablo","Hechos 1, 26."]],o:[["La Ascensión","Pentecostés","El martirio de Esteban","La conversión de Saulo","El concilio de Jerusalén","Pablo llega a Roma"],"Hechos 1–28."]},
ROM:{h:[["Según Romanos 6, 23, ¿cuál es la paga del pecado?","La muerte","La pobreza","La enfermedad","El olvido","Romanos 6, 23."]]},
"1CO":{h:[["¿Qué capítulo de 1 Corintios es el gran himno al amor?","13","3","11","15","1 Corintios 13."],["Según 1 Corintios 13, 13, ¿cuáles son las tres que permanecen?","Fe, esperanza y amor","Fe, paz y alegría","Verdad, justicia y amor","Oración, ayuno y limosna","1 Corintios 13, 13."]]},
"2CO":{h:[["¿Cuántas veces dice Pablo que recibió de los judíos «cuarenta azotes menos uno»?","Cinco","Tres","Siete","Una","2 Corintios 11, 24."]]},
GAL:{h:[["¿Cuántos años pasaron hasta que Pablo subió a Jerusalén a conocer a Pedro?","Tres","Uno","Siete","Catorce","Gálatas 1, 18."]]},
EPH:{h:[["En la armadura de Dios, ¿qué es «la palabra de Dios»?","La espada del Espíritu","El escudo de la fe","El casco de la salvación","La coraza de la justicia","Efesios 6, 17."]]},
PHI:{h:[["¿Qué compañero de Pablo estuvo enfermo a punto de morir?","Epafrodito","Onésimo","Tíquico","Silas","Filipenses 2, 25-27."]]},
COL:{h:[["¿A quién llama Pablo «el médico querido»?","A Lucas","A Marcos","A Tito","A Demas","Colosenses 4, 14."]]},
"1TH":{h:[["¿A quién envió Pablo a Tesalónica para animar a la comunidad?","A Timoteo","A Tito","A Apolo","A Bernabé","1 Tesalonicenses 3, 2."]]},
"2TI":{h:[["¿Cómo se llamaban la abuela y la madre de Timoteo?","Loida y Eunice","Marta y María","Ana e Isabel","Priscila y Lidia","2 Timoteo 1, 5."]]},
PHM:{h:[["¿Por qué esclavo intercede Pablo en esta carta?","Onésimo","Tíquico","Epafras","Demas","Filemón 10."]]},
HEB:{h:[["¿Según qué orden es Cristo sacerdote, según Hebreos?","El de Melquisedec","El de Aarón","El de Leví","El de David","Hebreos 5–7."]]},
JAM:{h:[["¿Qué profeta pone Santiago como ejemplo de oración eficaz?","Elías","Jonás","Jeremías","Daniel","Santiago 5, 17."]]},
"2PE":{h:[["Según 2 Pedro, para el Señor un día es como…","Mil años","Cien años","Una hora","Siete años","2 Pedro 3, 8."]]},
JUD:{h:[["¿Qué arcángel disputó con el diablo por el cuerpo de Moisés?","Miguel","Gabriel","Rafael","Uriel","Judas 9."]]},
REV:{h:[["¿Cuál es la última de las siete iglesias a las que se escribe en el Apocalipsis?","Laodicea","Éfeso","Esmirna","Corinto","Apocalipsis 3, 14."],["¿Cuántas puertas tiene la nueva Jerusalén?","12","7","4","24","Apocalipsis 21, 12."]],o:[["Las cartas a las siete iglesias","Los siete sellos","Las siete trompetas","La nueva Jerusalén"],"Apocalipsis 2–21."]}},
en:{
GEN:{h:[["How many years did Methuselah live?","969","930","777","950","Genesis 5:27: the longest life in the Bible."],["In which chapter of Genesis is the tower of Babel?","11","9","12","15","Genesis 11:1-9."],["How many sons did Jacob have?","12","10","7","13","Genesis 35:22-26: the fathers of the twelve tribes."]],o:[["The call of Abraham","The sacrifice of Isaac","Jacob and Esau","Joseph is sold by his brothers","Jacob goes down to Egypt"],"Genesis 12–46."]},
EXO:{h:[["How long did the Israelites live in Egypt, according to Exodus 12:40?","430 years","400 years","40 years","215 years","Exodus 12:40."],["In which chapter of Exodus are the Ten Commandments?","20","10","12","32","Exodus 20 (and also Deuteronomy 5)."],["What was the name of Moses' father-in-law, who advised him to appoint judges?","Jethro","Laban","Aaron","Hur","Exodus 18."]],o:[["Moses is saved from the Nile","The burning bush","The first Passover","The crossing of the Red Sea","The golden calf"],"Exodus 2–32."]},
LEV:{h:[["Every how many years was the year of jubilee?","50","7","40","70","Leviticus 25:10."],["In which chapter of Leviticus is «Love your neighbour as yourself»?","19","16","23","26","Leviticus 19:18."]]},
NUM:{h:[["Which animal spoke to Balaam?","His donkey","A serpent","A raven","A camel","Numbers 22:28."],["How many spies did Moses send into Canaan?","12","2","7","40","Numbers 13: one from each tribe."],["Which two spies urged the people to enter the land?","Joshua and Caleb","Aaron and Hur","Moses and Aaron","Dathan and Abiram","Numbers 14:6-9."]]},
DEU:{h:[["From which mountain did Moses see the promised land?","Mount Nebo","Mount Sinai","Mount Carmel","Mount Tabor","Deuteronomy 34:1."],["How old was Moses when he died?","120","100","80","150","Deuteronomy 34:7."]]},
JOS:{h:[["How many times did they march around Jericho on the seventh day?","7","1","3","12","Joshua 6:15: on the six days before, once a day."],["What colour was the cord Rahab tied in the window?","Scarlet","Blue","White","Gold","Joshua 2:18."]]},
JDG:{h:[["With how many men did Gideon defeat the Midianites?","300","3,000","12","10,000","Judges 7:7."],["Who killed Sisera, Jabin's general?","Jael","Deborah","Barak","Delilah","Judges 4:21."]]},
RUT:{h:[["What was the name of the son of Ruth and Boaz?","Obed","Mahlon","Elimelech","Salmon","Ruth 4:17: Obed was David's grandfather."]]},
"1SA":{h:[["How many stones did David take from the brook before facing Goliath?","Five","One","Three","Seven","1 Samuel 17:40."],["With which priest did Samuel grow up at Shiloh?","Eli","Nathan","Zadok","Abiathar","1 Samuel 1–3."]],o:[["Samuel is born","Saul is anointed king","David is anointed by Samuel","David defeats Goliath","Saul dies on Mount Gilboa"],"1 Samuel 1–31."]},
"2SA":{h:[["Which prophet rebuked David over Bathsheba?","Nathan","Elijah","Samuel","Isaiah","2 Samuel 12."],["Which of David's sons rebelled against him?","Absalom","Solomon","Jonathan","Nathan","2 Samuel 15."]]},
"1KI":{h:[["How many prophets of Baal faced Elijah on Mount Carmel?","450","12","40","1,000","1 Kings 18:22."],["Which birds fed Elijah by the brook Cherith?","Ravens","Doves","Eagles","Sparrows","1 Kings 17:6."]],o:[["Solomon asks for wisdom","Solomon builds the Temple","The queen of Sheba visits Solomon","The kingdom is divided","Elijah on Mount Carmel"],"1 Kings 3–18."]},
"2KI":{h:[["Which Syrian general was healed of leprosy by bathing in the Jordan?","Naaman","Ben-hadad","Hazael","Sennacherib","2 Kings 5."],["How many times did Naaman dip in the Jordan?","Seven","Once","Three","Twelve","2 Kings 5:14."]]},
EZR:{h:[["Which Persian king allowed the Jews to return to Jerusalem?","Cyrus","Nebuchadnezzar","Ahasuerus","Sennacherib","Ezra 1:1-4."]]},
NEH:{h:[["In how many days was the wall of Jerusalem finished?","52","40","7","70","Nehemiah 6:15."]]},
EST:{h:[["What was the name of the cousin who brought up Esther?","Mordecai","Haman","Ahasuerus","Nehemiah","Esther 2:7."],["Which Jewish feast remembers the deliverance of the people in Esther's time?","Purim","Passover","Pentecost","Tabernacles","Esther 9:26."]]},
JOB:{h:[["How many friends first came to comfort Job?","Three","Two","Seven","Twelve","Job 2:11: Eliphaz, Bildad and Zophar."]]},
PSA:{h:[["How is the longest psalm in the Bible arranged?","By the letters of the Hebrew alphabet","By the days of the week","By the twelve tribes","By the months of the year","Psalm 119 (118 in the Greek numbering): 22 stanzas, one for each letter."]]},
PRO:{h:[["According to Proverbs, what is the beginning of wisdom?","The fear of the Lord","Wealth","Old age","Study","Proverbs 9:10 (and 1:7)."]]},
ECC:{h:[["How does the author of Ecclesiastes introduce himself?","Son of David, king in Jerusalem","A prophet of Israel","A priest of the Temple","A scribe in Babylon","Ecclesiastes 1:1."]]},
ISA:{h:[["With what did the seraph touch Isaiah's lips?","A burning coal","Oil","Water","A sword","Isaiah 6:6-7."],["What name is given to the child announced in Isaiah 7:14?","Immanuel","Samuel","Hezekiah","Jesse","Isaiah 7:14: «God with us»."]]},
JER:{h:[["Where was Jeremiah put so that he would die?","In a muddy cistern","In the lions' den","In a furnace","On an island","Jeremiah 38:6."]]},
EZE:{h:[["What did Ezekiel see in the valley coming back to life?","Dry bones","Dry trees","Stones","Statues","Ezekiel 37."]]},
DAN:{h:[["At which king's feast did the hand appear writing on the wall?","Belshazzar","Nebuchadnezzar","Darius","Cyrus","Daniel 5."],["How many young men were thrown into the fiery furnace?","Three","One","Four","Seven","Daniel 3: Shadrach, Meshach and Abednego."]],o:[["Daniel and his friends refuse the king's food","The three young men in the fiery furnace","The writing on the wall","Daniel in the lions' den"],"Daniel 1–6."]},
HOS:{h:[["Whom did Hosea marry at God's command?","Gomer","Ruth","Michal","Jezebel","Hosea 1:3."]]},
AMO:{h:[["What did Amos do before he prophesied?","He was a herdsman and tended fig trees","He was a priest","He was a king","He was a scribe","Amos 7:14."]]},
JON:{h:[["To which city did God send Jonah?","Nineveh","Tarshish","Babylon","Jerusalem","Jonah 1:2. Tarshish is where he tried to flee."],["How long was Jonah in the belly of the fish?","Three days and three nights","Seven days","Forty days","One day","Jonah 1:17 (2:1 in some Bibles)."]]},
MIC:{h:[["Which town does Micah announce as the birthplace of the Messiah?","Bethlehem","Nazareth","Jerusalem","Hebron","Micah 5:2 (5:1 in some Bibles)."]]},
MAL:{h:[["Which prophet does Malachi say will come before the day of the Lord?","Elijah","Moses","Isaiah","Samuel","Malachi 4:5 (3:23 in some Bibles)."]]},
MAT:{h:[["For how many pieces of silver did Judas hand Jesus over?","30","20","40","12","Matthew 26:15."],["How many generations does Matthew count from Abraham to Christ?","42 (three times fourteen)","12","40","70","Matthew 1:17."]],o:[["The baptism in the Jordan","The temptations in the desert","The Sermon on the Mount","The Transfiguration","The entry into Jerusalem"],"Matthew 3–21."]},
MAR:{h:[["What was the name of the blind man of Jericho whom Jesus healed?","Bartimaeus","Lazarus","Zacchaeus","Jairus","Mark 10:46."]]},
LUK:{h:[["To whom does Luke dedicate his Gospel?","Theophilus","Timothy","Titus","Philemon","Luke 1:3."],["What was the name of John the Baptist's father?","Zechariah","Joseph","Simeon","Eli","Luke 1:5-13."]]},
JOH:{h:[["How many fish did they catch after the resurrection?","153","100","144","12","John 21:11."],["What was Jesus' first sign according to John?","Turning water into wine at Cana","Walking on the water","Raising Lazarus","Multiplying the loaves","John 2:11."]],o:[["The wedding at Cana","Nicodemus visits Jesus by night","The raising of Lazarus","The washing of the feet","The catch of fish after the resurrection"],"John 2–21."]},
ACT:{h:[["In which city were the disciples first called «Christians»?","Antioch","Jerusalem","Rome","Ephesus","Acts 11:26."],["Who replaced Judas among the Twelve?","Matthias","Barnabas","Stephen","Paul","Acts 1:26."]],o:[["The Ascension","Pentecost","The martyrdom of Stephen","The conversion of Saul","The Council of Jerusalem","Paul arrives in Rome"],"Acts 1–28."]},
ROM:{h:[["According to Romans 6:23, what are the wages of sin?","Death","Poverty","Illness","Oblivion","Romans 6:23."]]},
"1CO":{h:[["Which chapter of 1 Corinthians is the great hymn to love?","13","3","11","15","1 Corinthians 13."],["According to 1 Corinthians 13:13, which three remain?","Faith, hope and love","Faith, peace and joy","Truth, justice and love","Prayer, fasting and almsgiving","1 Corinthians 13:13."]]},
"2CO":{h:[["How many times does Paul say he received «forty lashes less one» from the Jews?","Five","Three","Seven","Once","2 Corinthians 11:24."]]},
GAL:{h:[["How many years passed before Paul went up to Jerusalem to meet Peter?","Three","One","Seven","Fourteen","Galatians 1:18."]]},
EPH:{h:[["In the armour of God, what is «the word of God»?","The sword of the Spirit","The shield of faith","The helmet of salvation","The breastplate of righteousness","Ephesians 6:17."]]},
PHI:{h:[["Which companion of Paul was ill and close to death?","Epaphroditus","Onesimus","Tychicus","Silas","Philippians 2:25-27."]]},
COL:{h:[["Whom does Paul call «the beloved physician»?","Luke","Mark","Titus","Demas","Colossians 4:14."]]},
"1TH":{h:[["Whom did Paul send to Thessalonica to encourage the community?","Timothy","Titus","Apollos","Barnabas","1 Thessalonians 3:2."]]},
"2TI":{h:[["What were the names of Timothy's grandmother and mother?","Lois and Eunice","Martha and Mary","Anna and Elizabeth","Priscilla and Lydia","2 Timothy 1:5."]]},
PHM:{h:[["For which slave does Paul plead in this letter?","Onesimus","Tychicus","Epaphras","Demas","Philemon 10."]]},
HEB:{h:[["According to Hebrews, after which order is Christ a priest?","The order of Melchizedek","The order of Aaron","The order of Levi","The order of David","Hebrews 5–7."]]},
JAM:{h:[["Which prophet does James give as an example of effective prayer?","Elijah","Jonah","Jeremiah","Daniel","James 5:17."]]},
"2PE":{h:[["According to 2 Peter, with the Lord one day is like…","A thousand years","A hundred years","One hour","Seven years","2 Peter 3:8."]]},
JUD:{h:[["Which archangel disputed with the devil about the body of Moses?","Michael","Gabriel","Raphael","Uriel","Jude 9."]]},
REV:{h:[["Which is the last of the seven churches written to in Revelation?","Laodicea","Ephesus","Smyrna","Corinth","Revelation 3:14."],["How many gates does the new Jerusalem have?","12","7","4","24","Revelation 21:12."]],o:[["The letters to the seven churches","The seven seals","The seven trumpets","The new Jerusalem"],"Revelation 2–21."]}}};
// Trampas suaves del nivel Difícil (traducidas a todos los idiomas en tr_*.js)
const HTRAPS={es:[["Según la Biblia, ¿cuál es la raíz de todos los males?","El amor al dinero",["El dinero","La pereza","El orgullo"],"1 Timoteo 6, 10 no dice «el dinero», sino «el amor al dinero»."],["Según Lucas, ¿qué edad tenía Jesús al empezar su ministerio?","Unos treinta años",["33 años exactos","Doce años","Cuarenta años"],"Lucas 3, 23 dice «unos treinta años»; los 33 son el cálculo tradicional al morir."],["¿Qué libro de la Biblia dice «Dios no te dará más de lo que puedas soportar»?","Ninguno lo dice así",["1 Corintios","Salmos","Proverbios"],"1 Corintios 10, 13 habla de que Dios no permite una tentación superior a nuestras fuerzas."]],
 en:[["According to the Bible, what is the root of all evil?","The love of money",["Money","Laziness","Pride"],"1 Timothy 6:10 does not say «money» but «the love of money»."],["According to Luke, how old was Jesus when he began his ministry?","About thirty",["Exactly 33","Twelve","Forty"],"Luke 3:23 says «about thirty years of age»; 33 is the traditional age at his death."],["Which book of the Bible says «God won't give you more than you can handle»?","None says it like that",["1 Corinthians","Psalms","Proverbs"],"1 Corinthians 10:13 says God will not let us be tempted beyond our strength."]]};

function hardHand(br,c){
 const H=(HARD[CL()]||{})[c]||{},out=[];
 (H.h||[]).forEach(q=>out.push(mcq(q[0],q[1],q.slice(2,5),undefined,q[5])));
 if(H.o)out.push({type:'order',prompt:nmt('ord',{b:bname(c)}),items:H.o[0].slice(),answer:H.o[0].slice()});
 return out.map(q=>{q.wk=c;q.wbr=br;q.lvl='hard';return q});
}
// Mezcla las preguntas propias (hasta 3) con las del generador de siempre en nivel Difícil
const _buildLessonN3=buildLesson;
buildLesson=function(br,id){
 const r=_buildLessonN3.apply(this,arguments);
 if(lv()!=='hard'||!Array.isArray(r)||/^(intro|exam)/.test(id))return r;
 try{
  let books=[id];if(/^(rev|ex):/.test(id)){const u=courseUnits(br)[+id.split(':')[1]];books=u?u.books:[]}
  const hand=pickFresh(br,'h:'+id,shuffle(books.flatMap(c=>hardHand(br,c))),/^ex:/.test(id)?4:3);if(!hand.length)return r;
  const head=r.filter(x=>x.type==='card'),rest=r.filter(x=>x.type!=='card'),n=rest.length;
  const sig=new Set(hand.map(qSig));const keep=rest.filter(x=>!sig.has(qSig(x))).slice(0,Math.max(0,n-hand.length));
  return head.concat(shuffle(keep.concat(hand)));
 }catch(e){return r}
};
// Trampas suaves en Difícil: posiciones 4 y 10 del curso
const _maybeTrapH=maybeTrap;
maybeTrap=function(){
 if(lv()!=='hard')return _maybeTrapH();
 if(!/^(ortodoxa|catolica|protestante)$/.test(LS.br)||/^(exam|ex:|rev:|intro)/.test(LS.id))return;
 const all=courseUnits(LS.br).flatMap(u=>u.lessons).filter(x=>!/^(intro|rev:|ex:|exam)/.test(x)),pos=all.indexOf(LS.id);if(pos!==4&&pos!==10)return;
 const T=store.get('traps',{}),key='h:'+LS.br+':'+pos;if(T[key])return;
 const tr=(HTRAPS[LANG]||HTRAPS.en)[(LS.br.length+pos)%3];
 LS.items.splice(Math.min(LS.items.length,3),0,{type:'mcq',prompt:lt('trap')+' · '+trB(tr[0]),options:shuffle([trB(tr[1])].concat(tr[2].map(trB))),answer:trB(tr[1]),why:trB(tr[3]),trap:key});
};
