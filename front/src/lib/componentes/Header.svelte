<script>
  import { goto } from '$app/navigation';
  
    let activeLink = 'home';
  
    export let redirectTo;
  
    function handleRedict() {
          goto(redirectTo);
      }
  
    function setActive(link) {
      activeLink = link;
    }
  
    function handleClicks(link) {
      setActive(link);
      handleRedict();
    }
  </script>
  
  <header class="navbar navbar-expand-lg fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Espacio para el logo -->
      <a class="navbar-brand" href="/">
        <img src="/img/LogoPS-2.png" alt="PoolShop" class="logo img-fluid" />
      </a>
  
      <!-- Menú de navegación -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a 
              class="nav-link {activeLink === 'home' ? 'active' : ''}" 
              aria-current="page" 
              href="/"
              on:click={() => setActive('home')}
            >
              Inicio
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link {activeLink === 'pools' ? 'active' : ''}" 
              href="/"
              on:click={() => setActive('pools')}
            >
              Pools
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link {activeLink === 'perfil' ? 'active' : ''}" 
              href="/perfil"
              on:click={() => setActive('perfil')}
            >
              Perfil
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link {activeLink === 'logout' ? 'active' : ''}" 
              href="/"
              on:click={() => setActive('logout')}
            >
              Salir
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  
  <style>
    .navbar {
      padding: 10px 20px;
      font-size: 20px;
      background-color: #343a40; 
    }
  
    .navbar-brand {
      display: flex;
      align-items: center;
    }
  
    .logo {
      max-width: 100px; 
      max-height: 100px;
    }
  
    .navbar-nav .nav-link {
      color: #8f9295;
      transition: color 0.3s ease-in-out;
    }
  
    .navbar-nav .nav-link:hover, 
    .navbar-nav .nav-link.active {
      color: #f9f3f3; /* Letras blancas en hover o activo */
      border-bottom: 2px solid #000000; /* Borde negro para enlace activo */
    }
  
    /* Media query para pantallas pequeñas */
    @media (max-width: 991.98px) {
      .navbar-collapse {
        justify-content: flex-end;
      }
  
      .navbar-nav {
        flex-direction: column;
        align-items: flex-start;
        width: 100%; 
        padding-left: 0;
      }
  
      .nav-item {
        width: 100%; 
      }
  
      .nav-link {
        padding: 10px 0;
        width: 100%; 
        text-align: left; 
      }
  
      .navbar-brand {
        margin-right: auto;
      }
  
      .logo {
        max-width: 80px; /* Reduce el tamaño del logo en pantallas pequeñas */
      }
    }
  
    /* Media query para pantallas extra pequeñas */
    @media (max-width: 575.98px) {
      .navbar {
        font-size: 16px; 
        padding: 5px 10px; 
      }
  
      .logo {
        max-width: 60px; 
      }
  
      .nav-link {
        font-size: 18px; /* Asegura que el texto sea legible en pantallas pequeñas */
      }
    }
  </style>
  