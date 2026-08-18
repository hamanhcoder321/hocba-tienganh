import { buildSitemapXml, SITEMAP_INDEX_URLS } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const now = new Date().toISOString();
  const urls = SITEMAP_INDEX_URLS.map((u) => ({ ...u, lastmod: now }));
  return buildSitemapXml(urls);
};
