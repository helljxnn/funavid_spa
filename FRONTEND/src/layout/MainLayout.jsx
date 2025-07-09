import Sidebar from './Sidebar';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Fijo */}
      <Sidebar />

      {/* Contenido Principal */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {/* Aquí se renderizarán los componentes de cada página (DashboardPage, UsersPage, etc.) */}
        {children}
      </main>
    </div>
  );
}

export default MainLayout;