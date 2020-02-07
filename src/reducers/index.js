import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

import WhoAmI from "./whoAmI";
import AllProfilesReducer from "./allProfilesReducer";
import GetPostOptionsReducers from "./getPostOptionsReducer";

const rootReducers = combineReducers({
  exampleReducer,
  whoAmI: WhoAmI,
  allProfiles: AllProfilesReducer,
  getPostOptions: GetPostOptionsReducers
});

export default rootReducers;
