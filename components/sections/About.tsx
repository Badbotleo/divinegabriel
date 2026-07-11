import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";

const stats = [
  { value: "3", label: "Active ventures" },
  { value: "2026", label: "Year I went all in" },
  { value: "36", label: "Nigerian states on LinkUpNaija" },
  { value: "₦2M", label: "FC26 Tournament prize pool" },
  { value: "CAC", label: "Aerovigil registered" },
  { value: "3", label: "Energy sectors served" },
];

export default function About() {
  return (
    <Section id="about" panel>
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <FadeIn>
            <SectionHeading title="About me" />
          </FadeIn>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <FadeIn delay={60}>
              <p>
                I&apos;m a self-taught founder and builder from Abuja, Nigeria. I
                don&apos;t wait for the right conditions — I identify a problem,
                build the solution, and put it in the market.
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <p>
                I currently run three ventures: LinkUpNaija (social events
                platform), Aerovigil (drone security and surveillance), and EcoFlux
                Energy (residential and commercial solar). Each solves a real
                problem I saw in Nigeria.
              </p>
            </FadeIn>
            <FadeIn delay={180}>
              <p>
                I also trade financial markets independently under the name BadBot
                Trading — a proprietary system I built and operate across XAUUSD,
                GBPUSD and USTECH100. I believe in building systems, documenting
                everything, and showing up every single day.
              </p>
            </FadeIn>
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
