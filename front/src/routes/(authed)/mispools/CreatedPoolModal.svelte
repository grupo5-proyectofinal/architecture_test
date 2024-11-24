

<script>
    import { goto } from '$app/navigation';

    // Props to control the modal's visibility and the pool ID
    export let showModal = false;
    export let poolId = null;  // Pool ID for the created pool
    
    function viewPoolDetails() {
        goto(`/detallepool/${poolId}`);
    }
  </script>
  
  {#if showModal}
    <div class="modal-background">
      <div class="modal-container">
        <div class="modal-content">
          <!-- Modern Icon and Header -->
          <div class="modal-header">
            <div class="icon-container">
              <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 class="modal-title">¡Pool creado exitosamente!</h2>
          </div>
  
          <p class="modal-body">Tu nuevo pool de compra ha sido creado correctamente. Ahora puedes ver los detalles.</p>
  
          <!-- Single action button -->
          <div class="modal-footer">
            <button class="btn btn-view" on:click={viewPoolDetails}>Ver Pool</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    /* General Styles */
    .modal-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
  
    .modal-container {
      background: #ffffff;
      padding: 30px 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      max-width: 450px;
      width: 90%;
      animation: fadeIn 0.4s ease-out;
    }
  
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    /* Header with icon and title */
    .modal-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .icon-container {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
    }
  
    .checkmark {
      width: 60px;
      height: 60px;
      stroke: #4CAF50;
    }
  
    .checkmark-circle {
      stroke-width: 2;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }
  
    .checkmark-check {
      stroke-width: 2;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: stroke 0.3s 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }
  
    @keyframes stroke {
      100% {
        stroke-dashoffset: 0;
      }
    }
  
    .modal-title {
      font-size: 1.8em;
      font-weight: 700;
      color: #333;
    }
  
    .modal-body {
      font-size: 1.1em;
      color: #555;
      margin-bottom: 30px;
    }
  
    /* Modern Styled Button */
    .modal-footer {
      display: flex;
      justify-content: center;
    }
  
    .btn-view {
      display: inline-block;
      background-color: #4CAF50;
      color: #fff;
      text-decoration: none;
      font-size: 1em;
      padding: 12px 24px;
      border-radius: 50px;
      box-shadow: 0px 4px 14px rgba(76, 175, 80, 0.4);
      transition: all 0.3s ease;
    }
  
    .btn-view:hover {
      background-color: #45a049;
      box-shadow: 0px 6px 16px rgba(76, 175, 80, 0.6);
    }
  </style>
  
  