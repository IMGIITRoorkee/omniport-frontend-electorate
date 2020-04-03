import React, { Component } from "react";
import { connect } from "react-redux";

import { getUnansweredQuestions, getCandidateDetails } from "../../actions";

import styles from "../../css/answers/answers.css";
import { Breadcrumb, Segment } from "semantic-ui-react";

import AnswerCard from "./answerCard";

class answerQuestions extends Component {
  componentDidMount() {
    const cid = this.props.match.params.id;
    //console.log(cid);
    this.props.GetCandidateDetails(cid);
    this.props.GetUnansweredQuestions(cid);
  }
  render() {
    console.log(this.props.unansweredQuestions);
    const { unansweredQuestions } = this.props;
    return (
      <div styleName="styles.answerQuestions-container">
        <div>
          <Breadcrumb size={"massive"}>
            <Breadcrumb.Section>My Profile</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Answer Questions</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          {unansweredQuestions.map(element => (
            <AnswerCard
              question={element.question}
              asker={element.askerFullName}
              askedOn={element.answered}
              likes={element.numberOfLikes}
              questionId={element.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    unansweredQuestions: state.unansweredQuestions,
    candidateDetails: state.candidateDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    GetUnansweredQuestions: id => {
      dispatch(getUnansweredQuestions(id));
    },
    GetCandidateDetails: id => {
      dispatch(getCandidateDetails(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(answerQuestions);
