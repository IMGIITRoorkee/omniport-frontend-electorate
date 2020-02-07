import React, { Component, Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import blocks from "../css/app.css";

class profileCard extends Component {
  render() {
    return (
      <Fragment>
        <Card>
          <img
            src="https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/d8/5a/d85a3ec6-79c5-49ae-86e9-902c74546e69/batman-profile-293d6d-bm_cv17_ns-1-v1-600x600-marquee-thumb.jpg__600x600_q85_crop_subsampling-2_upscale.jpg"
            styleName="blocks.profile-photo"
          />
          <Card.Content>
            <Card.Header textAlign="center">{this.props.name}</Card.Header>
            <Card.Meta textAlign="center">
              <span>
                {this.props.degree} {this.props.branchName}
              </span>
            </Card.Meta>
            <Card.Meta textAlign="center">
              {this.props.currentYear} Year
            </Card.Meta>
          </Card.Content>
          <Card.Content
            extra
            textAlign="center"
            as={Link}
            to={`/electorate2/profiles/${this.props.id}`}
          >
            View Profile
          </Card.Content>
        </Card>
      </Fragment>
    );
  }
}

export default profileCard;
