export const getBaseUrl = () => {
  // 1. Explicitly set canonical URL — always wins
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  // 2. Vercel production — use VERCEL_PROJECT_PRODUCTION_URL (stable, not per-deployment)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  // 3. Client-side fallback
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // 4. Hardcoded canonical fallback
  return "https://pathseekers.vercel.app";
};
