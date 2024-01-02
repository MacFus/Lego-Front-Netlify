import { c as create_ssr_component, a as subscribe, b as createEventDispatcher, f as each, v as validate_component } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index2.js";
import { S as SetItem } from "../../../chunks/setItem.js";
const css = {
  code: ".main.svelte-36iz8.svelte-36iz8{display:flex;flex-direction:column;align-items:center;justify-content:center}.yellow-container.svelte-36iz8.svelte-36iz8{background-color:#ece288;color:#414141;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:center}.sets-container.svelte-36iz8.svelte-36iz8{color:#414141;width:70vw}.selected.svelte-36iz8.svelte-36iz8{border:solid 2px #7ea92f}.tiles-container.svelte-36iz8.svelte-36iz8{display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px;height:max-content;align-content:center;justify-items:center;justify-content:center}.header-container.svelte-36iz8.svelte-36iz8{display:flex;flex-direction:row;align-items:center;width:70%;justify-content:space-between}.header.svelte-36iz8 p.svelte-36iz8{font-size:26px;margin:5px 0px 2px 0px}.actions.svelte-36iz8.svelte-36iz8{display:flex;justify-content:center;margin-top:10px;margin-bottom:10px}.action-btn.svelte-36iz8.svelte-36iz8{background-color:#ffffff;padding:3px 10px;font-size:16px;margin:0px 10px;border:2px solid #adadad;border-radius:5px;cursor:pointer}.action-btn.svelte-36iz8.svelte-36iz8:hover{background-color:#e6e6e6}.action-btn.svelte-36iz8.svelte-36iz8:active{transform:scale(0.98)}.result-wrapper.svelte-36iz8.svelte-36iz8{display:flex;flex-direction:column;width:max-content;height:max-content;background-color:#ffffff}.result-container.svelte-36iz8.svelte-36iz8{display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:10px;height:max-content;width:70vw;align-content:center;justify-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $data, $$unsubscribe_data;
  let $isLoaded, $$unsubscribe_isLoaded;
  const data = writable(null);
  $$unsubscribe_data = subscribe(data, (value) => $data = value);
  const isLoaded = writable(false);
  $$unsubscribe_isLoaded = subscribe(isLoaded, (value) => $isLoaded = value);
  createEventDispatcher();
  let myStoredValue;
  let selectedSets = [];
  $$result.css.add(css);
  {
    {
      if (typeof window !== "undefined") {
        myStoredValue = localStorage.getItem("isLoggedIn");
        console.log(myStoredValue);
        console.log($isLoaded);
      }
    }
  }
  $$unsubscribe_data();
  $$unsubscribe_isLoaded();
  return `<div class="main svelte-36iz8">${myStoredValue && $data ? `<div class="yellow-container svelte-36iz8" data-svelte-h="svelte-19kk3mw"><div class="header-container svelte-36iz8"><div class="header svelte-36iz8"><p class="svelte-36iz8">My LEGO Collection</p></div></div></div> <div class="sets-container svelte-36iz8"><div class="header svelte-36iz8" data-svelte-h="svelte-j52q24"><p class="svelte-36iz8">Your sets:</p></div> <div class="tiles-container svelte-36iz8"> <div class="result-wrapper svelte-36iz8"><div class="result-container svelte-36iz8">${each($data.sets, (set) => {
    return `<div class="${["svelte-36iz8", selectedSets.includes(set.setNum) ? "selected" : ""].join(" ").trim()}">${validate_component(SetItem, "SetItem").$$render($$result, { set, quantity: set.quantity }, {}, {})} </div>`;
  })}</div></div></div> <div class="actions svelte-36iz8"> <div class="action-btn svelte-36iz8" data-svelte-h="svelte-1qr53dj"><p>Remove Sets (quantity - 1)</p></div>  <div class="action-btn svelte-36iz8" data-svelte-h="svelte-1ar9s70"><p>Remove All Selected Sets From My Sets Collection</p></div>  <div class="action-btn svelte-36iz8" data-svelte-h="svelte-1obvky3"><p>Add Sets (quantity + 1)</p></div></div></div>` : ``} </div>`;
});
export {
  Page as default
};
