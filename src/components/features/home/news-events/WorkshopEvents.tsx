import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { IMAGES } from '@/lib/constants/images';
import { WorkshopPlayIcon } from '@/components/common/icons';

const MOCK_WORKSHOPS = [
  {
    id: 1,
    title: 'Recap Học Bá tham gia ngày hội việc làm JOB FAIR 2026...',
    date: 'Tháng 5.2026',
    thumbnail: IMAGES.news.new_vd1.src,
    videoUrl: 'https://youtu.be/tI9E6mqy2uA',
  },
  {
    id: 2,
    title: 'Bí quyết chinh phục nhà tuyển dụng - WORKSHOP HỌC BÁ',
    date: 'Tháng 10.2025',
    thumbnail: IMAGES.news.new_vd2.src,
    videoUrl: 'https://youtu.be/CsujkIXcI24?list=PLPTv4kFgr2jBVBzblPgjXvN4D1beb9AXF',
  },
  {
    id: 3,
    title: 'GIẢI MÃ HSK 3.O - WORKSHOP HỌC BÁ',
    date: 'Tháng 8.2025',
    thumbnail: IMAGES.news.new_vd3.src,
    videoUrl: 'https://youtu.be/zMxsJVyx38I?list=PLPTv4kFgr2jBVBzblPgjXvN4D1beb9AXF',
  },
  {
    id: 4,
    title: 'Giải mã nghệ thuật giảng dạy khẩu ngữ - GS. Baozhang He - WORKSHOP HỌC BÁ',
    date: 'Tháng 11.2025',
    thumbnail: IMAGES.news.new_vd4.src,
    videoUrl: 'https://youtu.be/oataHZQ7B5w?list=PLPTv4kFgr2jBVBzblPgjXvN4D1beb9AXF',
  },
];

const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

const WorkshopEvents = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [playingId, setPlayingId] = React.useState<number | null>(null);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    const checkAutoplay = () => {
      if (window.innerWidth < 768) {
        autoplay.play();
      } else {
        autoplay.stop();
      }
    };
    checkAutoplay();

    window.addEventListener('resize', checkAutoplay);

    onInit(emblaApi);
    onSelect(emblaApi);

    const handleSelect = () => {
      setPlayingId(null);
      checkAutoplay();
    };

    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('reInit', checkAutoplay);
    emblaApi.on('select', onSelect);
    emblaApi.on('select', handleSelect);
    emblaApi.on('pointerDown', () => {
      setPlayingId(null);
    });

    return () => {
      window.removeEventListener('resize', checkAutoplay);
    };
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white font-gilroy">
      <div className="mx-auto h-[414px] w-full bg-gradient-to-b from-[#A4B9FF] to-[#FFFFFF] pb-12 pt-5 md:h-[703px] md:pb-24 md:pt-12 max-w-[1920px]">
        <div className="container relative mx-auto max-w-[1200px] px-5 md:px-8 2xl:max-w-[1400px] 3xl:max-w-none 3xl:px-[168px]">
          {/* Header Section */}
          <div className="mb-8 flex items-start justify-start md:mb-12 md:items-center">
            <div className="flex w-full flex-row items-start md:w-auto md:gap-4">
              <div className="flex items-start gap-3 md:gap-[25px]">
                {/* Vertical Bar */}
                <div className="h-[46px] w-[3px] shrink-0 bg-[#373737] md:-mt-[8px] md:h-[54px] md:w-[5px] xl:mt-0 xl:h-[72px]"></div>

                <div style={{ transform: 'rotate(-0.05deg)' }} className="-mt-[8px] flex flex-col md:-mt-[13px]">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-black leading-[30.42px] text-[#000000] md:text-[32px] md:leading-[40px] xl:text-[42px] xl:leading-[64px]">
                      Workshop The IELTS Space
                    </h2>
                  </div>
                  <p className="-mt-0.5 w-[266px] text-[12px] font-medium leading-[1.1] text-[#373737] md:-ml-[3px] md:mt-[-2px] md:w-auto md:text-[18px] md:leading-[28px] xl:text-[22px] xl:leading-[32px]">
                    Khám phá các workshop Tiếng Anh nổi bật tại The IELTS Space
                  </p>
                </div>
              </div>

              {/* Mobile Icon
              <img
                src={IMAGES.news.videoLibrary.src}
                alt="Video Library"
                className="absolute -top-[12px] left-[275px] h-[32px] w-[30px] md:hidden"
              />

              {/* Desktop Icon */}
              {/* <div className="hidden shrink-0 items-center justify-center md:-mt-[10px] md:ml-4 md:flex">
                <img src={IMAGES.news.videoLibrary.src} alt="Video Library" className="h-auto md:w-[75px]" />
              </div> */}
            </div>
          </div>

          {/* Carousel Section */}
          <div className="relative md:mx-auto md:mt-[56px] md:w-[calc(100%-96px)] xl:w-full xl:max-w-[1176px]">
            <div className="-mx-4 -mt-2 overflow-hidden px-2 pb-10 pt-2 md:px-4" ref={emblaRef}>
              <div className="-mx-4 flex md:-mx-8 2xl:-mx-[68px]">
                {MOCK_WORKSHOPS.map((workshop) => {
                  const videoId = getYouTubeId(workshop.videoUrl);
                  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : workshop.videoUrl;
                  const isPlaying = playingId === workshop.id;

                  return (
                    <div
                      key={workshop.id}
                      className="min-w-0 flex-[0_0_350px] pl-4 md:flex-[0_0_50%] md:pl-8 2xl:flex-[0_0_622px] 2xl:pl-[68px]"
                    >
                      <div
                        onClick={() => {
                          if (!isPlaying) {
                            setPlayingId(workshop.id);
                            if (emblaApi) {
                              emblaApi.plugins().autoplay?.stop();
                            }
                          }
                        }}
                        className="group flex h-[266px] w-[330px] cursor-pointer flex-col rounded-[7.21px] bg-white shadow-[1.8px_2.4px_2.4px_0px_rgba(0,0,0,0.25)] transition-all md:h-full md:w-full md:rounded-[12px] md:px-[18px] md:pb-[24px] md:pt-[19px] md:shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] xl:h-[444px] xl:px-[18px] xl:pb-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative mb-[8.51px] ml-[10.72px] mt-[11.38px] h-[191.11px] w-[308.56px] shrink-0 overflow-hidden rounded-[7.21px] md:mb-4 md:ml-0 md:mt-0 md:h-[240px] md:w-full md:rounded-[12px] lg:h-[280px] xl:h-[319px]">
                          {isPlaying ? (
                            <iframe
                              className="absolute left-0 top-0 h-full w-full rounded-[7.21px] md:rounded-[12px]"
                              src={`${embedUrl}?enablejsapi=1&autoplay=1`}
                              title={workshop.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <img
                              src={workshop.thumbnail}
                              alt={workshop.title}
                              className="h-full w-full object-cover transition-transform duration-500"
                            />
                          )}
                        </div>

                      {/* Content */}
                      <div className="ml-[10.72px] flex items-start gap-[10.69px] md:ml-0 md:gap-3 xl:gap-4">
                        <WorkshopPlayIcon className="text-[#052284] h-[28.76px] w-[28.59px] shrink-0 md:h-[36px] md:w-[36px] xl:h-[50px] xl:w-[50px]" />
                        <div className="flex flex-1 flex-col md:-mt-[1px] xl:-mt-[3px]">
                          <h3 className="w-[265px] text-[14px] font-bold leading-[1.2] text-[#000000] transition-colors md:min-h-[63px] md:w-auto md:text-[16px] md:leading-[1.3] md:text-[#000000] xl:min-h-[53px] xl:text-[22px] xl:leading-[1.2]">
                            {workshop.title}
                            {workshop.title.length > 65 && (
                              <span className="ml-2 inline-block text-[9px] font-bold leading-[1.2] text-[#969696] md:hidden">
                                {workshop.date}
                              </span>
                            )}
                          </h3>
                          <p
                            className={`mt-1 text-[9px] font-bold leading-[1.2] text-[#969696] md:mt-[4px] md:text-[13px] md:leading-[1.2] xl:mt-[6px] xl:text-[14px] ${
                              workshop.title.length > 65 ? 'hidden md:block' : 'block'
                            }`}
                          >
                            {workshop.date}
                          </p>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>

            {/* Pagination Dots (Mobile Only) */}
            <div className="-mt-4 flex justify-center gap-2 md:hidden">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-[#AF0000]' : 'bg-[#D9D9D9]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute -left-4 top-1/2 z-10 hidden h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[#FFEFEF] text-[#1A1A1A] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:-left-12 md:flex 2xl:-left-16 2xl:h-[48px] 2xl:w-[48px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 top-1/2 z-10 hidden h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[#FFEFEF] text-[#1A1A1A] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:-right-12 md:flex 2xl:-right-16 2xl:h-[48px] 2xl:w-[48px]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopEvents;
