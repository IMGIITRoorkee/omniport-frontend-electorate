import React, { Component, Fragment } from "react";
import { Segment, Comment, Label, Header, Button, Menu, Container, Icon } from "semantic-ui-react";
import Scrollspy from 'react-scrollspy';
import { baseNavUrl } from "../../urls";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";

class questionCard extends Component {
  render() {


    return (
      <div>
        <div styleName = "styles.question-card-container">
        <Segment styleName="styles.question-segment">
          <div styleName="styles.question-card-question">
            <label>
              <b>Q. </b>
            </label>
            {this.props.question}
          </div>
          <div styleName = "styles.question-card-meta-header">
            <span styleName="styles.question-card-meta">
              {this.props.asker} asked {this.props.candidate} |    | 
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
             <Icon name = "thumbs up" /> {this.props.likes} likes  
            </span>
          </div>
        </Segment>
        </div>
      </div>
    );
  }
}

export default questionCard;
