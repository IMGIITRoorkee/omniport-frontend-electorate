import React, { Component, Fragment } from "react";
import { Card, Segment, Image, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

import ProfileCard from "./profileCard";

import { setUser, getAllProfiles, getPostOptions } from "../actions";

import blocks from "../css/app.css";

class allProfiles extends Component {
  componentDidMount() {
    this.props.SetUser();
    this.props.GetAllProfiles();
    this.props.GetPostOptions();
  }
  render() {
    const { allProfiles, getPostOptions } = this.props;
    var allProfilesFiltered;
    if (allProfiles) {
      allProfilesFiltered = groupBy(allProfiles, "post");
    }
    return allProfiles ? (
      <div styleName="blocks.post-all">
        <h1>Insitute Candidates</h1>
        <Divider />
        {getPostOptions.map(element => (
          <div styleName="blocks.post">
            <h2 styleName="blocks.post-header">{element.value}</h2>
            <Card.Group>
              {allProfilesFiltered[element.value] ? (
                allProfilesFiltered[element.value].map(profile => (
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
    ) : (
      "No Candidates"
    );
  }
}

function mapStateToProps(state) {
  return {
    whoAmI: state.whoAmI,
    allProfiles: state.allProfiles,
    getPostOptions: state.getPostOptions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetAllProfiles: () => {
      dispatch(getAllProfiles());
    },
    GetPostOptions: () => {
      dispatch(getPostOptions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allProfiles);
