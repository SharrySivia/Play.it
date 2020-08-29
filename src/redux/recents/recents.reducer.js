import { RECENTS_ACTION_TYPES } from "./recents.types";

import { addToRecents } from "./recents.utils";

const INITIAL_STATE = {
  recentlyPlayed: null,
  isRecentsFetching: false,
};

const recentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECENTS_ACTION_TYPES.ADD_TO_RECENTS:
      return {
        ...state,
        recentlyPlayed: addToRecents(state.recentlyPlayed, action.payload),
      };
    case RECENTS_ACTION_TYPES.TOGGLE_IS_RECENTS_FETCHING:
      return {
        ...state,
        isRecentsFetching: !state.isRecentsFetching,
      };
    case RECENTS_ACTION_TYPES.SET_RECENTLY_PLAYED_FROM_FIREBASE:
      return {
        ...state,
        recentlyPlayed: [...action.payload],
      };
    case RECENTS_ACTION_TYPES.CLEAR_RECENTLY_PLAYED:
      return {
        ...state,
        recentlyPlayed: null,
      };
    default:
      return state;
  }
};

export default recentsReducer;
