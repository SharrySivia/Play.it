import { PLAYLISTS_ACTION_TYPES } from "./playlists.types";

const INITIAL_STATE = {
  playlists: [],
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_ACTION_TYPES.ADD_TO_PLAYLISTS:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };
    default:
      return state;
  }
};

export default playlistsReducer;
