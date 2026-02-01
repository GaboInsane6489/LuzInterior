-- Seed 20 Mock Users for Dojo Community
-- Execute this in Supabase SQL Editor

DO $$
DECLARE
  i INT := 1;
  new_id UUID;
  names TEXT[] := ARRAY[
    'Elena Void', 'Marcus Aurelius', 'Sofia Light', 'Dante Inferno', 'Luna Star',
    'Solomon Kane', 'Beatriz Storm', 'Gabriel Iron', 'Isabella Moon', 'Victor Shade',
    'Nova Chronos', 'Rex Thunderbolt', 'Silvia Wind', 'Kaelthas Sun', 'Jaina Frost',
    'Thrall Earth', 'Arthur Pendragon', 'Morgana LeFay', 'Merlin Ambrose', 'Lancelot Lake'
  ];
  usernames TEXT[] := ARRAY[
    'VoidWalker', 'StoicEmperor', 'LightBringer', 'InfernalDante', 'StarDust',
    'WitchHunter', 'StormBorn', 'IronFist', 'MoonChild', 'ShadeMaster',
    'TimeKeeper', 'ThunderGod', 'WindRunner', 'SunKing', 'FrostMage',
    'EarthWarden', 'Excalibur', 'DarkSorceress', 'WizardKing', 'LakeKnight'
  ];
BEGIN
  FOR i IN 1..20 LOOP
    new_id := gen_random_uuid();
    
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
    VALUES (
      new_id,
      'mock_user_' || i || '@luzinterior.com',
      crypt('password123', gen_salt('bf')),
      now()
    );

    INSERT INTO public.profiles (id, username, full_name, level, xp, streak_current, streak_best, role, custom_avatar_url)
    VALUES (
      new_id,
      usernames[i],
      names[i],
      floor(random() * 50 + 1)::int,
      floor(random() * 50000 + 1000)::int,
      floor(random() * 30 + 1)::int,
      floor(random() * 60 + 30)::int,
      CASE WHEN i = 1 THEN 'admin' ELSE 'user' END,
      'https://api.dicebear.com/7.x/avataaars/svg?seed=' || usernames[i]
    )
    ON CONFLICT (id) DO UPDATE SET
      username = EXCLUDED.username,
      full_name = EXCLUDED.full_name,
      level = EXCLUDED.level,
      xp = EXCLUDED.xp,
      streak_current = EXCLUDED.streak_current,
      streak_best = EXCLUDED.streak_best,
      role = EXCLUDED.role,
      custom_avatar_url = EXCLUDED.custom_avatar_url;
  END LOOP;
END $$;
