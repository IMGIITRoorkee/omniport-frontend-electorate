import axios from "axios";

import { urlWhoAmI } from "formula_one";

import { urlGetAllProfiles } from "../urls";

//Set User
export const setUser = () => {
  return dispatch => {
    axios
      .get(urlWhoAmI())
      .then(res => {
        dispatch({
          type: "SET_USER",
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};

//Get All Profiles for HomePage
export const getAllProfiles = () => {
  return dispatch => {
    axios
      .get(urlGetAllProfiles())
      .then(res => {
        dispatch({
          type: "GET_ALL_PROFILES",
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};
