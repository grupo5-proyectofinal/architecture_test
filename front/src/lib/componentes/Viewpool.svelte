
<script>
  import {format} from 'date-fns'
  export let data;
  export let imagenPreview;
  let currentIndex = 0;
  let imageSrc = data?.producto?.imagenes?.[currentIndex]?.imagen || imagenPreview.imagenes?.[currentIndex]?.imagen ;
  let descripcion = data.producto.descripcion;
  let titulo = data.producto.nombre;
  let fecha_cierre = format(new Date(data.fecha_cierre), 'dd/MM/yyyy');
  let cantidad_productos = data.producto.cantidad;
  let cantidad_disponible = data.cantidad_disponible;
  let tipo_pago = data.tipo_pago;
  let precio = data.producto.precio;
  let id = data.id

  import BtnJoin from "./BtnJoin.svelte";

  import Modal from './ModalConfirmation.svelte'; 
  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
 



  export let product = {
    images: imagenPreview,
    title: titulo,
    //location: 'Rancho ST ruta 12.Corrientes, Argentina',
    description: descripcion,
    price: precio,
    expiryDate: fecha_cierre,
    productCount: cantidad_productos,
    availableProducts: cantidad_disponible,
    paymentMethod: tipo_pago,
    recommendations: 150 
  };
  
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
      <!-- <img class="image" src={product.images[currentIndex]} alt="Descripción de la imagen del producto"/> -->
       <img class="image" src={imageSrc} alt="Detalle del producto"/>
      <div class="carousel-buttons">
        <button on:click={prevImage} class="button carousel-button">&lt;</button>
        <button on:click={nextImage} class="button carousel-button">&gt;</button>
      </div>
    </div>
    <div class="details"> 
      <div class="detail-item">
        <i class="bi bi-box"></i><strong>Producto: </strong>
        <p>{product.title}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-info-circle"></i><strong>Descripción: </strong>
        <p>{product.description}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-cash"></i><strong>Precio: </strong>
        <p>{product.price}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-geo-alt"></i><strong>Ubicación: </strong>
        <p>{product.location}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-calendar"></i><strong>Fecha de vencimiento del pool: </strong>
        <p>{product.expiryDate}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-boxes"></i><strong>Cantidad de Productos: </strong>
        <p>{product.productCount}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-box-seam"></i><strong>Productos Disponibles: </strong>
        <p>{product.availableProducts}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-credit-card"></i><strong>Método de Pago: </strong>
        <p>{product.paymentMethod}</p>
      </div>
      <div class="detail-item">
        <i class="bi bi-star-fill"></i><strong></strong>
        <p>{product.recommendations} personas lo recomiendan</p>
      </div>
      <div class="join-button-wrapper">
        <button class="btn btn-dark rounded-pill" on:click={openModal}>Unirse</button>
      </div>
    </div>
  </div>
</div>

{#if showModal}
  <BtnJoin id={id} availableProducts={product.availableProducts} isOpen={showModal} onClose={closeModal}/>
{/if}

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
    margin-right: 30px; /* Espacio entre la imagen y el texto */
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
    background: transparent; /* Fondo completamente transparente */
    pointer-events: none; /* Permite que el ratón pase a través del área de fondo */
  }

  .carousel-button {
    background: transparent; 
    color: rgb(226, 225, 225); 
    border: none; 
    font-size: 24px; 
    cursor: pointer; /* Cursor de puntero para indicar que es clickeable */
    padding: 10px; /* Espacio alrededor del icono */
    pointer-events: all; /* Asegura que los botones respondan a los eventos del ratón */
  }

  .carousel-button:hover {
    color: #333; /* Color un poco más oscuro al pasar el ratón */
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
    flex-direction: row; /* Asegura que el texto esté debajo del ícono y el título */
  }

  .detail-item i {
    margin-bottom: 5px; /* Espacio entre el ícono y el título */
    color: #393a3b; 
    padding-right: 5px;
  }

  .detail-item strong {
    padding-right: 5px;
  }

  .detail-item p {
    margin: 0; /* Elimina márgenes adicionales en los párrafos */
  }
  .btn-dark {
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .join-button-wrapper {
      display: flex;
      justify-content: flex-end; 
      width: 100%;
      padding-right: 15px;
    }
</style>
