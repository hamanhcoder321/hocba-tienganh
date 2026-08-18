import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRegisterStudyFormHandler } from '@/hooks/features/use-blog-filter';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import clsx from 'clsx';

export type TCourseRegistrationInfo = {
  id: string;
  buoi: string;
  gio: string;
  courseName: string;
};

type ScheduleRegisterModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  courseInfo: TCourseRegistrationInfo | null;
};

const ScheduleRegisterModal = ({ isOpen, onClose, courseInfo }: ScheduleRegisterModalProps) => {
  const { form, isSuccess, isPending, handleRegisterStudy } = useRegisterStudyFormHandler();

  const courseDetailsString = courseInfo
    ? `Lớp học quan tâm: ${courseInfo.id}, Buổi ${courseInfo.buoi}, Giờ học ${courseInfo.gio}`
    : '';

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        phone: '',
        email: '',
        wishlist_courses: courseDetailsString,
        note: '',
        data_input: courseInfo ? `Đăng ký từ Lịch Khai Giảng - ${courseInfo.courseName}` : 'Lịch Khai Giảng',
      });
    }
  }, [isOpen, courseInfo, form, courseDetailsString]);

  const handleChangeModal = (open: boolean) => {
    onClose(open);
    if (!open) {
      form.reset();
    }
  };

  const handleSubmitForm = async (data: RegisterStudyBodyType) => {
    handleRegisterStudy({
      ...data,
      wishlist_courses: courseDetailsString, // force course string
      data_input: courseInfo ? `Đăng ký từ Lịch Khai Giảng - ${courseInfo.courseName}` : 'Lịch Khai Giảng',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose(false);
    }
  }, [isSuccess, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModal}>
      <DialogContent
        hideClose
        className="z-[999] flex h-auto max-h-[95vh] w-[95vw] flex-col justify-start overflow-y-auto !rounded-[17.7px] border border-white bg-gradient-to-r from-[#7D1900] to-[#B90E0A] p-5 pt-6 shadow-[12px_20px_50px_0px_rgba(175,0,0,0.25)] sm:w-full sm:max-w-[520px] md:p-8 2xl:top-[55%] 3xl:p-10 3xl:pt-16"
      >
        <DialogClose className="absolute right-3 top-3 text-white opacity-70 transition-opacity hover:opacity-100 focus:outline-none md:right-4 md:top-4">
          <X className="h-5 w-5 md:h-7 md:w-7" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="mb-3 px-4 md:px-0 3xl:mb-6">
          <DialogTitle className="font-svn-gilroy text-center text-[20px] font-[1000] uppercase leading-[1.3] text-white sm:text-[22px] md:text-[26px] 3xl:text-[28px] 3xl:leading-[39.83px]">
            HỌC THỬ MIỄN PHÍ, KIỂM TRA
            <br />
            TRÌNH ĐỘ & NHẬN ƯU ĐÃI
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-3 3xl:space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="font-svn-gilroy text-[16px] font-semibold leading-[18.24px] text-white">
                    Họ Và Tên
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nguyen van A"
                      {...field}
                      className="font-svn-gilroy h-[44px] w-full rounded-[6.51px] border-none bg-white px-[13.03px] py-[12px] text-[15px] font-normal leading-normal text-[#504E4A] placeholder:text-[#504E4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[445.47px] 3xl:h-[47.2px] 3xl:py-[16.28px] 3xl:text-[16px] 3xl:leading-[15.63px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#FFC1C1]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="font-svn-gilroy text-[16px] font-semibold leading-[18.24px] text-white">
                    Số Điện Thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số điện thoại của bạn"
                      {...field}
                      className="font-svn-gilroy h-[44px] w-full rounded-[6.51px] border-none bg-white px-[13.03px] py-[12px] text-[15px] font-normal leading-normal text-[#504E4A] placeholder:text-[#504E4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[445.47px] 3xl:h-[47.2px] 3xl:py-[16.28px] 3xl:text-[16px] 3xl:leading-[15.63px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#FFC1C1]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="font-svn-gilroy text-[16px] font-semibold leading-[18.24px] text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="info@example.com"
                      {...field}
                      className="font-svn-gilroy h-[44px] w-full rounded-[6.51px] border-none bg-white px-[13.03px] py-[12px] text-[15px] font-normal leading-normal text-[#504E4A] placeholder:text-[#504E4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[445.47px] 3xl:h-[47.2px] 3xl:py-[16.28px] 3xl:text-[16px] 3xl:leading-[15.63px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#FFC1C1]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wishlist_courses"
              render={({ field }) => (
                <FormItem className="space-y-1.5 pt-2">
                  <FormControl>
                    <Textarea
                      {...field}
                      className="font-svn-gilroy h-[70px] w-full resize-none rounded-[6.51px] border-none bg-white px-[13.03px] py-[12px] text-[15px] font-normal leading-normal text-[#504E4A] placeholder:text-[#504E4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[445.47px] 3xl:h-[93.35px] 3xl:py-[16.28px] 3xl:text-[16px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#FFC1C1]" />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-5 3xl:pt-10">
              <Button
                type="submit"
                disabled={isPending}
                className={clsx(
                  'font-svn-gilroy h-[50px] w-full max-w-[302.39px] rounded-[64.9px] border-[2.48px] border-white bg-gradient-to-r from-[#F3C650] to-[#B90E0A] text-[18px] font-[1000] uppercase tracking-wide text-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)] md:text-[20px] 3xl:h-[56.05px]',
                  { 'cursor-progress': isPending },
                )}
              >
                {isPending ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-white"></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-white [animation-delay:-.3s]"></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-white [animation-delay:-.5s]"></div>
                  </div>
                ) : (
                  'ĐĂNG KÝ NGAY'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleRegisterModal;
