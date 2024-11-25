<script>
    import Cardpool from '../../../lib/componentes/Cardpool.svelte';
    import { onMount } from 'svelte';
    import Carrusel from '../../../lib/componentes/Carrusel.svelte';


    let image1 = '/img/01.jpg'
    let image2 = '/img/02.jpg'
    let image3 = '/img/03.jpg' 
    
  
    let trespools = [];
    let pools = [];
  
    // Función para obtener tres elementos aleatorios del array
    function getRandomPools(array, num) {
      let shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }
  
    // Lógica de carga de datos en el cliente usando onMount
    onMount(async () => {
      try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/pools/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        pools = data;
         //3 pools aleatorios
        trespools = getRandomPools(pools, 3);
      } catch (error) {
        console.error('Hubo un problema en la respuesta, error:', error);
      }
    });


    const images = [
    {
      // src: 'https://via.placeholder.com/800x400?text=First+Slide',
      src: image1,
      title: 'Bienvenido a poolshop de compras'
    },
    {
      // src: 'https://via.placeholder.com/800x400?text=Second+Slide',
      src: image2,
      title: 'Busca un producto de tu interes y ahorra hasta 50 % más'
    },
    {
      // src: 'https://via.placeholder.com/800x400?text=Third+Slide',
      src:image3,
      title: 'Encuentra usuarios para realizar compras al por mayor'
    }
  ];
  
  </script>
  
  <main>
    <br />
    <div class="body">
      <Carrusel {images}/>

      <!-- Sección de pools más vistos -->
      <div class="container">
        <div class="pool-visto-container">
            <h2 class="text-body-secondary">
              Pools más vistos
            </h2>
        </div>
        <br />
        <div class="container-fluid">
          <div class="row">
            {#each trespools as pool}
              <div class="col">
                <Cardpool
                imagePreview={pool}
                data={pool} 
                />
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <style>
    .body {
      padding: 40px;
    }
    .pool-visto-container {
      text-align: center;
      margin-top: 20px;  
    }
  </style>  