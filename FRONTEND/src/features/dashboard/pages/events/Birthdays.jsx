import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
} from '../../../../shared/utils/alerts';

// Datos mockeados para cumpleaños
const mockBirthdays = [
  { id: 1, name: 'Juan Pérez', birthDate: '2017-03-12', age: 8, status: 'Próximo' },
  { id: 2, name: 'María Gómez', birthDate: '2016-09-25', age: 8, status: 'Celebrado' },
  { id: 3, name: 'Carlos López', birthDate: '2018-01-15', age: 7, status: 'Próximo' },
];

export const Birthdays = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [birthdaysPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  useEffect(() => {
    setBirthdays(mockBirthdays);
  }, []);

  const indexOfLastBirthday = currentPage * birthdaysPerPage;
  const indexOfFirstBirthday = indexOfLastBirthday - birthdaysPerPage;
  const currentBirthdays = birthdays.slice(indexOfFirstBirthday, indexOfLastBirthday);

  const totalPages = Math.ceil(birthdays.length / birthdaysPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateBirthday = () => {
    setSelectedBirthday(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleViewBirthday = (birthday) => {
    setSelectedBirthday(birthday);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditBirthday = (birthday) => {
    setSelectedBirthday(birthday);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteBirthday = (birthdayId, birthdayName) => {
    showDeleteConfirmation('Cumpleaños', birthdayName, () => {
      const updatedBirthdays = birthdays.filter((birthday) => birthday.id !== birthdayId);
      setBirthdays(updatedBirthdays);
    });
  };

  const closeModal = (updatedBirthday = null) => {
    setShowModal(false);
    if (updatedBirthday) {
      const updatedBirthdays = birthdays.map((b) =>
        b.id === updatedBirthday.id ? updatedBirthday : b
      );
      setBirthdays(updatedBirthdays);
    } else if (modalMode === 'create' && updatedBirthday) {
      const newBirthday = { id: birthdays.length + 1, ...updatedBirthday };
      setBirthdays([...birthdays, newBirthday]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Cumpleaños</h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateBirthday}
        >
          Crear Cumpleaños
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {modalMode === 'create' && 'Crear Nuevo Cumpleaños'}
              {modalMode === 'edit' && 'Editar Cumpleaños'}
              {modalMode === 'view' && 'Detalles del Cumpleaños'}
            </h2>
            {modalMode !== 'view' ? (
              <form onSubmit={(e) => { e.preventDefault(); closeModal({ ...selectedBirthday, ...formData }); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedBirthday?.name || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="birthDate"
                    defaultValue={selectedBirthday?.birthDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <input
                    type="number"
                    name="age"
                    defaultValue={selectedBirthday?.age || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="status"
                    defaultValue={selectedBirthday?.status || 'Próximo'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="Próximo">Próximo</option>
                    <option value="Celebrado">Celebrado</option>
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
                <p><strong>Nombre:</strong> {selectedBirthday.name}</p>
                <p><strong>Fecha de Nacimiento:</strong> {selectedBirthday.birthDate}</p>
                <p><strong>Edad:</strong> {selectedBirthday.age}</p>
                <p><strong>Estado:</strong> {selectedBirthday.status}</p>
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
              <th className="py-3 px-4 text-left font-semibold">Fecha de Nacimiento</th>
              <th className="py-3 px-4 text-left font-semibold">Edad</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentBirthdays.length > 0 ? (
              currentBirthdays.map((birthday) => (
                <tr key={birthday.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{birthday.id}</td>
                  <td className="py-3 px-4 text-gray-700">{birthday.name}</td>
                  <td className="py-3 px-4 text-gray-700">{birthday.birthDate}</td>
                  <td className="py-3 px-4 text-gray-700">{birthday.age}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        birthday.status === 'Celebrado' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {birthday.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white font-medium py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                      onClick={() => handleViewBirthday(birthday)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditBirthday(birthday)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
                      onClick={() => handleDeleteBirthday(birthday.id, birthday.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay cumpleaños disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstBirthday + 1} -{' '}
          {indexOfLastBirthday > birthdays.length ? birthdays.length : indexOfLastBirthday} de{' '}
          {birthdays.length} cumpleaños
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