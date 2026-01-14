# 09. Masterclass: Domina los Íconos y Assets como un Senior

Un Senior no busca "iconos gratis png" en Google imágenes. Un Senior usa librerías de SVGs vectoriales que son livianos, escalables y se pueden colorear con Tailwind.

## 1. Dónde encontrar los mejores íconos (Gratis)

Olvídate de buscar por todos lados. Solo necesitas estos 3 recursos:

### A. La "Navaja Suiza": [React Icons](https://react-icons.github.io/react-icons/)

Es una librería que **agrupa** todos los sets populares (FontAwesome, Material, etc) en un solo paquete instalable.

- **Ventaja**: Tienes acceso a miles de iconos.
- **Desventaja**: Si no tienes cuidado con el "Tree Shaking", puede pesar mucho tu bundle (pero Vite lo maneja bien).

### B. La opción "Moderna y Limpia": [Lucide React](https://lucide.dev/guide/packages/lucide-react) 🔥 (Mi Recomendación)

Es la evolución de Feather Icons. Son iconos minimalistas, de trazo perfecto y muy consistentes. Es lo que usan las grandes startups ahora.

- **Comando**: `pnpm add lucide-react`

### C. La opción "Clásica Sólida": [Heroicons](https://heroicons.com/)

Creados por los mismos dueños de Tailwind CSS.

- Diseñados para encajar perfecto en grids de 20px o 24px.
- **Comando**: `pnpm add @heroicons/react`

---

## 2. Cómo instalarlos y usarlos (Tutorial Práctico)

Vamos a instalar **Lucide React** en tu proyecto `LuzInterior`, ya que va perfecto con tu estilo minimalista.

1.  Abre tu terminal en la carpeta del proyecto.
2.  Ejecuta:

    ```bash
    pnpm add lucide-react
    ```

3.  **Uso en código**:

```jsx
import React from "react";
// Importa el nombre del icono que buscaste en la web de lucide.dev
import { Heart, ArrowRight, Menu } from "lucide-react";

export const MyComponent = () => {
  return (
    <div className="flex gap-4">
      {/* Icono simple */}
      <Heart />

      {/* Icono estilizado con Tailwind (Color y Tamaño) */}
      <ArrowRight className="text-red-500 w-8 h-8" />

      {/* Icono con hover */}
      <Menu className="text-gray-500 hover:text-black cursor-pointer transition-colors" />
    </div>
  );
};
```

¡Así de fácil! No hay que descargar archivos, ni pegarlos en carpetas. Son componentes.

---

## 3. Manejo de Imágenes (JPG / PNG / WebP)

Senior, deja de usar PNGs pesados para fotos.

### La Regla de Oro:

- **Iconos / Logos simples** -> Usa **SVG** (Vector).
- **Fotografías** -> Usa **WebP**.

### ¿Cómo convertir a WebP?

No necesitas Photoshop.

1.  Busca tu imagen en [Unsplash](https://unsplash.com/).
2.  Ve a [Squoosh.app](https://squoosh.app/) (Es de Google).
3.  Arrastra tu imagen.
4.  Baja la calidad al 75% o 80%.
5.  Selecciona "WebP" en la derecha.
6.  ¡Descarga! Pasará de pesar 2MB a 50kb sin perder calidad visible.

---

## 4. Tarea para LuzInterior

Para tu sección de "DepressionSection", en lugar de usar los cuadraditos negros rotados (`<div className="w-2 h-2..." />`), podrías probar usando un icono real.

1.  Instala Lucide: `pnpm add lucide-react`
2.  Busca "Sparkles" o "Star" en [lucide.dev](https://lucide.dev/icons/).
3.  Reemplaza el `<div>` por `<Sparkles className="w-4 h-4 text-black" />`.

¡Eso elevará el nivel visual inmediatamente!
