import { formatCompactNumber, formatPercent } from '../../data/adminHelpers';

function FunnelChart({ items }) {
  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Phễu tuyển dụng</p>
          <h3 className="mt-1 font-display text-2xl text-slate-950">Các bước chuyển đổi</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Vận hành ổn định</span>
      </div>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.stage} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{item.stage}</p>
                <p className="text-slate-500">{formatCompactNumber(item.value)} hồ sơ</p>
              </div>
              <span className="font-semibold text-slate-700">{formatPercent(item.percentage)}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-ember-600 to-amber-400" style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FunnelChart;
