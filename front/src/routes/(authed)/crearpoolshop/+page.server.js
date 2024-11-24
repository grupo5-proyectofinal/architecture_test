import { redirect } from '@sveltejs/kit';

// Función para obtener categorías
async function obtenerCategories(fetch) {
    const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/categories/');
    const data = await response.json();
    return data; // Devuelve los datos directamente
}

// Función para validar el token
async function validartoken(fetch, token) {
    try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/validate-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.toString() }),
        });

        if (!response.ok) {
            throw new Error('Token inválido o expirado');
        }
        return true;
    } catch (error) {
        console.error('Error en la validación del token:', error.message);
        return false; // Retorna false en caso de error
    }
}

// Función load para manejar la carga de datos y redirección si es necesario
export async function load({ fetch, cookies }) {
    const token = cookies.get('token'); // Obtiene el token de las cookies

    // Valida el token
    const isValid = await validartoken(fetch, token);

    if (!isValid) {
        throw redirect(302, '/login'); // Redirige a /login si el token no es válido
    }

    // Obtiene las categorías si el token es válido
    const categories = await obtenerCategories(fetch);

    return {
        message: 'Token válido, carga de datos completa',
        categories, // Devuelve las categorías junto con la carga
    };
}