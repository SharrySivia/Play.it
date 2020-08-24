import React from "react";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./header.styles.scss";

const Header = ({ currentUser }) => {
  let displayName;
  if (currentUser) {
    displayName = currentUser.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
  return (
    <div className="header">
      <FormInput
        type="text"
        name="search"
        placeholder="Search for tracks, artists etc..."
        isSearchInput
      />
      {currentUser ? (
        <div className="user-info" onClick={() => auth.signOut()}>
          {displayName}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Header);
