import { c as create_ssr_component } from "./ssr.js";
const css = {
  code: ".login-message.svelte-7ek286{border:1px solid #ddd;border-radius:8px;padding:20px;max-width:400px;margin:20px auto;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);font-family:Arial, sans-serif;background-color:#f9f9f9}h2.svelte-7ek286{color:#333;margin-bottom:10px}ul.svelte-7ek286{list-style:none;padding:0}li.svelte-7ek286{margin-bottom:5px;font-size:14px;color:#555}li.svelte-7ek286:before{content:'•';color:#007bff;font-weight:bold;display:inline-block;width:1em;margin-left:-1em}",
  map: null
};
const LoginError = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="login-message svelte-7ek286" data-svelte-h="svelte-7hsizd"><h2 class="svelte-7ek286">Access Restricted</h2> <p>Nie jesteś zalogowany. Aby otrzymać dostęp do tej funkcjonalności proszę zaloguj się do serwisu.</p> <h2 class="svelte-7ek286">Dostępne Funkcjonalności:</h2> <ul class="svelte-7ek286"><li class="svelte-7ek286">Wyszukiwanie zestawów</li> <li class="svelte-7ek286">Przeglądanie figurek</li> <li class="svelte-7ek286">Dodawanie zestawów do swojego konta</li> <li class="svelte-7ek286">Sprawdzanie, ile procent zestawu możesz złożyć</li></ul> </div>`;
});
export {
  LoginError as L
};
