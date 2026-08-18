import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

import { ScheduleBannerNuaDuongTron, WwBlueIcon } from '@/components/common/icons';
import RegisterStudyModal from '@/components/common/RegisterStudyModal';
import { useGetOpeningSchedule } from '@/hooks/features/use-schedule';
import { HOME_CATEGORIES } from '@/lib/constants/content';
import { ChevronDown } from 'lucide-react';

const tabs = ['Trình độ', 'Mục tiêu', 'Sĩ số', 'Ca học'];

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const validateWeek = (days: string[]) => {
  if (days[0] === 'CN') return 'CN';
  return days.join(', ');
};

type Shift = {
  id: number;
  end_time: string;
  start_time: string;
  status: number;
};

const validateShift = (shifts: Shift[], isMobile = false) => {
  if (!shifts.length) return '';
  return shifts.map((item) => `${item.start_time} - ${item.end_time}`).join(isMobile ? ', ' : ',\n');
};

type SelectStringValueOptionType = {
  value: string;
  label: string;
};

const MoreButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="relative mx-auto flex w-fit cursor-pointer items-center gap-4 rounded-[32px] border bg-[#E4E4E48F] px-5 py-2 sm:px-10 3xl:px-14"
  >
    <span className="pr-5 text-[15.39px] font-medium leading-[1] text-black/50 sm:text-xl xl:text-xl 3xl:text-[30.34px]">
      Xem thêm
    </span>
    <div className="absolute right-4">
      <img
        className="h-[17px] w-auto sm:h-[22px] xl:h-[24px] 3xl:h-[32px]"
        width={0}
        height={0}
        sizes="100vw"
        src={'/imgs/LichKhaiGiang/Down.png'}
        alt={'down'}
      />
    </div>
  </div>
);

type TimeTableProps = {
  icons: {
    sao_thang?: string;
    huy_chuong?: string;
    slider?: string;
    buoihoc?: string;
    cahoc?: string;
    giangvien?: string;
  };
  initialScheduleData?: Record<string, TSchedule[]>;
  teacherLists?: TLecturer[];
  autoRefresh?: boolean;
  refreshInterval?: number;
};

const TimeTable = ({
  icons,
  initialScheduleData = {},
  teacherLists = [],
  autoRefresh = false,
  refreshInterval = 5 * 60 * 1000,
}: TimeTableProps) => {
  const [maxLenArr, setMaxLenArr] = useState<number>(7);
  const [category, setCategory] = useState<any>(HOME_CATEGORIES[0]);
  const { data: scheduleData = [], isLoading, refetch: handleRefresh } = useGetOpeningSchedule(String(category.id));
  const [teacherOptions, setTeacherOptions] = useState<SelectStringValueOptionType[]>([]);

  useEffect(() => {
    if (!teacherLists || !teacherLists?.length) return;
    const newOption = teacherLists.map((teacher: any) => ({
      ...teacher,
      value: teacher.id,
      label: teacher.name,
    }));
    setTeacherOptions(newOption);
  }, [teacherLists]);

  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      handleRefresh();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, handleRefresh]);

  const handleSetCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = HOME_CATEGORIES.find((item) => item.id === Number(event.target.value));
    setCategory(selectedCategory || HOME_CATEGORIES[0]);
  };

  const handleMaxLenArr = () => setMaxLenArr((prev) => prev + 7);

  const handleScrollToForm = () => {
    const formRegister = document.getElementById('form-register-time');
    if (formRegister) {
      formRegister.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  if (isLoading) return <p className="mx-auto w-fit">Đang tải...</p>;

  const scheduleFormat = (scheduleData || []).sort((a: TSchedule, b: TSchedule) => {
    const dateA = new Date(a.start_date).toISOString().split('T')[0];
    const dateB = new Date(b.start_date).toISOString().split('T')[0];
    return dateA.localeCompare(dateB);
  });

  const renderMobile = () => (
    <div className="lg:hidden">
      <div className="uppercase">
        <div className="mx-auto flex w-fit items-center gap-2">
          <img className="h-auto w-[12px] sm:w-[24px]" width={32} height={32} src={icons.sao_thang} alt={'*'} />
          <p className="text-[30.5px] font-semibold leading-[100%] tracking-normal text-[#AF0000] sm:text-[60px]">
            Chọn lịch học
          </p>

          <img
            className="h-auto w-[12px] sm:w-[24px]"
            width={0}
            height={0}
            sizes="100vw"
            src={icons.sao_thang}
            alt={'*'}
          />
        </div>
        <div className="to-landing mx-auto w-fit bg-gradient-to-b from-[#FFA35C] bg-clip-text py-3 text-transparent">
          <p className="text-[30.5px] font-black uppercase leading-[100%] tracking-normal sm:text-[60px]">
            {' '}
            phù hợp nhất với bạn
          </p>
        </div>
      </div>
      <div className="relative mx-8 my-4 w-fit rounded-[5px] border border-dashed border-primary p-4 text-center sm:my-6">
        <p className="text-center text-sm font-normal leading-[100%] tracking-normal text-primary sm:text-2xl">
          Lịch học với thời gian linh hoạt trong tuần giúp bạn thoải mái trong việc sắp xếp thời gian học tập tốt nhất
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <img
            className="h-auto w-[34px] sm:w-[54px]"
            width={0}
            height={0}
            sizes="100vw"
            src={icons.huy_chuong}
            alt={'huychuong'}
          />
        </div>
      </div>
      <div className="w-full rounded-[11px] bg-[#FFFBF8] p-4 shadow-[0px_4px_4px_0px_#00000040] sm:p-6">
        <div className="flex w-full flex-col items-start justify-between gap-2 py-4 sm:py-6 xl:flex-row xl:items-center">
          <p className="tetx-[20px] xs:text-[24px] font-semibold uppercase leading-[100%] tracking-normal text-primary sm:text-[48px]">
            {`Tháng ${new Date().getMonth() + 1}`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-10 rounded-md border border-primary bg-white px-3 py-2 text-sm font-medium text-primary hover:bg-gray-50 disabled:opacity-50"
              title="Làm mới dữ liệu"
            >
              {isLoading ? '⟳' : '↻'} Làm mới
            </button>
            <div className="relative flex w-[200px] items-center rounded-md border border-primary">
              <div className="pointer-events-none absolute left-2">
                <img className="h-[18px] w-auto" width={0} height={0} src={icons.slider} alt={'slider'} />
              </div>
              <div className="pointer-events-none absolute right-2">
                <ChevronDown color="#7257FF" />
              </div>

              <select
                value={category.id}
                onChange={handleSetCategory}
                className="w-full appearance-none overflow-hidden text-ellipsis whitespace-nowrap bg-transparent py-2 pl-8 pr-6 text-primary focus:outline-none"
              >
                {HOME_CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          {scheduleFormat.length > 0 ? (
            scheduleFormat.slice(0, maxLenArr).map((item: TSchedule, index: number) => (
              <div key={index} className="flex justify-between border-t-2 border-primary py-5 sm:py-8">
                <div className="font-montserrat space-y-4 text-left text-primary">
                  <p className="text-[20px] font-extrabold leading-[100%] tracking-normal sm:text-[40px]">
                    {item.name}
                  </p>
                  <div className="space-y-2 text-[11px] font-semibold leading-[100%] tracking-normal sm:text-[22px]">
                    <p>Giảng viên: {teacherOptions.find((teacher) => teacher.value === item.teacher_id)?.label}</p>
                    <p>
                      Khai giảng {formatDate(item.start_date)} | {validateWeek(item.day_of_weeks)}
                    </p>
                    <div className="flex gap-2 text-nowrap">Ca học : {validateShift(item.shifts)}</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    className={`${
                      item.slot === '0' || !item.slot ? 'bg-primary' : 'bg-[#18A72F]'
                    } mx-auto h-fit w-[90px] rounded-[9px] px-6 py-2 sm:w-[180px]`}
                  >
                    <span
                      className={`font-montserrat text-center text-[20px] font-semibold leading-[100%] tracking-normal text-white sm:text-[40px]`}
                    >
                      {item.slot === '0' || !item.slot ? 'Full' : item.slot + ' slot'}
                    </span>
                  </Button>
                  <div onClick={handleScrollToForm} role="button" className="mx-auto w-fit">
                    <p
                      className={`font-montserrat text-center text-[17.24px] font-semibold leading-[100%] tracking-normal ${
                        item.slot === '0' || !item.slot
                          ? 'text-[#C4C4C4]'
                          : 'cursor-pointer text-primary hover:underline'
                      } underline decoration-solid decoration-0 underline-offset-4 sm:text-[34px]`}
                    >
                      {' '}
                      Đăng ký
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="mx-auto my-10 h-fit w-fit">
              <p className="text-base font-medium italic text-gray-400 sm:text-lg">
                Tạm thời chưa có lịch khai giảng mới
              </p>
            </div>
          )}
        </div>
        <div className="py-4">{scheduleFormat.length > maxLenArr && <MoreButton onClick={handleMaxLenArr} />}</div>
      </div>
    </div>
  );

  const renderDesktop = () => (
    <div className="relative hidden h-auto w-full rounded-[49px] bg-[#FFFBF8] pt-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:block">
      <h2 className="mx-auto flex w-fit items-center gap-2 uppercase">
        <img
          className="h-auto w-[30px] xl:w-[42px] 3xl:w-[50px]"
          width={0}
          height={0}
          sizes="100vw"
          src={icons.sao_thang}
          alt={'*'}
        />
        <p className="text-4xl font-semibold leading-[100%] tracking-normal text-[#AF0000] xl:text-5xl 3xl:text-[62.81px]">
          Chọn lịch học
        </p>
        <div className="bg-gradient-to-b from-[#FFA35C] to-primary bg-clip-text py-3 text-transparent">
          <p className="text-4xl font-black leading-[100%] tracking-normal xl:text-5xl 3xl:text-[62.81px]">
            {' '}
            phù hợp nhất với bạn
          </p>
        </div>
        <img
          className="h-auto w-[30px] xl:w-[42px] 3xl:w-[50px]"
          width={0}
          height={0}
          sizes="100vw"
          src={icons.sao_thang}
          alt={'*'}
        />
      </h2>
      <div className="mx-auto w-fit py-4 text-center">
        <p className="text-center text-2xl font-normal leading-[100%] tracking-normal text-primary xl:text-3xl 3xl:text-[35px]">
          Lịch học với thời gian linh hoạt trong tuần giúp bạn thoải mái
          <br />
          trong việc sắp xếp thời gian học tập tốt nhất
        </p>
      </div>
      <div className="hidden w-full px-10 lg:block">
        <div className="flex justify-center gap-20 3xl:gap-40">
          <div className="flex gap-6 3xl:gap-10">
            {tabs.map((tab, index) => (
              <div key={index} className="w-[125px] rounded-[11px] border border-primary py-1 text-center">
                <span className="text-[20px] font-normal text-primary">{tab}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="py-10">
          <p className="font-montserrat text-[20px] font-extrabold leading-[100%] tracking-[0px] text-primary xl:text-[24px]">
            Khóa học sắp khai giảng
          </p>
        </div>
        <div>
          <Table className="1 font-montserrat py-4">
            <TableHeader className="2 [&>tr]:border-none">
              <TableRow className="3 text-center text-[18px] font-bold leading-[100%] tracking-[0px] 3xl:text-[20px]">
                <TableHead className="min-w-[150px] rounded-tl-[15px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">Khóa học</div>
                </TableHead>
                <TableHead className="min-w-[150px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">Khai giảng</div>
                </TableHead>
                <TableHead className="min-w-[100px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <img
                      className="h-auto w-[22px]"
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={icons.buoihoc}
                      alt={'buoihoc'}
                    />
                    Buổi
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <img
                      className="h-auto w-[16px]"
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={icons.cahoc}
                      alt={'cahoc'}
                    />
                    Ca học
                  </div>
                </TableHead>
                <TableHead className="min-w-[270px] border-r border-[#6E0000] bg-primary">
                  <div className="flex w-full items-start justify-start pl-4 text-left text-white">
                    <img
                      className="h-auto w-[22px]"
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={icons.giangvien}
                      alt={'giangvien'}
                    />
                    Giảng viên
                  </div>
                </TableHead>
                <TableHead className="min-w-[100px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">Sĩ số</div>
                </TableHead>
                <TableHead className="min-w-[150px] border-r border-[#6E0000] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">Tình trạng</div>
                </TableHead>
                <TableHead className="min-w-[270px] rounded-tr-[15px] bg-primary">
                  <div className="flex items-center justify-center gap-2 text-white">Đăng ký</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-b [&>tr]:border-none">
              {scheduleFormat.length > 0 ? (
                scheduleFormat.slice(0, maxLenArr).map((item: TSchedule, index: number) => (
                  <TableRow
                    key={index}
                    className={`border-x border-b text-center text-[16px] font-semibold leading-[100%] tracking-[0px] text-primary 3xl:text-[20px] ${
                      index % 2 == 1 ? '[&>td]:bg-[#e4e4e4]' : ''
                    }`}
                  >
                    <TableCell className={`border-b border-l`}>
                      <p>{item.name}</p>
                    </TableCell>
                    <TableCell className="border-b">
                      <p>{formatDate(item.start_date)}</p>
                    </TableCell>
                    <TableCell className="border-b">
                      <p>{validateWeek(item.day_of_weeks)}</p>
                    </TableCell>
                    <TableCell className="border-b">
                      <p>{validateShift(item.shifts)}</p>
                    </TableCell>
                    <TableCell className="border-b pl-4 text-left">
                      <p>{teacherOptions.find((teacher) => teacher.value === item.teacher_id)?.label}</p>
                    </TableCell>
                    <TableCell className="border-b">
                      <p>{item.quantity}</p>
                    </TableCell>
                    <TableCell className="border-b border-r">
                      <Button
                        className={`${
                          item.slot === '0' || !item.slot ? 'bg-primary' : 'bg-[#18A72F]'
                        } mx-auto h-full w-[90%] rounded-[9px]`}
                      >
                        <p>{item.slot === '0' || !item.slot ? 'Full' : 'Còn ' + item.slot + ' slot'}</p>
                      </Button>
                    </TableCell>
                    <TableCell className="border-b">
                      <div className="flex justify-center gap-4">
                        <RegisterStudyModal>
                          <div className={'cursor-pointer hover:underline'}>Đăng ký tư vấn</div>
                        </RegisterStudyModal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
          {scheduleFormat.length == 0 && (
            <div className="w-full">
              <div className="mx-auto w-fit py-6">
                <p className="text-nowrap text-xl font-medium italic text-gray-400">Tạm thời chưa có lớp học nào</p>
              </div>
            </div>
          )}
        </div>
        {scheduleFormat.length > maxLenArr ? (
          <div className="py-5">
            <MoreButton onClick={handleMaxLenArr} />
          </div>
        ) : (
          <div className="py-10"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full px-4 sm:px-10 sm:pb-5 sm:pt-10 lg:pb-10 lg:pt-10">
      {renderMobile()}
      {renderDesktop()}
      <div className="absolute bottom-0 right-0 translate-x-[60%] translate-y-[100%] -rotate-12 sm:translate-y-0">
        <div className="h-[10px] w-auto sm:h-[20px]">
          <WwBlueIcon />
        </div>
      </div>
      <div className="absolute bottom-4 left-0 hidden origin-top-left translate-y-1/2 scale-75 lg:block xl:scale-[80%] 3xl:scale-100">
        <div className="rotate-180 scale-y-[-1]">
          <ScheduleBannerNuaDuongTron />
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
