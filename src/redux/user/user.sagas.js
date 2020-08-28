import { takeLatest, put, call, all } from "redux-saga/effects";
// import history from "../history";

import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
} from "./user.actions";

import { UserActionTypes } from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

function getErrMessage(type, err) {
  const errCode = err.code;
  if (type === "signIn") {
    if (errCode === "auth/wrong-password") {
      return "The password is wrong.";
    }
    return "There is no user record. Go to SIGNUP";
  } else {
    if (errCode === "auth/email-already-in-use") {
      return "User already exists. Go to signin";
    }
    return "Something went wrong.";
  }
}

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );

    const userSnapshot = yield userRef.get();
    yield put(
      signInSuccess({ userId: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(getErrMessage("signIn", error)));
  }
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield yield put(signInFailure(getErrMessage("signIn", error)));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(getErrMessage("signUp", error)));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* isUserAuthenticated({ payload: { history } }) {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield call(history.push, "/");
    } else {
      yield call(history.replace, "/signin");
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(getErrMessage("signIn", error)));
  }
}

export function* signOut({ payload: { history } }) {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield call(history.replace, "/signin");
  } catch (error) {
    console.log(error);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSucsess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* checkUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSucsess),
    call(checkUserSession),
    call(onSignOutStart),
  ]);
}
