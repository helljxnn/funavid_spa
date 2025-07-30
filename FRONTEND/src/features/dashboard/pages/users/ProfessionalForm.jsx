import React, { useState, useEffect } from 'react';

const ProfessionalForm = ({ onClose, professional }) => {
  const [activePanel, setActivePanel] = useState('basicInfo');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    lastName: '',
    documentType: '',
    document: '',
    phone: '',
    address: '',
    gender: '',
    profession: '',
    specialty: '',
    email: '',
    status: 'Activo',
    experiences: [{ description: '', years: '' }],
    certificate: [],
    education: '',
    professionalCard: [],
    availability: {
      days: [],
      startTime: '',
      endTime: '',
      capacity: '',
      notes: ''
    },
    photo: [],
  });
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({ certificate: [], professionalCard: [], photo: [] });

  useEffect(() => {
    if (professional) {
      setFormData({
        id: professional.id,
        name: professional.name || '',
        lastName: professional.lastName || '',
        documentType: professional.documentType || '',
        document: professional.document || '',
        phone: professional.phone || '',
        address: professional.address || '',
        gender: professional.gender || '',
        profession: professional.profession || '',
        specialty: professional.specialty || '',
        email: professional.email || '',
        status: professional.status || 'Activo',
        experiences: professional.experiences || [{ description: '', years: '' }],
        certificate: professional.certificate || [],
        education: professional.education || '',
        professionalCard: professional.professionalCard || [],
        availability: {
          days: professional.availability?.days || [],
          startTime: professional.availability?.startTime || '',
          endTime: professional.availability?.endTime || '',
          capacity: professional.availability?.capacity || '',
          notes: professional.availability?.notes || ''
        },
        photo: professional.photo || [],
      });
      setUploadedFiles({
        certificate: professional.certificate || [],
        professionalCard: professional.professionalCard || [],
        photo: professional.photo || [],
      });
    }
  }, [professional]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!formData.documentType) newErrors.documentType = 'El tipo de documento es requerido';
    if (!formData.document.trim()) newErrors.document = 'El documento es requerido';
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe contener entre 7 y 15 dígitos';
    }
    if (!formData.profession.trim()) newErrors.profession = 'La profesión es requerida';
    if (!formData.specialty.trim()) newErrors.specialty = 'La especialidad es requerida';
    
    // Validar experiencias
    formData.experiences.forEach((exp, index) => {
      if (!exp.description.trim()) {
        newErrors[`experience-${index}`] = 'La descripción de experiencia es requerida';
      }
    });
    
    if (!formData.education.trim()) newErrors.education = 'La descripción de estudios es requerida';
    if (formData.availability.days.length === 0) newErrors.availabilityDays = 'Seleccione al menos un día disponible';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, [name]: fileArray }));
      setUploadedFiles((prev) => ({ ...prev, [name]: fileArray.map((file) => file.name) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][field] = value;
    setFormData({ ...formData, experiences: updatedExperiences });
    setErrors((prev) => ({ ...prev, [`experience-${index}`]: '' }));
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { description: '', years: '' }]
    });
  };

  const removeExperience = (index) => {
    const updatedExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const handleAvailabilityChange = (field, value) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [field]: value
      }
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    handleAvailabilityChange(
      'days',
      checked
        ? [...formData.availability.days, value]
        : formData.availability.days.filter((day) => day !== value)
    );
  };

  const removeFile = (name, fileName) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].filter((file) => file.name !== fileName),
    }));
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: prev[name].filter((file) => file !== fileName),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onClose(formData);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl relative mt-10 mb-10">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={handleCancel}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {professional ? 'Editar Profesional' : 'Crear Nuevo Profesional'}
        </h2>

        <div className="border-b mb-6">
          <ul className="flex space-x-6">
            {['basicInfo', 'experience', 'education', 'documents', 'availability'].map((tab) => (
              <li key={tab}>
                <button
                  className={`py-2 px-4 font-medium transition-colors duration-200 ${
                    activePanel === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActivePanel(tab)}
                >
                  {{
                    basicInfo: 'Información Básica',
                    experience: 'Experiencia',
                    education: 'Estudios',
                    documents: 'Documentos',
                    availability: 'Disponibilidad',
                  }[tab]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activePanel === 'basicInfo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
              <Input label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
              <Select
                label="Tipo de Documento"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                options={['CC', 'TI', 'CE', 'PA']}
                error={errors.documentType}
              />
              <Input label="Documento" name="document" value={formData.document} onChange={handleChange} error={errors.document} />
              <Input label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
              <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
              <Select
                label="Sexo"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={['Masculino', 'Femenino', 'Otro']}
              />
              <Input label="Profesión" name="profession" value={formData.profession} onChange={handleChange} error={errors.profession} />
              <Input label="Especialidad" name="specialty" value={formData.specialty} onChange={handleChange} error={errors.specialty} />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
              <FileInput label="Foto(s)" name="photo" onChange={handleChange} multiple uploadedFiles={uploadedFiles.photo} removeFile={removeFile} />
              <div className="md:col-span-2">
                <Select
                  label="Estado"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={['Activo', 'Inactivo']}
                />
              </div>
            </div>
          )}

          {activePanel === 'experience' && (
            <>
              {formData.experiences.map((exp, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Experiencia {index + 1}</h3>
                    {formData.experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                  <Textarea
                    label="Descripción de Experiencia"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    error={errors[`experience-${index}`]}
                  />
                  <Input
                    label="Años de Experiencia"
                    type="number"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                + Añadir otra experiencia
              </button>
              <FileInput
                label="Certificados/Diplomas"
                name="certificate"
                onChange={handleChange}
                multiple
                uploadedFiles={uploadedFiles.certificate}
                removeFile={removeFile}
                accept="image/*,.pdf,.doc,.docx"
              />
            </>
          )}

          {activePanel === 'education' && (
            <>
              <Textarea
                label="Descripción de Estudios"
                name="education"
                value={formData.education}
                onChange={handleChange}
                error={errors.education}
              />
            </>
          )}

          {activePanel === 'documents' && (
            <FileInput
              label="Documentos"
              name="professionalCard"
              onChange={handleChange}
              multiple
              uploadedFiles={uploadedFiles.professionalCard}
              removeFile={removeFile}
              accept="image/*,.pdf,.doc,.docx"
            />
          )}

          {activePanel === 'availability' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Días Disponibles</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.availability.days.includes(day)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
                {errors.availabilityDays && <p className="text-red-500 text-sm mt-1">{errors.availabilityDays}</p>}
              </div>
              <Input
                label="Hora de Inicio"
                type="time"
                value={formData.availability.startTime}
                onChange={(e) => handleAvailabilityChange('startTime', e.target.value)}
              />
              <Input
                label="Hora de Fin"
                type="time"
                value={formData.availability.endTime}
                onChange={(e) => handleAvailabilityChange('endTime', e.target.value)}
              />
              <Input
                label="Capacidad de Atención (citas/día)"
                type="number"
                value={formData.availability.capacity}
                onChange={(e) => handleAvailabilityChange('capacity', e.target.value)}
              />
              <Textarea
                label="Notas Adicionales"
                value={formData.availability.notes}
                onChange={(e) => handleAvailabilityChange('notes', e.target.value)}
              />
            </>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
            >
              {professional ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 h-11 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Textarea = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 h-32 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Select = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 h-11 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      required
    >
      <option value="">Seleccione...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FileInput = ({ label, name, onChange, multiple, uploadedFiles, removeFile, accept }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      accept={accept}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      multiple={multiple}
    />
    {uploadedFiles.length > 0 && (
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700">Archivos subidos:</p>
        <ul className="list-disc pl-5">
          {uploadedFiles.map((fileName, index) => (
            <li key={index} className="flex justify-between items-center text-sm text-gray-600">
              {fileName}
              <button
                type="button"
                onClick={() => removeFile(name, fileName)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProfessionalForm;