import React from "react";

import FormInput from "../form-input/form-input.component";
import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <FormInput
      type="text"
      name="search"
      placeholder="Search for songs, artists etc..."
      isSearchInput
    />
    <div className="user-info">SH</div>
  </div>
);

export default Header;
