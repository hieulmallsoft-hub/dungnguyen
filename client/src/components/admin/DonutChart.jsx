import { formatPercent } from '../../data/adminHelpers';

function DonutChart({ title, items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let currentOffset = 0;

  return (
    <div className="admin-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-1 font-display text-2xl text-slate-950">Cơ cấu nguồn vào</h3>
        </div>
        <span className="rounded-full bg-ember-50 px-3 py-1 text-xs font-semibold text-ember-700">Đang cập nhật</span>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px,1fr] lg:items-center">
        <div className="mx-auto grid h-52 w-52 place-items-center rounded-full bg-slate-50">
          <svg viewBox="0 0 42 42" className="h-44 w-44 -rotate-90">
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eceff3" strokeWidth="6" />
            {items.map((item) => {
              const dash = (item.value / total) * 100;
              const circle = (
                <circle
                  key={item.label}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={item.tone}
                  strokeWidth="6"
                  strokeDasharray={`${dash} ${100 - dash}`}
                  strokeDashoffset={-currentOffset}
                />
              );
              currentOffset += dash;
              return circle;
            })}
          </svg>
          <div className="-mt-28 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Nguồn</p>
            <p className="mt-2 font-display text-3xl text-slate-950">{total}%</p>
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.tone }} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">Tỷ trọng đóng góp</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">{formatPercent(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
