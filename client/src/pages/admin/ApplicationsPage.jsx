import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import RowActions from '../../components/admin/RowActions';
import { apiUrl } from '../../data/apiBase';
import StatusBadge, { getBadgeLabel } from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDateTime } from '../../data/adminHelpers';

const INITIAL_DATA = { items: [], total: 0 };

function getResumeDownloadUrl(resumeUrl) {
  if (!resumeUrl) {
    return '';
  }

  if (resumeUrl.startsWith('/api/uploads/') || resumeUrl.startsWith('/uploads/')) {
    return apiUrl(resumeUrl);
  }

  return resumeUrl;
}

function ApplicationsPage() {
  const { data, error, loading } = useAdminResource('applications', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('all');
  const [source, setSource] = useState('all');
  const [year, setYear] = useState('all');
  const [month, setMonth] = useState('all');
  const [day, setDay] = useState('all');

  const handleYearChange = (nextYear) => {
    setYear(nextYear);
    setMonth('all');
    setDay('all');
  };

  const handleMonthChange = (nextMonth) => {
    setMonth(nextMonth);
    setDay('all');
  };

  const applications = data.items || [];

  const availableYears = useMemo(() => {
    const years = new Set();
    for (const item of applications) {
      const date = new Date(item.submittedAt);
      if (!Number.isNaN(date.getTime())) {
        years.add(date.getFullYear());
      }
    }
    return Array.from(years)
      .sort((a, b) => b - a)
      .map((value) => String(value));
  }, [applications]);

  const availableMonths = useMemo(() => {
    if (year === 'all') {
      return [];
    }
    const months = new Set();
    for (const item of applications) {
      const date = new Date(item.submittedAt);
      if (Number.isNaN(date.getTime())) {
        continue;
      }

      const itemYear = String(date.getFullYear());
      if (year !== 'all' && itemYear !== year) {
        continue;
      }

      months.add(date.getMonth() + 1);
    }

    return Array.from(months)
      .sort((a, b) => a - b)
      .map((value) => String(value));
  }, [applications, year]);

  const availableDays = useMemo(() => {
    if (year === 'all' || month === 'all') {
      return [];
    }
    const days = new Set();
    for (const item of applications) {
      const date = new Date(item.submittedAt);
      if (Number.isNaN(date.getTime())) {
        continue;
      }

      const itemYear = String(date.getFullYear());
      const itemMonth = String(date.getMonth() + 1);

      if (year !== 'all' && itemYear !== year) {
        continue;
      }
      if (month !== 'all' && itemMonth !== month) {
        continue;
      }

      days.add(date.getDate());
    }

    return Array.from(days)
      .sort((a, b) => a - b)
      .map((value) => String(value));
  }, [applications, month, year]);

  const filteredRows = useMemo(() => {
    return applications.filter((application) => {
      const matchesQuery =
        !query ||
        [application.candidate, application.jobTitle, application.company, application.owner]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStage = stage === 'all' || application.stage === stage;
      const matchesSource = source === 'all' || application.source === source;

      const submittedDate = new Date(application.submittedAt);
      const submittedValid = !Number.isNaN(submittedDate.getTime());
      const matchesYear = year === 'all' || (submittedValid && String(submittedDate.getFullYear()) === year);
      const matchesMonth = month === 'all' || (submittedValid && String(submittedDate.getMonth() + 1) === month);
      const matchesDay =
        day === 'all' ||
        (submittedValid &&
          year !== 'all' &&
          month !== 'all' &&
          String(submittedDate.getFullYear()) === year &&
          String(submittedDate.getMonth() + 1) === month &&
          String(submittedDate.getDate()) === day);

      return matchesQuery && matchesStage && matchesSource && matchesYear && matchesMonth && matchesDay;
    });
  }, [applications, day, month, query, source, stage, year]);

  const columns = [
    {
      key: 'candidate',
      header: 'Ứng viên',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.candidate}</p>
          <p className="text-xs text-slate-500">Phụ trách {row.owner}</p>
          <p className="text-xs text-slate-500">{row.candidateEmail}</p>
        </div>
      )
    },
    {
      key: 'jobTitle',
      header: 'Vị trí ứng tuyển',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.jobTitle}</p>
          <p className="text-xs text-slate-500">{row.company}</p>
        </div>
      )
    },
    { key: 'stage', header: 'Giai đoạn', render: (row) => <StatusBadge value={row.stage} /> },
    { key: 'score', header: 'Điểm', render: (row) => <span className="font-semibold text-slate-900">{row.score}/100</span> },
    {
      key: 'resume',
      header: 'CV',
      render: (row) => {
        const resumeDownloadUrl = getResumeDownloadUrl(row.resumeUrl);

        return resumeDownloadUrl ? (
          <a
            className="inline-flex rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-200 hover:bg-rose-50"
            href={resumeDownloadUrl}
            target="_blank"
            rel="noreferrer"
            download={row.resumeName || true}
            title={row.resumeName || 'Tải CV'}
          >
            Tải CV
          </a>
        ) : (
          <span className="text-xs text-slate-400">Chưa có CV</span>
        );
      }
    },
    { key: 'source', header: 'Nguồn' },
    { key: 'submittedAt', header: 'Ngày nộp', render: (row) => formatDateTime(row.submittedAt) },
    { key: 'actions', header: 'Thao tác', render: () => <RowActions primaryLabel="Duyệt" secondaryLabel="Chuyển bước" dangerLabel="Từ chối" /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quản lý ứng tuyển"
        title="Phễu ứng viên"
        description="Theo dõi chất lượng chuyển đổi, phân bổ giai đoạn và khối lượng xử lý của người phụ trách tuyển dụng trước khi cam kết phản hồi bị trễ hoặc ứng viên tốt bị nguội đi."
      />

      {loading ? <EmptyState title="Đang tải danh sách ứng tuyển" description="Đang đọc dữ liệu phễu ứng tuyển từ cơ sở dữ liệu quản trị." /> : null}
      {!loading && error ? <EmptyState title="Không thể tải danh sách ứng tuyển" description={error} /> : null}

      {!loading && !error ? (
        <>
          <FilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder="Tìm theo ứng viên, vị trí, doanh nghiệp hoặc người phụ trách"
            filters={[
              {
                id: 'year',
                label: 'Năm',
                value: year,
                onChange: handleYearChange,
                options: [{ value: 'all', label: 'Tất cả năm' }, ...availableYears.map((value) => ({ value, label: value }))]
              },
              {
                id: 'month',
                label: 'Tháng',
                value: month,
                onChange: handleMonthChange,
                disabled: year === 'all',
                options: [
                  { value: 'all', label: 'Tất cả tháng' },
                  ...availableMonths.map((value) => ({ value, label: `Tháng ${value}` }))
                ]
              },
              {
                id: 'day',
                label: 'Ngày',
                value: day,
                onChange: setDay,
                disabled: year === 'all' || month === 'all',
                options: [{ value: 'all', label: 'Tất cả ngày' }, ...availableDays.map((value) => ({ value, label: `Ngày ${value}` }))]
              },
              {
                id: 'stage',
                label: 'Giai đoạn',
                value: stage,
                onChange: setStage,
                options: [
                  { value: 'all', label: 'Tất cả giai đoạn' },
                  ...Array.from(new Set(applications.map((item) => item.stage))).map((item) => ({
                    value: item,
                    label: getBadgeLabel(item)
                  }))
                ]
              },
              {
                id: 'source',
                label: 'Nguồn',
                value: source,
                onChange: setSource,
                options: [
                  { value: 'all', label: 'Tất cả nguồn' },
                  ...Array.from(new Set(applications.map((item) => item.source))).map((item) => ({ value: item, label: item }))
                ]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có hồ sơ ứng tuyển phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}
    </div>
  );
}

export default ApplicationsPage;
