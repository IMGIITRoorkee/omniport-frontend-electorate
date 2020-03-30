const allProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_PROFILES":
      return action.payload;
    default:
      return state;
  }
};

export default allProfilesReducer;
