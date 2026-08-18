import { buildSitemapXml, getBlogPostSitemapUrls } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const urls = await getBlogPostSitemapUrls();
  return buildSitemapXml(urls);
};
