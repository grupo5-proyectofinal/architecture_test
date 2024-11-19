<script>
    import { onMount } from 'svelte';

    export let placeholder = "Buscar...";
    
    let searchQuery = '';
    let filteredPools = [];
    let isLoading = false;
    let error = '';

    let timeout;

    function handleSearch() {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            if (searchQuery.trim() === '') {
                filteredPools = [];
                return;
            }

            isLoading = true;
            error = '';

            try {
                const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools?producto=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) throw new Error('Error al cargar los pools de compras');
                const data = await response.json();
                console.log(data)
                filteredPools = data;
            } catch (err) {
                error = err.message;
            } finally {
                isLoading = false;
            }
        }, 300);
    }

    onMount(() => {
        handleSearch();
    });


</script>

<div class="container">
    <div class="row">
        <div class="container mt-3">
            <input 
                class="form-control mb-3" 
                type="text" 
                bind:value={searchQuery} 
                on:input={handleSearch} 
                placeholder={placeholder} 
            />

            {#if isLoading}
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Cargando...</span>
                    </div>
                </div>
            {/if}

            {#if error}
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            {/if}

            <div>
                {#if filteredPools.length > 0}
                    <h5 class="subtitulo">Pools de Compras Abiertos</h5>
                    <ul class="list-group mb-3">
                        {#each filteredPools as pool}
                            <li class="list-group-item">{pool.producto.nombre}</li>
                        {/each}
                    </ul>
                {/if}

                {#if searchQuery && filteredPools.length === 0 && !isLoading}
                    <p class="text-muted">No se encontraron resultados.</p>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .titulo-home {
        font-family: 'Arial', sans-serif; /* Puedes ajustar según tu fuente preferida */
        font-size: 3.5rem; /* Título grande */
        color: #343a40; /* Color del texto */
        margin-bottom: 20px; /* Espaciado inferior */
        text-align: center; /* Alineación centrada */
    }

    .subtitulo {
        font-family: inherit; /* Hereda la fuente */
        font-size: 1.75rem; /* Tamaño más pequeño que el título */
        color: #343a40; /* Mismo color */
        margin-top: 20px; /* Espaciado superior */
    }

    .list-group-item {
        font-family: inherit; /* Hereda la fuente */
        font-size: 1rem; /* Ajusta según tu preferencia */
    }
</style>
