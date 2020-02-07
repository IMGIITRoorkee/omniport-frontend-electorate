import config from "../config.json";

//Backend URLs
export const baseApiUrl = () => {
  return `/api/electorate/`;
};

export const urlGetAllProfiles = () => {
  return `${baseApiUrl()}candidate_view/`;
};

//Frontend URLs
export const baseNavUrl = forwardLink => {
  return `${config.baseUrl}${forwardLink}`;
};
