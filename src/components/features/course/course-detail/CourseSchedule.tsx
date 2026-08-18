'use client';

import RegisterStudyModal from '@/components/common/RegisterStudyModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetClassesListsForCourseId } from '@/hooks/features/use-classes';
import { DATA_INPUT_SOURCE } from '@/lib/constants/enums';
import {
  Album,
  ArrowUpDown,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dot,
  Target,
} from 'lucide-react';
import { useEffect, useState } from 'react';
type CourseScheduleProps = {
  id: number;
  initialData?: TResponsePagination<TClasses[]> | null;
};
type Shift = {
  id: number;
  end_time: string;
  start_time: string;
  status: number;
};
const validateWeek = (days: string[]) => {
  if (days[0] === 'CN') {
    return 'CN';
  }
  let result = 'Thứ ';
  days.map((item, index) => {
    if (index === 0) {
      result += item;
    } else {
      result += ', ' + item;
    }
  });
  return result;
};

const formatDate = (dateString: string, format: 'DD/MM/YYYY' | 'DD' | 'MM') => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'DD') return day;
  if (format === 'MM') return month;
  return `${day}/${month}/${year}`;
};

const validateShift = (shifts: Shift[], isMobile = false) => {
  if (shifts.length == 0) return '';
  let result = '';
  shifts.map((item, index) => {
    if (index == 0) result += item.start_time + ' - ' + item.end_time;
    else if (isMobile) result += ', ' + item.start_time + ' - ' + item.end_time;
    else result += ',\n' + item.start_time + ' - ' + item.end_time;
  });
  return result;
};

const CourseSchedule = ({ id, initialData }: CourseScheduleProps) => {
  const today = new Date();
  const [daySelect, setDaySelect] = useState('asc');
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [list, setList] = useState<TClasses[] | null>(initialData?.list || null);
  const [meta, setMeta] = useState(initialData?.meta || null);

  const { data, setLimit, setMonthQuery, setDateOrder } = useGetClassesListsForCourseId(id);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const isCurrentYear = year === currentYear;

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    if (newDate.getMonth() > currentMonth || newDate.getFullYear() > currentYear) {
      newDate.setMonth(newDate.getMonth() - 1);
      setCurrentDate(newDate);
      const newMonth = newDate.getMonth() + 1;
      const newYear = newDate.getFullYear();
      setMonthQuery(newMonth, newYear);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    const newMonth = newDate.getMonth() + 1;
    const newYear = newDate.getFullYear();
    setMonthQuery(newMonth, newYear);
  };

  const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  useEffect(() => {
    if (data?.data) {
      setList(data.data.list || null);
      setMeta(data.data.meta || null);
    }
  }, [data]);

  const handleValueChange = (value: string) => {
    setDaySelect(value);
    setDateOrder(value as 'asc' | 'desc');
  };

  return (
    <div className="w-full bg-slate-50 pt-4 md:pb-20 md:pt-20">
      <div className="container mx-auto xl:w-[1400px] 3xl:w-[1600px]">
        <div className="flex w-full flex-col items-center gap-4 p-2 lg:pb-10">
          <h2 className="text-center text-3xl font-semibold">Lịch khai giảng khóa học</h2>
          <div className="md:w-[540px]">
            <p className="text-center font-medium">
              Lịch học với thời gian học linh hoạt trong tuần giúp bạn thoải mái trong việc sắp xếp thời gian học tập
              tốt nhất
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between px-4 pt-8 lg:px-0">
            <div className="flex items-end gap-2">
              <span className="text-xl font-semibold text-primary sm:text-3xl">
                Tháng {monthNames[month]}
                {isCurrentYear ? '' : `/${year}`}
              </span>
              <p className="text-sm text-slate-500">{meta?.total || 0} lịch học</p>
            </div>
            <div className="flex">
              <div className="hidden items-center gap-2 md:flex">
                {/* <ArrowUpDown className="text-slate-400" />{" "} */}
                <div className="flex items-center">
                  <Select value={daySelect} onValueChange={handleValueChange}>
                    <SelectTrigger className="w-58 rounded-none border-0 bg-transparent focus:border-0 focus:outline-0 focus:ring-0 focus:ring-offset-0">
                      <ArrowUpDown size={16} className="mr-1 text-slate-400" />
                      <SelectValue />
                      <ChevronDown size={20} className="ml-1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Ngày khai giảng gần nhất</SelectItem>
                      <SelectItem value="desc">Ngày khai giảng xa nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex cursor-pointer items-center gap-2">
                <button className="rounded-full bg-slate-300 p-1" onClick={handlePrevMonth}>
                  <ChevronLeft
                    size={20}
                    className={`${month === currentMonth && year === currentYear && 'text-slate-100'}`}
                  />
                </button>
                <button className="cursor-pointer rounded-full bg-slate-300 p-1" onClick={handleNextMonth}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4">
            <div className="flex items-center gap-2 md:hidden">
              <Select value={daySelect} onValueChange={handleValueChange}>
                <SelectTrigger className="w-58 rounded-none border-0 bg-transparent focus:border-0 focus:outline-0 focus:ring-0 focus:ring-offset-0">
                  <ArrowUpDown size={16} className="mr-1 text-slate-400" />
                  <SelectValue />
                  <ChevronDown />
                </SelectTrigger>
                <SelectContent className="focus:shadow-0 border-0 outline-none ring-0">
                  <SelectItem value="asc">Ngày khai giảng gần nhất</SelectItem>
                  <SelectItem value="desc">Ngày khai giảng xa nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="hidden w-full md:block">
            <Table className="1">
              <TableHeader className="2 [&>tr]:border-none">
                <TableRow className="3">
                  <TableHead className="min-w-[300px] rounded-l-xl border-r bg-slate-300">
                    <div className="flex items-center gap-2">
                      <Album />
                      Khóa học
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px] border-r bg-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar />
                      Khai giảng
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px] border-r bg-slate-300">
                    <div className="flex items-center gap-2">
                      <CalendarDays />
                      Buổi
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px] border-r bg-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock />
                      Ca học
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[180px] border-r bg-slate-300">
                    <div className="flex items-center gap-2">
                      <Target />
                      Hình thức
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[180px] rounded-r-xl bg-slate-300"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b [&>tr]:border-none">
                {list?.map((item, index) => (
                  <TableRow key={index} className="even:bg-slate-200 even:hover:bg-slate-200">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{formatDate(item.start_date, 'DD/MM/YYYY')}</TableCell>
                    <TableCell>{validateWeek(item.day_of_weeks)}</TableCell>
                    <TableCell className="whitespace-pre-line">{validateShift(item.shifts)}</TableCell>
                    <TableCell className="">
                      {item.type == 0 ? (
                        <div className="relative flex max-w-[125px] items-center gap-2 overflow-hidden rounded-full bg-blue-200 px-2 py-[2px] font-semibold text-blue-400">
                          <Dot size={40} className="absolute left-0" /> <span className="pl-6">Học Online</span>
                        </div>
                      ) : (
                        <div className="relative flex max-w-[125px] items-center gap-2 overflow-hidden rounded-full bg-orange-200 px-2 py-[2px] font-semibold text-orange-400">
                          <Dot size={40} className="absolute left-0" /> <span className="pl-6">Học Tại Lớp</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <RegisterStudyModal dataInput={`${DATA_INPUT_SOURCE.COURSE_DETAIL} ${item.name}`}>
                          <div className="cursor-pointer border-r pr-2 font-semibold text-blue-400">Đăng ký</div>
                        </RegisterStudyModal>
                        <div className="cursor-pointer pl-2 font-semibold text-green-400">Tư vấn</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {list && list.length === 0 && (
              <div className="flex items-center justify-center pt-5 text-base italic text-slate-400">
                Hiện tại chưa có lịch học nào
              </div>
            )}
          </div>
          <div className="space-y-4 md:hidden">
            {list?.map((item) => (
              <RegisterStudyModal key={item.id}>
                <div className="flex items-center px-4">
                  <div className="flex h-[90px] w-[90px] flex-col justify-center rounded-xl border text-center">
                    <p>{formatDate(item.start_date, 'DD')}</p>
                    <p>Tháng {formatDate(item.start_date, 'MM')}</p>
                  </div>
                  <div className="space-y-2 px-4">
                    <div className="text-lg font-medium">{item.name}</div>
                    <div className="flex flex-nowrap items-center gap-2 text-sm text-[hsl(207,5%,52%)]">
                      <Calendar size={16} />
                      {validateWeek(item.day_of_weeks)}
                    </div>
                    <div className="flex flex-nowrap items-center gap-2 text-sm text-[hsl(207,5%,52%)]">
                      <Clock size={16} /> {validateShift(item.shifts, true)}
                    </div>
                  </div>
                </div>
              </RegisterStudyModal>
            ))}
            {list && list.length === 0 && (
              <div className="flex items-center justify-center py-5 text-base italic text-slate-400">
                Hiện tại chưa có lịch học nào
              </div>
            )}
          </div>
          {meta?.next && (
            <div className="w-full p-8">
              <div className="flex w-full items-center justify-center">
                <button className="flex gap-2 rounded-full border bg-white px-4 py-2" onClick={setLimit}>
                  <span className="font-semibold">Xem thêm</span>
                  <ChevronDown />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;
