-- =========================================================
-- MI LUZ INTERIOR - SISTEMA DE NOTIFICACIONES (V1)
-- =========================================================

-- 1. CREAR TABLA DE NOTIFICACIONES
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('friend_request', 'achievement', 'system', 'challenge')),
  title text not null,
  message text,
  related_id uuid, -- ID opcional de la entidad relacionada (ej: id de la solicitud de amistad)
  read boolean default false,
  created_at timestamptz default now()
);

-- 2. HABILITAR RLS
alter table public.notifications enable row level security;

-- 3. POLÍTICAS DE SEGURIDAD
create policy "Usuarios ven sus propias notificaciones"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Usuarios pueden actualizar el estado de lectura de sus notificaciones"
  on public.notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Sistema puede insertar notificaciones"
  on public.notifications for insert
  with check (true); -- Permitimos inserción para que las funciones o el cliente puedan crearla

-- 4. ÍNDICES PARA RENDIMIENTO
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_read on public.notifications(read);
