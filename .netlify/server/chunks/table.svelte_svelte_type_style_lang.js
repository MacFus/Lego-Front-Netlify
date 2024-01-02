import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, e as escape } from "./ssr.js";
const css = {
  code: ".main-container.svelte-k80vb5{display:flex;flex-direction:column;width:97px;min-height:114px;border:solid 2px #ddd;background-color:#ffffff;align-items:center;justify-content:center}.main-container.svelte-k80vb5:hover{border:solid 2px #7ea92f}.name-container.svelte-k80vb5{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:75%;color:#8ab933;padding:0px 5px;font-family:'Lato', sans-serif}.name-container.svelte-k80vb5:hover{background-color:rgba(255, 255, 255, 0.9);color:#7ea92f;cursor:pointer}.second-container.svelte-k80vb5{height:30%;display:flex;align-items:center;margin:0;font-weight:500}.img-container.svelte-k80vb5{width:100%;display:flex;justify-content:center;max-width:100%;max-height:70%;cursor:pointer}#imgId.svelte-k80vb5{max-width:100%;max-height:100%;object-fit:contain}",
  map: null
};
const Tile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { set = [] } = $$props;
  let { img } = $$props;
  let { quantity } = $$props;
  let { id } = $$props;
  set.setNum;
  createEventDispatcher();
  if ($$props.set === void 0 && $$bindings.set && set !== void 0)
    $$bindings.set(set);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.quantity === void 0 && $$bindings.quantity && quantity !== void 0)
    $$bindings.quantity(quantity);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css);
  return `${set ? `<div class="main-container svelte-k80vb5"><div class="img-container svelte-k80vb5"> <img${add_attribute("src", img, 0)} alt="IMG NOT FOUND" id="imgId" class="svelte-k80vb5"></div> <div class="second-container svelte-k80vb5">${quantity ? `<div class="name-container svelte-k80vb5">${escape(quantity)} x ${escape(id)}</div>` : `<div class="name-container svelte-k80vb5">${escape(id)}</div>`}</div></div>` : ``}`;
});
export {
  Tile as T
};
