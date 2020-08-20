import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";

export const addToPlaylists = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS,
  payload: playlist,
});
