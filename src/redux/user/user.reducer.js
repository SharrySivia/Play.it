import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInError: null,
  signUpError: null,
  isSigningIn: false,
  isSigningUp: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isSigningIn: true,
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isSigningUp: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        signInError: null,
        signUpError: null,
        isSigningIn: false,
        isSigningUp: false,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: action.payload,
        isSigningIn: false,
      };

    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.payload,
        isSigningUp: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
