<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie';
  
    let activeLink = 'home';
    let isAuthenticated = false;
  
    function setActive(link) {
      activeLink = link;
    }
  
    // Comprobamos si el usuario está autenticado
    onMount(() => {
      const token = Cookies.get('token')
      isAuthenticated = !!token; // Si hay un token, el usuario está autenticado
    });
  
    // Función para cerrar sesión
    function logout() {
      Cookies.remove('token'); // Eliminamos el token
      isAuthenticated = false;
      goto('/'); // Redirigir a la página de login
    }
    function goToProfile (){
      event.preventDefault()
      goto('/perfil')
    }
  </script>
  
  <!-- Header -->
  <header class="navbar navbar-expand-lg fixed-top">
    
    <div class="text-center logo">
      <a class="navbar-brand" href="/principal">
        <!-- Logo más grande -->
        <img src="/img/LogoPS-2.png" alt="PoolShop" class="logo img-fluid" />
        <!-- Texto PoolShop debajo del logo -->
        <div class="brand-text">PoolShop</div>
      </a>
    </div>
    <ul class="d-flex flex-column align-items-start">
      <li class="mb-3">
        <div class="search-bar-container">
          <div class="search-bar">
            <input type="text" placeholder="Hinted search text" />
            <button class="search-button"><i class="bi bi-search"></i></button>
          </div>
        </div>
      </li>
      <li>
        <!-- Menú de navegación debajo de la barra de búsqueda -->
        <div class="nav-buttons w-100 text-center">
          <nav class="navbar-nav d-flex justify-content-center">
            <a class="nav-link mx-2 {activeLink === 'home' ? 'active' : ''}" href="/" on:click={() => setActive('home')}>
              Mispools
            </a>
            <a class="nav-link mx-2 {activeLink === 'crear' ? 'active' : ''}" href="/crear" on:click={() => setActive('crear')}>
              Crear pool
            </a>
            <a class="nav-link mx-2 {activeLink === 'unidos' ? 'active' : ''}" href="/unidos" on:click={() => setActive('unidos')}>
              Unidos
            </a>
          </nav>
        </div>
      </li>
    </ul>
  
        <!-- Íconos de notificaciones y perfil -->
        <div class="d-flex align-items-center">
          <!-- Ícono de notificaciones -->
          <a href="/notifications" class="nav-link">
            <i class="bi bi-bell"></i>
          </a>
  
          <!-- Ícono de perfil -->
          {#if isAuthenticated}
            <a  href="#" class="nav-link" on:click={(event) => goToProfile(event)}>
              <i class="bi bi-person"></i>
            </a>
            <a
              class="nav-link btn btn-outline-light login-button {activeLink === 'logout' ? 'active' : ''}"
              href="#"
              on:click={logout}>
              logout
            </a>
          {:else}
            <a href="/login" class="nav-link btn btn-outline-light login-button">
              Login
            </a>
          {/if}
        </div>
  </header>
  
  <!-- Estilos -->
  <style>
    .logo{
      margin-left: 25px;
    }

    .navbar {
      padding: 10px 20px;
      background-color: #343a40; /* Fondo gris oscuro */
      font-size: 15px;
    }
  
    .navbar-brand img {
      max-height: 70px;
    }
    .brand-text {
        font-size: 18px; /* Ajusta el tamaño de la fuente aquí */
        font-weight: bold;
        color: #ffffff; /* Blanco */
      }
  
    .navbar-nav .nav-link {
      color: #f8f9fa; /* Gris claro para el texto */
      margin-right: 10px;
      font-weight: bold;
      transition: color 0.3s ease-in-out;
    }
  
    .navbar-nav .nav-link:hover,
    .navbar-nav .nav-link.active {
      color: #ffffff; /* Blanco en hover o activo */
      border-bottom: 2px solid #ffffff;
    }
  
    .btn-outline-light {
      color: #ffffff;
      border-color: #ffffff;
    }
  
    .nav-link i {
      font-size: 1.5rem;
      color: #ffffff; /* Blanco para los íconos */
    }
  
    .nav-link.btn {
      margin-left: 10px;
    }
  
    /* Estilos responsivos para pantallas pequeñas */
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
  
    /* Estilos responsivos para pantallas extra pequeñas */
    @media (max-width: 575.98px) {
      .navbar {
        font-size: 16px;
        padding: 5px 10px;
      }
  
      .logo {
        max-width: 80px; /* Tamaño ajustado del logo */
      }
  
      .nav-link {
        font-size: 18px;
      }
    }
  .login-button {
    /* background-color: #3b5998; */
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.95rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-button:hover {
    background-color: #9aa2b4;
  }

  /* Contenedor de barra de búsqueda */
  .search-bar-container {
    display: flex;
    width: 700px;
  }
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    padding: 6px 10px;
    border-radius: 20px;
    max-width: 700px;
    width: 100%;
  }
  .search-bar input {
    border: none;
    background: none;
    outline: none;
    font-size: 1rem;
    color: #333;
    width: 100%;
  }
  .search-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
  }
  
  /* Menú de navegación */
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

</style>
  