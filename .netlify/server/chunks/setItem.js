import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, e as escape } from "./ssr.js";
const css = {
  code: ".main-container.svelte-x116de.svelte-x116de{display:flex;flex-direction:column;height:15rem;width:10rem;justify-content:space-between;border:solid 2px #ddd;background-color:#ffffff}.main-container.svelte-x116de.svelte-x116de:hover{border:solid 2px #7ea92f}.name-container.svelte-x116de.svelte-x116de{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:550;padding:0px 5px}.name-container.svelte-x116de.svelte-x116de:hover{background-color:rgba(255, 255, 255, 0.9);color:#7ea92f;cursor:pointer}.second-container.svelte-x116de.svelte-x116de{height:30%}.third-container.svelte-x116de.svelte-x116de{display:flex;justify-content:space-between}.img-container.svelte-x116de.svelte-x116de{width:100%;height:70%;display:flex;justify-content:center;max-width:100%;max-height:70%;cursor:pointer}.main-container.svelte-x116de img-container img.svelte-x116de{width:30rem}#imgId.svelte-x116de.svelte-x116de{max-width:100%;max-height:100%;object-fit:contain}.small-text.svelte-x116de.svelte-x116de{font-size:x-small;margin-top:5px;padding:2px 5px;font-weight:500}",
  map: null
};
const SetItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { set = [] } = $$props;
  let { quantity } = $$props;
  let setNum = set.setNum;
  createEventDispatcher();
  if ($$props.set === void 0 && $$bindings.set && set !== void 0)
    $$bindings.set(set);
  if ($$props.quantity === void 0 && $$bindings.quantity && quantity !== void 0)
    $$bindings.quantity(quantity);
  $$result.css.add(css);
  return `${set ? `<div class="main-container svelte-x116de"><div class="img-container svelte-x116de"> <img${add_attribute("src", set.imgUrl, 0)} alt="IMG NOT FOUND" id="imgId" class="svelte-x116de"></div> <div class="second-container svelte-x116de"> ${quantity ? `<div class="name-container svelte-x116de">${escape(quantity)} x ${escape(set.name)}</div>` : `<div class="name-container svelte-x116de">${escape(set.name)}</div>`} <div class="third-container svelte-x116de"><div class="small-text svelte-x116de">${escape(setNum)}</div> <div class="small-text svelte-x116de">(${escape(set.numParts)} parts)</div></div> <div class="third-container svelte-x116de"><div class="small-text svelte-x116de">${escape(set.themeName)}</div> <div class="small-text svelte-x116de">${escape(set.year)}</div></div></div></div>` : ``}`;
});
export {
  SetItem as S
};
