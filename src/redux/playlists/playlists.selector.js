import { createSelector } from "reselect";

const selectPlaylists = (state) => state.playlists;

export const selectUserPlaylists = createSelector(
  [selectPlaylists],
  (playlists) => playlists.userPlaylists
);

export const selectPlaylistsPlaying = createSelector(
  [selectPlaylists],
  (playlists) => playlists.isPlaylistsPlaying
);
