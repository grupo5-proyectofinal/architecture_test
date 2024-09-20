<script>
	let name = 'Josefina Zaz';
	let username = ''; 
	let email = 'jz77@example.com';
	let password = '';
	let bio = 'Desarrollador de software';
	let profilePicture = "https://images.pexels.com/photos/4621197/pexels-photo-4621197.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"; // Imagen de perfil por defecto
	let location = 'Donovan 123, Chaco, Argentina'; 
	let dni = '12345678'; 

	let errors = {
	  name: '',
	  username: '', 
	  email: '',
	  password: '',
	  location: '', 
	  dni: ''
	};

	function validateForm() {
	  errors = { name: '', username: '', email: '', password: '', location: '', dni: '' };
	  let isValid = true;

	  // Validar nombre y apellido
	  if (!name.trim()) {
		errors.name = 'Name is required';
		isValid = false;
	  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
		errors.name = 'Name must contain only letters and spaces';
		isValid = false;
	  }

	  // Validar email
	  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = 'Valid email is required';
		isValid = false;
	  }

	  // Validar contraseña
	  if (password && password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
		isValid = false;
	  }

	  // Validar ubicación
	  if (!location.trim()) { 
		errors.location = 'Location is required';
		isValid = false;
	  }

	  // Validar DNI
	  if (!dni.trim()) {
		errors.dni = 'DNI is required';
		isValid = false;
	  } else if (!/^\d+$/.test(dni)) {
		errors.dni = 'DNI must be numeric';
		isValid = false;
	  }

	  // El campo "Nombre de usuario" es opcional, por lo que no se agrega validación

	  return isValid;
	}

	function handleSubmit(event) {
	  event.preventDefault();
	  if (validateForm()) {
		console.log({ name, username, email, password, bio, profilePicture, location, dni });
	  }
	}

	function handleProfilePictureChange(event) {
	  const file = event.target.files[0];
	  if (file) {
		profilePicture = URL.createObjectURL(file);
	  }
	}

import Modal from './ModalConfirmation.svelte'; 
  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Editar perfil</h2>
          <div class="text-center mb-4">
            <img src={profilePicture} alt="Foto de perfil" class="profile-picture" />
          </div>

          <form on:submit={handleSubmit}>
            <div class="mb-3">
              <label for="profilePicture" class="form-label">Cambiar foto de perfil:</label>
              <input
                type="file"
                id="profilePicture"
                class="form-control"
                accept="image/*"
                on:change={handleProfilePictureChange}
              />
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">Nombre y Apellido:</label>
              <input
                type="text"
                id="name"
                class="form-control"
                bind:value={name}
                placeholder="Ingresa tu nombre"
              />
              {#if errors.name}<div class="text-danger">{errors.name}</div>{/if}
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
              <label for="dni" class="form-label">DNI:</label>
              <input
                type="text"
                id="dni"
                class="form-control"
                bind:value={dni}
                placeholder="Ingresa tu DNI"
              />
              {#if errors.dni}<div class="text-danger">{errors.dni}</div>{/if}
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input
                type="email"
                id="email"
                class="form-control"
                bind:value={email}
                placeholder="Ingresa tu email"
              />
              {#if errors.email}<div class="text-danger">{errors.email}</div>{/if}
            </div>

            {#if password !== ''}
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                class="form-control"
                bind:value={password}
                placeholder="Ingresa tu contraseña"
              />
              {#if errors.password}<div class="text-danger">{errors.password}</div>{/if}
            </div>
            {/if}

            <div class="mb-3">
              <label for="location" class="form-label">Ubicación:</label> 
              <input
                type="text"
                id="location"
                class="form-control"
                bind:value={location}
                placeholder="Ingresa tu ubicación"
              />
              {#if errors.location}<div class="text-danger">{errors.location}</div>{/if}
            </div>

            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-dark rounded-pill"
			          on:click={openModal}>
                Guardar
              </button>

				<!-- Modal Component -->
				<Modal showModal={showModal} closeModal={closeModal} />
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

  .profile-picture {
    width: 200%;
    max-width: 200px; 
    height: 200px;
    border-radius: 50%; 
    border: 2px solid #afaca8; 
    object-fit: cover;
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
