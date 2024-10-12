<script>
  import { FaPencilAlt } from "svelte-icons/fa";
    import {format} from 'date-fns'

  export let poolData;

  let currentIndex = 0;
  let imageSrc = poolData.producto.imagenes[currentIndex].imagen;

  let enEdicion = {
    title: false,
    location: false,
    description: false,
    price: false,
    expiryDate: false,
    productCount: false,
    availableProducts: false,
    paymentMethod: false,
    recommendations: false
  };

  let fieldValues = {
    title: '',
    location: '',
    description: '',
    price: '',
    expiryDate: '',
    productCount: '',
    availableProducts: '',
    paymentMethod: '',
    recommendations: ''
  };

  export let product = {
    images: poolData.producto.imagenes || [],
    title: poolData.titulo,
    location: poolData.ubicacion || 'Ubicación no disponible',
    description: poolData.descripcion,
    price: poolData.producto.precio,
    expiryDate: poolData.fecha_cierre,
    productCount: poolData.cantidad_productos,
    availableProducts: poolData.cantidad_disponible,
    paymentMethod: poolData.tipo_pago,
    // recommendations: 150
  };

  function nextImage() {
    currentIndex = (currentIndex + 1) % product.images.length;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
  }

  function handleEdit(fieldName) {
    enEdicion[fieldName] = true;
    fieldValues[fieldName] = product[fieldName];
  }

  function handleSave(event, fieldName) {
    if (event.key === "Enter" || event.type === "blur") {
      enEdicion[fieldName] = false;
      product[fieldName] = fieldValues[fieldName];
    }
  }
</script>

<div class="page-container"> 
  <div class="card">
    <div class="image-wrapper">
      <img class="image" src={imageSrc} alt="Detalle del producto"/>
      <div class="carousel-buttons">
        <button on:click={prevImage} class="button carousel-button">&lt;</button>
        <button on:click={nextImage} class="button carousel-button">&gt;</button>
      </div>
    </div>
    <div class="details">
      <h1 class="titulo-pool text-center">Detalle del Pool</h1>
      <!-- PRODUCTO -->
      <div class="detail-item">
        {#if enEdicion['title']}
          <i class="bi bi-box"></i><strong>Producto: </strong>
          <input type="text" bind:value={fieldValues['title']} on:blur={(e) => handleSave(e, 'title')} on:keydown={(e) => handleSave(e, 'title')}/>
        {:else}
          <i class="bi bi-box"></i><strong>Producto: </strong>
          <p>{product.title}</p>
          <button class="button-edit" on:click={() => handleEdit('title')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- DESCRIPCION -->
      <div class="detail-item">
        {#if enEdicion['description']}
          <i class="bi bi-info-circle"></i><strong>Descripción: </strong>
          <input type="text" bind:value={fieldValues['description']} on:blur={(e) => handleSave(e, 'description')} on:keydown={(e) => handleSave(e, 'description')}/>
        {:else}
          <i class="bi bi-info-circle"></i><strong>Descripción: </strong>
          <p>{product.description}</p>
          <button class="button-edit" on:click={() => handleEdit('description')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- PRECIO -->
      <div class="detail-item">
        {#if enEdicion['price']}
          <i class="bi bi-cash"></i><strong>Precio: </strong>
          <input type="number" bind:value={fieldValues['price']} on:blur={(e) => handleSave(e, 'price')} on:keydown={(e) => handleSave(e, 'price')}/>
        {:else}
          <i class="bi bi-cash"></i><strong>Precio: </strong>
          <p>${product.price}</p>
          <button class="button-edit" on:click={() => handleEdit('price')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- UBICACIÓN -->
      <div class="detail-item">
        {#if enEdicion['location']}
          <i class="bi bi-geo-alt"></i><strong>Ubicación: </strong>
          <input type="text" bind:value={fieldValues['location']} on:blur={(e) => handleSave(e, 'location')} on:keydown={(e) => handleSave(e, 'location')}/>
        {:else}
          <i class="bi bi-geo-alt"></i><strong>Ubicación: </strong>
          <p>{product.location}</p>
          <button class="button-edit" on:click={() => handleEdit('location')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- FECHA DE CIERRE -->
      <div class="detail-item">
        {#if enEdicion['expiryDate']}
          <i class="bi bi-calendar"></i><strong>Fecha de vencimiento: </strong>
          <input type="date" bind:value={fieldValues['expiryDate']} on:blur={(e) => handleSave(e, 'expiryDate')} on:keydown={(e) => handleSave(e, 'expiryDate')}/>
        {:else}
          <i class="bi bi-calendar"></i><strong>Fecha de vencimiento: </strong>
          <p>{format(new Date(product.expiryDate), 'dd/MM/yyyy')}</p>
          <button class="button-edit" on:click={() => handleEdit('expiryDate')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- CANTIDAD TOTAL DE PRODUCTOS -->
      <div class="detail-item">
        {#if enEdicion['productCount']}
          <i class="bi bi-boxes"></i><strong>Cantidad de Productos: </strong>
          <input type="number" bind:value={fieldValues['productCount']} on:blur={(e) => handleSave(e, 'productCount')} on:keydown={(e) => handleSave(e, 'productCount')}/>
        {:else}
          <i class="bi bi-boxes"></i><strong>Cantidad de Productos: </strong>
          <p>{product.productCount}</p>
          <button class="button-edit" on:click={() => handleEdit('productCount')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- PRODUCTOS DISPONIBLES -->
      <div class="detail-item">
        {#if enEdicion['availableProducts']}
          <i class="bi bi-box"></i><strong>Productos disponibles: </strong>
          <input type="number" bind:value={fieldValues['availableProducts']} on:blur={(e) => handleSave(e, 'availableProducts')} on:keydown={(e) => handleSave(e, 'availableProducts')}/>
        {:else}
          <i class="bi bi-box"></i><strong>Productos disponibles: </strong>
          <p>{product.availableProducts}</p>
          <button class="button-edit" on:click={() => handleEdit('availableProducts')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- Método de Pago -->
      <div class="detail-item">
        {#if enEdicion['paymentMethod']}
          <i class="bi bi-box"></i><strong>Métodos de Pago: </strong>
          <input type="text" bind:value={fieldValues['paymentMethod']} on:blur={(e) => handleSave(e, 'paymentMethod')} on:keydown={(e) => handleSave(e, 'paymentMethod')}/>
        {:else}
          <i class="bi bi-box"></i><strong>Métodos de Pago: </strong>
          <p>{product.paymentMethod}</p>
          <button class="button-edit" on:click={() => handleEdit('paymentMethod')}>
            <div class="edit-icon">
              <FaPencilAlt />
            </div>
          </button>
        {/if}
      </div>
      <!-- RECOMENDACIONES -->
      <div class="detail-item">
        <i class="bi bi-star-fill"></i><strong>150 personas lo recomiendan</strong>
      </div>
      <!-- Botón -->
      <div class="details-button-wrapper">
        <button class="btn btn-dark rounded-pill">Guardar cambios</button>
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