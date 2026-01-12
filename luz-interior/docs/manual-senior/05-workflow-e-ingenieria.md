# 05. Workflow e Ingeniería de Software

Un Senior no solo escribe código, toma decisiones.

## 1. ¿Qué instalo? (Toma de Decisiones)

Antes de `npm install`, hazte estas preguntas (El filtro Senior):

1.  **¿Peso vs Beneficio?**

    - ¿Instalar `moment.js` (200kb) solo para formatear una fecha? ❌ -> Usa `date-fns` o `Intl` nativo.
    - ¿Instalar `lodash` entero para usar solo `_.get`? ❌ -> Instala `lodash.get` o usa Optional Chaining.

2.  **¿Mantenimiento?**

    - Mira el repositorio en GitHub. ¿Último commit hace 3 años? 🚩 Huye.
    - ¿Tiene muchas "Issues" abiertas sin respuesta? 🚩 Peligro.

3.  **¿Popularidad/Ecosistema?**
    - A veces lo popular es mejor porque hay más tutoriales y respuestas en StackOverflow. Ej: Redux Toolkit vs Zustand (Ambos buenos, depende del equipo).

## 2. Debugging Nivel Dios

No llenes todo de `console.log("llegué aquí")`.

### Herramientas

1.  **React Developer Tools:** Instala la extensión. Mira los props y el estado en el navegador sin ensuciar el código.
2.  **Network Tab (Red):** ¿La API falla? Mira la pestaña Network.
    - Status 401/403: Permisos (Token).
    - Status 404: Ruta mal escrita.
    - Status 500: Error del servidor (no es tu culpa, avisa al backend).
3.  **Debugger:**
    Escribe `debugger;` en tu código JS. Cuando la consola esté abierta, la ejecución se PAUSARÁ ahí y podrás ver variable por variable.

## 3. Git Workflow (Trabajar en Equipo)

1.  **Nunca trabajes en `main`:** Crea ramas (`git checkout -b feature/nueva-seccion`).
2.  **Commits Atómicos:**
    - Mal: "Arreglé todo y subí cambios" (Cambió el CSS, la lógica y borró archivos).
    - Bien:
      - "fix: corregir error de login en móvil"
      - "feat: agregar componente de Hero"
      - "style: cambiar colores del footer"
3.  **Pull Requests (PR):**
    Antes de fusionar, revisa tu propio código como si fuera de otro. ¿Dejaste un `console.log` olvidado? Bórralo.

## 4. Cómo aprender solo (El Mega-Skill)

La documentación oficial es tu biblia.

- ¿Duda de React? -> `react.dev` (No blogs de 2018).
- ¿Duda de CSS? -> MDN Web Docs (Mozilla).

**Regla de Oro:**
Si copias código de internet (ChatGPT/StackOverflow), NO lo pegues hasta que entiendas cada línea. Si no lo entiendes, es una bomba de tiempo en tu proyecto.
