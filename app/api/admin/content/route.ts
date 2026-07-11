import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth, isAllowed } from "@/auth";
import { getSupabaseAdmin, CONTENT_TABLE, CONTENT_ROW_ID } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await auth();
  if (!isAllowed(session?.user?.email)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured on the server." },
      { status: 503 }
    );
  }

  let body: { data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "Missing content data." }, { status: 400 });
  }

  const { error } = await supabase.from(CONTENT_TABLE).upsert({
    id: CONTENT_ROW_ID,
    data: body.data,
    updated_at: new Date().toISOString(),
    updated_by: session?.user?.email ?? null,
  });

  if (error) {
    console.error("Content save error:", error);
    return NextResponse.json(
      { error: "Failed to save. Check the Supabase table exists." },
      { status: 502 }
    );
  }

  // Push the changes live immediately.
  revalidatePath("/");
  revalidatePath("/card");
  revalidatePath("/ventures/[slug]", "page");
  revalidatePath("/journal/[slug]", "page");

  return NextResponse.json({ ok: true });
}
