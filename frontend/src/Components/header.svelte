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
      <img src="" alt="PoolShop" class="logo img-fluid" />
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
        </li>
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'contact' ? 'active' : ''}" 
            href="#contact"
            on:click={() => setActive('contact')}
          >
            Contacto
          </a>
        </li>
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
  .navbar {
    background-color: #000000; 
    padding: 5px 10px; 
    font-size: 14px;   
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .logo {
    max-width: 30px; 
    max-height: 30px; 
    height: auto;   
  }


  .navbar-nav {
    display: flex;
    align-items: center;
  }

  .nav-link.active {
    color: #007bff;
    border-bottom: 2px solid #007bff; 
  }

  .nav-link {
    color: #ffffff;
    transition: color 0.3s ease, border-bottom 0.3s ease; 
  }

  /* Ajustar el margen superior para evitar el solapamiento */
  .header {
    height: 100px; /* Ajusta según el tamaño del header */
  }
</style>
