import { addToArray } from "../../utils/util.functions";

export const addToRecents = (recentlyPlayed, trackToAdd) => {
  return addToArray(recentlyPlayed, trackToAdd);
};
