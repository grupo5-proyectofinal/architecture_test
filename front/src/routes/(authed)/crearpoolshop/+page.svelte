<script>
    import Crearpool from "../../../lib/componentes/Crearpool.svelte"
    import { isAuthenticated } from '$lib/stores/auth';
    export let data;

    let authenticated;
    $: authenticated = $isAuthenticated;
   
</script>

<main>
    <div class="crearpool">
        <Crearpool categorias={data.data}/>
    </div>
</main>

<style>
    .crearpool {
        padding: 40px;
    }
</style>