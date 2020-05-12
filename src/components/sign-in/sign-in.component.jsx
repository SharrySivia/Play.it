import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../loading-spinner/loading-spinner.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErr: "",
      isSigningIn: false,
    };
  }

  signin = async () => {
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
        isSigningIn: false,
      });
    } catch (err) {
      const errCode = err.code;
      console.log(err);
      if (errCode === "auth/wrong-password") {
        this.setState({
          loginErr: "The password is wrong.",
          password: "",
          isSigningIn: false,
        });
      } else {
        this.setState({
          loginErr: "There is no user record. Go to SIGNUP",
          email: "",
          password: "",
          isSigningIn: false,
        });
      }
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({ isSigningIn: true }, this.signin);
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, loginErr, isSigningIn } = this.state;

    return (
      <div className="sign-in">
        <h2 className="title">Sign in</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            required
            handleChange={this.handleChange}
            placeholder="Enter email"
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            required
            handleChange={this.handleChange}
            placeholder="Enter password"
          />
          <span className="error">{loginErr}</span>

          <CustomButton type="submit" disabled={isSigningIn}>
            {isSigningIn ? <Spinner /> : "Sign in"}
          </CustomButton>
        </form>
        <span>OR</span>
        <CustomButton onClick={signInWithGoogle} disabled={isSigningIn}>
          Continue with Google
        </CustomButton>
        <span className="footer">
          I don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </div>
    );
  }
}

export default SignIn;
