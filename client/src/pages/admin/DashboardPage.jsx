import AdminIcon from '../../components/admin/AdminIcon';
import DonutChart from '../../components/admin/DonutChart';
import EmptyState from '../../components/admin/EmptyState';
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
  const { data, error, loading, reload } = useAdminResource('dashboard', INITIAL_DATA);
  const hasContent =
    data.metrics.length > 0 &&
    data.applicationTrend.length > 0 &&
    data.hiringFunnel.length > 0 &&
    data.sourceMix.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Bảng điều khiển quản trị"
        title="Trung tâm điều hành tuyển dụng"
        description="Theo dõi sức khỏe nền tảng, hoạt động doanh nghiệp, chất lượng tin tuyển dụng và luồng ứng tuyển trong một màn hình vận hành."
        actions={
          <>
            <button type="button" className="admin-btn-secondary" onClick={reload}>
              <AdminIcon name="download" className="h-4 w-4" />
              Làm mới dữ liệu
            </button>
            <button type="button" className="admin-btn-primary">
              <AdminIcon name="plus" className="h-4 w-4" />
              Tạo báo cáo
            </button>
          </>
        }
      />

      {loading ? <EmptyState title="Đang tải bảng điều khiển" description="Đang lấy chỉ số và hoạt động từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải bảng điều khiển" description={error} /> : null}
      {!loading && !error && !hasContent ? (
        <EmptyState title="Chưa có dữ liệu bảng điều khiển" description="Cơ sở dữ liệu quản trị đang hoạt động nhưng chưa đủ dữ liệu để hiển thị bảng điều khiển." />
      ) : null}

      {!loading && !error && hasContent ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
            <LineTrendChart data={data.applicationTrend} />
            <DonutChart title="Cơ cấu nguồn ứng viên" items={data.sourceMix} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <FunnelChart items={data.hiringFunnel} />

            <div className="space-y-6">
              <div className="admin-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Cảnh báo vận hành</p>
                    <h3 className="mt-1 font-display text-2xl text-slate-950">Việc cần xử lý hôm nay</h3>
                  </div>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                    {data.operationalAlerts.length} mục đang mở
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {data.operationalAlerts.map((alert) => (
                    <article key={alert.id} className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-slate-950">{alert.title}</h4>
                          <p className="text-sm leading-6 text-slate-500">{alert.detail}</p>
                        </div>
                        <StatusBadge value={alert.severity} />
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-400">
                        <span>{alert.owner}</span>
                        <span>{formatDateTime(alert.time)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="admin-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Dòng hoạt động</p>
                    <h3 className="mt-1 font-display text-2xl text-slate-950">Thay đổi gần đây</h3>
                  </div>
                  <button type="button" className="admin-btn-ghost text-xs" onClick={reload}>
                    Làm mới
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  {data.activityFeed.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-[22px] border border-slate-100 px-4 py-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink-950 text-white">
                        <AdminIcon name="spark" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-6 text-slate-600">
                          <span className="font-semibold text-slate-950">{item.actor}</span> {item.action}{' '}
                          <span className="font-semibold text-slate-950">{item.target}</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">{formatDateTime(item.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr,1fr,1fr]">
            {data.healthCards.map((item) => (
              <div key={item.id} className="admin-card p-6">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <div className="mt-3 flex items-end gap-3">
                  <p className="font-display text-4xl text-slate-950">{formatCompactNumber(item.value)}</p>
                  <StatusBadge value={item.status} className="mb-1" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.hint}</p>
              </div>
            ))}
          </section>
        </>
      ) : null}
    </div>
  );
}

export default DashboardPage;
