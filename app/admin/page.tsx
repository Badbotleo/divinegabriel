import type { Metadata } from "next";
import { auth, signIn, signOut, isAllowed } from "@/auth";
import { getContent } from "@/lib/content";
import { getSupabaseAdmin } from "@/lib/supabase";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — divinegabriel.dev",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-panel px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        {children}
      </div>
    </main>
  );
}

export default async function AdminPage() {
  // If Auth.js env vars aren't set yet, auth() throws. Show setup help
  // instead of crashing.
  let session = null;
  let authConfigured = true;
  try {
    session = await auth();
  } catch {
    authConfigured = false;
  }

  if (!authConfigured) {
    return (
      <Shell>
        <h1 className="text-xl font-extrabold text-ink">Admin setup required</h1>
        <p className="mt-3 text-sm text-muted">
          Add these environment variables in Vercel, then redeploy:
        </p>
        <ul className="mt-4 space-y-1 text-left text-sm text-ink">
          <li><code>AUTH_SECRET</code></li>
          <li><code>AUTH_GOOGLE_ID</code></li>
          <li><code>AUTH_GOOGLE_SECRET</code></li>
          <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
          <li><code>SUPABASE_SERVICE_ROLE_KEY</code></li>
        </ul>
      </Shell>
    );
  }

  const email = session?.user?.email;

  if (!isAllowed(email)) {
    return (
      <Shell>
        <h1 className="text-xl font-extrabold text-ink">Divine · Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with an authorized Google account.
        </p>
        {email && (
          <p className="mt-3 text-xs text-red-600">
            {email} is not authorized for this dashboard.
          </p>
        )}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="w-full rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Continue with Google
          </button>
        </form>
        {email && (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
            className="mt-3"
          >
            <button type="submit" className="text-xs text-muted hover:text-ink">
              Sign out
            </button>
          </form>
        )}
      </Shell>
    );
  }

  const content = await getContent();
  const supabaseReady = getSupabaseAdmin() !== null;

  return (
    <main className="min-h-screen bg-panel">
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-extrabold text-ink">Content dashboard</div>
            <div className="text-xs text-muted">{email}</div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-panel"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase isn&apos;t configured yet, so saving is disabled. Add{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>, run the schema in{" "}
            <code>supabase/schema.sql</code>, and redeploy.
          </div>
        )}
        <ContentEditor initial={content} canSave={supabaseReady} />
      </div>
    </main>
  );
}
