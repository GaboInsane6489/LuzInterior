# 02. Código Limpio, Semántica y JavaScript Moderno

La diferencia entre un código que funciona y uno profesional es la **legibilidad** y la **semántica**.

## 1. Semántica HTML: Más allá del `<div>`

El HTML semántico es vital para SEO y Accesibilidad (lectores de pantalla).

| Elemento    | Uso Correcto                                          | Alternativa (Evitala si puedes) |
| :---------- | :---------------------------------------------------- | :------------------------------ |
| `<main>`    | Contenido principal único de la página.               | `<div id="app">`                |
| `<nav>`     | Bloques de enlaces de navegación principales.         | `<div class="menu">`            |
| `<section>` | Grupo temático de contenido con un título (h2-h6).    | `<div class="feature">`         |
| `<article>` | Contenido independiente (post, producto, comentario). | `<div class="card">`            |
| `<aside>`   | Contenido relacionado pero no crítico (sidebar).      | `<div class="sidebar">`         |
| `<button>`  | Acciones (click).                                     | `<div onClick={...}>` (¡NUNCA!) |
| `<a>`       | Navegación (cambiar de URL).                          | `<button onClick={navigate}>`   |

## 2. JavaScript Moderno (ES6+)

### Nullish Coalescing (`??`) vs OR (`||`)

El operador `||` falla con `0` o `""` (strings vacíos) porque son falsy.
Usa `??` cuando solo quieras fallback si es `null` o `undefined`.

```javascript
const qty = 0;
const display = qty || 10; // Devuelve 10 (¡Mal! queríamos 0)
const display = qty ?? 10; // Devuelve 0 (¡Bien!)
```

### Optional Chaining (`?.`)

Evita `cannot read property of undefined`.

```javascript
// Junior
const street = user && user.address && user.address.street;
// Senior
const street = user?.address?.street;
```

### Objetos como parámetros (Named Parameters)

Si una función tiene más de 2 argumentos, usa un objeto.

```javascript
// Difícil de leer: ¿Qué es true? ¿Qué es 100?
createUser("Gabriel", true, 100);

// Fácil de leer
createUser({ name: "Gabriel", isAdmin: true, points: 100 });
```

## 3. Clean Code Rules

1.  **Nombres Significativos:**

    - `d`, `x`, `arr` ❌ -> `days`, `positionX`, `userList` ✅
    - `handler` ❌ -> `handleSubmit`, `handleInputChange` ✅

2.  **Early Return ("Guard Clauses"):**
    Evita el "Hadouken" de indentación (muchos `if` anidados).

    ```javascript
    // Mal
    if (user) {
      if (user.isAdmin) {
        // logic
      }
    }

    // Bien
    if (!user) return;
    if (!user.isAdmin) return;
    // logic
    ```

3.  **Principio KISS (Keep It Simple, Stupid):**
    No sobre-ingenierices. Si puedes hacerlo con CSS, no uses JS. Si puedes hacerlo con JS nativo, no instales una librería.
