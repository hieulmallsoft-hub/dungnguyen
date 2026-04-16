import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../../data/authStorage';
import { adminNavigation } from '../../data/adminMockData';
import AdminIcon from './AdminIcon';

function getInitials(name) {
  return String(name || 'AD')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');
}

function Topbar({ session, onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = session?.user;

  const currentItem = useMemo(
    () => adminNavigation.find((item) => location.pathname.startsWith(item.path)) || adminNavigation[0],
    [location.pathname]
  );

  const handleLogout = () => {
    clearAuthSession();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="admin-card sticky top-4 z-20 mb-6 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" className="admin-btn-secondary lg:hidden" onClick={onToggleSidebar}>
            <AdminIcon name="menu" className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-ember-600">Điều hành tuyển dụng</p>
            <h2 className="mt-1 font-display text-2xl text-slate-950">{currentItem.label}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative block min-w-[280px]">
            <span className="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-slate-400">
              <AdminIcon name="search" className="h-4 w-4" />
            </span>
            <input className="admin-input w-full pl-11" type="search" placeholder="Tìm người dùng, việc làm, doanh nghiệp..." />
          </label>

          <button type="button" className="admin-btn-secondary">
            <AdminIcon name="bell" className="h-5 w-5" />
            Cảnh báo
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-ink-950 to-ember-600 text-sm font-bold text-white">
              {getInitials(user?.fullName || user?.email)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user?.fullName || user?.email || 'Admin'}</p>
              <p className="text-xs text-slate-500">Quản trị nền tảng</p>
            </div>
          </div>

          <button type="button" className="admin-btn-ghost" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
