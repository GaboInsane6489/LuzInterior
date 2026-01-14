# 10. Design System Unificado: La Guía Senior (Edición Revisada)

Hemos elevado el nivel. Ya no solo tenemos componentes bonitos, tenemos **Arquitectura Robusta** y **Responsive Design** real.

A continuación, te explico el **POR QUÉ** de los últimos cambios (para que aprendas, no solo copies) y cómo replicar esta calidad en futuras secciones.

---

## 1. El Navbar "Inteligente" (`Navbar.jsx`)

Un Navbar Senior no es estático. Reacciona al usuario.

### ✨ Cambios Implementados:

1.  **Glassmorphism Reactivo**:

    - Usamos `useEffect` para detectar el scroll (`window.scrollY`).
    - Si el usuario baja, el Navbar se vuelve negro semi-transparente (`bg-black/80 backdrop-blur`) para legibilidad.
    - Si está arriba, es totalmente transparente (`bg-transparent`) para lucir el Hero.
    - **Tip Performance**: Usamos `{ passive: true }` en el event listener. Esto le dice al navegador "no voy a prevenir el scroll", lo que hace que sea mucho más fluido en móviles.

2.  **Estado Móvil (Mobile State)**:

    - Creamos un state `[isOpen, setIsOpen]` para controlar el menú hamburguesa.
    - **UX**: Al hacer click en un link del móvil, cerramos el menú automáticamente (`onClick={() => setIsOpen(false)}`). Nada más frustrante que clickear y que el menú siga tapando la pantalla.

3.  **Accesibilidad (a11y)**:
    - Añadimos `aria-label="Abrir menú"` para lectores de pantalla. Un `button` sin texto es invisible para un ciego si no tiene esta etiqueta.

---

## 2. El Hero "Cinemático" (`Hero.jsx`)

### 🎬 Técnicas de Cine aplicadas a UI:

1.  **La Regla del Contraste**:

    - **Problema anterior**: Texto blanco sobre fondo blanco (¡invisible!).
    - **Solución**: Recuperamos la imagen de fondo y le añadimos un **Overlay de Gradiente** (`bg-gradient-to-b from-black/70...`). No usamos un negro plano opaco; usamos un gradiente para que la parte superior (donde está la cara del escalador) se vea más clara, y la parte inferior (donde está el texto) sea más oscura para garantizar lectura.

2.  **Animaciones Fluidas (CSS nativo)**:
    - Usamos `animate-fade-in-up` (definido en Tailwind o clases custom) con `delay-[200ms]`.
    - **Efecto Cascada**: El título aparece primero, luego el texto, luego el botón. Esto guía el ojo del usuario.
    - **Animación de Fondo**: `animate-slow-zoom` en la imagen. Un zoom muuuuy lento (duration-10s) da sensación de vida sin marear.

---

## 3. El Footer "Responsive Real" (`Footer.jsx`)

### 📱 El Reto del Móvil:

- En Desktop, queremos columnas alineadas a la izquierda.
- En Móvil, queremos todo centrado para que se vea ordenado.
- **La Clase Mágica**: `text-center md:text-left`.
  - Esto aplica `text-center` por defecto (móvil thinking first).
  - Y cambia a `text-left` solo cuando la pantalla es mediana (`md:`) o mayor.
- También usamos `flex flex-col items-center md:items-start`. Esto centra los iconos y textos verticalmente en móvil.

---

## 4. Cómo construir NUEVAS secciones (Tu Tarea Futura)

Para crear la siguiente sección (ej. "Nuestra Filosofía"), sigue este **Protocolo Senior**:

1.  **Define el "Contenedor Sagrado"**:

    ```jsx
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Contenido aquí */}
    </section>
    ```

    - Siempre usa `max-w-7xl` y `mx-auto`. Esto evita que tu sitio se vea estirado y horrible en monitores Ultrawide de 34 pulgadas.

2.  **Tipografía Consistente**:

    - Títulos: `font-serif` para elegancia (como en DepressionSection).
    - Subtítulos: `tracking-widest uppercase text-xs font-bold` (Estilo "High Fashion").

3.  **Animaciones sutiles**:
    - No animes todo. Anima solo lo que quieres que el usuario mire.
    - Usa `transition-all duration-300` en todos los elementos interactivos (botones, cards). Hace que el sitio se sienta "elástico" y premium.

¡Ahora tienes un Design System sólido! Úsalo como base para todo lo que construyas encima.
