import React from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import useToggle from "../../hooks/useToggle";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import UserInfoDropdown from "../user-info-dropdown/user-info-dropdown.component";
import "./user-info.styles.scss";

const UserInfo = ({ currentUser }) => {
  const [isDropdownHidden, toggleDropdownHidden] = useToggle(true);

  let displayName;
  if (currentUser) {
    displayName = currentUser.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div className="user-info">
      <div className="user-name" onClick={toggleDropdownHidden}>
        {displayName}
      </div>
      {isDropdownHidden ? null : (
        <UserInfoDropdown
          toggleHidden={toggleDropdownHidden}
          userName={currentUser.displayName}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);
