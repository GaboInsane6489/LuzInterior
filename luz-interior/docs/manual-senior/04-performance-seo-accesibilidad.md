# 04. Performance, SEO y Accesibilidad (Objetivo 100/100)

Llegar al "zona verde" (90-100) en Lighthouse no es suerte, es ingeniería.

## 1. Performance (Velocidad de Carga)

### A. Core Web Vitals (Métricas de Google)

1.  **LCP (Largest Contentful Paint):** ¿Qué tan rápido aparece lo más grande (imagen principal/título)?

    - _Objetivo:_ < 2.5s.
    - _Truco Senior:_ Optimiza imágenes. Usa formato `.webp` o `.avif`.
    - _Código:_ Si tienes una imagen gigante en el Hero, agrégale `fetchpriority="high"`.
      ```jsx
      <img src="/hero.webp" alt="Hero" fetchpriority="high" />
      ```

2.  **CLS (Cumulative Layout Shift):** ¿La página salta mientras carga?
    - _Objetivo:_ < 0.1.
    - _Truco Senior:_ Siempre pon `width` y `height` a imágenes y videos, o usa aspect-ratio en CSS. Reserva el espacio antes de que carguen.

### B. Lazy Loading (Carga Diferida)

No cargues cosas que el usuario no ve.

- **Imágenes:** `<img loading="lazy" />` (Nativo en HTML).
- **Componentes:** React Suspense (como hicimos en `App.jsx` con el router).

## 2. SEO (Search Engine Optimization)

Google no es humano, hay que hablarle en su idioma.

### A. La Trinidad de las Etiquetas (`<head>`)

Usando `react-helmet-async`.

1.  **Title:** Único por página. `Título Importante | Marca`.
2.  **Description:** Resumen de 160 caracteres que invita al clic.
3.  **Canonical:** Evita contenido duplicado.

```jsx
<Helmet>
  <title>Cursos de Meditación | Luz Interior</title>
  <meta
    name="description"
    content="Aprende a controlar tu paz mental con nuestros cursos certificados..."
  />
  <link rel="canonical" href="https://luzinterior.com/cursos" />
</Helmet>
```

### B. Open Graph (Para redes sociales)

Si compartes tu link en WhatsApp/Twitter y no sale foto, perdiste visitas.

```jsx
<meta property="og:title" content="Luz Interior" />
<meta property="og:image" content="https://luzinterior.com/og-image.jpg" />
<meta property="twitter:card" content="summary_large_image" />
```

## 3. Accesibilidad (A11y)

Nivel Senior = Tu abuela y una persona ciega pueden usar tu web.

### Reglas de Oro

1.  **Alt Text:** TODA imagen informativa necesita `alt`. Si es decorativa, `alt=""`.
2.  **Contraste:** Texto gris claro sobre fondo blanco = Ilegible. Usa herramientas de contraste.
3.  **Teclado:** Debes poder navegar TODO el sitio solo con la tecla `Tab`.
    - NUNCA quites el `outline` del focus en CSS (`outline: none`) a menos que pongas otro estilo visual (`ring-2`).
4.  **Etiquetas ARIA (Solo si es necesario):**
    HTML5 ya es muy bueno. Usa `<button>` en vez de `<div role="button">`.
    Usa `aria-label` en botones que son solo íconos:
    ```jsx
    <button aria-label="Cerrar menú">
      <XIcon />
    </button>
    ```

## Checklist de Auditoría (Antes de salir a Producción)

- [ ] Correr Lighthouse en modo Incógnito.
- [ ] Verificar que todas las imágenes tengan `alt`.
- [ ] Navegar todo el sitio sin mouse (solo Tab y Enter).
- [ ] Verificar compartir el link en [Twitter Card Validator](https://cards-dev.twitter.com/validator).
