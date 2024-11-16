<script>
  import { onMount } from 'svelte';

  export let pools;

  console.log(pools)

  // Datos de ejemplo para la tabla
  let rows = [
    {
      pool: 'Fernet',
      estado: 'Pagado',
      estadoClase: 'badge-success',
      productos: '7/20',
      fechaCierre: '12/03/2020',
      miembros: '3/3',
      creador: 'Magali',
      precio: '$200 USD',
      opciones: 'Ver más'
    },
    {
      pool: 'Vino',
      estado: 'Inactivo',
      estadoClase: 'badge-secondary',
      productos: '5/15',
      fechaCierre: '15/04/2020',
      miembros: '2/3',
      creador: 'Juan',
      precio: '$150 USD',
      opciones: 'Ver más'
    }
  ];

  let headerHeight = 60; // Altura predeterminada del header

  // Ajustar dinámicamente la altura del header si es necesario
  onMount(() => {
    const header = document.querySelector('header');
    if (header) {
      headerHeight = header.offsetHeight; // Calcula la altura real del header
    }
  });
</script>


<div>
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Pool</th>
          <th>Estado del Pool</th>
          <th>Precio Unitario</th>
          <th>Creador</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            <td>
              <strong>{row.pool}</strong>
              <div>productos {row.productos}</div>
            </td>
            <td>
              <span class={`badge ${row.estadoClase}`}>{row.estado}</span>
              <div>Fecha de cierre: {row.fechaCierre}</div>
              <div>miembros {row.miembros}</div>
            </td>
            <td>{row.precio}</td>
            <td>{row.creador}</td>
            <td><a href="#" class="opciones">{row.opciones}</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>

  .table-container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  .badge-success {
    color: #fff;
    background-color: #28a745;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
  }

  .badge-secondary {
    color: #fff;
    background-color: #6c757d;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
  }

  .opciones {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
  }

  .opciones:hover {
    text-decoration: underline;
  }
</style>
