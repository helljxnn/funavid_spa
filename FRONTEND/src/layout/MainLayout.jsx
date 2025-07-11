import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Fijo */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* TopNavbar */}
        <TopNavbar />

        {/* Contenido */}
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;