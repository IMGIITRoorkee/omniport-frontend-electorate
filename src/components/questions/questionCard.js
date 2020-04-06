import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Segment, Button, Menu, Icon } from "semantic-ui-react";
import Scrollspy from "react-scrollspy";
import { baseNavUrl } from "../../urls";
import moment from 'moment';

import { createLike, deleteLike } from "../../actions";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";

class questionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.liked,
    };
    this.handleClick = this.handleClick.bind(this);
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

    return (
      <div>
        <div styleName="styles.question-card-container">
          <Segment styleName="styles.question-segment">
            <div styleName="styles.question-card-question">
              <label>
                <b>Q. </b>
              </label>
              {this.props.question}
            </div>
            <div styleName="styles.question-card-meta-header">
              <span styleName="styles.question-card-meta">
                {this.props.asker} asked {this.props.candidate} |{" "}
                {moment(this.props.askedOn).format('Do MMMM')} | {moment(this.props.askedOn).format('h:mm a')}
              </span>
            </div>
            <div>
              {this.props.answer ? (
                <div styleName="styles.question-card-question">
                  <label>
                    <b>A. </b>
                  </label>
                  {this.props.answer}
                </div>
              ) : (
                <div styleName="styles.question-card-unanswered">
                  <label>UNANSWERED</label>
                </div>
              )}
            </div>
            <div styleName="styles.question-card-button">
              <span styleName="styles.question-card-meta-like">
                {this.state.isLiked ? (
                  <Button basic onClick={this.handleClick}>
                    <Icon name="thumbs up" color="blue" /> {this.props.likes}{" "}
                    likes
                  </Button>
                ) : (
                  <Button basic onClick={this.handleClick}>
                    <Icon name="thumbs up" /> {this.props.likes} likes
                  </Button>
                )}
              </span>
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CreateLike: (qid, uid, cid) => {
      dispatch(createLike(qid, uid, cid));
    },
    DeleteLike: (id, cid) => {
      dispatch(deleteLike(id, cid));
    },
  };
};

export default connect(null, mapDispatchToProps)(questionCard);
