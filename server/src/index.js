const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const homeData = require('./homeData');

const app = express();
const PORT = Number(process.env.PORT || 5050);
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 20;
const applicationStore = [];

app.use(cors());
app.use(express.json());

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

const getFilteredJobs = (query) => {
  const keyword = normalizeText(query.keyword);
  const location = normalizeText(query.location);
  const type = normalizeText(query.type);
  const experience = normalizeText(query.experience);
  const salaryMin = Number(query.salaryMin) || 0;
  const sort = String(query.sort || 'newest');
  const page = Math.floor(parsePositiveNumber(query.page, 1));
  const rawPageSize = Math.floor(parsePositiveNumber(query.pageSize, DEFAULT_PAGE_SIZE));
  const pageSize = Math.min(Math.max(rawPageSize, 1), MAX_PAGE_SIZE);

  const filtered = homeData.jobs.filter((job) => {
    const matchesKeyword =
      keyword.length === 0 ||
      normalizeText(
        [job.title, job.company, job.location, job.district, ...(job.tags || []), job.summary].join(' ')
      ).includes(keyword);

    const matchesLocation = location.length === 0 || normalizeText(job.location) === location;
    const matchesType = type.length === 0 || normalizeText(job.type) === type;
    const matchesExperience = experience.length === 0 || normalizeText(job.experience) === experience;
    const matchesSalary = salaryMin <= 0 || Number(job.salaryMax) >= salaryMin;

    return matchesKeyword && matchesLocation && matchesType && matchesExperience && matchesSalary;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'salary_desc') {
      return b.salaryMax - a.salaryMax;
    }
    if (sort === 'salary_asc') {
      return a.salaryMin - b.salaryMin;
    }
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return {
    items,
    total,
    page: safePage,
    pageSize,
    totalPages,
    filters: homeData.jobFilters
  };
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'viec3mien-server' });
});

app.get('/api/home-data', (_req, res) => {
  res.json(homeData);
});

app.get('/api/jobs', (req, res) => {
  res.json(getFilteredJobs(req.query));
});

app.get('/api/jobs/:jobId', (req, res) => {
  const job = homeData.jobs.find((item) => item.id === req.params.jobId);
  if (!job) {
    res.status(404).json({ message: 'Khong tim thay viec lam.' });
    return;
  }
  res.json(job);
});

app.post('/api/applications', (req, res) => {
  const { jobId, fullName, email, phone, cvLink = '', message = '' } = req.body || {};
  const trimmedName = String(fullName || '').trim();
  const trimmedEmail = String(email || '').trim();
  const trimmedPhone = String(phone || '').trim();

  if (!jobId || !trimmedName || !trimmedEmail || !trimmedPhone) {
    res.status(400).json({ message: 'Vui long nhap day du thong tin bat buoc.' });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    res.status(400).json({ message: 'Email khong hop le.' });
    return;
  }

  const job = homeData.jobs.find((item) => item.id === jobId);
  if (!job) {
    res.status(404).json({ message: 'Khong tim thay viec lam can ung tuyen.' });
    return;
  }

  const application = {
    id: `app-${Date.now()}-${applicationStore.length + 1}`,
    jobId,
    jobTitle: job.title,
    fullName: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
    cvLink: String(cvLink || '').trim(),
    message: String(message || '').trim(),
    submittedAt: new Date().toISOString()
  };

  applicationStore.unshift(application);

  res.status(201).json({
    success: true,
    message: 'Ung tuyen thanh cong. Bo phan tuyen dung se lien he som.',
    applicationId: application.id,
    submittedAt: application.submittedAt
  });
});

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      next();
      return;
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('Viec3mien API is running. Build client first to serve frontend from Node server.');
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
