<script>
	
	import Footer from "./Components/footer.svelte";
	import Header from "./Components/header.svelte";
	import Home from "./routes/Home.svelte";
</script>


<main>
	<Header />
	<br/>
	<Home />
	<br/>
	<Footer />
	
</main>


<style>

  main {
    max-width: 960px;
    margin: 100px auto 20px; 
    padding: 20px; 
  }
</style>
