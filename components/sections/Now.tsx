import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { nowCards } from "@/lib/data";

export default function Now() {
  return (
    <Section id="now">
      <FadeIn>
        <SectionHeading
          title="Now"
          subtitle="What I am focused on · Updated July 2026"
        />
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        {nowCards.map((card, i) => (
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

      <p className="mt-8 text-sm text-muted">
        Inspired by{" "}
        <a
          href="https://nownownow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          nownownow.com
        </a>
      </p>
    </Section>
  );
}
