import { createSelector } from "reselect";

const selectQueue = (state) => state.queue;

export const selectQueueItems = createSelector(
  [selectQueue],
  (queue) => queue.queueItems
);

export const selectQueueHidden = createSelector(
  [selectQueue],
  (queue) => queue.isQueueHidden
);
