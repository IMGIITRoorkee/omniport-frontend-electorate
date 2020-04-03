import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Segment, Container, Sidebar, Menu } from "semantic-ui-react";

import { AppHeader, AppFooter, AppMain, getTheme } from "formula_one";

import NavMenu from "./navMenu";
import AllProfiles from "./home/allProfiles";
import Questions from "./questions/questions";
import CandidateProfile from "./candidate/candidateProfile";
import AnswerQuestions from "./answers/answerQuestions";

import main from "formula_one/src/css/app.css";
import blocks from "../css/app.css";

class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <div styleName="main.app">
        <AppHeader appName="electorate" mode="app" userDropdown />
        <AppMain>
          <div styleName="main.app-main">
            <Scrollbars autoHide>
              <div styleName="blocks.content-div">
                <Sidebar.Pushable fluid styleName="blocks.pushable">
                  {/* Add side navbar here */}
                  {/* <Sidebar as={Menu} vertical visible>
                    <NavMenu />
                  </Sidebar> */}
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
                      <Route render={props => <Redirect to="/404" />} />
                    </Switch>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </div>
            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter />
      </div>
    );
  }
}

export default connect(null, null)(App);
