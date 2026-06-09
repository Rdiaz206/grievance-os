import { createBrowserClient, createServerClient } from "@supabase/ssr";

// Access env vars at module scope so Next.js build tools can replace them at build time
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function validateSupabaseConfig(supabaseUrl: string, supabaseAnonKey: string) {
  if (!supabaseUrl) {
    throw new Error(
      "Supabase configuration error: NEXT_PUBLIC_SUPABASE_URL is not set. Please ensure it is defined in your environment variables."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "Supabase configuration error: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please ensure it is defined in your environment variables."
    );
  }

  if (!/^https?:\/\//i.test(supabaseUrl)) {
    throw new Error(
      "Supabase configuration error: NEXT_PUBLIC_SUPABASE_URL must be a valid URL starting with http:// or https://."
    );
  }

  if (!supabaseAnonKey.startsWith("sb_")) {
    throw new Error(
      "Supabase configuration error: NEXT_PUBLIC_SUPABASE_ANON_KEY does not appear to be a valid Supabase anon key (should start with 'sb_')."
    );
  }
}

export const createBrowserSupabaseClient = () => {
  if (typeof window === "undefined") {
    throw new Error(
      "createBrowserSupabaseClient must only be called in browser-rendered code."
    );
  }

  validateSupabaseConfig(SUPABASE_URL, SUPABASE_ANON_KEY);

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    isSingleton: true,
  });
};

export const createServerSupabaseClient = (cookies: any) => {
  if (typeof window !== "undefined") {
    throw new Error(
      "createServerSupabaseClient must only be called in server-side code."
    );
  }

  if (!cookies || typeof cookies !== "object") {
    throw new Error(
      "createServerSupabaseClient requires a valid cookies object from the server request."
    );
  }

  validateSupabaseConfig(SUPABASE_URL, SUPABASE_ANON_KEY);

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: cookies as any,
  });
};
