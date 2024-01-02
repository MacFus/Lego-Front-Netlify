import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, e as escape, a as subscribe, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { p as pageNumber, i as isLoggedIn, a as isLoading, b as loadedMinifigs } from "../../../chunks/store.js";
import { S as Search } from "../../../chunks/search.js";
import { L as LoginError } from "../../../chunks/loginError.js";
const css$1 = {
  code: ".main-container.svelte-8vgivm.svelte-8vgivm{display:flex;flex-direction:column;height:15rem;width:10rem;justify-content:space-between;margin:20px 5px;border:solid 2px #ddd;background-color:#ffffff}.main-container.svelte-8vgivm.svelte-8vgivm:hover{border:solid 2px #7ea92f}.name-container.svelte-8vgivm.svelte-8vgivm{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:550;padding:0px 5px}.name-container.svelte-8vgivm.svelte-8vgivm:hover{background-color:rgba(255, 255, 255, 0.9);color:#7ea92f;cursor:pointer}.second-container.svelte-8vgivm.svelte-8vgivm{height:30%}.third-container.svelte-8vgivm.svelte-8vgivm{display:flex;justify-content:space-between}.img-container.svelte-8vgivm.svelte-8vgivm{width:100%;height:70%;display:flex;justify-content:center;max-width:100%;max-height:70%;cursor:pointer}.main-container.svelte-8vgivm img-container img.svelte-8vgivm{width:30rem}#imgId.svelte-8vgivm.svelte-8vgivm{max-width:100%;max-height:100%;object-fit:contain}.small-text.svelte-8vgivm.svelte-8vgivm{font-size:x-small;margin-top:5px;padding:2px 5px;font-weight:500}",
  map: null
};
const MinifigItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { minifig = [] } = $$props;
  createEventDispatcher();
  minifig.figNum;
  if ($$props.minifig === void 0 && $$bindings.minifig && minifig !== void 0)
    $$bindings.minifig(minifig);
  $$result.css.add(css$1);
  return `${minifig ? `<div class="main-container svelte-8vgivm"><div class="img-container svelte-8vgivm"><img${add_attribute("src", minifig.imgUrl, 0)} alt="IMG NOT FOUND" id="imgId" class="svelte-8vgivm"></div> <div class="second-container svelte-8vgivm"><div class="name-container svelte-8vgivm">${escape(minifig.name)}</div> <div class="third-container svelte-8vgivm"><div class="small-text svelte-8vgivm">${escape(minifig.figNum)}</div> <div class="small-text svelte-8vgivm">(${escape(minifig.numParts)} parts)</div></div> <div class="third-container svelte-8vgivm"><div class="small-text svelte-8vgivm">${escape(minifig.theme)}</div></div></div></div>` : ``}`;
});
const css = {
  code: ".main.svelte-1oglw5n{display:flex;flex-direction:column;justify-content:center;align-items:center}.search-container.svelte-1oglw5n{padding-top:20px;display:flex;align-items:center;justify-content:center;flex-direction:row}.result-wrapper.svelte-1oglw5n{display:flex;flex-direction:column;width:max-content;height:max-content;background-color:#ffffff}.result-container.svelte-1oglw5n{display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:20px 0px;height:max-content;width:70vw;align-content:center;justify-items:center}.blurred.svelte-1oglw5n{filter:blur(8px)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_pageNumber;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  let $isLoading, $$unsubscribe_isLoading;
  let $loadedMinifigs, $$unsubscribe_loadedMinifigs;
  $$unsubscribe_pageNumber = subscribe(pageNumber, (value) => value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_loadedMinifigs = subscribe(loadedMinifigs, (value) => $loadedMinifigs = value);
  let themes = [];
  $$result.css.add(css);
  $$unsubscribe_pageNumber();
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_isLoading();
  $$unsubscribe_loadedMinifigs();
  return `<div class="main svelte-1oglw5n">${$isLoggedIn ? `<div class="search-container svelte-1oglw5n">${validate_component(Search, "Search").$$render(
    $$result,
    {
      themes,
      plcHolder: "Search for LEGO Sets"
    },
    {},
    {}
  )}</div> <div class="${["svelte-1oglw5n", $isLoading ? "blurred" : ""].join(" ").trim()}"><div class="result-wrapper svelte-1oglw5n">${$loadedMinifigs ? `<div class="result-container svelte-1oglw5n">${each($loadedMinifigs, (minifig) => {
    return `${validate_component(MinifigItem, "MinifigItem").$$render($$result, { minifig }, {}, {})}`;
  })}</div>` : `<div class="result-container svelte-1oglw5n" data-svelte-h="svelte-1xiwvm6">NO DATA LOADED</div>`}</div></div>` : `${validate_component(LoginError, "LoginError").$$render($$result, {}, {}, {})}`} </div>`;
});
export {
  Page as default
};
