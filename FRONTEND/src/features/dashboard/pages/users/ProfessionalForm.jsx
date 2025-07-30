import React, { useState, useEffect } from 'react';

const ProfessionalForm = ({ onClose, professional }) => {
  const [activePanel, setActivePanel] = useState('basicInfo');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    lastName: '',
    specialty: '',
    email: '',
    status: 'Activo',
    experience: '',
    certificate: [],
    education: '',
    professionalCard: [],
    availability: '',
    photo: [],
  });

  useEffect(() => {
    if (professional) {
      setFormData({
        id: professional.id,
        name: professional.name || '',
        lastName: professional.lastName || '',
        specialty: professional.specialty || '',
        email: professional.email || '',
        status: professional.status || 'Activo',
        experience: professional.experience || '',
        certificate: professional.certificate || [],
        education: professional.education || '',
        professionalCard: professional.professionalCard || [],
        availability: professional.availability || '',
        photo: professional.photo || [],
      });
    } else {
      setFormData({
        id: null,
        name: '',
        lastName: '',
        specialty: '',
        email: '',
        status: 'Activo',
        experience: '',
        certificate: [],
        education: '',
        professionalCard: [],
        availability: '',
        photo: [],
      });
    }
  }, [professional]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{professional ? 'Editar Profesional' : 'Crear Nuevo Profesional'}</h2>

      {/* Pestañas para los paneles */}
      <div className="border-b mb-6">
        <ul className="flex space-x-6">
          <li>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activePanel === 'basicInfo' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActivePanel('basicInfo')}
            >
              Información Básica
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activePanel === 'experience' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActivePanel('experience')}
            >
              Experiencia
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activePanel === 'education' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActivePanel('education')}
            >
              Estudios
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activePanel === 'documents' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActivePanel('documents')}
            >
              Documentos
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activePanel === 'availability' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActivePanel('availability')}
            >
              Disponibilidad
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido de los paneles */}
      <div className="space-y-6">
        {activePanel === 'basicInfo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        )}

        {activePanel === 'experience' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de Experiencia</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificado(s)</label>
              <input
                type="file"
                name="certificate"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                multiple
                required
              />
            </div>
          </div>
        )}

        {activePanel === 'education' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de Estudios</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
        )}

        {activePanel === 'documents' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Documentos</label>
              <input
                type="file"
                name="professionalCard"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                multiple
                required
              />
            </div>
          </div>
        )}

        {activePanel === 'availability' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Días Disponibles</label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto(s)</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                multiple
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
                onClick={handleSubmit}
              >
                {professional ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfessionalForm;