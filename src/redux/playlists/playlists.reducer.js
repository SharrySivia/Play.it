import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";
import { addToArray } from "../../utils/util.functions";
import { removeFromPlaylists } from "./playlists.utils";

const INITIAL_STATE = {
  playlists: null,
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS:
      return {
        ...state,
        playlists: addToArray(state.playlists, action.payload),
      };

    case PLAYLISTS_ACTION_TYPES.REMOVE_FROM_PLAYLISTS:
      return {
        ...state,
        playlists: removeFromPlaylists(state.playlists, action.payload),
      };
    default:
      return state;
  }
};

export default playlistsReducer;
