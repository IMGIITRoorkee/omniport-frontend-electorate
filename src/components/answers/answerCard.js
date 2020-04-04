import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Icon } from "semantic-ui-react";

import { answerQuestion } from "../../actions";

import styles from "../../css/questions/questions.css";
import style from "../../css/answers/answers.css";

class answerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }
  handleSubmit() {
    if (this.state.answer && this.props.askerId) {
      var formData = new FormData();
      formData.append("answer", this.state.answer);
      this.props.AnswerQuestion(this.props.questionId, formData);
      this.setState({
        answer: ""
      });
    }
  }
  render() {
    return (
      <div>
        {/* Add Answer form here */}
        <div styleName = "style.question-card-container">
        <Segment>
          <div styleName="styles.question-card-question">
            <label>
              <b>Q. </b>
            </label>
            {this.props.question}
          </div>
          <div styleName="styles.question-card-meta-header">
            <span styleName="styles.question-card-meta">
              {this.props.asker} asked on {this.props.askedOn} | |{" "}
              <label styleName = "style.answer-card-unanswered">UNANSWERED</label>
            </span>
          </div>
          <div>
            <Form>
              <div styleName="style.inputbox">
                <Form.Input
                  styleName="style.inputtext"
                  name="answer"
                  value={this.state.answer}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Type your answer"
                />
                <Button
                  styleName = "style.inputsubmit"
                  type="submit"
                  value="Submit"
                  onSubmit={this.handleSubmit}
                > Submit
                  </Button>
              </div>
              <div styleName="style.question-card-button">
          <span styleName="style.question-card-meta-like">
             <Icon name = "thumbs up" /> {this.props.likes} likes  
            </span>
          </div>
            </Form>
          </div>
        </Segment>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AnswerQuestion: (id, data) => {
      dispatch(answerQuestion(id, data));
    }
  };
};

export default connect(null, mapDispatchToProps)(answerCard);
