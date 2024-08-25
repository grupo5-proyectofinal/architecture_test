<script>
    export let titulo = '';
    export let descripcion = '';
    export let icon = '';
    export let actionLabel = '';
    export let onAction = () => {};
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
        <button class="btn btn-secondary" on:click={onAction}>{actionLabel}</button>
    </div>
</div>

<style>
    .card {
        margin-bottom: 20px;
    }
</style>
