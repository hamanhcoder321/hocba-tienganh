import { CarouselButton } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NewsEventItem {
  image?: string;
  title?: string;
  description?: string;
  youtubeUrl?: string;
  type?: 'image' | 'youtube';
}

interface NewsEventsCarouselProps {
  events: NewsEventItem[];
}

export const getYoutubeEmbedUrl = (url: string) => {
  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/,
  )?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const NewsEventsCarousel = ({ events }: NewsEventsCarouselProps) => {
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
    <div className="relative mt-4 w-full px-1 md:mt-14">
      <Carousel
        className="relative"
        setApi={setApi}
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent className="ml-0 mr-0 py-4 pr-4 md:ml-3 md:mr-3 md:pr-10">
          {events.map((item, index) => (
            <CarouselItem key={index} className="basis-full px-4 md:basis-[576px] md:px-10">
              <div className="h-auto w-full overflow-hidden rounded-lg border bg-white p-2 shadow-md md:h-[395px]">
                {item.type === 'youtube' && item.youtubeUrl ? (
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={getYoutubeEmbedUrl(item.youtubeUrl)}
                      title={item.title || 'YouTube video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="h-full w-full rounded-sm"
                    />
                  </div>
                ) : null}
                <div className="hidden select-none p-4 md:flex md:items-center md:justify-between">
                  <div>
                    {item.title && <h3 className="mb-2 line-clamp-2 text-base font-bold md:text-lg">{item.title}</h3>}
                    {item.description && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="font-medium">{item.description}</span>
                      </div>
                    )}
                  </div>
                  <CircleAlert className="size-5" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-[50%] z-10 size-[30px] -translate-y-1/2 rounded-full bg-white p-0 hover:bg-gray-100 md:-left-20 md:top-1/2 md:size-10"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
        >
          <CarouselButton className="!size-[30px] md:!size-10" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-[50%] z-10 size-[30px] -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 md:-right-20 md:top-1/2 md:size-10"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
        >
          <CarouselButton className="!size-[30px] rotate-180 md:!size-10" />
        </Button>
      </Carousel>
    </div>
  );
};

export default NewsEventsCarousel;
