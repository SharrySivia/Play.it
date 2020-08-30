import React from "react";
import { NavLink } from "react-router-dom";

import UserInfo from "../user-info/user-info.component";

import "./navbar.styles.scss";

const Navbar = () => (
  <div className="navbar">
    <h1 className="logo">Play.it</h1>
    <div className="lists-container">
      <ul className="links-list">
        <NavLink
          exact
          to="/"
          className="list-item"
          activeClassName="link-active"
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/collections/tracks"
          className="list-item"
          activeClassName="link-active"
        >
          <li>Tracks</li>
        </NavLink>
        <NavLink
          to="/collections/playlists"
          className="list-item"
          activeClassName="link-active"
        >
          <li>Playlists</li>
        </NavLink>
      </ul>
      <UserInfo />
    </div>
  </div>
);

export default Navbar;
