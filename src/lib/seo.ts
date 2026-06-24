// CANONICAL PRODUCTION URL — used for SEO, sitemap, canonical links
const CANONICAL_URL = "https://pathseekers.vercel.app";

export const getBaseUrl = () => {
  // 1. Explicitly set canonical URL — always wins (set in Vercel env vars)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  // 2. On server: always use the hardcoded canonical production URL
  //    NOTE: Do NOT use VERCEL_PROJECT_PRODUCTION_URL here — it can resolve
  //    to preview/branch deployment URLs and break Google sitemap validation.
  if (typeof window === "undefined") {
    return CANONICAL_URL;
  }
  // 3. Client-side: use the actual origin (correct in all environments)
  return window.location.origin;
};

