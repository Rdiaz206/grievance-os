import type { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { tenant: string } | Promise<{ tenant: string }>;
}

export function generateMetadata({ params }: { params: { tenant: string } }): Metadata {
  return {
    title: `${params.tenant} · Grievance OS Dashboard`,
    description: `Tenant dashboard for ${params.tenant} in Grievance OS.`,
  };
}

export default async function DashboardLayout({ children, params }: Readonly<DashboardLayoutProps>) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white p-6 lg:w-80 lg:border-r lg:border-b-0">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Tenant</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-950">{resolvedParams.tenant}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tenant-aware workspace with shared dashboard navigation.
            </p>
          </div>

          <nav className="space-y-3 text-sm text-slate-700">
            <a className="block rounded-2xl px-4 py-3 hover:bg-slate-100" href="#overview">
              Overview
            </a>
            <a className="block rounded-2xl px-4 py-3 hover:bg-slate-100" href="#activity">
              Activity
            </a>
            <a className="block rounded-2xl px-4 py-3 hover:bg-slate-100" href="#settings">
              Settings
            </a>
            <a className="block rounded-2xl px-4 py-3 hover:bg-slate-100" href="#support">
              Support
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
