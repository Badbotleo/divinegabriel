import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { DARK_ACCENT, SiteContent } from "@/lib/data";

export default function Timeline({ items }: { items: SiteContent["timeline"] }) {
  return (
    <Section id="timeline" panel>
      <FadeIn>
        <SectionHeading kicker="03 · Journey" title="The journey" subtitle="How I got here." />
      </FadeIn>

      <div className="relative">
        {/* glowing spine */}
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-violet/70 via-cyan/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-10 md:space-y-0">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            const accent = DARK_ACCENT[item.color];
            return (
              <li key={`${item.year}-${item.title}`} className="relative md:min-h-[7rem]">
                <span
                  className="absolute left-0 top-1.5 z-10 h-3.5 w-3.5 rounded-full md:left-1/2 md:-translate-x-1/2"
                  style={{ background: accent, boxShadow: `0 0 14px ${accent}, 0 0 0 4px rgba(5,6,11,1)` }}
                />
                <div className={`pl-8 md:w-1/2 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                  <FadeIn delay={i * 40}>
                    <div className="mono-label text-xs font-bold" style={{ color: accent }}>
                      {item.year}
                    </div>
                    <h3 className="mt-1.5 text-lg font-extrabold text-white">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-text-lo">{item.description}</p>
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
