import config from "../config.json";

//Backend URLs
export const baseApiUrl = () => {
  return `/api/electorate2/`;
};

//Frontend URLs
export const baseNavUrl = forwardLink => {
  return `${config.baseUrl}${forwardLink}`;
};
