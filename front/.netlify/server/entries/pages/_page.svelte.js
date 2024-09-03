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
const css$2 = {
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
  $$result.css.add(css$2);
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
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" data-svelte-h="svelte-10wmc20"><div class="container-fluid"><a class="navbar-brand" href="#">Navbar</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse" id="navbarColor02"><ul class="navbar-nav me-auto"><li class="nav-item"><a class="nav-link active" href="#">Home
            <span class="visually-hidden">(current)</span></a></li> <li class="nav-item"><a class="nav-link" href="#">Features</a></li> <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li> <li class="nav-item"><a class="nav-link" href="#">About</a></li> <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a> <div class="dropdown-menu"><a class="dropdown-item" href="#">Action</a> <a class="dropdown-item" href="#">Another action</a> <a class="dropdown-item" href="#">Something else here</a> <div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Separated link</a></div></li></ul> <form class="d-flex"><input class="form-control me-sm-2" type="search" placeholder="Search"> <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button></form></div></div></nav>`;
});
const css$1 = {
  code: "footer.svelte-1ioxxtp{padding:40px;text-align:center}.copyright.svelte-1ioxxtp{color:#aaa;font-size:14px;display:inline-block;padding:20px;border-top:1px solid #ddd}",
  map: '{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer>\\n    <div class=\\"copyright\\">\\n        Copyright 2024 PoolShop\\n    </div>\\n</footer>\\n\\n<style>\\n    footer {\\n        padding: 40px;\\n        text-align: center;\\n    }\\n    .copyright {\\n        color: #aaa;\\n        font-size: 14px;\\n        display: inline-block;\\n        padding: 20px;\\n        border-top: 1px solid #ddd;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAOI,qBAAO,CACH,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAChB,CACA,yBAAW,CACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAC1B"}'
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="svelte-1ioxxtp" data-svelte-h="svelte-160n0ww"><div class="copyright svelte-1ioxxtp">Copyright 2024 PoolShop</div> </footer>`;
});
async function loadCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Hubo un problema en la respuesta, error:", error);
  }
}
const Cardpool = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  loadCharacters();
  return `<div class="card mb-3" data-svelte-h="svelte-1eqyuh6"><h3 class="card-header">Card header</h3> <div class="card-body"><h5 class="card-title">Special title treatment</h5> <h6 class="card-subtitle text-muted">Support card subtitle</h6></div> <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle"><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg> <div class="card-body"><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card&#39;s content.</p></div> <ul class="list-group list-group-flush"><li class="list-group-item">Cras justo odio</li> <li class="list-group-item">Dapibus ac facilisis in</li> <li class="list-group-item">Vestibulum at eros</li></ul> <div class="card-body"><a href="#" class="card-link">Card link</a> <a href="#" class="card-link">Another link</a></div> <div class="card-footer text-muted">2 days ago</div></div>`;
});
const css = {
  code: ".pool-visto-container.svelte-1gkg4zz{text-align:center;margin-top:20px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import Home from '../lib/componentes/Home.svelte'\\n    import Header from '../lib/componentes/Header.svelte';\\n    import Footer from \\"../lib/componentes/Footer.svelte\\"\\n    import Cardpool from '../lib/componentes/Cardpool.svelte';\\n<\/script>\\n\\n<main>\\n    <Header />\\n    <br />\\n    <Home />\\n    <br />\\n    <div class=\\"pool-visto-container\\">\\n        <h2 class=\\"text-body-secondary\\">\\n            Pools más vistos\\n        </h2>\\n    </div>\\n    <div class=\\"container\\">\\n        <div class=\\"row\\">\\n            <div class=\\"col\\">\\n                <Cardpool />\\n            </div>\\n            <div class=\\"col\\">\\n                <Cardpool />\\n            </div>\\n            <div class=\\"col\\">\\n                <Cardpool />\\n            </div>\\n        </div>\\n    </div>\\n    <Footer />\\n\\n</main>\\n\\n<style>\\n    .pool-visto-container {\\n        text-align: center;\\n        margin-top: 20px;  \\n    }\\n</style>"],"names":[],"mappings":"AAmCI,oCAAsB,CAClB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IAChB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <br> ${validate_component(Home, "Home").$$render($$result, {}, {}, {})} <br> <div class="pool-visto-container svelte-1gkg4zz" data-svelte-h="svelte-1kkzz3u"><h2 class="text-body-secondary">Pools más vistos</h2></div> <div class="container"><div class="row"><div class="col">${validate_component(Cardpool, "Cardpool").$$render($$result, {}, {}, {})}</div> <div class="col">${validate_component(Cardpool, "Cardpool").$$render($$result, {}, {}, {})}</div> <div class="col">${validate_component(Cardpool, "Cardpool").$$render($$result, {}, {}, {})}</div></div></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </main>`;
});
export {
  Page as default
};
