import '../../App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { apiUrl } from '../../data/apiBase';

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
  cvFile: null,
  message: ''
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'salary_desc', label: 'Lương cao trước' },
  { value: 'salary_asc', label: 'Lương thấp trước' }
];

const SAVED_JOBS_KEY = 'shginvestment_saved_jobs';
const CV_DRAFTS_KEY = 'shginvestment_cv_drafts';
const CV_FILTER_ORDER = ['Tất cả', 'Đơn giản', 'Chuyên nghiệp', 'Hiện đại', 'Ấn tượng', 'Harvard', 'ATS'];
const FILTER_LABELS = {
  keyword: 'Từ khóa',
  location: 'Khu vực',
  type: 'Loại hình',
  experience: 'Kinh nghiệm',
  salaryMin: 'Mức lương',
  sort: 'Sắp xếp'
};
const HERO_SUPPORT_ITEMS = [
  {
    title: 'Tìm nhanh trong vài giây',
    description: 'Nhập chức danh, chọn khu vực và xem ngay các việc phù hợp.'
  },
  {
    title: 'Đọc tin việc rõ ràng',
    description: 'Lương, địa điểm và yêu cầu được đưa lên trước để bạn dễ so sánh.'
  },
  {
    title: 'Lưu lại để quyết định sau',
    description: 'Đánh dấu tin hay và quay lại bất cứ lúc nào khi bạn cần.'
  }
];

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

function getOptionLabel(options, value, fallback = value) {
  if (!value) {
    return '';
  }

  return options.find((option) => String(option.value) === String(value))?.label || fallback;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifyFilePart(value, fallback = 'cv') {
  const normalized = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return normalized || fallback;
}

function buildCvDocumentMarkup(template, draft, options = {}) {
  const { autoPrint = false } = options;
  const metaItems = draft.meta.filter(Boolean);
  const statItems = draft.stats.filter((item) => item?.label || item?.value);
  const experienceItems = draft.experience.filter(Boolean);
  const skillItems = draft.skills.filter(Boolean);
  const recommendedItems = template.recommendedFor || [];

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(draft.fullName || template.name)} - CV</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

      :root {
        --accent: ${template.accent};
        --soft: ${template.softTone};
        --ink: #1f2937;
        --muted: #5f6b77;
        --border: rgba(15, 23, 42, 0.08);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: 'Manrope', Arial, Helvetica, sans-serif;
        color: var(--ink);
        background: linear-gradient(180deg, #f8fafc 0%, #eef2f6 100%);
        padding: 24px;
      }

      .sheet {
        width: min(920px, 100%);
        margin: 0 auto;
        background: #ffffff;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
        border: 1px solid var(--border);
      }

      .hero {
        padding: 28px 32px 22px;
        background: linear-gradient(135deg, var(--soft), #ffffff);
        border-bottom: 1px solid var(--border);
      }

      .hero-top {
        display: flex;
        gap: 18px;
        align-items: center;
      }

      .avatar {
        width: 78px;
        height: 78px;
        border-radius: 22px;
        display: grid;
        place-items: center;
        font-size: 28px;
        font-weight: 700;
        color: #ffffff;
        background: linear-gradient(135deg, var(--accent), var(--accent));
        font-family: 'Space Grotesk', Arial, Helvetica, sans-serif;
      }

      h1 {
        margin: 0;
        font-size: 38px;
        line-height: 1.05;
        font-family: 'Space Grotesk', Arial, Helvetica, sans-serif;
      }

      .title {
        margin-top: 6px;
        font-size: 22px;
        font-weight: 700;
        color: var(--accent);
      }

      .summary {
        margin-top: 12px;
        font-size: 16px;
        line-height: 1.7;
        color: var(--muted);
      }

      .chips,
      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .chip,
      .skill {
        display: inline-flex;
        align-items: center;
        min-height: 34px;
        padding: 0 14px;
        border-radius: 999px;
        background: var(--soft);
        border: 1px solid rgba(15, 23, 42, 0.08);
        color: #39434d;
        font-size: 14px;
        font-weight: 700;
      }

      .content {
        padding: 24px 32px 32px;
        display: grid;
        gap: 18px;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .stat {
        border-radius: 18px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        background: var(--soft);
        padding: 16px;
      }

      .stat strong {
        display: block;
        font-size: 28px;
        color: var(--accent);
      }

      .stat span {
        display: block;
        margin-top: 8px;
        font-size: 13px;
        color: var(--muted);
        font-weight: 700;
      }

      .columns {
        display: grid;
        grid-template-columns: 1.35fr 0.95fr;
        gap: 14px;
      }

      .card {
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 20px;
        padding: 18px;
        background: #ffffff;
      }

      .card.soft {
        background: var(--soft);
      }

      .card h2 {
        margin: 0 0 14px;
        font-size: 14px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--accent);
      }

      ul {
        margin: 0;
        padding-left: 20px;
      }

      li {
        margin: 0 0 10px;
        line-height: 1.7;
        color: #3b4752;
      }

      .foot-note {
        font-size: 12px;
        color: #6b7280;
      }

      @media print {
        body {
          padding: 0;
          background: #ffffff;
        }

        .sheet {
          width: auto;
          border-radius: 0;
          box-shadow: none;
          border: 0;
        }
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <section class="hero">
        <div class="hero-top">
          <div class="avatar">${escapeHtml(getInitials(draft.fullName))}</div>
          <div>
            <h1>${escapeHtml(draft.fullName || 'Họ và tên')}</h1>
            <div class="title">${escapeHtml(draft.title || 'Vị trí ứng tuyển')}</div>
          </div>
        </div>
        <p class="summary">${escapeHtml(draft.summary || 'Thêm mô tả ngắn để CV có điểm nhấn rõ ràng hơn.')}</p>
        ${
          metaItems.length
            ? `<div class="chips">${metaItems.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div>`
            : ''
        }
      </section>

      <section class="content">
        ${
          statItems.length
            ? `<div class="stats">${statItems
                .map(
                  (item) => `
                    <div class="stat">
                      <strong>${escapeHtml(item.value || '0')}</strong>
                      <span>${escapeHtml(item.label || 'Chỉ số')}</span>
                    </div>
                  `
                )
                .join('')}</div>`
            : ''
        }

        <div class="columns">
          <article class="card">
            <h2>Kinh nghiệm nổi bật</h2>
            ${
              experienceItems.length
                ? `<ul>${experienceItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
                : '<p class="foot-note">Chưa thêm kinh nghiệm nổi bật.</p>'
            }
          </article>

          <article class="card soft">
            <h2>Kỹ năng chính</h2>
            ${
              skillItems.length
                ? `<div class="skills">${skillItems.map((item) => `<span class="skill">${escapeHtml(item)}</span>`).join('')}</div>`
                : '<p class="foot-note">Chưa thêm kỹ năng chính.</p>'
            }
          </article>
        </div>

        <article class="card soft">
          <h2>Gợi ý vị trí phù hợp</h2>
          <div class="skills">${recommendedItems.map((item) => `<span class="skill">${escapeHtml(item)}</span>`).join('')}</div>
        </article>
      </section>
    </main>
    ${
      autoPrint
        ? `<script>
      window.addEventListener('load', () => {
        setTimeout(() => window.print(), 350);
        window.addEventListener('afterprint', () => window.close(), { once: true });
      });
    </script>`
        : ''
    }
  </body>
</html>`;
}

function createExportNode(tagName, styles = {}, text = '') {
  const node = document.createElement(tagName);
  Object.assign(node.style, styles);

  if (text) {
    node.textContent = text;
  }

  return node;
}

function buildCvExportElement(template, draft) {
  const accent = template.accent || '#2563eb';
  const softTone = template.softTone || '#f1f5f9';
  const metaItems = draft.meta.filter(Boolean);
  const statItems = draft.stats.filter((item) => item?.label || item?.value);
  const experienceItems = draft.experience.filter(Boolean);
  const skillItems = draft.skills.filter(Boolean);
  const recommendedItems = template.recommendedFor || [];
  const root = createExportNode('div', {
    width: '794px',
    background: '#ffffff',
    color: '#1f2937',
    fontFamily: 'Arial, Helvetica, sans-serif',
    boxSizing: 'border-box',
    border: '1px solid #e5e7eb',
    borderRadius: '22px',
    overflow: 'hidden'
  });
  const hero = createExportNode('section', {
    padding: '30px 34px 24px',
    background: softTone,
    borderBottom: '1px solid #e5e7eb',
    boxSizing: 'border-box'
  });
  const heroTop = createExportNode('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '18px'
  });
  const avatar = createExportNode(
    'div',
    {
      width: '78px',
      height: '78px',
      borderRadius: '22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      background: accent,
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '1'
    },
    getInitials(draft.fullName)
  );
  const profile = createExportNode('div', { minWidth: '0' });
  const name = createExportNode(
    'h1',
    {
      margin: '0',
      color: '#1f2937',
      fontSize: '38px',
      lineHeight: '1.08',
      fontWeight: '700',
      letterSpacing: '-0.5px'
    },
    draft.fullName || 'Họ và tên'
  );
  const title = createExportNode(
    'div',
    {
      marginTop: '8px',
      color: accent,
      fontSize: '21px',
      lineHeight: '1.3',
      fontWeight: '700'
    },
    draft.title || 'Vị trí ứng tuyển'
  );
  const summary = createExportNode(
    'p',
    {
      margin: '18px 0 0',
      color: '#4b5563',
      fontSize: '16px',
      lineHeight: '1.7'
    },
    draft.summary || 'Thêm mô tả ngắn để CV có điểm nhấn rõ ràng hơn.'
  );

  profile.append(name, title);
  heroTop.append(avatar, profile);
  hero.append(heroTop, summary);

  if (metaItems.length > 0) {
    const meta = createExportNode('div', {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '18px'
    });

    metaItems.forEach((item) => {
      meta.append(
        createExportNode(
          'span',
          {
            minHeight: '34px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 14px',
            borderRadius: '999px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '700'
          },
          item
        )
      );
    });

    hero.append(meta);
  }

  const content = createExportNode('section', {
    padding: '26px 34px 34px',
    display: 'grid',
    gap: '18px',
    boxSizing: 'border-box',
    background: '#ffffff'
  });

  if (statItems.length > 0) {
    const stats = createExportNode('div', {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '12px'
    });

    statItems.forEach((item) => {
      const stat = createExportNode('div', {
        padding: '16px',
        borderRadius: '18px',
        border: '1px solid #e5e7eb',
        background: softTone,
        minWidth: '0'
      });
      stat.append(
        createExportNode(
          'strong',
          {
            display: 'block',
            color: accent,
            fontSize: '28px',
            lineHeight: '1.1',
            fontWeight: '700'
          },
          item.value || '0'
        ),
        createExportNode(
          'span',
          {
            display: 'block',
            marginTop: '8px',
            color: '#4b5563',
            fontSize: '13px',
            fontWeight: '700',
            lineHeight: '1.35'
          },
          item.label || 'Chỉ số'
        )
      );
      stats.append(stat);
    });

    content.append(stats);
  }

  const columns = createExportNode('div', {
    display: 'grid',
    gridTemplateColumns: '1.35fr 0.95fr',
    gap: '14px'
  });
  const experienceCard = createExportNode('article', {
    padding: '18px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    background: '#ffffff'
  });
  const skillsCard = createExportNode('article', {
    padding: '18px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    background: softTone
  });
  const sectionTitleStyle = {
    margin: '0 0 14px',
    color: accent,
    fontSize: '14px',
    lineHeight: '1.3',
    fontWeight: '700',
    letterSpacing: '1.2px',
    textTransform: 'uppercase'
  };

  experienceCard.append(createExportNode('h2', sectionTitleStyle, 'Kinh nghiệm nổi bật'));

  if (experienceItems.length > 0) {
    const list = createExportNode('ul', {
      margin: '0',
      paddingLeft: '20px',
      color: '#374151',
      fontSize: '15px',
      lineHeight: '1.7'
    });

    experienceItems.forEach((item) => {
      const listItem = createExportNode('li', { marginBottom: '10px' }, item);
      list.append(listItem);
    });

    experienceCard.append(list);
  } else {
    experienceCard.append(createExportNode('p', { margin: '0', color: '#6b7280', fontSize: '14px' }, 'Chưa thêm kinh nghiệm nổi bật.'));
  }

  skillsCard.append(createExportNode('h2', sectionTitleStyle, 'Kỹ năng chính'));

  const appendPills = (parent, items) => {
    const pillWrap = createExportNode('div', {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    });

    items.forEach((item) => {
      pillWrap.append(
        createExportNode(
          'span',
          {
            minHeight: '34px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 14px',
            borderRadius: '999px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '700'
          },
          item
        )
      );
    });

    parent.append(pillWrap);
  };

  if (skillItems.length > 0) {
    appendPills(skillsCard, skillItems);
  } else {
    skillsCard.append(createExportNode('p', { margin: '0', color: '#6b7280', fontSize: '14px' }, 'Chưa thêm kỹ năng chính.'));
  }

  columns.append(experienceCard, skillsCard);
  content.append(columns);

  if (recommendedItems.length > 0) {
    const recommendedCard = createExportNode('article', {
      padding: '18px',
      borderRadius: '20px',
      border: '1px solid #e5e7eb',
      background: softTone
    });
    recommendedCard.append(createExportNode('h2', sectionTitleStyle, 'Gợi ý vị trí phù hợp'));
    appendPills(recommendedCard, recommendedItems);
    content.append(recommendedCard);
  }

  root.append(hero, content);

  return root;
}

function createCvDraftFromTemplate(template) {
  const preview = template?.preview || {};

  return {
    fullName: preview.fullName || '',
    title: preview.title || '',
    summary: preview.summary || '',
    meta: Array.isArray(preview.meta) ? preview.meta.map((item) => String(item || '')) : [],
    stats: Array.isArray(preview.stats)
      ? preview.stats.map((item) => ({
          label: item?.label || '',
          value: item?.value || ''
        }))
      : [],
    experience: Array.isArray(preview.experience) ? preview.experience.map((item) => String(item || '')) : [],
    skills: Array.isArray(preview.skills) ? preview.skills.map((item) => String(item || '')) : []
  };
}

function mergeCvDraft(template, storedDraft) {
  const fallback = createCvDraftFromTemplate(template);

  if (!storedDraft || typeof storedDraft !== 'object') {
    return fallback;
  }

  return {
    fullName: typeof storedDraft.fullName === 'string' ? storedDraft.fullName : fallback.fullName,
    title: typeof storedDraft.title === 'string' ? storedDraft.title : fallback.title,
    summary: typeof storedDraft.summary === 'string' ? storedDraft.summary : fallback.summary,
    meta: Array.isArray(storedDraft.meta) ? storedDraft.meta.map((item) => String(item || '')) : fallback.meta,
    stats: Array.isArray(storedDraft.stats)
      ? storedDraft.stats.map((item) => ({
          label: item?.label ? String(item.label) : '',
          value: item?.value ? String(item.value) : ''
        }))
      : fallback.stats,
    experience: Array.isArray(storedDraft.experience)
      ? storedDraft.experience.map((item) => String(item || ''))
      : fallback.experience,
    skills: Array.isArray(storedDraft.skills) ? storedDraft.skills.map((item) => String(item || '')) : fallback.skills
  };
}

function Header({ homeData }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="brand" href="#" aria-label={homeData.brand.logoAlt || homeData.brand.name}>
          <img
            className="brand-logo"
            src={homeData.brand.logoUrl || '/logo-shg.jpg'}
            alt={homeData.brand.logoAlt || homeData.brand.name}
          />
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
            Bắt đầu tìm việc
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ homeData, activeBanner, onChangeBanner, quickSuggestions, spotlightCompanies, onQuickSearch }) {
  const banner = homeData.heroBanners[activeBanner] ?? homeData.heroBanners[0];
  const isImageOnlyBanner = banner.displayMode === 'image-only';

  return (
    <section className={`hero${isImageOnlyBanner ? ' hero-brand-banner' : ''}`}>
      <div className="hero-media">
        <picture>
          <source media="(max-width: 768px)" srcSet={banner.imageMobile} />
          <img src={banner.imageDesktop} alt={banner.imageAlt || banner.title} />
        </picture>
        {!isImageOnlyBanner && <div className="hero-overlay" />}
      </div>

      {!isImageOnlyBanner && (
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">Nền tảng tìm việc thân thiện</p>
            <h1>{banner.title}</h1>
            <p className="hero-description">{banner.description}</p>

            {quickSuggestions.length > 0 && (
              <div className="hero-quick-picks">
                <span>Gợi ý tìm nhanh hôm nay</span>

                <div className="hero-chip-row">
                  {quickSuggestions.map((item) => (
                    <button key={item.label} type="button" className="hero-suggestion" onClick={() => onQuickSearch(item)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="hero-cta">
              <a className="btn btn-primary" href={banner.ctaPrimary.href}>
                {banner.ctaPrimary.label}
              </a>
              <a className="btn btn-secondary" href={banner.ctaSecondary.href}>
                {banner.ctaSecondary.label}
              </a>
            </div>

            <div className="hero-dots" aria-label="Bộ chuyển banner">
              {homeData.heroBanners.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === activeBanner ? 'active' : ''}
                  onClick={() => onChangeBanner(index)}
                  aria-label={`Chuyển banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <aside className="hero-sidecard">
            <p className="hero-card-kicker">Bắt đầu dễ dàng hơn</p>
            <h3>Mọi thứ được sắp xếp để bạn dễ ra quyết định</h3>

            <div className="hero-card-list">
              {HERO_SUPPORT_ITEMS.map((item) => (
                <article key={item.title} className="hero-card-item">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            {spotlightCompanies.length > 0 && (
              <div className="hero-company-strip">
                <div className="hero-avatar-group" aria-hidden="true">
                  {spotlightCompanies.map((company) => (
                    <span key={company.id} className="hero-avatar">
                      {getInitials(company.name)}
                    </span>
                  ))}
                </div>
                <p>Doanh nghiệp nổi bật đang tuyển và phản hồi nhanh trên nền tảng.</p>
              </div>
            )}
          </aside>
        </div>
      )}

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

function CvTemplateThumbnail({ template }) {
  const preview = template.preview;
  const style = {
    '--template-accent': template.accent,
    '--template-soft': template.softTone
  };

  if (template.layout === 'sidebar-dark') {
    return (
      <div className="cv-library-thumbnail cv-layout-sidebar-dark" style={style}>
        <div className="cv-paper-shell">
          <aside className="cv-paper-sidebar is-dark">
            <div className="cv-paper-photo">{getInitials(preview.fullName)}</div>
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
            <div className="cv-paper-sidebar-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>
          <div className="cv-paper-main">
            <div className="cv-paper-heading-line is-strong" />
            <div className="cv-paper-heading-line" />
            <div className="cv-paper-section">
              <span className="cv-paper-title" />
              <div className="cv-paper-line is-short" />
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-mid" />
            </div>
            <div className="cv-paper-section">
              <span className="cv-paper-title" />
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-short" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'sidebar-soft') {
    return (
      <div className="cv-library-thumbnail cv-layout-sidebar-soft" style={style}>
        <div className="cv-paper-shell">
          <aside className="cv-paper-sidebar">
            <div className="cv-paper-photo">{getInitials(preview.fullName)}</div>
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
            <div className="cv-paper-tag-stack">
              <span />
              <span />
              <span />
            </div>
          </aside>
          <div className="cv-paper-main">
            <div className="cv-paper-section">
              <span className="cv-paper-title" />
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-mid" />
            </div>
            <div className="cv-paper-grid">
              <div className="cv-paper-grid-block">
                <div className="cv-paper-line is-short" />
                <div className="cv-paper-line" />
                <div className="cv-paper-line is-mid" />
              </div>
              <div className="cv-paper-grid-block">
                <div className="cv-paper-line is-mid" />
                <div className="cv-paper-line" />
                <div className="cv-paper-line is-short" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'split') {
    return (
      <div className="cv-library-thumbnail cv-layout-split" style={style}>
        <div className="cv-paper-band">
          <div className="cv-paper-photo is-small">{getInitials(preview.fullName)}</div>
          <div className="cv-paper-profile">
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
          </div>
        </div>
        <div className="cv-paper-card-body">
          <div className="cv-paper-grid">
            <div className="cv-paper-grid-block">
              <span className="cv-paper-title" />
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-short" />
            </div>
            <div className="cv-paper-grid-block">
              <span className="cv-paper-title" />
              <div className="cv-paper-line is-mid" />
              <div className="cv-paper-line" />
            </div>
          </div>
          <div className="cv-paper-section">
            <span className="cv-paper-title" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line is-mid" />
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'contrast') {
    return (
      <div className="cv-library-thumbnail cv-layout-contrast" style={style}>
        <div className="cv-paper-shell">
          <aside className="cv-paper-sidebar is-contrast">
            <div className="cv-paper-photo">{getInitials(preview.fullName)}</div>
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
            <div className="cv-paper-dot-group">
              <span />
              <span />
              <span />
            </div>
          </aside>
          <div className="cv-paper-main">
            <div className="cv-paper-heading-line is-strong" />
            <div className="cv-paper-line is-short" />
            <div className="cv-paper-section">
              <span className="cv-paper-title" />
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-mid" />
              <div className="cv-paper-line" />
            </div>
            <div className="cv-paper-grid">
              <div className="cv-paper-grid-block">
                <div className="cv-paper-line is-mid" />
                <div className="cv-paper-line is-short" />
              </div>
              <div className="cv-paper-grid-block">
                <div className="cv-paper-line" />
                <div className="cv-paper-line is-short" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'minimal') {
    return (
      <div className="cv-library-thumbnail cv-layout-minimal" style={style}>
        <div className="cv-paper-card-body">
          <div className="cv-paper-profile is-minimal">
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
          </div>
          <div className="cv-paper-section">
            <span className="cv-paper-title" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line is-mid" />
          </div>
          <div className="cv-paper-section">
            <span className="cv-paper-title" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line is-short" />
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'centered') {
    return (
      <div className="cv-library-thumbnail cv-layout-centered" style={style}>
        <div className="cv-paper-card-body">
          {template.isNew ? <span className="cv-paper-badge">Mới</span> : null}
          <div className="cv-paper-profile is-centered">
            <div className="cv-paper-photo is-small">{getInitials(preview.fullName)}</div>
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
          </div>
          <div className="cv-paper-section">
            <span className="cv-paper-title" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line" />
            <div className="cv-paper-line is-mid" />
          </div>
          <div className="cv-paper-grid">
            <div className="cv-paper-grid-block">
              <div className="cv-paper-line is-short" />
              <div className="cv-paper-line" />
            </div>
            <div className="cv-paper-grid-block">
              <div className="cv-paper-line" />
              <div className="cv-paper-line is-mid" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-library-thumbnail cv-layout-clean" style={style}>
      <div className="cv-paper-card-body">
        <div className="cv-paper-profile">
          <div className="cv-paper-photo is-small">{getInitials(preview.fullName)}</div>
          <div>
            <b>{preview.fullName}</b>
            <small>{preview.title}</small>
          </div>
        </div>
        <div className="cv-paper-section">
          <span className="cv-paper-title" />
          <div className="cv-paper-line" />
          <div className="cv-paper-line" />
        </div>
        <div className="cv-paper-section">
          <span className="cv-paper-title" />
          <div className="cv-paper-line is-short" />
          <div className="cv-paper-line is-mid" />
          <div className="cv-paper-line" />
        </div>
      </div>
    </div>
  );
}

function CvTemplateSection({ templates = [], onOpenTemplate }) {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [activeTemplateId, setActiveTemplateId] = useState(templates[0]?.id || '');

  const filters = useMemo(
    () => CV_FILTER_ORDER.filter((item) => item === 'Tất cả' || templates.some((template) => template.styleTags?.includes(item))),
    [templates]
  );

  const visibleTemplates = useMemo(() => {
    if (activeFilter === 'Tất cả') {
      return templates;
    }

    return templates.filter((item) => item.styleTags?.includes(activeFilter));
  }, [activeFilter, templates]);

  useEffect(() => {
    if (!visibleTemplates.length) {
      return;
    }

    if (!visibleTemplates.some((item) => item.id === activeTemplateId)) {
      setActiveTemplateId(visibleTemplates[0].id);
    }
  }, [activeTemplateId, visibleTemplates]);

  const activeTemplate = visibleTemplates.find((item) => item.id === activeTemplateId) || visibleTemplates[0];

  if (!templates.length || !activeTemplate) {
    return null;
  }

  return (
    <section className="cv-showcase" id="cv-mau">
      <div className="container section-shell cv-library-shell">
        <div className="cv-library-head">
          <div className="cv-library-copy">
            <p className="cv-library-breadcrumb">
              <a href="#">Trang chủ</a>
              <span>/</span>
              <strong>Mẫu CV tiếng Việt</strong>
            </p>
            <h2>Mẫu CV xin việc tiếng Việt chuẩn 2026</h2>
            <p>
              Tuyển chọn {templates.length} mẫu CV theo nhiều phong cách, giúp bạn chọn nhanh bố cục phù hợp và tạo ấn tượng
              chỉ trong vài giây.
            </p>
          </div>

          <div className="cv-library-bot">
            <div className="cv-library-bot-core">
              <div className="cv-library-bot-eye" />
              <div className="cv-library-bot-eye" />
            </div>
          </div>
        </div>

        <div className="cv-library-toolbar">
          <div className="cv-filter-row" role="tablist" aria-label="Bộ lọc mẫu CV">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={`cv-filter-chip ${item === activeFilter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button type="button" className="cv-language-chip">
            Tiếng Việt
          </button>
        </div>

        <div className="cv-library-focus">
          <div>
            <span className="cv-library-focus-kicker">Đang chọn</span>
            <h3>{activeTemplate.name}</h3>
            <p>{activeTemplate.tagline}</p>
          </div>

          <div className="cv-library-focus-meta">
            {activeTemplate.styleTags.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="cv-library-focus-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setActiveFilter('Tất cả')}>
              Xem tất cả mẫu
            </button>
            <button type="button" className="btn btn-primary" onClick={() => onOpenTemplate?.(activeTemplate.id)}>
              Dùng mẫu này
            </button>
          </div>
        </div>

        <div className="cv-library-grid">
          {visibleTemplates.map((template) => (
            <article
              key={template.id}
              className={`cv-library-card ${template.id === activeTemplate.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveTemplateId(template.id)}
            >
              <button
                type="button"
                className="cv-library-preview-trigger"
                onClick={() => setActiveTemplateId(template.id)}
                aria-label={`Xem nhanh mẫu ${template.name}`}
              >
                <CvTemplateThumbnail template={template} />
              </button>

              <div className="cv-library-card-body">
                <div className="cv-library-palette">
                  {template.palette.map((color) => (
                    <span key={color} style={{ backgroundColor: color }} />
                  ))}
                </div>

                <h3>{template.name}</h3>

                <div className="cv-library-tag-row">
                  {template.styleTags.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="cv-card-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setActiveTemplateId(template.id)}>
                    Xem nhanh
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => onOpenTemplate?.(template.id)}>
                    Xem và sửa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CvEditorModal({
  template,
  draft,
  onClose,
  onReset,
  onUpdateField,
  onUpdateListItem,
  onAddListItem,
  onRemoveListItem,
  onUpdateStat,
  onAddStat,
  onRemoveStat
}) {
  if (!template || !draft) {
    return null;
  }

  const style = {
    '--template-accent': template.accent,
    '--template-soft': template.softTone
  };

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportFeedback, setExportFeedback] = useState('');

  const handleDownloadPdf = async () => {
    if (isExportingPdf) {
      return;
    }

    setIsExportingPdf(true);
    setExportFeedback('');
    let exportHost = null;

    try {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(resolve);
        });
      });

      exportHost = document.createElement('div');
      Object.assign(exportHost.style, {
        position: 'fixed',
        left: '-10000px',
        top: '0',
        width: '794px',
        background: '#ffffff',
        pointerEvents: 'none',
        zIndex: '-1'
      });
      exportHost.append(buildCvExportElement(template, draft));
      document.body.appendChild(exportHost);

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const canvas = await html2canvas(exportHost.firstElementChild, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageProps = pdf.getImageProperties(imageData);
      const maxWidth = pageWidth - 16;
      const maxHeight = pageHeight - 16;
      const ratio = Math.min(maxWidth / imageProps.width, maxHeight / imageProps.height);
      const renderWidth = imageProps.width * ratio;
      const renderHeight = imageProps.height * ratio;
      const x = (pageWidth - renderWidth) / 2;
      const y = 8;
      const fileName = `${slugifyFilePart(draft.fullName, 'ung-vien')}-${slugifyFilePart(template.name, 'cv')}.pdf`;

      pdf.addImage(imageData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
      try {
        await pdf.save(fileName, { returnPromise: true });
      } catch (_saveError) {
        const pdfBlob = pdf.output('blob');
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
      }
    } catch (error) {
      console.error('PDF export failed', error);
      setExportFeedback('Không thể tải PDF. Làm mới trang rồi thử lại.');
    } finally {
      exportHost?.remove();
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="job-modal-overlay" onClick={onClose} role="presentation">
      <section
        className="job-modal cv-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Chỉnh sửa mẫu CV ${template.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">
          x
        </button>

        <div className="cv-modal-header">
          <span className="cv-preview-badge" style={style}>
            {template.category}
          </span>
          <h3>{template.name}</h3>
          <p>{template.tagline}</p>
          <div className="cv-library-focus-meta">
            {template.styleTags.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="cv-showcase-layout cv-modal-layout">
          <aside className="cv-editor-card">
            <span className="cv-intro-kicker">Chỉnh sửa CV</span>
            <h3>Điền thông tin và xem thay đổi ngay</h3>
            <p>Mẫu này đã mở để bạn xem và sửa. Nội dung sẽ được lưu nháp riêng cho từng mẫu ngay trên máy này.</p>

            <div className="cv-editor-toolbar">
              <button type="button" className="btn btn-secondary" onClick={onReset}>
                Khôi phục mẫu gốc
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleDownloadPdf} disabled={isExportingPdf}>
                {isExportingPdf ? 'Đang tạo PDF...' : 'Tải PDF'}
              </button>
            </div>

            <div className="cv-editor-summary">
              <div>
                <strong>Phù hợp với</strong>
                <p>{template.recommendedFor.join(', ')}</p>
              </div>
              <div>
                <strong>Điểm nhấn</strong>
                <p>{template.highlights.join(', ')}</p>
              </div>
            </div>

            <div className="cv-editor-field-grid">
              <div className="field-group">
                <label htmlFor="cv-full-name">Họ và tên</label>
                <input
                  id="cv-full-name"
                  type="text"
                  value={draft.fullName}
                  onChange={(event) => onUpdateField('fullName', event.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="cv-job-title">Vị trí ứng tuyển</label>
                <input
                  id="cv-job-title"
                  type="text"
                  value={draft.title}
                  onChange={(event) => onUpdateField('title', event.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="cv-summary">Mô tả ngắn</label>
              <textarea
                id="cv-summary"
                value={draft.summary}
                onChange={(event) => onUpdateField('summary', event.target.value)}
              />
            </div>

            <div className="cv-editor-section">
              <div className="cv-preview-section-head">
                <p>Thông tin nhanh</p>
                <button type="button" className="cv-add-inline" onClick={() => onAddListItem('meta', 'Thông tin mới')}>
                  Thêm mục
                </button>
              </div>
              <div className="cv-preview-meta-edit">
                {draft.meta.map((item, index) => (
                  <div key={`meta-${index}`} className="cv-meta-pill">
                    <input
                      type="text"
                      value={item}
                      onChange={(event) => onUpdateListItem('meta', index, event.target.value)}
                      aria-label={`Thông tin nhanh ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="cv-remove-inline"
                      aria-label={`Xóa thông tin nhanh ${index + 1}`}
                      onClick={() => onRemoveListItem('meta', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cv-editor-section">
              <div className="cv-preview-section-head">
                <p>Chỉ số nổi bật</p>
                <button type="button" className="cv-add-inline" onClick={onAddStat}>
                  Thêm chỉ số
                </button>
              </div>
              <div className="cv-preview-stats">
                {draft.stats.map((item, index) => (
                  <div key={`stat-${index}`} className="cv-stat-card-edit">
                    <button
                      type="button"
                      className="cv-remove-inline is-floating"
                      aria-label={`Xóa chỉ số ${index + 1}`}
                      onClick={() => onRemoveStat(index)}
                    >
                      ×
                    </button>
                    <input
                      type="text"
                      className="cv-stat-value"
                      value={item.value}
                      onChange={(event) => onUpdateStat(index, 'value', event.target.value)}
                      placeholder="Ví dụ: 4 năm"
                      aria-label={`Giá trị chỉ số ${index + 1}`}
                    />
                    <input
                      type="text"
                      className="cv-stat-label"
                      value={item.label}
                      onChange={(event) => onUpdateStat(index, 'label', event.target.value)}
                      placeholder="Ví dụ: Kinh nghiệm"
                      aria-label={`Tên chỉ số ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="cv-editor-section">
              <div className="cv-preview-section-head">
                <p>Kinh nghiệm nổi bật</p>
                <button
                  type="button"
                  className="cv-add-inline"
                  onClick={() => onAddListItem('experience', 'Mô tả kinh nghiệm nổi bật')}
                >
                  Thêm kinh nghiệm
                </button>
              </div>
              <div className="cv-edit-list">
                {draft.experience.map((item, index) => (
                  <div key={`exp-${index}`} className="cv-edit-item">
                    <textarea
                      className="cv-inline-input cv-inline-bullet"
                      value={item}
                      onChange={(event) => onUpdateListItem('experience', index, event.target.value)}
                      aria-label={`Kinh nghiệm ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="cv-remove-inline"
                      aria-label={`Xóa kinh nghiệm ${index + 1}`}
                      onClick={() => onRemoveListItem('experience', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cv-editor-section">
              <div className="cv-preview-section-head">
                <p>Kỹ năng chính</p>
                <button type="button" className="cv-add-inline" onClick={() => onAddListItem('skills', 'Kỹ năng mới')}>
                  Thêm kỹ năng
                </button>
              </div>
              <div className="cv-preview-skill-edit">
                {draft.skills.map((item, index) => (
                  <div key={`skill-${index}`} className="cv-skill-pill-edit">
                    <input
                      type="text"
                      value={item}
                      onChange={(event) => onUpdateListItem('skills', index, event.target.value)}
                      aria-label={`Kỹ năng ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="cv-remove-inline"
                      aria-label={`Xóa kỹ năng ${index + 1}`}
                      onClick={() => onRemoveListItem('skills', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="cv-preview-card" style={style}>
            <div className="cv-preview-head">
              <div>
                <span className="cv-preview-badge">{template.category}</span>
                <h3>Xem trước CV</h3>
                <p>Bấm trực tiếp vào nội dung trên CV để sửa nhanh ngay trong phần xem trước.</p>
              </div>
              <div className="cv-preview-head-actions">
                <span className="cv-editable-note">Đang lưu nháp tự động</span>
                <button type="button" className="btn btn-ghost" onClick={handleDownloadPdf} disabled={isExportingPdf}>
                  {isExportingPdf ? 'Đang tạo PDF...' : 'Tải PDF'}
                </button>
              </div>
            </div>

            {exportFeedback ? <p className="cv-empty-note">{exportFeedback}</p> : null}

            <div className="cv-preview-paper">
              <div className="cv-preview-profile">
                <div className="cv-preview-avatar">{getInitials(draft.fullName)}</div>
                <div className="cv-preview-profile-copy">
                  <input
                    type="text"
                    className="cv-inline-input cv-inline-name"
                    value={draft.fullName}
                    onChange={(event) => onUpdateField('fullName', event.target.value)}
                    placeholder="Họ và tên của bạn"
                    aria-label="Họ và tên trên CV"
                  />
                  <input
                    type="text"
                    className="cv-inline-input cv-inline-title"
                    value={draft.title}
                    onChange={(event) => onUpdateField('title', event.target.value)}
                    placeholder="Vị trí ứng tuyển"
                    aria-label="Vị trí ứng tuyển trên CV"
                  />
                  <textarea
                    className="cv-inline-input cv-inline-summary"
                    value={draft.summary}
                    onChange={(event) => onUpdateField('summary', event.target.value)}
                    placeholder="Thêm mô tả ngắn để CV có điểm nhấn rõ ràng hơn."
                    aria-label="Mô tả ngắn trên CV"
                  />
                </div>
              </div>

              <div className="cv-preview-section-head">
                <p>Thông tin nhanh</p>
                <button type="button" className="cv-add-inline" onClick={() => onAddListItem('meta', 'Thông tin mới')}>
                  Thêm mục
                </button>
              </div>

              <div className="cv-preview-meta-edit">
                {draft.meta.length > 0 ? (
                  draft.meta.map((item, index) => (
                    <div key={`preview-meta-${index}`} className="cv-meta-pill">
                      <input
                        type="text"
                        value={item}
                        onChange={(event) => onUpdateListItem('meta', index, event.target.value)}
                        aria-label={`Thông tin nhanh trên CV ${index + 1}`}
                      />
                      <button
                        type="button"
                        className="cv-remove-inline"
                        aria-label={`Xóa thông tin nhanh trên CV ${index + 1}`}
                        onClick={() => onRemoveListItem('meta', index)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="cv-empty-note">Thêm thông tin nhanh để CV rõ hơn.</p>
                )}
              </div>

              <div className="cv-preview-section-head">
                <p>Chỉ số nổi bật</p>
                <button type="button" className="cv-add-inline" onClick={onAddStat}>
                  Thêm chỉ số
                </button>
              </div>

              <div className="cv-preview-stats">
                {draft.stats.length > 0 ? (
                  draft.stats.map((item, index) => (
                    <div key={`preview-stat-${index}`} className="cv-stat-card-edit">
                      <button
                        type="button"
                        className="cv-remove-inline is-floating"
                        aria-label={`Xóa chỉ số trên CV ${index + 1}`}
                        onClick={() => onRemoveStat(index)}
                      >
                        ×
                      </button>
                      <input
                        type="text"
                        className="cv-stat-value"
                        value={item.value}
                        onChange={(event) => onUpdateStat(index, 'value', event.target.value)}
                        placeholder="Ví dụ: 4 năm"
                        aria-label={`Giá trị chỉ số trên CV ${index + 1}`}
                      />
                      <input
                        type="text"
                        className="cv-stat-label"
                        value={item.label}
                        onChange={(event) => onUpdateStat(index, 'label', event.target.value)}
                        placeholder="Ví dụ: Kinh nghiệm"
                        aria-label={`Tên chỉ số trên CV ${index + 1}`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="cv-stat-card-edit">
                    <p className="cv-empty-note">Thêm chỉ số để CV nổi bật hơn.</p>
                  </div>
                )}
              </div>

              <div className="cv-preview-columns">
                <div className="cv-preview-block">
                  <div className="cv-preview-section-head">
                    <p>Kinh nghiệm nổi bật</p>
                    <button
                      type="button"
                      className="cv-add-inline"
                      onClick={() => onAddListItem('experience', 'Mô tả kinh nghiệm nổi bật')}
                    >
                      Thêm
                    </button>
                  </div>
                  {draft.experience.length > 0 ? (
                    <div className="cv-edit-list">
                      {draft.experience.map((item, index) => (
                        <div key={`preview-exp-${index}`} className="cv-edit-item">
                          <textarea
                            className="cv-inline-input cv-inline-bullet"
                            value={item}
                            onChange={(event) => onUpdateListItem('experience', index, event.target.value)}
                            aria-label={`Kinh nghiệm trên CV ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="cv-remove-inline"
                            aria-label={`Xóa kinh nghiệm trên CV ${index + 1}`}
                            onClick={() => onRemoveListItem('experience', index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="cv-empty-note">Thêm kinh nghiệm để CV đầy đủ hơn.</p>
                  )}
                </div>

                <div className="cv-preview-block is-soft">
                  <div className="cv-preview-section-head">
                    <p>Kỹ năng chính</p>
                    <button type="button" className="cv-add-inline" onClick={() => onAddListItem('skills', 'Kỹ năng mới')}>
                      Thêm
                    </button>
                  </div>
                  {draft.skills.length > 0 ? (
                    <div className="cv-preview-skill-edit">
                      {draft.skills.map((item, index) => (
                        <div key={`preview-skill-${index}`} className="cv-skill-pill-edit">
                          <input
                            type="text"
                            value={item}
                            onChange={(event) => onUpdateListItem('skills', index, event.target.value)}
                            aria-label={`Kỹ năng trên CV ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="cv-remove-inline"
                            aria-label={`Xóa kỹ năng trên CV ${index + 1}`}
                            onClick={() => onRemoveListItem('skills', index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="cv-empty-note">Thêm kỹ năng để nhà tuyển dụng đọc nhanh hơn.</p>
                  )}
                </div>
              </div>

              <div className="cv-preview-block is-soft">
                <p>Gợi ý vị trí phù hợp</p>
                <div className="cv-preview-skill-list">
                  {template.recommendedFor.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomePage() {
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
  const [selectedCvId, setSelectedCvId] = useState('');
  const [cvDrafts, setCvDrafts] = useState({});
  const [applyForm, setApplyForm] = useState(EMPTY_FORM);
  const [applying, setApplying] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState({ type: '', message: '' });
  const cvFileInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('home-page');

    return () => {
      document.body.classList.remove('home-page');
      document.body.classList.remove('modal-open');
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchHomeData = async () => {
      setLoading(true);
      setLoadingError('');

      try {
        const response = await fetch(apiUrl('/api/home-data'));
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu trang chủ');
        }

        const data = await response.json();
        if (!active) {
          return;
        }

        setHomeData(data);
      } catch (_error) {
        if (active) {
          setLoadingError('Không thể tải dữ liệu trang. Vui lòng kiểm tra server API.');
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

        const response = await fetch(apiUrl(`/api/jobs?${params.toString()}`), {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Không thể tải danh sách việc làm');
        }

        const data = await response.json();
        setJobsPayload(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setJobsError('Không thể tải danh sách việc làm.');
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
    if (!homeData?.cvTemplates?.length) {
      return;
    }

    try {
      const raw = window.localStorage.getItem(CV_DRAFTS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const nextDrafts = Object.fromEntries(
        homeData.cvTemplates.map((template) => [template.id, mergeCvDraft(template, parsed?.[template.id])])
      );

      setCvDrafts(nextDrafts);
    } catch (_error) {
      const fallbackDrafts = Object.fromEntries(
        homeData.cvTemplates.map((template) => [template.id, createCvDraftFromTemplate(template)])
      );

      setCvDrafts(fallbackDrafts);
    }
  }, [homeData]);

  useEffect(() => {
    if (!Object.keys(cvDrafts).length) {
      return;
    }

    window.localStorage.setItem(CV_DRAFTS_KEY, JSON.stringify(cvDrafts));
  }, [cvDrafts]);

  useEffect(() => {
    if (JSON.stringify(filters) === JSON.stringify(appliedFilters)) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPage(1);
      setAppliedFilters(filters);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [appliedFilters, filters]);

  useEffect(() => {
    if (!selectedJob && !selectedCvId) {
      return undefined;
    }

    document.body.classList.add('modal-open');

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (selectedCvId) {
          setSelectedCvId('');
          return;
        }

        setSelectedJob(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedCvId, selectedJob]);

  const savedJobList = useMemo(() => {
    if (!homeData?.jobs?.length) {
      return [];
    }

    const lookup = new Map(homeData.jobs.map((job) => [job.id, job]));
    return savedJobs.map((id) => lookup.get(id)).filter(Boolean);
  }, [homeData, savedJobs]);
  const heroSuggestions = useMemo(() => {
    if (!homeData?.jobs?.length) {
      return [];
    }

    const uniqueTags = [];

    for (const job of homeData.jobs) {
      for (const tag of job.tags || []) {
        if (!tag || uniqueTags.includes(tag)) {
          continue;
        }

        uniqueTags.push(tag);

        if (uniqueTags.length === 4) {
          return uniqueTags.map((item) => ({
            label: item,
            keyword: item
          }));
        }
      }
    }

    return homeData.jobs.slice(0, 4).map((job) => ({
      label: job.title,
      keyword: job.title
    }));
  }, [homeData]);
  const spotlightCompanies = useMemo(() => homeData?.topCompanies?.slice(0, 3) || [], [homeData]);
  const cvTemplateLookup = useMemo(
    () => new Map((homeData?.cvTemplates || []).map((template) => [template.id, template])),
    [homeData]
  );
  const selectedCvTemplate = selectedCvId ? cvTemplateLookup.get(selectedCvId) || null : null;
  const selectedCvDraft = selectedCvId ? cvDrafts[selectedCvId] || null : null;

  const totalVisible = jobsPayload.items.length;
  const rangeStart = jobsPayload.total === 0 ? 0 : (jobsPayload.page - 1) * jobsPayload.pageSize + 1;
  const rangeEnd = jobsPayload.total === 0 ? 0 : rangeStart + totalVisible - 1;
  const activeFilterCount = Object.values(appliedFilters).filter(Boolean).length;
  const activeFilterChips = useMemo(() => {
    const chips = [];

    if (appliedFilters.keyword) {
      chips.push({
        key: 'keyword',
        label: `${FILTER_LABELS.keyword}: ${appliedFilters.keyword}`
      });
    }

    if (appliedFilters.location) {
      chips.push({
        key: 'location',
        label: `${FILTER_LABELS.location}: ${appliedFilters.location}`
      });
    }

    if (appliedFilters.type) {
      chips.push({
        key: 'type',
        label: `${FILTER_LABELS.type}: ${getOptionLabel(jobsPayload.filters.types, appliedFilters.type)}`
      });
    }

    if (appliedFilters.experience) {
      chips.push({
        key: 'experience',
        label: `${FILTER_LABELS.experience}: ${getOptionLabel(
          jobsPayload.filters.experienceLevels,
          appliedFilters.experience
        )}`
      });
    }

    if (appliedFilters.salaryMin) {
      chips.push({
        key: 'salaryMin',
        label: `${FILTER_LABELS.salaryMin}: ${getOptionLabel(
          jobsPayload.filters.salaryOptions,
          appliedFilters.salaryMin
        )}`
      });
    }

    if (sort !== 'newest') {
      chips.push({
        key: 'sort',
        label: `${FILTER_LABELS.sort}: ${getOptionLabel(SORT_OPTIONS, sort)}`
      });
    }

    return chips;
  }, [appliedFilters, jobsPayload.filters.experienceLevels, jobsPayload.filters.salaryOptions, jobsPayload.filters.types, sort]);
  const resultsSummary = jobsLoading
    ? 'Đang cập nhật danh sách việc làm...'
    : jobsPayload.total === 0
      ? 'Chưa tìm thấy việc làm phù hợp với bộ lọc hiện tại.'
      : `Hiển thị ${rangeStart}-${rangeEnd} trong ${jobsPayload.total} vị trí`;

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

  const handleRemoveFilter = (field) => {
    if (field === 'sort') {
      setSort('newest');
      setPage(1);
      return;
    }

    setFilters((previous) => ({
      ...previous,
      [field]: ''
    }));
    setAppliedFilters((previous) => ({
      ...previous,
      [field]: ''
    }));
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleQuickSearch = (item) => {
    const nextFilters = {
      ...EMPTY_FILTERS,
      keyword: item.keyword
    };

    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setSort('newest');
    setPage(1);
    document.getElementById('jobs')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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

  const openCvModal = (templateId) => {
    if (!templateId) {
      return;
    }

    setSelectedCvId(templateId);
  };

  const closeCvModal = () => {
    setSelectedCvId('');
  };

  const updateCvDraft = (templateId, updater) => {
    const template = cvTemplateLookup.get(templateId);

    if (!template) {
      return;
    }

    setCvDrafts((previous) => {
      const currentDraft = previous[templateId] || createCvDraftFromTemplate(template);

      return {
        ...previous,
        [templateId]: updater(currentDraft)
      };
    });
  };

  const updateCvDraftField = (templateId, field, value) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      [field]: value
    }));
  };

  const updateCvDraftListItem = (templateId, field, index, value) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      [field]: draft[field].map((item, itemIndex) => (itemIndex === index ? value : item))
    }));
  };

  const addCvDraftListItem = (templateId, field, value = '') => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      [field]: [...draft[field], value]
    }));
  };

  const removeCvDraftListItem = (templateId, field, index) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      [field]: draft[field].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const updateCvDraftStat = (templateId, index, key, value) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      stats: draft.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  };

  const addCvDraftStat = (templateId) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      stats: [...draft.stats, { label: 'Chỉ số mới', value: '' }]
    }));
  };

  const removeCvDraftStat = (templateId, index) => {
    updateCvDraft(templateId, (draft) => ({
      ...draft,
      stats: draft.stats.filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const resetCvDraft = (templateId) => {
    const template = cvTemplateLookup.get(templateId);

    if (!template) {
      return;
    }

    setCvDrafts((previous) => ({
      ...previous,
      [templateId]: createCvDraftFromTemplate(template)
    }));
  };

  const handleSubmitApplication = async (event) => {
    event.preventDefault();

    if (!selectedJob) {
      return;
    }

    setApplying(true);
    setApplyFeedback({ type: '', message: '' });

    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob.id);
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
      if (cvFileInputRef.current) {
        cvFileInputRef.current.value = '';
      }
      setApplyFeedback({
        type: 'success',
        message: payload.message || 'Ứng tuyển thành công.'
      });
    } catch (error) {
      setApplyFeedback({
        type: 'error',
        message: error.message || 'Không thể gửi hồ sơ. Vui lòng thử lại.'
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <h1>SHG INVESTMENT</h1>
          <p>Đang tải nền tảng tuyển dụng...</p>
        </div>
      </main>
    );
  }

  if (loadingError || !homeData) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <h1>Không thể tải dữ liệu</h1>
          <p>{loadingError || 'Vui lòng kiểm tra máy chủ API.'}</p>
        </div>
      </main>
    );
  }

  return (
    <div className="public-home site-shell">
      <Header homeData={homeData} />
      <Hero
        homeData={homeData}
        activeBanner={activeBanner}
        onChangeBanner={setActiveBanner}
        quickSuggestions={heroSuggestions}
        spotlightCompanies={spotlightCompanies}
        onQuickSearch={handleQuickSearch}
      />

      <main>
        <section className="job-explorer" id="jobs">
          <div className="container section-shell section-shell-wide">
            <div className="section-heading">
              <p>Khám phá việc làm</p>
              <h2>Hôm nay bạn muốn tìm công việc nào?</h2>
              <span>{resultsSummary}</span>
            </div>

            <form className="filter-panel" onSubmit={handleApplyFilters}>
              <div className="filter-header">
                <div>
                  <strong>Tìm nhanh việc phù hợp</strong>
                  <p>Nhập từ khóa, chọn tiêu chí và kết quả sẽ tự động cập nhật sau một nhịp nhỏ.</p>
                </div>

                <div className="filter-header-meta">
                  <span>{activeFilterCount} bộ lọc đang bật</span>
                  <span>{savedJobList.length} tin đã lưu</span>
                </div>
              </div>

              <div className="filter-primary-row">
                <div className="field-group field-keyword">
                  <label htmlFor="keyword">Từ khóa</label>
                  <input
                    id="keyword"
                    type="text"
                    placeholder="Ví dụ: kho vận, QA, HSE..."
                    value={filters.keyword}
                    onChange={(event) => handleFilterChange('keyword', event.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="location">Khu vực</label>
                  <select
                    id="location"
                    value={filters.location}
                    onChange={(event) => handleFilterChange('location', event.target.value)}
                  >
                    <option value="">Tất cả khu vực</option>
                    {jobsPayload.filters.locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-actions">
                  <button className="btn btn-primary" type="submit">
                    Tìm việc
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={handleResetFilters}>
                    Bộ lọc mặc định
                  </button>
                </div>
              </div>

              <div className="filter-grid">
                <div className="field-group">
                  <label htmlFor="type">Loại hình</label>
                  <select
                    id="type"
                    value={filters.type}
                    onChange={(event) => handleFilterChange('type', event.target.value)}
                  >
                    <option value="">Tất cả loại hình</option>
                    {jobsPayload.filters.types.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="experience">Kinh nghiệm</label>
                  <select
                    id="experience"
                    value={filters.experience}
                    onChange={(event) => handleFilterChange('experience', event.target.value)}
                  >
                    <option value="">Tất cả mức kinh nghiệm</option>
                    {jobsPayload.filters.experienceLevels.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="salaryMin">Mức lương</label>
                  <select
                    id="salaryMin"
                    value={filters.salaryMin}
                    onChange={(event) => handleFilterChange('salaryMin', event.target.value)}
                  >
                    <option value="">Tất cả mức lương</option>
                    {jobsPayload.filters.salaryOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="sort">Sắp xếp</label>
                  <select id="sort" value={sort} onChange={(event) => handleSortChange(event.target.value)}>
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {activeFilterChips.length > 0 ? (
              <div className="active-filters" aria-label="Bộ lọc đang áp dụng">
              
                {activeFilterChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className="active-filter-chip"
                    onClick={() => handleRemoveFilter(chip.key)}
                  >
                    {chip.label}
                    <span aria-hidden="true">x</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="filter-hint">Gợi ý: bạn có thể gõ chức danh, chọn khu vực và lọc theo mức lương để ra kết quả nhanh hơn.</p>
            )}

            <div className="jobs-layout">
              <div className="jobs-column">
                {jobsError && <p className="jobs-message error">{jobsError}</p>}
                {jobsLoading && <p className="jobs-message">Đang tải danh sách việc làm...</p>}

                {!jobsLoading && !jobsError && jobsPayload.items.length === 0 && (
                  <p className="jobs-message">Không tìm thấy việc làm phù hợp với bộ lọc hiện tại.</p>
                )}

                <div className="job-grid">
                  {jobsPayload.items.map((job) => {
                    const isSaved = savedJobs.includes(job.id);

                    return (
                      <article key={job.id} className="job-card">
                        <div className="job-head">
                          <div className="job-title-block">
                            {job.urgent && <span className="badge badge-alert">Tuyển gấp</span>}
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                          </div>
                          <button
                            type="button"
                            className={`icon-btn ${isSaved ? 'saved' : ''}`}
                            onClick={() => toggleSavedJob(job.id)}
                            aria-label={isSaved ? 'Bỏ lưu tin' : 'Lưu tin'}
                          >
                            {isSaved ? 'Đã lưu' : 'Lưu tin'}
                          </button>
                        </div>

                        <div className="job-highlights">
                          <div className="job-highlight">
                            <span>Mức lương</span>
                            <strong>{job.salaryLabel}</strong>
                          </div>
                          <div className="job-highlight">
                            <span>Địa điểm</span>
                            <strong>{job.location}</strong>
                            <small>{job.district}</small>
                          </div>
                          <div className="job-highlight">
                            <span>Yêu cầu</span>
                            <strong>{job.experienceLabel}</strong>
                            <small>{job.typeLabel}</small>
                          </div>
                        </div>

                        <p className="job-summary">{job.summary}</p>

                        <div className="job-tags">
                          {job.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>

                        <div className="job-footer">
                          <div className="job-footer-info">
                            <small>Đăng tuyển từ {formatDate(job.postedAt)}</small>
                            <strong>Hạn nộp {formatDate(job.deadline)}</strong>
                          </div>
                          <div className="job-actions">
                            <a className="btn btn-primary" href={`/viec-lam/${slugify(job.title)}/${job.id}`}>
                              Xem và ứng tuyển
                            </a>
                          </div>
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
                    Trang trước
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
                <div className="panel panel-tips">
                  <h3>Dễ dùng nhanh</h3>
                  <div className="panel-list">
                    <div>
                      <strong>1. Tìm theo chức danh</strong>
                      <p>Ví dụ: Java, QC, kho vận, bảo trì.</p>
                    </div>
                    <div>
                      <strong>2. Lọc thêm 1-2 tiêu chí</strong>
                      <p>Ưu tiên khu vực và mức lương để không bỏ sót việc tốt.</p>
                    </div>
                    <div>
                      <strong>3. Lưu tin để so sánh</strong>
                      <p>Bấm Lưu tin ở card việc làm để quay lại nhanh.</p>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <h3>Tin đã lưu ({savedJobList.length})</h3>
                  {savedJobList.length === 0 && <p>Bạn chưa lưu tin nào. Bấm Lưu tin để đánh dấu việc quan tâm.</p>}
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
                  <h3>Doanh nghiệp nổi bật</h3>
                  {homeData.topCompanies.map((company) => (
                    <article key={company.id} className="company-item">
                      <div className="logo-fallback">{getInitials(company.name)}</div>
                      <div>
                        <strong>{company.name}</strong>
                        <p>
                          {company.field} | {company.location}
                        </p>
                        <small>{company.openJobs} vị trí đang tuyển</small>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="panel quote-panel">
                  <h3>Phản hồi từ đối tác</h3>
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
          <div className="container section-shell">
            <div className="section-heading">
              <p>Hành trình ứng viên</p>
              <h2>Quy trình ứng tuyển nhẹ nhàng và dễ theo dõi</h2>
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

        <CvTemplateSection templates={homeData.cvTemplates} onOpenTemplate={openCvModal} />

        <section className="services" id="services">
          <div className="container section-shell">
            <div className="section-heading">
              <p>Giải pháp cho doanh nghiệp</p>
              <h2>Dịch vụ tuyển dụng rõ ràng và thân thiện cho doanh nghiệp</h2>
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
            <h4>Kết nối</h4>
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
            aria-label="Chi tiết việc làm"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeJobModal} aria-label="Đóng">
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
                  <h4>I. THÔNG TIN CHUNG</h4>
                  <ul>
                    <li><strong>Mức lương:</strong> {selectedJob.salaryLabel}</li>
                    <li><strong>Địa điểm làm việc:</strong> {selectedJob.location} - {selectedJob.district}</li>
                    <li><strong>Hình thức làm việc:</strong> {selectedJob.typeLabel}</li>
                  </ul>
                </article>

                <article>
                  <h4>II. MÔ TẢ CÔNG VIỆC</h4>
                  <div className="summary-text">
                    {selectedJob.summary.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </article>

                <article>
                  <h4>III. YÊU CẦU CÔNG VIỆC</h4>
                  <ul>
                    {selectedJob.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h4>IV. QUYỀN LỢI</h4>
                  <ul>
                    {selectedJob.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h4>V. CÁCH THỨC ỨNG TUYỂN</h4>
                  <p>Hoàn thiện form đăng ký bên cạnh để gửi hồ sơ trực tiếp đến bộ phận tuyển dụng của chúng tôi.</p>
                </article>
              </div>

              <form id="quick-apply" className="apply-form" onSubmit={handleSubmitApplication}>
                <h4>Ứng tuyển nhanh</h4>
                <p>Nhập thông tin để gửi hồ sơ đến bộ phận tuyển dụng.</p>

                <label htmlFor="fullName">Họ và tên *</label>
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

                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  id="phone"
                  type="tel"
                  value={applyForm.phone}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                />

                <label htmlFor="cvFile">Tải CV từ máy tính</label>
                <input
                  ref={cvFileInputRef}
                  id="cvFile"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, cvFile: event.target.files?.[0] || null }))}
                />
                <p className="file-hint">
                  {applyForm.cvFile ? `Đã chọn: ${applyForm.cvFile.name}` : 'Chọn file PDF, DOC hoặc DOCX từ máy tính.'}
                </p>

                <label htmlFor="message">Ghi chú thêm</label>
                <textarea
                  id="message"
                  rows="4"
                  value={applyForm.message}
                  onChange={(event) => setApplyForm((prev) => ({ ...prev, message: event.target.value }))}
                />

                <button type="submit" className="btn btn-primary" disabled={applying}>
                  {applying ? 'Đang gửi...' : 'Gửi hồ sơ'}
                </button>

                {applyFeedback.message && (
                  <p className={`apply-feedback ${applyFeedback.type}`}>{applyFeedback.message}</p>
                )}
              </form>
            </div>
          </section>
        </div>
      )}

      {selectedCvTemplate && selectedCvDraft && (
        <CvEditorModal
          template={selectedCvTemplate}
          draft={selectedCvDraft}
          onClose={closeCvModal}
          onReset={() => resetCvDraft(selectedCvTemplate.id)}
          onUpdateField={(field, value) => updateCvDraftField(selectedCvTemplate.id, field, value)}
          onUpdateListItem={(field, index, value) => updateCvDraftListItem(selectedCvTemplate.id, field, index, value)}
          onAddListItem={(field, value) => addCvDraftListItem(selectedCvTemplate.id, field, value)}
          onRemoveListItem={(field, index) => removeCvDraftListItem(selectedCvTemplate.id, field, index)}
          onUpdateStat={(index, key, value) => updateCvDraftStat(selectedCvTemplate.id, index, key, value)}
          onAddStat={() => addCvDraftStat(selectedCvTemplate.id)}
          onRemoveStat={(index) => removeCvDraftStat(selectedCvTemplate.id, index)}
        />
      )}
    </div>
  );
}

export default HomePage;
