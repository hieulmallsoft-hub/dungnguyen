import { NavLink } from 'react-router-dom';
import { adminNavigation } from '../../data/adminMockData';
import { cn } from '../../data/adminHelpers';
import AdminIcon from './AdminIcon';

function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-950/40 transition lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[300px] flex-col border-r border-white/10 bg-ink-950 px-5 pb-6 pt-5 text-white transition duration-300 lg:static lg:translate-x-0 lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-glow',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ember-300">Việc 3 Miền</p>
            <h2 className="mt-2 font-display text-2xl">Trung tâm quản trị</h2>
          </div>
          <button type="button" className="admin-btn-ghost lg:hidden" onClick={onClose}>
            Đóng
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {adminNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                  isActive
                    ? 'bg-white text-ink-950 shadow-panel'
                    : 'text-white/72 hover:bg-white/10 hover:text-white'
                )
              }
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <span className={cn('grid h-10 w-10 place-items-center rounded-2xl text-current', isActive ? 'bg-slate-100' : 'bg-white/10')}>
                    <AdminIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{item.label}</span>
                    <span className="block text-xs text-current/60">{item.hint}</span>
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Tình trạng hệ thống</p>
          <p className="mt-3 font-display text-2xl">99.92%</p>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Hàng đợi xử lý và giám sát kiểm duyệt đang ổn định trên toàn bộ khu vực.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
