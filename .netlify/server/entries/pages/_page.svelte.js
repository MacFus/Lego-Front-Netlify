import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
import { i as isLoggedIn } from "../../chunks/store.js";
import { f as fetchUserDetails } from "../../chunks/api.js";
const css = {
  code: ".index.svelte-1wnhnad{display:block;text-align:center;margin:20px auto}.status.svelte-1wnhnad{color:red}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let message = "";
  let myStoredValue;
  $$result.css.add(css);
  {
    {
      if (typeof window !== "undefined") {
        myStoredValue = localStorage.getItem("isLoggedIn");
      }
      if (myStoredValue != void 0) {
        console.log("zalogowany");
        isLoggedIn.set(true);
        message = `You are logged in. Congrats!`;
        fetchUserDetails().then((response) => {
          console.log(response);
        });
      } else {
        message = `You are NOT logged in!`;
        console.log("niezalogowany");
      }
    }
  }
  return `<div class="index svelte-1wnhnad"><h1 class="status svelte-1wnhnad">${escape(message)}</h1> <h1 data-svelte-h="svelte-8h260g">Hello and welcome to my site!</h1> </div>`;
});
export {
  Page as default
};
