import { PLAYER_ACTION_TYPES } from "./player.types";

export const playTrack = (track) => ({
  type: PLAYER_ACTION_TYPES.PLAY_TRACK,
  payload: track,
});

export const setCurrTime = (time) => ({
  type: PLAYER_ACTION_TYPES.SET_CURR_TIME,
  payload: time,
});

export const setDuration = (time) => ({
  type: PLAYER_ACTION_TYPES.SET_DURATION,
  payload: time,
});

export const toggleIsPaused = () => ({
  type: PLAYER_ACTION_TYPES.TOGGLE_IS_PAUSED,
});
