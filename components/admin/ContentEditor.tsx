"use client";

import { useState } from "react";
import { SiteContent, ventureOrder } from "@/lib/data";
import ImageUpload from "./ImageUpload";

const ventureNames: Record<string, string> = {
  linkupnaija: "LinkUpNaija",
  aerovigil: "Aerovigil",
  ecoflux: "EcoFlux Energy",
  badbot: "BadBot Trading",
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Status = "idle" | "saving" | "saved" | "error";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";
const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-purple";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        className={inputCls}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        className={`${inputCls} resize-y`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <h2 className="mb-4 text-base font-extrabold text-ink">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function ContentEditor({
  initial,
  canSave,
}: {
  initial: SiteContent;
  canSave: boolean;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Immutable update helper.
  function set(mutator: (draft: SiteContent) => void) {
    setContent((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: content }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Save failed.");
      setStatus("saved");
      setMessage("Saved — live within a minute.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Save failed.");
    }
  }

  return (
    <div className="space-y-6 pb-28">
      {/* Hero */}
      <Card title="Hero">
        <Area
          label="Subheading"
          rows={4}
          value={content.hero.subheading}
          onChange={(v) => set((d) => (d.hero.subheading = v))}
        />
      </Card>

      {/* About */}
      <Card title="About">
        {content.about.paragraphs.map((p, i) => (
          <Area
            key={i}
            label={`Paragraph ${i + 1}`}
            rows={3}
            value={p}
            onChange={(v) => set((d) => (d.about.paragraphs[i] = v))}
          />
        ))}
      </Card>

      {/* Stats */}
      <Card title="Stats">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <Field
                  label="Value"
                  value={s.value}
                  onChange={(v) => set((d) => (d.stats[i].value = v))}
                />
              </div>
              <div className="col-span-2">
                <Field
                  label="Label"
                  value={s.label}
                  onChange={(v) => set((d) => (d.stats[i].label = v))}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Ventures */}
      <Card title="Ventures">
        <div className="space-y-6">
          {ventureOrder.map((slug) => {
            const v = content.ventures[slug];
            return (
              <div key={slug} className="rounded-xl border border-line p-4">
                <div className="mb-3 text-sm font-bold text-ink">
                  {ventureNames[slug]}
                </div>
                <div className="space-y-3">
                  <Field
                    label="Status"
                    value={v.status}
                    onChange={(val) => set((d) => (d.ventures[slug].status = val))}
                  />
                  <Area
                    label="Card description"
                    rows={3}
                    value={v.description}
                    onChange={(val) =>
                      set((d) => (d.ventures[slug].description = val))
                    }
                  />
                  <Area
                    label="Detail page description"
                    rows={4}
                    value={v.longDescription}
                    onChange={(val) =>
                      set((d) => (d.ventures[slug].longDescription = val))
                    }
                  />
                  {v.link && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field
                        label="Link label"
                        value={v.link.label}
                        onChange={(val) =>
                          set((d) => {
                            if (d.ventures[slug].link)
                              d.ventures[slug].link!.label = val;
                          })
                        }
                      />
                      <Field
                        label="Link URL"
                        value={v.link.href}
                        onChange={(val) =>
                          set((d) => {
                            if (d.ventures[slug].link)
                              d.ventures[slug].link!.href = val;
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Journal */}
      <Card title="Journal">
        <Field
          label="Substack URL"
          value={content.journal.substackUrl}
          placeholder="https://yourname.substack.com"
          onChange={(v) => set((d) => (d.journal.substackUrl = v))}
        />
        <div className="space-y-6">
          {content.journal.posts.map((post, i) => (
            <div key={i} className="rounded-xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-ink">Post {i + 1}</span>
                <button
                  type="button"
                  onClick={() => set((d) => void d.journal.posts.splice(i, 1))}
                  className="text-xs text-muted transition-colors hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-3">
                <Field
                  label="Title"
                  value={post.title}
                  onChange={(v) => set((d) => (d.journal.posts[i].title = v))}
                />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field
                    label="Slug (URL)"
                    value={post.slug}
                    onChange={(v) => set((d) => (d.journal.posts[i].slug = slugify(v)))}
                  />
                  <Field
                    label="Tag"
                    value={post.tag}
                    onChange={(v) => set((d) => (d.journal.posts[i].tag = v))}
                  />
                  <Field
                    label="Date"
                    value={post.date}
                    onChange={(v) => set((d) => (d.journal.posts[i].date = v))}
                  />
                </div>
                <Area
                  label="Excerpt"
                  rows={2}
                  value={post.excerpt}
                  onChange={(v) => set((d) => (d.journal.posts[i].excerpt = v))}
                />
                <ImageUpload
                  value={post.coverImage}
                  onChange={(url) =>
                    set((d) => (d.journal.posts[i].coverImage = url || undefined))
                  }
                />
                <Area
                  label="Body — full post (blank = 'coming soon'). Separate paragraphs with a blank line."
                  rows={8}
                  value={post.body || ""}
                  onChange={(v) => set((d) => (d.journal.posts[i].body = v))}
                />
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={post.published !== false}
                    onChange={(e) =>
                      set((d) => (d.journal.posts[i].published = e.target.checked))
                    }
                  />
                  Published (visible on the site)
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set((d) =>
                void d.journal.posts.push({
                  slug: `new-post-${Date.now().toString(36)}`,
                  title: "New post",
                  excerpt: "",
                  date: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  }),
                  tag: "Building",
                  published: false,
                })
              )
            }
            className="rounded-lg border border-dashed border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-panel"
          >
            + Add post
          </button>
        </div>
      </Card>

      {/* Playlist */}
      <Card title="Playlist links">
        <Field
          label="Spotify URL"
          value={content.playlist.spotifyUrl}
          placeholder="https://open.spotify.com/playlist/…"
          onChange={(v) => set((d) => (d.playlist.spotifyUrl = v))}
        />
        <Field
          label="Apple Music URL"
          value={content.playlist.appleUrl}
          placeholder="https://music.apple.com/…"
          onChange={(v) => set((d) => (d.playlist.appleUrl = v))}
        />
      </Card>

      {/* Now */}
      <Card title="Now">
        {content.now.cards.map((c, i) => (
          <div key={i} className="space-y-2">
            <Field
              label={`Card ${i + 1} label`}
              value={c.label}
              onChange={(v) => set((d) => (d.now.cards[i].label = v))}
            />
            <Area
              label={`Card ${i + 1} body`}
              rows={3}
              value={c.body}
              onChange={(v) => set((d) => (d.now.cards[i].body = v))}
            />
          </div>
        ))}
      </Card>

      {/* Contact */}
      <Card title="Contact">
        <Field
          label="Email"
          value={content.contact.email}
          onChange={(v) => set((d) => (d.contact.email = v))}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="X handle"
            value={content.contact.x}
            onChange={(v) => set((d) => (d.contact.x = v))}
          />
          <Field
            label="X URL"
            value={content.contact.xUrl}
            onChange={(v) => set((d) => (d.contact.xUrl = v))}
          />
          <Field
            label="Instagram handle"
            value={content.contact.instagram}
            onChange={(v) => set((d) => (d.contact.instagram = v))}
          />
          <Field
            label="Instagram URL"
            value={content.contact.instagramUrl}
            onChange={(v) => set((d) => (d.contact.instagramUrl = v))}
          />
        </div>
      </Card>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <span
            className={`text-sm ${
              status === "error"
                ? "text-red-600"
                : status === "saved"
                  ? "text-green"
                  : "text-muted"
            }`}
          >
            {message ||
              (canSave
                ? "Edit any field, then save."
                : "Saving disabled until Supabase is configured.")}
          </span>
          <button
            type="button"
            onClick={save}
            disabled={!canSave || status === "saving"}
            className="rounded-lg bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
