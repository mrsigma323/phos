# Tarea 1 · Competencia de Phos y mejoras posibles

*Fecha: 14 de noviembre de 2026. Rama: `app-google-play`. Hecho por una tarea programada (Claude), sin tocar el código de la app.*

## Cómo se ha hecho

- He leído `android/app-fuente/` (sobre todo `premium.js`, `plus.js`, `features.js`, `vida.js`, `today.js` y `app.js`) para saber qué tiene ya Phos.
- He consultado las fichas de Google Play (en inglés, de EE. UU.) de cada app, sus páginas oficiales de precios y algunas reseñas de terceros. Las fuentes están al final.
- **Advertencias sobre los datos:**
  - Las descargas son los tramos que muestra Google Play ("1M+", "10M+"…), no cifras exactas.
  - La valoración y el número de reseñas cambian según la vista de la ficha (cabecera o sección de valoraciones). Pongo la cifra de la cabecera.
  - Solo he podido leer las 3–4 reseñas que se ven en la ficha. **No representan a todos los usuarios**; son indicios, no estadísticas.
  - Los precios son de EE. UU. en dólares y sin impuestos. En España y otros países pueden ser distintos.
  - Cuando un dato no aparece en la fuente, lo digo ("no consta").

## 1. Qué tiene ya Phos (según el código)

| Área | Qué hay | Gratis / Premium |
|---|---|---|
| Biblia | Ediciones ortodoxa (griego), católica (Vulgata Clementina), protestante (Reina-Valera 1909) y original hebreo-griego, con traducciones; 9 idiomas de interfaz (es, en, pt, fr, it, de, el, ru, ro). Subrayados, marcadores, notas, copiar/compartir, modo noche. | Gratis |
| Biblia | Versículo del día y plan «la Biblia en un año» (365 días). | Gratis |
| Biblia | **Escuchar el capítulo en voz alta** (voz sintética del móvil, con avance automático y temporizador de sueño de 15/30/60 min). | Premium |
| Hoy | Portada con versículo, fiesta, ayuno y oración según el día y la Iglesia elegida (ortodoxa/católica/protestante); fiestas móviles; santos (solo en español). | Gratis |
| Aprende | Cursos de Biblia, fiestas y lenguas bíblicas (griego, hebreo, latín), prácticas y memorización. | 1ª unidad gratis; resto Premium |
| Retos bíblicos | Retos con fiestas adaptadas a cada Iglesia. | Gratis (con partes Premium) |
| Regla de vida | Entrenamiento de fe, cuerpo y hábitos (oración, Biblia, ejercicio, descanso, ayuno, silencio), con avisos legales de salud. | Gráfico semanal y programas: Premium |
| Salud / Deporte | Secciones de hábitos, alimentación y deporte. | Gratis |
| Mi Phos | Racha diaria, cuenta con Google, planes de lectura, regla personal, diario, fondos de pantalla, recordatorios (mañana, noche, ayuno, santo, versículo, plan) y widget. | Casi todo Premium (salvo cuenta y racha) |
| Pagos | Suscripción `phos_premium` (mensual y anual, con prueba) y aportaciones únicas `apoyo_2/5/10` por Google Play. Sin anuncios. | — |

**Lo que no he encontrado en el código:** lecturas litúrgicas completas del día (Misa / Apóstol y Evangelio), Liturgia de las Horas, Rosario guiado, akathistos, troparios y kontakia, Biblia en audio con voz humana, comunidad o peticiones de oración, sincronización entre dispositivos de subrayados y notas (hay cuenta de Google, pero no he comprobado qué sincroniza), widget gratuito y contenido para niños.

## 2. Competencia (16 apps y webs)

### Grandes generalistas (sobre todo protestantes)

**1. YouVersion Bible App (Life.Church)**
- **Qué ofrece:** más de 2.500 versiones de la Biblia en más de 2.100 idiomas, audio, planes de lectura y devocionales, versículo del día con widget, resaltados y notas (públicas o privadas), amigos y feed social, imágenes con versículos, vídeos (The Chosen, BibleProject) y sincronización en la nube.
- **Modelo de pago:** gratis y sin anuncios, financiada por donantes. La ficha no menciona compras dentro de la app.
- **Idiomas:** interfaz en más de 65 idiomas (una noticia de 2025 habla de 70).
- **Descargas:** 100M+ en Google Play; 1.000 millones de instalaciones en todas las plataformas (noviembre de 2025).
- **Valoración:** 4,9 ★ (unos 9,3 M de reseñas).
- **Lo que valoran:** que sea «la mejor app de Biblia», los vídeos enlazados y las distintas voces del audio.
- **Lo que critican:** el progreso de los planes no se guarda (las casillas se desmarcan). Según su ficha de privacidad, puede compartir datos con terceros.

**2. Bible Gateway (HarperCollins)**
- **Qué ofrece:** más de 200 traducciones, más de 30 Biblias en audio, búsqueda, planes y modo oscuro.
- **Modelo de pago:** gratis con anuncios. **Bible Gateway Plus** cuesta 6,99 $/mes o 69,99 $/año, con 7 días de prueba; quita los anuncios y añade más de 70 recursos (Biblias de estudio, comentarios, diccionarios, interlineal hebreo/griego).
- **Idiomas:** contenido en más de 15 idiomas.
- **Descargas:** 1M+.
- **Valoración:** 2,9 ★ (40 mil reseñas).
- **Lo que valoran:** los usuarios veteranos la aprecian.
- **Lo que critican:** solo resalta versículos enteros, los resaltados se pierden al cerrar sesión, carga lenta, las Biblias descargadas no funcionan sin conexión y el audio se para al final de cada capítulo.

**3. BibleProject**
- **Qué ofrece:** vídeos animados por libro y por tema, pódcast y clases (una sobre Génesis).
- **Modelo de pago:** totalmente gratis, sin suscripción, financiado con donaciones.
- **Idiomas:** la ficha no los indica. Hay apps no oficiales en otros idiomas, por ejemplo en griego.
- **Descargas:** 1M+.
- **Valoración:** 4,7 ★ (5 mil reseñas).
- **Lo que valoran:** el arte, los resúmenes de cada libro y que aprender sea ameno.
- **Lo que critican:** fallos del reproductor de vídeo y la rotación de pantalla.

**4. Dwell: Audio Bible**
- **Qué ofrece:** Biblia en audio con más de 20 voces y 14 traducciones inglesas, lectura sincronizada con el texto, más de 75 planes de escucha, modo dormir, memorización («Repeat & Reflect») y listas temáticas.
- **Modelo de pago:** versión gratuita limitada y 7 días de prueba. Plan individual a 9,99 $/mes o 59,99 $/año; dúo a 89,99 $/año; familia a 109,99 $/año; existe un pago único «Lifetime» (un usuario habla de unos 200 $; la ficha no da el precio).
- **Idiomas:** solo traducciones en inglés según la ficha.
- **Descargas:** 1M+.
- **Valoración:** 4,8 ★ (15 mil reseñas).
- **Lo que valoran:** las voces y que ayude a quien lee con dificultad.
- **Lo que critican:** que pida cuenta para probarla y que sea cara.

### Oración, meditación y devocionales (modelo de suscripción)

**5. Hallow (católica)**
- **Qué ofrece:** más de 10.000 sesiones guiadas, Rosario, Coronilla de la Divina Misericordia, examen ignaciano, Lectio Divina, lecturas de la Misa, «Biblia en un año», historias para dormir, música (gregoriano, Taizé), retos comunitarios de Cuaresma y Adviento (Pray40, Pray25), diario de oración, grupos («Hallow Family») y descargas sin conexión.
- **Modelo de pago:** gratis lo básico (Rosario, Evangelio diario, «Biblia en un año», lecturas de Misa). Suscripción a 9,99 $/mes o 69,99 $/año con prueba gratuita; Friends & Family a 119,99 $/año para hasta 6 personas.
- **Idiomas:** la ficha no los detalla. En algunos países la ficha aparece con título en portugués («Hallow Meditação Católica»), pero no he podido confirmar la lista completa.
- **Descargas:** 10M+.
- **Valoración:** 4,5 ★ (124 mil reseñas).
- **Lo que valoran:** el uso diario durante años.
- **Lo que critican:** la racha no registra días completados, cuesta encontrar las rutinas diarias y se pone a sonar sola al conectar el Bluetooth del coche.

**6. Glorify**
- **Qué ofrece:** devocional diario de unos 10 minutos (cita, versículo y reflexión), oración guiada, peticiones de oración en comunidad, diario, cursos de audio, temas (ansiedad, duelo, matrimonio) e historias para niños.
- **Modelo de pago:** suscripción Glorify Plus. Las cifras no son coherentes según la fuente: unos 6,99–9,99 $/mes y 41,99–69,99 $/año en EE. UU. **El precio exacto no está claro.**
- **Idiomas:** tiene ficha en español («Devocional diario») y en portugués en la App Store; la ficha de Google Play no da la lista.
- **Descargas:** 10M+.
- **Valoración:** 4,9 ★ (1,19 M de reseñas).
- **Lo que valoran:** la comunidad, las actualizaciones frecuentes y la rutina nocturna.
- **Lo que critican:** la música tapa la voz, contenido repetido y la oración dividida por tiempos distrae.

**7. Abide (Guideposts)**
- **Qué ofrece:** meditación bíblica guiada, historias bíblicas para dormir, Biblia en audio (NIV) y planes.
- **Modelo de pago:** gratis la meditación diaria de 2 minutos. Suscripción a 9,99 $/mes o 39,99 $/año (reembolso en 30 días); ofrecen becas gratuitas a quien no puede pagar.
- **Idiomas:** solo inglés, según la ficha.
- **Descargas:** 1M+.
- **Valoración:** 4,3 ★ (22 mil reseñas).
- **Lo que valoran:** que ayude con la ansiedad y el sueño, y la música con versículos.
- **Lo que critican:** contenido que antes era gratis ahora es de pago, problemas de inicio de sesión y una app que no abre tras pagar.

**8. Pray.com**
- **Qué ofrece:** planes de oración de mañana y noche, más de 250 historias bíblicas en audio para dormir, meditación, temas y herramientas para iglesias (donaciones).
- **Modelo de pago:** compras dentro de la app con suscripción. La ficha no da el precio; las reseñas hablan de subidas.
- **Idiomas:** no consta.
- **Descargas:** 5M+.
- **Valoración:** 4,7 ★ (41 mil reseñas).
- **Lo que critican:** **anuncios incluso pagando**, anuncios que interrumpen la oración, subida de precio y recordatorios que fallan.

### Católicas

**9. Laudate (Aycka Soft)**
- **Qué ofrece:** lecturas de la Misa, Orden de la Misa, Liturgia de las Horas (también en latín), muchos rosarios y coronillas, Vía Crucis, santo del día, Catecismo, examen de conciencia para la confesión, documentos del Vaticano II, Derecho Canónico, encíclicas, pódcast y oraciones propias.
- **Modelo de pago:** gratis; la ficha no indica anuncios ni compras y declara que no recopila datos.
- **Idiomas:** 16 idiomas (inglés, español, portugués, francés, alemán, italiano, polaco, rumano, chino…).
- **Descargas:** 1M+.
- **Valoración:** 4,7 ★ (31 mil reseñas).
- **Lo que valoran:** que sea muy completa para la devoción diaria.
- **Lo que critican:** no se pueden editar las oraciones propias en Android y diseño anticuado.

**10. iBreviary (Pro Terra Sancta)**
- **Qué ofrece:** Breviario, Misal, Leccionario y rituales; textos en latín y del Vetus Ordo, ritos ambrosiano y monástico; guarda hasta 14 días sin conexión.
- **Modelo de pago:** gratis; la ficha no indica compras ni anuncios.
- **Idiomas:** interfaz en 8 idiomas (inglés, italiano, español, francés, rumano, árabe, portugués y turco) y textos en más.
- **Descargas:** 1M+.
- **Valoración:** 3,3 ★ (21 mil reseñas).
- **Lo que valoran:** que incluya los propios de memorias y conmemoraciones.
- **Lo que critican:** **una barra superior que bloquea los botones tras la última actualización (2026)** y que pierde el día actual al cambiar de app.

**11. Biblia Católica en español (appgp)**
- **Qué ofrece:** Biblia sin conexión con audio descargable, Evangelio del día, devocional y meditación en audio, trivia, marcadores de colores, imágenes para compartir y noticias.
- **Modelo de pago:** gratis **con anuncios**; una reseña menciona una versión premium sin anuncios (precio no consta).
- **Idiomas:** solo español.
- **Descargas:** 5M+.
- **Valoración:** 4,8 ★ (106 mil reseñas).
- **Lo que valoran:** tener la Biblia siempre en el móvil y que sea fácil de usar.
- **Lo que critican:** el audio es lento y va desincronizado con el texto, y los anuncios. Según su ficha, comparte datos (ubicación, actividad) y no permite borrarlos.

### Ortodoxas

**12. Orthodox Calendar (Holy Trinity Orthodox / ROCOR)**
- **Qué ofrece:** vidas de santos, iconos, troparios y kontakia, lecturas diarias, fiestas y ayunos, y calendario juliano.
- **Modelo de pago:** gratis; según una reseña, sin anuncios. Declara que no recopila datos.
- **Idiomas:** inglés y ruso.
- **Descargas:** 100K+.
- **Valoración:** 4,8 ★ (1,5 mil reseñas).
- **Lo que valoran:** todo el día en una sola pantalla, sencilla y sin distracciones, y la doble fecha (calendario antiguo y nuevo).
- **Lo que critican:** las reseñas visibles no tienen críticas.

**13. Православный календарь (Oleksandr Kotyuk, ruso)**
- **Qué ofrece:** calendario de fiestas y santos (vista de día y de mes), libro de oraciones, Biblia sinodal, lecturas del Apóstol y del Evangelio, troparios y kontakia, Pascua, días de difuntos, ayunos, pensamientos de Teófano el Recluso y de los ancianos de Óptina, widgets y uso sin conexión.
- **Modelo de pago:** gratis; declara que no recopila datos.
- **Idiomas:** ruso (una reseña de 2023 pide inglés).
- **Descargas:** 1M+.
- **Valoración:** 4,8 ★ (41 mil reseñas).
- **Lo que valoran:** oraciones fieles a la tradición, sin distracciones, y el tema de día y de noche.
- **Lo que critican:** solo la falta de inglés.

**14. Greek Orthodox Calendar / Russian Orthodox Calendar (Eir3 Apps, griego y ruso)**
- **Qué ofrece:** fiestas y santos de cualquier fecha, ayunos, navegación por el ciclo pascual, enlaces a lecturas y al typikon, uso sin conexión y aviso de la fiesta del día siguiente.
- **Modelo de pago:** gratis, financiada por donaciones; declara que no recopila datos.
- **Idiomas:** una app separada por idioma (griego, ruso, inglés).
- **Descargas:** 100K+ (la griega).
- **Valoración:** 3,1 ★ la griega (3 mil reseñas).
- **Lo que critican:** que no esté traducida al inglés dentro de la misma app; piden los apolitikia de cada santo.

**15. Calendar Ortodox (iMobileTech, rumana) y otras rumanas**
- **Qué ofrece:** calendario 2026 con santos, ayunos y días con pescado o vino; notificaciones; asistente de IA («guía espiritual»); acatistos y Salterio completo; vela virtual por vivos y difuntos; Oración de Jesús al ritmo de la respiración; rosario (komboskini) con estadísticas; guía de confesión; widget y libros de oraciones en PDF.
- **Modelo de pago:** freemium. Las notificaciones de santo, ayuno y fiesta son gratis; las oraciones de mañana y noche y el onomástico son Premium; el asistente de IA da 7 preguntas gratis y 100 al mes en Premium. El precio no consta en la ficha.
- **Idiomas:** rumano.
- **Descargas:** solo 500+ (es nueva). Otra rumana, de Mihai Cojocaru, tiene 100+ y anuncios.
- **Por qué interesa:** muestra hacia dónde va el mercado ortodoxo rumano (acatistos, velas, Oración de Jesús, IA), aunque todavía tiene muy pocos usuarios.
- **Azbuka Very (fundación rusa):** tiene 12 apps separadas (oraciones por horas, biblioteca, molitvoslov, calendario, «Pomiannik», ayuno según el Typikon…) con valoraciones de 2,8 a 5,0; Google Play no muestra sus descargas.

### Web

**16. OCA.org (Iglesia Ortodoxa en América)**
- **Qué ofrece:** lecturas diarias (Epístola y Evangelio), vidas de santos con troparios, calendario de ayunos, preguntas y respuestas pastorales y directorio de parroquias.
- **Modelo de pago:** gratis, sin cuenta; donaciones opcionales.
- **Idiomas:** inglés.
- **Descargas:** no tiene app nativa.
- **Lo que se critica:** diseño anticuado, mala experiencia en el móvil, búsqueda pobre y sin audio ni comunidad (según una reseña de terceros).

### Tabla resumen

| App | Rama | Descargas (Play) | ★ | Modelo | Precio (EE. UU.) |
|---|---|---|---|---|---|
| YouVersion | Protestante/todas | 100M+ | 4,9 | Gratis, donaciones | — |
| Glorify | Protestante | 10M+ | 4,9 | Suscripción | ≈7–10 $/mes; 42–70 $/año (no claro) |
| Hallow | Católica | 10M+ | 4,5 | Freemium + suscripción | 9,99 $/mes · 69,99 $/año |
| Pray.com | Protestante | 5M+ | 4,7 | Suscripción + anuncios | no consta |
| Biblia Católica (appgp) | Católica | 5M+ | 4,8 | Anuncios | — |
| Laudate | Católica | 1M+ | 4,7 | Gratis | — |
| iBreviary | Católica | 1M+ | 3,3 | Gratis | — |
| Bible Gateway | Protestante | 1M+ | 2,9 | Anuncios + Plus | 6,99 $/mes · 69,99 $/año |
| BibleProject | Todas | 1M+ | 4,7 | Gratis, donaciones | — |
| Dwell | Protestante | 1M+ | 4,8 | Suscripción | 9,99 $/mes · 59,99 $/año |
| Abide | Protestante | 1M+ | 4,3 | Suscripción | 9,99 $/mes · 39,99 $/año |
| Правосл. календарь (Kotyuk) | Ortodoxa (ru) | 1M+ | 4,8 | Gratis | — |
| Orthodox Calendar (ROCOR) | Ortodoxa (en/ru) | 100K+ | 4,8 | Gratis | — |
| Greek Orthodox Calendar | Ortodoxa (el) | 100K+ | 3,1 | Gratis, donaciones | — |
| Calendar Ortodox (iMobileTech) | Ortodoxa (ro) | 500+ | 4,8 | Freemium | no consta |
| OCA.org | Ortodoxa (en) | web | — | Gratis | — |

## 3. Qué se saca en claro

1. **Nadie junta las tres tradiciones.** Las apps ortodoxas viven en un solo idioma (ruso, griego o rumano, a veces una app por idioma) y las católicas y protestantes ignoran el calendario ortodoxo. Que Phos sirva a las tres Iglesias en 9 idiomas, con el calendario propio de cada una, **es su hueco de mercado más claro**.
2. **Lo que más se critica en la competencia:** anuncios (Pray.com incluso pagando; Bible Gateway, Biblia Católica), contenido gratuito que pasa a ser de pago (Abide), rachas y planes que pierden el progreso (YouVersion, Hallow), fallos tras actualizaciones (iBreviary, Abide), audio desincronizado (Biblia Católica) y apps que comparten datos. Phos ya evita los anuncios y guarda los datos en el móvil; conviene **decirlo en la ficha de Google Play** y cuidar que la racha y el plan no fallen nunca.
3. **Las apps ortodoxas mejor valoradas son sencillas:** todo el día en una pantalla (santo, lecturas, tropario, ayuno), sin distracciones y sin conexión. Es lo que más agradecen los usuarios.
4. **El precio de referencia** de las suscripciones es de 9,99 $/mes y entre 40 y 70 $/año, casi siempre con prueba gratuita. Hallow, Dwell y Glorify ofrecen además un plan familiar o para regalar.
5. **Lo que de verdad vende una suscripción** es el audio con voz humana y las oraciones guiadas (Hallow, Abide, Dwell, Glorify). Phos hoy tiene la voz sintética del móvil.

## 4. Mejoras y extras posibles para Phos (20)

Leyenda de esfuerzo: **bajo** = días; **medio** = 1–3 semanas; **alto** = más de un mes o depende de derechos de textos o grabaciones.

| # | Mejora | Qué es | Quién lo tiene ya | Rama | Esfuerzo | Gratis / Premium |
|---|---|---|---|---|---|---|
| 1 | **Lecturas del día** | Apóstol y Evangelio (ortodoxos), lecturas de la Misa (católicos) o leccionario (protestantes), enlazadas a la Biblia de Phos en «Hoy». | Laudate, Hallow, iBreviary, Orthodox Calendar, Kotyuk, OCA | Todas | Medio (tablas de leccionario por Iglesia; el texto ya está en Phos) | **Gratis** (es lo que hace volver cada día) |
| 2 | **Tropario y kontakion del día** | Himnos de la fiesta y el santo en la pantalla «Hoy». | Orthodox Calendar, Kotyuk; los piden en Greek Orthodox Calendar | Ortodoxa | Medio (textos con derechos libres en griego, ruso y rumano) | Gratis |
| 3 | **Santos en los 9 idiomas** | Ahora salen solo en español; traducir las vidas breves. | Orthodox Calendar (en/ru), Laudate (16 idiomas) | Todas | Medio | Gratis |
| 4 | **Rosario y coronillas guiados** | Misterios del día, cuentas que se tocan y contador. | Hallow, Laudate, Calendar Ortodox (komboskini) | Católica (y komboskini ortodoxo) | Bajo | Gratis el Rosario; variantes en Premium |
| 5 | **Oración de Jesús / komboskini** | Contador de oraciones al ritmo de la respiración, con estadísticas. | Calendar Ortodox (iMobileTech) | Ortodoxa | Bajo | Gratis el contador; estadísticas en Premium |
| 6 | **Libro de oraciones por horas** | Oraciones de mañana y noche, Completas o Apódeipnon y Liturgia de las Horas resumida, según la Iglesia. | Laudate, iBreviary, Kotyuk, Azbuka («Молимся по часам») | Todas | Alto (textos y derechos de traducciones litúrgicas) | Mañana y noche gratis; Horas completas en Premium |
| 7 | **Akathistos y Paraklisis** | Biblioteca de akathistos (a la Madre de Dios, a san Nicolás…) con marcador de lectura. | Calendar Ortodox (iMobileTech) | Ortodoxa | Medio | Premium (uno gratis al mes o el de la fiesta) |
| 8 | **Examen de conciencia y preparación para la confesión** | Guía por mandamientos o categorías, privada y sin guardar nada fuera del móvil. | Laudate, Hallow (examen ignaciano), Calendar Ortodox | Todas (ortodoxa y católica sobre todo) | Bajo | Gratis |
| 9 | **Biblia en audio con voz humana** | Grabaciones reales, al menos el NT; para el griego existe la grabación de Apostolos Vavylis (Orthodox Media Network), que permite compartirla citando su texto (ya está en `vivlos.json`). | YouVersion, Dwell, Bible Gateway, Biblia Católica | Todas | Alto (derechos y peso de los archivos) | Premium (descarga sin conexión); escucha en streaming gratis |
| 10 | **Audio sincronizado con el texto** | Resaltar el versículo que suena (Phos ya lo hace con la voz sintética) y ajustar la velocidad. | Dwell («Read Along»); en Biblia Católica critican que no lo tenga | Todas | Bajo | Premium |
| 11 | **Widget gratuito del versículo y la fiesta del día** | Hoy el widget es Premium; los ortodoxos rusos lo tienen gratis. | YouVersion, Kotyuk, Calendar Ortodox | Todas | Bajo (ya existe) | Pasar a **gratis** (atrae usuarios); widget personalizable en Premium |
| 12 | **Aviso gratuito de ayuno y fiesta** | Hoy todos los recordatorios son Premium; la competencia ortodoxa avisa gratis del santo, el ayuno y la fiesta. | Calendar Ortodox, Greek Orthodox Calendar | Todas | Bajo | Gratis ayuno y fiesta; el resto sigue en Premium |
| 13 | **Intenciones y peticiones de oración** | Lista privada de intenciones (vivos y difuntos, el «pomiannik» ortodoxo) y, más adelante, peticiones compartidas con familia o grupo. | Hallow Family, Glorify, Azbuka («Помянник»), Calendar Ortodox (vela virtual) | Todas | Bajo (privada) / Alto (comunidad y moderación) | Privada gratis; grupos en Premium |
| 14 | **Retos de temporada en comunidad** | Retos de 40 días para Cuaresma, Gran Cuaresma y Adviento o Ayuno de Navidad, con fechas según cada Iglesia. | Hallow (Pray40, Pray25) | Todas | Medio (los retos ya existen) | Gratis el reto; contenido extra en Premium |
| 15 | **Plan familiar y regalo de Premium** | Plan familiar en Google Play y una opción para regalar Premium o pagarlo para otro. | Hallow (Friends & Family), Dwell (dúo/familia), Glorify («Pay it Forward») | Todas | Medio (Play Billing) | Premium |
| 16 | **Becas: Premium gratis a quien no pueda pagar** | Formulario sencillo para pedir Premium sin coste. Encaja con el espíritu de Phos. | Abide | Todas | Bajo (códigos promocionales de Google Play) | Premium (regalado) |
| 17 | **Sincronizar notas y subrayados entre dispositivos** | Con la cuenta de Google ya existente; copia de seguridad y exportar o importar. | YouVersion, Bible Gateway (donde los usuarios se quejan de perderlos) | Todas | Medio (servidor `phosbiblias.com/api`) | Copia local gratis; sincronización en la nube en Premium |
| 18 | **Biblias en paralelo y comparar ediciones** | Ver dos ediciones lado a lado (por ejemplo, la Septuaginta griega con la Reina-Valera, o la Vulgata con el español). | Bible Gateway (tablet), YouVersion | Todas | Medio | Gratis 2 columnas; 3 o más y el interlineal en Premium |
| 19 | **Historias bíblicas para niños y para dormir** | Relatos breves con audio para familias. | Hallow, Abide, Pray.com, Glorify, YouVersion (Bible App for Kids) | Todas | Alto (guiones e ilustraciones o audio) | Premium (algunas gratis) |
| 20 | **Directorio de parroquias o «encuentra tu iglesia»** | Enlace a los buscadores oficiales de cada Iglesia según el país (no un directorio propio). | OCA (solo Norteamérica) | Todas | Bajo (enlaces) | Gratis |

**Ideas que conviene NO copiar** (por lo que critican los usuarios): anuncios dentro de la oración (Pray.com), quitar contenido gratis que ya existía (Abide), audio que se pone solo al conectar el Bluetooth (Hallow) y compartir datos con terceros (Biblia Católica appgp). Un asistente de IA «guía espiritual» como el de Calendar Ortodox es posible, pero arriesgado en lo doctrinal y en coste; solo tendría sentido muy acotado y con advertencias.

### Prioridad sugerida (para la tarea 3)

1. **Rápidas y gratis, para atraer:** widget gratuito (11), aviso gratuito de ayuno y fiesta (12), examen de conciencia (8), Rosario y komboskini (4, 5), intenciones privadas (13).
2. **El corazón diario, en gratis:** lecturas del día (1), tropario (2) y santos en 9 idiomas (3).
3. **Lo que hace atractivo Premium:** Biblia en audio con voz humana (9, 10), akathistos y Horas (6, 7), sincronización (17), plan familiar y becas (15, 16).

## Fuentes

**Google Play (fichas consultadas el 14-11-2026)**
- [YouVersion Bible App + Audio](https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android)
- [Hallow: Prayer & Meditation](https://play.google.com/store/apps/details?id=app.hallow.android&hl=en_US)
- [Glorify: Devotional & Prayer](https://play.google.com/store/apps/details?id=com.glorify.app&hl=en_US)
- [Abide: Bible Meditation Prayer](https://play.google.com/store/apps/details?id=is.abide&hl=en)
- [Pray.com: Bible & Daily Prayer](https://play.google.com/store/apps/details?id=com.prayapp.client&hl=en_US&gl=US)
- [Dwell: Audio Bible](https://play.google.com/store/apps/details?id=com.dwellapp.dwell&hl=en_US)
- [Bible Gateway](https://play.google.com/store/apps/details?id=com.csnmedia.android.bg&hl=en_US)
- [BibleProject](https://play.google.com/store/apps/details?id=com.bibleproject&hl=en_US)
- [Laudate](https://play.google.com/store/apps/details?id=com.aycka.apps.MassReadings&hl=en_US)
- [iBreviary](https://play.google.com/store/apps/details?id=com.netguru.ibreviary&hl=en_US)
- [Biblia Católica en español (appgp)](https://play.google.com/store/apps/details?id=com.appgp.bibliacatolicaenespanol&hl=en_US)
- [Orthodox Calendar (Holy Trinity)](https://play.google.com/store/apps/details?id=com.holytrinityorthodox.orthodoxcalendar&hl=en_US)
- [Православный календарь (Kotyuk)](https://play.google.com/store/apps/details?id=oleksandr.kotyuk.orthodoxcalendarfree&hl=en_US)
- [Greek Orthodox Calendar (Eir3)](https://play.google.com/store/apps/details?id=eir.synaxarion.gr&hl=en_US&gl=US)
- [Calendar Ortodox (iMobileTech)](https://play.google.com/store/apps/details?id=ro.calendarortodox.app&hl=en_US)
- [Calendar Ortodox (Mihai Cojocaru)](https://play.google.com/store/apps/details?id=com.mihaicojocaru.calendarortodox&hl=en_US)
- [Apps de Azbuka Very en Google Play](https://play.google.com/store/apps/developer?id=AZBUKA+VERY%2C+FOND&hl=en_US)

**Precios y cifras**
- [Hallow · ¿Cuánto cuesta?](https://help.hallow.com/en/articles/2880438-how-much-does-it-cost)
- [Abide · How much does Abide cost](https://help.abide.com/hc/en-us/articles/23119147863955-How-Much-Does-Abide-Cost)
- [Bible Gateway Plus](https://www.biblegateway.com/plus)
- [Glorify · precios de compras en la App Store (apppricinglab)](https://apppricinglab.com/app/apple/1490587079)
- [Christian Today · YouVersion llega a mil millones de descargas](https://www.christiantoday.com/news/how-youversion-reached-its-one-billion-download-milestone)
- [Learn of Christ · reseña de OCA.org](https://learnofchrist.com/resources/oca)
- [OCA · lecturas mensuales](https://www.oca.org/readings/monthly)
