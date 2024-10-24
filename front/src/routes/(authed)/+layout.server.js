import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const token = localStorage.getItem('token');
    
    // Verifica si el token existe
    if (!token) {
        throw redirect(302, '/login');
    }

    // Opcionalmente, valida el token enviando una solicitud al backend
    const response = await fetch('/api/validate-token', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        localStorage.removeItem('token');
        throw redirect(302, '/login');
    }
}