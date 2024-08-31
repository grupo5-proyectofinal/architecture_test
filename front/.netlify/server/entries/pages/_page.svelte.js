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
const css$1 = {
  code: ".navbar.svelte-1tbin6k{background-color:#000000;padding:5px 10px;font-size:14px}.navbar-brand.svelte-1tbin6k{display:flex;align-items:center}.logo.svelte-1tbin6k{max-width:30px;max-height:30px;height:auto}.navbar-nav.svelte-1tbin6k{display:flex;align-items:center}.nav-link.active.svelte-1tbin6k{color:#007bff;border-bottom:2px solid #007bff}.nav-link.svelte-1tbin6k{color:#ffffff;transition:color 0.3s ease, border-bottom 0.3s ease}.header.svelte-1tbin6k{height:100px}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n  // Define el estado activo de los enlaces de navegación\\n  let activeLink = 'home';\\n\\n  function setActive(link) {\\n    activeLink = link;\\n  }\\n<\/script>\\n\\n<header class=\\"navbar navbar-expand-lg navbar-dark bg-dark fixed-top header\\">\\n  <div class=\\"container d-flex justify-content-between align-items-center\\">\\n    <!-- Espacio para el logo -->\\n    <a class=\\"navbar-brand\\" href=\\"#home\\">\\n      <img src=\\"\\" alt=\\"PoolShop\\" class=\\"logo img-fluid\\" />\\n    </a>\\n    <!-- Menú de navegación -->\\n    <div class=\\"navbar-collapse\\">\\n      <ul class=\\"navbar-nav ml-auto\\">\\n        <li class=\\"nav-item\\">\\n          <a \\n            class=\\"nav-link {activeLink === 'home' ? 'active' : ''}\\" \\n            aria-current=\\"page\\" \\n            href=\\"#home\\"\\n            on:click={() => setActive('home')}\\n          >\\n            Inicio\\n          </a>\\n        </li>\\n        <li class=\\"nav-item\\">\\n          <a \\n            class=\\"nav-link {activeLink === 'about' ? 'active' : ''}\\" \\n            href=\\"#about\\"\\n            on:click={() => setActive('about')}\\n          >\\n            Pools\\n          </a>\\n        </li>\\n        <li class=\\"nav-item\\">\\n          <a \\n            class=\\"nav-link {activeLink === 'contact' ? 'active' : ''}\\" \\n            href=\\"#contact\\"\\n            on:click={() => setActive('contact')}\\n          >\\n            Contacto\\n          </a>\\n        </li>\\n        <li class=\\"nav-item\\">\\n          <a \\n            class=\\"nav-link {activeLink === 'perfil' ? 'active' : ''}\\" \\n            href=\\"#perfil\\"\\n            on:click={() => setActive('perfil')}\\n          >\\n            Perfil\\n          </a>\\n        </li>\\n        \\n        <li class=\\"nav-item\\">\\n          <a \\n            class=\\"nav-link {activeLink === 'logout' ? 'active' : ''}\\" \\n            href=\\"#logout\\"\\n            on:click={() => setActive('logout')}\\n          >\\n           Salir\\n          </a>\\n        </li>\\n      </ul>\\n    </div>\\n  </div>\\n</header>\\n\\n<style>\\n  .navbar {\\n    background-color: #000000; \\n    padding: 5px 10px; \\n    font-size: 14px;   \\n  }\\n\\n  .navbar-brand {\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .logo {\\n    max-width: 30px; \\n    max-height: 30px; \\n    height: auto;   \\n  }\\n\\n\\n  .navbar-nav {\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .nav-link.active {\\n    color: #007bff;\\n    border-bottom: 2px solid #007bff; \\n  }\\n\\n  .nav-link {\\n    color: #ffffff;\\n    transition: color 0.3s ease, border-bottom 0.3s ease; \\n  }\\n\\n  /* Ajustar el margen superior para evitar el solapamiento */\\n  .header {\\n    height: 100px; /* Ajusta según el tamaño del header */\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuEE,sBAAQ,CACN,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,SAAS,CAAE,IACb,CAEA,4BAAc,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CAEA,oBAAM,CACJ,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IACV,CAGA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CAEA,SAAS,sBAAQ,CACf,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAC3B,CAEA,wBAAU,CACR,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,aAAa,CAAC,IAAI,CAAC,IAClD,CAGA,sBAAQ,CACN,MAAM,CAAE,KACV"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top header svelte-1tbin6k"><div class="container d-flex justify-content-between align-items-center"> <a class="navbar-brand svelte-1tbin6k" href="#home" data-svelte-h="svelte-1l8cdk0"><img src="" alt="PoolShop" class="logo img-fluid svelte-1tbin6k"></a>  <div class="navbar-collapse"><ul class="navbar-nav ml-auto svelte-1tbin6k"><li class="nav-item"><a class="${"nav-link " + escape("active", true) + " svelte-1tbin6k"}" aria-current="page" href="#home">Inicio</a></li> <li class="nav-item"><a class="${"nav-link " + escape("", true) + " svelte-1tbin6k"}" href="#about">Pools</a></li> <li class="nav-item"><a class="${"nav-link " + escape("", true) + " svelte-1tbin6k"}" href="#contact">Contacto</a></li> <li class="nav-item"><a class="${"nav-link " + escape("", true) + " svelte-1tbin6k"}" href="#perfil">Perfil</a></li> <li class="nav-item"><a class="${"nav-link " + escape("", true) + " svelte-1tbin6k"}" href="#logout">Salir</a></li></ul></div></div> </header>`;
});
const css = {
  code: "footer.svelte-1ioxxtp{padding:40px;text-align:center}.copyright.svelte-1ioxxtp{color:#aaa;font-size:14px;display:inline-block;padding:20px;border-top:1px solid #ddd}",
  map: '{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer>\\n    <div class=\\"copyright\\">\\n        Copyright 2024 PoolShop\\n    </div>\\n</footer>\\n\\n<style>\\n    footer {\\n        padding: 40px;\\n        text-align: center;\\n    }\\n    .copyright {\\n        color: #aaa;\\n        font-size: 14px;\\n        display: inline-block;\\n        padding: 20px;\\n        border-top: 1px solid #ddd;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAOI,qBAAO,CACH,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAChB,CACA,yBAAW,CACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAC1B"}'
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<footer class="svelte-1ioxxtp" data-svelte-h="svelte-160n0ww"><div class="copyright svelte-1ioxxtp">Copyright 2024 PoolShop</div> </footer>`;
});
const Cardpool = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-1wbdk69">Prueba</h1>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <br> ${validate_component(Home, "Home").$$render($$result, {}, {}, {})} <br> ${validate_component(Cardpool, "Cardpool").$$render($$result, {}, {}, {})} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
