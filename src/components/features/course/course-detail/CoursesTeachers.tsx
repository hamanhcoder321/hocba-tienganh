import CourseDetailTeacherSlider from '@/components/features/course/course-detail/CourseDetailTeacherSlider';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

type CoursesTeachersProps = {
  dataTeacher: TLecturer[];
  images: {
    profilePic: string;
  };
};

const CoursesTeachers = ({ dataTeacher, images }: CoursesTeachersProps) => {
  const [selectedTeacher, setSelectedTeacher] = useState<TLecturer>(dataTeacher[0]);
  const [isLoadingimgs, setIsLoadingimgs] = useState(false);

  useEffect(() => {
    setSelectedTeacher(dataTeacher[0]);
  }, [dataTeacher]);

  const handleimgClick = (teacher: TLecturer) => {
    if (teacher.id !== selectedTeacher?.id) {
      setIsLoadingimgs(true);
      setSelectedTeacher(teacher);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-[hsla(0,0%,55%,0.1)]">
      <div className="space-y-4 pt-10 lg:pb-20 lg:pt-[120px] xl:space-y-12">
        <div className="xl:w-wrapSmall 3xl:w-wrapBox container mx-auto lg:grid lg:grid-cols-3 lg:gap-20">
          <h2 className="col-span-1 px-4 text-center text-4xl font-bold lg:p-0 lg:text-left">
            <span className="w-full xl:inline-flex">Đội ngũ giáo viên </span>
            <span className="text-[#6B0806]">TOP đầu ngành</span>
          </h2>
          <div className="col-span-2 max-w-3xl px-4 pt-4 text-center text-lg text-[hsl(207,5%,52%)] lg:p-0 lg:text-left">
            Tại Học Bá, đội ngũ giảng viên luyện thi có trình độ chuyên môn cao và kỹ năng sư phạm vững chắc luôn đặt
            mục tiêu tạo ra môi trường học tập tối ưu giúp học viên đạt điểm nhanh nhất trong các kỳ thi chính thức.
          </div>
        </div>
        <div className="mx-auto w-screen overflow-hidden sm:pb-4 sm:pt-8">
          <CourseDetailTeacherSlider dataTeacher={dataTeacher} images={images} onSelectedTeacher={setSelectedTeacher} />
        </div>
        <div className="flex justify-center px-2 lg:px-0">
          <div className="my-4 w-full rounded-3xl bg-white p-4 lg:my-10 lg:min-h-[700px] lg:w-[1173px] lg:p-[31px] 3xl:w-[1400px]">
            <div className="gap-2 pb-6 text-2xl font-semibold text-blue-950 lg:inline-flex">
              Đội ngũ giáo viên <span className="text-[#6B0806]"> "cực đỉnh" </span> tại{' '}
              <span className="text-[#6B0806]">HỌC BÁ</span>
            </div>
            <div className="gap-10 lg:grid lg:grid-cols-6">
              <div className="col-span-2 flex h-full w-full items-end justify-center pb-4 sm:px-20 md:px-0 md:pt-5 lg:pb-[120px]">
                <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-3xl bg-red-50 sm:w-[65%] lg:w-full">
                  {isLoadingimgs && (
                    <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-3xl bg-gray-400" />
                  )}
                  <img
                    key={`avatar-${selectedTeacher?.id}`}
                    width={300}
                    height={584}
                    className="h-full w-full object-contain"
                    src={selectedTeacher?.optimizedAvatar || images.profilePic}
                    alt={'profilePic'}
                    onLoad={() => setIsLoadingimgs(false)}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-span-4 space-y-3">
                <p className="text-3xl font-bold text-[#6B0806]">{selectedTeacher?.name}</p>
                <div className="grid-cols-2 gap-x-5 space-y-4 md:grid md:space-y-0">
                  {selectedTeacher?.qualification?.map((skill, index) => (
                    <div key={index} className="group col-span-1 pt-4">
                      <span className="text-lg font-bold">
                        {index + 1}. {skill?.name}
                      </span>
                      <p className="relative line-clamp-2 overflow-hidden text-base transition-all duration-300 ease-in-out group-hover:line-clamp-none">
                        {skill?.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="gap-4 py-2 lg:grid lg:grid-cols-2">
                  <Button className="pointer-events-none col-span-1 rounded-2xl bg-[#6B0806] text-sm">
                    Chia sẻ kinh nghiệm
                  </Button>
                </div>
                <div className="min-h-[60px]">
                  <p className="text-sm italic">{selectedTeacher?.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {isLoadingimgs ? (
                    <>
                      <Skeleton className="col-span-1 aspect-square rounded-2xl bg-gray-300" />
                      <Skeleton className="col-span-1 aspect-square rounded-2xl bg-gray-300" />
                      <Skeleton className="col-span-1 aspect-square rounded-2xl bg-gray-300" />
                    </>
                  ) : selectedTeacher?.optimizedAlbum?.length === 0 ? (
                    <div className="col-span-1 flex aspect-square justify-center overflow-hidden rounded-2xl bg-gray-300">
                      <img
                        width={200}
                        height={200}
                        className="h-auto w-full object-cover"
                        src={images.profilePic}
                        alt={'img'}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    selectedTeacher?.optimizedAlbum?.map((item, index) => (
                      <div
                        key={`album-${selectedTeacher?.id}-${index}`}
                        className="col-span-1 flex aspect-square justify-center overflow-hidden rounded-2xl bg-gray-300"
                      >
                        <img
                          width={200}
                          height={200}
                          className="h-full w-full object-cover object-top"
                          src={item || images.profilePic}
                          alt={item}
                          loading="lazy"
                        />
                      </div>
                    ))
                  )}
                </div>
                <div className="space-y-6">
                  <span className="font-bold">Các giáo viên khác</span>
                  <div className="w-full px-4">
                    <Carousel>
                      <CarouselContent>
                        {dataTeacher?.map((teacher, index) => (
                          <CarouselItem key={index} onClick={() => setSelectedTeacher(teacher)} className="basis-auto">
                            <div
                              className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-full lg:size-[100px] ${
                                selectedTeacher?.id === teacher.id ? 'grayscale-0' : 'grayscale'
                              } bg-red-50`}
                            >
                              <img
                                width={100}
                                height={100}
                                className={`size-full cursor-pointer object-cover object-top`}
                                onClick={() => handleimgClick(teacher)}
                                src={teacher?.optimizedAvatar || images.profilePic}
                                alt={'profilePic'}
                                loading="lazy"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="absolute left-[-25px] bg-none disabled:opacity-0 lg:hidden" />
                      <CarouselNext className="absolute right-[-25px] disabled:opacity-0 lg:hidden" />
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesTeachers;
