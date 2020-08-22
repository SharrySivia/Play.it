import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";

export const addToPlaylists = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS,
  payload: playlist,
});

export const removeFromPlaylists = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.REMOVE_FROM_PLAYLISTS,
  payload: playlist,
});
