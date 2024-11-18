<script>
  import { goto } from '$app/navigation';
  import Imagen from './Imagen.svelte';

  // Variables del formulario
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let gender = 'Male';
  let first_name = '';
  let last_name = '';
  let direccion = '';
  let country = 'Argentina';
  let city = '';
  let phone_number = ''; 

  // Variables para la imagen
  let profilePictureFile = null; // Archivo de imagen seleccionado
  let profilePicturePreview = "https://via.placeholder.com/400"; // URL de la imagen de previsualización

  // Manejo de errores
  let errors = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    direccion: '',
    city: '',
    phone_number: '',
  };

  // Validación de formulario
  function validateForm() {
    errors = { username: '', email: '', password: '', confirmPassword: '', first_name: '', last_name: '', direccion: '', city: '', phone_number: '' };
    let isValid = true;

    // Validaciones de campos requeridos
    if (!username.trim()) errors.username = 'El nombre de usuario es requerido';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Correo electrónico válido es requerido';
    if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
    if (!first_name.trim()) errors.first_name = 'El nombre es requerido';
    if (!last_name.trim()) errors.last_name = 'El apellido es requerido';
    if (!direccion.trim()) errors.direccion = 'La dirección es requerida';
    if (!city.trim()) errors.city = 'La ciudad es requerida';
    if (!phone_number.trim()) errors.phone_number = 'El número de teléfono es requerido';

    return Object.values(errors).every((error) => !error);
  }

  // Enviar el formulario
  async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      enviarDatos();
    }
  }

  // Función para enviar los datos a la API usando FormData
  async function enviarDatos() {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('phone_number', phone_number);
    formData.append('direccion', direccion);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);

    // Añadir la imagen solo si existe
    if (profilePictureFile) {
      formData.append('foto', profilePictureFile);
    }

    try {
      const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/register/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        // Extraer el mensaje de error de la respuesta y lanzarlo
        const errorData = await response.json();
        console.error('Detalles del error:', errorData); // Muestra los detalles del error en la consola
        throw new Error(`Error al crear el usuario: ${errorData.message || JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log('Usuario creado con éxito:', responseData);

      // Redirigir al menú principal después de la creación del usuario
      goto('/');  // Redirige a la página principal
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }
</script>

<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Crear cuenta</h2>
          
          <!-- Formulario de alta de usuario -->
          <form on:submit={handleSubmit} class="form">
            <div class="form-row">
              <div class="form-group">
                <label for="email" class="form-label">Correo electrónico:</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  bind:value={email}
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
                {#if errors.email}<div class="text-danger">{errors.email}</div>{/if}
              </div>

              <div class="form-group">
                <label for="username" class="form-label">Nombre de usuario:</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  bind:value={username}
                  placeholder="Ingresa tu nombre de usuario"
                  required
                />
                {#if errors.username}<div class="text-danger">{errors.username}</div>{/if}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="password" class="form-label">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  bind:value={password}
                  placeholder="Ingresa una contraseña"
                  required
                />
                {#if errors.password}<div class="text-danger">{errors.password}</div>{/if}
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="form-label">Confirmar contraseña:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                  bind:value={confirmPassword}
                  placeholder="Confirma tu contraseña"
                  required
                />
                {#if errors.confirmPassword}<div class="text-danger">{errors.confirmPassword}</div>{/if}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="first_name" class="form-label">Nombre:</label>
                <input
                  type="text"
                  id="first_name"
                  class="form-control"
                  bind:value={first_name}
                  placeholder="Ingresa tu nombre"
                  required
                />
                {#if errors.first_name}<div class="text-danger">{errors.first_name}</div>{/if}
              </div>

              <div class="form-group">
                <label for="last_name" class="form-label">Apellido:</label>
                <input
                  type="text"
                  id="last_name"
                  class="form-control"
                  bind:value={last_name}
                  placeholder="Ingresa tu apellido"
                  required
                />
                {#if errors.last_name}<div class="text-danger">{errors.last_name}</div>{/if}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone_number" class="form-label">Teléfono:</label>
                <input
                  type="text"
                  id="phone_number"
                  class="form-control"
                  bind:value={phone_number}
                  placeholder="Ingresa tu número de teléfono"
                  required
                />
                {#if errors.phone_number}<div class="text-danger">{errors.phone_number}</div>{/if}
              </div>

              <div class="form-group">
                <label for="gender" class="form-label">Género:</label>
                <select id="gender" class="form-control" bind:value={gender}>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="direccion" class="form-label">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  class="form-control"
                  bind:value={direccion}
                  placeholder="Ingresa tu dirección"
                  required
                />
                {#if errors.direccion}<div class="text-danger">{errors.direccion}</div>{/if}
              </div>

              <div class="form-group">
                <label for="city" class="form-label">Ciudad:</label>
                <input
                  type="text"
                  id="city"
                  class="form-control"
                  bind:value={city}
                  placeholder="Ingresa tu ciudad"
                  required
                />
                {#if errors.city}<div class="text-danger">{errors.city}</div>{/if}
              </div>
            </div>

            <!-- Componente Imagen para seleccionar y previsualizar la imagen de perfil -->
            <Imagen bind:elegirArchivo={profilePictureFile} bind:imagePreview={profilePicturePreview} />

            <button type="submit" class="btn btn-dark rounded-pill mt-3">Crear cuenta</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .card {
    border-radius: 20px;
    padding: 20px;
  }

  .text-danger {
    color: red;
  }

  .form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 1rem;
  }
</style>
