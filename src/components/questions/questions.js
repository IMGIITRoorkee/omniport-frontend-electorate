import React, { Component } from "react";
import { groupBy } from "lodash";
import {
  Divider,
  Input,
  Button,
  Label,
  Dropdown,
  Form,
} from "semantic-ui-react";
import { connect } from "react-redux";

import QuestionCard from "./questionCard";
import PostQuestion from "./postQuestion";

import { getAllQuestions, setUser } from "../../actions";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";

import { element } from "prop-types";

class questions extends Component {
  componentDidMount() {
    this.props.GetAllQuestions();
    this.props.SetUser();
  }
  render() {
    var allQuestionsFiltered;
    const { allQuestions, whoAmI } = this.props;

    if (allQuestions) {
      allQuestionsFiltered = groupBy(allQuestions, "post");
    }
    return (
      <div styleName="styles.allquestions-container">
        <div styleName="styles.allquestions-questions-all">
          <h2>QUESTIONS AND ANSWERS</h2>
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
