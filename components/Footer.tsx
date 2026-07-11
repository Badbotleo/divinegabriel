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
  { id: "contact", label: "Contact" },
];

export default function Footer({ contact }: { contact: SiteContent["contact"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#222222] bg-ink text-white">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold text-white">
              Ugokanu Divine Gabriel
            </div>
            <div className="mt-1 text-sm text-white/50">divinegabriel.dev</div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block text-sm text-white/60 transition-colors hover:text-white"
            >
              {contact.email}
            </a>
          </div>

          <div className="md:justify-self-center">
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/card"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Contact card
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Ventures
            </div>
            <ul className="mt-3 space-y-2">
              {footerVentures.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/ventures/${v.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[#222222] pt-6 text-sm text-white/50">
          <span>© {year} Ugokanu Divine Gabriel · Abuja, Nigeria 🇳🇬</span>
          <span>Founder · Trader · Builder</span>
        </div>
      </div>
    </footer>
  );
}
