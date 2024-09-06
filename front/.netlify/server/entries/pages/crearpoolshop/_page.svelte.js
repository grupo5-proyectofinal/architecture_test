import { c as create_ssr_component, f as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
const Crearpool = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let titulo = "";
  let descripcion = "";
  let cantidadDisponible = 1;
  let fechaCierre = "";
  let miembrosNecesarios = 1;
  let ubicacion = "";
  let radio = 0;
  return `<div class="container"><div class="row"><div class="col-md-6"><div class="card"><div class="card-body"><form class="form-wrapper"><div class="form-section"><h2 data-svelte-h="svelte-v23yu4">Creando nuevo Pool de Compra</h2> <div class="form-group"><label for="titulo" data-svelte-h="svelte-9wt59">Titulo del Pool</label> <input id="titulo" class="form-control" type="text" placeholder="Ingrese titulo del Pool"${add_attribute("value", titulo, 0)}> ${``}</div>

                            //Probar boton con gestion de errores
                             <div class="form-group"><label for="descripcion" data-svelte-h="svelte-8hw15h">Descripcion del Producto</label> <input id="descripcion" class="form-control" type="text" placeholder="Ingrese descripcion del Producto"${add_attribute("value", descripcion, 0)}> ${``}</div> <div class="form-group"><label for="cantidadDisponible" data-svelte-h="svelte-1912uk0">Cantidad disponible</label> <div class="slider-container"><input id="cantidadDisponible" class="form-control" type="range" min="1" max="100"${add_attribute("value", cantidadDisponible, 0)}> <span>${escape(cantidadDisponible)}</span></div></div> <div class="form-group"><label for="fechaCierre" data-svelte-h="svelte-1xg62zt">Fecha de vencimiento del Pool</label> <input id="fechaCierre" class="form-control" type="date"${add_attribute("value", fechaCierre, 0)}></div> <div class="form-group"><label for="miembrosNecesarios" data-svelte-h="svelte-v66pfm">Cantidad minima de miembros</label> <input id="miembrosNecesarios" class="form-control" type="number" min="1" placeholder="Enter number of members needed"${add_attribute("value", miembrosNecesarios, 0)}></div> <div class="form-group"><label for="ubicacion" data-svelte-h="svelte-5w56rg">Ubicación</label> <input id="ubicacion" class="form-control" type="text" placeholder="Ingrese Ubicación"${add_attribute("value", ubicacion, 0)}></div> <div class="form-group"><label for="radio" data-svelte-h="svelte-12mm3eg">Radio</label> <div class="slider-container"><input id="radio" class="form-control" type="range" min="0" max="100"${add_attribute("value", radio, 0)}> <span>${escape(radio)} km</span></div></div> <button type="submit" class="btn btn-secondary" data-svelte-h="svelte-o3f14d">Guardar</button></div></form></div></div></div> <div class="col-md-6" data-svelte-h="svelte-jcj15a"><div class="image-section"><div class="row"><img src="https://via.placeholder.com/300" alt="Pool location map"></div> <div class="row"><button type="button" class="button">Ampliar imagen</button></div></div></div></div></div>`;
});
const css = {
  code: ".crearpool.svelte-19e5lj9{padding:120px}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import Crearpool from \\"../../lib/componentes/Crearpool.svelte\\"\\n    import Footer from \\"../../lib/componentes/Footer.svelte\\";\\n    import Header from \\"../../lib/componentes/Header.svelte\\";\\n   \\n<\/script>\\n\\n<main>\\n    <Header />\\n    <div class=\\"crearpool\\">\\n        <Crearpool />\\n    </div>\\n    <Footer />\\n</main>\\n\\n<style>\\n    .crearpool {\\n        padding: 120px;\\n    }\\n</style>"],"names":[],"mappings":"AAgBI,yBAAW,CACP,OAAO,CAAE,KACb"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="crearpool svelte-19e5lj9">${validate_component(Crearpool, "Crearpool").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </main>`;
});
export {
  Page as default
};
