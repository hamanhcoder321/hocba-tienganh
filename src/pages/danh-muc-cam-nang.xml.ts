import { buildSitemapXml, getBlogCategorySitemapUrls } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const urls = await getBlogCategorySitemapUrls();
  return buildSitemapXml(urls);
};
