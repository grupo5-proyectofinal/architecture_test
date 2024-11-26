<script>
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import SuccessModal from "./CreatedPoolModal.svelte";

    let step = 1; // Paso actual
    let totalSteps = 5; // Total de pasos
    let titulo = '';
    let descripcion = '';
    let producto = '';
    let categoriaPool = '';
    let categorias = ['Electrónica', 'Hogar', 'Ropa', 'Deportes', 'Otros', 'Tecnologia'];
    let pagoSeleccionado = '';
    let precio = '';
    let cantidadTotal = 0;
    let cantidadAdquirida = 0;
    let cantidadDisponible = 0;
    let fecha_cierre = '';
    let ubicacion = '';
    let radio = 50;
    let metodosPago = ['Efectivo', 'Transferencia', 'Todos'];
    let poolId = null;
    let showModal = false;

    // Imágenes cargadas
    let imagenes = [];

    // Errores de validación
    let errors = {
        titulo: '',
        descripcion: '',
        producto: '',
        categoria: '',
        precio: '',
        cantidadTotal: '',
        cantidadAdquirida: '',
        fecha_cierre: '',
        ubicacion: ''
    };

    const validateField = (value, field, customMessage = null) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            errors[field] = customMessage || `El campo ${field.replace('_', ' ')} es obligatorio.`;
            return false;
        }
        errors[field] = '';
        return true;
    };

    const validateStep = () => {
        let valid = true;

        if (step === 1) {
            valid &= validateField(titulo, 'titulo');
            valid &= validateField(descripcion, 'descripcion');
            valid &= validateField(producto, 'producto');
            valid &= validateField(categoriaPool, 'categoria', 'Debe seleccionar una categoría.');
        } else if (step === 2) {
            valid &= validateField(precio, 'precio', 'Debe ingresar un precio válido.');
            valid &= validateField(cantidadTotal, 'cantidadTotal', 'Debe ingresar una cantidad total válida.');
            valid &= validateField(cantidadAdquirida, 'cantidadAdquirida', 'Debe ingresar una cantidad adquirida válida.');
            if (cantidadAdquirida > cantidadTotal) {
                errors.cantidadAdquirida = "La cantidad adquirida no puede ser mayor que la cantidad total.";
                valid = false;
            }
        } else if (step === 3) {
            valid &= validateField(fecha_cierre, 'fecha_cierre', 'Debe seleccionar una fecha de cierre.');
        } else if (step === 4) {
            valid &= validateField(ubicacion, 'ubicacion', 'Debe ingresar una ubicación.');
        }

        return valid;
    };

    const nextStep = () => {
        if (validateStep()) {
            if (step < totalSteps) {
                step++;
            }
        }
    };

    const prevStep = () => {
        if (step > 1) {
            step--;
        }
    };

    const actualizarCantidadDisponible = () => {
        cantidadDisponible = Math.max(0, cantidadTotal - cantidadAdquirida);
    };

    const handleFileInput = (event) => {
        const files = Array.from(event.target.files);
        if (imagenes.length + files.length > 10) {
            alert("No puedes cargar más de 10 imágenes.");
            return;
        }
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        imagenes = [...imagenes, ...newImages];
    };

    const eliminarImagen = (index) => {
        URL.revokeObjectURL(imagenes[index].preview);
        imagenes.splice(index, 1);
        imagenes = [...imagenes];
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateStep()) return;

        try {
            const token = Cookies.get('token');
            if (!token) {
                alert("Debes iniciar sesión para continuar.");
                goto("/login");
                return;
            }

            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('tipo_pago', pagoSeleccionado.toLowerCase());
            formData.append('descripcion', descripcion);
            formData.append('minimo_participantes', 1);
            formData.append('producto', producto);
            formData.append('cantidad_comprada', cantidadAdquirida);
            formData.append('precio', precio);
            formData.append('cantidad', cantidadTotal);
            formData.append('categoria', categoriaPool);
            formData.append('fecha_cierre', fecha_cierre);

            imagenes.forEach((imagen, index) => {
                formData.append(`imagenes[${index}]`, imagen.file);
            });

            const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/pools/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const createdPool = await response.json();
                console.log('Pool creado con éxito:', createdPool);
                showModal = true;
                poolId = createdPool.id;
            } else {
                const errorData = await response.json();
                console.error('Error al crear el pool:', errorData);
                alert(errorData.tipo_pago ? errorData.tipo_pago[0] : 'Error desconocido al crear el pool.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error de red. Intente nuevamente más tarde.');
        }
    };
</script>

<main class="container">
    <div class="form-container">
        <h2 class="title">Crear pool de compras</h2>

        <!-- Indicadores de progreso -->
        <div class="steps-indicator">
            {#each Array(totalSteps).fill(0) as _, index}
                <div class="step-circle {step > index ? 'active' : ''}"></div>
            {/each}
        </div>

        <!-- Paso 1 -->
        {#if step === 1}
        <section>
            <h3>Paso 1: Información general</h3>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input id="titulo" bind:value={titulo} placeholder="Ingrese el título del pool" />
                {#if errors.titulo}<p class="error">{errors.titulo}</p>{/if}
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" bind:value={descripcion} placeholder="Ingrese una descripción"></textarea>
                {#if errors.descripcion}<p class="error">{errors.descripcion}</p>{/if}
            </div>
            <div class="form-group">
                <label for="producto">Producto</label>
                <input id="producto" bind:value={producto} placeholder="Ingrese el nombre del producto" />
                {#if errors.producto}<p class="error">{errors.producto}</p>{/if}
            </div>
            <div class="form-group">
                <label for="categoriaPool">Categoría</label>
                <select id="categoriaPool" bind:value={categoriaPool}>
                    {#each categorias as categoria}
                        <option value={categoria}>{categoria}</option>
                    {/each}
                </select>
                {#if errors.categoria}<p class="error">{errors.categoria}</p>{/if}
            </div>
            <div class="buttons">
                <button class="btn" on:click={nextStep}>Siguiente</button>
            </div>
        </section>
        {/if}

        <!-- Paso 2 -->
        {#if step === 2}
<section>
    <h3>Paso 2: Detalles del producto</h3>
    <div class="form-group">
        <label for="pagoSeleccionado">Forma de pago</label>
        <select id="pagoSeleccionado" bind:value={pagoSeleccionado}>
            <option value="">Seleccione una forma de pago</option>
            {#each metodosPago as metodo}
                <option value={metodo}>{metodo}</option>
            {/each}
        </select>
        {#if errors.pagoSeleccionado}<p class="error">{errors.pagoSeleccionado}</p>{/if}
    </div>
    <div class="form-group">
        <label for="precio">Precio unitario</label>
        <input
            type="number"
            id="precio"
            bind:value={precio}
            placeholder="Ingrese el precio"
        />
        {#if errors.precio}<p class="error">{errors.precio}</p>{/if}
    </div>
    <div class="form-group">
        <label for="cantidadTotal">Cantidad total</label>
        <input
            type="number"
            id="cantidadTotal"
            bind:value={cantidadTotal}
            placeholder="Ingrese la cantidad total"
            on:input={actualizarCantidadDisponible}
        />
        {#if errors.cantidadTotal}<p class="error">{errors.cantidadTotal}</p>{/if}
    </div>
    <div class="form-group">
        <label for="cantidadAdquirida">Cantidad adquirida</label>
        <input
            type="number"
            id="cantidadAdquirida"
            bind:value={cantidadAdquirida}
            placeholder="Ingrese la cantidad adquirida"
            on:input={actualizarCantidadDisponible}
        />
        {#if errors.cantidadAdquirida}<p class="error">{errors.cantidadAdquirida}</p>{/if}
    </div>
    <div class="form-group">
        <label>Productos disponibles</label>
        <div class="progress-container">
            <input
                type="range"
                id="cantidadDisponible"
                min="0"
                max={cantidadTotal}
                value={cantidadDisponible}
                disabled
            />
            <span>{cantidadDisponible} / {cantidadTotal}</span>
        </div>
    </div>
    <div class="buttons">
        <button class="btn" on:click={prevStep}>Atrás</button>
        <button class="btn" on:click={nextStep}>Siguiente</button>
    </div>
</section>
{/if}

        <!-- Paso 3 -->
        {#if step === 3}
        <section>
            <h3>Paso 3: Fecha de cierre</h3>
            <div class="form-group">
                <label for="fecha_cierre">Fecha de cierre</label>
                <input id="fecha_cierre" type="date" bind:value={fecha_cierre} />
                {#if errors.fecha_cierre}<p class="error">{errors.fecha_cierre}</p>{/if}
            </div>
            <div class="buttons">
                <button class="btn" on:click={prevStep}>Atrás</button>
                <button class="btn" on:click={nextStep}>Siguiente</button>
            </div>
        </section>
        {/if}

        <!-- Paso 4 -->
        {#if step === 4}
        <section>
            <h3>Paso 4: Ubicación y rango</h3>
            <div class="form-group">
                <label for="ubicacion">Ubicación</label>
                <input id="ubicacion" bind:value={ubicacion} placeholder="Ingrese la ubicación" />
                {#if errors.ubicacion}<p class="error">{errors.ubicacion}</p>{/if}
            </div>
            <div class="form-group">
                <label for="radio">Radio</label>
                <input id="radio" type="range" bind:value={radio} min="0" max="100" />
                <span>{radio} km</span>
            </div>
            <div class="buttons">
                <button class="btn" on:click={prevStep}>Atrás</button>
                <button class="btn" on:click={nextStep}>Siguiente</button>
            </div>
        </section>
        {/if}

        <!-- Paso 5 -->
        {#if step === 5}
        <section>
            <h3>Paso 5: Cargar imágenes</h3>
            <div class="upload-container">
                <div class="info">
                    Fotos • {imagenes.length}/10 - Puedes agregar un máximo de 10 fotos.
                </div>
                <div class="images-preview">
                    {#each imagenes as imagen, index}
                        <div class="image-container">
                            <img src={imagen.preview} alt="Previsualización de la imagen" />
                            <button class="delete-button" on:click={() => eliminarImagen(index)}>✕</button>
                        </div>
                    {/each}
                    {#if imagenes.length < 10}
                        <label class="add-photo">
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple 
                                on:change={handleFileInput} 
                                style="display: none;" 
                            />
                            <div class="add-icon">+</div>
                            <div class="add-text">Agregar fotos</div>
                        </label>
                    {/if}
                </div>
            </div>
            <div class="buttons">
                <button class="btn" on:click={prevStep}>Atrás</button>
                <button class="btn" on:click={handleSubmit}>Finalizar</button>
            </div>
        </section>
        {/if}
    </div>
    <SuccessModal {showModal} {poolId} on:close={() => showModal = false} />
</main>

<style>
    /* Contenedor general */
    .container {
        max-width: 700px;
        margin: 20px auto;
    }

    .form-container {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }

    /* Indicadores de progreso */
    .steps-indicator {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .step-circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--step-color, #ccc);
    }

    .step-circle.active {
        background: #007bff;
    }

    /* Formulario */
    .step {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    input, select, textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    /* Botones */
    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .btn {
        padding: 10px 20px;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn:hover {
        background: #0056b3;
    }

    /* Paso 5: Cargar imágenes */
    .upload-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .info {
        font-size: 14px;
        color: #555;
        margin-bottom: 10px;
    }

    .images-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    .image-container {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .delete-button {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: rgba(255, 255, 255, 0.8);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        padding: 5px;
    }

    .add-photo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 2px dashed #ccc;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
    }

    .add-photo .add-icon {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
    }

    .add-photo .add-text {
        font-size: 12px;
        color: #555;
    }

    .error {
        color: red;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }
</style>
