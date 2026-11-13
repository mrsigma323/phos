# Phos en Google Play: qué crear en Play Console

Paquete: `com.phos.biblia` · versión 2.0 (código 10)

## Suscripción
- ID del producto: `phos_premium` (nombre visible: «Phos Premium»)
- Planes base:
  - `mensual`: renovación automática cada mes
  - `anual`: renovación automática cada año
- Oferta opcional en el plan `mensual`: `prueba-7-dias` (prueba gratuita de 7 días, solo nuevos clientes)

## Aportaciones (productos únicos, consumibles)
- `apoyo_2`: «Un gesto»
- `apoyo_5`: «Un apoyo»
- `apoyo_10`: «Un gran apoyo»

Los precios se ponen en Play Console; la app los muestra tal y como los envía Google Play, en la moneda de cada país.

## Qué hay gratis y qué es Premium (app de Google Play)
- Gratis: las 15 Biblias, lector, búsqueda, marcadores, sección Hoy, Salud, Deporte, Más, las dos primeras unidades de cada curso, las tres primeras fiestas y los personajes.
- Phos Premium: recordatorios personalizados (oración de mañana y noche, ayuno, santo del día, plan de lectura), cursos completos con examen final, todas las fiestas, lenguas bíblicas, práctica y memorización.

## Gestión de la suscripción
`https://play.google.com/store/account/subscriptions?sku=phos_premium&package=com.phos.biblia`

## Firma
Secretos del repositorio (los pone el titular; nunca en el chat):
`PHOS_UPLOAD_KEYSTORE_B64`, `PHOS_UPLOAD_STORE_PASS`, `PHOS_UPLOAD_KEY_ALIAS`, `PHOS_UPLOAD_KEY_PASS`.
Sin ellos, el AAB sale sin firmar y solo sirve el APK de prueba.
