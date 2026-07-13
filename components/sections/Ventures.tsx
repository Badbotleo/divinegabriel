import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import {
  DARK_ACCENT,
  ventureMeta,
  ventureOrder,
  VentureContent,
} from "@/lib/data";

function StatusPill({ status }: { status: string }) {
  return (
    <span className="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-glow-cyan" />
      {status}
    </span>
  );
}

function VentureCard({ slug, v }: { slug: string; v: VentureContent }) {
  const meta = ventureMeta[slug];
  const accent = DARK_ACCENT[meta.color];

  return (
    <div className="group relative flex overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      {/* whole-card link → detail page */}
      <Link href={`/ventures/${slug}`} className="absolute inset-0 z-0" aria-label={`View ${v.title}`} />

      {/* glowing accent edge */}
      <div className="w-1 flex-none" style={{ background: accent, boxShadow: `0 0 24px ${accent}` }} />

      <div className="flex flex-1 flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-9">
        <div className="pointer-events-none relative z-10 flex flex-row items-center gap-4 md:w-40 md:flex-col md:items-start">
          <span
            className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl text-2xl font-extrabold"
            style={{
              color: accent,
              background: `${accent}1A`,
              border: `1px solid ${accent}40`,
              boxShadow: `inset 0 0 20px ${accent}22`,
            }}
          >
            {meta.initial}
          </span>
          <StatusPill status={v.status} />
        </div>

        <div className="relative z-10 flex-1">
          <p className="mono-label text-[10px] font-semibold text-text-lo">{v.label}</p>
          <h3
            className="mt-2 text-2xl font-extrabold text-white transition-colors md:text-3xl"
            style={{ ["--a" as string]: accent }}
          >
            <span className="group-hover:text-[color:var(--a)]">{v.title}</span>
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-lo">{v.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-white/85">
            {v.stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/25">·</span>}
                {stat}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {v.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-edge bg-white/[0.03] px-3 py-1 text-xs text-text-lo"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {v.statusNote && <span className="font-medium text-white/80">{v.statusNote}</span>}
            {v.link && (
              <a
                href={v.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 font-semibold transition-opacity hover:opacity-70"
                style={{ color: accent }}
              >
                {v.link.label} →
              </a>
            )}
            {v.comingSoon && <span className="text-white/35">{v.comingSoon}</span>}
            {v.privateNote && <span className="text-white/35">{v.privateNote}</span>}
            <span className="ml-auto font-semibold text-text-lo transition-all group-hover:translate-x-0.5 group-hover:text-white">
              View venture →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ventures({
  ventures,
}: {
  ventures: Record<string, VentureContent>;
}) {
  return (
    <Section id="ventures">
      <FadeIn>
        <SectionHeading
          kicker="02 — Ventures"
          title="Companies I build & operate"
          subtitle="Four ventures, one operator. Each one solves a real problem I saw in Nigeria."
        />
      </FadeIn>
      <div className="space-y-5">
        {ventureOrder.map((slug, i) => (
          <FadeIn key={slug} delay={i * 60}>
            <VentureCard slug={slug} v={ventures[slug]} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
