# Masterclass 08: Construyendo la Sección "Depresión & Superación" (Diseño B&W)

## 🎯 El Objetivo

Crear una sección narrativa, elegante y **minimalista**.
Vamos a alejarnos del diseño genérico de "plantilla azul" que te dio la IA anterior y vamos a construir algo **High-End (Alto Nivel)**.

**Reglas de Oro para este componente:**

1.  **Paleta Estricta**: Fondo BLANCO (`#ffffff`), Textos NEGROS (`#000000`). Nada de grises intermedios sucios.
2.  **Tipografía Refinada**: Usaremos tamaños contenidos. Lo "Senior" no es gritar con letras gigantes, es tener **espacio negativo** (aire) y buena legibilidad.
3.  **Semántica Sagrada**: Usaremos `<section>`, `<article>`, `<h2>`, `<p>`.

---

## 1. Preparación del Componente

En React, lo ideal es separar esto en su propio archivo para mantener `Landing.jsx` limpio.

**Crea el archivo:** `src/components/DepressionSection.jsx`

Esta será la estructura base. Copia esto mentalmente para entender la arquitectura:

```jsx
import React from "react";

// Si tienes iconos, impórtalos aquí. Si no, usaremos SVGs inline o texto por ahora.

export const DepressionSection = () => {
  return (
    <section className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-24">
      {/* Contenedor de Máximo Ancho (para que no se estire en pantallas 4k) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Columna Izquierda: Imagen / Visual */}
        <div className="relative">{/* AQUÍ IRÁ LA IMAGEN */}</div>

        {/* Columna Derecha: Narrativa */}
        <article className="space-y-8">{/* AQUÍ IRÁ EL TEXTO */}</article>
      </div>
    </section>
  );
};
```

---

## 2. El Código "Senior" (Paso a Paso)

Aquí está la implementación pulida. Nota cómo uso las clases de Tailwind para lograr ese look **Black & White** sofisticado.

### Clases Clave que usaremos:

- `bg-white` / `text-black`: La base.
- `text-sm` o `text-base`: Para mantener la elegancia. Evitamos `text-xl` en párrafos.
- `tracking-wide`: Aumenta el espaciado entre letras para un look más editorial.
- `border-black`: Para bordes duros y definidos, sin sombras difusas.

### Copia y estudia este código para `src/components/DepressionSection.jsx`:

```jsx
import React from "react";

export default function DepressionSection() {
  return (
    <section className="relative w-full bg-white text-black py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* 1. VISUAL (Izquierda) */}
          <div className="relative group">
            {/* Marco decorativo negro (offset) */}
            <div className="absolute top-4 left-4 w-full h-full border-2 border-black z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            {/* Imagen principal (Grayscale para mantener el tema B&W) */}
            <div className="relative z-10 w-full aspect-[4/5] overflow-hidden bg-gray-100 border-2 border-black">
              <img
                src=""
                alt="Persona mirando hacia la luz en un espacio minimalista"
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 2. NARRATIVA (Derecha) */}
          <article className="flex flex-col justify-center space-y-8">
            {/* Etiqueta pequeña */}
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-black"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Camino a la Serenidad
              </span>
            </div>

            {/* Título: No muy gigante, pero con peso */}
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight">
              La oscuridad no es
              <br />
              <span className="italic font-light">el final del camino.</span>
            </h2>

            {/* Texto de cuerpo: Pequeño pero legible (text-sm / leading-loose) */}
            <p className="text-sm md:text-base leading-loose text-gray-800 max-w-md text-justify">
              Entendemos la depresión no como un defecto, sino como una pausa
              necesaria del alma. En medio del ruido, encontrar el silencio
              interior es el primer paso para reconstruir la fortaleza que ya
              reside en ti.
            </p>

            {/* Lista de Features Minimalista */}
            <ul className="space-y-4 pt-4">
              {[
                "Espacios de escucha activa",
                "Guías de meditación visual",
                "Comunidad anónima de apoyo",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="w-2 h-2 bg-black rotate-45 transition-transform group-hover:rotate-0"></div>
                  <span className="text-sm font-medium hover:underline decoration-1 underline-offset-4">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Botón "High Fashion" */}
            <div className="pt-8">
              <button className="group relative px-8 py-3 bg-transparent overflow-hidden border border-black text-black transition-all hover:bg-black hover:text-white">
                <span className="relative z-10 text-xs font-bold uppercase tracking-widest">
                  Explorar Recursos
                </span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. Integración en `Landing.jsx`

Una vez crees el archivo, ve a `src/pages/Landing.jsx`:

1.  Impórtalo arriba:

    ```javascript
    import DepressionSection from "../components/DepressionSection";
    ```

2.  Colócalo justo debajo de tu componente `<Hero />` (o la primera sección):
    ```jsx
    // ... dentro del return
    <Navbar />
    <Hero />
    <DepressionSection /> {/* <-- ¡Aquí va! */}
    <Footer />
    ```

## 4. ¿Por qué este diseño es "Senior"?

1.  **Uniformidad**: Usar `grayscale` (escala de grises) en la imagen asegura que, sin importar qué foto subas, siempre combine con tu tema Blanco y Negro.
2.  **Micro-interacciones**: El borde desplazado (`absolute top-4 left-4`) que se mueve al hacer hover da una sensación de profundidad sin usar sombras sucias (`box-shadow`) que ensucian el diseño plano.
3.  **Tipografía**: Mezclar fuentes normales con _Itálicas_ (bastardillas) en el título (`<span className="italic">`) es una técnica de diseño editorial muy elegante.
4.  **Botones Planos**: En lugar de botones redondos con sombras 3D (estilo 2010), usamos botones rectangulares, bordes finos y tipografía mayúscula pequeña (`uppercase tracking-widest`).

¡Pruébalo! Copia el código en tu nuevo componente y mira cómo transforma la página.
