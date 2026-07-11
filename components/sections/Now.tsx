import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SiteContent } from "@/lib/data";

export default function Now({ now }: { now: SiteContent["now"] }) {
  return (
    <Section id="now">
      <FadeIn>
        <SectionHeading
          title="Now"
          subtitle="What I am focused on · Updated July 2026"
        />
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        {now.cards.map((card, i) => (
          <FadeIn key={card.label} delay={i * 70}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-purple">
                {card.label}
              </span>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {card.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {now.note && <p className="mt-8 text-sm text-muted">{now.note}</p>}
    </Section>
  );
}
