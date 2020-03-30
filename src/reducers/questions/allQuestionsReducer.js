const allQuestionsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return action.payload;
    default:
      return state;
  }
};

export default allQuestionsReducer;
