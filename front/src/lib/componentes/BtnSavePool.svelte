<script>
  import DetailPool from './DetailPool.svelte'; // Importar el componente Modal 
  import { createEventDispatcher } from 'svelte';
 
  const dispatch = createEventDispatcher();
  let showModal = false; // Controla la visibilidad del modal
  export let pool = null; // Información del pool creado


  
  // Función para abrir el modal
  function openModal() {
      showModal = true;
      dispatch('poolSaved'); // Emitir el evento cuando el pool se guarda
    
  }

  // Función para cerrar el modal
  function closeModal() {
    showModal = false;
  }
  
</script>

<div class="join-button-wrapper">
  <button class="btn btn-dark rounded-pill" type="submit" on:click={openModal}  >
    Guardar Pool
  </button>
  <!-- Modal Component -->
  <DetailPool {pool} {closeModal} {showModal} />
</div>

<style>
  .join-button-wrapper {
    display: flex;
    justify-content: flex-end; 
    width: 100%;
    padding-right: 15px;
  }

  .btn-dark {
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

</style>
