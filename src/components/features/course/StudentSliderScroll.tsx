import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

type StudentSliderProps = {
  slides: SlideType[];
  icons: {
    bgImageCard: string;
  };
};

export default function StudentSliderScroll({ slides, icons }: StudentSliderProps) {
  return (
    <>
      <div className="relative hidden w-full px-10 lg:block xl:px-20 3xl:px-[200px]">
        <Carousel className="!bg-none">
          <CarouselContent className="flex select-none gap-x-3 !bg-none py-5 xl:gap-x-4">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="basis-[32.5%] !bg-none">
                <div className="w-full space-y-6 rounded-[20px] bg-gradient-to-r from-[#FFDE90] to-[#C1272D] p-5 shadow-sm xl:p-10">
                  <div className="relative flex h-[200px] w-full items-center overflow-hidden rounded-[10px] xl:h-[250px] 3xl:h-[280px]">
                    <img className="h-full w-full object-cover" width={0} height={0} src={slide.image} alt="Hình ảnh" />
                    <div className="absolute left-2 top-2 rounded-[10px] bg-gradient-to-r from-[#C0424A] to-[#AC022E] p-[6px] text-center xl:left-4 xl:top-4 xl:p-2">
                      <p className="font-sans text-xs font-bold text-white xl:text-[24px] xl:leading-[22px]">
                        {slide.level}
                      </p>
                    </div>
                  </div>
                  <div className="mx-auto w-full rounded-[8px] bg-white py-1 text-center xl:py-2">
                    <p className="text-center text-xl font-bold tracking-normal text-[#AF0000] xl:text-3xl">
                      {slide.name}
                    </p>
                  </div>
                  <div className="px-0">
                    <p className="h-[7lh] text-center text-[10px] font-medium italic leading-[12px] text-white xl:text-xs 3xl:text-sm">
                      "{slide.description}"
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div
        className="w-full select-none bg-left-bottom bg-no-repeat py-6 sm:py-10 lg:hidden"
        style={{ backgroundImage: `url(${icons.bgImageCard})` }}
      >
        <Carousel>
          <CarouselContent className="flex">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="flex-shrink-0 basis-[80%] first:ml-8 sm:ml-4 sm:first:ml-16">
                <div className="h-fit w-full space-y-4 rounded-[10px] bg-gradient-to-r from-[#FFDE90] to-[#C1272D] p-4 shadow-lg sm:space-y-6 sm:p-6">
                  <div className="relative flex h-fit w-full items-center overflow-hidden rounded-[8px]">
                    <img
                      className="h-[150px] w-full object-cover sm:h-[350px]"
                      width={0}
                      height={0}
                      src={slide.image}
                      alt="Hình ảnh"
                    />
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
