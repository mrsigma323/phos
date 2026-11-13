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

## Entrar con Google (versión 2.1)
1. Google Cloud Console › proyecto de Phos › «Pantalla de consentimiento de OAuth»: nombre Phos, correo de soporte, enlace a la política de privacidad.
2. Credenciales › Crear ID de cliente › **Aplicación web**. Copia el ID (termina en `.apps.googleusercontent.com`).
3. Credenciales › Crear ID de cliente › **Android**: paquete `com.phos.biblia` y la huella SHA-1 de la «clave de firma de apps» que muestra Play Console › Integridad de la app (y otra con la de la clave de subida para las pruebas).
4. El ID web se pone en dos sitios: `android/app/src/main/res/values/strings.xml` (`google_web_client_id`) y en `phos-config.php`:
   `'google_client_ids' => ['TU-ID.apps.googleusercontent.com'],`
5. En Play Console › Seguridad de los datos: declarar correo electrónico (cuenta), y datos de la app (subrayados, notas, diario) sincronizados con consentimiento, con opción de borrado en la app y en phosbiblias.com › Mi Phos.

## Gratis y Premium en 2.1
- Gratis: portada Hoy, racha, compartir imagen, Reto del día, cuenta y sincronización.
- Premium: ¿Quién soy?, Versículo desordenado, Línea del tiempo, Viajes de la Biblia, escuchar capítulos con temporizador, planes de lectura, regla de oración, diario espiritual, fondos de pantalla, widget y recordatorios.
