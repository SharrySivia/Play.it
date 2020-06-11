import { PLAYER_ACTION_TYPES } from "./player.types";

const INITIAL_STATE = {
  currentTrack: null,
  currTime: 0,
  duration: 0,
  isPaused: true,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_ACTION_TYPES.PLAY_TRACK:
      return {
        ...state,
        currTime: 0,
        currentTrack: action.payload,
        isPaused: true,
      };
    case PLAYER_ACTION_TYPES.SET_CURR_TIME:
      return {
        ...state,
        currTime: action.payload,
      };
    case PLAYER_ACTION_TYPES.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case PLAYER_ACTION_TYPES.TOGGLE_IS_PAUSED:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    default:
      return state;
  }
};

export default playerReducer;
