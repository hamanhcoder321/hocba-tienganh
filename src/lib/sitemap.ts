import { HOME_CATEGORIES } from '@/lib/constants/content';
import { fetchBlogCategoryList, fetchBlogList, fetchCourseList } from '@/lib/static-data';

const BASE_URL = 'https://hoc-ba.edu.vn';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
};

// ─── XML Builder ─────────────────────────────────────────────────────────────

export function buildSitemapXml(urls: SitemapUrl[]): Response {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls.map(
      ({ loc, lastmod, changefreq, priority }) => `
        <url>
          <loc>${loc}</loc>
          ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>`,
    ),
    '</urlset>',
  ]
    .join('\n')
    .trim();

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

// ─── Static pages (prerendered) ───────────────────────────────────────────────
// Cập nhật thủ công khi thêm/xóa trang prerender mới

export const STATIC_PAGES: SitemapUrl[] = [
  { loc: `${BASE_URL}/cam-ket-dau-ra`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/chinh-sach-ban-quyen`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/chinh-sach-bao-mat`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/chuyen-gia/jackson-howard`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/dieu-khoan-su-dung`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/lien-he`, priority: '0.6', changefreq: 'monthly' },
];

// ─── Sitemap index entries ────────────────────────────────────────────────────

export const SITEMAP_INDEX_URLS: SitemapUrl[] = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${BASE_URL}/trang-tinh.xml`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/danh-muc-cam-nang.xml`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE_URL}/danh-sach-khoa-hoc.xml`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE_URL}/cam-nang.xml`, priority: '1.0', changefreq: 'daily' },
];

// ─── Data fetchers ────────────────────────────────────────────────────────────

export async function getCourseSitemapUrls(): Promise<SitemapUrl[]> {
  const now = new Date().toISOString();
  let courses: any[] = [];

  try {
    const data = await fetchCourseList({ limit: 1000 });
    courses = data?.list || [];
  } catch (error) {
    console.error('Sitemap: Failed to fetch courses', error);
  }

  const urls: SitemapUrl[] = [];

  HOME_CATEGORIES.forEach((cat) => {
    urls.push({ loc: `${BASE_URL}${cat.link}`, lastmod: now, changefreq: 'daily', priority: '1.0' });

    courses
      .filter((course: any) => course.category_id === cat.id)
      .forEach((course: any) => {
        urls.push({
          loc: `${BASE_URL}${cat.link}/${course.slug}`,
          lastmod: course.updated_at || course.created_at || now,
          changefreq: 'daily',
          priority: '1.0',
        });
      });
  });

  return urls;
}

export async function getBlogCategorySitemapUrls(): Promise<SitemapUrl[]> {
  const now = new Date().toISOString();
  let categories: any[] = [];

  try {
    categories = (await fetchBlogCategoryList()) || [];
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog categories', error);
  }

  return categories.map((cat: any) => ({
    loc: `${BASE_URL}/${cat.slug}`,
    lastmod: cat.updated_at || cat.created_at || now,
    changefreq: 'monthly',
    priority: '0.6',
  }));
}

function slugify(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getBlogPostSitemapUrls(): Promise<SitemapUrl[]> {
  const now = new Date().toISOString();
  let posts: any[] = [];
  let categories: any[] = [];

  try {
    const [blogData, categoryData] = await Promise.all([
      fetchBlogList({ limit: 1000 }),
      fetchBlogCategoryList(),
    ]);
    posts = blogData?.list || [];
    categories = categoryData || [];
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog posts', error);
  }

  const categoryMap = new Map<number, string>();
  categories.forEach((cat: any) => categoryMap.set(cat.id, cat.slug));

  return posts.map((post: any) => {
    let categorySlug =
      post.BlogCategory?.slug ||
      (post.BlogCategory?.name ? slugify(post.BlogCategory.name) : '') ||
      categoryMap.get(post.blogCategoryId) ||
      categoryMap.get(post.blog_category_id) ||
      'cam-nang';

    return {
      loc: `${BASE_URL}/${categorySlug}/${post.slug}`,
      lastmod: post.updated_at || post.created_at || now,
      changefreq: 'daily',
      priority: '1.0',
    };
  });
}
