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
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        pools = data.results;
        
        //  3 pools aleatorios
        trespools = getRandomPools(pools, 3);
      } catch (error) {
        console.error('Hubo un problema en la respuesta, error:', error);
        pools = [];
        trespools = [];
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
              titulo="Únase a grupos existentes"
              descripcion="Busque grupos basados en su ubicación"
              actionLabel="Unirse a un pool"
            />    
          </div>
          <div class="col-md-4">
            <CardButton 
              titulo="Administre sus grupos"
              descripcion="Vea y administre los creados o los que pertenece"
              actionLabel="Administrar pools"
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
                  <Cardpool data={pool} />
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