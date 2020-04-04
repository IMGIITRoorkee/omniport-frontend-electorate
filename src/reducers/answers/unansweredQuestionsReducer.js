const unansweredQuestionsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_UNANSWERED_QUESTIONS":
      return action.payload;
    default:
      return state;
  }
};

export default unansweredQuestionsReducer;
