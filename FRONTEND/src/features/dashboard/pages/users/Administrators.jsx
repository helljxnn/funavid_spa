import React, { useState } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
} from '../../../../shared/utils/alerts';

// Datos iniciales quemados con todos los campos
const initialAdministrators = [
  { id: 1, name: 'Ana Torres', role: 'Gerente', email: 'ana.torres@example.com', status: 'Activo', address: 'Calle 1', phone: '555-0101', gender: 'Femenino' },
  { id: 2, name: 'Luis Fernández', role: 'Asistente', email: 'luis.fernandez@example.com', status: 'Inactivo', address: 'Avenida 2', phone: '555-0202', gender: 'Masculino' },
  { id: 3, name: 'Sofía Ramírez', role: 'Coordinadora', email: 'sofia.ramirez@example.com', status: 'Activo', address: 'Carrera 3', phone: '555-0303', gender: 'Femenino' },
];

export const Administrators = () => {
  const [administrators, setAdministrators] = useState(initialAdministrators);
  const [currentPage, setCurrentPage] = useState(1);
  const [administratorsPerPage] = useState(6);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    role: 'Administrativo',
  });

  const indexOfLastAdministrator = currentPage * administratorsPerPage;
  const indexOfFirstAdministrator = indexOfLastAdministrator - administratorsPerPage;
  const currentAdministrators = administrators.slice(indexOfFirstAdministrator, indexOfLastAdministrator);

  const totalPages = Math.ceil(administrators.length / administratorsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateAdministrator = () => setShowCreateModal(true);

  const handleViewAdministrator = (administrator) => {
    setSelectedAdmin(administrator);
    setShowViewModal(true);
  };

  const handleEditAdministrator = (administrator) => {
    setSelectedAdmin(administrator);
    setFormData({
      name: administrator.name.split(' ')[0],
      lastName: administrator.name.split(' ')[1] || '',
      address: administrator.address || '',
      phone: administrator.phone || '',
      gender: administrator.gender || '',
      role: administrator.role,
    });
    setShowEditModal(true);
  };

  const handleDeleteAdministrator = (administratorId, administratorName) => {
    setSelectedAdmin({ id: administratorId, name: administratorName });
    setShowDeleteModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    showCreateConfirmation('Administrador').then((result) => {
      if (result.isConfirmed) {
        const newAdministrator = {
          id: administrators.length + 1,
          name: `${formData.name} ${formData.lastName}`,
          role: formData.role,
          email: '',
          status: 'Activo',
          address: formData.address,
          phone: formData.phone,
          gender: formData.gender,
        };
        setAdministrators([...administrators, newAdministrator]);
        setShowCreateModal(false);
        setFormData({ name: '', lastName: '', address: '', phone: '', gender: '', role: 'Administrativo' });
      }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    showEditConfirmation('Administrador', `${formData.name} ${formData.lastName}`).then((result) => {
      if (result.isConfirmed) {
        const updatedAdministrators = administrators.map((admin) =>
          admin.id === selectedAdmin.id
            ? {
              ...admin,
              name: `${formData.name} ${formData.lastName}`,
              role: formData.role,
              address: formData.address,
              phone: formData.phone,
              gender: formData.gender,
            }
            : admin
        );
        setAdministrators(updatedAdministrators);
        setShowEditModal(false);
        setFormData({ name: '', lastName: '', address: '', phone: '', gender: '', role: 'Administrativo' });
      }
    });
  };

  const handleDeleteConfirm = () => {
    showDeleteConfirmation('Administrador', selectedAdmin.name, () => {
      const updatedAdministrators = administrators.filter((admin) => admin.id !== selectedAdmin.id);
      setAdministrators(updatedAdministrators);
      setShowDeleteModal(false);
    });
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setFormData({ name: '', lastName: '', address: '', phone: '', gender: '', role: 'Administrativo' });
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

      {/* Modal de Creación */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-[#4285F4] mb-6">Crear Nuevo Administrador</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight appearance-none"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight appearance-none"
                  required
                >
                  <option value="Administrativo">Administrativo</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Asistente">Asistente</option>
                  <option value="Coordinadora">Coordinadora</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#34A853] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Ver */}
      {showViewModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-[#4285F4] mb-6">Detalles del Administrador</h2>
            <div className="space-y-4">
              <p><span className="font-medium text-gray-700">Nombre:</span> {selectedAdmin.name}</p>
              <p><span className="font-medium text-gray-700">Rol:</span> {selectedAdmin.role}</p>
              <p><span className="font-medium text-gray-700">Email:</span> {selectedAdmin.email}</p>
              <p><span className="font-medium text-gray-700">Estado:</span> {selectedAdmin.status}</p>
              <p><span className="font-medium text-gray-700">Dirección:</span> {selectedAdmin.address}</p>
              <p><span className="font-medium text-gray-700">Teléfono:</span> {selectedAdmin.phone}</p>
              <p><span className="font-medium text-gray-700">Género:</span> {selectedAdmin.gender}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-[#4285F4] text-white font-medium py-2 px-5 rounded-lg hover:bg-[#3A78D6] transition duration-200 shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-[#4285F4] mb-6">Editar Administrador</h2>
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight appearance-none"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 leading-tight appearance-none"
                  required
                >
                  <option value="Administrativo">Administrativo</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Asistente">Asistente</option>
                  <option value="Coordinadora">Coordinadora</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#FBBC05] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#E3A704] transition duration-200 shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-[#4285F4] mb-6">Eliminar Administrador</h2>
            <p className="text-gray-600 mb-6">¿Estás seguro de eliminar a <strong>{selectedAdmin.name}</strong>? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#EA4335] text-white font-medium py-2 px-5 rounded-lg hover:bg-[#D13B2F] transition duration-200 shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
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
                      className="bg-[#4285F4] text-white font-medium py-2 px-3 rounded-lg hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewAdministrator(administrator)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-2 px-3 rounded-lg hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditAdministrator(administrator)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-2 px-3 rounded-lg hover:bg-[#D13B2F] transition duration-200 shadow-sm"
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

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
        <div className="text-gray-700">
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