import { CATEGORY_TYPES } from './enums';

export type CategoryItem = {
  id: number;
  link: string;
  image: string;
  title: string;
  content: string;
  color: string;
  secondBg: string;
  bgRoadmap: string;
};

export const HOME_CATEGORIES: CategoryItem[] = [
  {
    id: CATEGORY_TYPES.HSK,
    link: '/khoa-hoc-ielts',
    image: '/images/hero-hsk.webp',
    title: 'IELTS',
    // title: 'hsk',
    content:
      'Xây dựng nền tảng kiến thức vững chắc, chuẩn chỉnh từ sơ cấp tới nâng cao. Học tập và ôn luyện cùng giáo viên giàu kinh nghiệm giúp bạn tiến bộ rõ nét qua từng bài học.',
    color: '#B90E0A',
    secondBg: 'bg-red-200',
    bgRoadmap: 'bg-[#B90E0A]',
  },
  // {
  //   id: CATEGORY_TYPES.TIENG_TRUNG_CHO_NGUOI_DI_LAM,
  //   link: '/tieng-trung-cho-nguoi-di-lam',
  //   image: '/images/clarity_talk.png',
  //   title: 'Tiếng Trung cho người đi làm',
  //   content:
  //     'Lộ trình học được thiết kế theo năng lực và mục tiêu của từng học viên, giúp bạn nhanh chóng sở hữu được bộ kỹ năng của một biên, phiên dịch chuyên nghiệp.',
  //   color: '#B90E0A',
  //   secondBg: 'bg-red-200',
  //   bgRoadmap: 'bg-[#B90E0A]',
  // },
  //   {
  //     id: CATEGORY_TYPES.TOCFL,
  //     link: '/khoa-hoc-tocfl',
  //     image: '/images/hero-tof.webp',
  //     title: 'tocfl',
  //     content:
  //       'Phương pháp giảng dạy hiệu quả và giáo trình được biên soạn bám sát cấu trúc đề thi giúp bạn rèn luyện 4 kỹ năng một cách toàn diện và đạt được kết quả cao nhất.',
  //     color: '#11573d',
  //     secondBg: 'bg-red-200',
  //     bgRoadmap: 'bg-[#11573d]',
  //   },
];

export const PROGRAM_OPTIONS = {
  // HSK: {
  //   label: 'HSK',
  //   options: ['HSK 1-2', 'HSK 3-4', 'HSK 5-6'],
  // },
  CHINESE: {
    label: 'IELTS',
    options: [
      'IELTS Khởi động (0-3.0+)',
      'IELTS Cất cánh (3.0-4.0+)',
      'IELTS Tăng tốc (4.0-5.0+)',
      'IELTS Bứt phá (5.0-6.0+)',
      'IELTS Vươn xa (6.0-7.0+)',
      'IELTS Chinh phục (7.0-8.0+)'
    ],
  },
} as const;

export const EXPERIENCE_OPTIONS = [
  { label: '1-3 năm', min: 1, max: 3 },
  { label: '3-5 năm', min: 3, max: 5 },
  { label: '5+ năm', min: 5, max: 100 },
] as const;

export const CONTACTS = {
  address: {
    label: 'Toà Nhà Hoà Phát, 257 Giải Phóng, Bạch Mai, Hà Nội',
    value: 'https://maps.app.goo.gl/kMGiEXyvfdGzYEVB8',
  },
  linkWeb: import.meta.env.PUBLIC_CLIENT_URL ?? 'https://thespace.edu.vn',
  hotline: '0888.861.786',
  email: 'theenglishspace01@gmail.com',
  facebookHskUrl: 'https://www.facebook.com/hocbahsk',
  facebookEducationUrl: 'https://www.facebook.com/hocba.education',
  facebookChineseUrl: 'https://www.facebook.com/hocbachinese',
  tiktokUrl: 'https://www.tiktok.com/@hocba.hsk',
  ytbkUrl: 'https://www.youtube.com/@MarketingH%E1%BB%8DcB%C3%A1',
  igUrl: 'https://www.instagram.com/hocba_hsk/',
  linkMap:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8543960250013!2d105.83695097921886!3d20.998472930733282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bbf06ce69841b7%3A0xb9558b4da269809b!2zSOG7jWMgQsOhIEVkdWNhdGlvbg!5e0!3m2!1svi!2s!4v1771991546559!5m2!1svi!2s',
};

const SlugCourseMap = {
  SO_0: 'so-0',
  HSK_2: 'hsk-1-2',
  HSK_3: 'hsk-3',
  HSK_4: 'hsk-4',
  HSK_5: 'hsk-5',
  HSK_6: 'hsk-6',
} as const;

export const input: TRoadmapCourse[] = [
  {
    id: 'inp_band_0',
    name: 'Số 0',
    slug: SlugCourseMap.SO_0,
    content:
      'Chưa có nền tảng hoặc mới bắt đầu làm quen với tiếng Anh, cần xây dựng từ những kiến thức cốt lõi đầu tiên.',
  },
  {
    id: 'inp_band_3',
    name: 'Band 3.0',
    slug: SlugCourseMap.HSK_2,
    content:
      'Có nền tảng từ vựng và ngữ pháp cơ bản, hiểu được những nội dung đơn giản.',
  },
  {
    id: 'inp_band_4',
    name: 'Band 4.0',
    slug: SlugCourseMap.HSK_3,
    content:
      'Có thể hiểu và diễn đạt những ý quen thuộc, đã biết cách xử lý một số dạng bài nhưng thiếu sự linh hoạt và ổn định.',
  },
  {
    id: 'inp_band_5',
    name: 'Band 5.0',
    slug: SlugCourseMap.HSK_4,
    content:
      'Có khả năng sử dụng tiếng Anh tương đối độc lập và xử lý các dạng bài IELTS phổ biến, nhưng còn hạn chế với nội dung phức tạp và học thuật.',
  },
  {
    id: 'inp_band_6',
    name: 'Band 6.0',
    slug: SlugCourseMap.HSK_5,
    content:
      'Có thể sử dụng tiếng Anh khá hiệu quả, diễn đạt tương đối rõ ràng và xử lý phần lớn yêu cầu của bài thi với độ chính xác khá tốt trong các tình huống quen thuộc.',
  },
  {
    id: 'inp_band_7',
    name: 'Band 7.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Sử dụng tiếng Anh tốt và linh hoạt, xử lý hiệu quả nội dung quen thuộc, diễn đạt mạch lạc và duy trì độ chính xác cao ở cả 4 kỹ năng.',
  },
];
export const output: TRoadmapCourse[] = [
  {
    id: 'out_band_3',
    name: 'Band 3.0',
    slug: SlugCourseMap.HSK_2,
    content:
      'Có nền tảng từ vựng và ngữ pháp cơ bản, hiểu được những nội dung đơn giản.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 3.0<br/>Thời gian dự kiến: 4 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người mất gốc, nền tảng tiếng Anh còn yếu hoặc chưa từng học IELTS, cần xây chắc kiến thức cơ bản trước khi bước vào giai đoạn luyện thi.

        <br/><strong>Lộ trình học tập:</strong> 01 khóa IELTS Khởi động (4 tháng)`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Xây dựng nền tảng phát âm, từ vựng và ngữ pháp; hình thành khả năng nghe, nói, đọc, viết tiếng Anh cơ bản và làm quen với cấu trúc bài thi IELTS.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe và nhận diện được các thông tin cụ thể như tên, số, thời gian, địa điểm trong hội thoại ngắn, quen thuộc.</li>
          <li><strong>Speaking:</strong> Trả lời được các câu hỏi đơn giản về bản thân và chủ đề quen thuộc bằng câu tương đối đầy đủ.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn ngắn 100–150 từ, xác định được ý chính và thông tin trực tiếp.</li>
          <li><strong>Writing:</strong> Viết được đoạn văn 5–7 câu có liên kết đơn giản về các chủ đề cá nhân và quen thuộc.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Nắm các cấu trúc ngữ pháp cốt lõi, hệ thống 44 âm tiếng Anh và vốn từ theo các chủ đề đời sống phổ biến.</li>
          <li><strong>IELTS Skills:</strong> Làm quen cấu trúc bài thi và một số dạng bài IELTS cơ bản.</li>
        </ul>`,
      },
    ],
  },
  {
    id: 'out_band_4',
    name: 'Band 4.0',
    slug: SlugCourseMap.HSK_3,
    content:
      'Có thể hiểu và diễn đạt những ý quen thuộc, đã biết cách xử lý một số dạng bài nhưng thiếu sự linh hoạt và ổn định.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 4.0<br/>Thời gian dự kiến: 8 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người mất gốc hoặc nền tảng tiếng Anh còn yếu, muốn xây chắc kiến thức cơ bản và từng bước phát triển năng lực làm bài IELTS.

        <br/><strong>Lộ trình học tập:</strong> IELTS Khởi động → Cất cánh`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Xây chắc nền tảng tiếng Anh và phát triển đồng đều 4 kỹ năng; từ làm quen với IELTS đến có thể xử lý những dạng bài cơ bản ở mức band 4.0.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu hội thoại quen thuộc, xác định được thông tin chi tiết và ý chính đơn giản.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1 và bước đầu Part 2; trình bày được ý tương đối rõ về các chủ đề quen thuộc.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn 150–200 từ và xử lý được các dạng bài cơ bản như Matching Information.</li>
          <li><strong>Writing:</strong> Viết được Task 2 rút gọn khoảng 180 từ với bố cục mở bài – thân bài – kết bài và ý tưởng liên quan đến đề.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Mở rộng vốn từ theo các chủ đề IELTS phổ biến; sử dụng chắc hơn các cấu trúc ngữ pháp nền tảng và một số cấu trúc mở rộng.</li>
          <li><strong>IELTS Skills:</strong> Làm quen và thực hành các dạng bài IELTS cơ bản ở cả 4 kỹ năng, hình thành những chiến lược làm bài ban đầu.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Đầu vào: IELTS 3.0<br/>Đầu ra: IELTS 4.0<br/>Thời gian dự kiến: 3 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng tiếng Anh cơ bản nhưng kỹ năng IELTS còn hạn chế, cần củng cố kiến thức và làm quen sâu hơn với các dạng bài cơ bản.

        <br/><strong>Lộ trình học tập:</strong> 01 khoá Cất cánh`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Củng cố nền tảng và phát triển đồng đều 4 kỹ năng; từ khả năng sử dụng tiếng Anh cơ bản đến bước đầu xử lý được các dạng bài IELTS ở mức band 4.0.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu hội thoại quen thuộc, xác định được thông tin chi tiết và ý chính đơn giản.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1 và bước đầu Part 2; trình bày được ý tương đối rõ về các chủ đề quen thuộc.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn 150–200 từ và xử lý được các dạng bài cơ bản như Matching Information.</li>
          <li><strong>Writing:</strong> Viết được Task 2 rút gọn khoảng 180 từ với bố cục mở bài – thân bài – kết bài và ý tưởng liên quan đến đề.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Mở rộng vốn từ theo các chủ đề IELTS phổ biến; sử dụng chắc hơn các cấu trúc ngữ pháp nền tảng và một số cấu trúc mở rộng.</li>
          <li><strong>IELTS Skills:</strong> Thực hành các dạng bài IELTS cơ bản ở cả 4 kỹ năng và hình thành những chiến lược làm bài ban đầu.</li>
        </ul>`,
      },
    ],
  },
  {
    id: 'out_band_5',
    name: 'Band 5.0',
    slug: SlugCourseMap.HSK_4,
    content:
      'Có khả năng sử dụng tiếng Anh tương đối độc lập và xử lý các dạng bài IELTS phổ biến, nhưng còn hạn chế với nội dung phức tạp và học thuật.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 5.0<br/>Thời gian dự kiến: 11 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người mất gốc hoặc nền tảng còn yếu, muốn xây chắc tiếng Anh từ đầu và phát triển từng bước đến khả năng làm bài IELTS ở mức band 5.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Khởi động → Cất cánh → Tăng tốc`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ nền tảng tiếng Anh cơ bản đến khả năng xử lý tương đối đầy đủ 4 kỹ năng IELTS; biết vận dụng kiến thức ngôn ngữ và chiến lược làm bài vào các dạng bài phổ biến.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu các bài hội thoại, thảo luận và bài nói ngắn; xác định được ý chính, thông tin chi tiết và một số thông tin cần suy luận.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3; biết mở rộng câu trả lời và trình bày quan điểm ở mức cơ bản.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn 200–250 từ, xác định ý chính và xử lý các dạng bài như Matching Heading và câu hỏi suy luận cơ bản.</li>
          <li><strong>Writing:</strong> Viết được Task 1 mô tả biểu đồ đơn giản và Task 2 khoảng 230 từ với bố cục đầy đủ, lập luận tương đối rõ ràng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Mở rộng vốn từ theo các chủ đề IELTS và sử dụng các cấu trúc ngữ pháp đa dạng hơn để diễn đạt ý rõ ràng, chính xác.</li>
          <li><strong>IELTS Skills:</strong> Làm quen và thực hành tương đối đầy đủ các phần của 4 kỹ năng, từng bước hình thành chiến lược xử lý các dạng bài IELTS phổ biến.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Đầu vào: IELTS 3.0<br/>Đầu ra: IELTS 5.0<br/>Thời gian dự kiến: 6,5 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng tiếng Anh cơ bản, muốn phát triển đầy đủ 4 kỹ năng và nâng dần khả năng làm bài IELTS đến mức band 5.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Cất cánh → IELTS Tăng tốc`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng xử lý các dạng bài IELTS cơ bản đến hoàn thiện cấu trúc 4 kỹ năng, biết vận dụng kiến thức ngôn ngữ và chiến lược làm bài ở mức band 5.0.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu hội thoại, bài giảng và bài nói ngắn; xác định được ý chính, thông tin chi tiết và một số thông tin cần suy luận.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3; biết mở rộng câu trả lời và trình bày quan điểm ở mức cơ bản.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn 200–250 từ, xác định ý chính và xử lý được Matching Heading cùng một số câu hỏi suy luận.</li>
          <li><strong>Writing:</strong> Viết được Task 1 mô tả biểu đồ đơn giản và Task 2 khoảng 230 từ với bố cục đầy đủ, lập luận tương đối rõ ràng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Mở rộng vốn từ theo các chủ đề IELTS và sử dụng đa dạng hơn các cấu trúc ngữ pháp để diễn đạt ý rõ ràng, chính xác.</li>
          <li><strong>IELTS Skills:</strong> Thực hành tương đối đầy đủ các phần của 4 kỹ năng và hình thành chiến lược xử lý các dạng bài IELTS phổ biến.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Đầu vào: IELTS 4.0<br/>Đầu ra: IELTS 5.0<br/>Thời gian dự kiến: 3 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS cơ bản, muốn hoàn thiện dần 4 kỹ năng và nâng khả năng xử lý các dạng bài lên mức band 5.0.

        <br/><strong>Lộ trình học tập:</strong> 01 khóa IELTS Tăng tốc`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Phát triển từ khả năng làm các dạng bài cơ bản đến xử lý tương đối đầy đủ 4 kỹ năng IELTS; nâng khả năng phân tích, phát triển ý và vận dụng chiến lược làm bài.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài giảng và bài nói ngắn, xác định được ý chính, thông tin chi tiết và một số thông tin cần suy luận.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3; biết mở rộng câu trả lời và trình bày quan điểm ở mức cơ bản.</li>
          <li><strong>Reading:</strong> Đọc hiểu đoạn văn 200–250 từ, xử lý được Matching Heading và một số câu hỏi suy luận.</li>
          <li><strong>Writing:</strong> Viết được Task 1 mô tả biểu đồ đơn giản và Task 2 khoảng 230 từ với bố cục đầy đủ, lập luận tương đối rõ ràng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Mở rộng vốn từ học thuật và sử dụng đa dạng hơn các cấu trúc ngữ pháp để diễn đạt ý rõ ràng, chính xác.</li>
          <li><strong>IELTS Skills:</strong> Thực hành tương đối đầy đủ các phần của 4 kỹ năng và phát triển chiến lược xử lý những dạng bài IELTS phổ biến.</li>
        </ul>`,
      },
    ],
  },
  {
    id: 'out_band_6',
    name: 'Band 6.0',
    slug: SlugCourseMap.HSK_5,
    content:
      'Có thể sử dụng tiếng Anh khá hiệu quả, diễn đạt tương đối rõ ràng và xử lý phần lớn yêu cầu của bài thi với độ chính xác khá tốt trong các tình huống quen thuộc.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 6.0<br/>Thời gian dự kiến: 15 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người mất gốc hoặc nền tảng còn yếu, muốn xây dựng tiếng Anh từ đầu và phát triển toàn diện 4 kỹ năng để đạt năng lực IELTS 6.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Khởi động → Cất cánh → Tăng tốc → Bứt phá`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ mất gốc đến khả năng xử lý đầy đủ 4 kỹ năng IELTS; sử dụng tiếng Anh tương đối linh hoạt và biết vận dụng các chiến lược làm bài trong điều kiện gần với bài thi thực tế.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài thi đầy đủ 4 phần, nhận diện được ý chính, thông tin chi tiết, ý ngầm định và nhiều giọng nói khác nhau.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3 tương đối trôi chảy; biết phát triển ý và sử dụng từ vựng đủ linh hoạt với cả những chủ đề ít quen thuộc.</li>
          <li><strong>Reading:</strong> Đọc và xử lý 3 bài Reading đầy đủ; hiểu ý chính, thông tin chi tiết, câu hỏi suy luận và từ vựng học thuật ở mức trung bình.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 khoảng 150 từ và Task 2 khoảng 250 từ với bố cục rõ ràng, lập luận hợp lý và vốn từ tương đối đa dạng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật và các cấu trúc ngữ pháp đa dạng hơn, kiểm soát lỗi tốt hơn khi diễn đạt những ý phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Thực hành đầy đủ cấu trúc bài thi 4 kỹ năng, biết phân bổ thời gian và áp dụng chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Đầu vào: IELTS 3.0<br/>Đầu ra: IELTS 6.0<br/>Thời gian dự kiến: 10 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng tiếng Anh cơ bản, muốn phát triển toàn diện 4 kỹ năng và nâng năng lực làm bài IELTS đến mức band 6.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Cất cánh → IELTS Tăng tốc → IELTS Bứt phá`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng xử lý các dạng bài IELTS cơ bản đến hoàn thành đầy đủ 4 kỹ năng; biết vận dụng chiến lược làm bài, quản lý thời gian và sử dụng tiếng Anh tương đối linh hoạt.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài thi đầy đủ 4 phần, nhận diện ý chính, thông tin chi tiết, ý ngầm định và nhiều giọng nói khác nhau.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3 tương đối trôi chảy; biết phát triển ý và diễn đạt cả những chủ đề ít quen thuộc.</li>
          <li><strong>Reading:</strong> Xử lý 3 bài Reading đầy đủ; hiểu ý chính, thông tin chi tiết, câu hỏi suy luận và từ vựng học thuật ở mức trung bình.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 khoảng 150 từ và Task 2 khoảng 250 từ với bố cục rõ ràng, lập luận hợp lý và vốn từ tương đối đa dạng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật và các cấu trúc ngữ pháp đa dạng hơn, kiểm soát lỗi tốt hơn khi diễn đạt ý phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Thực hành đầy đủ cấu trúc bài thi 4 kỹ năng, biết phân bổ thời gian và áp dụng chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Đầu vào: IELTS 4.0<br/>Đầu ra: IELTS 6.0<br/>Thời gian dự kiến: 6,5 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS cơ bản, muốn hoàn thiện toàn diện 4 kỹ năng và nâng năng lực làm bài lên mức band 6.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Tăng tốc → IELTS Bứt phá`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng xử lý các dạng bài IELTS cơ bản đến hoàn thành đầy đủ 4 kỹ năng; nâng khả năng phân tích, phát triển ý và vận dụng chiến lược làm bài trong điều kiện gần với bài thi thực tế.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài thi đầy đủ 4 phần, nhận diện được ý chính, thông tin chi tiết, ý ngầm định và nhiều giọng nói khác nhau.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3 tương đối trôi chảy; biết phát triển ý và diễn đạt cả những chủ đề ít quen thuộc.</li>
          <li><strong>Reading:</strong> Xử lý 3 bài Reading đầy đủ; hiểu ý chính, thông tin chi tiết, câu hỏi suy luận và từ vựng học thuật ở mức trung bình.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 khoảng 150 từ và Task 2 khoảng 250 từ với bố cục rõ ràng, lập luận hợp lý và vốn từ tương đối đa dạng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật và các cấu trúc ngữ pháp đa dạng hơn, kiểm soát lỗi tốt hơn khi diễn đạt ý phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Thực hành đầy đủ cấu trúc bài thi 4 kỹ năng, biết phân bổ thời gian và áp dụng chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_4,
        sugges: `Đầu vào: IELTS 5.0<br/>Đầu ra: IELTS 6.0<br/>Thời gian dự kiến: 3 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS tương đối vững, muốn hoàn thiện 4 kỹ năng và nâng khả năng làm bài lên mức band 6.0.

        <br/><strong>Lộ trình học tập:</strong> 01 khóa IELTS Bứt phá`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Hoàn thiện khả năng xử lý đầy đủ 4 kỹ năng IELTS; nâng độ chính xác, khả năng phát triển ý và vận dụng chiến lược làm bài trong điều kiện gần với bài thi thực tế.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài thi đầy đủ 4 phần, nhận diện được ý chính, thông tin chi tiết, ý ngầm định và nhiều giọng nói khác nhau.</li>
          <li><strong>Speaking:</strong> Hoàn thành Speaking Part 1–3 tương đối trôi chảy; biết phát triển ý và diễn đạt cả những chủ đề ít quen thuộc.</li>
          <li><strong>Reading:</strong> Xử lý 3 bài Reading đầy đủ; hiểu ý chính, thông tin chi tiết, câu hỏi suy luận và từ vựng học thuật ở mức trung bình.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 khoảng 150 từ và Task 2 khoảng 250 từ với bố cục rõ ràng, lập luận hợp lý và vốn từ tương đối đa dạng.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật và các cấu trúc ngữ pháp đa dạng hơn, kiểm soát lỗi tốt hơn khi diễn đạt ý phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Thực hành đầy đủ cấu trúc bài thi 4 kỹ năng, biết phân bổ thời gian và áp dụng chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
    ],
  },
  {
    id: 'out_band_7',
    name: 'Band 7.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Sử dụng tiếng Anh tốt và linh hoạt, xử lý hiệu quả nội dung quen thuộc, diễn đạt mạch lạc và duy trì độ chính xác cao ở cả 4 kỹ năng.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 7.0<br/>Thời gian dự kiến: 19 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người mất gốc hoặc nền tảng còn yếu, muốn xây dựng tiếng Anh từ đầu và phát triển toàn diện năng lực IELTS đến mức band 7.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Khởi động → Cất cánh → Tăng tốc → Bứt phá → Vươn xa`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ mất gốc đến khả năng sử dụng tiếng Anh khá thành thạo và xử lý bài thi IELTS ở mức độ cao; phát triển tư duy học thuật, độ chính xác và khả năng diễn đạt linh hoạt trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài nói tốc độ nhanh, xử lý được nhiều giọng khác nhau và nhận diện thái độ, quan điểm của người nói.</li>
          <li><strong>Speaking:</strong> Trình bày tương đối tự nhiên và trôi chảy; phát triển ý tốt, sử dụng collocation và idiom phù hợp, phát âm rõ ràng, dễ hiểu.</li>
          <li><strong>Reading:</strong> Xử lý bài đọc học thuật đầy đủ trong thời gian quy định; hiểu từ vựng nâng cao và xử lý được các câu hỏi suy luận phức tạp.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận rõ ràng, ý tưởng được phát triển đầy đủ, vốn từ linh hoạt và lỗi ngữ pháp không ảnh hưởng đến việc truyền đạt.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng linh hoạt hơn từ vựng học thuật, collocation và các cấu trúc ngữ pháp nâng cao để diễn đạt những ý tưởng phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ cấu trúc bài thi 4 kỹ năng, nâng cao tốc độ xử lý, quản lý thời gian và lựa chọn chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Đầu vào: IELTS 3.0<br/>Đầu ra: IELTS 7.0<br/>Thời gian dự kiến: 14 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng tiếng Anh cơ bản, muốn phát triển toàn diện 4 kỹ năng và nâng năng lực IELTS lên mức band 7.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Cất cánh → IELTS Tăng tốc → IELTS Bứt phá → IELTS Vươn xa`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ nền tảng IELTS cơ bản đến khả năng xử lý bài thi ở mức độ cao; phát triển tư duy học thuật, độ chính xác và khả năng diễn đạt linh hoạt trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài nói tốc độ nhanh, xử lý được nhiều giọng khác nhau và nhận diện thái độ, quan điểm của người nói.</li>
          <li><strong>Speaking:</strong> Trình bày tương đối tự nhiên và trôi chảy; phát triển ý tốt, sử dụng collocation và idiom phù hợp, phát âm rõ ràng, dễ hiểu.</li>
          <li><strong>Reading:</strong> Xử lý bài đọc học thuật đầy đủ trong thời gian quy định; hiểu từ vựng nâng cao và xử lý được các câu hỏi suy luận phức tạp.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận rõ ràng, ý tưởng phát triển đầy đủ, vốn từ linh hoạt và lỗi ngữ pháp không ảnh hưởng đến việc truyền đạt.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng linh hoạt hơn từ vựng học thuật, collocation và các cấu trúc ngữ pháp nâng cao để diễn đạt những ý tưởng phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ cấu trúc bài thi 4 kỹ năng, nâng cao tốc độ xử lý, quản lý thời gian và lựa chọn chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Đầu vào: IELTS 4.0<br/>Đầu ra: IELTS 7.0<br/>Thời gian dự kiến: 11 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS cơ bản, muốn phát triển toàn diện 4 kỹ năng và nâng năng lực lên mức band 7.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Tăng tốc → IELTS Bứt phá → IELTS Vươn xa`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ nền tảng IELTS cơ bản đến khả năng xử lý bài thi ở mức độ cao; phát triển tư duy học thuật, độ chính xác và khả năng diễn đạt linh hoạt trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài nói tốc độ nhanh, xử lý được nhiều giọng khác nhau và nhận diện thái độ, quan điểm của người nói.</li>
          <li><strong>Speaking:</strong> Trình bày tương đối tự nhiên và trôi chảy; phát triển ý tốt, sử dụng collocation và idiom phù hợp, phát âm rõ ràng, dễ hiểu.</li>
          <li><strong>Reading:</strong> Xử lý bài đọc học thuật đầy đủ trong thời gian quy định; hiểu từ vựng nâng cao và xử lý được các câu hỏi suy luận phức tạp.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận rõ ràng, ý tưởng phát triển đầy đủ, vốn từ linh hoạt và lỗi ngữ pháp không ảnh hưởng đến việc truyền đạt.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng linh hoạt từ vựng học thuật, collocation và các cấu trúc ngữ pháp nâng cao để diễn đạt những ý tưởng phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ cấu trúc bài thi 4 kỹ năng, nâng cao tốc độ xử lý, quản lý thời gian và lựa chọn chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_4,
        sugges: `Đầu vào: IELTS 5.0<br/>Đầu ra: IELTS 7.0<br/>Thời gian dự kiến: 7 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS tương đối vững, muốn nâng cao toàn diện 4 kỹ năng và phát triển năng lực học thuật đến mức band 7.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Bứt phá → IELTS Vươn xa`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng hoàn thành đầy đủ bài thi IELTS đến mức xử lý bài ở độ khó cao hơn; nâng độ chính xác, tốc độ xử lý và khả năng diễn đạt linh hoạt trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài nói tốc độ nhanh, xử lý được nhiều giọng khác nhau và nhận diện thái độ, quan điểm của người nói.</li>
          <li><strong>Speaking:</strong> Trình bày tương đối tự nhiên và trôi chảy; phát triển ý tốt, sử dụng collocation và idiom phù hợp, phát âm rõ ràng, dễ hiểu.</li>
          <li><strong>Reading:</strong> Xử lý bài đọc học thuật đầy đủ trong thời gian quy định; hiểu từ vựng nâng cao và xử lý được các câu hỏi suy luận phức tạp.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận rõ ràng, ý tưởng phát triển đầy đủ, vốn từ linh hoạt và lỗi ngữ pháp không ảnh hưởng đến việc truyền đạt.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng linh hoạt từ vựng học thuật, collocation và các cấu trúc ngữ pháp nâng cao để diễn đạt những ý tưởng phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ cấu trúc bài thi 4 kỹ năng, nâng cao tốc độ xử lý, quản lý thời gian và lựa chọn chiến lược phù hợp với từng dạng bài.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_5,
        sugges: `Đầu vào: IELTS 6.0<br/>Đầu ra: IELTS 7.0<br/>Thời gian dự kiến: 4 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS khá vững, muốn nâng cao độ chính xác, khả năng xử lý ngôn ngữ học thuật và phát triển 4 kỹ năng lên mức band 7.0.

        <br/><strong>Lộ trình học tập:</strong> 01 khóa IELTS Vươn xa`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Nâng năng lực từ mức hoàn thành tốt bài thi IELTS đến khả năng xử lý các nội dung khó hơn; tăng tốc độ, độ chính xác và khả năng diễn đạt linh hoạt trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu bài nói tốc độ nhanh, xử lý được nhiều giọng khác nhau và nhận diện thái độ, quan điểm của người nói.</li>
          <li><strong>Speaking:</strong> Trình bày tương đối tự nhiên và trôi chảy; phát triển ý tốt, sử dụng collocation và idiom phù hợp, phát âm rõ ràng, dễ hiểu.</li>
          <li><strong>Reading:</strong> Xử lý bài đọc học thuật đầy đủ trong thời gian quy định; hiểu từ vựng nâng cao và xử lý được các câu hỏi suy luận phức tạp.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận rõ ràng, ý tưởng phát triển đầy đủ, vốn từ linh hoạt và lỗi ngữ pháp không ảnh hưởng đến việc truyền đạt.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng linh hoạt từ vựng học thuật, collocation và các cấu trúc ngữ pháp nâng cao để diễn đạt những ý tưởng phức tạp.</li>
          <li><strong>IELTS Skills:</strong> Nâng cao tốc độ xử lý, quản lý thời gian và lựa chọn chiến lược phù hợp với từng dạng bài ở mức độ khó cao hơn.</li>
        </ul>`,
      },
    ],
  },
  {
    id: 'out_band_8',
    name: 'Band 8.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Làm chủ tiếng Anh ở trình độ cao, sử dụng ngôn ngữ linh hoạt, chính xác và tự nhiên trong những tình huống học thuật phức tạp.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Đầu vào: IELTS 0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 23 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Lộ trình toàn diện từ con số 0 đến trình độ tiếng Anh cao cấp, dành cho người mất gốc hoặc nền tảng còn yếu, muốn xây dựng tiếng Anh từ đầu và phát triển năng lực IELTS toàn diện đến mức band 8.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Khởi động → Cất cánh → Tăng tốc → Bứt phá → Vươn xa → Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ mất gốc đến khả năng sử dụng tiếng Anh ở mức thành thạo cao; xử lý chính xác các nội dung học thuật phức tạp và diễn đạt linh hoạt, tự nhiên trong cả 4 kỹ năng IELTS.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để phát triển và diễn đạt những ý tưởng phức tạp, trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật giàu sắc thái và các cấu trúc ngữ pháp phức tạp với độ chính xác cao, hạn chế tối đa lỗi diễn đạt.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ toàn bộ cấu trúc bài thi, tối ưu chiến lược và quản lý thời gian, đồng thời duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Đầu vào: IELTS 3.0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 18,5 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng tiếng Anh cơ bản, muốn phát triển toàn diện năng lực IELTS và tiến tới mức sử dụng tiếng Anh thành thạo cao ở band 8.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Cất cánh → IELTS Tăng tốc → IELTS Bứt phá → IELTS Vươn xa → IELTS Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ nền tảng IELTS cơ bản đến khả năng xử lý chính xác các nội dung học thuật phức tạp và diễn đạt linh hoạt, tự nhiên trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để phát triển và diễn đạt những ý tưởng phức tạp, trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật giàu sắc thái và các cấu trúc ngữ pháp phức tạp với độ chính xác cao, hạn chế tối đa lỗi diễn đạt.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ toàn bộ cấu trúc bài thi, tối ưu chiến lược và quản lý thời gian, đồng thời duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Đầu vào: IELTS 4.0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 15 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS cơ bản, muốn phát triển toàn diện 4 kỹ năng và tiến tới khả năng sử dụng tiếng Anh thành thạo ở mức band 8.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Tăng tốc → IELTS Bứt phá → IELTS Vươn xa → IELTS Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ nền tảng IELTS cơ bản đến khả năng xử lý chính xác các nội dung học thuật phức tạp và diễn đạt linh hoạt, tự nhiên trong cả 4 kỹ năng.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để phát triển và diễn đạt những ý tưởng phức tạp, trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật giàu sắc thái và các cấu trúc ngữ pháp phức tạp với độ chính xác cao, hạn chế tối đa lỗi diễn đạt.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ toàn bộ cấu trúc bài thi, tối ưu chiến lược và quản lý thời gian, đồng thời duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_4,
        sugges: `Đầu vào: IELTS 5.0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 11,5 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS tương đối vững, muốn nâng cao toàn diện 4 kỹ năng và phát triển năng lực tiếng Anh học thuật đến mức band 8.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Bứt phá → IELTS Vươn xa → IELTS Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng hoàn thành đầy đủ bài thi IELTS đến mức xử lý chính xác các nội dung học thuật phức tạp; nâng cao độ chính xác, tư duy lập luận và khả năng diễn đạt linh hoạt, tự nhiên.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để phát triển và diễn đạt những ý tưởng phức tạp, trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật giàu sắc thái và các cấu trúc ngữ pháp phức tạp với độ chính xác cao, hạn chế tối đa lỗi diễn đạt.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ toàn bộ cấu trúc bài thi, tối ưu chiến lược và quản lý thời gian, đồng thời duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_5,
        sugges: `Đầu vào: IELTS 6.0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 8 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS khá vững, muốn nâng cao toàn diện 4 kỹ năng và phát triển năng lực tiếng Anh học thuật đến mức band 8.0.

        <br/><strong>Lộ trình học tập:</strong> IELTS Vươn xa → IELTS Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ khả năng xử lý tốt bài thi IELTS đến mức sử dụng tiếng Anh thành thạo cao; nâng độ chính xác, tư duy lập luận và khả năng xử lý những nội dung học thuật phức tạp.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để phát triển và diễn đạt những ý tưởng phức tạp, trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Sử dụng vốn từ học thuật giàu sắc thái và các cấu trúc ngữ pháp phức tạp với độ chính xác cao, hạn chế tối đa lỗi diễn đạt.</li>
          <li><strong>IELTS Skills:</strong> Làm chủ cấu trúc bài thi, tối ưu chiến lược và quản lý thời gian, đồng thời duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
      {
        slug: SlugCourseMap.HSK_6,
        sugges: `Đầu vào: IELTS 7.0<br/>Đầu ra: IELTS 8.0<br/>Thời gian dự kiến: 4 tháng

        <br/><p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">LỘ TRÌNH NÀY DÀNH CHO AI?</p>

        <br/>Dành cho người đã có nền tảng IELTS tốt, muốn tinh chỉnh độ chính xác, nâng chiều sâu tư duy và hoàn thiện 4 kỹ năng ở mức band 8.0.

        <br/><strong>Lộ trình học tập:</strong> 01 khóa IELTS Chinh phục`,
        knowledg: `<p className="text-[18px] font-bold uppercase tracking-[0] text-[#052284] xl:text-[24px]">ĐÍCH ĐẾN LỘ TRÌNH</p>

        <br/>Từ năng lực IELTS tốt đến khả năng sử dụng tiếng Anh ở mức thành thạo cao; tập trung vào độ chính xác, sự tự nhiên và khả năng xử lý những nội dung học thuật phức tạp.

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li><strong>Listening:</strong> Nghe hiểu chính xác các bài nói có mật độ thông tin cao, nhiều giọng khác nhau và phân biệt được những sắc thái nghĩa tinh tế.</li>
          <li><strong>Speaking:</strong> Giao tiếp trôi chảy, tự nhiên; sử dụng ngôn ngữ linh hoạt để diễn đạt những ý tưởng phức tạp và trừu tượng.</li>
          <li><strong>Reading:</strong> Xử lý chính xác các văn bản học thuật phức tạp trong thời gian quy định, kể cả nội dung trừu tượng và câu hỏi suy luận khó.</li>
          <li><strong>Writing:</strong> Hoàn thành Task 1 và Task 2 với lập luận sâu, tổ chức bài mạch lạc tự nhiên, vốn từ chính xác, linh hoạt và độ chính xác ngữ pháp cao.</li>
          <li><strong>Vocabulary &amp; Grammar:</strong> Tinh chỉnh vốn từ học thuật theo sắc thái nghĩa và sử dụng các cấu trúc ngữ pháp phức tạp với độ chính xác cao.</li>
          <li><strong>IELTS Skills:</strong> Tối ưu chiến lược làm bài, quản lý thời gian và duy trì độ chính xác cao ở các dạng bài khó.</li>
        </ul>`,
      },
    ],
  },
];


export const LECTURER_BASE_PATH = '/giao-vien-ielts';
export const HOC_VIEN_DIEM_CAO_SLUG = 'hoc-vien-diem-cao';
export const NEWS_SLUGS = ['tong-hop-tin-tuc', 'tong-hop-su-kien'];
export const EXCLUDED_FROM_CAM_NANG = [...NEWS_SLUGS, HOC_VIEN_DIEM_CAO_SLUG];



