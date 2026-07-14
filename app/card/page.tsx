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
  description: "Divine Gabriel's digital business card. Scan the QR to save contact.",
};

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(56,224,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(56,224,255,0.10) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

function Corners() {
  const base = "absolute h-3 w-3 border-cyan/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

// Shared card frame: gradient ring + dark inner + glow/grid/corners
function CardFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[min(92vw,480px)] print:w-[3.5in]">
      <div
        className="card-print aspect-[1.75/1] rounded-[20px] bg-gradient-to-br from-violet/60 via-white/10 to-cyan/50 p-px shadow-[0_0_50px_-8px_rgba(124,107,255,0.4)] print:aspect-auto print:h-[2in] print:shadow-none"
      >
        <div className="relative h-full overflow-hidden rounded-[19px] bg-panel2">
          <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={gridBg} />
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,107,255,0.55), transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(56,224,255,0.35), transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <Corners />
          <div className="relative flex h-full flex-col p-6 md:p-7 print:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default async function CardPage() {
  const content = await getContent();
  const qr = await getContactQrDataUrl();
  const c = content.contact;

  return (
    <main className="future-root min-h-screen bg-void px-6 py-12 print:bg-white print:py-0">
      <div className="relative z-10">
        {/* Toolbar — hidden when printing */}
        <div className="mx-auto mb-10 flex max-w-[480px] items-center justify-between print:hidden">
          <Link
            href="/#contact"
            className="text-sm font-semibold text-text-lo transition-colors hover:text-white"
          >
            ← Back
          </Link>
          <div className="flex gap-3">
            <a
              href="/api/vcard"
              className="glass rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25"
            >
              Save contact
            </a>
            <PrintButton className="rounded-lg bg-gradient-to-r from-violet to-cyan px-4 py-2 text-sm font-semibold text-void shadow-[0_0_24px_-4px_rgba(124,107,255,0.7)] transition-transform hover:-translate-y-0.5">
              Print / PDF
            </PrintButton>
          </div>
        </div>

        <div className="space-y-8 print:space-y-0">
          {/* ───────── FRONT ───────── */}
          <div>
            <p className="mx-auto mb-3 max-w-[480px] text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-lo print:hidden">
              Front
            </p>
            <div className="print:break-after-page">
              <CardFrame>
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.05]">
                    <span className="gradient-text text-xl font-extrabold">DG</span>
                  </span>
                  <span className="mono-label text-[10px] text-text-lo">divinegabriel.dev</span>
                </div>

                <div className="mt-auto">
                  <div className="mono-label text-[10px] font-semibold text-cyan">
                    Founder · Trader · Builder
                  </div>
                  <h1 className="mt-2 text-[26px] font-light leading-none text-white md:text-[30px]">
                    Ugokanu{" "}
                    <span className="gradient-text font-extrabold">Divine Gabriel</span>
                  </h1>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-text-lo">Abuja, Nigeria 🇳🇬</span>
                    <span className="flex items-center gap-1.5">
                      {ventureOrder.map((slug) => (
                        <span
                          key={slug}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: ACCENT[ventureMeta[slug].color] }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </CardFrame>
            </div>
          </div>

          {/* ───────── BACK ───────── */}
          <div>
            <p className="mx-auto mb-3 max-w-[480px] text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-lo print:hidden">
              Back
            </p>
            <CardFrame>
              <div className="flex h-full gap-5">
                {/* Contact details */}
                <div className="flex flex-1 flex-col justify-center gap-3">
                  <Detail label="Email" value={c.email} />
                  <Detail label="Phone" value={c.phone} />
                  <Detail label="Socials" value={`${c.x} · ${c.instagram}`} />
                </div>

                {/* QR + ventures */}
                <div className="flex flex-col items-center justify-between">
                  <div className="rounded-lg bg-white p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qr}
                      alt="Scan to save contact"
                      width={104}
                      height={104}
                      className="h-[104px] w-[104px]"
                    />
                  </div>
                  <span className="mono-label mt-2 text-[9px] text-text-lo">Scan to save</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-edge pt-3">
                <span className="mono-label text-[9px] text-text-lo">Ventures</span>
                <span className="flex items-center gap-2.5">
                  {ventureOrder.map((slug) => (
                    <span
                      key={slug}
                      className="grid h-6 w-6 place-items-center rounded-md"
                      style={{ background: `${ACCENT[ventureMeta[slug].color]}1F` }}
                    >
                      <VentureMark slug={slug} size={15} />
                    </span>
                  ))}
                </span>
              </div>
            </CardFrame>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[480px] text-center text-xs text-text-lo print:hidden">
          Tip: “Print / PDF” exports both sides at true business-card size (3.5″ × 2″) —
          print double-sided, or “Save contact” to download the vCard.
        </p>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono-label text-[9px] font-semibold text-text-lo/80">{label}</div>
      <div className="mt-0.5 break-words text-[13px] font-semibold text-white">{value}</div>
    </div>
  );
}
