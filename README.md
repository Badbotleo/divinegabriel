# divinegabriel.dev

Personal portfolio for **Ugokanu Divine Gabriel** — founder, trader, builder based in Abuja, Nigeria.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Content lives in [`lib/data.ts`](lib/data.ts) as defaults and can be edited live from the `/admin` dashboard (stored in Supabase, deep-merged over the defaults).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in what you need
npm run dev
```

The public site works with **zero** environment variables (it falls back to the hardcoded defaults). Env vars only unlock extra features.

## Environment variables

| Variable | Enables |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO / QR (`https://divinegabriel.dev`). |
| `RESEND_API_KEY` | Contact-form email sending. |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Live-editable content store for `/admin`. Run [`supabase/schema.sql`](supabase/schema.sql) once. |
| `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google login for `/admin` (allowlisted in [`auth.ts`](auth.ts)). |

## Structure

```
app/
  page.tsx                 Landing page (all sections, content-driven)
  admin/                   Google-auth'd content dashboard
  ventures/[slug]/         Venture detail pages
  journal/[slug]/          Journal placeholder pages
  card/                    Printable contact card + QR
  api/contact              Contact form (Resend)
  api/vcard                vCard download
  api/admin/content        Save endpoint (Supabase, auth-guarded)
  api/auth/[...nextauth]   Auth.js routes
components/
  sections/                Hero, About, Ventures, Timeline, Journal, Playlist, Now, Contact
  admin/ContentEditor.tsx  Dashboard editor
  logos.tsx                SVG brand marks
lib/
  data.ts        Default content + static venture meta
  content.ts     getContent(): Supabase overrides deep-merged over defaults
  qr.ts          vCard QR generation
  supabase.ts    Server Supabase client
auth.ts          Auth.js config + email allowlist
```

## Admin dashboard

Visit `/admin`, sign in with an allowlisted Google account (see `ALLOWED_EMAILS` in `auth.ts`), and edit the About text, stats, hero, ventures, playlist links, Now cards and contact details. Saves write to Supabase and revalidate the site within a minute.

## Deploy

Auto-deploys to Vercel (`badbotleos-projects`) on push to `main`. Custom domain: `divinegabriel.dev`.
