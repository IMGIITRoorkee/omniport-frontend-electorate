import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Portal } from "semantic-ui-react";

import { askQuestion, changePage } from "../../actions";

import styles from "../../css/questions/questions.css";

class askAQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quest: "",
      open: false,
      firstclickdone: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose = () => this.setState({ open: false });
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit() {
    if (this.state.firstclickdone == false) {
      this.setState({
        open: true,
        firstclickdone: true,
      });
    }
    if (
      this.state.quest &&
      this.props.askerId &&
      this.props.cid &&
      this.state.firstclickdone
    ) {
      var formData = new FormData();
      formData.append("asker", this.props.askerId);
      formData.append("question", this.state.quest);
      formData.append("candidate", this.props.cid);
      formData.append("post", this.props.post);
      this.props.AskQuestion(
        formData,
        this.props.cid,
        this.props.page["index"]
      );
      this.setState({
        quest: "",
      });
    }
  }
  render() {
    const { open } = this.state.open;
    return (
      <div>
        <div styleName="styles.heading">
          Question and Answer with {this.props.candidate}
        </div>
        <Portal onClose={this.handleClose} open={this.state.open}>
          <Segment
            style={{
              fontSize: "1.5em",
              top: "0%",
              left: "35%",
              position: "fixed",
              zIndex: 1000,
            }}
          >
            <p>You cannot edit the question after submitting. </p>
            <p> Please recheck your question.</p>

            <Button content="OK" negative onClick={this.handleClose} />
          </Segment>
        </Portal>

        <Form>
          <div styleName="styles.inputbox">
            <Form.Input
              styleName="styles.inputtext"
              name="quest"
              value={this.state.quest}
              onChange={this.handleChange}
              type="text"
              rows="3"
              placeholder="Ask your question"
            />
            <Button
              styleName="styles.inputsubmit"
              type="submit"
              position="right"
              primary
              content="Submit"
              onClick={this.handleSubmit}
            />
          </div>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.paginationIndex,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    AskQuestion: (data, cid, index) => {
      dispatch(askQuestion(data, cid, index));
    },
    ChangePage: (index) => {
      dispatch(changePage(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(askAQuestion);
