export const removeFromQueue = (queue, trackToRemove) => {
  if (queue.length > 1) {
    return queue.filter((track) => track.id !== trackToRemove.id);
  }
  return null;
};
