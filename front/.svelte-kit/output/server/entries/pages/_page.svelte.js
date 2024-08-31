import { c as create_ssr_component, d as add_attribute, f as each, e as escape, h as null_to_empty, v as validate_component } from "../../chunks/ssr.js";
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
  code: ".card.svelte-1nzb274{margin-bottom:20px}",
  map: `{"version":3,"file":"CardButton.svelte","sources":["CardButton.svelte"],"sourcesContent":["<script>\\n    // import {goto} from '@sveltejs/kit/navigation';\\n    export let titulo = '';\\n    export let descripcion = '';\\n    export let icon = '';\\n    export let actionLabel = '';\\n    export let actionClick = '';\\n    // export let redirectTo = '';\\n    \\n    // function handleClick() {\\n    //     goto(redirectTo);\\n    // }\\n\\n<\/script>\\n\\n<div class=\\"card text-center\\">\\n    <div class=\\"card-body\\">\\n        {#if icon}\\n            <div class=\\"mb-3\\">\\n                <i class={icon}></i>\\n            </div>\\n        {/if}\\n        <h5 class=\\"card-titulo\\">{titulo}</h5>\\n        <p class=\\"card-text\\">{descripcion}</p>\\n        <button class=\\"btn btn-secondary\\" on:click={actionClick}>{actionLabel}</button>\\n    </div>\\n</div>\\n\\n<style>\\n    .card {\\n        margin-bottom: 20px;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA6BI,oBAAM,CACF,aAAa,CAAE,IACnB"}`
};
const CardButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { titulo = "" } = $$props;
  let { descripcion = "" } = $$props;
  let { icon = "" } = $$props;
  let { actionLabel = "" } = $$props;
  let { actionClick = "" } = $$props;
  if ($$props.titulo === void 0 && $$bindings.titulo && titulo !== void 0) $$bindings.titulo(titulo);
  if ($$props.descripcion === void 0 && $$bindings.descripcion && descripcion !== void 0) $$bindings.descripcion(descripcion);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.actionLabel === void 0 && $$bindings.actionLabel && actionLabel !== void 0) $$bindings.actionLabel(actionLabel);
  if ($$props.actionClick === void 0 && $$bindings.actionClick && actionClick !== void 0) $$bindings.actionClick(actionClick);
  $$result.css.add(css);
  return `<div class="card text-center svelte-1nzb274"><div class="card-body">${icon ? `<div class="mb-3"><i class="${escape(null_to_empty(icon), true) + " svelte-1nzb274"}"></i></div>` : ``} <h5 class="card-titulo">${escape(titulo)}</h5> <p class="card-text">${escape(descripcion)}</p> <button class="btn btn-secondary">${escape(actionLabel)}</button></div> </div>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><div class="container"><div class="row"><div class="col">${validate_component(Filter, "Filter").$$render($$result, {}, {}, {})}</div></div> <div class="row"><div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Cree nuevo pool de compra",
      descripcion: "Empiece creando su propio Pool de compra",
      actionLabel: "Crear pool"
    },
    {},
    {}
  )}</div> <div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Unase a un grupos existentes",
      descripcion: "Busque grupos basados en su ubicación",
      actionLabel: "Unirse a un grupo"
    },
    {},
    {}
  )}</div> <div class="col-md-4">${validate_component(CardButton, "CardButton").$$render(
    $$result,
    {
      titulo: "Administre sus grupos",
      descripcion: "Vea y administre los creados o que pertenezca",
      actionLabel: "Administrar grupos"
    },
    {},
    {}
  )}</div></div></div></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
