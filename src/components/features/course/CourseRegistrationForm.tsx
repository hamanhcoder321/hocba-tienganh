import RegisterStudyModal from '@/components/common/RegisterStudyModal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { PlayIcon } from '@/components/common/icons';

interface CourseRegistrationFormProps {
  courseName: string;
  isDarkRed?: boolean;
}

export default function CourseRegistrationForm({ courseName, isDarkRed }: CourseRegistrationFormProps) {
  const { form, isPending, isSuccess, handleRegisterStudy } = useRegisterStudy();

  const onSubmit = async (data: RegisterStudyBodyType) => {
    try {
      await handleRegisterStudy({
        ...data,
        wishlist_courses: courseName,
        data_input: `Khóa học ${courseName}`,
        target: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={isDarkRed ? "Họ tên" : "Họ và tên*"}
                  className={isDarkRed ? "h-[38px] rounded-[8px] border-[0.5px] border-[#969696] bg-white text-black placeholder:text-[#969696] font-gilroy" : ""}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-700">+84</span>
                  <Input
                    {...field}
                    placeholder="Nhập số điện thoại"
                    className={`pl-14 ${isDarkRed ? "h-[38px] rounded-[8px] border-[0.5px] border-[#969696] bg-white text-black placeholder:text-[#969696] font-gilroy" : ""}`}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={isDarkRed ? "Ghi chú thêm nếu có" : "Ghi chú thêm nếu có (VD: thời gian học thử)"}
                  className={`mb-8 resize-none ${isDarkRed ? "rounded-[8px] border-[0.5px] border-[#969696] bg-white text-black placeholder:text-[#969696] font-gilroy" : ""}`}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className={`relative inline-flex gap-[9.03px] w-[283.86px] lg:w-full h-[36.14px] lg:h-[48px] items-center justify-center mx-auto whitespace-nowrap rounded-full bg-gradient-to-r from-[#7D1900] to-[#B90E0A] px-4 text-[18.07px] lg:text-[24px] font-[900] text-white uppercase transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_28px_0px_#FF4040] active:scale-[0.98] disabled:opacity-70 shadow-[0_4px_14px_rgba(185,14,10,0.3)] font-gilroy leading-[24.09px] lg:leading-[32px] ${isDarkRed ? 'border-2 border-white' : 'hover:ring-2 hover:ring-white'}`}
        >
          <PlayIcon className="!w-[24px] !h-[24px] md:!w-[28px] md:!h-[28px] lg:absolute lg:left-[26px] lg:top-1/2 lg:-translate-y-1/2 lg:!w-[40px] lg:!h-[40px] fill-white shrink-0" />
          <span>
            {isPending ? 'ĐANG XỬ LÝ...' : isSuccess ? 'THÀNH CÔNG!' : 'ĐĂNG KÝ TƯ VẤN'}
          </span>
        </Button>
      </form>
    </Form>
  );
}
