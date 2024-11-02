<script>
    import Header from "../../lib/componentes/Header.svelte";
    import Footer from "../../lib/componentes/Footer.svelte";
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';

    function removeAuthToken() {
        // Elimina el token de una cookie accesible desde JavaScript
        Cookies.remove('token', { path: '/' });
    }

    onMount(() => {
        // Detecta cuando el usuario intenta cerrar la ventana
        window.addEventListener('beforeunload', removeAuthToken);

        // Detecta cuando la visibilidad de la página cambia
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                removeAuthToken();
            }
        });

        // Limpia los event listeners cuando el componente se destruye
        return () => {
            window.removeEventListener('beforeunload', removeAuthToken);
            document.removeEventListener('visibilitychange', removeAuthToken);
        };
    });
</script>

<Header/>
<slot />
<Footer/>