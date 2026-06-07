import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orgName, localNumber, unionAffiliation, userId } = body;

    const supabase = createServerSupabaseClient(cookies());

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    // allow flows where the client provides a pending user id (signup without session)
    const profileId = user?.id ?? userId ?? null;

    if (!profileId) {
      return NextResponse.json({ error: "Not authenticated or no user id provided" }, { status: 401 });
    }

    const { data: orgData, error: orgErr } = await supabase
      .from("organizations")
      .insert({ name: orgName, local_number: localNumber, union_affiliation: unionAffiliation })
      .select()
      .single();

    if (orgErr) {
      return NextResponse.json({ error: orgErr.message }, { status: 500 });
    }

    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ organization_id: orgData.id })
      .eq("id", profileId);

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, organization: orgData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
