<script>
  import {goto} from '$app/navigation';
  import {format} from 'date-fns'
  export let data;
  export let imagePreview = "http://www.w3.org/2000/svg";


  let imageSrc = data?.producto?.imagenes?.[0]?.imagen || imagePreview;
  let fecha = format(new Date(data.fecha_cierre), 'dd/MM/yyyy HH:mm');
  let estado = data.estado
  let cantidad_disponible = data.cantidad_disponible;
  let cantidad_comprada = data.cantidad_comprada;
  let progreso = (cantidad_comprada / cantidad_disponible) * 100;
  let creador = data.creador?.username || "Usuario";

  let id = parseInt(data.id)

  function handleClick() {
    goto(`/verpool/${id}`);
  }

console.log(imageSrc)

</script>

<div class="card mb-3 pool-card">

    <div class="card-header">
      <div class="creator-info d-flex align-items-center">
        <img src={imageSrc} alt="" class="creator-avatar" />
        <p class="creator-name">{creador}</p>
      </div>
    </div>

    <div class="card-image-container">
        <img src={imageSrc} class="card-img-top pool-image" alt="Imagen del producto" />
    </div>
  
    <div class="card-body">
      <h3 class="card-title">{data.titulo}</h3>
      <p class="card-text text-muted">${data.producto.precio} por unidad</p>
      <p class="card-text">{cantidad_disponible} de {data.producto.cantidad} disponible</p>
  
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: {progreso}%"></div>
      </div>
      <div class="button-container">
        <a href="#" on:click={handleClick} class="btn btn-primary view-pool-button">Ver</a>
      </div>
    </div>
</div>

  <style>
.pool-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 500px;
  height: 500px;
}

.pool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* Información del creador del pool */
.card-header {
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #eaeaea;
}

.creator-info {
  display: flex;
  align-items: center;
}

.creator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.creator-name {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.card-image-container {
  width: 100%;
  height: 250px; 
  overflow: hidden;
}

.pool-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.card-text {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 10px;
}

.progress-bar-container {
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 8px;
  height: 12px;
}

.progress-bar {
  background-color: #0084ff;
  height: 100%;
  transition: width 0.4s ease;
}

/* Botón Ver Pool */
.button-container {
  text-align: center;
  margin-top: 10px;
}

.view-pool-button {
  background-color: #3b5998;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-pool-button:hover {
  background-color: #2d4373;
}

  </style>