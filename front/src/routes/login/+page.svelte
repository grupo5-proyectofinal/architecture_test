<script>
    import Header from '../../lib/componentes/Header.svelte';  // Importamos el Header
    import Footer from '../../lib/componentes/Footer.svelte';  // Importamos el Footer
    
    let email = '';
    let password = '';
    let errorMessage = '';
    let isLoading = false;

    async function handleLogin(event) {
        event.preventDefault();
        errorMessage = '';
        isLoading = true;

        // Validación básica
        if (!email || !password) {
            errorMessage = 'Por favor, introduzca un correo electrónico y una contraseña válidos.';
            isLoading = false;
            return;
        }
        
        try{
            const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log('Login successful', data);
            } else {
                console.log(response)
                const errorData = await response.json();
                errorMessage = errorData.message || 'Error al iniciar sesión. Por favor, verifique sus credenciales.';
            }
        }catch{
            console.log("error")
        }
    }
</script>

<main>
    <!-- Añadimos el Header en la parte superior -->
    <Header />

    <div class="login-container">
        <h2>Iniciar sesión</h2>
        <p>Ingrese su correo electrónico y contraseña para continuar</p>

        {#if errorMessage}
            <div class="error-message">{errorMessage}</div>
        {/if}

        <form on:submit={handleLogin}>
            <div class="form-group">
                <input
                    type="email"
                    bind:value={email}
                    placeholder="email@domain.com"
                    required
                />
            </div>

            <div class="form-group">
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Contraseña"
                    required
                />
            </div>

            <button type="submit" class="primary-btn" disabled={isLoading}>
                {#if isLoading} Cargando... {/if}
                {#if !isLoading} Iniciar sesión {/if}
            </button>

            <div class="divider">
                <span>o continuar con</span>
            </div>

            <button type="button" class="secondary-btn">
                <img src="/img/web_dark_sq_ctn@2x.png" alt="Google" class="google-logo" />
            </button>
        </form>

        <p class="register-link">
            ¿No tienes cuenta? <a href="/crearusuario">Regístrate aquí</a>.
        </p>
    </div>

    <!-- Añadimos el Footer al final de la página -->
    <Footer />
</main>

<style>
    .login-container {
        max-width: 400px;
        margin: 100px auto 0;
        padding: 2rem;
        text-align: center;
    }

    h2 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    p {
        color: #6c757d;
        margin-bottom: 1.5rem;
    }

    .form-group input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    .divider {
        position: relative;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .divider span {
        background-color: white;
        padding: 0 10px;
        color: #6c757d;
    }

    .divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border-top: 1px solid #e0e0e0;
        z-index: 0;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 1rem;
    }

    .primary-btn {
        background-color: #000;
        color: #fff;
        border: none;
    }

    .secondary-btn {
        background-color: #f1f1f1;
        color: #000;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        height: 50px; /* Ajusta la altura del botón */
    }

    .google-logo {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Asegura que la imagen ocupe todo el botón */
        border-radius: 8px; /* Asegura que la imagen tenga los mismos bordes redondeados que el botón */
    }

    .register-link {
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: #6c757d;
    }

    .register-link a {
        color: #007bff;
        text-decoration: none;
    }

    .register-link a:hover {
        text-decoration: underline;
    }
</style>
