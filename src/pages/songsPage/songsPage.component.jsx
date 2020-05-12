import React from "react";

import { auth } from "../../firebase/firebase.utils";
import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import "./songsPage.styles.scss";

const SongsPage = () => (
  <div className="songs-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <h1>SONGS PAGE</h1>
    </div>
  </div>
);

export default SongsPage;
