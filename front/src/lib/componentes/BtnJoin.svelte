<script>
  import Cookies from "js-cookie";
  export let availableProducts = 0;
  export let isOpen = false;
  export let onClose = () => {};
  export let id;
  const token = Cookies.get('token');
  console.log(token)
  let selectedQuantity = 1;
  console.log(selectedQuantity)
  function updateQuantity(event) {
    selectedQuantity = Math.min(Math.max(Number(event.target.value), 1), availableProducts);
  }
  

  import Modal from './ModalConfirmation.svelte'; 
  let showModal = false;

  async function joinPool() {
    try {
      const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools/${parseInt(id)}/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_quantity: selectedQuantity  // Cantidad seleccionada
        })
      });
      console.log(response)

      if (response.ok) {
        showModal = true;  // Mostrar el modal de éxito si la solicitud fue exitosa
      } else {
        console.error('Error al unirse al pool:', await response.json());
        alert('Hubo un error al intentar unirse al pool.');
      }
    } catch (error) {
      console.error('Error en la solicitud de unirse al pool:', error);
      alert('Error de red al intentar unirse al pool.');
    }
  }

  function closeModal() {
    showModal = false;
  }

</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
      <span class="close" on:click={onClose}>&times;</span>
      <h4>Unirse al Pool</h4>
      <label for="quantity">Selecciona la cantidad de productos a adquirir:</label>
      <input type="number" id="quantity" min="1" max={availableProducts} bind:value={selectedQuantity} on:input={updateQuantity} />
      <label for="quantity">Máximo: {availableProducts} productos.</label>

      <div class="join-button-wrapper">
        <button type="button" class="btn btn-dark rounded-pill" on:click={joinPool}>Guardar</button>
        <!-- Modal Component -->
				<Modal showModal={showModal} closeModal={closeModal} />
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    position: relative;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }

  .join-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items:flex-end;
  }

  .btn-dark {
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  input[type="number"] {
    margin-bottom: 15px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 80px;
    align-items:flex-start;
  }
</style>
