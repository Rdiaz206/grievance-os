"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Input, Label, Button } from "@/components/ui";

export default function OnboardingPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const [unionAffiliation, setUnionAffiliation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName, localNumber, unionAffiliation }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create organization");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold mb-4">Create your organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Organization name</Label>
            <Input required value={orgName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrgName(e.target.value)} />
          </div>

          <div>
            <Label>Local number</Label>
            <Input value={localNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalNumber(e.target.value)} />
          </div>

          <div>
            <Label>Union affiliation</Label>
            <Input value={unionAffiliation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnionAffiliation(e.target.value)} />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div>
            <Button type="submit" className="w-full">{loading ? "Creating…" : "Create organization"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
