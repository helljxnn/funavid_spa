import { Link } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';

function TopNavbar() {
  
  const user = {
    initials: 'JD', // Iniciales del usuario (puedes obtenerlas del nombre)
    avatarColor: '#4285F4', // Color para el avatar, personalizable
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí puedes agregar la lógica real de logout (limpiar token, redirigir, etc.)
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Título o espacio para branding */}
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>

      {/* Perfil y Logout */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full text-white font-medium"
            style={{ backgroundColor: user.avatarColor }}
            title="Seleccionar avatar"
          >
            {user.initials}
          </div>
          {/* Aquí podrías agregar un dropdown para seleccionar avatares */}
        </div>

        {/* Botón de Cerrar Sesión */}
        <Link
          to="/login"
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-[#EA4335] hover:text-white transition-colors"
        >
          <MdExitToApp className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </Link>
      </div>
    </header>
  );
}

export default TopNavbar;