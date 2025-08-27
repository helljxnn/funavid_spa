import Swal from "sweetalert2";

// Colores personalizados para mantener consistencia con el diseño
const colors = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};

// Alerta genérica para confirmación de creación
export const showCreateConfirmation = (entity, onConfirm) => {
  Swal.fire({
    title: `Crear ${entity}`,
    text: `¿Deseas registrar un nuevo ${entity.toLowerCase()}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: colors.green,
    cancelButtonColor: colors.red,
    confirmButtonText: "Sí, crear",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Creado!",
        text: `El ${entity.toLowerCase()} ha sido creado (simulación).`,
        icon: "success",
        confirmButtonColor: colors.green,
      });
      if (onConfirm) onConfirm();
    }
  });
};

// Alerta genérica para visualización de detalles
export const showViewDetails = (entity, data) => {
  const details = Object.entries(data)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");
  Swal.fire({
    title: `Detalles de ${entity}`,
    html: details,
    icon: "info",
    confirmButtonColor: colors.blue,
    confirmButtonText: "Cerrar",
  });
};

// Alerta genérica para confirmación de edición
export const showEditConfirmation = (entity, name, onConfirm) => {
  Swal.fire({
    title: `Editar ${entity}`,
    text: `¿Deseas editar ${entity.toLowerCase()} ${name}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: colors.yellow,
    cancelButtonColor: colors.red,
    confirmButtonText: "Sí, editar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Editado!",
        text: `${entity} ${name} ha sido actualizado (simulación).`,
        icon: "success",
        confirmButtonColor: colors.yellow,
      });
      if (onConfirm) onConfirm();
    }
  });
};

// Alerta genérica para confirmación de eliminación
export const showDeleteConfirmation = (entity, name, onConfirm) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Deseas eliminar ${entity.toLowerCase()} ${name}? Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: colors.red,
    cancelButtonColor: colors.green,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Eliminado!",
        text: `${entity} ${name} ha sido eliminado.`,
        icon: "success",
        confirmButtonColor: colors.green,
      });
      if (onConfirm) onConfirm();
    }
  });
};
