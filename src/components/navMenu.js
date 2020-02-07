import React, { Component, Fragment } from "react";
import { Menu, Container } from "semantic-ui-react";

import { baseNavUrl } from "../urls";

import blocks from "../css/app.css";
import { NavLink as Link } from "react-router-dom";

class navMenu extends Component {
  render() {
    const activeStyle = {
      backgroundColor: "#f2f4f7",
      borderRight: "4px #72a1ff solid",
      color: "#72a1ff"
    };
    return (
      <Fragment>
        <Menu.Item>
          <Menu.Header>INSTITUTE CANDIDATES</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="GS Academic(UG) Affairs"
              activeStyle={activeStyle}
              replace
              as={Link}
              to={baseNavUrl("")}
            />
            <Menu.Item
              name="GS Technical Affairs"
              replace
              as={Link}
              to={baseNavUrl("/temp")}
            />
            <Menu.Item name="GS Sports Affairs" />
            <Menu.Item name="GS Hostel Affairs" />
            <Menu.Item name="GS Cultural Affairs" />
            <Menu.Item name="GS Professional Affairs" />
            <Menu.Item name="GS Academic(PG) Affairs" />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>QUESTION AND ANSWER</Menu.Header>
        </Menu.Item>
      </Fragment>
    );
  }
}

export default navMenu;
