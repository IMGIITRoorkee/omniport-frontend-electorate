import React, { Component, Fragment } from "react";
import { Menu, Container } from "semantic-ui-react";
import Scrollspy from 'react-scrollspy';

import { baseNavUrl } from "../urls";

// import blocks from "../css/app.css";
import styles from "../css/home/home.css";
// import { NavLink as Link } from "react-router-dom";

class navMenu extends Component {
  render() {
    return (
      <div styleName="styles.MobileNavbar">
      <div styleName = "styles.mobiletext"><a href = {baseNavUrl("")}>INSTITUTE CANDIDATES</a></div>
      <div styleName ="styles.mobiletext"><a href = {baseNavUrl("/questions")}>QUESTION AND ANSWER</a></div>
      </div>
    );
  }
}

export default navMenu;
