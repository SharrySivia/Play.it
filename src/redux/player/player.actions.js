import { PLAYER_ACTION_TYPES } from "./player.types";

export const playTrack = (track) => ({
  type: PLAYER_ACTION_TYPES.PLAY_TRACK,
  payload: track,
});
