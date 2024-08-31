<script>
    import Home from '../lib/componentes/Home.svelte'
    import Header from '../lib/componentes/Header.svelte';
    import Footer from "../lib/componentes/Footer.svelte"
    import Cardpool from '../lib/componentes/Cardpool.svelte';
</script>

<main>
    <Header />
    <br />
    <Home />
    <br />
    <div class="pool-visto-container">
        <h2 class="text-body-secondary">
            Pools más vistos
        </h2>
    </div>
    <div class="container">
        <div class="row">
            <div class="col">
                <Cardpool />
            </div>
            <div class="col">
                <Cardpool />
            </div>
            <div class="col">
                <Cardpool />
            </div>
        </div>
    </div>
    <Footer />

</main>

<style>
    .pool-visto-container {
        text-align: center;
        margin-top: 20px;  
    }
</style>