<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores'; // To access query parameters in SvelteKit

    let pools = [];
    let isLoading = true;
    let error = '';
    let producto = '';

    // Retrieve the query parameter
    $: {
        producto = $page.url.searchParams.get('producto') || '';
    }

    async function fetchPools() {
        try {
            const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools?producto=${encodeURIComponent(producto)}`);
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
        <div>
            <label for="category">Categoría:</label>
            <select id="category">
                <option value="">Todas</option>
                <option value="electronics">Electrónica</option>
                <option value="fashion">Moda</option>
                <!-- Add more options -->
            </select>
        </div>
    </div>

    <div class="results">
        {#if isLoading}
            <p>Cargando pools...</p>
        {/if}

        {#if error}
            <p class="error">{error}</p>
        {/if}

        {#if !isLoading && pools.length === 0}
            <p>No se encontraron pools de compras.</p>
        {/if}

        {#each pools as pool}
            <div class="pool-card">
                <h5>{pool.producto.nombre}</h5>
                <p>{pool.producto.descripcion}</p>
                <!-- Add more pool details -->
            </div>
        {/each}
    </div>
</div>

<style>
    .marketplace-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
    }

    .filters {
        flex: 1;
        border-right: 1px solid #ccc;
        padding-right: 1rem;
    }

    .results {
        flex: 3;
    }

    .pool-card {
        border: 1px solid #ddd;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 5px;
    }
</style>