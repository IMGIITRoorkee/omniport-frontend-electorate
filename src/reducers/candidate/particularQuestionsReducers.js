const particularQuestionsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PARTICULAR_QUESTIONS":
      return action.payload;
    default:
      return state;
  }
};

export default particularQuestionsReducer;
