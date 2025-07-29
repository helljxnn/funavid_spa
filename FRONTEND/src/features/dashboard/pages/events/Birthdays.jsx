import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
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

  useEffect(() => {
    setBirthdays(mockBirthdays);
  }, []);

  const indexOfLastBirthday = currentPage * birthdaysPerPage;
  const indexOfFirstBirthday = indexOfLastBirthday - birthdaysPerPage;
  const currentBirthdays = birthdays.slice(indexOfFirstBirthday, indexOfLastBirthday);

  const totalPages = Math.ceil(birthdays.length / birthdaysPerPage);

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

  const handleCreateBirthday = () => {
    showCreateConfirmation('Cumpleaños');
  };

  const handleViewBirthday = (birthday) => {
    showViewDetails(birthday.name, {
      Fecha: birthday.birthDate,
      Edad: birthday.age,
      Estado: birthday.status,
    });
  };

  const handleEditBirthday = (birthday) => {
    showEditConfirmation('Cumpleaños', birthday.name);
  };

  const handleDeleteBirthday = (birthdayId, birthdayName) => {
    showDeleteConfirmation('Cumpleaños', birthdayName, () => {
      const updatedBirthdays = birthdays.filter((birthday) => birthday.id !== birthdayId);
      setBirthdays(updatedBirthdays);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Cumpleaños</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateBirthday}
        >
          Crear Cumpleaños
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
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
                        birthday.status === 'Celebrado'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#FBBC05]/20 text-[#FBBC05]'
                      }`}
                    >
                      {birthday.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewBirthday(birthday)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditBirthday(birthday)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
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