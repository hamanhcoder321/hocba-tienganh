import ItemBlog from '@/components/features/post/ItemBlog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';

type PopularBlogsCarouselProps = {
  initialBlogs: TBlogs[];
  categoryId?: number;
  title: string;
};

const PopularBlogsCarousel = ({ initialBlogs, categoryId, title }: PopularBlogsCarouselProps) => {
  const [post, setPost] = useState<TBlogs[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPost(initialBlogs);
    setPage(1);
    setHasMore(true);
  }, [categoryId, initialBlogs]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.PUBLIC_API_URL || '';
      const nextPage = page + 1;
      let url = `${baseUrl}/public/blog-list?limit=10&offset=${nextPage}&orderBy=views`;
      if (categoryId) url += `&blog_category_id=${categoryId}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data?.data?.list && data.data.list.length > 0) {
        setPost((prev) => [...prev, ...data.data.list]);
        setPage(nextPage);
        setHasMore(data.data.list.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more blogs:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: '100px' },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, page]);

  if (post.length === 0) return null;

  return (
    <section className="group mb-9">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold">{title}</div>
      </div>
      <div className="mt-2 flex w-full">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 space-x-3">
            {post.map((post) => (
              <CarouselItem key={post.id} className="h-auto w-[308px] basis-auto pl-1">
                <ItemBlog blog={post} showViews isParent={false} thumbnailSrc={post.thumbnail_link?.file_path} />
              </CarouselItem>
            ))}
            {hasMore && (
              <CarouselItem className="h-auto w-[308px] basis-auto pl-1">
                <div
                  ref={observerRef}
                  className="flex h-[280px] items-center justify-center rounded-xl border-2 border-gray-100"
                >
                  {isLoading && <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>}
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-3 [&[disabled]]:hidden" />
          <CarouselNext className="right-3 [&[disabled]]:hidden" />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularBlogsCarousel;
