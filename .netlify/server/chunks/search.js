import { c as create_ssr_component, a as subscribe, b as createEventDispatcher, d as add_attribute, f as each, e as escape } from "./ssr.js";
import { m as minifigSearch, h as hasPrevious, c as hasNext, p as pageNumber } from "./store.js";
const css = {
  code: ".main-container.svelte-g63qwh.svelte-g63qwh{background-color:#ffffff;padding:20px}.container.svelte-g63qwh.svelte-g63qwh{display:flex;flex-direction:column;width:max-content;background-color:#f5f5f5;color:#666666;padding:10px;font-family:'Open Sans', 'Helvetica Neue', sans-serif;font:14px !important;border:solid 2px #ddd}.search-container.svelte-g63qwh.svelte-g63qwh{display:flex;background-color:#f5f5f5;width:65vw;padding:10px}.search-container.svelte-g63qwh input.svelte-g63qwh{padding:10px;background-color:#ffffff}.search-text.svelte-g63qwh.svelte-g63qwh{font-size:10px}button.svelte-g63qwh.svelte-g63qwh{color:#ffffff;font-family:'Open Sans', 'Helvetica Neue', sans-serif}.search-input.svelte-g63qwh.svelte-g63qwh{width:90%;border:2px solid #ddd;border-right:none;padding:3px;background-color:#fff}.search-btn.svelte-g63qwh.svelte-g63qwh{width:10%;background-color:#7ea92f;margin:0px;padding:0px;border:1px;border-top-right-radius:4px;border-bottom-right-radius:4px;transition:background-color 0.3s ease}.search-btn.svelte-g63qwh.svelte-g63qwh:hover{background-color:#6b8d26;cursor:pointer}.search-btn.svelte-g63qwh.svelte-g63qwh:active{transform:scale(0.98)}.second-container.svelte-g63qwh.svelte-g63qwh{display:flex;flex-direction:row;gap:15px;background-color:#f5f5f5;padding:5px}.left-container.svelte-g63qwh.svelte-g63qwh{width:50%;margin-left:10px;font:14px}.right-container.svelte-g63qwh.svelte-g63qwh{width:50%;margin-right:10px}.year-container.svelte-g63qwh.svelte-g63qwh{display:grid;width:100%;gap:10px}.first-el.svelte-g63qwh.svelte-g63qwh{width:25%;margin-right:5px}.second-el.svelte-g63qwh.svelte-g63qwh{width:70%;font-size:small}.labels.svelte-g63qwh.svelte-g63qwh{position:relative;bottom:8px}.from-year.svelte-g63qwh.svelte-g63qwh{display:flex;justify-content:end;align-items:center}.theme-container.svelte-g63qwh.svelte-g63qwh{justify-content:space-between}.theme-btn.svelte-g63qwh.svelte-g63qwh:hover{background-color:#6b8d26;cursor:pointer}.theme-btn.svelte-g63qwh.svelte-g63qwh:active{transform:scale(0.98)}label.svelte-g63qwh.svelte-g63qwh{font-size:small}.select-input.svelte-g63qwh.svelte-g63qwh{width:70%;border:2px solid #ddd;padding:3px;background-color:#fff}.theme-btn.svelte-g63qwh.svelte-g63qwh{width:10%;background-color:#7ea92f;margin:0px;padding:0px;border:1px;border-radius:4px;transition:background-color 0.3s ease}.sort-container.svelte-g63qwh.svelte-g63qwh{display:flex;flex-direction:row;margin-top:10px;width:65vw;padding-left:20px}select.svelte-g63qwh.svelte-g63qwh:hover,button.svelte-g63qwh.svelte-g63qwh:hover{cursor:pointer}.sort-container.svelte-g63qwh button.svelte-g63qwh{color:#333333}.sort-left-container.svelte-g63qwh select.svelte-g63qwh{padding:5px}.sort-right-container.svelte-g63qwh select.svelte-g63qwh,button.svelte-g63qwh.svelte-g63qwh{padding:5px;background-color:#fff}.sort-right-container.svelte-g63qwh select.svelte-g63qwh{padding:5px;margin-right:15px}.sort-left-container.svelte-g63qwh.svelte-g63qwh{padding:10px;margin-right:auto}.sort-right-container.svelte-g63qwh.svelte-g63qwh{padding:10px}input.svelte-g63qwh.svelte-g63qwh,select.svelte-g63qwh.svelte-g63qwh,button.svelte-g63qwh.svelte-g63qwh{border:solid 2px #ddd}",
  map: null
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $minifigSearch, $$unsubscribe_minifigSearch;
  let $hasPrevious, $$unsubscribe_hasPrevious;
  let $hasNext, $$unsubscribe_hasNext;
  $$unsubscribe_minifigSearch = subscribe(minifigSearch, (value) => $minifigSearch = value);
  $$unsubscribe_hasPrevious = subscribe(hasPrevious, (value) => $hasPrevious = value);
  $$unsubscribe_hasNext = subscribe(hasNext, (value) => $hasNext = value);
  let { plcHolder = "Search for LEGO Sets" } = $$props;
  let { themes = [] } = $$props;
  let search, sYear, eYear, min, max, theme;
  const dispatch = createEventDispatcher();
  function sendDataToParent() {
    let params = {};
    params.theme = theme;
    dispatch("sendData", { params });
  }
  function nextPage() {
    pageNumber.update((n) => n + 1);
    sendDataToParent();
  }
  function prevPage() {
    pageNumber.update((n) => n - 1);
    sendDataToParent();
  }
  if ($$props.plcHolder === void 0 && $$bindings.plcHolder && plcHolder !== void 0)
    $$bindings.plcHolder(plcHolder);
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  if ($$props.nextPage === void 0 && $$bindings.nextPage && nextPage !== void 0)
    $$bindings.nextPage(nextPage);
  if ($$props.prevPage === void 0 && $$bindings.prevPage && prevPage !== void 0)
    $$bindings.prevPage(prevPage);
  $$result.css.add(css);
  $$unsubscribe_minifigSearch();
  $$unsubscribe_hasPrevious();
  $$unsubscribe_hasNext();
  return `<div class="main-container svelte-g63qwh"><div class="container svelte-g63qwh"><div class="search-container svelte-g63qwh"><input type="text" class="search-input svelte-g63qwh"${add_attribute("placeholder", plcHolder, 0)}${add_attribute("value", search, 0)}> <button class="search-btn svelte-g63qwh" data-svelte-h="svelte-1urzxdn"><p class="search-text svelte-g63qwh">Search</p></button></div> <div class="second-container svelte-g63qwh"><div class="left-container svelte-g63qwh"><label for="" class="labels svelte-g63qwh" data-svelte-h="svelte-1hzdmkp">Year of Release:</label> <div class="year-container svelte-g63qwh"><div class="from-year svelte-g63qwh"><label for="" class="first-el svelte-g63qwh" data-svelte-h="svelte-dz8bw9">From</label> <input type="text" class="second-el svelte-g63qwh" placeholder="1945"${add_attribute("value", sYear, 0)}></div> <div class="from-year svelte-g63qwh"><label for="" class="first-el svelte-g63qwh" data-svelte-h="svelte-kr423q">To</label> <input type="text" class="second-el svelte-g63qwh" placeholder="2024"${add_attribute("value", eYear, 0)}></div></div></div> <div class="right-container svelte-g63qwh"><label for="" class="labels svelte-g63qwh" data-svelte-h="svelte-hikm5q">Number of Parts:</label> <div class="year-container svelte-g63qwh"><div class="from-year svelte-g63qwh"><label for="" class="first-el svelte-g63qwh" data-svelte-h="svelte-dz8bw9">From</label> <input type="text" class="second-el svelte-g63qwh" placeholder="0"${add_attribute("value", min, 0)}></div> <div class="from-year svelte-g63qwh"><label for="" class="first-el svelte-g63qwh" data-svelte-h="svelte-kr423q">To</label> <input type="text" class="second-el svelte-g63qwh" placeholder="No Limit"${add_attribute("value", max, 0)}></div></div></div></div> <div class="search-container theme-container svelte-g63qwh"><select name="theme" id="" class="select-input svelte-g63qwh"><option value="" disabled selected data-svelte-h="svelte-qecwe0">Select Theme</option>${each(themes, (theme2) => {
    return `<option${add_attribute("value", theme2, 0)}>${escape(theme2)}</option>`;
  })}</select> <button class="theme-btn svelte-g63qwh" data-svelte-h="svelte-brmxx8"><p class="search-text svelte-g63qwh">Search</p></button></div></div> <div class="sort-container svelte-g63qwh"><div class="sort-left-container svelte-g63qwh"><select class="sortBy svelte-g63qwh">${$minifigSearch ? `<option value="name" selected data-svelte-h="svelte-11oo2dx">Name</option> <option value="num_parts" data-svelte-h="svelte-xsxfz1">Num Parts</option>` : `<option value="name" selected data-svelte-h="svelte-11oo2dx">Name</option> <option value="year" data-svelte-h="svelte-1f4f6ga">Year</option> <option value="num_parts" data-svelte-h="svelte-xsxfz1">Num Parts</option> <option value="set_num" data-svelte-h="svelte-1m4l2zh">Set Num</option>`}</select> <select class="dir svelte-g63qwh"><option selected value="ASC" data-svelte-h="svelte-okmjj0">ASC</option><option value="DESC" data-svelte-h="svelte-1dmh4ux">DESC</option></select></div> <div class="sort-right-container svelte-g63qwh"><select class="offsize svelte-g63qwh"><option selected value="20" data-svelte-h="svelte-zb66vd">20</option><option value="50" data-svelte-h="svelte-da1zyd">50</option><option value="100" data-svelte-h="svelte-5jcfa7">100</option><option value="200" data-svelte-h="svelte-181x5js">200</option></select> ${$hasPrevious ? `<button class="prev-btn svelte-g63qwh" data-svelte-h="svelte-qavwvh">&lt; Prev</button>` : ``} ${$hasNext ? `<button class="next-btn svelte-g63qwh" data-svelte-h="svelte-1wpe1as">Next &gt;</button>` : ``}</div></div> </div>`;
});
export {
  Search as S
};
