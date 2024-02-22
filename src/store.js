import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import Details from "./Details";
import SelectedUserData from "./SelectedUserData";
const reducer = combineReducers({
  Details,
  SelectedUserData
});
export const store = configureStore({
  // Create the reducer and add it here
  reducer,
});
