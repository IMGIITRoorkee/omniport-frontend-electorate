import axios from "axios";

import { urlWhoAmI, getCookie } from "formula_one";

import {
  urlGetAllProfiles,
  urlGetAllQuestions,
  urlGetParticularQuestions,
  urlGetUnansweredQuestions,
  urlGetCandidateDetails,
  urlGetQuestionDetails,
} from "../urls";

//Set User
export const setUser = () => {
  return (dispatch) => {
    axios
      .get(urlWhoAmI())
      .then((res) => {
        dispatch({
          type: "SET_USER",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get All Profiles for HomePage
export const getAllProfiles = () => {
  return (dispatch) => {
    axios
      .get(urlGetAllProfiles())
      .then((res) => {
        dispatch({
          type: "GET_ALL_PROFILES",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get PostDict for making homepage dynamic
export const getPostOptions = () => {
  return (dispatch) => {
    axios
      .options(urlGetAllProfiles())
      .then((res) => {
        //console.log(res.data.actions.POST.post.choices);
        dispatch({
          type: "GET_POST_OPTIONS",
          payload: res.data.actions.POST.post.choices,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get AllQuestions for Questions and Answers Page
export const getAllQuestions = () => {
  return (dispatch) => {
    axios
      .get(urlGetAllQuestions())
      .then((res) => {
        dispatch({
          type: "GET_ALL_QUESTIONS",
          payload: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get Questions for a partitcular Candidate for Answers Page
export const getParticularQuestions = (id) => {
  return (dispatch) => {
    axios
      .get(urlGetParticularQuestions(id))
      .then((res) => {
        dispatch({
          type: "GET_PARTICULAR_QUESTIONS",
          payload: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get unanswered questions from answer_view endpoint
export const getUnansweredQuestions = (id) => {
  return (dispatch) => {
    axios
      .get(urlGetUnansweredQuestions(id))
      .then((res) => {
        dispatch({
          type: "GET_UNANSWERED_QUESTIONS",
          payload: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Get Individual Candidate Details for their profile page
export const getCandidateDetails = (id) => {
  return (dispatch) => {
    dispatch({
      type: "GET_CANDIDATE_DETAILS_LOADING",
      payload: true,
    });
    axios
      .get(urlGetCandidateDetails(id))
      .then((res) => {
        dispatch({
          type: "GET_CANDIDATE_DETAILS",
          payload: { ...res.data, loading: false },
        });
      })
      .catch((err) => console.log(err));
  };
};

//Post a Question
export const askQuestion = (data) => {
  let headers = {
    "Content-Type": "multipart/form-data",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  return (dispatch) => {
    axios
      .post(urlGetAllQuestions(), data, { headers: headers })
      .then((res) => {
        dispatch(getAllQuestions());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Answer a question
export const answerQuestion = (id, data) => {
  let headers = {
    "X-CSRFToken": getCookie("csrftoken"),
  };
  return (dispatch) => {
    axios
      .patch(urlGetQuestionDetails(id), data, { headers: headers })
      .then((res) => {
        dispatch(getAllQuestions());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
