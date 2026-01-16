# 04. Frontend Structure — Arquitectura de Interfaz (Senior / Tech Lead)

Este documento define **cómo se organiza el frontend de Luz Interior** para que:

- escale durante años,
- soporte múltiples desarrolladores,
- mantenga claridad mental,
- y evite el colapso estructural típico de proyectos React medianos.

No optimizamos para velocidad inicial.
Optimizamos para **longevidad y orden**.

---

## Principios Arquitectónicos

### 1. Organización por Dominio (NO por tipo)

❌ Incorrecto (junior):

```
components/
pages/
hooks/
utils/
```

✅ Correcto (senior):

```
features/
  auth/
  profile/
  challenges/
  achievements/
  dojo/
```

Cada dominio:

- contiene su UI
- su lógica
- su estado
- sus tests

👉 Un dominio es **dueño de su complejidad**.

---

### 2. Separación Clara de Capas

Nunca mezclar:

- lógica de dominio
- lógica de presentación
- acceso a datos

Capas:

1. **UI** → componentes visuales
2. **Domain** → reglas del negocio
3. **Data** → Supabase / APIs

---

## Estructura de Carpetas Propuesta

```
src/
├── app/                  # Bootstrap de la app
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx     # Contextos globales
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── auth.types.js
│   │
│   ├── profile/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── profile.model.js
│   │   └── profile.types.js
│   │
│   ├── challenges/
│   ├── achievements/
│   ├── dojo/
│
├── shared/               # Código transversal
│   ├── ui/               # Componentes atómicos
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── config/
│   ├── supabase.js
│   ├── env.js
│   └── constants.js
│
└── styles/
```

---

## Regla de Oro de Imports

- `shared` **NO depende de features**
- `features` **NO se importan entre sí directamente**
- Comunicación solo vía:

  - props
  - eventos
  - contratos (types)

👉 Esto previene dependencias circulares.

---

## Estado Global (Minimalista)

No Redux por defecto.

Usar:

- React Context (estado estable)
- React Query / TanStack Query (estado servidor)

El estado global debe ser:

- pequeño
- predecible
- documentado

---

## Data Fetching Strategy

- El frontend **nunca confía en sí mismo**
- Toda validación real vive en DB (RLS)

Patrón:

```
UI → hook → service → Supabase
```

Ejemplo:

- `useChallenges()`
- `challengeService.complete()`

---

## Convenciones de Componentes

### UI Components

- Puros
- Sin lógica de negocio
- Testeables

### Feature Components

- Orquestan hooks
- Manejan estados

---

## Routing (React Router)

- Rutas por dominio
- Layouts anidados

Ejemplo:

```
/dojo
  /profile
  /challenges
```

---

## Manejo de Errores

- Errores visibles
- Mensajes neutros
- Sin culpa al usuario

Nunca:

- console.log en producción
- errores silenciosos

---

## Performance

- Code splitting por feature
- Lazy loading estratégico
- Skeletons (no spinners eternos)

---

## Accesibilidad (No Negociable)

- Navegación por teclado
- Roles ARIA
- Contraste alto

---

## Onboarding de Nuevos Devs

Este diseño permite que un nuevo desarrollador:

- entienda el sistema en horas, no semanas
- trabaje en un dominio sin romper otros

---

## Antipatrones Prohibidos

❌ Mega componentes
❌ Utils globales ambiguas
❌ Estado duplicado
❌ Side effects invisibles

---

## Conclusión

Este frontend:

- no busca ser creativo
- busca ser **sólido**

La creatividad vive en el producto.
La arquitectura vive en el orden.

Esto es frontend pensado como **sistema**, no como UI.
