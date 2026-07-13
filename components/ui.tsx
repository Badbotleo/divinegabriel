import { ACCENT, AccentColor, accentText } from "@/lib/data";

export function Section({
  id,
  panel = false,
  className = "",
  children,
}: {
  id?: string;
  panel?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-20 ${
        panel ? "bg-panel1/70" : "bg-transparent"
      } ${className}`}
    >
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-glow opacity-40" />
      <div className="mx-auto w-full max-w-container px-6 py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      {kicker && (
        <div className="mono-label mb-4 flex items-center gap-2.5 text-[11px] font-semibold text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-glow-cyan" />
          {kicker}
        </div>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-lo">{subtitle}</p>
      )}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-edge bg-white/[0.03] px-3 py-1 text-sm text-text-lo backdrop-blur">
      {children}
    </span>
  );
}

// Colored glowing circle with a venture initial
export function VentureBadge({
  initial,
  color,
  size = 56,
}: {
  initial: string;
  color: AccentColor;
  size?: number;
}) {
  const bg = ACCENT[color];
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full font-extrabold"
      style={{
        width: size,
        height: size,
        background: bg,
        color: accentText(color),
        fontSize: size * 0.42,
      }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
