"use client";

import { useRef, useState } from "react";

export default function ImageUpload({
  value,
  onChange,
}: {
  value?: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Upload failed.");
      onChange(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
        Cover image
      </span>
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="cover"
            className="h-16 w-24 flex-none rounded-lg border border-line object-cover"
          />
        ) : (
          <div className="flex h-16 w-24 flex-none items-center justify-center rounded-lg border border-dashed border-line text-[11px] text-muted">
            No image
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-panel disabled:opacity-50"
          >
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg px-2 py-1.5 text-sm text-muted hover:text-red-600"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
