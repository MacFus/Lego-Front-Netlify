import "../../../../chunks/index.js";
import { c as getMinifigByFigNum } from "../../../../chunks/api.js";
async function load({ params }) {
  const response = await getMinifigByFigNum(params.minifigId);
  const data = {
    minifig: response.minifig,
    parts: response.parts,
    sets: response.sets
  };
  return data;
}
export {
  load
};
