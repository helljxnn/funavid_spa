import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { loginUser } from '../pages/auth';
import loginBackground from '../../../assets/login/login-background.png';
import logo from '../../../assets/Logo.png'

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo: blanco */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-xs md:max-w-sm">
          <div className="text-center mb-6">
            <img className="mx-auto h-40 w-auto" src={logo} alt="Logo" />
          </div>
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        </div>
      </div>

      {/* Imagen derecha */}
      <div className="hidden md:flex md:w-2/3 lg:w-3/4 relative">
        <img src={loginBackground} alt="Background" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
};