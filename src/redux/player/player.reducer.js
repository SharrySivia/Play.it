import { PLAYER_ACTION_TYPES } from "./player.types";

const INITIAL_STATE = {
  currentTrack: null,
  currTime: 0,
  duration: 0,
  isPaused: true,
  isMuted: false,
  isRepeated: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_ACTION_TYPES.PLAY_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
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
    case PLAYER_ACTION_TYPES.TOGGLE_IS_MUTED:
      return {
        ...state,
        isMuted: !state.isMuted,
      };
    case PLAYER_ACTION_TYPES.TOGGLE_IS_REPEATED:
      return {
        ...state,
        isRepeated: !state.isRepeated,
      };
    default:
      return state;
  }
};

export default playerReducer;
