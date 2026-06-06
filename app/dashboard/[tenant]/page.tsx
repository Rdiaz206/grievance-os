"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "../../../lib/supabase";

interface TenantDashboardPageProps {
  params: { tenant: string };
}

export default function TenantDashboardPage({ params }: TenantDashboardPageProps) {
  const [statusMessage, setStatusMessage] = useState("Connecting to Supabase...");

  useEffect(() => {
    const checkSession = async () => {
      const client = createBrowserSupabaseClient();
      const { data } = await client.auth.getSession();
      const sessionStatus = data.session?.access_token ? "ready" : "unauthenticated";
      setStatusMessage(
        sessionStatus === "ready"
          ? `Supabase client ready for tenant ${params.tenant}.`
          : `Supabase client created; no active session detected for ${params.tenant}.`
      );
    };

    checkSession();
  }, [params.tenant]);

  return (
    <div className="space-y-8">
      <section id="overview" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Overview</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">{params.tenant} dashboard</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
            Tenant: {params.tenant}
          </span>
        </div>

        <p className="mt-6 text-slate-600">
          This dashboard uses Supabase for multi-tenant data access and can be extended with tenant-scoped
          queries, auth, and real-time updates.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-950">Tenant status</h3>
          <p className="mt-3 text-slate-600">{statusMessage}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-950">Next steps</h3>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• Add tenant-specific query logic in `lib/supabase.ts`.</li>
            <li>• Wire auth flows and session state to the dashboard layout.</li>
            <li>• Add analytics, settings, and activity widgets per tenant.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
