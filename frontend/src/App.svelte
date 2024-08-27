<script>
	
	import Footer from "./Components/footer.svelte";
	import Header from "./Components/header.svelte";
    import Form from "./Components/Form.svelte";
</script>

<Header />
<br/>
<main>
	<Header />
	<Form />
	
	<Footer />
</main>
<br/>
<Footer />

<style>

  main {
    max-width: 960px;
    margin: 100px auto 20px; 
    padding: 20px; 
  }
</style>
