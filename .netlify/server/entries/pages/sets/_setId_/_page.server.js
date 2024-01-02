import "../../../../chunks/index.js";
import { a as fetchSetWithParts, b as fetchUserSetParts } from "../../../../chunks/api.js";
async function load({ params, cookies }) {
  const parts = await fetchSetWithParts(params.setId);
  const userId = cookies.get("UserId");
  const mySets = await fetchUserSetParts(userId);
  const data = {
    combinedParts: mySets,
    parts
  };
  return data;
}
export {
  load
};
