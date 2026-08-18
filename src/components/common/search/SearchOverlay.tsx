import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from '@/hooks/features/use-search';
import { cn } from '@/lib/utils';
import { ChevronRight, Loader2, SearchIcon, X } from 'lucide-react';
import React from 'react';
import SearchCard from './SearchCard';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter, results, isLoading, inputRef } =
    useSearch(isOpen);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const FILTERS = [
    { id: 'all', label: 'Tất cả', count: results?.meta?.total || 0 },
    { id: 'blog', label: 'Bài viết', count: results?.meta?.total || 0 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent
        className="fixed left-0 top-[64px] z-[98] flex h-auto max-h-[70vh] w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-y-auto rounded-none border-t border-gray-100 bg-white p-0 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2 sm:rounded-none lg:top-[80px] xl:min-h-[70vh]"
        onKeyDown={handleKeyDown}
        onMouseLeave={(e: React.MouseEvent) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (e.clientY >= rect.bottom - 10) {
            onClose();
          }
        }}
        overlayClassName="bg-black/10 backdrop-blur-[1px]"
        hideClose={true}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Tìm kiếm trên HocBa</DialogTitle>
        </DialogHeader>
        <div className="container mx-auto flex flex-1 flex-col px-4 xl:px-0">
          <div className="sticky top-0 z-50 -mx-4 bg-white px-4 pb-2 pt-4 md:pb-4 md:pt-6">
            <div className="flex items-center justify-between gap-4 pb-2 md:pb-4">
              <InputGroup className="relative h-10 border-none ring-transparent md:h-14">
                <SearchIcon className="size-7 text-gray-400" />
                <InputGroupInput
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="!placeholder:text-gray-300 !text-lg !font-medium !text-[#373737] !outline-none"
                  placeholder="Tìm kiếm trên hocba.edu.vn"
                />
                <div className="flex items-center gap-2 pr-2">
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="transition-colors hover:text-gray-600">
                      <X className="size-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </InputGroup>
            </div>

            <div className="h-[1px] w-full bg-gray-100" />

            {!isLoading && (
              <div className="flex items-center gap-4 py-2 md:py-4">
                <span className="text-sm font-normal tracking-wider text-gray-400">Lọc kết quả</span>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                        activeFilter === filter.id
                          ? 'bg-primary/5 border-primary text-primary'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100',
                      )}
                    >
                      {filter.label}
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[10px]',
                          activeFilter === filter.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500',
                        )}
                      >
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="my-auto flex h-full items-center justify-center py-10">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h2 className="text-sm font-normal tracking-wider text-gray-400">Bài viết</h2>
                    </div>
                    {isLoading ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="aspect-[16/9] w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                            <Skeleton className="h-4 w-1/2 rounded-lg" />
                          </div>
                        ))}
                      </div>
                    ) : results && results.list.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                          {results.list.map((blog) => (
                            <SearchCard
                              key={blog.id}
                              type="blog"
                              title={blog.title ?? ''}
                              views={blog.views ?? 0}
                              image={blog?.thumbnail_link?.file_path ?? ''}
                              href={
                                blog.slug && blog.BlogCategory?.slug ? `/${blog.BlogCategory?.slug}/${blog.slug}` : '#'
                              }
                            />
                          ))}
                        </div>
                        <a
                          href={`/tim-kiem?s=${encodeURIComponent(searchQuery)}`}
                          className="text-back group mt-2 flex items-center text-xs font-semibold text-gray-500 hover:text-primary"
                          onClick={() => onClose()}
                        >
                          Xem thêm {results.meta.total} kết quả{' '}
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </>
                    ) : searchQuery ? (
                      <div className="py-10 text-center text-gray-400">Không tìm thấy bài viết nào phù hợp</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchOverlay;
