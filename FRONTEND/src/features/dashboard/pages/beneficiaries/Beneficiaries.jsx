import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para beneficiarios
const mockBeneficiaries = [
  { id: 1, name: 'Juan Pérez', age: 8, diagnosis: 'Leucemia', status: 'En curso' },
  { id: 2, name: 'María Gómez', age: 10, diagnosis: 'Linfoma', status: 'Completado' },
  { id: 3, name: 'Carlos López', age: 7, diagnosis: 'Tumor cerebral', status: 'En curso' },
];

export const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiariesPerPage] = useState(6);

  useEffect(() => {
    setBeneficiaries(mockBeneficiaries);
  }, []);

  const indexOfLastBeneficiary = currentPage * beneficiariesPerPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
  const currentBeneficiaries = beneficiaries.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);

  const totalPages = Math.ceil(beneficiaries.length / beneficiariesPerPage);

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

  const handleCreateBeneficiary = () => {
    showCreateConfirmation('Beneficiario');
  };

  const handleViewBeneficiary = (beneficiary) => {
    showViewDetails(beneficiary.name, {
      Edad: beneficiary.age,
      Diagnóstico: beneficiary.diagnosis,
      Estado: beneficiary.status,
    });
  };

  const handleEditBeneficiary = (beneficiary) => {
    showEditConfirmation('Beneficiario', beneficiary.name);
  };

  const handleDeleteBeneficiary = (beneficiaryId, beneficiaryName) => {
    showDeleteConfirmation('Beneficiario', beneficiaryName, () => {
      const updatedBeneficiaries = beneficiaries.filter((beneficiary) => beneficiary.id !== beneficiaryId);
      setBeneficiaries(updatedBeneficiaries);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Beneficiarios</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateBeneficiary}
        >
          Crear Beneficiario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Edad</th>
              <th className="py-3 px-4 text-left font-semibold">Diagnóstico</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentBeneficiaries.length > 0 ? (
              currentBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{beneficiary.id}</td>
                  <td className="py-3 px-4 text-gray-700">{beneficiary.name}</td>
                  <td className="py-3 px-4 text-gray-700">{beneficiary.age}</td>
                  <td className="py-3 px-4 text-gray-700">{beneficiary.diagnosis}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        beneficiary.status === 'Completado'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#FBBC05]/20 text-[#FBBC05]'
                      }`}
                    >
                      {beneficiary.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewBeneficiary(beneficiary)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditBeneficiary(beneficiary)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteBeneficiary(beneficiary.id, beneficiary.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay beneficiarios disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstBeneficiary + 1} -{' '}
          {indexOfLastBeneficiary > beneficiaries.length ? beneficiaries.length : indexOfLastBeneficiary} de{' '}
          {beneficiaries.length} beneficiarios
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