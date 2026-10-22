import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/*
  The connection to your Supabase database.

  It uses the two public values from .env.local. The publishable key is safe
  in the browser because Row Level Security (RLS) in Supabase decides what
  visitors may do: insert reviews/messages/visits, and read approved reviews.

  IMPORTANT: never chain .select() after .insert(). Visitors are not allowed
  to read visits or messages back, so it would make the insert fail.
*/

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (client) return client;

  // Read each variable directly so Next.js can include them in the browser bundle.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    // Only the variable names are mentioned, never their values.
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
    );
  }

  client = createClient<Database>(url, key, {
    // No logins on this site, so don't store or refresh sessions.
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}
