import React, { Component, Fragment } from "react";
import { Card, Segment, Image, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

import ProfileCard from "./profileCard";

import { setUser, getAllProfiles } from "../actions";

import blocks from "../css/app.css";

class allProfiles extends Component {
  componentDidMount() {
    this.props.SetUser();
    this.props.GetAllProfiles();
  }
  render() {
    const { allProfiles, postsOptions } = this.props;
    const post = [
      "G.S. Academics Affairs(UG)",
      "G.S. Technical Affairs",
      "G.S. Sports Affairs",
      "G.S. Hostel Affairs",
      "G.S. Cultural Council",
      "G.S. Academics Affairs(PG)"
    ];
    var allProfilesFiltered;
    if (allProfiles) {
      allProfilesFiltered = groupBy(allProfiles, "post");
    }
    return allProfiles ? (
      <div styleName="blocks.post-all">
        <h1>Insitute Candidates</h1>
        <Divider />
        {post.map(element => (
          <div styleName="blocks.post">
            <h2 styleName="blocks.post-header">{element}</h2>
            <Card.Group>
              {allProfilesFiltered[element] ? (
                allProfilesFiltered[element].map(profile => (
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
    allProfiles: state.allProfiles
  };
}

const mapDispatchToProps = dispatch => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetAllProfiles: () => {
      dispatch(getAllProfiles());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allProfiles);
