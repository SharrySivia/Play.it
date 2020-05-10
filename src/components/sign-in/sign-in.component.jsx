import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">Sign in</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            placeholder="Enter email"
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
            placeholder="Enter password"
          />

          <CustomButton type="submit">Sign in</CustomButton>
        </form>
        <span>OR</span>
        <CustomButton onClick={signInWithGoogle}>
          Continue with Google
        </CustomButton>
        <span className="footer">
          I don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </Fragment>
    );
  }
}

export default SignIn;
