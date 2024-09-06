

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.LmBDjhjo.js","_app/immutable/chunks/scheduler.Uhcmbk6i.js","_app/immutable/chunks/index.CzQM9D2z.js","_app/immutable/chunks/entry.C3Orlwji.js"];
export const stylesheets = [];
export const fonts = [];
