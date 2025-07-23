import React, { useState, useEffect } from 'react';

// Datos mockeados
const mockClients = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '123-456-7890', status: 'Activo' },
  { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', phone: '098-765-4321', status: 'Inactivo' },
  { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', phone: '555-555-5555', status: 'Activo' },
  { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', phone: '111-222-3333', status: 'Activo' },
  { id: 5, name: 'Luis Rodríguez', email: 'luis.rodriguez@example.com', phone: '444-555-6666', status: 'Inactivo' },
  { id: 6, name: 'Sofía Torres', email: 'sofia.torres@example.com', phone: '777-888-9999', status: 'Activo' },
  { id: 7, name: 'Pedro Sánchez', email: 'pedro.sanchez@example.com', phone: '222-333-4444', status: 'Inactivo' },
  { id: 8, name: 'Laura Fernández', email: 'laura.fernandez@example.com', phone: '999-000-1111', status: 'Activo' },
];

// Definir colores personalizados en Tailwind (puedes añadir esto en tailwind.config.js)
const colors = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
};

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(6); // Cambiado a 6 registros por página

  // Simulación de carga de datos
  useEffect(() => {
    setClients(mockClients);
  }, []);

  // Calcular los índices de los clientes a mostrar
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Título y botón de Crear */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Clientes</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
        >
          Crear Cliente
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Teléfono</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{client.id}</td>
                  <td className="py-3 px-4 text-gray-700">{client.name}</td>
                  <td className="py-3 px-4 text-gray-700">{client.email}</td>
                  <td className="py-3 px-4 text-gray-700">{client.phone}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        client.status === 'Activo'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay clientes disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstClient + 1} -{' '}
          {indexOfLastClient > clients.length ? clients.length : indexOfLastClient} de {clients.length}{' '}
          clientes
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#4285F4] text-white hover:bg-[#3A78D6]'
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
                currentPage === page
                  ? 'bg-[#4285F4] text-white'
                  : 'bg-white text-[#4285F4] hover:bg-[#4285F4]/10'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#4285F4] text-white hover:bg-[#3A78D6]'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};  