export const STATIC_HOME_DATA = {
  brand: {
    name: 'Việc 3 Miền',
    subtitle: 'Nền tảng tuyển dụng cho khối sản xuất, hậu cần và kỹ thuật trên toàn quốc.',
    hotline: '0812 533 533',
    email: 'support@viec3mien.vn',
    socialLinks: [
      { label: 'Facebook', href: 'https://www.facebook.com/viec3mientuyendung' },
      { label: 'Zalo', href: 'https://zalo.me/viec3mientuyendung' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@viec3mientuyendung1' }
    ]
  },
  nav: [
    { label: 'Việc làm', href: '#jobs' },
    { label: 'CV mẫu', href: '#cv-mau' },
    { label: 'Doanh nghiệp', href: '#companies' },
    { label: 'Quy trình', href: '#journey' },
    { label: 'Dịch vụ', href: '#services' }
  ],
  heroBanners: [
    {
      id: 'hero-1',
      title: 'Tuyển dụng hiệu quả cho khối sản xuất',
      description: 'Tập trung việc làm chất lượng, thông tin rõ ràng và luồng ứng tuyển nhanh trong một giao diện duy nhất.',
      imageDesktop: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1800&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?auto=format&fit=crop&w=900&q=80',
      ctaPrimary: { label: 'Tìm việc ngay', href: '#jobs' },
      ctaSecondary: { label: 'Tạo hồ sơ ứng viên', href: '#jobs' }
    },
    {
      id: 'hero-2',
      title: 'Tối ưu chi phí tuyển dụng cho doanh nghiệp',
      description: 'Lọc ứng viên theo khu vực và kỹ năng, kết hợp bảng điều hành vận hành để quản trị chất lượng tin đăng.',
      imageDesktop: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
      ctaPrimary: { label: 'Đăng tin tuyển dụng', href: '#services' },
      ctaSecondary: { label: 'Xem doanh nghiệp', href: '#companies' }
    }
  ],
  testimonials: [
    { id: 'ts-1', author: 'Trần Bảo Châu, Quản trị nền tảng', quote: 'Việc 3 Miền giúp đội vận hành theo dõi chất lượng tin đăng, cam kết phản hồi từ doanh nghiệp và tiến trình ứng viên trong một nơi duy nhất.' },
    { id: 'ts-2', author: 'Phạm Thu Linh, Trưởng phòng nhân sự', quote: 'Bảng điều khiển quản trị rõ ràng, đội nhân sự có thể lọc hồ sơ nhanh và xem lịch sử thay đổi tin đăng để ra quyết định tốt hơn.' }
  ],
  talentJourney: [
    { id: 'journey-1', title: 'Chọn việc đúng nhu cầu', description: 'Lọc theo mức lương, kinh nghiệm, khu vực và hình thức làm việc.' },
    { id: 'journey-2', title: 'Gửi CV trong vài phút', description: 'Ứng viên có thể nộp CV mặc định hoặc liên kết CV mới ngay trong cửa sổ xem việc làm.' },
    { id: 'journey-3', title: 'Theo dõi phản hồi', description: 'Hệ thống ghi nhận trạng thái ứng tuyển để ứng viên và người phụ trách tuyển dụng cùng theo dõi.' }
  ],
  cvTemplates: [
    {
      id: 'cv-standard',
      category: 'Đơn giản',
      name: 'Tiêu chuẩn',
      tagline: 'Mẫu gọn, sáng và dễ đọc, phù hợp hồ sơ ATS và ứng tuyển nhanh.',
      accent: '#c62839',
      softTone: '#fff2f4',
      palette: ['#111827', '#d1d5db', '#e5e7eb', '#7c2d39'],
      styleTags: ['ATS', 'Đơn giản'],
      layout: 'clean',
      recommendedFor: ['Kỹ thuật viên', 'QA', 'Kho vận', 'Điều phối'],
      highlights: ['Bố cục 1 trang', 'Tối ưu đọc nhanh', 'Nhấn vào kinh nghiệm'],
      preview: {
        fullName: 'Nguyễn Gia Huy',
        title: 'Kỹ thuật viên bảo trì',
        summary: '4 năm kinh nghiệm bảo trì dây chuyền, kiểm soát sự cố và phối hợp tổ sản xuất.',
        meta: ['Biên Hòa, Đồng Nai', 'Sẵn sàng đi ca', 'Mong muốn 18-20 triệu'],
        stats: [
          { label: 'Kinh nghiệm', value: '4 năm' },
          { label: 'Dự án nổi bật', value: '12+' },
          { label: 'Phù hợp ATS', value: 'Cao' }
        ],
        experience: [
          'Giảm 18% thời gian dừng máy nhờ checklist bảo trì định kỳ.',
          'Phối hợp kỹ thuật điện, cơ khí và QC trong ca sản xuất.'
        ],
        skills: ['PLC cơ bản', 'Bảo trì điện', '5S', 'An toàn vận hành']
      }
    },
    {
      id: 'cv-standard-junior',
      category: 'Đơn giản',
      name: 'Tiêu chuẩn (ít kinh nghiệm)',
      tagline: 'Tập trung học vấn, thực tập và kỹ năng nền tảng cho người mới đi làm.',
      accent: '#2563eb',
      softTone: '#eef4ff',
      palette: ['#d9e7f6', '#f4efe6', '#dce8d3', '#f6ece8'],
      styleTags: ['ATS', 'Đơn giản', 'Chuyên nghiệp'],
      layout: 'centered',
      isNew: true,
      recommendedFor: ['Thực tập sinh', 'Junior', 'Nhân viên mới tốt nghiệp'],
      highlights: ['Mở đầu rõ ràng', 'Dễ điền', 'Tối ưu cho người mới'],
      preview: {
        fullName: 'Nguyễn Minh Trang',
        title: 'Nhân viên kiểm toán nội bộ',
        summary: 'Mới tốt nghiệp, chăm chỉ, có trải nghiệm thực tập và muốn phát triển theo hướng kiểm soát nội bộ.',
        meta: ['Hà Nội', 'IELTS 6.0', 'Sẵn sàng học nhanh'],
        stats: [
          { label: 'Thực tập', value: '2 kỳ' },
          { label: 'Chứng chỉ', value: '03' },
          { label: 'Dự án', value: '05' }
        ],
        experience: [
          'Thực tập kiểm soát hồ sơ và đối chiếu chứng từ nội bộ.',
          'Hỗ trợ lập báo cáo định kỳ và tổng hợp dữ liệu kiểm tra.'
        ],
        skills: ['Excel', 'Phân tích số liệu', 'Báo cáo', 'Chi tiết']
      }
    },
    {
      id: 'cv-impact-6',
      category: 'Ấn tượng',
      name: 'Ấn tượng 6',
      tagline: 'Mẫu có cột màu nổi bật, hợp ngành sáng tạo, truyền thông và nội dung.',
      accent: '#6b4b4b',
      softTone: '#f6efee',
      palette: ['#6b4b4b', '#7f8f7f', '#5b7c89', '#8f6b84', '#9b5757'],
      styleTags: ['ATS', 'Hiện đại', 'Chuyên nghiệp'],
      layout: 'sidebar-dark',
      recommendedFor: ['Content', 'Marketing', 'Thiết kế', 'Truyền thông'],
      highlights: ['Cột trái nổi bật', 'Đậm cá tính', 'Rõ kỹ năng'],
      preview: {
        fullName: 'Trần Mạnh Dũng',
        title: 'Content Leader',
        summary: 'Làm nội dung đa nền tảng, dẫn dắt team nhỏ và tối ưu hiệu quả chiến dịch bằng số liệu.',
        meta: ['Hà Nội', '4 năm kinh nghiệm', 'Mạnh chiến dịch số'],
        stats: [
          { label: 'Chiến dịch', value: '27' },
          { label: 'Nhân sự phụ trách', value: '4' },
          { label: 'Tăng trưởng', value: '180%' }
        ],
        experience: [
          'Xây dựng nội dung cho chiến dịch social và landing page chuyển đổi.',
          'Điều phối cộng tác viên, theo dõi KPI và tối ưu hiệu suất nội dung.'
        ],
        skills: ['Content plan', 'SEO', 'Analytics', 'Leadership']
      }
    },
    {
      id: 'cv-impact-2',
      category: 'Ấn tượng',
      name: 'Ấn tượng 2',
      tagline: 'Thiết kế sidebar xanh trầm, hợp IT, sản phẩm và hồ sơ cần nhấn độ tin cậy.',
      accent: '#4d5d4d',
      softTone: '#eef3ef',
      palette: ['#445546', '#89a691', '#4f7286', '#a56a6a'],
      styleTags: ['ATS', 'Chuyên nghiệp', 'Ấn tượng'],
      layout: 'sidebar-soft',
      recommendedFor: ['Lập trình viên', 'Phân tích nghiệp vụ', 'Sản phẩm'],
      highlights: ['Sidebar mạnh', 'Rõ kỹ năng', 'Nhấn tiến trình làm việc'],
      preview: {
        fullName: 'Lê Chiến',
        title: 'Lập trình viên',
        summary: '2 năm kinh nghiệm phát triển ứng dụng web và phối hợp cùng team sản phẩm theo sprint.',
        meta: ['Đà Nẵng', 'Có thể làm hybrid', 'Mạnh React'],
        stats: [
          { label: 'Dự án', value: '09' },
          { label: 'Kỹ năng chính', value: '6' },
          { label: 'Sprint', value: '20+' }
        ],
        experience: [
          'Phát triển dashboard nội bộ và tối ưu hiệu suất hiển thị dữ liệu.',
          'Làm việc chặt với thiết kế và kiểm thử để hoàn thiện luồng người dùng.'
        ],
        skills: ['React', 'TypeScript', 'REST API', 'UI logic']
      }
    },
    {
      id: 'cv-elegant',
      category: 'Chuyên nghiệp',
      name: 'Thanh lịch',
      tagline: 'Bố cục cân bằng, hợp hồ sơ kinh doanh, vận hành và vị trí chuyên viên.',
      accent: '#0f8f63',
      softTone: '#edf8f3',
      palette: ['#c43746', '#6574b3', '#6ca36f', '#e9a61f'],
      styleTags: ['ATS', 'Đơn giản', 'Hiện đại'],
      layout: 'split',
      recommendedFor: ['Chuyên viên', 'Kinh doanh', 'Vận hành'],
      highlights: ['Nhìn sáng', 'Dễ quét nội dung', 'Cân bằng giữa kinh nghiệm và kỹ năng'],
      preview: {
        fullName: 'Nguyễn Quỳnh Như',
        title: 'Quản lý nhà hàng',
        summary: 'Quản lý vận hành, đào tạo nhân sự và theo dõi doanh thu theo tuần trong môi trường dịch vụ.',
        meta: ['TP.HCM', '6 năm kinh nghiệm', 'Mạnh điều phối đội nhóm'],
        stats: [
          { label: 'Nhân sự phụ trách', value: '18' },
          { label: 'Doanh thu', value: '+24%' },
          { label: 'Chi nhánh', value: '02' }
        ],
        experience: [
          'Quản lý vận hành nhà hàng và tối ưu chất lượng phục vụ theo ca.',
          'Huấn luyện đội ngũ mới, chuẩn hóa quy trình và kiểm soát chi phí.'
        ],
        skills: ['Quản lý ca', 'Đào tạo', 'Báo cáo', 'CSKH']
      }
    },
    {
      id: 'cv-ambition',
      category: 'Hiện đại',
      name: 'Tham vọng',
      tagline: 'Phong cách đậm, hợp hồ sơ cần cá tính và định vị rõ dấu ấn cá nhân.',
      accent: '#d97706',
      softTone: '#fff7ed',
      palette: ['#d97706', '#0ea5e9'],
      styleTags: ['ATS', 'Chuyên nghiệp', 'Ấn tượng'],
      layout: 'contrast',
      recommendedFor: ['Digital marketing', 'Creative', 'Branding'],
      highlights: ['Màu sắc rõ', 'Có điểm nhấn mạnh', 'Phù hợp hồ sơ nổi bật'],
      preview: {
        fullName: 'Vũ Tùng Dương',
        title: 'Senior Digital Marketing',
        summary: 'Xây chiến lược tăng trưởng, vận hành quảng cáo số và tối ưu hiệu quả theo từng kênh.',
        meta: ['Hà Nội', '7 năm kinh nghiệm', 'Mạnh performance'],
        stats: [
          { label: 'Ngân sách quản lý', value: '5 tỷ' },
          { label: 'ROAS', value: '4.2' },
          { label: 'Chiến dịch', value: '40+' }
        ],
        experience: [
          'Quản lý ngân sách quảng cáo đa kênh và tối ưu theo mục tiêu chuyển đổi.',
          'Lập kế hoạch tăng trưởng và phối hợp cùng content, thiết kế, sales.'
        ],
        skills: ['Performance', 'Meta Ads', 'GA4', 'Growth']
      }
    },
    {
      id: 'cv-harvard',
      category: 'Harvard',
      name: 'Harvard tối giản',
      tagline: 'Phong cách học thuật, tối giản và rất phù hợp hồ sơ cần cảm giác chuẩn chỉnh.',
      accent: '#243447',
      softTone: '#f1f5f9',
      palette: ['#243447', '#94a3b8', '#dbe4ee'],
      styleTags: ['Harvard', 'Chuyên nghiệp'],
      layout: 'minimal',
      recommendedFor: ['Tư vấn', 'Tài chính', 'Phân tích dữ liệu'],
      highlights: ['Rất sạch', 'Chuẩn học thuật', 'Ưu tiên nội dung'],
      preview: {
        fullName: 'Phạm Thuý Hà',
        title: 'Nhân viên kế toán nội bộ',
        summary: 'Tập trung số liệu, quy trình và báo cáo tài chính định kỳ trong doanh nghiệp tăng trưởng nhanh.',
        meta: ['Hà Nội', '3 năm kinh nghiệm', 'Tiếng Anh tốt'],
        stats: [
          { label: 'Báo cáo', value: '120+' },
          { label: 'Đối soát', value: '98%' },
          { label: 'Sổ sách', value: 'Chuẩn' }
        ],
        experience: [
          'Đối soát chứng từ, kiểm tra chi phí và lập báo cáo tháng.',
          'Phối hợp kiểm toán nội bộ, chuẩn hóa quy trình lưu trữ hồ sơ.'
        ],
        skills: ['Excel', 'Kế toán nội bộ', 'Đối soát', 'Cẩn thận']
      }
    }
  ],
  services: [
    {
      id: 'service-1',
      title: 'Xây dựng thương hiệu tuyển dụng',
      description: 'Trang công ty, hồ sơ phụ trách tuyển dụng và thông tin xác minh tập trung.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'service-2',
      title: 'Vận hành tuyển dụng',
      description: 'Bảng điều khiển quản trị, nhật ký kiểm toán và báo cáo kiểm duyệt cho đội vận hành.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'service-3',
      title: 'Tăng chuyển đổi ứng viên',
      description: 'Chi tiết việc làm rõ ràng, CV đa dạng và theo dõi ứng tuyển theo từng giai đoạn.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
    }
  ]
};
