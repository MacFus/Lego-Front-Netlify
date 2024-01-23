import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, d as add_attribute, f as each } from "../../../../chunks/ssr.js";
import { i as isLoggedIn } from "../../../../chunks/store.js";
import { T as Tile } from "../../../../chunks/table.svelte_svelte_type_style_lang.js";
import { L as LoginError } from "../../../../chunks/loginError.js";
const css = {
  code: ".main.svelte-ms898h.svelte-ms898h{display:flex;flex-direction:column;align-items:center;justify-content:center}.yellow-container.svelte-ms898h.svelte-ms898h{background-color:#ece288;color:#414141;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:center}.header-container.svelte-ms898h.svelte-ms898h{display:flex;flex-direction:row;align-items:center;width:70%;justify-content:space-between}.header.svelte-ms898h p.svelte-ms898h{font-size:26px;margin:5px 0px 2px 0px}.content.svelte-ms898h.svelte-ms898h{width:70%;display:flex}.left-container.svelte-ms898h.svelte-ms898h{width:70%;padding:10px}.img-container.svelte-ms898h.svelte-ms898h{display:flex;justify-content:center;align-items:center;height:500px}.img-container.svelte-ms898h img.svelte-ms898h{max-height:500px;width:auto}.right-container.svelte-ms898h.svelte-ms898h{width:30%;background-color:rgb(243, 243, 243);padding:10px;border-left:3px solid rgb(138, 185, 51);color:#414141}.set-info.svelte-ms898h.svelte-ms898h{display:grid}.setname.svelte-ms898h h3.svelte-ms898h{margin:0}.setname.svelte-ms898h.svelte-ms898h{font-size:20px;padding-bottom:28px;padding-top:10px;text-align:center;border-bottom:2px solid #ddd}.setinfo-row.svelte-ms898h.svelte-ms898h{display:flex;width:100%;justify-content:space-between;border-bottom:2px solid #ddd;font-size:15px;padding:5px 0px}.setinfo-label.svelte-ms898h.svelte-ms898h{width:30%;display:flex;align-items:center}.setinfo-value.svelte-ms898h.svelte-ms898h{width:70%;color:#8ab933}.details-container.svelte-ms898h.svelte-ms898h{border:3px solid #ddd}.tiles-container.svelte-ms898h.svelte-ms898h{display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px 2px;height:max-content;align-content:center;justify-items:center;justify-content:center}.tile.svelte-ms898h.svelte-ms898h{padding:0}.section-header.svelte-ms898h.svelte-ms898h{padding-top:20px;margin:15px;border-bottom:2px solid rgb(138, 185, 51);font-size:18px;color:#414141;cursor:pointer;display:block;width:100%}.section-text.svelte-ms898h.svelte-ms898h{margin:15px;margin-top:10px;position:relative;display:inline-block}.section-header.svelte-ms898h h4.svelte-ms898h{margin:0;margin-top:10px;position:relative;display:inline-block}span.svelte-ms898h.svelte-ms898h{font-weight:600}details.svelte-ms898h.svelte-ms898h{user-select:none}summary.svelte-ms898h.svelte-ms898h{display:flex;cursor:pointer}summary.svelte-ms898h.svelte-ms898h::-webkit-details-marker{display:none}.toggle-sign.svelte-ms898h.svelte-ms898h{float:right;padding-right:10px}summary.svelte-ms898h.svelte-ms898h{list-style:none}summary.svelte-ms898h.svelte-ms898h::-webkit-details-marker{display:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  let minifig, sets, parts, processed = 0;
  let { data } = $$props;
  let myStoredValue;
  function processMinifigParts() {
    let total = 0;
    parts.forEach((p) => {
      total += p.quantity;
    });
    return total;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    {
      if (typeof window !== "undefined") {
        myStoredValue = localStorage.getItem("isLoggedIn");
      }
      if (myStoredValue != void 0) {
        isLoggedIn.set(true);
        minifig = data.minifig;
        sets = data.sets;
        parts = data.parts;
        processed = processMinifigParts();
      } else {
        console.log(
          "niezalogowany"
        );
      }
    }
  }
  $$unsubscribe_isLoggedIn();
  return `<div class="main svelte-ms898h">${$isLoggedIn ? `<div class="yellow-container svelte-ms898h"><div class="header-container svelte-ms898h"><div class="header svelte-ms898h"><p class="svelte-ms898h">LEGO SET ${escape(minifig.figNum)} - ${escape(minifig.name)}</p></div></div></div> <div class="content svelte-ms898h"><div class="left-container svelte-ms898h"><div class="img-container svelte-ms898h"><img${add_attribute("src", minifig.imgUrl, 0)} alt="NO IMG FOUND" class="svelte-ms898h"></div> <div class="details-container svelte-ms898h"><div class="section-header svelte-ms898h" data-svelte-h="svelte-n8t2ua"><h4 class="svelte-ms898h">Sets</h4></div> <div class="section-text svelte-ms898h" data-svelte-h="svelte-18ztf7y"><p>This figure appears in the following Sets:</p></div> <div class="tiles-container svelte-ms898h">${each(sets, (set) => {
    return `<div class="tile svelte-ms898h">${validate_component(Tile, "Tile").$$render($$result, { img: set.imgUrl, id: set.setNum }, {}, {})} </div>`;
  })}</div> <details class="svelte-ms898h"><summary class="svelte-ms898h"><div class="section-header svelte-ms898h"><h4 class="svelte-ms898h" data-svelte-h="svelte-1rmkg9h">Standard Parts</h4> <h4 class="toggle-sign svelte-ms898h">${escape("+")}</h4></div></summary> <div class="section-text svelte-ms898h"><p>There are <span class="svelte-ms898h">${escape(parts.length)}</span> parts in this inventory, with
								<span class="svelte-ms898h">${escape(processed)}</span> total quantity.</p></div> <div class="tiles-container svelte-ms898h">${each(parts, (part) => {
    return `<div class="tile svelte-ms898h">${validate_component(Tile, "Tile").$$render(
      $$result,
      {
        img: part.part_img_url,
        quantity: part.quantity,
        id: part.part_num
      },
      {},
      {}
    )} </div>`;
  })}</div></details> </div></div> <div class="right-container svelte-ms898h"> <div class="set-info svelte-ms898h"><div class="setname svelte-ms898h"><h3 class="svelte-ms898h">${escape(minifig.figNum)}</h3></div> <div class="setinfo-columns"><div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-1ahgevp"><p>Name</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(minifig.name)}</p></div></div> <div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-1y068u6"><p>Inventory</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(minifig.numParts)} parts</p></div></div> <div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-162e1ix"><p>Found In</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(sets.length)} sets</p></div></div></div></div>    </div></div>` : `${validate_component(LoginError, "LoginError").$$render($$result, {}, {}, {})}`} </div>`;
});
export {
  Page as default
};
