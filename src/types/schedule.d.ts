export type TShift = {
  id: number;
  end_time: string;
  start_time: string;
  status: number;
};

type TSchedule = {
  id: number;
  name: string;
  slug: string;
  type: number;
  status: number;
  start_date: string;
  shifts: TShift[] | string[];
  day_of_weeks: string[];
  description?: string;
  course_id: number;
  teacher_id: string;
  slot: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  Course?: {
    name: string;
  };
};

type TClasses = TSchedule;

type SlideType = {
  id: number;
  name: string;
  description: string;
  image: string;
  level: string;
};

export type TScheduleRow = {
  id: string;
  date: string;
  status: string;
  buoi: string;
  gio: string;
  raw_buoi: string | string[];
  raw_gio: string | string[];
};

export type TScheduleGroup = {
  id: string;
  label: string;
  rows: TScheduleRow[];
};

export type TFilter = {
  id: string;
  label: string;
};
