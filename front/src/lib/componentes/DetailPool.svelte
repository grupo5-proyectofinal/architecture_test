<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import BtnEdit from './BtnEdit.svelte';
  import BtnHome  from "./BtnHome.svelte";

  let poolData = {};
  let isLoading = true;
  let hasError = false;
  
  let id = $page.params.id;

  onMount(async () => {
    try {
      const respuesta = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools/${id}`);
      if (respuesta.ok) {
        poolData = await respuesta.json();
        isLoading = false;
      } else {
        console.error('Error al obtener los detalles del pool');
        hasError = true;
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:', error);
      hasError = true;
    }
  });

  let showModal = true;

  export let closeModal = () => { 
    showModal = false;
  };
</script>

{#if showModal}
  <div class="modal fade show d-block" role="dialog" aria-labelledby="modalTitle">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-modal">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">
            <i class="bi bi-check-circle-fill"></i> 
            Sus cambios han sido guardados con éxito
          </h5>
          <button type="button" class="btn-close" aria-label="Cerrar" on:click={closeModal}></button>
        </div>

        <div class="modal-body">
          {#if isLoading}
            <p>Cargando detalles del pool...</p>
          {:else if hasError}
            <p>Error al cargar los detalles. Intente nuevamente más tarde.</p>
          {:else}
            <h5>Detalles del Pool Creado</h5>
            <p><strong>Título:</strong> {poolData.titulo}</p>
            <p><strong>Producto:</strong> {poolData.producto}</p>
            <p><strong>Descripción:</strong> {poolData.descripcion}</p>
            <p><strong>Cantidad mínima de miembros:</strong> {poolData.minimo_participantes}</p>
            <p><strong>Cantidad disponible:</strong> {poolData.cantidadDisponible}</p>
            <p><strong>Fecha de vencimiento:</strong> {poolData.fecha_cierre}</p>
            <p><strong>Ubicación:</strong> {poolData.ubicacion}</p>
          {/if}
        </div>

        <div class="modal-footer">
          <div class="join-button-wrapper">
            <BtnEdit {poolData} />
            <BtnHome/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
{/if}

<style>
  .modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1050;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
  }

  .modal-backdrop {
    background: rgba(0, 0, 0, 0.8);
    z-index: 1040;
  }

  .rounded-modal {
    border-radius: 15px;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
  }
  .modal-footer{
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }
.join-button-wrapper {
  display: flex;
  gap: 5px; 
  
}

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
