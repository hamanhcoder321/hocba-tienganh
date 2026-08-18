import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface AlbumCarouselProps {
  items: TImage[];
}

const AlbumCarousel = ({ items }: AlbumCarouselProps) => {
  return (
    <div className="relative max-w-[464px]">
      <Carousel
        className="relative"
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
      >
        <CarouselContent className="-ml-2">
          {items.map((item, index) => (
            <CarouselItem key={index} className="ml-2 basis-[228px] pl-0">
              <div className="h-[206px] w-[228px] overflow-hidden">
                <img
                  src={item.file_path}
                  alt={item.originalname}
                  width={228}
                  height={206}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AlbumCarousel;
