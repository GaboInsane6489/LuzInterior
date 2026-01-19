-- =========================================================
-- MI LUZ INTERIOR - CATÁLOGO DE LOGROS (EXTENSIÓN)
-- =========================================================

-- 1. CREACIÓN DE TABLAS (SI NO EXISTEN)
create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  icon_slug text not null,
  xp_reward int default 50,
  created_at timestamptz default now()
);

create table if not exists public.user_achievements (
  user_id uuid references public.profiles(id) on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  earned_at timestamptz default now(),
  primary key (user_id, achievement_id)
);

-- 2. CREACIÓN DE LOGROS INICIALES
insert into public.achievements (title, description, icon_slug, xp_reward)
values 
('Primer Paso', 'Completaste tu primer reto en el Dojo.', 'first_step', 100),
('Constancia Automática', 'Llega a una racha de 3 días.', 'streak_3', 300),
('Guerrero de la Luz', 'Acumula un total de 1000 XP.', 'warrior_1000', 500),
('Dominio Mental', 'Completa 5 retos de la categoría mentalidad.', 'mental_master', 750),
('Cuerpo Sagrado', 'Completa 5 retos de la categoría cuerpo.', 'body_master', 750)
on conflict do nothing;

-- 3. POLÍTICAS DE SEGURIDAD PARA LOGROS
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

-- Los logros disponibles son públicos
drop policy if exists "Logros visibles para todos" on public.achievements; -- Limpiar si re-ejecutas
create policy "Logros visibles para todos" on public.achievements for select using (true);

-- Los logros del usuario solo los ve el usuario
create policy "Usuarios ven sus propios logros" on public.user_achievements for select using (auth.uid() = user_id);

-- El sistema permite detectar e insertar logros
create policy "Sistema inserta logros" on public.user_achievements for insert with check (auth.uid() = user_id);
