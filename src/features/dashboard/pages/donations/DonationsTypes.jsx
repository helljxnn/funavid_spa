import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
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
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  useEffect(() => {
    setDonationTypes(mockDonationsTypes);
  }, []);

  const indexOfLastType = currentPage * typesPerPage;
  const indexOfFirstType = indexOfLastType - typesPerPage;
  const currentTypes = donationTypes.slice(indexOfFirstType, indexOfLastType);

  const totalPages = Math.ceil(donationTypes.length / typesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateDonationType = () => {
    setSelectedType(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleViewDonationType = (donationType) => {
    setSelectedType(donationType);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditDonationType = (donationType) => {
    setSelectedType(donationType);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteDonationType = (donationTypeId, donationTypeName) => {
    showDeleteConfirmation('Tipo de Donación', donationTypeName, () => {
      const updatedTypes = donationTypes.filter((type) => type.id !== donationTypeId);
      setDonationTypes(updatedTypes);
    });
  };

  const closeModal = (updatedType = null) => {
    setShowModal(false);
    if (updatedType) {
      const updatedTypes = donationTypes.map((t) =>
        t.id === updatedType.id ? updatedType : t
      );
      setDonationTypes(updatedTypes);
    } else if (modalMode === 'create' && updatedType) {
      const newType = { id: donationTypes.length + 1, ...updatedType };
      setDonationTypes([...donationTypes, newType]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Tipos de Donaciones</h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateDonationType}
        >
          Crear Tipo de Donación
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {modalMode === 'create' && 'Crear Nuevo Tipo de Donación'}
              {modalMode === 'edit' && 'Editar Tipo de Donación'}
              {modalMode === 'view' && 'Detalles del Tipo de Donación'}
            </h2>
            {modalMode !== 'view' ? (
              <form onSubmit={(e) => { e.preventDefault(); closeModal({ ...selectedType, ...formData }); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedType?.name || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={selectedType?.description || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="status"
                    defaultValue={selectedType?.status || 'Activo'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
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
                <p><strong>Nombre:</strong> {selectedType.name}</p>
                <p><strong>Descripción:</strong> {selectedType.description}</p>
                <p><strong>Estado:</strong> {selectedType.status}</p>
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
                        donationType.status === 'Activo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {donationType.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white font-medium py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                      onClick={() => handleViewDonationType(donationType)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditDonationType(donationType)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
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