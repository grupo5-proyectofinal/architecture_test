<script>
  import DetailPool from '$lib/componentes/DetailPool.svelte';
  export let data;
</script>


<DetailPool
  bind:poolData={data.data}
/>