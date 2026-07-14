import Link from "next/link";
import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import { VentureMark } from "@/components/logos";
import { ACCENT, DARK_ACCENT, ventureOrder, ventureMeta } from "@/lib/data";
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

// Shared card frame: gradient ring + dark inner + print-safe glow (in the
// clipped background — no blur, so it renders identically on screen & print).
function CardFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[min(92vw,480px)] print:w-[3.4in]">
      <div
        className="card-print aspect-[1.75/1] rounded-[20px] p-px shadow-[0_0_50px_-8px_rgba(124,107,255,0.4)] print:aspect-auto print:h-[1.95in] print:shadow-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,107,255,0.75), rgba(56,224,255,0.55))",
        }}
      >
        <div
          className="card-print relative h-full overflow-hidden rounded-[19px]"
          style={{
            background:
              "radial-gradient(130% 95% at 100% 0%, rgba(124,107,255,0.34), transparent 55%), radial-gradient(120% 95% at 0% 105%, rgba(56,224,255,0.22), transparent 52%), #0B0E19",
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={gridBg} />
          <Corners />
          <div className="relative flex h-full flex-col p-6 md:p-7 print:p-5">{children}</div>
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
          <div className="flex flex-wrap justify-end gap-2.5">
            <a
              href="/api/card-image?side=front"
              download="divine-card-front.png"
              className="rounded-lg bg-gradient-to-r from-violet to-cyan px-4 py-2 text-sm font-semibold text-void shadow-[0_0_24px_-4px_rgba(124,107,255,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Download front
            </a>
            <a
              href="/api/card-image?side=back"
              download="divine-card-back.png"
              className="rounded-lg bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-void shadow-[0_0_24px_-4px_rgba(56,224,255,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Download back
            </a>
            <a
              href="/api/vcard"
              className="glass rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25"
            >
              Save contact
            </a>
            <PrintButton className="glass rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25">
              Print
            </PrintButton>
          </div>
        </div>

        <div className="space-y-8 print:space-y-0">
          {/* ───────── FRONT ───────── */}
          <div className="card-page">
            <div>
            <p className="mx-auto mb-3 max-w-[480px] text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-lo print:hidden">
              Front
            </p>
            <div>
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
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {ventureOrder.map((slug) => {
                      const col = DARK_ACCENT[ventureMeta[slug].color];
                      return (
                        <span
                          key={slug}
                          className="rounded-full px-2 py-[3px] text-[10px] font-semibold leading-none"
                          style={{
                            color: col,
                            border: `1px solid ${col}55`,
                            background: `${col}1A`,
                          }}
                        >
                          {content.ventures[slug].title}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </CardFrame>
            </div>
            </div>
          </div>

          {/* ───────── BACK ───────── */}
          <div className="card-page">
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
        </div>

        <p className="mx-auto mt-8 max-w-[480px] text-center text-xs text-text-lo print:hidden">
          Tip: use <span className="font-semibold text-white">Download PNG</span> for a
          pixel-perfect card to share or print, or “Save contact” for the vCard. When
          printing, turn off your browser’s “Headers and footers”.
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
