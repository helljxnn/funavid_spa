import React from 'react';

function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Panel Principal</h1>
      <p className="text-gray-700 text-lg">Bienvenido a tu Dashboard. Aquí podrás ver un resumen de tu información.</p>
      {/* Aquí podrías añadir tarjetas, gráficos, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Estadísticas Rápidas</h2>
          <p>Datos importantes del día.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Actividad Reciente</h2>
          <p>Últimos movimientos.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
          <p>Mensajes importantes.</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;