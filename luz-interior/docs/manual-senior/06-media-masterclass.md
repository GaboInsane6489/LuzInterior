# 06. Masterclass de Medios: Imágenes, Video y Performance

> "Una imagen vale más que mil palabras, pero una imagen de 5MB te cuesta mil usuarios."

Esta guía te enseña a manejar assets como un Ingeniero Frontend Senior: optimizados, responsivos y estilizados.

---

## 1. Dónde poner las imágenes: `src/assets` vs `public`

Esta es la duda #1 de todos.

### A. La carpeta `src/assets/` (RECOMENDADO)

Usa esta para imágenes que son parte de tu UI (logos, iconos, fondos fijos).

- **Ventaja:** Vite procesa la imagen, le añade un hash (para caché) y puede optimizarla.
- **Cómo usar:** Importándola como si fuera un módulo de JS.

```javascript
/* Top del archivo */
import heroImage from "../assets/hero-bg.webp";

/* En el JSX */
<img src={heroImage} alt="Fondo principal" />;
```

### B. La carpeta `public/`

Usa esta para imágenes que NO van a cambiar nunca de nombre o necesitas una URL fija (ej: `luzinterior.com/logo.png` para emails).

- **Ventaja:** Accesible directamente desde la URL raíz.
- **Cómo usar:** Ruta absoluta desde la raíz.

```javascript
/* En el JSX (sin import previo) */
<img src="/logo-email.png" alt="Logo" />
```

---

## 2. Imágenes en React + Tailwind (Best Practices)

### La Santísima Trinidad del Estilo

Para que una imagen nunca rompa tu diseño:

1.  **Tamaño:** Define siempre ancho o alto.
2.  **Object Fit:** Evita que se estire (deforme).
3.  **Rounded:** Suaviza los bordes.

```jsx
<img
  src={profilePic}
  alt="Gabriel"
  className="w-32 h-32 object-cover rounded-full shadow-lg border-2 border-white"
/>
```

### `object-cover` vs `object-contain`

- `object-cover`: Recorta la imagen para llenar el contenedor (Zoom, no deforma). **Ideal para cards y fondos.**
- `object-contain`: Asegura que se vea la imagen entera (Barras negras si sobra espacio). **Ideal para logos.**
- `object-center`: Centra el recorte (o `object-top`, `object-bottom`).

```jsx
/* Card de Blog Perfecta */
<div className="w-full h-64 overflow-hidden rounded-xl">
  <img
    src={postImage}
    alt="Titulo del post"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  />
</div>
```

---

## 3. Videos: YouTube y MP4 Local

### A. Video de YouTube (Responsive)

El `<iframe>` por defecto de YouTube no es responsive. Con Tailwind lo arreglamos usando `aspect-video`.

```jsx
<div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
  <iframe
    className="w-full aspect-video"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video de Meditación"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

- `aspect-video`: Mantiene automáticamente la proporción 16:9 al achicar la pantalla.

### B. Video Local (MP4/WebM)

Ideal para fondos animados (Hero Section).

- **Atributos clave:** `autoPlay`, `loop`, `muted`, `playsInline` (para móvil).
- **Truco Senior:** Ponle un `poster` (imagen estática) que se muestra mientras carga el video.

```jsx
<div className="relative w-full h-screen">
  {/* El Video de Fondo */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
    autoPlay
    loop
    muted
    playsInline
    poster="/assets/hero-poster.jpg"
  >
    <source src="/assets/hero-video.mp4" type="video/mp4" />
  </video>

  {/* Contenido encima del video */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-white text-6xl font-bold">Luz Interior</h1>
  </div>
</div>
```

---

## 4. Performance: Core Web Vitals (Nivel 100/100)

Google castiga las imágenes lentas.

### A. Formato Moderno

Usa **WebP** o **AVIF** siempre que puedas. Pesan 30-50% menos que JPG/PNG con la misma calidad.

### B. Lazy Loading

- Para imágenes que **NO SE VEN** al abrir la página (están abajo):
  `<img loading="lazy" ... />`
- Para la imagen PRINCIPAL (Hero) que **SÍ SE VE**:
  `<img fetchpriority="high" ... />` (Nunca uses lazy aquí).

### C. Dimensiones Explícitas

Siempre intenta poner `width` y `height` en los atributos HTML (no solo CSS) para evitar saltos (CLS).

```jsx
<img
  src={...}
  width="800"
  height="600"
  className="w-full h-auto"
  alt="..."
/>
```

---

## 5. El componente `Link` vs `a`

- **Usa `<Link to="/ruta">`**: Para moverte DENTRO de tu app. Es instantáneo, no recarga.
- **Usa `<a href="google.com">`**: Para ir a sitios EXTERNOS.
  - **Seguridad:** Siempre usa `target="_blank" rel="noopener noreferrer"` para enlaces externos.

```jsx
import { Link } from "react-router-dom";

/* Enlace Interno */
<Link to="/about" className="text-blue-500 hover:underline">
  Ir a Nosotros
</Link>

/* Enlace Externo Seguro */
<a
  href="https://youtube.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-red-500 hover:text-red-600"
>
  Ver Canal
</a>
```

---

## 6. Efectos Creativos con Imágenes

### Filtros con Tailwind (`grayscale`, `blur`, `blend`)

```jsx
/* Imagen blanco y negro que se colorea al pasar el mouse */
<img
  src={foto}
  className="w-64 h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
/>

/* Imagen que se mezcla con el fondo (Blend Mode) */
<div className="bg-blue-600">
  <img src={textura} className="mix-blend-overlay opacity-50" />
</div>
```

### Máscaras y Gradientes sobre imágenes

Para que el texto se lea bien sobre una foto, ponle un degradado negro ("overlay").

```jsx
<div className="relative w-full h-96">
  <img src={fondo} className="w-full h-full object-cover" />

  {/* Gradiente negro abajo hacia arriba */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

  <h2 className="absolute bottom-6 left-6 text-white text-3xl font-bold">
    Texto Legible
  </h2>
</div>
```
