import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Plus } from 'lucide-react';

import imgGv1 from '/src/assets/images/img-hocba-tienganh/gv-1.png';
import imgGv2 from '/src/assets/images/img-hocba-tienganh/img-gv-2.png';
import imgGv3 from '/src/assets/images/img-hocba-tienganh/gv-3.png';
import imgGv4 from '/src/assets/images/img-hocba-tienganh/img-gv-4-Mai-Thu-Trang.png';
import iconSearch from '/src/assets/images/img-hocba-tienganh/icon-search.png';
import buttonScroll from '/src/assets/images/img-hocba-tienganh/button-scroll.png';

const TEACHERS = [
  {
    badgeTop: 'LISTENING',
    badgeBottom: '8.5',
    image: imgGv1.src,
    name: 'THẠC SĨ LINH PHƯƠNG',
    title: '12 Năm Kinh Nghiệm Giảng Dạy',
    description: 'Thạc sĩ Đại học Kinh tế Quốc dân, Cử\nnhân Đại học Khoa học Ứng dụng\nKymenlaakso, Phần Lan (Học bổng)'
  },
  {
    badgeTop: 'OVERALL',
    badgeBottom: '8.5',
    image: imgGv2.src,
    name: 'GIẢNG VIÊN YẾN CHI',
    title: 'Hơn 10 Năm Kinh Nghiệm Giảng Dạy Chứng Chỉ IELTS Và TOEIC',
    description: '2 lần đạt 8.5 IELTS, Đại sứ bài thi IELTS\ntrên máy tính 2023 của IDP, Cố vấn\nHọc thuật của nhiều đơn vị'
  },
  {
    badgeTop: 'GIẢNG VIÊN',
    badgeBottom: 'BẢN XỨ',
    image: imgGv3.src,
    name: 'GIẢNG VIÊN JACKSON HOWARD',
    title: 'Cựu Giám Khảo Bài Thi IELTS',
    description: '20 năm kinh nghiệm giảng dạy và\nluyện thi tiếng Anh cho học sinh thế\ngiới, Cựu Trưởng khoa Tiếng Anh\nTrường Western Sydney University'
  },
  {
    badgeTop: 'OVERALL',
    badgeBottom: '8.5',
    image: imgGv4.src,
    name: 'GIẢNG VIÊN THU TRANG',
    title: '4+ năm kinh nghiệm giảng dạy \n IELTS',
    description: 'Cử nhân xuất sắc Đại học Kinh tế \n Quốc Dân, Thành viên dự án nâng \n cao năng lực ngoại ngữ cho giáo viên \n của Sở Giáo dục Hà Nội, SAT 1430',
  },
];

const StaticTeacherCarousel = () => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <Carousel
        className="relative w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 pb-12">
          {TEACHERS.map((teacher, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[280px] md:basis-1/3">
              <div className="group relative flex flex-col items-center h-full rounded-[24px] bg-[#0A3BCE] hover:bg-[#1E50FF] hover:shadow-[15px_15px_30px_-5px_rgba(30,80,255,0.4)] transition-all duration-300 pt-6 pb-8 mx-2 md:mx-3 px-3 md:px-4 shadow-lg mt-4 cursor-pointer">
                {/* Background overlay for clipping glow but not the + icon */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  {/* Large Background Circle behind avatar (Figma exact match) */}
                  <div 
                    className="absolute top-6 left-1/2 -translate-x-1/2 size-[250px] md:size-[286px] rounded-full"
                    style={{
                      background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(8, 59, 212, 0) 62.47%, rgba(162, 185, 255, 0.35) 86.84%, rgba(162, 185, 255, 0) 100%)'
                    }}
                  />
                </div>

                {/* Badge */}
                <div className="absolute left-3 md:left-5 top-4 md:top-7 z-30 flex flex-col items-center justify-center rounded-[8px] border-[1.5px] border-white/90 bg-gradient-to-b from-[#FFA73A] to-[#FF8C00] px-2 py-1 md:px-2.5 md:py-1.5 shadow-md">
                  <span className="text-[7px] font-bold text-white md:text-[9px] tracking-wide">
                    {teacher.badgeTop}
                  </span>
                  <span className="text-lg font-black leading-none text-white md:text-xl mt-0.5">
                    {teacher.badgeBottom}
                  </span>
                  {/* Decorative circles (bubbles) below the badge */}
                  <div className="absolute -bottom-4 left-3 size-[12px] rounded-full border-[1.5px] border-white/70 bg-transparent" />
                  <div className="absolute -bottom-6 left-6 size-[8px] rounded-full border-[1.5px] border-white/50 bg-transparent" />
                </div>

                {/* Avatar */}
                <div className="relative h-[160px] md:h-[190px] z-20 w-full flex justify-center items-end mt-1">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-auto object-contain object-bottom"
                      loading="lazy"
                    />
                  </div>

                {/* White Info Box */}
                <div className="relative z-20 -mt-6 w-[105%] flex flex-col items-center justify-center rounded-xl bg-white px-4 py-5 md:py-6 text-center shadow-md min-h-[110px]">
                  <h3 className="text-base font-black text-[#0935C4] md:text-xl uppercase tracking-tight">
                    {teacher.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-bold text-gray-800 md:text-base leading-snug">
                    {teacher.title}
                  </p>
                </div>

                <p className="mt-5 mb-2 text-center text-[12px] sm:text-[14px] md:text-[16px] text-white px-1 md:px-4 leading-relaxed font-medium flex flex-col items-center">
                  {teacher.description.split('\n').map((line, i) => (
                    <span key={i} className="whitespace-nowrap">{line}</span>
                  ))}
                </p>

                {/* Search / Plus icon button at the bottom */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 cursor-pointer">
                    <img src={iconSearch.src} alt="Search" className="size-5" />
                  </div>
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
