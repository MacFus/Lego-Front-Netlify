import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { i as isLoggedIn } from "../../chunks/store.js";
const css$1 = {
  code: ".navigation.svelte-1qvpzih{background-color:#333;height:60px !important}.container.svelte-1qvpzih{display:flex;align-items:center;padding-right:40px}.nav-item.svelte-1qvpzih{display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;width:4rem;height:60px;align-content:center;transition:background-color 0.3s}.nav-item.home.svelte-1qvpzih{margin-right:auto}.nav-item.svelte-1qvpzih:hover{background-color:#8ab933;cursor:pointer}img.svelte-1qvpzih{height:40px}.img.svelte-1qvpzih{padding:10px;vertical-align:middle;height:40px;width:90px}a.svelte-1qvpzih{display:grid;place-items:center;height:60px;color:white;text-decoration:none}",
  map: null
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  let myStoredValue;
  $$result.css.add(css$1);
  {
    {
      if (typeof window !== "undefined") {
        myStoredValue = localStorage.getItem("isLoggedIn");
      }
      if (myStoredValue != void 0) {
        isLoggedIn.set(true);
      } else {
        isLoggedIn.set(false);
      }
    }
  }
  $$unsubscribe_isLoggedIn();
  return `<nav class="navigation svelte-1qvpzih"><div class="container svelte-1qvpzih"><div class="img svelte-1qvpzih" data-svelte-h="svelte-1lwvt62"> <img src="https://pngimg.com/d/lego_PNG84.png" class="svelte-1qvpzih"></div> <div class="nav-item home svelte-1qvpzih" data-svelte-h="svelte-rmlwfa"><a href="/" class="nav-link svelte-1qvpzih">Home</a></div> ${$isLoggedIn ? `<div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-17fabn8"><a href="/build" class="nav-link svelte-1qvpzih">Build</a></div> <div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-1hminpw"><a href="/sets" class="nav-link svelte-1qvpzih">Sets</a></div> <div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-1d42s3y"><a href="/minifigs" class="nav-link svelte-1qvpzih">Minifigs</a></div> <div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-49dx93"><a href="/collection" class="nav-link svelte-1qvpzih">My LEGO</a></div>  <div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-1jl6hk6">  <a href="/" class="nav-link svelte-1qvpzih">Logout</a></div>` : `<div class="nav-item svelte-1qvpzih" data-svelte-h="svelte-fdaruo"><a href="/login" class="nav-link svelte-1qvpzih">Login</a></div>`}</div> </nav>`;
});
const css = {
  code: "body.svelte-zczc6t{background-color:#ffffff;height:100%}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="header">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</header> <body class="svelte-zczc6t">${slots.default ? slots.default({}) : ``}</body> <footer data-svelte-h="svelte-ix7jxo"></footer>`;
});
export {
  Layout as default
};
