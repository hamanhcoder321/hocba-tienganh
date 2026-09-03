import { CarouselButton } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchStudents } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OutstandingStudentProps {
  outstandingStudent: TStudent[];
  isPageCourse?: boolean;
  icons: {
    hsk: string;
    machine: string;
    defaultAvatar: string;
  };
}

const StudentCard = ({
  item,
  icons,
  isPageCourse,
}: {
  item: TStudent;
  icons: OutstandingStudentProps['icons'];
  isPageCourse: boolean;
}) => (
  <div className="group relative mx-auto h-full w-[344px] overflow-hidden rounded-lg border bg-white shadow-md transition-all duration-300 hover:bg-[#E6F0FF]">
    <div className="h-full select-none md:flex md:flex-col md:items-center md:justify-between">
      <div className="absolute left-3 top-3 z-20 h-auto w-fit rounded-md border border-white bg-gradient-to-l from-[#3464F8] to-[#083AD4] px-4 py-2">
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
        <div className="h-[294px] w-full overflow-hidden md:h-[297px] md:w-[282px]">
          <img src={item.avatar_url || icons.defaultAvatar} alt={item.name} className="h-full w-full object-cover transition-transform duration-300" />
        </div>
      </div>
      <div
        className={cn(
          'relative flex w-full flex-col gap-2 bg-[#083AD4] transition-colors duration-300 group-hover:bg-[#3464F8] px-4 py-5 h-full'
        )}
      >

        <h3 className="text-center text-[22px] font-black uppercase text-[#F3C650] md:text-2xl">{item.name}</h3>
        {!isPageCourse && <p className="text-center text-xs font-bold text-white md:text-base">{item.title}</p>}
        {isPageCourse && <p className="text-center font-bold text-white md:text-[20px]">{item.profession}</p>}
        {isPageCourse && (
          <div className="pb-2">
            <p className="text-justify text-sm font-medium italic text-white">{item.description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const OutstandingStudent = ({ outstandingStudent, icons, isPageCourse = false }: OutstandingStudentProps) => {
  const [api, setApi] = useState<any>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [listStudents, setListStudents] = useState<TStudent[]>(outstandingStudent);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(outstandingStudent.length >= 9);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetchStudents({ page: nextPage, limit: 9 });

      if (response && response.list && response.list.length > 0) {
        setListStudents((prev) => [...prev, ...response.list]);
        setPage(nextPage);

        if (response.list.length < 9) {
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

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative mt-4 w-full pl-0 md:mt-6">
      <Carousel
        className="relative"
        setApi={setApi}
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {outstandingStudent.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn('basis-full md:basis-1/3 md:h-auto')}
            >
              <StudentCard item={item} icons={icons} isPageCourse={isPageCourse} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-[50%] z-10 hidden size-[30px] -translate-y-1/2 rounded-full bg-white p-0 hover:bg-gray-100 md:left-0 xl:-left-12 md:top-1/2 md:flex md:size-10"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
        >
          <CarouselButton className="!size-[30px] md:!size-10" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-[50%] z-10 hidden size-[30px] -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 md:right-0 xl:-right-12 md:top-1/2 md:flex md:size-10"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <CarouselButton className="!size-[30px] rotate-180 md:!size-10" />
        </Button>
      </Carousel>
      {/* <div className="flex items-center justify-center pt-5">
        <Button
          className="col-span-1 mx-auto mb-4 h-14 w-[251px] rounded-[32px] bg-[#083AD4] text-lg font-bold text-white lg:col-span-2 3xl:col-span-3"
          onClick={() => setIsDialogOpen(true)}
        >
          Xem thêm
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          hideClose
          className="mx-auto mt-14 w-[512px] max-w-[calc(100%-2rem)] rounded-3xl bg-[#FFF8F8] px-4 pt-6 shadow-lg md:w-[564px] md:px-12 lg:w-[884px] xl:w-[1296px] 3xl:pt-12"
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
          <div className="custom-scrollbar grid h-full max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto px-1 pb-4 md:gap-8 lg:grid-cols-2 xl:max-h-[60vh] xl:grid-cols-3 3xl:max-h-[620px]">
            {listStudents.map((item, index) => (
              <div key={index} className="flex justify-center">
                <StudentCard item={item} icons={icons} isPageCourse={isPageCourse} />
              </div>
            ))}
            {hasMore && (
               <Button
                className="col-span-1 mx-auto mb-4 h-14 w-[251px] rounded-[32px] bg-[#083AD4] text-lg font-bold text-white lg:col-span-2 xl:col-span-3"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Đang tải...' : 'Xem thêm'}
              </Button>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[57px] rounded-b-3xl bg-[linear-gradient(0deg,#EBF5FF_11.3%,rgba(235,245,255,0.00)_73.63%)]"></div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default OutstandingStudent;
