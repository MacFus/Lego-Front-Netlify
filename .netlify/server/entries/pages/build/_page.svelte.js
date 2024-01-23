import { c as create_ssr_component, a as subscribe, b as createEventDispatcher, d as add_attribute, e as escape, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { p as pageNumber, i as isLoggedIn, a as isLoading, l as loadedSets } from "../../../chunks/store.js";
import { S as Search } from "../../../chunks/search.js";
import { a as fetchSetWithParts, g as getCookie, b as fetchUserSetParts } from "../../../chunks/api.js";
import { w as writable } from "../../../chunks/index2.js";
import { p as processParts, c as combinePartsFromSetsNoSpare, a as combinePartsFromSets, b as combinePartsFromSetsNoSpareWithColors, d as combinePartsFromSetsWithColors, e as processSubstituteParts, m as matchParts, f as mapToArray } from "../../../chunks/match.js";
import { L as LoginError } from "../../../chunks/loginError.js";
const css$1 = {
  code: ".main-container.svelte-1a19a02.svelte-1a19a02{display:flex;flex-direction:column;height:15rem;width:14rem;justify-content:space-between;margin:20px 5px;border:solid 2px #ddd;background-color:#ffffff}.main-container.svelte-1a19a02.svelte-1a19a02:hover{border:solid 2px #7ea92f}.name-container.svelte-1a19a02.svelte-1a19a02{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:550;padding:0px 5px}.name-container.svelte-1a19a02.svelte-1a19a02:hover{background-color:rgba(255, 255, 255, 0.9);color:#7ea92f;cursor:pointer}.second-container.svelte-1a19a02.svelte-1a19a02{height:40%;padding:0px 5px}.match-container.svelte-1a19a02.svelte-1a19a02{font-weight:700 !important;font-size:30px;color:#28a4c9;font-family:Arial, Helvetica, sans-serif;display:flex;align-items:center;justify-content:center}.img-container.svelte-1a19a02.svelte-1a19a02{width:100%;height:60%;display:flex;justify-content:center;max-width:100%;max-height:70%;cursor:pointer}.main-container.svelte-1a19a02 img-container img.svelte-1a19a02{width:30rem}#imgId.svelte-1a19a02.svelte-1a19a02{max-width:100%;max-height:100%;object-fit:contain}.missing-container.svelte-1a19a02.svelte-1a19a02{color:#8ab933;padding:5px;font-size:16px;display:flex;justify-content:center}",
  map: null
};
const BuildItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dataLoaded, $$unsubscribe_dataLoaded;
  let { set = [] } = $$props;
  let { ignoreColors } = $$props;
  let { allowSubstitute } = $$props;
  const dataLoaded = writable(false);
  $$unsubscribe_dataLoaded = subscribe(dataLoaded, (value) => $dataLoaded = value);
  createEventDispatcher();
  let parts, myParts, processed, match, tableItems, owned = 0;
  let setNum = set.setNum;
  async function load() {
    const parts2 = await fetchSetWithParts(setNum);
    const userId = getCookie("UserId");
    const mySets = await fetchUserSetParts(userId);
    const data = { combinedParts: mySets, parts: parts2 };
    return data;
  }
  function calcMatch(data) {
    parts = data.parts;
    let length = parts?.sets?.length;
    if (length > 1) {
      parts.sets.slice(1);
      hasEmbedded.set(true);
    }
    processed = processParts(parts);
    myParts = data.combinedParts;
    let combinedParts, combinedMyParts;
    if (ignoreColors) {
      owned = 0;
      combinedParts = combinePartsFromSetsNoSpare(parts);
      combinedMyParts = combinePartsFromSets(myParts);
    } else {
      owned = 0;
      combinedParts = combinePartsFromSetsNoSpareWithColors(parts);
      combinedMyParts = combinePartsFromSetsWithColors(myParts);
    }
    if (allowSubstitute) {
      const subs = processSubstituteParts(combinedParts, data.parts.substitutes, ignoreColors);
      match = matchParts(combinedParts, combinedMyParts, subs, allowSubstitute);
    } else {
      match = matchParts(combinedParts, combinedMyParts, null, null);
    }
    tableItems = mapToArray(match);
    tableItems.forEach((part) => {
      owned += part.owned;
    });
  }
  if ($$props.set === void 0 && $$bindings.set && set !== void 0)
    $$bindings.set(set);
  if ($$props.ignoreColors === void 0 && $$bindings.ignoreColors && ignoreColors !== void 0)
    $$bindings.ignoreColors(ignoreColors);
  if ($$props.allowSubstitute === void 0 && $$bindings.allowSubstitute && allowSubstitute !== void 0)
    $$bindings.allowSubstitute(allowSubstitute);
  $$result.css.add(css$1);
  {
    if (setNum) {
      load().then((data) => {
        if (data) {
          calcMatch(data);
          dataLoaded.set(true);
        }
      }).catch((error) => {
        console.error("Error loading data:", error);
      });
    }
  }
  $$unsubscribe_dataLoaded();
  return `${$dataLoaded ? `${set ? `<div class="main-container svelte-1a19a02"><div class="img-container svelte-1a19a02"> <img${add_attribute("src", set.imgUrl, 0)} alt="IMG NOT FOUND" id="imgId" class="svelte-1a19a02"></div> <div class="second-container svelte-1a19a02"><div class="match-container svelte-1a19a02"><div class="match-text">${escape((owned / processed.partsQuantity * 100).toFixed(2))}%</div></div> <div class="missing-container svelte-1a19a02"><div>Missing: ${escape(processed.partsQuantity - owned)} of ${escape(processed.partsQuantity)} parts</div></div>  <div class="name-container svelte-1a19a02">${escape(set.name)}</div></div></div>` : ``}` : ``}`;
});
const css = {
  code: ".main.svelte-1kwswtd{display:flex;flex-direction:column;justify-content:center;align-items:center}.search-container.svelte-1kwswtd{padding-top:20px;display:flex;align-items:center;justify-content:center;flex-direction:row}.result-wrapper.svelte-1kwswtd{display:flex;flex-direction:column;width:max-content;height:max-content;background-color:#ffffff}.result-container.svelte-1kwswtd{display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;height:max-content;width:70vw;align-content:center;justify-items:center}.blurred.svelte-1kwswtd{filter:blur(8px)}.block.svelte-1kwswtd{width:60%;display:flex;justify-content:space-between}",
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
  let allowSubstitute, ignoreColors;
  $$result.css.add(css);
  $$unsubscribe_pageNumber();
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_isLoading();
  $$unsubscribe_loadedSets();
  return `<div class="main svelte-1kwswtd">${$isLoggedIn ? `<div class="search-container svelte-1kwswtd">${validate_component(Search, "Search").$$render(
    $$result,
    {
      themes,
      plcHolder: "Search for LEGO Sets"
    },
    {},
    {}
  )}</div> <div class="block svelte-1kwswtd"><label><input type="checkbox"${add_attribute("checked", allowSubstitute, 1)}>
				Allow substitute parts</label></div> <div class="block svelte-1kwswtd"><label><input type="checkbox"${add_attribute("checked", ignoreColors, 1)}>
				Ignore colors</label></div> <div class="${["svelte-1kwswtd", $isLoading ? "blurred" : ""].join(" ").trim()}"><div class="result-wrapper svelte-1kwswtd">${$loadedSets ? `<div class="result-container svelte-1kwswtd">${each($loadedSets, (set) => {
    return `${validate_component(BuildItem, "BuildItem").$$render($$result, { set, allowSubstitute, ignoreColors }, {}, {})}`;
  })}</div>` : `<div class="result-container svelte-1kwswtd" data-svelte-h="svelte-1xiwvm6">NO DATA LOADED</div>`}</div></div>` : `${validate_component(LoginError, "LoginError").$$render($$result, {}, {}, {})}`} </div>`;
});
export {
  Page as default
};
