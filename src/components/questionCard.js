import React, { Component } from "react";
import { Segment, Comment, Label, Header, Button } from "semantic-ui-react";

import blocks from "../css/app.css";

class questionCard extends Component {
  render() {
    return (
      <div>
        <Segment styleName="blocks.question-segment">
          <div styleName="blocks.question-card-question">
            <label>
              <b>Q. </b>
            </label>
            {this.props.question}
          </div>
          <div>
            <span styleName="blocks.question-card-meta">
              {this.props.asker} asked {this.props.candidate}
            </span>
          </div>
          <div>
            {this.props.answer ? (
              <div styleName="blocks.question-card-question">
                <label>
                  <b>A. </b>
                </label>
                {this.props.answer}
              </div>
            ) : (
              <div styleName="blocks.question-card-meta">
                <Label>Unanswered!</Label>
              </div>
            )}
          </div>
          <div styleName="blocks.question-card-button">
            <Button>Likes {this.props.likes}</Button>
          </div>
        </Segment>
      </div>
    );
  }
}

export default questionCard;
