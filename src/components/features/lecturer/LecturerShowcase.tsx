import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/constants/images';
import { Chinesetag, CertificateIcon, GraduationCapIcon, LecturerBadgeIcon, VectorArrow } from '@/components/common/icons';

export default function LecturerShowcase({ lecturers = [], bgClass = 'bg-[#F9F9F9]' }: TLecturerShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const currentLecturer = lecturers[currentIndex] || null;

  const totalPages = Math.ceil(lecturers.length / itemsPerPage);
  const paginatedLecturers = lecturers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectLecturer = (id: string) => {
    const index = lecturers.findIndex((l) => l.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollWidth > clientWidth) {
        setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
        setScrollRatio(clientWidth / scrollWidth);
      }
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [paginatedLecturers]);

  const handleDragScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseFloat(e.target.value);
    setScrollProgress(progress);

    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = progress * (el.scrollWidth - el.clientWidth);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetail = () => {
    if (currentLecturer?.slug) {
      window.location.href = `/doi-ngu-giang-vien/${currentLecturer.slug}`;
    }
  };

  if (!lecturers.length) return null;

  return (
    <section className={cn("w-full max-w-[1920px] mx-auto px-4 pt-4 pb-10 md:py-10 lg:px-6 xl:px-0", bgClass)}>
      <div className="container mx-auto max-w-[1224px]">
        {/* Header */}
        <div className="mb-6 md:mb-12 flex flex-col items-center text-center">
          <div className="relative">
            <VectorArrow
              fromColor="#FFA500"
              toColor="#072899"
              stopOffset="0.2"
              className="absolute -left-6 -top-2 h-[20.75px] w-[21.68px] md:-left-12 md:-top-2 md:h-[31px] md:w-[31px]"
            />
            <h2 className="text-[#072899] text-center font-gilroy text-[18px] font-[1000] uppercase leading-[23.48px] md:text-[36px] md:leading-tight lg:text-[42px] lg:leading-[64px]">
              HỌC VỚI NGƯỜI GIỎI NHẤT
            </h2>
          </div>
          <p className="font-gilroy text-[16px] font-bold leading-[1.2] text-[#373737] md:text-[24px] md:leading-none lg:text-[28px]">
            THE IELTS SPACE Tự Hào Quy Tụ Đội Ngũ Giáo Viên Hàng Đầu
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between md:gap-4 lg:ml-0 lg:gap-8 xl:items-start xl:justify-center xl:gap-8">
          {/* Left Column: Featured Card (becomes bottom on mobile) */}
          <div className="flex w-full justify-center flex-shrink-0 md:w-[390px] md:justify-start lg:w-[480px] xl:w-[600px] xl:justify-start [@media(min-width:900px)_and_(max-width:1023px)]:w-[460px]">
            <div
              className="relative flex h-auto min-h-[388px] w-full max-w-[353px] flex-col rounded-[6.99px] border-[0.7px] border-[#FFC7C7] bg-white md:h-[410px] md:w-full md:max-w-full md:rounded-[9.94px] md:border lg:h-[440px] xl:h-[532px] xl:max-w-full xl:origin-top [@media(min-width:900px)_and_(max-width:1023px)]:h-[440px]"
              style={{ boxShadow: '2px 4px 15px 0px #DBDBDB' }}
            >
              <div className="relative mb-2 mx-auto self-center mt-[18.98px] flex h-[210px] w-[240px] flex-shrink-0 items-center justify-center rounded-[4.22px] border-[0.5px] border-[#C7C7C7] bg-white shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] md:mt-3 md:h-[210px] md:w-[280px] lg:h-[230px] lg:w-[380px] xl:h-[260px] xl:w-[440px]">
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                  <img
                    src={currentLecturer?.optimizedAvatar || currentLecturer?.avatar_url?.file_path || ''}
                    alt={currentLecturer?.name}
                    className="h-full w-full object-contain"
                  />

                  {/* Logo IELTS SPACE inside photo */}
                  <div className="absolute left-3 top-3 z-20">
                    <img src={IMAGES.logoIeltsSpace.src} alt="logo" className="h-6 w-auto md:h-8" />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 min-h-0 flex-col space-y-3 px-6 pb-10 lg:px-[30px] lg:pb-10">
                <div className="flex-shrink-0 text-center">
                  <h3 className="font-svn-gilroy text-[26px] font-bold leading-none text-[#072899]">
                    {currentLecturer?.name}
                  </h3>
                  <p className="font-svn-gilroy pt-1 text-[14px] font-bold leading-[1.3] text-[#072899] lg:text-[16px]">
                    {currentLecturer?.title || 'Giáo viên lớp HSK & Chinese'}
                  </p>
                </div>

                <ul className="flex-1 min-h-0 space-y-3 overflow-y-auto pl-4 pt-1 md:pt-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {currentLecturer?.teacherHighlights?.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 xl:w-[418px] xl:gap-[12px]">
                      <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center mt-0.5 md:mt-1 md:h-6 md:w-6">
                        {idx === 0 ? (
                          <CertificateIcon className="size-[18px] text-[#373737] md:size-6" />
                        ) : idx === 1 ? (
                          <GraduationCapIcon className="size-[18px] text-[#373737] md:size-6" />
                        ) : (
                          <LecturerBadgeIcon className="size-[18px] text-[#373737] md:size-6" />
                        )}
                      </div>
                      <span className="font-svn-gilroy text-[16px] font-normal leading-tight text-[#373737]">
                        {highlight.content}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-[118px] flex translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
                  <Button
                    onClick={handleViewDetail}
                    className="hover:animate-outline-pulse-btn font-svn-gilroy group relative h-[28.1px] w-[117px] overflow-hidden rounded-[14.76px] bg-gradient-to-r from-[#F97316] to-[#F3C650] px-[14.76px] py-[6.32px] text-[10.54px] font-[700] uppercase leading-[1.5] text-white shadow-[0px_4px_15px_rgba(249,115,22,0.35)] transition-all hover:shadow-[0_0_20px_rgba(243,198,80,0.5)] md:h-[54px] md:w-[222px] md:rounded-[28px] md:text-[20px]"
                  >
                    {/* Pulsing gradient overlay */}
                    <div className="group-hover:animate-pulse-custom-btn absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-r from-[#F3C650] to-[#F97316] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></div>

                    <span className="relative z-10">XEM CHI TIẾT</span>
                  </Button>

                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                    @keyframes pulse-outline-btn {
                      0%, 100% { box-shadow: 0px 4px 15px rgba(143,30,21,0.3); }
                      50% { box-shadow: 0 0 0 3px white, 0 0 20px rgba(255, 184, 0, 0.6); }
                    }
                    @keyframes pulse-left-btn {
                      0%, 100% { opacity: 0; }
                      50% { opacity: 0.95; }
                    }
                    .animate-outline-pulse-btn {
                      animation: pulse-outline-btn 1.5s infinite;
                    }
                    .animate-pulse-custom-btn {
                      animation: pulse-left-btn 1.5s infinite;
                    }
                  `,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Vertical Line */}
          <div className="hidden w-[10px] items-center justify-center self-start md:mt-0 md:flex md:h-[410px] md:translate-y-0 md:scale-100 lg:mt-2 lg:h-[440px] lg:w-[25px] lg:translate-y-0 lg:scale-100 xl:h-[532px] xl:w-[40px] xl:translate-y-0 xl:scale-100 [@media(min-width:900px)_and_(max-width:1023px)]:h-[440px] [@media(min-width:900px)_and_(max-width:1023px)]:w-[20px]">
            <div className="mx-auto h-[80%] w-[2px] bg-[#D9D9D9] xl:translate-x-2" />
          </div>

          <div className="w-full flex-shrink-0 md:flex md:flex-col md:justify-between md:min-h-[410px] md:w-[390px] lg:min-h-[440px] lg:w-[480px] xl:min-h-[532px] xl:w-[600px] [@media(min-width:900px)_and_(max-width:1023px)]:min-h-[440px] [@media(min-width:900px)_and_(max-width:1023px)]:w-[460px]">
            <div
              ref={scrollRef}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-4 md:overflow-visible md:px-1 md:pb-5 lg:gap-x-4 lg:overflow-visible lg:px-2 xl:gap-x-5 xl:gap-y-5 xl:overflow-visible xl:px-4 [@media(min-width:900px)_and_(max-width:1023px)]:overflow-visible [@media(min-width:900px)_and_(max-width:1023px)]:px-2"
            >
              {paginatedLecturers.map((lecturer) => {
                const isSelected = lecturer.id === currentLecturer?.id;
                return (
                  <div
                    key={lecturer.id}
                    onClick={() => handleSelectLecturer(lecturer.id)}
                    className={cn(
                      'group relative flex h-[128px] w-[140px] shrink-0 cursor-pointer flex-col items-center rounded-[9.94px] transition-all duration-500 md:h-[125px] md:w-[120px] lg:h-[135px] lg:w-[140px] xl:h-[164px] xl:w-[180px] [@media(min-width:900px)_and_(max-width:1023px)]:h-[135px] [@media(min-width:900px)_and_(max-width:1023px)]:w-[140px]',
                      isSelected
                        ? 'bg-[#072899] shadow-[2px_3.38px_29.3px_rgba(243,198,80,0.3)]'
                        : 'border border-[#DCE5FF] bg-white shadow-[0px_3.38px_3.38px_rgba(0,0,0,0.25)] hover:bg-[#072899] hover:shadow-[2px_3.38px_29.3px_rgba(243,198,80,0.2)]',
                    )}
                  >
                    <div
                      className={cn(
                        'mt-[7.02px] flex h-[82.73px] w-[85.07px] items-center justify-center overflow-hidden rounded-[6.24px] shadow-[inset_0.78px_1.56px_3.12px_rgba(0,0,0,0.1)] transition-colors group-hover:bg-white md:h-[65px] md:w-[75px] lg:h-[75px] lg:w-[85px] xl:h-[106px] xl:w-[109px]',
                        isSelected ? 'bg-white' : 'bg-white',
                      )}
                    >
                      <img
                        src={lecturer.optimizedAvatar || lecturer.avatar_url?.file_path || ''}
                        alt={lecturer.name}
                        className={cn(
                          'h-full w-full object-contain transition-all duration-500',
                          !isSelected && 'opacity-60 grayscale-[0.5] group-hover:opacity-100 group-hover:grayscale-0',
                        )}
                      />
                    </div>
                    <h3
                      className={cn(
                        'font-svn-gilroy mt-[10px] px-2 text-center text-[16px] font-bold leading-tight transition-all duration-300',
                        isSelected ? 'text-[#F3C650]' : 'text-[#373737]/60 group-hover:text-[#F3C650]',
                      )}
                    >
                      {lecturer.name}
                    </h3>
                  </div>
                );
              })}

              {/* Fill placeholders if grid is not full - REMOVED */}
            </div>

            {/* Mobile Scroll Indicator at Bottom */}
            <div className="relative mb-6 mt-2 flex w-full items-center justify-start md:hidden">
              <div className="relative h-[6px] w-full rounded-[63px] bg-transparent">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={scrollProgress}
                  onChange={handleDragScroll}
                  className="absolute inset-0 z-20 cursor-pointer opacity-0"
                />
                {/* Visual Thumb */}
                <div
                  className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-all duration-100 ease-out"
                  style={{
                    left: `calc(${scrollProgress * 100}% - ${scrollProgress * 98}px)`,
                    width: '98px',
                  }}
                >
                  <div className="h-[6px] w-full rounded-full bg-[#D9D9D9]" />
                </div>
              </div>
            </div>

            {/* Pagination / Scroll Indicator */}
            <div className="mt-4 flex flex-col items-center justify-center">
              {/* Desktop/Tablet Pagination */}
              <div className="hidden items-center justify-center gap-6 md:flex">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="text-[#373737] transition-all hover:opacity-70 disabled:opacity-20"
                >
                  <ArrowLeft size={24} strokeWidth={2} />
                </button>

                <div className="flex items-center gap-6 font-gilroy text-[16px] font-[700] leading-[33.33px]">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = currentPage === pageNum;

                    if (totalPages > 5) {
                      if (pageNum > 3 && pageNum < totalPages) {
                        if (pageNum === 4)
                          return (
                            <span key="ellipsis" className="text-[#D9D9D9]">
                              ...
                            </span>
                          );
                        return null;
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          'transition-colors duration-300',
                          isActive ? 'text-[#373737]' : 'text-[#D9D9D9] hover:text-[#373737]',
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="text-[#373737] transition-all hover:opacity-70 disabled:opacity-20"
                >
                  <ArrowRight size={24} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
