

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/perfil/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.BHC7BXDY.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Dzk2CH_x.js"];
export const stylesheets = [];
export const fonts = [];
