import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading, VentureBadge } from "@/components/ui";
import { ACCENT, ventures, Venture } from "@/lib/data";

const toneStyles: Record<
  Venture["statusTone"],
  { color: string; bg: string; dot: string }
> = {
  green: { color: "#1A7A4A", bg: "rgba(26,122,74,0.10)", dot: "#1A7A4A" },
  navy: { color: "#0A1628", bg: "rgba(10,22,40,0.08)", dot: "#0A1628" },
  gold: { color: "#8A6410", bg: "rgba(250,199,117,0.28)", dot: "#FAC775" },
};

function StatusPill({ status, tone }: { status: string; tone: Venture["statusTone"] }) {
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

function VentureCard({ v }: { v: Venture }) {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-line bg-white">
      {/* Left accent bar */}
      <div className="w-1.5 flex-none" style={{ background: ACCENT[v.color] }} />

      <div className="flex flex-1 flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-10">
        {/* Badge column */}
        <div className="flex flex-row items-center gap-4 md:w-40 md:flex-col md:items-start">
          <VentureBadge initial={v.initial} color={v.color} size={64} />
          <StatusPill status={v.status} tone={v.statusTone} />
        </div>

        {/* Content column */}
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
            {v.label}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink md:text-3xl">
            {v.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {v.description}
          </p>

          {/* Key stats row */}
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-ink">
            {v.stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                {i > 0 && <span className="text-line">·</span>}
                {stat}
              </span>
            ))}
          </div>

          {/* Pills */}
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

          {/* Footer: link / status note / coming soon / private */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {v.statusNote && (
              <span className="font-medium text-ink">{v.statusNote}</span>
            )}
            {v.link && (
              <a
                href={v.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-opacity hover:opacity-70"
                style={{ color: ACCENT[v.color] }}
              >
                {v.link.label} →
              </a>
            )}
            {v.comingSoon && (
              <span className="text-muted/60">{v.comingSoon}</span>
            )}
            {v.privateNote && (
              <span className="text-muted/60">{v.privateNote}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ventures() {
  return (
    <Section id="ventures">
      <FadeIn>
        <SectionHeading
          title="Ventures"
          subtitle="Companies I have founded and operate"
        />
      </FadeIn>
      <div className="space-y-6">
        {ventures.map((v, i) => (
          <FadeIn key={v.title} delay={i * 60}>
            <VentureCard v={v} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
