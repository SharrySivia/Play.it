import { RECENTS_ACTION_TYPES } from "./recents.types";

import { addToRecents } from "./recents.utils";

const INITIAL_STATE = {
  recentlyPlayed: null,
};

const recentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECENTS_ACTION_TYPES.ADD_TO_RECENTS:
      return {
        ...state,
        recentlyPlayed: addToRecents(state.recentlyPlayed, action.payload),
      };
    case RECENTS_ACTION_TYPES.SET_RECENTLY_PLAYED_FROM_FIREBASE:
      return {
        ...state,
        recentlyPlayed: [...action.payload],
      };
    default:
      return state;
  }
};

export default recentsReducer;
