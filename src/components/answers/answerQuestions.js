import React, { Component } from "react";
import { connect } from "react-redux";

import { getParticularQuestions, getCandidateDetails } from "../../actions";

import styles from "../../css/answers/answers.css";
import { Breadcrumb, Segment } from "semantic-ui-react";

import QuestionCard from "../questions/questionCard";

class answerQuestions extends Component {
  componentDidMount() {
    const cid = this.props.match.params.id;
    //console.log(cid);
    this.props.GetCandidateDetails(cid);
    this.props.GetParticularQuestions(cid);
  }
  render() {
    console.log(this.props);
    const { particularQuestions } = this.props;
    return (
      <div styleName="styles.answerQuestions-container">
        <div>
          <Breadcrumb size={"massive"}>
            <Breadcrumb.Section>My Profile</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Answer Questions</Breadcrumb.Section>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    particularQuestions: state.particularQuestions,
    candidateDetails: state.candidateDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    GetParticularQuestions: id => {
      dispatch(getParticularQuestions(id));
    },
    GetCandidateDetails: id => {
      dispatch(getCandidateDetails(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(answerQuestions);
