import React, { useEffect, useState } from 'react';
import { fetchBlogCategoryList } from '@/lib/static-data';
import { EXCLUDED_FROM_CAM_NANG } from '@/lib/constants/content';

type BlogCategory = {
  name: string;
  slug?: string | null;
};

type MenuItem = {
  title: string;
  href: string;
};

async function loadCategories(): Promise<MenuItem[]> {
  try {
    const categoryLists = (await fetchBlogCategoryList()) || [];

    if (!Array.isArray(categoryLists)) return [];

    return categoryLists
      .filter((category: BlogCategory) => !EXCLUDED_FROM_CAM_NANG.includes(category.slug || ''))
      .map((category: BlogCategory) => ({
        title: category.name,
        href: category.slug || '',
      }));
  } catch (error) {
    console.error('Error fetching blog categories for header menu (client):', error);
    return [];
  }
}

export const BlogCategoryMenuDesktop: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    void loadCategories().then(setItems);
  }, []);

  if (!items.length) return null;

  return (
    <div
      className="invisible absolute left-1/2 top-[90%] z-50 -translate-x-1/2 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      role="menu"
      aria-label="Menu Cẩm nang"
    >
      <ul className="flex h-fit w-fit flex-col gap-4 rounded-b-xl bg-[#F3F3F3] py-5 shadow-xl">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={`/${item.href}`}
              className="text-nowrap px-10 text-sm font-medium uppercase text-gray-900 hover:text-primary hover:underline"
              role="menuitem"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const BlogCategoryMenuMobile: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    void loadCategories().then(setItems);
  }, []);

  if (!items.length) return null;

  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={`/${item.href}`}
          className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#AF0000]"
        >
          {item.title}
        </a>
      ))}
    </>
  );
};
