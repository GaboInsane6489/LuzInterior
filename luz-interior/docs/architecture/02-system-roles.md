# 02. Roles del Sistema & Modelo de Permisos

> Este documento define **quién puede hacer qué** dentro del sistema.
> No se implementa ninguna feature sin estar alineada a este modelo.

Mi Luz Interior prioriza **claridad, seguridad y escalabilidad**. Los roles no son decorativos: son una pieza central de la arquitectura.

---

## 🎯 Principio Fundamental

> **Principio de Mínimo Privilegio**

Cada usuario, servicio o sistema:

- Tiene acceso **solo** a lo que necesita
- Nada más
- Nada implícito

La seguridad no se delega al frontend. Se garantiza en la base de datos mediante **RLS (Row Level Security)**.

---

## 🧩 Tipos de Roles

El sistema se diseña con roles explícitos, incluso si algunos no se implementan en la primera versión.

### 1. 👤 User (Usuario)

Rol por defecto. Representa al usuario final que utiliza la plataforma para su desarrollo personal.

#### Capacidades

- Autenticarse (OAuth)
- Crear y actualizar su perfil
- Ver perfiles públicos
- Unirse y completar retos
- Ganar XP, niveles y logros
- Visualizar su historial de progreso
- Participar en validación comunitaria (v2)

#### Restricciones

- No puede modificar datos de otros usuarios
- No puede crear logros globales
- No puede manipular XP directamente

---

### 2. 🧭 Mentor (Futuro)

Rol pensado para usuarios con experiencia validada que acompañan a otros.

#### Capacidades

- Ver progreso de usuarios asignados
- Validar logros y retos (cuando aplique)
- Comentar progreso (feedback estructurado)

#### Restricciones

- No puede modificar datos críticos
- No tiene acceso global
- No gestiona el sistema

> ⚠️ Este rol **no se implementa en el MVP**, pero se diseña desde ahora para evitar deuda técnica.

---

### 3. 🛠️ Admin

Rol operativo y de mantenimiento.

#### Capacidades

- Crear y editar retos
- Crear y editar logros
- Moderar contenido
- Resolver reportes

#### Restricciones

- No puede modificar progreso personal de usuarios
- No puede otorgar XP arbitrariamente

---

### 4. 🤖 System

Rol no humano. Representa procesos automáticos.

#### Ejemplos

- Edge Functions
- Jobs programados
- Automatizaciones

#### Capacidades

- Asignar XP por reglas
- Otorgar logros automáticamente
- Enviar notificaciones

#### Restricciones

- Opera bajo reglas explícitas
- No interactúa manualmente con usuarios

---

## 🔐 Implementación Técnica (Supabase)

### Identidad

- Todos los usuarios humanos provienen de `auth.users`
- El rol **no vive en el frontend**

### Estrategias posibles

- Campo `role` en tabla `profiles`
- Tabla `user_roles`
- Claims personalizados en JWT (futuro)

> La decisión final se toma **antes** de implementar features dependientes de roles.

---

## 🛡️ RLS como Fuente de Verdad

Ejemplo conceptual:

- `profiles`

  - SELECT → público
  - UPDATE → solo dueño

- `achievements`

  - SELECT → público
  - INSERT/UPDATE → solo Admin/System

- `user_achievements`

  - INSERT → System
  - SELECT → dueño

El frontend **no decide permisos**.
La base de datos sí.

---

## 🧠 Filosofía de Diseño

- Roles claros > flags ambiguos
- Explícito > implícito
- Seguridad por defecto
- Escalabilidad desde el diseño

---

## 🧭 Evolución de Roles

| Rol    | MVP | Medio Plazo | Largo Plazo |
| ------ | --- | ----------- | ----------- |
| User   | ✅  | ✅          | ✅          |
| Mentor | ❌  | 🟡          | ✅          |
| Admin  | ✅  | ✅          | ✅          |
| System | 🟡  | ✅          | ✅          |

---

## 🧠 Nota Final

Este documento existe para evitar:

- Permisos inconsistentes
- Lógica duplicada
- Brechas de seguridad

Cualquier feature nueva **debe responder primero**:

> ¿Qué rol puede hacer esto?

Si no hay respuesta clara, la feature **no se implementa**.
