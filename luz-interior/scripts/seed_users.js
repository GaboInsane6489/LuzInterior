/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Configurar dotenv para leer .env local si existe
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY; // O SERVICE_ROLE_KEY si tienes RLS estricto

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "❌ Faltan las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MOCK_USERS = [
  { username: "VoidWalker", fullName: "Elena Void", role: "admin" },
  { username: "StoicEmperor", fullName: "Marcus Aurelius", role: "user" },
  { username: "LightBringer", fullName: "Sofia Light", role: "user" },
  { username: "InfernalDante", fullName: "Dante Inferno", role: "user" },
  { username: "StarDust", fullName: "Luna Star", role: "user" },
  { username: "WitchHunter", fullName: "Solomon Kane", role: "user" },
  { username: "StormBorn", fullName: "Beatriz Storm", role: "user" },
  { username: "IronFist", fullName: "Gabriel Iron", role: "user" },
  { username: "MoonChild", fullName: "Isabella Moon", role: "user" },
  { username: "ShadeMaster", fullName: "Victor Shade", role: "user" },
  { username: "TimeKeeper", fullName: "Nova Chronos", role: "user" },
  { username: "ThunderGod", fullName: "Rex Thunderbolt", role: "user" },
  { username: "WindRunner", fullName: "Silvia Wind", role: "user" },
  { username: "SunKing", fullName: "Kaelthas Sun", role: "user" },
  { username: "FrostMage", fullName: "Jaina Frost", role: "user" },
  { username: "EarthWarden", fullName: "Thrall Earth", role: "user" },
  { username: "Excalibur", fullName: "Arthur Pendragon", role: "user" },
  { username: "DarkSorceress", fullName: "Morgana LeFay", role: "user" },
  { username: "WizardKing", fullName: "Merlin Ambrose", role: "user" },
  { username: "LakeKnight", fullName: "Lancelot Lake", role: "user" },
];

async function seedUsers() {
  console.log("🌱 Sembrando usuarios...");

  for (const u of MOCK_USERS) {
    const id = crypto.randomUUID();

    // Simular auth user (esto no crea login real sin service key, pero sirve para stats)
    // Para login real necesitarías usar supabase.auth.signUp() pero llenaría de correos falsos.
    // Insertamos directamente en profiles asumiendo que el ID ya "existe" o es fk simulada.
    // NOTA: Si profiles tiene FK constraint a auth.users, esto fallará sin service_role key y inserción en auth.users.

    console.log(`Procesando ${u.username}...`);

    const { error } = await supabase.from("profiles").upsert(
      {
        id: id, // En producción el ID viene de Auth
        username: u.username,
        full_name: u.fullName,
        role: u.role,
        level: Math.floor(Math.random() * 50) + 1,
        xp: Math.floor(Math.random() * 50000) + 1000,
        streak_current: Math.floor(Math.random() * 30),
        streak_best: Math.floor(Math.random() * 60) + 30,
        custom_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { onConflict: "username" },
    );

    if (error) {
      console.error(`❌ Error con ${u.username}:`, error.message);
    } else {
      console.log(`✅ ${u.username} listo.`);
    }
  }
  console.log("🏁 Semilla terminada.");
}

seedUsers();
