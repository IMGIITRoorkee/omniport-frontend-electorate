import React, { Component } from "react";
import { groupBy } from "lodash";
import {
  Divider,
  Input,
  Button,
  Label,
  Dropdown,
  Menu,
  Form
} from "semantic-ui-react";
import Scrollspy from 'react-scrollspy';
import { connect } from "react-redux";
import { baseNavUrl } from "../../urls";

import QuestionCard from "./questionCard";
import PostQuestion from "./postQuestion";

import { getAllQuestions, setUser } from "../../actions";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";
import home from "../../css/home/home.css"
import { element } from "prop-types";

class questions extends Component {
  componentDidMount() {
    this.props.GetAllQuestions();
    this.props.SetUser();
  }
  render() {
    console.log(this.props.allQuestions);
    const activeStyle = {
      fontSize : "1.2em",
      color : "#606060",
      paddingLeft : "10px",
      margin : "15px",
      padding : "2px"
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

    var allQuestionsFiltered;
    const { allQuestions, whoAmI } = this.props;

    if (allQuestions) {
      allQuestionsFiltered = groupBy(allQuestions, "post");
    }
    return (
      <div styleName="styles.allquestions-container">
      <div styleName="home.MobileNavbar">
       <div styleName = "home.mobiletext"><a href = {baseNavUrl("")} style = {{ color : "black", fontSize : "1.2em"}}>INSTITUTE CANDIDATES</a></div>
       <div styleName ="home.mobiletext1"><a href = {baseNavUrl("/questions")} style = {{ color : "white", fontSize : "1.2em"}}>QUESTION AND ANSWER</a></div>
       </div>
        <div styleName="styles.allquestions-questions-all">
          <h2>QUESTION AND ANSWER</h2>
          <Divider />
          {/* <PostQuestion /> */}
          {allQuestions.map((element) => (
            <QuestionCard
              qid={element.id}
              uid={whoAmI.id}
              lid={element.likedQuestionId}
              cid={element.candidate}
              question={element.question}
              asker={element.askerFullName}
              askedOn={element.answered}
              candidate={element.candidateFullName}
              answer={element.answer}
              likes={element.numberOfLikes}
              liked={element.didUserLike}
            />
          ))}
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
              width: "16%",
              backgroundColor: "#FFFFFF",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "1.5em",
                margin: "0px",
                marginTop: "4px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <a href={baseNavUrl("")} style={{ color: "#131313" }}>
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
                padding: "10px",
                color: "#131313",
                backgroundColor: "#356DBF",
              }}
            >
              <a href={baseNavUrl("/questions")} style={{ color: "white" }} >
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
    allQuestions: state.allQuestions,
    whoAmI: state.whoAmI,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllQuestions: () => {
      dispatch(getAllQuestions());
    },
    SetUser: () => {
      dispatch(setUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(questions);
