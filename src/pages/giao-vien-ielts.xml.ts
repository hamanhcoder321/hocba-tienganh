import { buildSitemapXml, getLecturerSitemapUrls } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const urls = await getLecturerSitemapUrls();
  return buildSitemapXml(urls);
};
