import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { getToken } from './features/auth/pages/auth';
import { MainLayout } from './layout/MainLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { Donations } from './features/dashboard/pages/Donations';
import { Employees } from './features/dashboard/pages/Employees';
import { Clients } from './features/dashboard/pages/Clients';

// Componente de Ruta Protegida
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
        {/* Ruta raíz - redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Ruta de login - pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Grupo de rutas protegidas con MainLayout */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          
          <Route index path="/dashboard" element={<DashboardPage />} />
          
          {/* Otras rutas protegidas */}
          <Route path="/donations" element={<Donations />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/clients" element={<Clients />} />
        </Route>

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={
          <div className="text-center mt-20 text-2xl font-bold text-gray-700">
            404 - Página no encontrada
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;