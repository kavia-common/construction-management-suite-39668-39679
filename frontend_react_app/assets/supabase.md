# Supabase Integration (Frontend + Backend)

This project is ready to use Supabase for authentication and per-user data storage with Row Level Security (RLS).

What’s configured in Supabase (server-side):
- Extensions: pgcrypto (for gen_random_uuid)
- Tables (public schema):
  - profiles: id (uuid, PK), email (unique), full_name, role (default 'user'), created_at
  - projects: id (uuid, PK), owner_id (uuid -> auth.users.id), name, client_name, status (default 'planning'), budget (numeric), notes, created_at
  - estimates: id (uuid, PK), project_id (uuid -> projects.id), owner_id (uuid -> auth.users.id), items (jsonb), total (numeric), created_at
- Foreign Keys:
  - projects.owner_id -> auth.users(id) ON DELETE CASCADE
  - estimates.owner_id -> auth.users(id) ON DELETE CASCADE
  - estimates.project_id -> projects(id) ON DELETE CASCADE
- RLS Policies:
  - profiles: users can select/update only their own row (id = auth.uid())
  - projects: owners can select/insert/update/delete where owner_id = auth.uid()
  - estimates: owners can select/insert/update/delete where owner_id = auth.uid()

Frontend environment variables required:
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- REACT_APP_SITE_URL (used for emailRedirectTo/redirectTo in auth flows)

Backend environment variables required:
- SUPABASE_URL
- SUPABASE_ANON_KEY

Status: In this container, only REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY were detected. You must set REACT_APP_SUPABASE_ANON_KEY and REACT_APP_SITE_URL as well. For the backend, ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.

Frontend usage example:
import { getSupabaseClient, getEmailRedirectTo } from '../lib/supabaseClient';

const supabase = getSupabaseClient();
const emailRedirectTo = getEmailRedirectTo();

async function signInWithMagicLink(email) {
  if (!supabase) return;
  await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo }
  });
}

Signup example (email/password) using redirect:
async function signUp(email, password) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getEmailRedirectTo()}/auth/callback`
    }
  });
}

Important notes:
- Do not commit secrets. Put values in .env files only.
- The app continues to run if Supabase is not configured; callsites should check for client existence.
- Add both localhost and production URLs to Authentication > URL Configuration in your Supabase Dashboard.

Checklist to complete:
1) Supabase Dashboard > Authentication > URL Configuration:
   - Site URL: your production domain (or http://localhost:3000 for dev)
   - Redirect URLs allowlist:
     • http://localhost:3000/**
     • https://your-production-domain/**
2) Frontend .env:
   - REACT_APP_SUPABASE_URL=...
   - REACT_APP_SUPABASE_ANON_KEY=...
   - REACT_APP_SITE_URL=http://localhost:3000
3) Backend .env:
   - SUPABASE_URL=...
   - SUPABASE_ANON_KEY=...
4) Optionally adjust RLS policies if you introduce shared/team features.

Troubleshooting:
- If you see "Supabase is not fully configured" warnings, verify the env variables above are set and the redirect URLs are properly allowlisted in the Supabase Dashboard.
- For 401 auth errors during email link flows, ensure the emailRedirectTo (or redirectTo) matches an allowlisted URL and that your callback route exists.

