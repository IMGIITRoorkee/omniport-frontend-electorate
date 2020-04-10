import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Pagination } from "semantic-ui-react";

import { getUnansweredQuestions, changePage } from "../../actions";

class answerPagination extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.GetUnansweredQuestions(this.props.cid, 1);
  }
  handlePageChange = (event, data) => {
    this.props.ChangePage(data["activePage"]);
    this.props.GetUnansweredQuestions(this.props.cid, data["activePage"]);
  };
  render() {
    return (
      <div>
        <Pagination
          activePage={this.props.page["index"] && this.props.page["index"]}
          totalPages={
            this.props.unansweredQuestions
              ? Math.ceil(this.props.unansweredQuestions["count"] / 10)
              : "1"
          }
          onPageChange={this.handlePageChange}
          firstItem={{
            "aria-label": "First item",
            content: <Icon name="angle double left" />,
            key: "1",
          }}
          prevItem={{
            "aria-label": "Previous item",
            content: <Icon name="angle left" />,
            key: "4",
          }}
          nextItem={{
            "aria-label": "Next item",
            content: <Icon name="angle right" />,
            key: "3",
          }}
          lastItem={{
            "aria-label": "Last item",
            content: <Icon name="angle double right" />,
            key: "2",
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    unansweredQuestions: state.unansweredQuestions,
    page: state.paginationIndex,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetUnansweredQuestions: (id, index) => {
      dispatch(getUnansweredQuestions(id, index));
    },
    ChangePage: (index) => {
      dispatch(changePage(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(answerPagination);
