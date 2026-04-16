import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import RowActions from '../../components/admin/RowActions';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDateTime } from '../../data/adminHelpers';

const INITIAL_DATA = { items: [], total: 0 };

function CompaniesPage() {
  const { data, error, loading } = useAdminResource('companies', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('all');

  const companies = data.items || [];
  const filteredRows = useMemo(() => {
    return companies.filter((company) => {
      const matchesQuery =
        !query ||
        [company.name, company.industry, company.location, company.owner].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || company.status === status;
      const matchesPlan = plan === 'all' || company.plan === plan;
      return matchesQuery && matchesStatus && matchesPlan;
    });
  }, [companies, plan, query, status]);

  const columns = [
    {
      key: 'name',
      header: 'Doanh nghiệp',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.name}</p>
          <p className="text-xs text-slate-500">{row.industry}</p>
        </div>
      )
    },
    { key: 'location', header: 'Địa điểm' },
    { key: 'plan', header: 'Gói', render: (row) => <StatusBadge value={row.plan} /> },
    { key: 'status', header: 'Trạng thái', render: (row) => <StatusBadge value={row.status} /> },
    {
      key: 'pipeline',
      header: 'Khối lượng tuyển dụng',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.openJobs} việc đang mở</p>
          <p className="text-xs text-slate-500">{row.applications} lượt ứng tuyển</p>
        </div>
      )
    },
    { key: 'owner', header: 'Phụ trách' },
    { key: 'updatedAt', header: 'Cập nhật', render: (row) => formatDateTime(row.updatedAt) },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Duyệt" secondaryLabel="Sửa" dangerLabel="Gắn cờ" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quản lý doanh nghiệp"
        title="Doanh nghiệp tuyển dụng"
        description="Kiểm soát xác minh doanh nghiệp, tình trạng gói dịch vụ và số lượng vị trí đang tuyển trước khi hiển thị tới ứng viên."
      />

      {loading ? <EmptyState title="Đang tải doanh nghiệp" description="Đang đọc danh sách doanh nghiệp từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải doanh nghiệp" description={error} /> : null}

      {!loading && !error ? (
        <>
          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo doanh nghiệp, người phụ trách, ngành hoặc địa điểm"
            filters={[
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'verified', label: 'Đã xác minh' },
                  { value: 'pending', label: 'Đang chờ' },
                  { value: 'review', label: 'Cần duyệt' },
                  { value: 'flagged', label: 'Bị gắn cờ' },
                  { value: 'archived', label: 'Đã lưu trữ' }
                ]
              },
              {
                id: 'plan',
                value: plan,
                onChange: setPlan,
                options: [
                  { value: 'all', label: 'Tất cả gói' },
                  { value: 'Enterprise', label: 'Doanh nghiệp' },
                  { value: 'Growth', label: 'Tăng trưởng' },
                  { value: 'Starter', label: 'Khởi đầu' }
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có doanh nghiệp phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default CompaniesPage;
