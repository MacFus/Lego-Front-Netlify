

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7AXyByv8.js","_app/immutable/chunks/scheduler.514guA5D.js","_app/immutable/chunks/index.uDeF_TeY.js","_app/immutable/chunks/singletons.GkcbIuHO.js","_app/immutable/chunks/index.8KR2L0nt.js"];
export const stylesheets = [];
export const fonts = [];
