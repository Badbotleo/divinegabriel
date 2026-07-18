import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SiteContent } from "@/lib/data";

export default function About({
  about,
  stats,
}: {
  about: SiteContent["about"];
  stats: SiteContent["stats"];
}) {
  return (
    <Section id="about" panel>
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <FadeIn>
            <SectionHeading kicker="01 · About" title="About me" />
          </FadeIn>
          <div className="space-y-6 text-lg leading-relaxed text-text-lo">
            {about.paragraphs.map((p, i) => (
              <FadeIn key={i} delay={60 + i * 60}>
                <p>{p}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <FadeIn delay={120}>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass group rounded-2xl p-5 transition-colors hover:border-violet/40"
                >
                  <div className="bg-gradient-to-br from-white to-cyan/70 bg-clip-text text-3xl font-extrabold text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm leading-snug text-text-lo">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
