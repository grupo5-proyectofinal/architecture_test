<script>
  export let showModal = false;
  export let closeModal = () => {};
  export let message = "Sus cambios han sido guardados con éxito";
  export let buttonText = "Continuar";
  export let onContinue = () => {}; // Acción personalizada
</script>

{#if showModal}
<div class="modal fade show d-block" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content rounded-modal">
      <div class="modal-header">
        <div class="modal-titles">
          <h5 class="modal-title">
            <i class="bi bi-check-circle-fill"></i> 
            {message}
          </h5>
        </div>
        <button type="button" class="close" aria-label="Close" on:click={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>A continuación, puedes ir al inicio de sesión.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click={onContinue}>
          {buttonText}
        </button>
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
  }
  
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8); 
    z-index: 1040; 
  }
  
  .rounded-modal {
    border-radius: 15px; 
  }
  
  .close {
    background: none;
    border: none;
    font-size: 1.5rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-titles {
    text-align: left; 
    width: 100%;
  }
  
  .bi-check-circle-fill {
    font-size: 1.5rem;
    margin-right: 10px;
    color: #505351; 
  }
</style>