<script>
    export let images = [];
</script>

<div id="carouselExampleIndicators" class="carousel slide rounded-carousel" data-ride="carousel">
  <ol class="carousel-indicators">
    {#each images as _, index}
      <li 
        data-target="#carouselExampleIndicators" 
        data-slide-to={index} 
        class={index === 0 ? 'active' : ''}>
      </li>
    {/each}
  </ol>
  <div class="carousel-inner">
    {#each images as image, index}
      <div class="carousel-item {index === 0 ? 'active' : ''}">
        <img class="d-block w-100" src={image.src} alt={image.alt || `Slide ${index + 1}`}>
        <div class="carousel-caption">
          <h1>{image.title || `Slide ${index + 1}`}</h1>
        </div>
      </div>
    {/each}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onclick="event.preventDefault()">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onclick="event.preventDefault()">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<style>
    .rounded-carousel {
    max-width: 100%;
    height: 380px;
    margin: 0 auto; 
    border-radius: 20px; /* Ajusta el radio de las curvas */
    overflow: hidden; /* Asegura que el contenido respete las curvas */
  }
    .carousel-caption {
    position: absolute;
    top: 50%; /* Centra verticalmente */
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgb(216, 87, 1);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Mejor visibilidad */
    /*background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
    padding: 10px;
    border-radius: 5px; /* Bordes redondeados */
  }
    .carousel-caption h1{
      font-weight: 700;
    }

  /* Ajustes responsivos para texto */
  @media (max-width: 768px) {
    .carousel-caption h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  @media (max-width: 576px) {
    .carousel-caption h1 {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

</style>