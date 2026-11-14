# Código de la app Phos (Android)

- Cada archivo `.js` es una parte de la app; `head.html` + `extra.css` son la cabecera y los estilos.
- Generar la app: `python3 assemble.py` → crea `site/index.html`.
- Copiarla a la APK: `cp site/index.html ../app/src/main/assets/www/index.html`
- Compilar: al subir la rama `app-google-play`, GitHub Actions compila la APK de prueba y la deja en la rama `apk-prueba`.
- Probar en el ordenador: `cd site && ln -s ../../../data/biblia data && python3 -m http.server 8790`
- La APK de prueba (depurable) tiene Phos Premium desbloqueado; la de Google Play no.
