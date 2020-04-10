import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Form,
  Button,
  Icon,
  Portal,
  Message,
} from "semantic-ui-react";
import moment from "moment";

import {
  answerQuestion,
  createLike,
  deleteLike,
  changePage,
} from "../../actions";

import styles from "../../css/questions/questions.css";
import style from "../../css/answers/answers.css";

class answerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      isLiked: this.props.liked,
      open: false,
      firstclickdone: false,
      success: false,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    if (this.state.answer && this.state.firstclickdone) {
      var formData = new FormData();
      formData.append("answer", this.state.answer);
      this.props.AnswerQuestion(
        this.props.qid,
        formData,
        this.props.cid,
        this.props.page["index"],
        this.successCallBack,
        this.errCallback
      );
      this.setState({
        answer: "",
      });
    }
  }
  handleClick() {
    if (this.state.isLiked) {
      this.props.DeleteLike(
        this.props.lid,
        this.props.cid,
        this.props.page["index"]
      );
      this.setState({
        isLiked: false,
      });
    } else {
      this.props.CreateLike(
        this.props.qid,
        this.props.uid,
        this.props.cid,
        this.props.page["index"]
      );
      this.setState({
        isLiked: true,
      });
    }
  }
  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
    });
  };
  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
    });
  };
  render() {
    return (
      <div>
        <div styleName="style.question-card-container">
          <Segment>
            {this.state.success ? (
              <Message success={this.state.success}>
                <Message.Content>
                  <Message.Header>Your answer has been posted!</Message.Header>
                </Message.Content>
              </Message>
            ) : (
              <div>
                {this.state.error && (
                  <Message negative={this.state.error}>
                    <Message.Content>
                      <Message.Header>
                        An error occured. Please try again!
                      </Message.Header>
                    </Message.Content>
                  </Message>
                )}
                <div styleName="styles.question-card-question">
                  <label>
                    <b>Q. </b>
                  </label>
                  {this.props.question}
                </div>
                <div styleName="styles.question-card-meta-header">
                  <span styleName="styles.question-card-meta">
                    {this.props.asker} |{" "}
                    {moment(this.props.askedOn).format("Do MMMM")} |{" "}
                    {moment(this.props.askedOn).format("h:mm a")} |
                    <label styleName="style.answer-card-unanswered">
                      {" "}
                      UNANSWERED
                    </label>
                  </span>
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
                    <p>You cannot edit the Answer after submitting. </p>
                    <p> Please recheck your Answer.</p>

                    <Button content="OK" negative onClick={this.handleClose} />
                  </Segment>
                </Portal>
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
                        styleName="style.inputsubmit"
                        type="submit"
                        value="Submit"
                        onClick={this.handleSubmit}
                      >
                        {" "}
                        Submit
                      </Button>
                    </div>
                    <div styleName="style.question-card-button">
                      <span styleName="style.question-card-meta-like">
                        {this.state.isLiked ? (
                          <Button basic onClick={this.handleClick}>
                            <Icon name="thumbs up" color="blue" />{" "}
                            {this.props.likes} likes
                          </Button>
                        ) : (
                          <Button basic onClick={this.handleClick}>
                            <Icon name="thumbs up" /> {this.props.likes} likes
                          </Button>
                        )}
                      </span>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Segment>
        </div>
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
    AnswerQuestion: (id, data, cid, successCallBack, errCallback) => {
      dispatch(answerQuestion(id, data, cid, successCallBack, errCallback));
    },
    CreateLike: (qid, uid, cid, index) => {
      dispatch(createLike(qid, uid, cid, index));
    },
    DeleteLike: (id, cid, index) => {
      dispatch(deleteLike(id, cid, index));
    },
    ChangePage: (index) => {
      dispatch(changePage(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(answerCard);
