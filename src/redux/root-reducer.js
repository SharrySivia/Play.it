import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import queueReducer from "./queue/queue.reducer";
import recentsReducer from "./recents/recents.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  queue: queueReducer,
  recents: recentsReducer,
});
export default rootReducer;
