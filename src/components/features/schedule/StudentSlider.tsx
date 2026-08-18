'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

type StudentSliderProps = {
  slides: SlideType[];
  icons: {
    star?: string;
    kinhlup?: string;
    btn_lotrinh?: string;
  };
};

export default function StudentSlider({ icons, slides }: StudentSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
        loop: true,
      }}
      className="mx-auto w-full max-w-6xl select-none 3xl:max-w-[90rem]"
    >
      <CarouselContent className="-ml-6 xl:-ml-10">
        {slides.map((slide, index) => {
          const isCenter = index === current;

          return (
            <CarouselItem
              key={slide.id}
              className="basis-[226px] pl-6 sm:basis-[300px] xl:basis-[390px] xl:pl-10 3xl:basis-[490px]"
            >
              <div
                className={`flex h-[214px] w-[226px] flex-col justify-between space-y-6 rounded-[15px] bg-white shadow-lg transition-all duration-500 sm:h-[320px] sm:w-[300px] xl:h-[370px] xl:w-[390px] 3xl:h-[440px] 3xl:w-[490px] ${isCenter ? 'scale-100 opacity-100' : 'scale-[80%] opacity-50'} `}
              >
                <div className="h-auto w-full px-4 py-2 sm:px-10">
                  <div className="flex h-fit flex-grow-0 items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          className="h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] xl:h-[24px] xl:w-[24px] 3xl:h-[32px] 3xl:w-[32px]"
                          width={20}
                          height={20}
                          src={icons.star}
                          alt={'star'}
                        />
                      ))}
                    </div>
                    <div className="sm:translate-x-5">
                      <img
                        className="aspect-square w-[36px] sm:w-[48px] xl:w-[60px] 3xl:w-[76px]"
                        width={48}
                        height={48}
                        src={icons.kinhlup}
                        alt={'kinhlup'}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="line-clamp-5 text-[6.15px] font-medium italic leading-[13.6px] tracking-normal text-[#504E4E] sm:text-[12.66px] sm:leading-[28px]">
                      {slide.description}
                    </p>
                  </div>
                </div>
                <div className="relative flex h-[70px] w-full items-center rounded-bl-[14px] rounded-br-[15px] bg-gradient-to-b from-[#FFCEA8] to-[#AF0000] sm:h-[90px] 3xl:h-[120px]">
                  <div className="px-10">
                    <p className="text-[20.41px] font-extrabold leading-[100%] tracking-normal text-white sm:text-3xl xl:text-[32px] 3xl:text-[42px]">
                      {slide.name}
                    </p>
                    <p className="mt-4 text-[10.69px] font-medium italic leading-[100%] tracking-normal text-[#FFCCCC] sm:text-xs xl:text-sm 3xl:text-[22px]">
                      {slide.level}
                    </p>
                  </div>
                  <div className="absolute right-4 top-0 aspect-square w-[70px] -translate-y-[40%] overflow-hidden rounded-full border-[3px] border-white xl:w-[100px] 3xl:w-[155px]">
                    <img
                      className="h-auto min-h-full w-full object-cover"
                      width={70}
                      height={70}
                      src={slide.image}
                      alt="Hình ảnh"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-[5%] top-[50%] z-50 flex h-[74px] w-[74px] min-w-[74px] -translate-y-1/2 rounded-full bg-[#ECF8FF] p-[5px] hover:bg-gray-100 md:left-[15%] md:top-1/2 3xl:h-20 3xl:w-20 3xl:min-w-20"
        disabled={!canScrollPrev}
        onClick={() => api?.scrollPrev()}
      >
        <div className="flex h-16 w-16 min-w-16 flex-shrink-0 items-center justify-center rounded-full border-[2px] border-[#635AD9] 3xl:h-20 3xl:w-20 3xl:min-w-20">
          <img className="h-auto w-5" src={icons.btn_lotrinh} alt={'button'} />
        </div>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-[5%] top-[50%] z-50 flex h-[74px] w-[74px] min-w-[74px] -translate-y-1/2 rotate-180 rounded-full bg-[#ECF8FF] p-[5px] hover:bg-gray-100 md:right-[12%] md:top-1/2 3xl:h-20 3xl:w-20 3xl:min-w-20"
        disabled={!canScrollNext}
        onClick={() => api?.scrollNext()}
      >
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-[2px] border-[#635AD9] 3xl:h-20 3xl:w-20">
          <img className="h-auto w-5" src={icons.btn_lotrinh} alt={'button'} />
        </div>
      </Button>
      {/* <Button
        variant="outline"
        size="icon"
        className="absolute left-[5%] md:left-[15%] top-[50%] md:top-1/2 -translate-y-1/2 size-[30px] md:size-10 rounded-full bg-white hover:bg-gray-100 z-10 p-0"
        disabled={!canScrollPrev}
        onClick={() => api?.scrollPrev()}
      >
        <img
          className="h-auto w-3 lg:w-5"
          width={20}
          height={20}
          src={icons.btn_lotrinh}
          alt={"button"}
        />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-[5%] md:right-[12%] top-[50%] md:top-1/2 -translate-y-1/2 size-[30px] md:size-10 rounded-full bg-white hover:bg-gray-100 z-10 rotate-180"
        disabled={!canScrollNext}
        onClick={() => api?.scrollNext()}
      >
        <img
          className="h-auto w-3 lg:w-5"
          width={20}
          height={20}
          src={icons.btn_lotrinh}
          alt={"button"}
        />
      </Button> */}
    </Carousel>
  );
}
