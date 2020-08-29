import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsSigningIn = createSelector(
  [selectUser],
  (user) => user.isSigningIn
);

export const selectIsSigningUp = createSelector(
  [selectUser],
  (user) => user.isSigningUp
);

export const selectSignInError = createSelector(
  [selectUser],
  (user) => user.signInError
);

export const selectSignUpError = createSelector(
  [selectUser],
  (user) => user.signUpError
);

export const selectIsUserFetching = createSelector(
  [selectUser],
  (user) => user.isUserFetching
);
