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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/*Formulario*/}
      <div className="w-full md:w-1/3 lg:w-1/4 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-xs md:max-w-sm">
          <div className="sm:mx-auto sm:w-full text-center">
            <img className="mx-auto h-40 w-auto" src={logo} alt="Logo"/>
            {/* <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Bienvenido
            </h2>
            <p className="mt-1 text-sm text-gray-600">Ingresa a tu cuenta</p> */}
          </div>

          <div className="mt-6">
            <div className="bg-white py-6 px-4 shadow-sm rounded-lg sm:px-6">
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </div>

      {/* Imagen*/}
      <div className="hidden md:flex md:w-2/3 lg:w-3/4 relative bg-gray-200">
        <img src={loginBackground} alt="Background" className="absolute inset-0 h-full w-full object-cover"/>
      </div>
    </div>
  );
};