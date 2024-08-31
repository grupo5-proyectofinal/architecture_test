

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DdZ5niIF.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Dzk2CH_x.js","_app/immutable/chunks/entry.F5kb0uFn.js"];
export const stylesheets = [];
export const fonts = [];
