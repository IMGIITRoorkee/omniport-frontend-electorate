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
      quest: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit() {
    if (this.state.quest && this.props.askerId && this.props.cid) {
      var formData = new FormData();
      formData.append("asker", this.props.askerId);
      formData.append("question", this.state.quest);
      formData.append("candidate", this.props.cid);
      formData.append("post", this.props.post);
      this.props.AskQuestion(formData, this.props.cid);
      this.setState({
        quest: "",
      });
    }
  }
  render() {
    return (
      <div>
        <div styleName="styles.heading">
          Question and Answer with {this.props.candidate}
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    AskQuestion: (data, cid) => {
      dispatch(askQuestion(data, cid));
    },
  };
};

export default connect(null, mapDispatchToProps)(askAQuestion);
