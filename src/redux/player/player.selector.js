import { createSelector } from "reselect";

const selectPlayer = (state) => state.player;

export const selectCurrentTrack = createSelector(
  [selectPlayer],
  (player) => player.currentTrack
);

export const selectCurrentTime = createSelector(
  [selectPlayer],
  (player) => player.currTime
);

export const selectDuration = createSelector(
  [selectPlayer],
  (player) => player.duration
);

export const selectPaused = createSelector(
  [selectPlayer],
  (player) => player.isPaused
);

export const selectMuted = createSelector(
  [selectPlayer],
  (player) => player.isMuted
);

export const selectRepeated = createSelector(
  [selectPlayer],
  (player) => player.isRepeated
);
