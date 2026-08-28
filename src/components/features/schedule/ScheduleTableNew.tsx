import React, { useMemo, useState } from 'react';
import { useGetOpeningSchedule } from '@/hooks/features/use-schedule';
import {
  Polygon2,
  Owl,
  ClassCodeIcon,
  BookmarkCustomIcon,
  FireIcon,
  ChevronSeeMore,
  BracketMobileIcon,
} from '@/components/common/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarCheck, ChevronDown, Clock } from 'lucide-react';

import type { TSchedule, TScheduleGroup, TScheduleRow, TFilter } from '@/types/schedule';
import ScheduleRegisterModal, { type TCourseRegistrationInfo } from './ScheduleRegisterModal';

interface ScheduleTableNewProps {
  courseId?: number;
  bgGradientClass?: string;
}

const ScheduleTableNew = ({ courseId, bgGradientClass = 'from-[#FFEFEF] to-[#FFFFFF]' }: ScheduleTableNewProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseInfo, setSelectedCourseInfo] = useState<TCourseRegistrationInfo | null>(null);

  const handleOpenModal = (row: TScheduleRow, groupLabel: string) => {
    setSelectedCourseInfo({
      id: row.id,
      buoi: row.buoi,
      gio: row.gio,
      courseName: groupLabel,
    });
    setIsModalOpen(true);
  };
  const [showBuoiDropdown, setShowBuoiDropdown] = useState(false);
  const [selectedBuoi, setSelectedBuoi] = useState('Tất cả');
  const [showCaDropdown, setShowCaDropdown] = useState(false);
  const [selectedCa, setSelectedCa] = useState<string>('Tất cả');
  const [showAll, setShowAll] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const { data: scheduleData = [], isLoading } = useGetOpeningSchedule('0');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  const getStatus = (slot: number | string, quantity: number | string) => {
    const s = Number(slot);
    if (s <= 0) return 'Hết chỗ';
    if (s <= 3) return 'Sắp hết chỗ';
    return 'Đang tuyển';
  };

  const allGroups = useMemo<TScheduleGroup[]>(() => {
    let actualData: TSchedule[] = Array.isArray(scheduleData) ? scheduleData : [];
    if (actualData.length === 0) return [];

    if (courseId) {
      actualData = actualData.filter((item: TSchedule) => item.course_id === courseId);
    }

    const groupsMap: Record<string, TScheduleGroup> = {};

    actualData.forEach((item: TSchedule) => {
      const courseName = item.Course?.name || 'Khóa học';
      if (!groupsMap[courseName]) {
        groupsMap[courseName] = {
          id: item.course_id?.toString() || item.id.toString(),
          label: courseName,
          rows: [],
        };
      }

      groupsMap[courseName].rows.push({
        id: item.name,
        date: formatDate(item.start_date),
        status: getStatus(item.slot, item.quantity),
        buoi: Array.isArray(item.day_of_weeks) ? item.day_of_weeks.join('/') : item.day_of_weeks || '',
        gio: Array.isArray(item.shifts)
          ? item.shifts.map((s: any) => (typeof s === 'string' ? s : `${s.start_time} - ${s.end_time}`)).join(', ')
          : (item.shifts as any) || '',
        raw_buoi: item.day_of_weeks,
        raw_gio: Array.isArray(item.shifts)
          ? item.shifts.map((s: any) => (typeof s === 'string' ? s : `${s.start_time} - ${s.end_time}`))
          : (item.shifts as any) || '',
      });
    });

    return Object.values(groupsMap);
  }, [scheduleData]);

  const buoiOptions = useMemo(() => {
    const days = new Set<string>();
    const sourceGroups = activeFilter === 'all' ? allGroups : allGroups.filter((g) => g.id === activeFilter);

    sourceGroups.forEach((group) => {
      group.rows.forEach((row: TScheduleRow) => {
        if (row.buoi) days.add(row.buoi);
      });
    });
    return [...Array.from(days).sort()];
  }, [allGroups, activeFilter]);

  const caOptions = useMemo(() => {
    const shifts = new Set<string>();
    const sourceGroups = activeFilter === 'all' ? allGroups : allGroups.filter((g) => g.id === activeFilter);

    sourceGroups.forEach((group) => {
      group.rows.forEach((row: TScheduleRow) => {
        if (row.gio) shifts.add(row.gio);
      });
    });
    return [...Array.from(shifts).sort()];
  }, [allGroups, activeFilter]);

  React.useEffect(() => {
    setSelectedBuoi('Tất cả');
    setSelectedCa('Tất cả');
  }, [activeFilter]);

  const filters = useMemo<TFilter[]>(() => {
    const dynamicFilters = allGroups.map((group) => ({
      id: group.id,
      label: group.label,
    }));
    return [{ id: 'all', label: 'Tất cả' }, ...dynamicFilters];
  }, [allGroups]);

  const filteredGroups = useMemo(() => {
    let result = allGroups;

    if (activeFilter !== 'all') {
      result = result.filter((group) => group.id === activeFilter);
    }

    return result
      .map((group) => {
        const filteredRows = group.rows.filter((row: TScheduleRow) => {
          const matchBuoi = selectedBuoi === 'Tất cả' || row.buoi === selectedBuoi;
          const matchCa = selectedCa === 'Tất cả' || row.gio === selectedCa;
          return matchBuoi && matchCa;
        });

        return {
          ...group,
          rows: filteredRows,
        };
      })
      .filter((group) => group.rows.length > 0);
  }, [allGroups, activeFilter, selectedBuoi, selectedCa]);

  const visibleGroups = showAll ? filteredGroups : filteredGroups.slice(0, 2);

  const changeFilter = (updateFn: () => void) => {
    const timer = setTimeout(() => setIsFiltering(true), 200);
    updateFn();
    clearTimeout(timer);
    setIsFiltering(false);
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Đang tuyển') return 'bg-[#007E26]';
    if (status === 'Hết chỗ') return 'bg-[#C7C7C7]';
    return 'bg-[#AF0000]';
  };

  const filterScrollRef = React.useRef<HTMLDivElement>(null);
  const [filterScrollProgress, setFilterScrollProgress] = useState(0);

  React.useEffect(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollWidth > clientWidth) {
        setFilterScrollProgress(scrollLeft / (scrollWidth - clientWidth));
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [filters]);

  const handleFilterDragScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseFloat(e.target.value);
    setFilterScrollProgress(progress);
    const el = filterScrollRef.current;
    if (el) {
      el.scrollLeft = progress * (el.scrollWidth - el.clientWidth);
    }
  };

  return (
    <section className={`w-full max-w-[1920px] mx-auto bg-gradient-to-b ${bgGradientClass} pb-4 pt-12 md:pt-16 lg:pb-8 lg:pt-20`}>
      <div className="mx-auto w-full px-4 pb-5 pt-2 md:px-8 md:py-8 xl:px-20 2xl:max-w-[87%] 2xl:px-16 3xl:max-w-[1700px] 3xl:px-28">
        {/* Header */}
        <div className="mb-8 text-center md:mb-16">
          <div className="mx-auto flex w-fit items-start justify-center gap-2 md:items-center">
            <Polygon2 className="mt-1 h-[11px] w-[11px] shrink-0 text-[#F97316] md:mt-0 md:h-[28px] md:w-[28px]" />
            <h2 className="max-w-[260px] text-left font-gilroy text-[18px] font-[1000] uppercase leading-[1.2] text-[#F97316] md:max-w-none md:text-center md:text-[28px] lg:text-[36px] xl:text-[42px]">
              CHỌN LỊCH HỌC PHÙ HỢP NHẤT VỚI BẠN
            </h2>
          </div>
          <p className="mt-2 font-gilroy text-[16px] font-bold leading-[1.2] text-[#2D2D2D] md:text-[28px]">
            Linh Hoạt - Hiệu Quả - Cam Kết Đầu Ra
          </p>
        </div>

        {/* Categories Filter */}
        {!courseId && (
          <div className="relative mb-2 md:mb-6">
            <div className="px-4 md:px-0">
            <p className="font-svn-gilroy mb-2 hidden text-[16px] font-normal text-[#373737] md:mb-5 md:block">
              Khoá học bạn quan tâm
            </p>
            <div
              ref={filterScrollRef}
              className="scrollbar-hide flex flex-col gap-y-3 overflow-x-auto pb-2 md:flex-row md:flex-wrap md:gap-x-3 md:gap-y-4 md:overflow-visible md:pb-0"
            >
              {/* Row 1: First 7 items */}
              <div className="flex w-max gap-x-2 md:contents">
                {filters.slice(0, 7).map((filter: TFilter) => (
                  <button
                    key={filter.id}
                    onClick={() => changeFilter(() => setActiveFilter(filter.id))}
                    className={`flex h-[32px] items-center justify-center whitespace-nowrap rounded-full border px-5 font-gilroy text-[13px] font-bold leading-none transition-all md:h-auto md:px-5 md:py-1.5 md:text-[14px] md:leading-normal lg:text-[15px] xl:text-[16px] ${
                      activeFilter === filter.id
                        ? 'border-[#AF0000] bg-[#AF0000] text-white'
                        : 'border-[#969696]/50 bg-white text-[#969696] hover:border-[#AF0000] hover:bg-[#AF0000] hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              {/* Row 2: Remaining items */}
              {filters.length > 7 && (
                <div className="flex w-max gap-x-2 md:contents">
                  {filters.slice(7).map((filter: TFilter) => (
                    <button
                      key={filter.id}
                      onClick={() => changeFilter(() => setActiveFilter(filter.id))}
                      className={`flex h-[32px] items-center justify-center whitespace-nowrap rounded-full border px-5 font-gilroy text-[13px] font-bold leading-none transition-all md:h-auto md:px-5 md:py-1.5 md:text-[14px] md:leading-normal lg:text-[15px] xl:text-[16px] ${
                        activeFilter === filter.id
                          ? 'border-[#AF0000] bg-[#AF0000] text-white'
                          : 'border-[#969696]/50 bg-white text-[#969696] hover:border-[#AF0000] hover:bg-[#AF0000] hover:text-white'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Mobile Scrollbar */}
            <div className="relative mb-6 mt-2 flex w-full items-center justify-start md:hidden">
              <div className="relative h-[6px] w-full rounded-[63px] bg-transparent">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={filterScrollProgress}
                  onChange={handleFilterDragScroll}
                  className="absolute inset-0 z-20 cursor-pointer opacity-0"
                />
                <div
                  className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-all duration-100 ease-out"
                  style={{
                    left: `calc(${filterScrollProgress * 100}% - ${filterScrollProgress * 98}px)`,
                    width: '98px',
                  }}
                >
                  <div className="h-[6px] w-full rounded-full bg-[#D9D9D9]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Secondary Filters */}
        <div className="relative mb-8 px-2 md:px-0">
          <p className="mb-0.5 font-gilroy text-[14px] font-normal leading-normal text-[#373737] lg:text-[16px]">
            Bộ lọc tuỳ chọn
          </p>
          <div className="mb-3 h-[1px] w-full bg-[#969696]/50 md:mb-4" />
          <div className="flex flex-wrap gap-3">
            {/* Buổi học Dropdown */}
            <div
              className="relative h-[30px] w-fit lg:h-[35px]"
              onMouseEnter={() => setShowBuoiDropdown(true)}
              onMouseLeave={() => setShowBuoiDropdown(false)}
            >
              <button
                onClick={() => setShowBuoiDropdown(!showBuoiDropdown)}
                className="flex h-full items-center rounded-[2px] border-[0.5px] border-[#000000] bg-[#D9D9D9]/30 px-3 pr-8 font-gilroy text-[14px] text-[#373737]/80 focus:outline-none md:rounded-md md:border md:border-gray-200 lg:px-3 lg:pr-9 lg:text-[15px] xl:px-4 xl:pr-10 xl:text-[16px]"
              >
                <span className="font-normal">Buổi học:&nbsp;</span>
                <span className="font-bold text-[#373737]">{selectedBuoi}</span>
                <ChevronDown
                  className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#373737] transition-transform ${showBuoiDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-20 w-fit min-w-[100%] pt-1 transition-all duration-200 ease-out ${showBuoiDropdown ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'}`}
              >
                <div className="scrollbar-thin max-h-[300px] overflow-y-auto rounded-lg bg-white py-0 shadow-xl ring-1 ring-black ring-opacity-5">
                  {buoiOptions.map((option: string) => (
                    <button
                      key={option}
                      className={`flex w-full items-center gap-3 whitespace-nowrap px-4 py-2 text-left font-gilroy text-[14px] transition-colors ${selectedBuoi === option ? 'bg-[#2B88FF] text-white' : 'text-[#373737] hover:bg-[#E5EFFF]'}`}
                      onClick={() => {
                        changeFilter(() => {
                          setSelectedBuoi(option);
                          setShowBuoiDropdown(false);
                        });
                      }}
                    >
                      <div
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${selectedBuoi === option ? 'bg-white' : 'bg-[#373737]'}`}
                      />
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ca học Dropdown */}
            <div
              className="relative h-[30px] w-fit lg:h-[35px]"
              onMouseEnter={() => setShowCaDropdown(true)}
              onMouseLeave={() => setShowCaDropdown(false)}
            >
              <button
                onClick={() => setShowCaDropdown(!showCaDropdown)}
                className="flex h-full items-center rounded-[2px] border-[0.5px] border-[#000000] bg-[#D9D9D9]/30 px-3 pr-8 font-gilroy text-[14px] text-[#373737]/80 focus:outline-none md:rounded-md md:border md:border-gray-200 lg:px-3 lg:pr-9 lg:text-[15px] xl:px-4 xl:pr-10 xl:text-[16px]"
              >
                <span className="font-normal">Ca học:&nbsp;</span>
                <span className="font-bold text-[#373737]">{selectedCa}</span>
                <ChevronDown
                  className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#373737] transition-transform ${showCaDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-20 w-fit min-w-[120%] pt-1 transition-all duration-200 ease-out ${showCaDropdown ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'}`}
              >
                <div className="scrollbar-thin max-h-[300px] overflow-y-auto rounded-lg bg-white py-0 shadow-xl ring-1 ring-black ring-opacity-5">
                  {caOptions.map((option: string) => (
                    <button
                      key={option}
                      className={`flex w-full items-center gap-3 whitespace-nowrap px-4 py-2 text-left font-gilroy text-[14px] transition-colors ${selectedCa === option ? 'bg-[#2B88FF] text-white' : 'text-[#373737] hover:bg-[#E5EFFF]'}`}
                      onClick={() => {
                        changeFilter(() => {
                          setSelectedCa(option);
                          setShowCaDropdown(false);
                        });
                      }}
                    >
                      <div
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${selectedCa === option ? 'bg-white' : 'bg-[#373737]'}`}
                      />
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className={`${courseId ? '' : 'min-h-[400px]'} w-full`}>
          {isLoading || isFiltering ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#AF0000] border-t-transparent"></div>
              <p className="font-gilroy text-lg font-medium text-gray-500">
                {isLoading ? 'Đang tải lịch khai giảng...' : 'Đang cập nhật dữ liệu...'}
              </p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <p className="font-gilroy text-lg font-medium text-gray-500">Hiện chưa có lịch khai giảng nào.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table Header */}
              <div className="hidden w-full md:block">
                <div className="overflow-hidden rounded-t-[6px] border-l border-r border-t border-gray-200 bg-white [&>div]:overflow-hidden">
                  <Table className="w-full table-fixed border-collapse">
                    <TableHeader className="bg-white">
                      <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="w-[182px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:text-[16px] xl:text-[20px]">
                          <div className="flex items-center gap-1 whitespace-nowrap lg:gap-2">
                            <Owl className="h-4 w-4 lg:h-6 lg:w-6" />
                            <span>Khoá học</span>
                          </div>
                        </TableHead>
                        <TableHead className="w-[80px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[100px] lg:text-[16px] xl:w-[120px] xl:text-[20px] 3xl:w-[120px]">
                          <div className="flex items-center gap-1 whitespace-nowrap lg:gap-2">
                            <ClassCodeIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                            <span>Mã lớp</span>
                          </div>
                        </TableHead>
                        <TableHead className="w-[100px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[160px] lg:text-[16px] xl:w-[180px] xl:text-[20px] 3xl:w-[220px]">
                          <div className="flex items-center gap-1 whitespace-nowrap lg:gap-2">
                            <Calendar className="h-4 w-4 lg:h-6 lg:w-6" />
                            <span>Khai giảng</span>
                          </div>
                        </TableHead>
                        <TableHead className="w-[95px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[100px] lg:text-[16px] xl:w-[110px] xl:text-[20px] 3xl:w-[110px]"></TableHead>
                        <TableHead className="w-[90px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[130px] lg:text-[16px] xl:w-[160px] xl:text-[20px] 3xl:w-[190px]">
                          <div className="flex items-center gap-1 whitespace-nowrap lg:gap-2">
                            <Calendar className="h-4 w-4 lg:h-6 lg:w-6" />
                            <span>Buổi học</span>
                          </div>
                        </TableHead>
                        <TableHead className="w-[95px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[130px] lg:text-[16px] xl:w-[160px] xl:text-[20px] 3xl:w-[240px]">
                          <div className="flex items-center gap-1 whitespace-nowrap lg:gap-2">
                            <Clock className="h-4 w-4 lg:h-6 lg:w-6" />
                            <span>Giờ học</span>
                          </div>
                        </TableHead>
                        <TableHead className="w-[100px] py-4 pl-2 font-gilroy text-[12px] font-bold text-[#2D2D2D] lg:w-[120px] lg:text-[16px] xl:w-[150px] xl:text-[20px] 3xl:w-[180px]">
                          <div className="flex w-fit items-center justify-start gap-1 whitespace-nowrap lg:gap-2">
                            <BookmarkCustomIcon className="h-4 w-4 shrink-0 lg:h-6 lg:w-6" />
                            <span>Giữ chỗ</span>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>
              </div>

              {/* Desktop Table Body */}
              <div className="hidden flex-col gap-2 md:flex">
                {visibleGroups.map((group: TScheduleGroup) => (
                  <div
                    key={group.id}
                    className="overflow-hidden border border-gray-200 bg-white shadow-sm [&>div]:overflow-visible"
                  >
                    <Table className="w-full table-fixed border-collapse">
                      <TableBody>
                        {group.rows.map((row: TScheduleRow, idx: number) => (
                          <TableRow
                            key={row.id + idx}
                            className={`${idx !== 0 ? 'border-t' : ''} ${idx % 2 !== 0 ? 'bg-[#FFEFEF]' : 'bg-white'}`}
                          >
                            {idx === 0 && (
                              <TableCell
                                rowSpan={group.rows.length}
                                className="w-[182px] bg-[#F97316] px-2 py-2 text-center align-middle"
                              >
                                <span className="block font-gilroy text-[20px] font-[900] uppercase leading-[1.2] text-white">
                                  {group.label}
                                </span>
                              </TableCell>
                            )}
                            <TableCell className="w-[80px] py-2 pl-2 lg:w-[100px] xl:w-[120px] 3xl:w-[120px]">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#072899]" />
                                <span className="font-gilroy text-[14px] font-medium text-[#373737] lg:text-[15px] xl:text-[18px]">
                                  {row.id}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[100px] py-2 pl-2 lg:w-[160px] xl:w-[180px] 3xl:w-[220px]">
                              <div className="flex items-center gap-2 font-gilroy text-[14px] font-medium text-[#373737] lg:text-[15px] xl:text-[18px]">
                                <CalendarCheck className="h-5 w-5 text-[#373737]/40 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                                <span>{row.date}</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[95px] py-2 pl-0 lg:w-[100px] xl:w-[110px] 3xl:w-[110px]">
                              <span
                                className={`inline-flex h-[24px] w-[88px] items-center whitespace-nowrap rounded-[6px] font-gilroy text-[10px] font-bold text-white lg:h-[28px] lg:w-[95px] lg:text-[11px] xl:h-[30px] xl:w-[105px] xl:text-[12px] 3xl:ml-[-20px] ${getStatusStyle(row.status)} ${row.status === 'Sắp hết chỗ' ? 'justify-start gap-[1px] pl-1' : 'justify-center'}`}
                              >
                                {row.status === 'Sắp hết chỗ' && (
                                  <FireIcon className="h-5 w-5 text-[#F3C650] lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                                )}
                                {row.status}
                              </span>
                            </TableCell>
                            <TableCell className="w-[90px] py-2 pl-2 lg:w-[130px] xl:w-[160px] 3xl:w-[190px]">
                              <div className="flex items-center gap-2 font-gilroy text-[14px] font-medium text-[#373737] lg:text-[15px] xl:text-[18px]">
                                <Calendar className="h-5 w-5 text-[#373737]/40 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                                <span>{row.buoi}</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[95px] py-2 pl-2 lg:w-[130px] xl:w-[160px] 3xl:w-[240px]">
                              <div className="flex items-center gap-2 font-gilroy text-[14px] font-medium text-[#373737] lg:text-[15px] xl:text-[18px]">
                                <Clock className="h-5 w-5 text-[#373737]/40 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                                <span>{row.gio}</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[100px] py-2 pl-2 lg:w-[120px] xl:w-[150px] 3xl:w-[180px]">
                              <Button
                                onClick={() => handleOpenModal(row, group.label)}
                                disabled={row.status === 'Hết chỗ'}
                                className={`flex h-[24px] w-[85px] items-center justify-center rounded-[6px] p-0 text-center font-gilroy text-[14px] font-bold leading-[1.2] transition-all lg:h-[28px] lg:w-[100px] lg:text-[15px] xl:h-[30px] xl:w-[120px] xl:text-[18px] 3xl:w-[130px] ${
                                  row.status === 'Đang tuyển' || row.status === 'Sắp hết chỗ'
                                    ? 'border-[0.5px] bg-[#FFF2D1] text-[#2D2D2D] hover:border-[#969696] hover:bg-[#F3C650] hover:text-black hover:shadow-[0px_4px_4px_0px_#FF4040] active:scale-95'
                                    : 'cursor-not-allowed bg-[#C7C7C7] text-[#FFFFFF]'
                                }`}
                              >
                                Đăng ký
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>

              {/* Mobile Layout */}
              <div className="flex flex-col gap-2 md:hidden">
                {visibleGroups.map((group: TScheduleGroup) => (
                  <div
                    key={group.id}
                    className="overflow-hidden rounded-[6px] border border-[#969696] bg-white shadow-sm"
                  >
                    <div className="flex h-10 items-center justify-center bg-[#F3F3F3] font-gilroy text-[14px] font-bold uppercase text-[#373737]">
                      <div className="flex items-center gap-2">
                        <Owl className="h-4 w-4" />
                        Khoá học
                      </div>
                    </div>
                    <div className="flex h-auto min-h-[48px] items-center justify-center bg-[#AF0000] px-4 py-2 text-center font-gilroy text-[20px] font-[900] uppercase leading-[1.2] text-white">
                      {group.label}
                    </div>

                    <div className="divide-y divide-[#EEEEEE]">
                      {group.rows.map((row: TScheduleRow, idx: number) => (
                        <div key={row.id + idx} className="flex items-center justify-between px-3 py-3">
                          {/* Left Info Column */}
                          <div className="flex gap-2">
                            {/* Bracket Connector using the new BracketMobileIcon */}
                            <div className="relative flex w-3 flex-col items-center">
                              {/* Use the same gap/height structure to ensure perfect alignment */}
                              <div className="flex flex-col gap-1">
                                <div className="flex h-[20px] items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-[#AF0000]"></div>
                                </div>
                                <div className="flex h-[30px] items-center justify-center">
                                  <Calendar className="h-3.5 w-3.5 text-[#373737]/40" />
                                </div>
                              </div>
                              {/* Bracket SVG adjusted to match the new centers (10px = center of 20px Row 1) */}
                              <BracketMobileIcon className="absolute -left-[8px] top-[10px] z-0 h-[29px] w-[8px] text-[#373737]" />
                            </div>

                            {/* Content Rows */}
                            <div className="flex flex-col gap-1">
                              {/* Row 1: ID and Date */}
                              <div className="flex h-[20px] items-center gap-1">
                                <span className="w-[55px] shrink-0 font-gilroy text-[12px] font-medium leading-[1.2] text-[#373737]">
                                  {row.id}
                                </span>
                                <div className="flex items-center gap-1 font-gilroy text-[12px] font-medium leading-[1.2] text-[#373737]">
                                  <CalendarCheck className="h-3.5 w-3.5 text-[#373737]/40" />
                                  <span className="whitespace-nowrap">{row.date}</span>
                                </div>
                              </div>
                              {/* Row 2: Buoi and Time */}
                              <div className="flex h-[30px] items-center gap-1">
                                <span className="w-[55px] shrink-0 font-gilroy text-[12px] font-medium leading-[1.2] text-[#373737]">
                                  {row.buoi}
                                </span>
                                <div className="flex items-center gap-1 font-gilroy text-[12px] font-medium leading-[1.2] text-[#373737]">
                                  <Clock className="h-3.5 w-3.5 text-[#373737]/40" />
                                  <span className="whitespace-nowrap">{row.gio}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Action Column */}
                          <div className="flex shrink-0 flex-col items-end gap-1">
                            <span
                              className={`flex h-[20px] w-[88px] items-center rounded-[4px] font-gilroy text-[11px] font-bold text-white shadow-sm ${getStatusStyle(row.status)} ${row.status === 'Sắp hết chỗ' ? 'justify-start gap-[2px] pl-1' : 'justify-center'}`}
                            >
                              {row.status === 'Sắp hết chỗ' && <FireIcon className="h-3.5 w-3.5 text-[#F3C650]" />}
                              {row.status}
                            </span>
                            <Button
                              onClick={() => handleOpenModal(row, group.label)}
                              disabled={row.status === 'Hết chỗ'}
                              className={`h-[28px] w-[88px] rounded-[6px] p-0 font-gilroy transition-all ${
                                row.status === 'Đang tuyển'
                                  ? 'bg-[#FFF0CD] text-[12px] font-bold leading-[1.2] text-[#373737] shadow-[0px_4px_8px_0px_rgba(243,198,80,0.3)]'
                                  : row.status === 'Sắp hết chỗ'
                                    ? 'bg-[#F3C650] text-[13px] font-[900] text-[#2D2D2D] shadow-[0px_4px_4px_0px_#FF4040]'
                                    : 'cursor-not-allowed bg-[#C7C7C7] text-[12px] font-bold leading-[1.2] text-[#FFFFFF] shadow-none'
                              } active:scale-95`}
                            >
                              Đăng ký
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* See More Button */}
        {courseId ? (
          <div className="mt-4 text-center md:mt-8">
            <a
              href="/lich-khai-giang"
              className="mx-auto flex h-[32px] w-[140px] items-center justify-center gap-[6px] rounded-full border-[0.5px] border-[#000000] bg-[#FAFAFA] font-gilroy text-[14px] font-semibold text-[#373737]/80 transition-all hover:bg-gray-100 md:h-[38px] md:bg-white md:text-[16px]"
            >
              <span>Xem đầy đủ</span>
              <ChevronSeeMore className="h-[13px] w-auto" />
            </a>
          </div>
        ) : (
          filteredGroups.length > 2 && (
            <div className="mt-6 text-center md:mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="mx-auto flex h-[36px] items-center justify-center gap-1 rounded-full border-[0.5px] border-[#000000] px-4 font-gilroy text-[13px] font-semibold leading-normal text-[#373737]/80 transition-all hover:bg-gray-100 md:h-[48px] md:px-6 md:text-[16px] md:leading-normal"
              >
                <span>{showAll ? 'Thu gọn' : 'Xem đầy đủ'}</span>
                <ChevronSeeMore className={`h-[13px] w-auto transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )
        )}

        <ScheduleRegisterModal isOpen={isModalOpen} onClose={setIsModalOpen} courseInfo={selectedCourseInfo} />
      </div>
    </section>
  );
};

export default ScheduleTableNew;
