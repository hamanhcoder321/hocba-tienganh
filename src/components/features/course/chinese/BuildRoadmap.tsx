import {
  LoTrinhCaoCap,
  LoTrinhDaCoNenTang,
  LoTrinhMoiBatDauActive,
  LoTrinhSoCap,
  LoTrinhTrungCap,
} from '@/components/common/icons';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import { ChevronDown, MinusIcon, PlusIcon } from 'lucide-react';
import { useState, type JSX } from 'react';
import { toast } from 'sonner';

type TLocalData = {
  id: number;
  icon?: (props?: { fill?: string } | undefined) => JSX.Element;
  name?: string;
  slug?: string;
  title: string;
  abstract?: string;
  abstracts?: string[];
  dataResults?: any[];
};

const SlugCourseChineseMap = {
  MOI_BAT_DAU: 'newbie',
  DA_CO_NEN_TANG: 'foundation',
  GIAO_TIEP_CO_BAN: 'basic',
  GIAO_TIEP_TRUNG_CAP: 'intermediate',
  XA_HOI_TRUNG_CAP: 'advanced',
  GT1: 'gt1',
  GT2: 'gt2',
  GT3: 'gt3',
  GT4: 'gt4',
  GT5: 'gt5',
} as const;

const inpData: TLocalData[] = [
  {
    id: 0,
    icon: LoTrinhMoiBatDauActive,
    slug: SlugCourseChineseMap.MOI_BAT_DAU,
    title: 'Mới bắt đầu',
    abstract: 'Chưa từng học tiếng Trung hoặc đã học nhưng bị mất gốc, yếu kiến thức nền tảng.',
  },
  {
    id: 1,
    icon: LoTrinhDaCoNenTang,
    slug: SlugCourseChineseMap.DA_CO_NEN_TANG,
    title: 'Đã có nền tảng cơ bản',
    abstract: 'Dành cho học viên đã có một chút nền tảng nhưng chưa vững hoặc trình độ tương đương HSK 2',
  },
  {
    id: 2,
    icon: LoTrinhSoCap,
    slug: SlugCourseChineseMap.GIAO_TIEP_CO_BAN,
    title: 'Tiếng Trung giao tiếp cơ bản',
    abstract: 'Học viên có trình độ tương đương HSK 3, nghe hiểu được các cuộc hội thoại đời sống và công sở cơ bản',
  },
  {
    id: 3,
    icon: LoTrinhTrungCap,
    slug: SlugCourseChineseMap.GIAO_TIEP_TRUNG_CAP,
    title: 'Tiếng Trung giao tiếp trung cấp',
    abstract: 'Học viên có trình độ tương đương HSK 4, đã dùng được tiếng Trung trong công việc hàng ngày',
  },
  {
    id: 4,
    icon: LoTrinhCaoCap,
    slug: SlugCourseChineseMap.XA_HOI_TRUNG_CAP,
    title: 'Tiếng Trung giao tiếp cao cấp',
    abstract:
      'Học viên đạt trình độ tương đương HSK 5, sử dụng tiếng Trung thành thạo trong hầu hết các hoạt động công việc.',
  },
];

const outputData: TLocalData[] = [
  {
    id: 0,
    name: 'GT1',
    slug: SlugCourseChineseMap.GT1,
    title: 'Tiếng Trung cơ bản',
    abstracts: [
      'Làm chủ hệ thống phát âm Pinyin chuẩn và nắm vững các quy tắc ngôn ngữ cốt lõi để tạo tiền đề giao tiếp tự nhiên.',
      'Hình thành khả năng phản xạ trong các tình huống đời sống và công sở sơ cấp',
    ],
    dataResults: [
      {
        slug: SlugCourseChineseMap.MOI_BAT_DAU,
        time: '3 tháng',
        sugges: `
        - Khóa học được thiết kế chuyên biệt cho người đi làm mới bắt đầu, xây dựng nền tảng tiếng Trung sơ cấp bài bản, chú trọng tính ứng dụng thực tế và bám sát chuẩn HSK 1-2.
        <br/>- Trọng tâm huấn luyện phát âm Pinyin chuẩn ngay từ đầu, kết hợp nghe - nói giao tiếp trong môi trường công sở và đời sống cơ bản.
        Lộ trình: 0 -> GT1 
        `,
        goals: `
        - Xây dựng tư duy ngôn ngữ: Làm chủ hệ thống phát âm chuẩn và quy tắc cấu tạo câu đơn để diễn đạt ý muốn một cách mạch lạc.<br/>
        - Phản xạ giao tiếp thực tế: Nghe hiểu và phản hồi nhanh các thông tin cơ bản về định danh, con số và thời gian trong môi trường làm việc.<br/>
        - Xử lý tác vụ sơ cấp: Có khả năng hoàn thành các yêu cầu giao dịch, hỗ trợ công việc và điều phối sinh hoạt hằng ngày tại văn phòng.<br/>
        - Kết nối chuyên nghiệp: Áp dụng linh hoạt các quy chuẩn giao tiếp xã giao để tạo ấn tượng tốt ban đầu với đồng nghiệp và đối tác.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - Tích lũy 300 - 500 từ vựng cốt lõi về số đếm, chức danh, mua bán và các chủ đề định danh cá nhân.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - Làm chủ 54 điểm ngữ pháp cơ bản và 150 - 180 mẫu câu thực dụng trong đời sống và học tập.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Nghe: Nghe hiểu thông tin định danh, số điện thoại, giá cả (đến hàng triệu) và thời gian biểu.<br/>
        - Nói: Giới thiệu bản thân/công ty, thực hiện các mẫu chào hỏi chuyên nghiệp và xử lý tình huống đặt món, hỏi đường.<br/>
        - Đọc: Nhận diện chữ Hán cơ bản, đọc hiểu các bảng biểu và thông tin giao dịch đơn giản.<br/>
        - Viết: Soạn thảo được tin nhắn giao dịch ngắn và ghi chú thông tin cơ bản.<br/>
        - Nghi thức: Áp dụng đúng quy tắc xưng hô và nghi thức trao danh thiếp bằng hai tay.
        `,
      },
    ],
  },
  {
    id: 1,
    name: 'GT2',
    slug: SlugCourseChineseMap.GT2,
    title: 'Tiếng Trung Văn Phòng & Công Sở',
    abstracts: [
      'Chuyển đổi từ giao tiếp thông thường sang sử dụng tiếng Trung trong các quy trình nghiệp vụ văn phòng và tiếp đón đối tác.',
      'Nâng cao kỹ năng soạn thảo văn bản hành chính, email công sở, văn phòng',
    ],
    dataResults: [
      {
        slug: SlugCourseChineseMap.MOI_BAT_DAU,
        time: '6 tháng',
        sugges: `
        - Lộ trình tập trung vào các kỹ năng nghiệp vụ thực tế, giúp học viên tự tin đại diện công ty đón tiếp đối tác và chuyên gia nước ngoài.<br/>
        - Huấn luyện chuyên sâu quy trình đón tiễn tại sân bay, sắp xếp lưu trú, văn hóa bàn tiệc (kính rượu, gọi món) và kỹ năng soạn thảo email hành chính đúng văn phong công sở.<br/>
        Lộ trình: 0 -> GT1 -> GT2 
        `,
        goals: `
        - Làm chủ quy trình nghiệp vụ: Có khả năng thực hiện trọn vẹn các chuỗi tác vụ phối hợp và hỗ trợ đối ngoại tại doanh nghiệp.<br/>
        - Kỹ năng văn bản ứng dụng: Thành thạo việc truyền đạt thông tin qua email và các loại văn bản hành chính theo đúng quy chuẩn chuyên nghiệp.<br/>
        - Nâng tầm phản xạ hội thoại: Sử dụng linh hoạt các cấu trúc câu phức để giải thích quy trình, báo cáo tiến độ và thảo luận dịch vụ.<br/>
        - Tự tin trong tương tác: Xóa bỏ rào cản ngôn ngữ để phối hợp nhịp nhàng với cấp trên và khách hàng trong các hoạt động hằng ngày.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 400+ từ vựng chuyên dụng về văn phòng, hội họp, sân bay và khách sạn.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ mẫu ngữ pháp trọng điểm (câu chữ 把, bổ ngữ kết quả/xu hướng, câu điều kiện) ứng dụng vào báo cáo và email.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Nghe: Nghe hiểu chi tiết yêu cầu dịch vụ tại sân bay/khách sạn và các thông báo hành chính.<br/>
        - Nói: Thực hiện đón tiễn khách, phát biểu ngắn tại tiệc và xử lý khiếu nại phát sinh lịch sự.<br/>
        - Đọc/Viết: Soạn thảo email đúng văn phong công sở, trình ký công văn và đọc hiểu báo cáo công việc ngắn.<br/>
        - Kỹ năng mềm: Thuyết trình ngắn, phân công công việc và nghệ thuật thương lượng trong công việc hằng ngày.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.DA_CO_NEN_TANG,
        time: '3 tháng',
        sugges: `
        - Dành cho học viên đã có nền tảng giao tiếp cơ bản, muốn chuyên nghiệp hóa kỹ năng nghiệp vụ văn phòng và đối ngoại.<br/>
        - Tập trung nâng cấp năng lực đại diện công ty đón tiếp chuyên gia: Từ việc lo liệu thủ tục sân bay, lưu trú khách sạn đến làm chủ văn hóa bàn tiệc và soạn thảo email giao dịch chuẩn văn phong công sở.<br/>
        Lộ trình: GT1 -> GT2 
        `,
        goals: `
        - Làm chủ quy trình nghiệp vụ: Có khả năng thực hiện trọn vẹn các chuỗi tác vụ phối hợp và hỗ trợ đối ngoại tại doanh nghiệp.<br/>
        - Kỹ năng văn bản ứng dụng: Thành thạo việc truyền đạt thông tin qua email và các loại văn bản hành chính theo đúng quy chuẩn chuyên nghiệp.<br/>
        - Nâng tầm phản xạ hội thoại: Sử dụng linh hoạt các cấu trúc câu phức để giải thích quy trình, báo cáo tiến độ và thảo luận dịch vụ.<br/>
        - Tự tin trong tương tác: Xóa bỏ rào cản ngôn ngữ để phối hợp nhịp nhàng với cấp trên và khách hàng trong các hoạt động hằng ngày.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 400+ từ vựng chuyên dụng về văn phòng, hội họp, sân bay và khách sạn.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ mẫu ngữ pháp trọng điểm (câu chữ 把, bổ ngữ kết quả/xu hướng, câu điều kiện) ứng dụng vào báo cáo và email.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Nghe: Nghe hiểu chi tiết yêu cầu dịch vụ tại sân bay/khách sạn và các thông báo hành chính.<br/>
        - Nói: Thực hiện đón tiễn khách, phát biểu ngắn tại tiệc và xử lý khiếu nại phát sinh lịch sự.<br/>
        - Đọc/Viết: Soạn thảo email đúng văn phong công sở, trình ký công văn và đọc hiểu báo cáo công việc ngắn.<br/>
        - Kỹ năng mềm: Thuyết trình ngắn, phân công công việc và nghệ thuật thương lượng trong công việc hằng ngày.<br/>
        `,
      },
    ],
  },
  {
    id: 2,
    name: 'GT3',
    slug: SlugCourseChineseMap.GT3,
    title: 'Tiếng Trung Thương mại',
    abstracts: [
      'Phát triển năng lực trình bày quan điểm, thuyết trình dự án và đàm phán các điều khoản giao dịch bằng văn phong trang trọng.',
      'Rèn luyện tư duy xử lý sự cố, điều phối công việc linh hoạt và khả năng phân tích báo cáo',
    ],
    dataResults: [
      {
        slug: SlugCourseChineseMap.MOI_BAT_DAU,
        time: '9 tháng',
        sugges: `
        - Chương trình hướng tới khả năng làm việc độc lập và phối hợp nhóm trong các dự án có yếu tố nước ngoài.<br/>
        - Tập trung vào kỹ năng thuyết trình báo cáo, điều phối công việc liên phòng ban và tham gia thảo luận trong các cuộc họp chuyên môn để đưa ra giải pháp xử lý vấn đề.<br/>
        Lộ trình: 0 -> GT1 -> GT2 -> GT3 
        `,
        goals: `
        - Trình bày và thuyết phục: Năng lực trình bày kế hoạch, báo cáo dữ liệu và bảo vệ ý kiến cá nhân trong các buổi họp chuyên môn.<br/>
        - Kỹ năng điều phối cấp trung: Làm chủ các mẫu câu thực chiến để đàm phán điều khoản, giao dịch và quản lý sự kiện.<br/>
        - Kiểm soát tình huống: Khả năng ứng biến nhanh nhạy và đưa ra phương án xử lý kịp thời khi có thay đổi đột xuất từ đối tác.<br/>
        - Văn phong chuyên sâu: Sử dụng ngôn ngữ trang trọng để phân tích thông tin và soạn thảo các kịch bản phối hợp kinh doanh.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 500+ từ vựng chuyên sâu về hội nghị, đàm phán, giao dịch và thị trường.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 45+ điểm ngữ pháp nâng cao hỗ trợ trình bày ý kiến, so sánh tỷ lệ và biện luận.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Hiểu rõ báo cáo khảo sát thị trường, nội dung phỏng vấn tuyển dụng và kịch bản sự kiện.<br/>
        - Sản xuất: Thuyết trình kế hoạch marketing, soạn thảo kịch bản khai trương và thương lượng các điều khoản hợp đồng.<br/>
        - Ứng biến: Điều chỉnh phương án ngay lập tức khi đối tác thay đổi lịch bay hoặc lỗi sản phẩm mẫu.<br/>
        - Nghi thức: Làm chủ nghi thức lễ ra mắt thương hiệu và giao tiếp đa văn hóa quốc tế.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.DA_CO_NEN_TANG,
        time: '6 tháng',
        sugges: `
        - Dành cho nhân sự đã nắm vững giao tiếp sơ cấp, hướng tới vai trò điều phối dự án và quản lý nhóm.<br/>
        - Chuyển từ giao tiếp hằng ngày sang kỹ năng trình bày báo cáo, giải trình tiến độ và tham gia thảo luận trong các cuộc họp chuyên môn để cùng đối tác đưa ra giải pháp xử lý vấn đề.<br/>
        Lộ trình: GT1 -> GT2 -> GT3 
        `,
        goals: `
        - Trình bày và thuyết phục: Năng lực trình bày kế hoạch, báo cáo dữ liệu và bảo vệ ý kiến cá nhân trong các buổi họp chuyên môn.<br/>
        - Kỹ năng điều phối cấp trung: Làm chủ các mẫu câu thực chiến để đàm phán điều khoản, giao dịch và quản lý sự kiện.<br/>
        - Kiểm soát tình huống: Khả năng ứng biến nhanh nhạy và đưa ra phương án xử lý kịp thời khi có thay đổi đột xuất từ đối tác.<br/>
        - Văn phong chuyên sâu: Sử dụng ngôn ngữ trang trọng để phân tích thông tin và soạn thảo các kịch bản phối hợp kinh doanh.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 500+ từ vựng chuyên sâu về hội nghị, đàm phán, giao dịch và thị trường.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 45+ điểm ngữ pháp nâng cao hỗ trợ trình bày ý kiến, so sánh tỷ lệ và biện luận.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Hiểu rõ báo cáo khảo sát thị trường, nội dung phỏng vấn tuyển dụng và kịch bản sự kiện.<br/>
        - Sản xuất: Thuyết trình kế hoạch marketing, soạn thảo kịch bản khai trương và thương lượng các điều khoản hợp đồng.<br/>
        - Ứng biến: Điều chỉnh phương án ngay lập tức khi đối tác thay đổi lịch bay hoặc lỗi sản phẩm mẫu.<br/>
        - Nghi thức: Làm chủ nghi thức lễ ra mắt thương hiệu và giao tiếp đa văn hóa quốc tế.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.GIAO_TIEP_CO_BAN,
        time: '3 tháng',
        sugges: `
        - Dành cho nhân sự đã thành thạo nghiệp vụ hậu cần và đối ngoại, muốn nâng cấp lên vai trò điều phối và quản lý dự án độc lập.<br/>
        - Chuyển trọng tâm sang kỹ năng thuyết trình báo cáo trước lãnh đạo, chủ trì các cuộc họp chuyên môn và thương lượng trực tiếp với ngân hàng hoặc đối tác liên phòng ban để thúc đẩy tiến độ công việc.<br/>
        Lộ trình: GT2 -> GT3  
        `,
        goals: `
        - Trình bày và thuyết phục: Năng lực trình bày kế hoạch, báo cáo dữ liệu và bảo vệ ý kiến cá nhân trong các buổi họp chuyên môn.<br/>
        - Kỹ năng điều phối cấp trung: Làm chủ các mẫu câu thực chiến để đàm phán điều khoản, giao dịch và quản lý sự kiện.<br/>
        - Kiểm soát tình huống: Khả năng ứng biến nhanh nhạy và đưa ra phương án xử lý kịp thời khi có thay đổi đột xuất từ đối tác.<br/>
        - Văn phong chuyên sâu: Sử dụng ngôn ngữ trang trọng để phân tích thông tin và soạn thảo các kịch bản phối hợp kinh doanh.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 500+ từ vựng chuyên sâu về hội nghị, đàm phán, giao dịch và thị trường.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 45+ điểm ngữ pháp nâng cao hỗ trợ trình bày ý kiến, so sánh tỷ lệ và biện luận.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Hiểu rõ báo cáo khảo sát thị trường, nội dung phỏng vấn tuyển dụng và kịch bản sự kiện.<br/>
        - Sản xuất: Thuyết trình kế hoạch marketing, soạn thảo kịch bản khai trương và thương lượng các điều khoản hợp đồng.<br/>
        - Ứng biến: Điều chỉnh phương án ngay lập tức khi đối tác thay đổi lịch bay hoặc lỗi sản phẩm mẫu.<br/>
        - Nghi thức: Làm chủ nghi thức lễ ra mắt thương hiệu và giao tiếp đa văn hóa quốc tế.<br/>
        `,
      },
    ],
  },
  {
    id: 3,
    name: 'GT4',
    slug: SlugCourseChineseMap.GT4,
    title: 'Tiếng Trung Thương Mại Chuyên Sâu',
    abstracts: [
      'Xử lý thuần thục các loại văn bản nghiệp vụ có độ khó cao, các báo cáo khảo sát và hợp đồng giao dịch đa tầng.',
      'Làm chủ hệ thống cấu trúc ngôn ngữ phức hợp để tham gia đóng góp ý kiến chuyên sâu, phản biện và đàm phán các thương vụ có quy mô lớn',
    ],
    dataResults: [
      {
        slug: SlugCourseChineseMap.MOI_BAT_DAU,
        time: '12 tháng',
        sugges: `
        - Lộ trình chuyên sâu dành cho nhân sự quản lý, tập trung vào kỹ năng thương lượng và giao dịch kinh doanh phức tạp.<br/>
        - Trang bị năng lực đọc hiểu văn bản hợp đồng, phân tích thị trường và tư duy ngôn ngữ nhạy bén trong việc thuyết phục đối tác để đạt được mục tiêu ký kết bền vững.<br/>
        Lộ trình: 0 -> GT1 -> GT2 -> GT3 -> GT4 
        `,
        goals: `
        - Thẩm thấu nghiệp vụ phức hợp: Khả năng bóc tách, phân tích và xử lý các loại hồ sơ, văn bản chuyên ngành có độ khó cao.<br/>
        - Thương thảo và chốt đơn: Thành thạo các kỹ thuật ngôn ngữ để báo giá, thuyết phục khách hàng và đàm phán hợp đồng lớn.<br/>
        - Quản trị và phản biện: Tự tin đóng góp ý kiến chiến lược, tham gia quy trình nhân sự và giải quyết khiếu nại đa tầng.<br/>
        - Thích nghi môi trường toàn cầu: Năng lực làm việc hiệu quả trong các tổ chức quốc tế với hệ thống từ vựng chuyên môn rộng.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 800+ từ vựng chuyên ngành Logistics, Marketing, Tài chính và Bảo hiểm.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ điểm ngữ pháp nâng cao về so sánh, giả định, nhượng bộ và trình bày phản biện.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Tiếp nhận: Phân tích đơn mở tài khoản/chuyển tiền, hợp đồng thuê/mua bất động sản và quy trình hậu mãi.<br/>
        - Sản xuất: Thuyết trình ý tưởng quảng cáo, thương lượng bảo hiểm, xử lý tồn kho và chiến lược đa quốc gia.<br/>
        - Quản trị: Kỹ năng phỏng vấn tuyển dụng, chăm sóc khách hàng và phân tích báo cáo dữ liệu khảo sát.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.DA_CO_NEN_TANG,
        time: '9 tháng',
        sugges: `
        - Dành cho học viên muốn bứt phá từ nền tảng cơ bản lên năng lực đàm phán thương mại chuyên sâu.<br/>
        - Tập trung vào kỹ năng đọc hiểu văn bản pháp lý, phân tích thị trường và sử dụng ngôn ngữ chiến thuật để thuyết phục đối tác trong các buổi ký kết hợp đồng quan trọng.<br/>
        Lộ trình: GT1 -> GT2 -> GT3 -> GT4 
        `,
        goals: `
        - Thẩm thấu nghiệp vụ phức hợp: Khả năng bóc tách, phân tích và xử lý các loại hồ sơ, văn bản chuyên ngành có độ khó cao.<br/>
        - Thương thảo và chốt đơn: Thành thạo các kỹ thuật ngôn ngữ để báo giá, thuyết phục khách hàng và đàm phán hợp đồng lớn.<br/>
        - Quản trị và phản biện: Tự tin đóng góp ý kiến chiến lược, tham gia quy trình nhân sự và giải quyết khiếu nại đa tầng.<br/>
        - Thích nghi môi trường toàn cầu: Năng lực làm việc hiệu quả trong các tổ chức quốc tế với hệ thống từ vựng chuyên môn rộng.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 800+ từ vựng chuyên ngành Logistics, Marketing, Tài chính và Bảo hiểm.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ điểm ngữ pháp nâng cao về so sánh, giả định, nhượng bộ và trình bày phản biện.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Tiếp nhận: Phân tích đơn mở tài khoản/chuyển tiền, hợp đồng thuê/mua bất động sản và quy trình hậu mãi.<br/>
        - Sản xuất: Thuyết trình ý tưởng quảng cáo, thương lượng bảo hiểm, xử lý tồn kho và chiến lược đa quốc gia.<br/>
        - Quản trị: Kỹ năng phỏng vấn tuyển dụng, chăm sóc khách hàng và phân tích báo cáo dữ liệu khảo sát.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.GIAO_TIEP_CO_BAN,
        time: '6 tháng',
        sugges: `
        - Dành cho học viên đã có kinh nghiệm giao tiếp công sở, hướng tới mục tiêu làm chủ các giao dịch thương mại và ký kết quan trọng.<br/>
        - Huấn luyện năng lực đọc hiểu văn bản hợp đồng, phân tích biến động thị trường và sử dụng ngôn ngữ chiến thuật để thương lượng các điều khoản kinh doanh có lợi nhất cho doanh nghiệp.<br/>
        Lộ trình: GT2 -> GT3 -> GT4   
        `,
        goals: `
        - Thẩm thấu nghiệp vụ phức hợp: Khả năng bóc tách, phân tích và xử lý các loại hồ sơ, văn bản chuyên ngành có độ khó cao.<br/>
        - Thương thảo và chốt đơn: Thành thạo các kỹ thuật ngôn ngữ để báo giá, thuyết phục khách hàng và đàm phán hợp đồng lớn.<br/>
        - Quản trị và phản biện: Tự tin đóng góp ý kiến chiến lược, tham gia quy trình nhân sự và giải quyết khiếu nại đa tầng.<br/>
        - Thích nghi môi trường toàn cầu: Năng lực làm việc hiệu quả trong các tổ chức quốc tế với hệ thống từ vựng chuyên môn rộng.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 800+ từ vựng chuyên ngành Logistics, Marketing, Tài chính và Bảo hiểm.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ điểm ngữ pháp nâng cao về so sánh, giả định, nhượng bộ và trình bày phản biện.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Tiếp nhận: Phân tích đơn mở tài khoản/chuyển tiền, hợp đồng thuê/mua bất động sản và quy trình hậu mãi.<br/>
        - Sản xuất: Thuyết trình ý tưởng quảng cáo, thương lượng bảo hiểm, xử lý tồn kho và chiến lược đa quốc gia.<br/>
        - Quản trị: Kỹ năng phỏng vấn tuyển dụng, chăm sóc khách hàng và phân tích báo cáo dữ liệu khảo sát.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.GIAO_TIEP_TRUNG_CAP,
        time: '3 tháng',
        sugges: `
        - Dành cho nhân sự đã vững kỹ năng điều phối và thuyết trình, hướng tới vai trò chủ chốt trong các giao dịch kinh doanh và ký kết quan trọng.<br/>
        - Tập trung vào năng lực đọc hiểu chính xác các văn bản hợp đồng, phân tích biến động thị trường và sử dụng ngôn ngữ chiến thuật để đàm phán các điều khoản có lợi nhất cho doanh nghiệp.<br/>
        Lộ trình: GT3 -> GT4 
        `,
        goals: `
        - Làm chủ quy trình nghiệp vụ: Có khả năng thực hiện trọn vẹn các chuỗi tác vụ phối hợp và hỗ trợ đối ngoại tại doanh nghiệp.<br/>
        - Kỹ năng văn bản ứng dụng: Thành thạo việc truyền đạt thông tin qua email và các loại văn bản hành chính theo đúng quy chuẩn chuyên nghiệp.<br/>
        - Nâng tầm phản xạ hội thoại: Sử dụng linh hoạt các cấu trúc câu phức để giải thích quy trình, báo cáo tiến độ và thảo luận dịch vụ.<br/>
        - Tự tin trong tương tác: Xóa bỏ rào cản ngôn ngữ để phối hợp nhịp nhàng với cấp trên và khách hàng trong các hoạt động hằng ngày.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 800+ từ vựng chuyên ngành Logistics, Marketing, Tài chính và Bảo hiểm.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 40+ điểm ngữ pháp nâng cao về so sánh, giả định, nhượng bộ và trình bày phản biện.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Tiếp nhận: Phân tích đơn mở tài khoản/chuyển tiền, hợp đồng thuê/mua bất động sản và quy trình hậu mãi.<br/>
        - Sản xuất: Thuyết trình ý tưởng quảng cáo, thương lượng bảo hiểm, xử lý tồn kho và chiến lược đa quốc gia.<br/>
        - Quản trị: Kỹ năng phỏng vấn tuyển dụng, chăm sóc khách hàng và phân tích báo cáo dữ liệu khảo sát.<br/>
        `,
      },
    ],
  },
  {
    id: 4,
    name: 'GT5',
    slug: SlugCourseChineseMap.GT5,
    title: 'Tiếng Trung doanh nhân',
    abstracts: [
      'Đạt tới trình độ ngôn ngữ tinh hoa, làm chủ khả năng biện luận, phản biện sắc bén và bảo vệ thương hiệu trước các đối tác quốc tế.',
      'Vận dụng tổng hợp kỹ năng để điều hành chiến lược, quản trị rủi ro & giải quyết các xung đột lợi ích ở cấp quản lý cao nhất',
    ],
    dataResults: [
      {
        slug: SlugCourseChineseMap.MOI_BAT_DAU,
        time: '15 tháng',
        sugges: `
        - Cấp độ cao nhất dành cho người đi làm muốn làm chủ ngôn ngữ trong các bối cảnh quốc tế và quản trị chiến lược.<br/>
        - Hoàn thiện kỹ năng lãnh đạo, điều hành hội nghị đa phương, am hiểu sâu sắc văn hóa kinh doanh để xây dựng và mở rộng mạng lưới đối tác chiến lược trên quy mô toàn cầu.<br/>
        Lộ trình: 0 -> GT1 -> GT2 -> GT3 -> GT4 -> GT5
        `,
        goals: `
        - Điều hành chiến lược: Khả năng báo cáo, ra quyết định và quản trị rủi ro ở cấp độ quản lý cao nhất của doanh nghiệp.<br/>
        - Thương thảo cấp cao: Chủ trì các cuộc đàm phán chiến lược, ký kết hợp đồng đại lý và sáp nhập đầu tư quốc tế.<br/>
        - Tư duy pháp lý và học thuật: Năng lực thẩm định các điều khoản hợp đồng phức tạp và hồ sơ thầu chuyên sâu bằng ngôn ngữ tinh hoa.<br/>
        - Quản trị xung đột: Vận dụng kỹ năng biện luận sắc bén để bảo vệ lợi ích doanh nghiệp và xử lý các sự cố truyền thông/thương mại.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 1000+ từ vựng cao cấp về M&A, Quản trị, Pháp luật và Tài chính số.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 50+ điểm ngữ pháp pháp lý & học thuật dùng trong diễn đạt biện luận và điều khoản hợp đồng.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Đọc hiểu hồ sơ thầu chuyên sâu, hợp đồng đại lý, vận đơn logistics phức tạp và kế hoạch đầu tư.<br/>
        - Sản xuất: Thực hiện phỏng vấn cấp cao, thương lượng M&A, báo cáo tài chính và xử lý tranh chấp thương mại.<br/>
        - Lãnh đạo: Thuyết phục, phản biện, quản trị rủi ro và trình bày chiến lược bảo vệ thương hiệu.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.DA_CO_NEN_TANG,
        time: '12 tháng',
        sugges: `
        - Lộ trình toàn diện cho học viên có nền tảng muốn vươn tới cấp độ chuyên gia và lãnh đạo cấp cao.<br/>
        - Huấn luyện bản lĩnh điều hành hội nghị đa quốc gia, hoạch định chiến lược kinh doanh và am hiểu sâu sắc văn hóa đối tác để xây dựng mạng lưới quan hệ bền vững trên quy mô toàn cầu.<br/>
        Lộ trình: GT1 -> GT2 -> GT3 -> GT4 -> GT5
        `,
        goals: `
        - Điều hành chiến lược: Khả năng báo cáo, ra quyết định và quản trị rủi ro ở cấp độ quản lý cao nhất của doanh nghiệp.<br/>
        - Thương thảo cấp cao: Chủ trì các cuộc đàm phán chiến lược, ký kết hợp đồng đại lý và sáp nhập đầu tư quốc tế.<br/>
        - Tư duy pháp lý và học thuật: Năng lực thẩm định các điều khoản hợp đồng phức tạp và hồ sơ thầu chuyên sâu bằng ngôn ngữ tinh hoa.<br/>
        - Quản trị xung đột: Vận dụng kỹ năng biện luận sắc bén để bảo vệ lợi ích doanh nghiệp và xử lý các sự cố truyền thông/thương mại.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 1000+ từ vựng cao cấp về M&A, Quản trị, Pháp luật và Tài chính số.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 50+ điểm ngữ pháp pháp lý & học thuật dùng trong diễn đạt biện luận và điều khoản hợp đồng.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Đọc hiểu hồ sơ thầu chuyên sâu, hợp đồng đại lý, vận đơn logistics phức tạp và kế hoạch đầu tư.<br/>
        - Sản xuất: Thực hiện phỏng vấn cấp cao, thương lượng M&A, báo cáo tài chính và xử lý tranh chấp thương mại.<br/>
        - Lãnh đạo: Thuyết phục, phản biện, quản trị rủi ro và trình bày chiến lược bảo vệ thương hiệu.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.GIAO_TIEP_CO_BAN,
        time: '9 tháng',
        sugges: `
        - Lộ trình bứt phá dành cho nhân sự nòng cốt muốn vươn tới vị trí lãnh đạo cao cấp và chuyên gia điều hành trong môi trường quốc tế.<br/>
        - Hoàn thiện bản lĩnh điều hành hội thảo đa phương, hoạch định chiến lược kinh doanh dài hạn và am hiểu sâu sắc văn hóa đối tác để xây dựng mạng lưới quan hệ chiến lược bền vững trên quy mô toàn cầu.<br/>
        Lộ trình: GT2 -> GT3 -> GT4 -> GT5
        `,
        goals: `
        - Điều hành chiến lược: Khả năng báo cáo, ra quyết định và quản trị rủi ro ở cấp độ quản lý cao nhất của doanh nghiệp.<br/>
        - Thương thảo cấp cao: Chủ trì các cuộc đàm phán chiến lược, ký kết hợp đồng đại lý và sáp nhập đầu tư quốc tế.<br/>
        - Tư duy pháp lý và học thuật: Năng lực thẩm định các điều khoản hợp đồng phức tạp và hồ sơ thầu chuyên sâu bằng ngôn ngữ tinh hoa.<br/>
        - Quản trị xung đột: Vận dụng kỹ năng biện luận sắc bén để bảo vệ lợi ích doanh nghiệp và xử lý các sự cố truyền thông/thương mại.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 1000+ từ vựng cao cấp về M&A, Quản trị, Pháp luật và Tài chính số.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 50+ điểm ngữ pháp pháp lý & học thuật dùng trong diễn đạt biện luận và điều khoản hợp đồng.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Đọc hiểu hồ sơ thầu chuyên sâu, hợp đồng đại lý, vận đơn logistics phức tạp và kế hoạch đầu tư.<br/>
        - Sản xuất: Thực hiện phỏng vấn cấp cao, thương lượng M&A, báo cáo tài chính và xử lý tranh chấp thương mại.<br/>
        - Lãnh đạo: Thuyết phục, phản biện, quản trị rủi ro và trình bày chiến lược bảo vệ thương hiệu.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.GIAO_TIEP_TRUNG_CAP,
        time: '6 tháng',
        sugges: `
        - Dành cho nhân sự đã nắm vững kỹ năng điều phối và thuyết trình, hướng tới mục tiêu làm chủ các giao dịch thương mại lớn và đại diện doanh nghiệp ở tầm vóc quốc tế.<br/>
        - Mở rộng năng lực từ quản lý dự án sang đàm phán hợp đồng chuyên sâu, chủ trì các hội nghị đa phương và hoạch định chiến lược phát triển dài hạn dựa trên sự am hiểu sâu sắc về văn hóa kinh doanh toàn cầu.<br/>
        Lộ trình: GT3 -> GT4 -> GT5
        `,
        goals: `
        - Điều hành chiến lược: Khả năng báo cáo, ra quyết định và quản trị rủi ro ở cấp độ quản lý cao nhất của doanh nghiệp.<br/>
        - Thương thảo cấp cao: Chủ trì các cuộc đàm phán chiến lược, ký kết hợp đồng đại lý và sáp nhập đầu tư quốc tế.<br/>
        - Tư duy pháp lý và học thuật: Năng lực thẩm định các điều khoản hợp đồng phức tạp và hồ sơ thầu chuyên sâu bằng ngôn ngữ tinh hoa.<br/>
        - Quản trị xung đột: Vận dụng kỹ năng biện luận sắc bén để bảo vệ lợi ích doanh nghiệp và xử lý các sự cố truyền thông/thương mại.
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 1000+ từ vựng cao cấp về M&A, Quản trị, Pháp luật và Tài chính số.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 50+ điểm ngữ pháp pháp lý & học thuật dùng trong diễn đạt biện luận và điều khoản hợp đồng.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Đọc hiểu hồ sơ thầu chuyên sâu, hợp đồng đại lý, vận đơn logistics phức tạp và kế hoạch đầu tư.<br/>
        - Sản xuất: Thực hiện phỏng vấn cấp cao, thương lượng M&A, báo cáo tài chính và xử lý tranh chấp thương mại.<br/>
        - Lãnh đạo: Thuyết phục, phản biện, quản trị rủi ro và trình bày chiến lược bảo vệ thương hiệu.<br/>
        `,
      },
      {
        slug: SlugCourseChineseMap.XA_HOI_TRUNG_CAP,
        time: '3 tháng',
        sugges: `
        - Lộ trình dành cho nhà quản lý đã thành thạo đàm phán, muốn vươn tới cấp độ chuyên gia điều hành và đại diện doanh nghiệp trong môi trường quốc tế.<br/>
        - Hoàn thiện bản lĩnh chủ trì các hội nghị đa phương, hoạch định chiến lược kinh doanh dài hạn và am hiểu sâu sắc văn hóa đối tác để xây dựng mạng lưới quan hệ chiến lược bền vững trên quy mô toàn cầu.<br/>
        Lộ trình: GT4 -> GT5
        `,
        goals: `
      
        `,
        knowledge: `
        <strong>1. Từ vựng:</strong><br/>
        - 1000+ từ vựng cao cấp về M&A, Quản trị, Pháp luật và Tài chính số.<br/>
        <strong>2. Ngữ pháp:</strong> <br/>
        - 50+ điểm ngữ pháp pháp lý & học thuật dùng trong diễn đạt biện luận và điều khoản hợp đồng.<br/>
        <strong>3. Các kỹ năng:</strong><br/>
        - Phân tích: Đọc hiểu hồ sơ thầu chuyên sâu, hợp đồng đại lý, vận đơn logistics phức tạp và kế hoạch đầu tư.<br/>
        - Sản xuất: Thực hiện phỏng vấn cấp cao, thương lượng M&A, báo cáo tài chính và xử lý tranh chấp thương mại.<br/>
        - Lãnh đạo: Thuyết phục, phản biện, quản trị rủi ro và trình bày chiến lược bảo vệ thương hiệu.<br/>
        `,
      },
    ],
  },
];

type BuildRoadmapProps = {
  bgRoadmap?: string;
  roadmapIcon?: string;
};

const BuildRoadmap = ({ bgRoadmap, roadmapIcon }: BuildRoadmapProps) => {
  const [dataSelectMobile, setDataSelectMobile] = useState<{
    input?: TLocalData;
    output?: TLocalData;
  }>({
    input: inpData[0]
  })
  const [inpOpen, setInpOpen] = useState(false);
  const [outOpen, setOutOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'sugges' | 'knowledge' | null>(null);
  const [dataValue, setDataValue] = useState<{
    input?: TLocalData;
    output?: TLocalData;
    result?: {
      slug: string;
      time: string;
      sugges: string;
      goals: string;
      knowledge: string;
    };
  }>({
    input: inpData[0],
    output: undefined,
    result: undefined,
  });

  const handleSetInput = (slug: string) => {
    const currentInput = inpData.find((item) => item.slug === slug);

    if (dataValue?.output?.slug) {
      const currentOutput = outputData.find((item) => item.slug === dataValue?.output?.slug);
      const validate = (currentOutput?.dataResults ?? []).find((item) => item.slug === slug);

      setDataValue((prevDataValue) => ({
        ...prevDataValue,
        input: currentInput,
        output: validate ? prevDataValue?.output : undefined,
        result: validate ? validate : undefined,
      }));
    } else {
      setDataValue((prevDataValue) => ({
        ...prevDataValue,
        input: currentInput,
        output: prevDataValue?.output ?? undefined,
        result: undefined,
      }));
    }
  };

  const handleSetOutput = (slug: string) => {
    if (!dataValue?.input?.slug) return;
    const currentOutput = outputData.find((item) => item.slug === slug);
    const currentInput = inpData.find((item) => item.slug === dataValue?.input?.slug);
    const validate = (currentOutput?.dataResults ?? []).find((item) => item.slug === dataValue?.input?.slug);
    if (!validate) {
      toast.info(`Bạn phải chọn đầu ra cao hơn ${currentInput?.title}!`, {
        className: '!bg-blue-500 !text-white',
      });
      return;
    } else {
      setDataValue((prevDataValue) => ({
        ...prevDataValue,
        input: prevDataValue?.input ?? undefined,
        output: currentOutput,
        result: validate,
      }));
    }
  };

  const handleScrollToForm = () => {
    const formRegister = document.getElementById('form-register-roadmap');
    if (formRegister) {
      formRegister.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  return (
    <section id="build-roadmap" className="relative z-50 mx-auto mt-3 w-full max-w-[1236px] xl:mt-[30px]">
      <div className="relative">
        {/* Mobile */}
        <div className="mx-5 mt-4 rounded-[11px] border-2 border-white shadow-[2px_4px_4px_0px_#00000040] bg-white px-4 py-5 sm:mt-8 sm:p-10 lg:hidden">
          {/* 1. Chọn trình độ đầu vào */}
          <div>
            <div className="flex items-center gap-x-4">
              <div className="rounded-[7.43px] bg-primary px-5 py-3 sm:px-6">
                <span className="font-primary text-center text-[28.78px] font-extrabold !leading-[100%] tracking-[0%] text-white sm:text-4xl">
                  1
                </span>
              </div>
              <div>
                <p className="text-[20px] font-bold !leading-[100%] tracking-[0%] text-primary sm:text-3xl">
                  Chọn trình độ đầu vào
                </p>
                <p className="mt-2 text-[10.93px] font-normal leading-tight text-black sm:text-lg">
                  Đánh giá khả năng Tiếng Trung hiện tại của bạn để xác định điểm khởi đầu phù hợp
                </p>
              </div>
            </div>
            <div className="relative my-5 rounded-md bg-[#7D1900] shadow-[0px_1.33px_1.33px_0px_#00000040]">
              <div
                className="flex cursor-pointer items-center gap-x-4 py-5 pl-5 pr-14"
                onClick={() => { setInpOpen((v) => !v); setOutOpen(false); }}
              >
                <div className="flex h-[50px] w-[40px] flex-shrink-0 items-center justify-center text-white sm:w-[60px]">
                  {dataSelectMobile.input?.icon && (() => {
                    const Icon = dataSelectMobile.input!.icon!;
                    return <div className="h-fit w-fit"><Icon fill={'white'} /></div>;
                  })()}
                </div>
                <div>
                  <p className="line-clamp-1 pt-[1px] text-xs font-bold uppercase !leading-[140%] tracking-normal text-white sm:text-xl">
                    {dataSelectMobile.input?.title || "Chọn lộ đầu vào"}
                  </p>
                  <p className="line-clamp-3 py-1 text-[8px] font-normal leading-tight text-white sm:text-sm">
                    {dataSelectMobile.input?.abstract}
                  </p>
                </div>
                <ChevronDown
                  size={32}
                  className={cn('absolute right-4 top-1/2 -translate-y-1/2 text-white transition-transform duration-200', inpOpen && 'rotate-180')}
                />
              </div>
              {inpOpen && (
                <div className="absolute bottom-0 left-0 z-40 w-full translate-y-[100%] rounded-b-[12px] bg-white shadow-lg">
                  {inpData.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'flex h-[64px] cursor-pointer items-center gap-x-4 rounded-[3.58px] px-5 py-4 shadow-[0px_1.22px_1.22px_0px_rgba(0,0,0,0.25)] sm:h-[90px] sm:px-8',
                        dataSelectMobile.input?.slug === item.slug ? 'bg-slate-100' : 'bg-white'
                      )}
                      onClick={() => {
                        setDataSelectMobile((prev) => ({ ...prev, input: item, output: undefined }));
                        handleSetInput(item.slug ?? '');
                        setInpOpen(false);
                      }}
                    >
                      <div className="flex h-auto w-[40px] flex-shrink-0 items-center justify-center sm:w-[60px]">
                        {item.icon && (() => { const Icon = item.icon!; return <div className="h-fit w-fit"><Icon /></div>; })()}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold !leading-[100%] tracking-normal text-black sm:text-xl">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[8px] font-normal leading-[9px] tracking-normal text-black sm:text-sm">
                          {item.abstract}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* 2. Chọn trình độ đầu ra */}
          <div>
            <div className="flex items-center gap-x-4">
              <div className="rounded-[7.43px] bg-primary px-5 py-3 sm:px-6">
                <span className="font-primary text-center text-[28.78px] font-extrabold !leading-[100%] tracking-[0%] text-white sm:text-4xl">
                  2
                </span>
              </div>
              <div>
                <p className="text-[20px] font-bold !leading-[100%] tracking-[0%] text-primary sm:text-3xl">
                  Chọn trình độ đầu ra
                </p>
                <p className="mt-2 text-[10.93px] font-normal leading-tight text-black sm:text-lg">
                  Xác định mục tiêu đầu ra tiếng Trung công sở bạn muốn đạt được
                </p>
              </div>
            </div>
            <div className="relative my-5 min-h-[64px] rounded-md bg-[#7D1900] shadow-[0px_1.33px_1.33px_0px_#00000040] sm:min-h-[105px]">
              <div
                className="flex cursor-pointer items-center gap-x-4 py-5 pl-5 pr-14"
                onClick={() => { setOutOpen((v) => !v); setInpOpen(false); }}
              >
                <div className="flex-1">
                  {dataSelectMobile.output ? (
                    <div className='relative'>
                      <div className="mx-auto absolute -top-2 -right-12 justify-center flex h-6 w-fit items-center rounded-sm min-w-[54px] bg-[#F3C650] px-2 text-xs font-bold text-primary">
                        {dataSelectMobile.output.name}
                      </div>
                      <p className="line-clamp-1 pt-[1px] text-xs font-bold uppercase text-white sm:text-xl">
                        {dataSelectMobile.output?.title || "Chọn lộ đầu vào"}
                      </p>
                      {(dataSelectMobile.output.abstracts ?? []).map((abstract, index) => (
                        <p key={index} className="text-white mt-2 text-[10px] xl:text-[13px]">
                          <span
                            className={cn(
                              'mr-2 inline-flex size-3 items-center justify-center rounded-full border bg-white align-middle',
                              'border-white',
                            )}
                          >
                            <span
                              className={cn(
                                'size-full rounded-full border',
                                'border-[#7D1900] bg-white',
                              )}
                            ></span>
                          </span>
                          <span className="align-middle font-medium">{abstract}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white sm:text-xl">Vui lòng chọn đầu ra</p>
                  )}
                </div>
                <ChevronDown
                  size={32}
                  className={cn('absolute right-4 top-1/2 -translate-y-1/2 text-white transition-transform duration-200', outOpen && 'rotate-180')}
                />
              </div>
              {outOpen && (
                <div className="absolute bottom-0 left-0 z-20 w-full translate-y-[100%] rounded-b-[12px] bg-white shadow-lg max-h-[60vh] overflow-y-auto">
                  <div className='flex flex-col gap-y-3 pt-3'>
                    {outputData.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          'relative cursor-pointer space-y-1 rounded-sm px-4 py-4 shadow-[0px_1.22px_1.22px_0px_#00000040] sm:px-8',
                          dataSelectMobile.output?.slug === item.slug ? 'bg-slate-100' : 'bg-white'
                        )}
                        onClick={() => {
                          setDataSelectMobile((prev) => ({ ...prev, output: item }));
                          handleSetOutput(item.slug ?? '');
                          setOutOpen(false);
                        }}
                      >
                        <div className="mx-auto absolute top-2 right-2 justify-center flex h-6 w-fit items-center rounded-sm min-w-[54px] bg-[#F3C650] px-2 text-xs font-bold text-primary">
                          {item.name}
                        </div>
                        <p className="text-xs uppercase text-primary font-extrabold mb-4">
                          {item.title}
                        </p>
                        {(item.abstracts ?? []).map((abstract, index) => (
                          <p key={index} className="mt-2 text-[10px] xl:text-[13px]">
                            <span
                              className={cn(
                                'mr-2 inline-flex size-3 items-center justify-center rounded-full border bg-white align-middle',
                                'border-black',
                              )}
                            >
                              <span
                                className={cn(
                                  'size-full rounded-full border',
                                  'border-white bg-black',
                                )}
                              ></span>
                            </span>
                            <span className="align-middle font-medium">{abstract}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Xác định lộ trình học của bạn */}
          <div>
            <div className="flex gap-x-4">
              <div className="h-fit rounded-[7.43px] bg-primary px-5 py-3 sm:px-6">
                <span className="font-primary text-center text-[28.78px] font-extrabold !leading-[100%] tracking-[0%] text-white sm:text-4xl">
                  3
                </span>
              </div>
              <p className="text-[20px] font-bold !leading-[100%] tracking-[0%] text-primary sm:text-3xl">
                Xác định lộ trình học của bạn
              </p>
            </div>
            <div className="w-full space-y-2 mt-5 sm:space-y-4">
              {dataValue?.result ? (
                <div className="rounded-[9px] pb-4">
                  <div className="mb-3 flex flex-col gap-2">
                    <div className="w-fit rounded-sm bg-[#F3C650] px-2 py-1 text-xs font-bold uppercase text-white">
                      {` #Đầu vào: ${dataValue?.input?.title ?? ''}`}
                    </div>
                    <div className=" w-fit rounded-sm bg-[#7D1900] px-2 py-1 text-xs font-bold uppercase text-white">
                      {`#Đầu ra: ${dataValue?.output?.title ?? ''}`}
                    </div>
                  </div>
                  <p className="text-[15px] font-bold text-primary">
                    Thời gian: <span className="text-black">{dataValue.result.time}</span>
                  </p>
                  <div className="mt-3">
                    <p className="text-[15px] font-bold text-primary">Mục tiêu khóa học:</p>
                    <p className="mt-1 text-[8px]">{parse(dataValue.result.goals)}</p>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-sm bg-[#7D1900]">
                    <div
                      className='flex cursor-pointer items-center px-3 py-2'
                      onClick={() => setOpenSection((v) => v === 'sugges' ? null : 'sugges')}
                    >
                      <p className="text-xs font-bold uppercase text-white">Lộ trình gợi ý:</p>
                      <div className="relative ml-auto flex h-8 w-8 items-center justify-center">
                        {openSection === 'sugges' ? <MinusIcon className="text-white" /> : <PlusIcon className="text-white" />}
                      </div>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows] duration-500"
                      style={{ gridTemplateRows: openSection === 'sugges' ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className="px-3 pb-3 text-xs text-white transition-all duration-400 ease-out"
                          style={{
                            opacity: openSection === 'sugges' ? 1 : 0,
                            transform: openSection === 'sugges' ? 'translateY(0)' : 'translateY(-10px)',
                            transitionDelay: openSection === 'sugges' ? '0.1s' : '0s',
                          }}
                        >
                          {parse(dataValue.result.sugges)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-sm bg-[#7D1900]">
                    <div
                      className='flex cursor-pointer items-center px-3 py-2'
                      onClick={() => setOpenSection((v) => v === 'knowledge' ? null : 'knowledge')}
                    >
                      <p className="text-xs font-bold uppercase text-white">Kết quả đạt được:</p>
                      <div className="relative ml-auto flex h-8 w-8 items-center justify-center">
                        {openSection === 'knowledge' ? <MinusIcon className="text-white" /> : <PlusIcon className="text-white" />}
                      </div>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows] duration-500"
                      style={{ gridTemplateRows: openSection === 'knowledge' ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className="px-3 pb-3 text-xs text-white transition-all duration-400 ease-out"
                          style={{
                            opacity: openSection === 'knowledge' ? 1 : 0,
                            transform: openSection === 'knowledge' ? 'translateY(0)' : 'translateY(-10px)',
                            transitionDelay: openSection === 'knowledge' ? '0.1s' : '0s',
                          }}
                        >
                          {parse(dataValue.result.knowledge)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[9px] bg-[#7D1900] text-white p-4 text-center text-sm  sm:p-6">
                  Chọn trình độ đầu vào và đầu ra để xem lộ trình chi tiết
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Nút đăng ký tư vấn mobile*/}
        <div className="flex w-full justify-between pt-5 pb-4 xl:hidden">
          <button
            onClick={() => handleScrollToForm()}
            className="group relative mx-auto h-10 items-center justify-center gap-x-4 overflow-hidden rounded-[20px] px-8 text-[15px] font-black uppercase text-white flex"
          >
            <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#7D1900]"></span>
            <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#F3C650] opacity-0 transition-opacity duration-700 group-hover:opacity-100"></span>
            <span className="relative z-10 flex items-center gap-x-4">Nhận tư vấn lộ trình chi tiết</span>
          </button>
        </div>
        {/* PC */}
        <div className="hidden lg:block">
          {/* 1. Chọn trình độ đầu vào */}
          <div>
            <div className="flex items-center gap-5">
              <div className="flex size-[60px] items-center justify-center rounded-sm bg-primary">
                <span className="text-center text-[28px] font-extrabold leading-none text-white xl:text-[45px]">1</span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold capitalize leading-tight text-primary xl:text-[32px]">
                  Chọn trình độ đầu vào
                </h3>
                <p className="mt-1 text-center text-[10px] font-normal xl:hidden">
                  Đánh giá khả năng Tiếng Trung hiện tại của bạn để xác định điểm khởi đầu phù hợp
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-[64px] xl:w-[66px]">
                <div className="mx-auto h-full w-[4px] bg-primary"></div>
              </div>
              <div className="flex flex-1 gap-4 px-5 py-14">
                {inpData.map((item) => {
                  const isActive = dataValue?.input?.slug === item.slug;
                  return (
                    <div
                      onClick={() => handleSetInput(item.slug ?? '')}
                      key={item.id}
                      className={cn(
                        'relative h-full min-h-[220px] w-[213px] rounded-sm px-2 pb-4 pt-[14px] shadow-[0px_3.38px_3.38px_0px_#00000040] xl:px-3',
                        isActive ? 'bg-[#7D1900] text-white' : 'cursor-pointer bg-white text-[#424242]',
                      )}
                    >
                      <div
                        className={`absolute h-4 w-4 rounded-full ${isActive ? 'bg-white' : 'bg-[#D9D9D9]'
                          } right-2 top-2`}
                      ></div>
                      <div className="space-y-4 pb-3 pt-4">
                        <div className="mx-auto flex h-[58px] w-[59px] items-center justify-center">
                          {item.icon && (
                            <div className="h-fit w-fit">
                              <item.icon fill={isActive ? 'white' : 'black'} />
                            </div>
                          )}
                        </div>
                        <p className={`text-center text-[8px] font-bold xl:text-[15px] px-6 h-8`}>{item.title}</p>
                      </div>
                      <p className="text-center text-[10px] xl:text-[13px]">{item.abstract}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Chọn trình độ đầu ra của bạn*/}
          <div>
            <div className="flex items-center gap-5">
              <div className="flex size-[60px] items-center justify-center rounded-sm bg-primary">
                <span className="text-center text-[28px] font-extrabold leading-none text-white xl:text-[45px]">2</span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold capitalize leading-tight text-primary xl:text-[32px]">
                  Chọn trình độ đầu ra của bạn
                </h3>
                <p className="mt-1 text-center text-[10px] font-normal xl:hidden">
                  Xác định mục tiêu đầu ra tiếng Trung công sở bạn muốn đạt được
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-[64px] justify-center xl:w-[66px]">
                <div className="h-full w-[4px] bg-primary"></div>
              </div>
              <div className="flex flex-1 gap-4 px-5 pb-10 pt-5">
                {outputData.map((item) => {
                  const isActive = dataValue?.output?.slug === item.slug;
                  return (
                    <div
                      onClick={() => handleSetOutput(item.slug ?? '')}
                      key={item.id}
                      className={cn(
                        'relative h-full min-h-[282px] w-[213px] rounded-sm px-2 pb-4 pt-[14px] shadow-[0px_3.38px_3.38px_0px_#00000040] xl:px-2',
                        isActive ? 'bg-[#7D1900] text-white' : 'cursor-pointer bg-white text-[#424242]',
                      )}
                    >
                      <div
                        className={cn(
                          'absolute right-2 top-2 h-4 w-4 rounded-full',
                          isActive ? 'bg-white' : 'bg-[#D9D9D9]',
                        )}
                      />
                      <div className="mx-auto flex h-[34px] w-fit items-center rounded-lg bg-[#F3C650] px-2 text-[20px] font-extrabold text-primary">
                        {item.name}
                      </div>
                      <div className="mt-2 space-y-1 xl:space-y-2 h-7">
                        <p
                          className={cn(
                            'text-center text-xs font-extrabold uppercase xl:text-[15px]',
                            isActive ? 'text-white' : 'text-primary',
                          )}
                        >
                          {item.title}
                        </p>
                      </div>
                      {(item.abstracts ?? []).map((abstract, index) => (
                        <p key={index} className="mt-3 text-[10px] xl:text-[13px]">
                          <span
                            className={cn(
                              'mr-2 inline-flex size-3 items-center justify-center rounded-full border bg-white align-middle',
                              isActive ? 'border-white' : 'border-black',
                            )}
                          >
                            <span
                              className={cn(
                                'size-full rounded-full border',
                                isActive ? 'border-[#7D1900] bg-white' : 'border-white bg-black',
                              )}
                            ></span>
                          </span>
                          <span className="align-middle font-medium">{abstract}</span>
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Xác định lộ trình học của bạn */}
          <div>
            <div className="flex gap-5">
              <div className="flex size-[60px] items-center justify-center rounded-sm bg-primary">
                <span className="text-center text-[28px] font-extrabold leading-none text-white xl:text-[45px]">3</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-extrabold capitalize leading-tight text-primary xl:text-[32px]">
                  Xác định lộ trình học của bạn
                </h3>
                <p className="mt-1 text-center text-[10px] font-normal xl:hidden">
                  Dựa trên trình độ đầu vào và mục tiêu đầu ra, xây dựng lộ trình học cụ thể cùng Học bá để cải thiện
                  tiếng Trung toàn diện trong môi trường công sở
                </p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="flex w-[64px] justify-center xl:w-[66px]" />
              <div className="relative flex-1 gap-4 px-5">
                <div className="relative grid h-[590px] grid-cols-2 gap-4 rounded-[9px] border border-[#FFDFDF] bg-white pb-10 pl-5 pr-7 pt-[18px] shadow-[0px_3.38px_3.38px_0px_#00000040]">
                  <div className="col-span-1 flex flex-col">
                    <div className="w-fit rounded-sm bg-[#F3C650] px-2 py-1 text-base font-bold uppercase text-white">
                      {` #Đầu vào: ${dataValue?.input?.title ?? ''}`}
                    </div>
                    <div className="mt-2 w-fit rounded-sm bg-[#7D1900] px-2 py-1 text-base font-bold uppercase text-white">
                      {`#Đầu ra: ${dataValue?.output?.title ?? ''}`}
                    </div>
                    {dataValue?.result ? (
                      <>
                        <div className="mt-9">
                          <span className="text-2xl font-bold text-primary">Thời gian:</span>
                          <span className="ml-2 text-2xl font-bold text-black">{dataValue.result?.time}</span>
                        </div>
                        <div className="mt-5 flex-1">
                          <span className="text-2xl font-bold text-primary">Mục tiêu khóa học:</span>
                          <p className="mt-2 text-[13px] font-normal text-black">
                            {parse(dataValue.result?.goals ?? 'Hãy thiết kế lộ trình của bạn trước')}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="mt-4 flex-1 text-lg font-medium text-[#373737]">
                        Chọn trình độ đầu ra để xem lộ trình chi tiết
                      </div>
                    )}
                    {/* Nút đăng ký tư vấn PC*/}
                    <div className="flex w-full justify-between pt-[66px]">
                      <button
                        onClick={() => handleScrollToForm()}
                        className="group relative mx-auto hidden h-[60px] items-center justify-center gap-x-4 overflow-hidden rounded-[86px] border-[3px] border-white px-8 text-[28px] font-black uppercase text-white xl:flex"
                      >
                        <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#7D1900]"></span>
                        <span className="absolute inset-0 z-0 bg-gradient-to-l from-[#B90E0A] to-[#F3C650] opacity-0 transition-opacity duration-700 group-hover:opacity-100"></span>
                        <span className="relative z-10 flex items-center gap-x-4">Nhận tư vấn lộ trình chi tiết</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 h-full w-full rounded-[9px] bg-[#7D1900] px-7 py-6 shadow-[0px_3.38px_3.38px_0px_#00000040]">
                    <div>
                      <div className="flex h-[38px] w-fit items-center rounded-sm border border-[#F3C650] bg-[#F3C650] px-2 text-2xl font-bold text-[#7D1900]">
                        Lộ trình gợi ý
                      </div>
                      <p className="custom-scrollbar mt-4 max-h-[180px] overflow-y-scroll text-[13px] font-normal text-white">
                        {parse(dataValue.result?.sugges ?? 'Chọn trình độ đầu ra để xem lộ trình chi tiết')}
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="flex h-[38px] w-fit items-center rounded-sm border border-[#F3C650] bg-[#F3C650] px-2 text-2xl font-bold text-[#7D1900]">
                        Kết quả đạt được
                      </div>
                      <p className="custom-scrollbar mt-4 max-h-[180px] overflow-y-scroll text-[13px] font-normal text-white">
                        {parse(dataValue.result?.knowledge ?? 'Chọn trình độ đầu ra để xem lộ trình chi tiết')}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -right-6 -top-8 h-[87px] w-[96px]">
                    <img src={roadmapIcon} alt="roadmapIcon" className="h-full w-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildRoadmap;
