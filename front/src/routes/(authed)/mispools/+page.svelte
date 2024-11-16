
<script>
import TableMisPools from "../../../lib/componentes/TableMisPools.svelte";

export let data;
export let mispools = data.data

</script>


<main class="main-content">
    <h1 class="page-title">Mispools</h1>
    <TableMisPools pools = {mispools}/>
</main>
<style>
    .page-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #333;
    }
    .main-content {
     margin-top: 60px; /* Ajusta este valor a la altura del header */
     padding: 20px;
    }
</style>



