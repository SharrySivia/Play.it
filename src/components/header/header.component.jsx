import React from "react";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./header.styles.scss";

const Header = (currentUser) => {
  return (
    <div className="header">
      <FormInput
        type="text"
        name="search"
        placeholder="Search for songs, artists etc..."
        isSearchInput
      />
      <div className="user-info" onClick={() => auth.signOut()}>
        {currentUser.displayName}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const { currentUser } = user;
  return currentUser;
};

export default connect(mapStateToProps)(Header);
