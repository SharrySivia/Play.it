import { takeLatest, put, call, all } from "redux-saga/effects";

import { UserActionTypes } from "../user/user.types";
import { clearQueue } from "./queue.actions";

export function* clearUserQueue() {
  yield put(clearQueue());
}

export function* onUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserQueue);
}

export function* queueSagas() {
  yield all([call(onUserSignOut)]);
}
