import { takeLatest, all, call, put } from "redux-saga/effects";

import { UserActionTypes } from "../user/user.types";
import { clearPlayer } from "./player.actions";

export function* clearUserPlayer() {
  yield put(clearPlayer());
}

export function* onUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserPlayer);
}

export function* playerSagas() {
  yield all([call(onUserSignOut)]);
}
