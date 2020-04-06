import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Icon, Portal } from "semantic-ui-react";
import moment from 'moment';
import { answerQuestion, createLike, deleteLike } from "../../actions";

import styles from "../../css/questions/questions.css";
import style from "../../css/answers/answers.css";

class answerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      isLiked: this.props.liked,
      open: false,
      firstclickdone : false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClose = () => this.setState({ open: false })

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit() {
    
    if ((this.state.firstclickdone) == false) {
      this.setState({
       open : true,
       firstclickdone: true,
      });
    }

    if (this.state.answer && this.state.firstclickdone) {
      var formData = new FormData();
      formData.append("answer", this.state.answer);
      this.props.AnswerQuestion(this.props.qid, formData, this.props.cid);
      this.setState({
        answer: "",
      });
    }
  }
  handleClick() {
    if (this.state.isLiked) {
      this.props.DeleteLike(this.props.lid, this.props.cid);
      this.setState({
        isLiked: false,
      });
    } else {
      this.props.CreateLike(this.props.qid, this.props.uid, this.props.cid);
      this.setState({
        isLiked: true,
      });
    }
  }
  render() {
    console.log(this.props.questionId);
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
              {this.props.asker} |  {" "}
              {moment(this.props.askedOn).format('Do MMMM')} | {moment(this.props.askedOn).format('h:mm a')} |
              <label styleName = "style.answer-card-unanswered"> UNANSWERED</label>
            </span>
          </div>
          <Portal onClose={this.handleClose} open={this.state.open}>
            <Segment
              style={{
                fontSize: '1.5em',
                top: '0%',
                left: '35%',
                position: 'fixed',
                zIndex: 1000,
              }}
            >
              <p>You cannot edit the Answer after submitting. </p>
              <p> Please recheck your Answer.</p>

              <Button
                content='OK'
                negative
                onClick={this.handleClose}
              />
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
                  styleName = "style.inputsubmit"
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                > Submit
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
          </Segment>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AnswerQuestion: (id, data, cid) => {
      dispatch(answerQuestion(id, data, cid));
    },
    CreateLike: (qid, uid, cid) => {
      dispatch(createLike(qid, uid, cid));
    },
    DeleteLike: (id, cid) => {
      dispatch(deleteLike(id, cid));
    },
  };
};

export default connect(null, mapDispatchToProps)(answerCard);
