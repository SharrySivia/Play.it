import { PLAYER_ACTION_TYPES } from "./player.types";

export const setCurrentTrack = (track) => ({
  type: PLAYER_ACTION_TYPES.SET_CURRENT_TRACK,
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

export const toggleIsMuted = () => ({
  type: PLAYER_ACTION_TYPES.TOGGLE_IS_MUTED,
});

export const toggleIsRepeated = () => ({
  type: PLAYER_ACTION_TYPES.TOGGLE_IS_REPEATED,
});

export const clearPlayer = () => ({
  type: PLAYER_ACTION_TYPES.CLEAR_PLAYER,
});
