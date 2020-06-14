import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import queueReducer from "./queue/queue.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  queue: queueReducer,
});
export default rootReducer;
