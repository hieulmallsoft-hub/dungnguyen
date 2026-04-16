import AdminIcon from './AdminIcon';
import { cn, formatCompactNumber, formatPercent } from '../../data/adminHelpers';

function StatCard({ item }) {
  const isPositive = item.trend !== 'down';

  return (
    <article className="admin-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="mt-3 font-display text-3xl text-slate-950">{formatCompactNumber(item.value)}</p>
        </div>
        <span className="rounded-2xl bg-slate-100 p-2 text-slate-700">
          <AdminIcon name={isPositive ? 'arrowUp' : 'arrowDown'} className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span className={cn('font-semibold', isPositive ? 'text-emerald-600' : 'text-rose-600')}>
          {isPositive ? '+' : ''}
          {formatPercent(item.change)}
        </span>
        <span className="text-slate-400">so với tháng trước</span>
      </div>
    </article>
  );
}

export default StatCard;
