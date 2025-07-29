import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para profesionales
const mockProfessionals = [
  { id: 1, name: 'Dr. Javier Morales', specialty: 'Oncólogo', email: 'javier.morales@example.com', status: 'Activo' },
  { id: 2, name: 'Dra. Carla Sánchez', specialty: 'Pediatra', email: 'carla.sanchez@example.com', status: 'Inactivo' },
  { id: 3, name: 'Dr. Pablo Ruiz', specialty: 'Psicólogo', email: 'pablo.ruiz@example.com', status: 'Activo' },
];

export const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [professionalsPerPage] = useState(6);

  useEffect(() => {
    setProfessionals(mockProfessionals);
  }, []);

  const indexOfLastProfessional = currentPage * professionalsPerPage;
  const indexOfFirstProfessional = indexOfLastProfessional - professionalsPerPage;
  const currentProfessionals = professionals.slice(indexOfFirstProfessional, indexOfLastProfessional);

  const totalPages = Math.ceil(professionals.length / professionalsPerPage);

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

  const handleCreateProfessional = () => {
    showCreateConfirmation('Profesional');
  };

  const handleViewProfessional = (professional) => {
    showViewDetails(professional.name, {
      Especialidad: professional.specialty,
      Email: professional.email,
      Estado: professional.status,
    });
  };

  const handleEditProfessional = (professional) => {
    showEditConfirmation('Profesional', professional.name);
  };

  const handleDeleteProfessional = (professionalId, professionalName) => {
    showDeleteConfirmation('Profesional', professionalName, () => {
      const updatedProfessionals = professionals.filter((professional) => professional.id !== professionalId);
      setProfessionals(updatedProfessionals);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Profesionales</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateProfessional}
        >
          Crear Profesional
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Especialidad</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProfessionals.length > 0 ? (
              currentProfessionals.map((professional) => (
                <tr key={professional.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{professional.id}</td>
                  <td className="py-3 px-4 text-gray-700">{professional.name}</td>
                  <td className="py-3 px-4 text-gray-700">{professional.specialty}</td>
                  <td className="py-3 px-4 text-gray-700">{professional.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        professional.status === 'Activo'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {professional.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewProfessional(professional)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditProfessional(professional)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteProfessional(professional.id, professional.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay profesionales disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstProfessional + 1} -{' '}
          {indexOfLastProfessional > professionals.length ? professionals.length : indexOfLastProfessional} de{' '}
          {professionals.length} profesionales
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