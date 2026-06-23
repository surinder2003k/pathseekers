export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  // Vercel deployment env
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Client-side fallback
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://pathseekersschoolbeas.vercel.app";
};
