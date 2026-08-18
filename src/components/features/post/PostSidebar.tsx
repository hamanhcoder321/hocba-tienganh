import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { HOC_VIEN_DIEM_CAO_SLUG } from '@/lib/constants/content';
import { cn } from '@/lib/utils';
import { useState } from 'react';

enum CheckboxState {
  NEW_BLOG = 'new-blog-category',
  POPULAR_BLOG = 'popular-blog-category',
}

type PostSidebarProps = {
  categories: TCategoryBlog[];
  currentSlug?: string;
  initialOrderBy?: string;
};

const PostSidebar = ({ categories, currentSlug, initialOrderBy = '' }: PostSidebarProps) => {
  const [selected, setSelected] = useState<string>(
    initialOrderBy === 'views' ? CheckboxState.POPULAR_BLOG : CheckboxState.NEW_BLOG,
  );

  const handleCheckboxChange = (value: string) => {
    if (selected === value) return;

    setSelected(value);

    const currentPath = window.location.pathname;
    if (value === CheckboxState.NEW_BLOG) {
      window.location.href = currentPath;
    } else if (value === CheckboxState.POPULAR_BLOG) {
      window.location.href = `${currentPath}?orderBy=views`;
    }
  };

  return (
    <div className="flex flex-col-reverse pb-0 md:block md:flex-col md:pb-4">
      {currentSlug && (
        <div className="">
          <p className="text-sm font-medium uppercase">SẮP XẾP THEO</p>
          <div className="mt-4 flex flex-col gap-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={CheckboxState.NEW_BLOG}
                checked={selected === CheckboxState.NEW_BLOG}
                onCheckedChange={() => handleCheckboxChange(CheckboxState.NEW_BLOG)}
              />
              <label
                htmlFor={CheckboxState.NEW_BLOG}
                className="w-full cursor-pointer select-none text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bài viết mới nhất
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={CheckboxState.POPULAR_BLOG}
                checked={selected === CheckboxState.POPULAR_BLOG}
                onCheckedChange={() => handleCheckboxChange(CheckboxState.POPULAR_BLOG)}
              />
              <label
                htmlFor={CheckboxState.POPULAR_BLOG}
                className="w-full cursor-pointer select-none text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phổ biến nhất
              </label>
            </div>
          </div>
          <Separator className="my-4 h-[.8px]" />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden w-[300px] md:block">
        <p className="text-sm font-medium uppercase">Chủ đề bài viết</p>
        <div className="mt-2 flex flex-col">
          {categories &&
            categories.map((item) => (
              <a
                key={item.id}
                href={item.slug === HOC_VIEN_DIEM_CAO_SLUG ? `/${HOC_VIEN_DIEM_CAO_SLUG}/chi-tiet` : `/${item.slug}`}
                className={cn(
                  'flex h-11 items-center px-2 font-medium text-black transition-colors hover:text-primary',
                  {
                    'font-medium text-primary': item.slug === currentSlug,
                  },
                )}
              >
                {item.name}
              </a>
            ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="py-2 md:hidden">
        <Carousel className="relative">
          <CarouselContent>
            {categories &&
              categories.map((item) => (
                <CarouselItem key={item.id} className="mr-2 inline-flex basis-auto pl-0 first:ml-4 last:mr-4 md:pl-4">
                  <a
                    href={item.slug === HOC_VIEN_DIEM_CAO_SLUG ? `/${HOC_VIEN_DIEM_CAO_SLUG}/chi-tiet` : `/${item.slug}`}
                    className={cn(
                      'rounded-xl border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary',
                      {
                        'bg-primary/5 border-primary font-medium text-primary': item.slug === currentSlug,
                      },
                    )}
                  >
                    {item.name}
                  </a>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 disabled:opacity-0" />
          <CarouselNext className="absolute right-0 disabled:opacity-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default PostSidebar;
