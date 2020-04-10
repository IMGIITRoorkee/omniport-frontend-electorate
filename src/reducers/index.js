import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

import WhoAmI from "./whoAmI";
import AllProfilesReducer from "./home/allProfilesReducer";
import GetPostOptionsReducers from "./home/getPostOptionsReducer";
import AllQuestionsReducers from "./questions/allQuestionsReducer";
import CandidateDetailsReducer from "./candidate/candidateDetailsReducer";
import ParticularQuestionsReducer from "./candidate/particularQuestionsReducers";
import UnansweredQuestionsReducer from "./answers/unansweredQuestionsReducer";
import PaginationIndex from "./pagination";

const rootReducers = combineReducers({
  exampleReducer,
  whoAmI: WhoAmI,
  allProfiles: AllProfilesReducer,
  getPostOptions: GetPostOptionsReducers,
  allQuestions: AllQuestionsReducers,
  candidateDetails: CandidateDetailsReducer,
  particularQuestions: ParticularQuestionsReducer,
  unansweredQuestions: UnansweredQuestionsReducer,
  paginationIndex: PaginationIndex,
});

export default rootReducers;
