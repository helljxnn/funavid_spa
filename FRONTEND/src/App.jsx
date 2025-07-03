import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { getToken, logoutUser } from './features/auth/pages/auth'; // Para el ejemplo de logout

// Componente de ejemplo para la página principal
const HomePage = () => {
  const token = getToken(); // Verifica si hay un token
  const handleLogout = () => {
    logoutUser();
    window.location.reload(); // Recarga la página para reflejar el estado de logout
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a tu Aplicación</h1>
      {token ? (
        <>
          <p className="text-xl mb-4">¡Has iniciado sesión exitosamente!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <p className="text-xl">Por favor, <Link to="/login" className="text-blue-500 hover:underline">inicia sesión</Link> para continuar.</p>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        {/* Aquí puedes añadir más rutas protegidas o públicas */}
      </Routes>
    </Router>
  );
}

export default App;