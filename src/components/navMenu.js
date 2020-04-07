import React, { Component, Fragment } from "react";

import { baseNavUrl } from "../urls";

import styles from "../css/home/home.css";

class navMenu extends Component {
  render() {
    return (
      <div styleName="styles.MobileNavbar">
        <div styleName="styles.mobiletext">
          <a href={baseNavUrl("")}>INSTITUTE CANDIDATES</a>
        </div>
        <div styleName="styles.mobiletext">
          <a href={baseNavUrl("/questions")}>QUESTION AND ANSWER</a>
        </div>
      </div>
    );
  }
}

export default navMenu;
