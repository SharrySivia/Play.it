export const addToQueue = (queue, trackToAdd) => {
  if (!queue) return [trackToAdd];
  let existingTrack = queue.find((track) => track.id === trackToAdd.id);
  if (existingTrack) return queue;
  return [...queue, trackToAdd];
};
