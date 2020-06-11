import React from "react";
import { NavLink } from "react-router-dom";

import "./sidebar.styles.scss";

const Sidebar = () => (
  <div className="sidebar">
    <h1 className="logo">Play.it</h1>
    <ul className="links-list">
      <NavLink exact to="/" className="list-item" activeClassName="link-active">
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/collections/songs"
        className="list-item"
        activeClassName="link-active"
      >
        <li>Songs</li>
      </NavLink>
      <NavLink
        to="/collections/playlists"
        className="list-item"
        activeClassName="link-active"
      >
        <li>Playlists</li>
      </NavLink>
      <NavLink
        to="/collections/artists"
        className="list-item"
        activeClassName="link-active"
      >
        <li>Artists</li>
      </NavLink>
      <NavLink
        to="/collections/albums"
        className="list-item"
        activeClassName="link-active"
      >
        <li>Albums</li>
      </NavLink>
    </ul>
  </div>
);

export default Sidebar;
