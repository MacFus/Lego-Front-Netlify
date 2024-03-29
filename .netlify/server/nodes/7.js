import * as server from '../entries/pages/minifigs/_minifigId_/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/minifigs/_minifigId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/minifigs/[minifigId]/+page.server.js";
export const imports = ["_app/immutable/nodes/7.aHsuC6de.js","_app/immutable/chunks/scheduler.514guA5D.js","_app/immutable/chunks/index.uDeF_TeY.js","_app/immutable/chunks/each.-oqiv04n.js","_app/immutable/chunks/navigation.odqHsRbA.js","_app/immutable/chunks/singletons.kr__1EsX.js","_app/immutable/chunks/index.8KR2L0nt.js","_app/immutable/chunks/store.vSNjQ9GX.js","_app/immutable/chunks/table.svelte_svelte_type_style_lang.Rz7t2klZ.js","_app/immutable/chunks/loginError.aUv4PxCM.js"];
export const stylesheets = ["_app/immutable/assets/7.YwOCKF4V.css","_app/immutable/assets/table.PEXFU4KN.css","_app/immutable/assets/loginError.a3_x1asj.css"];
export const fonts = [];
