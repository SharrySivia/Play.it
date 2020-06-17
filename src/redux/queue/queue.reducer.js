import { QUEUE_ACTION_TYPES } from "./queue.types";

import { addToQueue, removeFromQueue } from "./queue.utils";

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
    case QUEUE_ACTION_TYPES.REMOVE_FROM_QUEUE:
      return {
        ...state,
        queue: removeFromQueue(state.queue, action.payload),
      };
    default:
      return state;
  }
};

export default queueReducer;
