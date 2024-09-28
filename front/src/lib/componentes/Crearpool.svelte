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
    let cantidadTotal = 1;
    let cantidadAdquirida = 1;
    let cantidadRestante = 0;
    let categorias = [];
    let categoriaPool = '';
    let fecha_cierre = '';
    let ubicacion = '';
    let radio = 0;
    let imagenPool = '';
    let metodosPago = ['Efectivo', 'Transferencia', 'Efectivo y/o Transferencia'];
    let pagoSeleccionado = '';

    // Manejo de errores
    let tituloError = '';
    let descripcionError = '';
    let productoError = '';

    // Validación de campo vacío
    const validateField = (fieldValue, errorMessageSetter, errorMessage) => {
        if (!fieldValue.trim()) {
            errorMessageSetter(errorMessage);
            return false;
        }
        errorMessageSetter('');
        return true;
    };

    const actualizarCantidadRestante = () => {
        cantidadRestante = Math.max (0,cantidadTotal-cantidadAdquirida)
    }

    //Validacion de cantidad de productos
    const validateProduct = () => {
        if(cantidadAdquirida > cantidadTotal){
            alert('La cantidad adquirida no puede ser mayor a la cantidad total.')
            cantidadAdquirida = cantidadTotal
        }
        actualizarCantidadRestante();
    }

    // Validar el formulario completo
    const validateForm = () => {
        const isTituloValid = validateField(titulo, (msg) => tituloError = msg, 'El título del pool es obligatorio');
        const isDescripcionValid = validateField(descripcion, (msg) => descripcionError = msg, 'La descripción es obligatoria');
        const isProducto = validateField(producto,(msg) => productoError = msg, 'El nombre de producto es obligatorio')
        return isTituloValid && isDescripcionValid && isProducto;
    };
    // Enviar formulario (sin usar el modal)
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        if (validateForm()) {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('tipo_pago', pagoSeleccionado)
            formData.append('descripcion', descripcion);
            formData.append('minimo_participantes', minimo_participantes);
            formData.append('producto', producto);
            formData.append('precio', precio);
            formData.append('cantidad', parseInt(cantidadTotal));
            formData.append('cantidad_comprada', parseInt(cantidadAdquirida));
            formData.append('categoria', categoriaPool);
            formData.append('fecha_cierre', fecha_cierre);
            // formData.append('ubicacion', ubicacion);
            // formData.append('radio', radio);
            formData.append('imagenes', imagenPool);
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
                    console.log(respuesta.status)
                    console.log(formData)
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
        productoError = '';
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
                                <input id="titulo" class="form-control rounded" type="text" 
                                bind:value={titulo} 
                                placeholder="Ingrese título del Pool"
                                required/>
                                {#if tituloError}
                                    <span class="error">{tituloError}</span>
                                {/if}
                            </div>

                            <!-- Producto -->
                            <div class="form-group">
                                <label for="producto">Nombre del producto</label>
                                <input id="producto" class="form-control rounded" type="text"
                                 bind:value={producto} 
                                 placeholder="Ingrese nombre del producto"
                                 required/>
                                {#if productoError}
                                    <span class="error">{productoError}</span>
                                {/if}
                            </div>
                            <!-- Categoría -->
                            <div class="form-group">
                                <label for="categorias" class="form-label">Categoría</label>
                                <select bind:value={categoriaPool} class="form-control rounded" id="categorias">
                                    {#each categorias as categoria}
                                        <option value={categoria.nombre}>{categoria.nombre}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Precio -->
                            <div class="form-group">
                                <label for="priceInput">Precio unitario del producto</label>
                                <input id="priceInput" class="form-control rounded" type="number"
                                 bind:value={precio}
                                 min="0" 
                                 step="0.01"
                                 placeholder="Ingrese el precio"
                                 required />
                            </div>

                            <!-- Métodos de pago -->
                            <div class="form-group">
                                <label for="payments" class="form-label">Formas de Pago</label>
                                <select bind:value={pagoSeleccionado} class="form-control rounded" id="payments">
                                    {#each metodosPago as pago}
                                        <option>{pago}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Descripción -->
                            <div class="form-group">
                                <label for="descripcion">Descripción del Producto</label>
                                <input id="descripcion" class="form-control rounded" type="text" bind:value={descripcion} placeholder="Ingrese descripción del producto" />
                                {#if descripcionError}
                                    <span class="error">{descripcionError}</span>
                                {/if}
                            </div>

                            <!-- Cantidad total -->
                            <div class="form-group">
                                <label for="cantidadTotal">Cantidad total de productos</label>
                                <input id="cantidadTotal" class="form-control rounded" type="number"
                                 min="1"
                                 bind:value={cantidadTotal}
                                 on:input={validateProduct}
                                 required/>
                            </div>
                            <!-- Cantidad adquirida -->
                            <div class="form-group">
                                <label for="cantidadDisponible">Cantidad adquirida</label>
                                <input id="cantidadDisponible" class="form-control rounded" type="number"
                                  min="1"
                                  bind:value={cantidadAdquirida}
                                  on:input={validateProduct}
                                  required/>
                            </div>
                            <div class="form-group">
                                <label for="cantidadRestante">Cantidad disponible</label>
                                <input
                                    class="form-control"
                                    id="cantidadRestante"
                                    type="range"
                                    min="0"
                                    max={cantidadTotal}
                                    bind:value={cantidadRestante}
                                    disabled
                                />
                                <span>{cantidadRestante}</span>
                            </div>
                            

                            <!-- Fecha de cierre -->
                            <div class="form-group">
                                <label for="fecha_cierre">Fecha de vencimiento del Pool</label>
                                <input id="fecha_cierre" class="form-control rounded" type="date" bind:value={fecha_cierre} />
                            </div>

                            <!-- Mínimo de participantes -->
                            <div class="form-group">
                                <label for="minimo_participantes">Cantidad mínima de miembros</label>
                                <input id="minimo_participantes" class="form-control" type="number" min="1" bind:value={minimo_participantes} placeholder="Ingrese número de miembros mínimos" />
                            </div>

                            <!-- Ubicación -->
                            <div class="form-group">
                                <label for="ubicacion">Ubicación</label>
                                <input id="ubicacion" class="form-control rounded" type="text" bind:value={ubicacion} placeholder="Ingrese Ubicación" />
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
