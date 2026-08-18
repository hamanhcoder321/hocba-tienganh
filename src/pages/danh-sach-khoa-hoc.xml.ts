import { buildSitemapXml, getCourseSitemapUrls } from '@/lib/sitemap';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const urls = await getCourseSitemapUrls();
  return buildSitemapXml(urls);
};
