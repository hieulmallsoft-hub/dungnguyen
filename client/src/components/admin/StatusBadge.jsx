import { cn } from '../../data/adminHelpers';

const toneMap = {
  active: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  verified: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  success: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  live: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  hired: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  pending: 'bg-amber-100 text-amber-700 ring-amber-200',
  medium: 'bg-amber-100 text-amber-700 ring-amber-200',
  review: 'bg-amber-100 text-amber-700 ring-amber-200',
  reviewing: 'bg-amber-100 text-amber-700 ring-amber-200',
  screening: 'bg-amber-100 text-amber-700 ring-amber-200',
  interview: 'bg-sky-100 text-sky-700 ring-sky-200',
  offer: 'bg-violet-100 text-violet-700 ring-violet-200',
  open: 'bg-rose-100 text-rose-700 ring-rose-200',
  high: 'bg-rose-100 text-rose-700 ring-rose-200',
  critical: 'bg-rose-100 text-rose-700 ring-rose-200',
  flagged: 'bg-rose-100 text-rose-700 ring-rose-200',
  suspended: 'bg-rose-100 text-rose-700 ring-rose-200',
  blocked: 'bg-rose-100 text-rose-700 ring-rose-200',
  inactive: 'bg-slate-100 text-slate-600 ring-slate-200',
  archived: 'bg-slate-100 text-slate-600 ring-slate-200',
  withdrawn: 'bg-slate-100 text-slate-600 ring-slate-200',
  low: 'bg-slate-100 text-slate-600 ring-slate-200',
  draft: 'bg-slate-100 text-slate-600 ring-slate-200',
  resolved: 'bg-sky-100 text-sky-700 ring-sky-200',
  new: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  recruiter: 'bg-blue-100 text-blue-700 ring-blue-200',
  enterprise: 'bg-ink-950 text-white ring-ink-900',
  growth: 'bg-teal-100 text-teal-700 ring-teal-200',
  starter: 'bg-slate-100 text-slate-600 ring-slate-200',
  candidate: 'bg-orange-100 text-orange-700 ring-orange-200',
  employer: 'bg-teal-100 text-teal-700 ring-teal-200',
  admin: 'bg-ink-950 text-white ring-ink-900',
  healthy: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  system: 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200',
  external: 'bg-slate-100 text-slate-600 ring-slate-200'
};

const labelMap = {
  active: 'Đang hoạt động',
  verified: 'Đã xác minh',
  success: 'Thành công',
  live: 'Đang hiển thị',
  hired: 'Đã tuyển',
  pending: 'Đang chờ',
  medium: 'Trung bình',
  review: 'Cần duyệt',
  reviewing: 'Đang xem xét',
  screening: 'Sàng lọc',
  interview: 'Phỏng vấn',
  offer: 'Đề nghị',
  open: 'Đang mở',
  high: 'Cao',
  critical: 'Khẩn cấp',
  flagged: 'Bị gắn cờ',
  suspended: 'Tạm khóa',
  blocked: 'Đã chặn',
  inactive: 'Không hoạt động',
  archived: 'Đã lưu trữ',
  withdrawn: 'Đã rút',
  low: 'Thấp',
  draft: 'Bản nháp',
  resolved: 'Đã xử lý',
  new: 'Mới',
  recruiter: 'Tuyển dụng',
  enterprise: 'Doanh nghiệp',
  growth: 'Tăng trưởng',
  starter: 'Khởi đầu',
  candidate: 'Ứng viên',
  employer: 'Nhà tuyển dụng',
  admin: 'Quản trị viên',
  healthy: 'Ổn định',
  system: 'Hệ thống',
  external: 'Bên ngoài',
  warning: 'Cảnh báo',
  escalated: 'Đã chuyển mức',
  direct: 'Trực tiếp',
  referral: 'Giới thiệu',
  agency: 'Đối tác',
  social: 'Mạng xã hội'
};

export function getBadgeLabel(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return labelMap[normalized] || String(value || '').replace(/[-_]/g, ' ');
}

function StatusBadge({ value, className }) {
  const normalized = String(value || '').trim().toLowerCase();
  const label = getBadgeLabel(value);

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset',
        toneMap[normalized] || 'bg-slate-100 text-slate-700 ring-slate-200',
        className
      )}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
