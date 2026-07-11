import { ACCENT, AccentColor } from "@/lib/data";

type MarkProps = { size?: number; className?: string };

/* LinkUpNaija — two interlocking links (connection) */
export function LinkUpNaijaMark({ size = 40, className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <rect x="7.5" y="14" width="17" height="12" rx="6" stroke={ACCENT.purple} strokeWidth="3.2" />
      <rect x="15.5" y="14" width="17" height="12" rx="6" stroke={ACCENT.purple} strokeWidth="3.2" />
    </svg>
  );
}

/* Aerovigil — drone: central lens + four rotors */
export function AerovigilMark({ size = 40, className = "" }: MarkProps) {
  const c = ACCENT.navy;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="4.5" stroke={c} strokeWidth="2.4" />
      <circle cx="31" cy="9" r="4.5" stroke={c} strokeWidth="2.4" />
      <circle cx="9" cy="31" r="4.5" stroke={c} strokeWidth="2.4" />
      <circle cx="31" cy="31" r="4.5" stroke={c} strokeWidth="2.4" />
      <line x1="12" y1="12" x2="28" y2="28" stroke={c} strokeWidth="2.4" />
      <line x1="28" y1="12" x2="12" y2="28" stroke={c} strokeWidth="2.4" />
      <circle cx="20" cy="20" r="5.5" fill={c} />
      <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/* EcoFlux — leaf with an energy bolt */
export function EcofluxMark({ size = 40, className = "" }: MarkProps) {
  const c = ACCENT.green;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <path
        d="M30 8C18 8 9 15 9 26c0 2 .4 4 1 5.5C13 22 20 16 30 14c-7 4-11 10-13 18 12 1 21-6 21-18 0-2 0-4-.4-6H30Z"
        fill={c}
      />
      <path d="M21 17l-6 8h4l-2 7 7-9h-4l3-6h-2Z" fill="#FFFFFF" />
    </svg>
  );
}

/* BadBot Trading — candlestick chart */
export function BadBotMark({ size = 40, className = "" }: MarkProps) {
  const c = "#B4841F"; // darker gold so it reads on light bg
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <line x1="11" y1="6" x2="11" y2="34" stroke={c} strokeWidth="2.2" />
      <rect x="7.5" y="12" width="7" height="14" rx="1.5" fill={ACCENT.gold} stroke={c} strokeWidth="2" />
      <line x1="27" y1="4" x2="27" y2="32" stroke={c} strokeWidth="2.2" />
      <rect x="23.5" y="16" width="7" height="12" rx="1.5" fill={ACCENT.gold} stroke={c} strokeWidth="2" />
    </svg>
  );
}

/* Vii Media — play triangle inside a rounded square */
export function ViiMediaMark({ size = 40, className = "" }: MarkProps) {
  const c = ACCENT.blue;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <rect x="5" y="5" width="30" height="30" rx="9" fill={c} />
      <path d="M17 14l10 6-10 6V14Z" fill="#FFFFFF" />
    </svg>
  );
}

/* Safe Security Deposit — shield with a lock */
export function SafeDepositMark({ size = 40, className = "" }: MarkProps) {
  const c = ACCENT.slate;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <path d="M20 5l12 4v9c0 8-5 13-12 17-7-4-12-9-12-17V9l12-4Z" fill={c} />
      <rect x="15" y="19" width="10" height="8" rx="1.6" fill="#FFFFFF" />
      <path d="M16.8 19v-2.2a3.2 3.2 0 0 1 6.4 0V19" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

const VENTURE_MARKS: Record<string, (p: MarkProps) => JSX.Element> = {
  linkupnaija: LinkUpNaijaMark,
  aerovigil: AerovigilMark,
  ecoflux: EcofluxMark,
  badbot: BadBotMark,
};

export function VentureMark({
  slug,
  size = 40,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Mark = VENTURE_MARKS[slug];
  return Mark ? <Mark size={size} className={className} /> : null;
}

/**
 * Framed logo tile: the brand mark on a soft tinted rounded square.
 * Used on venture cards and detail pages.
 */
export function LogoTile({
  slug,
  color,
  size = 64,
}: {
  slug: string;
  color: AccentColor;
  size?: number;
}) {
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-2xl border"
      style={{
        width: size,
        height: size,
        background: `${ACCENT[color]}12`,
        borderColor: `${ACCENT[color]}2A`,
      }}
    >
      <VentureMark slug={slug} size={size * 0.58} />
    </span>
  );
}
