<script>
  // Define el estado activo de los enlaces de navegación
  let activeLink = 'crearPool';

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
            class="nav-link {activeLink === 'crearPool' ? 'active' : ''}" 
            aria-current="page" 
            href="#crearPool"
            on:click={() => setActive('crearPool')}
          >
            Crear Pool
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'unirsePool' ? 'active' : ''}" 
            href="#unirsePool"
            on:click={() => setActive('unirsePool')}
          >
            Unirse a Pool
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
            class="nav-link {activeLink === 'mensajes' ? 'active' : ''}" 
            href="#mensajes"
            on:click={() => setActive('mensajes')}
          >
            Mensajes
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link {activeLink === 'salir' ? 'active' : ''}" 
            href="#salir"
            on:click={() => setActive('salir')}
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
    background-color: #000000; /* Establece el color de fondo negro */
    padding: 5px 10px; /* Reduce el padding del navbar */
    font-size: 14px;   /* Tamaño de fuente más pequeño para los enlaces */
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .logo {
    max-width: 30px; /* Reducir aún más el tamaño máximo del logo */
    max-height: 30px; /* Limitar la altura máxima del logo */
    height: auto;    /* Mantiene la proporción del logo */
  }

  @media (max-width: 768px) {
    .logo {
      max-width: 25px; /* Tamaño del logo en pantallas pequeñas */
      max-height: 25px; /* Limitar la altura en pantallas pequeñas */
    }
  }

  .navbar-nav {
    display: flex;
    align-items: center;
  }

  .nav-link.active {
    color: #007bff; /* Cambia el color del texto del enlace activo */
    border-bottom: 2px solid #007bff; /* Color de la línea de subrayado activa */
  }

  .nav-link {
    color: #ffffff; /* Asegura que el texto de los enlaces sea blanco para el contraste */
    transition: color 0.3s ease, border-bottom 0.3s ease; /* Suaviza el efecto al cambiar el estado activo */
  }

  /* Ajustar el margen superior para evitar el solapamiento */
  .header {
    height: 100px; /* Ajusta según el tamaño del header */
  }
</style>
