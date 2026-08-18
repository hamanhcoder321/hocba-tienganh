import { CommaIcon, StarColorWhite } from '@/components/common/icons';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

export type ReviewStudentChineseItem = {
  id: number;
  name: string;
  title: string;
  content: string;
  videoId: string;
};

type ReviewStudentChineseProps = {
  slides: ReviewStudentChineseItem[];
  icons: {
    star?: string;
  };
};

export default function ReviewStudentChinese({ icons, slides }: ReviewStudentChineseProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
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
              <CarouselItem key={slide.id} className="h-auto basis-full pl-0 xl:h-[420px] pt-4">
                <div className="relative mx-auto flex flex-col xl:flex-row w-full gap-x-5 px-2 xl:px-1">
                  <div className="flex w-full xl:w-[554px] flex-shrink-0 flex-col">
                    <div className="relative rounded-xl border border-white bg-gradient-to-l from-[#67000000] to-[#A71010] py-11 xl:py-[78px] pl-5 xl:pl-7 pr-8 xl:pr-[46px] shadow-[0.68px_2.73px_2.73px_0px_#00000040;]">
                      <div
                        className="absolute -top-4 left-7 flex h-[30px] w-8 items-center justify-center rounded-[54px] bg-gradient-to-r from-[#7D1900] to-[#B90E0A] md:-top-4 border border-white md:left-12 md:size-14"
                      >
                        <CommaIcon className="md:scale-150" />
                      </div>
                      <p className="text-base xl:text-2xl font-extrabold italic text-white">
                        {slide.content}
                      </p>
                      <div className="mt-7 flex xl:hidden gap-y-1 flex-col items-end">
                        <div className="text-lg xl:text-[28px] font-black text-white">{slide.name}</div>
                        <p className="text-xs xl:text-lg font-medium text-white">{slide.title}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarColorWhite key={i} toColor="#F3C650" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-7 hidden xl:flex flex-col items-end">
                      <div className="text-[28px] font-black text-white">{slide.name}</div>
                      <p className="text-lg font-medium text-white">{slide.title}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarColorWhite key={i} toColor="#F3C650" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="xl:flex-1 h-[248px] xl:h-auto mt-3 xl:mt-0 rounded-sm bg-white">
                    <iframe
                      src={`https://www.youtube.com/embed/${slide.videoId}`}
                      title={'YouTube video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full rounded-sm"
                    ></iframe>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="relative z-50 mb-6 mt-6 xl:mb-4">
          {/* 4 dấu chấm tương ứng với 4 slide */}
          <div className="flex justify-center gap-x-2 xl:gap-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-[10px] w-3 rounded-full transition-all duration-300 xl:h-[10px] ${index === current ? 'bg-white w-[48px] xl:w-[62px]' : 'border border-white bg-transparent w-6 xl:w-[30px]'}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
