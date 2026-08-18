import { useState } from 'react';

const faqs = [
  {
    quest: 'Học phí cho mỗi khóa học tại Học Bá là bao nhiêu?',
    ans: 'Học phí các khóa học tại Học Bá dao động từ <strong>3 - 15 triệu</strong>, tùy theo cấp độ. Để nhận tư vấn chi tiết và lộ trình phù hợp với mục tiêu cá nhân, hãy để lại thông tin, Học Bá sẽ hỗ trợ bạn 1:1.',
  },
  {
    quest: 'Lộ trình học tại Học Bá như thế nào?',
    ans: 'Lộ trình ôn thi tại Học Bá được thiết kế cá nhân hóa, tập trung vào các kiến thức trọng tâm để học viên không lãng phí thời gian vào nội dung không cần thiết. Kết hợp cùng phương pháp học thông minh và tài liệu ôn luyện cập nhật theo chuẩn Tiếng Trung mới nhất, Học Bá giúp bạn tiếp thu nhanh, hiệu quả và tiết kiệm tối đa thời gian.',
  },
  {
    quest: 'Học bá có cam kết chất lượng đầu ra không?',
    ans: 'Có! Học Bá cam kết đầu ra rõ ràng cho từng khóa học. Nếu học viên tuân thủ đúng lộ trình học tập và hướng dẫn từ giáo viên nhưng không đạt kết quả như mong muốn, chúng tôi sẽ hỗ trợ học lại miễn phí hoặc có giải pháp bù đắp phù hợp.',
  },
  {
    quest: 'Người mới bắt đầu học Tiếng Trung cần tối thiểu bao lâu để giao tiếp cơ bản tiếng Trung?',
    ans: 'Thời gian để một người mới bắt đầu có thể giao tiếp cơ bản bằng Tiếng Trung phụ thuộc vào lộ trình học và mức độ tập trung của từng học viên. Với phương pháp giảng dạy tại Học Bá, nếu học viên học đúng lộ trình và thực hành đều đặn, chỉ sau 2-3 tháng, bạn đã có thể nắm vững các mẫu câu giao tiếp thông dụng và tự tin trao đổi trong những tình huống hàng ngày.',
  },
];

const Answer1 = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? 0 : index);
  };

  return (
    <div className="col-span-7 h-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="cursor-pointer rounded-[3.22px] bg-white px-4 py-6 shadow-[0px_1.61px_1.61px_0px_rgba(0,0,0,0.18)] sm:rounded-xl"
          onClick={() => toggleFAQ(index)}
        >
          <div className={`flex justify-between ${openIndex == index ? 'items-start' : 'items-center'}`}>
            <h3
              className={`w-4/5 text-[19px] font-bold capitalize leading-[19.95px] sm:w-full sm:text-lg 3xl:text-[24px] 3xl:leading-[36px] ${
                openIndex == index ? 'text-[#202020]' : 'text-[#555555]'
              } lg:text-xl`}
            >
              {index + 1}. {faq.quest}
            </h3>
            <span className="py-1 text-2xl 3xl:text-4xl">{openIndex === index ? '-' : '+'}</span>
          </div>
          {openIndex === index && (
            <p
              className="mt-4 text-lg text-[#000000] 3xl:text-[20px] 3xl:leading-[21px]"
              dangerouslySetInnerHTML={{ __html: faq.ans }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Answer1;
