# 01. Arquitectura y Escalabilidad en React (Nivel Senior)

> "El software debe ser construido para cambiar."

## 1. Estructura de Carpetas: Feature-First vs Layer-First

Cuando inicias, sueles agrupar por "capas" (`components`, `pages`, `hooks`). Para escalar a nivel senior, evolucionamos a **Feature-First** (o Modular).

### Estructura Recomendada (Hybrid)

```text
src/
├── assets/          # Imágenes estáticas, fuentes
├── components/      # UI Kit GLOBAL (Botones, Inputs, Modales genéricos)
│   ├── ui/          # Elementos atómicos
│   └── layout/      # Navbar, Footer
├── config/          # Variables de entorno constantes, setup de librerías
├── features/        # Módulos de negocio (Aquí vive la magia)
│   ├── auth/        # Todo lo relacionado a login/registro
│   │   ├── components/  # LoginForm
│   │   ├── hooks/       # useAuth
│   │   └── services/    # authService.js (API calls)
│   └── blog/
├── hooks/           # Hooks globales (useScroll, useWindowSize)
├── pages/           # Vistas que unen features. Solo composición.
├── routes/          # Definición de rutas
├── services/        # Configuración de Axios/Fetch
├── utils/           # Helpers puros (formatDate, currency)
└── App.jsx
```

## 2. Patrones de Diseño en React

### A. Composición sobre Herencia

No crees un `Button` gigante con 50 props (`isRed`, `isBlue`, `hasIcon`). Usa composición.

**Junior:**

```jsx
<Button text="Click" icon="star" color="red" />
```

**Senior:**

```jsx
<Button variant="danger">
  <Icon name="star" />
  <span>Click</span>
</Button>
```

### B. Container/Presenter (Separation of Concerns)

Aun válido, pero modernizado con Hooks. Separa la **lógica** de la **vista**.

- `UserProfile.jsx` (Vista): Solo recibe datos y funciones por props. NO hace fetch.
- `useUserProfile.js` (Hook/Lógica): Hace el fetch, maneja loading y errores.

## 3. Consumo de APIs (Nivel Producción)

No uses `useEffect` para llamar APIs directamente en componentes grandes. Tienes problemas de:

1.  Race conditions.
2.  Caching (volver a cargar datos que ya tenías).
3.  Estado global inconsistente.

**Solución Senior:** Usa **TanStack Query (React Query)** o **SWR**.

```javascript
// Ejemplo con SWR (Stale-While-Revalidate)
import useSWR from "swr";

const { data, error, isLoading } = useSWR("/api/user", fetcher);

if (isLoading) return <Skeleton />;
if (error) return <ErrorPage />;
return <UserProfile data={data} />;
```

Esto maneja caché, reintentos automáticos si falla internet, y revalidación en foco.

## 4. Single Source of Truth

Evita duplicar estado. Si tienes `firstName` y `lastName`, no crees un estado `fullName`. Calcúlalo al vuelo.

```javascript
// Mal
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + last);
}, [first, last]);

// Bien (Derived State)
const fullName = `${firstName} ${lastName}`;
```
