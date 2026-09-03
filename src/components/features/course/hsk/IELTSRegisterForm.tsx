import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { cn } from '@/lib/utils';

interface IELTSRegisterFormProps {
  icons?: {
    noteBook?: string;
  };
  defaultObjective?: string;
  isSimpleForm?: boolean;
  isCourseChinese?: boolean;
  dataInput?: string;
  className?: string;
  children?: React.ReactNode;
}

const targetOptions = [
  'Thi IELTS để đi du học/đi làm',
  'Dùng tiếng Trung trong công việc',
  'Giao tiếp tự tin với đối tác/người bản xứ',
  'Mục tiêu khác',
];

const levelOptions = [
  'Mất gốc / mới bắt đầu',
  'Đã học cơ bản (tầm IELTS 3.0 - 4.5)',
  'Đã học trung cấp (tầm IELTS 5.0 - 6.0)',
  'Đã có nền, cần ôn thi / dùng cho công việc',
];

const contactOptions = ['Gọi điện', 'Nhắn Zalo', 'Email'];

const timeOptions = ['Sáng (8h - 12h)', 'Chiều (13h30 - 18h)', 'Tối (Sau 18h)'];

export default function IELTSRegisterForm({
  icons,
  isSimpleForm = false,
  isCourseChinese = false,
  dataInput = '',
  className = '',
  children,
  defaultObjective = '',
}: IELTSRegisterFormProps) {
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
    <div className={cn('relative mx-auto mt-0 w-full max-w-[680px] md:-mt-5', className)}>
      <div className="relative px-2 md:px-0">
        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-4">
            {/* Row 1: Name and Email */}
            <div className="col-span-1 space-y-2 text-left">
              <Label htmlFor="name" className="text-[14px] font-bold text-white md:text-base">
                Họ Và Tên
              </Label>
              <Input
                id="name"
                type="text"
                {...form.register('name')}
                placeholder="Nguyên Van A"
                className={`h-12 rounded-lg border-0 bg-white text-[#504E4E] focus-visible:ring-white md:h-14 ${
                  form.formState.errors.name ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="col-span-1 space-y-2 text-left">
              <Label htmlFor="phone" className="text-[14px] font-bold text-white md:text-base">
                Số Điện Thoại
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  {...form.register('phone', {
                    onChange: (e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      form.setValue('phone', value);
                    },
                  })}
                  placeholder="Số điện thoại của bạn"
                  className={`h-12 rounded-lg border-0 bg-white text-[#504E4E] focus-visible:ring-white md:h-14 ${
                    form.formState.errors.phone ? 'ring-2 ring-red-500' : ''
                  }`}
                  maxLength={10}
                />
              </div>
              {form.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.phone.message}</p>
              )}
            </div>

            {/* Row 2: Objective and Phone */}
            <div className="col-span-1 space-y-2 text-left md:block">
              <Label htmlFor="course" className="text-[14px] font-bold text-white md:text-base">
                Mục Tiêu Của Bạn
              </Label>
              <Select
                
                value={form.watch('wishlist_courses')}
                onValueChange={(value) => form.setValue('wishlist_courses', value)}
              >
                <SelectTrigger id="course" className="h-12 rounded-lg border-0 bg-white text-[#504E4E] focus:ring-white md:h-14">
                  <SelectValue placeholder="Chọn mục tiêu" />
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

            <div className="col-span-1 space-y-2 text-left">
              <Label htmlFor="email" className="text-[14px] font-bold text-white md:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="info@example.com"
                className={`h-12 rounded-lg border-0 bg-white text-[#504E4E] focus-visible:ring-white md:h-14 ${
                  form.formState.errors.email ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Row 3: Note */}
            <div className="col-span-1 md:col-span-2 space-y-2 text-left">
              <Label htmlFor="note" className="text-[14px] font-bold text-white md:text-base">
                Câu Hỏi Khác? *
              </Label>
              <Textarea
                id="note"
                {...form.register('note')}
                placeholder="Viết câu hỏi tại đây"
                rows={4}
                className="resize-none rounded-lg border-0 bg-white text-[#504E4E] focus-visible:ring-white md:h-[120px]"
              />
            </div>
          </div>

          {children}

          {/* isCourseChinese ? (
            <div className="relative mx-auto w-full pt-1 text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="relative mx-auto flex items-center justify-center gap-[10px] min-h-[50px] w-full rounded-[24px] border-[3px] border-white bg-[#F97316] py-[6px] px-[16px] text-base font-black uppercase text-white shadow-lg transition-colors hover:opacity-90 disabled:opacity-70 md:min-h-[68px] md:text-2xl"
              >
                {isPending ? 'Đang xử lý...' : isSuccess ? 'Thành công!' : (
                  <span>GỬI THÔNG TIN CHO THE IELTS SPACE</span>
                )}
              </Button>
              <p className="mt-2 text-xs font-normal text-white md:text-[16px] md:leading-[150%]">
                THE IELTS SPACE sẽ liên hệ lại trong vòng <span className="font-bold">24 giờ</span> làm việc.
              </p>
            </div>
          ) */}

          {/* Submit Button */}
          <div className="relative mx-auto w-full pt-4 text-center md:text-right">
            <Button
              type="submit"
              disabled={isPending}
              className="relative mx-auto md:ml-auto md:mr-0 flex items-center justify-center gap-[10px] min-h-[50px] w-full max-w-[330px] md:max-w-[460px] rounded-[24px] border-[3px] border-white bg-[#F97316] py-[6px] px-[16px] text-[15px] font-black uppercase text-white shadow-lg transition-colors hover:opacity-90 disabled:opacity-70 md:min-h-[68px] md:text-[20px]"
            >
              {icons?.noteBook && (
                <img
                  src={icons.noteBook}
                  alt={'noteBook'}
                  width={80}
                  height={80}
                  className="absolute -left-9 top-1/2 z-20 h-[54px] w-auto -translate-y-1/2 rotate-12 object-cover md:-left-12 md:h-[80px]"
                />
              )}
              {isPending ? 'Đang xử lý...' : isSuccess ? 'Thành công!' : (
                <span>GỬI THÔNG TIN CHO THE IELTS SPACE</span>
              )}
            </Button>
            <p className="mt-2 text-center text-[12.5px] md:text-right font-normal text-white md:text-[17px] md:leading-[150%]">
              THE IELTS SPACE sẽ liên hệ lại trong vòng <span className="font-bold">24 giờ</span> làm việc.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
