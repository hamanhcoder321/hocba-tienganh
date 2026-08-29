import { LalaIcon, LalalaIcon } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type SmartTechnologyClassItem = {
  id: string;
  title: string;
  content: string;
  subContent: string[];
  mainImage: any;
  subImages: {
    image: any;
    isMobile?: boolean;
    position: 'bottom-left' | 'bottom-right' | 'bottom-left-inner' | 'top-right-inner' | 'bottom-center-wide' | 'bottom-center' | 'middle-right';
  }[];
};

type SmartTechnologyClassProps = {
  slides: SmartTechnologyClassItem[];
  icons: {
    star?: string;
    kinhlup?: string;
    btn_lotrinh?: string;
    bgImageCard?: string;
  };
};

export default function SmartTechnologyClass({ icons, slides }: SmartTechnologyClassProps) {
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
    <div className="relative mx-auto my-2 flex w-full items-center justify-center md:my-10">
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
        className="mx-auto w-full max-w-7xl select-none [&>div]:overflow-visible [&>div]:overflow-x-hidden [&>div]:overflow-y-visible"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            return (
              <CarouselItem key={slide.id} className="h-[660px] basis-full pl-0 md:h-[635px] lg:basis-[1178px]">
                <div className="mx-auto w-full px-6 lg:w-[932px] lg:px-0">
                  <div className="relative z-50 mx-auto -mb-5 flex h-10 w-16 items-center justify-center rounded-[37px] border-[3px] border-white bg-gradient-to-l from-[#083AD4] to-[#052284] text-[22px] font-black text-white md:mx-0 md:mb-3 md:h-[60px] md:w-[98px] md:text-[33px]">
                    {slide.id}
                  </div>
                  <div
                    className={
                      'relative flex h-auto w-full flex-col gap-x-4 rounded-sm bg-gradient-to-l from-[#083AD4] to-[#052284] px-4 pb-9 pt-[30px] lg:h-[480px] lg:flex-row lg:rounded-xl lg:p-6'
                    }
                    style={{
                      boxShadow: '1.73px 4.85px 8.66px 0px #083AD440',
                    }}
                  >
                    <LalaIcon className="text-[#F97316] absolute -top-12 right-0 hidden h-auto w-[58px] rotate-45 -scale-x-100 md:-top-16 md:right-20 md:flex md:w-auto md:rotate-0 md:scale-x-100" />
                    <LalalaIcon className="text-[#F97316] absolute -bottom-20 left-[68px] hidden md:flex" />
                    <div className="w-full lg:w-[413px]">
                      <h3 className="flex h-auto w-full items-center rounded-[24px] bg-white px-4 text-center text-[15px] font-black uppercase text-[#D16112] lg:h-[92px] lg:rounded-[84px] lg:px-8 lg:text-[20px]">
                        {slide.title}
                      </h3>
                      <div className="mb-[34px] flex flex-col gap-y-1 px-0 pt-4 font-normal text-white md:px-[34px] lg:mb-0 lg:gap-y-2 lg:pt-[30px]">
                        <p className="text-xs md:text-sm lg:text-base">{slide.content}</p>
                        {slide.subContent.map((sub, index) => {
                          return (
                            <p key={index} className="pt-2 text-xs md:text-sm lg:text-base">
                              {sub}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative h-[244px] w-full rounded-xl lg:h-[428px] lg:w-[460px]">
                        <img
                          src={slide.mainImage}
                          width={460}
                          height={428}
                          className="h-full w-full overflow-hidden rounded-xl object-cover object-left-top"
                        />
                        {/* sub images positions */}
                        {slide.subImages.map((subImage, index) => {
                          const positionClasses = {
                            'bottom-left': 'absolute -bottom-[10px] md:-bottom-[60px] -left-[10px] md:-left-[20px] lg:-left-[50px] w-[125px] md:w-[220px] lg:w-[266px] h-auto',
                            'bottom-right':
                              'absolute -bottom-[10px] md:bottom-10 lg:bottom-0 -right-[10px] md:-right-[20px] lg:-right-[76px] w-[95px] md:w-[156px] lg:w-[200px] h-auto',
                            'bottom-left-inner':
                              'absolute bottom-[10px] md:bottom-[60px] lg:bottom-[105px] -right-[10px] md:-right-[20px] lg:-right-[104px] w-[105px] md:w-[160px] lg:w-[184px] h-auto',
                            'top-right-inner':
                              'absolute top-[10px] md:top-4 lg:top-4 -right-[10px] md:right-[5%] lg:-right-[104px] w-[105px] md:w-[160px] lg:w-[184px] h-auto lg:h-[172px]',
                            'bottom-center-wide':
                              'absolute -bottom-[10px] md:-bottom-[30px] lg:-bottom-[40px] left-1/2 -translate-x-1/2 w-[250px] lg:w-[420px] h-auto',
                            'bottom-center':
                              'absolute -bottom-[10px] md:-bottom-[30px] lg:-bottom-[40px] left-1/2 -translate-x-1/2 w-[135px] md:w-[200px] lg:w-[240px] h-auto',
                            'middle-right':
                              'absolute top-[60%] -translate-y-1/2 -right-[10px] md:-right-[20px] lg:-right-[76px] w-[95px] md:w-[156px] h-auto',
                          };

                          return (
                            <img
                              key={index}
                              src={subImage.image}
                              width={266}
                              height={200}
                              className={cn(
                                'rounded-sm object-contain md:rounded-xl',
                                positionClasses[subImage.position],
                                subImage.isMobile ? 'flex' : 'hidden md:flex',
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

        <div className="relative z-50 -mt-3 mb-6 md:mb-4">
          {/* 4 dấu chấm tương ứng với 4 slide */}
          <div className="flex justify-center gap-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 md:h-[18px] md:w-[18px] ${index === current ? 'bg-primary' : 'bg-[#D9D9D9]'}`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 z-50 hidden h-[42px] w-[42px] min-w-[42px] -translate-y-1/2 rounded-full border-none bg-[#FFEFEF] text-lg shadow-[0px_0px_5.31px_0px_#00000026] hover:bg-[#052284] hover:text-white hover:shadow-[0px_7.74px_17.79px_0px_rgba(5,34,132,0.5)] md:flex"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft className="!size-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 z-50 hidden h-[42px] w-[42px] min-w-[42px] -translate-y-1/2 rounded-full border-none bg-[#FFEFEF] shadow-[0px_0px_5.31px_0px_#00000026] hover:bg-[#052284] hover:text-white hover:shadow-[0px_7.74px_17.79px_0px_rgba(5,34,132,0.5)] md:flex"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight className="!size-5" />
        </Button>
      </Carousel>
    </div>
  );
}
