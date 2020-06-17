export const addToQueue = (queue, trackToAdd) => {
  if (!queue) return [trackToAdd];
  let existingTrack = queue.find((track) => track.id === trackToAdd.id);
  if (existingTrack) return queue;
  return [...queue, trackToAdd];
};

export const removeFromQueue = (queue, trackToRemove) => {
  const newQueue = queue.filter((track) => track.id !== trackToRemove.id);
  return newQueue.length ? newQueue : null;
};
