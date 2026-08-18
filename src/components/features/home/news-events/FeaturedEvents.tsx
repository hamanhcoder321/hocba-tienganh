import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DoubleChevronRight } from '@/components/common/icons';
import { IMAGES } from '@/lib/constants/images';
import { NEWS_SLUGS } from '@/lib/constants/content';
import { format } from 'date-fns';

import { useGetBlogList } from '@/hooks/features/use-blog-filter';
import { fetchBlogCategoryList } from '@/lib/static-data';

const FeaturedEvents = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { flatData: eventsList, setQueryParams, setEnabled, setLimit, isLoading } = useGetBlogList();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setLimit(4);
    fetchBlogCategoryList().then((categories) => {
      if (Array.isArray(categories)) {
        const category = categories.find((c: TCategoryBlog) => c.slug === NEWS_SLUGS[1]);
        if (category) {
          setQueryParams(`blog_category_id=${category.id}`);
          setEnabled(true);
        }
      }
      setIsInitializing(false);
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, dragFree: true },
    isMobile ? [Autoplay({ delay: 5000, stopOnInteraction: false })] : [],
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((api: any) => {
    const snapCount = api.scrollSnapList().length;
    if (snapCount <= 1) return setScrollProgress(0);

    const maxProgress = (snapCount - 1) / snapCount;
    const rawProgress = api.scrollProgress();
    let mappedProgress = 0;

    if (rawProgress < 0) {
      mappedProgress = Math.abs(rawProgress) / (1 - maxProgress);
    } else if (rawProgress > maxProgress) {
      mappedProgress = 1 - (rawProgress - maxProgress) / (1 - maxProgress);
    } else {
      mappedProgress = rawProgress / maxProgress;
    }

    setScrollProgress(Math.max(0, Math.min(1, mappedProgress)) * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll(emblaApi);
    emblaApi.on('scroll', () => onScroll(emblaApi));
    emblaApi.on('reInit', () => onScroll(emblaApi));
  }, [emblaApi, onScroll]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragMove = useCallback(
    (e: TouchEvent) => {
      if (!emblaApi || !progressBarRef.current) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clientX = e.touches[0].clientX;

      const thumbWidth = 98;
      const trackWidth = rect.width - thumbWidth;

      let x = clientX - rect.left - thumbWidth / 2;
      x = Math.max(0, Math.min(x, trackWidth));

      const progress = x / trackWidth;

      const snapCount = emblaApi.scrollSnapList().length;
      const targetIndex = Math.max(0, Math.min(snapCount - 1, Math.round(progress * (snapCount - 1))));
      emblaApi.scrollTo(targetIndex);
    },
    [emblaApi],
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
  }, [onDragMove]);

  const onDragStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      document.addEventListener('touchmove', onDragMove, { passive: false });
      document.addEventListener('touchend', onDragEnd);

      onDragMove(e.nativeEvent);
    },
    [onDragMove, onDragEnd],
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      dayMonth: `${format(date, 'd')} Tháng ${format(date, 'M')}`,
      year: format(date, 'yyyy'),
    };
  };

  return (
    <section className="bg-white pb-4 pt-[19.14px] font-gilroy md:pb-8 md:pt-16">
      <div className="mx-auto w-full max-w-[1374px] px-[9px] md:px-16 xl:px-14 2xl:max-w-[1502px] 2xl:px-16 3xl:max-w-none 3xl:px-[298px]">
        {/* Header */}
        <div className="mb-[20px] md:mb-[40px] flex flex-row items-center justify-between gap-2 sm:gap-4 md:items-end md:gap-6">
          <div className="flex translate-x-3 items-center gap-[4.5px] md:-translate-y-3 md:translate-x-0 md:gap-4">
            <div className="h-[23.77px] w-[2.85px] rounded-full bg-[#AF0000] md:h-[50px] md:w-[6px]"></div>
            <div className="relative flex items-center">
              <h2 className="text-[18px] font-[900] leading-[1.2] text-[#AF0000] sm:text-[24px] md:text-[42px]">
                Sự kiện tiêu biểu
              </h2>
              {/* Decorative Stars */}
              <div className="absolute -right-8 -top-2 flex h-[30px] w-[34px] items-center justify-center md:-right-12 md:h-[45px] md:w-[51px]">
                <img
                  src={IMAGES.schedule.starLarge.src}
                  alt="star"
                  className="absolute right-0 top-0 h-[18.18px] w-[18.18px] md:-top-2 md:left-6 md:h-[38.25px] md:w-[38.25px]"
                />
                <img
                  src={IMAGES.schedule.starSmall.src}
                  alt="star"
                  className="absolute bottom-2 left-2 h-[7.25px] w-[7.25px] md:bottom-1 md:left-3 md:h-[15.25px] md:w-[15.25px]"
                />
              </div>
            </div>
          </div>

          <a
            href={`/${NEWS_SLUGS[1]}`}
            className="flex h-[25px] w-[95px] shrink-0 items-center justify-center gap-[3.95px] rounded-[36.18px] border-[0.33px] border-[#AF0000] bg-[#AF0000] px-[5.92px] py-[7.89px] text-white transition-all sm:h-[32px] sm:w-[150px] md:h-[38px] md:w-[192px] md:gap-[6px] md:bg-[#FAFAFA] md:px-[9px] md:text-[#AF0000] xl:hover:bg-[#AF0000] xl:hover:text-white"
          >
            <span className="text-[10.53px] font-bold md:hidden">Xem toàn bộ</span>
            <span className="hidden font-bold md:inline">Xem tất cả sự kiện</span>
            <DoubleChevronRight className="h-[9.21px] w-[9.87px] md:h-[14px] md:w-[15px]" aria-hidden="true" />
          </a>
        </div>

        {/* Carousel Section */}
        <div className="relative min-h-[300px] w-full">
          {isLoading || isInitializing ? (
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#AF0000] border-t-transparent"></div>
            </div>
          ) : !(isLoading || isInitializing) && eventsList.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="text-lg">Hiện tại chưa có sự kiện nào tiêu biểu.</p>
            </div>
          ) : (
            !(isLoading || isInitializing) && (
              <>
                {/* Arrow Left */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-2 top-1/2 z-10 hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[#FFEFEF] text-[#1A1A1A] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:-left-12 md:flex"
                >
                  <ArrowLeft width={18.79} height={15.47} />
                </button>

                <div className="embla overflow-hidden" ref={emblaRef}>
                  <div className="embla__container -ml-6 flex pb-10">
                    {eventsList.map((event) => {
                      const { dayMonth, year } = formatDate(event.created_at || event.publish_at);
                      return (
                        <div
                          key={event.id}
                          className="embla__slide min-w-0 flex-[0_0_276px] pl-6 sm:flex-[0_0_calc((100%+24px)/2)] xl:flex-[0_0_calc((100%+24px)/3)]"
                        >
                          <div className="group flex h-[305px] w-full flex-col rounded-[2.33px] border-[0.58px] border-[#F0F0F0] bg-white transition-[border-color,box-shadow] duration-1000 md:h-[530px] md:rounded-[4px] md:border-b-[1px] md:border-l-[1px] md:border-r-[1px] md:border-t-0 xl:hover:border-b-[2px] xl:hover:border-r-[2px] xl:hover:border-b-[#FFDFDF] xl:hover:border-r-[#FFDFDF] xl:hover:shadow-[12px_12px_12px_0_rgba(175,0,0,0.12)]">
                            {/* Image container */}
                            <div className="relative h-[159px] w-full shrink-0 overflow-hidden md:h-[274px]">
                              <img
                                src={event.thumbnail_link?.file_path || 'https://placehold.co/400x400'}
                                alt={event.title}
                                className="h-full w-full transform-gpu object-cover transition-transform duration-1000 ease-in-out xl:group-hover:scale-105"
                              />

                              {/* Date Badge */}
                              <div className="absolute left-[18.63px] top-[104.77px] flex h-[38.64px] w-[71.59px] flex-col items-center justify-center gap-0 rounded-[4.66px] bg-white p-[5.82px] shadow-[0_2.33px_2.33px_0_rgba(0,0,0,0.25)] md:left-8 md:top-[180px] md:h-[67px] md:w-[123px] md:rounded-[8px] md:p-[10px] md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                                <span className="text-[9.32px] font-[800] leading-none text-[#373737] md:text-[16px] md:leading-[19px]">
                                  {dayMonth}
                                </span>
                                <span className="text-[22.14px] font-[800] leading-none text-[#373737] md:text-[38px] md:leading-[36px]">
                                  {year}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col px-[20.37px] py-3 md:p-6">
                              <h3 className="mb-1 line-clamp-2 min-h-[38px] w-full max-w-[209.26px] text-[14px] font-bold leading-[1.3] text-[#000000] transition-colors md:mb-3 md:min-h-[60px] md:max-w-[360px] md:text-[22px] md:leading-[1.3] xl:group-hover:text-[#AF0000]">
                                {event.title.charAt(0).toUpperCase() + event.title.slice(1)}
                              </h3>
                              <div className="mb-1 h-[4.07px] w-[34.92px] rounded-[27.94px] bg-[#D9D9D9] transition-all duration-1000 ease-in-out md:h-[7px] md:w-[60px] md:rounded-[48px] xl:group-hover:w-[360px] xl:group-hover:bg-[#AF0000]"></div>
                              <p className="mb-2 line-clamp-4 min-h-[46px] w-full max-w-[209.26px] text-[9px] font-normal leading-[1.2] text-[#000000] md:mb-4 md:min-h-[78px] md:max-w-[360px] md:text-[16px]">
                                {event.meta_description.charAt(0).toUpperCase() + event.meta_description.slice(1)}
                              </p>

                              <div className="mt-auto self-start">
                                <a
                                  href={`/${event.BlogCategory?.slug || NEWS_SLUGS[1]}/${event.slug}`}
                                  className="flex h-[22.12px] w-[95.46px] items-center justify-center gap-[3.49px] rounded-[32.01px] border-[0.29px] border-[#000000] bg-[#FAFAFA] px-[5.24px] py-[6.98px] text-[8px] font-semibold text-[#373737]/80 transition-all md:h-[38px] md:w-[164px] md:gap-[6px] md:rounded-[55px] md:border-[0.5px] md:bg-[#FFFFFF] md:px-[9px] md:py-0 md:text-[16px] xl:hover:border-[#AF0000] xl:hover:text-[#AF0000]"
                                >
                                  Xem chi tiết{' '}
                                  <DoubleChevronRight className="h-[8px] w-[8.6px] md:h-[14px] md:w-[15px]" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Bar (Mobile) */}
                <div className="-mt-6 flex justify-start md:hidden">
                  <div
                    ref={progressBarRef}
                    className="relative h-[6px] w-full cursor-pointer rounded-[63px] bg-transparent"
                    onTouchStart={onDragStart}
                  >
                    <div
                      className={`absolute top-0 h-[6px] w-[98px] rounded-[63px] bg-[#FFDFDF] ${isDragging ? '' : 'transition-all duration-300 ease-out'}`}
                      style={{ left: `calc((100% - 98px) * ${scrollProgress / 100})` }}
                    ></div>
                  </div>
                </div>

                {/* Arrow Right */}
                <button
                  onClick={scrollNext}
                  className="absolute right-2 top-1/2 z-10 hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[#FFEFEF] text-[#1A1A1A] shadow-[0_0_5.31px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#AF0000] hover:text-white hover:shadow-[0_10px_20px_rgba(175,0,0,0.5)] md:-right-12 md:flex"
                >
                  <ArrowRight width={18.79} height={15.47} />
                </button>
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
