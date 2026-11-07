# Taller del agente Variados

Web estática e interactiva para capacitar a los operadores en el uso del agente Variados (Flow).
No tiene dependencias ni paso de compilación: son archivos HTML, CSS y JS listos para servir.

## Estructura

```
index.html                 página principal
styles.css                 estilos (parallax, animaciones, responsive)
app.js                     interacciones de cada sección
render.yaml                configuración opcional para Render (Blueprint)
assets/
  favicon.svg
  fonts/                   tipografías locales (no depende de Google Fonts)
  video/
    tutorial-agente-variados.mp4   video del taller (3:4)
    poster.jpg                     portada del video
```

## Cambiar el video

Reemplaza `assets/video/tutorial-agente-variados.mp4` por la versión nueva **con el mismo nombre** y súbelo.
Para un póster nuevo, reemplaza `assets/video/poster.jpg`.
Si prefieres YouTube, en `index.html` busca el comentario `VIDEO:` y sigue la instrucción.

## Probar en tu PC

Abre una terminal en esta carpeta y ejecuta:

```
python -m http.server 8000
```

Luego entra a http://localhost:8000

## Publicar

1. Sube esta carpeta a un repositorio de GitHub.
2. En Render: **New → Static Site**, elige el repositorio, deja **Build Command** vacío y pon **Publish Directory** = `.`
3. Cada vez que hagas push a `main`, Render vuelve a publicar solo.
