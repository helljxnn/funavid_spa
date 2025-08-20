import React, { useState, useEffect } from 'react';
import {
  showCreateConfirmation,
  showViewDetails,
  showEditConfirmation,
  showDeleteConfirmation
} from '../../../../shared/utils/alerts';

// Datos mockeados para citas médicas
const mockMedicalAppointments = [
  { id: 1, beneficiaryName: 'Juan Pérez', dateTime: '2025-07-30 10:00', professional: 'Dr. Javier Morales', status: 'Programada' },
  { id: 2, beneficiaryName: 'María Gómez', dateTime: '2025-07-31 14:30', professional: 'Dra. Carla Sánchez', status: 'Completada' },
  { id: 3, beneficiaryName: 'Carlos López', dateTime: '2025-08-01 09:15', professional: 'Dr. Pablo Ruiz', status: 'Cancelada' },
];

const getDayOfMonth = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? 0 : date.getDate();
};

const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? 'Invalid' : date.toLocaleString('default', { month: 'long' });
};

const getYear = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? 0 : date.getFullYear();
};

const Calendar = ({ appointments, onCreate, onView, onEdit, onDelete }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
  };

  const getAppointmentsForDay = (day) => {
    const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(appointment => {
      const appointmentDate = appointment.dateTime.split(' ')[0];
      return appointmentDate === fullDate;
    }) || [];
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Calendario de Citas Médicas</h1>
        <button
          className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
          onClick={onCreate}
        >
          Crear Cita Médica
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-500 text-white font-medium py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-sm"
            onClick={handlePrevMonth}
          >
            Anterior
          </button>
          <h2 className="text-xl font-medium text-gray-700">{getMonthName(`${currentYear}-${currentMonth + 1}-01`)} {currentYear}</h2>
          <button
            className="bg-blue-500 text-white font-medium py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-sm"
            onClick={handleNextMonth}
          >
            Siguiente
          </button>
        </div>
        <div className="grid grid-cols-7 gap-3 text-center">
          <div className="font-medium text-gray-600">Dom</div>
          <div className="font-medium text-gray-600">Lun</div>
          <div className="font-medium text-gray-600">Mar</div>
          <div className="font-medium text-gray-600">Mié</div>
          <div className="font-medium text-gray-600">Jue</div>
          <div className="font-medium text-gray-600">Vie</div>
          <div className="font-medium text-gray-600">Sáb</div>
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="border rounded-lg p-2 bg-gray-50"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayAppointments = getAppointmentsForDay(day);
            return (
              <div key={day} className="border rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition duration-150">
                <div className="font-medium text-gray-800">{day}</div>
                {dayAppointments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`text-xs p-1 rounded-lg cursor-pointer ${
                          appointment.status === 'Completada'
                            ? 'bg-green-100 text-green-600'
                            : appointment.status === 'Cancelada'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                        onClick={() => onView(appointment)}
                      >
                        {appointment.beneficiaryName} ({appointment.dateTime.split(' ')[1]})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MedicalAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(mockMedicalAppointments);
  }, []);

  const handleCreateAppointment = () => {
    showCreateConfirmation('Cita Médica');
  };

  const handleViewAppointment = (appointment) => {
    showViewDetails(appointment.beneficiaryName, {
      FechaHora: appointment.dateTime,
      Profesional: appointment.professional,
      Estado: appointment.status,
    });
  };

  const handleEditAppointment = (appointment) => {
    showEditConfirmation('Cita Médica', appointment.beneficiaryName);
  };

  const handleDeleteAppointment = (appointmentId, beneficiaryName) => {
    showDeleteConfirmation('Cita Médica', beneficiaryName, () => {
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
      setAppointments(updatedAppointments);
    });
  };

  return (
    <Calendar
      appointments={appointments}
      onCreate={handleCreateAppointment}
      onView={handleViewAppointment}
      onEdit={handleEditAppointment}
      onDelete={handleDeleteAppointment}
    />
  );
};