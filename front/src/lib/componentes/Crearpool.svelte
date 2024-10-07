<script>
    import { onMount } from "svelte";
    import Imagen from "./Imagen.svelte";
    import SuccessModal from "./CreatedPoolModal.svelte";
   

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
    let imagenPreview = "https://via.placeholder.com/400";
    let metodosPago = ['efectivo', 'transferencia','todos'];
    let pagoSeleccionado = metodosPago[0];

    // Manejo de errores
    let tituloError = '';
    let descripcionError = '';
    let productoError = '';

     // Estado del modal
    let showModal = false;
    let poolId = null

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
            formData.append('cantidad_comprada', cantidadAdquirida);
            formData.append('precio', precio);
            formData.append('cantidad', cantidadTotal);
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
                    const createdPool = await respuesta.json();
                    poolId = createdPool.id;
                    showModal = true;
                    resetForm(); // Reinicio de formulario
                } else {
                    alert('Error al crear el Pool');
                    console.log(respuesta)
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
        cantidadTotal = 1;
        cantidadAdquirida = 1;
        categoriaPool = '';
        fecha_cierre = '';
        ubicacion = '';
        radio = 0;
        pagoSeleccionado = '';
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
    <div class="form-container">
        <div class="form-content">
            <h2 class="fw-bolder">Creando nuevo Pool de Compra</h2>
            <form on:submit={handleSubmit} class="form">
                <div class="form-row">
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
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="categorias" class="form-label">Categoría</label>
                        <select bind:value={categoriaPool} class="form-control rounded" id="categorias">
                            {#each categorias as categoria}
                                <option value={categoria.nombre}>{categoria.nombre}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="priceInput">Precio unitario del producto</label>
                        <input id="priceInput" class="form-control rounded" type="number"
                        bind:value={precio}
                        min="0" 
                        step="0.01"
                        placeholder="Ingrese el precio"
                        required />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="descripcion">Descripción del Producto</label>
                        <input id="descripcion" class="form-control rounded" type="text" bind:value={descripcion} placeholder="Ingrese descripción del producto" />
                        {#if descripcionError}
                            <span class="error">{descripcionError}</span>
                        {/if}
                    </div>
                    <div class="form-group">
                        <label for="payments" class="form-label">Formas de Pago</label>
                        <select bind:value={pagoSeleccionado} class="form-control rounded" id="payments">
                            {#each metodosPago as pago}
                                <option>{pago}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                    
                <div class="form-row">
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
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="fecha_cierre">Fecha de vencimiento del Pool</label>
                        <input id="fecha_cierre" class="form-control rounded" type="date" bind:value={fecha_cierre} />
                    </div>

                    <!-- Mínimo de participantes -->
                    <div class="form-group">
                        <label for="minimo_participantes">Cantidad mínima de miembros</label>
                        <input id="minimo_participantes" class="form-control" type="number" min="1" bind:value={minimo_participantes} placeholder="Ingrese número de miembros mínimos" />
                    </div>
                </div>
                <div class="form-row">
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
                </div>
                    
                
                <button type="submit" class="btn-submit">Crear Pool</button>
            </form>
        </div>
        <div class="image-preview">
            <Imagen 
                  bind:imagePreview={imagenPreview}
                  bind:elegirArchivo={imagenPool}
            />
        </div>
    </div>
</div>
<SuccessModal {showModal} {poolId} on:close={() => showModal = false} />

    <style>
        /* Container Styling */
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f7fa;
        }
    
        .form-container {
            display: flex;
            justify-content: space-between;
            padding: 30px;
            background: #ffffff;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border-radius: 20px;
            max-width: 1000px;
            width: 100%;
        }
    
        .form-content {
            width: 60%;
        }
    
        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #1d1e22;
            margin-bottom: 25px;
        }
    
        /* Form Styling */
        .form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
    
        .form-row {
            display: flex;
            justify-content: space-between;
        }
    
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 48%;
        }
    
        .form-group input, .form-group select {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: border 0.3s ease;
        }
    
        .form-group input:focus, .form-group select:focus {
            border: 1px solid #007bff;
            outline: none;
        }
    
        .btn-submit {
            padding: 15px;
            background: linear-gradient(90deg, #4a90e2, #007bff);
            border: none;
            color: #fff;
            font-weight: 600;
            font-size: 1.1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
            width: 100%;
        }
    
        .btn-submit:hover {
            background: linear-gradient(90deg, #007bff, #4a90e2);
        }
    
        /* Image Preview Styling */
        .image-preview {
            width: 35%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f0f4f8;
            border: 1px dashed #ccc;
            border-radius: 12px;
            padding: 20px;
        }
    </style>
