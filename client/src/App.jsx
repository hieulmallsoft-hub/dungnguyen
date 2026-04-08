import { useEffect, useMemo, useState } from 'react';

function SectionHeader({ icon, title, description }) {
  return (
    <div className="section-header">
      <div className="section-title-wrap">
        <img src={icon} alt="section icon" className="section-icon" />
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    keyword: '',
    location: '',
    type: ''
  });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchHomeData = async () => {
      try {
        const response = await fetch('/api/home-data');
        const data = await response.json();
        if (isMounted) {
          setHomeData(data);
        }
      } catch (_error) {
        if (isMounted) {
          setNotice('Không thể tải dữ liệu. Vui lòng kiểm tra API server.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!homeData?.heroBanners?.length) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % homeData.heroBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [homeData]);

  const currentBanner = useMemo(() => {
    if (!homeData?.heroBanners?.length) {
      return null;
    }
    return homeData.heroBanners[activeSlide];
  }, [homeData, activeSlide]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const keyword = formData.keyword || '\u0074\u1ea5t c\u1ea3';
    const location = formData.location || '\u0074o\u00e0n qu\u1ed1c';
    setNotice('\u0110\u00e3 nh\u1eadn y\u00eau c\u1ea7u t\u00ecm vi\u1ec7c: ' + keyword + ' - ' + location + '.');
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-card">
          <h1>Việc 3 Miền</h1>
          <p>Đang tải giao diện trang chủ...</p>
        </div>
      </main>
    );
  }

  if (!homeData) {
    return (
      <main className="loading-screen">
        <div className="loading-card">
          <h1>Không có dữ liệu</h1>
          <p>Vui lòng bật server Node.js tại cổng 5050.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="page">
      <div className="bg-shape bg-shape-1" />
      <div className="bg-shape bg-shape-2" />
      <header className="site-header animate-fade-up">
        <div className="container">
          <div className="header-shell">
            <a href="/" className="brand" aria-label="Trang chu SHG">
              <img
                className="brand-logo"
                src="/logo-shg.svg"
                alt="SHG"
              />
            </a>

            <nav className="main-nav">
              {homeData.nav.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header-actions">
              <a className="hotline" href="tel:0812533533">
                Hotline: {homeData.brand.hotline}
              </a>
              <a className="btn-outline" href="/candidate-profile">
                {'\u0110\u0103ng nh\u1eadp'}
              </a>
              <a className="btn-header-primary" href="/candidate-profile">
                {'\u0110\u0103ng k\u00fd'}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section animate-fade-up">
          <div className="hero-banner">
            {currentBanner && (
              <picture className="hero-banner-media">
                <source media="(max-width: 767px)" srcSet={currentBanner.imageMobile} />
                <img src={currentBanner.imageDesktop} alt={currentBanner.title} />
              </picture>
            )}

            <div className="hero-banner-overlay" />

            <div className="container hero-banner-content">
              <div className="hero-search-panel">
                <p className="hero-kicker">{'\u0043\u00f9ng t\u00ecm ki\u1ebfm'}</p>
                <h1>{'\u0043\u00f4ng vi\u1ec7c m\u01a1 \u01b0\u1edbc c\u1ee7a b\u1ea1n'}</h1>

                <form className="hero-search-form" onSubmit={handleSearchSubmit}>
                  <div className="hero-search-row hero-search-row-main">
                    <input
                      type="text"
                      placeholder={"\u0054\u00ecm ki\u1ebfm vi\u1ec7c l\u00e0m"}
                      value={formData.keyword}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          keyword: event.target.value
                        }))
                      }
                    />
                    <button type="submit">{"\u0054\u00ecm ki\u1ebfm"}</button>
                  </div>

                  <div className="hero-search-row hero-search-row-sub">
                    <input
                      type="text"
                      placeholder={"\u0054\u1ea5t c\u1ea3 t\u1ec9nh th\u00e0nh"}
                      value={formData.location}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: event.target.value
                        }))
                      }
                    />

                    <select
                      value={formData.type}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          type: event.target.value
                        }))
                      }
                    >
                      <option value="">{"\u0054\u1ea5t c\u1ea3 m\u1ee9c l\u01b0\u01a1ng"}</option>
                      <option value="10-15">{"10 - 15 tri\u1ec7u"}</option>
                      <option value="15-20">{"15 - 20 tri\u1ec7u"}</option>
                      <option value="20+">{"Tr\u00ean 20 tri\u1ec7u"}</option>
                    </select>
                  </div>
                </form>

                {notice && <p className="hero-search-notice">{notice}</p>}
              </div>
            </div>

            <div className="slider-dots slider-dots-hero">
              {homeData.heroBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  className={index === activeSlide ? 'active' : ''}
                  onClick={() => setActiveSlide(index)}
                  aria-label={"Xem banner " + (index + 1)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="hero-metrics-section animate-fade-up">
          <div className="container">
            <div className="stats-grid stats-grid-hero">
              {homeData.quickStats.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block animate-fade-up">
          <div className="container">
            <SectionHeader
              icon="https://viec3mien.vn/assets/icons/company-rounded.svg"
              title="Việc Làm Nổi Bật"
              description="Danh sách vị trí được quan tâm nhiều nhất hôm nay."
            />

            <div className="job-grid">
              {homeData.featuredJobs.map((job, index) => (
                <article key={job.id} className="job-card" style={{ animationDelay: `${index * 70}ms` }}>
                  <h3>{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <ul>
                    <li>{job.location}</li>
                    <li>{job.salary}</li>
                  </ul>
                  <div className="job-tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href="/viec-lam-chi-tiet" className="text-link">
                    Xem chi tiết
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-company animate-fade-up">
          <div className="container">
            <SectionHeader
              icon="https://viec3mien.vn/assets/icons/company-rounded.svg"
              title="Doanh Nghiệp Nổi Bật"
              description="Đối tác đang có nhu cầu tuyển dụng liên tục theo tháng."
            />

            <div className="company-grid">
              {homeData.topCompanies.map((company, index) => (
                <article
                  key={company.id}
                  className="company-card"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {company.official && <span className="official-tag">Official</span>}
                  <img src={company.logo} alt={company.name} className="company-logo" />
                  <h3>{company.name}</h3>
                  <p>{company.field}</p>
                  <p>{company.location}</p>
                  <strong>{company.openJobs} vị trí đang tuyển</strong>
                  <a href="/company" className="text-link">
                    Xem doanh nghiệp
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block animate-fade-up">
          <div className="container">
            <SectionHeader
              icon="https://viec3mien.vn/assets/icons/news-rounded.svg"
              title="Dịch Vụ"
              description="Giải pháp tuyển dụng và tư vấn chuyên sâu cho doanh nghiệp sản xuất."
            />

            <div className="service-grid">
              {homeData.services.map((service, index) => (
                <article
                  key={service.id}
                  className="service-card"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <img src={service.image} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-news animate-fade-up">
          <div className="container">
            <SectionHeader
              icon="https://viec3mien.vn/assets/icons/news-rounded.svg"
              title="Tin Tức Tuyển Dụng"
              description="Cập nhật nhanh xu hướng thị trường lao động và chính sách mới."
            />

            <div className="news-grid">
              <article className="news-main-card">
                <img src={homeData.news[0].image} alt={homeData.news[0].title} />
                <div className="news-content">
                  <span>{homeData.news[0].date}</span>
                  <h3>{homeData.news[0].title}</h3>
                  <p>{homeData.news[0].description}</p>
                  <a href={homeData.news[0].href} className="text-link">
                    Đọc bài viết
                  </a>
                </div>
              </article>

              <div className="news-list">
                {homeData.news.slice(1).map((item) => (
                  <article key={item.id} className="news-sub-card">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <span>{item.date}</span>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <a href={item.href} className="text-link">
                        Xem thêm
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="download-section animate-fade-up">
          <div className="container download-grid">
            <div>
              <h2>Tải App Việc 3 Miền</h2>
              <p>
                Theo dõi việc làm mới theo thời gian thực, nhận thông báo phỏng vấn và quản lý hồ sơ ứng tuyển ngay trên
                điện thoại.
              </p>
              <div className="download-actions">
                <a href={homeData.appLinks.ios} className="btn-primary">
                  App Store
                </a>
                <a href={homeData.appLinks.android} className="btn-ghost">
                  Google Play
                </a>
              </div>
            </div>
            <a href={homeData.appLinks.download} className="qr-box">
              <span>QR Download</span>
              <strong>download-app.viec3mien.vn</strong>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>{homeData.brand.name}</h3>
            <p>GTV Investment Consultancy Joint Stock Company</p>
            <p>Hotline: {homeData.brand.hotline}</p>
          </div>

          <div>
            <h4>Kết nối</h4>
            <div className="social-list">
              {homeData.brand.socialLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
