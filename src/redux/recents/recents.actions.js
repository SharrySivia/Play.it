import { RECENTS_ACTION_TYPES } from "./recents.types";

export const addToRecents = (track) => ({
  type: RECENTS_ACTION_TYPES.ADD_TO_RECENTS,
  payload: track,
});

export const toggleIsRecentsFetching = () => ({
  type: RECENTS_ACTION_TYPES.TOGGLE_IS_RECENTS_FETCHING,
});

export const setRecentlyPlayedFromFirebase = (tracks) => ({
  type: RECENTS_ACTION_TYPES.SET_RECENTLY_PLAYED_FROM_FIREBASE,
  payload: tracks,
});

export const clearRecentlyplayed = () => ({
  type: RECENTS_ACTION_TYPES.CLEAR_RECENTLY_PLAYED,
});
