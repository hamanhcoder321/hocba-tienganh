import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

type ItemBlogProps = {
  blog?: TBlogs;
  className?: string;
  showViews?: boolean;
  isParent?: boolean;
  thumbnailSrc?: string;
};

const ItemBlog = ({ blog, className, showViews, isParent, thumbnailSrc }: ItemBlogProps) => {
  const categorySlug = blog?.BlogCategory?.slug;
  const blogSlug = blog?.slug || '';
  const blogUrl = `/${categorySlug}/${blogSlug}`;

  const thumbnailAlt =
    (blog as any)?.thumbnail_link?.originalname?.replace(/\.[^/.]+$/, '') || blog?.title || 'Blog thumbnail';
  const userPhoto = blog?.User?.photo;
  const userName =
    `${(blog as any)?.User?.first_name || ''} ${(blog as any)?.User?.last_name || ''}`.trim() || 'Anonymous';

  return (
    <div
      className={cn(
        'h-full rounded-xl border-2 border-gray-100 p-2 duration-500 hover:border-gray-900/20 xl:w-[308px]',
        className,
      )}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex-3 relative">
          <a href={blogUrl} className="block h-[160px]">
            <img
              src={thumbnailSrc}
              width={320}
              height={162}
              alt={thumbnailAlt}
              className="h-[162px] w-full rounded-xl object-cover xl:w-full"
              loading="lazy"
            />
          </a>
          {showViews && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[rgba(27,29,33,.7)] px-3 py-1 text-xs text-white">
              <Eye size={16} /> {`${blog?.views || 0} lượt đọc`}
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-1 flex-col justify-between">
          <a href={blogUrl} className="line-clamp-3 h-full text-base font-medium hover:text-primary">
            <p>{blog?.title}</p>
          </a>
          <div className="mt-4 flex items-center gap-2">
            <img
              src={userPhoto}
              width={20}
              height={20}
              alt={userName}
              className="h-6 w-6 rounded-full"
              loading="lazy"
            />
            <p className="text-sm text-zinc-600">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBlog;
