import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

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
        <h2 className="title">Signup</h2>
        <span>Create a new account with email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={this.state.displayName}
            placeholder="Display Name"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            onChange={this.handleChange}
            required
          />
          <CustomButton type="submit">Signup</CustomButton>
        </form>
        <span>
          I already have an account. <Link to="/signin">Signin</Link>
        </span>
      </Fragment>
    );
  }
}

export default SignUp;
