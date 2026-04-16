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

function CategoriesPage() {
  const { data, error, loading } = useAdminResource('categories', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const categories = data.items || [];
  const filteredRows = useMemo(() => {
    return categories.filter((category) => {
      const matchesQuery =
        !query || [category.name, category.parent, category.skills.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || category.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [categories, query, status]);

  const columns = [
    {
      key: 'name',
      header: 'Danh mục',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.name}</p>
          <p className="text-xs text-slate-500">Thuộc {row.parent}</p>
        </div>
      )
    },
    { key: 'status', header: 'Trạng thái', render: (row) => <StatusBadge value={row.status} /> },
    {
      key: 'volume',
      header: 'Quy mô',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{formatCompactNumber(row.activeJobs)} việc đang hiển thị</p>
          <p className="text-xs text-slate-500">{formatCompactNumber(row.companies)} doanh nghiệp hoạt động</p>
        </div>
      )
    },
    {
      key: 'skills',
      header: 'Kỹ năng gắn thẻ',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {skill}
            </span>
          ))}
        </div>
      )
    },
    { key: 'updatedAt', header: 'Cập nhật', render: (row) => formatDateTime(row.updatedAt) },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Mở" secondaryLabel="Sửa" dangerLabel="Lưu trữ" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Phân loại"
        title="Danh mục và hệ phân loại"
        description="Kiểm soát phân loại việc làm, từ khóa kỹ năng và cấu trúc cha con để giữ cho tìm kiếm và báo cáo nhất quán."
      />

      {loading ? <EmptyState title="Đang tải danh mục" description="Đang đọc dữ liệu phân loại từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải danh mục" description={error} /> : null}

      {!loading && !error ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Danh mục hoạt động', value: categories.filter((item) => item.status === 'active').length },
              { label: 'Danh mục bản nháp', value: categories.filter((item) => item.status === 'draft').length },
              { label: 'Kỹ năng đã gắn', value: categories.reduce((sum, item) => sum + item.skills.length, 0) }
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
            searchPlaceholder="Tìm theo tên danh mục, nhóm cha hoặc kỹ năng"
            filters={[
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'active', label: 'Đang hoạt động' },
                  { value: 'draft', label: 'Bản nháp' }
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có danh mục phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default CategoriesPage;
