import React, { Component } from "react";
import { Card, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { getTheme } from "formula_one";

// import blocks from "../../css/app.css";
import styles from "../../css/home/home.css";

class profileCard extends Component {
  render() {
    return (
      <div styleName="styles.profileCard-card-padding">
        <Card as={Segment} color={getTheme()} fluid>
          <div styleName="styles.profileCard-card-profile-photo-padding">
            <img
              src="https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/d8/5a/d85a3ec6-79c5-49ae-86e9-902c74546e69/batman-profile-293d6d-bm_cv17_ns-1-v1-600x600-marquee-thumb.jpg__600x600_q85_crop_subsampling-2_upscale.jpg"
              styleName="styles.profileCard-card-profile-photo"
            />
          </div>

          <div styleName="styles.profileCard-card-candidate-name">
            {this.props.name}
          </div>
          <div styleName="styles.profileCard-card-candidate-info">
            {this.props.degree} {this.props.branchName}
          </div>
          <div styleName="styles.profileCard-card-candidate-info">
            {this.props.currentYear} Year
          </div>
          <Card.Content
            extra
            textAlign="center"
            as={Link}
            to={`/electorate2/profiles/${this.props.id}`}
          >
            View Profile
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default profileCard;
