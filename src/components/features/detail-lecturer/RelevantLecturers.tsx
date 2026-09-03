import { CarouselButton } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { IMAGES } from '@/lib/constants/images';
import { SearchX } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RelevantLecturersItem {
  id: number;
  name: string;
  subject: string;
  target: string;
  skill: string;
  experience: number;
  image: string;
  programs: string[];
  label?: string;
  slug?: string;
}

interface RelevantLecturersProps {
  relevantLecturers: TLecturer[] | null;
  icons?: {
    hsk?: string;
  };
}

const RelevantLecturers = ({ relevantLecturers, icons }: RelevantLecturersProps) => {
  const [api, setApi] = useState<any>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
    <div className="relative mt-4 w-full px-1 md:mt-6">
      <Carousel
        className="relative"
        setApi={setApi}
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent className="ml-9 mr-9 pb-16 pr-10 pt-4 md:ml-0 md:mr-0 md:pb-28 md:pt-12">
          {(relevantLecturers ?? []).map((lecturer, index) => (
            <CarouselItem key={index} className="basis-[229px] select-none first:pl-0 xl:basis-[360px]">
              <div className="px-0 xl:px-6">
                <div className="relative h-[324px] w-full rounded-lg border bg-white shadow-md md:h-auto xl:min-h-[324px]">
                  <div
                    key={lecturer.id}
                    className="group relative h-full rounded-md border-2 border-transparent bg-[#FFF8F8] px-2 py-4 transition-all duration-300 ease-in-out hover:border-[#D46000] hover:bg-white hover:shadow-[0_0_20px_rgba(212,96,0,0.35)] md:h-[475px] md:px-4 md:py-4"
                  >
                    <a
                      href={`/doi-ngu-giang-vien/${lecturer.slug || lecturer.id}`}
                      className="absolute -bottom-[4%] left-1/2 flex h-7 -translate-x-1/2 cursor-pointer items-center gap-1 rounded-full border-2 border-white bg-[#2751C7] px-2 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    >
                      <SearchX size={20} className="rotate-90" />
                      <p className="text-[8px] font-bold md:text-xs">Xem hồ sơ</p>
                    </a>
                    <div className="relative h-[156px] w-full rounded-md bg-[#2751C7] pt-3 transition-transform duration-300 ease-in-out group-hover:scale-105 md:h-[220px]">
                      <img
                        src={lecturer.optimizedAvatar}
                        width={280}
                        height={220}
                        alt={lecturer.name}
                        className="h-full w-full rounded-md object-contain object-top"
                      />
                      {lecturer.label && (
                        <div className="absolute left-2 top-3 flex h-8 w-10 flex-col items-center justify-center rounded-sm bg-gradient-to-b from-[#F3C650] to-[#B90E0A] text-white md:h-14 md:w-[74px]">
                          <p className="text-[6px] font-black uppercase md:text-[10px]">Giảng viên</p>
                          <p className="text-[10px] font-black uppercase md:text-base">{lecturer.label}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex flex-col gap-2 transition-all duration-300 ease-in-out group-hover:px-3 md:mt-6">
                      <h3 className="text-sm font-black uppercase leading-tight text-[#D46000] md:text-[22px]">
                        {lecturer.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="size-2 flex-shrink-0 rounded-full bg-black md:size-[10px]" />
                        <p className="line-clamp-3 text-[8px] font-bold text-black md:text-sm">{lecturer.title}</p>
                      </div>
                      <div className="grid grid-cols-3 border-t border-black pt-[10px]">
                        <div className="col-span-2 flex gap-2">
                          <img
                            src={IMAGES.lectuter.card1.src}
                            width={32}
                            height={32}
                            alt="card1"
                            className="size-[18px] object-cover md:size-8"
                          />
                          <p className="text-[7px] italic text-black md:text-xs">
                            {lecturer.tags.qualification.join(', ')}
                          </p>
                        </div>
                        <div className="col-span-1 ml-auto flex gap-2">
                          <img
                            src={IMAGES.lectuter.card2.src}
                            width={32}
                            height={32}
                            alt="card2"
                            className="size-[18px] object-cover md:size-8"
                          />
                          <p className="text-[7px] italic text-black md:text-xs">{lecturer.tags.scope.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="relative z-50 -mt-3 mb-6 xl:mb-4 xl:hidden">
          {/* 4 dấu chấm tương ứng với 4 slide */}
          <div className="flex justify-center gap-x-4">
            {(relevantLecturers ?? []).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 xl:h-[18px] xl:w-[18px] ${index === current ? 'bg-primary' : 'bg-[#D9D9D9]'}`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-[50%] z-10 hidden size-[30px] -translate-y-1/2 rounded-full bg-white p-0 hover:bg-gray-100 md:-left-20 md:top-1/2 md:flex md:size-10"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
        >
          <CarouselButton className="!size-[30px] md:!size-10" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-[50%] z-10 hidden size-[30px] -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 md:-right-20 md:top-1/2 md:flex md:size-10"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <CarouselButton className="!size-[30px] rotate-180 md:!size-10" />
        </Button>
      </Carousel>
    </div>
  );
};

export default RelevantLecturers;
