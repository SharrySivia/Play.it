import React from "react";
import { Link } from "react-router-dom";

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../loading-spinner/loading-spinner.component";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isSigningUp: false,
      signupErr: "",
    };
  }

  signup = async () => {
    const { displayName, email, password } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isSigningUp: false,
      });
    } catch (err) {
      const errCode = err.code;
      if (errCode === "auth/email-already-in-use") {
        this.setState({
          signupErr: "User already exists. Go to signin",
          isSigningUp: false,
        });
      } else {
        this.setState({
          signupErr: err.message,
          isSigningUp: false,
        });
      }
    }
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    } else if (password.length < 8) {
      alert("Password length must be equal to or greater than 8");
      return;
    }
    this.setState({ isSigningUp: true }, this.signup);
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      signupErr,
      isSigningUp,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">Signup</h2>
        <span>Create a new account with email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Display Name"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={this.handleChange}
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
  }
}

export default SignUp;
