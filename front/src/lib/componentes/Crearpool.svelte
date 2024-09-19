<script>
    import { onMount } from "svelte";
    import Imagen from "./Imagen.svelte";
    import DetailPool from "./DetailPool.svelte";

    // Estado del modal
    let showModal = false;
    let poolData = {};

    let titulo = '';
    let descripcion = ''; // descripcion del pool o producto
    let minimo_participantes = 1; 
    let producto = '';
    let precio = ''
    let cantidadDisponible = 1; // hay que especificar que cantidad es, cantidadTomaAdmin o CantidadDisponible
    let categorias = ''; // lista de categorias
    let categoriaPool = '';
    let fecha_cierre = ''; 
    let ubicacion = ''; // falta ubicacion en el back
    let radio = 0;
    let imagenPool = '';
    
    
    // Manejo de errores
    let tituloError = '';
    let descripcionError = '';
    //let touchFields = {}



    //Validación de campo vacio
    const validateField = (fieldValue, errorMessageSetter, errorMessage) => {
        if (!fieldValue.trim()) {
            errorMessageSetter(errorMessage);
            return false;
        }
        errorMessageSetter(''); // Limpiar mensaje de error si la validación pasa
        return true;
    };

    const handleProductClick = () => {
        if (descripcionError) {
            decripcionError = 'La descripcion es obligatoria';
        }
    };

    const validateForm = () => {
        const isTituloValid = validateField(titulo, (msg) => tituloError = msg, 'El titulo del pool es obligatorio');
        const isDescripcionValid = validateField(descripcion, (msg) => descripcionError = msg, 'La descripcion es obligatoria');

        return isTituloValid && isDescripcionValid;
    };



    async function sendForm() {

        const formData = new FormData()
        formData.append('titulo',titulo)
        formData.append('descripcion',descripcion)
        formData.append('minimo_participantes',minimo_participantes)
        formData.append('producto',producto)
        formData.append('precio',precio)
        formData.append('cantidad',cantidadDisponible)
        formData.append('categoria',categoriaPool)
        formData.append('fecha_cierre', fecha_cierre)
        formData.append('imagenes', imagenPool.elegirArchivo)

        try{
            const respuesta = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/pools/',{
                method: 'POST',
                body: formData
            });
            console.log(formData)
            if (respuesta.ok){
                const resultado = await respuesta.json();
                alert('Pool creado correctamente');
                console.log(respuesta.status)
            } else {
                alert('Error al crear Pool')
                console.log(formData)
                console.log(respuesta.status)
            }
        } catch(error){
            console.error('Error en la solicitud:', error);
            alert('Error de red al enviar el formulario');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            sendForm()
        }
    };

    onMount(async() =>{
        try{
            const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/categorias/')
            if (!response.ok){
                throw new Error('Timeout')
            }
            const data = await response.json()
            categorias = data
        } catch(error){
            console.error ('Error:',error)
        }
    })

</script>



<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <form on:submit={handleSubmit} class="form-wrapper">
                        <div class="form-section">
                            <h2 class="fw-bolder">Creando nuevo Pool de Compra</h2>
                            <br />
                            <div class="form-group">
                                <label for="titulo">Titulo del Pool</label>
                                <input id="titulo"
                                 class="form-control"
                                  type="text" bind:value={titulo}
                                  placeholder="Ingrese titulo del Pool" />
                                {#if tituloError}
                                    <span class="error">{tituloError}</span>
                                {/if}
                            </div>
                            <div class="form-group">
                                <label for="producto">Nombre del producto</label>
                                <input id="producto"
                                 class="form-control"
                                  type="text" bind:value={producto}
                                  placeholder="Ingrese nombre del producto" />
                                <!-- {#if tituloError}
                                    <span class="error">{tituloError}</span>
                                {/if} -->
                            </div>
                            <div class="form-group">
                                <label for="categorias" class="form-label">Categoria</label>
                                <select bind:value={categoriaPool} multiple="" class="form-control" id="categorias">
                                  {#each categorias as categoria}
                                     <option>{categoria.nombre}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="priceInput">Precio unitario del producto</label>
                                <input
                                    class="form-control"
                                    id="priceInput"
                                    type="number"
                                    bind:value={precio}
                                    min="0"
                                    step="0.01"  
                                    on:input={(e) => {
                                        if (e.target.value < 0) {
                                            e.target.value = 0;
                                        }
                                    }}
                                    placeholder="Ingrese el precio"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripcion del Producto</label>
                                <input id="descripcion" class="form-control" type="text" bind:value={descripcion} placeholder="Ingrese descripcion del Producto" on:click={handleProductClick} />
                                {#if descripcionError}
                                    <span class="error">{descripcionError}</span>
                                {/if}
                            </div>
                            <div class="form-group">
                                <label for="cantidadDisponible">Cantidad disponible</label>
                                <div class="slider-container">
                                    <input id="cantidadDisponible" class="form-control" type="range" min="1" max="100" bind:value={cantidadDisponible} />
                                    <span>{cantidadDisponible}</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="fecha_cierre">Fecha de vencimiento del Pool</label>
                                <input id="fecha_cierre" class="form-control" type="date" bind:value={fecha_cierre} />
                            </div>

                            <div class="form-group">
                                <label for="minimo_participantes">Cantidad minima de miembros</label>
                                <input id="minimo_participantes" class="form-control" type="number" min="1" bind:value={minimo_participantes} placeholder="Ingrese numero de miembros mínimos" />
                            </div>

                            <div class="form-group">
                                <label for="ubicacion">Ubicación</label>
                                <input id="ubicacion" class="form-control" type="text" bind:value={ubicacion} placeholder="Ingrese Ubicación" />
                            </div>

                            <div class="form-group">
                                <label for="radio">Radio</label>
                                <div class="slider-container">
                                    <input id="radio" class="form-control" type="range" min="0" max="100" bind:value={radio} />
                                    <span>{radio} km</span>
                                </div>
                            </div>
                            <div class="join-button-wrapper">
                                <button type="button" class="btn btn-dark rounded-pill">Crear pool</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="container">
                <Imagen
                bind:this={imagenPool}
                imagePreview="https://via.placeholder.com/400" 
                />
            </div>
        </div>
    </div>
</div>


<!-- Modal para mostrar detalles del Pool creado -->
{#if showModal}
  <DetailPool {poolData} on:closeModal={() => showModal = false} />
{/if}

<style>
    .error {
        color: red;
    }
    .card {
    border-radius: 20px;
    padding: 20px;
  }

  input {
    width: 100%;
    max-width: 500px;
    border-radius: 50px;
    text-align: left;
  }

  .form-label{
    padding-left: 0%;
    text-align: center;
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

</style>