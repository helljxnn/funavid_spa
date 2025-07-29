import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para administradores
const mockAdministrators = [
  { id: 1, name: 'Ana Torres', role: 'Gerente', email: 'ana.torres@example.com', status: 'Activo' },
  { id: 2, name: 'Luis Fernández', role: 'Asistente', email: 'luis.fernandez@example.com', status: 'Inactivo' },
  { id: 3, name: 'Sofía Ramírez', role: 'Coordinadora', email: 'sofia.ramirez@example.com', status: 'Activo' },
];

export const Administrators = () => {
  const [administrators, setAdministrators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [administratorsPerPage] = useState(6);

  useEffect(() => {
    setAdministrators(mockAdministrators);
  }, []);

  const indexOfLastAdministrator = currentPage * administratorsPerPage;
  const indexOfFirstAdministrator = indexOfLastAdministrator - administratorsPerPage;
  const currentAdministrators = administrators.slice(indexOfFirstAdministrator, indexOfLastAdministrator);

  const totalPages = Math.ceil(administrators.length / administratorsPerPage);

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

  const handleCreateAdministrator = () => {
    showCreateConfirmation('Administrador');
  };

  const handleViewAdministrator = (administrator) => {
    showViewDetails(administrator.name, {
      Rol: administrator.role,
      Email: administrator.email,
      Estado: administrator.status,
    });
  };

  const handleEditAdministrator = (administrator) => {
    showEditConfirmation('Administrador', administrator.name);
  };

  const handleDeleteAdministrator = (administratorId, administratorName) => {
    showDeleteConfirmation('Administrador', administratorName, () => {
      const updatedAdministrators = administrators.filter((administrator) => administrator.id !== administratorId);
      setAdministrators(updatedAdministrators);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Administradores</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateAdministrator}
        >
          Crear Administrador
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Rol</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentAdministrators.length > 0 ? (
              currentAdministrators.map((administrator) => (
                <tr key={administrator.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{administrator.id}</td>
                  <td className="py-3 px-4 text-gray-700">{administrator.name}</td>
                  <td className="py-3 px-4 text-gray-700">{administrator.role}</td>
                  <td className="py-3 px-4 text-gray-700">{administrator.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        administrator.status === 'Activo'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {administrator.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewAdministrator(administrator)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditAdministrator(administrator)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteAdministrator(administrator.id, administrator.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay administradores disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstAdministrator + 1} -{' '}
          {indexOfLastAdministrator > administrators.length ? administrators.length : indexOfLastAdministrator} de{' '}
          {administrators.length} administradores
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