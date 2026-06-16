export const DEFAULT_BASE_PATH = "/cs-freshman-character-builder";

export function normalizeBasePath(value = process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH) {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export const SITE_BASE_PATH = normalizeBasePath();
