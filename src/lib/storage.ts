/**
 * Safe localStorage helpers. Every read is wrapped in try/catch so a corrupt
 * value can never blank-screen the site (Rule 4).
 */

export const KEYS = {
  content: 'jds_content_v1',
  projects: 'jds_projects_v1',
  auth: 'jds_auth_v1',
} as const

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    if (parsed == null) return fallback
    return parsed as T
  } catch (err) {
    console.warn(`[storage] failed to read "${key}", using fallback`, err)
    return fallback
  }
}

export function writeJSON<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.error(`[storage] failed to write "${key}"`, err)
    return false
  }
}

export function removeKey(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

/** Merge persisted partial content over defaults so new fields never break old saves. */
export function deepMerge<T>(base: T, override: unknown): T {
  if (
    typeof base !== 'object' ||
    base === null ||
    Array.isArray(base) ||
    typeof override !== 'object' ||
    override === null ||
    Array.isArray(override)
  ) {
    return (override === undefined ? base : (override as T))
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(override as Record<string, unknown>)) {
    const b = (base as Record<string, unknown>)[key]
    const o = (override as Record<string, unknown>)[key]
    out[key] = deepMerge(b as never, o)
  }
  return out as T
}
