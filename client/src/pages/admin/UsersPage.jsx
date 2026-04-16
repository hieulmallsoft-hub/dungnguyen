import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import RowActions from '../../components/admin/RowActions';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDateTime, formatCompactNumber } from '../../data/adminHelpers';

const INITIAL_DATA = { items: [], total: 0 };

function UsersPage() {
  const { data, error, loading } = useAdminResource('users', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');

  const users = data.items || [];
  const filteredRows = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        !query ||
        [user.name, user.email, user.company, user.region].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === 'all' || user.role === role;
      const matchesStatus = status === 'all' || user.status === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [query, role, status, users]);

  const columns = [
    {
      key: 'name',
      header: 'Người dùng',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.name}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      )
    },
    { key: 'role', header: 'Vai trò', render: (row) => <StatusBadge value={row.role} /> },
    { key: 'status', header: 'Trạng thái', render: (row) => <StatusBadge value={row.status} /> },
    { key: 'company', header: 'Doanh nghiệp', render: (row) => <span>{row.company}</span> },
    { key: 'region', header: 'Khu vực' },
    { key: 'lastActiveAt', header: 'Hoạt động gần nhất', render: (row) => formatDateTime(row.lastActiveAt) },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Xem" secondaryLabel="Sửa" dangerLabel="Tạm khóa" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quản lý người dùng"
        title="Người dùng và quyền truy cập"
        description="Theo dõi ứng viên, người phụ trách tuyển dụng, tài khoản doanh nghiệp và quản trị viên nền tảng trong một danh bạ tập trung."
      />

      {loading ? <EmptyState title="Đang tải người dùng" description="Đang đọc hồ sơ người dùng từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải người dùng" description={error} /> : null}

      {!loading && !error ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Tổng người dùng', value: users.length },
              { label: 'Hồ sơ đã xác minh', value: users.filter((item) => item.verified).length },
              { label: 'Tài khoản tuyển dụng', value: users.filter((item) => item.role === 'employer').length },
              { label: 'Tài khoản bị tạm khóa', value: users.filter((item) => item.status === 'suspended').length }
            ].map((item) => (
              <div key={item.label} className="admin-card p-5">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-3 font-display text-3xl text-slate-950">{formatCompactNumber(item.value)}</p>
              </div>
            ))}
          </section>

          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo tên, email, doanh nghiệp hoặc khu vực"
            filters={[
              {
                id: 'role',
                value: role,
                onChange: setRole,
                options: [
                  { value: 'all', label: 'Tất cả vai trò' },
                  { value: 'admin', label: 'Quản trị viên' },
                  { value: 'recruiter', label: 'Tuyển dụng' },
                  { value: 'employer', label: 'Nhà tuyển dụng' },
                  { value: 'candidate', label: 'Ứng viên' }
                ]
              },
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'active', label: 'Đang hoạt động' },
                  { value: 'pending', label: 'Đang chờ' },
                  { value: 'review', label: 'Cần duyệt' },
                  { value: 'inactive', label: 'Không hoạt động' },
                  { value: 'suspended', label: 'Tạm khóa' }
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có người dùng phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default UsersPage;
