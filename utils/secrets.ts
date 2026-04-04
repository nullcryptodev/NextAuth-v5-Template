import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.SUPABASE_URL || '';
const supabase_anon_key = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabase_url, supabase_anon_key);

export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || '';

export const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID || '';
export const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET || '';