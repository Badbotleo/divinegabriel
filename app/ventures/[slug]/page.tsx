import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VentureMark } from "@/components/logos";
import {
  ACCENT,
  accentText,
  defaultContent,
  ventureMeta,
  ventureOrder,
} from "@/lib/data";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return ventureOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const v = defaultContent.ventures[params.slug];
  if (!v) return { title: "Venture — Ugokanu Divine Gabriel" };
  return {
    title: `${v.title} — Ugokanu Divine Gabriel`,
    description: v.description,
  };
}

export default async function VenturePage({
  params,
}: {
  params: { slug: string };
}) {
  const meta = ventureMeta[params.slug];
  if (!meta) notFound();

  const content = await getContent();
  const v = content.ventures[params.slug];
  const accent = ACCENT[meta.color];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero banner — gradient picture placeholder */}
        <div
          className="relative pt-16"
          style={{
            background: `linear-gradient(135deg, ${meta.gradient[0]}, ${meta.gradient[1]})`,
          }}
        >
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
          <div className="relative mx-auto max-w-container px-6 py-16 md:py-24">
            <Link
              href="/#ventures"
              className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              ← All ventures
            </Link>
            <div className="mt-8 flex items-center gap-5">
              <span className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-white/95 shadow-sm">
                <VentureMark slug={meta.slug} size={48} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                  {v.label}
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  {v.title}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-white/85">{v.tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-3 md:gap-16">
            <div className="md:col-span-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ color: accentText(meta.color), background: accent }}
              >
                {v.status}
              </span>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {v.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {v.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-line bg-panel px-3 py-1 text-sm text-muted"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
                {v.link && (
                  <a
                    href={v.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: accent, color: accentText(meta.color) }}
                  >
                    {v.link.label} →
                  </a>
                )}
                {v.comingSoon && (
                  <span className="text-muted/70">{v.comingSoon}</span>
                )}
                {v.privateNote && (
                  <span className="text-muted/70">{v.privateNote}</span>
                )}
                <Link
                  href="/#contact"
                  className="font-semibold text-ink transition-opacity hover:opacity-70"
                >
                  Work with me →
                </Link>
              </div>
            </div>

            {/* Highlights */}
            <aside>
              <div className="rounded-2xl border border-line bg-panel p-6">
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                  Highlights
                </div>
                <ul className="mt-4 space-y-3">
                  {v.stats.map((stat) => (
                    <li key={stat} className="flex items-start gap-2.5 text-sm text-ink">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                        style={{ background: accent }}
                      />
                      {stat}
                    </li>
                  ))}
                </ul>
                {v.statusNote && (
                  <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                    {v.statusNote}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
