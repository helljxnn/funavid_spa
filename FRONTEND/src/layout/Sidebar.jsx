import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdShoppingCart,
  MdInsertChart,
  MdExitToApp,
} from 'react-icons/md';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: MdDashboard },
    { name: 'Usuarios', path: '/users', icon: MdPeople },
    { name: 'Productos', path: '/products', icon: MdShoppingCart },
    { name: 'Reportes', path: '/reports', icon: MdInsertChart },
    { name: 'Configuración', path: '/settings', icon: MdSettings },
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 w-64 space-y-2 py-6 px-4 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-semibold text-[#4285F4]">AdminPanel</h1>
      </div>

      {/* Navegación */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-[#4285F4] text-white' 
                : 'text-gray-600 hover:bg-gray-100' 
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Separador */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Logout */}
      <div className="mt-auto">
        <Link
          to="/login"
          onClick={() => console.log('Simulando logout...')}
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#EA4335] hover:text-white transition-colors"
        >
          <MdExitToApp className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;