import React from "react";

import { auth } from "../../firebase/firebase.utils";
import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import "./playlistsPage.styles.scss";

const PlaylistsPage = () => (
  <div className="playlists-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <h1>PLAYLISTS PAGE</h1>
    </div>
  </div>
);

export default PlaylistsPage;
