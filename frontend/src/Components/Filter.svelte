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
            // Llamada a la API para obtener los pools de compras abiertos
            const poolsResponse = await fetch(`https://api.example.com/pools?search=${encodeURIComponent(searchQuery)}`);
            if (!poolsResponse.ok) throw new Error('Error al cargar los pools de compras');
            const poolsData = await poolsResponse.json();

            // Llamada a la API para obtener los usuarios
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

    // Ejecución inicial para cargar los datos al montar el componente
    onMount(() => {
        handleSearch();
    });
</script>
<div class="container">
        <div class="row">
            <h1 class="display-4 text-center mt-5">Bienvenido a Pool Shop</h1>
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
                    <!-- Mostrar resultados de los pools filtrados -->
                    {#if filteredPools.length > 0}
                        <h5>Pools de Compras Abiertos</h5>
                        <ul class="list-group mb-3">
                            {#each filteredPools as pool}
                                <li class="list-group-item">{pool.name}</li>
                            {/each}
                        </ul>
                    {/if}

                    <!-- Mostrar resultados de los usuarios filtrados -->
                    {#if filteredUsers.length > 0}
                        <h5>Usuarios</h5>
                        <ul class="list-group">
                            {#each filteredUsers as user}
                                <li class="list-group-item">{user.name}</li>
                            {/each}
                        </ul>
                    {/if}

                    <!-- Mostrar mensaje si no hay resultados -->
                    {#if searchQuery && filteredPools.length === 0 && filteredUsers.length === 0 && !isLoading}
                        <p class="text-muted">No se encontraron resultados.</p>
                    {/if}
                </div>
            </div>
        </div>
</div>