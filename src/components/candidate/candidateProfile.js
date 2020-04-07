import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Menu,
  Breadcrumb,
  Divider,
  Modal,
  Button,
  Loader,
  Placeholder,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { DefaultDP } from "formula_one";

import { baseNavUrl } from "../../urls";

import {
  setUser,
  getCandidateDetails,
  getParticularQuestions,
  getUnansweredQuestions,
} from "../../actions";

import AskAQuestion from "../questions/askAQuestion";
import QuestionCard from "../questions/questionCard";

import blocks from "../../css/app.css";
import styles from "../../css/candidate/candidate.css";
import home from "../../css/home/home.css";
import { element } from "prop-types";

class candidateProfile extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.SetUser();
    this.props.GetCandidateDetails(id);
    this.props.GetParticularQuestions(id);
    this.props.GetUnansweredQuestions(id);
  }
  render() {
    console.log(`${this.props.candidateDetails.manifesto}#toolbar=0`);
    const {
      candidateDetails,
      whoAmI,
      particularQuestions,
      unansweredQuestions,
    } = this.props;
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
      <div styleName="home.allcontainer">
        <div styleName="home.MobileNavbar">
          <Link
            styleName="home.mobiletext1"
            to={baseNavUrl("")}
            style={{ color: "white" }}
          >
            INSTITUTE CANDIDATES
          </Link>
          <Link
            styleName="home.mobiletext"
            to={baseNavUrl("/questions")}
            style={{ color: "black" }}
          >
            QUESTION AND ANSWER
          </Link>
        </div>

        <div styleName="styles.candidate-profile">
          <div>
            <Breadcrumb size={"massive"}>
              <Breadcrumb.Section as={Link} to={baseNavUrl("/")}>
                INSTITUTE CANDIDATES
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section
                as={Link}
                to={baseNavUrl(`#${candidateDetails.post}`)}
              >
                {candidateDetails.postFullname}
              </Breadcrumb.Section>
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
          <div styleName="styles.container">
            <div>
              <div>
                <div>
                  {candidateDetails.loading ? (
                    <Placeholder style={{ height: 160, width: 160 }}>
                      <Placeholder.Image />
                    </Placeholder>
                  ) : candidateDetails.displayPicture ? (
                    <img
                      src={candidateDetails.displayPicture}
                      styleName="home.profileCard-card-profile-photo-candidate-page"
                    />
                  ) : candidateDetails.fullName ? (
                    <div styleName="home.profileCard-card-profile-photo-candidate-page">
                      <DefaultDP
                        gravatarHash={candidateDetails.gravatarHash}
                        name={candidateDetails.fullName}
                        size={"5em"}
                      />
                    </div>
                  ) : null}
                </div>
                <div styleName="styles.heading">
                  {candidateDetails.fullName}
                </div>
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
                  trigger={
                    <Button styleName="styles.resume">Electoral Resume</Button>
                  }
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
              <div styleName="styles.manifesto">
                <div styleName="styles.headingmanifesto">Manifesto</div>
                <iframe
                  src={`${candidateDetails.manifesto}#toolbar=0`}
                  width="800"
                  height="480"
                ></iframe>
              </div>
              <div styleName="styles.mobile-manifesto">
                <Modal trigger={<a styleName="styles.resume">Manifesto</a>}>
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
                  <div styleName="styles.questionHeading">
                    Question and Answer with {candidateDetails.fullName}
                  </div>
                  {unansweredQuestions.length > 0 ? (
                    <Button
                      styleName="styles.answerButton"
                      as={Link}
                      to={baseNavUrl(`/profiles/${candidateDetails.id}/answer`)}
                    >
                      Answer Questions
                    </Button>
                  ) : (
                    void 0
                  )}
                </div>
              ) : (
                <div>
                  <AskAQuestion
                    candidate={candidateDetails.fullName}
                    askerId={whoAmI.id}
                    cid={candidateDetails.id}
                    post={candidateDetails.post}
                  />
                </div>
              )}
              <div>
                {particularQuestions.length > 0 ? (
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
                ) : (
                  <Segment>No questions yet!</Segment>
                )}
              </div>
            </div>
          </div>
        </div>
        <div styleName="home.Navbar">
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
              <Link to={baseNavUrl("")} style={{ color: "white" }}>
                INSTITUTE CANDIDATES
              </Link>
            </div>
            <Link to={baseNavUrl("#acad_ug")}>
              {" "}
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Academic(UG) Affairs"
              />{" "}
            </Link>
            <Link to={baseNavUrl("#tech")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Technical Affairs"
              />{" "}
            </Link>
            <Link to={baseNavUrl("#sport")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Sports Affairs"
              />
            </Link>
            <Link to={baseNavUrl("#hostel")}>
              {" "}
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Hostel Affairs"
              />
            </Link>
            <Link to={baseNavUrl("#cult")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Cultural Affairs"
              />
            </Link>
            <Link to={baseNavUrl("#prof")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Professional Affairs"
              />
            </Link>
            <Link to={baseNavUrl("#acad_pg")}>
              <Menu.Item
                styleName="styles.Link"
                style={activeStyle}
                name="GS Academic(PG) Affairs"
              />
            </Link>
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
              <Link to={baseNavUrl("/questions")} style={{ color: "#131313" }}>
                QUESTION AND ANSWER
              </Link>
            </div>
          </Scrollspy>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

function mapStateToProps(state) {
  return {
    whoAmI: state.whoAmI,
    candidateDetails: state.candidateDetails,
    particularQuestions: state.particularQuestions,
    unansweredQuestions: state.unansweredQuestions,
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
    GetUnansweredQuestions: (id) => {
      dispatch(getUnansweredQuestions(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(candidateProfile);
