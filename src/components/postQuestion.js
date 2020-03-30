import React, { Component, Fragment } from "react";
import {
  Segment,
  Form,
  Label,
  Dropdown,
  Divider,
  TextArea,
  Button,
  Container
} from "semantic-ui-react";
import { connect } from "react-redux";

import {
  getPostOptions,
  setUser,
  getAllProfiles,
  askQuestion
} from "../actions";

import blocks from "../css/app.css";

class postQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      question: "",
      candidate: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.SetUser();
    this.props.GetPostOptions();
    this.props.GetAllProfiles();
  }

  handleDropdownChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit() {
    const { candidate, question } = this.state;
    if (candidate && question) {
      var formData = new FormData();
      formData.append("asker", "9");
      formData.append("question", question);
      formData.append("candidate", candidate);
      this.props.AskQuestion(formData);
      this.setState({
        post: "",
        question: "",
        candidate: ""
      });
    }
  }
  render() {
    console.log(this.props);
    const { getPostOptions, allProfiles } = this.props;
    var dropDownPostOptions = getPostOptions.map(function(element) {
      return {
        key: getPostOptions.indexOf(element),
        text: element.displayName,
        value: element.value
      };
    });
    var dropDownCandidateOptions = allProfiles.map(function(element) {
      return {
        key: allProfiles.indexOf(element),
        text: element.fullName,
        value: element.id
      };
    });
    return (
      <Fragment>
        <Segment.Group styleName="blocks.question-segment">
          <Segment styleName="blocks.question-segment">
            <Form encType="multiple/form-data">
              <Form.Group>
                <Label color="blue" size="large">
                  POST
                </Label>
                <Divider />
                <Dropdown
                  name="post"
                  value={this.state.post}
                  onChange={this.handleDropdownChange}
                  placeholder="Select a Post"
                  selectOnNavigation={false}
                  options={dropDownPostOptions}
                  scrolling
                  selection
                />
              </Form.Group>
              <Form.Group>
                <Label color="blue" size="large">
                  Candidate
                </Label>
                <Divider />
                <Dropdown
                  name="candidate"
                  value={this.state.candidate}
                  onChange={this.handleDropdownChange}
                  placeholder="Select a Candidate"
                  selectOnNavigation={false}
                  options={dropDownCandidateOptions}
                  scrolling
                  selection
                />
              </Form.Group>
              <Form.Field>
                <Form.Input
                  name="question"
                  value={this.state.question}
                  onChange={this.handleChange}
                  type="text"
                  name="question"
                  rows="3"
                  autoHeight
                  placeholder="Ask your question"
                />
              </Form.Field>
              <Button
                type="submit"
                position="right"
                primary
                icon="send"
                content="Submit"
                onClick={this.handleSubmit}
              />
            </Form>
          </Segment>
        </Segment.Group>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    whoAmI: state.whoAmI,
    getPostOptions: state.getPostOptions,
    allProfiles: state.allProfiles
  };
}

const mapDispatchToProps = dispatch => {
  return {
    SetUser: () => {
      dispatch(setUser());
    },
    GetPostOptions: () => {
      dispatch(getPostOptions());
    },
    GetAllProfiles: () => {
      dispatch(getAllProfiles());
    },
    AskQuestion: data => {
      dispatch(askQuestion(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(postQuestion);
