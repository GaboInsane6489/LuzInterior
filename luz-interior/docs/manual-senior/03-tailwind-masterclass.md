# 03. LA BIBLIA DE TAILWIND CSS (Masterclass & Referencia Completa)

> "No memorices todas las clases, entiende el sistema. Pero si necesitas memorizarlas, aquí están todas."

Este documento es tu referencia absoluta. Cubre el sistema de diseño, layout, tipografía, colores, efectos y la nueva potencia de Tailwind v4.

---

## 📜 ÍNDICE DE CONTENIDOS

1.  **El Sistema de Medidas (Spacing & Sizing)**
2.  **Tipografía (Typography)**
3.  **Colores y Fondos (Colors & Backgrounds)**
4.  **Bordes y Efectos (Borders & Effects)**
5.  **Layout y Posicionamiento (Flex, Grid, Position)**
6.  **Filtros y Transformaciones**
7.  **Estados Interactivos y Pseudo-clases**
8.  **Valores Arbitrarios (La Magia de v4)**

---

## 1. EL SISTEMA DE MEDIDAS (Spacing & Sizing)

Tailwind usa una escala proporcional. La unidad base es `4`.

- `1` unidad = `0.25rem` (aprox `4px`).
- `4` unidades = `1rem` (aprox `16px`).

### Padding (Relleno interno) y Margin (Espacio externo)

La sintaxis es: `{propiedad}-{lado}-{tamaño}`.

- **Propiedades:** `p` (padding), `m` (margin).
- **Lados:**
  - (nada) = Todos los lados
  - `x` = Izquierda y Derecha (Eje X)
  - `y` = Arriba y Abajo (Eje Y)
  - `t` = Top (Arriba)
  - `b` = Bottom (Abajo)
  - `l` = Left (Izquierda)
  - `r` = Right (Derecha)

| Clase  | CSS                | Píxeles (Aprox) | Uso Común                         |
| :----- | :----------------- | :-------------- | :-------------------------------- |
| `p-0`  | `padding: 0px`     | 0px             | Resetear padding                  |
| `p-1`  | `padding: 0.25rem` | 4px             | Detalles mínimos                  |
| `p-2`  | `padding: 0.5rem`  | 8px             | Espacio compacto                  |
| `p-3`  | `padding: 0.75rem` | 12px            | Botones pequeños                  |
| `p-4`  | `padding: 1rem`    | 16px            | **Estándar**: Cards, Contenedores |
| `p-6`  | `padding: 1.5rem`  | 24px            | Secciones aireadas                |
| `p-8`  | `padding: 2rem`    | 32px            | Encabezados grandes               |
| `p-10` | `padding: 2.5rem`  | 40px            | -                                 |
| `p-12` | `padding: 3rem`    | 48px            | Secciones principales             |
| `p-16` | `padding: 4rem`    | 64px            | Hero sections                     |
| `p-20` | `padding: 5rem`    | 80px            | -                                 |
| `p-24` | `padding: 6rem`    | 96px            | Separación masiva                 |

> **Nota:** La misma escala aplica para `m-`, `mt-`, `mx-`, etc.
> `mx-auto` es vital: Centra un contenedor horizontalmente.

### Width (Ancho) y Height (Alto)

| Clase       | CSS                  | Descripción                          |
| :---------- | :------------------- | :----------------------------------- |
| `w-full`    | `width: 100%`        | Ocupa todo el contenedor padre       |
| `w-screen`  | `width: 100vw`       | Ocupa todo el ancho de la pantalla   |
| `w-min`     | `width: min-content` | Tan pequeño como sea posible         |
| `w-max`     | `width: max-content` | Tan grande como sea necesario        |
| `w-fit`     | `width: fit-content` | Se adapta al contenido               |
| `w-1/2`     | `width: 50%`         | Mitad                                |
| `w-1/3`     | `width: 33.333%`     | Un tercio                            |
| `w-2/3`     | `width: 66.666%`     | Dos tercios                          |
| `w-1/4`     | `width: 25%`         | Un cuarto                            |
| `w-3/4`     | `width: 75%`         | Tres cuartos                         |
| `w-[350px]` | `width: 350px`       | **Valor Arbitrario** (Personalizado) |

- Para altura (`h-`), es igual: `h-full`, `h-screen` (toda la altura de la ventana), `h-4` (1rem), etc.
- **Truco Senior:** Usa `min-h-screen` para asegurar que una página siempre llene la pantalla, incluso si tiene poco contenido.

---

## 2. TIPOGRAFÍA (Typography)

### Font Size (Tamaño de fuente)

Incluye tamaño y _line-height_ (altura de línea) automática.

| Clase       | Font Size       | Line Height    | Uso Recomendado                      |
| :---------- | :-------------- | :------------- | :----------------------------------- |
| `text-xs`   | 0.75rem (12px)  | 1rem (16px)    | Legal, Copyright, Etiquetas pequeñas |
| `text-sm`   | 0.875rem (14px) | 1.25rem (20px) | Texto secundario, descripciones      |
| `text-base` | 1rem (16px)     | 1.5rem (24px)  | **El estándar**. Párrafos normales   |
| `text-lg`   | 1.125rem (18px) | 1.75rem (28px) | Intros, destacados                   |
| `text-xl`   | 1.25rem (20px)  | 1.75rem (28px) | Títulos de tarjetas (H3)             |
| `text-2xl`  | 1.5rem (24px)   | 2rem (32px)    | Subtítulos de sección (H2)           |
| `text-3xl`  | 1.875rem (30px) | 2.25rem (36px) | -                                    |
| `text-4xl`  | 2.25rem (36px)  | 2.5rem (40px)  | Títulos principales (H1)             |
| `text-5xl`  | 3rem (48px)     | 1.15           | Hero titles                          |
| `text-6xl`  | 3.75rem (60px)  | 1.15           | -                                    |
| `text-7xl`  | 4.5rem (72px)   | 1.15           | Logotipos gigantes, números          |
| `text-8xl`  | 6rem (96px)     | 1.15           | Impacto puro                         |
| `text-9xl`  | 8rem (128px)    | 1.15           | Fondo decorativo                     |

### Font Weight (Grosor)

| Clase             | CSS | Uso                                 |
| :---------------- | :-- | :---------------------------------- |
| `font-thin`       | 100 | -                                   |
| `font-extralight` | 200 | -                                   |
| `font-light`      | 300 | Estilo elegante/fino                |
| `font-normal`     | 400 | Texto regular                       |
| `font-medium`     | 500 | Destacar sutilmente                 |
| `font-semibold`   | 600 | **El mejor para títulos y botones** |
| `font-bold`       | 700 | Énfasis fuerte                      |
| `font-extrabold`  | 800 | -                                   |
| `font-black`      | 900 | Máximo impacto                      |

### Espaciado de Texto

- **Letter Spacing (Tracking):** Separación entre letras.

  - `tracking-tighter` (-0.05em)
  - `tracking-tight` (-0.025em) -> Úsalo en títulos grandes para que se vean modernos.
  - `tracking-normal` (0)
  - `tracking-wide` (0.025em) -> Úsalo en textos en mayúsculas pequeñas (overlines).
  - `tracking-widest` (0.1em)

- **Line Height (Leading):** Separación entre líneas.
  - `leading-none` (1) -> Vital para títulos multilinea grandes para que no se separen mucho.
  - `leading-tight` (1.25)
  - `leading-snug` (1.375)
  - `leading-normal` (1.5) -> Estándar para lectura.
  - `leading-relaxed` (1.625) -> Párrafos largos de blog.
  - `leading-loose` (2)

### Alineación y Decoración

- `text-left`, `text-center`, `text-right`, `text-justify`.
- `uppercase`, `lowercase`, `capitalize`.
- `underline`, `overline`, `line-through`, `no-underline`.
- `italic`, `not-italic`.

---

## 3. COLORES Y FONDOS (Colors & Backgrounds)

Tailwind incluye una paleta experta. Los colores van del 50 al 950.
Colores comunes: `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

### Dónde aplicar colores

1.  **Texto:** `text-{color}-{intensidad}`

    - Ej: `text-blue-500`, `text-slate-900`.
    - Opacidad: `text-blue-500/50` (50% opacidad).

2.  **Fondo:** `bg-{color}-{intensidad}`

    - Ej: `bg-white`, `bg-black`, `bg-red-100`.

3.  **Borde:** `border-{color}-{intensidad}`
    - Ej: `border-gray-200`.

### Background Images & Gradients

- **Gradientes Lindos:**
  Para hacer un gradiente, necesitas 3 pasos: Dirección, Color Inicial, Color Final.

  1.  `bg-gradient-to-{dir}`: `r` (right), `l` (left), `t` (top), `b` (bottom), `tr` (top-right), etc.
  2.  `from-{color}`
  3.  `to-{color}`
  4.  (Opcional) `via-{color}`: Para un color intermedio.

  _Ejemplo:_ `bg-gradient-to-r from-cyan-500 to-blue-500`

- **Clip Text (Texto con gradiente):**
  ```jsx
  <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
    Texto Mágico
  </span>
  ```

---

## 4. BORDES Y EFECTOS (Borders & Effects)

### Border Radius (Redondeo)

| Clase          | CSS    | Uso                                             |
| :------------- | :----- | :---------------------------------------------- |
| `rounded-none` | 0px    | Cuadrado perfecto                               |
| `rounded-sm`   | 2px    | Sutil                                           |
| `rounded`      | 4px    | Estándar antiguo                                |
| `rounded-md`   | 6px    | **Estándar moderno** (Inputs, botones pequeños) |
| `rounded-lg`   | 8px    | Tarjetas, Botones grandes                       |
| `rounded-xl`   | 12px   | Modales, Contenedores modernos                  |
| `rounded-2xl`  | 16px   | Tarjetas flotantes estilo iOS                   |
| `rounded-3xl`  | 24px   | Paneles grandes                                 |
| `rounded-full` | 9999px | Botones "Pill" (cápsula) o Avatares circulares  |

### Border Width (Grosor)

- `border-0` (0px)
- `border` (1px) -> El más común (a veces casi invisible, muy elegante).
- `border-2` (2px) -> Para inputs activos o botones outline.
- `border-4` (4px)
- `border-8` (8px)

### Box Shadow (Sombras)

Las sombras en Tailwind son muy sofisticadas, usan múltiples capas para suavidad.

| Clase          | Uso                                          |
| :------------- | :------------------------------------------- |
| `shadow-sm`    | Botones pequeños, inputs.                    |
| `shadow`       | (Normal) Elementos estáticos, cards simples. |
| `shadow-md`    | Cards al pasar el mouse, dropdowns.          |
| `shadow-lg`    | Modales, alertas flotantes.                  |
| `shadow-xl`    | Paneles grandes que flotan sobre todo.       |
| `shadow-2xl`   | Elementos "fuera" de la pantalla.            |
| `shadow-inner` | Sombra hacia adentro (efecto "hundido").     |
| `shadow-none`  | Quitar sombra.                               |

### Opacidad (Opacity)

Escala de 0 a 100.

- `opacity-0` (Invisible pero ocupa espacio).
- `opacity-50` (Fantasma).
- `opacity-100` (Visible).
- _Truco:_ `hover:opacity-80` es un efecto de botón muy barato y efectivo.

---

## 5. LAYOUT (Flexbox & Grid)

### Flexbox (`flex`)

El pan de cada día. Alinea cosas en una fila o columna.

1.  **Activar:** `flex` o `inline-flex`.
2.  **Dirección:**
    - `flex-row` (Defecto): Izquierda a derecha. →
    - `flex-col`: Arriba a abajo. ↓
    - `flex-row-reverse`: Derecha a izquierda. ←
    - `flex-col-reverse`: Abajo a arriba. ↑
3.  **Wrap (Saltar línea):**

    - `flex-nowrap`: Todo en una línea (se encoge si falta espacio).
    - `flex-wrap`: Si no cabe, baja a la siguiente línea.

4.  **Alineación Principal (`justify-{...}`)** (Eje de la dirección):

    - `justify-start`: Al inicio.
    - `justify-end`: Al final.
    - `justify-center`: Al centro.
    - `justify-between`: Uno al inicio, uno al final, espacio en medio.
    - `justify-around`: Espacio alrededor.
    - `justify-evenly`: Espacio exactamente igual.

5.  **Alineación Cruzada (`items-{...}`)** (Eje contrario):
    - `items-start`: Arriba (en row).
    - `items-end`: Abajo.
    - `items-center`: Centrado verticalmente.
    - `items-baseline`: Alineado a la línea base del texto.
    - `items-stretch`: Estirarse para llenar el alto (Defecto).

### Grid (`grid`)

Para mallas perfectas 2D.

1.  **Activar:** `grid`.
2.  **Columnas:** `grid-cols-{n}`.
    - `grid-cols-1`: 1 columna.
    - `grid-cols-3`: 3 columnas iguales.
    - `grid-cols-12`: El sistema de 12 columnas clásico.
3.  **Gap (Hueco):** `gap-{n}`, `gap-x-{n}`, `gap-y-{n}`.
4.  **Hijos (Span):**
    - `col-span-2`: Ocupa 2 espacios de columna.
    - `col-span-full`: Ocupa todo el ancho.
    - `row-span-2`: Ocupa 2 filas hacia abajo.

### Positioning

- **Tipos:** `static`, `fixed`, `absolute`, `relative`, `sticky`.
- **Coordenadas:** `top-0`, `bottom-4`, `left-1/2`, `right-full`.
- **Z-Index (Capas):** `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, `z-auto`. (En v4 y v3 JIT puedes usar arbitrarios `z-[100]`).

---

## 6. FILTROS Y TRANSFORMACIONES

Para efectos tipo Photoshop directo en el navegador.

### Filtros

- `blur-sm`, `blur-md`, `blur-xl`: Desenfoque gaussiano.
- `brightness-50` (Oscuro), `brightness-150` (Brillante).
- `contrast-150`.
- `grayscale` (Blanco y negro), `grayscale-0` (Color - útil para hover).
- `sepia`.

### Backend Blur (Backdrop)

El efecto "Video Esmerilado" o "Glassmorphism". Aplica el filtro a lo que está _detrás_ del elemento.
**Requisito:** El elemento debe tener transparencia (`bg-white/50`).

- `backdrop-blur-md`
- `backdrop-brightness-150`

### Transform

- **Scale:** `scale-90`, `scale-100`, `scale-105`, `scale-110`. (Ideal para hover).
- **Rotate:** `rotate-0`, `rotate-45`, `rotate-90`, `rotate-180`, `rotate-12`, `-rotate-6`.
- **Translate:** `translate-x-4`, `translate-y-full`.
- **Skew:** `skew-y-3`.

- **Animaciones Predefinidas:**
  - `animate-spin`: Para íconos de carga.
  - `animate-ping`: Efecto de radar/notificación.
  - `animate-pulse`: Para esqueletos de carga (Skeletons).
  - `animate-bounce`: Para flechas que señalan abajo.

---

## 7. INTERACTIVIDAD Y MODIFICADORES

Tailwind usa prefijos para estados. Se pueden apilar: `hover:focus:scale-110`.

### Estados Comunes

- `hover:`: Cuando el mouse está encima.
- `focus:`: Cuando se selecciona con teclado/clic (inputs).
- `active:`: Mientras se presiona clic.
- `disabled:`: Si tiene el atributo disabled.
- `visited:`: Enlaces visitados.
- `first:`: Solo el primer hijo.
- `last:`: Solo el último hijo.
- `odd:` / `even:`: Para tablas atigradas (impares/pares).

### Padre e Hijo (`group` y `peer`)

1.  **Group:** Estilar un hijo cuando haces hover en el PADRE.

    ```jsx
    <div className="group p-4 bg-white hover:bg-blue-500">
      <h3 className="text-black group-hover:text-white">
        El texto cambia a blanco cuando tocas la caja entera.
      </h3>
    </div>
    ```

2.  **Peer:** Estilar un hermano basándose en el estado de otro hermano (ej: validación de forms).
    ```jsx
    <input type="email" className="peer border-red-500" />
    <p className="invisible peer-invalid:visible text-red-500">
      El email es inválido.
    </p>
    ```

### Responsive Design (Breakpoints)

Tailwind es **Mobile First**. Las clases bases son para móvil. Los prefijos son para pantallas MÁS grandes.

- (base): Móvil (0px en adelante).
- `sm:`: Tablet pequeña / Móvil grande (640px).
- `md:`: Tablet normal (768px).
- `lg:`: Laptop (1024px).
- `xl:`: Desktop (1280px).
- `2xl:`: Wide Screen (1536px).

_Ejemplo clásico:_
`div class="w-full md:w-1/2 lg:w-1/3"`
(1 columna en móvil, 2 en tablet, 3 en desktop).

---

## 8. VALORES ARBITRARIOS (La Magia)

A veces el sistema de diseño no es suficiente. Necesitas exactamente 13px o un color específico de marca que no configurarás.

Usa corchetes `[]`.

- **Tamaño exacto:** `w-[345px]`, `h-[500px]`, `text-[13px]`.
- **Color hexadecimal directo:** `bg-[#1da1f2]` (Azul Twitter), `text-[#bada55]`.
- **Posición exacta:** `top-[17%]`.
- **Z-index loco:** `z-[9999]`.
- **Grid complejo:** `grid-cols-[200px_minmax(900px,_1fr)_100px]`.
- **Variables CSS:** `bg-[var(--mi-color)]`.

Esto elimina la necesidad de escribir CSS (`style="..."`) tradicional casi al 100%.

---

## RESUMEN DE COMPONENTES BÁSICOS

### Botón Primario

```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all active:scale-95">
  Click Aquí
</button>
```

### Card Básica

```jsx
<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
  <img className="w-full h-48 object-cover" src="..." alt="Cover" />
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Título</h2>
    <p className="text-gray-600">Descripción breve...</p>
  </div>
</div>
```

### Input Moderno

```jsx
<input
  type="text"
  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
  placeholder="Escribe algo..."
/>
```
