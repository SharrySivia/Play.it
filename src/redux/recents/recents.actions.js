import { RECENTS_ACTION_TYPES } from "./recents.types";

export const addToRecents = (track) => ({
  type: RECENTS_ACTION_TYPES.ADD_TO_RECENTS,
  payload: track,
});
