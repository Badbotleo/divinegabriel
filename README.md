# divinegabriel.dev

Personal portfolio for **Ugokanu Divine Gabriel** — founder, trader, builder based in Abuja, Nigeria.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. No database — all content is hardcoded in [`lib/data.ts`](lib/data.ts).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key used by the contact form.      |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (`https://divinegabriel.dev`). |

## Structure

```
app/
  layout.tsx            Root layout, Inter font, SEO metadata
  page.tsx              Landing page (all sections)
  icon.tsx              Favicon — "D" in a purple circle
  globals.css           Tailwind + dot grid + fade-in utilities
  api/contact/route.ts  Contact form handler (Resend)
  journal/[slug]/       Dynamic journal placeholder pages
components/
  Navbar.tsx  Footer.tsx  FadeIn.tsx  ui.tsx  icons.tsx
  sections/   Hero, About, Ventures, Timeline, Journal, Playlist, Now, Contact
lib/data.ts             Single source of truth for all content
```

## Deploy

Deployed to Vercel under the `badbotleos-projects` team with the custom domain `divinegabriel.dev`.
