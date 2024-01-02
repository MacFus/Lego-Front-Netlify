import { c as create_ssr_component, a as subscribe, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { p as pageNumber, i as isLoggedIn, a as isLoading, l as loadedSets } from "../../../chunks/store.js";
import { S as Search } from "../../../chunks/search.js";
import { S as SetItem } from "../../../chunks/setItem.js";
import { L as LoginError } from "../../../chunks/loginError.js";
const css = {
  code: ".main.svelte-1oglw5n{display:flex;flex-direction:column;justify-content:center;align-items:center}.search-container.svelte-1oglw5n{padding-top:20px;display:flex;align-items:center;justify-content:center;flex-direction:row}.result-wrapper.svelte-1oglw5n{display:flex;flex-direction:column;width:max-content;height:max-content;background-color:#ffffff}.result-container.svelte-1oglw5n{display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:20px 0px;height:max-content;width:70vw;align-content:center;justify-items:center}.blurred.svelte-1oglw5n{filter:blur(8px)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_pageNumber;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  let $isLoading, $$unsubscribe_isLoading;
  let $loadedSets, $$unsubscribe_loadedSets;
  $$unsubscribe_pageNumber = subscribe(pageNumber, (value) => value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_loadedSets = subscribe(loadedSets, (value) => $loadedSets = value);
  let themes = [];
  $$result.css.add(css);
  $$unsubscribe_pageNumber();
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_isLoading();
  $$unsubscribe_loadedSets();
  return `<div class="main svelte-1oglw5n">${$isLoggedIn ? `<div class="search-container svelte-1oglw5n">${validate_component(Search, "Search").$$render(
    $$result,
    {
      themes,
      plcHolder: "Search for LEGO Sets"
    },
    {},
    {}
  )}</div> <div class="${["svelte-1oglw5n", $isLoading ? "blurred" : ""].join(" ").trim()}"><div class="result-wrapper svelte-1oglw5n">${$loadedSets ? `<div class="result-container svelte-1oglw5n">${each($loadedSets, (set) => {
    return `${validate_component(SetItem, "SetItem").$$render($$result, { set, quantity: null }, {}, {})}`;
  })}</div>` : `<div class="result-container svelte-1oglw5n" data-svelte-h="svelte-1xiwvm6">NO DATA LOADED</div>`}</div></div>` : `${validate_component(LoginError, "LoginError").$$render($$result, {}, {}, {})}`} </div>`;
});
export {
  Page as default
};
