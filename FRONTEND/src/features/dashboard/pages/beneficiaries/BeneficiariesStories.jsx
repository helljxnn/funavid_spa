import React, { useState, useEffect } from "react";
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation,
} from "../../../../shared/utils/alerts";

// Datos mockeados para historias de beneficiarios
const mockBeneficiariesStories = [
  {
    id: 1,
    name: "Juan Pérez",
    title: "Mi lucha contra la leucemia",
    date: "2025-07-10",
    status: "Publicado",
  },
  {
    id: 2,
    name: "María Gómez",
    title: "Un nuevo comienzo",
    date: "2025-07-15",
    status: "Borrador",
  },
  {
    id: 3,
    name: "Carlos López",
    title: "Esperanza en cada paso",
    date: "2025-07-20",
    status: "Publicado",
  },
];

export const BeneficiariesStories = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // 'create', 'edit', 'view'

  useEffect(() => {
    setStories(mockBeneficiariesStories);
  }, []);

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateStory = () => {
    setSelectedStory(null);
    setModalMode("create");
    setShowModal(true);
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEditStory = (story) => {
    setSelectedStory(story);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDeleteStory = (storyId, storyTitle) => {
    showDeleteConfirmation("Historia", storyTitle, () => {
      const updatedStories = stories.filter((story) => story.id !== storyId);
      setStories(updatedStories);
    });
  };

  const closeModal = (updatedStory = null) => {
    setShowModal(false);
    if (updatedStory) {
      const updatedStories = stories.map((s) =>
        s.id === updatedStory.id ? updatedStory : s
      );
      setStories(updatedStories);
    } else if (modalMode === "create" && updatedStory) {
      const newStory = {
        id: stories.length + 1,
        ...updatedStory,
        date: new Date().toISOString().split("T")[0],
      };
      setStories([...stories, newStory]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Lista de Historias de Beneficiarios
        </h1>
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleCreateStory}
        >
          Crear Historia
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {modalMode === "create" && "Crear Nueva Historia"}
              {modalMode === "edit" && "Editar Historia"}
              {modalMode === "view" && "Detalles de la Historia"}
            </h2>
            {modalMode !== "view" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  closeModal({ ...selectedStory, ...formData });
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficiario
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedStory?.name || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedStory?.title || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={
                      selectedStory?.date ||
                      new Date().toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedStory?.status || "Borrador"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="Borrador">Borrador</option>
                    <option value="Publicado">Publicado</option>
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
                    {modalMode === "edit" ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p>
                  <strong>Beneficiario:</strong> {selectedStory.name}
                </p>
                <p>
                  <strong>Título:</strong> {selectedStory.title}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedStory.date}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedStory.status}
                </p>
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
              <th className="py-3 px-4 text-left font-semibold">
                Beneficiario
              </th>
              <th className="py-3 px-4 text-left font-semibold">Título</th>
              <th className="py-3 px-4 text-left font-semibold">Fecha</th>
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
              <th className="py-3 px-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentStories.length > 0 ? (
              currentStories.map((story) => (
                <tr
                  key={story.id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 text-gray-700">{story.id}</td>
                  <td className="py-3 px-4 text-gray-700">{story.name}</td>
                  <td className="py-3 px-4 text-gray-700">{story.title}</td>
                  <td className="py-3 px-4 text-gray-700">{story.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        story.status === "Publicado"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white font-medium py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                      onClick={() => handleViewStory(story)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200 shadow-sm"
                      onClick={() => handleEditStory(story)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
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
          Mostrando {indexOfFirstStory + 1} -{" "}
          {indexOfLastStory > stories.length
            ? stories.length
            : indexOfLastStory}{" "}
          de {stories.length} historias
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-md font-medium transition duration-200 shadow-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
