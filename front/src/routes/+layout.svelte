<script>
    import Header from "../lib/componentes/Header.svelte"; 
    import Footer from "../lib/componentes/Footer.svelte"; // Footer
    import { isAuthenticated, setAuthStatus, setUsuario, clearUsuario } from '$lib/stores/auth';

    export let data;

    // Sincroniza los datos del usuario y el estado de autenticación
    $: {
        if (data?.usuario) {
            setAuthStatus(true); // Usuario autenticado
            setUsuario(data.usuario); // Guardar los datos del usuario en la tienda
        } else {
            clearUsuario(); // Limpiar datos si no hay usuario
        }
    }
</script>

<Header usuario={data.usuario} isAuthenticated={isAuthenticated}/>

<!-- Slot para el contenido de las rutas hijas -->
<slot />

<Footer />