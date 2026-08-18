import { TriangularIcon } from '@/components/common/icons';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import parse from 'html-react-parser';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type ProprietarySolutionSlideType = {
  id: number;
  title: string;
  contents: string[];
  image: string;
};

type ProprietarySolutionSlideProps = {
  slides: ProprietarySolutionSlideType[];
  menu: {
    icon: string;
    title: string;
  }[];
};

export default function ProprietarySolutionSlide({ menu, slides }: ProprietarySolutionSlideProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToForm = () => {
    const formRegister = document.getElementById('form-register-roadmap');
    if (formRegister) {
      formRegister.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const container = menuContainerRef.current;
    const el = menuItemRefs.current[current];
    if (!container || !el) return;

    const containerLeft = container.getBoundingClientRect().left;
    const elLeft = el.getBoundingClientRect().left;
    const elCenter = elLeft - containerLeft + el.offsetWidth / 2;
    const scrollTarget = container.scrollLeft + elCenter - container.offsetWidth / 2;

    container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }, [current]);

  return (
    <div className="relative mx-auto my-2 mt-[26px] flex w-full flex-col items-center justify-center md:my-10">
      <div className="w-full px-3 xl:px-0">
        <div ref={menuContainerRef} className="chinese-scrollbar mx-auto mb-5 grid h-[108px] w-full auto-cols-[118px] grid-flow-col gap-x-2 [--bgScrollColor:#FFFFFF59] max-xl:overflow-x-auto xl:h-[180px] xl:w-fit xl:grid-cols-5">
          {menu.map((item, index) => {
            const isActive = index === current;
            return (
              <div
                key={index}
                ref={(el) => { menuItemRefs.current[index] = el; }}
                className={cn(
                  'group flex h-full w-[118px] items-end justify-center transition-all duration-500 xl:w-[234px]',
                  isActive ? 'pb-6' : 'pb-2 hover:pb-4 xl:pb-2 hover:xl:pb-4',
                )}
              >
                <button
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'col-span-1 flex flex-col items-center justify-center rounded-sm transition-all duration-500',
                    isActive
                      ? 'h-[75px] w-full border-[3px] border-white bg-gradient-to-l from-[#B90E0A] to-[#7D1900] shadow-[0px_11.17px_13.05px_0px_#F3C65080] xl:h-[148px] xl:shadow-[0px_22px_25.7px_0px_#F3C65080]'
                      : 'h-[75px] w-[97px] border-2 border-transparent bg-transparent group-hover:border-[#F3C650] group-hover:bg-white group-hover:shadow-[0px_11.17px_13.05px_0px_#F3C65080] xl:h-[146px] xl:w-[193px] group-hover:xl:shadow-[0px_22px_25.7px_0px_#F3C65080]',
                  )}
                >
                  <div className="flex size-[34px] items-center justify-center rounded-sm border border-white bg-[#740C0C] p-2 transition-transform duration-500 xl:size-[65px]">
                    <img
                      src={item.icon}
                      alt={item.icon}
                      className="h-full w-full object-contain"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div
                    className={cn(
                      'mt-1 text-center text-[10px] uppercase transition-all duration-500 xl:text-lg',
                      isActive ? 'font-black text-[#F3C650]' : 'font-bold text-white group-hover:text-[#740C0C]',
                    )}
                  >
                    <h3 className="text-nowrap leading-tight">{parse(item.title)}</h3>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="mx-auto w-full select-none [&>div]:overflow-visible [&>div]:overflow-x-hidden [&>div]:overflow-y-visible"
      >
        <CarouselContent className="ml-0">
          {(slides ?? []).map((slide, index) => {
            return (
              <CarouselItem key={slide.id} className="h-[580px] basis-full pl-0 md:h-[560px] xl:basis-[1380px]">
                <div className="mx-auto h-full w-full rounded-lg px-0 md:px-4 xl:rounded-sm xl:px-6">
                  <div
                    className={
                      'relative flex h-full w-full flex-col gap-x-3 rounded-sm bg-[white] px-4 pb-4 pt-[22px] xl:h-[520px] xl:flex-row xl:rounded-sm xl:px-[86px] xl:pb-[83px] xl:pt-[26px]'
                    }
                    style={{
                      boxShadow: '0px 4px 4px 0px #00000040',
                    }}
                  >
                    <div className="flex flex-1 flex-col gap-y-5 py-0 xl:gap-y-[30px] xl:py-[58px]">
                      <div className="flex items-center gap-x-[18px]">
                        <div className="h-[84px] w-2 flex-shrink-0 rounded-[10px] bg-primary" />
                        <div className="pr-3 text-[20px] font-black uppercase text-primary xl:pr-10 xl:text-[28px]">
                          {parse(slide.title)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2 xl:gap-y-[18px]">
                        {slide.contents.map((content, index) => (
                          <div key={index} className="flex items-center gap-x-[18px]">
                            <Check className="size-6 flex-shrink-0 text-primary" />
                            <p>{parse(content ?? '')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative mt-7 h-[213px] w-full xl:mt-0 xl:h-full xl:w-[691px]">
                      <div className="absolute bottom-0 left-0 z-0 h-[180px] w-full max-w-xl rounded-xl bg-gradient-to-b from-[#FFFFFF00] to-[#AF0000] xl:h-[347px] xl:w-[627px]" />
                      <img
                        src={slide.image}
                        alt={slide.image}
                        width={627}
                        height={347}
                        className="relative z-50 h-full w-full object-contain"
                      />
                      <button
                        onClick={() => handleScrollToForm()}
                        className="group absolute -bottom-16 left-1/2 ml-8 hidden h-[42px] w-auto -translate-x-1/2 items-center justify-center gap-x-4 overflow-hidden rounded-[61px] border-[3px] border-white px-4 text-[19px] font-extrabold uppercase text-white xl:flex"
                      >
                        <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#7D1900]"></span>
                        <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#F3C650] opacity-0 transition-opacity duration-700 group-hover:opacity-100"></span>
                        <span className="relative z-10 flex items-center gap-x-2">
                          <TriangularIcon className="size-4" />
                          Nhận tư vấn lộ trình
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="relative z-50 mb-6 mt-6 md:mb-4 xl:-mt-3">
          {/* 4 dấu chấm tương ứng với 4 slide */}
          <div className="flex justify-center gap-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 w-3 rounded-full border border-white transition-all duration-300 md:h-[18px] md:w-[18px] ${index === current ? 'bg-white' : 'bg-transparent'}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
