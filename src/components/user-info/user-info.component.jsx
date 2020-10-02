import React from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
      <TransitionGroup>
        {isDropdownHidden ? null : (
          <CSSTransition classNames='scale' timeout={300}>
            <UserInfoDropdown
              toggleHidden={toggleDropdownHidden}
              userName={currentUser.displayName}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);
