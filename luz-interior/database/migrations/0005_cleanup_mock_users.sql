-- =========================================================
-- MI LUZ INTERIOR - LIMPIEZA DE DATOS (FASE 3)
-- Elimina los usuarios de prueba creados para la comunidad.
-- =========================================================

-- 1. IDENTIFICAR Y ELIMINAR USUARIOS MOCK
-- NOTA: Usamos el dominio @luzinterior.com que fue el usado en mock_users.sql
DELETE FROM auth.users 
WHERE email LIKE '%@luzinterior.com';

-- La eliminación en public.profiles ocurrirá automáticamente por el ON DELETE CASCADE
-- definido en la tabla profiles (id uuid references auth.users on delete cascade).
