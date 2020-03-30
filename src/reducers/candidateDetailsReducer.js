const candidateDetails = (state = {}, action) => {
  switch (action.type) {
    case "GET_CANDIDATE_DETAILS":
      return action.payload;
    case "GET_CANDIDATE_DETAILS_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default candidateDetails;
