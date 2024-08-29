<script>
    let titulo = '';
    let descripcion = '';
    let cantidadDisponible = 1;
    let fechaCierre = '';
    let miembrosNecesarios = 1;
    let ubicacion = '';
    let radio = 0;
    //let touchFields = {}
    

    let tituloError = '';
    let descripcionError = '';



    //Validación de campo vacio
    const validateField = (fieldValue, errorMessageSetter, errorMessage) => {
        if (!fieldValue.trim()) {
            errorMessageSetter(errorMessage);
            return false;
        }
        errorMessageSetter(''); // Limpiar mensaje de error si la validación pasa
        return true;
    };

    const handleProductClick = () => {
        if (descripcionError) {
            decripcionError = 'La descripcion es obligatoria';
        }
    };

    const validateForm = () => {
        const isTituloValid = validateField(titulo, (msg) => tituloError = msg, 'El titulo del pool es obligatorio');
        const isDescripcionValid = validateField(descripcion, (msg) => descripcionError = msg, 'La descripcion es obligatoria');

        return isTituloValid && isDescripcionValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulario enviado');
            // Aquí puedes manejar el envío del formulario
        }
    };
</script>

<style>

</style>

<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <form on:submit={handleSubmit} class="form-wrapper">
                        <div class="form-section">
                            <h2>Creando nuevo Pool de Compra</h2>

                            <div class="form-group">
                                <label for="titulo">Titulo del Pool</label>
                                <input id="titulo"
                                 class="form-control"
                                  type="text" bind:value={titulo}
                                  placeholder="Ingrese titulo del Pool" />
                                {#if tituloError}
                                    <span class="error">{tituloError}</span>
                                {/if}
                            </div>

                            //Probar boton con gestion de errores
                            <!-- <div class="form-group">
                                <label for="Producto">Titulo del Pool</label>
                                <Input
                                type="text"
                                label="Producto"
                                bind:value={producto}
                                on:blur={() => touchedFields.name = true}
                                error={errors.name}
                            />
                            </div> -->

                            <div class="form-group">
                                <label for="descripcion">Descripcion del Producto</label>
                                <input id="descripcion" class="form-control" type="text" bind:value={descripcion} placeholder="Ingrese descripcion del Producto" on:click={handleProductClick} />
                                {#if descripcionError}
                                    <span class="error">{descripcionError}</span>
                                {/if}
                            </div>

                            <div class="form-group">
                                <label for="cantidadDisponible">Cantidad disponible</label>
                                <div class="slider-container">
                                    <input id="cantidadDisponible" class="form-control" type="range" min="1" max="100" bind:value={cantidadDisponible} />
                                    <span>{cantidadDisponible}</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="fechaCierre">Fecha de vencimiento del Pool</label>
                                <input id="fechaCierre" class="form-control" type="date" bind:value={fechaCierre} />
                            </div>

                            <div class="form-group">
                                <label for="miembrosNecesarios">Cantidad minima de miembros</label>
                                <input id="miembrosNecesarios" class="form-control" type="number" min="1" bind:value={miembrosNecesarios} placeholder="Enter number of members needed" />
                            </div>

                            <div class="form-group">
                                <label for="ubicacion">Ubicación</label>
                                <input id="ubicacion" class="form-control" type="text" bind:value={ubicacion} placeholder="Ingrese Ubicación" />
                            </div>

                            <div class="form-group">
                                <label for="radio">Radio</label>
                                <div class="slider-container">
                                    <input id="radio" class="form-control" type="range" min="0" max="100" bind:value={radio} />
                                    <span>{radio} km</span>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-secondary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="image-section">
                <div class="row">
                    <img src="https://via.placeholder.com/300" alt="Pool location map" />
                </div>
                <div class="row">
                    <button type="button"class="button">Ampliar imagen</button>
                </div>
            </div>
        </div>
    </div>
</div>