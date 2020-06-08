import { PLAYER_ACTION_TYPES } from "./player.types";

const INITIAL_STATE = {
  currentTrack: null,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_ACTION_TYPES.PLAY_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
