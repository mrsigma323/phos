# Tarea 3 · Las 5 mejoras aplicadas en la app (versión 2.2)

*Fecha: 14 de noviembre de 2026. Rama: `app-google-play` (sin fusionar con `main`, sin publicar). Hecho por una tarea programada (Claude) a partir de `2-mercado.md`.*

## Qué he hecho

| # | Mejora | Gratis | Phos Premium (Google Play) | Archivos |
|---|---|---|---|---|
| 1 | **Aviso de ayuno y fiesta** | Aviso de los días de ayuno y de las fiestas mayores de la Iglesia elegida (`O_MAJ` / `C_MAJ` / `P_MAJ`), con su hora | Oración de mañana y noche, santo del día, plan de lectura (marcados con 👑 y desactivados si no es Premium) | `premium.js` (`NDEF`, `NFREE`, `drawNotif`, `scheduleReminders`), `plus.js` (tarjeta de Mi Phos) |
| 2 | **Lecturas de hoy** (tarjeta en «Hoy») | Evangelio de la fiesta si la hay (tabla `FEASTS`); si no, lectura continua de los 4 Evangelios (un capítulo al día) y un Salmo; botón «Leer completo» que abre la Biblia | Ver las lecturas de otros días (‹ ›) | `mejoras.js` (`rdFor`, `drawReadings`) |
| 3 | **Rosario** (solo católicos) y **komboskini** (solo ortodoxos) | Rosario completo (65 pasos, cuentas que se tocan, misterios según el día de la semana, vibración); komboskini de 33/50/100 nudos con la Oración de Jesús | Escuchar en voz alta y el historial de rosarios | `mejoras.js` (`drawRosario`, `drawKombo`), textos en `mejoras_i18n.js` (Gloria, 20 misterios, Padrenuestro católico en el/ru/ro) |
| 4 | **Retos de temporada** (tarjeta en «Hoy») | Día n del reto, lectura con su texto, práctica del día, «Hecho hoy» y días hechos | «Todos los días del reto» para ponerse al día y ver el reto antes de que empiece | `mejoras.js` (`season`, `drawSeasonCard`, `drawSeasonAll`) |
| 5 | **Widget gratuito** | El widget recibe siempre fiesta/santo y versículo de los próximos 14 días | (sin cambios: no había estilos de pago que mantener) | `plus.js` (`feedWidget`), `res/values*/strings.xml` (quitado «Phos Premium:» del texto vacío) |

**Calendarios de los retos, sin mezclar Iglesias:**
- Ortodoxos: **Ayuno de Navidad** 15 nov–24 dic (28 nov–6 ene con el calendario juliano) y **Gran Cuaresma** desde el Lunes Puro (40 días, Pascua ortodoxa con `oPascha`). La palabra «Adviento» no aparece para ortodoxos. Práctica propia: Oración de Jesús con la cuerda.
- Católicos y protestantes: **Adviento** (1.er domingo de Adviento–24 dic) y **Cuaresma** (Miércoles de Ceniza–Sábado Santo, 40 días sin contar los domingos; el domingo sale un aviso de descanso). Práctica propia: un misterio del Rosario (católicos) o aprender un versículo (protestantes).
- Los protestantes no ven Rosario ni komboskini.

**Salud:** la tarjeta del reto y la lista de días llevan siempre el aviso: seguir la norma de la Iglesia adaptada a la salud, consultar al médico si hay enfermedad, embarazo o medicación, y «Phos no da consejo médico». Los avisos de salud que ya había no se han tocado.

**Idiomas:** todos los textos nuevos están en los 9 idiomas (`mejoras_i18n.js`). Español e inglés revisados; **pt, fr, it, de, el, ru y ro conviene que los revise un hablante nativo** (sobre todo los nombres de los misterios en griego y ruso y «Adviento» en griego).

**Versión:** `versionCode 12`, `versionName 2.2` (`build.gradle` y `BuildConfigLite.java`).

## Cómo lo he probado

- `python3 assemble.py` y comprobación de sintaxis con node (`new Function` sobre el script): sin errores.
- Playwright (Chromium, móvil de 390 px) con un `PhosApp` simulado, en gratis y en Premium, cambiando la fecha: ortodoxo es (15 nov 2026, día 1 del Ayuno de Navidad), católico es (8 dic), católico en Premium (3 dic, Adviento día 5 de 26), protestante en (12 feb 2027, Cuaresma día 3 de 40) y ortodoxo ru. Únicos errores de consola: las fuentes de Google (sin red en la prueba) y `sw.js` (no existe en el servidor local); ninguno de JavaScript.
- Comprobado que, sin Premium, se programan solo avisos de ayuno y fiesta y que el widget recibe datos.
- GitHub Actions compila la APK de prueba (rama `apk-prueba`, `phos-prueba.apk`; ojo: en esa APK Premium está desbloqueado).

**Para probar en el móvil:** instalar `phos-prueba.apk` → «Hoy»: tarjetas *Reto de temporada*, *Lecturas de hoy* y *Rezar el Rosario* / *Cuerda de oración* (cambia de Iglesia con los botones de arriba) → Mi Phos › Recordatorios. Para ver la parte gratuita hay que probar la versión de Google Play (la de prueba siempre es Premium).

## Pendiente

1. **Leccionarios oficiales**: lo que hay es una lectura continua propuesta por Phos (y así lo dice la app). Falta la tabla real: ortodoxa (Apóstol y Evangelio del ciclo pascual), católica (domingos A/B/C y feriales) y protestante (Revised Common Lectionary). Es el trabajo grande que queda de la mejora 2.
2. Revisión nativa de las traducciones (ver arriba).
3. Rosario: Credo y oración de Fátima no están incluidos; coronilla de la Divina Misericordia (pensada como Premium) sin hacer.
4. Avisos de los retos (recordatorio diario del reto) y meditación ampliada en Premium.
5. En la lista «Todos los días del reto», cada día dice «Lectura de hoy»; mejor «Lectura».
6. El aviso de fiesta depende del permiso de notificaciones: a los usuarios gratuitos no se les pide hasta que guardan en Recordatorios; quizá convenga ofrecerlo en «Hoy».
7. Comprobar en Google Play Console que la ficha y la lista de ventajas de Premium no prometen ya el widget ni los avisos de ayuno como de pago (`PLAY_CONSOLE.md`, texto `f1` de `premium_i18n.js`).
