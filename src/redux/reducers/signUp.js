import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
  } from "../actions/types/auth";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case "LOGIN_FAIL":
      case "REGISTER_FAIL":
      case "LOGOUT_SUCCESS":
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: null,
          isLoading: false,
          user: null,
        };
      case "REGISTER_SUCCESS":
      case "LOGIN_SUCCESS":
        localStorage.setItem("token", "action.payload.token");
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      default:
        return state;
    }
  }