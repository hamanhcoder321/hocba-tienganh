import { CarouselButton } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useEffect, useState } from 'react';

interface FeedbackStudentChineseSliderProps {
  feedbackStudentSlides: string[];
}

const FeedbackStudentChineseSlider = ({ feedbackStudentSlides }: FeedbackStudentChineseSliderProps) => {
  const [api, setApi] = useState<any>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
          loop: true,

          // containScroll: false,
        }}
        plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent>
          {feedbackStudentSlides.map((item, index) => (
            <CarouselItem key={index} className={cn('basis-[208px] pl-0 h-[284px] xl:h-[520px] xl:basis-[383px]')}>
              <div className="h-full w-full px-3 xl:px-6">
                <img src={item} alt="item" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

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

export default FeedbackStudentChineseSlider;
