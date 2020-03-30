const getPostOptionsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POST_OPTIONS":
      return action.payload;
    default:
      return state;
  }
};

export default getPostOptionsReducer;
