<script>
  import Header from '../../../lib/componentes/Header.svelte'
  import Viewpool from "../../../lib/componentes/Viewpool.svelte";
  import Footer from '../../../lib/componentes/Footer.svelte'
  
  export let data
</script>


<Header />
<Viewpool data={data.data} />
<Footer />
