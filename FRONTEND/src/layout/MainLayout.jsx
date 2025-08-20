import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* TopNavbar */}
        <TopNavbar />

        {/* Contenido */}
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

