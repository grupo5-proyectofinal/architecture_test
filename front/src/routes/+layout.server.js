import { redirect } from '@sveltejs/kit';

// Función para validar el token
async function validartoken(fetch, token) {
    try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/validate-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.toString() })
        });

        if (!response.ok) {
            throw new Error('Token inválido o expirado');
        }
        return true;
    } catch (error) {
        console.error('Error en la validación del token:', error.message);
        return null;
    }
}

// Función para obtener datos del usuario
async function obtenerUsuario(fetch, token) {
    try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/user/me/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener información del usuario.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        return null;
    }
}

export async function load({ cookies, fetch }) {
    const token = cookies.get('token');

    if (!token) {
        return { usuario: null };
    }

    // Validar el token
    const tokenEsValido = await validartoken(fetch, token);
    if (!tokenEsValido) {
        cookies.delete('token', { path: '/' });
        return { usuario: null };
    }

    // Obtener el usuario autenticado
    const usuario = await obtenerUsuario(fetch, token);
    if (!usuario) {
        cookies.delete('token', { path: '/' });
        return { usuario: null };
    }

    console.log(usuario)
    return { usuario }; // Retornamos el usuario autenticado
}