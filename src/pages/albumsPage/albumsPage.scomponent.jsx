import React from "react";

import { auth } from "../../firebase/firebase.utils";
import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import "./albumsPage.styles.scss";

const AlbumsPage = () => (
  <div className="albums-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <h1>ALBUMS PAGE</h1>
    </div>
  </div>
);

export default AlbumsPage;
