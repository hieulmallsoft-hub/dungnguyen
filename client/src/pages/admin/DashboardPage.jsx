import { useMemo, useState } from 'react';
import AdminIcon from '../../components/admin/AdminIcon';
import DonutChart from '../../components/admin/DonutChart';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import FunnelChart from '../../components/admin/FunnelChart';
import LineTrendChart from '../../components/admin/LineTrendChart';
import PageHeader from '../../components/admin/PageHeader';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatCompactNumber, formatDateTime } from '../../data/adminHelpers';

const INITIAL_DATA = {
  metrics: [],
  applicationTrend: [],
  hiringFunnel: [],
  sourceMix: [],
  operationalAlerts: [],
  activityFeed: [],
  healthCards: []
};

function DashboardPage() {
  const [period, setPeriod] = useState('30d');
  const [granularity, setGranularity] = useState('day');
  const [companyId, setCompanyId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  // Fetch filter options
  const { data: companiesData } = useAdminResource('companies', { items: [] });
  const { data: categoriesData } = useAdminResource('categories', { items: [] });

  const dashboardResource = useMemo(() => {
    const now = new Date();
    const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const formatDateOnly = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    let from = '';
    let to = '';

    if (period === '7d') {
      const fromDate = startOfDay(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000));
      from = formatDateOnly(fromDate);
      to = formatDateOnly(startOfDay(now));
    } else if (period === '30d') {
      const fromDate = startOfDay(new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000));
      from = formatDateOnly(fromDate);
      to = formatDateOnly(startOfDay(now));
    } else if (period === '90d') {
      const fromDate = startOfDay(new Date(now.getTime() - 89 * 24 * 60 * 60 * 1000));
      from = formatDateOnly(fromDate);
      to = formatDateOnly(startOfDay(now));
    } else if (period === 'ytd') {
      from = formatDateOnly(new Date(now.getFullYear(), 0, 1));
      to = formatDateOnly(startOfDay(now));
    } else if (period === 'custom') {
      from = customFrom || '';
      to = customTo || '';
    }

    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    if (companyId) params.set('companyId', companyId);
    if (categoryId) params.set('categoryId', categoryId);
    params.set('granularity', granularity);
    
    const query = params.toString();
    return query ? `dashboard?${query}` : 'dashboard';
  }, [customFrom, customTo, granularity, period, companyId, categoryId]);

  const { data, error, loading, reload } = useAdminResource(dashboardResource, INITIAL_DATA);
  const hasContent = data.metrics.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Bảng điều khiển quản trị"
        title="Trung tâm điều hành tuyển dụng"
        description="Phân tích luồng ứng tuyển, hiệu quả doanh nghiệp và chất lượng tin đăng."
        actions={
          <>
            <button type="button" className="admin-btn-secondary" onClick={reload}>
              <AdminIcon name="download" className="h-4 w-4" />
              Làm mới
            </button>
            <button type="button" className="admin-btn-primary">
              <AdminIcon name="plus" className="h-4 w-4" />
              Báo cáo mới
            </button>
          </>
        }
      />

      <FilterBar
        filters={[
          {
            id: 'period',
            label: 'Thời gian',
            value: period,
            onChange: (val) => {
              setPeriod(val);
              if (val === '7d' || val === '30d') setGranularity('day');
              else setGranularity('month');
            },
            options: [
              { value: 'all', label: 'Tất cả' },
              { value: '7d', label: '7 ngày' },
              { value: '30d', label: '30 ngày' },
              { value: '90d', label: '90 ngày' },
              { value: 'ytd', label: 'Năm nay' },
              { value: 'custom', label: 'Tùy chọn' }
            ]
          },
          {
            id: 'company',
            label: 'Doanh nghiệp',
            value: companyId,
            onChange: setCompanyId,
            options: [
              { value: '', label: 'Tất cả doanh nghiệp' },
              ...companiesData.items.map(c => ({ value: c.id, label: c.name }))
            ]
          },
          {
            id: 'category',
            label: 'Ngành nghề',
            value: categoryId,
            onChange: setCategoryId,
            options: [
              { value: '', label: 'Tất cả ngành nghề' },
              ...categoriesData.items.map(c => ({ value: c.id, label: c.name }))
            ]
          }
        ]}
        actions={
          <div className="flex items-center gap-3">
            {period === 'custom' && (
              <div className="flex gap-2">
                <input className="admin-input h-9 w-[130px] px-2 text-xs" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                <input className="admin-input h-9 w-[130px] px-2 text-xs" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
              </div>
            )}
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
              {['day', 'month', 'year'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGranularity(g)}
                  className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                    granularity === g ? 'bg-cv-red text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {g === 'day' ? 'Ngày' : g === 'month' ? 'Tháng' : 'Năm'}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {loading ? <EmptyState title="Đang tải dữ liệu" /> : null}
      {!loading && error ? <EmptyState title="Lỗi tải dữ liệu" description={error} /> : null}

      {!loading && !error && hasContent ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.8fr,1fr]">
            <LineTrendChart data={data.applicationTrend} title={`Phân tích xu hướng (${granularity === 'day' ? 'Theo ngày' : granularity === 'month' ? 'Theo tháng' : 'Theo năm'})`} />
            <DonutChart title="Nguồn ứng viên" items={data.sourceMix} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <FunnelChart items={data.hiringFunnel} />
            <div className="space-y-6">
              <div className="admin-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-slate-900">Cảnh báo vận hành</h3>
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600">
                    {data.operationalAlerts.length} issue
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {data.operationalAlerts.map((alert) => (
                    <div key={alert.id} className="group relative flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate text-sm font-bold text-slate-900">{alert.title}</h4>
                          <StatusBadge value={alert.severity} size="sm" />
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{alert.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="admin-card p-6">
                <h3 className="font-display text-xl font-bold text-slate-900">Hoạt động gần đây</h3>
                <div className="mt-6 space-y-4">
                  {data.activityFeed.map((item) => (
                    <div key={item.id} className="flex gap-3 border-l-2 border-slate-100 pl-4 pb-4 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-600">
                          <span className="font-bold text-slate-900">{item.actor}</span> {item.action} <span className="font-bold text-slate-900">{item.target}</span>
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 font-medium">{formatDateTime(item.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default DashboardPage;
