import React from "react";
import { connect } from "react-redux";

import CircularLoader from "@material-ui/core/CircularProgress";
import { createStructuredSelector } from "reselect";
import useToggle from "../../hooks/useToggle";

import {
  selectCurrentUser,
  selectIsUserFetching,
} from "../../redux/user/user.selectors";
import UserInfoDropdown from "../user-info-dropdown/user-info-dropdown.component";
import "./header.styles.scss";

const Header = ({ currentUser, isUserFetching }) => {
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
    <div className="header">
      <div className="user-info" onClick={toggleDropdownHidden}>
        {isUserFetching ? (
          <CircularLoader className="loading-icon" color="inherit" />
        ) : (
          displayName
        )}
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
  isUserFetching: selectIsUserFetching,
});

export default connect(mapStateToProps)(Header);
