import { RECENTS_ACTION_TYPES } from "./recents.types";

import { addToArray } from "../../utils/util.functions";

const INITIAL_STATE = {
  recentlyPlayed: null,
};

const recentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECENTS_ACTION_TYPES.ADD_TO_RECENTS:
      return {
        ...state,
        recentlyPlayed: addToArray(state.recentlyPlayed, action.payload),
      };
    default:
      return state;
  }
};

export default recentsReducer;
