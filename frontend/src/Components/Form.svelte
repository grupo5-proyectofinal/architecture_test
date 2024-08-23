<script>
    let titulo = '';
    let descripcion = '';
    let cantidadDisponible = 1;
    let fechaCierre = '';
    let miembrosNecesarios = 1;
    let ubicacion = '';
    let radio = 0;

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
    /* Asegura que el formulario esté centrado vertical y horizontalmente */
    .container {
        width: 100%;
        max-width: 1100px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-wrapper {
        display: flex;
        width: 100%;
        background: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        justify-content: space-between;
        align-items: flex-start; /* Alinea el formulario y la imagen en la parte superior */
    }

    .form-section {
        flex: 2;
        margin-right: 20px;
    }

    .form-section h2 {
        margin-bottom: 20px;
        font-size: 24px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #007bff;
        outline: none;
    }

    .form-group .error {
        color: red;
        margin-top: 5px;
        font-size: 0.9em;
    }

    .slider-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .slider-container input[type="range"] {
        flex: 1;
    }

    button[type="submit"] {
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: none;
        background-color: #28a745;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 20px;
    }

    button[type="submit"]:hover {
        background-color: #218838;
    }

    .image-section {
        flex: 1;
        background-color: #e0e0e0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        position: relative;
    }

    .image-section img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .image-section button {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        font-size: 0.8em;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .form-wrapper {
            flex-direction: column;
            align-items: center;
        }

        .form-section {
            margin-right: 0;
            width: 100%;
        }

        .image-section {
            margin-top: 20px;
            height: auto;
            width: 100%;
        }
    }
</style>

<div class="container">
    <form on:submit={handleSubmit} class="form-wrapper">
        <div class="form-section">
            <h2>Creando nuevo Pool de Compra</h2>

            <div class="form-group">
                <label for="titulo">Titulo del Pool</label>
                <input id="titulo" type="text" bind:value={titulo} placeholder="Ingrese titulo del Pool" />
                {#if tituloError}
                    <span class="error">{tituloError}</span>
                {/if}
            </div>

            <div class="form-group">
                <label for="descripcion">Descripcion del Producto</label>
                <input id="descripcion" type="text" bind:value={descripcion} placeholder="Ingrese descripcion del Producto" on:click={handleProductClick} />
                {#if descripcionError}
                    <span class="error">{descripcionError}</span>
                {/if}
            </div>

            <div class="form-group">
                <label for="cantidadDisponible">Cantidad disponible</label>
                <div class="slider-container">
                    <input id="cantidadDisponible" type="range" min="1" max="100" bind:value={cantidadDisponible} />
                    <span>{cantidadDisponible}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="fechaCierre">Fecha de vencimiento del Pool</label>
                <input id="fechaCierre" type="date" bind:value={fechaCierre} />
            </div>

            <div class="form-group">
                <label for="miembrosNecesarios">Cantidad minima de miembros</label>
                <input id="miembrosNecesarios" type="number" min="1" bind:value={miembrosNecesarios} placeholder="Enter number of members needed" />
            </div>

            <div class="form-group">
                <label for="ubicacion">Ubicación</label>
                <input id="ubicacion" type="text" bind:value={ubicacion} placeholder="Enter location" />
            </div>

            <div class="form-group">
                <label for="radio">Radio</label>
                <div class="slider-container">
                    <input id="radio" type="range" min="0" max="100" bind:value={radio} />
                    <span>{radio} km</span>
                </div>
            </div>

            <button type="submit">Crear Pool</button>
        </div>

        <div class="image-section">
            <button type="button">Ampliar imagen</button>
            <img src="https://via.placeholder.com/300" alt="Pool location map" />
        </div>
    </form>
</div>