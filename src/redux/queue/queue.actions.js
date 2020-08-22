import { QUEUE_ACTION_TYPES } from "./queue.types";

export const addTrackToQueue = (track) => ({
  type: QUEUE_ACTION_TYPES.ADD_TO_QUEUE,
  payload: track,
});

export const addPlaylistToQueue = (playlist) => ({
  type: QUEUE_ACTION_TYPES.ADD_PLAYLIST_TO_QUEUE,
  payload: playlist,
});

export const toggleQueueHidden = () => ({
  type: QUEUE_ACTION_TYPES.TOGGLE_QUEUE_HIDDEN,
});

export const removeFromQueue = (track) => ({
  type: QUEUE_ACTION_TYPES.REMOVE_FROM_QUEUE,
  payload: track,
});

export const clearQueue = () => ({
  type: QUEUE_ACTION_TYPES.CLEAR_QUEUE,
});
