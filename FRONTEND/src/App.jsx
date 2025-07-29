import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { getToken } from './features/auth/pages/auth';
import { MainLayout } from './layout/MainLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage'
import { Beneficiaries } from './features/dashboard/pages/beneficiaries/Beneficiaries';
import { BeneficiariesStories } from './features/dashboard/pages/beneficiaries/BeneficiariesStories';
import { MedicalAppointments } from './features/dashboard/pages/beneficiaries/MedicalAppointments';
import { Donations } from './features/dashboard/pages/donations/Donations';
import { DonationsTypes } from './features/dashboard/pages/donations/DonationsTypes';
import { Birthdays } from './features/dashboard/pages/events/Birthdays';
import { Events } from './features/dashboard/pages/events/Events';
import { FoundationEvents } from './features/dashboard/pages/events/FoundationEvents';
import { Administrators } from './features/dashboard/pages/users/Administrators';
import { Professionals } from './features/dashboard/pages/users/Professionals';

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
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/beneficiariesstories" element={<BeneficiariesStories/>}/>
          <Route path="/medicalappointments" element={<MedicalAppointments/>}/>
          <Route path="/donations" element={<Donations/>}/>
          <Route path="/donationstypes" element={<DonationsTypes/>}/>
          <Route path="/birthdays" element={<Birthdays/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/foundationevents" element={<FoundationEvents/>}/>
          <Route path="/administrators" element={<Administrators/>}/>
          <Route path="/professionals" element={<Professionals/>}/>

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