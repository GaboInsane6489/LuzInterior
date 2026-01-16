# 03. Diseño Completo de Base de Datos

> Este documento define el **modelo de datos canónico** del sistema.
> La base de datos es la fuente de verdad. El frontend no toma decisiones críticas.

El diseño prioriza:

- claridad
- seguridad (RLS)
- escalabilidad
- evolución sin migraciones traumáticas

---

## 🎯 Principios de Diseño

1. **Normalización pragmática** (ni exceso ni caos)
2. **Auditoría implícita** (fechas, ownership)
3. **Datos > lógica en frontend**
4. **Preparado para gamificación y comunidad**

---

## 🧩 Entidades Principales

### 1. `profiles`

Extiende `auth.users`. Representa la identidad pública.

```sql
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  level int default 1,
  xp int default 0,
  streak_current int default 0,
  streak_best int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 2. `challenges`

Catálogo global de retos.

```sql
create table challenges (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  domain text not null, -- mentalidad, cuerpo, disciplina, etc.
  duration_days int not null,
  xp_reward int not null,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

---

### 3. `user_challenges`

Relación usuario ↔ reto.

```sql
create table user_challenges (
  user_id uuid references profiles(id) on delete cascade,
  challenge_id uuid references challenges(id),
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text default 'active', -- active, completed, failed
  primary key (user_id, challenge_id)
);
```

---

### 4. `challenge_logs`

Registro diario de acciones.

```sql
create table challenge_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  challenge_id uuid references challenges(id),
  logged_at date not null,
  created_at timestamptz default now(),
  unique (user_id, challenge_id, logged_at)
);
```

---

### 5. `achievements`

Catálogo de logros.

```sql
create table achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  icon_slug text not null,
  xp_reward int default 50,
  created_at timestamptz default now()
);
```

---

### 6. `user_achievements`

Logros obtenidos por usuarios.

```sql
create table user_achievements (
  user_id uuid references profiles(id),
  achievement_id uuid references achievements(id),
  earned_at timestamptz default now(),
  primary key (user_id, achievement_id)
);
```

---

### 7. `activity_feed`

Historial de actividad (no social feed).

```sql
create table activity_feed (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  type text not null, -- challenge_completed, achievement_earned
  reference_id uuid,
  created_at timestamptz default now()
);
```

---

## 🔐 Seguridad y RLS (Resumen)

- `profiles`: select público, update solo dueño
- `challenges`: select público, write admin/system
- `user_challenges`: solo dueño
- `challenge_logs`: insert solo dueño
- `user_achievements`: insert system

---

## 🧭 Evolución Futura

Tablas previstas (no MVP):

- `mentorships`
- `notifications`
- `teams`
- `team_members`
- `validations`

---

## 🧠 Nota Final

Este diseño:

- evita lógica frágil en frontend
- permite auditar progreso
- soporta gamificación real

La base de datos **no es un detalle técnico**.
Es el corazón del sistema.

---

**Diseña la base bien.
Todo lo demás fluye.**
