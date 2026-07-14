import Link from "next/link";
import { SiteContent } from "@/lib/data";

const footerVentures = [
  { slug: "linkupnaija", name: "LinkUpNaija" },
  { slug: "aerovigil", name: "Aerovigil" },
  { slug: "ecoflux", name: "EcoFlux Energy" },
];

const footerLinks = [
  { id: "about", label: "About" },
  { id: "ventures", label: "Ventures" },
  { id: "journal", label: "Journal" },
  { id: "now", label: "Now" },
  { id: "social", label: "Social" },
  { id: "contact", label: "Contact" },
];

export default function Footer({ contact }: { contact: SiteContent["contact"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-edge bg-panel1/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-glow opacity-50" />
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="gradient-text text-lg font-extrabold">Ugokanu Divine Gabriel</div>
            <div className="mt-1 text-sm text-text-lo">divinegabriel.dev</div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block text-sm text-text-lo transition-colors hover:text-white"
            >
              {contact.email}
            </a>
          </div>

          <div className="md:justify-self-center">
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <Link href={`/#${link.id}`} className="text-sm text-text-lo transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/card" className="text-sm text-text-lo transition-colors hover:text-white">
                  Contact card
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <div className="mono-label text-[10px] font-semibold text-text-lo/70">Ventures</div>
            <ul className="mt-3 space-y-2">
              {footerVentures.map((v) => (
                <li key={v.slug}>
                  <Link href={`/ventures/${v.slug}`} className="text-sm text-text-lo transition-colors hover:text-white">
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-edge pt-6 text-sm text-text-lo">
          <span>© {year} Ugokanu Divine Gabriel · Abuja, Nigeria 🇳🇬</span>
          <span>Founder · Trader · Builder</span>
        </div>
      </div>
    </footer>
  );
}
