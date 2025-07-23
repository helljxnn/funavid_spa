import React, { useState, useEffect } from 'react';

// Datos mockeados para donaciones
const mockDonations = [
  { id: 1, donorName: 'Juan Pérez', amount: 100, date: '2025-07-01', status: 'Completada' },
  { id: 2, donorName: 'María Gómez', amount: 250, date: '2025-07-02', status: 'Pendiente' },
  { id: 3, donorName: 'Carlos López', amount: 500, date: '2025-07-03', status: 'Completada' },
  { id: 4, donorName: 'Ana Martínez', amount: 150, date: '2025-07-04', status: 'Completada' },
  { id: 5, donorName: 'Luis Rodríguez', amount: 300, date: '2025-07-05', status: 'Pendiente' },
  { id: 6, donorName: 'Sofía Torres', amount: 200, date: '2025-07-06', status: 'Completada' },
  { id: 7, donorName: 'Pedro Sánchez', amount: 400, date: '2025-07-07', status: 'Pendiente' },
  { id: 8, donorName: 'Laura Fernández', amount: 120, date: '2025-07-08', status: 'Completada' },
];

export const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(6); // Máximo 6 registros por página

  // Simulación de carga de datos
  useEffect(() => {
    setDonations(mockDonations);
  }, []);

  // Calcular los índices de las donaciones a mostrar
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(donations.length / donationsPerPage);

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
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Donaciones</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
        >
          Crear Donación
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Donante</th>
              <th className="py-3 px-4 text-left font-semibold">Monto</th>
              <th className="py-3 px-4 text-left font-semibold">Fecha</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentDonations.length > 0 ? (
              currentDonations.map((donation) => (
                <tr key={donation.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{donation.id}</td>
                  <td className="py-3 px-4 text-gray-700">{donation.donorName}</td>
                  <td className="py-3 px-4 text-gray-700">${donation.amount}</td>
                  <td className="py-3 px-4 text-gray-700">{donation.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === 'Completada'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {donation.status}
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
                  No hay donaciones disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstDonation + 1} -{' '}
          {indexOfLastDonation > donations.length ? donations.length : indexOfLastDonation} de{' '}
          {donations.length} donaciones
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