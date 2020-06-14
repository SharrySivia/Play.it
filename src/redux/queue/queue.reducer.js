import { QUEUE_ACTION_TYPES } from "./queue.types";

import { addToQueue } from "./queue.utils";

const INITIAL_STATE = {
  isQueueHidden: true,
  queue: null,
};

const queueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEUE_ACTION_TYPES.ADD_TO_QUEUE:
      return {
        ...state,
        queue: addToQueue(state.queue, action.payload),
      };
    case QUEUE_ACTION_TYPES.TOGGLE_QUEUE_HIDDEN:
      return {
        ...state,
        isQueueHidden: !state.isQueueHidden,
      };
    default:
      return state;
  }
};

export default queueReducer;
