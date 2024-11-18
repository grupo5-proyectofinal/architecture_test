<script>
    export let images = [];
</script>

<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
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
      </div>
    {/each}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<style>
  /* Agrega estilos personalizados si es necesario */
</style>