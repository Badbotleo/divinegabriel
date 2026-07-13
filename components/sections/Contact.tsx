"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SiteContent, subjects } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({
  contact,
  qr,
}: {
  contact: SiteContent["contact"];
  qr: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const contactCards = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "X / Twitter", value: contact.x, href: contact.xUrl },
    { label: "Instagram", value: contact.instagram, href: contact.instagramUrl },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full rounded-lg border border-edge bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-text-lo/60 focus:border-violet";

  return (
    <Section id="contact" panel>
      <FadeIn>
        <SectionHeading
          kicker="07 — Contact"
          title="Get in touch"
          subtitle="Collaborate, invest, or just say hello. Always open."
        />
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-3">
        {contactCards.map((card, i) => (
          <FadeIn key={card.label} delay={i * 60}>
            <a
              href={card.href}
              target={card.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-white/20"
            >
              <span className="mono-label text-[10px] font-bold text-text-lo">{card.label}</span>
              <span className="mt-2 break-words font-semibold text-white">{card.value}</span>
            </a>
          </FadeIn>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <FadeIn delay={120} className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/85">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/85">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={field} />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-white/85">Subject</label>
              <select id="subject" name="subject" required defaultValue="" className={field}>
                <option value="" disabled className="bg-panel2">Select a topic</option>
                {subjects.map((s) => (
                  <option key={s} value={s} className="bg-panel2">{s}</option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/85">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="Tell me what's on your mind…" className={`${field} resize-y`} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-lg bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
              {status === "success" && <span className="text-sm font-medium text-cyan">Thanks — your message has been sent.</span>}
              {status === "error" && <span className="text-sm font-medium text-red-400">{error}</span>}
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="glass flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
            <span className="mono-label text-[10px] font-bold text-text-lo">Scan to save my contact</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qr}
              alt="QR code to save Divine's contact details"
              width={160}
              height={160}
              className="mt-4 h-40 w-40 rounded-lg border border-edge bg-white p-1"
            />
            <p className="mt-4 text-sm text-text-lo">Point your camera to add me to your contacts.</p>
            <Link href="/card" className="mt-4 text-sm font-semibold text-cyan transition-opacity hover:opacity-70">
              Open my contact card →
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
