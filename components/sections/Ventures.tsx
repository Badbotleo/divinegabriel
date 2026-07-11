import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { LogoTile } from "@/components/logos";
import {
  ACCENT,
  ventureMeta,
  ventureOrder,
  VentureContent,
} from "@/lib/data";

const toneStyles: Record<
  VentureContent["statusTone"],
  { color: string; bg: string; dot: string }
> = {
  green: { color: "#1A7A4A", bg: "rgba(26,122,74,0.10)", dot: "#1A7A4A" },
  navy: { color: "#0A1628", bg: "rgba(10,22,40,0.08)", dot: "#0A1628" },
  gold: { color: "#8A6410", bg: "rgba(250,199,117,0.28)", dot: "#FAC775" },
  slate: { color: "#475569", bg: "rgba(71,85,105,0.12)", dot: "#475569" },
};

function StatusPill({
  status,
  tone,
}: {
  status: string;
  tone: VentureContent["statusTone"];
}) {
  const s = toneStyles[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
      style={{ color: s.color, background: s.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function VentureCard({ slug, v }: { slug: string; v: VentureContent }) {
  const meta = ventureMeta[slug];
  return (
    <div className="group relative flex overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-muted/40">
      {/* Whole-card link overlay → detail page */}
      <Link
        href={`/ventures/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${v.title}`}
      />

      <div className="w-1.5 flex-none" style={{ background: ACCENT[meta.color] }} />

      <div className="flex flex-1 flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-10">
        {/* Logo + status */}
        <div className="pointer-events-none relative z-10 flex flex-row items-center gap-4 md:w-40 md:flex-col md:items-start">
          <LogoTile slug={slug} color={meta.color} size={64} />
          <StatusPill status={v.status} tone={v.statusTone} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
            {v.label}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink transition-colors group-hover:text-[color:var(--accent)] md:text-3xl"
            style={{ ["--accent" as string]: ACCENT[meta.color] }}
          >
            {v.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {v.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-ink">
            {v.stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                {i > 0 && <span className="text-line">·</span>}
                {stat}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {v.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-line bg-panel px-3 py-1 text-xs text-muted"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {v.statusNote && (
              <span className="font-medium text-ink">{v.statusNote}</span>
            )}
            {/* External link sits above the overlay (pointer-events + z) */}
            {v.link && (
              <a
                href={v.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 font-semibold transition-opacity hover:opacity-70"
                style={{ color: ACCENT[meta.color] }}
              >
                {v.link.label} →
              </a>
            )}
            {v.comingSoon && <span className="text-muted/60">{v.comingSoon}</span>}
            {v.privateNote && <span className="text-muted/60">{v.privateNote}</span>}
            <span
              className="ml-auto font-semibold text-muted transition-all group-hover:translate-x-0.5 group-hover:text-ink"
            >
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
          title="Ventures"
          subtitle="Companies I have founded and operate"
        />
      </FadeIn>
      <div className="space-y-6">
        {ventureOrder.map((slug, i) => (
          <FadeIn key={slug} delay={i * 60}>
            <VentureCard slug={slug} v={ventures[slug]} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
