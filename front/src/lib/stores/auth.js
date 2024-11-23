import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

// Estado para verificar si el usuario está autenticado
export const isAuthenticated = writable(!!Cookies.get('token'));
// Estado para almacenar los datos del usuario autenticado
export const usuario = writable(null);


/**
 * Función para establecer el estado de autenticación.
 * @param {boolean} status - `true` si el usuario está autenticado, `false` de lo contrario.
 */
export function setAuthStatus(status) {
    if (!status) {
        clearUsuario(); // Si el usuario no está autenticado, limpia los datos.
    } else {
        isAuthenticated.set(true);
    }
}

/**
 * Función para establecer los datos del usuario autenticado.
 * @param {Object} user - Objeto que contiene los datos del usuario.
 */
export function setUsuario(user) {
    if (user) {
        usuario.set(user); // Actualiza el estado del usuario.
    } else {
        clearUsuario(); // Limpia los datos si no se proporciona un usuario válido.
    }
}

/**
 * Función para limpiar los datos del usuario y el estado de autenticación.
 */
export function clearUsuario() {
    // Comprueba si el código se está ejecutando en el cliente
    if (typeof window !== 'undefined') {
        Cookies.remove('token', { path: '/' }); // Elimina el token solo en el cliente
    }
    usuario.set(null); // Limpia los datos del usuario
    isAuthenticated.set(false); // Marca al usuario como no autenticado
}

/**
 * Función para recuperar el token desde las cookies.
 * @returns {string|null} - El token almacenado o `null` si no existe.
 */
export function getToken() {
    return Cookies.get('token') || null;
}

/**
 * Función para establecer el token en las cookies.
 * @param {string} token - El token a almacenar.
 */
export function setToken(token) {
    if (token) {
        Cookies.set('token', token, { path: '/', expires: 1 }); // Almacena el token por 1 día.
        isAuthenticated.set(true); // Marca al usuario como autenticado.
    } else {
        clearUsuario(); // Limpia los datos si no se proporciona un token válido.
    }
}