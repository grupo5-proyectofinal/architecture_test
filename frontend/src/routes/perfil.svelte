<script>
	let name = 'Josefina Zaz';
	let email = 'jz77@example.com';
	let password = '';
	let bio = 'Desarrollador de software';
	let profilePicture = "https://images.pexels.com/photos/4621197/pexels-photo-4621197.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"; // Imagen de perfil por defecto
	let address = 'Donovan 123, Chaco, Argentina';
	let dni = '12345678'; 
  
	let errors = {
	  name: '',
	  email: '',
	  password: '',
	  address: '',
	  dni: '' // Agregar error para el DNI
	};
  
	function validateForm() {
	  errors = { name: '', email: '', password: '', address: '', dni: '' };
	  let isValid = true;
  
	  if (!name.trim()) {
		errors.name = 'Name is required';
		isValid = false;
	  }
  
	  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = 'Valid email is required';
		isValid = false;
	  }
  
	  if (password && password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
		isValid = false;
	  }
  
	  if (!address.trim()) {
		errors.address = 'Address is required';
		isValid = false;
	  }
  
	  if (!dni.trim()) {
		errors.dni = 'DNI is required';
		isValid = false;
	  }
  
	  return isValid;
	}
  
	function handleSubmit(event) {
	  event.preventDefault();
	  if (validateForm()) {
		console.log({ name, email, password, bio, profilePicture, address, dni });
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
	<div class="row">
	  <!-- Contenido principal -->
	  <div class="col-md-9 ms-sm-auto col-lg-10 px-4">
		<div class="card shadow-sm">
		  <div class="card-body">
			<h2 class="card-title mb-4">Edita tu perfil</h2>
  
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
				<label for="name" class="form-label">Nombre:</label>
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
				<label for="address" class="form-label">Dirección:</label>
				<input
				  type="text"
				  id="address"
				  class="form-control"
				  bind:value={address}
				  placeholder="Ingresa tu dirección"
				/>
				{#if errors.address}<div class="text-danger">{errors.address}</div>{/if}
			  </div>
  
			  <!-- Alineación del botón a la derecha -->
			  <div class="text-end">
				<button type="submit" class="btn btn-dark rounded-pill">Guardar</button>
			  </div>
			</form>
		  </div>
		</div>
	  </div>
	</div>
</main>
  
<style>
	.card {
	  margin-left: 20px;
	}
  
	.profile-picture {
	  max-width: 100px; /* Ajustar el tamaño de la imagen */
	  width: 100px; 
	  height: 100px;
	  border-radius: 50%; /* Redondear la imagen */
	  border: 2px solid #ddd; /* Borde para la imagen */
	  object-fit: cover; /* Ajustar la imagen para cubrir el espacio */
	}
  
	.text-danger {
	  color: red;
	}
  
	@media (max-width: 768px) {
	  .card {
		margin-left: 0;
	  }
	}
  
</style>
