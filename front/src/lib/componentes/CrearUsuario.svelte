<script>
  import { goto } from '$app/navigation';

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let gender = 'Male'; // Por defecto
  let first_name = '';
  let last_name = '';
  let direccion = '';
  let country = 'Argentina'; // Campo fijo
  let city = '';
  let phone_number = ''; // Añadido el número de teléfono

  let profilePictureFile = null; // Para manejar el archivo de imagen
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

    // Validar nombre de usuario
    if (!username.trim()) {
      errors.username = 'El nombre de usuario es requerido';
      isValid = false;
    }

    // Validar email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Correo electrónico válido es requerido';
      isValid = false;
    }

    // Validar contraseña
    if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    // Confirmar contraseña
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    // Validar nombres
    if (!first_name.trim()) {
      errors.first_name = 'El nombre es requerido';
      isValid = false;
    }

    if (!last_name.trim()) {
      errors.last_name = 'El apellido es requerido';
      isValid = false;
    }

    // Validar dirección
    if (!direccion.trim()) {
      errors.direccion = 'La dirección es requerida';
      isValid = false;
    }

    // Validar ciudad
    if (!city.trim()) {
      errors.city = 'La ciudad es requerida';
      isValid = false;
    }

    // Validar número de teléfono
    if (!phone_number.trim()) {
      errors.phone_number = 'El número de teléfono es requerido';
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      let foto = '';

      // Si se selecciona una imagen, la convertimos a base64
      if (profilePictureFile) {
        foto = await convertirImagenBase64(profilePictureFile);
      }

      // Llamamos a la función que envía los datos a la API
      enviarDatos(foto);
    }
  }

  function convertirImagenBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  async function enviarDatos(foto) {
    const data = {
      username,
      email,
      password,
      gender,
      foto, // Imagen en base64 o vacía si no se seleccionó
      phone_number,
      direccion,
      country,
      city,
      first_name,
      last_name
    };

    console.log(data);

    // Realizar el POST a la API
    try {
      const response = await fetch('https://poolshop-staging-748245240444.us-central1.run.app/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      const responseData = await response.json();
      console.log('Usuario creado con éxito:', responseData);

      // Redirigir al menú principal después de la creación del usuario
      goto('/');  // Redirige a la página principal o menú principal
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
      profilePictureFile = file;
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
          <form on:submit={handleSubmit}>
            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                class="form-control"
                bind:value={email}
                placeholder="Ingresa tu correo electrónico"
              />
              {#if errors.email}<div class="text-danger">{errors.email}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                class="form-control"
                bind:value={password}
                placeholder="Ingresa una contraseña"
              />
              {#if errors.password}<div class="text-danger">{errors.password}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirmar contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                class="form-control"
                bind:value={confirmPassword}
                placeholder="Confirma tu contraseña"
              />
              {#if errors.confirmPassword}<div class="text-danger">{errors.confirmPassword}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                class="form-control"
                bind:value={username}
                placeholder="Ingresa tu nombre de usuario"
              />
              {#if errors.username}<div class="text-danger">{errors.username}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="first_name" class="form-label">Nombre:</label>
              <input
                type="text"
                id="first_name"
                class="form-control"
                bind:value={first_name}
                placeholder="Ingresa tu nombre"
              />
              {#if errors.first_name}<div class="text-danger">{errors.first_name}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="last_name" class="form-label">Apellido:</label>
              <input
                type="text"
                id="last_name"
                class="form-control"
                bind:value={last_name}
                placeholder="Ingresa tu apellido"
              />
              {#if errors.last_name}<div class="text-danger">{errors.last_name}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="phone_number" class="form-label">Teléfono:</label>
              <input
                type="text"
                id="phone_number"
                class="form-control"
                bind:value={phone_number}
                placeholder="Ingresa tu número de teléfono"
              />
              {#if errors.phone_number}<div class="text-danger">{errors.phone_number}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="gender" class="form-label">Género:</label>
              <select id="gender" class="form-select" bind:value={gender}>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección:</label>
              <input
                type="text"
                id="direccion"
                class="form-control"
                bind:value={direccion}
                placeholder="Ingresa tu dirección"
              />
              {#if errors.direccion}<div class="text-danger">{errors.direccion}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="city" class="form-label">Ciudad:</label>
              <input
                type="text"
                id="city"
                class="form-control"
                bind:value={city}
                placeholder="Ingresa tu ciudad"
              />
              {#if errors.city}<div class="text-danger">{errors.city}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="country" class="form-label">País:</label>
              <input
                type="text"
                id="country"
                class="form-control"
                bind:value={country}
                placeholder="Ingresa tu país"
                disabled
              />
            </div>

            <div class="mb-3">
              <label for="profilePicture" class="form-label">Foto de perfil:</label>
              <input
                type="file"
                id="profilePicture"
                class="form-control"
                accept="image/*"
                on:change={handleProfilePictureChange}
              />
            </div>

            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-dark rounded-pill">
                Crear cuenta
              </button>
            </div>
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

  input {
    width: 100%;
    max-width: 500px;
    border-radius: 50px;
    text-align: left;
  }

  button {
    padding: 10px 30px;
    text-align: center;
    margin-top: 10px;
  }
</style>

