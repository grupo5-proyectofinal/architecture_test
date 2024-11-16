<script>
    import Cardpool from '../lib/componentes/Cardpool.svelte';
    import CardButton from '../lib/componentes/CardButton.svelte';
    import Filter from '../lib/componentes/Filter.svelte';
    import { onMount } from 'svelte';
   
    
  
    let searchQuery = '';
    let pools = [];
    let filteredPools = [];
    let trespools = [];
    let categories = [];
    let selectedCategory = '';
  
    // Función para obtener tres elementos aleatorios del array
    function getRandomPools(array, num) {
      let shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }
  
    // Lógica de carga de datos en el cliente usando onMount
    onMount(async () => {
      try {
        const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/pools/');

        if (!response.ok) throw new Error('Network response was not ok');
  
        pools = await response.json();
        trespools = getRandomPools(pools, 3);

        const categoriesResponse = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/categories/');
        if (!categoriesResponse.ok) throw new Error('Error al cargar las categorías');
        categories = await categoriesResponse.json();
        
      } catch (error) {
        console.error('Hubo un problema en la respuesta, error:', error);
      }
    });

    async function handleSearch(){
      if (!searchQuery.trim() && !selectedCategory) {
        filteredPools = pools;
        trespools = getRandomPools(pools, 3);
        return;
      }

      try {
        const url = `https://poolshop-staging-748245240444.us-central1.run.app/api/pools?producto=${encodeURIComponent(searchQuery)}${selectedCategory ? `&categoria=${encodeURIComponent(selectedCategory)}` : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar los pools filtrados');

        filteredPools = await response.json();
        trespools = getRandomPools(filteredPools, 3);
      } catch (err) {
        console.error('Error en la busqueda', err);
      }
    }

    function handleCategoryChange(event) {
      selectedCategory = event.target.value;
      handleSearch();
    }
  
  </script>
  
  <main>
    <br />
    <div class="body">
      <div class="container">
        <div class="row">
          <h1 class="titulo-home text-center mt-5">Bienvenido a Pool Shop</h1>
        </div>
      </div>
      <div class="container">
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
              redirectTo="/verpool"
              actionLabel="Ver pools"
            />   
            </div>
            <div class="col-md-4">
              <CardButton 
                titulo="Administre sus pools"
                descripcion="Vea y administre sus pools abiertos/cerrados"
                redirectTo="/"
                actionLabel="Ver mis pools"
              />      
            </div>
          </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-9">
            <input 
              class="form-control mb-3" 
              type="text" 
              bind:value={searchQuery} 
              on:input={handleSearch} 
              placeholder="Buscar por producto..."
            />
          </div>
          <div class="col-3">
            <select 
              class="form-control mb-3" 
              on:change={handleCategoryChange}
            >
              <option value="">Todas las categorías</option>
              {#each categories as category}
                <option value={category.nombre}>{category.nombre}</option>
              {/each}
            </select>
        </div>
      </div> 
      <!-- Sección de pools más vistos -->
      <div class="container">
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
      padding: 10px;
    }
  </style>  