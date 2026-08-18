import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

type StudentSliderProps = {
  slides: SlideType[];
  icons: {
    star?: string;
    kinhlup?: string;
    btn_lotrinh?: string;
    bgImageCard?: string;
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
    <>
      {/* Desktop View */}
      <div className="relative mx-auto hidden w-full items-center justify-center py-10 lg:flex">
        <img src={icons.bgImageCard} alt="ellipse140" className="absolute -bottom-[100px] left-0 h-[440px] w-[600px]" />
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="mx-auto w-full max-w-7xl select-none"
        >
          <CarouselContent className="-ml-10">
            {slides.map((slide, index) => {
              const isCenter = index === current;

              return (
                <CarouselItem key={slide.id} className="basis-[500px] pl-10">
                  <div
                    className={`w-[500px] space-y-6 rounded-[20px] bg-gradient-to-r from-[#FFDE90] to-[#C1272D] px-10 py-10 shadow-lg transition-all duration-500 ${isCenter ? 'scale-100 opacity-100' : 'scale-90 opacity-50'} `}
                  >
                    <div className="relative flex h-[200px] w-full items-center overflow-hidden rounded-[10px] xl:h-[250px] 3xl:h-[280px]">
                      <img className="h-full w-full object-cover" src={slide.image} alt="Hình ảnh" />
                      <div className="absolute left-4 top-4 w-[70px] rounded-[10px] bg-gradient-to-r from-[#C0424A] to-[#AC022E] px-2 py-2 text-center">
                        <p className="font-sans text-[24px] font-bold leading-[22px] text-white">{slide.level}</p>
                      </div>
                    </div>
                    <div className="mx-auto w-fit rounded-[30px] bg-white px-6 py-2">
                      <p className="text-center text-3xl font-bold tracking-normal text-[#AF0000]">{slide.name}</p>
                    </div>
                    <div className="px-0">
                      <p className="h-[7lh] text-center text-base font-medium italic text-white">
                        "{slide.description}"
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <Button
            variant="outline"
            size="icon"
            className="absolute -left-[7%] top-1/2 z-50 flex h-[74px] w-[74px] min-w-[74px] -translate-y-1/2 rounded-full bg-[#ECF8FF] p-[5px] hover:bg-gray-100 3xl:h-20 3xl:w-20 3xl:min-w-20"
            disabled={!canScrollPrev}
            onClick={() => api?.scrollPrev()}
          >
            <div className="flex h-16 w-16 min-w-16 items-center justify-center rounded-full border-[2px] border-[#635AD9] 3xl:h-20 3xl:w-20 3xl:min-w-20">
              <img className="h-auto w-5" src={icons.btn_lotrinh} alt={'button'} />
            </div>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-[7%] top-1/2 z-50 flex h-[74px] w-[74px] min-w-[74px] -translate-y-1/2 rotate-180 rounded-full bg-[#ECF8FF] p-[5px] hover:bg-gray-100 3xl:h-20 3xl:w-20 3xl:min-w-20"
            disabled={!canScrollNext}
            onClick={() => api?.scrollNext()}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[2px] border-[#635AD9] 3xl:h-20 3xl:w-20">
              <img className="h-auto w-5" src={icons.btn_lotrinh} alt={'button'} />
            </div>
          </Button>
        </Carousel>
      </div>

      {/* Mobile View */}
      <div
        className="w-full bg-left-bottom bg-no-repeat py-6 sm:py-10 lg:hidden"
        style={{ backgroundImage: `url(${icons.bgImageCard})` }}
      >
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
        >
          <CarouselContent className="flex">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="flex-shrink-0 basis-[80%] first:ml-8 sm:ml-4 sm:first:ml-16">
                <div className="h-fit w-full space-y-4 rounded-[10px] bg-gradient-to-r from-[#FFDE90] to-[#C1272D] p-4 shadow-lg sm:space-y-6 sm:p-6">
                  <div className="relative flex h-fit w-full items-center overflow-hidden rounded-[8px]">
                    <img className="h-[150px] w-full object-cover sm:h-[270px]" src={slide.image} alt="Hình ảnh" />
                    <div className="absolute left-2 top-2 w-[40px] rounded-[6px] bg-gradient-to-r from-[#C0424A] to-[#AC022E] px-1 py-1 text-center sm:w-[60px]">
                      <p className="font-sans text-base leading-[16px] text-white sm:text-xl">{slide.level}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <div className="w-fit rounded-[30px] bg-white px-6 py-2">
                      <p className="xs:text-[20px] text-nowrap text-center text-[16px] font-bold leading-[100%] tracking-normal text-[#AF0000] sm:text-4xl">
                        {slide.name}
                      </p>
                    </div>
                  </div>
                  <div className="px-2">
                    <p className="h-[7lh] text-center text-[9px] font-medium italic leading-[10px] text-white sm:h-[5lh] sm:text-base">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
