<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Cardpool from '$lib/componentes/Cardpool.svelte';

  let pools = [];
  let isLoading = true;
  let error = '';
  let producto = '';
  let categoria = '';
  let precioMin = '';
  let precioMax = '';
  let ubicacion = '';

  // Retrieve the query parameter
  // Reactividad para detectar cambios en los parámetros de la URL
  $: producto = $page.url.searchParams.get('producto') || '';
  $: categoria = $page.url.searchParams.get('categoria') || '';
  $: ubicacion = $page.url.searchParams.get('ubicacion') || '';

  $: if (producto || categoria || ubicacion) {
    fetchPools();
  }
  
  async function fetchPools() {
    pools = [];
    let url = `https://poolshop-staging-748245240444.us-central1.run.app/api/pools?producto=${encodeURIComponent(producto)}`;

    if (categoria) url += `&categoria=${encodeURIComponent(categoria)}`;
    if (ubicacion) url += `&ubicacion=${encodeURIComponent(ubicacion)}`;

    try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Error al cargar los pools de compras');
          const data = await response.json();
          pools = data;
    } catch (err) {
        error = err.message;
    } finally {
        isLoading = false;
    }
  }

  onMount(fetchPools);

</script>

<div class="marketplace-container">
    <div class="filters">
        <h4>Filtros</h4>
      <!-- Add your filter options here -->
      <div class="filter-group">
            <label for="category">Categoría:</label>
            <select id="category" bind:value={categoria}>
                <option value="">Todas</option>
                <option value="electronics">Electrónica</option>
                <option value="fashion">Moda</option>
                <option value="vehicles">Vehículos</option>
                <option value="home">Hogar</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="price-min">Precio:</label>
            <div class="price-filter">
                <input id="price-min" type="number" placeholder="Mín." />
                <input id="price-max" type="number" placeholder="Máx." />
            </div>
        </div>
        <div class="filter-group">
            <label for="location">Ubicación:</label>
            <input id="location" type="text" placeholder="Ej: Ciudad de México" bind:value={ubicacion} />
        </div>
        <button class="apply-filters" on:click={fetchPools}>Aplicar</button>
    </div>

  <div class="results">
      <div class="pool-grid">
        {#each pools as pool}
            <Cardpool
            imagePreview={pool}
            data={pool} 
            />
        {/each}
        </div>
  </div>
</div>

<style>
    /* Contenedor principal */
    .marketplace-container {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      background-color: #f4f5f7;
      min-height: 100vh;
    }
  
    /* Filtros */
    .filters {
      flex: 1;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      font-family: 'Arial', sans-serif;
    }
  
    .filter-group {
      margin-bottom: 1.5rem;
    }
  
    .filter-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  
    .filter-group input,
    .filter-group select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .price-filter {
      display: flex;
      gap: 0.5rem;
    }
  
    .apply-filters {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
      width: 100%;
      text-align: center;
    }
  
    .apply-filters:hover {
      background-color: #0056b3;
    }
  
    /* Resultados */
    .results {
      flex: 3;
      font-family: 'Arial', sans-serif;
    }
  
    .pool-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
  
    .loading {
      text-align: center;
      font-size: 1.2rem;
      color: #333;
    }
  
    .no-results {
      text-align: center;
      font-size: 1.2rem;
      color: #999;
    }
  
    .error {
      text-align: center;
      color: red;
      font-weight: bold;
    }
  </style>

