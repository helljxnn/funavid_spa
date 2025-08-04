import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
} from '../../../../shared/utils/alerts';

// Datos mockeados para donaciones y tipos de donaciones
const mockDonations = [
  { id: 1, amount: 500, date: '2025-07-01', donor: 'Ana Martínez', status: 'Verificado', typeId: 1 },
  { id: 2, amount: 300, date: '2025-07-15', donor: 'Pedro Sánchez', status: 'Pendiente', typeId: 2 },
  { id: 3, amount: 1000, date: '2025-07-20', donor: 'Laura Gómez', status: 'Verificado', typeId: 3 },
];
const mockDonationTypes = [
  { id: 1, name: 'Efectivo', description: 'Donaciones en dinero', status: 'Activo' },
  { id: 2, name: 'Ropa', description: 'Ropa en buen estado', status: 'Inactivo' },
  { id: 3, name: 'Medicamentos', description: 'Medicamentos no vencidos', status: 'Activo' },
];

export const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [donationTypes, setDonationTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  useEffect(() => {
    setDonations(mockDonations);
    setDonationTypes(mockDonationTypes);
  }, []);

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateDonation = () => {
    setSelectedDonation(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditDonation = (donation) => {
    setSelectedDonation(donation);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteDonation = (donationId, donorName) => {
    showDeleteConfirmation('Donación', donorName, () => {
      const updatedDonations = donations.filter((donation) => donation.id !== donationId);
      setDonations(updatedDonations);
    });
  };

  const closeModal = (updatedDonation = null) => {
    setShowModal(false);
    if (updatedDonation) {
      const updatedDonations = donations.map((d) =>
        d.id === updatedDonation.id ? updatedDonation : d
      );
      setDonations(updatedDonations);
    } else if (modalMode === 'create' && updatedDonation) {
      const newDonation = { id: donations.length + 1, ...updatedDonation };
      setDonations([...donations, newDonation]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Donaciones</h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateDonation}
        >
          Crear Donación
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {modalMode === 'create' && 'Crear Nueva Donación'}
              {modalMode === 'edit' && 'Editar Donación'}
              {modalMode === 'view' && 'Detalles de la Donación'}
            </h2>
            {modalMode !== 'view' ? (
              <form onSubmit={(e) => { e.preventDefault(); closeModal({ ...selectedDonation, ...formData }); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donante</label>
                  <input
                    type="text"
                    name="donor"
                    defaultValue={selectedDonation?.donor || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, donor: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={selectedDonation?.amount || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={selectedDonation?.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Donación</label>
                  <select
                    name="typeId"
                    defaultValue={selectedDonation?.typeId || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, typeId: parseInt(e.target.value) }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    {donationTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="status"
                    defaultValue={selectedDonation?.status || 'Pendiente'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Verificado">Verificado</option>
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
                <p><strong>Donante:</strong> {selectedDonation.donor}</p>
                <p><strong>Monto:</strong> ${selectedDonation.amount}</p>
                <p><strong>Fecha:</strong> {selectedDonation.date}</p>
                <p><strong>Tipo:</strong> {donationTypes.find(type => type.id === selectedDonation.typeId)?.name || 'N/A'}</p>
                <p><strong>Estado:</strong> {selectedDonation.status}</p>
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
              <th className="py-3 px-4 text-left font-semibold">Donante</th>
              <th className="py-3 px-4 text-left font-semibold">Monto</th>
              <th className="py-3 px-4 text-left font-semibold">Fecha</th>
              <th className="py-3 px-4 text-left font-semibold">Tipo</th>
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
                  <td className="py-3 px-4 text-gray-700">{donationTypes.find(type => type.id === donation.typeId)?.name || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === 'Verificado' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white font-medium py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                      onClick={() => handleViewDonation(donation)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditDonation(donation)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
                      onClick={() => handleDeleteDonation(donation.id, donation.donor)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
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