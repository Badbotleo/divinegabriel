"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { contactCards, subjects } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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

  const inputClass =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-purple";

  return (
    <Section id="contact" panel>
      <FadeIn>
        <SectionHeading
          title="Get in touch"
          subtitle="Whether you want to collaborate, invest in one of my ventures, or just say hello — I am always open."
        />
      </FadeIn>

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {contactCards.map((card, i) => (
          <FadeIn key={card.label} delay={i * 60}>
            <a
              href={card.href}
              target={card.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-muted/40"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                {card.label}
              </span>
              <span className="mt-2 break-words font-semibold text-ink">
                {card.value}
              </span>
            </a>
          </FadeIn>
        ))}
      </div>

      {/* Form */}
      <FadeIn delay={120}>
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-line bg-white p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a topic
              </option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me what's on your mind…"
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            {status === "success" && (
              <span className="text-sm font-medium text-green">
                Thanks — your message has been sent.
              </span>
            )}
            {status === "error" && (
              <span className="text-sm font-medium text-red-600">{error}</span>
            )}
          </div>
        </form>
      </FadeIn>
    </Section>
  );
}
