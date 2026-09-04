import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchStudents } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DoubleChevronRight } from '@/components/common/icons';

interface StudentShowcaseDialogProps {
  icons: {
    hsk: string;
    machine: string;
    defaultAvatar: string;
  };
}

/*
const StudentCardOld = ({
  item,
  icons,
  isPageCourse,
}: {
  item: TStudent;
  icons: StudentShowcaseDialogProps['icons'];
  isPageCourse: boolean;
}) => (
  <div className="group relative mx-auto h-full w-[344px] overflow-hidden rounded-lg border bg-white shadow-md transition-all duration-300 hover:bg-[#B90E0A]">
    <div className="h-full select-none md:flex md:flex-col md:items-center md:justify-between">
      <div className="absolute left-3 top-3 h-auto w-fit rounded-md border border-white bg-gradient-to-l from-[#B90E0A] to-[#7D1900] px-4 py-2">
        <img
          src={icons.machine}
          width={40}
          height={25}
          alt={'machine'}
          className={'absolute -left-3 -top-[10%] z-10 h-auto w-[34px] object-cover md:-left-3 md:-top-[10%] md:w-10'}
        />
        <p className="text-[22px] font-black uppercase text-[#F3C650] md:text-[28px]">{item.course}</p>
        {!isPageCourse && <p className="text-sm font-black text-white md:text-base">{`${item.score ?? 0} điểm`}</p>}
      </div>
      <div className="flex-1 px-5 pt-6 md:px-8 md:pt-9">
        <div className="h-[294px] w-full md:h-[297px] md:w-[282px]">
          <img src={item.avatar_url || icons.defaultAvatar} alt={item.name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div
        className={cn(
          'relative flex w-full flex-col gap-2 bg-primary px-4 py-5',
          isPageCourse ? 'h-[278px]' : 'h-full',
        )}
      >
        <div className="absolute -top-4 right-4 h-[40px] w-[60px] rotate-12 rounded-sm border border-[#FF4040]">
          <img
            src={icons.hsk}
            alt={icons.hsk}
            width={60}
            height={40}
            className="h-full w-full object-cover"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        <h3 className="text-center text-[22px] font-black uppercase text-[#F3C650] md:text-2xl">{item.name}</h3>
        {!isPageCourse && <p className="text-center text-xs font-bold text-white md:text-base">{item.title}</p>}
        {isPageCourse && <p className="text-center font-bold text-white md:text-[20px]">{item.profession}</p>}
        {isPageCourse && (
          <div className="custom-scrollbar overflow-y-auto">
            <p className="pr-1 text-justify text-sm font-medium italic text-white">{item.description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
*/

const StudentCard = ({ item }: { item: TStudent }) => {
  const avatarUrl = item.avatar_url || '';
  return (
    <div className="w-full max-w-[344px] aspect-[344/458] relative flex items-center justify-center bg-[#D9D9D9]/50 rounded-[16px] border border-gray-200 shadow-inner overflow-hidden shrink-0 group hover:shadow-2xl transition-all duration-300 mx-auto">
      {item.certificate_url ? (
        <img 
          src={item.certificate_url} 
          alt={`Chứng chỉ của ${item.name}`} 
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
          <span className="font-gilroy text-lg font-bold uppercase tracking-wider text-gray-400">Chưa có dữ liệu</span>
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black/60 backdrop-blur-md rounded-[50px] p-2 flex items-center shadow-xl group-hover:bg-black/80 transition-colors duration-300">
        <div className="shrink-0 rounded-full w-[45px] h-[45px] overflow-hidden border-2 border-white/20 bg-gray-200 relative">
          {avatarUrl && <img src={avatarUrl} alt={item.name} className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 px-3 flex flex-col justify-center">
          <h3 className="text-white font-gilroy font-bold uppercase text-[13px] leading-tight line-clamp-1">{item.name}</h3>
          <p className="text-[#FFCF5A] font-gilroy text-[11px] font-semibold mt-0.5">Lis: 8.0, Read: 8.5</p>
        </div>
        <div className="pr-3 shrink-0 flex items-center justify-end border-l border-white/20 pl-3 py-1">
          <span className="text-white font-gilroy font-black text-[18px]">
            {item.score ? `${item.score} ${item.course}` : item.course || 'IELTS'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const StudentShowcaseDialog = ({ icons }: StudentShowcaseDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [listStudents, setListStudents] = useState<TStudent[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [targetScrollIndex, setTargetScrollIndex] = useState<number | null>(null);

  const fetchInitialStudents = async () => {
    setLoading(true);
    try {
      const response = await fetchStudents({ page: 1, limit: 10 });
      if (response && response.list) {
        setListStudents(response.list);
        setHasMore(response.list.length >= 10);
      }
    } catch (error) {
      console.error('Failed to fetch initial students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen && listStudents.length === 0) {
      fetchInitialStudents();
    }
  }, [isDialogOpen]);

  /*
  useEffect(() => {
    const handleOpenDialog = (e: any) => {
      setIsDialogOpen(true);
      if (e.detail && e.detail.index !== undefined) {
        setTargetScrollIndex(parseInt(e.detail.index, 10));
      }
    };
    window.addEventListener('openStudentDialog', handleOpenDialog);
    return () => window.removeEventListener('openStudentDialog', handleOpenDialog);
  }, []);
  */

  /*
  useEffect(() => {
    if (isDialogOpen && listStudents.length > 0 && targetScrollIndex !== null) {
      setTimeout(() => {
        const el = document.getElementById(`student-dialog-card-${targetScrollIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTargetScrollIndex(null);
        }
      }, 150);
    }
  }, [isDialogOpen, listStudents, targetScrollIndex]);
  */

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetchStudents({ page: nextPage, limit: 10 });

      if (response && response.list && response.list.length > 0) {
        setListStudents((prev) => [...prev, ...response.list]);
        setPage(nextPage);

        if (response.list.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="group relative flex h-[28px] w-[120px] items-center justify-center gap-[6px] rounded-[55px] border-[0.5px] border-[#052284] bg-[#FAFAFA] text-[#052284] transition-all duration-300 hover:bg-[#052284] hover:text-white md:h-[38px] md:w-[181px]"
      >
        <span className="font-gilroy text-[14px] font-bold leading-[64px] leading-none md:text-[16px]">Xem tất cả</span>
        <div className="flex items-center justify-center md:absolute md:right-[12px] md:top-1/2 md:-translate-y-1/2">
          <DoubleChevronRight
            className="h-[9.21px] w-[9.87px] text-[#052284] transition-all duration-300 group-hover:text-white md:h-[14px] md:w-[15px]"
            aria-hidden="true"
          />
        </div>
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          hideClose
          className="mx-auto mt-14 w-[512px] max-w-[90vw] rounded-3xl bg-[#FFF8F8] px-4 pt-6 shadow-lg md:w-[564px] md:px-12 lg:w-[884px] xl:w-[1296px] 3xl:pt-12"
        >
          <Button
            variant="outline"
            size="icon"
            className="absolute -top-8 right-0 z-50 flex size-[30px] -translate-y-1/2 rounded-full bg-neutral-100 p-0 hover:bg-gray-100 md:size-10 xl:-top-8 3xl:-top-10"
            onClick={() => setIsDialogOpen(false)}
          >
            <X className="!size-4 md:!size-6" strokeWidth={2.3} />
          </Button>
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-2xl font-bold text-primary md:mb-4 md:text-3xl 3xl:text-[40px]">
              Danh sách các học viên
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar grid h-full max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto overscroll-contain touch-pan-y px-1 pb-4 md:gap-8 lg:grid-cols-2 xl:max-h-[60vh] xl:grid-cols-3 3xl:max-h-[620px]">
            {listStudents.map((item, index) => (
              <div key={index} id={`student-dialog-card-${index}`} className="flex justify-center">
                <StudentCard item={item} />
              </div>
            ))}
            {hasMore && (
              <Button
                className="col-span-1 mx-auto mb-4 h-14 w-full max-w-[251px] rounded-[32px] bg-primary text-lg font-bold text-white lg:col-span-2 xl:col-span-3"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Đang tải...' : 'Xem thêm'}
              </Button>
            )}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[57px] rounded-b-3xl bg-[linear-gradient(0deg,#EBF5FF_11.3%,rgba(235,245,255,0.00)_73.63%)]"></div>
        </DialogContent>
      </Dialog>
    </>
  );
};
