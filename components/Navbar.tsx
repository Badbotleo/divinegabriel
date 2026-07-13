"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "ventures", label: "Ventures" },
  { id: "timeline", label: "Timeline" },
  { id: "journal", label: "Journal" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto mt-3 flex h-14 max-w-container items-center justify-between rounded-2xl px-4 transition-all duration-300 md:px-5 ${
          scrolled ? "glass" : "border border-transparent"
        }`}
        style={{ marginLeft: "max(0.75rem, calc(50% - 560px))", marginRight: "max(0.75rem, calc(50% - 560px))" }}
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-violet" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet to-cyan" />
          </span>
          Divine
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative py-1 text-sm transition-colors ${
                  active === l.id ? "text-white" : "text-text-lo hover:text-white"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-violet to-cyan transition-opacity ${
                    active === l.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-lg bg-gradient-to-r from-violet to-cyan px-4 py-2 text-sm font-semibold text-void shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="glass mx-3 mt-2 rounded-2xl px-4 py-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-edge py-3 text-base ${
                    active === l.id ? "text-cyan" : "text-white/90"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-gradient-to-r from-violet to-cyan px-4 py-2.5 text-center text-sm font-semibold text-void"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
