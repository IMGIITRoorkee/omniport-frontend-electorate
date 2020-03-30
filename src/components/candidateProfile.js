import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setUser, getCandidateDetails } from "../actions";
import { getTheme } from "formula_one";

import CustomBreadcrumb from "core/common/src/components/custom-breadcrumb";
import {
  Segment,
  Container,
  Breadcrumb,
  Divider,
  Modal,
  Button,
  Grid,
  Card,
  Image,
  Icon
} from "semantic-ui-react";

import blocks from "../css/app.css";

import AskAQuestion from "./askAQuestion";

class candidateProfile extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.SetUser();
    this.props.GetCandidateDetails(id);
  }
  render() {
    console.log(this.props.candidateDetails);
    console.log(this.props.whoAmI.roles);
    const { candidateDetails, whoAmI } = this.props;
    return !candidateDetails.isEmpty ? (
      <div styleName="blocks.candidate-profile">
        <div>
          <Breadcrumb size={"massive"}>
            <Breadcrumb.Section>Institute Candidates</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section>{candidateDetails.post}</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            {candidateDetails.isCandidate ? (
              <Breadcrumb.Section active>{"My Profile"}</Breadcrumb.Section>
            ) : (
              <Breadcrumb.Section active>
                {candidateDetails.fullName}
              </Breadcrumb.Section>
            )}
          </Breadcrumb>
        </div>
        <Divider />
        <div>
          <div>
            <div>
              <img
                src="https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/d8/5a/d85a3ec6-79c5-49ae-86e9-902c74546e69/batman-profile-293d6d-bm_cv17_ns-1-v1-600x600-marquee-thumb.jpg__600x600_q85_crop_subsampling-2_upscale.jpg"
                styleName="blocks.card-profile-photo"
              />
            </div>
            <div>{candidateDetails.fullName}</div>
            <div>
              {candidateDetails.degree} {candidateDetails.branchName}
            </div>
            <div>{candidateDetails.currentYear} Year</div>
            <div>{candidateDetails.emailAddress}</div>
            <div>Standing for {candidateDetails.post}</div>
          </div>
          <div>
            <Modal trigger={<Button color="blue">Electoral Resume</Button>}>
              <Modal.Header>
                Electoral Resume of {candidateDetails.fullName}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <iframe
                    src={candidateDetails.resume}
                    width="800"
                    height="800"
                  ></iframe>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          <div>
            <video
              width="345"
              height="200"
              src={candidateDetails.video}
              controls
            />
          </div>
        </div>
        <div>
          <h3>Manifesto</h3>
          <iframe
            src={candidateDetails.manifesto}
            width="500"
            height="500"
          ></iframe>
        </div>
        {candidateDetails.isCandidate ? (
          <Button
            as={Link}
            to={`/electorate2/profiles/${candidateDetails.id}/answer`}
            id={candidateDetails.id}
          >
            Answer Questions
          </Button>
        ) : null}
        <div>
          <AskAQuestion
            candidateName={candidateDetails.fullName}
            askerId={this.props.whoAmI.id}
            candidateId={candidateDetails.id}
          />
        </div>
      </div>
    ) : (
      "No Details"
    );
  }
}

function mapStateToProps(state) {
  return {
    whoAmI: state.whoAmI,
    candidateDetails: state.candidateDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetCandidateDetails: id => {
      dispatch(getCandidateDetails(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(candidateProfile);
