import FadeIn from "@/components/FadeIn";
import { XIcon, InstagramIcon } from "@/components/icons";
import { SiteContent } from "@/lib/data";

const pills = [
  { label: "LinkUpNaija", bg: "#534AB7", text: "#FFFFFF" },
  { label: "Aerovigil", bg: "#0A1628", text: "#FFFFFF" },
  { label: "EcoFlux Energy", bg: "#1A7A4A", text: "#FFFFFF" },
  { label: "BadBot Trading", bg: "#FAC775", text: "#0A0A0A" },
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
      className="relative flex min-h-screen items-center overflow-hidden border-b border-line bg-white"
    >
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-container px-6 py-28">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {hero.label}
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 className="mt-6 tracking-tight text-ink">
            <span className="block text-4xl font-light leading-none sm:text-5xl md:text-7xl lg:text-[80px]">
              Ugokanu
            </span>
            <span className="mt-1 block text-4xl font-extrabold leading-none sm:text-5xl md:text-7xl lg:text-[80px]">
              Divine Gabriel.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={160}>
          <p className="mt-8 max-w-[520px] text-lg leading-relaxed text-muted">
            {hero.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={220}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <span
                key={pill.label}
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                style={{ background: pill.bg, color: pill.text }}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={280}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ventures"
              className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              See my ventures
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={340}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-muted">
              Currently building in Abuja, Nigeria 🇳🇬
            </p>
            <div className="flex items-center gap-4">
              <a
                href={contact.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted transition-colors hover:text-ink"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted transition-colors hover:text-ink"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
