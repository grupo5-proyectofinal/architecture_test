<script>

    import Header from '../lib/componentes/Header.svelte';
    import Footer from "../lib/componentes/Footer.svelte";
    import Cardpool from '../lib/componentes/Cardpool.svelte';
    import CardButton from '../lib/componentes/CardButton.svelte';
    import Filter from '../lib/componentes/Filter.svelte';
    import { onMount } from 'svelte';
   
    
  
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
  
  </script>
  
  <main>
    <Header />
    <br />
    <div class="body">
      <div class="container">
        <div class="row">
          <div class="col">
            <Filter />
          </div>
        </div>
        
        <!-- Sección de botones -->
        <div class="row">
          <div class="col-md-4">
            <CardButton 
              titulo="Cree nuevo pool de compra"
              descripcion="Empiece creando su propio Pool de compra"
              actionLabel="Crear pool"
              redirectTo="/crearpoolshop"
            />
          </div>
          <div class="col-md-4">
            <CardButton 
            titulo="Explore pools abiertos"
            descripcion="Explore pools de otros usuarios y unase!"
            actionLabel="Ver pools"
          />   
          </div>
          <div class="col-md-4">
            <CardButton 
              titulo="Administre sus pools"
              descripcion="Vea y administre sus pools"
              actionLabel="Administrar mis pools"
            />      
          </div>
        </div>
  
        <!-- Sección de pools más vistos -->
        <div class="container">
          <div class="pool-visto-container">
            <h2 class="text-body-secondary">
              Pools más vistos
            </h2>
          </div>
          <br />
          <div class="container">
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
    </div>
    <Footer />
  </main>
  
  <style>
    .body {
      padding: 75px;
    }
    .pool-visto-container {
      text-align: center;
      margin-top: 20px;  
    }
  </style>  