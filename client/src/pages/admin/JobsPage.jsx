import { useMemo, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import EmptyState from '../../components/admin/EmptyState';
import FilterBar from '../../components/admin/FilterBar';
import PageHeader from '../../components/admin/PageHeader';
import RowActions from '../../components/admin/RowActions';
import StatusBadge from '../../components/admin/StatusBadge';
import useAdminResource from '../../hooks/useAdminResource';
import { formatDate } from '../../data/adminHelpers';
import { adminRequest } from '../../data/adminApi';

const INITIAL_DATA = { items: [], total: 0 };

const JOB_TYPE_OPTIONS = [
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'shift', label: 'Theo ca' },
  { value: 'contract', label: 'Hợp đồng' },
  { value: 'intern', label: 'Thực tập' },
  { value: 'remote', label: 'Từ xa' }
];

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'Chưa có kinh nghiệm' },
  { value: 'junior', label: '6 tháng - 1 năm' },
  { value: 'mid', label: '1 - 3 năm' },
  { value: 'senior', label: 'Trên 3 năm' }
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Bản nháp' },
  { value: 'published', label: 'Đang hiển thị' },
  { value: 'closed', label: 'Đã đóng' }
];

const EMPTY_JOB = {
  id: '',
  companyId: '',
  categoryId: '',
  title: '',
  description: '',
  requirementsText: '',
  benefitsText: '',
  salaryMin: '',
  salaryMax: '',
  currency: 'VND',
  location: '',
  district: '',
  jobType: 'full-time',
  experienceLevel: 'none',
  quantity: 1,
  deadline: '',
  status: 'draft',
  urgent: false,
  shift: '',
  tagsText: ''
};

function parseLines(text) {
  return String(text || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCommaList(text) {
  return String(text || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDateInputValue(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function JobEditorModal({
  open,
  mode,
  readOnly,
  value,
  companies,
  categories,
  loading,
  error,
  onChange,
  onClose,
  onSubmit
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4" role="presentation" onClick={onClose}>
      <section
        className="admin-card w-full max-w-4xl p-6"
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'create' ? 'Đăng tuyển' : readOnly ? 'Chi tiết tin tuyển dụng' : 'Cập nhật tin tuyển dụng'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-ember-600">
              {mode === 'create' ? 'Đăng tuyển' : readOnly ? 'Chi tiết' : 'Chỉnh sửa'}
            </p>
            <h2 className="mt-2 font-display text-2xl text-slate-950">{value.title || 'Tin tuyển dụng'}</h2>
            <p className="mt-1 text-sm text-slate-500">Điền đầy đủ thông tin để hiển thị ra trang việc làm public.</p>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="admin-btn-secondary" onClick={onClose}>
              Đóng
            </button>
            {!readOnly ? (
              <button type="button" className="admin-btn-primary" onClick={onSubmit} disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            ) : null}
          </div>
        </div>

        {error ? <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="companyId">
              Doanh nghiệp
            </label>
            <select
              id="companyId"
              className="admin-select w-full"
              value={value.companyId}
              onChange={(event) => onChange({ ...value, companyId: event.target.value })}
              disabled={readOnly}
            >
              <option value="">Chọn doanh nghiệp</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="categoryId">
              Danh mục
            </label>
            <select
              id="categoryId"
              className="admin-select w-full"
              value={value.categoryId}
              onChange={(event) => onChange({ ...value, categoryId: event.target.value })}
              disabled={readOnly}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="title">
              Tiêu đề
            </label>
            <input
              id="title"
              className="admin-input w-full"
              value={value.title}
              onChange={(event) => onChange({ ...value, title: event.target.value })}
              disabled={readOnly}
              placeholder="Ví dụ: Nhân viên QC kiểm tra chất lượng"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="location">
              Tỉnh/Thành
            </label>
            <input
              id="location"
              className="admin-input w-full"
              value={value.location}
              onChange={(event) => onChange({ ...value, location: event.target.value })}
              disabled={readOnly}
              placeholder="Ví dụ: Hà Nội"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="district">
              Quận/Huyện
            </label>
            <input
              id="district"
              className="admin-input w-full"
              value={value.district}
              onChange={(event) => onChange({ ...value, district: event.target.value })}
              disabled={readOnly}
              placeholder="Ví dụ: Gia Lâm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="jobType">
              Loại hình
            </label>
            <select
              id="jobType"
              className="admin-select w-full"
              value={value.jobType}
              onChange={(event) => onChange({ ...value, jobType: event.target.value })}
              disabled={readOnly}
            >
              {JOB_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="experienceLevel">
              Kinh nghiệm
            </label>
            <select
              id="experienceLevel"
              className="admin-select w-full"
              value={value.experienceLevel}
              onChange={(event) => onChange({ ...value, experienceLevel: event.target.value })}
              disabled={readOnly}
            >
              {EXPERIENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="salaryMin">
              Lương tối thiểu (VND)
            </label>
            <input
              id="salaryMin"
              type="number"
              className="admin-input w-full"
              value={value.salaryMin}
              onChange={(event) => onChange({ ...value, salaryMin: event.target.value })}
              disabled={readOnly}
              placeholder="8000000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="salaryMax">
              Lương tối đa (VND)
            </label>
            <input
              id="salaryMax"
              type="number"
              className="admin-input w-full"
              value={value.salaryMax}
              onChange={(event) => onChange({ ...value, salaryMax: event.target.value })}
              disabled={readOnly}
              placeholder="12000000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="quantity">
              Số lượng
            </label>
            <input
              id="quantity"
              type="number"
              className="admin-input w-full"
              value={value.quantity}
              onChange={(event) => onChange({ ...value, quantity: Number(event.target.value || 1) })}
              disabled={readOnly}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="deadline">
              Hạn nộp
            </label>
            <input
              id="deadline"
              type="date"
              className="admin-input w-full"
              value={value.deadline}
              onChange={(event) => onChange({ ...value, deadline: event.target.value })}
              disabled={readOnly}
            />
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="tagsText">
              Tags (phân tách bằng dấu phẩy)
            </label>
            <input
              id="tagsText"
              className="admin-input w-full"
              value={value.tagsText}
              onChange={(event) => onChange({ ...value, tagsText: event.target.value })}
              disabled={readOnly}
              placeholder="QC, Checklist, Kho vận"
            />
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="description">
              Mô tả
            </label>
            <textarea
              id="description"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-ember-300 focus:outline-none focus:ring-4 focus:ring-ember-100"
              value={value.description}
              onChange={(event) => onChange({ ...value, description: event.target.value })}
              disabled={readOnly}
              placeholder="Mô tả công việc..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="requirementsText">
              Yêu cầu (mỗi dòng 1 ý)
            </label>
            <textarea
              id="requirementsText"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-ember-300 focus:outline-none focus:ring-4 focus:ring-ember-100"
              value={value.requirementsText}
              onChange={(event) => onChange({ ...value, requirementsText: event.target.value })}
              disabled={readOnly}
              placeholder={'Ví dụ:\n- Có kinh nghiệm QC\n- Cẩn thận, chăm chỉ'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="benefitsText">
              Quyền lợi (mỗi dòng 1 ý)
            </label>
            <textarea
              id="benefitsText"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-ember-300 focus:outline-none focus:ring-4 focus:ring-ember-100"
              value={value.benefitsText}
              onChange={(event) => onChange({ ...value, benefitsText: event.target.value })}
              disabled={readOnly}
              placeholder={'Ví dụ:\n- BHXH đầy đủ\n- Phụ cấp ca'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400" htmlFor="status">
              Trạng thái
            </label>
            <select
              id="status"
              className="admin-select w-full"
              value={value.status}
              onChange={(event) => onChange({ ...value, status: event.target.value })}
              disabled={readOnly}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <input
              id="urgent"
              type="checkbox"
              checked={Boolean(value.urgent)}
              onChange={(event) => onChange({ ...value, urgent: event.target.checked })}
              disabled={readOnly}
            />
            <label htmlFor="urgent" className="text-sm font-semibold text-slate-700">
              Tuyển gấp
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

function JobsPage() {
  const { data, error, loading, reload } = useAdminResource('jobs', INITIAL_DATA);
  const { data: companiesData } = useAdminResource('companies', INITIAL_DATA);
  const { data: categoriesData } = useAdminResource('categories', INITIAL_DATA);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState('create');
  const [editorReadOnly, setEditorReadOnly] = useState(false);
  const [editorValue, setEditorValue] = useState(EMPTY_JOB);
  const [editorError, setEditorError] = useState('');
  const [editorLoading, setEditorLoading] = useState(false);

  const jobs = data.items || [];
  const companies = companiesData.items || [];
  const categories = categoriesData.items || [];

  const filteredRows = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery = !query || [job.title, job.company, job.location].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || job.status === status;
      const matchesCategory = category === 'all' || job.category === category;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [category, jobs, query, status]);

  const openCreate = () => {
    setEditorMode('create');
    setEditorReadOnly(false);
    setEditorError('');
    setEditorValue({ ...EMPTY_JOB, companyId: companies[0]?.id || '' });
    setEditorOpen(true);
  };

  const openJob = async (row, { readOnly } = {}) => {
    if (!row?.id) {
      return;
    }

    setEditorLoading(true);
    setEditorError('');
    setEditorMode('edit');
    setEditorReadOnly(Boolean(readOnly));
    setEditorOpen(true);

    try {
      const payload = await adminRequest(`jobs/${row.id}`);
      setEditorValue({
        ...EMPTY_JOB,
        id: payload.id,
        companyId: payload.companyId || '',
        categoryId: payload.categoryId || '',
        title: payload.title || '',
        description: payload.description || '',
        requirementsText: Array.isArray(payload.requirements) ? payload.requirements.join('\n') : '',
        benefitsText: Array.isArray(payload.benefits) ? payload.benefits.join('\n') : '',
        salaryMin: payload.salaryMin ?? '',
        salaryMax: payload.salaryMax ?? '',
        currency: payload.currency || 'VND',
        location: payload.location || '',
        district: payload.district || '',
        jobType: payload.jobType || 'full-time',
        experienceLevel: payload.experienceLevel || 'none',
        quantity: payload.quantity || 1,
        deadline: toDateInputValue(payload.deadline),
        status: payload.status || 'draft',
        urgent: Boolean(payload.urgent),
        shift: payload.shift || '',
        tagsText: Array.isArray(payload.tags) ? payload.tags.join(', ') : ''
      });
    } catch (loadError) {
      setEditorError(loadError.message || 'Không thể tải chi tiết việc làm.');
    } finally {
      setEditorLoading(false);
    }
  };

  const closeEditor = () => {
    if (editorLoading) {
      return;
    }
    setEditorOpen(false);
    setEditorError('');
    setEditorReadOnly(false);
  };

  const submitEditor = async () => {
    setEditorLoading(true);
    setEditorError('');

    try {
      const payload = {
        companyId: editorValue.companyId,
        categoryId: editorValue.categoryId || undefined,
        title: editorValue.title,
        description: editorValue.description,
        requirements: parseLines(editorValue.requirementsText),
        benefits: parseLines(editorValue.benefitsText),
        salaryMin: editorValue.salaryMin === '' ? undefined : Number(editorValue.salaryMin),
        salaryMax: editorValue.salaryMax === '' ? undefined : Number(editorValue.salaryMax),
        currency: editorValue.currency || 'VND',
        location: editorValue.location,
        district: editorValue.district || undefined,
        jobType: editorValue.jobType,
        experienceLevel: editorValue.experienceLevel,
        quantity: Number(editorValue.quantity || 1),
        deadline: editorValue.deadline || undefined,
        status: editorValue.status,
        urgent: Boolean(editorValue.urgent),
        shift: editorValue.shift || undefined,
        tags: parseCommaList(editorValue.tagsText)
      };

      if (editorMode === 'create') {
        await adminRequest('jobs', { method: 'POST', body: payload });
      } else {
        await adminRequest(`jobs/${editorValue.id}`, { method: 'PATCH', body: payload });
      }

      setEditorOpen(false);
      reload();
    } catch (saveError) {
      setEditorError(saveError.message || 'Không thể lưu tin tuyển dụng.');
    } finally {
      setEditorLoading(false);
    }
  };

  const toggleJobStatus = async (row) => {
    if (!row?.id) {
      return;
    }

    const current = String(row.status || '').toLowerCase();
    const next = current === 'published' ? 'closed' : 'published';

    try {
      await adminRequest(`jobs/${row.id}/status`, { method: 'PATCH', body: { status: next } });
      reload();
    } catch (_error) {
      // ignore
    }
  };

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
    {
      key: 'actions',
      header: 'Thao tác',
      render: (row) => (
        <RowActions
          row={row}
          primaryLabel="Mở"
          secondaryLabel="Sửa"
          dangerLabel={String(row.status || '').toLowerCase() === 'published' ? 'Tạm dừng' : 'Đăng'}
          onPrimary={(item) => openJob(item, { readOnly: true })}
          onSecondary={(item) => openJob(item, { readOnly: false })}
          onDanger={toggleJobStatus}
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quản lý việc làm"
        title="Tin tuyển dụng"
        description="Tạo và cập nhật tin tuyển dụng, chuyển trạng thái hiển thị, và kiểm tra chất lượng trước khi xuất hiện ngoài trang public."
        actions={
          <>
            <button type="button" className="admin-btn-secondary" onClick={reload}>
              Làm mới
            </button>
            <button type="button" className="admin-btn-primary" onClick={openCreate}>
              Đăng tuyển
            </button>
          </>
        }
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
                options: [{ value: 'all', label: 'Tất cả trạng thái' }, ...STATUS_OPTIONS]
              },
              {
                id: 'category',
                value: category,
                onChange: setCategory,
                options: [{ value: 'all', label: 'Tất cả danh mục' }, ...Array.from(new Set(jobs.map((job) => job.category))).map((item) => ({ value: item, label: item }))]
              }
            ]}
          />

          <DataTable columns={columns} rows={filteredRows} emptyMessage="Không có tin tuyển dụng phù hợp với bộ lọc hiện tại." />
        </>
      ) : null}

      <JobEditorModal
        open={editorOpen}
        mode={editorMode}
        readOnly={editorReadOnly}
        value={editorValue}
        companies={companies}
        categories={categories}
        loading={editorLoading}
        error={editorError}
        onChange={setEditorValue}
        onClose={closeEditor}
        onSubmit={submitEditor}
      />
    </div>
  );
}

export default JobsPage;

