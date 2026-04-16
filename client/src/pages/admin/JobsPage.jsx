import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import RowActions from '../../components/admin/RowActions';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDate } from '../../data/adminHelpers';

const INITIAL_DATA = { items: [], total: 0 };

function JobsPage() {
  const { data, error, loading } = useAdminResource('jobs', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');

  const jobs = data.items || [];
  const filteredRows = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery = !query || [job.title, job.company, job.location].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || job.status === status;
      const matchesCategory = category === 'all' || job.category === category;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [category, jobs, query, status]);

  const columns = [
    {
      key: 'title',
      header: 'Việc làm',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.title}</p>
          <p className="text-xs text-slate-500">{row.company}</p>
        </div>
      )
    },
    { key: 'category', header: 'Danh mục' },
    { key: 'location', header: 'Địa điểm' },
    { key: 'type', header: 'Loại hình' },
    { key: 'status', header: 'Trạng thái', render: (row) => <StatusBadge value={row.status} /> },
    {
      key: 'applications',
      header: 'Nhu cầu',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.applications} lượt ứng tuyển</p>
          <p className="text-xs text-slate-500">Điểm chất lượng {row.qualityScore}/100</p>
        </div>
      )
    },
    {
      key: 'timeline',
      header: 'Thời gian',
      render: (row) => (
        <div>
          <p className="text-xs text-slate-500">Đăng {formatDate(row.postedAt)}</p>
          <p className="text-xs text-slate-500">Hạn {formatDate(row.deadline)}</p>
        </div>
      )
    },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Mở" secondaryLabel="Sửa" dangerLabel="Tạm dừng" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quản lý việc làm"
        title="Tin tuyển dụng"
        description="Kiểm tra chất lượng tin đăng, duyệt các vị trí rủi ro và giữ số liệu tuyển dụng chính xác trước khi hiển thị tới doanh nghiệp."
      />

      {loading ? <EmptyState title="Đang tải tin tuyển dụng" description="Đang đọc dữ liệu việc làm từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải tin tuyển dụng" description={error} /> : null}

      {!loading && !error ? (
        <>
          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo tiêu đề, doanh nghiệp hoặc địa điểm"
            filters={[
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'live', label: 'Đang hiển thị' },
                  { value: 'review', label: 'Cần duyệt' },
                  { value: 'draft', label: 'Bản nháp' },
                  { value: 'flagged', label: 'Bị gắn cờ' },
                  { value: 'archived', label: 'Đã lưu trữ' }
                ]
              },
              {
                id: 'category',
                value: category,
                onChange: setCategory,
                options: [
                  { value: 'all', label: 'Tất cả danh mục' },
                  ...Array.from(new Set(jobs.map((job) => job.category))).map((item) => ({ value: item, label: item }))
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có tin tuyển dụng phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default JobsPage;
