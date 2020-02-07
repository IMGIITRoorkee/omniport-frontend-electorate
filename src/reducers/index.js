import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

import WhoAmI from "./whoAmI";
import AllProfilesReducer from "./allProfilesReducer";
import PostOptionsReducers from "./postOptionsReducer";

const rootReducers = combineReducers({
  exampleReducer,
  whoAmI: WhoAmI,
  allProfiles: AllProfilesReducer,
  postOptions: PostOptionsReducers
});

export default rootReducers;
