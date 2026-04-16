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

function ReportsPage() {
  const { data, error, loading } = useAdminResource('reports', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [status, setStatus] = useState('all');

  const reports = data.items || [];
  const filteredRows = useMemo(() => {
    return reports.filter((report) => {
      const matchesQuery =
        !query || [report.type, report.target, report.reporter].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesSeverity = severity === 'all' || report.severity === severity;
      const matchesStatus = status === 'all' || report.status === status;
      return matchesQuery && matchesSeverity && matchesStatus;
    });
  }, [query, reports, severity, status]);

  const columns = [
    { key: 'type', header: 'Loại báo cáo', render: (row) => <p className="font-semibold text-slate-950">{row.type}</p> },
    { key: 'target', header: 'Đối tượng' },
    { key: 'reporter', header: 'Người báo cáo' },
    { key: 'severity', header: 'Mức độ', render: (row) => <StatusBadge value={row.severity} /> },
    { key: 'status', header: 'Trạng thái', render: (row) => <StatusBadge value={row.status} /> },
    { key: 'createdAt', header: 'Ngày tạo', render: (row) => formatDateTime(row.createdAt) },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Điều tra" secondaryLabel="Phân công" dangerLabel="Chuyển mức" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tin cậy và an toàn"
        title="Báo cáo và sự cố"
        description="Điều tra phản ánh của ứng viên, doanh nghiệp đáng ngờ và tín hiệu lạm dụng tự động trước khi niềm tin bị ảnh hưởng."
      />

      {loading ? <EmptyState title="Đang tải báo cáo" description="Đang đọc báo cáo sự cố và lạm dụng từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải báo cáo" description={error} /> : null}

      {!loading && !error ? (
        <>
          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo loại báo cáo, đối tượng hoặc người báo cáo"
            filters={[
              {
                id: 'severity',
                value: severity,
                onChange: setSeverity,
                options: [
                  { value: 'all', label: 'Tất cả mức độ' },
                  { value: 'low', label: 'Thấp' },
                  { value: 'medium', label: 'Trung bình' },
                  { value: 'high', label: 'Cao' },
                  { value: 'critical', label: 'Khẩn cấp' }
                ]
              },
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'open', label: 'Đang mở' },
                  { value: 'reviewing', label: 'Đang xem xét' },
                  { value: 'escalated', label: 'Đã chuyển mức' },
                  { value: 'resolved', label: 'Đã xử lý' }
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có báo cáo phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default ReportsPage;
