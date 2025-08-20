import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
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
  const [showModal, setShowModal] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  useEffect(() => {
    setBeneficiaries(mockBeneficiaries);
  }, []);

  const indexOfLastBeneficiary = currentPage * beneficiariesPerPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
  const currentBeneficiaries = beneficiaries.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);

  const totalPages = Math.ceil(beneficiaries.length / beneficiariesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateBeneficiary = () => {
    setSelectedBeneficiary(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleViewBeneficiary = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditBeneficiary = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteBeneficiary = (beneficiaryId, beneficiaryName) => {
    showDeleteConfirmation('Beneficiario', beneficiaryName, () => {
      const updatedBeneficiaries = beneficiaries.filter((beneficiary) => beneficiary.id !== beneficiaryId);
      setBeneficiaries(updatedBeneficiaries);
    });
  };

  const closeModal = (updatedBeneficiary = null) => {
    setShowModal(false);
    if (updatedBeneficiary) {
      const updatedBeneficiaries = beneficiaries.map((b) =>
        b.id === updatedBeneficiary.id ? updatedBeneficiary : b
      );
      setBeneficiaries(updatedBeneficiaries);
    } else if (modalMode === 'create' && updatedBeneficiary) {
      const newBeneficiary = { id: beneficiaries.length + 1, ...updatedBeneficiary };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Beneficiarios</h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateBeneficiary}
        >
          Crear Beneficiario
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {modalMode === 'create' && 'Crear Nuevo Beneficiario'}
              {modalMode === 'edit' && 'Editar Beneficiario'}
              {modalMode === 'view' && 'Detalles del Beneficiario'}
            </h2>
            {modalMode !== 'view' ? (
              <form onSubmit={(e) => { e.preventDefault(); closeModal({ ...selectedBeneficiary, ...formData }); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedBeneficiary?.name || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <input
                    type="number"
                    name="age"
                    defaultValue={selectedBeneficiary?.age || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                  <input
                    type="text"
                    name="diagnosis"
                    defaultValue={selectedBeneficiary?.diagnosis || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="status"
                    defaultValue={selectedBeneficiary?.status || 'En curso'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="En curso">En curso</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    {modalMode === 'edit' ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p><strong>Nombre:</strong> {selectedBeneficiary.name}</p>
                <p><strong>Edad:</strong> {selectedBeneficiary.age}</p>
                <p><strong>Diagnóstico:</strong> {selectedBeneficiary.diagnosis}</p>
                <p><strong>Estado:</strong> {selectedBeneficiary.status}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => closeModal()}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
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
                        beneficiary.status === 'Completado' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {beneficiary.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white font-medium py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                      onClick={() => handleViewBeneficiary(beneficiary)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditBeneficiary(beneficiary)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
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