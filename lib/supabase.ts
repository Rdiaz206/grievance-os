import { createBrowserClient, createServerClient } from "@supabase/ssr";

const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

validateSupabaseConfig({ supabaseUrl, supabaseAnonKey });

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Supabase initialization failed: environment variable ${name} is required.`
    );
  }

  return value;
}

function validateSupabaseConfig({ supabaseUrl, supabaseAnonKey }: { supabaseUrl: string; supabaseAnonKey: string }) {
  if (!/^https?:\/\//i.test(supabaseUrl)) {
    throw new Error(
      "Supabase initialization failed: NEXT_PUBLIC_SUPABASE_URL must be a valid URL starting with http:// or https://."
    );
  }

  if (!supabaseAnonKey.startsWith("sb_")) {
    throw new Error(
      "Supabase initialization failed: NEXT_PUBLIC_SUPABASE_ANON_KEY does not appear to be a valid Supabase anon key."
    );
  }
}

export const createBrowserSupabaseClient = () => {
  if (typeof window === "undefined") {
    throw new Error(
      "createBrowserSupabaseClient must only be called in browser-rendered code."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
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

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: cookies as any,
  });
};
