export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatCompactNumber = (value) =>
  new Intl.NumberFormat('vi-VN', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(Number(value || 0));

export const formatPercent = (value) => `${Number(value || 0).toFixed(1)}%`;

export const formatCurrencyShort = (value) =>
  new Intl.NumberFormat('vi-VN', {
    notation: 'compact',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1
  }).format(Number(value || 0));

export const formatDate = (value, options = {}) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    ...options
  }).format(date);
};

export const formatDateTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
