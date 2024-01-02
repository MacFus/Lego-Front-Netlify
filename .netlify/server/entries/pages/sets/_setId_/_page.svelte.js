import { c as create_ssr_component, f as each, e as escape, n as null_to_empty, d as add_attribute, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { i as isLoggedIn, d as hasEmbedded } from "../../../../chunks/store.js";
import { p as processParts, c as combinePartsFromSetsNoSpare, a as combinePartsFromSets, e as processSubstituteParts, m as matchParts, f as mapToArray } from "../../../../chunks/match.js";
import { T as Tile } from "../../../../chunks/table.svelte_svelte_type_style_lang.js";
import { L as LoginError } from "../../../../chunks/loginError.js";
const css$1 = {
  code: "#parts.svelte-js0fce.svelte-js0fce{font-family:Arial, Helvetica, sans-serif;border-collapse:collapse;width:100%}#parts.svelte-js0fce td.svelte-js0fce{border:1px solid #ddd;text-align:center}#parts.svelte-js0fce th.svelte-js0fce{border:1px solid #ddd;padding:8px;text-align:center;background-color:rgb(138, 185, 51);color:white}#parts.svelte-js0fce tr.svelte-js0fce:hover{background-color:#e0e0e0;box-shadow:0px 4px 8px rgba(0, 0, 0, 0.3)}#parts.svelte-js0fce tr.svelte-js0fce{transition:background-color 0.3s ease, box-shadow 0.3s ease}tr.svelte-js0fce.svelte-js0fce{display:none}.all.svelte-js0fce.svelte-js0fce{background-color:rgb(105, 212, 105)}.missing.svelte-js0fce.svelte-js0fce{background-color:rgba(231, 219, 104, 0.829)}.none.svelte-js0fce.svelte-js0fce{background-color:rgba(121, 40, 40, 0.801)}tr.missing.svelte-js0fce.svelte-js0fce,tr.none.svelte-js0fce.svelte-js0fce,tr.all.svelte-js0fce.svelte-js0fce{display:table-row}.table-header.svelte-js0fce.svelte-js0fce{display:table-row}",
  map: null
};
function getClass(part) {
  if (part.owned == part.quantity) {
    return "all";
  } else if (part.owned < part.quantity && part.owned != 0) {
    return "missing";
  } else if (part.owned == 0) {
    return "none";
  }
}
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredParts;
  let { parts } = $$props;
  let { ownedParts, missingParts, noneParts, ignoreColors, allowSubstitute } = $$props;
  if ($$props.parts === void 0 && $$bindings.parts && parts !== void 0)
    $$bindings.parts(parts);
  if ($$props.ownedParts === void 0 && $$bindings.ownedParts && ownedParts !== void 0)
    $$bindings.ownedParts(ownedParts);
  if ($$props.missingParts === void 0 && $$bindings.missingParts && missingParts !== void 0)
    $$bindings.missingParts(missingParts);
  if ($$props.noneParts === void 0 && $$bindings.noneParts && noneParts !== void 0)
    $$bindings.noneParts(noneParts);
  if ($$props.ignoreColors === void 0 && $$bindings.ignoreColors && ignoreColors !== void 0)
    $$bindings.ignoreColors(ignoreColors);
  if ($$props.allowSubstitute === void 0 && $$bindings.allowSubstitute && allowSubstitute !== void 0)
    $$bindings.allowSubstitute(allowSubstitute);
  $$result.css.add(css$1);
  filteredParts = parts.filter((part) => {
    const classType = getClass(part);
    return ownedParts && classType === "all" || missingParts && classType === "missing" || noneParts && classType === "none";
  });
  return `<table id="parts" class="svelte-js0fce"><thead><tr class="table-header svelte-js0fce">${ignoreColors ? `<th class="svelte-js0fce" data-svelte-h="svelte-1tfe9gf">ID</th> <th class="svelte-js0fce" data-svelte-h="svelte-19pi85u">Part Image</th> <th class="svelte-js0fce" data-svelte-h="svelte-huy6wk">Part Number</th> ${allowSubstitute ? `<th class="svelte-js0fce" data-svelte-h="svelte-1dh7xk1">Substitute Number</th>` : ``} <th class="svelte-js0fce" data-svelte-h="svelte-1cdxomg">Parts</th> <th class="svelte-js0fce" data-svelte-h="svelte-wilgce">Missing</th>` : `<th class="svelte-js0fce" data-svelte-h="svelte-1tfe9gf">ID</th> <th class="svelte-js0fce" data-svelte-h="svelte-19pi85u">Part Image</th> <th class="svelte-js0fce" data-svelte-h="svelte-huy6wk">Part Number</th> ${allowSubstitute ? `<th class="svelte-js0fce" data-svelte-h="svelte-1dh7xk1">Substitute Number</th>` : ``} <th class="svelte-js0fce" data-svelte-h="svelte-1c60icg">ColorId</th> <th class="svelte-js0fce" data-svelte-h="svelte-mvtm67">Color</th> <th class="svelte-js0fce" data-svelte-h="svelte-1cdxomg">Parts</th> <th class="svelte-js0fce" data-svelte-h="svelte-wilgce">Missing</th>`}</tr></thead> <tbody>${each(filteredParts, (part, index) => {
    return `<tr class="${escape(null_to_empty(getClass(part)), true) + " svelte-js0fce"}"> ${ignoreColors ? `<td class="svelte-js0fce">${escape(index + 1)}</td> <td class="svelte-js0fce"><img${add_attribute("src", part.part_img_url, 0)} alt="No IMG found" style="width: 50px; height: auto;"></td> <td class="svelte-js0fce">${escape(part.part_num)}</td> ${allowSubstitute ? `<td class="svelte-js0fce">${escape(part.substitute)}</td>` : ``} <td class="svelte-js0fce">${escape(part.owned)}/${escape(part.quantity)}</td> <td class="svelte-js0fce">${escape(part.quantity - part.owned)}</td>` : `<td class="svelte-js0fce">${escape(index + 1)}</td> <td class="svelte-js0fce"><img${add_attribute("src", part.part_img_url, 0)} alt="No IMG found" style="width: 50px; height: auto;"></td> <td class="svelte-js0fce">${escape(part.part_num)}</td> ${allowSubstitute ? `<td class="svelte-js0fce">${escape(part.substitute)}</td>` : ``} <td class="svelte-js0fce">${escape(part.colorId)}</td> <td class="svelte-js0fce">${escape(part.color)}</td> <td class="svelte-js0fce">${escape(part.owned)}/${escape(part.quantity)}</td> <td class="svelte-js0fce">${escape(part.quantity - part.owned)}</td>`} </tr>`;
  })}</tbody> </table>`;
});
const css = {
  code: ".main.svelte-ms898h.svelte-ms898h{display:flex;flex-direction:column;align-items:center;justify-content:center}.yellow-container.svelte-ms898h.svelte-ms898h{background-color:#ece288;color:#414141;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:center}.header-container.svelte-ms898h.svelte-ms898h{display:flex;flex-direction:row;align-items:center;width:70%;justify-content:space-between}.header.svelte-ms898h p.svelte-ms898h{font-size:26px;margin:5px 0px 2px 0px}.breadcrumb.svelte-ms898h p.svelte-ms898h{font-size:12px;margin:5px 0px 0px 10px;position:relative;top:2px}.content.svelte-ms898h.svelte-ms898h{width:70%;display:flex}.left-container.svelte-ms898h.svelte-ms898h{width:70%;padding:10px}.img-container.svelte-ms898h.svelte-ms898h{display:flex;justify-content:center;align-items:center;height:500px}.img-container.svelte-ms898h img.svelte-ms898h{max-height:500px;width:auto}.right-container.svelte-ms898h.svelte-ms898h{width:30%;background-color:rgb(243, 243, 243);padding:10px;border-left:3px solid rgb(138, 185, 51);color:#414141}.set-info.svelte-ms898h.svelte-ms898h{display:grid}.setname.svelte-ms898h h3.svelte-ms898h{margin:0}.setname.svelte-ms898h.svelte-ms898h{font-size:20px;padding-bottom:28px;padding-top:10px;text-align:center;border-bottom:2px solid #ddd}.setinfo-row.svelte-ms898h.svelte-ms898h{display:flex;width:100%;justify-content:space-between;border-bottom:2px solid #ddd;font-size:15px;padding:5px 0px}.setinfo-label.svelte-ms898h.svelte-ms898h{width:30%;display:flex;align-items:center}.setinfo-value.svelte-ms898h.svelte-ms898h{width:70%;color:#8ab933}.buildname.svelte-ms898h.svelte-ms898h{font-size:20px;padding-bottom:28px;padding-top:10px;text-align:center;border-bottom:2px solid #ddd}.norm-text.svelte-ms898h.svelte-ms898h{margin:0;font-size:16px}.percentage.svelte-ms898h.svelte-ms898h{margin:0;color:#28a4c9;font-size:30px;margin:5px 0px}.action-btn.svelte-ms898h.svelte-ms898h{background-color:#ffffff;padding:3px 10px;font-size:16px;margin:0px 10px;border:2px solid #adadad;border-radius:5px;cursor:pointer}.action-btn.svelte-ms898h.svelte-ms898h:hover{background-color:#e6e6e6}.action-btn.svelte-ms898h.svelte-ms898h:active{transform:scale(0.98)}.details-container.svelte-ms898h.svelte-ms898h{border:3px solid #ddd}.tiles-container.svelte-ms898h.svelte-ms898h{display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px 2px;height:max-content;align-content:center;justify-items:center;justify-content:center}.tile.svelte-ms898h.svelte-ms898h{padding:0}.section-header.svelte-ms898h.svelte-ms898h{padding-top:20px;margin:15px;border-bottom:2px solid rgb(138, 185, 51);font-size:18px;color:#414141;cursor:pointer;display:block;width:100%}.section-text.svelte-ms898h.svelte-ms898h{margin:15px;margin-top:10px;position:relative;display:inline-block}.section-header.svelte-ms898h h4.svelte-ms898h{margin:0;margin-top:10px;position:relative;display:inline-block}span.svelte-ms898h.svelte-ms898h{font-weight:600}details.svelte-ms898h.svelte-ms898h{user-select:none}summary.svelte-ms898h.svelte-ms898h{display:flex;cursor:pointer}summary.svelte-ms898h.svelte-ms898h::-webkit-details-marker{display:none}.table.svelte-ms898h.svelte-ms898h{width:100%}.toggle-sign.svelte-ms898h.svelte-ms898h{float:right;padding-right:10px}summary.svelte-ms898h.svelte-ms898h{list-style:none}summary.svelte-ms898h.svelte-ms898h::-webkit-details-marker{display:none}.block.svelte-ms898h.svelte-ms898h{display:grid;grid-template-columns:1fr 1fr}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  let $hasEmbedded, $$unsubscribe_hasEmbedded;
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  $$unsubscribe_hasEmbedded = subscribe(hasEmbedded, (value) => $hasEmbedded = value);
  let embeddedSets = [];
  let parts, myParts, processed, match, tableItems, owned = 0;
  let ownedParts = true, missingParts = false, noneParts = false, ignoreColors = true, allowSubstitute = true;
  let { data } = $$props;
  let myStoredValue;
  function calcMatch() {
    parts = data.parts;
    let length = parts?.sets?.length;
    if (length > 1) {
      embeddedSets = parts.sets.slice(1);
      hasEmbedded.set(true);
    }
    processed = processParts(parts);
    myParts = data.combinedParts;
    let combinedParts, combinedMyParts;
    {
      owned = 0;
      combinedParts = combinePartsFromSetsNoSpare(parts);
      combinedMyParts = combinePartsFromSets(myParts);
    }
    {
      const subs = processSubstituteParts(combinedParts, data.parts.substitutes, ignoreColors);
      match = matchParts(combinedParts, combinedMyParts, subs, allowSubstitute);
    }
    tableItems = mapToArray(match);
    tableItems.forEach((part) => {
      owned += part.owned;
    });
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
        console.log(data);
        calcMatch();
      } else {
        console.log("niezalogowany");
      }
    }
  }
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_hasEmbedded();
  return `<div class="main svelte-ms898h">${$isLoggedIn ? `<div class="yellow-container svelte-ms898h"><div class="header-container svelte-ms898h"><div class="header svelte-ms898h"><p class="svelte-ms898h">LEGO SET ${escape(parts.sets[0].name)}</p></div> <div class="breadcrumb svelte-ms898h"><p class="svelte-ms898h">LEGO Sets &gt; ${escape(parts.sets[0].themeName)} &gt; ${escape(parts.sets[0].year)} &gt; ${escape(parts.sets[0].setNum)}</p></div></div></div> <div class="content svelte-ms898h"><div class="left-container svelte-ms898h"><div class="img-container svelte-ms898h"><img${add_attribute("src", parts.sets[0].imgUrl, 0)} alt="NO IMG FOUND" class="svelte-ms898h"></div> <div class="details-container svelte-ms898h">${$hasEmbedded ? `<div class="section-header svelte-ms898h" data-svelte-h="svelte-n8t2ua"><h4 class="svelte-ms898h">Sets</h4></div> <div class="section-text svelte-ms898h"><p>There are <span class="svelte-ms898h">${escape(parts.sets.length - 1)}</span> unique sets in this inventory.</p></div> <div class="tiles-container svelte-ms898h">${each(embeddedSets, (set) => {
    return `<div class="tile svelte-ms898h">${validate_component(Tile, "Tile").$$render(
      $$result,
      {
        img: set.imgUrl,
        quantity: set.quantity,
        id: set.setNum
      },
      {},
      {}
    )} </div>`;
  })}</div>` : `<details class="svelte-ms898h"><summary class="svelte-ms898h"><div class="section-header svelte-ms898h"><h4 class="svelte-ms898h" data-svelte-h="svelte-1rmkg9h">Standard Parts</h4> <h4 class="toggle-sign svelte-ms898h">${escape("+")}</h4></div></summary> <div class="section-text svelte-ms898h"><p>There are <span class="svelte-ms898h">${escape(processed.requiredParts.length)}</span> parts in this inventory,
									with
									<span class="svelte-ms898h">${escape(processed.partsQuantity)}</span> total quantity.</p></div> <div class="tiles-container svelte-ms898h">${each(processed.requiredParts, (part) => {
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
  })}</div></details> <details class="svelte-ms898h"><summary class="svelte-ms898h"><div class="section-header svelte-ms898h"><h4 class="svelte-ms898h" data-svelte-h="svelte-1fn8581">Spare Parts</h4> <h4 class="toggle-sign svelte-ms898h">${escape("+")}</h4></div></summary> <div class="section-text svelte-ms898h"><p>There are <span class="svelte-ms898h">${escape(processed.spareParts.length)}</span> parts in this inventory, with
									<span class="svelte-ms898h">${escape(processed.spareQuantity)}</span> total quantity. These spare parts are not required
									to build this set. If you own this set, they will be included in your parts list when
									considering other sets than can be built.</p></div> <div class="tiles-container svelte-ms898h">${each(processed.spareParts, (part) => {
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
  })}</div></details> <details class="svelte-ms898h"><summary class="svelte-ms898h"><div class="section-header svelte-ms898h"><h4 class="svelte-ms898h" data-svelte-h="svelte-1lwst6q">Build Percentage</h4> <h4 class="toggle-sign svelte-ms898h">${escape("+")}</h4></div></summary> <div class="section-text svelte-ms898h"><div class="block svelte-ms898h"><label><input type="checkbox"${add_attribute("checked", ownedParts, 1)}>
										Show Owned Parts</label> <label><input type="checkbox"${add_attribute("checked", missingParts, 1)}>
										Show Partly Missing Parts</label></div> <div class="block svelte-ms898h"><label><input type="checkbox"${add_attribute("checked", noneParts, 1)}>
										Show Missing Parts</label> <label><input type="checkbox"${add_attribute("checked", ignoreColors, 1)}>
										Ignore colors</label></div> <div class="block svelte-ms898h"><label><input type="checkbox"${add_attribute("checked", allowSubstitute, 1)}>
										Allow substitute parts</label></div> <p>There are <span class="svelte-ms898h">${escape(processed.requiredParts.length)}</span> parts in this inventory,
									with
									<span class="svelte-ms898h">${escape(processed.partsQuantity)}</span> total quantity.</p></div> <div class="tiles-container svelte-ms898h"><div class="table svelte-ms898h">${validate_component(Table, "Table").$$render(
    $$result,
    {
      parts: tableItems,
      ownedParts,
      missingParts,
      noneParts,
      ignoreColors,
      allowSubstitute
    },
    {},
    {}
  )}</div></div></details>`}</div></div> <div class="right-container svelte-ms898h"> <div class="set-info svelte-ms898h"><div class="setname svelte-ms898h"><h3 class="svelte-ms898h">${escape(parts.sets[0].setNum)}</h3></div> <div class="setinfo-columns"><div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-1ahgevp"><p>Name</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(parts.sets[0].name)}</p></div></div> <div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-1bn5pm1"><p>Released</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(parts.sets[0].year)}</p></div></div> <div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-1y068u6"><p>Inventory</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(parts.sets[0].numParts)}</p></div></div> <div class="setinfo-row svelte-ms898h"><div class="setinfo-label svelte-ms898h" data-svelte-h="svelte-q6z8v7"><p>Theme</p></div> <div class="setinfo-value svelte-ms898h"><p>${escape(parts.sets[0].themeName)}</p></div></div></div></div>  <div class="set-info svelte-ms898h"><div class="buildname svelte-ms898h"><h3 data-svelte-h="svelte-1e6pz14">Build this Set</h3> <p class="norm-text svelte-ms898h" data-svelte-h="svelte-3o5jwi">You have</p> <p class="percentage svelte-ms898h">${escape((owned / processed.partsQuantity * 100).toFixed(2))}%</p> <p class="norm-text svelte-ms898h" data-svelte-h="svelte-1azmhwk">of the buildable parts in this Set</p> <p class="norm-text svelte-ms898h">${escape(owned)} out of ${escape(processed.partsQuantity)}</p></div></div>  <div class="set-info svelte-ms898h"><div class="buildname svelte-ms898h"><h3 data-svelte-h="svelte-1e9nfuf">Actions</h3>  <div class="action-btn svelte-ms898h" data-svelte-h="svelte-qby8f8"><p>Add Set to My Sets Collection</p></div></div></div></div></div>` : `${validate_component(LoginError, "LoginError").$$render($$result, {}, {}, {})}`} </div>`;
});
export {
  Page as default
};
