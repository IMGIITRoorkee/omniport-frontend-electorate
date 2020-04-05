import config from "../config.json";

//Backend URLs
export const baseApiUrl = () => {
  return `/api/electorate/`;
};

export const urlGetAllProfiles = () => {
  return `${baseApiUrl()}candidate_view/`;
};

export const urlGetCandidateDetails = (id) => {
  return `${baseApiUrl()}candidate_view/${id}/`;
};

export const urlGetAllQuestions = () => {
  return `${baseApiUrl()}question_view/`;
};

export const urlGetParticularQuestions = (id) => {
  return `${baseApiUrl()}question_view/?candidate=${id}`;
};

export const urlGetUnansweredQuestions = (id) => {
  return `${baseApiUrl()}answer_view/?candidate=${id}`;
};

export const urlGetQuestionDetails = (id) => {
  return `${baseApiUrl()}question_view/${id}/`;
};

//Frontend URLs
export const baseNavUrl = (forwardLink) => {
  return `${config.baseUrl}${forwardLink}`;
};
