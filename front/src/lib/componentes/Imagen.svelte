<svelte:options accessors={true} />

<script>
     export let elegirArchivo = null;
     export let imagePreview = '';

    const hadleFileChange = (event) => {
        elegirArchivo = event.target.files[0];
        if (elegirArchivo){
            imagePreview = URL.createObjectURL(elegirArchivo)
        }
    }

</script>

<div class="image-section">
    <div class="row mb-3 justify-content-center">
        <img class="image" src={imagePreview} alt="Pool location map" />
    </div>
    <div class="row mb-3 justify-content-center">
        <input
        type="file"
        accept="image/*"
        on:change={hadleFileChange}
        style="display: none;"
        id="imageInput"
        />
        <button type="button" class="btn btn-dark rounded-pill" on:click={() => document.getElementById('imageInput').click()}>
            Insertar imagen
        </button>
    </div>
</div>

<style>
    .btn-dark {
      background-color: #343a40;
      color: #fff;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
    }
  
    .image{
      width: 400%;
      max-width: 400px; 
      height: 400px;
      border-radius: 8px; 
      border: 2px solid #afaca8; 
      object-fit: cover;
      
    }
  </style>