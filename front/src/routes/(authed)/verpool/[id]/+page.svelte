<script>
  import Viewpool from "../../../../lib/componentes/Viewpool.svelte";
  
  export let data;
  let URLs = {
    imagenes: [
        {
        imagen: "http://www.w3.org/2000/svg"
      }
    ]
  };
</script>
<Viewpool
 bind:data={data.data}
 bind:imagenPreview={URLs}
  />
