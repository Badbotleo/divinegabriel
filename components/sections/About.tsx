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
            <SectionHeading title="About me" />
          </FadeIn>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <FadeIn key={i} delay={60 + i * 60}>
                <p>{p}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <FadeIn delay={120}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6">
                  <div className="text-3xl font-extrabold text-ink">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm leading-snug text-muted">
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
