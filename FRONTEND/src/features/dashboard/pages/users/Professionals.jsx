import React, { useState } from 'react';
import {
  showEditConfirmation,
  showDeleteConfirmation,
} from '../../../../shared/utils/alerts';
import ProfessionalForm from './ProfessionalForm';

// Datos mockeados para profesionales
const mockProfessionals = [
  { id: 1, name: 'Dr. Javier Morales', specialty: 'Oncólogo', status: 'Activo', experience: '10 años en oncología', education: 'Médico Especialista', hasDocuments: true, availability: 'Lunes a Viernes', certificate: [], professionalCard: [], photo: [] },
  { id: 2, name: 'Dra. Carla Sánchez', specialty: 'Pediatra', status: 'Inactivo', experience: '8 años en pediatría', education: 'Médico General', hasDocuments: false, availability: 'Miércoles y Viernes', certificate: [], professionalCard: [], photo: [] },
  { id: 3, name: 'Dr. Pablo Ruiz', specialty: 'Psicólogo', status: 'Activo', experience: '15 años en psicología', education: 'Psicología Clínica', hasDocuments: true, availability: 'Lunes a Jueves', certificate: [], professionalCard: [], photo: [] },
];

export const Professionals = () => {
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [currentPage, setCurrentPage] = useState(1);
  const [professionalsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const indexOfLastProfessional = currentPage * professionalsPerPage;
  const indexOfFirstProfessional = indexOfLastProfessional - professionalsPerPage;
  const currentProfessionals = professionals.slice(indexOfFirstProfessional, indexOfLastProfessional);

  const totalPages = Math.ceil(professionals.length / professionalsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateProfessional = () => {
    setShowForm(true);
    setSelectedProfessional(null); // Resetea para crear nuevo
  };

  const handleEditProfessional = (professional) => {
    setSelectedProfessional(professional);
    setShowForm(true);
  };

  const handleDeleteProfessional = (professionalId, professionalName) => {
    showDeleteConfirmation('Profesional', professionalName, () => {
      const updatedProfessionals = professionals.filter((professional) => professional.id !== professionalId);
      setProfessionals(updatedProfessionals);
    });
  };

  const closeForm = (updatedProfessional = null) => {
    setShowForm(false);
    setSelectedProfessional(null);
    if (updatedProfessional) {
      const updatedProfessionals = professionals.map((p) =>
        p.id === updatedProfessional.id ? { ...updatedProfessional, hasDocuments: !!updatedProfessional.professionalCard.length } : p
      );
      setProfessionals(updatedProfessionals);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Profesionales</h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateProfessional}
        >
          Crear Profesional
        </button>
      </div>

      {showForm && <ProfessionalForm onClose={closeForm} professional={selectedProfessional} />}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Especialidad</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Experiencia</th>
              <th className="py-3 px-4 text-left font-semibold">Estudios</th>
              <th className="py-3 px-4 text-left font-semibold">Documentos</th>
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
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        professional.status === 'Activo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {professional.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{professional.experience}</td>
                  <td className="py-3 px-4 text-gray-700">{professional.education}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${professional.hasDocuments ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {professional.hasDocuments ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditProfessional(professional)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
                      onClick={() => handleDeleteProfessional(professional.id, professional.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-3 px-4 text-center text-gray-500">
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
              currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
                currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};