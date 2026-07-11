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
      className={`w-full scroll-mt-20 border-b border-line ${
        panel ? "bg-panel" : "bg-white"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-container px-6 py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted">{subtitle}</p>}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-sm text-muted">
      {children}
    </span>
  );
}

// Colored circle with a venture initial
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
  const textColor = accentText(color);
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full font-extrabold"
      style={{
        width: size,
        height: size,
        background: bg,
        color: textColor,
        fontSize: size * 0.42,
      }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
