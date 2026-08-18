import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { cn } from '@/lib/utils';

interface ContactAdvisorRegistrationFormProps {
  icons?: {
    noteBook?: string;
  };
  isSimpleForm?: boolean;
  isCourseChinese?: boolean;
  dataInput?: string;
  className?: string;
}

const targetOptions = [
  'Thi HSK để đi du học/đi làm',
  'Dùng tiếng Trung trong công việc',
  'Giao tiếp tự tin với đối tác/người bản xứ',
  'Mục tiêu khác',
];

const levelOptions = [
  'Mất gốc / mới bắt đầu',
  'Đã học cơ bản (tầm HSK 2-3)',
  'Đã học trung cấp (tầm HSK 4-5)',
  'Đã có nền, cần ôn thi / dùng cho công việc',
];

const contactOptions = ['Gọi điện', 'Nhắn Zalo', 'Email'];

const timeOptions = ['Sáng (8h - 12h)', 'Chiều (13h30 - 18h)', 'Tối (Sau 18h)'];

export default function ContactAdvisorRegistrationForm({
  icons,
  isSimpleForm = false,
  isCourseChinese = false,
  dataInput = '',
  className = '',
}: ContactAdvisorRegistrationFormProps) {
  const { form, isPending, isSuccess, handleRegisterStudy } = useRegisterStudy();

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
      <div className="relative">
        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
            <div className="col-span-1 space-y-2">
              <Label htmlFor="name" className="text-[15px] font-semibold text-white md:text-base">
                Họ Và Tên (*)
              </Label>
              <Input
                id="name"
                type="text"
                {...form.register('name')}
                placeholder="Họ Và Tên"
                className={`h-12 rounded-lg border-0 bg-white focus-visible:ring-white md:h-14 ${
                  form.formState.errors.name ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="phone" className="text-[15px] font-semibold text-white md:text-base">
                Số Điện Thoại (*)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-700">+84</span>
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
                  className={`h-12 rounded-lg border-0 bg-white pl-14 focus-visible:ring-white md:h-14 ${
                    form.formState.errors.phone ? 'ring-2 ring-red-500' : ''
                  }`}
                  maxLength={10}
                />
              </div>
              {form.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.phone.message}</p>
              )}
            </div>

            {isCourseChinese && (
              <>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="level" className="text-[15px] font-semibold text-white md:text-base">
                    Trình độ hiện tại
                  </Label>
                  <Select
                    value={form.watch('current_level')}
                    onValueChange={(value) => form.setValue('current_level', value)}
                  >
                    <SelectTrigger id="level" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
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

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="job" className="text-[15px] font-semibold text-white md:text-base">
                    Nghề nghiệp của bạn
                  </Label>
                  <Input
                    id="job"
                    type="text"
                    {...form.register('job')}
                    placeholder="Nghề nghiệp của bạn"
                    className={`h-12 rounded-lg border-0 bg-white focus-visible:ring-white md:h-14 ${
                      form.formState.errors.job ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                </div>
              </>
            )}

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="course" className="text-[15px] font-semibold text-white md:text-base">
                Khóa Học Bạn Quan Tâm
              </Label>
              <Select
                value={form.watch('wishlist_courses')}
                onValueChange={(value) => form.setValue('wishlist_courses', value)}
              >
                <SelectTrigger id="course" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
                  <SelectValue placeholder="Chọn khóa học" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="HSK 3.0">HSK 3.0</SelectItem>
                  <SelectItem value="Học tiếng trung dành cho người đi làm">
                    Khoá học tiếng Trung dành cho người đi làm
                  </SelectItem>
                  <SelectItem value="Tiếng Trung Doanh Nghiệp">Tiếng Trung Doanh Nghiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="email" className="text-[15px] font-semibold text-white md:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="info@example.com"
                className={`h-12 rounded-lg border-0 bg-white focus-visible:ring-white md:h-14 ${
                  form.formState.errors.email ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.email.message}</p>
              )}
            </div>

            {!isSimpleForm && (
              <>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="level" className="text-[15px] font-semibold text-white md:text-base">
                    Trình độ hiện tại của bạn
                  </Label>
                  <Select
                    value={form.watch('current_level')}
                    onValueChange={(value) => form.setValue('current_level', value)}
                  >
                    <SelectTrigger id="level" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
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

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="target" className="text-[15px] font-semibold text-white md:text-base">
                    Mục tiêu tiếng trung của bạn
                  </Label>
                  <Select value={form.watch('target')} onValueChange={(value) => form.setValue('target', value)}>
                    <SelectTrigger id="target" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
                      <SelectValue placeholder="Chọn mục tiêu" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {targetOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="contact" className="text-[15px] font-semibold text-white md:text-base">
                    Bạn muốn liên hệ qua?
                  </Label>
                  <Select
                    value={form.watch('contact_method') || ''}
                    onValueChange={(value) => form.setValue('contact_method', value)}
                  >
                    <SelectTrigger id="contact" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
                      <SelectValue placeholder="Chọn hình thức liên hệ" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {contactOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="time" className="text-[15px] font-semibold text-white md:text-base">
                    Khung giờ bạn tiện nghe máy?
                  </Label>
                  <Select
                    value={form.watch('available_time') || ''}
                    onValueChange={(value) => form.setValue('available_time', value)}
                  >
                    <SelectTrigger id="time" className="h-12 rounded-lg border-0 bg-white focus:ring-white md:h-14">
                      <SelectValue placeholder="Chọn khung giờ nghe máy" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {timeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="note" className="text-[15px] font-semibold text-white md:text-base">
                Câu Hỏi Khác?
              </Label>
              <Textarea
                id="note"
                {...form.register('note')}
                placeholder="Viết câu hỏi tại đây"
                rows={5}
                className="resize-none rounded-lg border-0 bg-white focus-visible:ring-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          {isCourseChinese ? (
            <div className="relative mx-auto w-fit pt-1 text-center md:w-full">
              <Button
                type="submit"
                disabled={isPending}
                className="relative h-10 w-fit rounded-[25px] border-2 border-white bg-gradient-to-l from-[#B90E0A] to-[#7D1900] px-10 text-base font-black uppercase text-white shadow-lg transition-colors disabled:opacity-70 md:h-12 md:rounded-full md:text-2xl"
              >
                {isPending ? 'Đang xử lý...' : isSuccess ? 'Thành công!' : 'Gửi thông tin cho Học Bá'}
              </Button>
              <p className="mt-2 text-xs font-light text-white md:text-base">
                Học Bá sẽ liên hệ lại trong vòng <span className="font-bold">24 giờ</span> làm việc.
              </p>
            </div>
          ) : (
            <div className="relative mx-auto w-fit pt-4 text-center md:w-full">
              <Button
                type="submit"
                disabled={isPending}
                className="relative h-10 w-fit rounded-[10px] border-[3px] border-white bg-gradient-to-l from-[#B90E0A] to-[#F3C650] px-10 text-base font-black uppercase text-white shadow-lg transition-colors disabled:opacity-70 md:h-12 md:rounded-full md:text-2xl"
              >
                {icons?.noteBook && (
                  <img
                    src={icons.noteBook}
                    alt={'noteBook'}
                    width={80}
                    height={80}
                    className="absolute -left-9 -top-2 z-20 h-[54px] w-auto rotate-12 object-cover md:-left-14 md:-top-[22px] md:h-[80px]"
                  />
                )}
                {isPending ? 'Đang xử lý...' : isSuccess ? 'Thành công!' : 'Gửi thông tin cho Học Bá'}
              </Button>
              <p className="mt-2 text-xs font-light text-white md:text-base">
                Học Bá sẽ liên hệ lại trong vòng <span className="font-bold">24 giờ</span> làm việc.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
