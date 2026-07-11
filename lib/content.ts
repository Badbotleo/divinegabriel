import { cache } from "react";
import { defaultContent, SiteContent } from "./data";
import { getSupabaseAdmin, CONTENT_TABLE, CONTENT_ROW_ID } from "./supabase";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Shape-preserving deep-merge of `override` on top of `base`.
 *
 * The override may never change the fundamental *type* of a node
 * (array ↔ object ↔ primitive). This keeps a stale override from an
 * older content schema from ever breaking the site — mismatched
 * nodes simply keep the default. Arrays replace wholesale; plain
 * objects merge key by key.
 */
function deepMerge<T>(base: T, override: unknown): T {
  // Arrays: only accept an array override, else keep the default.
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }
  // Objects: only merge an object override, else keep the default.
  if (isObject(base)) {
    if (!isObject(override)) return base;
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override)) {
      if (value === undefined) continue;
      if (!(key in out)) continue; // ignore unknown/legacy keys
      out[key] = deepMerge(out[key], value);
    }
    return out as T;
  }
  // Primitives: take the override when present.
  return (override === undefined || override === null ? base : (override as T));
}

/**
 * Site content = hardcoded defaults with any dashboard overrides
 * (stored as JSON in Supabase) merged on top. Cached per request.
 * Falls back to defaults if Supabase is unconfigured or errors.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultContent;

  try {
    const { data, error } = await supabase
      .from(CONTENT_TABLE)
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();

    if (error || !data?.data) return defaultContent;
    return deepMerge(defaultContent, data.data);
  } catch {
    return defaultContent;
  }
});

export { deepMerge };
