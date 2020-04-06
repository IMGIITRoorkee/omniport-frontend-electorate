import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { baseNavUrl } from "../../urls";
import {
  setUser,
  getCandidateDetails,
  getParticularQuestions,
} from "../../actions";

import { getTheme } from "formula_one";

import CustomBreadcrumb from "core/common/src/components/custom-breadcrumb";
import {
  Segment,
  Container,
  Menu,
  Breadcrumb,
  Divider,
  Modal,
  Button,
  Grid,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";

import blocks from "../../css/app.css";
import styles from "../../css/candidate/candidate.css";
import home from "../../css/home/home.css";

import AskAQuestion from "../questions/askAQuestion";
import QuestionCard from "../questions/questionCard";
import { element } from "prop-types";

class candidateProfile extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.SetUser();
    this.props.GetCandidateDetails(id);
    this.props.GetParticularQuestions(id);
  }

  render() {
    const { candidateDetails, whoAmI, particularQuestions } = this.props;

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

    return !candidateDetails.isEmpty ? (
      <div styleName = "home.allcontainer">
      <div styleName="home.MobileNavbar">
       <div styleName = "home.mobiletext1"><a href = {baseNavUrl("")} style = {{ color : "white", fontSize : "1.2em"}}>INSTITUTE CANDIDATES</a></div>
       <div styleName ="home.mobiletext"><a href = {baseNavUrl("/questions")} style = {{ color : "black", fontSize : "1.2em"}}>QUESTION AND ANSWER</a></div>
       </div>
 
      <div styleName="styles.candidate-profile">
        <div>
          <Breadcrumb size={"massive"}>
            <Breadcrumb.Section as={Link} to={baseNavUrl("/")}>
              INSTITUTE CANDIDATES
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section>
              {candidateDetails.postFullname}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            {candidateDetails.isCandidate ? (
              <Breadcrumb.Section>{"My Profile"}</Breadcrumb.Section>
            ) : (
              <Breadcrumb.Section>
                {candidateDetails.fullName}
              </Breadcrumb.Section>
            )}
          </Breadcrumb>
        </div>
        <Divider />
        <div styleName="styles.container">
          <div>
            <div>
              <div>
                <img
                  src="https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/d8/5a/d85a3ec6-79c5-49ae-86e9-902c74546e69/batman-profile-293d6d-bm_cv17_ns-1-v1-600x600-marquee-thumb.jpg__600x600_q85_crop_subsampling-2_upscale.jpg"
                  styleName="styles.profileCard-card-profile-photo"
                />
              </div>
              <div styleName="styles.heading">{candidateDetails.fullName}</div>
              <div styleName="styles.headingdetailstwo">
                {candidateDetails.degree} {candidateDetails.branchName}
              </div>
              <div styleName="styles.headingdetailstwo">
                {candidateDetails.currentYear} Year
              </div>
              <div styleName="styles.headingdetails">
                {candidateDetails.emailAddress}
              </div>
              <div styleName="styles.headingdetailsthree">Standing for</div>
              <div styleName="styles.headingdetailslink">
                {" "}
                {candidateDetails.postFullname}{" "}
              </div>
            </div>
            <div>
              <Modal
                trigger={<a styleName="styles.resume">Electoral Resume</a>}
              >
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
                styleName="styles.video"
                width="300"
                height="200"
                src={candidateDetails.video}
                controls
              />
            </div>
          </div>
          <div styleName="styles.rightside">
            <div styleName = "styles.manifesto">
              <div styleName="styles.headingmanifesto">Manifesto</div>
              <iframe
                src={candidateDetails.manifesto}
                width="800"
                height="480"
              ></iframe>
            </div>
            <div styleName = "styles.mobile-manifesto">
              <Modal
                trigger={<a styleName="styles.resume">Manifesto</a>}
              >
                <Modal.Header>
                  Electoral Manifesto of {candidateDetails.fullName}
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <iframe
                      src={candidateDetails.resume}
                      width="800"
                      height="480"
                    ></iframe>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>

            {candidateDetails.isCandidate ? (
              <div styleName="styles.answer">
                <div styleName="styles.heading">
                  Question and Answer with {candidateDetails.fullName}
                </div>
                <a
                  styleName="styles.answer-question"
                  href={baseNavUrl(`/profiles/${candidateDetails.id}/answer`)}
                >
                  Answer Questions
                </a>
              </div>
            ) : (
              <div>
                <AskAQuestion
                  candidateName={candidateDetails.fullName}
                  askerId={whoAmI.id}
                  candidateId={candidateDetails.id}
                />
              </div>
            )}
            <div>
              {particularQuestions.map((element) => (
                <QuestionCard
                  qid={element.id}
                  uid={whoAmI.id}
                  lid={element.likedQuestionId}
                  cid={element.candidate}
                  question={element.question}
                  asker={element.askerFullName}
                  candidate={element.candidateFullName}
                  answer={element.answer}
                  likes={element.numberOfLikes}
                  liked={element.didUserLike}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div styleName = "home.Navbar">
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
              width: "15.5%",
              backgroundColor: "#FFFFFF",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "1.4em",
                margin: "0px",
                marginTop: "4px",
                padding: "12px",
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
                fontSize: "1.4em",
                margin: "0px",
                marginTop: "4px",
                padding: "12px",
                color: "#131313",
              }}
            >
              <a href={baseNavUrl("/questions")} style={{ color: "#131313" }}>
                QUESTION AND ANSWER
              </a>
            </div>
          </Scrollspy>
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
    candidateDetails: state.candidateDetails,
    particularQuestions: state.particularQuestions,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetCandidateDetails: (id) => {
      dispatch(getCandidateDetails(id));
    },
    GetParticularQuestions: (id) => {
      dispatch(getParticularQuestions(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(candidateProfile);
