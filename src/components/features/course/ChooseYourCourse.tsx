import { FourPointedStar, FourPointedStarMini, Union } from '@/components/common/icons';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { input, output } from '@/lib/constants/content';
import { Select } from '@radix-ui/react-select';
import parse from 'html-react-parser';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

type ChooseYourCourseProps = {
  listCourses: TCourse[];
  icons: {
    lotrinh?: string;
    book?: string;
    roadmapBook?: string;
    saoThang?: string;
    bgLotrinhMobile?: string;
  };
};

const ChooseYourCourse = ({ listCourses, icons }: ChooseYourCourseProps) => {
  const [inputLevel, setInputLevel] = useState<TRoadmapCourse | null>(null);
  const [outputLevel, setOutputLevel] = useState<TRoadmapCourse | null>(null);
  const [outputMobileList, setOutputMobileList] = useState<TRoadmapCourse[] | []>(output);

  const levels = ['Số 0', 'Band 3.0', 'Band 4.0', 'Band 5.0', 'Band 6.0', 'Band 7.0', 'Band 8.0'];

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [x_2, setX_2] = useState(0);
  const [y_2, setY_2] = useState(0);
  const [x_3, setX_3] = useState(0);
  const [x_4, setX_4] = useState(0);
  const [y_4, setY_4] = useState(0);

  const handleSetInputLevel = (level: TRoadmapCourse | null) => {
    if (!level) return;
    if (level == inputLevel) return;
    setInputLevel(level);

    if (outputLevel && level.name !== 'Số 0' && levels.indexOf(level.name) >= levels.indexOf(outputLevel.name)) {
      setOutputLevel(null);
    }
  };
  const handleSetOutputLevel = (level: TRoadmapCourse | null) => {
    if (!level) {
      setOutputLevel(null);
      return;
    }
    if (!inputLevel) {
      toast.info('Vui lòng chọn đầu vào trước!', {
        className: '!bg-blue-500 !text-white',
      });
      return;
    }
    if (inputLevel.name === 'Số 0') {
      setOutputLevel(level);
      return;
    }
    if (levels.indexOf(level.name) > levels.indexOf(inputLevel.name)) {
      setOutputLevel(level);
    } else {
      toast.info(`Bạn phải chọn đầu ra cao hơn ${inputLevel.name}!`, {
        className: '!bg-blue-500 !text-white',
      });
    }
  };

  const resultSelectCourse = useMemo(
    () => (slug: string) => (outputLevel?.dataResults ?? []).find((item) => item.slug === slug),
    [outputLevel?.dataResults],
  );

  useEffect(() => {
    const handleResize = () => {
      if (!outputLevel) return;

      const element1 = document.getElementById(inputLevel?.id || '');
      const element2 = document.getElementById(outputLevel?.id || '');
      const element3 = document.getElementById('course-results');

      if (element1 && element2 && element3) {
        const container = element1.offsetParent as HTMLElement;

        if (!container) return;

        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        const rect3 = element3.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setX(rect1.right - containerRect.left);
        setY((rect1.top + rect1.bottom) / 2 - containerRect.top);

        setX_2(rect2.left - containerRect.left);
        setY_2((rect2.top + rect2.bottom) / 2 - containerRect.top);
        setX_3(rect2.right - containerRect.left);

        setX_4(rect3.left - containerRect.left);
        setY_4((rect3.top + rect3.bottom) / 2 - containerRect.top);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [inputLevel, outputLevel]);

  useEffect(() => {
    if (!outputLevel) {
      let svg = document.getElementById('arrowSvg') as SVGSVGElement | null;
      let svg_2 = document.getElementById('arrowSvg__2') as SVGAElement | null;
      if (svg && svg_2) {
        svg.querySelectorAll('polyline').forEach((line) => line.remove());
        svg_2.querySelectorAll('polyline').forEach((line) => line.remove());
      }
      return;
    }

    if (x === 0 && y === 0) return;

    let svg = document.getElementById('arrowSvg') as SVGSVGElement | null;
    let svg_2 = document.getElementById('arrowSvg__2') as SVGSVGElement | null;

    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('id', 'arrowSvg');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      document.body.appendChild(svg);
    }
    if (!svg_2) {
      svg_2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg_2.setAttribute('id', 'arrowSvg__2');
      svg_2.style.position = 'absolute';
      svg_2.style.top = '0';
      svg_2.style.left = '0';
      svg_2.style.width = '100%';
      svg_2.style.height = '100%';
      svg_2.style.pointerEvents = 'none';
      document.body.appendChild(svg_2);
    }

    svg.querySelectorAll('polyline').forEach((line) => line.remove());
    svg_2.querySelectorAll('polyline').forEach((line) => line.remove());

    const midX = (x + x_2) / 2;
    const midY = y_2;
    const midX_2 = (x_3 + x_4) / 2;
    const midY_2 = y_4;

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    arrow.setAttribute('points', `${x},${y} ${midX},${y} ${midX},${midY} ${x_2},${y_2}`);
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke', '#F97316');
    arrow.setAttribute('strokeWidth', '1.5');
    arrow.setAttribute('stroke-dasharray', '2.5');
    arrow.setAttribute('marker-end', 'url(#arrowhead)');
    svg.appendChild(arrow);
    const arrow_2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    arrow_2.setAttribute('points', `${x_3},${y_2} ${midX_2},${y_2} ${midX_2},${midY_2} ${x_4},${y_4}`);
    arrow_2.setAttribute('fill', 'none');
    arrow_2.setAttribute('stroke', '#F97316');
    arrow_2.setAttribute('strokeWidth', '1.5');
    arrow_2.setAttribute('stroke-dasharray', '2.5');
    arrow_2.setAttribute('marker-end', 'url(#arrowhead)');
    svg_2.appendChild(arrow_2);

    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
    }
    let defs_2 = svg.querySelector('defs');
    if (!defs_2) {
      defs_2 = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg_2.appendChild(defs_2);
    }

    let marker = document.getElementById('arrowhead') as SVGMarkerElement | null;

    if (!marker) {
      marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      marker.setAttribute('id', 'arrowhead');

      marker.setAttribute('markerWidth', '6');
      marker.setAttribute('markerHeight', '6');
      marker.setAttribute('refX', '6');
      marker.setAttribute('refY', '2');
      marker.setAttribute('orient', 'auto');
      marker.innerHTML = `<polygon points="0 0, 6 2, 0 6" fill="#F97316"/>`;

      defs.appendChild(marker);
    }
  }, [x, y, x_2, y_2, outputLevel]);

  useEffect(() => {
    if (!inputLevel) {
      setOutputMobileList(output);
    }
    setOutputMobileList(
      (output ?? []).filter((course) => {
        const index = levels.findIndex((lvl) => lvl === course.name);
        const inpIndex = levels.findIndex((lvl) => lvl === inputLevel?.name);
        return index > inpIndex;
      }),
    );
  }, [inputLevel]);

  return (
    <div id="build-roadmap" className="relative z-50 mx-auto w-full md:w-[1200px]">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="h-auto w-full">
          <div className="px-11">
            <div className="bg-gradient-to-b from-[#FFF8F800] to-[#B1C4FE] px-6 py-8">
              <div
                className="relative h-fit w-full space-y-3 rounded-[28px] bg-white px-3 py-6 md:px-5 md:py-16"
                style={{
                  boxShadow: '0px 1.85px 1.85px 0px #00000040',
                }}
              >
                <div>
                  <p className="mb-4 text-center text-lg font-bold text-[#D16112]">Chọn trình độ hiện tại</p>
                  <div className="relative">
                    <Select
                      onValueChange={(field) => handleSetInputLevel(input.find((item) => item.id === field) || null)}
                      value={inputLevel?.id}
                    >
                      <SelectTrigger
                        className="w-full cursor-pointer appearance-none rounded-[28px] border-none bg-[#052284] text-[15px] font-medium text-white"
                        style={{
                          boxShadow: '0px 1.41px 1.41px 0px #00000040',
                        }}
                      >
                        <SelectValue className="text-[15px] text-[#504E4E]" placeholder="Chọn lộ trình" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {(input ?? []).map((course, index) => (
                            <SelectItem key={course.name} value={course.id}>
                              {index === 0 ? `Mới bắt đầu - ${course.name}` : course.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="relative left-1/2 h-4 w-[120%] -translate-x-1/2 border-b border-[rgba(113,113,113,0.18)]" />
                <div>
                  <p className="mb-4 text-center text-lg font-bold text-[#D16112]">Chọn đầu ra mong muốn</p>

                  <div className="relative">
                    <Select
                      onValueChange={(field) => handleSetOutputLevel(output.find((item) => item.id === field) || null)}
                      value={outputLevel?.id}
                    >
                      <SelectTrigger
                        className="w-full cursor-pointer appearance-none rounded-[28px] border-none bg-[#052284] text-[15px] font-medium text-white"
                        style={{
                          boxShadow: '0px 1.41px 1.41px 0px #00000040',
                        }}
                      >
                        <SelectValue className="text-[#504E4E]" placeholder="Hãy chọn đầu ra" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {(outputMobileList ?? []).map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[100%]">
                  <div className="h-20 w-[2px] border-l-[1px] border-dashed border-[#052284] sm:border-l-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full rounded-[28px] bg-gradient-to-b from-[#052284] to-[#083AD4] px-[18px] pb-[30px] pt-[18px]">
            <div className="flex flex-wrap gap-x-4 gap-y-4 pl-[18px]">
              <div className="w-fit rounded-[28px] bg-white py-1 pl-4 pr-6 sm:py-2 sm:pl-6 sm:pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0%] text-black sm:text-2xl">
                  {`#ĐẦU VÀO ${inputLevel?.name || '...'}`}
                </p>
              </div>
              <div className="w-fit rounded-[28px] bg-white py-1 pl-4 pr-6 sm:py-2 sm:pl-6 sm:pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0%] text-black sm:text-2xl">
                  {`#ĐẦU RA ${outputLevel?.name || '...'}`}
                </p>
              </div>
              <div className="w-fit rounded-[28px] bg-white py-1 pl-4 pr-6 sm:py-2 sm:pl-6 sm:pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0%] text-black sm:text-2xl">
                  #LỘ TRÌNH GỢI Ý...
                </p>
              </div>
            </div>
            <div className="relative mt-4 h-auto w-full rounded-[18px] bg-white p-6 sm:p-8">
              <div className="absolute -top-[90px] right-[10%] translate-x-[20%] translate-y-[48%] 3xl:translate-x-[40%]">
                <img
                  className="h-auto w-[90px] md:w-[141px]"
                  width={141}
                  height={138}
                  src={icons.roadmapBook}
                  alt={'roadmapBook'}
                />
              </div>
              {inputLevel && outputLevel ? (
                <div>
                  <p className="text-[15px] font-bold text-primary">LỘ TRÌNH GỢI Ý...</p>
                  <div className="flex gap-4 pt-4">
                    {/* <img
                      className="h-[23px] w-[23px] sm:h-9 sm:w-9"
                      width={0}
                      height={0}
                      src={icons.lotrinh}
                      alt={'lotrinh'}
                    /> */}
                    <p className="whitespace-pre-line text-xs font-medium">
                      {parse(resultSelectCourse(inputLevel.slug)?.sugges ?? '')}
                    </p>
                  </div>
                  <p className="mt-6 text-[15px] font-bold text-primary">Mục tiêu khóa học ....</p>
                  <p className="whitespace-pre-line text-xs font-medium">
                    {parse(resultSelectCourse(inputLevel.slug)?.knowledg ?? '')}
                  </p>
                </div>
              ) : (
                <div className="mx-auto w-fit p-5">
                  <p className="text-xs font-medium italic text-gray-400 sm:text-lg">
                    Chọn đầu vào và đầu ra để nhận lộ trình gợi ý
                  </p>
                </div>
              )}
            </div>
            <div className="absolute left-1/2 top-0 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white sm:h-8 sm:w-8">
              <div className="h-[16px] w-[16px] rounded-full bg-primary sm:h-5 sm:w-5"></div>
            </div>
          </div>
        </div>
      </div>
      {/* PC */}
      <div className="hidden lg:block">
        <div className="mb-4">
          <div className="flex">
            <div className="relative flex-1 border-b-[3.23px] border-black py-10 text-center">
              <p className="text-[52px] font-bold leading-[91.83px] tracking-[0] text-[#373737]">B1</p>
              <h3 className="text-2xl font-bold uppercase leading-[32px] tracking-[0]">Chọn đầu vào</h3>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[0.81px] border-black bg-white p-2">
                  {inputLevel && <Union color="#052284" />}
                </div>
              </div>
            </div>
            <div className="relative w-[32%] border-b-[3.23px] border-black py-10 text-center">
              <p className="text-[52px] font-bold leading-[91.83px] tracking-[0] text-[#FFA10A]">B2</p>
              <h3 className="text-2xl font-bold uppercase leading-[32px] tracking-[0]">Chọn đầu ra mong muốn</h3>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[0.81px] border-black bg-white p-2">
                  {outputLevel && <Union color="#052284" />}
                </div>
              </div>
            </div>
            <div className="relative w-[40%] border-b-[3.23px] border-black py-10 text-center">
              <p className="text-[52px] font-bold leading-[91.83px] tracking-[0] text-[#052284]">B3</p>
              <h3 className="text-2xl font-bold uppercase leading-[32px] tracking-[0]">
                Trả kết quả lộ trình phù hợp{' '}
              </h3>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[0.81px] border-black bg-white p-2">
                  {inputLevel && outputLevel && <Union color="#052284" />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex select-none justify-between gap-0 xl:gap-0">
          <svg id="arrowSvg" className="pointer-events-none absolute top-0 z-20 h-full w-full"></svg>
          <svg id="arrowSvg__2" className="pointer-events-none absolute top-0 z-20 h-full w-full"></svg>
          {/* B1 - Chọn đầu vào */}
          <div className="flex flex-col items-center">
            <div className="mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:w-[297px]">
              {input.map((level) => (
                <div
                  key={level.name}
                  id={level.id}
                  className={`relative block min-h-[120px] w-full max-w-[320px] rounded-lg border px-3 py-4 text-left ${inputLevel === level
                    ? 'bg-gradient-to-b from-[#052284] to-[#083AD4] text-white'
                    : 'bg-white text-black'
                    } cursor-pointer shadow-[0px_3.23px_3.23px_0px_rgba(0,0,0,0.25)]`}
                  onClick={() => handleSetInputLevel(level)}
                >
                  <div className="relative pl-8">
                    <div className="text-[20px] font-bold tracking-[0] 3xl:leading-[35.52px]">{level.name}</div>
                    <p className="text-[11px] font-medium leading-[130%] tracking-[0]">{level.content}</p>
                    <div
                      className={`absolute left-0 top-9 h-5 w-5 rounded-full border ${inputLevel === level ? 'border-white bg-[#052284]' : 'border-black'
                        } p-[2px]`}
                    >
                      <div className="h-full w-full rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B2 - Chọn đầu ra */}
          <div className="relative flex w-[26%] flex-col items-center 2xl:w-[30%]">
            <div className="mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:w-[297px]">
              {output.map((level) => (
                <div
                  id={level.id}
                  key={level.name}
                  className={`relative mx-auto block min-h-[120px] w-full max-w-[320px] rounded-lg border px-3 py-4 text-left ${outputLevel === level
                    ? 'bg-gradient-to-b from-[#052284] to-[#083AD4] text-white'
                    : 'bg-white text-black'
                    } cursor-pointer shadow-[0px_3.23px_3.23px_0px_rgba(0,0,0,0.25)]`}
                  onClick={() => handleSetOutputLevel(level)}
                >
                  <div className="relative pl-8">
                    <div className="text-[20px] font-bold tracking-[0] 3xl:leading-[35.52px]">{level.name}</div>
                    <p className="text-[11px] font-medium leading-[130%] tracking-[0]">{level.content}</p>
                    <div
                      className={`absolute left-0 top-9 h-5 w-5 rounded-full border ${outputLevel === level ? 'border-white bg-[#052284]' : 'border-black'
                        } p-[2px]`}
                    >
                      <div className="h-full w-full rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* B3 - Trả kết quả */}
          <div className="flex w-[40%] justify-center pt-4 2xl:w-[468px]">
            <div
              id="course-results"
              className="relative flex h-full w-full flex-col space-y-4 rounded-[10px] bg-gradient-to-b from-[#052284] to-[#083AD4] px-6 py-6 xl:space-y-4 xl:px-4"
            >
              <div className="flex flex-wrap gap-2">
                <p className="text-base font-black uppercase text-white">CHI TIẾT LỘ TRÌNH</p>
              </div>
              <div className="w-full flex-1 flex-grow rounded-[11px] bg-white p-6 py-4 xl:px-7">
                {inputLevel && outputLevel ? (
                  <div>
                    <p className="text-2xl font-bold uppercase tracking-[0] text-[#052284] xl:text-3xl">
                      Lộ trình gợi ý
                    </p>
                    <div className="flex gap-4 pt-4">
                      {/* <img
                        className="h-9 w-9 xl:h-[42px] xl:w-[42px]"
                        width={0}
                        height={0}
                        src={icons.lotrinh}
                        alt={'lotrinh'}
                      /> */}
                      <p className="custom-scrollbar h-[200px] overflow-y-scroll text-sm font-medium tracking-normal text-black">
                        {parse(resultSelectCourse(inputLevel.slug)?.sugges || '...')}
                      </p>
                    </div>
                    <p className="pt-3 text-2xl font-bold uppercase tracking-[0] text-[#052284] xl:pt-6 xl:text-3xl">
                      Kiến thức đạt được
                    </p>
                    <p className="custom-scrollbar mt-4 h-[200px] overflow-y-scroll text-sm font-medium tracking-normal text-black">
                      {parse(resultSelectCourse(inputLevel.slug)?.knowledg || '...')}
                    </p>
                  </div>
                ) : (
                  <p className="text-base font-medium leading-[20.94px] tracking-[0] text-black">
                    Hãy chọn khóa học để biết thêm chi tiết.
                  </p>
                )}
              </div>
              <div className="absolute -right-10 bottom-[34px] translate-x-[20%] translate-y-[48%] 3xl:translate-x-[40%]">
                <img
                  className="h-auto w-[90px] md:w-[141px]"
                  width={141}
                  height={138}
                  src={icons.roadmapBook}
                  alt={'roadmapBook'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-4 mb-[20px] md:mb-0 flex w-fit items-center justify-center md:mt-12">
        <div className="absolute -left-10 top-1 z-50 flex w-fit md:-left-28 md:-top-8">
          <FourPointedStarMini
            className="absolute bottom-6 right-7 mt-auto size-4 md:-bottom-3 md:-right-6 md:size-6"
            fromColor="#FFC247"
            toColor="#FFE9A6"
          />
          <FourPointedStar className="size-8 md:size-[60px]" fromColor="#FFC247" toColor="#FFE9A6" />
        </div>
        <button
          onClick={() => document.getElementById('dang-ki-tu-van')?.scrollIntoView({ behavior: 'smooth' })}
          className="mx-auto h-10 cursor-pointer rounded-[20px] bg-[#F97316] px-5 text-[15px] font-black uppercase text-white transition-all duration-700 ease-in-out hover:from-[#B90E0A] hover:to-[#F3C650] md:h-[60px] md:rounded-[28px] md:px-10 md:text-2xl"
        >
          Nhận tư vấn lộ trình chi tiết
        </button>
      </div>
    </div>
  );
};

export default ChooseYourCourse;

const Thang = ({ icon }: { icon?: string }) => {
  return (
    <div className="flex h-full items-center">
      <img
        className="h-4 w-4 translate-y-[2px] object-contain sm:h-8 sm:w-8"
        width={32}
        height={32}
        src={icon}
        alt={'thang'}
      />
    </div>
  );
};
