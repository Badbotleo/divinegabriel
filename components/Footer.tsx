const footerLinks = [
  { id: "about", label: "About" },
  { id: "ventures", label: "Ventures" },
  { id: "journal", label: "Journal" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

const footerVentures = ["LinkUpNaija", "Aerovigil", "EcoFlux Energy"];

export default function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-ink text-white">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Left */}
          <div>
            <div className="text-lg font-bold text-white">
              Ugokanu Divine Gabriel
            </div>
            <div className="mt-1 text-sm text-white/50">divinegabriel.dev</div>
          </div>

          {/* Center — nav links */}
          <div className="md:justify-self-center">
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — ventures */}
          <div className="md:justify-self-end">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Ventures
            </div>
            <ul className="mt-3 space-y-2">
              {footerVentures.map((v) => (
                <li key={v} className="text-sm text-white/70">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#222222] pt-6 text-sm text-white/50">
          Built by Divine with Next.js and Claude · Abuja, Nigeria · 2026
        </div>
      </div>
    </footer>
  );
}
