# 11. Masterclass: Arquitectura Senior y "Fine-Tuning"

Has avanzado increíblemente. La sección de desarrollo personal ya existe, pero tiene detalles que distinguen a un Junior de un Tech Lead.
Aquí está el análisis de tu entrega y las correcciones.

---

## 1. 🐛 El Bug Visual: "Navbar Caníbal"

**El Problema:**
En tu screenshot, la barra de navegación (Navbar) tapa el título "Growth Lab".
Esto pasa porque tu Navbar es `fixed` o `absolute`, lo que lo saca del flujo del documento. El resto del contenido sube y se esconde detrás.

**La Solución Senior:**
No uses margen negativo ni parches raros.
Si tu Navbar mide aprox `80px`, tu primera sección debe tener un `padding-top` suficiente.

En `src/components/PersonalDevelopment.jsx`:

```diff
- <section className="py-24 px-6 lg:px-12 bg-gray-50 text-black">
+ <section className="pt-32 pb-24 px-6 lg:px-12 bg-gray-50 text-black">
```

- `pt-32` (padding-top: 8rem) empuja el contenido hacia abajo lo suficiente para que el Navbar "flote" sin tapar nada.

---

## 2. 📂 Infraestructura de Assets (Corrección Crítica)

Me comentas que las pusiste en `src/assets/images`.

- **Vite Way:** Si están en `src/assets`, DEBES importarlas arriba (`import img from ...`) para usarlas.
- **Public Way (Recomendado para CMS/Blog):**

Si vas a tener muchos artículos, importar cada imagen es tedioso.
Mueve tus imágenes a la carpeta raíz `public/`.

**Estructura Correcta:**

```text
/public
  /images
    /articles
      - deep-work.webp
      - morning-protocol.webp
```

**Uso en Código:**

```jsx
<img src="/images/articles/deep-work.webp" alt="..." />
```

- Sin `import`. Sin `require`. Directo al navegador.

---

## 3. 📰 El Layout "Editorial" (Mejoras Visuales)

Tu Bento Grid está bien, pero para que no parezca un "periódico viejo", necesitamos **Aire y Tipografía**.

### A. Tipografía

Estás usando `font-serif`. Asegúrate de que en tu `index.css` o `tailwind.config.js` tengas una fuente serif de calidad (como _Merriweather_, _Playfair Display_ o la nativa `Georgia`).

- Si se ve como "Times New Roman", se ve antiguo.
- Si se ve como "Playfair Display", se ve **Premium**.

### B. "Clamp" para el texto

En la tarjeta del artículo `WellLivedLife`, veo que el texto se corta bruscamente.
Asegúrate de tener el plugin `@tailwindcss/line-clamp` (o en Tailwind v4 ya viene nativo).
La clase `line-clamp-4` es perfecta, pero añade un "desvanecido" al final para que sea elegante.

**Truco Senior (Fade out):**

```jsx
<div className="relative">
  <div className="prose ... line-clamp-4">
    <WellLivedLife />
  </div>
  {/* Gradiente blanco abajo para suavizar el corte */}
  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent"></div>
</div>
```

---

## 📝 TU CHECKLIST DE CORRECCIÓN

1.  [ ] **Fix Navbar Overlap**: Cambia `py-24` por `pt-32 pb-24` en `PersonalDevelopment.jsx`.
2.  [ ] **Mueve Assets**: Carpeta `public/images/`. No en `src/assets`.
3.  [ ] **Tipografía**: Verifica que `font-serif` esté cargando una fuente bonita (puedes importar _Playfair Display_ de Google Fonts en tu `index.css`).
4.  [ ] **Integración**: ¿Ya pusiste `<PersonalDevelopment />` en tu `Landing.jsx` debajo del Hero?

¡Con esto, tu sección pasará de "boceto" a "producción"!
