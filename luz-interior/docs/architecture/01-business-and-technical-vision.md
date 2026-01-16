1.  Visión Técnica y de Negocio — Mi Luz Interior

Blueprint fundacional del sistema
No se escribe una sola línea de backend sin que este documento esté aprobado y entendido.

Objetivo:
Construir una plataforma escalable, segura y gamificada para la reconstrucción personal, basada en acción, disciplina, progreso medible y comunidad.

🌑 → 🌕 Filosofía Central

No vendemos motivación.
Construimos sistemas para salir del pozo.

Mi Luz Interior no promete felicidad inmediata.
Promete estructura, progreso visible y dignidad recuperada.

1. El Problema Real (Sin Romanticismo)

La depresión moderna no se soluciona con:

“Quiérete a ti mismo”

“Piensa positivo”

“Todo estará bien”

El problema real:

Falta de estructura diaria

Falta de progreso visible

Aislamiento social

Dopamina barata (redes, porno, junk food)

Cuerpo descuidado → mente deteriorada

Cero validación del esfuerzo real

👉 Mi Luz Interior existe para atacar estas causas, no los síntomas.

2. La Solución: Un Sistema, No Contenido
   ❌ Qué NO es:

Un blog de autoayuda

Un curso motivacional

Un gurú hablando desde arriba

✅ Qué SÍ es:

Una plataforma de reconstrucción personal gamificada, donde:

El progreso se ve

El esfuerzo se valida

La disciplina se premia

La comunidad empuja

El usuario construye identidad

3. Filosofía del Producto
   Principios Fundamentales

1. Acción > Emoción
   No importa cómo te sientes.
   Importa lo que hiciste hoy.

1. El cuerpo primero
   Ejercicio, higiene, sueño, alimentación.
   La mente sigue al cuerpo.

1. Progreso visible o abandono
   Si no hay métricas → hay abandono.
   Todo debe ser medible.

1. Comunidad silenciosa pero firme
   No es un culto ni un grupo tóxico.
   Es gente haciendo lo que toca.

1. Dominios de Desarrollo Personal

La plataforma no es genérica. Se estructura en DOMINIOS DE VIDA.

🧠 Mentalidad

Journaling guiado

Retos de enfoque

Protocolos anti-rumiación

Lectura aplicada (no teoría vacía)

🏋️ Cuerpo

Retos de gimnasio

Rutinas básicas

Seguimiento de constancia

Higiene, postura y descanso

🧍 Imagen Personal (LookMaxxing)

Cuidado personal

Estilo básico

Rutinas de grooming

Progreso visual (antes/después opcional)

🎯 Disciplina

Rachas

Retos diarios

Penalización simbólica por abandono

XP por consistencia, no por talento

💻 Desarrollo Profesional (Fase futura clave)

Integración con GitHub

Retos de código

Proyectos reales

Logros profesionales públicos

5. Gamificación con Sentido (No Infantil)

🎮 El sistema no es un juego.
Es un marco psicológico de refuerzo positivo.

Elementos:

XP → Esfuerzo acumulado

Nivel → Identidad actual

Logros → Pruebas sociales

Rachas → Disciplina sostenida

Ejemplos reales:

🥇 30 días entrenando sin excusas

🧘 21 días de meditación

📚 5 lecturas completadas

💻 Primer proyecto deployado

👉 Todo queda en el perfil
👉 Todo se puede mostrar (opt-in)

6. Comunidad (Diseñada, No Caótica)

No un foro genérico.

Interacciones permitidas:

Validación de logros

Comparación de progreso (opt-in)

Rankings por disciplina, no por ego

Mentores (futuro)

Equipos / Dojos privados

7. Lógica de Negocio (Business Logic)
   Módulos Principales
1. El Dojo (Dashboard Personal)

Nivel, XP, rachas

Perfil público (avatar, bio, metas)

Historial de progreso

2. Sistema de Retos (Challenges)

Retos diarios, semanales y por ciclos

Ej: “21 días de meditación”

Validación:

v1: Self-reported

v2: Validación comunitaria

3. Sistema de Recompensas

Badges: Early Adopter, Disciplina de Hierro, etc.

XP por tareas, lectura, constancia

8. Arquitectura Técnica (The Stack)
   Frontend

React 19

Vite

Tailwind CSS

Backend & Auth

Supabase (BaaS)

Auth

PostgreSQL

Realtime

Storage

Razón: escalar rápido sin infraestructura propia.

Seguridad

RLS (Row Level Security)

Regla de oro:
El frontend es inseguro. La base de datos se protege a sí misma.

9. Modelo de Base de Datos (Inicial)
   profiles

Extensión de auth.users

create table profiles (
id uuid references auth.users on delete cascade,
username text unique,
full_name text,
avatar_url text,
website text,
level int default 1,
xp int default 0,
created_at timestamp with time zone default timezone('utc'::text, now()),
primary key (id)
);

achievements

Catálogo global de logros

create table achievements (
id uuid default uuid_generate_v4() primary key,
title text not null,
description text,
icon_slug text not null,
xp_reward int default 50
);

user_achievements

Relación usuario ↔ logro

create table user_achievements (
user_id uuid references profiles(id),
achievement_id uuid references achievements(id),
earned_at timestamp default now(),
primary key (user_id, achievement_id)
);

10. Autenticación & Seguridad
    Auth Flow

Frontend → OAuth (Google)

Supabase → JWT

Token gestionado por cliente Supabase

RLS (Resumen)

profiles

SELECT: público

UPDATE: solo dueño

achievements

SELECT: público

INSERT/UPDATE: solo admin

11. Escalabilidad y Futuro

Edge Functions → IA, análisis, mentorías

Supabase Storage + CDN → imágenes y media

Integraciones futuras (reales, no humo):

📧 Email profesional

📱 WhatsApp (recordatorios)

📸 Instagram (logros)

💼 LinkedIn (progreso profesional)

🧠 GitHub (Dev Life)

12. Monetización (Alineada con la Misión)

No desde el día uno.

Fases:

Gratis → progreso base

Pro

Retos exclusivos

Estadísticas avanzadas

Mentorías

Equipos / Dojos privados

Empresas / Bootcamps / Comunidades

13. Roadmap Estratégico
    🟢 Corto Plazo (MVP)

Auth

Perfil

XP

Retos diarios

Logros básicos

Dashboard claro

🟡 Medio Plazo

Notificaciones

Comunidad

Validación social

Rachas avanzadas

Integraciones externas

🔴 Largo Plazo

IA personal

Mentorías

App móvil

Ecosistema profesional

Marca consolidada

14. Visión Final

Mi Luz Interior no es una app.
Es un sistema operativo para reconstruir vidas.

No promete felicidad.
Promete estructura, progreso y dignidad.
