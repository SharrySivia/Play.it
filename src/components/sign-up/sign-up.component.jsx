import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../loading-spinner/loading-spinner.component";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSigningUp: false,
    signupErr: "",
  });
  const {
    displayName,
    email,
    password,
    confirmPassword,
    signupErr,
    isSigningUp,
  } = userCredentials;

  const signup = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      setUserCredentials({
        ...userCredentials,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isSigningUp: false,
      });
    } catch (err) {
      const errCode = err.code;
      if (errCode === "auth/email-already-in-use") {
        setUserCredentials({
          ...userCredentials,
          signupErr: "User already exists. Go to signin",
          isSigningUp: false,
        });
      } else {
        setUserCredentials({
          ...userCredentials,
          signupErr: err.message,
          isSigningUp: false,
        });
      }
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    } else if (password.length < 8) {
      alert("Password length must be equal to or greater than 8");
      return;
    }
    setUserCredentials({
      ...userCredentials,
      isSigningUp: true,
    });

    signup();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">Signup</h2>
      <span>Create a new account with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Display Name"
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <span className="error">{signupErr}</span>

        <CustomButton type="submit" disabled={isSigningUp}>
          {isSigningUp ? <Spinner /> : "Signup"}
        </CustomButton>
      </form>
      <span>OR</span>
      <CustomButton onClick={signInWithGoogle} disabled={isSigningUp}>
        Continue with Google
      </CustomButton>
      <span className="footer">
        I already have an account? <Link to="/signin">Signin</Link>
      </span>
    </div>
  );
};

export default SignUp;
