import { HOME_CATEGORIES, type CategoryItem } from '@/lib/constants/content';
import courseApi from '@/lib/api/course';
import { useCallback, useEffect, useState } from 'react';

export type CourseMenuItem = {
  title: string;
  href: string;
};

export type CourseMenuCategory = {
  title: string;
  link: string;
  subChildren: CourseMenuItem[];
};

export const useGetCourseMenu = () => {
  const [categories, setCategories] = useState<CourseMenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMenuData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await courseApi.getCourseList({ limit: 100, offset: 1 });
      const rawCourses = res?.data?.list || [];
      const courses = [...rawCourses].sort((a, b) => a.order - b.order);

      const groupedByCategory = courses.reduce(
        (acc, course) => {
          const categoryId = course.category_id;
          const homeCategory = HOME_CATEGORIES.find((cat: CategoryItem) => cat.id === categoryId);

          if (!homeCategory) return acc;

          if (!acc[categoryId]) {
            acc[categoryId] = {
              title: homeCategory.title,
              link: homeCategory.link,
              subChildren: [],
            };
          }

          acc[categoryId].subChildren.push({
            title: course.name,
            href: `${homeCategory.link}/${course.slug}`,
          });

          return acc;
        },
        {} as Record<number, CourseMenuCategory>,
      );

      const formattedCategories = HOME_CATEGORIES.filter((category: CategoryItem) => category.link !== '/khoa-hoc-tocfl').map(
        (category: CategoryItem) =>
          groupedByCategory[category.id] ?? {
            title: category.title,
            link: category.link,
            subChildren: [],
          },
      );
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching courses for header menu:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  return { categories, isLoading, refetch: fetchMenuData };
};
