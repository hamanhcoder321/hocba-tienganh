
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { cn } from '@/lib/utils';

interface AboutRegisterFormProps {
  dataInput?: string;
  className?: string;

  defaultObjective?: string;}

export default function AboutRegisterForm({
  dataInput = '',
  className = '',
  defaultObjective = '',
}: AboutRegisterFormProps) {
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
    <div className={cn('relative mx-auto w-full max-w-[700px]', className)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[257px_257px] md:justify-center md:gap-x-[24px] md:gap-y-[16px]">
          
          {/* Row 1: Name and Email */}
          <div className="col-span-1 space-y-2 text-left">
            <Label htmlFor="name" className="text-[14px] font-bold text-white md:text-base">
              Họ Và Tên
            </Label>
            <Input
              id="name"
              type="text"
              {...form.register('name')}
              placeholder="Robot fox"
              className={`h-12 rounded-[8px] border-0 bg-white text-[#504E4E] focus-visible:ring-white w-full md:w-[257px] md:h-[70px] md:px-[16px] md:py-[20px] ${
                form.formState.errors.name ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.name.message}</p>
            )}
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
              className={`h-12 rounded-[8px] border-0 bg-white text-[#504E4E] focus-visible:ring-white w-full md:w-[257px] md:h-[70px] md:px-[16px] md:py-[20px] ${
                form.formState.errors.email ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Row 2: Objective and Phone */}
          <div className="col-span-1 space-y-2 text-left hidden md:block">
            <Label htmlFor="course" className="text-[14px] font-bold text-white md:text-base">
              Mục Tiêu Của Bạn
            </Label>
            <Select
              
              value={form.watch('wishlist_courses')}
              onValueChange={(value) => form.setValue('wishlist_courses', value)}
            >
              <SelectTrigger id="course" className="h-12 rounded-[8px] border-0 bg-white text-[#504E4E] focus:ring-white w-full md:w-[257px] md:h-[70px] md:px-[16px] md:py-[20px]">
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
                placeholder="+1253 457 7840"
                className={`h-12 rounded-[8px] border-0 bg-white text-[#504E4E] focus-visible:ring-white w-full md:w-[257px] md:h-[70px] md:px-[16px] md:py-[20px] ${
                  form.formState.errors.phone ? 'ring-2 ring-red-500' : ''
                }`}
                maxLength={10}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-200 text-left">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {/* Row 3: Note */}
          <div className="col-span-1 md:col-span-2 space-y-2 text-left md:block">
            <Label htmlFor="note" className="text-[14px] font-bold text-white md:text-base">
              Câu Hỏi Khác? *
            </Label>
            <Textarea
              id="note"
              {...form.register('note')}
              placeholder="Viết câu hỏi tại đây"
              rows={4}
              className="resize-none rounded-[8px] border-0 bg-white text-[#504E4E] focus-visible:ring-white w-full md:w-[538px] md:h-[137px] md:px-[16px] md:py-[20px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="relative mx-auto mt-6 w-full pt-2 flex justify-center md:flex md:justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className="relative flex items-center justify-center h-[37px] w-[229px] p-[16px] rounded-[30px] bg-white text-[#072899] text-[12px] md:text-2xl font-black uppercase shadow-lg transition-colors hover:bg-[#FFF4D7] disabled:opacity-70 md:h-[70px] md:w-[538px] md:rounded-[50px] md:px-[24px] md:py-[20px]"
          >
            {isPending ? 'Đang xử lý...' : isSuccess ? 'Thành công!' : 'NHẬN TƯ VẤN MIỄN PHÍ'}
          </Button>
        </div>
      </form>
    </div>
  );
}
