import React, { Component } from "react";
import { groupBy } from "lodash";
import {
  Divider,
  Input,
  Button,
  Label,
  Dropdown,
  Form,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";

import QuestionCard from "./questionCard";
import PostQuestion from "./postQuestion";

import { getAllQuestions, setUser, getPostOptions } from "../../actions";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";

import { element } from "prop-types";

class questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "all",
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  componentDidMount() {
    this.props.GetAllQuestions();
    this.props.SetUser();
    this.props.GetPostOptions();
  }
  handleDropdownChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  render() {
    const { allQuestions, whoAmI, getPostOptions } = this.props;
    var allQuestionsFiltered;
    if (allQuestions) {
      allQuestionsFiltered = groupBy(allQuestions, "post");
      Object.assign(allQuestionsFiltered, { all: allQuestions });
    }
    var dropDownPostOptions = getPostOptions.map(function (element) {
      return {
        key: getPostOptions.indexOf(element),
        text: element.displayName,
        value: element.value,
      };
    });
    return allQuestionsFiltered ? (
      <div styleName="styles.allquestions-container">
        <div styleName="styles.allquestions-questions-all">
          <h2>QUESTIONS AND ANSWERS</h2>
          <Divider />
          {/* <PostQuestion /> */}
          <Dropdown
            name="post"
            value={this.state.post}
            placeholder="Select a Post"
            options={dropDownPostOptions}
            onChange={this.handleDropdownChange}
            scrolling
            selection
          />
          {allQuestionsFiltered[this.state.post] ? (
            allQuestionsFiltered[this.state.post].map((element) => (
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
            ))
          ) : (
            <Segment>No questions yet!</Segment>
          )}
        </div>
      </div>
    ) : (
      "No Questions"
    );
  }
}

function mapStateToProps(state) {
  return {
    allQuestions: state.allQuestions,
    whoAmI: state.whoAmI,
    getPostOptions: state.getPostOptions,
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
    GetPostOptions: () => {
      dispatch(getPostOptions());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(questions);
