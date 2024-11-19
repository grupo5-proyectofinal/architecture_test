<script> 
    // Datos del formulario
    let step = 1; // Paso actual
    let totalSteps = 4; // Total de pasos
    let titulo = '';
    let descripcion = '';
    let producto = '';
    let categoriaPool = '';
    let categorias = ['Electrónica', 'Hogar', 'Ropa', 'Deportes', 'Otros']; // Opciones de categoría
    let pagoSeleccionado = '';
    let precio = '';
    let cantidadTotal = 0;
    let cantidadAdquirida = 0;
    let cantidadDisponible = 0;
    let fecha_cierre = '';
    let ubicacion = '';
    let radio = 50;

    let metodosPago = ['Efectivo', 'Transferencia', 'Todos'];

    // Función para avanzar al siguiente paso
    const nextStep = () => {
        if (step < totalSteps) {
            step++;
        }
    };

    // Función para retroceder al paso anterior
    const prevStep = () => {
        if (step > 1) {
            step--;
        }
    };

    // Actualizar la cantidad disponible
    const actualizarCantidadDisponible = () => {
        cantidadDisponible = Math.max(0, cantidadTotal - cantidadAdquirida);
    };
</script>

<main class="container">
    <div class="form-container">
        <h2 class="title">Crear pool de compras</h2>

        <!-- Indicadores de progreso -->
        <div class="steps-indicator">
            {#each Array(totalSteps).fill(0) as _, index}
                <div 
                    class="step-circle {step > index ? 'active' : ''}" 
                    style="--step-color: {step > index ? '#007bff' : '#ccc'}">
                </div>
            {/each}
        </div>

        <!-- Formulario dividido en pasos -->
        {#if step === 1}
        <section class="step">
            <h3>Paso 1: Información general</h3>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" bind:value={titulo} placeholder="Ingrese el título del pool" />
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" bind:value={descripcion} placeholder="Ingrese una descripción"></textarea>
            </div>
            <div class="form-group">
                <label for="producto">Producto</label>
                <input type="text" id="producto" bind:value={producto} placeholder="Ingrese el nombre del producto" />
            </div>
            <div class="form-group">
                <label for="categoriaPool">Categoría</label>
                <select id="categoriaPool" bind:value={categoriaPool}>
                    {#each categorias as categoria}
                        <option value={categoria}>{categoria}</option>
                    {/each}
                </select>
            </div>
            <div class="buttons">
                <button class="btn" on:click={nextStep}>Siguiente</button>
            </div>
        </section>
        {/if}

        {#if step === 2}
        <section class="step">
            <h3>Paso 2: Detalles del producto</h3>
            <div class="form-group">
                <label for="pagoSeleccionado">Forma de pago</label>
                <select id="pagoSeleccionado" bind:value={pagoSeleccionado}>
                    {#each metodosPago as metodo}
                        <option value={metodo}>{metodo}</option>
                    {/each}
                </select>
            </div>
            <div class="form-group">
                <label for="precio">Precio unitario</label>
                <input type="number" id="precio" bind:value={precio} placeholder="Ingrese el precio" />
            </div>
            <div class="form-group">
                <label for="cantidadTotal">Cantidad total</label>
                <input type="number" id="cantidadTotal" bind:value={cantidadTotal} placeholder="Ingrese la cantidad total" on:input={actualizarCantidadDisponible} />
            </div>
            <div class="form-group">
                <label for="cantidadAdquirida">
                    Cantidad adquirida</label>
                    <input
                        type="number"
                        id="cantidadAdquirida"
                        bind:value={cantidadAdquirida}
                        placeholder="Ingrese la cantidad adquirida"
                        on:input={actualizarCantidadDisponible}
                    />
                </div>
                <div class="form-group">
                    <label for="cantidadDisponible">Productos disponibles</label>
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
    
            {#if step === 3}
            <section class="step">
                <h3>Paso 3: Fecha de cierre</h3>
                <div class="form-group">
                    <label for="fecha_cierre">Fecha de cierre</label>
                    <input type="date" id="fecha_cierre" bind:value={fecha_cierre} />
                </div>
                <div class="buttons">
                    <button class="btn" on:click={prevStep}>Atrás</button>
                    <button class="btn" on:click={nextStep}>Siguiente</button>
                </div>
            </section>
            {/if}
    
            {#if step === 4}
            <section class="step">
                <h3>Paso 4: Ubicación y rango</h3>
                <div class="form-group">
                    <label for="ubicacion">Ubicación</label>
                    <input type="text" id="ubicacion" bind:value={ubicacion} placeholder="Ingrese la ubicación" />
                </div>
                <div class="form-group">
                    <label for="radio">Radio</label>
                    <input type="range" id="radio" bind:value={radio} min="0" max="100" />
                    <span>{radio} km</span>
                </div>
                <div class="buttons">
                    <button class="btn" on:click={prevStep}>Atrás</button>
                    <button class="btn">Finalizar</button>
                </div>
            </section>
            {/if}
        </div>
    </main>
    
    <style>
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
    
        .progress-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    
        input[type="range"] {
            width: calc(100% - 50px);
            margin-right: 10px;
        }
    
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
    </style>
    