# 01. Seguridad del Sistema – Row Level Security (RLS)

Este documento define **cómo se protege Mi Luz Interior**.

No existe backend tradicional.
La **base de datos es la autoridad final**.

> Regla innegociable:
> **El frontend es inseguro. La base de datos se protege a sí misma.**

---

## 1. Filosofía de Seguridad

La seguridad no se delega al cliente ni a la buena fe del usuario.

Principios:

- 🔒 **Zero Trust Frontend**: ningún dato del cliente es confiable.
- 🧠 **Lógica en la DB**: las reglas viven en PostgreSQL.
- 🧱 **RLS por defecto**: toda tabla privada nace bloqueada.
- 🧪 **Estados imposibles prohibidos**: la DB previene inconsistencias.

Supabase nos permite aplicar esto sin escribir servidores.

---

## 2. Activación Global de RLS

Todas las tablas sensibles deben tener RLS habilitado explícitamente.

```sql
alter table profiles enable row level security;
alter table user_challenges enable row level security;
alter table user_achievements enable row level security;
alter table daily_logs enable row level security;
alter table streaks enable row level security;
```

Si RLS no está activo, **la tabla se considera insegura**.

---

## 3. Políticas por Tabla

### A. `profiles`

Información pública del usuario, pero editable solo por su dueño.

#### SELECT – Público

```sql
create policy "Public profiles are viewable by everyone"
on profiles
for select
using (true);
```

#### UPDATE – Solo dueño

```sql
create policy "Users can update their own profile"
on profiles
for update
using (auth.uid() = id);
```

No existe `INSERT` manual: el perfil se crea vía trigger al registrarse.

---

### B. `user_challenges`

Estado de retos activos y completados.

#### SELECT – Solo dueño

```sql
create policy "Users can view their own challenges"
on user_challenges
for select
using (auth.uid() = user_id);
```

#### INSERT – Solo dueño

```sql
create policy "Users can start their own challenges"
on user_challenges
for insert
with check (auth.uid() = user_id);
```

#### UPDATE – Solo dueño

```sql
create policy "Users can update their own challenge progress"
on user_challenges
for update
using (auth.uid() = user_id);
```

Esto evita que un usuario marque retos de otros.

---

### C. `user_achievements`

Los logros **no se otorgan desde el frontend**.

❗ Esta tabla es **write-protected** para usuarios normales.

#### SELECT – Solo dueño

```sql
create policy "Users can view their own achievements"
on user_achievements
for select
using (auth.uid() = user_id);
```

#### INSERT – Solo sistema

Los inserts solo ocurren:

- vía Edge Function
- vía rol `service_role`

No existe política `INSERT` pública.

Esto previene fraude de XP.

---

### D. `daily_logs`

Registro diario de acciones.

#### SELECT – Solo dueño

```sql
create policy "Users can view their own daily logs"
on daily_logs
for select
using (auth.uid() = user_id);
```

#### INSERT – Solo dueño

```sql
create policy "Users can insert their own daily logs"
on daily_logs
for insert
with check (auth.uid() = user_id);
```

Constraint adicional (nivel DB):

```sql
unique (user_id, log_date)
```

Esto evita múltiples registros por día.

---

### E. `streaks`

Las rachas representan disciplina sostenida.

#### SELECT – Solo dueño

```sql
create policy "Users can view their own streaks"
on streaks
for select
using (auth.uid() = user_id);
```

#### UPDATE – Solo sistema

Las rachas se calculan automáticamente:

- triggers
- Edge Functions

El usuario **nunca** las modifica directamente.

---

## 4. Protección Anti‑Fraude

Capas de defensa:

1. RLS impide modificar datos ajenos
2. Constraints bloquean estados imposibles
3. XP y logros se calculan en backend lógico (Edge)
4. Auditoría futura vía `events_log`

> El usuario puede mentirse a sí mismo.
> **No puede mentirle al sistema.**

---

## 5. Principios de Evolución

Cuando el sistema crezca:

- Nuevas tablas → RLS obligatorio
- Nuevas acciones críticas → Edge Functions
- Nuevas validaciones → DB primero

Nunca se rompe este orden.

---

## 6. Conclusión

La seguridad de Mi Luz Interior no depende de frameworks.

Depende de:

- Diseño consciente
- Restricciones fuertes
- Autoridad centralizada en la DB

Esto permite:

✔️ Escalar sin miedo
✔️ Evitar exploits simples
✔️ Mantener integridad del progreso

---

🔐 **SISTEMA PROTEGIDO DESDE LA RAÍZ**
