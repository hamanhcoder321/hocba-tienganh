import { Button } from '@/components/ui/button';
import { LECTURER_BASE_PATH } from '@/lib/constants/content';
import { IMAGES } from '@/lib/constants/images';
import { ArrowLeft, ArrowRight, SearchX } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface LecturerListProps {
  lecturers: TLecturer[];
}

const ITEMS_PER_PAGE = 12;

export default function LecturerList({ lecturers }: LecturerListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(lecturers.length / ITEMS_PER_PAGE);

  const currentLecturers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return lecturers.slice(startIndex, endIndex);
  }, [lecturers, currentPage]);

  const scrollToTop = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    scrollToTop();
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };
  if (lecturers.length === 0) {
    return (
      <div className="flex-1 md:mt-14 md:pb-14">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX size={64} className="mb-4 text-gray-300" />
          <h3 className="mb-2 text-xl font-bold text-gray-700 md:text-2xl">Không tìm thấy giảng viên phù hợp</h3>
          <p className="text-gray-500">Vui lòng thử lại với bộ lọc khác hoặc xóa bộ lọc</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={listRef} className="flex-1 md:mt-14 md:pb-14">
      <div className="grid grid-cols-2 gap-3 gap-y-5 md:gap-x-6 md:gap-y-24 xl:grid-cols-3">
        {currentLecturers.map((lecturer) => (
          <div
            key={lecturer.id}
            className="group relative h-auto rounded-[4px] border-2 border-transparent bg-navy-50 px-2 py-4 transition-all duration-300 ease-in-out hover:shadow-navyGlow md:h-[475px] md:px-4 md:py-6"
          >
            <a
              href={`${LECTURER_BASE_PATH}/${lecturer.slug}`}
              className="absolute -bottom-[4%] left-1/2 flex h-7 -translate-x-1/2 cursor-pointer items-center gap-1 rounded-full border-2 border-white bg-navy px-2 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            >
              <SearchX size={20} className="rotate-90" />
              <p className="text-[8px] font-bold md:text-xs">Xem hồ sơ</p>
            </a>
            <div className="relative h-[156px] w-full rounded-md bg-navy pt-3 transition-transform duration-300 ease-in-out group-hover:scale-105 md:h-[220px]">
              <img
                src={lecturer.avatar_url?.file_path}
                width={280}
                height={220}
                alt={lecturer.name}
                className="h-full w-full rounded-[3px] object-contain object-top"
              />
              {lecturer.label && (
                <div className="absolute left-2 top-3 flex h-8 w-10 flex-col items-center justify-center rounded-sm bg-gradient-to-b from-gold to-primary-700 text-white md:h-14 md:w-[74px]">
                  <p className="text-[6px] font-black uppercase md:text-[10px]">Giảng viên</p>
                  <p className="text-[10px] font-black uppercase md:text-base">{lecturer.label}</p>
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-2 transition-all duration-300 ease-in-out group-hover:px-3 md:mt-6">
              <h2 className="text-xs font-black uppercase leading-tight text-navy md:text-[22px]">
                {lecturer.name}
              </h2>
              <div className="flex items-start gap-2">
                <div className="mt-1 size-2 flex-shrink-0 rounded-full bg-ielts-gray md:size-[10px]" />
                <p className="line-clamp-3 min-h-[30px] text-[8px] font-bold leading-tight text-ielts-gray md:min-h-[53px] md:text-sm">
                  {lecturer.title}
                </p>
              </div>
              <div className="grid grid-cols-3 border-t border-ielts-gray-200 pt-[10px]">
                <div className="col-span-2 flex items-center gap-2">
                  <img
                    src={IMAGES.lectuter.card1.src}
                    width={32}
                    height={32}
                    alt="card1"
                    className="size-[18px] object-cover md:size-8"
                  />
                  <p className="text-[7px] italic text-ielts-gray md:text-xs">{lecturer.tags?.qualification.join(', ')}</p>
                </div>
                <div className="col-span-1 ml-auto flex items-center gap-2">
                  <img
                    src={IMAGES.lectuter.card2.src}
                    width={32}
                    height={32}
                    alt="card2"
                    className="size-[18px] object-cover md:size-8"
                  />
                  <p className="text-[7px] italic text-ielts-gray md:text-xs">{lecturer.tags?.scope.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {
        <div className="w-full">
          <div className="mb-4 mt-10 flex md:justify-end justify-center gap-2 md:mb-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-white p-0 font-bold text-ielts-gray transition-opacity ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
              }`}
            >
              <ArrowLeft />
            </button>
            <div className="flex gap-1">
              {getPageNumbers().map((page, index) =>
                typeof page === 'number' ? (
                  <Button
                    key={index}
                    variant={'ghost'}
                    onClick={() => handlePageClick(page)}
                    className={`size-7 text-base font-bold text-ielts-gray ${
                      currentPage === page ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {page}
                  </Button>
                ) : (
                  <span
                    key={index}
                    className="flex size-7 items-center justify-center text-base font-bold text-ielts-gray opacity-50"
                  >
                    {page}
                  </span>
                ),
              )}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-white p-0 font-bold text-ielts-gray transition-opacity ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
              }`}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      }
    </div>
  );
}
