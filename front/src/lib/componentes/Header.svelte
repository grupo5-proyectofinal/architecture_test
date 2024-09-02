<script>
  // Define el estado activo de los enlaces de navegación
  let activeLink = 'home';

  function setActive(link) {
    activeLink = link;
  }
</script>

<header class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top header">
  <div class="container d-flex justify-content-between align-items-center">

    <!-- Espacio para el logo -->
    <a class="navbar-brand" href="#home">
      <img src="/img/LogoPS-2.png" alt="PoolShop" class="logo img-fluid" />
    </a>

    <!-- Menú de navegación -->
    <div class="navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'home' ? 'active' : ''}" 
            aria-current="page" 
            href="#home"
            on:click={() => setActive('home')}
          >
            Inicio
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'about' ? 'active' : ''}" 
            href="#about"
            on:click={() => setActive('about')}
          >
            Pools
          </a>
        
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'perfil' ? 'active' : ''}" 
            href="#perfil"
            on:click={() => setActive('perfil')}
          >
            Perfil
          </a>
        </li>
        
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'logout' ? 'active' : ''}" 
            href="#logout"
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
  .header {
    padding: 20px;
    background-color: #333;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  .navbar {
    background-color: #000000c2; 
    padding: 10px 20px; 
    font-size: 20px;   
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .logo {
    max-width: 100px; 
    max-height: 100px; 
    
     
  }

  .navbar-nav {
    display: flex;
    align-items: center;
  }

  .nav-link.active {
    border-bottom: 2px solid #f3f5f8; 
  }

  /* Ajustar el margen superior para evitar el solapamiento */
  .header {
    height: 100px;
  }
</style>
