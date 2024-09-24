<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let titulo;
  export let descripcion;
  export let producto;
  export let minimo_participantes;
  export let cantidadDisponible;
  export let fecha_cierre;
  export let ubicacion;
  
  let editMode = false;
  let showModal = true;

  // Función para cerrar el modal
  function closeModal() {
      showModal = false;
      dispatch('closeModal');  // Dispara el evento para notificar que el modal se cerró
  }

  // Función para activar el modo de edición
  function enableEdit() {
      editMode = true;
  }

  // Función para guardar los cambios y cerrar el modal
  function saveChanges() {
      console.log('Cambios guardados:', {
          titulo,
          descripcion,
          producto,
          minimo_participantes,
          cantidadDisponible,
          fecha_cierre,
          ubicacion,
      });

      editMode = false;
      closeModal();
  }

  // Función para confirmar y disparar el evento de confirmación
  function confirmChanges() {
      dispatch('confirm');  // Dispara el evento para confirmar el envío de datos
  }
</script>

{#if showModal}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-overlay" on:click={closeModal} role="button" tabindex="0" aria-label="Cerrar modal">
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="modal-content" role="dialog" aria-labelledby="modal-title" on:click|stopPropagation>
  <div class="modal-header">
    <h2 id="modal-title">{editMode ? 'Editar Pool' : 'Detalles del Pool'}</h2>
    <button class="close-btn" aria-label="Cerrar modal" on:click={closeModal}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div class="modal-body">
    {#if !editMode}
      <div class="preview">
        <p><strong>Título:</strong> {titulo}</p>
        <p><strong>Descripción:</strong> {descripcion}</p>
        <p><strong>Producto:</strong> {producto}</p>
        <p><strong>Cantidad mínima de miembros:</strong> {minimo_participantes}</p>
        <p><strong>Cantidad disponible:</strong> {cantidadDisponible}</p>
        <p><strong>Fecha de vencimiento:</strong> {fecha_cierre}</p>
        <p><strong>Ubicación:</strong> {ubicacion}</p>
      </div>
    {/if}

    {#if editMode}
      <div>
        <label for="title">Título:</label>
        <input id="title" type="text" bind:value={titulo} />

        <label for="description">Descripción:</label>
        <input id="description" type="text" bind:value={descripcion} />

        <label for="product">Producto:</label>
        <input id="product" type="text" bind:value={producto} />

        <label for="min-members">Cantidad mínima de miembros:</label>
        <input id="min-members" type="number" bind:value={minimo_participantes} />

        <label for="cant">Cantidad disponible:</label>
        <input id="cant" type="number" bind:value={cantidadDisponible} />

        <label for="date">Fecha de vencimiento:</label>
        <input id="date" type="date" bind:value={fecha_cierre} />

        <label for="location">Ubicación:</label>
        <input id="location" type="text" bind:value={ubicacion} />
      </div>
    {/if}
  </div>

  <div class="modal-footer">
    {#if !editMode}
      <!-- Botón para confirmar -->
      <button class="btn btn-dark rounded-pill" on:click={confirmChanges}>Confirmar</button>
      <!-- Botón para cancelar -->
      <button class="btn btn-dark rounded-pill" on:click={closeModal}>Cancelar</button>
    {/if}
    {#if editMode}
      <button class="btn btn-dark rounded-pill" on:click={saveChanges} type="button" aria-label="Guardar cambios">
        Guardar cambios
      </button>
    {/if}
  </div>
</div>
</div>
{/if}

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: default;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-body {
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  text-align: right;
}

.btn-dark {
  background-color: #343a40;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 50px;
}

input {
  width: 100%;
  max-width: 500px;
  border-radius: 50px;
  text-align: left;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
