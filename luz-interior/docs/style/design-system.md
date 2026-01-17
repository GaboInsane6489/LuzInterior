# Sistema de Diseño: Otoño Premium 🍂

Este documento define la identidad visual de **Mi Luz Interior**. Úsalo como guía para mantener la coherencia estética en cada nuevo componente.

## 🎨 Paleta de Colores

Buscamos un contraste alto pero elegante, inspirado en el minimalismo oscuro y tonos otoñales.

| Color          | Hex/Tailwind                 | Uso                                               |
| :------------- | :--------------------------- | :------------------------------------------------ |
| **Black Deep** | `#000000` / `bg-black`       | Fondos principales.                               |
| **Zinc Dark**  | `#09090b` / `bg-zinc-950`    | Contenedores secundarios, cards.                  |
| **White Pure** | `#ffffff` / `text-white`     | Títulos y texto principal.                        |
| **Gray Muted** | `#71717a` / `text-gray-400`  | Textos de apoyo, descripciones.                   |
| **Amber Glow** | `#f59e0b` / `text-amber-300` | Acentos, llamadas a la acción, líneas de énfasis. |

---

## 🖋️ Tipografía

- **Títulos:** `font-serif` (Ej: Playfair Display). Transmite autoridad, sabiduría y calma.
- **Cuerpo:** `font-sans` (Ej: Inter/Roboto). Transmite modernidad y limpieza.
- **Tracking:** Usa `tracking-widest` y `uppercase` para etiquetas pequeñas.

---

## ✨ Animaciones y Clases de Diseño

Aplica estas clases para lograr ese look "Senior" que buscas.

### 1. El "Efecto Línea" (Hover Dinámico)

Perfecto para links o títulos. Una línea que nace del centro o un lateral.

```html
<span className="relative group">
  Texto
  <span
    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-300 transition-all duration-500 ease-in-out group-hover:w-full"
  ></span>
</span>
```

### 2. Recuadros y Bordes Flotantes

Para imágenes o secciones destacadas (`DepressionSection`). Usa un borde que se desplaza al hacer hover.

```html
<div className="relative group">
  <img
    src="..."
    className="z-10 relative grayscale hover:grayscale-0 transition-all duration-700"
  />
  <div
    className="absolute -inset-2 border border-amber-300/30 -z-0 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"
  ></div>
</div>
```

### 3. Glassmorphism Otoñal

Para componentes que flotan sobre el fondo negro.

```html
<div
  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
>
  Contenido
</div>
```

---

## 🛠️ Utilidades de Performance

- **Transiciones:** Usa siempre `duration-500` o `duration-700` para que el movimiento sea fluido y no brusco.
- **Grayscale:** Empieza las imágenes en `grayscale` y pásalas a color en hover para reducir el ruido visual inicial.
- **Reveal on Scroll:** (Próximamente con Intersection Observer) deja que los elementos suban levemente al entrar en pantalla.

---

## 💡 Mantra de Diseño

> "Menos es más. El espacio vacío (negro) es tan importante como el contenido. El color ámbar es tu luz, úsalo con precisión, no en exceso."
