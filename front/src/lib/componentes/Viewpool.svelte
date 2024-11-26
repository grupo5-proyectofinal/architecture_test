<script>
  import { format } from "date-fns";
  import BtnJoin from "./BtnJoin.svelte";

  export let data;
  export let imagenPreview;

  let showModal = false;
  let currentIndex = 0;

  const {
    producto: { imagenes = [], descripcion = "Descripción no disponible", nombre = "Producto sin nombre", precio = 0, cantidad = "N/A" } = {},
    fecha_cierre,
    cantidad_disponible = 0,
    tipo_pago = "No especificado",
    id,
  } = data;

  const product = {
    images: imagenes.map((img) => img.imagen) || ["/img/default.jpg"],
    title: nombre,
    description: descripcion,
    price: precio.toLocaleString() || "0.00",
    expiryDate: fecha_cierre ? format(new Date(fecha_cierre), "dd/MM/yyyy") : "Sin fecha",
    productCount: cantidad,
    availableProducts: cantidad_disponible,
    paymentMethod: tipo_pago,
    recommendations: 150,
  };

  function nextImage() {
    currentIndex = (currentIndex + 1) % product.images.length;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
  }
</script>

<div class="card">
  <div class="image-container {showModal ? 'hide-arrows' : ''}">
    <img src={product.images[currentIndex]} alt={product.title} class="product-image" />
    {#if product.images.length > 1}
      <button class="carousel-btn prev" on:click={prevImage}>&lt;</button>
      <button class="carousel-btn next" on:click={nextImage}>&gt;</button>
    {/if}
  </div>
  <div class="details-container">
    <h2 class="product-title">{product.title}</h2>
    <p class="product-description">{product.description}</p>
    <div class="product-details">
      <div><strong>Precio:</strong> ${product.price}</div>
      <div><strong>Fecha de Vencimiento:</strong> {product.expiryDate}</div>
      <div>
        <strong>Disponibles:</strong>
        <span class="highlight">
          {product.availableProducts} de {product.productCount}
        </span>
      </div>
      <div><strong>Método de Pago:</strong> {product.paymentMethod}</div>
      <div><strong>{product.recommendations} personas lo recomiendan</strong></div>
    </div>
    <button class="join-button" on:click={() => (showModal = true)}>Unirse</button>
  </div>
</div>

{#if showModal}
  <BtnJoin id={id} availableProducts={product.availableProducts} isOpen={showModal} onClose={() => (showModal = false)} />
{/if}

<style>
  .card {
    display: flex;
    flex-direction: row;
    max-width: 1000px;
    margin: 2rem auto;
    background: linear-gradient(to bottom, #ffffff, #f9f9f9);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .image-container {
    flex: 1.2;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  .image-container.hide-arrows .carousel-btn {
    display: none; /* Ocultar flechas cuando el modal está activo */
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 5; /* Ajustar para no estar encima del modal */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    transition: background 0.3s ease;
  }

  .details-container {
    flex: 2;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .join-button {
    background: #333; /* Usar el mismo estilo que el header */
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    width: 100%;
    transition: all 0.3s ease;
  }

  .join-button:hover {
    background: #222;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Asegurar que el modal esté encima */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
</style>
