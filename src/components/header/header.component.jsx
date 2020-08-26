import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import UserInfoDropdown from "../user-info-dropdown/user-info-dropdown.component";
import "./header.styles.scss";

const Header = ({ currentUser }) => {
  const [isDropdownHidden, toggleDropdownHidden] = useState(true);

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
        placeholder="Search for tracks.."
        isSearchInput
      />
      {currentUser ? (
        <div
          className="user-info"
          onClick={() => toggleDropdownHidden(!isDropdownHidden)}
        >
          {displayName}
        </div>
      ) : null}
      {isDropdownHidden ? null : (
        <UserInfoDropdown userName={currentUser.displayName} />
      )}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Header);
