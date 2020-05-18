import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Pagination } from "semantic-ui-react";

import { getAllQuestions, changePage } from "../../actions";

class questionsPagination extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.GetAllQuestions(1, this.props.post);
  }
  handlePageChange = (event, data) => {
    this.props.ChangePage(data["activePage"]);
    this.props.GetAllQuestions(data["activePage"], this.props.post);
  };
  render() {
    return (
      <div>
        <Pagination
          activePage={this.props.page["index"] && this.props.page["index"]}
          totalPages={
            this.props.allQuestions
              ? Math.ceil(this.props.allQuestions["count"] / 10)
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
    allQuestions: state.allQuestions,
    page: state.paginationIndex,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetAllQuestions: (index, post) => {
      dispatch(getAllQuestions(index, post));
    },
    ChangePage: (index) => {
      dispatch(changePage(index));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(questionsPagination);
