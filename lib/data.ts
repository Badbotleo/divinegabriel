export type VentureColor = "purple" | "navy" | "green" | "gold";

export const ACCENT: Record<VentureColor, string> = {
  purple: "#534AB7",
  navy: "#0A1628",
  green: "#1A7A4A",
  gold: "#FAC775",
};

export type Venture = {
  initial: string;
  color: VentureColor;
  status: string;
  statusTone: "green" | "navy" | "gold";
  label: string;
  title: string;
  description: string;
  stats: string[];
  pills: string[];
  statusNote?: string;
  link?: { label: string; href: string };
  comingSoon?: string;
  privateNote?: string;
};

export const ventures: Venture[] = [
  {
    initial: "L",
    color: "purple",
    status: "LIVE",
    statusTone: "green",
    label: "SOCIAL TECHNOLOGY · FOUNDED 2026",
    title: "LinkUpNaija",
    description:
      "Nigeria's social events platform. From family picnics and book clubs to game nights and rooftop dinners — LinkUpNaija helps Nigerians find real events, meet real people, and build genuine connections. Not just parties. Real moments.",
    stats: ["20+ Categories", "All 36 States", "AI-Powered", "₦9,900/mo Pro"],
    pills: ["Next.js", "TypeScript", "Supabase", "Paystack", "Vercel", "Claude AI"],
    link: { label: "Visit linkupnaija.com", href: "https://linkupnaija.com" },
  },
  {
    initial: "A",
    color: "navy",
    status: "OPERATING",
    statusTone: "navy",
    label: "DRONE SECURITY & SURVEILLANCE · CAC REGISTERED",
    title: "Aerovigil",
    description:
      "Professional drone security and surveillance for estates, corporate facilities, events, and critical infrastructure across Nigeria. Aerovigil provides aerial monitoring, perimeter security, and real-time surveillance intelligence using advanced drone technology.",
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
  {
    initial: "E",
    color: "green",
    status: "BUILDING",
    statusTone: "green",
    label: "CLEAN ENERGY · EARLY STAGE",
    title: "EcoFlux Energy",
    description:
      "Making clean solar energy accessible across Nigeria. EcoFlux Energy designs and installs solar power systems for residential homes, rural communities, and commercial buildings. Building toward a future where every Nigerian home has reliable, affordable, clean power.",
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
  {
    initial: "B",
    color: "gold",
    status: "ACTIVE",
    statusTone: "gold",
    label: "PROPRIETARY TRADING · INDEPENDENT",
    title: "BadBot Trading",
    description:
      "A proprietary trading system I built and operate independently. Top-down Fibonacci analysis with DXY correlation across major pairs. Discipline, risk management, and systematic execution. No external capital — this is personal.",
    stats: ["XAUUSD", "GBPUSD", "USTECH100"],
    pills: ["Fibonacci Analysis", "DXY Correlation", "Price Action", "Prop Funded"],
    privateNote: "Private — no external link",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  color: VentureColor;
};

export const timeline: TimelineItem[] = [
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
];

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
};

export const journalPosts: JournalPost[] = [
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
];

export type Song = {
  artist: string;
  title: string;
  color: VentureColor;
};

export const playlist: Song[] = [
  { artist: "Wizkid", title: "Essence", color: "purple" },
  { artist: "Burna Boy", title: "Last Last", color: "navy" },
  { artist: "Asake", title: "Lonely at the Top", color: "green" },
  { artist: "Fela Kuti", title: "Lady", color: "gold" },
  { artist: "Drake", title: "Fireworks", color: "purple" },
  { artist: "The Weeknd", title: "Blinding Lights", color: "navy" },
];

export type NowCard = { label: string; body: string };

export const nowCards: NowCard[] = [
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
];

export const contactCards = [
  { label: "Email", value: "divine@divinegabriel.dev", href: "mailto:divine@divinegabriel.dev" },
  { label: "X / Twitter", value: "@Badbotleo001", href: "https://x.com/Badbotleo001" },
  {
    label: "Instagram",
    value: "@officiallinkupnaija",
    href: "https://instagram.com/officiallinkupnaija",
  },
];

export const socials = {
  x: "https://x.com/Badbotleo001",
  instagram: "https://instagram.com/officiallinkupnaija",
};

export const subjects = [
  "LinkUpNaija",
  "Aerovigil",
  "EcoFlux Energy",
  "BadBot Trading",
  "Other",
];
