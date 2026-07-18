import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SubstackMark } from "@/components/logos";
import { XIcon, InstagramIcon } from "@/components/icons";
import { SiteContent, SocialLink } from "@/lib/data";

const META: Record<
  SocialLink["key"],
  { color: string; cta: string; render: () => JSX.Element }
> = {
  substack: {
    color: "#FF6719",
    cta: "Read",
    render: () => <SubstackMark size={24} />,
  },
  instagram: {
    color: "#E4405F",
    cta: "Follow",
    render: () => <InstagramIcon className="h-6 w-6" />,
  },
  x: {
    color: "#FFFFFF",
    cta: "Follow",
    render: () => <XIcon className="h-5 w-5" />,
  },
};

export default function Socials({ socials }: { socials: SiteContent["socials"] }) {
  return (
    <Section id="social">
      <FadeIn>
        <SectionHeading
          kicker="07 · Social"
          title="Find me online"
          subtitle="Follow the journey. Writing, markets and behind the scenes of the build."
        />
      </FadeIn>

      <div className="grid gap-5 md:grid-cols-3">
        {socials.map((s, i) => {
          const m = META[s.key];
          return (
            <FadeIn key={s.key} delay={i * 70}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-shadow"
                  style={{
                    color: m.color,
                    background: `${m.color}1A`,
                    border: `1px solid ${m.color}33`,
                  }}
                >
                  {m.render()}
                </span>

                <div className="mt-5 flex items-baseline gap-2">
                  <h3 className="text-lg font-extrabold text-white">{s.label}</h3>
                  <span className="text-sm text-text-lo">{s.handle}</span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-lo">
                  {s.blurb}
                </p>

                <span
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-0.5"
                  style={{ color: m.color === "#FFFFFF" ? "#8B7BFF" : m.color }}
                >
                  {m.cta} →
                </span>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
