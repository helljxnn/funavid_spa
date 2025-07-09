
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { getToken } from './features/auth/pages/auth';
import MainLayout from './layout/MainLayout';
import DashboardPage from './features/dashboard/pages/DashboardPage';

// Componentes de ejemplo para otras páginas del Dashboard (sin cambios)
const UsersPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Página de Usuarios</h1><p>Aquí se listarán los usuarios.</p></div>;
const ProductsPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Página de Productos</h1><p>Aquí se gestionarán los productos.</p></div>;
const ReportsPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Página de Reportes</h1><p>Aquí se mostrarán los reportes.</p></div>;
const SettingsPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Página de Configuración</h1><p>Aquí se configurará la aplicación.</p></div>;

// Componente de Ruta Protegida (sin cambios)
const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/*
          Nueva lógica para la ruta raíz ("/"):
          Si hay un token, redirige al dashboard.
          Si no hay token, muestra la página de login.
        */}
        <Route
          path="/"
          element={getToken() ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* La ruta explícita para el login, en caso de que alguien navegue directamente a /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Grupo de rutas protegidas que usarán el MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout /> {/* El MainLayout envolverá todas estas rutas */}
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas dentro del MainLayout */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<div className="text-center mt-20 text-2xl font-bold text-gray-700">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;