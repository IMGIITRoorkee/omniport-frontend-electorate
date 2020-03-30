import React, { Component } from "react";
import {
  Divider,
  Input,
  Button,
  Label,
  Dropdown,
  Form
} from "semantic-ui-react";
import { connect } from "react-redux";

import QuestionCard from "./questionCard";
import PostQuestion from "./postQuestion";

import { getAllQuestions } from "../actions";

import blocks from "../css/app.css";
import { element } from "prop-types";

class questions extends Component {
  componentDidMount() {
    this.props.GetAllQuestions();
  }
  render() {
    const { allQuestions } = this.props;
    console.log(this.props.allQuestions);
    return (
      <div styleName="blocks.allquestions-container">
        <div styleName="blocks.questions-all">
          <h2>QUESTIONS AND ANSWERS</h2>
          <Divider />
          {/* <PostQuestion /> */}
          {allQuestions.map(element => (
            <QuestionCard
              question={element.question}
              asker={element.askerFullName}
              candidate={element.candidateFullName}
              answer={element.answer}
              likes={element.numberOfLikes}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allQuestions: state.allQuestions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    GetAllQuestions: () => {
      dispatch(getAllQuestions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(questions);
