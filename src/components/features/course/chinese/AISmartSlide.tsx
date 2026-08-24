import { LalaIcon } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type AISmartSlideItem = {
  id: string;
  title: string;
  contents: string[];
  mainImage: any;
  subImages: {
    image: any;
    isMobile?: boolean;
    position: 'bottom-left' | 'bottom-right' | 'bottom-left-inner' | 'top-right-inner';
  }[];
};

type AISmartSlideProps = {
  slides: AISmartSlideItem[];
  icons: {
    star?: string;
    kinhlup?: string;
    btn_lotrinh?: string;
    bgImageCard?: string;
  };
};

export default function AISmartSlide({ icons, slides }: AISmartSlideProps) {
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
    <div className="relative mx-auto my-2 flex w-full items-center justify-center xl:my-10">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="mx-auto w-full select-none [&>div]:overflow-visible [&>div]:overflow-x-hidden [&>div]:overflow-y-visible"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            return (
              <CarouselItem key={slide.id} className="h-[660px] basis-full pl-0 xl:h-[635px] xl:basis-[1268px]">
                <div className="relative mx-auto w-full px-6 xl:w-[1060px] xl:px-0">
                  <div className="absolute bottom-4 left-9 z-50 flex h-[52px] w-[78px] items-center justify-center rounded-[24px] border-[3px] border-white bg-gradient-to-l from-[#B90E0A] to-[#7D1900] text-[22px] font-black text-white xl:relative xl:bottom-auto xl:left-auto xl:mx-0 xl:mb-3 xl:h-[60px] xl:w-[98px] xl:rounded-[37px] xl:text-[33px]">
                    {slide.id}
                  </div>
                  <div
                    className={
                      'relative flex h-auto w-full flex-col gap-x-[54px] rounded-sm bg-gradient-to-l from-[#B90E0A] to-[#7D1900] px-4 pb-9 xl:h-[480px] xl:flex-row xl:rounded-xl xl:pl-[42px]'
                    }
                    style={{
                      boxShadow: '1.73px 4.85px 8.66px 0px #FF6969',
                    }}
                  >
                    <LalaIcon className="text-[#AF0000] absolute -top-12 right-0 hidden h-auto w-[58px] rotate-45 -scale-x-100 xl:-top-16 xl:right-20 xl:flex xl:w-auto xl:rotate-0 xl:scale-x-100" />
                    <div className="mt-6 w-full xl:mt-[51px] xl:w-[444px]">
                      <div className="flex items-center gap-3">
                        <div className="flex size-[30px] flex-shrink-0 items-center justify-center rounded-full border border-white">
                          <div className="size-5 flex-shrink-0 rounded-full border border-white bg-gradient-to-l from-[#B90E0A] to-[#F3C650]" />
                        </div>
                        <h3 className="flex h-auto w-full items-center bg-transparent text-[15px] font-black uppercase text-white xl:h-[92px] xl:rounded-[84px] xl:text-[24px]">
                          {slide.title}
                        </h3>
                      </div>
                      <div className="mb-0 mt-4 flex flex-col gap-y-1 rounded-t-lg bg-white px-4 py-[30px] font-medium xl:mb-[34px] xl:mt-[30px] xl:gap-y-2 xl:rounded-lg xl:px-9">
                        {slide.contents.map((sub, index) => {
                          return (
                            <p key={index} className="pt-2 text-xs leading-tight xl:text-[17px]">
                              {sub}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex-1 pt-0 xl:pt-[22px]">
                      <div className="relative h-[244px] w-full rounded-b-lg xl:h-[428px] xl:w-full xl:rounded-xl">
                        <img
                          src={slide.mainImage}
                          width={460}
                          height={428}
                          className="h-full w-full overflow-hidden rounded-b-lg object-cover object-left-top xl:rounded-xl"
                        />
                        {/* sub images positions */}
                        {slide.subImages.map((subImage, index) => {
                          const positionClasses = {
                            'bottom-left': 'absolute -bottom-[64px] -left-[30px] w-[245px] h-[148px] object-cover',
                            'bottom-right':
                              'absolute bottom-20 xl:bottom-0 -right-[10px] xl:-right-[76px] w-[146px] xl:w-[211px] h-11 xl:h-[87px] object-cover object-center',
                            'bottom-left-inner':
                              'absolute -bottom-[10px] xl:bottom-[105px] -right-[6px] xl:-right-[78px] w-[142px] xl:w-[213px] h-20 xl:h-[114px] object-cover',
                            'top-right-inner':
                              'absolute -top-4 xl:top-4 right-[40%] xl:-right-[76px] w-[158px] xl:w-[211px] h-[82px] xl:h-[170px]',
                          };

                          return (
                            <img
                              key={index}
                              src={subImage.image}
                              width={266}
                              height={12}
                              className={cn(
                                'rounded-sm object-cover object-left-top xl:rounded-xl',
                                positionClasses[subImage.position],
                                subImage.isMobile ? 'flex' : 'hidden xl:flex',
                              )}
                              style={{
                                boxShadow: '6px 4px 25px 0px #AF000040',
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="relative z-50 -mt-3 mb-6 xl:mb-4">
          {/* 4 dấu chấm tương ứng với 4 slide */}
          <div className="flex justify-center gap-x-4">
            {slides.map((_, index) => (
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
          className="absolute left-0 top-1/2 z-50 hidden h-[42px] w-[42px] min-w-[42px] -translate-y-1/2 rounded-full border-none bg-[#FFEFEF] text-lg shadow-[0px_0px_5.31px_0px_#00000026] hover:bg-primary hover:text-white hover:shadow-[0px_7.74px_17.79px_0px_#FF6969] xl:flex"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft className="!size-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 z-50 hidden h-[42px] w-[42px] min-w-[42px] -translate-y-1/2 rounded-full border-none bg-[#FFEFEF] shadow-[0px_0px_5.31px_0px_#00000026] hover:bg-primary hover:text-white hover:shadow-[0px_7.74px_17.79px_0px_#FF6969] xl:flex"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight className="!size-5" />
        </Button>
      </Carousel>
    </div>
  );
}
