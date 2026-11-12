<?php require __DIR__.'/api/_lib/santo_hoy.php'; ?><!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= htmlspecialchars($SH_TITLE) ?></title>
<meta name="description" content="<?= htmlspecialchars($SH_DESC) ?>">
<meta name="theme-color" content="#4A1416">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
<link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:title" content="<?= htmlspecialchars($SH_TITLE) ?>">
<meta property="og:description" content="<?= htmlspecialchars($SH_DESC) ?>">
<meta property="og:image" content="https://phosbiblias.com/og.png">
<meta name="color-scheme" content="light">
<link rel="preload" href="/fonts/cormorant-lat.woff2" as="font" type="font/woff2" crossorigin> <link rel="preload" href="/fonts/sourcesans3-lat.woff2" as="font" type="font/woff2" crossorigin> <link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="web.css?v=765a73ad">
<link rel="canonical" href="https://phosbiblias.com/santo-de-hoy">
<meta property="og:url" content="https://phosbiblias.com/santo-de-hoy">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Phos">
<meta property="og:locale" content="es_ES">
<meta name="twitter:card" content="summary_large_image">
</head>
<body>
<a class="skip" href="#inicio">Saltar al contenido</a>
<header class="top">
 <div class="wrap topin">
  <a href="./" class="brand">
   <svg aria-hidden="true" width="30" height="40" viewBox="0 0 30 40" fill="none" stroke="#E2C27A" stroke-width="2.2" stroke-linecap="round"><path d="M15 3v34M10 8h10M5 16h20M9 29l12-5"/></svg>
   <span><b>Phos</b><small>ΦΩΣ ΧΡΙΣΤΟΥ · La luz de Cristo</small></span>
  </a>
  <nav aria-label="Principal" class="nav">
   <a href="index.html">Inicio</a><a href="lecturas.html">Lecturas</a><a href="biblias.html">Biblia</a><a href="santoral.html">Santoral</a><a href="calendario.html">Calendario</a><a href="cantos.html">Cantos</a><a href="salud.html">Salud y bienestar</a><a href="oraciones.html">Oraciones</a><a href="apoya.html" class="navdon">🕯️ Apoyar</a>
  </nav>
  <span class="topr"><a href="mi-phos.html" class="acct" id="acctLink">👤 Entrar</a>
  <button type="button" class="infobtn" id="infoBtn" aria-label="Fuentes, derechos de autor y aviso legal" title="Fuentes, derechos de autor y aviso legal" aria-haspopup="dialog">i</button></span>

 </div>
</header>
<div class="wrap"><div class="ad-slot ad-top" aria-hidden="true"></div></div>
<?php require __DIR__.'/api/_lib/santo_hoy_body.php'; ?>
<section class="wrap explore"><p class="kicker center">Sigue explorando</p><h2 class="h2 center">Descubre más en Phos</h2><div class="xgrid"><a href="index.html" class="xcard"><span class="xi">🏠</span><b>Inicio</b><span>Hoy: ayuno, fiesta y oración del momento.</span><em>Entrar →</em></a><a href="lecturas.html" class="xcard"><span class="xi">📜</span><b>Lecturas</b><span>Las palabras de Jesús, el versículo del día y la reflexión.</span><em>Entrar →</em></a><a href="biblias.html" class="xcard"><span class="xi">📖</span><b>Biblia</b><span>El salmo del día.</span><em>Entrar →</em></a><a href="salud.html" class="xcard"><span class="xi">🌿</span><b>Salud y bienestar</b><span>Ayuno, recetas y oración.</span><em>Entrar →</em></a><a href="oraciones.html" class="xcard"><span class="xi">🙏</span><b>Oraciones</b><span>Las oraciones de tu Iglesia, por apartados.</span><em>Entrar →</em></a><a href="calendario.html" class="xcard"><span class="xi">📅</span><b>Calendario</b><span>Fiestas, santos y ayunos de cada día del mes.</span><em>Entrar →</em></a><a href="santoral.html" class="xcard"><span class="xi">😇</span><b>Santoral</b><span>El santo de hoy y cuándo es tu onomástica.</span><em>Entrar →</em></a><a href="fiestas.html" class="xcard"><span class="xi">⛪</span><b>Una fiesta, tres Iglesias</b><span>Cómo vive cada Iglesia las fiestas de Cristo.</span><em>Entrar →</em></a><a href="recetas.html" class="xcard"><span class="xi">🥣</span><b>Recetas de ayuno</b><span>Qué cocinar según el ayuno de hoy.</span><em>Entrar →</em></a><a href="articulos.html" class="xcard"><span class="xi">📚</span><b>Artículos</b><span>Para leer con calma: fiestas, ayuno y oración.</span><em>Entrar →</em></a><a href="sobre-phos.html" class="xcard"><span class="xi">✨</span><b>Sobre Phos</b><span>Quién hay detrás y qué se publica.</span><em>Entrar →</em></a><a href="muro-oracion.html" class="xcard"><span class="xi">🕯️</span><b>Muro de oración</b><span>Pide oración y reza por los demás.</span><em>Entrar →</em></a><a href="cantos.html" class="xcard"><span class="xi">🎵</span><b>Cantos</b><span>Música litúrgica, explicada.</span><em>Entrar →</em></a></div></section>
<footer class="foot">
 <div class="wrap row">
  <div class="grow"><p class="fbrand">Phos Biblias</p><p>Phos es un proyecto independiente para vivir la fe cada día con la Biblia. Los textos bíblicos son de dominio público; las fuentes y licencias se detallan en <a href="sobre-phos.html#fuentes">Sobre Phos</a>.</p></div>
  <nav aria-label="Redes sociales de Phos" class="legal social"><span class="sgt">Síguenos</span><a href="/facebook" rel="me">Facebook</a><a href="https://www.instagram.com/phosbiblias/" rel="me noopener" target="_blank">Instagram</a><a href="https://www.youtube.com/@phosbiblias" rel="me noopener" target="_blank">YouTube</a></nav><div class="fsup"><p class="fbrand">Apoya Phos</p><p>Phos es gratuito para todos. Puedes colaborar con una aportación voluntaria.</p><p class="flinks"><a href="apoya.html#puntual">🕯️ Aportación puntual</a><a href="apoya.html#mensual">🌿 Aportación mensual</a></p></div><nav aria-label="Legal" class="legal"><a href="articulos.html">Artículos</a><a href="apoya.html">Apoya Phos</a><a href="sobre-phos.html">Sobre Phos</a><a href="muro-oracion.html">Muro de oración</a><a href="normas-comunidad.html">Normas de la comunidad</a><a href="condiciones-aportaciones.html">Condiciones de las aportaciones</a><a href="aviso-legal.html">Aviso legal</a><a href="privacidad.html">Privacidad</a><a href="cookies.html">Cookies</a></nav>
 </div>
</footer>
<script src="phos-web-core.js?v=765a73ad"></script><script src="phos-data.js?v=765a73ad"></script>
<script src="santos.js?v=765a73ad"></script>
<script src="web.js?v=765a73ad"></script>
<script src="account.js?v=765a73ad"></script>
<script src="community.js?v=765a73ad"></script>
<dialog id="infoDlg" class="infodlg" aria-labelledby="infoTt"><h2 id="infoTt">Fuentes, derechos de autor y aviso legal</h2><p>Todos los textos bíblicos de Phos son de <b>dominio público</b> o se publican según su licencia, y proceden de <b>eBible.org</b>.</p><p class="infoeds">Septuaginta · Texto patriarcal de 1904 · Vulgata Clementina · Reina-Valera 1909 · Códice de Leningrado · Textus Receptus · Santa Biblia libre para el mundo · Brenton 1851 · World English Bible · Douay-Rheims 1899 · King James Version · Bíblia Sagrada Livre para o Mundo · Sainte Bible libre pour le monde · Louis Segond 1910 · Riveduta 1927 · Lutherbibel 1912 · Traducción sinodal rusa (1876) · Biblia liberă</p><p>La <b>Septuaginta</b> (Antiguo Testamento griego de la Biblia ortodoxa) se publica con esta nota, como pide su editor:</p><div class="vivlos" lang="en">ORTHODOX MEDIA NETWORK-ΟΡΘΟΔΟΞΟ ΔΙΚΤΥΟ ΕΝΗΜΕΡΩΣΗΣ
A Voice from the Heart of Mount Athos to the World
Orthodox Media Network (
https://vivlos.link/DEqNY
) was founded on Mount Athos – the only monastic republic in the world – with main mission to promote the Holy Scriptures and preserve the spiritual and cultural heritage of Orthodox monasticism, using mainly the internet.
Since 2010, its founder and General Secretary, Apostolos Vavylis, has become the first person internationally to record the entire Bible in both the original ancient Greek text and its modern Greek translation. This work – unprecedented in Orthodox tradition – has reached and inspired millions:
* Over 15 million people (estimated) have listened to at least one chapter of the recorded Bible.
* Hundreds of independent accounts across nearly every digital platform, share these recordings in countless forms.
We have never claimed copyright or demanded takedowns of these reproductions — because our goal is not profit, but the free and faithful dissemination of the Word of God and the blessing it brings to the world.
We welcome anyone that would like to publicly share our work with the only condition to publish the present text as a minimum respect to our mission.
* Our vision:
To place a Bible in every Greek-speaking home, wherever it may be on earth.
There are an estimated 17 million Greeks living in nearly 100 countries.
* If you wish to support or partner with us, please contact:
* 
vivlos.net@gmail.com
The Old Testament (Septuaginta)
We are a voice of Orthodoxy, a witness of the Word, and a blessing to the Nations.
2026-02-13</div><p>El diseño, los textos propios y el código de Phos pertenecen a su titular. Más información en <a href="aviso-legal.html">Aviso legal</a>, <a href="privacidad.html">Privacidad</a>, <a href="cookies.html">Cookies</a> y <a href="sobre-phos.html#fuentes">Sobre Phos</a>.</p><form method="dialog"><button class="btn">Cerrar</button></form></dialog><script>(function(){var b=document.getElementById("infoBtn"),d=document.getElementById("infoDlg");if(b&&d){b.onclick=function(){d.showModal?d.showModal():d.setAttribute("open","")};d.addEventListener("click",function(e){if(e.target===d)d.close()})}})();</script>
</body>
</html>
