import React from "react";

import { auth } from "../../firebase/firebase.utils";
import "./user-info-dropdown.styles.scss";

const UserInfoDropdown = ({ userName }) => (
  <div className="user-info-dropdown">
    <h4 className="user-name">{userName}</h4>
    <span className="log-out-btn" onClick={() => auth.signOut()}>
      Log out
    </span>
  </div>
);

export default UserInfoDropdown;
