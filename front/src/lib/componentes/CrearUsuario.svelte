<script>
  import { goto } from '$app/navigation';
  import ModalConfirmation from './ModalConfirmation.svelte';

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
  let profilePictureFile = null;
  let profilePicturePreview = "https://via.placeholder.com/400";

  // Modal confirmation state
  let showModal = false;

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

  function validateForm() {
    errors = { username: '', email: '', password: '', confirmPassword: '', first_name: '', last_name: '', direccion: '', city: '', phone_number: '' };
    let isValid = true;

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      enviarDatos();
    }
  }

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

    if (profilePictureFile) {
      formData.append('foto', profilePictureFile);
    }

    try {
      const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/register/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
        throw new Error(`Error al crear el usuario: ${errorData.message || JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log('Usuario creado con éxito:', responseData);

      showModal = true;
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }

  // Función para actualizar la vista previa de la imagen
  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
      profilePictureFile = file;
      profilePicturePreview = URL.createObjectURL(file); // Actualiza la URL de la vista previa
    }
  }

  function closeModal() {
    showModal = false;
    goto('/login');  // Redirige a la página de inicio de sesión después de cerrar el modal
  }
</script>

<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Crear cuenta</h2>
          
          <!-- Vista previa y botón para subir imagen -->
          <div class="text-center mb-4">
            <img src={profilePicturePreview} alt="Foto de perfil" class="profile-picture-preview" />
            <div class="mt-2">
              <input type="file" id="profilePicture" accept="image/*" on:change={handleProfilePictureChange} hidden />
              <button type="button" class="btn btn-outline-secondary rounded-pill mt-2" on:click={() => document.getElementById('profilePicture').click()}>
                Subir Imagen
              </button>
            </div>
          </div>
          
          <!-- Formulario de alta de usuario en dos columnas -->
          <form on:submit={handleSubmit} class="form">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="first_name" class="form-label">Nombre</label>
                <input type="text" id="first_name" class="form-control rounded-pill" bind:value={first_name} placeholder="Ingresa tu nombre" required />
                {#if errors.first_name}<div class="text-danger">{errors.first_name}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="last_name" class="form-label">Apellido</label>
                <input type="text" id="last_name" class="form-control rounded-pill" bind:value={last_name} placeholder="Ingresa tu apellido" required />
                {#if errors.last_name}<div class="text-danger">{errors.last_name}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" id="email" class="form-control rounded-pill" bind:value={email} placeholder="Ingresa tu correo electrónico" required />
                {#if errors.email}<div class="text-danger">{errors.email}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="phone_number" class="form-label">Celular</label>
                <input type="text" id="phone_number" class="form-control rounded-pill" bind:value={phone_number} placeholder="Ingresa tu número celular" required />
                {#if errors.phone_number}<div class="text-danger">{errors.phone_number}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input type="text" id="username" class="form-control rounded-pill" bind:value={username} placeholder="Ingresa tu nombre de usuario" required />
                {#if errors.username}<div class="text-danger">{errors.username}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" class="form-control rounded-pill" bind:value={password} placeholder="Ingresa una contraseña" required />
                {#if errors.password}<div class="text-danger">{errors.password}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
                <input type="password" id="confirmPassword" class="form-control rounded-pill" bind:value={confirmPassword} placeholder="Confirma tu contraseña" required />
                {#if errors.confirmPassword}<div class="text-danger">{errors.confirmPassword}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="gender" class="form-label">Género</label>
                <select id="gender" class="form-control rounded-pill" bind:value={gender}>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" id="direccion" class="form-control rounded-pill" bind:value={direccion} placeholder="Ingresa tu dirección" required />
                {#if errors.direccion}<div class="text-danger">{errors.direccion}</div>{/if}
              </div>
              <div class="col-md-6 mb-3">
                <label for="city" class="form-label">Ciudad</label>
                <input type="text" id="city" class="form-control rounded-pill" bind:value={city} placeholder="Ingresa tu ciudad" required />
                {#if errors.city}<div class="text-danger">{errors.city}</div>{/if}
              </div>
            </div>

            <button type="submit" class="btn btn-dark rounded-pill w-100 mt-3">Crear cuenta</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmación -->
  {#if showModal}
    <ModalConfirmation {showModal} {closeModal} />
  {/if}
</main>

<style>
  .card {
    border-radius: 15px;
    padding: 20px;
  }

  .profile-picture-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #afaca8;
  }

  .text-danger {
    color: red;
    font-size: 0.875rem;
  }
</style>
