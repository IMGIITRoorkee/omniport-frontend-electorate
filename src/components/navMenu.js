import React, { Component, Fragment } from "react";
import { Menu, Container } from "semantic-ui-react";
import Scrollspy from 'react-scrollspy';

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
              to={baseNavUrl("/#tech")}
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
          <Menu.Header as={Link} to={baseNavUrl("/questions")}>
            QUESTION AND ANSWER
          </Menu.Header>
        </Menu.Item>
        {/* <Scrollspy
                items={["acad_ug", "tech", "sport","hostel","cult","prof","acad_pg"]}
                currentClassName="is-current"
                style={{ position: "fixed ", top: "0", backgroundColor: "#fff" }}
              >
            <Menu.Header>INSTITUTE CANDIDATES</Menu.Header>
                <li><a href="#acad_ug"> acads </a></li>
                <li><a href="#tech"> tech </a></li>
                <li><a href="#sport"> sport </a></li>
                <li><a> cult </a></li>
                <li><a> prof </a></li>
                <li><a> acad_pg </a></li>
                </Scrollspy>
 */}
      </Fragment>
    
    );
  }
}

export default navMenu;
