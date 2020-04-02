import React, { Component, Fragment } from "react";
import { Segment, Comment, Label, Header, Button, Menu, Container, Icon } from "semantic-ui-react";
import Scrollspy from 'react-scrollspy';
import { baseNavUrl } from "../../urls";

// import blocks from "../../css/app.css";
import styles from "../../css/questions/questions.css";

class questionCard extends Component {
  render() {

    const activeStyle = {
      fontSize : "1.2em",
      color : "#606060",
      paddingLeft : "10px",
      margin : "15px",
      padding : "2px"
    };

    const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: "0.2px",
          }}
      />
  );


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
        <Fragment>
        <Scrollspy
                items={["acad_ug", "tech", "sport","hostel","cult","prof","acad_pg"]}
                currentClassName = "navbar"
                style={{ position: "fixed ", top: "0",left:"0px", padding: "0px", margin: "0", width: "15%", backgroundColor: "#FFFFFF" ,height : "100%"}}
              >
                <div style = {{ fontSize : "1.5em", margin: "0px", marginTop: "4px", padding: "15px", textAlign: "center", }}><a href={baseNavUrl("")} style = {{color : "#131313"}}>INSTITUTE CANDIDATES</a></div>
                <a href={baseNavUrl("#acad_ug")} > <Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Academic(UG) Affairs" /> </a>
                <a href={baseNavUrl("#tech")} ><Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Technical Affairs" /> </a> 
                <a href={baseNavUrl("#sport")}><Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Sports Affairs" /></a>
                <a href={baseNavUrl("#hostel")} > <Menu.Item styleName = "styles.Link" style = {activeStyle} name="GS Hostel Affairs" /></a>
                <a href = {baseNavUrl("#cult")} ><Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Cultural Affairs" /></a>
                <a href = {baseNavUrl("#prof")} ><Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Professional Affairs" /></a>
                <a href = {baseNavUrl("#acad_pg")} ><Menu.Item styleName = "styles.Link" style = {activeStyle} name= "GS Academic(PG) Affairs" /></a>
                <ColoredLine color = "#BEBEBE" />
                <div class = "headnavbar" style = {{ fontSize : "1.5em", margin: "0px", marginTop: "1px", padding: "15px", backgroundColor : "#356DBF"}}><a href={baseNavUrl("/questions")} style = {{color : "white"}}>Question And Answer</a></div>
                </Scrollspy>
                </Fragment>

      </div>
    );
  }
}

export default questionCard;
