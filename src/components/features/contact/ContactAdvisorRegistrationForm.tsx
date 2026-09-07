import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterStudy } from '@/hooks/features/use-common';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';
import { cn } from '@/lib/utils';

// Form đăng ký tư vấn dùng chung cho nhiều trang (SimpleFormRegister, FormRegisterCourseChinese).
// dataInput được truyền từ từng trang để backend phân biệt lead đến từ đâu.
// isSimpleForm=true sẽ ẩn 4 field nâng cao (trình độ, mục tiêu, liên hệ, khung giờ).
// isCourseChinese — xem ghi chú @deprecated bên dưới.

interface ContactAdvisorRegistrationFormProps {
  icons?: {
    noteBook?: string;
  };
  defaultObjective?: string;
  isSimpleForm?: boolean;
  // @deprecated — thêm hồi làm trang tiếng Trung (27/03/2026), giờ chỉ còn FormRegisterCourseChinese dùng.
  // TODO: bỏ prop này + block submit bên dưới khi không còn cần trang tiếng Trung nữa.
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

export default function ContactAdvisorRegistrationForm({
  icons,
  isSimpleForm = false,
  isCourseChinese = false,
  dataInput = '',
  className = '',
  children,
  defaultObjective = '',
}: ContactAdvisorRegistrationFormProps) {
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
    <div className={cn('relative mx-auto mt-0 w-full max-w-[450px] md:-mt-5', className)}>
      <div className="relative">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-6 md:gap-y-3">

            {/* họ tên + sdt — luôn hiện */}
            <div className="col-span-1 space-y-2">
              <Label htmlFor="name" className="text-[15px] font-semibold text-white md:text-base">
                Họ Và Tên
              </Label>
              <Input
                id="name"
                type="text"
                {...form.register('name')}
                placeholder="Nguyen van A"
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
                  className={`h-12 rounded-lg border-0 bg-white focus-visible:ring-white md:h-14 ${
                    form.formState.errors.phone ? 'ring-2 ring-red-500' : ''
                  }`}
                  maxLength={10}
                />
              </div>
              {form.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-200">{form.formState.errors.phone.message}</p>
              )}
            </div>

            {/* trình độ + nghề nghiệp — chỉ hiện ở trang tiếng Trung */}
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
                    <SelectTrigger id="level" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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

            {/* mục tiêu + email — luôn hiện */}
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="course" className="text-[15px] font-semibold text-white md:text-base">
                Mục Tiêu IELTS Của Bạn
              </Label>
              <Select
                value={form.watch('wishlist_courses')}
                onValueChange={(value) => form.setValue('wishlist_courses', value)}
              >
                <SelectTrigger id="course" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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

            {/* 4 field nâng cao — ẩn khi isSimpleForm=true */}
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
                    <SelectTrigger id="level" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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
                    Mục tiêu tiếng Anh của bạn
                  </Label>
                  <Select value={form.watch('target')} onValueChange={(value) => form.setValue('target', value)}>
                    <SelectTrigger id="target" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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
                    <SelectTrigger id="contact" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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
                    <SelectTrigger id="time" className="h-12 rounded-lg border-0 bg-white font-normal focus:ring-white md:h-14">
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

          {/* slot cho content bổ sung — SimpleFormRegister nhét ảnh cô gái mobile vào đây */}
          {children}

          
            <div className="relative mx-auto w-full pt-4 text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="relative mx-auto flex items-center justify-center gap-[10px] min-h-[50px] w-full max-w-[386px] translate-x-2 md:translate-x-4 rounded-[24px] border-[3px] border-white bg-[#F97316] py-[6px] px-[16px] text-base font-black uppercase text-white shadow-lg transition-colors hover:opacity-90 disabled:opacity-70 md:min-h-[68px] md:text-2xl"
              >
                {/* icon sổ nằm absolute, trôi ra ngoài bên trái nút */}
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
                  <span className="flex flex-col items-center leading-tight">
                    <span>GỬI THÔNG TIN CHO</span>
                    <span>THE IELTS SPACE</span>
                  </span>
                )}
              </Button>
              <p className="mt-2 text-center md:text-right font-normal text-white whitespace-nowrap text-[12px] leading-[20px] md:text-[15px] md:leading-[150%]">
                THE IELTS SPACE sẽ liên hệ lại trong vòng <span className="font-bold">24 giờ</span> làm việc.
              </p>
            </div>
        </form>
      </div>
    </div>
  );
}
