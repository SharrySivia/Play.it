import { RECENTS_ACTION_TYPES } from "./recents.types";

export const addToRecents = (track) => ({
  type: RECENTS_ACTION_TYPES.ADD_TO_RECENTS,
  payload: track,
});

export const setRecentlyPlayedFromFirebase = (tracks) => ({
  type: RECENTS_ACTION_TYPES.SET_RECENTLY_PLAYED_FROM_FIREBASE,
  payload: tracks,
});
