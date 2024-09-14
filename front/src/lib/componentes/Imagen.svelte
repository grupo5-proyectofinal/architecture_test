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
        <img src={imagePreview} alt="Pool location map" />
    </div>
    <div class="row mb-3 justify-content-center">
        <input
        type="file"
        accept="image/*"
        on:change={hadleFileChange}
        style="display: none;"
        id="imageInput"
        />
        <button type="button" class="btn btn-secondary btn-sm" on:click={() => document.getElementById('imageInput').click()}>
            Insertar imagen
        </button>
    </div>
</div>
