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
    <div className="relative w-full pb-8">
      <Carousel className="relative">
        <CarouselContent className="-ml-2">
          {timeline.map((item, index) => (
            <CarouselItem key={index} className="basis-[85%] select-none pl-4">
              <div className="relative ml-2 h-full border-l border-black pl-5 pb-6">
                <div className="absolute -left-[10px] top-0 size-5 rounded-full bg-[#373737]" />
                <div className="text-[22px] leading-none font-black text-black mb-3">{item.date}</div>
                <p className="text-[15px] leading-relaxed font-medium text-[#373737]">{item.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TimeLineCarousel;
