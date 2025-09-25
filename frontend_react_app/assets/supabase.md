# Supabase Integration (Frontend)

This app is pre-configured to use Supabase client via src/lib/supabaseClient.js.

Environment variables required:
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- REACT_APP_SITE_URL (used for emailRedirectTo when implementing auth)

Usage example:

import { getSupabaseClient, getEmailRedirectTo } from '../lib/supabaseClient';

const supabase = getSupabaseClient();
const emailRedirectTo = getEmailRedirectTo();

async function signIn(email) {
  if (!supabase) return;
  await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo }
  });
}

Note:
- Values must be set in .env (do not commit secrets).
- The app continues to function without Supabase configured; auth-specific features should check for client availability.
