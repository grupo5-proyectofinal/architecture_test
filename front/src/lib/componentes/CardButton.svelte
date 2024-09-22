<script>
    import { goto } from '$app/navigation'
    export let titulo = '';
    export let descripcion = '';
    export let icon = '';
    export let actionLabel = '';
    export let redirectTo
    
    function handleClick() {
        goto(redirectTo);
    }

</script>

<div class="card text-center">
    <div class="card-body">
        {#if icon}
            <div class="mb-3">
                <i class={icon}></i>
            </div>
        {/if}
        <h5 class="card-titulo">{titulo}</h5>
        <p class="card-text">{descripcion}</p>
        <button class="btn btn-dark rounded-pill" on:click={handleClick}>{actionLabel}</button>
    </div>
</div>

<style>
    .card {
        margin-bottom: 20px;
    }
    .btn-dark {
        background-color: #343a40;
        color: #fff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
     }
</style>
