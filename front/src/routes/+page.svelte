<script>
    import Home from '../lib/componentes/Home.svelte'
    import Header from '../lib/componentes/Header.svelte';
    import Footer from "../lib/componentes/Footer.svelte"
    import Cardpool from '../lib/componentes/Cardpool.svelte';
</script>

<main>
    <Header />
    <br />
    <div class="body">
        <Home />
        <div class="container">
            <div class="pool-visto-container">
                <h2 class="text-body-secondary">
                    Pools más vistos
                </h2>
            </div>
            <br />
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
        </div>
    </div>
    <Footer />

</main>

<style>
    .body{
        padding: 75px;
    }
    .pool-visto-container {
        text-align: center;
        margin-top: 20px;  
    }
</style>
