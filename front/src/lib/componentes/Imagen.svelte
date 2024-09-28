<svelte:options accessors={true} />

<script>
  // Exportar las propiedades para permitir la vinculación desde el componente padre
  export let elegirArchivo = null; // Archivo de imagen seleccionado
  export let imagePreview = '';    // URL de la imagen de previsualización

  // Función para manejar el cambio de archivo
  const handleFileChange = (event) => {
    elegirArchivo = event.target.files[0];
    if (elegirArchivo) {
      // Crear la URL para previsualizar la imagen
      imagePreview = URL.createObjectURL(elegirArchivo);
    }
  };
</script>

<!-- Sección de imagen y botón de subida -->
<div class="image-section">
  <div class="row mb-3 justify-content-center">
    <img class="image" src={imagePreview} alt="Previsualización de la imagen" />
  </div>
  <div class="row mb-3 justify-content-center">
    <input
      type="file"
      accept="image/*"
      on:change={handleFileChange}
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

  .image {
    width: 100%;
    max-width: 400px;
    height: 300px;
    border-radius: 8px;
    border: 2px solid #afaca8;
    object-fit: cover;
  }
</style>