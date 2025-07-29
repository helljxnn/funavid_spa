import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para historias de beneficiarios
const mockBeneficiariesStories = [
  { id: 1, name: 'Juan Pérez', title: 'Mi lucha contra la leucemia', date: '2025-07-10', status: 'Publicado' },
  { id: 2, name: 'María Gómez', title: 'Un nuevo comienzo', date: '2025-07-15', status: 'Borrador' },
  { id: 3, name: 'Carlos López', title: 'Esperanza en cada paso', date: '2025-07-20', status: 'Publicado' },
];

export const BeneficiariesStories = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(6);

  useEffect(() => {
    setStories(mockBeneficiariesStories);
  }, []);

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  const totalPages = Math.ceil(stories.length / storiesPerPage);

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

  const handleCreateStory = () => {
    showCreateConfirmation('Historia');
  };

  const handleViewStory = (story) => {
    showViewDetails(story.title, {
      Beneficiario: story.name,
      Fecha: story.date,
      Estado: story.status,
    });
  };

  const handleEditStory = (story) => {
    showEditConfirmation('Historia', story.title);
  };

  const handleDeleteStory = (storyId, storyTitle) => {
    showDeleteConfirmation('Historia', storyTitle, () => {
      const updatedStories = stories.filter((story) => story.id !== storyId);
      setStories(updatedStories);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Historias de Beneficiarios</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateStory}
        >
          Crear Historia
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-[#4285F4] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Beneficiario</th>
              <th className="py-3 px-4 text-left font-semibold">Título</th>
              <th className="py-3 px-4 text-left font-semibold">Fecha</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentStories.length > 0 ? (
              currentStories.map((story) => (
                <tr key={story.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{story.id}</td>
                  <td className="py-3 px-4 text-gray-700">{story.name}</td>
                  <td className="py-3 px-4 text-gray-700">{story.title}</td>
                  <td className="py-3 px-4 text-gray-700">{story.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        story.status === 'Publicado'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#FBBC05]/20 text-[#FBBC05]'
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewStory(story)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditStory(story)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteStory(story.id, story.title)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay historias disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstStory + 1} -{' '}
          {indexOfLastStory > stories.length ? stories.length : indexOfLastStory} de{' '}
          {stories.length} historias
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