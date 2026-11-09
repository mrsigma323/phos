<?php
// Cuerpo de la página «Santo de hoy» (lo incluye santo-de-hoy.php)
$e = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
$lista = function (array $L, string $vacio) use ($e): string {
    if (!$L) return '<p class="small">' . $e($vacio) . '</p>';
    return '<ul class="shl">' . implode('', array_map(fn($n) => '<li>' . $e($n) . '</li>', $L)) . '</ul>';
};
$hoy = $SH_HOY;
?>
<section class="hero sub wrap"><p class="kicker">Santoral · <?= $e(sh_fecha($hoy, true)) ?></p><h1>Santo de hoy, <?= $e(sh_fecha($hoy)) ?></h1>
<p class="lead">Los santos que la Iglesia recuerda hoy, según cada tradición. Cada santo es un amigo de Dios que nos enseña a seguir a Cristo.</p></section>
<div class="wrap narrow" style="padding-bottom:20px">
 <section class="card pad40"><h2 class="h3">⛪ Iglesia católica</h2><?= $lista(sh_cat($hoy), 'Hoy no hay ningún santo destacado en nuestro santoral católico.') ?></section>
 <section class="card pad40" style="margin-top:20px"><h2 class="h3">☦️ Iglesia ortodoxa</h2>
  <p class="small"><b>Calendario nuevo</b> (Grecia, Constantinopla, Rumanía…)</p><?= $lista(sh_ort($hoy), 'Hoy no hay ningún santo destacado en nuestro santoral ortodoxo.') ?>
  <p class="small" style="margin-top:16px"><b>Calendario juliano</b> (Rusia, Serbia, Georgia, Jerusalén, Monte Athos…): hoy es el <?= $e(sh_fecha($hoy->modify('-13 days'))) ?> del calendario antiguo.</p><?= $lista(sh_jul($hoy), 'Hoy no hay ningún santo destacado en nuestro santoral ortodoxo.') ?></section>
 <section class="card pad40" style="margin-top:20px"><h2 class="h3">📖 Iglesias protestantes</h2><p>Las Iglesias protestantes no celebran un santoral, pero recuerdan con gratitud a los hombres y mujeres de fe de la Biblia. En la <a href="/">portada de Phos</a> te proponemos cada día un personaje bíblico.</p></section>
 <div class="phx-share" data-share="santo" data-title="Santo de hoy, <?= $e(sh_fecha($hoy)) ?>" data-text="<?= $e(implode(' · ', array_slice(array_values(array_unique(array_merge(sh_cat($hoy), sh_ort($hoy)))), 0, 3))) ?>"></div>
 <section class="card pad40" style="margin-top:20px"><h2 class="h3">Los próximos días</h2><ul class="shnext">
 <?php for ($i = 1; $i <= 6; $i++): $d = $hoy->modify("+$i days"); $n = array_slice(array_values(array_unique(array_merge(sh_cat($d), sh_ort($d)))), 0, 2); ?>
  <li><b><?= $e(sh_fecha($d, true)) ?></b><span><?= $e($n ? implode(' · ', $n) : '—') ?></span></li>
 <?php endfor; ?></ul>
 <p class="small" style="margin-top:14px">Consulta el <a href="santoral.html">santoral completo</a>, busca un santo por su nombre y mira las <a href="fiestas.html">fiestas del año</a>.</p></section>
</div>
