import { IMAGES } from '@/lib/constants/images';
import parser from 'html-react-parser';
import { Eye, Image } from 'lucide-react';

interface SearchCardProps {
  type: 'blog' | 'course' | 'book';
  variant?: 'grid' | 'list';
  image?: string;
  title: string;
  description?: string;
  href?: string;
  date?: string;
  author?: string;
  views?: number;
}

const SearchCard = ({
  type,
  variant = 'grid',
  image,
  title,
  description,
  href,
  date,
  author,
  views = 0,
}: SearchCardProps) => {
  if (type === 'blog' && variant === 'list') {
    return (
      <a
        href={href || '#'}
        className="group flex flex-col gap-2 overflow-hidden rounded-lg p-0 transition-all hover:bg-gray-50/50 sm:flex-row md:gap-8"
      >
        <div className="relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden rounded-lg sm:w-[320px] md:w-[340px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <img
              src={IMAGES.post.postBanner.src}
              alt={'postBanner'}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col py-2">
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-black group-hover:text-primary md:text-base">
            {title}
          </h3>
          {description && (
            <p className="mt-0 line-clamp-3 overflow-hidden text-sm leading-relaxed text-gray-500 md:mt-2 md:text-base md:font-normal">
              {parser(description)}
            </p>
          )}
          <div className="mt-auto flex items-center gap-1 pt-2 text-xs text-gray-500 md:pt-6 md:text-sm">
            {date && <span>{date}</span>}
            {date && author && <span>bởi</span>}
            {author && <span>{author}</span>}
          </div>
        </div>
      </a>
    );
  }

  if (type === 'blog') {
    return (
      <a href={href || '#'} className="group flex flex-col gap-2 overflow-hidden bg-white p-0 transition-all">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <img
              src={IMAGES.post.postBanner.src}
              alt={'postBanner'}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="group-hover:bg-primary-black-50/70 absolute left-0 top-0 z-40 m-2.5 flex h-7 items-center gap-1.5 rounded-full bg-black/50 px-3 text-white transition-all duration-300">
            <Eye className="size-3" />
            <span className="text-xs font-normal">{`${views} lượt đọc`}</span>
          </div>
        </div>
        <div className="flex flex-col px-1">
          <h3 className="text-back line-clamp-2 text-sm font-semibold leading-tight group-hover:text-primary">
            {title}
          </h3>
        </div>
      </a>
    );
  }

  // Course or default
  return (
    <a
      href={href || '#'}
      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 transition-all hover:bg-gray-50 hover:shadow-sm"
    >
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Image className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="line-clamp-1 text-sm font-bold text-[#373737] group-hover:text-primary">{title}</h3>
        {description && <p className="text-secondary-foreground/70 line-clamp-1 text-xs">{description}</p>}
      </div>
    </a>
  );
};

export default SearchCard;
