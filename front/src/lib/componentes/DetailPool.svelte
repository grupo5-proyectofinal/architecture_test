<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import BtnEdit from './BtnEdit.svelte';
  import BtnHome from "./BtnHome.svelte";

  // Parámetros
  export let poolData = {};
  export let isModal = false;  // Controla si se muestra como modal o como página completa
  export let closeModal = () => { showModal = false; };
  export let confirm = () => {};  // Función para confirmar el envío

  let isLoading = false;
  let hasError = false;

  // Esto podría no ser necesario, ya que los datos vienen directamente como props
  // let id = $page.params.id;

  // Manejar el comportamiento de carga y error
  onMount(() => {
    isLoading = false; // Este podría no ser necesario si los datos vienen ya preparados
  });

  let showModal = true;
</script>

<!-- Comportamiento como Modal o Vista Completa -->
{#if isModal}
  <!-- Modal View -->
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
              <p><strong>Forma de Pago:</strong> {poolData.paymentsSelect}</p>
            {/if}
          </div>

          <div class="modal-footer">
            <div class="join-button-wrapper">
              <button type="button" class="btn btn-primary" on:click={confirm}>Confirmar</button>
              <BtnEdit {poolData} />
              <BtnHome />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  {/if}
{:else}
  <!-- Full Page View -->
  <div class="container">
    <div class="page-content">
      <h2 class="page-title">
        <i class="bi bi-check-circle-fill"></i> 
        Sus cambios han sido guardados con éxito
      </h2>

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
        <p><strong>Forma de Pago:</strong> {poolData.paymentsSelect}</p>
      {/if}

      <div class="page-footer">
        <div class="join-button-wrapper">
          <BtnEdit {poolData} />
          <BtnHome />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Estilos para el modal */
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

  .modal-footer {
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

  /* Estilos para vista de página completa */
  .container {
    padding: 20px;
    margin: auto;
    max-width: 800px;
  }

  .page-title {
    margin-bottom: 20px;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .page-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
