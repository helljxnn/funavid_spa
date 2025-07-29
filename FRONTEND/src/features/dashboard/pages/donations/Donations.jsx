import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para donaciones
const mockDonations = [
  { id: 1, amount: 500, date: '2025-07-01', donor: 'Ana Martínez', status: 'Verificado' },
  { id: 2, amount: 300, date: '2025-07-15', donor: 'Pedro Sánchez', status: 'Pendiente' },
  { id: 3, amount: 1000, date: '2025-07-20', donor: 'Laura Gómez', status: 'Verificado' },
];

export const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(6);

  useEffect(() => {
    setDonations(mockDonations);
  }, []);

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  const totalPages = Math.ceil(donations.length / donationsPerPage);

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

  const handleCreateDonation = () => {
    showCreateConfirmation('Donación');
  };

  const handleViewDonation = (donation) => {
    showViewDetails(donation.donor, {
      Monto: `$${donation.amount}`,
      Fecha: donation.date,
      Estado: donation.status,
    });
  };

  const handleEditDonation = (donation) => {
    showEditConfirmation('Donación', donation.donor);
  };

  const handleDeleteDonation = (donationId, donorName) => {
    showDeleteConfirmation('Donación', donorName, () => {
      const updatedDonations = donations.filter((donation) => donation.id !== donationId);
      setDonations(updatedDonations);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Donaciones</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateDonation}
        >
          Crear Donación
        </button>
      </div>

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
                  <td className="py-3 px-4 text-gray-700">{donation.donor}</td>
                  <td className="py-3 px-4 text-gray-700">${donation.amount}</td>
                  <td className="py-3 px-4 text-gray-700">{donation.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === 'Verificado'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#FBBC05]/20 text-[#FBBC05]'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewDonation(donation)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditDonation(donation)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteDonation(donation.id, donation.donor)}
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