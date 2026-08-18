type TTeacher = {
  id: number;
  name: string;
  slug?: string | null;
  avatar_url?: TImage;
  album_url?: TImage[];
  description?: string;
  label?: string;
  tags: TTags;
  share_content: JSON;
  current_class: JSON;
  qualification_info: JSON;
  qualification: TQualification[];
  experience_years?: number;
  gender?: number;
  birth_date?: string;
  title?: string | null;
  total_student?: number;
  classroom?: string;
  order?: number | null;
  optimizedAvatar?: string;
  program?: string[];
  status?: number;
  teacherHighlights: TTeacherHighlight[];
  createdAt?: string;
  updatedAt?: string;
};

type TImage = {
  file_path: string;
  originalname: string;
};

type TQualification = {
  id?: number;
  name: string;
  description?: string;
};

type TTags = {
  qualification: string[];
  scope: string[];
};

type TTeacherHighlight = {
  id: number;
  teacher_id: number;
  section: string;
  content: string;
};
