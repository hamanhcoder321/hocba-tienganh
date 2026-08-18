import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ScheduleAISmartSlideItem = {
  id: string;
  title: string;
  mainImage: any;
};

type ScheduleAISmartSlideProps = {
  slides: ScheduleAISmartSlideItem[];
};

export default function ScheduleAISmartSlide({ slides }: ScheduleAISmartSlideProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative mx-auto mb-6 flex w-full flex-col items-center justify-center xl:my-10">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          containScroll: 'trimSnaps',
          breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
          },
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className="mx-auto w-full"
      >
        <CarouselContent className="-ml-8 py-5 md:-ml-2 xl:-ml-1">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="basis-full pl-8 md:basis-[49.8%] md:pl-2 xl:basis-1/2 xl:pl-4">
              <div className="group mx-auto flex flex-col rounded-[6px] bg-[#FFF3F3] p-6 shadow-[3px_6px_9.6px_rgba(151,151,151,0.31)] transition-all duration-300 md:h-[320px] md:w-full lg:h-[380px] lg:p-8 xl:h-[454px] xl:w-[577px] xl:p-10 xl:pl-[55px]">
                <div className="mb-4 flex flex-col xl:mb-6">
                  <div className="mb-2 flex items-start gap-3 md:items-center xl:mb-3 xl:gap-4">
                    <div className="flex h-[18px] shrink-0 items-center md:h-auto">
                      <div className="mt-[4px] size-4 flex-shrink-0 rounded-full bg-[#AF0000] md:mt-0 md:size-5 lg:size-[22px] xl:size-[26px]" />
                    </div>
                    <h3 className="min-h-[36px] font-gilroy text-[15px] font-bold leading-[1.2] text-[#000000] md:min-h-[44px] md:text-lg md:leading-[1.1] lg:min-h-[48px] lg:text-[20px] xl:min-h-[58px] xl:w-[300px] xl:text-[24px]">
                      {slide.title}
                    </h3>
                  </div>
                  <div className="h-[4px] w-full rounded-full bg-[#AF0000] md:w-[80%] xl:h-[7px]" />
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg xl:rounded-2xl">
                  <img src={slide.mainImage} alt={slide.title} className="h-full w-full object-contain" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute top-[55%] z-50 hidden -translate-y-1/2 md:-left-6 md:block lg:-left-10 xl:-left-10">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'size-[32px] rounded-full border-none bg-[#FFEFEF] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:size-[38px] xl:size-[42px]',
              !canScrollPrev && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft className="size-4 xl:size-5" />
          </Button>
        </div>
        <div className="absolute top-[55%] z-50 hidden -translate-y-1/2 md:-right-6 md:block lg:-right-10 xl:-right-12">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'size-[32px] rounded-full border-none bg-[#FFEFEF] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:size-[38px] xl:size-[42px]',
              !canScrollNext && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight className="size-4 xl:size-5" />
          </Button>
        </div>
      </Carousel>

      {/* Pagination Indicators */}
      <div className="mt-8 flex items-center justify-center gap-2 md:gap-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              'h-[10px] w-[10px] rounded-full transition-all duration-300 md:h-3',
              current === index ? 'bg-[#AF0000] md:w-16' : 'bg-gray-300 hover:bg-gray-400 md:w-8',
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
