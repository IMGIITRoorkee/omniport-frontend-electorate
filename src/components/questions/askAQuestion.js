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
      formData.append("asker", "13");
      formData.append("question", this.state.quest);
      formData.append("candidate", this.props.candidateId);
      formData.append("post", "tech");
      // console.log(formData['candidate']);
      this.props.AskQuestion(formData);
      this.setState({
        quest: ""
      });
    }
  }
  render() {
    return (
      <div>
          <div styleName = "styles.heading">Question and Answer with {this.props.candidateName}</div>
          {/* <form>
            <div styleName = "styles.inputbox">
              <input
                name="quest"
                value={this.state.quest}
                onChange={this.handleChange}
                type="text"
                placeholder="Ask your question"
              />
            <input
            styleName = "styles.submit"
              type="submit"
              value = "Submit"
              position="right"
              content="Submit"
              onClick={this.handleSubmit}
            />
            </div>
          </form> */}
          <Form>
            <Form.Field>
              <Form.Input
                styleName="styles.inputbox"
                name="quest"
                value={this.state.quest}
                onChange={this.handleChange}
                type="text"
                rows="3"
                placeholder="Ask your question"
              />
            </Form.Field>
            <Button
              styleName="styles.submit"
              type="submit"
              position="right"
              primary
              content="Submit"
              onClick={this.handleSubmit}
            />
          </Form>
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
