import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";
import { addToArray } from "../../utils/util.functions";
import {
  removePlaylistFromPlaylists,
  removeTrackFromPlaylist,
  setIsPlaylistPlaying,
} from "./playlists.utils";

const INITIAL_STATE = {
  userPlaylists: null,
  isPlaylistsPlaying: false,
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS:
      return {
        ...state,
        userPlaylists: addToArray(state.userPlaylists, action.payload),
      };

    case PLAYLISTS_ACTION_TYPES.TOGGLE_IS_PLAYLISTS_PLAYING:
      return {
        ...state,
        isPlaylistsPlaying: !state.isPlaylistsPlaying,
      };

    case PLAYLISTS_ACTION_TYPES.REMOVE_PLAYLIST_FROM_PLAYLISTS:
      return {
        ...state,
        userPlaylists: removePlaylistFromPlaylists(
          state.userPlaylists,
          action.payload
        ),
      };

    case PLAYLISTS_ACTION_TYPES.REMOVE_TRACK_FROM_PLAYLIST:
      return {
        ...state,
        userPlaylists: removeTrackFromPlaylist(
          state.userPlaylists,
          action.payload
        ),
      };

    case PLAYLISTS_ACTION_TYPES.SET_IS_PLAYLIST_PLAYING:
      return {
        ...state,
        userPlaylists: setIsPlaylistPlaying(
          state.userPlaylists,
          action.payload
        ),
      };

    case PLAYLISTS_ACTION_TYPES.SET_PLAYLISTS_FROM_FIREBASE:
      return {
        ...state,
        userPlaylists: [...action.payload],
      };

    case PLAYLISTS_ACTION_TYPES.CLEAR_PLAYLISTS:
      return {
        ...state,
        userPlaylists: null,
        isPlaylistsPlaying: false,
      };
    default:
      return state;
  }
};

export default playlistsReducer;
