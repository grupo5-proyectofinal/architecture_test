<script>
  import { FaPencilAlt } from "svelte-icons/fa";
  import { format } from 'date-fns';

  export let poolData;
  export let product = {
    images: poolData.producto.imagenes || [],
    titulo: poolData.titulo,
    ubicacion: poolData.ubicacion || 'Ubicación no disponible',
    description: poolData.descripcion,
    precio: poolData.producto.precio,
    fecha_cierre: poolData.fecha_cierre,
    cantidad: poolData.cantidad_productos,
    cantidad_disponible: poolData.cantidad_disponible,
    tipo_pago: poolData.tipo_pago,
  };

  let currentIndex = 0;
  let imageSrc = poolData.producto.imagenes[currentIndex].imagen;

  let enEdicion = {
    titulo: false,
    ubicacion: false,
    descripcion: false,
    precio: false,
    fecha_cierre: false,
    cantidad: false,
    cantidad_disponible: false,
    tipo_pago: false,
  };

  let fieldValues = {
    titulo: '',
    ubicacion: '',
    descripcion: '',
    precio: '',
    fecha_cierre: '',
    cantidad: '',
    cantidad_disponible: '',
    tipo_pago: ''
  };

  let initialValues = { ...fieldValues }; // Almacenar valores iniciales para comparación

  // Detectar cambio
  function hasFieldChanged() {
    return Object.keys(fieldValues).some(field => fieldValues[field] !== initialValues[field]);
  }

  // Si se detacta cambio, cambia el boton
  $: anyChange = hasFieldChanged() || Object.values(enEdicion).some(value => value === true);


  async function guardarCambios() {
    try {
      const fieldUpdate = Object.keys(fieldValues).filter(key => {
        const value = fieldValues[key];
        return value !== ""})
      
      const updatedPool = new FormData();
      for (let field of fieldUpdate){
        updatedPool.append(field, product[field]);
      }
      
      const respuesta = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools/${poolData.id}/`, {
        method: 'PATCH',
        body: updatedPool
      });

      if (respuesta.ok) {
        alert('Pool modificado exitosamente');
        initialValues = { ...fieldValues };
      } else {
        alert('Error al modificar el Pool');
        console.error(await respuesta.json());
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de red al enviar el formulario');
    }
  }

  // Iniciar edición y copiar el valor inicial
  function handleEdit(fieldName) {
    enEdicion[fieldName] = true;
    fieldValues[fieldName] = product[fieldName];
    initialValues[fieldName] = product[fieldName];
  }

  // Guardar cambios locales cuando se finaliza la edición
  function handleSave(event, fieldName) {
    if (event.key === "Enter" || event.type === "blur") {
      enEdicion[fieldName] = false;
      // Actualizar el valor solo si cambió
      if (fieldValues[fieldName] !== initialValues[fieldName]) {
        product[fieldName] = fieldValues[fieldName];
      } else {
        fieldValues[fieldName] = initialValues[fieldName];
      }
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % product.images.length;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
  }
</script>

<div class="page-container">
  <div class="card">
    <div class="image-wrapper">
      <img class="image" src={imageSrc} alt="Detalle del producto" />
      <div class="carousel-buttons">
        <button on:click={prevImage} class="button carousel-button">&lt;</button>
        <button on:click={nextImage} class="button carousel-button">&gt;</button>
      </div>
    </div>
    <div class="details">
      <h1 class="titulo-pool text-center">Detalle del Pool</h1>
      
      <!-- PRODUCTO -->
      <div class="detail-item">
        {#if enEdicion['titulo']}
          <i class="bi bi-box"></i><strong>Producto: </strong>
          <input type="text" bind:value={fieldValues['titulo']} on:blur={(e) => handleSave(e, 'titulo')} on:keydown={(e) => handleSave(e, 'titulo')} />
        {:else}
          <i class="bi bi-box"></i><strong>Producto: </strong>
          <p>{product.titulo}</p>
          <button class="button-edit" on:click={() => handleEdit('titulo')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- DESCRIPCIÓN -->
      <div class="detail-item">
        {#if enEdicion['descripcion']}
          <i class="bi bi-info-circle"></i><strong>Descripción: </strong>
          <input type="text" bind:value={fieldValues['descripcion']} on:blur={(e) => handleSave(e, 'descripcion')} on:keydown={(e) => handleSave(e, 'descripcion')} />
        {:else}
          <i class="bi bi-info-circle"></i><strong>Descripción: </strong>
          <p>{product.description}</p>
          <button class="button-edit" on:click={() => handleEdit('descripcion')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- PRECIO -->
      <div class="detail-item">
        {#if enEdicion['precio']}
          <i class="bi bi-cash"></i><strong>Precio: </strong>
          <input type="number" bind:value={fieldValues['precio']} on:blur={(e) => handleSave(e, 'precio')} on:keydown={(e) => handleSave(e, 'precio')} />
        {:else}
          <i class="bi bi-cash"></i><strong>Precio: </strong>
          <p>${product.precio}</p>
          <button class="button-edit" on:click={() => handleEdit('precio')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- UBICACIÓN -->
      <div class="detail-item">
        {#if enEdicion['ubicacion']}
          <i class="bi bi-geo-alt"></i><strong>Ubicación: </strong>
          <input type="text" bind:value={fieldValues['ubicacion']} on:blur={(e) => handleSave(e, 'ubicacion')} on:keydown={(e) => handleSave(e, 'ubicacion')} />
        {:else}
          <i class="bi bi-geo-alt"></i><strong>Ubicación: </strong>
          <p>{product.ubicacion}</p>
          <button class="button-edit" on:click={() => handleEdit('ubicacion')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- FECHA DE CIERRE -->
      <div class="detail-item">
        {#if enEdicion['fecha_cierre']}
          <i class="bi bi-calendar"></i><strong>Fecha de vencimiento: </strong>
          <input type="date" bind:value={fieldValues['fecha_cierre']} on:blur={(e) => handleSave(e, 'fecha_cierre')} on:keydown={(e) => handleSave(e, 'fecha_cierre')} />
        {:else}
          <i class="bi bi-calendar"></i><strong>Fecha de vencimiento: </strong>
          <p>{format(new Date(product.fecha_cierre), 'dd/MM/yyyy')}</p>
          <button class="button-edit" on:click={() => handleEdit('fecha_cierre')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- CANTIDAD TOTAL -->
      <div class="detail-item">
        {#if enEdicion['cantidad']}
          <i class="bi bi-boxes"></i><strong>Cantidad de Productos: </strong>
          <input type="number" bind:value={fieldValues['cantidad']} on:blur={(e) => handleSave(e, 'cantidad')} on:keydown={(e) => handleSave(e, 'cantidad')} />
        {:else}
          <i class="bi bi-boxes"></i><strong>Cantidad de Productos: </strong>
          <p>{product.cantidad}</p>
          <button class="button-edit" on:click={() => handleEdit('cantidad')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- CANTIDAD DISPONIBLE -->
      <div class="detail-item">
        {#if enEdicion['cantidad_disponible']}
            <i class="bi bi-box"></i><strong>Productos disponibles: </strong>
            <input type="number" bind:value={fieldValues['cantidad_disponible']} on:blur={(e) => handleSave(e, 'cantidad_disponible')} on:keydown={(e) => handleSave(e, 'cantidad_disponible')} />
          {:else}
              <i class="bi bi-box"></i><strong>Productos disponibles: </strong>
              <p>{product.cantidad_disponible}</p>
              <button class="button-edit" on:click={() => handleEdit('cantidad_disponible')}>
                <div class="edit-icon">
                  <FaPencilAlt />
                </div>
              </button>
          {/if}
      </div>
      <!-- TIPO DE PAGO -->
      <div class="detail-item">
        {#if enEdicion['tipo_pago']}
          <i class="bi bi-cash"></i><strong>Métodos de Pago: </strong>
          <input type="text" bind:value={fieldValues['tipo_pago']} on:blur={(e) => handleSave(e, 'tipo_pago')} on:keydown={(e) => handleSave(e, 'tipo_pago')} />
        {:else}
          <i class="bi bi-cash"></i><strong>Métodos de Pago: </strong>
          <p>{product.tipo_pago}</p>
          <button class="button-edit" on:click={() => handleEdit('tipo_pago')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>

      <!-- Botón para guardar o finalizar -->
      <div class="details-button-wrapper">
        {#if anyChange}
          <button class="btn btn-dark rounded-pill" on:click={guardarCambios}>Guardar cambios</button>
        {:else}
          <button class="btn btn-dark rounded-pill">Finalizar</button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .page-container {
    justify-content: center;
    min-height: 100vh; 
    padding: 50px;
    width: 100%;
  }

  .card {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px; 
    background: #ffffff; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    padding: 20px;
  }

  .image-wrapper {
    position: relative;
    width: 50%; 
    height: 400px; 
    overflow: hidden;
    margin-right: 30px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    border-radius: 8px;
    background-color: #f0f0f0;
  }

  .carousel-buttons {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    background: transparent;
    pointer-events: none;
  }

  .carousel-button {
    background: transparent; 
    color: rgb(226, 225, 225); 
    border: none; 
    font-size: 24px; 
    cursor: pointer; 
    padding: 10px; 
    pointer-events: all; 
  }

  .carousel-button:hover {
    color: #333;
  }

  .details {
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: left; 
    word-wrap: break-word;
    padding-top: 15px;
  }

  .detail-item {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
  }

  .detail-item i {
    margin-bottom: 5px;
    color: #393a3b; 
    padding-right: 5px;
  }

  .detail-item strong {
    padding-right: 5px;
  }

  .detail-item p {
    margin: 0; 
  }

  .edit-icon {
    cursor: pointer;
    margin-left: 5px;
    margin-top: -25px;
    width: 15px;
    color: #2d7ecb;
    transition: color 0.2s ease-in-out;
  }

  .edit-icon:hover {
    color: #1e5b92;
  }

  .button-edit {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    box-shadow: none;
  }

  input {
    border: none;
    border-radius: 4px;
    padding: 5px;
    font-size: 16px;
    width: 200px;
    outline: none;
  }

  input:focus {
    border: 1px solid #cccccc; 
    background-color: #f9f9f9; 
  }
  .titulo-pool {
        font-family: 'Arial', sans-serif; /* Puedes ajustar según tu fuente preferida */
        font-size: 2 rem; /* Título grande */
        color: #343a40; /* Color del texto */
        margin-bottom: 20px; /* Espaciado inferior */
        text-align: center; /* Alineación centrada */
  }

  .btn-dark {
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .details-button-wrapper {
      display: flex;
      justify-content: flex-end; 
      width: 100%;
      padding-right: 15px;
    }

</style>