<script>
    import Filter from "../componentes/Filter.svelte";
    import CardButton from "../componentes/CardButton.svelte";

</script>

    <div class="container">
		<div class="row">
			<div class="col">
				<Filter />
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<CardButton 
				titulo="Cree nuevo pool de compra"
				descripcion="Empiece creando su propio Pool de compra"
				actionLabel="Crear pool"/>
			</div>
			<div class="col-md-4">
				<CardButton 
				titulo="Unase a un grupos existentes"
				descripcion="Busque grupos basados en su ubicación"
				actionLabel="Unirse a un grupo"/>		
			</div>
			<div class="col-md-4">
				<CardButton 
				titulo="Administre sus grupos"
				descripcion="Vea y administre los creados o que pertenezca"
				actionLabel="Administrar grupos"/>			
			</div>
		</div>
	</div>
