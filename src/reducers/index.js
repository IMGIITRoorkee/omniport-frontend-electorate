import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

import WhoAmI from "./whoAmI";
import AllProfilesReducer from "./allProfilesReducer";
import GetPostOptionsReducers from "./getPostOptionsReducer";
import AllQuestionsReducers from "./allQuestionsReducer";
import CandidateDetailsReducer from "./candidateDetailsReducer";
import ParticularQuestionsReducer from "./particularQuestionsReducers";

const rootReducers = combineReducers({
  exampleReducer,
  whoAmI: WhoAmI,
  allProfiles: AllProfilesReducer,
  getPostOptions: GetPostOptionsReducers,
  allQuestions: AllQuestionsReducers,
  candidateDetails: CandidateDetailsReducer,
  particularQuestions: ParticularQuestionsReducer
});

export default rootReducers;
