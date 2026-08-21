import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Plus } from 'lucide-react';

import imgGv1 from '/src/assets/images/img-hocba-tienganh/gv-1.png';
import imgGv2 from '/src/assets/images/img-hocba-tienganh/img-gv-2.png';
import imgGv3 from '/src/assets/images/img-hocba-tienganh/gv-3.png';
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
    badgeTop: 'GIẢNG VIÊN',
    badgeBottom: 'BẢN XỨ',
    image: imgGv3.src,
    name: 'GIẢNG VIÊN JACKSON HOWARD',
    title: 'Cựu Giám Khảo Bài Thi IELTS',
    description: '20 năm kinh nghiệm giảng dạy và\nluyện thi tiếng Anh cho học sinh thế\ngiới, Cựu Trưởng khoa Tiếng Anh\nTrường Western Sydney University'
  },
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
  }
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
              <div className="relative flex flex-col items-center h-full rounded-[24px] bg-[#0A3BCE] pt-12 pb-12 px-4 md:px-6 shadow-lg mt-4">
                {/* Background overlay for clipping glow but not the + icon */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  {/* Large Background Circle behind avatar */}
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 size-[250px] md:size-[280px] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-none border border-white/10" />
                </div>

                {/* Badge */}
                <div className="absolute left-2 md:left-4 top-6 z-30 flex flex-col items-center justify-center rounded-xl border-[2px] border-white/90 bg-gradient-to-b from-[#FFA73A] to-[#FF8C00] px-3 py-1.5 shadow-md">
                  <span className="text-[8px] font-bold text-white md:text-[10px] tracking-wide">
                    {teacher.badgeTop}
                  </span>
                  <span className="text-xl font-black leading-none text-white md:text-2xl mt-0.5">
                    {teacher.badgeBottom}
                  </span>
                  {/* Decorative circles (bubbles) below the badge */}
                  <div className="absolute -bottom-4 left-1 size-[12px] rounded-full border-[1.5px] border-white/70 bg-transparent" />
                  <div className="absolute -bottom-6 left-4 size-[8px] rounded-full border-[1.5px] border-white/50 bg-transparent" />
                </div>

                {/* Avatar */}
                <div className="relative h-[200px] md:h-[240px] z-20 w-full flex justify-center items-end mt-2">
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

                <p className="mt-6 mb-2 text-center text-[14px] text-white md:text-[17px] px-4 leading-relaxed font-medium whitespace-pre-line">
                  {teacher.description}
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
