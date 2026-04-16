import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const CompaniesPage = lazy(() => import('./pages/admin/CompaniesPage'));
const JobsPage = lazy(() => import('./pages/admin/JobsPage'));
const ApplicationsPage = lazy(() => import('./pages/admin/ApplicationsPage'));
const ReportsPage = lazy(() => import('./pages/admin/ReportsPage'));
const CategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage'));
const HomePage = lazy(() => import('./pages/public/HomePage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-sand-50 text-sm font-semibold text-slate-500">Đang tải giao diện...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
