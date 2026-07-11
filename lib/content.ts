import { cache } from "react";
import { defaultContent, SiteContent } from "./data";
import { getSupabaseAdmin, CONTENT_TABLE, CONTENT_ROW_ID } from "./supabase";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Deep-merge an overrides object on top of a base. Arrays and
 * primitives from `override` replace the base value entirely;
 * plain objects are merged key by key.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(override)) return base;
  if (!isObject(base)) return (override as T) ?? base;

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const baseValue = (base as Record<string, unknown>)[key];
    if (isObject(baseValue) && isObject(value)) {
      out[key] = deepMerge(baseValue, value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
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
