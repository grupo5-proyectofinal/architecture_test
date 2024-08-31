

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BgE76wYf.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Ae5gyTAO.js"];
export const stylesheets = ["_app/immutable/assets/2.Dw3RjD-n.css"];
export const fonts = [];
