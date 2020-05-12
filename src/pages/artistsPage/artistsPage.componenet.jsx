import React from "react";

import { auth } from "../../firebase/firebase.utils";
import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import "./artistsPage.styles.scss";

const ArtistsPage = () => (
  <div className="artists-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <h1>ARTISTS PAGE</h1>
    </div>
  </div>
);

export default ArtistsPage;
