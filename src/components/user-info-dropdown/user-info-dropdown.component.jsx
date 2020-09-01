import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signOutStart } from "../../redux/user/user.actions";

import "./user-info-dropdown.styles.scss";

const UserInfoDropdown = ({
  userName,
  toggleHidden,
  history,
  signOutStart,
}) => (
  <div className="user-info-dropdown">
    <h4 className="name">{userName}</h4>
    <span
      className="log-out-btn"
      onClick={() => {
        toggleHidden();
        signOutStart(history);
      }}
    >
      Log out
    </span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  signOutStart: (history) => dispatch(signOutStart(history)),
});

export default connect(null, mapDispatchToProps)(withRouter(UserInfoDropdown));
