import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-white/5 bg-slate-900/90 p-10 shadow-2xl shadow-black/20 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Grievance OS</p>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Secure authentication for your dashboard.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Sign in or sign up with Supabase Auth to reach the protected dashboard experience.
                The app will redirect authenticated users directly to <strong>/dashboard</strong>.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-3 text-base font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 text-slate-300 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Protected routes</p>
              <ul className="mt-6 space-y-4 text-base leading-7 text-slate-300">
                <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <strong className="text-white">/dashboard</strong> is protected and requires authentication.
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  Unauthenticated users are redirected to <strong>/login</strong>.
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  Supabase Auth handles login and sign-up flows.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
