import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
    // Obtener el token de las cookies
    const token = cookies.get('token');

    // Verifica si el token existe
    if (!token) {
        throw redirect(302, '/login');
    }

    // Validación del token
    try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/validate-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token.toString()
            })
        });

        if (!response.ok) {
            // Si la respuesta no es válida, elimina la cookie del token
            cookies.delete('token', { path: '/' });
            throw redirect(302, '/login');
        }
    } catch (error) {
        console.error("Error en la validación del token:", error);
        cookies.delete('token', { path: '/' });
        throw redirect(302, '/login');
    }
}
