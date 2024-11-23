<script>
    import { onMount } from 'svelte';

    export let placeholder = "Buscar...";
    
    let searchQuery = '';
    let filteredPools = [];

    async function handleSearch() {
        if (searchQuery.trim() === '') {
            filteredPools = [];
            return;
        }
        console.log(searchQuery);
        try {
            const response = await fetch(`https://poolshop-staging-748245240444.us-central1.run.app/api/pools?producto=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) throw new Error('Error al cargar los pools de compras');
            const data = await response.json();
            console.log(data);
            filteredPools = data;

        } catch (err) {
            console.error(err);
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSearch();
        }
    }


</script>

<input 
    class="search-input" 
    type="text" 
    bind:value={searchQuery} 
    on:keydown={handleKeydown} 
    placeholder={placeholder} 
/>

<div>
    {#if filteredPools.length > 0}
        <h5 class="subtitulo">Pools de Compras Abiertos</h5>
        <ul class="list-group mb-3">
            {#each filteredPools as pool}
                <li class="list-group-item">{pool.producto.nombre}</li>
            {/each}
        </ul>
    {/if}
</div>
    
<style>
    .search-input {
    border: none;
    background: none;
    outline: none;
    font-size: 1rem;
    color: #333;
    width: 100%;
    padding-left: 10px;
}
</style>