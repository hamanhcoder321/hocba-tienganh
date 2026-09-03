import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Plus } from 'lucide-react';

import imgGv1 from '/src/assets/images/img-hocba-tienganh-optimized/gv-1.webp';
import imgGv2 from '/src/assets/images/img-hocba-tienganh-optimized/img-gv-2.webp';
import imgGv3 from '/src/assets/images/img-hocba-tienganh-optimized/gv-3.webp';
import imgGv4 from '/src/assets/images/img-hocba-tienganh-optimized/img-gv-4-Mai-Thu-Trang.webp';
import iconSearch from '/src/assets/images/img-hocba-tienganh-optimized/icon-search.webp';
import buttonScroll from '/src/assets/images/img-hocba-tienganh-optimized/button-scroll.webp';

const TEACHERS = [
  {
    badgeTop: 'LISTENING',
    badgeBottom: '8.5',
    image: imgGv1.src,
    name: 'THẠC SĨ LINH PHƯƠNG',
    slug: 'ths-linh-phuong',
    title: '12 Năm Kinh Nghiệm Giảng Dạy',
    description: 'Thạc sĩ Đại học Kinh tế Quốc dân, Cử\nnhân Đại học Khoa học Ứng dụng\nKymenlaakso, Phần Lan (Học bổng)'
  },
  {
    badgeTop: 'OVERALL',
    badgeBottom: '8.5',
    image: imgGv2.src,
    name: 'GIẢNG VIÊN YẾN CHI',
    slug: 'giang-vien-yen-chi',
    title: 'Hơn 10 Năm Kinh Nghiệm Giảng Dạy Chứng Chỉ IELTS Và TOEIC',
    description: '2 lần đạt 8.5 IELTS, Đại sứ bài thi IELTS\ntrên máy tính 2023 của IDP, Cố vấn\nHọc thuật của nhiều đơn vị'
  },
  {
    badgeTop: 'GIẢNG VIÊN',
    badgeBottom: 'BẢN XỨ',
    image: imgGv3.src,
    name: 'GIẢNG VIÊN JACKSON HOWARD',
    slug: 'giang-vien-jackson-howard',
    title: 'Cựu Giám Khảo Bài Thi IELTS',
    description: '20 năm kinh nghiệm giảng dạy và\nluyện thi tiếng Anh cho học sinh thế\ngiới, Cựu Trưởng khoa Tiếng Anh\nTrường Western Sydney University'
  },
  {
    badgeTop: 'OVERALL',
    badgeBottom: '8.5',
    image: imgGv4.src,
    name: 'GIẢNG VIÊN THU TRANG',
    slug: 'giang-vien-thu-trang',
    title: '4+ năm kinh nghiệm giảng dạy \n IELTS',
    description: 'Cử nhân xuất sắc Đại học Kinh tế \n Quốc Dân, Thành viên dự án nâng \n cao năng lực ngoại ngữ cho giáo viên \n của Sở Giáo dục Hà Nội, SAT 1430',
  },
];

const StaticTeacherCarousel = () => {
  return (
    <div className="relative w-full max-w-[372px] md:max-w-[1112px] h-[368px] md:h-[529px] mx-auto">
      <Carousel
        className="relative w-full"
        opts={{
          align: 'start',
          loop: false,
        }}
      >
        <CarouselContent className="-ml-[27.8px] md:-ml-[40px] pb-12 h-full">
          {TEACHERS.map((teacher, index) => (
            <CarouselItem key={index} className="pl-[27.8px] md:pl-[40px] basis-auto md:basis-1/3 h-full">
              <div className="group relative flex flex-col items-center w-[239px] md:w-[344px] h-[333.6px] md:h-[451px] rounded-[24px] bg-[#0A3BCE] hover:bg-[#1E50FF] hover:shadow-[15px_15px_30px_-5px_rgba(30,80,255,0.4)] transition-all duration-300 pt-6 pb-8 px-3 md:px-4 shadow-lg mt-4 cursor-pointer">
                {/* Background overlay for clipping glow but not the + icon */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  {/* Large Background Circle behind avatar (Figma exact match) */}
                  <div 
                    className="absolute top-6 left-1/2 -translate-x-1/2 size-[192px] md:size-[286px] rounded-full"
                    style={{
                      background: 'radial-gradient(50% 50% at 50% 50%, transparent 60%, rgba(162, 185, 255, 0.4) 100%)'
                    }}
                  />
                </div>

                {/* Badge */}
                <div className={`absolute z-30 flex flex-col items-center justify-center rounded-[8px] md:rounded-[12.5px] border-[1.5px] md:border-[1.04px] border-white/90 bg-gradient-to-b from-[#FFA73A] to-[#FF8C00] px-2 py-1 md:px-[12.66px] md:py-[12px] shadow-md ${teacher.badgeBottom === 'BẢN XỨ' ? 'left-3 md:left-[14px] top-4 md:top-[34.5px] md:w-[83px] md:h-[54px]' : 'left-3 md:left-[27px] top-4 md:top-[31.5px] md:w-[57px] md:h-[59px]'}`}>
                  <span className={`text-white whitespace-nowrap ${teacher.badgeBottom === 'BẢN XỨ' ? 'text-[8px] font-black md:text-[11px] md:leading-[12.5px] tracking-normal text-center' : 'text-[7px] font-bold md:text-[9px] tracking-wide'}`}>
                    {teacher.badgeTop}
                  </span>
                  <span className={`font-black text-white whitespace-nowrap ${teacher.badgeBottom === 'BẢN XỨ' ? 'text-[10px] md:text-[15px] md:leading-[18px] tracking-normal text-center' : 'text-lg leading-none md:text-xl mt-0.5'}`}>
                    {teacher.badgeBottom}
                  </span>
                  {/* Decorative circles (bubbles) below the badge */}
                  <div className="absolute -bottom-4 left-3 size-[12px] rounded-full border-[1.5px] border-white/70 bg-transparent" />
                  <div className="absolute -bottom-6 left-6 size-[8px] rounded-full border-[1.5px] border-white/50 bg-transparent" />
                </div>

                {/* Avatar */}
                <div className="relative h-[160px] md:h-[235px] z-20 w-full md:w-[235px] flex justify-center items-end mt-1">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-full object-contain object-bottom"
                      loading="lazy"
                    />
                  </div>

                {/* White Info Box */}
                <div className="relative z-20 -mt-6 w-[192.51px] md:w-[277px] h-[69.5px] md:h-[100px] flex flex-col items-center justify-center gap-[4.17px] md:gap-[6px] rounded-[8.34px] md:rounded-[12px] bg-white px-4 md:py-[12px] py-[8.34px] text-center shadow-md">
                  <h3 className={`font-[1000] text-[#0935C4] leading-none capitalize text-center m-0 whitespace-nowrap ${teacher.name === 'GIẢNG VIÊN JACKSON HOWARD' ? 'text-[12.5px] md:text-[17.5px] tracking-tight' : 'text-[14.71px] md:text-[21.16px] tracking-normal'}`}>
                    {teacher.name}
                  </h3>
                  <p className="text-[12.51px] font-bold text-gray-800 md:text-[18px] leading-none capitalize tracking-normal text-center m-0">
                    {teacher.title}
                  </p>
                </div>

                <p className="mt-5 mb-2 text-center text-[12px] sm:text-[14px] md:text-[16px] text-white px-1 md:px-4 leading-[1.2] tracking-normal font-medium flex flex-col items-center">
                  {teacher.description.split('\n').map((line, i) => (
                    <span key={i} className="whitespace-nowrap">{line}</span>
                  ))}
                </p>

                {/* Search / Plus icon button at the bottom */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30">
                  <a 
                    href={teacher.slug ? `/doi-ngu-giang-vien/${teacher.slug}` : "#"} 
                    className="cursor-pointer flex size-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 [&>svg]:hover:-scale-x-100"
                  >
                    <svg className="size-5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6346 9.37033H14.0929M14.0929 9.37033H10.5512M14.0929 9.37033V5.82867M14.0929 9.37033V12.912M8.19011 15.2731L1.10678 22.3564M14.0929 17.6342C18.6569 17.6342 22.3568 13.9344 22.3568 9.37033C22.3568 4.80631 18.6569 1.10645 14.0929 1.10645C9.52887 1.10645 5.829 4.80631 5.829 9.37033C5.829 13.9344 9.52887 17.6342 14.0929 17.6342Z" stroke="#0935C4" strokeWidth="2.21354" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Arrows for Desktop */}
        <div className="hidden md:block">
          <CarouselPrevious className="bg-gradient-to-r from-[#F89C1E] to-[#E97607] text-white border-0 hover:bg-[#E97607] hover:text-white size-10 shadow-md p-0 flex items-center justify-center overflow-hidden">
            <img src={buttonScroll.src} alt="Prev" className="w-full h-full object-cover" />
          </CarouselPrevious>
          <CarouselNext className="bg-gradient-to-r from-[#F89C1E] to-[#E97607] text-white border-0 hover:bg-[#E97607] hover:text-white size-10 shadow-md p-0 flex items-center justify-center overflow-hidden">
            <img src={buttonScroll.src} alt="Next" className="w-full h-full object-cover rotate-180" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export default StaticTeacherCarousel;
