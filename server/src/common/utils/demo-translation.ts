const EXACT_TRANSLATIONS: Record<string, string> = {
  Manufacturing: 'Sản xuất',
  Logistics: 'Hậu cần',
  Mechanical: 'Cơ khí',
  'Quality Control': 'Kiểm soát chất lượng',
  IT: 'Công nghệ thông tin',
  'Warehouse Management': 'Quản lý kho',
  'Quality Inspection': 'Kiểm định chất lượng',
  'Java Backend Developer': 'Lập trình viên Java backend',
  'Maintenance Technician': 'Kỹ thuật viên bảo trì',
  'QC Staff': 'Nhân viên QC',
  'Nhan vien kho van ca dem': 'Nhân viên kho vận ca đêm',
  'Ky thuat vien bao tri day chuyen': 'Kỹ thuật viên bảo trì dây chuyền',
  'Nhan vien QC kiem tra chat luong': 'Nhân viên QC kiểm tra chất lượng',
  'Xay dung API cho he thong ERP noi bo.': 'Xây dựng API cho hệ thống ERP nội bộ.',
  'Nhap xuat hang, kiem dem bang handheld scanner.': 'Nhập xuất hàng, kiểm đếm bằng máy quét cầm tay.',
  'Bao tri may moc san xuat va xu ly su co co dien.': 'Bảo trì máy móc sản xuất và xử lý sự cố cơ điện.',
  'Kiem tra chat luong thanh pham theo checklist.': 'Kiểm tra chất lượng thành phẩm theo danh sách kiểm tra.',
  '3 nam Java.': '3 năm kinh nghiệm Java.',
  'Spring Boot.': 'Spring Boot.',
  'PostgreSQL.': 'PostgreSQL.',
  'Kinh nghiem kho van.': 'Kinh nghiệm kho vận.',
  'Dung may quet ma vach.': 'Sử dụng máy quét mã vạch.',
  'Lam ca dem.': 'Làm ca đêm.',
  'Bao tri may cong nghiep.': 'Bảo trì máy công nghiệp.',
  'Doc ban ve.': 'Đọc bản vẽ kỹ thuật.',
  'Biet PLC la loi the.': 'Biết PLC là lợi thế.',
  'Tot nghiep THPT.': 'Tốt nghiệp THPT.',
  'Can than.': 'Cẩn thận.',
  'Uu tien tung lam QC.': 'Ưu tiên từng làm QC.',
  'Hybrid.': 'Làm việc kết hợp.',
  'Thuong quy.': 'Thưởng quý.',
  'BHYT full luong.': 'BHYT trên toàn bộ lương.',
  'Phu cap dem.': 'Phụ cấp ca đêm.',
  'Kham suc khoe.': 'Khám sức khỏe định kỳ.',
  'Lo trinh thang tien.': 'Lộ trình thăng tiến.',
  'Thu nhap canh tranh.': 'Thu nhập cạnh tranh.',
  'Ho tro khoa hoc.': 'Hỗ trợ khóa học.',
  'Bua trua nha may.': 'Bữa trưa tại nhà máy.',
  'Phu cap chuyen can.': 'Phụ cấp chuyên cần.',
  'Ho tro bua an.': 'Hỗ trợ bữa ăn.',
  'Thuong hieu suat.': 'Thưởng hiệu suất.',
  'Phu cap dem': 'Phụ cấp đêm',
  'Bao hiem': 'Bảo hiểm',
  'Hanh chinh': 'Hành chính',
  'Hanh chinh + truc su co': 'Hành chính + trực sự cố',
  'Ca ngay': 'Ca ngày',
  'Fraud profile': 'Hồ sơ giả mạo',
  'Abusive recruiter': 'Nhà tuyển dụng có hành vi không phù hợp'
};

const PARTIAL_TRANSLATIONS: Array<[string, string]> = [
  ['Ha Noi', 'Hà Nội'],
  ['Dong Nai', 'Đồng Nai'],
  ['Bien Hoa', 'Biên Hòa'],
  ['Gia Lam', 'Gia Lâm'],
  ['Hai Phong', 'Hải Phòng'],
  ['Thu Duc', 'Thủ Đức'],
  ['Cau Giay', 'Cầu Giấy'],
  ['Trang Due', 'Tràng Duệ']
];

export function translateDemoText(value?: string | null) {
  if (!value) {
    return value || '';
  }

  const exact = EXACT_TRANSLATIONS[value];
  if (exact) {
    return exact;
  }

  return PARTIAL_TRANSLATIONS.reduce((current, [source, target]) => current.split(source).join(target), value);
}

export function translateDemoList(values?: string[] | null) {
  return (values || []).map((value) => translateDemoText(value));
}
