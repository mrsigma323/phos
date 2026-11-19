// ===== Plan de lectura (Premium): sección propia con calendario, progreso por libro y recordatorios =====
// Datos: store 'lect' = {id, ed, wd:[días 0-6], start:'AAAA-MM-DD', base, time, rem, books, per}
//        store 'plans'[id] = {done:[índices], at:{índice:'AAAA-MM-DD'}}  ·  store 'readChs' = {LIBRO:[capítulos]}
const LCX={
es:{nextR:'Próxima lectura',sec:'Plan de lectura',lead:'Tu calendario para leer la Biblia, a tu ritmo y en los días que tú elijas.',
 t1:'Elige qué leer: toda la Biblia, el Nuevo Testamento, los Evangelios, los Salmos o los libros que quieras',t2:'Un calendario con tus días de lectura: lo leído, lo previsto y lo pendiente',t3:'Marca cada capítulo y mira cuánto llevas de cada libro',t4:'Un aviso solo los días que elijas, a la hora de tu oración',
 unlock:'Desbloquear con Premium',create:'Crear mi plan',intro:'Elige qué quieres leer, qué días y a qué hora te lo recordamos.',
 today:'Lectura de hoy',late:'Vas {n} lecturas por detrás.',fix:'Reajustar el calendario desde hoy',ontrack:'Vas al día.',rest:'Hoy no te toca leer. Te toca el {d}, pero puedes adelantarla.',
 read:'✓ Lo he leído',doneToday:'¡Lectura completada!',session:'Lectura {n} de {t}',cal:'Calendario',lDone:'Leído',lPlan:'Previsto',lMiss:'Pendiente',
 prog:'Mi progreso',progL:'Capítulos y libros que has leído',set:'Ajustes del plan',setL:'Plan, Biblia, días, hora y aviso',
 what:'Qué quieres leer',nt:'Nuevo Testamento',custom:'A mi medida: elige los libros',books:'Libros',per:'Capítulos por lectura',bible:'Biblia',
 days:'Qué días lees',from:'Empezar el',rem:'Avisarme esos días',time:'Hora del aviso',remL:'Elige una hora que encaje con tu oración o tu meditación.',
 sum:'{n} lecturas · terminarás hacia el {d}',save:'Guardar el plan',saved:'Plan guardado',needDay:'Elige al menos un día.',needBook:'Elige al menos un libro.',
 bookReset:'Si cambias los libros o los capítulos por lectura, este plan vuelve a empezar.',sessions:'{n} lecturas',
 chRead:'capítulos leídos',bkDone:'libros completos',ofBible:'{p} % de esta Biblia',ot:'Antiguo Testamento',ntT:'Nuevo Testamento',
 markCh:'✓ Marcar el capítulo como leído',unmarkCh:'Capítulo leído · quitar la marca',markBook:'Marcar el libro entero',unmarkBook:'Quitar todas las marcas',
 finished:'¡Plan terminado! Que la Palabra siga dando fruto en ti.',again:'Empezar otro plan',nT:'Plan de lectura',nLate:'pendiente',
 tapDay:'Toca un día para ver su lectura.',none:'Sin lectura este día.',lateTag:'atrasada'},
en:{nextR:'Next reading',sec:'Reading plan',lead:'Your calendar for reading the Bible, at your pace and on the days you choose.',
 t1:'Choose what to read: the whole Bible, the New Testament, the Gospels, the Psalms or the books you want',t2:'A calendar with your reading days: read, planned and pending',t3:'Mark each chapter and see how far you are in every book',t4:'A reminder only on the days you choose, at your prayer time',
 unlock:'Unlock with Premium',create:'Create my plan',intro:'Choose what to read, on which days and when we remind you.',
 today:'Today’s reading',late:'You are {n} readings behind.',fix:'Reset the calendar from today',ontrack:'You are on track.',rest:'No reading today. It is due on {d}, but you can read it early.',
 read:'✓ I have read it',doneToday:'Reading completed!',session:'Reading {n} of {t}',cal:'Calendar',lDone:'Read',lPlan:'Planned',lMiss:'Pending',
 prog:'My progress',progL:'Chapters and books you have read',set:'Plan settings',setL:'Plan, Bible, days, time and reminder',
 what:'What do you want to read',nt:'New Testament',custom:'My own: choose the books',books:'Books',per:'Chapters per reading',bible:'Bible',
 days:'Reading days',from:'Start on',rem:'Remind me on those days',time:'Reminder time',remL:'Pick a time that fits your prayer or meditation.',
 sum:'{n} readings · you will finish around {d}',save:'Save plan',saved:'Plan saved',needDay:'Choose at least one day.',needBook:'Choose at least one book.',
 bookReset:'If you change the books or the chapters per reading, this plan starts again.',sessions:'{n} readings',
 chRead:'chapters read',bkDone:'books finished',ofBible:'{p}% of this Bible',ot:'Old Testament',ntT:'New Testament',
 markCh:'✓ Mark chapter as read',unmarkCh:'Chapter read · remove mark',markBook:'Mark the whole book',unmarkBook:'Remove all marks',
 finished:'Plan finished! May the Word keep bearing fruit in you.',again:'Start another plan',nT:'Reading plan',nLate:'pending',
 tapDay:'Tap a day to see its reading.',none:'No reading on this day.',lateTag:'overdue'},
pt:{nextR:'Próxima leitura',sec:'Plano de leitura',lead:'O seu calendário para ler a Bíblia, ao seu ritmo e nos dias que escolher.',
 t1:'Escolha o que ler: toda a Bíblia, o Novo Testamento, os Evangelhos, os Salmos ou os livros que quiser',t2:'Um calendário com os seus dias de leitura: lido, previsto e pendente',t3:'Marque cada capítulo e veja quanto já leu de cada livro',t4:'Um aviso só nos dias que escolher, à hora da sua oração',
 unlock:'Desbloquear com Premium',create:'Criar o meu plano',intro:'Escolha o que quer ler, em que dias e a que horas o lembramos.',
 today:'Leitura de hoje',late:'Está {n} leituras atrasado.',fix:'Reajustar o calendário a partir de hoje',ontrack:'Está em dia.',rest:'Hoje não há leitura. Está prevista para {d}, mas pode adiantá-la.',
 read:'✓ Já li',doneToday:'Leitura concluída!',session:'Leitura {n} de {t}',cal:'Calendário',lDone:'Lido',lPlan:'Previsto',lMiss:'Pendente',
 prog:'O meu progresso',progL:'Capítulos e livros que já leu',set:'Definições do plano',setL:'Plano, Bíblia, dias, hora e aviso',
 what:'O que quer ler',nt:'Novo Testamento',custom:'À minha medida: escolha os livros',books:'Livros',per:'Capítulos por leitura',bible:'Bíblia',
 days:'Dias de leitura',from:'Começar em',rem:'Avisar-me nesses dias',time:'Hora do aviso',remL:'Escolha uma hora que combine com a sua oração ou meditação.',
 sum:'{n} leituras · terminará por volta de {d}',save:'Guardar o plano',saved:'Plano guardado',needDay:'Escolha pelo menos um dia.',needBook:'Escolha pelo menos um livro.',
 bookReset:'Se mudar os livros ou os capítulos por leitura, este plano recomeça.',sessions:'{n} leituras',
 chRead:'capítulos lidos',bkDone:'livros completos',ofBible:'{p} % desta Bíblia',ot:'Antigo Testamento',ntT:'Novo Testamento',
 markCh:'✓ Marcar o capítulo como lido',unmarkCh:'Capítulo lido · tirar a marca',markBook:'Marcar o livro inteiro',unmarkBook:'Tirar todas as marcas',
 finished:'Plano terminado! Que a Palavra continue a dar fruto em si.',again:'Começar outro plano',nT:'Plano de leitura',nLate:'pendente',
 tapDay:'Toque num dia para ver a leitura.',none:'Sem leitura neste dia.',lateTag:'atrasada'},
fr:{nextR:'Prochaine lecture',sec:'Plan de lecture',lead:'Votre calendrier pour lire la Bible, à votre rythme et les jours de votre choix.',
 t1:'Choisissez quoi lire : toute la Bible, le Nouveau Testament, les Évangiles, les Psaumes ou les livres de votre choix',t2:'Un calendrier avec vos jours de lecture : lu, prévu et en attente',t3:'Cochez chaque chapitre et voyez où vous en êtes dans chaque livre',t4:'Un rappel seulement les jours choisis, à l’heure de votre prière',
 unlock:'Débloquer avec Premium',create:'Créer mon plan',intro:'Choisissez quoi lire, quels jours et à quelle heure nous vous le rappelons.',
 today:'Lecture du jour',late:'Vous avez {n} lectures de retard.',fix:'Réajuster le calendrier à partir d’aujourd’hui',ontrack:'Vous êtes à jour.',rest:'Pas de lecture aujourd’hui. Elle est prévue le {d}, mais vous pouvez la lire en avance.',
 read:'✓ Je l’ai lu',doneToday:'Lecture terminée !',session:'Lecture {n} sur {t}',cal:'Calendrier',lDone:'Lu',lPlan:'Prévu',lMiss:'En attente',
 prog:'Ma progression',progL:'Chapitres et livres que vous avez lus',set:'Réglages du plan',setL:'Plan, Bible, jours, heure et rappel',
 what:'Que voulez-vous lire',nt:'Nouveau Testament',custom:'Sur mesure : choisissez les livres',books:'Livres',per:'Chapitres par lecture',bible:'Bible',
 days:'Jours de lecture',from:'Commencer le',rem:'Me le rappeler ces jours-là',time:'Heure du rappel',remL:'Choisissez une heure qui s’accorde avec votre prière ou votre méditation.',
 sum:'{n} lectures · vous finirez vers le {d}',save:'Enregistrer le plan',saved:'Plan enregistré',needDay:'Choisissez au moins un jour.',needBook:'Choisissez au moins un livre.',
 bookReset:'Si vous changez les livres ou les chapitres par lecture, ce plan recommence.',sessions:'{n} lectures',
 chRead:'chapitres lus',bkDone:'livres terminés',ofBible:'{p} % de cette Bible',ot:'Ancien Testament',ntT:'Nouveau Testament',
 markCh:'✓ Marquer le chapitre comme lu',unmarkCh:'Chapitre lu · retirer la marque',markBook:'Marquer tout le livre',unmarkBook:'Retirer toutes les marques',
 finished:'Plan terminé ! Que la Parole continue de porter du fruit en vous.',again:'Commencer un autre plan',nT:'Plan de lecture',nLate:'en attente',
 tapDay:'Touchez un jour pour voir sa lecture.',none:'Pas de lecture ce jour-là.',lateTag:'en retard'},
it:{nextR:'Prossima lettura',sec:'Piano di lettura',lead:'Il tuo calendario per leggere la Bibbia, al tuo ritmo e nei giorni che scegli.',
 t1:'Scegli cosa leggere: tutta la Bibbia, il Nuovo Testamento, i Vangeli, i Salmi o i libri che vuoi',t2:'Un calendario con i tuoi giorni di lettura: letto, previsto e in sospeso',t3:'Segna ogni capitolo e guarda a che punto sei in ogni libro',t4:'Un avviso solo nei giorni che scegli, all’ora della tua preghiera',
 unlock:'Sblocca con Premium',create:'Crea il mio piano',intro:'Scegli cosa leggere, in quali giorni e a che ora te lo ricordiamo.',
 today:'Lettura di oggi',late:'Sei indietro di {n} letture.',fix:'Riadatta il calendario da oggi',ontrack:'Sei in pari.',rest:'Oggi niente lettura. È prevista per {d}, ma puoi anticiparla.',
 read:'✓ L’ho letto',doneToday:'Lettura completata!',session:'Lettura {n} di {t}',cal:'Calendario',lDone:'Letto',lPlan:'Previsto',lMiss:'In sospeso',
 prog:'I miei progressi',progL:'Capitoli e libri che hai letto',set:'Impostazioni del piano',setL:'Piano, Bibbia, giorni, ora e avviso',
 what:'Cosa vuoi leggere',nt:'Nuovo Testamento',custom:'Su misura: scegli i libri',books:'Libri',per:'Capitoli per lettura',bible:'Bibbia',
 days:'Giorni di lettura',from:'Inizia il',rem:'Avvisami in quei giorni',time:'Ora dell’avviso',remL:'Scegli un’ora che si accordi con la tua preghiera o meditazione.',
 sum:'{n} letture · finirai verso il {d}',save:'Salva il piano',saved:'Piano salvato',needDay:'Scegli almeno un giorno.',needBook:'Scegli almeno un libro.',
 bookReset:'Se cambi i libri o i capitoli per lettura, il piano ricomincia.',sessions:'{n} letture',
 chRead:'capitoli letti',bkDone:'libri completati',ofBible:'{p}% di questa Bibbia',ot:'Antico Testamento',ntT:'Nuovo Testamento',
 markCh:'✓ Segna il capitolo come letto',unmarkCh:'Capitolo letto · togli il segno',markBook:'Segna tutto il libro',unmarkBook:'Togli tutti i segni',
 finished:'Piano completato! Che la Parola continui a portare frutto in te.',again:'Inizia un altro piano',nT:'Piano di lettura',nLate:'in sospeso',
 tapDay:'Tocca un giorno per vedere la lettura.',none:'Nessuna lettura in questo giorno.',lateTag:'in ritardo'},
de:{nextR:'Nächste Lesung',sec:'Leseplan',lead:'Dein Kalender, um die Bibel zu lesen – in deinem Tempo und an den Tagen, die du wählst.',
 t1:'Wähle, was du liest: die ganze Bibel, das Neue Testament, die Evangelien, die Psalmen oder eigene Bücher',t2:'Ein Kalender mit deinen Lesetagen: gelesen, geplant und offen',t3:'Hake jedes Kapitel ab und sieh, wie weit du in jedem Buch bist',t4:'Eine Erinnerung nur an deinen Tagen, zur Zeit deines Gebets',
 unlock:'Mit Premium freischalten',create:'Meinen Plan erstellen',intro:'Wähle, was du lesen willst, an welchen Tagen und wann wir dich erinnern.',
 today:'Heutige Lesung',late:'Du bist {n} Lesungen im Rückstand.',fix:'Kalender ab heute neu ausrichten',ontrack:'Du bist auf dem Laufenden.',rest:'Heute keine Lesung. Sie ist für {d} geplant, du kannst sie aber vorziehen.',
 read:'✓ Gelesen',doneToday:'Lesung abgeschlossen!',session:'Lesung {n} von {t}',cal:'Kalender',lDone:'Gelesen',lPlan:'Geplant',lMiss:'Offen',
 prog:'Mein Fortschritt',progL:'Kapitel und Bücher, die du gelesen hast',set:'Plan-Einstellungen',setL:'Plan, Bibel, Tage, Uhrzeit und Erinnerung',
 what:'Was möchtest du lesen',nt:'Neues Testament',custom:'Eigener Plan: Bücher wählen',books:'Bücher',per:'Kapitel pro Lesung',bible:'Bibel',
 days:'Lesetage',from:'Beginnen am',rem:'An diesen Tagen erinnern',time:'Uhrzeit der Erinnerung',remL:'Wähle eine Zeit, die zu deinem Gebet oder deiner Meditation passt.',
 sum:'{n} Lesungen · fertig etwa am {d}',save:'Plan speichern',saved:'Plan gespeichert',needDay:'Wähle mindestens einen Tag.',needBook:'Wähle mindestens ein Buch.',
 bookReset:'Wenn du die Bücher oder die Kapitel pro Lesung änderst, beginnt der Plan von vorn.',sessions:'{n} Lesungen',
 chRead:'Kapitel gelesen',bkDone:'Bücher abgeschlossen',ofBible:'{p} % dieser Bibel',ot:'Altes Testament',ntT:'Neues Testament',
 markCh:'✓ Kapitel als gelesen markieren',unmarkCh:'Kapitel gelesen · Markierung entfernen',markBook:'Ganzes Buch markieren',unmarkBook:'Alle Markierungen entfernen',
 finished:'Plan abgeschlossen! Möge das Wort in dir weiter Frucht bringen.',again:'Neuen Plan beginnen',nT:'Leseplan',nLate:'offen',
 tapDay:'Tippe auf einen Tag, um die Lesung zu sehen.',none:'An diesem Tag keine Lesung.',lateTag:'überfällig'},
el:{nextR:'Επόμενο ανάγνωσμα',sec:'Πρόγραμμα ανάγνωσης',lead:'Το ημερολόγιό σου για να διαβάζεις τη Γραφή, με τον δικό σου ρυθμό και τις μέρες που διαλέγεις.',
 t1:'Διάλεξε τι θα διαβάσεις: όλη τη Γραφή, την Καινή Διαθήκη, τα Ευαγγέλια, τους Ψαλμούς ή όποια βιβλία θέλεις',t2:'Ένα ημερολόγιο με τις μέρες ανάγνωσης: διαβασμένα, προγραμματισμένα, εκκρεμή',t3:'Σημείωσε κάθε κεφάλαιο και δες πόσο έχεις διαβάσει από κάθε βιβλίο',t4:'Υπενθύμιση μόνο τις μέρες που διαλέγεις, την ώρα της προσευχής σου',
 unlock:'Ξεκλείδωμα με Premium',create:'Δημιουργία προγράμματος',intro:'Διάλεξε τι θα διαβάσεις, ποιες μέρες και τι ώρα θα σου το θυμίζουμε.',
 today:'Σημερινό ανάγνωσμα',late:'Έχεις μείνει πίσω {n} αναγνώσματα.',fix:'Αναπροσαρμογή του ημερολογίου από σήμερα',ontrack:'Είσαι ενημερωμένος.',rest:'Σήμερα δεν έχει ανάγνωση. Είναι για {d}, αλλά μπορείς να τη διαβάσεις νωρίτερα.',
 read:'✓ Το διάβασα',doneToday:'Το ανάγνωσμα ολοκληρώθηκε!',session:'Ανάγνωσμα {n} από {t}',cal:'Ημερολόγιο',lDone:'Διαβάστηκε',lPlan:'Προγραμματισμένο',lMiss:'Εκκρεμεί',
 prog:'Η πρόοδός μου',progL:'Κεφάλαια και βιβλία που έχεις διαβάσει',set:'Ρυθμίσεις προγράμματος',setL:'Πρόγραμμα, Βίβλος, μέρες, ώρα και υπενθύμιση',
 what:'Τι θέλεις να διαβάσεις',nt:'Καινή Διαθήκη',custom:'Δικό μου: διάλεξε βιβλία',books:'Βιβλία',per:'Κεφάλαια ανά ανάγνωση',bible:'Βίβλος',
 days:'Μέρες ανάγνωσης',from:'Έναρξη στις',rem:'Υπενθύμιση εκείνες τις μέρες',time:'Ώρα υπενθύμισης',remL:'Διάλεξε μια ώρα που ταιριάζει με την προσευχή ή τη μελέτη σου.',
 sum:'{n} αναγνώσματα · θα τελειώσεις γύρω στις {d}',save:'Αποθήκευση',saved:'Το πρόγραμμα αποθηκεύτηκε',needDay:'Διάλεξε τουλάχιστον μία μέρα.',needBook:'Διάλεξε τουλάχιστον ένα βιβλίο.',
 bookReset:'Αν αλλάξεις τα βιβλία ή τα κεφάλαια ανά ανάγνωση, το πρόγραμμα ξεκινά από την αρχή.',sessions:'{n} αναγνώσματα',
 chRead:'κεφάλαια διαβασμένα',bkDone:'βιβλία ολοκληρωμένα',ofBible:'{p}% αυτής της Βίβλου',ot:'Παλαιά Διαθήκη',ntT:'Καινή Διαθήκη',
 markCh:'✓ Σημείωση κεφαλαίου ως διαβασμένου',unmarkCh:'Διαβάστηκε · αφαίρεση σημείωσης',markBook:'Σημείωση όλου του βιβλίου',unmarkBook:'Αφαίρεση όλων των σημειώσεων',
 finished:'Το πρόγραμμα ολοκληρώθηκε! Ο Λόγος να καρποφορεί μέσα σου.',again:'Νέο πρόγραμμα',nT:'Πρόγραμμα ανάγνωσης',nLate:'εκκρεμεί',
 tapDay:'Πάτησε μια μέρα για να δεις το ανάγνωσμα.',none:'Καμία ανάγνωση αυτή τη μέρα.',lateTag:'καθυστερεί'},
ru:{nextR:'Следующее чтение',sec:'План чтения',lead:'Ваш календарь чтения Библии — в своём темпе и в выбранные дни.',
 t1:'Выберите, что читать: всю Библию, Новый Завет, Евангелия, Псалтирь или любые книги',t2:'Календарь с днями чтения: прочитано, запланировано, ожидает',t3:'Отмечайте каждую главу и смотрите, сколько прочитано в каждой книге',t4:'Напоминание только в выбранные дни, во время вашей молитвы',
 unlock:'Открыть с Premium',create:'Создать план',intro:'Выберите, что читать, в какие дни и во сколько напоминать.',
 today:'Чтение на сегодня',late:'Вы отстаёте на {n} чт.',fix:'Перестроить календарь с сегодняшнего дня',ontrack:'Вы идёте по плану.',rest:'Сегодня чтения нет. Оно запланировано на {d}, но можно прочитать заранее.',
 read:'✓ Прочитано',doneToday:'Чтение завершено!',session:'Чтение {n} из {t}',cal:'Календарь',lDone:'Прочитано',lPlan:'По плану',lMiss:'Ожидает',
 prog:'Мой прогресс',progL:'Прочитанные главы и книги',set:'Настройки плана',setL:'План, Библия, дни, время и напоминание',
 what:'Что вы хотите читать',nt:'Новый Завет',custom:'Свой план: выберите книги',books:'Книги',per:'Глав за одно чтение',bible:'Библия',
 days:'Дни чтения',from:'Начать',rem:'Напоминать в эти дни',time:'Время напоминания',remL:'Выберите время, удобное для молитвы или размышления.',
 sum:'{n} чт. · завершите примерно {d}',save:'Сохранить план',saved:'План сохранён',needDay:'Выберите хотя бы один день.',needBook:'Выберите хотя бы одну книгу.',
 bookReset:'Если изменить книги или число глав за чтение, план начнётся заново.',sessions:'{n} чт.',
 chRead:'глав прочитано',bkDone:'книг завершено',ofBible:'{p}% этой Библии',ot:'Ветхий Завет',ntT:'Новый Завет',
 markCh:'✓ Отметить главу прочитанной',unmarkCh:'Глава прочитана · снять отметку',markBook:'Отметить всю книгу',unmarkBook:'Снять все отметки',
 finished:'План завершён! Пусть Слово и дальше приносит в вас плод.',again:'Начать другой план',nT:'План чтения',nLate:'ожидает',
 tapDay:'Нажмите на день, чтобы увидеть чтение.',none:'В этот день чтения нет.',lateTag:'просрочено'},
ro:{nextR:'Următoarea lectură',sec:'Plan de lectură',lead:'Calendarul tău pentru a citi Biblia, în ritmul tău și în zilele pe care le alegi.',
 t1:'Alege ce citești: toată Biblia, Noul Testament, Evangheliile, Psalmii sau cărțile pe care le vrei',t2:'Un calendar cu zilele de lectură: citit, planificat și în așteptare',t3:'Bifează fiecare capitol și vezi cât ai citit din fiecare carte',t4:'Un memento doar în zilele alese, la ora rugăciunii tale',
 unlock:'Deblochează cu Premium',create:'Creează planul meu',intro:'Alege ce vrei să citești, în ce zile și la ce oră îți amintim.',
 today:'Lectura de azi',late:'Ai rămas în urmă cu {n} lecturi.',fix:'Reajustează calendarul de azi',ontrack:'Ești la zi.',rest:'Azi nu ai lectură. Este planificată pe {d}, dar o poți citi mai devreme.',
 read:'✓ Am citit',doneToday:'Lectură încheiată!',session:'Lectura {n} din {t}',cal:'Calendar',lDone:'Citit',lPlan:'Planificat',lMiss:'În așteptare',
 prog:'Progresul meu',progL:'Capitole și cărți pe care le-ai citit',set:'Setările planului',setL:'Plan, Biblie, zile, oră și memento',
 what:'Ce vrei să citești',nt:'Noul Testament',custom:'Pe măsura mea: alege cărțile',books:'Cărți',per:'Capitole pe lectură',bible:'Biblia',
 days:'Zilele de lectură',from:'Începe pe',rem:'Amintește-mi în acele zile',time:'Ora mementoului',remL:'Alege o oră care se potrivește cu rugăciunea sau meditația ta.',
 sum:'{n} lecturi · vei termina în jur de {d}',save:'Salvează planul',saved:'Plan salvat',needDay:'Alege cel puțin o zi.',needBook:'Alege cel puțin o carte.',
 bookReset:'Dacă schimbi cărțile sau capitolele pe lectură, planul o ia de la capăt.',sessions:'{n} lecturi',
 chRead:'capitole citite',bkDone:'cărți terminate',ofBible:'{p}% din această Biblie',ot:'Vechiul Testament',ntT:'Noul Testament',
 markCh:'✓ Marchează capitolul ca citit',unmarkCh:'Capitol citit · scoate marcajul',markBook:'Marchează toată cartea',unmarkBook:'Scoate toate marcajele',
 finished:'Plan încheiat! Cuvântul să rodească mai departe în tine.',again:'Începe alt plan',nT:'Plan de lectură',nLate:'în așteptare',
 tapDay:'Atinge o zi ca să vezi lectura.',none:'Nicio lectură în această zi.',lateTag:'restantă'}};
const lx=(k,o)=>{let s=(LCX[LANG]||LCX.en)[k];if(s==null)s=LCX.en[k];if(o)for(const x in o)s=String(s).split('{'+x+'}').join(o[x]);return s};
const LPLANS=['year','nt','gospels','psalms','advent','lent','custom'];
const lymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const lpd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const ltoday=()=>lymd(new Date());
const lcfg=()=>store.get('lect',null);
const lprem=()=>typeof prem2==='function'?prem2():(typeof isPremium==='function'?isPremium():true);
const lname=id=>id==='nt'?lx('nt'):id==='custom'?lx('custom'):planName(id);
const ldate=(s,o)=>lpd(s).toLocaleDateString(LANG,o||{weekday:'long',day:'numeric',month:'long'});
const LWD=[1,2,3,4,5,6,0];
const lwdName=(w,f)=>new Date(2024,0,7+w).toLocaleDateString(LANG,{weekday:f||'short'});
const readChs=()=>store.get('readChs',{});

// Lecturas del plan (cada una, una lista de [libro, capítulo])
const _ldm={};
function ldays(c){
 const key=[c.id,c.ed,(c.books||[]).join(','),c.per||2].join('|');if(_ldm[key])return _ldm[key];
 const ed=c.ed,all=b=>chsOf(ed,b).map(ch=>[b,ch]),codes=bookMeta(ed).books.map(b=>b.c),nt=codes.indexOf('MAT');let r=[];
 if(c.id==='year')r=split(codes.flatMap(all),365);
 else if(c.id==='nt'){const l=codes.slice(nt).flatMap(all);r=split(l,Math.ceil(l.length/2))}
 else if(c.id==='gospels')r=split(['MAT','MAR','LUK','JOH'].flatMap(all),40);
 else if(c.id==='psalms')r=split(all('PSA'),30);
 else if(c.id==='advent')r=[...Array(20)].map((_,k)=>[['ISA',String(40+k)]]).concat([[['MAT','1']],[['LUK','1']],[['JOH','1']],[['LUK','2']]]);
 else if(c.id==='lent')r=[[['PSA',psa(ed,51)]]].concat(all('MAR').map(x=>[x]),[15,16,17,18,19,20,21].map(n=>[['LUK',String(n)]]),[6,32,38,102,130,143].map(n=>[['PSA',psa(ed,n)]]),[12,13,14,15,16,17,18,19,20,21].map(n=>[['JOH',String(n)]]));
 else if(c.id==='custom'){const l=codes.filter(b=>(c.books||[]).includes(b)).flatMap(all),p=Math.max(1,+c.per||2);for(let i=0;i<l.length;i+=p)r.push(l.slice(i,i+p))}
 return _ldm[key]=r.filter(x=>x&&x.length)}
const lst=c=>{const s=planSt()[c.id]||{};return {done:s.done||[],at:s.at||{}}};
// Calendario: la lectura k (desde «base») cae en el (k−base)-ésimo día elegido a partir de «start»
function lsched(c){
 const days=ldays(c),n=days.length,st=lst(c),done=new Set(st.done),wd=new Set(c.wd),base=c.base||0;
 let first=-1;for(let k=0;k<n;k++)if(!done.has(k)){first=k;break}
 const plan=new Array(n).fill(null);const d=lpd(c.start);let g=0;
 for(let k=Math.max(0,base);k<n;k++){while(!wd.has(d.getDay())&&g<6000){d.setDate(d.getDate()+1);g++}plan[k]=lymd(d);d.setDate(d.getDate()+1)}
 for(let k=0;k<Math.min(base,n);k++)if(!done.has(k))plan[k]=c.start;
 const T=ltoday();let late=0;if(first>=0)for(let k=first;k<n;k++)if(!done.has(k)&&plan[k]&&plan[k]<T)late++;
 return {days,n,st,done,plan,first,late,end:plan[n-1]}}
function lmarkSession(c,k){const s=planSt(),o=s[c.id]||{done:[],at:{}};o.done=o.done||[];o.at=o.at||{};
 if(!o.done.includes(k)){o.done.push(k);o.at[k]=ltoday()}s[c.id]=o;store.set('plans',s);
 const r=readChs();ldays(c)[k].forEach(([b,ch])=>{r[b]=r[b]||[];if(!r[b].includes(ch))r[b].push(ch)});store.set('readChs',r);
 store.set('planActive',c.id);if(typeof scheduleReminders==='function')scheduleReminders()}
const lbl=d=>dayLabel(d);

// ----- Vistas -----
function renderLect(){
 if(S.view==='lect_set')return drawLectSet();if(S.view==='lect_prog')return drawLectProg();if(S.view==='lect_book')return drawLectBook();
 if(!lprem()){view.innerHTML=`<h1>📅 ${esc(lx('sec'))}</h1><p class="lead">${esc(lx('lead'))}</p><div class="card"><ul class="lgl orao">${['t1','t2','t3','t4'].map(k=>`<li>${esc(lx(k))}</li>`).join('')}</ul>
  <button class="btn" id="lUn" style="width:100%;margin-top:12px">👑 ${esc(lx('unlock'))}</button></div>`;$('#lUn').onclick=()=>openP('premium');return}
 const c=lcfg();
 if(!c||!MANIFEST[c.ed]){view.innerHTML=`<h1>📅 ${esc(lx('sec'))}</h1><p class="lead">${esc(lx('intro'))}</p><div class="card"><ul class="lgl orao">${['t1','t2','t3','t4'].map(k=>`<li>${esc(lx(k))}</li>`).join('')}</ul>
  <button class="btn" id="lNew" style="width:100%;margin-top:12px">${esc(lx('create'))}</button></div>`;$('#lNew').onclick=()=>{S.lf=null;go('lect_set')};return}
 const x=lsched(c),T=ltoday();
 let top='';
 if(x.first<0)top=`<div class="lcard" style="text-align:center"><div style="font-size:46px">🎉</div><p class="lead">${esc(lx('finished'))}</p><button class="btn" id="lAgain" style="width:100%">${esc(lx('again'))}</button></div>`;
 else{const due=x.plan[x.first]<=T,cur=x.days[x.first];
  top=`<div class="card ${due?'main':''}"><div class="t">${esc(due?lx('today'):lx('nextR'))}<span class="pill soft">${esc(lx('session',{n:x.first+1,t:x.n}))}</span></div>
  ${due?'':`<p class="s" style="margin-top:8px">${esc(lx('rest',{d:ldate(x.plan[x.first])}))}</p>`}
  <div class="edlist">${cur.map(([b,ch])=>`<button class="ed" data-b="${b}" data-ch="${ch}"><b>${esc(bname(b))} ${esc(ch)}</b></button>`).join('')}</div>
  <button class="btn" id="lDone" style="width:100%;margin-top:12px;background:var(--gold);color:var(--wine)">${esc(lx('read'))}</button>
  <p class="note" style="margin-top:10px">${esc(x.late?lx('late',{n:x.late}):lx('ontrack'))}</p>${x.late?`<button class="btn ghost" id="lFix" style="width:100%">${esc(lx('fix'))}</button>`:''}</div>`}
 const pct=Math.round(x.done.size/x.n*100);
 view.innerHTML=`<h1>📅 ${esc(lname(c.id))}</h1><p class="note">${esc(edName(c.ed))} · ${esc(c.wd.length===7?'':LWD.filter(w=>c.wd.includes(w)).map(w=>lwdName(w)).join(' · '))}${c.rem?' · 🔔 '+esc(c.time):''}</p>
 <div class="pbar"><i style="width:${pct}%"></i></div><p class="note">${pct} % · ${esc(lx('sessions',{n:x.done.size+' / '+x.n}))}</p>
 ${top}<h2>${esc(lx('cal'))}</h2><div id="lCal"></div><p class="note" id="lDay">${esc(lx('tapDay'))}</p>
 <button class="card rcard" id="lProg"><div class="t"><span class="rico">📊</span>${esc(lx('prog'))}</div><div class="s">${esc(lx('progL'))}</div></button>
 <button class="card rcard" id="lSet"><div class="t"><span class="rico">⚙️</span>${esc(lx('set'))}</div><div class="s">${esc(lx('setL'))}</div></button>`;
 view.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>go('read',{sec:'bible',ed:c.ed,book:b.dataset.b,ch:b.dataset.ch,hl:null}));
 const ld=$('#lDone');if(ld)ld.onclick=()=>{lmarkSession(c,x.first);toast('✓ '+lx('doneToday'));renderLect();window.scrollTo(0,0)};
 const lf=$('#lFix');if(lf)lf.onclick=()=>{const n=Object.assign({},c,{start:T,base:x.first});store.set('lect',n);if(typeof scheduleReminders==='function')scheduleReminders();renderLect()};
 const la=$('#lAgain');if(la)la.onclick=()=>{S.lf=null;go('lect_set')};
 $('#lProg').onclick=()=>go('lect_prog');$('#lSet').onclick=()=>{S.lf=null;go('lect_set')};
 drawLectCal(c,x)}
function drawLectCal(c,x){
 const box=$('#lCal');if(!box)return;const T=ltoday();S.lcm=S.lcm||T.slice(0,7);
 const [y,m]=S.lcm.split('-').map(Number),first=new Date(y,m-1,1),dim=new Date(y,m,0).getDate(),lead=(first.getDay()+6)%7;
 const map={};x.days.forEach((_,k)=>{let ds,s;if(x.done.has(k)){ds=x.st.at[k];s='done'}else{ds=x.plan[k];s=ds&&ds<T?'miss':'plan'}if(ds)(map[ds]=map[ds]||[]).push([k,s])});
 let cells='';for(let i=0;i<lead;i++)cells+='<span></span>';
 for(let d=1;d<=dim;d++){const ds=lymd(new Date(y,m-1,d)),e=map[ds]||[],st=e.some(z=>z[1]==='miss')?'miss':e.some(z=>z[1]==='plan')?'plan':e.length?'done':'';
  cells+=`<button class="lcd ${st} ${ds===T?'today':''}" data-d="${ds}">${d}</button>`}
 box.innerHTML=`<div class="lcal"><div class="lch"><button class="iconbtn" id="lPrev" aria-label="‹">‹</button><b>${esc(first.toLocaleDateString(LANG,{month:'long',year:'numeric'}))}</b><button class="iconbtn" id="lNext" aria-label="›">›</button></div>
 <div class="lcgrid">${LWD.map(w=>`<span class="lwd">${esc(lwdName(w,'narrow'))}</span>`).join('')}${cells}</div>
 <div class="lleg"><span><i class="lcd done"></i>${esc(lx('lDone'))}</span><span><i class="lcd plan"></i>${esc(lx('lPlan'))}</span><span><i class="lcd miss"></i>${esc(lx('lMiss'))}</span></div></div>`;
 const mv=n=>{const d=new Date(y,m-1+n,1);S.lcm=lymd(d).slice(0,7);drawLectCal(c,x)};$('#lPrev').onclick=()=>mv(-1);$('#lNext').onclick=()=>mv(1);
 box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const e=map[b.dataset.d]||[];const p=$('#lDay');
  p.innerHTML=`<b>${esc(ldate(b.dataset.d))}</b><br>`+(e.length?e.map(([k,s])=>`${s==='done'?'✓':s==='miss'?'•':'○'} ${esc(lbl(x.days[k]))}${s==='miss'?' ('+esc(lx('lateTag'))+')':''}`).join('<br>'):esc(lx('none')))})}
function drawLectSet(){
 const c=lcfg(),T=ltoday();
 const f=S.lf=S.lf||Object.assign({id:'year',ed:planEd(),wd:[1,2,3,4,5,6,0],start:T,time:'20:00',rem:true,books:[],per:2},c||{},c?{start:c.start<T?T:c.start}:{});
 if(!MANIFEST[f.ed])f.ed=planEd();
 const books=bookMeta(f.ed).books,nt=books.findIndex(b=>b.c==='MAT');
 const opts=(typeof planOptions==='function'?planOptions():[]).map(([b,e])=>`<option value="${e.id}" ${e.id===f.ed?'selected':''}>${esc(edName(e.id))}</option>`).join('');
 const n=f.id==='custom'&&!f.books.length?0:ldays(f).length;
 let end='';if(n&&f.wd.length){const d=lpd(f.start);let k=0,g=0;while(g<6000){if(f.wd.includes(d.getDay())){k++;if(k>=n)break}d.setDate(d.getDate()+1);g++}end=lymd(d)}
 const chip=(on,attr,v,l)=>`<button class="chip" ${attr}="${v}" aria-pressed="${on}">${esc(l)}</button>`;
 view.innerHTML=`<h1>⚙️ ${esc(lx('set'))}</h1>
 <h2>${esc(lx('what'))}</h2><div class="lplans">${LPLANS.map(id=>{const k=id==='custom'?(f.books.length?ldays(Object.assign({},f,{id})).length:0):ldays(Object.assign({},f,{id})).length;
  return `<button class="card lpl ${f.id===id?'on':''}" data-lp="${id}"><div class="t">${esc(lname(id))}</div>${k?`<div class="s">${esc(lx('sessions',{n:k}))}</div>`:''}</button>`}).join('')}</div>
 ${f.id==='custom'?`<div class="card"><div class="t">${esc(lx('books'))}</div><p class="note">${esc(lx('bookReset'))}</p>
  <p class="note"><b>${esc(lx('ot'))}</b></p><div class="orarow">${books.slice(0,nt<0?books.length:nt).map(b=>chip(f.books.includes(b.c),'data-bk',b.c,bname(b.c))).join('')}</div>
  ${nt>=0?`<p class="note"><b>${esc(lx('ntT'))}</b></p><div class="orarow">${books.slice(nt).map(b=>chip(f.books.includes(b.c),'data-bk',b.c,bname(b.c))).join('')}</div>`:''}
  <label class="orasort"><span>${esc(lx('per'))}</span><select id="lPer">${[1,2,3,4,5].map(v=>`<option ${+f.per===v?'selected':''}>${v}</option>`).join('')}</select></label></div>`:''}
 <h2>${esc(lx('bible'))}</h2><label class="orasort"><select id="lEd">${opts}</select></label>
 <h2>${esc(lx('days'))}</h2><div class="orarow">${LWD.map(w=>chip(f.wd.includes(w),'data-wd',w,lwdName(w))).join('')}</div>
 <label class="orasort"><span>${esc(lx('from'))}</span><input type="date" id="lStart" class="oraq" value="${f.start}" min="${T}"></label>
 <div class="card"><label class="nrow"><input type="checkbox" id="lRem" ${f.rem?'checked':''}><span>🔔 ${esc(lx('rem'))}</span><input type="time" id="lTime" value="${esc(f.time)}"></label><p class="note">${esc(lx('remL'))}</p></div>
 ${n&&end?`<p class="lead" style="margin-top:14px">${esc(lx('sum',{n,d:ldate(end,{day:'numeric',month:'long',year:'numeric'})}))}</p>`:''}
 <button class="btn" id="lSave" style="width:100%;margin-top:12px">${esc(lx('save'))}</button>`;
 const keep=()=>{f.start=$('#lStart').value||T;f.rem=$('#lRem').checked;f.time=$('#lTime').value||'20:00';const p=$('#lPer');if(p)f.per=+p.value};
 view.querySelectorAll('[data-lp]').forEach(b=>b.onclick=()=>{keep();f.id=b.dataset.lp;drawLectSet()});
 view.querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{keep();const k=b.dataset.bk;f.books=f.books.includes(k)?f.books.filter(x=>x!==k):f.books.concat(k);drawLectSet()});
 view.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>{keep();const w=+b.dataset.wd;f.wd=f.wd.includes(w)?f.wd.filter(x=>x!==w):f.wd.concat(w);drawLectSet()});
 $('#lEd').onchange=e=>{keep();f.ed=e.target.value;f.books=f.books.filter(b=>bookMeta(f.ed).map[b]);drawLectSet()};
 const p=$('#lPer');if(p)p.onchange=()=>{keep();drawLectSet()};$('#lStart').onchange=()=>{keep();drawLectSet()};
 $('#lSave').onclick=()=>{keep();if(!f.wd.length)return toast('⚠️ '+lx('needDay'));if(f.id==='custom'&&!f.books.length)return toast('⚠️ '+lx('needBook'));
  const o=lcfg(),s=planSt();
  if(f.id==='custom'&&o&&o.id==='custom'&&((o.books||[]).join()!==f.books.join()||+o.per!==+f.per||o.ed!==f.ed)){s.custom={done:[],at:{}};store.set('plans',s)}
  const st=lst(f);let first=0;while(st.done.includes(first))first++;
  const same=o&&o.id===f.id&&o.start===f.start&&(o.wd||[]).slice().sort().join()===f.wd.slice().sort().join();
  const n={id:f.id,ed:f.ed,wd:f.wd.slice(),start:f.start,base:same?(o.base||0):first,time:f.time,rem:f.rem,books:f.books.slice(),per:+f.per||2};
  store.set('lect',n);store.set('planActive',n.id);
  const ns=store.get('notif',{});ns.plan={on:n.rem,at:n.time};store.set('notif',ns);
  if(typeof scheduleReminders==='function')scheduleReminders();
  try{if(n.rem&&window.PhosApp&&PhosApp.notificationsAllowed&&!PhosApp.notificationsAllowed())PhosApp.notificationsAsk()}catch(e){}
  S.lf=null;S.lcm=null;toast('✓ '+lx('saved'));go('lect')}}
function drawLectProg(){
 const c=lcfg(),ed=c&&MANIFEST[c.ed]?c.ed:planEd(),books=bookMeta(ed).books,r=readChs(),nt=books.findIndex(b=>b.c==='MAT');
 let tot=0,rd=0,fin=0;const row=b=>{const chs=b.chs.map(String),k=chs.filter(ch=>(r[b.c]||[]).includes(ch)).length;tot+=chs.length;rd+=k;if(k===chs.length)fin++;
  return `<button class="lbk" data-bk="${b.c}"><span>${esc(bname(b.c))}</span><span class="pbar small"><i style="width:${Math.round(k/chs.length*100)}%"></i></span><span class="note">${k}/${chs.length}</span></button>`};
 const ot=books.slice(0,nt<0?books.length:nt).map(row).join(''),ntr=nt>=0?books.slice(nt).map(row).join(''):'';
 view.innerHTML=`<h1>📊 ${esc(lx('prog'))}</h1><p class="note">${esc(edName(ed))}</p>
 <div class="lstats"><div class="card"><b>${rd}</b><span>${esc(lx('chRead'))}</span></div><div class="card"><b>${fin}</b><span>${esc(lx('bkDone'))}</span></div><div class="card"><b>${tot?Math.round(rd/tot*100):0} %</b><span>${esc(lx('ofBible',{p:''}).replace(/^\s*%\s*/,''))}</span></div></div>
 <div class="pbar"><i style="width:${tot?Math.round(rd/tot*100):0}%"></i></div>
 <h2>${esc(lx('ot'))}</h2><div class="lbks">${ot}</div>${ntr?`<h2>${esc(lx('ntT'))}</h2><div class="lbks">${ntr}</div>`:''}`;
 view.querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{S.lbook=b.dataset.bk;S.lbed=ed;go('lect_book')})}
function drawLectBook(){
 const ed=S.lbed||planEd(),b=S.lbook,m=bookMeta(ed).map[b];if(!m)return go('lect_prog');const r=readChs(),mine=r[b]||[],chs=m.chs.map(String);
 view.innerHTML=`<h1>${esc(bname(b))}</h1><p class="note">${chs.filter(ch=>mine.includes(ch)).length}/${chs.length}</p>
 <div class="lchs">${chs.map(ch=>`<button class="lcd ${mine.includes(ch)?'done':''}" data-ch="${ch}">${esc(ch)}</button>`).join('')}</div>
 <div class="orarow"><button class="btn" id="lAll">${esc(lx('markBook'))}</button><button class="btn ghost" id="lNone">${esc(lx('unmarkBook'))}</button></div>`;
 const set=a=>{const x=readChs();x[b]=a;store.set('readChs',x);drawLectBook()};
 view.querySelectorAll('[data-ch]').forEach(e=>e.onclick=()=>{const ch=e.dataset.ch;set(mine.includes(ch)?mine.filter(z=>z!==ch):mine.concat(ch))});
 $('#lAll').onclick=()=>set(chs.slice());$('#lNone').onclick=()=>set([])}

// Botón «Marcar como leído» al final de cada capítulo (Premium); si completa la lectura del día, la da por hecha
function lectChBtn(){
 if(!lprem()||S.view!=='read'||$('#lChk'))return;const nav=view.querySelector('.nav');if(!nav)return;
 const r=readChs(),on=(r[S.book]||[]).includes(String(S.ch));const b=document.createElement('button');b.id='lChk';b.className='btn '+(on?'ghost':'');b.style.cssText='width:100%;margin:14px 0 4px';
 b.textContent=on?lx('unmarkCh'):lx('markCh');nav.before(b);
 b.onclick=()=>{const x=readChs(),a=x[S.book]||[],ch=String(S.ch);x[S.book]=a.includes(ch)?a.filter(z=>z!==ch):a.concat(ch);store.set('readChs',x);
  const c=lcfg();if(c&&!a.includes(ch)){const s=lsched(c);if(s.first>=0&&s.days[s.first].every(([bk,cc])=>(x[bk]||[]).includes(cc))){lmarkSession(c,s.first);toast('🎉 '+lx('doneToday'))}}
  b.remove();lectChBtn()}}
const _renderReadL=renderRead;
renderRead=async function(){const r=await _renderReadL.apply(this,arguments);try{lectChBtn()}catch(e){}return r};

// Aviso solo los días elegidos (lo llama scheduleReminders)
function lectReminder(y,m,dd){const c=lcfg();if(!c||!c.rem||!lprem()||!MANIFEST[c.ed])return null;const d=new Date(y,m-1,dd),ds=lymd(d);
 if(!c.wd.includes(d.getDay())||ds<c.start)return null;const x=lsched(c);if(x.first<0)return null;
 let k=x.days.findIndex((_,i)=>!x.done.has(i)&&x.plan[i]===ds);if(k<0){if(x.plan[x.first]>ds)return null;k=x.first}
 const [hh,mi]=(c.time||'20:00').split(':').map(Number);
 return {id:'lect-'+ds,at:new Date(y,m-1,dd,hh||0,mi||0).getTime(),title:'📖 '+lx('nT'),body:lbl(x.days[k])+(x.late&&ds===ltoday()?' · +'+x.late+' '+lx('nLate'):''),open:'lect'}}

// Alta de la sección: justo después de «Biblia»
(function(){const at=SECS.includes('bible')?SECS.indexOf('bible')+1:SECS.length;SECS.splice(at,0,'lect');
 for(const l in NAV)NAV[l].splice(at,0,(LCX[l]||LCX.en).sec);MENU_ICO.lect='📅'})();
const _renderArticlesL=renderArticles;
renderArticles=async function(sec){if(sec==='lect')return renderLect();return _renderArticlesL(sec)};
const _setHeaderL=setHeader;
setHeader=function(){_setHeaderL();if(S.sec==='lect'&&S.view!=='lect')$('#back').style.visibility='visible'};
const _phosBackL=window.phosBack;
window.phosBack=()=>{if(S.sec==='lect'&&S.view!=='lect'&&!PVIEWS[S.view]){go(S.view==='lect_book'?'lect_prog':'lect');return true}return _phosBackL?_phosBackL():false};
const _phosOpenL=window.phosOpen;
window.phosOpen=k=>{if(k==='lect'||k==='plan')return go('lect',{sec:'lect'});return _phosOpenL&&_phosOpenL(k)};
// Los planes antiguos de Mi Phos llevan aquí
drawPlans=()=>go('lect',{sec:'lect'});drawPlan=()=>go('lect',{sec:'lect'});
window.planTodayText=()=>{const c=lcfg();if(!c||!MANIFEST[c.ed])return '';const x=lsched(c);return x.first>=0?lx('today')+': '+lbl(x.days[x.first]):''};
