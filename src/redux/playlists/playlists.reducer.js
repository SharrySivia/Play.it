import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";
import { addToArray } from "../../utils/util.functions";
import {
  removePlaylistFromPlaylists,
  removeTrackFromPlaylist,
  setIsPlaylistPlaying,
} from "./playlists.utils";

const INITIAL_STATE = {
  playlists: null,
  isPlaylistsPlaying: false,
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS:
      return {
        ...state,
        playlists: addToArray(state.playlists, action.payload),
      };

    case PLAYLISTS_ACTION_TYPES.TOGGLE_IS_PLAYLISTS_PLAYING:
      return {
        ...state,
        isPlaylistsPlaying: !state.isPlaylistsPlaying,
      };

    case PLAYLISTS_ACTION_TYPES.REMOVE_PLAYLIST_FROM_PLAYLISTS:
      return {
        ...state,
        playlists: removePlaylistFromPlaylists(state.playlists, action.payload),
      };

    case PLAYLISTS_ACTION_TYPES.REMOVE_TRACK_FROM_PLAYLIST:
      return {
        ...state,
        playlists: removeTrackFromPlaylist(state.playlists, action.payload),
      };

    case PLAYLISTS_ACTION_TYPES.SET_IS_PLAYLIST_PLAYING:
      return {
        ...state,
        playlists: setIsPlaylistPlaying(state.playlists, action.payload),
      };
    default:
      return state;
  }
};

export default playlistsReducer;
