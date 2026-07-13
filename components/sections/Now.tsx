import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SiteContent } from "@/lib/data";

export default function Now({ now }: { now: SiteContent["now"] }) {
  return (
    <Section id="now">
      <FadeIn>
        <SectionHeading
          kicker="06 — Now"
          title="Now"
          subtitle="What I am focused on · Updated July 2026"
        />
      </FadeIn>

      <div className="grid gap-5 md:grid-cols-3">
        {now.cards.map((card, i) => (
          <FadeIn key={card.label} delay={i * 70}>
            <div className="glass group flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-violet/40">
              <span className="mono-label text-xs font-bold text-cyan">{card.label}</span>
              <p className="mt-4 text-base leading-relaxed text-text-lo">{card.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {now.note && <p className="mt-8 text-sm text-text-lo">{now.note}</p>}
    </Section>
  );
}
