import Link from "next/link";

export default function DashboardIndexPage() {
  const tenants = ["acme", "alpha", "team-x"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Multi-tenant dashboard</h1>
          <p className="mt-4 text-slate-600">
            Select a tenant to preview the dashboard layout and tenant-aware navigation.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tenants.map((tenant) => (
              <Link
                key={tenant}
                href={`/dashboard/${tenant}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300 hover:bg-white"
              >
                <p className="text-lg font-semibold">{tenant}</p>
                <p className="mt-1 text-sm text-slate-500">View the tenant dashboard for {tenant}.</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
