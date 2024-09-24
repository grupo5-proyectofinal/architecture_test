<script>
    import { goto } from '$app/navigation';
    export let titulo = '';
    export let descripcion = '';
    export let icon = '';
    export let actionLabel = '';
    export let redirectTo;

    function handleClick() {
        goto(redirectTo);
    }
</script>

<button class="card text-center" on:click={handleClick} aria-label={titulo}>
    <div class="card-body">
        {#if icon}
            <div class="mb-3">
                <i class={icon}></i>
            </div>
        {/if}
        <h5 class="card-titulo">{titulo}</h5>
        <p class="card-text">{descripcion}</p>
        <span class="btn btn-dark rounded-pill">{actionLabel}</span>
    </div>
</button>

<style>
    .card {
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        display: block; /* Asegura que el botón se comporte como bloque */
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .btn-dark {
        background-color: #343a40;
        color: #fff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-dark:hover {
        background-color: #495057; /* Cambia el color al pasar el mouse */
    }
</style>