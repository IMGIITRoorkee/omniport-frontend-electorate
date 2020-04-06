import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";

import {
  setUser,
  getUnansweredQuestions,
  getCandidateDetails,
} from "../../actions";

import home from "../../css/home/home.css";
import styles from "../../css/answers/answers.css";
import styles2 from "../../css/candidate/candidate.css";
import { Breadcrumb, Segment, Menu, Divider, Modal } from "semantic-ui-react";
import { baseNavUrl } from "../../urls";

import AnswerCard from "./answerCard";

class answerQuestions extends Component {
  componentDidMount() {
    const cid = this.props.match.params.id;
    //console.log(cid);
    this.props.GetCandidateDetails(cid);
    this.props.GetUnansweredQuestions(cid);
    this.props.SetUser();
  }
  render() {
    console.log(this.props.unansweredQuestions);
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
       <div styleName = "home.mobiletext1"><a href = {baseNavUrl("")} style = {{ color : "white", fontSize : "1.2em"}}>INSTITUTE CANDIDATES</a></div>
       <div styleName ="home.mobiletext"><a href = {baseNavUrl("/questions")} style = {{ color : "black", fontSize : "1.2em"}}>QUESTION AND ANSWER</a></div>
       </div>
        <div styleName="styles.answerques-brdcrumb">
          <Breadcrumb size={"massive"}>
            <Breadcrumb.Section
              as={Link}
              to={baseNavUrl(`/profiles/${this.props.match.params.id}`)}
            >
              {" "}
              MY PROFILE{" "}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section>Answer Questions</Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
        </div>
        <div styleName = "styles.answercontainer">
        <div>
          <div>
            <div>
              <img
                src="https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/d8/5a/d85a3ec6-79c5-49ae-86e9-902c74546e69/batman-profile-293d6d-bm_cv17_ns-1-v1-600x600-marquee-thumb.jpg__600x600_q85_crop_subsampling-2_upscale.jpg"
                styleName="styles2.profileCard-card-profile-photo"
              />
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
          <div>
            <Modal trigger={<a styleName="styles2.resume">Electoral Resume</a>}>
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
              styleName="styles2.video"
              width="300"
              height="200"
              src={candidateDetails.video}
              controls
            />
          </div>
        </div>
        <div styleName = "styles.rightside">
          {unansweredQuestions.map((element) => (
            <AnswerCard
              qid={element.id}
              uid={whoAmI.id}
              lid={element.likedQuestionId}
              cid={element.candidate}
              question={element.question}
              asker={element.askerFullName}
              askedOn={element.answered}
              candidate={element.candidateFullName}
              likes={element.numberOfLikes}
              liked={element.didUserLike}
            />
          ))}
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
              width: "15%",
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
                fontSize: "1.3em",
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
