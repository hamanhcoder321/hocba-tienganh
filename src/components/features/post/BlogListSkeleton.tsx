const BlogCardSkeleton = () => (
  <div className="h-full rounded-xl border-2 border-gray-100 p-2 xl:w-[308px]">
    <div className="flex h-full w-full flex-col">
      <div className="h-[162px] w-full animate-pulse rounded-xl bg-gray-200" />
      <div className="mt-2 flex flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 flex items-center gap-2">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

const BlogListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(308px,1fr))] gap-4">
    {Array.from({ length: count }).map((_, idx) => (
      <BlogCardSkeleton key={idx} />
    ))}
  </div>
);

export default BlogListSkeleton;
