import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../data/apiBase';
import { clearAuthSession, getAuthSession, isAdminSession, setAuthSession } from '../../data/authStorage';

function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@shginvestment.vn');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const from = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    document.title = 'Đăng nhập quản trị | SHG INVESTMENT';
  }, []);

  if (isAdminSession(getAuthSession())) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || 'Không thể đăng nhập.');
      }

      if (payload?.user?.role !== 'ADMIN') {
        clearAuthSession();
        throw new Error('Tài khoản này không có quyền quản trị.');
      }

      setAuthSession(payload);
      navigate(from, { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Không thể đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-shell grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-panel">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember-600">SHG INVESTMENT</p>
        <h1 className="mt-3 font-display text-3xl text-slate-950">Đăng nhập quản trị</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Dùng tài khoản admin để vào trung tâm điều hành.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              className="admin-input mt-2 w-full"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Mật khẩu</span>
            <input
              className="admin-input mt-2 w-full"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          ) : null}

          <button className="admin-btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLoginPage;
