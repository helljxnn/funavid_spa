import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from "../../../shared/utils/alerts";

// Datos mockeados para empleados
const mockEmployees = [
  { id: 1, name: 'Elena Vargas', role: 'Gerente', email: 'elena.vargas@example.com', status: 'Activo' },
  { id: 2, name: 'Miguel Díaz', role: 'Asistente', email: 'miguel.diaz@example.com', status: 'Inactivo' },
  { id: 3, name: 'Lucía Ramírez', role: 'Contadora', email: 'lucia.ramirez@example.com', status: 'Activo' },
  { id: 4, name: 'Jorge Castillo', role: 'Analista', email: 'jorge.castillo@example.com', status: 'Activo' },
  { id: 5, name: 'Carmen Ruiz', role: 'Recepcionista', email: 'carmen.ruiz@example.com', status: 'Inactivo' },
  { id: 6, name: 'Andrés Morales', role: 'Desarrollador', email: 'andres.morales@example.com', status: 'Activo' },
  { id: 7, name: 'Patricia Luna', role: 'Coordinadora', email: 'patricia.luna@example.com', status: 'Inactivo' },
  { id: 8, name: 'Raúl Gómez', role: 'Soporte', email: 'raul.gomeez@example.com', status: 'Activo' },
];

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6); // Máximo 6 registros por página

  // Simulación de carga de datos
  useEffect(() => {
    setEmployees(mockEmployees);
  }, []);

  // Calcular los índices de los empleados a mostrar
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Funciones para cambiar de página
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

  // Funciones para manejar las alertas
  const handleCreateEmployee = () => {
    showCreateConfirmation('Empleado');
  };

  const handleViewEmployee = (employee) => {
    showViewDetails(employee.name, {
      Rol: employee.role,
      Email: employee.email,
      Estado: employee.status,
    });
  };

  const handleEditEmployee = (employee) => {
    showEditConfirmation('Empleado', employee.name);
  };

  const handleDeleteEmployee = (employeeId, employeeName) => {
    showDeleteConfirmation('Empleado', employeeName, () => {
      const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
      setEmployees(updatedEmployees);
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Título y botón de Crear */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4285F4]">Lista de Empleados</h1>
        <button
          className="bg-[#34A853] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E964A] transition duration-200 shadow-md"
          onClick={handleCreateEmployee}
        >
          Crear Empleado
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
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
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-gray-700">{employee.id}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.name}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.role}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        employee.status === 'Activo'
                          ? 'bg-[#34A853]/20 text-[#34A853]'
                          : 'bg-[#EA4335]/20 text-[#EA4335]'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-[#4285F4] text-white font-medium py-1 px-3 rounded-md hover:bg-[#3A78D6] transition duration-200 shadow-sm"
                      onClick={() => handleViewEmployee(employee)}
                    >
                      Ver
                    </button>
                    <button
                      className="bg-[#FBBC05] text-white font-medium py-1 px-3 rounded-md hover:bg-[#E3A704] transition duration-200 shadow-sm"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-[#EA4335] text-white font-medium py-1 px-3 rounded-md hover:bg-[#D13B2F] transition duration-200 shadow-sm"
                      onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No hay empleados disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Mostrando {indexOfFirstEmployee + 1} -{' '}
          {indexOfLastEmployee > employees.length ? employees.length : indexOfLastEmployee} de{' '}
          {employees.length} empleados
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