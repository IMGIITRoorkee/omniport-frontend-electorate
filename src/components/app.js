import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Sidebar } from "semantic-ui-react";

import { AppHeader, AppFooter, AppMain } from "formula_one";

import AllProfiles from "./home/allProfiles";
import Questions from "./questions/questions";
import CandidateProfile from "./candidate/candidateProfile";
import AnswerQuestions from "./answers/answerQuestions";

import main from "formula_one/src/css/app.css";
import blocks from "../css/app.css";

class App extends Component {
  render() {
    const creators = [
      {
      name: "Anshul Dutt Sharma",
      role: "Full Stack Developer",
      },
      {
        name: "Nisarg Patel",
        role: "Frontend Developer",
      },
    ];
    const { match } = this.props;
    return (
      <div styleName="main.app">
        <AppHeader appName="electorate" mode="app" userDropdown />
        <AppMain>
          <div styleName="main.app-main">
            <Scrollbars autoHide>
              <div styleName="blocks.content-div">
                <Sidebar.Pushable fluid styleName="blocks.pushable">
                  <Sidebar.Pusher styleName="blocks.pusher-content">
                    <Switch>
                      <Route
                        exact
                        path={`${match.path}`}
                        component={AllProfiles}
                      />
                      <Route
                        exact
                        path={`${match.path}profiles/:id`}
                        component={CandidateProfile}
                      />
                      <Route
                        exact
                        path={`${match.path}profiles/:id/answer`}
                        component={AnswerQuestions}
                      />
                      <Route
                        exact
                        path={`${match.path}questions/`}
                        component={Questions}
                      />
                      <Route render={(props) => <Redirect to="/404" />} />
                    </Switch>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </div>
            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    );
  }
}

export default connect(null, null)(App);
