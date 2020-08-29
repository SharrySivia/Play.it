import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";

export const addToPlaylists = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS,
  payload: playlist,
});

export const removePlaylistFromPlaylists = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.REMOVE_PLAYLIST_FROM_PLAYLISTS,
  payload: playlist,
});

export const removeTrackFromPlaylist = ({ playlistId, trackToRemove }) => ({
  type: PLAYLISTS_ACTION_TYPES.REMOVE_TRACK_FROM_PLAYLIST,
  payload: { playlistId, trackToRemove },
});

export const setIsPlaylistPlaying = (playlist) => ({
  type: PLAYLISTS_ACTION_TYPES.SET_IS_PLAYLIST_PLAYING,
  payload: playlist,
});

export const toggleIsPlaylistsPlaying = () => ({
  type: PLAYLISTS_ACTION_TYPES.TOGGLE_IS_PLAYLISTS_PLAYING,
});

export const setPlaylistsFromFirebase = (playlists) => ({
  type: PLAYLISTS_ACTION_TYPES.SET_PLAYLISTS_FROM_FIREBASE,
  payload: playlists,
});

export const clearPlaylists = () => ({
  type: PLAYLISTS_ACTION_TYPES.CLEAR_PLAYLISTS,
});
