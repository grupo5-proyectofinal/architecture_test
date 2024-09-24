<script>
    import { onMount } from "svelte";
    import Imagen from "./Imagen.svelte";
    // import DetailPool from "./DetailPool.svelte";

    // Estado del modal
    // let showModal = false;
    // let poolData = {}; 

    // Datos del formulario
    let titulo = '';
    let descripcion = '';
    let minimo_participantes = 1;
    let producto = '';
    let precio = '';
    let cantidadDisponible = 1;
    let categorias = [];
    let categoriaPool = '';
    let fecha_cierre = '';
    let ubicacion = '';
    let radio = 0;
    let imagenPool = '';
    let paymentsMethods = ['Efectivo', 'Transferencia', 'Efectivo y/o Transferencia'];
    let paymentsSelect = '';

    // Manejo de errores
    let tituloError = '';
    let descripcionError = '';

    // Validación de campo vacío
    const validateField = (fieldValue, errorMessageSetter, errorMessage) => {
        if (!fieldValue.trim()) {
            errorMessageSetter(errorMessage);
            return false;
        }
        errorMessageSetter('');
        return true;
    };

    // Validar el formulario completo
    const validateForm = () => {
        const isTituloValid = validateField(titulo, (msg) => tituloError = msg, 'El título del pool es obligatorio');
        const isDescripcionValid = validateField(descripcion, (msg) => descripcionError = msg, 'La descripción es obligatoria');
        return isTituloValid && isDescripcionValid;
    };

    // Enviar formulario (sin usar el modal)
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        if (validateForm()) {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('minimo_participantes', minimo_participantes);
            formData.append('producto', producto);
            formData.append('precio', precio);
            formData.append('cantidad', cantidadDisponible);
            formData.append('categoria', categoriaPool);
            formData.append('fecha_cierre', fecha_cierre);
            formData.append('ubicacion', ubicacion);
            formData.append('radio', radio);
            formData.append('imagen', imagenPool); // Asegúrate de que elegirArchivo esté correctamente definido
            console.log(formData)
            try {
                const respuesta = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/pools/', {
                    method: 'POST',
                    body: formData
                    
                });

                if (respuesta.ok) {
                    alert('Pool creado correctamente');
                    resetForm(); // Reiniciar el formulario después de una creación exitosa
                } else {
                    alert('Error al crear el Pool');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Error de red al enviar el formulario');
            }
        }
    };

    // Función para reiniciar el formulario
    const resetForm = () => {
        titulo = '';
        descripcion = '';
        minimo_participantes = 1;
        producto = '';
        precio = '';
        cantidadDisponible = 1;
        categoriaPool = '';
        fecha_cierre = '';
        ubicacion = '';
        radio = 0;
        paymentsSelect = '';
        imagenPool = ''; // Resetear también la imagen
        tituloError = '';
        descripcionError = '';
    };

    // Cargar categorías al montar el componente
    onMount(async () => {
        try {
            const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/categories/');
            if (!response.ok) {
                throw new Error('Error al cargar categorías');
            }
            categorias = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    });
</script>

<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <form on:submit={handleSubmit} class="form-wrapper">
                        <div class="form-section">
                            <h2 class="fw-bolder">Creando nuevo Pool de Compra</h2>
                            <br />

                            <!-- Título del Pool -->
                            <div class="form-group">
                                <label for="titulo">Título del Pool</label>
                                <input id="titulo" class="form-control" type="text" bind:value={titulo} placeholder="Ingrese título del Pool" />
                                {#if tituloError}
                                    <span class="error">{tituloError}</span>
                                {/if}
                            </div>

                            <!-- Producto -->
                            <div class="form-group">
                                <label for="producto">Nombre del producto</label>
                                <input id="producto" class="form-control" type="text" bind:value={producto} placeholder="Ingrese nombre del producto" />
                            </div>

                            <!-- Categoría -->
                            <div class="form-group">
                                <label for="categorias" class="form-label">Categoría</label>
                                <select bind:value={categoriaPool} class="form-control" id="categorias">
                                    {#each categorias as categoria}
                                        <option value={categoria.nombre}>{categoria.nombre}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Precio -->
                            <div class="form-group">
                                <label for="priceInput">Precio unitario del producto</label>
                                <input id="priceInput" class="form-control" type="number" bind:value={precio} min="0" step="0.01" placeholder="Ingrese el precio" required />
                            </div>

                            <!-- Métodos de pago -->
                            <div class="form-group">
                                <label for="payments" class="form-label">Formas de Pago</label>
                                <select bind:value={paymentsSelect} class="form-control" id="payments">
                                    {#each paymentsMethods as method}
                                        <option>{method}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Descripción -->
                            <div class="form-group">
                                <label for="descripcion">Descripción del Producto</label>
                                <input id="descripcion" class="form-control" type="text" bind:value={descripcion} placeholder="Ingrese descripción del producto" />
                                {#if descripcionError}
                                    <span class="error">{descripcionError}</span>
                                {/if}
                            </div>

                            <!-- Cantidad disponible -->
                            <div class="form-group">
                                <label for="cantidadDisponible">Cantidad disponible</label>
                                <input id="cantidadDisponible" class="form-control" type="range" min="1" max="100" bind:value={cantidadDisponible} />
                                <span>{cantidadDisponible}</span>
                            </div>

                            <!-- Fecha de cierre -->
                            <div class="form-group">
                                <label for="fecha_cierre">Fecha de vencimiento del Pool</label>
                                <input id="fecha_cierre" class="form-control" type="date" bind:value={fecha_cierre} />
                            </div>

                            <!-- Mínimo de participantes -->
                            <div class="form-group">
                                <label for="minimo_participantes">Cantidad mínima de miembros</label>
                                <input id="minimo_participantes" class="form-control" type="number" min="1" bind:value={minimo_participantes} placeholder="Ingrese número de miembros mínimos" />
                            </div>

                            <!-- Ubicación -->
                            <div class="form-group">
                                <label for="ubicacion">Ubicación</label>
                                <input id="ubicacion" class="form-control" type="text" bind:value={ubicacion} placeholder="Ingrese Ubicación" />
                            </div>

                            <!-- Radio -->
                            <div class="form-group">
                                <label for="radio">Radio</label>
                                <input id="radio" class="form-control" type="range" min="0" max="100" bind:value={radio} />
                                <span>{radio} km</span>
                            </div>

                            <div class="join-button-wrapper">
                                <button type="submit" class="btn btn-dark rounded-pill">Crear pool</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Vista previa de la imagen -->
        <div class="col-md-6">
            <div class="container">
                <Imagen bind:this={imagenPool} imagePreview="https://via.placeholder.com/400" />
            </div>
        </div>
    </div>
</div>

<!-- Modal de confirmación -->
<!-- {#if showModal}
    <DetailPool {poolData} on:confirm={confirmSubmit} on:close={() => showModal = false} isModal={true} />
{/if} -->

<style>
    /* Estilos para el formulario */
    .form-wrapper {
        padding: 20px;
    }

    .form-section {
        margin-bottom: 20px;
    }

    .error {
        color: red;
        font-size: 0.9rem;
    }
</style>
