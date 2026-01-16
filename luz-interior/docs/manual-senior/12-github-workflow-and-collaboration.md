# 12. Masterclass: GitHub Flow & Escalamiento Open Source

Crear código es solo el 20% del trabajo de un Tech Lead. El otro 80% es **Gestión, Colaboración y Escalamiento**.
Si quieres que otros desarrolladores se unan a **Luz Interior**, tu repositorio debe ser un ejemplo de orden y profesionalismo.

---

## 1. El Arte del Commit (Conventional Commits)

Un Senior no escribe "cambios", "fix", o "final final v2".
Usamos **Conventional Commits** para que el historial sea leíble automáticamente.

### Estructura:

`tipo(alcance): descripción breve`

### Los 5 Tipos Sagrados:

- `feat`: Una nueva funcionalidad (ej. `feat(hero): añadir animación de entrada`).
- `fix`: Corregir un error (ej. `fix(navbar): resolver superposición en móvil`).
- `docs`: Cambios en documentación (ej. `docs(readme): actualizar guía de instalación`).
- `style`: Cambios de formato que no afectan lógica (espacios, comas).
- `refactor`: Cambio de código que no arregla bugs ni añade features ( limpieza técnica).

**Ejemplo de un historial profesional:**

```text
feat(blog): implementar bento grid layout
fix(footer): corregir alineación responsive
docs(manual): agregar guía de assets v2
chore(deps): actualizar react a v19
```

---

## 2. Issues & GitHub Projects (Tu Tablero de Mando)

Antes de escribir una línea de código, debe existir un **Issue**.
GitHub Projects es tu JIRA/Trello integrado.

### Cómo configurarlo para "Luz Interior":

1.  Ve a la pestaña **Projects** en tu repo -> "New Project" -> "Board" (Kanban).
2.  Crea columnas: `Backlog`, `Ready`, `In Progress`, `Review`, `Done`.

### El Ciclo de Vida Senior:

1.  **Crear Issue**: "El Footer se ve mal en móvil".
    - Etiqueta: `bug`, `good first issue` (esto atrae principiantes).
2.  **Mover a 'In Progress'**: Cuando empiezas a trabajar.
3.  **Vincular**: En tu PR (ver abajo), escribes "Closes #12". GitHub moverá automáticamente la tarjeta a `Done` cuando se apruebe.

---

## 3. Pull Requests (PRs) & Code Review

Nunca hagas commit directo a `main`. Jamás.
Un Senior trabaja en **ramas (branches)**.

### Flujo de Trabajo (The GitHub Flow):

1.  **Branch**: `git checkout -b feature/nueva-seccion-blog`
2.  **Code**: Haces tus cambios y commits.
3.  **Push**: `git push origin feature/nueva-seccion-blog`
4.  **Open PR**: Vas a GitHub y abres el Pull Request.

### ¿Qué poner en el PR?

No lo dejes vacío. Usa una plantilla:

```markdown
## Descripción

Implementa el diseño Bento Grid para la sección de desarrollo personal.

## Tipo de cambio

- [ ] Bug fix
- [x] New feature

## Cómo probarlo

1. Ir a la sección de abajo.
2. Verificar que las tarjetas se reacomoden en móvil.
```

---

## 4. Estrategias de Merge: Merge vs Squash

Cuando aceptas un PR, tienes opciones. Un Senior sabe cuál usar.

- **Merge Commit**: Crea un commit extra "Merge branch...".
  - _Uso_: Cuando quieres preservar la historia exacta de ramas complejas. (Rara vez usado en features simples).
- **Squash and Merge** (La favorita de los Seniors):
  - _Qué hace_: Toma tus 10 commits pequeños ("wip", "typo", "fix") y los aplasta en **UNO SOLO** limpio ("feat: sección blog completa").
  - _Resultado_: Tu historial de `main` es una línea recta perfecta de features terminadas.

---

## 5. Escalando el Proyecto (Community Ready)

Si quieres que otros devs colaboren en el futuro, necesitas "Documentación de Gobernanza".
Crea estos archivos en la raíz:

### A. `CONTRIBUTING.md`

El manual de instrucciones para extraños.

- "Cómo clonar el repo".
- "Cómo correr el servidor (`pnpm dev`)".
- "Nuestras reglas de commits".

### B. `CODE_OF_CONDUCT.md`

Estándar ético. Copia el "Contributor Covenant" (GitHub te da una plantilla). Dice básicamente: "Seamos respetuosos".

### C. "Good First Issues"

Si creas Issues sencillos (ej. "Corregir typo en Footer", "Cambiar color de botón") y les pones la etiqueta `good first issue`, GitHub promocionará tu proyecto a devs junior que buscan practicar. ¡Así consigues tus primeros colaboradores!

---

### 🚀 Tu Misión Actual

1.  Protege tu rama `main` en Settings -> Branches (requiere PR para mergear).
2.  Crea tu primer **Project Board**.
3.  La próxima vez que vayas a codear esa sección de Blog, **hazlo en una rama** y hazte tu propio PR. Practica el "Squash".
