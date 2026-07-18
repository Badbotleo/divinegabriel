import FadeIn from "@/components/FadeIn";
import { XIcon, InstagramIcon } from "@/components/icons";
import { SiteContent, DARK_ACCENT } from "@/lib/data";

const pills = [
  { label: "LinkUpNaija", color: DARK_ACCENT.purple },
  { label: "Aerovigil", color: DARK_ACCENT.navy },
  { label: "EcoFlux Energy", color: DARK_ACCENT.green },
  { label: "BadBot Trading", color: DARK_ACCENT.gold },
];

export default function Hero({
  hero,
  contact,
}: {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Ambient background */}
      <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aurora animate-drift left-[8%] top-[6%] h-[26rem] w-[26rem] bg-violet/40" aria-hidden="true" />
      <div className="aurora animate-drift-slow right-[2%] top-[22%] h-[30rem] w-[30rem] bg-cyan/25" aria-hidden="true" />
      <div className="aurora animate-drift bottom-[2%] left-[38%] h-[22rem] w-[22rem] bg-violet/25" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-container px-6 py-32">
        <FadeIn>
          <p className="mono-label text-[11px] font-semibold text-cyan">
            {hero.label}
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 className="mt-6 tracking-tight">
            <span className="block text-4xl font-light leading-[1.02] text-white/85 sm:text-5xl md:text-7xl lg:text-[84px]">
              Ugokanu
            </span>
            <span className="gradient-text mt-1 block text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-7xl lg:text-[84px]">
              Divine Gabriel.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={160}>
          <p className="mt-8 max-w-[540px] text-lg leading-relaxed text-text-lo">
            {hero.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={220}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((p) => (
              <span
                key={p.label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/90"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }}
                />
                {p.label}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={280}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ventures"
              className="rounded-lg bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:-translate-y-0.5"
            >
              See my ventures
            </a>
            <a
              href="#contact"
              className="glass rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/20"
            >
              Get in touch
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={340}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-6">
            <p className="flex items-center gap-2 text-sm text-text-lo">
              <span className="relative flex h-2 w-2">
                <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-cyan" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Currently building in Abuja, Nigeria 🇳🇬
            </p>
            <div className="flex items-center gap-3">
              <a
                href={contact.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="glass flex h-9 w-9 items-center justify-center rounded-lg text-text-lo transition-colors hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="glass flex h-9 w-9 items-center justify-center rounded-lg text-text-lo transition-colors hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
