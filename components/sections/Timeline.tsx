import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { ACCENT, SiteContent } from "@/lib/data";

export default function Timeline({ items }: { items: SiteContent["timeline"] }) {
  return (
    <Section id="timeline" panel>
      <FadeIn>
        <SectionHeading title="The journey" subtitle="How I got here" />
      </FadeIn>

      <div className="relative">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-10 md:space-y-0">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={`${item.year}-${item.title}`} className="relative md:min-h-[7rem]">
                <span
                  className="absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 border-panel md:left-1/2 md:-translate-x-1/2"
                  style={{ background: ACCENT[item.color] }}
                />

                <div
                  className={`pl-8 md:w-1/2 md:pl-0 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <FadeIn delay={i * 40}>
                    <div
                      className="text-sm font-bold"
                      style={{ color: ACCENT[item.color] }}
                    >
                      {item.year}
                    </div>
                    <h3 className="mt-1 text-lg font-extrabold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </FadeIn>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
