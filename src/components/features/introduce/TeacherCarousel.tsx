import { EllipseDngv } from '@/components/common/icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { SearchX } from 'lucide-react';

interface Teacher {
  name: string;
  avatar: ImageMetadata;
  content: string;
  course: string;
  level: string;
  skill: string;
}

interface TeacherCarouselProps {
  teachers: TLecturer[];
}

const TeacherCarousel = ({ teachers }: TeacherCarouselProps) => {
  return (
    <div className="relative w-full">
      <Carousel
        className="relative"
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent className="-ml-2 mr-2 pb-14 md:-ml-5 md:pb-20">
          {teachers.map((teacher, index) => (
            <CarouselItem key={index} className="ml-2 mr-2 basis-[212px] pl-4 md:ml-5 md:mr-5 md:basis-[344px]">
              <div className="relative flex h-[288px] w-[212px] select-none flex-col items-center justify-start gap-6 rounded-[12px] bg-gradient-to-b from-[#F37B50] to-[#B90E0A] md:h-[450px] md:w-[344px] md:justify-center md:gap-3">
                <div className="relative h-[182px] w-[212px] md:h-[286px] md:w-[286px]">
                  <EllipseDngv className="absolute left-1/2 top-3 z-0 size-[182px] -translate-x-1/2 md:top-0 md:size-[286px]" />
                  <div className="absolute left-2 top-2 z-20 flex w-fit flex-col items-center rounded-lg border border-white bg-gradient-to-r from-[#7D1900] to-[#B90E0A] px-2 pb-2 md:left-0 md:top-0 md:rounded-xl">
                    <span className="text-[8px] font-bold text-white md:text-base">
                      {teacher.tags?.scope?.[0] || 'HSK'}
                    </span>
                    <span className="text-xs font-black leading-3 text-white md:text-[18px] md:leading-6">
                      {teacher.tags?.qualification?.[0] || '6'}
                    </span>
                    <div className="absolute -bottom-5 left-0 size-3 rounded-full bg-gradient-to-r from-[#7D1900] to-[#B90E0A] opacity-50 md:size-4" />
                    <div className="absolute -bottom-6 left-5 size-2 rounded-full bg-gradient-to-r from-[#7D1900] to-[#B90E0A] opacity-50" />
                  </div>
                  <div className='w-[136px] md:w-[218px] h-[144px] md:h-[256px] absolute left-1/2 top-2/3 z-10 -translate-x-1/2 -translate-y-2/3'>
                    <img
                      src={teacher.optimizedAvatar || teacher.avatar_url?.file_path}
                      alt={teacher.name}
                      width={218}
                      height={256}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain object-top"
                    />
                  </div>
                  <div className="absolute left-1/2 top-[130px] z-20 flex min-h-[70px] w-[186px] -translate-x-1/2 flex-col items-center justify-start rounded-lg bg-white px-2 py-2 capitalize md:top-[186px] md:min-h-[100px] md:w-[277px] md:rounded-xl md:px-6">
                    <h3 className="text-nowrap text-base font-black text-primary md:text-xl">{teacher.name}</h3>
                    <p className="px-4 text-center text-xs font-bold text-[#373737] md:px-0 md:text-lg">
                      {`${teacher.total_student ?? 99}+ Học viên đạt từ ${teacher.tags?.qualification?.[0] || 'HSK6'} trở lên`}
                    </p>
                  </div>
                </div>
                <div className="px-4 text-center text-xs text-white md:px-10 md:text-base">{teacher.title}</div>
                <div className="absolute -bottom-6 left-0 flex h-[42px] w-full justify-center">
                  <a href={`/doi-ngu-giang-vien/${teacher.slug}`} className="cursor-pointer group flex size-[42px] items-center justify-center rounded-full bg-white shadow-gold transition-all duration-300 [perspective:800px] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:scale-110 hover:shadow-gold-hover">
                    <div className="relative size-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <SearchX className="absolute inset-0 m-auto rotate-90 text-gray-400 [backface-visibility:hidden]" />
                      <SearchX className="absolute inset-0 m-auto text-primary [backface-visibility:hidden] [transform:rotateY(180deg)]" />
                    </div>
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TeacherCarousel;
