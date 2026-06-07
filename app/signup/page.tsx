"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Input, Label, Button } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createBrowserSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        document.cookie = "grievance-auth=true; path=/; sameSite=lax";
        router.replace("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      document.cookie = "grievance-auth=true; path=/; sameSite=lax";
      router.push("/dashboard");
      return;
    }

    // If sign-up did not immediately return a session (email confirmation flows),
    // set a lightweight auth marker and send the user to onboarding to complete organization setup.
    document.cookie = "grievance-auth=true; path=/; sameSite=lax";
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-black/20 sm:p-12">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Create your account</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Sign up with Supabase
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Register quickly and securely to access the dashboard experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)}
                required
                placeholder="Your name"
                className="rounded-2xl"
              />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                className="rounded-2xl"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                required
                placeholder="Create a password"
                className="rounded-2xl"
              />
            </div>

            {error ? <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
            {message ? <p className="rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">{message}</p> : null}

            <div>
              <Button type="submit" className="w-full">{loading ? "Creating account…" : "Sign up"}</Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account? {" "}
            <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
