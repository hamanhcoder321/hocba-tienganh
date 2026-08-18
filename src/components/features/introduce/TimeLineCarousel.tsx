import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface TimelineItem {
  date: string;
  description: string;
  position: 'top' | 'bottom';
  colStart?: string;
}

interface TimeLineCarouselProps {
  timeline: TimelineItem[];
}

const TimeLineCarousel = ({ timeline }: TimeLineCarouselProps) => {
  return (
    <div className="relative w-full border-t border-black pt-4">
      <Carousel className="relative">
        <CarouselContent className="-ml-2">
          {timeline.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 select-none pl-2">
              <div className="relative ml-4 h-full border-l border-black px-4 py-4">
                <div className="absolute -left-[6px] top-0 size-3 rounded-full bg-black" />
                <div className="text-base font-black">{item.date}</div>
                <p className="text-sm font-medium">{item.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TimeLineCarousel;
