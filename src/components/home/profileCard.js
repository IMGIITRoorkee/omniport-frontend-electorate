import React, { Component } from "react";
import { Card, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { getTheme, DefaultDP } from "formula_one";

import styles from "../../css/home/home.css";

class profileCard extends Component {
  render() {
    return (
      <div styleName="styles.profileCard-card-padding">
        <Card as={Segment} color={getTheme()} fluid>
          <div styleName="styles.profileCard-card-profile-photo-padding">
            {this.props.photo ? (
              <img
                src={this.props.photo}
                styleName="styles.profileCard-card-profile-photo"
              />
            ) : (
              <div styleName="styles.profileCard-card-profile-photo">
                <DefaultDP
                  gravatarHash={this.props.gravatarHash}
                  name={this.props.name}
                  size={"6em"}
                />
              </div>
            )}
          </div>

          <div styleName="styles.profileCard-card-candidate-name">
            {this.props.name}
          </div>
          <div styleName="styles.profileCard-card-candidate-info">
            <div>
              {this.props.degree} {this.props.branchName}
            </div>
            <div>{this.props.currentYear} Year</div>
          </div>

          <Card.Content
            extra
            textAlign="center"
            as={Link}
            to={`/electorate/profiles/${this.props.enrolmentNumber}`}
          >
            View Profile
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default profileCard;
