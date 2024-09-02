

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CwY8g9aY.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Dzk2CH_x.js"];
export const stylesheets = ["_app/immutable/assets/2.C_7oAplS.css"];
export const fonts = [];
