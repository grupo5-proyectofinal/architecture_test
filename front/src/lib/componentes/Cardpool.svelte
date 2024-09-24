<script>
  import {goto} from '$app/navigation';
  import {format} from 'date-fns'
  export let data;
  export let imagePreview = "http://www.w3.org/2000/svg";


  let imageSrc = data?.producto?.imagenes?.[0]?.imagen || imagePreview;
  let fecha = format(new Date(data.fecha_cierre), 'dd/MM/yyyy HH:mm');
  let estado = data.estado
  let id = data.id

  function handleClick(event) {
    event.preventDefault(); 
    goto(`/verpool`);
  }


</script>

<div class="card mb-3">
    <h3 class="card-header titulo-clamp">{data.titulo}</h3>
    <!-- <div class="card-body">
      <h5 class="card-title">{data.descripcion}</h5>
      <h6 class="card-subtitle text-muted">{data.categoria}</h6>
    </div> -->
    <div style="width: 100%; height: 200px; overflow: hidden;">
      <a href="#" on:click={handleClick} >
        <img src={imageSrc}
        class="d-block user-select-none"
        style="width: 100%; height: 100%; object-fit: cover;" 
        alt="Imagen del producto"
        />
      </a>
    </div>
        
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Participantes: {data.minimo_participantes}</li>
      <!-- Boton Estado> -->
      <li class="list-group-item">
        {estado}
        <button class="boton-redondo {estado === 'abierto' ? 'abierto' : 'cerrado'}"></button>
      </li>
    </ul>
    <div class="card-footer text-muted">
      <div class="d-flex justify-content-center">
        {fecha}
      </div>
    </div>
  </div>

  <style>
  .titulo-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-height: 3em; 
  }
    /* Estilos para el botón redondo */
  .boton-redondo {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 10px;
      border: none;
    }
  
    /* Clases para los diferentes estados */
  .abierto {
      background-color: green;
    }
  
  .cerrado {
      background-color: red;
    }
  
  li {
      list-style: none;
      margin-bottom: 10px;
    }

  </style>