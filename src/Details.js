import { createSlice } from "@reduxjs/toolkit";
export const getUserDetailsHandler = () => (dispatch) => {
  dispatch(setFetching(true));
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => dispatch(setApiStatus(data)))
    .catch((err) => dispatch(setErrors(err)))
    .finally(() => dispatch(setFetching(false)));
};
const initialState = {
  apiStatus: 0,
  fetching: false,
  data: [],
  errors: "",
};
const Details = createSlice({
  name: "Details",
  initialState,
  reducers: {
    setApiStatus: (state, action) => {
      state.apiStatus = state.apiStatus + 1;
      state.data = action.payload;
      state.errors = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export const { setApiStatus, setFetching, setErrors } = Details.actions;
export default Details.reducer;
