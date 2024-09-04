import { c as create_ssr_component, e as escape, d as null_to_empty, f as add_attribute, h as each, v as validate_component } from "../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../chunks/Footer.js";
import "../../chunks/client.js";
const Cardpool = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="card mb-3"><h3 class="card-header">${escape(data.name)}</h3> <div class="card-body" data-svelte-h="svelte-16g7p0l"><h5 class="card-title">Special title treatment</h5> <h6 class="card-subtitle text-muted">Support card subtitle</h6></div> <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle"><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg> <div class="card-body" data-svelte-h="svelte-1cjnffz"><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card&#39;s content.</p></div> <ul class="list-group list-group-flush" data-svelte-h="svelte-g35hel"><li class="list-group-item">Cras justo odio</li> <li class="list-group-item">Dapibus ac facilisis in</li> <li class="list-group-item">Vestibulum at eros</li></ul> <div class="card-body" data-svelte-h="svelte-ii4c0b"><a href="/" class="card-link">Card link</a> <a href="/" class="card-link">Another link</a></div> <div class="card-footer text-muted" data-svelte-h="svelte-iy8vy4">2 days ago</div></div>`;
});
const css$1 = {
  code: ".card.svelte-1nzb274{margin-bottom:20px}",
  map: `{"version":3,"file":"CardButton.svelte","sources":["CardButton.svelte"],"sourcesContent":["<script>\\n    import { goto } from '$app/navigation'\\n    export let titulo = '';\\n    export let descripcion = '';\\n    export let icon = '';\\n    export let actionLabel = '';\\n    export let redirectTo\\n    \\n    function handleClick() {\\n        goto(redirectTo);\\n    }\\n\\n<\/script>\\n\\n<div class=\\"card text-center\\">\\n    <div class=\\"card-body\\">\\n        {#if icon}\\n            <div class=\\"mb-3\\">\\n                <i class={icon}></i>\\n            </div>\\n        {/if}\\n        <h5 class=\\"card-titulo\\">{titulo}</h5>\\n        <p class=\\"card-text\\">{descripcion}</p>\\n        <button class=\\"btn btn-secondary\\" on:click={handleClick}>{actionLabel}</button>\\n    </div>\\n</div>\\n\\n<style>\\n    .card {\\n        margin-bottom: 20px;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA4BI,oBAAM,CACF,aAAa,CAAE,IACnB"}`
};
const CardButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { titulo = "" } = $$props;
  let { descripcion = "" } = $$props;
  let { icon = "" } = $$props;
  let { actionLabel = "" } = $$props;
  let { redirectTo } = $$props;
  if ($$props.titulo === void 0 && $$bindings.titulo && titulo !== void 0) $$bindings.titulo(titulo);
  if ($$props.descripcion === void 0 && $$bindings.descripcion && descripcion !== void 0) $$bindings.descripcion(descripcion);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.actionLabel === void 0 && $$bindings.actionLabel && actionLabel !== void 0) $$bindings.actionLabel(actionLabel);
  if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0) $$bindings.redirectTo(redirectTo);
  $$result.css.add(css$1);
  return `<div class="card text-center svelte-1nzb274"><div class="card-body">${icon ? `<div class="mb-3"><i class="${escape(null_to_empty(icon), true) + " svelte-1nzb274"}"></i></div>` : ``} <h5 class="card-titulo">${escape(titulo)}</h5> <p class="card-text">${escape(descripcion)}</p> <button class="btn btn-secondary">${escape(actionLabel)}</button></div> </div>`;
});
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { placeholder = "Buscar..." } = $$props;
  let searchQuery = "";
  let filteredPools = [];
  let filteredUsers = [];
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  return `<div class="container"><div class="row" data-svelte-h="svelte-mkzg62"><h1 class="display-4 text-center mt-5">Bienvenido a Pool Shop</h1></div> <div class="row"><div class="container mt-3"><input class="form-control mb-3" type="text"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", searchQuery, 0)}> ${``} ${``} <div> ${filteredPools.length > 0 ? `<h5 data-svelte-h="svelte-1gtq1zc">Pools de Compras Abiertos</h5> <ul class="list-group mb-3">${each(filteredPools, (pool) => {
    return `<li class="list-group-item">${escape(pool.name)}</li>`;
  })}</ul>` : ``}  ${filteredUsers.length > 0 ? `<h5 data-svelte-h="svelte-7hjkeh">Usuarios</h5> <ul class="list-group">${each(filteredUsers, (user) => {
    return `<li class="list-group-item">${escape(user.name)}</li>`;
  })}</ul>` : ``}  ${``}</div></div></div></div>`;
});
const css = {
  code: ".body.svelte-1v0tb1h{padding:75px}.pool-visto-container.svelte-1v0tb1h{text-align:center;margin-top:20px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\n    import Header from '../lib/componentes/Header.svelte';\\n    import Footer from \\"../lib/componentes/Footer.svelte\\";\\n    import Cardpool from '../lib/componentes/Cardpool.svelte';\\n    import CardButton from '../lib/componentes/CardButton.svelte';\\n    import Filter from '../lib/componentes/Filter.svelte';\\n    import { onMount } from 'svelte';\\n  \\n    let trespools = [];\\n    let pools = [];\\n  \\n    // Función para obtener tres elementos aleatorios del array\\n    function getRandomPools(array, num) {\\n      let shuffled = [...array].sort(() => 0.5 - Math.random());\\n      return shuffled.slice(0, num);\\n    }\\n  \\n    // Lógica de carga de datos en el cliente usando onMount\\n    onMount(async () => {\\n      try {\\n        const response = await fetch('https://rickandmortyapi.com/api/character');\\n        if (!response.ok) {\\n          throw new Error('Network response was not ok');\\n        }\\n  \\n        const data = await response.json();\\n        pools = data.results;\\n        \\n        //  3 pools aleatorios\\n        trespools = getRandomPools(pools, 3);\\n      } catch (error) {\\n        console.error('Hubo un problema en la respuesta, error:', error);\\n        pools = [];\\n        trespools = [];\\n      }\\n    });\\n  \\n  <\/script>\\n  \\n  <main>\\n    <Header />\\n    <br />\\n    <div class=\\"body\\">\\n      <div class=\\"container\\">\\n        <div class=\\"row\\">\\n          <div class=\\"col\\">\\n            <Filter />\\n          </div>\\n        </div>\\n        \\n        <!-- Sección de botones -->\\n        <div class=\\"row\\">\\n          <div class=\\"col-md-4\\">\\n            <CardButton \\n              titulo=\\"Cree nuevo pool de compra\\"\\n              descripcion=\\"Empiece creando su propio Pool de compra\\"\\n              actionLabel=\\"Crear pool\\"\\n              redirectTo=\\"/crearpoolshop\\"\\n            />\\n          </div>\\n          <div class=\\"col-md-4\\">\\n            <CardButton \\n              titulo=\\"Únase a grupos existentes\\"\\n              descripcion=\\"Busque grupos basados en su ubicación\\"\\n              actionLabel=\\"Unirse a un grupo\\"\\n            />    \\n          </div>\\n          <div class=\\"col-md-4\\">\\n            <CardButton \\n              titulo=\\"Administre sus grupos\\"\\n              descripcion=\\"Vea y administre los creados o los que pertenece\\"\\n              actionLabel=\\"Administrar grupos\\"\\n            />      \\n          </div>\\n        </div>\\n  \\n        <!-- Sección de pools más vistos -->\\n        <div class=\\"container\\">\\n          <div class=\\"pool-visto-container\\">\\n            <h2 class=\\"text-body-secondary\\">\\n              Pools más vistos\\n            </h2>\\n          </div>\\n          <br />\\n          <div class=\\"container\\">\\n            <div class=\\"row\\">\\n              {#each trespools as pool}\\n                <div class=\\"col\\">\\n                  <Cardpool data={pool} />\\n                </div>\\n              {/each}\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n    <Footer />\\n  </main>\\n  \\n  <style>\\n    .body {\\n      padding: 75px;\\n    }\\n    .pool-visto-container {\\n      text-align: center;\\n      margin-top: 20px;  \\n    }\\n  </style>  "],"names":[],"mappings":"AAqGI,oBAAM,CACJ,OAAO,CAAE,IACX,CACA,oCAAsB,CACpB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trespools = [];
  $$result.css.add(css);
  return `<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <br> <div class="body svelte-1v0tb1h"><div class="container"><div class="row"><div class="col">${validate_component(Filter, "Filter").$$render($$result, {}, {}, {})}</div></div>  <div class="row"><div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Cree nuevo pool de compra",
      descripcion: "Empiece creando su propio Pool de compra",
      actionLabel: "Crear pool",
      redirectTo: "/crearpoolshop"
    },
    {},
    {}
  )}</div> <div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Únase a grupos existentes",
      descripcion: "Busque grupos basados en su ubicación",
      actionLabel: "Unirse a un grupo"
    },
    {},
    {}
  )}</div> <div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Administre sus grupos",
      descripcion: "Vea y administre los creados o los que pertenece",
      actionLabel: "Administrar grupos"
    },
    {},
    {}
  )}</div></div>  <div class="container"><div class="pool-visto-container svelte-1v0tb1h" data-svelte-h="svelte-1yncdfe"><h2 class="text-body-secondary">Pools más vistos</h2></div> <br> <div class="container"><div class="row">${each(trespools, (pool) => {
    return `<div class="col">${validate_component(Cardpool, "Cardpool").$$render($$result, { data: pool }, {}, {})} </div>`;
  })}</div></div></div></div></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </main>`;
});
export {
  Page as default
};
