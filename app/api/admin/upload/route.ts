import { NextResponse } from "next/server";
import { auth, isAllowed } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const session = await auth();
  if (!isAllowed(session?.user?.email)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PNG, JPEG, WEBP or GIF images are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 5MB." },
      { status: 400 }
    );
  }

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `journal/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("media")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Ensure the 'media' bucket exists." },
      { status: 502 }
    );
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
