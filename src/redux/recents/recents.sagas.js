import { takeLatest, call, put, all, select } from "redux-saga/effects";

import { getUserRecentlyPlayedRef } from "../../firebase/firebase.utils";
import {
  setRecentlyPlayedFromFirebase,
  toggleIsRecentsFetching,
  clearRecentlyplayed,
} from "./recents.actions";
import { UserActionTypes } from "../user/user.types";
import { RECENTS_ACTION_TYPES } from "./recents.types";
import { selectCurrentUser } from "../user/user.selectors";
import { selectRecentlyPlayed } from "./recents.selector";

export function* updateRecentlyPlayedInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const recentlyPlayedRef = yield getUserRecentlyPlayedRef(
        currentUser.userId
      );
      const recentlyPlayedItems = yield select(selectRecentlyPlayed);
      yield recentlyPlayedRef.update({ recentlyPlayed: recentlyPlayedItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* checkRecentlyPlayedFromFirebase({ payload: { userId } }) {
  try {
    const recentlyPlayedRef = yield getUserRecentlyPlayedRef(userId);
    const recentlyPlayedSnapShot = yield recentlyPlayedRef.get();
    const recentlyPlayed = recentlyPlayedSnapShot.data().recentlyPlayed;
    if (recentlyPlayed.length) {
      yield put(setRecentlyPlayedFromFirebase(recentlyPlayed));
      yield put(toggleIsRecentsFetching());
      return;
    }
    yield put(toggleIsRecentsFetching());
  } catch (error) {
    console.log(error);
  }
}

export function* clearRecents() {
  yield put(clearRecentlyplayed());
}

export function* onUserSignIn() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS,
    checkRecentlyPlayedFromFirebase
  );
}

export function* onRecentlyPlayedUpdate() {
  yield takeLatest(
    RECENTS_ACTION_TYPES.ADD_TO_RECENTS,
    updateRecentlyPlayedInFirebase
  );
}

export function* onUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearRecents);
}

export function* recentsSagas() {
  yield all([
    call(onUserSignIn),
    call(onRecentlyPlayedUpdate),
    call(onUserSignOut),
  ]);
}
