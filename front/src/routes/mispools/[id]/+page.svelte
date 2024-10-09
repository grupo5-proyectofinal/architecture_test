<script>
  import Header from '../../../lib/componentes/Header.svelte'
  import Footer from '../../../lib/componentes/Footer.svelte';
  import DetailPool from "../../../lib/componentes/DetailPool.svelte";

  export let data;
</script>

<Header />
<DetailPool
  bind:poolData={data.data}
/>
<Footer />