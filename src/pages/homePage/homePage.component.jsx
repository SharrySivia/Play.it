import React from "react";

import { auth } from "../../firebase/firebase.utils";
import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import "./homePage.styles.scss";

const HomePage = () => (
  <div className="home-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <h1>HOME PAGE</h1>
    </div>
  </div>
);

export default HomePage;
