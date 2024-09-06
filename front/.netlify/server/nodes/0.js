

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Cf2V3dWO.js","_app/immutable/chunks/scheduler.Uhcmbk6i.js","_app/immutable/chunks/index.CzQM9D2z.js"];
export const stylesheets = [];
export const fonts = [];
