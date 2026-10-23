/**
 * Site configuration helper for canonical SEO, sitemaps, and OpenGraph.
 * Resolves NEXT_PUBLIC_SITE_URL when explicitly set, or dynamically inspects
 * Vercel deployment variables (VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL).
 * If neither is present, falls back safely to localhost or relative paths without
 * hardcoding an unconfirmed or fabricated production domain.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}
