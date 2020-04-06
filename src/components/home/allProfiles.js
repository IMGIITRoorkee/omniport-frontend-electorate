import React, { Component, Fragment } from "react";
import { Card, Segment, Divider, Menu, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import ProfileCard from "./profileCard";
import Scrollspy from "react-scrollspy";
import { baseNavUrl } from "../../urls";

import { setUser, getAllProfiles, getPostOptions } from "../../actions";
// import "../../css/home.css";
// import blocks from "../../css/app.css";
import styles from "../../css/home/home.css";

class allProfiles extends Component {
  componentDidMount() {
    this.props.SetUser();
    this.props.GetAllProfiles();
    this.props.GetPostOptions();
  }
  render() {
    const { allProfiles, getPostOptions } = this.props;
    var allProfilesFiltered;
    const activeStyle = {
      fontSize: "1.2em",
      color: "#606060",
      paddingLeft: "10px",
      margin: "15px",
      padding: "2px",
    };
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: "0.2px",
        }}
      />
    );

    if (allProfiles) {
      allProfilesFiltered = groupBy(allProfiles, "post");
    }
    if (getPostOptions.length === 8) {
      getPostOptions.shift();
    }
    return allProfiles ? (
      <div styleName="styles.allProfiles-container">
        <div>
          <h1>INSTITUTE CANDIDATES</h1>
          <Divider />
          {getPostOptions.map((element) => (
            <div styleName="styles.allProfiles-post">
              <h2 styleName="styles.allProfiles-post-header" id={element.value}>
                {element.displayName}
              </h2>
              <Card.Group>
                {allProfilesFiltered[element.value] ? (
                  allProfilesFiltered[element.value].map((profile) => (
                    <ProfileCard
                      name={profile.fullName}
                      degree={profile.degree}
                      branchName={profile.branchName}
                      currentYear={profile.currentYear}
                      id={profile.id}
                    />
                  ))
                ) : (
                  <Segment>No Candidates Yet!</Segment>
                )}
              </Card.Group>
            </div>
          ))}
        </div>
        <Fragment>
          <Scrollspy
            items={[
              "acad_ug",
              "tech",
              "sport",
              "hostel",
              "cult",
              "prof",
              "acad_pg",
            ]}
            currentClassName="navbar"
            style={{
              position: "fixed ",
              top: "0",
              left: "0px",
              padding: "0px",
              margin: "0",
              width: "15%",
              backgroundColor: "#FFFFFF",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "1.5em",
                margin: "0px",
                marginTop: "4px",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#356DBF",
              }}
            >
              <a href={baseNavUrl("")} style={{ color: "white" }}>
                INSTITUTE CANDIDATES
              </a>
            </div>
            <a href={baseNavUrl("#acad_ug")}>
              {" "}
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Academic(UG) Affairs"
              />{" "}
            </a>
            <a href={baseNavUrl("#tech")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Technical Affairs"
              />{" "}
            </a>
            <a href={baseNavUrl("#sport")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Sports Affairs"
              />
            </a>
            <a href={baseNavUrl("#hostel")}>
              {" "}
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Hostel Affairs"
              />
            </a>
            <a href={baseNavUrl("#cult")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Cultural Affairs"
              />
            </a>
            <a href={baseNavUrl("#prof")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Professional Affairs"
              />
            </a>
            <a href={baseNavUrl("#acad_pg")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Academic(PG) Affairs"
              />
            </a>
            <ColoredLine color="#BEBEBE" />
            <div
              style={{
                fontSize: "1.5em",
                margin: "0px",
                marginTop: "4px",
                padding: "15px",
                color: "#131313",
              }}
            >
              <a href={baseNavUrl("/questions")} style={{ color: "#131313" }}>
                Question And Answer
              </a>
            </div>
          </Scrollspy>
        </Fragment>
      </div>
    ) : (
      "No Candidates"
    );
  }
}

function mapStateToProps(state) {
  return {
    whoAmI: state.whoAmI,
    allProfiles: state.allProfiles,
    getPostOptions: state.getPostOptions,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetAllProfiles: () => {
      dispatch(getAllProfiles());
    },
    GetPostOptions: () => {
      dispatch(getPostOptions());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allProfiles);
