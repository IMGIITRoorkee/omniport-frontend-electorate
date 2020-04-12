import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Segment, Button, Menu, Icon } from "semantic-ui-react";
import moment from "moment";

import { createLike, deleteLike, changePage } from "../../actions";

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
                {moment(this.props.askedOn).format("Do MMMM")} |{" "}
                {moment(this.props.askedOn).format("h:mm a")}
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
              {this.props.likes === 1 ? (
                <span styleName="styles.question-card-meta-like">
                  {this.state.isLiked ? (
                    <Button basic onClick={this.handleClick}>
                      <Icon name="thumbs up" color="blue" /> {this.props.likes}{" "}
                      like
                    </Button>
                  ) : (
                    <Button basic onClick={this.handleClick}>
                      <Icon name="thumbs up" /> {this.props.likes} like
                    </Button>
                  )}
                </span>
              ) : (
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
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(questionCard);
