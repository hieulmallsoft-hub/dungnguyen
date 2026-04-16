import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getAuthSession } from '../data/authStorage';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = getAuthSession();

  return (
    <div className="admin-shell px-4 py-4 lg:px-5 lg:py-5">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1680px] gap-5 lg:grid-cols-[300px,1fr]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="min-w-0">
          <Topbar session={session} onToggleSidebar={() => setSidebarOpen((current) => !current)} />
          <main className="space-y-6 pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
