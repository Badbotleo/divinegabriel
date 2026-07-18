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

// Brightened accents for the dark / futuristic theme (navy is invisible on black)
export const DARK_ACCENT: Record<AccentColor, string> = {
  purple: "#8B7BFF",
  navy: "#5AA9FF",
  green: "#38E8A0",
  gold: "#FBCE86",
  blue: "#5A8CFF",
  slate: "#9AA6BE",
};

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
  coverImage?: string;
  body?: string;
  published?: boolean;
};

export type Journal = {
  substackUrl: string;
  posts: JournalPost[];
};
export type Song = { artist: string; title: string; color: AccentColor };
export type NowCard = { label: string; body: string };

export type SiteContent = {
  hero: { label: string; subheading: string };
  about: { paragraphs: string[] };
  stats: Stat[];
  ventures: Record<string, VentureContent>;
  timeline: TimelineItem[];
  journal: Journal;
  playlist: { spotifyUrl: string; appleUrl: string; songs: Song[] };
  now: { note?: string; cards: NowCard[] };
  socials: SocialLink[];
  contact: {
    email: string;
    phone: string;
    phoneUrl: string;
    x: string;
    xUrl: string;
    instagram: string;
    instagramUrl: string;
  };
};

export type SocialLink = {
  key: "substack" | "instagram" | "x";
  label: string;
  handle: string;
  blurb: string;
  url: string;
};

export const defaultContent: SiteContent = {
  hero: {
    label: "FOUNDER · TRADER · BUILDER · ABUJA, NIGERIA 🇳🇬",
    subheading:
      "I build companies in Nigeria. Social events, drone security and clean energy. I also trade the markets. Find a problem, build the fix, ship it.",
  },
  about: {
    paragraphs: [
      "In 2022 I lost my mom. Grief pulled me out of college. Building is how I found my way back.",
      "I cut my teeth at Vii Media doing outreach, websites, ads, SEO and funnels, then co-founded Safe Security Deposit. We paused it. We'll be back.",
      "Now I run three ventures and trade as BadBot Trading. I don't wait for perfect conditions. I find a problem, build the fix, and ship.",
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
        "Nigeria's social events platform. Find real events, meet real people, build genuine connections.",
      longDescription:
        "LinkUpNaija is where Nigerians find their people in real life. Browse and host events across 20+ categories in all 36 states: book clubs, game nights, picnics, rooftop dinners, fitness meetups and more. An AI concierge helps you discover what's happening near you, Paystack powers ticketing, and a Pro tier unlocks premium hosting tools. Built entirely solo on a modern, scalable stack.",
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
        "Drone security and surveillance for estates, businesses, events and infrastructure across Nigeria.",
      longDescription:
        "Aerovigil brings eyes to the sky for Nigerian estates, corporate campuses, events and critical infrastructure. Our drones deliver aerial monitoring, perimeter security and real-time surveillance intelligence that spots threats before they reach the ground. CAC registered and operating out of Abuja, we're building the aerial security layer Nigeria's fastest-growing communities need.",
      stats: ["Estates", "Corporate", "Events", "Infrastructure"],
      pills: [
        "Aerial Security",
        "Perimeter Monitoring",
        "Event Surveillance",
        "Infrastructure Inspection",
      ],
      statusNote: "CAC Registered · Abuja, Nigeria",
      link: { label: "Visit aerovigil.com.ng", href: "https://aerovigil.com.ng" },
    },
    ecoflux: {
      status: "BUILDING",
      statusTone: "green",
      label: "CLEAN ENERGY · EARLY STAGE",
      title: "EcoFlux Energy",
      tagline: "Clean solar power for every Nigerian home.",
      description:
        "Clean solar power for homes, communities and businesses across Nigeria.",
      longDescription:
        "EcoFlux Energy exists to end the darkness. We design and install solar power systems for homes, rural communities and commercial buildings, turning Nigeria's biggest constraint, unreliable power, into an opportunity. From single-home setups to community electrification, we're building toward a future where clean, affordable, reliable energy is the default, not the luxury.",
      stats: ["Residential", "Rural Communities", "Commercial"],
      pills: [
        "Solar Installation",
        "Energy Consulting",
        "Rural Electrification",
        "Commercial Systems",
      ],
      statusNote: "Early stage · Abuja, Nigeria",
      comingSoon: "ecofluxenergy.com (coming soon)",
    },
    badbot: {
      status: "ACTIVE",
      statusTone: "gold",
      label: "PROPRIETARY TRADING · INDEPENDENT",
      title: "BadBot Trading",
      tagline: "A proprietary system I built and operate.",
      description:
        "A proprietary trading system I built and run. Fibonacci, DXY correlation, discipline. No external capital.",
      longDescription:
        "BadBot Trading is my proprietary system, built from scratch and operated independently. It runs top-down Fibonacci analysis with DXY correlation across XAUUSD, GBPUSD and USTECH100, with every setup documented and every rule tested. No external capital, no noise. Just discipline, risk management and systematic execution.",
      stats: ["XAUUSD", "GBPUSD", "USTECH100"],
      pills: ["Fibonacci Analysis", "DXY Correlation", "Price Action", "Risk Management"],
      privateNote: "Private, no external link",
    },
  },
  timeline: [
    {
      year: "2022",
      title: "A hard reset",
      description:
        "Lost my mom. Dropped out of college. Rock bottom, and the beginning of everything.",
      color: "slate",
    },
    {
      year: "2022",
      title: "Vii Media",
      description:
        "Joined my uncle to build a digital marketing company. My real education: outreach, websites, ads, SEO and funnels.",
      color: "blue",
    },
    {
      year: "2023",
      title: "Safe Security Deposit",
      description:
        "Co-founded a service making rental deposits fair between landlords and tenants. Paused, not finished.",
      color: "slate",
    },
    {
      year: "2025",
      title: "BadBot Trading",
      description:
        "Started trading the markets. Built a proprietary Fibonacci system from scratch.",
      color: "gold",
    },
    {
      year: "Late 2025",
      title: "Aerovigil",
      description:
        "Founded and CAC-registered Nigeria's drone security company. Operating across Abuja.",
      color: "navy",
    },
    {
      year: "Early 2026",
      title: "EcoFlux Energy",
      description:
        "Founded EcoFlux to take on Nigeria's power crisis with solar.",
      color: "green",
    },
    {
      year: "Mid 2026",
      title: "LinkUpNaija",
      description:
        "Spotted the gap in Nigeria's social scene and started building the full platform.",
      color: "purple",
    },
    {
      year: "July 2026",
      title: "LinkUpNaija goes live",
      description: "linkupnaija.com launches publicly. Full stack, built solo.",
      color: "purple",
    },
    {
      year: "Now",
      title: "Building",
      description:
        "Three ventures at once. Documenting the journey. Building for Africa.",
      color: "gold",
    },
  ],
  journal: {
    substackUrl: "https://divinegabriel.substack.com",
    posts: [
      {
        slug: "why-i-built-linkupnaija",
        title: "Why I built LinkUpNaija",
        excerpt:
          "I was tired of boring weekends in Abuja. Here is the full story of how I went from frustrated to founder.",
        date: "July 2026",
        tag: "Building",
        published: true,
      },
      {
        slug: "running-three-ventures-at-once",
        title: "Running three ventures at once",
        excerpt:
          "LinkUpNaija, Aerovigil, EcoFlux. How I manage focus, energy and priorities across multiple companies.",
        date: "July 2026",
        tag: "Entrepreneurship",
        published: true,
      },
      {
        slug: "what-trading-taught-me-about-building",
        title: "What trading taught me about building",
        excerpt:
          "Discipline, systems, and not chasing entries. The lessons from the markets apply everywhere.",
        date: "July 2026",
        tag: "Trading",
        published: true,
      },
    ],
  },
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
        body: "Scaling LinkUpNaija toward 1,000 users. Running Aerovigil in Abuja. Prepping EcoFlux's first installs.",
      },
      {
        label: "TRADING",
        body: "Running BadBot Trading. Refining the system, documenting every setup.",
      },
      {
        label: "EXPLORING",
        body: "Drone regulation across West Africa. Solar financing for rural communities.",
      },
    ],
  },
  socials: [
    {
      key: "substack",
      label: "Substack",
      handle: "@divinegabriel",
      blurb: "Essays on building, trading and life in Nigeria.",
      url: "https://divinegabriel.substack.com",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@badbot.corp",
      blurb: "Behind the scenes of the build.",
      url: "https://instagram.com/badbot.corp",
    },
    {
      key: "x",
      label: "X",
      handle: "@Badbotleo",
      blurb: "Real-time thoughts, markets and updates.",
      url: "https://x.com/Badbotleo",
    },
  ],
  contact: {
    email: "divine@divinegabriel.dev",
    phone: "+234 816 006 5025",
    phoneUrl: "tel:+2348160065025",
    x: "@Badbotleo",
    xUrl: "https://x.com/Badbotleo",
    instagram: "@badbot.corp",
    instagramUrl: "https://instagram.com/badbot.corp",
  },
};

export const subjects = [
  "LinkUpNaija",
  "Aerovigil",
  "EcoFlux Energy",
  "BadBot Trading",
  "Other",
];
