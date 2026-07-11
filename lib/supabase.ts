import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client using the service role key.
 * Returns null when Supabase isn't configured yet, so the site
 * falls back to hardcoded defaults and still builds/serves.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const CONTENT_TABLE = "site_content";
export const CONTENT_ROW_ID = 1;
