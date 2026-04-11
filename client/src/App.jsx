import { useEffect, useMemo, useState } from 'react';

const EMPTY_FILTERS = {
  keyword: '',
  location: '',
  type: '',
  experience: '',
  salaryMin: ''
};

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  cvLink: '',
  message: ''
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Moi nhat' },
  { value: 'salary_desc', label: 'Luong cao truoc' },
  { value: 'salary_asc', label: 'Luong thap truoc' }
];

const SAVED_JOBS_KEY = 'viec3mien_saved_jobs';

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

function getInitials(name) {
  const words = String(name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2);

  if (!words.length) {
    return 'V3';
  }

  return words.map((word) => word[0]?.toUpperCase() || '').join('');
}

function Header({ homeData }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="brand" href="#">
          <span className="brand-mark">V3M</span>
          <div>
            <strong>{homeData.brand.name}</strong>
            <p>{homeData.brand.subtitle}</p>
          </div>
        </a>

        <nav className="top-nav">
          {homeData.nav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="top-actions">
          <a href={`tel:${homeData.brand.hotline.replace(/\s+/g, '')}`} className="chip">
            Hotline {homeData.brand.hotline}
          </a>
          <a href="#jobs" className="btn btn-primary">
            Tim viec ngay
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ homeData, activeBanner, onChangeBanner }) {
  const banner = homeData.heroBanners[activeBanner] ?? homeData.heroBanners[0];

  return (
    <section className="hero">
      <div className="hero-media">
        <picture>
          <source media="(max-width: 768px)" srcSet={banner.imageMobile} />
          <img src={banner.imageDesktop} alt={banner.title} />
        </picture>
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <p className="hero-kicker">Recruitment Platform</p>
        <h1>{banner.title}</h1>
        <p className="hero-description">{banner.description}</p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={banner.ctaPrimary.href}>
            {banner.ctaPrimary.label}
          </a>
          <a className="btn btn-secondary" href={banner.ctaSecondary.href}>
            {banner.ctaSecondary.label}
          </a>
        </div>

        <div className="hero-dots" aria-label="Hero slides">
          {homeData.heroBanners.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeBanner ? 'active' : ''}
              onClick={() => onChangeBanner(index)}
              aria-label={`Chuyen banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container metrics-grid">
        {homeData.quickStats.map((item) => (
          <article key={item.label} className="metric-card">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const [jobsPayload, setJobsPayload] = useState({
    items: [],
    total: 0,
    page: 1,
    pageSize: 6,
    totalPages: 1,
    filters: {
      locations: [],
      types: [],
      experienceLevels: [],
      salaryOptions: []
    }
  });
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_JOBS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  });

  const [activeBanner, setActiveBanner] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState(EMPTY_FORM);
  const [applying, setApplying] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    let active = true;

    const fetchHomeData = async () => {
      setLoading(true);
      setLoadingError('');

      try {
        const response = await fetch('/api/home-data');
        if (!response.ok) {
          throw new Error('Cannot load home data');
        }

        const data = await response.json();
        if (!active) {
          return;
        }

        setHomeData(data);
      } catch (_error) {
        if (active) {
          setLoadingError('Khong the tai du lieu trang. Vui long kiem tra server API.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchHomeData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!homeData?.heroBanners?.length) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveBanner((previous) => (previous + 1) % homeData.heroBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [homeData]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobs = async () => {
      setJobsLoading(true);
      setJobsError('');

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: '6',
          sort
        });

        Object.entries(appliedFilters).forEach(([key, value]) => {
          if (value) {
            params.set(key, value);
          }
        });

        const response = await fetch(`/api/jobs?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Cannot load jobs');
        }

        const data = await response.json();
        setJobsPayload(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setJobsError('Khong the tai danh sach viec lam.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setJobsLoading(false);
        }
      }
    };

    fetchJobs();

    return () => controller.abort();
  }, [appliedFilters, page, sort]);

  useEffect(() => {
    window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    if (!selectedJob) {
      return undefined;
    }

    document.body.classList.add('modal-open');

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedJob(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedJob]);

  const savedJobList = useMemo(() => {
    if (!homeData?.jobs?.length) {
      return [];
    }

    const lookup = new Map(homeData.jobs.map((job) => [job.id, job]));
    return savedJobs.map((id) => lookup.get(id)).filter(Boolean);
  }, [homeData, savedJobs]);

  const totalVisible = jobsPayload.items.length;

  const handleFilterChange = (field, value) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setSort('newest');
    setPage(1);
  };

  const toggleSavedJob = (jobId) => {
    setSavedJobs((previous) => {
      if (previous.includes(jobId)) {
        return previous.filter((id) => id !== jobId);
      }
      return [jobId, ...previous];
    });
  };

  const openJobModal = (job) => {
    setSelectedJob(job);
    setApplyForm(EMPTY_FORM);
    setApplyFeedback({ type: '', message: '' });
  };

  const closeJobModal = () => {
    setSelectedJob(null);
  };

  const handleSubmitApplication = async (event) => {
    event.preventDefault();

    if (!selectedJob) {
      return;
    }

    setApplying(true);
    setApplyFeedback({ type: '', message: '' });

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...applyForm,
          jobId: selectedJob.id
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || 'Ung tuyen that bai.');
      }

      setApplyForm(EMPTY_FORM);
      setApplyFeedback({
        type: 'success',
        message: payload.message || 'Ung tuyen thanh cong.'
      });
    } catch (error) {
      setApplyFeedback({
        type: 'error',
        message: error.message || 'Khong the gui ho so. Vui long thu lai.'
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <h1>Viec 3 Mien</h1>
          <p>Dang tai nen tang tuyen dung...</p>
        </div>
      </main>
    );
  }

  if (loadingError || !homeData) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <h1>Khong the tai du lieu</h1>
          <p>{loadingError || 'Vui long kiem tra backend API.'}</p>
        </div>
      </main>
    );
  }

  return (
    <div className="site-shell">
      <Header homeData={homeData} />
      <Hero homeData={homeData} activeBanner={activeBanner} onChangeBanner={setActiveBanner} />

      <main>
        <section className="job-explorer" id="jobs">
          <div className="container">
            <div className="section-heading">
              <p>Job Explorer</p>
              <h2>Tim viec phu hop theo bo loc chuyen sau</h2>
              <span>
                Dang hien thi {totalVisible}/{jobsPayload.total} vi tri
              </span>
            </div>

            <form className="filter-panel" onSubmit={handleApplyFilters}>
              <div className="field-group field-keyword">
                <label htmlFor="keyword">Tu khoa</label>
                <input
                  id="keyword"
                  type="text"
                  placeholder="Vi du: kho van, QA, HSE..."
                  value={filters.keyword}
                  onChange={(event) => handleFilterChange('keyword', event.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="location">Khu vuc</label>
                <select
                  id="location"
                  value={filters.location}
                  onChange={(event) => handleFilterChange('location', event.target.value)}
                >
                  <option value="">Tat ca khu vuc</option>
                  {jobsPayload.filters.locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="type">Loai hinh</label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(event) => handleFilterChange('type', event.target.value)}
                >
                  <option value="">Tat ca loai hinh</option>
                  {jobsPayload.filters.types.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="experience">Kinh nghiem</label>
                <select
                  id="experience"
                  value={filters.experience}
                  onChange={(event) => handleFilterChange('experience', event.target.value)}
                >
                  <option value="">Tat ca muc kinh nghiem</option>
                  {jobsPayload.filters.experienceLevels.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="salaryMin">Muc luong</label>
                <select
                  id="salaryMin"
                  value={filters.salaryMin}
                  onChange={(event) => handleFilterChange('salaryMin', event.target.value)}
                >
                  <option value="">Tat ca muc luong</option>
                  {jobsPayload.filters.salaryOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="sort">Sap xep</label>
                <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-actions">
                <button className="btn btn-primary" type="submit">
                  Ap dung bo loc
                </button>
                <button className="btn btn-ghost" type="button" onClick={handleResetFilters}>
                  Dat lai
                </button>
              </div>
            </form>

            <div className="jobs-layout">
              <div className="jobs-column">
                {jobsError && <p className="jobs-message error">{jobsError}</p>}
                {jobsLoading && <p className="jobs-message">Dang tai danh sach viec lam...</p>}

                {!jobsLoading && !jobsError && jobsPayload.items.length === 0 && (
                  <p className="jobs-message">Khong tim thay viec lam phu hop bo loc hien tai.</p>
                )}

                <div className="job-grid">
                  {jobsPayload.items.map((job) => {
                    const isSaved = savedJobs.includes(job.id);

                    return (
                      <article key={job.id} className="job-card">
                        <div className="job-head">
                          <div>
                            {job.urgent && <span className="badge badge-alert">Tuyen gap</span>}
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                          </div>
                          <button
                            type="button"
                            className={`icon-btn ${isSaved ? 'saved' : ''}`}
                            onClick={() => toggleSavedJob(job.id)}
                            aria-label={isSaved ? 'Bo luu tin' : 'Luu tin'}
                          >
                            {isSaved ? 'Saved' : 'Save'}
                          </button>
                        </div>

                        <ul className="job-meta">
                          <li>{job.location}</li>
                          <li>{job.district}</li>
                          <li>{job.salaryLabel}</li>
                          <li>{job.typeLabel}</li>
                          <li>{job.experienceLabel}</li>
                        </ul>

                        <p className="job-summary">{job.summary}</p>

                        <div className="job-tags">
                          {job.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>

                        <div className="job-footer">
                          <div>
                            <small>Dang tuyen tu {formatDate(job.postedAt)}</small>
                            <strong>Han nop {formatDate(job.deadline)}</strong>
                          </div>
                          <button type="button" className="btn btn-secondary" onClick={() => openJobModal(job)}>
                            Xem chi tiet
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="pagination">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={jobsPayload.page <= 1 || jobsLoading}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  >
                    Trang truoc
                  </button>
                  <span>
                    Trang {jobsPayload.page}/{jobsPayload.totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={jobsPayload.page >= jobsPayload.totalPages || jobsLoading}
                    onClick={() => setPage((value) => Math.min(jobsPayload.totalPages, value + 1))}
                  >
                    Trang sau
                  </button>
                </div>
              </div>

              <aside className="sidebar-column">
                <div className="panel">
                  <h3>Tin da luu ({savedJobList.length})</h3>
                  {savedJobList.length === 0 && <p>Ban chua luu tin nao. Bam Save de danh dau viec quan tam.</p>}
                  {savedJobList.slice(0, 4).map((job) => (
                    <button key={job.id} type="button" className="saved-job" onClick={() => openJobModal(job)}>
                      <strong>{job.title}</strong>
                      <span>
                        {job.company} - {job.location}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="panel" id="companies">
                  <h3>Doanh nghiep noi bat</h3>
                  {homeData.topCompanies.map((company) => (
                    <article key={company.id} className="company-item">
                      <div className="logo-fallback">{getInitials(company.name)}</div>
                      <div>
                        <strong>{company.name}</strong>
                        <p>
                          {company.field} | {company.location}
                        </p>
                        <small>{company.openJobs} vi tri dang tuyen</small>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="panel quote-panel">
                  <h3>Phan hoi tu doi tac</h3>
                  {homeData.testimonials.map((item) => (
                    <blockquote key={item.id}>
                      <p>{item.quote}</p>
                      <cite>{item.author}</cite>
                    </blockquote>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="journey" id="journey">
          <div className="container">
            <div className="section-heading">
              <p>Candidate Journey</p>
              <h2>Quy trinh ung tuyen minh bach va nhanh gon</h2>
            </div>
            <div className="journey-grid">
              {homeData.talentJourney.map((step, index) => (
                <article key={step.id} className="journey-card">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <div className="section-heading">
              <p>Employer Solutions</p>
              <h2>Dich vu tuyen dung cho doanh nghiep</h2>
            </div>
            <div className="service-grid">
              {homeData.services.map((service) => (
                <article key={service.id} className="service-card">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>{homeData.brand.name}</h3>
            <p>{homeData.brand.subtitle}</p>
            <p>
              Hotline: {homeData.brand.hotline} | Email: {homeData.brand.email}
            </p>
          </div>
          <div>
            <h4>Ket noi</h4>
            <div className="social-links">
              {homeData.brand.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {selectedJob && (
        <div className="job-modal-overlay" onClick={closeJobModal} role="presentation">
          <section
            className="job-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Job detail"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeJobModal} aria-label="Dong">
              x
            </button>

            <div className="job-modal-header">
              <span className="badge">{selectedJob.typeLabel}</span>
              <h3>{selectedJob.title}</h3>
              <p>
                {selectedJob.company} | {selectedJob.location} - {selectedJob.district}
              </p>
              <strong>{selectedJob.salaryLabel}</strong>
            </div>

            <div className="job-modal-grid">
              <div className="job-modal-content">
                <article>
                  <h4>Mo ta cong viec</h4>
                  <p>{selectedJob.summary}</p>
                </article>

                <article>
                  <h4>Yeu cau</h4>
                  <ul>
                    {selectedJob.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h4>Quyen loi</h4>
                  <ul>
                    {selectedJob.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <form id="quick-apply" className="apply-form" onSubmit={handleSubmitApplication}>
                <h4>Ung tuyen nhanh</h4>
                <p>Nhap thong tin de gui ho so den bo phan tuyen dung.</p>

                <label htmlFor="fullName">Ho va ten *</label>
                <input
                  id="fullName"
                  type="text"
                  value={applyForm.fullName}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  required
                />

                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={applyForm.email}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />

                <label htmlFor="phone">So dien thoai *</label>
                <input
                  id="phone"
                  type="tel"
                  value={applyForm.phone}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                />

                <label htmlFor="cvLink">Link CV</label>
                <input
                  id="cvLink"
                  type="url"
                  placeholder="https://"
                  value={applyForm.cvLink}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, cvLink: event.target.value }))}
                />

                <label htmlFor="message">Ghi chu them</label>
                <textarea
                  id="message"
                  rows="4"
                  value={applyForm.message}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, message: event.target.value }))}
                />

                <button type="submit" className="btn btn-primary" disabled={applying}>
                  {applying ? 'Dang gui...' : 'Gui ho so'}
                </button>

                {applyFeedback.message && (
                  <p className={`apply-feedback ${applyFeedback.type}`}>{applyFeedback.message}</p>
                )}
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
