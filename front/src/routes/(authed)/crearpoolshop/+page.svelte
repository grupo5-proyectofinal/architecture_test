<script>
    import Crearpool from "../../../lib/componentes/Crearpool.svelte"

    export let data;
   
</script>

<main>
    <div class="crearpool">
        <Crearpool categorias={data.data}/>
    </div>
</main>

<style>
    .crearpool {
        padding: 120px;
    }
</style>