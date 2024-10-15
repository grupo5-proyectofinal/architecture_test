<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let activeLink = 'home';
    let isAuthenticated = false;
  
    function setActive(link) {
      activeLink = link;
    }
  
    // Comprobamos si el usuario está autenticado
    onMount(() => {
      const token = localStorage.getItem('authToken');
      isAuthenticated = !!token; // Si hay un token, el usuario está autenticado
    });
  
    // Función para cerrar sesión
    function logout() {
      localStorage.removeItem('authToken'); // Eliminamos el token
      isAuthenticated = false;
      goto('/login'); // Redirigir a la página de login
    }
  </script>
  
  <!-- Header -->
  <header class="navbar navbar-expand-lg fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <a class="navbar-brand" href="/">
        <img src="/img/LogoPS-2.png" alt="PoolShop" class="logo img-fluid" />
      </a>
  
      <!-- Menú de navegación -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <!-- Menú colapsable -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <nav class="navbar-nav mr-auto">
          <a class="nav-link {activeLink === 'home' ? 'active' : ''}" href="/" on:click={() => setActive('home')}>
            Home
          </a>
          <a class="nav-link {activeLink === 'mispools' ? 'active' : ''}" href="/pools" on:click={() => setActive('mispools')}>
            Mispools
          </a>
        </nav>
  
        <!-- Íconos de notificaciones y perfil -->
        <div class="d-flex align-items-center">
          <!-- Ícono de notificaciones -->
          <a href="/notifications" class="nav-link">
            <i class="bi bi-bell"></i>
          </a>
  
          <!-- Ícono de perfil -->
          {#if isAuthenticated}
            <a href="/perfil" class="nav-link">
              <i class="bi bi-person"></i>
            </a>
          {:else}
            <a href="/login" class="nav-link btn btn-outline-light login-button">
              Login
            </a>
          {/if}
        </div>
      </div>
    </div>
  </header>
  
  <!-- Estilos -->
  <style>
    /* Estilos del navbar */
    .navbar {
      padding: 10px 20px;
      background-color: #343a40; /* Fondo gris oscuro */
      font-size: 18px;
    }
  
    .navbar-brand img {
      max-height: 50px;
    }
  
    .navbar-nav .nav-link {
      color: #f8f9fa; /* Gris claro para el texto */
      margin-right: 20px;
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
  
    /* Botón del navbar en pantallas pequeñas */
    .navbar-toggler {
      border: none;
      color: #ffffff;
    }
  
    .navbar-toggler-icon {
      background-color: #ffffff;
      border-radius: 2px;
    }
  
    /* Estilos responsivos para pantallas pequeñas */
    @media (max-width: 991.98px) {
      .navbar-nav {
        flex-direction: column;
        align-items: flex-start;
      }
  
      .navbar-collapse {
        justify-content: space-between;
      }
  
      .nav-item {
        width: 100%;
      }
  
      .nav-link {
        padding: 10px 0;
        width: 100%;
        text-align: left;
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
  
      .navbar-toggler {
        padding: 8px;
      }
  
      .navbar-toggler-icon {
        width: 30px;
        height: 3px;
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
  </style>
  