

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CPjgsAGu.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Dzk2CH_x.js","_app/immutable/chunks/entry.D8NJ6Ly_.js"];
export const stylesheets = [];
export const fonts = [];
