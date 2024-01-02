import { w as writable } from "./index2.js";
const isLoggedIn = writable(false);
const isLoading = writable(false);
const minifigSearch = writable(false);
const hasNext = writable(false);
const hasPrevious = writable(false);
const pageNumber = writable(0);
const hasEmbedded = writable(false);
const loadedSets = writable(false);
const loadedMinifigs = writable(false);
export {
  isLoading as a,
  loadedMinifigs as b,
  hasNext as c,
  hasEmbedded as d,
  hasPrevious as h,
  isLoggedIn as i,
  loadedSets as l,
  minifigSearch as m,
  pageNumber as p
};
