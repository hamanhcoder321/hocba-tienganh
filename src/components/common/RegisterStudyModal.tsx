import Phan1MucNhoButton from '@/components/common/Phan1MucNhoButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterStudyFormHandler } from '@/hooks/features/use-blog-filter';
import { DATA_INPUT_MAP, DATA_INPUT_SOURCE } from '@/lib/constants/enums';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import type { UseFormReturn } from 'react-hook-form';
import { fetchCourseDetail, fetchTeacherDetail } from '@/lib/static-data';
import { navigate } from 'astro:transitions/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type RegisterStudyModalProps = {
  children?: React.ReactNode;
  dataInput?: string;
  currentPath?: string;
  registerRedirectParam?: string | null;
  buttonText?: string;
  buttonClassName?: string;
  buttonComponent?: 'Phan1MucNhoButton';
  buttonProps?: { str: string; numb: string };
};

const RegisterStudyModal = ({
  children,
  dataInput,
  currentPath,
  registerRedirectParam,
  buttonText,
  buttonClassName,
  buttonComponent,
  buttonProps,
}: RegisterStudyModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { form, isSuccess, isPending, handleRegisterStudy } = useRegisterStudyFormHandler();

  const registerRedirect = registerRedirectParam;

  const handleChangeModal = (open: boolean) => {
    setOpenModal(open);
    if (!open) {
      form.reset();
    }
  };

  const handleSubmitForm = async (data: RegisterStudyBodyType) => {
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    const cleanPath = path.replace(/\/$/, '') || '/';

    // Tìm key khớp nhất (dài nhất) bắt đầu bằng cleanPath
    const matchingKey = Object.keys(DATA_INPUT_MAP)
      .sort((a, b) => b.length - a.length)
      .find((key) => cleanPath.startsWith(key));

    let defaultDataInput = matchingKey ? DATA_INPUT_MAP[matchingKey] : DATA_INPUT_SOURCE.LANDING_PAGE;

    // logic to fetch course name if it's a child course Page
    const courseKeys = ['/tieng-trung-cho-nguoi-di-lam', '/khoa-hoc-hsk'];
    if (matchingKey && courseKeys.includes(matchingKey)) {
      const slug = cleanPath.replace(matchingKey, '').replace(/^\//, '');
      if (slug) {
        const courseData = await fetchCourseDetail(slug);
        if (courseData) {
          defaultDataInput = `Khóa học ${courseData.name}`;
        }
      }
    }

    // logic to fetch lecturer name if it's a lecturer detail Page
    if (matchingKey === '/doi-ngu-giang-vien') {
      const slug = cleanPath.replace(matchingKey, '').replace(/^\//, '');
      if (slug) {
        const teacherData = await fetchTeacherDetail(slug);
        if (teacherData) {
          defaultDataInput = `Trang giảng viên ${teacherData.name}`;
        }
      }
    }

    handleRegisterStudy({
      ...data,
      wishlist_courses: data.wishlist_courses ? data.wishlist_courses : 'HSK 3.0',
      data_input: dataInput || defaultDataInput,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (registerRedirect === 'true') {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [registerRedirect]);

  const renderTrigger = () => {
    if (buttonComponent === 'Phan1MucNhoButton' && buttonProps) {
      return <Phan1MucNhoButton {...buttonProps} />;
    }
    if (children) {
      return <div className="w-full sm:w-auto">{children}</div>;
    }
    return <Button className={buttonClassName}>{buttonText || 'Đăng ký tư vấn'}</Button>;
  };

  return (
    <Dialog open={openModal} onOpenChange={handleChangeModal}>
      <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
      <DialogContent className="z-[999] w-[95vw] sm:w-[600px] sm:max-w-[600px] border-none bg-[#0a31b6] p-6 md:p-10 text-white shadow-2xl duration-700 sm:rounded-[24px] [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:opacity-80">
        <DialogHeader>
          <DialogTitle className="text-center text-[22px] md:text-[28px] lg:text-[32px] font-black uppercase text-white leading-[1.1] md:leading-[1.2]">
            <span className="md:whitespace-nowrap">TÌM HIỂU LỘ TRÌNH, KIỂM TRA</span> <br className="hidden md:block"/>
            <span className="md:whitespace-nowrap">TRÌNH ĐỘ & NHẬN ƯU ĐÃI</span>
          </DialogTitle>
          <DialogDescription className="text-center text-white/90 text-[12px] md:text-[14px] mt-1.5 md:mt-2 font-normal">
            <span className="md:whitespace-nowrap">THE IELTS SPACE Sẽ Liên Hệ Với Bạn Trong Thời Gian Sớm Nhất Qua Thông Tin Đăng Ký</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <div className="mb-2 mt-1 flex flex-col gap-1.5 md:gap-2">
              <InputItem
                form={form}
                formName={'name'}
                formLabel="Họ Và Tên"
                type="text"
                formPlaceholder={'Họ và Tên'}
              />
              <InputItem
                form={form}
                formName={'phone'}
                formLabel="Số Điện Thoại"
                type="tel"
                formPlaceholder={'Số Điện Thoại'}
              />
              <InputItem
                form={form}
                formName={'email'}
                formLabel="Email"
                type="email"
                formPlaceholder={'info@example.com'}
              />
              <FormField
                control={form.control}
                name={'wishlist_courses'}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0.5 w-full">
                    <FormLabel className="text-white font-bold text-[12px] md:text-[13px]">Khóa Học Mà Bạn Quan Tâm</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        name="wishlist_courses"
                        className="h-10 md:h-[46px] w-full rounded-[8px] md:rounded-[12px] border-none bg-white px-4 text-[13px] md:text-[14px] text-gray-700 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        <option className="capitalize" value="Bứt Phá (5.0-6.0+)">Bứt Phá (5.0-6.0+)</option>
                        <option className="capitalize" value="Cất Cánh (6.0-7.0+)">Cất Cánh (6.0-7.0+)</option>
                        <option className="capitalize" value="Chinh Phục (7.0-8.0+)">Chinh Phục (7.0-8.0+)</option>
                      </select>
                    </FormControl>
                    <FormMessage className="mt-0.5 pl-1 text-[10px] text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-center">
              <Button
                type="submit"
                variant={isPending ? 'outline' : 'default'}
                className={clsx(
                  { 'cursor-progress opacity-80': isPending },
                  'mt-4 w-full h-[48px] rounded-[12px] md:rounded-full bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-[15px] md:text-[18px] font-black uppercase text-white shadow-lg border-none'
                )}
              >
                {isPending ? (
                  <div className="flex flex-row gap-2">
                    <div className="h-4 w-4 animate-bounce rounded-full bg-white"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-.3s]"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-.5s]"></div>
                  </div>
                ) : (
                  'ĐĂNG KÝ NGAY!'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type InputItemProps = {
  form: UseFormReturn<any>;
  formName: string;
  formLabel: string;
  formPlaceholder: string;
  type: 'text' | 'number' | 'email' | 'tel';
  minNumber?: number;
  maxNumber?: number;
  disabled?: boolean;
};

const InputItem = ({ form, formLabel, formName, formPlaceholder, type, disabled }: InputItemProps) => {
  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-0.5 w-full">
          <FormLabel className="text-white font-bold text-[12px] md:text-[13px]">{formLabel}</FormLabel>
          <FormControl>
            <Input
              placeholder={formPlaceholder}
              {...field}
              type={type}
              disabled={disabled}
              value={field.value || ''}
              className="h-10 md:h-[46px] w-full rounded-[8px] md:rounded-[12px] border-none bg-white px-4 text-[13px] md:text-[14px] text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </FormControl>
          <FormMessage className="mt-0.5 pl-1 text-[10px] text-red-300" />
        </FormItem>
      )}
    />
  );
};

export default RegisterStudyModal;
