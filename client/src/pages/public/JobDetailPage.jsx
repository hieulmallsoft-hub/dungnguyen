import '../../App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../data/apiBase';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  cvFile: null,
  message: ''
};

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function JobDetailPage() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const applyRef = useRef(null);
  const fileInputRef = useRef(null);

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [applyForm, setApplyForm] = useState(EMPTY_FORM);
  const [applying, setApplying] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState({ type: '', message: '' });

  const canonicalSlug = useMemo(() => {
    if (!job?.title) return '';
    return slugify(job.title);
  }, [job?.title]);

  useEffect(() => {
    if (!job?.title) return;
    document.title = `${job.title} | SHG Investment`;

    if (canonicalSlug && slug !== canonicalSlug) {
      navigate(`/viec-lam/${canonicalSlug}/${job.id}`, { replace: true });
    }
  }, [canonicalSlug, job?.id, job?.title, navigate, slug]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const fetchJob = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiUrl(`/api/jobs/${id}`), { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Không thể tải tin tuyển dụng.');
        }

        if (active) {
          setJob(payload.job || payload);
          setRelatedJobs(payload.relatedJobs || []);
        }
      } catch (fetchError) {
        if (active && fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Không thể tải tin tuyển dụng.');
        }
      } finally {
        if (active && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchJob();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  const scrollToApply = () => {
    applyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleApplyField = (field, value) => {
    setApplyForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!job) return;

    setApplying(true);
    setApplyFeedback({ type: '', message: '' });

    try {
      const formData = new FormData();
      formData.append('jobId', job.id);
      formData.append('fullName', applyForm.fullName);
      formData.append('email', applyForm.email);
      formData.append('phone', applyForm.phone);
      formData.append('message', applyForm.message);
      if (applyForm.cvFile) {
        formData.append('cvFile', applyForm.cvFile);
      }

      const response = await fetch(apiUrl('/api/applications'), {
        method: 'POST',
        body: formData
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || 'Ứng tuyển thất bại.');
      }

      setApplyForm(EMPTY_FORM);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setApplyFeedback({ type: 'success', message: payload?.message || 'Ứng tuyển thành công.' });
    } catch (submitError) {
      setApplyFeedback({
        type: 'error',
        message: submitError.message || 'Không thể gửi hồ sơ. Vui lòng thử lại.'
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="public-home state-screen">
        <div className="state-card">
          <h1>Đang tải tin tuyển dụng...</h1>
          <p>Vui lòng chờ trong giây lát.</p>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="public-home state-screen">
        <div className="state-card">
          <h1>Không thể tải tin tuyển dụng</h1>
          <p>{error || 'Vui lòng thử lại sau.'}</p>
          <div style={{ marginTop: 14 }}>
            <Link className="btn btn-primary" to="/viec-lam">
              Quay lại danh sách việc làm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="public-home site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" to="/" aria-label="SHG Investment">
            <img className="brand-logo" src="/logo-shg.jpg" alt="SHG Investment" />
          </Link>
          <nav className="top-nav">
            <Link to="/viec-lam">Việc làm</Link>
            <Link to="/cv-mau">CV mẫu</Link>
            <Link to="/tin-tuc">Tin tức</Link>
          </nav>
          <div className="top-actions">
            <a href="tel:0812533533" className="chip">
              Hotline 0812 533 533
            </a>
            <button type="button" className="btn btn-primary" onClick={scrollToApply}>
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="job-detail-hero">
          <div className="container section-shell-wide">
            <div className="job-detail-breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link to="/viec-lam">Việc làm</Link>
              <span aria-hidden="true">/</span>
              <span className="current">{job.title}</span>
            </div>

            <div className="job-detail-head">
              <div className="job-detail-title">
                {job.urgent ? <span className="badge badge-alert">Tuyển gấp</span> : null}
                <h1>{job.title}</h1>
                <p>
                  <strong>{job.company}</strong>
                  {job.location ? <span> • {job.location}</span> : null}
                  {job.district ? <span> • {job.district}</span> : null}
                </p>
              </div>

              <div className="job-detail-cta">
                <div className="job-detail-salary">{job.salaryLabel || 'Thương lượng'}</div>
                <button type="button" className="btn btn-primary" onClick={scrollToApply}>
                  Ứng tuyển
                </button>
                <a className="btn btn-secondary" href="/viec-lam">
                  Xem việc khác
                </a>
              </div>
            </div>

            <div className="job-detail-highlights">
              <div className="job-highlight">
                <span>Mức lương</span>
                <strong>{job.salaryLabel || 'Thương lượng'}</strong>
              </div>
              <div className="job-highlight">
                <span>Kinh nghiệm</span>
                <strong>{job.experienceLabel || '-'}</strong>
                <small>{job.typeLabel || '-'}</small>
              </div>
              <div className="job-highlight">
                <span>Địa điểm</span>
                <strong>{job.location || '-'}</strong>
                <small>{job.district || ''}</small>
              </div>
              <div className="job-highlight">
                <span>Hạn nộp</span>
                <strong>{job.deadline ? formatDate(job.deadline) : 'Không giới hạn'}</strong>
                <small>Đăng từ {formatDate(job.postedAt)}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="container section-shell-wide job-detail-grid">
          <div className="job-detail-main">
            <article className="job-detail-card">
              <h3>Mô tả công việc</h3>
              <p>{job.summary || 'Thông tin mô tả sẽ được cập nhật sớm.'}</p>
            </article>

            <article className="job-detail-card">
              <h3>Yêu cầu</h3>
              {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
                <ul>
                  {job.requirements.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Chưa có yêu cầu chi tiết.</p>
              )}
            </article>

            <article className="job-detail-card">
              <h3>Quyền lợi</h3>
              {Array.isArray(job.benefits) && job.benefits.length > 0 ? (
                <ul>
                  {job.benefits.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Chưa có quyền lợi chi tiết.</p>
              )}
            </article>

            {Array.isArray(job.tags) && job.tags.length > 0 ? (
              <article className="job-detail-card">
                <h3>Tags</h3>
                <div className="job-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ) : null}

            <div ref={applyRef} className="job-detail-apply">
              <form className="apply-form" onSubmit={handleSubmit}>
                <h4>Ứng tuyển nhanh</h4>
                <p>Điền thông tin cơ bản, đính kèm CV và gửi hồ sơ trực tiếp cho nhà tuyển dụng.</p>

                <label>
                  Họ và tên
                  <input
                    className="admin-input"
                    value={applyForm.fullName}
                    onChange={(e) => handleApplyField('fullName', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    className="admin-input"
                    type="email"
                    value={applyForm.email}
                    onChange={(e) => handleApplyField('email', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Số điện thoại
                  <input
                    className="admin-input"
                    value={applyForm.phone}
                    onChange={(e) => handleApplyField('phone', e.target.value)}
                    required
                  />
                </label>
                <label className="hidden">
                  CV (PDF/DOC)
                  <input
                    ref={fileInputRef}
                    className="admin-input"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleApplyField('cvFile', e.target.files?.[0] || null)}
                  />
                </label>
                <label>
                  Lời nhắn
                  <textarea
                    className="admin-input"
                    rows={4}
                    value={applyForm.message}
                    onChange={(e) => handleApplyField('message', e.target.value)}
                    placeholder="Điểm mạnh của bạn, thời gian có thể đi làm, hoặc câu hỏi cho nhà tuyển dụng..."
                  />
                </label>

                <button className="btn btn-primary" type="submit" disabled={applying}>
                  {applying ? 'Đang gửi...' : 'Gửi hồ sơ'}
                </button>

                {applyFeedback.message ? (
                  <div className={`apply-feedback ${applyFeedback.type}`}>{applyFeedback.message}</div>
                ) : null}
              </form>
            </div>
          </div>

          <aside className="job-detail-side">
            <div className="job-detail-card is-sticky">
              <h3>Thông tin nhanh</h3>
              <div className="job-detail-kv">
                <span>Công ty</span>
                <strong>{job.company}</strong>
              </div>
              <div className="job-detail-kv">
                <span>Hình thức</span>
                <strong>{job.typeLabel || '-'}</strong>
              </div>
              <div className="job-detail-kv">
                <span>Kinh nghiệm</span>
                <strong>{job.experienceLabel || '-'}</strong>
              </div>
              <div className="job-detail-kv">
                <span>Ca làm</span>
                <strong>{job.shift || 'Linh hoạt'}</strong>
              </div>
              <div className="job-detail-kv">
                <span>Đăng tuyển</span>
                <strong>{formatDate(job.postedAt)}</strong>
              </div>

              <div className="job-detail-side-actions">
                <button type="button" className="btn btn-primary" onClick={scrollToApply}>
                  Ứng tuyển ngay
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    const shareUrl = window.location.href;
                    navigator.clipboard?.writeText(shareUrl);
                    setApplyFeedback({ type: 'success', message: 'Đã copy link tin tuyển dụng.' });
                  }}
                >
                  Copy link
                </button>
              </div>
            </div>

            {relatedJobs.length > 0 ? (
              <div className="job-detail-card">
                <h3>Việc làm liên quan</h3>
                <div className="job-related-list">
                  {relatedJobs.map((item) => (
                    <Link key={item.id} className="job-related-item" to={`/viec-lam/${slugify(item.title)}/${item.id}`}>
                      <strong>{item.title}</strong>
                      <span>{item.company}</span>
                      <small>
                        {item.location}
                        {item.district ? ` • ${item.district}` : ''} • {item.salaryLabel}
                      </small>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default JobDetailPage;
