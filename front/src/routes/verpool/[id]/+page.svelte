<script>
  import Header from '../../../lib/componentes/Header.svelte'
  import Viewpool from "../../../lib/componentes/Viewpool.svelte";
  import Footer from '../../../lib/componentes/Footer.svelte'
  
  export let data;
  let URLs = {
    imagenes: [
        {
        imagen: "http://www.w3.org/2000/svg"
      }
    ]
  };
  console.log(URLs.imagenes[0].imagen)
</script>


<Header />
<Viewpool
 bind:data={data.data}
 bind:imagenPreview={URLs}
  />
<Footer />
