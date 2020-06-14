import { QUEUE_ACTION_TYPES } from "./queue.types";

export const addToQueue = (track) => ({
  type: QUEUE_ACTION_TYPES.ADD_TO_QUEUE,
  payload: track,
});

export const toggleQueueHidden = () => ({
  type: QUEUE_ACTION_TYPES.TOGGLE_QUEUE_HIDDEN,
});
