import { CarouselButton, ShortsPlayIcon } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface VideoStudentSlideProps {
  slides: {
    id: number;
    videoUrl: string;
    thumbnail?: string;
  }[];
}

const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};
const VideoStudentSlide = ({ slides }: VideoStudentSlideProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const pauseAllVideos = () => {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
          args: [],
        }),
        '*',
      );
    });
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      pauseAllVideos();
      setPlayingId(null);
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

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative mt-4 w-full pl-0 md:mt-3">
      <Carousel
        className="relative"
        setApi={setApi}
        opts={{
          align: 'center',
          containScroll: false,
          loop: true,
          slidesToScroll: 1,
          skipSnaps: false,
        }}
      >
        <CarouselContent>
          {slides.map((item, index) => {
            const videoId = getYouTubeId(item.videoUrl);
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : item.videoUrl;
            const thumbnail = item.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');

            return (
              <CarouselItem
                key={index}
                className={cn(
                  'flex h-[446px] basis-[220px] select-none items-center justify-center md:h-[500px] md:basis-[260px] lg:h-[540px] lg:basis-[290px] xl:h-[560px] xl:basis-1/3 2xl:h-[608px]',
                  current !== index && 'cursor-pointer',
                )}
                onClick={() => {
                  if (current !== index) {
                    pauseAllVideos();
                    api?.scrollTo(index);
                  }
                }}
              >
                <div
                  className={cn(
                    'group relative mx-auto overflow-hidden rounded-lg border bg-transparent transition-all duration-500',
                    current === index
                      ? 'h-[356px] w-[206px] md:h-[420px] md:w-[240px] lg:h-[460px] lg:w-[266px] xl:h-[518px] xl:w-[300px]'
                      : 'my-auto h-[282px] w-[158px] opacity-40 md:h-[340px] md:w-[190px] lg:h-[370px] lg:w-[210px] xl:h-[410px] xl:w-[230px]',
                  )}
                  style={{
                    boxShadow: current === index ? '3px 4px 30px 0px #F3C65099' : '',
                  }}
                >
                  {thumbnail && playingId !== item.id ? (
                    <div
                      className="absolute left-0 top-0 h-full w-full cursor-pointer select-none"
                      onClick={() => {
                        if (current === index) {
                          setPlayingId(item.id);
                        } else {
                          pauseAllVideos();
                          api?.scrollTo(index);
                        }
                      }}
                    >
                      <img
                        src={thumbnail}
                        alt={`Student ${item.id}`}
                        className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <ShortsPlayIcon className="h-16 w-16 drop-shadow-[0_4px_10px_rgba(255,0,0,0.5)] transition-all duration-300 md:h-20 md:w-20" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <iframe
                        className={cn('absolute left-0 top-0 h-full w-full', current === index && 'scale-105')}
                        src={
                          playingId === item.id ? `${embedUrl}?enablejsapi=1&autoplay=1` : `${embedUrl}?enablejsapi=1`
                        }
                        title={`Student ${item.id}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                      {current !== index && <div className="absolute inset-0 z-10 cursor-pointer" />}
                    </>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-[50%] z-50 size-[30px] -translate-y-1/2 rounded-full bg-white p-0 hover:bg-gray-100 md:-left-2 md:top-1/2 md:size-10 xl:-left-4"
          disabled={!canScrollPrev}
          onClick={() => {
            pauseAllVideos();
            api?.scrollPrev();
          }}
        >
          <CarouselButton className="!size-[30px] md:!size-10" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-[50%] z-50 size-[30px] -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 md:-right-2 md:top-1/2 md:size-10 xl:-right-4"
          disabled={!canScrollNext}
          onClick={() => {
            pauseAllVideos();
            api?.scrollNext();
          }}
        >
          <CarouselButton className="!size-[30px] rotate-180 md:!size-10" />
        </Button>
      </Carousel>
    </div>
  );
};

export default VideoStudentSlide;
