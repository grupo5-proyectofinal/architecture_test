<script>
    import { onMount } from 'svelte';

    export let placeholder = "Buscar...";
    
    let searchQuery = '';
    let filteredPools = [];
    let filteredUsers = [];
    let isLoading = false;
    let error = '';

    // Función para manejar la búsqueda
    async function handleSearch() {
        if (searchQuery.trim() === '') {
            filteredPools = [];
            filteredUsers = [];
            return;
        }

        isLoading = true;
        error = '';

        try {
            const poolsResponse = await fetch(`https://api.example.com/pools?search=${encodeURIComponent(searchQuery)}`);
            if (!poolsResponse.ok) throw new Error('Error al cargar los pools de compras');
            const poolsData = await poolsResponse.json();

            const usersResponse = await fetch(`https://api.example.com/users?search=${encodeURIComponent(searchQuery)}`);
            if (!usersResponse.ok) throw new Error('Error al cargar los usuarios');
            const usersData = await usersResponse.json();

            filteredPools = poolsData;
            filteredUsers = usersData;
        } catch (err) {
            error = err.message;
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        handleSearch();
    });
</script>

<div class="container">
    <div class="row">
        <h1 class="titulo-home text-center mt-5">Bienvenido a Pool Shop</h1>
    </div>
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
                            <li class="list-group-item">{pool.name}</li>
                        {/each}
                    </ul>
                {/if}

                {#if filteredUsers.length > 0}
                    <h5 class="subtitulo">Usuarios</h5>
                    <ul class="list-group">
                        {#each filteredUsers as user}
                            <li class="list-group-item">{user.name}</li>
                        {/each}
                    </ul>
                {/if}

                {#if searchQuery && filteredPools.length === 0 && filteredUsers.length === 0 && !isLoading}
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
