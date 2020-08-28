import { takeLatest, call, put, all, select } from "redux-saga/effects";

import { getUserRecentlyPlayedRef } from "../../firebase/firebase.utils";
import { setRecentlyPlayedFromFirebase } from "./recents.actions";
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
    yield put(
      setRecentlyPlayedFromFirebase(
        recentlyPlayedSnapShot.data().recentlyPlayed
      )
    );
  } catch (error) {
    console.log(error);
  }
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

export function* recentsSagas() {
  yield all([call(onUserSignIn), call(onRecentlyPlayedUpdate)]);
}
