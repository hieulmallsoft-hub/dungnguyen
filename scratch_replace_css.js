const fs = require('fs');
const path = 'c:/Users/Admin/Downloads/cvweb/dungnguyen/client/src/App.css';
let css = fs.readFileSync(path, 'utf8');

const replacements = {
  // CSS Variables
  '--ink: #35161b': '--ink: #0f172a',
  '--ink-soft: #7a565b': '--ink-soft: #64748b',
  '--surface: #fffbfb': '--surface: #ffffff',
  '--surface-muted: #fff1f2': '--surface-muted: #f8fafc',
  '--border: #f1d5d9': '--border: #e2e8f0',
  '--primary: #c62839': '--primary: #2563eb',
  '--primary-deep: #8e1524': '--primary-deep: #1d4ed8',
  '--accent: #ef7b84': '--accent: #3b82f6',
  '--accent-deep: #d6515d': '--accent-deep: #2563eb',
  '--shadow-soft: 0 14px 32px rgba(95, 18, 31, 0.12)': '--shadow-soft: 0 14px 32px rgba(15, 23, 42, 0.08)',
  '--shadow-strong: 0 18px 44px rgba(75, 14, 26, 0.22)': '--shadow-strong: 0 18px 44px rgba(15, 23, 42, 0.12)',

  // Gradients and rgb values
  'rgba(198, 40, 57': 'rgba(37, 99, 235',
  'rgba(239, 123, 132': 'rgba(59, 130, 246',
  '#fff8f8': '#f8fafc',
  '#fff1f2': '#f1f5f9',
  '#fff7f7': '#f8fafc',
  '#fffbfb': '#ffffff',
  'rgba(255, 247, 247': 'rgba(255, 255, 255',
  'rgba(241, 213, 217': 'rgba(226, 232, 240',
  '#782731': '#475569',
  '#842533': '#334155',
  '#8e1524': '#1d4ed8',
  '#7c313b': '#475569',
  '#b03544': '#2563eb',
  '#7c1e2c': '#1e293b',
  '#6f4a50': '#64748b',
  '#704c51': '#64748b',
  'rgba(95, 18, 31': 'rgba(15, 23, 42',
  'rgba(63, 11, 21': 'rgba(15, 23, 42',
  '#971b2c': '#1e293b',
  '#b02a38': '#2563eb',
  '#74545a': '#64748b',
  '#8b2431': '#1e40af',
  '#fff1f3': '#eff6ff',
  '#71343d': '#334155',
  '#856166': '#64748b',
  '#fff2f4': '#f1f5f9',
  '#f0c5c5': '#fca5a5',
  '#8f3333': '#b91c1c',
  '#ffe6e9': '#dbeafe',
  '#d63b4d': '#ef4444',
  '#b11d31': '#b91c1c',
  '#a11929': '#1d4ed8',
  'rgba(43, 9, 15': 'rgba(15, 23, 42',
  'rgba(113, 20, 34': 'rgba(30, 64, 175',
  '#721f29': '#1e3a8a',
  '#fffefe': '#ffffff',
  'rgba(255, 241, 243': 'rgba(241, 245, 249',
  'rgba(255, 236, 239': 'rgba(226, 232, 240',
  'rgba(255, 226, 230': 'rgba(203, 213, 225',
  'rgba(255, 247, 248': 'rgba(255, 255, 255',
  'rgba(255, 248, 248': 'rgba(255, 255, 255',
  '#c62839': '#2563eb',
  '#ef7b84': '#3b82f6',
  'rgba(255, 253, 253': 'rgba(255, 255, 255',
  '#991b2c': '#1d4ed8',
  '#e52e42': '#3b82f6',
  '#ffebed': '#eff6ff',
  '#fdced4': '#bfdbfe',
  '#fcedf0': '#eff6ff',
  '#fad5d9': '#bfdbfe',
  '#881c2a': '#1e3a8a',
  '#be1f31': '#2563eb',
  '#f8d9db': '#dbeafe',
  '#731c26': '#1e3a8a',
  '#e22336': '#2563eb'
};

for (const [key, value] of Object.entries(replacements)) {
  css = css.split(key).join(value);
}

// Ensure remaining hardcoded reds are removed
css = css.replace(/rgba\(198,\s*40,\s*57/g, 'rgba(37, 99, 235');
css = css.replace(/rgba\(239,\s*123,\s*132/g, 'rgba(59, 130, 246');
css = css.replace(/#c62839/ig, '#2563eb');
css = css.replace(/#8e1524/ig, '#1d4ed8');

fs.writeFileSync(path, css);
console.log('CSS updated successfully!');
