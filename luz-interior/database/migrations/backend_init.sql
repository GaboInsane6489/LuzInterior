-- =========================================================
-- MI LUZ INTERIOR - MASTER BACKEND SCHEMA (MVP)
-- Execute this in the Supabase SQL Editor.
-- =========================================================

-- 1. EXTENSIONES
create extension if not exists "uuid-ossp";

-- 2. TABLA DE PERFILES (Extiende auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  level int default 1,
  xp int default 0,
  streak_current int default 0,
  streak_best int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. TABLA DE RETOS (Catálogo global)
create table if not exists public.challenges (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  domain text not null, -- mentalidad, cuerpo, disciplina
  duration_days int not null,
  xp_reward int not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 4. TABLA DE PROGRESO DE USUARIO
create table if not exists public.user_challenges (
  user_id uuid references public.profiles(id) on delete cascade,
  challenge_id uuid references public.challenges(id) on delete cascade,
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text default 'active', -- active, completed, failed
  primary key (user_id, challenge_id)
);

-- 5. LOGS DIARIOS (Check-ins)
create table if not exists public.challenge_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  challenge_id uuid references public.challenges(id) on delete cascade,
  logged_at date default current_date,
  created_at timestamptz default now(),
  unique (user_id, challenge_id, logged_at)
);

-- 6. AUTOMATIZACIÓN DE PERFILES (TRIGGER)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    split_part(new.email, '@', 1) || '_' || floor(random()*1000)::text
  );
  return new;
end;
$$ language plpgsql security definer;

-- Borrar trigger si existe para evitar duplicados en re-ejecución
drop trigger if exists on_auth_user_created on auth.users;

-- Crear el trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. SEGURIDAD (ROW LEVEL SECURITY)
alter table public.profiles enable row level security;
alter table public.challenges enable row level security;
alter table public.user_challenges enable row level security;
alter table public.challenge_logs enable row level security;

-- Políticas de Profiles
create policy "Los perfiles son públicos" on public.profiles for select using (true);
create policy "Solo el usuario puede editar su propio perfil" on public.profiles for update using (auth.uid() = id);

-- Políticas de Challenges (Lectura para todos, escritura solo admin)
create policy "Los retos son públicos" on public.challenges for select using (true);

-- Políticas de User Progress (Solo el dueño)
create policy "Usuarios ven su propio progreso" on public.user_challenges for select using (auth.uid() = user_id);
create policy "Usuarios gestionan su propio progreso" on public.user_challenges for all using (auth.uid() = user_id);

-- Políticas de Logs
create policy "Usuarios ven sus propios logs" on public.challenge_logs for select using (auth.uid() = user_id);
create policy "Usuarios insertan sus propios logs" on public.challenge_logs for insert with check (auth.uid() = user_id);

-- 8. SEMILLAS (Retos iniciales de ejemplo)
insert into public.challenges (title, description, domain, duration_days, xp_reward)
values 
('Génesis de Disciplina', '7 días sin azúcar y 15 min de meditación matutina.', 'disciplina', 7, 500),
('Cuerpo de Hierro', 'Entranamiento de fuerza diario durante 30 días.', 'cuerpo', 30, 2500),
('Enfoque Profundo', '2 horas diarias de trabajo sin distracciones digitales.', 'mentalidad', 14, 1200)
on conflict do nothing;
