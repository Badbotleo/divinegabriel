import Link from "next/link";
import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import { VentureMark } from "@/components/logos";
import { ACCENT, ventureOrder, ventureMeta } from "@/lib/data";
import { getContent } from "@/lib/content";
import { getContactQrDataUrl } from "@/lib/qr";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact card — Ugokanu Divine Gabriel",
  description: "Save Divine Gabriel's contact card. Scan the QR to add to contacts.",
};

const ventureNames: Record<string, string> = {
  linkupnaija: "LinkUpNaija",
  aerovigil: "Aerovigil",
  ecoflux: "EcoFlux Energy",
  badbot: "BadBot Trading",
};

export default async function CardPage() {
  const content = await getContent();
  const qr = await getContactQrDataUrl();
  const c = content.contact;

  return (
    <main className="min-h-screen bg-panel px-6 py-12 print:bg-white print:p-0">
      {/* Toolbar — hidden when printing */}
      <div className="mx-auto mb-8 flex max-w-md items-center justify-between print:hidden">
        <Link
          href="/#contact"
          className="text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          ← Back
        </Link>
        <div className="flex gap-3">
          <a
            href="/api/vcard"
            className="rounded-lg border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Save contact
          </a>
          <PrintButton className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            Print / PDF
          </PrintButton>
        </div>
      </div>

      {/* The card */}
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-line bg-white shadow-sm print:mx-0 print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        {/* Top band */}
        <div className="bg-ink px-8 py-8 text-white">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Founder · Trader · Builder
          </div>
          <div className="mt-2 text-2xl font-extrabold leading-tight">
            Ugokanu Divine Gabriel
          </div>
          <div className="mt-1 text-sm text-white/60">Abuja, Nigeria 🇳🇬</div>
        </div>

        {/* Body */}
        <div className="flex items-start gap-6 px-8 py-8">
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
                Email
              </div>
              <a
                href={`mailto:${c.email}`}
                className="text-sm font-semibold text-ink break-words"
              >
                {c.email}
              </a>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
                Web
              </div>
              <span className="text-sm font-semibold text-ink">divinegabriel.dev</span>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
                Social
              </div>
              <span className="text-sm font-semibold text-ink">
                {c.x} · {c.instagram}
              </span>
            </div>
          </div>

          {/* QR */}
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qr}
              alt="Scan to save contact"
              width={120}
              height={120}
              className="h-28 w-28 rounded-lg border border-line"
            />
            <span className="mt-2 text-[10px] font-medium uppercase tracking-wide text-muted">
              Scan to save
            </span>
          </div>
        </div>

        {/* Ventures strip */}
        <div className="border-t border-line px-8 py-5">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Ventures
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {ventureOrder.map((slug) => (
              <span key={slug} className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: `${ACCENT[ventureMeta[slug].color]}14` }}
                >
                  <VentureMark slug={slug} size={18} />
                </span>
                <span className="text-sm font-medium text-ink">
                  {ventureNames[slug]}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-xs text-muted print:hidden">
        Tip: use “Print → Save as PDF” for a shareable card, or “Save contact” to
        download a vCard.
      </p>
    </main>
  );
}
