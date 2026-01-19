-- =========================================================
-- MI LUZ INTERIOR - EXTENSIÓN DE PERFILES (MVP)
-- =========================================================

-- 1. EXTENDER TABLA DE PERFILES
alter table public.profiles
  add column if not exists age int,
  add column if not exists bio text,
  add column if not exists cover_photo_url text,
  add column if not exists social_instagram text,
  add column if not exists social_twitter text,
  add column if not exists social_linkedin text,
  add column if not exists social_github text,
  add column if not exists custom_avatar_url text;

-- Índice para búsqueda rápida de username
create index if not exists idx_profiles_username on public.profiles(username);

-- 2. TABLA DE EVIDENCIAS MULTIMEDIA
create table if not exists public.challenge_evidence (
  id uuid primary key default gen_random_uuid(),
  log_id uuid references public.challenge_logs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  file_size_mb decimal(5,2) not null,
  uploaded_at timestamptz default now()
);

-- RLS para evidencias
alter table public.challenge_evidence enable row level security;

create policy "Usuarios ven sus propias evidencias" 
  on public.challenge_evidence for select using (auth.uid() = user_id);

create policy "Usuarios suben sus propias evidencias" 
  on public.challenge_evidence for insert with check (auth.uid() = user_id);

-- 3. CONFIGURACIÓN DE STORAGE BUCKETS
-- Nota: Ejecutar en Supabase Dashboard > Storage

-- Crear buckets (ejecutar en SQL Editor si es necesario):
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('covers', 'covers', true),
  ('evidence', 'evidence', true)
on conflict (id) do nothing;

-- 4. POLÍTICAS DE STORAGE

-- Políticas para avatars
create policy "Usuarios pueden subir su propio avatar"
on storage.objects for insert
with check (
  bucket_id = 'avatars' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Avatars son públicos"
on storage.objects for select
using (bucket_id = 'avatars');

create policy "Usuarios pueden actualizar su avatar"
on storage.objects for update
using (
  bucket_id = 'avatars' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Usuarios pueden eliminar su avatar"
on storage.objects for delete
using (
  bucket_id = 'avatars' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Políticas para covers
create policy "Usuarios pueden subir su propia portada"
on storage.objects for insert
with check (
  bucket_id = 'covers' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Covers son públicos"
on storage.objects for select
using (bucket_id = 'covers');

create policy "Usuarios pueden actualizar su portada"
on storage.objects for update
using (
  bucket_id = 'covers' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Usuarios pueden eliminar su portada"
on storage.objects for delete
using (
  bucket_id = 'covers' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Políticas para evidencias
create policy "Usuarios pueden subir evidencias"
on storage.objects for insert
with check (
  bucket_id = 'evidence' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Evidencias son públicas"
on storage.objects for select
using (bucket_id = 'evidence');

create policy "Usuarios pueden eliminar sus evidencias"
on storage.objects for delete
using (
  bucket_id = 'evidence' 
  and auth.uid()::text = (storage.foldername(name))[1]
);
