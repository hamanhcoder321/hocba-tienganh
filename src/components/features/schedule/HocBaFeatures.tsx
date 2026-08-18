import { FeatureBracketIcon, HocBaIcon, HocBaCommunityIcon, HocBaAdmissionIcon } from '@/components/common/icons';

const HocBaFeatures = () => {
  return (
    <section className="mx-auto mt-4 w-full">
      <div className="flex w-full flex-col items-center overflow-hidden rounded-[12px] bg-gradient-to-b from-[#B90E0A] to-[#7D1900] px-4 py-8 md:h-auto md:px-8 md:py-[46px]">
        {/* Title Section */}
        <div className="relative mb-6 text-center md:mb-16">
          <div className="relative mx-auto inline-block">
            {/* White bracket icon decoration */}
            <FeatureBracketIcon className="absolute top-[-15px] h-[18px] w-[16px] rotate-[-0.05deg] md:left-[8px] md:top-[-12px] md:h-[31px] md:w-[30.33px] md:rotate-0" />
            <h2 className="px-4 font-gilroy text-[18px] font-[900] uppercase leading-[1.2] text-white md:px-10 md:text-[42px]">
              <span className="whitespace-nowrap">NHẤT ĐỊNH PHẢI ĐẾN HỌC BÁ</span> <br /> HỌC TIẾNG TRUNG
            </h2>
          </div>
        </div>

        {/* Features Cards */}
        <div className="flex w-full flex-wrap justify-center gap-6 md:gap-10">
          {/* Card 1 */}
          <div className="group relative flex h-[177px] w-[320px] cursor-default select-none flex-col gap-[6px] rounded-[12px] bg-[#FFFFFF] px-6 py-5 shadow-xl transition-all duration-300 md:h-auto md:w-[435px] md:pb-[31px] md:pl-[35px] md:pr-[35px] md:pt-[31px] [@media(hover:hover)]:hover:!shadow-[0_9px_25px_rgba(255,238,201,0.6)]">
            <div className="flex justify-start">
              <HocBaIcon className="h-[45.12px] w-[45.12px] transition-colors duration-300 group-hover:text-[#B90E0A] md:h-16 md:w-16" />
            </div>
            <div className="flex flex-col items-start gap-[6px]">
              <h3 className="text-left font-gilroy text-[16px] font-bold leading-[1.2] text-[#000000] transition-colors duration-300 group-hover:text-[#B90E0A] md:text-[24px]">
                Phương pháp học hiệu quả
              </h3>
              {/* Decorative line with hover animation */}
              <div
                className="h-[7px] w-full max-w-[60px] rounded-[48px] bg-[#D9D9D9] transition-all ease-in-out [@media(hover:hover)]:group-hover:max-w-full [@media(hover:hover)]:group-hover:bg-[#B90E0A]"
                style={{ transitionDuration: '1500ms' }}
              />

              <ul className="flex flex-col gap-[6px]">
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Phương pháp hiện đại chuẩn quốc tế
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Học nhanh nhớ lâu nhắc lại liên tục
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Ứng dụng tốt trong công việc & đời sống
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex h-[177px] w-[320px] cursor-default select-none flex-col gap-[6px] rounded-[12px] bg-[#FFFFFF] px-6 py-5 shadow-xl transition-all duration-300 md:h-auto md:w-[435px] md:pb-[31px] md:pl-[35px] md:pr-[35px] md:pt-[31px] [@media(hover:hover)]:hover:!shadow-[0_9px_25px_rgba(255,238,201,0.6)]">
            <div className="flex justify-start">
              <HocBaCommunityIcon className="h-[45.12px] w-[45.12px] transition-colors duration-300 group-hover:text-[#B90E0A] md:h-16 md:w-16" />
            </div>
            <div className="flex flex-col items-start gap-[6px]">
              <h3 className="text-left font-gilroy text-[16px] font-bold leading-[1.2] text-[#000000] transition-colors duration-300 group-hover:text-[#B90E0A] md:text-[24px]">
                Giáo viên tinh hoa hội tụ
              </h3>
              {/* Decorative line with hover animation */}
              <div
                className="h-[7px] w-full max-w-[60px] rounded-[48px] bg-[#D9D9D9] transition-all ease-in-out [@media(hover:hover)]:group-hover:max-w-full [@media(hover:hover)]:group-hover:bg-[#B90E0A]"
                style={{ transitionDuration: '1500ms' }}
              />

              <ul className="flex flex-col gap-[6px]">
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Profile đỉnh cùng nghiệp vụ sư phạm cao
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Dày dặn trải nghiệm làm việc thực tế
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Tận tâm với học viên
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex h-[177px] w-[320px] cursor-default select-none flex-col gap-[6px] rounded-[12px] bg-[#FFFFFF] px-6 py-5 shadow-xl transition-all duration-300 md:h-auto md:w-[435px] md:pb-[31px] md:pl-[35px] md:pr-[35px] md:pt-[31px] [@media(hover:hover)]:hover:!shadow-[0_9px_25px_rgba(255,238,201,0.6)]">
            <div className="flex justify-start">
              <HocBaAdmissionIcon className="h-[45.12px] w-[45.12px] transition-colors duration-300 group-hover:text-[#B90E0A] md:h-16 md:w-16" />
            </div>
            <div className="flex flex-col items-start gap-[6px]">
              <h3 className="text-left font-gilroy text-[16px] font-bold leading-[1.2] text-[#000000] transition-colors duration-300 group-hover:text-[#B90E0A] md:text-[24px]">
                Công nghệ LMS & AI độc quyền
              </h3>
              {/* Decorative line with hover animation */}
              <div
                className="h-[7px] w-full max-w-[60px] rounded-[48px] bg-[#D9D9D9] transition-all ease-in-out [@media(hover:hover)]:group-hover:max-w-full [@media(hover:hover)]:group-hover:bg-[#B90E0A]"
                style={{ transitionDuration: '1500ms' }}
              />

              <ul className="flex flex-col gap-[6px]">
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Hiện đại, dễ sử dụng
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Tích hợp toàn bộ tính năng học tập
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="flex h-[15.6px] items-center shrink-0 md:h-[21.6px]">
                    <span className="h-1 w-1 rounded-full bg-[#000000]" />
                  </div>
                  <span className="font-gilroy text-[12px] font-normal leading-[1.3] text-[#000000] md:text-[18px] md:leading-[1.2]">
                    Cập nhật học liệu liên tục
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HocBaFeatures;
