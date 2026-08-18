import LoaderButton from '@/components/common/LoaderButton';
import { useEffect, useState } from 'react';
import ItemBlog from './ItemBlog';

type BlogListWithLoadMoreProps = {
  initialBlogs: TBlogs[];
  categorySlug: string;
  orderBy?: string;
  totalPosts: number;
};

const BlogListWithLoadMore = ({ initialBlogs, categorySlug, orderBy = '', totalPosts }: BlogListWithLoadMoreProps) => {
  const [blogs, setBlogs] = useState<TBlogs[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = blogs.length < totalPosts;

  useEffect(() => {
    setBlogs(initialBlogs);
    setPage(1);
  }, [categorySlug, orderBy, initialBlogs]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.PUBLIC_API_URL || '';
      const nextPage = page + 1;
      let url = `${baseUrl}/public/blog-list?limit=24&offset=${nextPage}&categorySlug=${categorySlug}`;
      if (orderBy) url += `&orderBy=${orderBy}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data?.data?.list && data.data.list.length > 0) {
        setBlogs((prev) => [...prev, ...data.data.list]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load more blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-grow space-y-4">
      <h2 className="text-xl font-semibold">Tất cả bài viết</h2>

      {blogs.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(308px,1fr))] gap-4">
            {blogs.map((post) => (
              <ItemBlog key={post.id} blog={post} className="xl:w-full" thumbnailSrc={post.thumbnail_link?.file_path} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-4">
              <LoaderButton
                type="button"
                buttonText="Xem thêm"
                loaderText="Đang tải..."
                variant="outline"
                onClick={loadMore}
                isLoading={isLoading}
                classNames="min-w-[200px]"
              />
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center text-gray-500">
          <p>Không có bài viết</p>
        </div>
      )}
    </section>
  );
};

export default BlogListWithLoadMore;
