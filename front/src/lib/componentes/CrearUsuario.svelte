<script>
    let email = '';
    let password = '';
    let confirmPassword = ''; // Añadimos confirmación de contraseña
    let name = '';
    let username = '';
    let bio = '';
    let profilePicture = "https://images.pexels.com/photos/4621197/pexels-photo-4621197.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
    let location = '';
    let dni = '';
  
    let errors = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      username: '',
      location: '',
      dni: ''
    };
  
    function validateForm() {
      errors = { email: '', password: '', confirmPassword: '', name: '', username: '', location: '', dni: '' };
      let isValid = true;
  
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
  
      // Validar nombre completo
      if (!name.trim()) {
        errors.name = 'Nombre completo es requerido';
        isValid = false;
      }
  
      // Validar nombre de usuario
      if (!username.trim()) {
        errors.username = 'El nombre de usuario es requerido';
        isValid = false;
      }
  
      // Validar DNI
      if (!dni.trim()) {
        errors.dni = 'El DNI es requerido';
        isValid = false;
      } else if (!/^\d+$/.test(dni)) {
        errors.dni = 'El DNI debe ser numérico';
        isValid = false;
      }
  
      // Validar ubicación
      if (!location.trim()) {
        errors.location = 'Ubicación es requerida';
        isValid = false;
      }
  
      return isValid;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      if (validateForm()) {
        console.log({ email, password, name, username, bio, profilePicture, location, dni });
      }
    }
  
    function handleProfilePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        profilePicture = URL.createObjectURL(file);
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
  
              <!-- Sección de información adicional -->
              <div class="mb-3">
                <label for="name" class="form-label">Nombre completo:</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  bind:value={name}
                  placeholder="Ingresa tu nombre completo"
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
  
              <div class="text-center mb-4">
                <img src={profilePicture} alt="Foto de perfil" class="profile-picture" />
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
  