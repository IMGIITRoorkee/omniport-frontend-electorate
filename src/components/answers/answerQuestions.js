import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import {
  Breadcrumb,
  Segment,
  Menu,
  Divider,
  Modal,
  Button,
  Placeholder,
} from "semantic-ui-react";
import { DefaultDP } from "formula_one";

import { baseNavUrl } from "../../urls";

import {
  setUser,
  getUnansweredQuestions,
  getCandidateDetails,
} from "../../actions";

import AnswerCard from "./answerCard";
import AnswerPagination from "./answerPagination";

import home from "../../css/home/home.css";
import styles from "../../css/answers/answers.css";
import styles2 from "../../css/candidate/candidate.css";

class answerQuestions extends Component {
  componentDidMount() {
    const cid = this.props.match.params.id;
    this.props.GetCandidateDetails(cid);
    this.props.GetUnansweredQuestions(cid);
    this.props.SetUser();
  }
  render() {
    const { unansweredQuestions, candidateDetails, whoAmI } = this.props;
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
    return (
      <div styleName="styles.answerQuestions-container">
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
        <div styleName="styles.answerques-brdcrumb">
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
            <Breadcrumb.Section
              as={Link}
              to={baseNavUrl(`/profiles/${this.props.match.params.id}`)}
            >
              {" "}
              My Profile{" "}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Answer</Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
        </div>
        <div styleName="styles.answercontainer">
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
              <div styleName="styles2.heading">{candidateDetails.fullName}</div>
              <div styleName="styles2.headingdetailstwo">
                {candidateDetails.degree} {candidateDetails.branchName}
              </div>
              <div styleName="styles2.headingdetailstwo">
                {candidateDetails.currentYear} Year
              </div>
              <div styleName="styles2.headingdetails">
                {candidateDetails.emailAddress}
              </div>
              <div styleName="styles2.headingdetailsthree">Standing for</div>
              <div styleName="styles2.headingdetailslink">
                {" "}
                {candidateDetails.postFullname}{" "}
              </div>
            </div>
            <div styleName="styles2.web-resume">
              <Modal
                trigger={
                  <Button styleName="styles2.resume">Electoral Resume</Button>
                }
                closeIcon
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
            <div styleName="styles2.mobile-resume">
              <Modal
                trigger={
                  <Button styleName="styles2.resume">Electoral Resume</Button>
                }
                closeIcon
              >
                <Modal.Header>
                  Electoral Resume of {candidateDetails.fullName}
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <iframe
                      src={candidateDetails.resume}
                      width="320"
                      height="400"
                    ></iframe>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
            <div>
              <video
                styleName="styles2.video"
                width="300"
                height="200"
                src={candidateDetails.video}
                controls
              />
            </div>
          </div>
          <div styleName="styles.rightside">
            {unansweredQuestions.results ? (
              <div styleName="styles.answer-questions-all">
                {unansweredQuestions.results.length > 0 ? (
                  <div>
                    {unansweredQuestions.results.map((element) => (
                      <AnswerCard
                        qid={element.id}
                        uid={whoAmI.id}
                        lid={element.likedQuestionId}
                        cid={element.enrolmentNumber}
                        question={element.question}
                        asker={element.askerFullName}
                        askedOn={element.answered}
                        candidate={element.candidateFullName}
                        likes={element.numberOfLikes}
                        liked={element.didUserLike}
                      />
                    ))}
                    <AnswerPagination cid={this.props.match.params.id} />
                  </div>
                ) : (
                  <Segment>You have answered all the the questions!</Segment>
                )}
              </div>
            ) : (
              void 0
            )}
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
              <Link to={baseNavUrl("/questions")} style={{ color: "#131313" }}>
                QUESTION AND ANSWER
              </Link>
            </div>
          </Scrollspy>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    unansweredQuestions: state.unansweredQuestions,
    candidateDetails: state.candidateDetails,
    whoAmI: state.whoAmI,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetUnansweredQuestions: (id) => {
      dispatch(getUnansweredQuestions(id));
    },
    GetCandidateDetails: (id) => {
      dispatch(getCandidateDetails(id));
    },
    SetUser: () => {
      dispatch(setUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(answerQuestions);
