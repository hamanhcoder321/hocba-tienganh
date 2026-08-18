import { buildSitemapXml, STATIC_PAGES } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const now = new Date().toISOString();
  const urls = STATIC_PAGES.map((u) => ({ ...u, lastmod: now }));
  return buildSitemapXml(urls);
};
