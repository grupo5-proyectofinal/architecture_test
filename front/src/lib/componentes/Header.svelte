<script>
  import { isAuthenticated, usuario, clearUsuario } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Filter from './Filter.svelte';

  // Variables para manejar el estado del header
  let lastScrollY = 0; // Posición anterior del scroll
  let headerHidden = false; // Indica si el header está oculto

  // Función para manejar el scroll
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Ocultar si el usuario hace scroll hacia abajo, mostrar si es hacia arriba
    headerHidden = currentScrollY > lastScrollY && currentScrollY > 50;
    lastScrollY = currentScrollY; // Actualizar la posición del scroll
  }

  // Agregar y eliminar el listener de scroll
  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  

  // Variables locales que reaccionan automáticamente a los valores de los stores
  let authenticated;
  let user;

  // Reactividad automática con los stores globales
  $: authenticated = $isAuthenticated;
  $: user = $usuario;

  // Función para cerrar sesión
  function logout() {
    clearUsuario(); // Limpia el estado global
    goto('/'); // Redirige a la página de inicio
  }

  function goToProfile(event) {
    event.preventDefault();
    goto('/perfil');
  }

  let activeLink;
  $: {
    const path = $page.url.pathname;
    if (path === '/' || path === '/principal') activeLink = 'home';
    else if (path === '/crearpoolshop') activeLink = 'crear';
    else if (path === '/unidos') activeLink = 'unidos';
    else if (path === '/mispools') activeLink = 'mispools';
    else activeLink = null;
  }
  
  let searchQuery = '';

  async function handleSearch() {
      goto(`/listadopools?producto=${encodeURIComponent(searchQuery)}`);
  }

  function handleKeydown(event) {
      if (event.key === 'Enter') {
          event.preventDefault(); 
          handleSearch();
      }
  }

</script>

<!-- Header -->
<header class="navbar navbar-expand-lg fixed-top bg-dark {headerHidden ? 'hidden' : ''}">
  <div class="container d-flex align-items-center justify-content-between">
    <!-- Logo y Título -->
    <div class="text-center">
      <a class="navbar-brand" href="/principal">
        <img src="/img/LogoPS-2.png" alt="PoolShop" class="logo img-fluid" />
        <div class="brand-text">PoolShop</div>
      </a>
    </div>

    <!-- Barra de búsqueda y navegación -->
    <ul class="d-flex flex-column align-items-center m-0 p-0">
      <!-- Barra de búsqueda -->
      <li class="mb-3 w-100">
        <div class="search-bar-container">
          <div class="search-bar">
            <input 
                class="search-input" 
                type="text" 
                bind:value={searchQuery} 
                on:keydown={handleKeydown} 
                placeholder="Buscar..."
            />
            <button class="search-button"><i class="bi bi-search"></i></button>
          </div>
        </div>
      </li>

      <!-- Menú de navegación -->

      <li class="w-100">
        <div class="nav-buttons text-center">
          <nav class="navbar-nav d-flex justify-content-center">
            <a class="nav-link mx-2 {activeLink === 'home' ? 'active' : ''}"
             href="/">
               Bienvenido
            </a>
            <a class="nav-link mx-2 {activeLink === 'crear' ? 'active' : ''}"
             href="/crearpoolshop">
               Crear pool
            </a>
            <a class="nav-link mx-2 {activeLink === 'unidos' ? 'active' : ''}"
             href="/unidos">
               Unidos
            </a>
            <a class="nav-link mx-2 {activeLink === 'mispools' ? 'active' : ''}"
             href="/mispools">
               Mispools
            </a>
          </nav>
        </div>
      </li>

    </ul>

    <!-- Íconos de notificaciones y perfil -->
    <div class="d-flex align-items-center">
      <a href="/notifications" class="nav-link me-3">
        <i class="bi bi-bell"></i>
      </a>

      {#if authenticated}
        <div class="text-center">
          <img
            src={user?.foto || '/img/default-user.png'}
            alt="Foto de Usuario"
            class="user-photo rounded-circle me-2"
            width="40"
            height="40"
          />
          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-white"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user?.username || 'Usuario'}
            </a>
            <div class="dropdown-menu bg-white">
              <h6 class="dropdown-header">Hola</h6>
              <a class="dropdown-item" href="/perfil">Editar perfil</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" on:click={logout}>Cerrar sesión</a>
            </div>
          </div>
        </div>
      {:else}
        <div class="d-flex flex-column align-items-center">
          <div class="login">
            <a href="/login" class="nav-link btn btn-outline-light login-button">
              Iniciar sesión
            </a>
          </div>
          <div class="registrarse mt-2">
            <a href="/registrarse">Registrarse</a>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
    /* Ocultar el header cuando está scrolleado hacia abajo */
  .search-input {
  border: none;
  background: none;
  outline: none;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding-left: 10px;
}
  header.hidden {
    transform: translateY(-100%);
  }

  /* Mostrar el header */
  header:not(.hidden) {
    transform: translateY(0);
  }

  /* Logo */
  .navbar-brand img {
    max-height: 70px;
  }
  .brand-text {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    padding: 8px 15px;
    border-radius: 20px;
    width: 600px;
  }

.search-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
}
  
  /* Enlaces de navegación */
  .nav-buttons .nav-link {
    color: #f8f9fa;
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.3s ease-in-out;
    text-decoration: none;
  }
  .nav-buttons .nav-link:hover,
  .nav-buttons .nav-link.active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  /* Botones de autenticación */
  .auth-buttons .nav-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    margin-left: 20px;
  }
  .auth-buttons .nav-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }
  /* Ajustes responsivos */
  @media (max-width: 991.98px) {
    .search-bar-container {
      max-width: 100%;
    }
    .nav-buttons {
      flex-direction: column;
      align-items: center;
    }
    .navbar-nav .nav-link {
      padding: 10px 0;
      width: 100%;
      text-align: center;
    }
  }
  .dropdown{
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
  }
</style>
