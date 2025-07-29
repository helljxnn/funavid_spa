import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para tipos de donaciones
const mockDonationsTypes = [
  { id: 1, name: 'Efectivo', description: 'Donaciones en dinero', status: 'Activo' },
  { id: 2, name: 'Ropa', description: 'Ropa en buen estado', status: 'Inactivo' },
  { id: 3, name: 'Medicamentos', description: 'Medicamentos no vencidos', status: 'Activo' },
];

export const DonationsTypes = () => {
  const [donationTypes, setDonationTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [typesPerPage] = useState(6);

  useEffect(() => {
    setDonationTypes(mockDonationsTypes);
  }, []);

  const indexOfLastType = currentPage * typesPerPage;
  const indexOfFirstType = indexOfLastType - typesPerPage;
  const currentTypes = donationTypes.slice(indexOfFirstType, indexOfLastType);

  const totalPages = Math.ceil(donationTypes.length / typesPerPage);

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

  const handleCreateDonationType = () => {
    showCreateConfirmation('Tipo de Donación');
  };

  const handleViewDonationType = (donationType) => {
    showViewDetails(donationType.name, {
      Descripción: donationType.description,
      Estado: donationType.status,
    });
  };

  const handleEditDonationType = (donationType) => {
    showEditConfirmation('Tipo de Donación', donationType.name);
  };

  const handleDeleteDonationType = (donationTypeId, donationTypeName) => {
    showDeleteConfirmation('Tipo de Donación', donationTypeName, () => {
      const updatedTypes = donationTypes.filter((type) => type.id !== donationTypeId);
      setDonationTypes(updatedTypes);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Tipos de Donaciones</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateDonationType}
        >
          Crear Tipo de Donación
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Descripción</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentTypes.length > 0 ? (
              currentTypes.map((donationType) => (
                <tr key={donationType.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{donationType.id}</td>
                  <td className="py-3 px-4 text-gray-700">{donationType.name}</td>
                  <td className="py-3 px-4 text-gray-700">{donationType.description}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donationType.status === 'Activo'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {donationType.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewDonationType(donationType)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditDonationType(donationType)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteDonationType(donationType.id, donationType.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                  No hay tipos de donaciones disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstType + 1} -{' '}
          {indexOfLastType > donationTypes.length ? donationTypes.length : indexOfLastType} de{' '}
          {donationTypes.length} tipos
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