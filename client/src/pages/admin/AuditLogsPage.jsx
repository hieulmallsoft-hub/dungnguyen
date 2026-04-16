import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDateTime } from '../../data/adminHelpers';

const INITIAL_DATA = { items: [], total: 0 };

function AuditLogsPage() {
  const { data, error, loading } = useAdminResource('audit-logs', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [actorRole, setActorRole] = useState('all');
  const [status, setStatus] = useState('all');

  const auditLogs = data.items || [];
  const filteredRows = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesQuery =
        !query || [log.actor, log.action, log.target, log.ip, log.details].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesRole = actorRole === 'all' || log.actorRole === actorRole;
      const matchesStatus = status === 'all' || log.status === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [actorRole, auditLogs, query, status]);

  const columns = [
    {
      key: 'actor',
      header: 'Người thực hiện',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.actor}</p>
          <p className="text-xs text-slate-500">{row.ip}</p>
        </div>
      )
    },
    { key: 'actorRole', header: 'Vai trò', render: (row) => <StatusBadge value={row.actorRole} /> },
    {
      key: 'action',
      header: 'Hành động',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.action}</p>
          <p className="text-xs text-slate-500">{row.target}</p>
        </div>
      )
    },
    {
      key: 'details',
      header: 'Chi tiết',
      render: (row) => <p className="max-w-md text-sm leading-6 text-slate-500">{row.details}</p>
    },
    { key: 'status', header: 'Kết quả', render: (row) => <StatusBadge value={row.status} /> },
    { key: 'occurredAt', header: 'Thời điểm', render: (row) => formatDateTime(row.occurredAt) }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Nhật ký kiểm toán"
        title="Lịch sử kiểm toán"
        description="Theo dõi các hành động quan trọng trên nền tảng, lịch sử điều tra và mô hình truy cập vận hành trên toàn bộ khu quản trị."
      />

      {loading ? <EmptyState title="Đang tải nhật ký kiểm toán" description="Đang đọc lịch sử kiểm toán từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải nhật ký kiểm toán" description={error} /> : null}

      {!loading && !error ? (
        <>
          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo người thực hiện, hành động, đối tượng, IP hoặc chi tiết"
            filters={[
              {
                id: 'actorRole',
                value: actorRole,
                onChange: setActorRole,
                options: [
                  { value: 'all', label: 'Tất cả vai trò' },
                  { value: 'admin', label: 'Quản trị viên' },
                  { value: 'system', label: 'Hệ thống' },
                  { value: 'employer', label: 'Nhà tuyển dụng' },
                  { value: 'external', label: 'Bên ngoài' }
                ]
              },
              {
                id: 'status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'Tất cả kết quả' },
                  { value: 'success', label: 'Thành công' },
                  { value: 'warning', label: 'Cảnh báo' },
                  { value: 'blocked', label: 'Đã chặn' }
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có bản ghi kiểm toán phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default AuditLogsPage;
