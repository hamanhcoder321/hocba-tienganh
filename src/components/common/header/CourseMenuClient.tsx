import { useGetCourseMenu, type CourseMenuCategory } from '@/hooks/features/use-course';

export function CourseMenuDesktop() {
  const { categories } = useGetCourseMenu();

  if (!categories.length) return null;

  const saveCategory = (title: string) => {
    localStorage.setItem('selectedCategory', title);
  };

  return (
    <>
      {categories.map((category) => (
        <div role="none" className="flex flex-col gap-3" key={category.title}>
          <a
            role="menuitem"
            href={category.link}
            className="category-link border-b border-gray-300 pb-2 text-sm font-bold uppercase transition-colors hover:text-[#AF0000] hover:underline"
            onClick={() => saveCategory(category.title)}
          >
            {`Khóa học ${category.title}`}
          </a>
          {category.subChildren && category.subChildren.length > 0 && (
            <ul role="none" className="flex flex-col gap-2">
              {category.subChildren.map((course) => (
                <li role="none" key={course.href}>
                  <a
                    href={course.href}
                    className="text-sm text-gray-700 transition-colors hover:text-[#AF0000] hover:underline"
                    role="menuitem"
                    onClick={() => saveCategory(category.title)}
                  >
                    {course.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

export function CourseMenuMobile() {
  const { categories } = useGetCourseMenu();

  if (!categories.length) return null;

  const saveCategory = (title: string) => {
    localStorage.setItem('selectedCategory', title);
  };

  return (
    <>
      {categories.map((category) => (
        <div className="space-y-1" key={category.title}>
          <a
            role="menuitem"
            href={category.link}
            className="category-link pb-2 text-xs font-bold uppercase transition-colors hover:text-[#AF0000] hover:underline"
            onClick={() => saveCategory(category.title)}
          >
            {`Khóa học ${category.title}`}
          </a>
          {category.subChildren &&
            category.subChildren.map((course) => (
              <a
                key={course.href}
                href={course.href}
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#AF0000]"
                onClick={() => saveCategory(category.title)}
              >
                {course.title}
              </a>
            ))}
        </div>
      ))}
    </>
  );
}
