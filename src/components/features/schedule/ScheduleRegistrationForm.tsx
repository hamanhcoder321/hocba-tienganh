import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { cn } from '@/lib/utils';

interface ScheduleRegistrationFormProps {
  icons?: {
    noteBook?: string;
  };
  defaultObjective?: string;
  dataInput?: string;
  className?: string;
}

const levelOptions = [
  'Mất gốc / mới bắt đầu',
  'Đã học cơ bản (tầm IELTS 3.0 - 4.5)',
  'Đã học trung cấp (tầm IELTS 5.0 - 6.0)',
  'Đã có nền, cần ôn thi / dùng cho công việc',
];

export default function ScheduleRegistrationForm({
  icons,
  dataInput = '',
  className = '',
  defaultObjective = '',
}: ScheduleRegistrationFormProps) {
  const { form, isPending, isSuccess, handleRegisterStudy } = useRegisterStudy({ wishlist_courses: defaultObjective || 'Du học, xin học bổng' });

  const onSubmit = async (data: RegisterStudyBodyType) => {
    try {
      await handleRegisterStudy({
        ...data,
        data_input: dataInput,
      });
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className={cn('relative mx-auto mt-0 w-full max-w-[680px]', className)}>
      <div className="relative">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-[18.1px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-[22.28px] md:gap-y-[18.1px]">
            {/* Họ Và Tên */}
            <div className="col-span-1 flex flex-col gap-[6.29px]">
              <Label
                htmlFor="name"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Họ Và Tên
              </Label>
              <Input
                id="name"
                type="text"
                {...form.register('name')}
                placeholder="Họ Và Tên"
                className={cn(
                  'font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] placeholder:text-[#504E4E] focus-visible:ring-white md:h-[57.42px] md:px-[15.74px] md:py-[19.67px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] placeholder:lg:text-[16px] xl:h-[57.42px] xl:text-[18px] placeholder:xl:text-[18px]',
                  form.formState.errors.name && 'ring-2 ring-red-500',
                )}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.name.message}</p>
              )}
            </div>

            {/* Số Điện Thoại */}
            <div className="col-span-1 flex flex-col gap-[6.29px]">
              <Label
                htmlFor="phone"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Số Điện Thoại
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-gray-700 md:left-[15.74px] md:text-[18px]">
                  +84
                </span>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register('phone', {
                    onChange: (e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      form.setValue('phone', value);
                    },
                  })}
                  placeholder="Nhập số điện thoại"
                  className={cn(
                    'font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white pl-14 text-base font-normal text-[#504E4E] placeholder:text-[#504E4E] focus-visible:ring-white md:h-[57.42px] md:pl-[55px] md:pr-[15.74px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] placeholder:lg:text-[16px] xl:h-[57.42px] xl:text-[18px] placeholder:xl:text-[18px]',
                    form.formState.errors.phone && 'ring-2 ring-red-500',
                  )}
                  maxLength={10}
                />
              </div>
              {form.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.phone.message}</p>
              )}
            </div>

            {/* Trình độ hiện tại */}
            <div className="hidden flex-col gap-[6.29px] md:col-span-1 md:flex">
              <Label
                htmlFor="level"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Trình độ hiện tại
              </Label>
              <Select
                value={form.watch('current_level')}
                onValueChange={(value) => form.setValue('current_level', value)}
              >
                <SelectTrigger
                  id="level"
                  className="font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] focus:ring-white md:h-[57.42px] md:px-[15.74px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] xl:h-[57.42px] xl:text-[18px]"
                >
                  <SelectValue placeholder="Chọn trình độ" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {levelOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nghề nghiệp */}
            <div className="hidden flex-col gap-[6.29px] md:col-span-1 md:flex">
              <Label
                htmlFor="job"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Nghề nghiệp của bạn
              </Label>
              <Input
                id="job"
                type="text"
                {...form.register('job')}
                placeholder="Nghề nghiệp của bạn"
                className={cn(
                  'font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] placeholder:text-[#504E4E] focus-visible:ring-white md:h-[57.42px] md:px-[15.74px] md:py-[19.67px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] placeholder:lg:text-[16px] xl:h-[57.42px] xl:text-[18px] placeholder:xl:text-[18px]',
                  form.formState.errors.job && 'ring-2 ring-red-500',
                )}
              />
            </div>

            {/* Khóa Học */}
            <div className="flex flex-col gap-[6.29px] md:col-span-1">
              <Label
                htmlFor="course"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Mục Tiêu Của Bạn
              </Label>
              <Select
                value={form.watch('wishlist_courses')}
                onValueChange={(value) => form.setValue('wishlist_courses', value)}
              >
                <SelectTrigger
                  id="course"
                  className="font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] focus:ring-white md:h-[57.42px] md:px-[15.74px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] xl:h-[57.42px] xl:text-[18px]"
                >
                  <SelectValue placeholder="Chọn khóa học" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Xét tuyển vào Đại học">Xét tuyển vào Đại học</SelectItem>
                  <SelectItem value="Xét tốt nghiệp Đại học">Xét tốt nghiệp Đại học</SelectItem>
                  <SelectItem value="Du học, xin học bổng">Du học, xin học bổng</SelectItem>
                  <SelectItem value="Định cư">Định cư</SelectItem>
                  <SelectItem value="Cơ hội nghề nghiệp">Cơ hội nghề nghiệp</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[6.29px] md:col-span-1">
              <Label
                htmlFor="email"
                className="font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="info@example.com"
                className={cn(
                  'font-svn-gilroy h-12 w-full rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] placeholder:text-[#504E4E] focus-visible:ring-white md:h-[57.42px] md:px-[15.74px] md:py-[19.67px] md:text-[18px] md:leading-normal lg:h-[54px] lg:text-[16px] placeholder:lg:text-[16px] xl:h-[57.42px] xl:text-[18px] placeholder:xl:text-[18px]',
                  form.formState.errors.email && 'ring-2 ring-red-500',
                )}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Câu Hỏi Khác */}
          <div className="flex flex-col gap-[6.29px] md:col-span-2">
            <Label
              htmlFor="note"
              className="hidden font-gilroy text-[16px] font-semibold capitalize leading-[22.03px] text-white md:block"
            >
              Câu Hỏi Khác?
            </Label>
            <Textarea
              id="note"
              {...form.register('note')}
              placeholder="Viết câu hỏi tại đây"
              className="font-svn-gilroy min-h-[100px] w-full resize-none rounded-[4px] border-0 bg-white text-base font-normal text-[#504E4E] placeholder:text-[#504E4E] focus-visible:ring-white md:h-[112.79px] md:px-[15.74px] md:py-[19.67px] md:text-[18px] md:leading-normal lg:h-[110px] lg:text-[16px] placeholder:lg:text-[16px] xl:h-[112.79px] xl:text-[18px] placeholder:xl:text-[18px]"
            />
          </div>

          {/* Submit Button */}
          <div className="relative mx-auto w-fit pt-1 text-center md:w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="relative mx-auto flex h-[39px] w-[251px] items-center justify-center gap-[10px] rounded-[25px] border-[1.68px] border-white bg-gradient-to-l from-[#B90E0A] to-[#7D1900] px-4 py-[6px] font-gilroy text-[15px] font-[1000] uppercase leading-[150%] text-white shadow-lg hover:bg-[#AF0000] disabled:opacity-70 md:h-[41.45px] md:w-[386.13px] md:rounded-[18px] md:border-2 md:bg-[#AF0000] md:bg-none md:text-[24px]"
            >
              {isPending ? (
                'Đang xử lý...'
              ) : isSuccess ? (
                'Thành công!'
              ) : (
                <>
                  <span className="md:hidden">GỬI THÔNG TIN CHO HỌC BÁ</span>
                  <span className="hidden md:inline">GỬI THÔNG TIN NGAY</span>
                </>
              )}
            </Button>
            <p className="mx-auto mt-[18px] w-[268px] text-center font-gilroy text-[12px] font-normal leading-[150%] text-white md:w-full md:text-[16px]">
              Học Bá sẽ liên hệ lại trong vòng <span className="font-[900]">24 giờ</span> làm việc.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
