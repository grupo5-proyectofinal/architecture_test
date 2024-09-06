<script>
    import Crearpool from "../../lib/componentes/Crearpool.svelte"
    import Footer from "../../lib/componentes/Footer.svelte";
    import Header from "../../lib/componentes/Header.svelte";
   
</script>

<main>
    <Header />
    <div class="crearpool">
        <Crearpool />
    </div>
    <Footer />
</main>

<style>
    .crearpool {
        padding: 120px;
    }
</style>