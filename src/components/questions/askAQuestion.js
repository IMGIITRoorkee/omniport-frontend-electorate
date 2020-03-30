import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";

import { askQuestion } from "../../actions";

// import blocks from "../css/app.css";
import styles from "../../css/questions/questions.css";

class askAQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quest: ""
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
    if (this.state.quest && this.props.askerId && this.props.candidateId) {
      var formData = new FormData();
      formData.append("asker", "6");
      formData.append("question", this.state.quest);
      formData.append("candidate", this.props.candidateId);
      formData.append("post", "tech");
      this.props.AskQuestion(formData);
      this.setState({
        quest: ""
      });
    }
  }
  render() {
    return (
      <div>
        <Segment styleName="styles.question-segment">
          <h3>Question and Answer with {this.props.candidateName}</h3>
          <Form>
            <Form.Field>
              <Form.Input
                name="quest"
                value={this.state.quest}
                onChange={this.handleChange}
                type="text"
                rows="3"
                placeholder="Ask your question"
              />
            </Form.Field>
            <Button
              type="submit"
              position="right"
              primary
              icon="send"
              content="Submit"
              onClick={this.handleSubmit}
            />
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AskQuestion: data => {
      dispatch(askQuestion(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(askAQuestion);
