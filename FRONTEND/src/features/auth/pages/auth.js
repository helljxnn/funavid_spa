const TOKEN_KEY = 'user_token'; // Clave para guardar el token en localStorage

// Simula una llamada a API de login
export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') { // Credenciales de ejemplo
        const token = 'fake-jwt-token-for-user-123'; // Token de ejemplo
        localStorage.setItem(TOKEN_KEY, token);
        resolve({ token, username });
      } else {
        reject('Credenciales inválidas. Intenta con "user" y "password".');
      }
    }, 1000); // Simula un retraso de red
  });
};

// Obtiene el token del localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Elimina el token del localStorage (para el logout)
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};