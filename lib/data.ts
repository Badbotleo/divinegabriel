// ─────────────────────────────────────────────────────────────
// Static brand palette. Extra tones (blue/slate) are for past
// ventures & the timeline; the four core brand colors are per spec.
// ─────────────────────────────────────────────────────────────
export const ACCENT = {
  purple: "#534AB7", // LinkUpNaija
  navy: "#0A1628", // Aerovigil
  green: "#1A7A4A", // EcoFlux
  gold: "#FAC775", // BadBot
  blue: "#2563EB", // Vii Media
  slate: "#475569", // Safe Security Deposit / reset
} as const;

export type AccentColor = keyof typeof ACCENT;

export function accentText(color: AccentColor): string {
  return color === "gold" ? "#0A0A0A" : "#FFFFFF";
}

// ─────────────────────────────────────────────────────────────
// STATIC venture metadata (not editable from the dashboard):
// slug, color, logo key, initial, and the gradient used for the
// picture placeholder. Editable copy lives in defaultContent.
// ─────────────────────────────────────────────────────────────
export type VentureMeta = {
  slug: string;
  color: AccentColor;
  initial: string;
  gradient: [string, string];
};

export const ventureMeta: Record<string, VentureMeta> = {
  linkupnaija: {
    slug: "linkupnaija",
    color: "purple",
    initial: "L",
    gradient: ["#6A61D4", "#3B338F"],
  },
  aerovigil: {
    slug: "aerovigil",
    color: "navy",
    initial: "A",
    gradient: ["#1E3357", "#060C16"],
  },
  ecoflux: {
    slug: "ecoflux",
    color: "green",
    initial: "E",
    gradient: ["#22A063", "#0F5233"],
  },
  badbot: {
    slug: "badbot",
    color: "gold",
    initial: "B",
    gradient: ["#FBD79A", "#E0A94B"],
  },
};

export const ventureOrder = ["linkupnaija", "aerovigil", "ecoflux", "badbot"];

// ─────────────────────────────────────────────────────────────
// EDITABLE content. Everything here can be overridden from the
// admin dashboard (stored as JSON in Supabase, deep-merged on top).
// ─────────────────────────────────────────────────────────────

export type VentureContent = {
  status: string;
  statusTone: "green" | "navy" | "gold" | "slate";
  label: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  stats: string[];
  pills: string[];
  statusNote?: string;
  link?: { label: string; href: string };
  comingSoon?: string;
  privateNote?: string;
};

export type Stat = { value: string; label: string };
export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  color: AccentColor;
};
export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
};
export type Song = { artist: string; title: string; color: AccentColor };
export type NowCard = { label: string; body: string };

export type SiteContent = {
  hero: { label: string; subheading: string };
  about: { paragraphs: string[] };
  stats: Stat[];
  ventures: Record<string, VentureContent>;
  timeline: TimelineItem[];
  journal: JournalPost[];
  playlist: { spotifyUrl: string; appleUrl: string; songs: Song[] };
  now: { note?: string; cards: NowCard[] };
  contact: {
    email: string;
    x: string;
    xUrl: string;
    instagram: string;
    instagramUrl: string;
  };
};

export const defaultContent: SiteContent = {
  hero: {
    label: "FOUNDER · TRADER · BUILDER · ABUJA, NIGERIA 🇳🇬",
    subheading:
      "I build companies. LinkUpNaija is helping Nigerians find their people IRL. Aerovigil is protecting Nigerian estates and businesses with drone security. EcoFlux Energy is bringing clean solar power to homes and communities across Nigeria.",
  },
  about: {
    paragraphs: [
      "My story doesn't start with a business plan. It starts in 2022, when I lost my mom. The grief pulled me out of college and into a long, dark stretch of depression. Building is how I found my way back.",
      "I started working with my uncle on Vii Media, a digital marketing company — and it became my real education: cold calling and cold email, website development, Google and Meta Ads, SEO, and sales funnels. I learned how to find customers and actually close them. Then I co-founded Safe Security Deposit, a service that makes rental security deposits fair between landlords and tenants. Challenges forced us to pause it — but we're not done. We'll be back.",
      "Today I run three ventures — LinkUpNaija (social events), Aerovigil (drone security) and EcoFlux Energy (solar) — and I trade the markets independently as BadBot Trading. I don't wait for the right conditions. I find a problem, build the solution, and put it in the market. Systems, discipline, and showing up every single day.",
    ],
  },
  stats: [
    { value: "3", label: "Active ventures" },
    { value: "2023", label: "Year I went all in" },
    { value: "36", label: "Nigerian states on LinkUpNaija" },
    { value: "5", label: "Companies I've built" },
    { value: "CAC", label: "Aerovigil registered" },
    { value: "3", label: "Energy sectors served" },
  ],
  ventures: {
    linkupnaija: {
      status: "LIVE",
      statusTone: "green",
      label: "SOCIAL TECHNOLOGY · FOUNDED 2026",
      title: "LinkUpNaija",
      tagline: "Nigeria's social events platform.",
      description:
        "Nigeria's social events platform. From family picnics and book clubs to game nights and rooftop dinners — LinkUpNaija helps Nigerians find real events, meet real people, and build genuine connections. Not just parties. Real moments.",
      longDescription:
        "LinkUpNaija is where Nigerians find their people in real life. Browse and host events across 20+ categories in all 36 states — book clubs, game nights, picnics, rooftop dinners, fitness meetups and more. An AI concierge helps you discover what's happening near you, Paystack powers ticketing, and a Pro tier unlocks premium hosting tools. Built entirely solo on a modern, scalable stack.",
      stats: ["20+ Categories", "All 36 States", "AI-Powered", "₦9,900/mo Pro"],
      pills: ["Next.js", "TypeScript", "Supabase", "Paystack", "Vercel", "Claude AI"],
      link: { label: "Visit linkupnaija.com", href: "https://linkupnaija.com" },
    },
    aerovigil: {
      status: "OPERATING",
      statusTone: "navy",
      label: "DRONE SECURITY & SURVEILLANCE · CAC REGISTERED",
      title: "Aerovigil",
      tagline: "Drone security & surveillance across Nigeria.",
      description:
        "Professional drone security and surveillance for estates, corporate facilities, events, and critical infrastructure across Nigeria. Aerovigil provides aerial monitoring, perimeter security, and real-time surveillance intelligence using advanced drone technology.",
      longDescription:
        "Aerovigil brings eyes to the sky for Nigerian estates, corporate campuses, events and critical infrastructure. Our drones deliver aerial monitoring, perimeter security and real-time surveillance intelligence — spotting threats before they reach the ground. CAC registered and operating out of Abuja, we're building the aerial security layer Nigeria's fastest-growing communities need.",
      stats: ["Estates", "Corporate", "Events", "Infrastructure"],
      pills: [
        "Aerial Security",
        "Perimeter Monitoring",
        "Event Surveillance",
        "Infrastructure Inspection",
      ],
      statusNote: "CAC Registered · Abuja, Nigeria",
      comingSoon: "aerovigil.com — coming soon",
    },
    ecoflux: {
      status: "BUILDING",
      statusTone: "green",
      label: "CLEAN ENERGY · EARLY STAGE",
      title: "EcoFlux Energy",
      tagline: "Clean solar power for every Nigerian home.",
      description:
        "Making clean solar energy accessible across Nigeria. EcoFlux Energy designs and installs solar power systems for residential homes, rural communities, and commercial buildings. Building toward a future where every Nigerian home has reliable, affordable, clean power.",
      longDescription:
        "EcoFlux Energy exists to end the darkness. We design and install solar power systems for homes, rural communities and commercial buildings — turning Nigeria's biggest constraint, unreliable power, into an opportunity. From single-home setups to community electrification, we're building toward a future where clean, affordable, reliable energy is the default, not the luxury.",
      stats: ["Residential", "Rural Communities", "Commercial"],
      pills: [
        "Solar Installation",
        "Energy Consulting",
        "Rural Electrification",
        "Commercial Systems",
      ],
      statusNote: "Early stage · Abuja, Nigeria",
      comingSoon: "ecofluxenergy.com — coming soon",
    },
    badbot: {
      status: "ACTIVE",
      statusTone: "gold",
      label: "PROPRIETARY TRADING · INDEPENDENT",
      title: "BadBot Trading",
      tagline: "A proprietary system I built and operate.",
      description:
        "A proprietary trading system I built and operate independently. Top-down Fibonacci analysis with DXY correlation across major pairs. Discipline, risk management, and systematic execution. No external capital — this is personal.",
      longDescription:
        "BadBot Trading is my proprietary system, built from scratch and operated independently. It runs top-down Fibonacci analysis with DXY correlation across XAUUSD, GBPUSD and USTECH100 — every setup documented, every rule tested. No external capital, no noise: just discipline, risk management and systematic execution on funded prop accounts.",
      stats: ["XAUUSD", "GBPUSD", "USTECH100"],
      pills: ["Fibonacci Analysis", "DXY Correlation", "Price Action", "Prop Funded"],
      privateNote: "Private — no external link",
    },
  },
  timeline: [
    {
      year: "2022",
      title: "A hard reset",
      description:
        "I lost my mom. Grief pulled me out of college and into a long stretch of depression. It was the lowest point of my life — and, though I couldn't see it then, the beginning of everything.",
      color: "slate",
    },
    {
      year: "2022",
      title: "Vii Media",
      description:
        "I started working with my uncle to build Vii Media, a digital marketing company. It became my real education: cold calling and cold email, website development, Google and Meta Ads, SEO, and sales funnels. I learned how to find customers and close them.",
      color: "blue",
    },
    {
      year: "2023",
      title: "Safe Security Deposit",
      description:
        "Co-founded Safe Security Deposit — a service that manages rental security deposits and makes sure they're settled fairly between landlords and tenants. We ran it for a while before challenges forced us to pause. It's not dead. We'll be back.",
      color: "slate",
    },
    {
      year: "2025",
      title: "BadBot Trading",
      description:
        "Started trading financial markets independently. Built a proprietary Fibonacci-based system from scratch. Got funded on a prop account and began operating seriously.",
      color: "gold",
    },
    {
      year: "Early 2026",
      title: "First client work",
      description:
        "Built and deployed a full personal brand website for model and creator Abiola Ayeni using Next.js, TypeScript and Vercel. First paid development project.",
      color: "purple",
    },
    {
      year: "Mid 2026",
      title: "Aerovigil",
      description:
        "Founded and registered Aerovigil at CAC. Nigeria's drone security and surveillance company. Currently operating across estates, events and corporate facilities in Abuja.",
      color: "navy",
    },
    {
      year: "Mid 2026",
      title: "LinkUpNaija",
      description:
        "Identified the gap in Nigeria's social events market. Started building. Deployed the full platform — events, venues, AI chatbot, payments, Pro subscription and FC26 tournament.",
      color: "purple",
    },
    {
      year: "July 2026",
      title: "LinkUpNaija goes live",
      description:
        "linkupnaija.com launches publicly. Full stack: Next.js 14, Supabase, Paystack, Claude AI, Resend, Google Analytics. Built entirely solo.",
      color: "purple",
    },
    {
      year: "2026",
      title: "EcoFlux Energy",
      description:
        "Founded EcoFlux Energy to tackle Nigeria's power crisis. Designing solar systems for residential homes, rural communities and commercial buildings.",
      color: "green",
    },
    {
      year: "Now",
      title: "Building",
      description:
        "Growing three ventures simultaneously. Documenting the journey. Building toward pan-African expansion.",
      color: "gold",
    },
  ],
  journal: [
    {
      slug: "why-i-built-linkupnaija",
      title: "Why I built LinkUpNaija",
      excerpt:
        "I was tired of boring weekends in Abuja. Here is the full story of how I went from frustrated to founder.",
      date: "July 2026",
      tag: "Building",
    },
    {
      slug: "running-three-ventures-at-once",
      title: "Running three ventures at once",
      excerpt:
        "LinkUpNaija, Aerovigil, EcoFlux. How I manage focus, energy and priorities across multiple companies.",
      date: "July 2026",
      tag: "Entrepreneurship",
    },
    {
      slug: "what-trading-taught-me-about-building",
      title: "What trading taught me about building",
      excerpt:
        "Discipline, systems, and not chasing entries. The lessons from the markets apply everywhere.",
      date: "July 2026",
      tag: "Trading",
    },
  ],
  playlist: {
    spotifyUrl: "#",
    appleUrl: "#",
    songs: [
      { artist: "Wizkid", title: "Essence", color: "purple" },
      { artist: "Burna Boy", title: "Last Last", color: "navy" },
      { artist: "Asake", title: "Lonely at the Top", color: "green" },
      { artist: "Fela Kuti", title: "Lady", color: "gold" },
      { artist: "Drake", title: "Fireworks", color: "purple" },
      { artist: "The Weeknd", title: "Blinding Lights", color: "navy" },
    ],
  },
  now: {
    cards: [
      {
        label: "BUILDING",
        body: "Growing LinkUpNaija across Nigeria toward 1,000 active users. Running Aerovigil operations in Abuja. Laying groundwork for EcoFlux Energy's first installations.",
      },
      {
        label: "TRADING",
        body: "Operating BadBot Trading on funded prop accounts. Refining the Fibonacci system and documenting every setup for the trading journal.",
      },
      {
        label: "EXPLORING",
        body: "Researching drone regulation in West Africa for Aerovigil expansion. Exploring solar financing models for EcoFlux rural community projects.",
      },
    ],
  },
  contact: {
    email: "divine@divinegabriel.dev",
    x: "@Badbotleo001",
    xUrl: "https://x.com/Badbotleo001",
    instagram: "@officiallinkupnaija",
    instagramUrl: "https://instagram.com/officiallinkupnaija",
  },
};

export const subjects = [
  "LinkUpNaija",
  "Aerovigil",
  "EcoFlux Energy",
  "BadBot Trading",
  "Other",
];
