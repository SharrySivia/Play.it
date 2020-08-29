import { createSelector } from "reselect";

const selectRecents = (state) => state.recents;

export const selectRecentlyPlayed = createSelector(
  [selectRecents],
  (recents) => recents.recentlyPlayed
);

export const selectIsRecentsFetching = createSelector(
  [selectRecents],
  (recents) => recents.isRecentsFetching
);
