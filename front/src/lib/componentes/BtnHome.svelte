<script>
  import { goto } from '$app/navigation'; 

  // Función para redirigir al inicio
  function goToHome() {
    goto('/');
  }
</script>

<div class="join-button-wrapper">
  <button type="button" class="btn btn-dark rounded-pill" on:click={goToHome}>Ir a inicio</button>
</div>

<style>
  .join-button-wrapper {
    display: flex;
    justify-content: flex-end; 
    width: 100%;
    padding-right: 15px;
    width: 400%;
    max-width: 400px;
  }

  .btn-dark {
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
</style>
