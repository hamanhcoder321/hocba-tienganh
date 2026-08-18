import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { GraduationCap, UsersRound } from 'lucide-react';
import { useRef, useState } from 'react';

interface CourseDetailTeacherSliderProps {
  dataTeacher: TLecturer[];
  images: Record<string, string>;
  onSelectedTeacher: (teacher: TLecturer) => void;
}

export default function CourseDetailTeacherSlider({
  dataTeacher,
  images,
  onSelectedTeacher,
}: CourseDetailTeacherSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // useEffect(() => {
  //   if (!api) return;

  //   const startAutoplay = () => {
  //     autoplayRef.current = setInterval(() => {
  //       api.scrollNext();
  //     }, 3000);
  //   };

  //   const stopAutoplay = () => {
  //     if (autoplayRef.current) {
  //       clearInterval(autoplayRef.current);
  //     }
  //   };

  //   startAutoplay();

  //   api.on('pointerDown', stopAutoplay);

  //   return () => {
  //     stopAutoplay();
  //     api.off('pointerDown', stopAutoplay);
  //   };
  // }, [api]);

  if (!dataTeacher || dataTeacher.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Không có giáo viên nào được tìm thấy.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <Carousel
        opts={{
          loop: true,
          align: 'start',
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {dataTeacher.map((teacher) => (
            <CarouselItem key={teacher.id} className="ml-4 mr-4" style={{ flexBasis: '256px', flexShrink: 0 }}>
              <div
                onClick={() => onSelectedTeacher(teacher)}
                className="group relative flex h-[313px] w-[256px] cursor-pointer select-none flex-col items-start justify-end overflow-hidden rounded-xl transition-all duration-300"
              >
                {/* Overlay */}
                <div className="absolute left-0 top-0 h-full w-full bg-slate-800 bg-opacity-95 transition-opacity duration-300 group-hover:bg-opacity-80"></div>

                {/* Avatar Image */}
                <div className="absolute left-0 top-0 flex h-[313px] w-[256px] justify-center pt-3">
                  <img
                    width={500}
                    height={313}
                    className="h-full w-full object-contain"
                    src={teacher.optimizedAvatar || images.profilePic}
                    alt={teacher?.name || 'Teacher'}
                    loading="lazy"
                  />
                </div>

                {/* Teacher Info */}
                <div className="relative z-10 flex w-full flex-col gap-2 bg-gradient-to-b from-black/0 to-black/80 p-4 pt-10 text-white transition-all duration-300 group-hover:pt-12">
                  <h3 className="line-clamp-2 text-lg font-bold xl:text-xl">{teacher?.name}</h3>
                  {teacher?.qualification && teacher.qualification.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-1 text-xs">{teacher.qualification[0]?.name}</span>
                    </div>
                  )}
                  {teacher?.total_student && (
                    <div className="flex items-center gap-2 text-sm">
                      <UsersRound className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">{teacher.total_student} học viên</span>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
